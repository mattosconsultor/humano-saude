'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Building2,
  Shield,
  Save,
  Key,
  LogOut,
  Landmark,
  Lock,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  Eye,
  EyeOff,
  History,
  ArrowRight,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// ─── Bancos mais comuns ────────────────────────────────────
const BANCOS = [
  { codigo: '001', nome: 'Banco do Brasil' },
  { codigo: '033', nome: 'Santander' },
  { codigo: '104', nome: 'Caixa Econômica' },
  { codigo: '237', nome: 'Bradesco' },
  { codigo: '341', nome: 'Itaú' },
  { codigo: '260', nome: 'Nubank' },
  { codigo: '077', nome: 'Inter' },
  { codigo: '336', nome: 'C6 Bank' },
  { codigo: '212', nome: 'Banco Original' },
  { codigo: '756', nome: 'Sicoob' },
  { codigo: '748', nome: 'Sicredi' },
  { codigo: '422', nome: 'Safra' },
  { codigo: '070', nome: 'BRB' },
  { codigo: '085', nome: 'Ailos' },
  { codigo: '655', nome: 'Neon' },
  { codigo: '290', nome: 'PagBank' },
  { codigo: '380', nome: 'PicPay' },
  { codigo: '403', nome: 'Cora' },
  { codigo: '000', nome: 'Outro' },
];

interface CorretorData {
  id: string;
  nome: string;
  cpf: string | null;
  email: string;
  telefone: string | null;
  whatsapp: string | null;
  susep: string | null;
  data_admissao: string | null;
  created_at: string;
  metadata: Record<string, unknown>;
}

interface DadosBancarios {
  id: string;
  banco_codigo: string;
  banco_nome: string;
  agencia: string;
  conta: string;
  tipo_conta: string;
  titular_nome: string;
  titular_documento: string;
  tipo_chave_pix: string | null;
  chave_pix: string | null;
  ativo: boolean;
  verificado: boolean;
  created_at: string;
  desativado_em: string | null;
  desativado_motivo: string | null;
}

interface AlteracaoBancaria {
  id: string;
  banco_nome: string;
  agencia: string;
  conta: string;
  motivo: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  motivo_rejeicao: string | null;
  created_at: string;
  aprovado_em: string | null;
}

