'use server';

import { createServiceClient } from '@/lib/supabase';
import type {
  CrmCard,
  CrmCardEnriched,
  CrmCardInsert,
  CrmCardUpdate,
  CrmInteracaoInsert,
  KanbanBoard,
  KanbanColumnSlug,
  KANBAN_COLUMN_SLUG,
} from '@/lib/types/corretor';

// ========================================
// HELPERS
// ========================================

function enrichCard(card: CrmCard & { lead?: Record<string, unknown> | null }): CrmCardEnriched {
  const now = Date.now();
  const updatedAt = new Date(card.updated_at).getTime();
  const hoursSinceUpdate = (now - updatedAt) / (1000 * 60 * 60);
  
  const lastPropostaInteraction = card.ultima_interacao_proposta
    ? new Date(card.ultima_interacao_proposta).getTime()
    : 0;
  const hoursSincePropostaInteraction = lastPropostaInteraction
    ? (now - lastPropostaInteraction) / (1000 * 60 * 60)
    : Infinity;

  return {
    ...card,
    lead: card.lead
      ? {
          nome: String(card.lead.nome ?? ''),
          whatsapp: String(card.lead.whatsapp ?? ''),
          email: card.lead.email ? String(card.lead.email) : null,
          operadora_atual: card.lead.operadora_atual ? String(card.lead.operadora_atual) : null,
          valor_atual: card.lead.valor_atual ? Number(card.lead.valor_atual) : null,
        }
      : null,
    is_hot: hoursSincePropostaInteraction <= 24,
    is_stale: hoursSinceUpdate > 48,
    hours_since_update: Math.round(hoursSinceUpdate),
  };
}

// ========================================
// KANBAN BOARD
// ========================================

export async function getKanbanBoard(corretorId: string): Promise<{
  success: boolean;
  data?: KanbanBoard;
  error?: string;
}> {
  try {
    const supabase = createServiceClient();

    const { data: cards, error } = await supabase
      .from('crm_cards')
      .select(`
        *,
        lead:insurance_leads(nome, whatsapp, email, operadora_atual, valor_atual)
      `)
      .eq('corretor_id', corretorId)
      .order('posicao', { ascending: true });

    if (error) throw error;

    const columns: KanbanColumnSlug[] = [
      'novo_lead',
      'qualificado',
      'proposta_enviada',
      'documentacao',
      'fechado',
      'perdido',
    ];

    const board: KanbanBoard = {} as KanbanBoard;
    columns.forEach((col) => {
      board[col] = [];
    });

    (cards ?? []).forEach((card) => {
      const enriched = enrichCard(card as CrmCard & { lead?: Record<string, unknown> | null });
      if (board[enriched.coluna_slug]) {
        board[enriched.coluna_slug].push(enriched);
      }
    });

    return { success: true, data: board };
  } catch (err) {
    console.error('[getKanbanBoard]', err);
    return { success: false, error: 'Erro ao carregar o pipeline' };
  }
}

// ========================================
// CRUD CARDS
// ========================================

export async function createCrmCard(data: CrmCardInsert): Promise<{
  success: boolean;
  data?: CrmCard;
  error?: string;
}> {
  try {
    const supabase = createServiceClient();

    const { data: card, error } = await supabase
      .from('crm_cards')
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    // Registra interação de criação
    await supabase.from('crm_interacoes').insert({
      card_id: card.id,
      corretor_id: data.corretor_id,
      lead_id: data.lead_id,
      tipo: 'sistema',
      titulo: 'Card criado',
      descricao: `Lead "${data.titulo}" adicionado ao pipeline`,
    });

    return { success: true, data: card };
  } catch (err) {
    console.error('[createCrmCard]', err);
    return { success: false, error: 'Erro ao criar card' };
  }
}

export async function updateCrmCard(
  cardId: string,
  updates: CrmCardUpdate,
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createServiceClient();

    const { error } = await supabase
      .from('crm_cards')
      .update(updates)
      .eq('id', cardId);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('[updateCrmCard]', err);
    return { success: false, error: 'Erro ao atualizar card' };
  }
}

