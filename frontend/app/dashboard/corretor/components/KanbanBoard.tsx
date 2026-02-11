'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  GripVertical,
  Clock,
  AlertTriangle,
  Star,
  MoreVertical,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  UserPlus,
  CheckCircle,
  Send,
  FileText,
  Trophy,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CrmCardEnriched, KanbanColumnSlug, KanbanBoard } from '@/lib/types/corretor';
import { useKanban } from '../hooks/useKanban';
import LeadDrawer from './LeadDrawer';

// ========================================
// COLUMN CONFIG
// ========================================

const COLUMN_CONFIG: Record<KanbanColumnSlug, {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  novo_lead: {
    label: 'Novo Lead',
    icon: UserPlus,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  qualificado: {
    label: 'Qualificado',
    icon: CheckCircle,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  proposta_enviada: {
    label: 'Proposta Enviada',
    icon: Send,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
  },
  documentacao: {
    label: 'Documentação',
    icon: FileText,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  fechado: {
    label: 'Fechado',
    icon: Trophy,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  perdido: {
    label: 'Perdido',
    icon: XCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
  },
};

// ========================================
// KANBAN CARD
// ========================================

function KanbanCard({
  card,
  onClick,
  columnSlug,
}: {
  card: CrmCardEnriched;
  onClick: () => void;
  columnSlug: KanbanColumnSlug;
}) {
  // Brilho dourado para leads quentes (interação com proposta <24h)
  const isHot = card.is_hot;
  // Badge de urgência para leads parados >48h
  const isStale = card.is_stale && card.coluna_slug !== 'fechado' && card.coluna_slug !== 'perdido';

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(
          'application/json',
          JSON.stringify({ cardId: card.id, sourceColumn: columnSlug }),
        );
      }}
      onClick={onClick}
      className={cn(
        'group rounded-xl p-4 cursor-pointer transition-all duration-300 relative',
        'bg-white/[0.03] border backdrop-blur-sm',
        'hover:bg-white/[0.06] hover:border-white/15',
        isHot
          ? 'border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]'
          : 'border-white/[0.08]',
      )}
    >
      {/* Gold shimmer para leads quentes */}
      {isHot && (
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent" />
        </div>
      )}

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <GripVertical className="h-4 w-4 text-white/20 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
            <h4 className="text-sm font-medium text-white truncate">{card.titulo}</h4>
          </div>

          {/* Score badge */}
          {card.score > 0 && (
            <div className={cn(
              'flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold',
              card.score >= 70
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] text-black'
                : card.score >= 40
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-white/10 text-white/60',
            )}>
              <Star className="h-2.5 w-2.5" />
              {card.score}
            </div>
          )}
        </div>

        {/* Subtítulo / Lead info */}
        {card.lead && (
          <p className="text-xs text-white/40 mb-3 truncate">
            {card.lead.operadora_atual && `${card.lead.operadora_atual} · `}
            {card.lead.valor_atual && `R$ ${card.lead.valor_atual.toLocaleString('pt-BR')}`}
          </p>
        )}

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {isHot && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] text-black">
              <Sparkles className="h-2.5 w-2.5" />
              HOT LEAD
            </span>
          )}

          {isStale && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
              <AlertTriangle className="h-2.5 w-2.5" />
              ⚠️ Reativar Contato
            </span>
          )}

          {card.valor_estimado && card.valor_estimado > 0 && (
            <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
              R$ {card.valor_estimado.toLocaleString('pt-BR')}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-1 text-white/30">
            <Clock className="h-3 w-3" />
            <span className="text-[10px]">
              {card.hours_since_update < 1
                ? 'agora'
                : card.hours_since_update < 24
                  ? `${card.hours_since_update}h`
                  : `${Math.floor(card.hours_since_update / 24)}d`}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {card.lead?.whatsapp && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://wa.me/${card.lead?.whatsapp?.replace(/\D/g, '')}`, '_blank');
                }}
                className="h-6 w-6 rounded-md bg-green-500/10 flex items-center justify-center hover:bg-green-500/20 transition-colors"
              >
                <Phone className="h-3 w-3 text-green-400" />
              </button>
            )}
            {card.lead?.email && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`mailto:${card.lead?.email}`, '_blank');
                }}
                className="h-6 w-6 rounded-md bg-blue-500/10 flex items-center justify-center hover:bg-blue-500/20 transition-colors"
              >
                <Mail className="h-3 w-3 text-blue-400" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// KANBAN COLUMN
// ========================================