export default function PerfilPage() {
  const [corretor, setCorretor] = useState<CorretorData | null>(null);
  const [dadosBancarios, setDadosBancarios] = useState<DadosBancarios[]>([]);
  const [alteracoes, setAlteracoes] = useState<AlteracaoBancaria[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showHistorico, setShowHistorico] = useState(false);

  // Campos editáveis
  const [novoEmail, setNovoEmail] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);

  // Modal de alteração bancária
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankForm, setBankForm] = useState({
    banco_codigo: '',
    banco_nome: '',
    agencia: '',
    conta: '',
    tipo_conta: 'corrente',
    titular_nome: '',
    titular_documento: '',
    tipo_chave_pix: '',
    chave_pix: '',
    motivo: '',
  });
  const [submittingBank, setSubmittingBank] = useState(false);

  const fetchDados = useCallback(async () => {
    try {
      const res = await fetch('/api/corretor/perfil');
      const data = await res.json();
      if (data.success) {
        setCorretor(data.corretor);
        setNovoEmail(data.corretor.email);
        setDadosBancarios(data.dados_bancarios || []);
        setAlteracoes(data.alteracoes || []);
      }
    } catch (err) {
      console.error('[perfil] fetch error:', err);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchDados(); }, [fetchDados]);

  const handleSalvarEmail = async () => {
    if (!novoEmail.trim() || !novoEmail.includes('@')) {
      toast.error('E-mail inválido');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/corretor/perfil', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: novoEmail.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('E-mail atualizado com sucesso!');
        fetchDados();
      } else {
        toast.error(data.error || 'Erro ao atualizar');
      }
    } catch {
      toast.error('Erro de conexão');
    }
    setSaving(false);
  };

  const handleAlterarSenha = async () => {
    if (!senhaAtual || !novaSenha) {
      toast.error('Preencha todos os campos de senha');
      return;
    }
    if (novaSenha.length < 6) {
      toast.error('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      toast.error('As senhas não coincidem');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/corretor/perfil', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha_atual: senhaAtual, nova_senha: novaSenha }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Senha alterada com sucesso!');
        setSenhaAtual('');
        setNovaSenha('');
        setConfirmarSenha('');
      } else {
        toast.error(data.error || 'Erro ao alterar senha');
      }
    } catch {
      toast.error('Erro de conexão');
    }
    setSaving(false);
  };

  const handleSolicitarAlteracao = async () => {
    const { banco_codigo, agencia, conta, titular_nome, titular_documento, motivo } = bankForm;
    if (!banco_codigo || !agencia || !conta || !titular_nome || !titular_documento || !motivo) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    setSubmittingBank(true);
    try {
      const banco = BANCOS.find(b => b.codigo === banco_codigo);
      const res = await fetch('/api/corretor/alteracao-bancaria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          corretor_id: corretor?.id,
          ...bankForm,
          banco_nome: banco?.nome || bankForm.banco_nome || 'Outro',
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Solicitação enviada! Você será notificado por e-mail.');
        setShowBankModal(false);
        setBankForm({ banco_codigo: '', banco_nome: '', agencia: '', conta: '', tipo_conta: 'corrente', titular_nome: '', titular_documento: '', tipo_chave_pix: '', chave_pix: '', motivo: '' });
        fetchDados();
      } else {
        toast.error(data.error || 'Erro ao enviar solicitação');
      }
    } catch {
      toast.error('Erro de conexão');
    }
    setSubmittingBank(false);
  };

  const handleLogout = async () => {
    try { await fetch('/api/auth/corretor/logout', { method: 'POST' }); } catch { /* ok */ }
    window.location.href = '/dashboard/corretor/login';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 text-[#D4AF37] animate-spin" />
      </div>
    );
  }

  if (!corretor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white/30">
        <AlertCircle className="h-10 w-10 mb-3" />
        <p className="text-sm">Não foi possível carregar seus dados</p>
      </div>
    );
  }

  const contaAtiva = dadosBancarios.find(d => d.ativo);
  const contasHistorico = dadosBancarios.filter(d => !d.ativo);
  const pendenteSolicitacao = alteracoes.find(a => a.status === 'pendente');

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[800px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <User className="h-5 w-5 text-[#D4AF37]" />
          Meu Perfil
        </h1>
        <p className="text-sm text-white/40 mt-1">Seus dados e configurações</p>
      </div>

      {/* Avatar + Info */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-xl font-bold text-[#D4AF37]">
          {corretor.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
        </div>
        <div>
          <p className="text-lg font-bold text-white">{corretor.nome}</p>
          <div className="flex items-center gap-3 mt-0.5">
            {corretor.susep && (
              <span className="text-xs text-[#D4AF37] flex items-center gap-1">
                <Shield className="h-3 w-3" />
                SUSEP {corretor.susep}
              </span>
            )}
            {corretor.data_admissao && (
              <span className="text-xs text-white/30">
                Desde {new Date(corretor.data_admissao).toLocaleDateString('pt-BR')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Dados Pessoais (SOMENTE LEITURA) ──────── */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#D4AF37]" />
            Dados Pessoais
          </h3>
          <span className="text-[10px] text-white/25 flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
            <Lock className="h-3 w-3" />
            Somente leitura
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-white/50 mb-1 block">Nome Completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <div className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white/60 cursor-not-allowed">
                {corretor.nome}
              </div>
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-white/10" />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">CPF</label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <div className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white/60 cursor-not-allowed">
                {corretor.cpf || '—'}
              </div>
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-white/10" />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">WhatsApp</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <div className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white/60 cursor-not-allowed">
                {corretor.telefone || corretor.whatsapp || '—'}
              </div>
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-white/10" />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Registro SUSEP</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <div className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white/60 cursor-not-allowed">
                {corretor.susep || 'Não informado'}
              </div>
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-white/10" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
          <AlertCircle className="h-4 w-4 text-blue-400 shrink-0" />
          <p className="text-[11px] text-blue-400/80">
            Para alterar dados pessoais, entre em contato com a administração pelo e-mail{' '}
            <a href="mailto:comercial@humanosaude.com.br" className="underline font-semibold">comercial@humanosaude.com.br</a>
          </p>
        </div>
      </div>

      {/* ── E-mail (EDITÁVEL) ─────────────────────── */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Mail className="h-4 w-4 text-[#D4AF37]" />
          E-mail de Acesso
        </h3>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <input
            type="email"
            value={novoEmail}
            onChange={(e) => setNovoEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none focus:border-[#D4AF37]/30"
          />
        </div>
        {novoEmail !== corretor.email && (
          <button
            onClick={handleSalvarEmail}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] text-black text-sm font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Salvando...' : 'Salvar E-mail'}
          </button>
        )}
      </div>

      {/* ── Alterar Senha (EDITÁVEL) ───────────────── */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Key className="h-4 w-4 text-[#D4AF37]" />
          Alterar Senha
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-white/50 mb-1 block">Senha Atual</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type={showSenha ? 'text' : 'password'}
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37]/30"
              />
              <button onClick={() => setShowSenha(!showSenha)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50">
                {showSenha ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Nova Senha</label>
              <input
                type={showSenha ? 'text' : 'password'}
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37]/30"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Confirmar Nova Senha</label>
              <input
                type={showSenha ? 'text' : 'password'}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Repita a senha"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37]/30"
              />
            </div>
          </div>
          {(senhaAtual || novaSenha) && (
            <button
              onClick={handleAlterarSenha}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] text-black text-sm font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all disabled:opacity-50"
            >
              <Key className="h-4 w-4" />
              {saving ? 'Alterando...' : 'Alterar Senha'}
            </button>
          )}
        </div>
      </div>

      {/* ── Conta Bancária ────────────────────────── */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Landmark className="h-4 w-4 text-green-400" />
            Conta Bancária
          </h3>
          <span className="text-[10px] text-white/25 flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
            <Lock className="h-3 w-3" />
            Somente leitura
          </span>
        </div>

        {contaAtiva ? (
          <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.05] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-green-400" />
                <span className="text-sm text-white font-medium">{contaAtiva.banco_nome}</span>
                {contaAtiva.banco_codigo && <span className="text-[10px] text-white/25">Cód. {contaAtiva.banco_codigo}</span>}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-green-500/10 text-green-400">ATIVA</span>
                {contaAtiva.verificado && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-green-500/10 text-green-400">VERIFICADA ✓</span>}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[9px] text-white/25 uppercase block mb-0.5">Agência</span>
                <p className="text-xs text-white font-medium">{contaAtiva.agencia}</p>
              </div>
              <div>
                <span className="text-[9px] text-white/25 uppercase block mb-0.5">Conta ({contaAtiva.tipo_conta})</span>
                <p className="text-xs text-white font-medium">{contaAtiva.conta}</p>
              </div>
              {contaAtiva.titular_nome && (
                <div>
                  <span className="text-[9px] text-white/25 uppercase block mb-0.5">Titular</span>
                  <p className="text-xs text-white">{contaAtiva.titular_nome}</p>
                </div>
              )}
              {contaAtiva.chave_pix && (
                <div>
                  <span className="text-[9px] text-white/25 uppercase block mb-0.5">PIX ({contaAtiva.tipo_chave_pix})</span>
                  <p className="text-xs text-white font-mono">{contaAtiva.chave_pix}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-8 text-white/15 bg-white/[0.02] rounded-xl border border-dashed border-white/[0.06]">
            <Landmark className="h-8 w-8 mb-2" />
            <p className="text-xs">Nenhuma conta bancária cadastrada</p>
            <p className="text-[10px] text-white/10 mt-0.5">Complete o onboarding para cadastrar seus dados bancários</p>
          </div>
        )}

        {/* Botão solicitar alteração */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBankModal(true)}
            disabled={!!pendenteSolicitacao}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
              pendenteSolicitacao
                ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 cursor-not-allowed'
                : 'bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/20',
            )}
          >
            {pendenteSolicitacao ? (
              <><Clock className="h-4 w-4" /> Alteração em análise...</>
            ) : (
              <><ArrowRight className="h-4 w-4" /> Solicitar Alteração Bancária</>
            )}
          </button>
          {contasHistorico.length > 0 && (
            <button
              onClick={() => setShowHistorico(!showHistorico)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 text-white/40 text-xs hover:text-white/60 transition-colors"
            >
              <History className="h-3.5 w-3.5" />
              Histórico ({contasHistorico.length})
            </button>
          )}
        </div>

        {/* Solicitação pendente */}
        {pendenteSolicitacao && (
          <div className="rounded-xl bg-yellow-500/5 border border-yellow-500/15 p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-yellow-400 font-medium">Alteração pendente</span>
            </div>
            <p className="text-xs text-white/40 ml-6">
              Banco: {pendenteSolicitacao.banco_nome} • Ag. {pendenteSolicitacao.agencia} • Cc. {pendenteSolicitacao.conta}
            </p>
            <p className="text-[10px] text-white/25 ml-6 mt-1">
              Solicitado em {new Date(pendenteSolicitacao.created_at).toLocaleDateString('pt-BR')}
            </p>
          </div>
        )}

        {/* Histórico */}
        <AnimatePresence>
          {showHistorico && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="space-y-2 pt-2">
                <p className="text-[10px] text-white/30 uppercase font-bold flex items-center gap-1"><History className="h-3 w-3" /> Contas anteriores</p>
                {contasHistorico.map((conta) => (
                  <div key={conta.id} className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.04]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/50">{conta.banco_nome}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500/10 text-red-400">INATIVA</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div><span className="text-[9px] text-white/20 block">Agência</span><p className="text-[10px] text-white/40">{conta.agencia}</p></div>
                      <div><span className="text-[9px] text-white/20 block">Conta</span><p className="text-[10px] text-white/40">{conta.conta}</p></div>
                      <div><span className="text-[9px] text-white/20 block">Desativada em</span><p className="text-[10px] text-white/40">{conta.desativado_em ? new Date(conta.desativado_em).toLocaleDateString('pt-BR') : '—'}</p></div>
                    </div>
                  </div>
                ))}
                {alteracoes.filter(a => a.status !== 'pendente').length > 0 && (
                  <>
                    <p className="text-[10px] text-white/30 uppercase font-bold flex items-center gap-1 mt-3">Solicitações anteriores</p>
                    {alteracoes.filter(a => a.status !== 'pendente').map((alt) => (
                      <div key={alt.id} className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.04]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/50">{alt.banco_nome} • Ag. {alt.agencia} • Cc. {alt.conta}</span>
                          <span className={cn('text-[9px] font-bold px-1.5 py-0.5 rounded', alt.status === 'aprovado' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400')}>
                            {alt.status === 'aprovado' ? '✓ APROVADA' : '✕ REJEITADA'}
                          </span>
                        </div>
                        <p className="text-[10px] text-white/25 mt-1">{new Date(alt.created_at).toLocaleDateString('pt-BR')}{alt.motivo_rejeicao && ` — ${alt.motivo_rejeicao}`}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Logout */}
      <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 hover:bg-red-500/20 transition-all w-full justify-center">
        <LogOut className="h-4 w-4" /> Sair do Painel
      </button>

      {/* ── Modal: Solicitar Alteração Bancária ──── */}
      <AnimatePresence>
        {showBankModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowBankModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-[#0B1215] border border-white/[0.08] rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center"><Landmark className="h-5 w-5 text-[#D4AF37]" /></div>
                  <div>
                    <h3 className="text-base font-bold text-white">Solicitar Alteração Bancária</h3>
                    <p className="text-xs text-white/40">Preencha os dados da nova conta</p>
                  </div>
                </div>
                <button onClick={() => setShowBankModal(false)} className="text-white/30 hover:text-white"><X className="h-5 w-5" /></button>
              </div>

              <div className="p-6 space-y-4">
                {/* Aviso */}
                <div className="flex items-start gap-2 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                  <AlertCircle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-yellow-400/80 leading-relaxed">
                    Sua solicitação será analisada pela equipe administrativa. Você receberá um e-mail
                    de confirmação e outro com o resultado. Sua conta atual permanece ativa até a aprovação.
                  </p>
                </div>

                <div>
                  <label className="text-xs text-white/50 mb-1 block">Banco *</label>
                  <select value={bankForm.banco_codigo} onChange={(e) => { const b = BANCOS.find(x => x.codigo === e.target.value); setBankForm(prev => ({ ...prev, banco_codigo: e.target.value, banco_nome: b?.nome || '' })); }} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#D4AF37]/30 [&>option]:bg-[#0B1215]">
                    <option value="">Selecione o banco</option>
                    {BANCOS.map(b => <option key={b.codigo} value={b.codigo}>{b.codigo} — {b.nome}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">Agência *</label>
                    <input type="text" value={bankForm.agencia} onChange={(e) => setBankForm(prev => ({ ...prev, agencia: e.target.value }))} placeholder="0001" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37]/30" />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">Conta *</label>
                    <input type="text" value={bankForm.conta} onChange={(e) => setBankForm(prev => ({ ...prev, conta: e.target.value }))} placeholder="12345-6" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37]/30" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/50 mb-1 block">Tipo de Conta</label>
                  <div className="flex gap-2">
                    {['corrente', 'poupanca'].map(tipo => (
                      <button key={tipo} onClick={() => setBankForm(prev => ({ ...prev, tipo_conta: tipo }))} className={cn('flex-1 py-2 rounded-xl text-xs font-medium border transition-all', bankForm.tipo_conta === tipo ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]' : 'bg-white/5 border-white/10 text-white/50 hover:text-white/70')}>
                        {tipo === 'corrente' ? 'Corrente' : 'Poupança'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">Nome do Titular *</label>
                    <input type="text" value={bankForm.titular_nome} onChange={(e) => setBankForm(prev => ({ ...prev, titular_nome: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37]/30" />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">CPF/CNPJ do Titular *</label>
                    <input type="text" value={bankForm.titular_documento} onChange={(e) => setBankForm(prev => ({ ...prev, titular_documento: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37]/30" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">Tipo Chave PIX</label>
                    <select value={bankForm.tipo_chave_pix} onChange={(e) => setBankForm(prev => ({ ...prev, tipo_chave_pix: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#D4AF37]/30 [&>option]:bg-[#0B1215]">
                      <option value="">Nenhum</option>
                      <option value="cpf">CPF</option>
                      <option value="cnpj">CNPJ</option>
                      <option value="email">E-mail</option>
                      <option value="telefone">Telefone</option>
                      <option value="aleatoria">Chave Aleatória</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-white/50 mb-1 block">Chave PIX</label>
                    <input type="text" value={bankForm.chave_pix} onChange={(e) => setBankForm(prev => ({ ...prev, chave_pix: e.target.value }))} placeholder="Sua chave PIX" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37]/30" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/50 mb-1 block">Motivo da Alteração *</label>
                  <textarea value={bankForm.motivo} onChange={(e) => setBankForm(prev => ({ ...prev, motivo: e.target.value }))} placeholder="Ex: Mudança de banco principal, conta encerrada, etc." rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37]/30 resize-none" />
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowBankModal(false)} className="flex-1 py-2.5 rounded-xl bg-white/5 text-white/50 text-sm hover:text-white transition-colors">Cancelar</button>
                  <button onClick={handleSolicitarAlteracao} disabled={submittingBank} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] text-black text-sm font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all disabled:opacity-50">
                    {submittingBank ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                    {submittingBank ? 'Enviando...' : 'Enviar Solicitação'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