export async function moveCard(
  cardId: string,
  destinationColumn: KanbanColumnSlug,
  newPosition: number,
  corretorId: string,
  sourceColumn?: KanbanColumnSlug,
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createServiceClient();

    const { error } = await supabase
      .from('crm_cards')
      .update({
        coluna_slug: destinationColumn,
        posicao: newPosition,
      })
      .eq('id', cardId);

    if (error) throw error;

    // Registra mudança de coluna no histórico
    if (sourceColumn && sourceColumn !== destinationColumn) {
      await supabase.from('crm_interacoes').insert({
        card_id: cardId,
        corretor_id: corretorId,
        tipo: 'status_change',
        titulo: 'Status alterado',
        status_anterior: sourceColumn,
        status_novo: destinationColumn,
      });
    }

    return { success: true };
  } catch (err) {
    console.error('[moveCard]', err);
    return { success: false, error: 'Erro ao mover card' };
  }
}

// ========================================
// INTERAÇÕES (Timeline Hubspot-style)
// ========================================

export async function getCardInteracoes(cardId: string): Promise<{
  success: boolean;
  data?: CrmInteracaoInsert[];
  error?: string;
}> {
  try {
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('crm_interacoes')
      .select('*')
      .eq('card_id', cardId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: data ?? [] };
  } catch (err) {
    console.error('[getCardInteracoes]', err);
    return { success: false, error: 'Erro ao carregar interações' };
  }
}

export async function addInteracao(data: CrmInteracaoInsert): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const supabase = createServiceClient();

    const { error } = await supabase.from('crm_interacoes').insert(data);
    if (error) throw error;

    // Atualiza total_interacoes e ultima_interacao_proposta no card
    const isPropostaRelated = ['proposta_enviada', 'proposta_aceita', 'proposta_recusada'].includes(data.tipo);

    try {
      await supabase.rpc('increment_card_interacoes', {
        p_card_id: data.card_id,
        p_is_proposta: isPropostaRelated,
      });
    } catch { /* best effort - RPC pode não existir ainda */ }

    return { success: true };
  } catch (err) {
    console.error('[addInteracao]', err);
    return { success: false, error: 'Erro ao registrar interação' };
  }
}

// ========================================
// LEAD SCORING
// ========================================

export async function recalculateScore(cardId: string): Promise<{
  success: boolean;
  score?: number;
  error?: string;
}> {
  try {
    const supabase = createServiceClient();

    const { data: card } = await supabase
      .from('crm_cards')
      .select('*, lead:insurance_leads(*)')
      .eq('id', cardId)
      .single();

    if (!card) throw new Error('Card não encontrado');

    let score = 0;
    const motivos: string[] = [];

    // +20 se tem valor estimado
    if (card.valor_estimado && card.valor_estimado > 0) {
      score += 20;
      motivos.push('Valor estimado preenchido');
    }

    // +25 se interagiu com proposta nas últimas 24h
    if (card.ultima_interacao_proposta) {
      const hours = (Date.now() - new Date(card.ultima_interacao_proposta).getTime()) / 3600000;
      if (hours <= 24) {
        score += 25;
        motivos.push('Interação recente com proposta');
      }
    }

    // +15 se tem mais de 3 interações
    if (card.total_interacoes > 3) {
      score += 15;
      motivos.push(`${card.total_interacoes} interações registradas`);
    }

    // +20 se está em colunas avançadas
    const advancedColumns = ['proposta_enviada', 'documentacao'];
    if (advancedColumns.includes(card.coluna_slug)) {
      score += 20;
      motivos.push('Estágio avançado no pipeline');
    }

    // +10 se lead tem email
    if (card.lead?.email) {
      score += 10;
      motivos.push('Email disponível');
    }

    // +10 se prioridade alta/urgente
    if (['alta', 'urgente'].includes(card.prioridade)) {
      score += 10;
      motivos.push('Prioridade alta');
    }

    score = Math.min(score, 100);

    await supabase
      .from('crm_cards')
      .update({ score, score_motivo: motivos.join('; ') })
      .eq('id', cardId);

    return { success: true, score };
  } catch (err) {
    console.error('[recalculateScore]', err);
    return { success: false, error: 'Erro ao recalcular score' };
  }
}