function KanbanColumn({
  slug,
  cards,
  onCardClick,
  onDrop,
  onAddCard,
}: {
  slug: KanbanColumnSlug;
  cards: CrmCardEnriched[];
  onCardClick: (card: CrmCardEnriched) => void;
  onDrop: (cardId: string, sourceColumn: KanbanColumnSlug) => void;
  onAddCard: () => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const config = COLUMN_CONFIG[slug];
  const Icon = config.icon;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const data = e.dataTransfer.getData('application/json');
    if (data) {
      const { cardId, sourceColumn } = JSON.parse(data) as { cardId: string; sourceColumn: KanbanColumnSlug };
      onDrop(cardId, sourceColumn);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col min-w-[280px] max-w-[320px] rounded-2xl transition-all duration-200',
        'bg-white/[0.02] border backdrop-blur-sm',
        isDragOver
          ? `${config.borderColor} ${config.bgColor}`
          : 'border-white/[0.05]',
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className={cn('h-7 w-7 rounded-lg flex items-center justify-center', config.bgColor)}>
            <Icon className={cn('h-3.5 w-3.5', config.color)} />
          </div>
          <span className="text-sm font-medium text-white">{config.label}</span>
          <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
            {cards.length}
          </span>
        </div>
        <button
          onClick={onAddCard}
          className="h-7 w-7 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors"
        >
          <Plus className="h-4 w-4 text-white/40" />
        </button>
      </div>

      {/* Cards */}
      <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-[calc(100vh-240px)] sidebar-scroll">
        <AnimatePresence>
          {cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              onClick={() => onCardClick(card)}
              columnSlug={slug}
            />
          ))}
        </AnimatePresence>

        {cards.length === 0 && (
          <div className="py-8 flex flex-col items-center justify-center text-white/20">
            <Icon className="h-8 w-8 mb-2" />
            <p className="text-xs">Nenhum lead</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ========================================
// KANBAN BOARD (MAIN EXPORT)
// ========================================

export default function KanbanBoard({ corretorId }: { corretorId: string }) {
  const {
    board,
    loading,
    selectedCard,
    drawerOpen,
    handleMoveCard,
    handleAddCard,
    openDrawer,
    closeDrawer,
    fetchBoard,
  } = useKanban(corretorId);

  const [addingTo, setAddingTo] = useState<KanbanColumnSlug | null>(null);
  const [newCardTitle, setNewCardTitle] = useState('');

  const handleQuickAdd = useCallback(async () => {
    if (!newCardTitle.trim() || !addingTo) return;
    await handleAddCard(newCardTitle.trim(), addingTo);
    setNewCardTitle('');
    setAddingTo(null);
  }, [newCardTitle, addingTo, handleAddCard]);

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="min-w-[280px] h-96 rounded-2xl bg-white/[0.02] border border-white/[0.05] animate-pulse" />
        ))}
      </div>
    );
  }

  if (!board) return null;

  const columns: KanbanColumnSlug[] = [
    'novo_lead',
    'qualificado',
    'proposta_enviada',
    'documentacao',
    'fechado',
    'perdido',
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#D4AF37]" />
            Pipeline CRM
          </h2>
          <p className="text-sm text-white/50">Arraste os cards entre as colunas</p>
        </div>
        <button
          onClick={() => setAddingTo('novo_lead')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] text-black text-sm font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all"
        >
          <Plus className="h-4 w-4" />
          Novo Lead
        </button>
      </div>

      {/* Quick Add Modal */}
      <AnimatePresence>
        {addingTo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl"
          >
            <input
              type="text"
              placeholder="Nome do lead..."
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleQuickAdd()}
              autoFocus
              className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 outline-none"
            />
            <button
              onClick={handleQuickAdd}
              className="px-4 py-2 rounded-lg bg-[#D4AF37] text-black text-sm font-medium hover:bg-[#F6E05E] transition-colors"
            >
              Adicionar
            </button>
            <button
              onClick={() => { setAddingTo(null); setNewCardTitle(''); }}
              className="px-3 py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 text-sm transition-colors"
            >
              Cancelar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kanban Columns */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((slug) => (
          <KanbanColumn
            key={slug}
            slug={slug}
            cards={board[slug] ?? []}
            onCardClick={openDrawer}
            onDrop={(cardId, sourceColumn) => {
              handleMoveCard(cardId, sourceColumn, slug, board[slug]?.length ?? 0);
            }}
            onAddCard={() => setAddingTo(slug)}
          />
        ))}
      </div>

      {/* Drawer CRM Hubspot-style */}
      <LeadDrawer
        card={selectedCard}
        isOpen={drawerOpen}
        onClose={closeDrawer}
        corretorId={corretorId}
        onUpdate={fetchBoard}
      />
    </div>
  );
}
