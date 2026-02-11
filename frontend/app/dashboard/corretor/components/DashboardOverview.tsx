'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Trophy,
  DollarSign,
  CalendarClock,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CorretorDashboard } from '@/lib/types/corretor';
import { useCorretorDashboard, useRenovacoes } from '../hooks/useCorretorData';

// ========================================
// GLASS CARD
// ========================================

function GlassCard({
  children,
  className,
  gold = false,
}: {
  children: React.ReactNode;
  className?: string;
  gold?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'rounded-2xl border backdrop-blur-xl p-5 relative overflow-hidden',
        gold
          ? 'bg-[#D4AF37]/5 border-[#D4AF37]/20 shadow-lg shadow-[#D4AF37]/5'
          : 'bg-white/[0.03] border-white/[0.08]',
        className,
      )}
    >
      {gold && (
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      )}
      {children}
    </motion.div>
  );
}

// ========================================
// BIG NUMBER CARD
// ========================================

function BigNumber({
  label,
  value,
  icon: Icon,
  trend,
  color = 'white',
  prefix,
  delay = 0,
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  color?: 'white' | 'gold' | 'green' | 'blue' | 'red';
  prefix?: string;
  delay?: number;
}) {
  const colorMap = {
    white: { bg: 'bg-white/5', icon: 'text-white/60', text: 'text-white' },
    gold: { bg: 'bg-[#D4AF37]/10', icon: 'text-[#D4AF37]', text: 'text-[#D4AF37]' },
    green: { bg: 'bg-green-500/10', icon: 'text-green-400', text: 'text-green-400' },
    blue: { bg: 'bg-blue-500/10', icon: 'text-blue-400', text: 'text-blue-400' },
    red: { bg: 'bg-red-500/10', icon: 'text-red-400', text: 'text-red-400' },
  };

  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-5 relative overflow-hidden group hover:border-white/15 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center', c.bg)}>
          <Icon className={cn('h-5 w-5', c.icon)} />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
            <ArrowUpRight className="h-3 w-3" />
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className={cn('text-2xl font-bold tracking-tight', c.text)}>
          {prefix}{typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
        </p>
        <p className="text-sm text-white/50 mt-1">{label}</p>
      </div>
    </motion.div>
  );
}

// ========================================
// DASHBOARD PAGE COMPONENT
// ========================================

export default function CorretorDashboardPage({ corretorId }: { corretorId: string }) {
  const { dashboard, loading } = useCorretorDashboard(corretorId);
  const { vencendo30d, vencendo60d } = useRenovacoes(corretorId);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-white/[0.03] border border-white/[0.08] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const d = dashboard;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#D4AF37]" />
            Dashboard
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Bem-vindo, {d?.corretor_nome ?? 'Corretor'}
          </p>
        </div>
      </div>

      {/* Big Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <BigNumber
          label="Leads Novos"
          value={d?.leads_novos ?? 0}
          icon={Users}
          color="blue"
          delay={0}
        />
        <BigNumber
          label="Propostas Enviadas"
          value={d?.propostas_enviadas ?? 0}
          icon={TrendingUp}
          color="gold"
          delay={0.1}
        />
        <BigNumber
          label="Fechados"
          value={d?.fechados ?? 0}
          icon={Trophy}
          color="green"
          delay={0.2}
        />
        <BigNumber
          label="Comissão Pendente"
          value={(d?.comissao_pendente ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          icon={DollarSign}
          color="gold"
          prefix="R$ "
          delay={0.3}
        />
      </div>

      {/* Alertas de Renovação */}
      {(vencendo30d.length > 0 || vencendo60d.length > 0) && (
        <GlassCard gold>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <CalendarClock className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Renovações Pendentes</h3>
              <p className="text-xs text-white/50">Contratos próximos do vencimento</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {vencendo30d.length > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-400">{vencendo30d.length} vencendo em 30 dias</p>
                  <p className="text-xs text-white/40">Ação imediata necessária</p>
                </div>
              </div>
            )}
            {vencendo60d.length > 0 && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <CalendarClock className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-400">{vencendo60d.length} vencendo em 60 dias</p>
                  <p className="text-xs text-white/40">Planejar contato</p>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      )}

      {/* Resumo de Produção */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard>
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#D4AF37]" />
            Pipeline
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Novos', value: d?.leads_novos ?? 0, color: 'bg-blue-500' },
              { label: 'Qualificados', value: d?.leads_qualificados ?? 0, color: 'bg-purple-500' },
              { label: 'Proposta Enviada', value: d?.propostas_enviadas ?? 0, color: 'bg-yellow-500' },
              { label: 'Fechados', value: d?.fechados ?? 0, color: 'bg-green-500' },
              { label: 'Perdidos', value: d?.perdidos ?? 0, color: 'bg-red-500' },
            ].map((item) => {
              const total = (d?.leads_novos ?? 0) + (d?.leads_qualificados ?? 0) +
                (d?.propostas_enviadas ?? 0) + (d?.fechados ?? 0) + (d?.perdidos ?? 0);
              const pct = total > 0 ? (item.value / total) * 100 : 0;
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-xs text-white/50 w-28 truncate">{item.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={cn('h-full rounded-full', item.color)}
                    />
                  </div>
                  <span className="text-xs text-white/70 w-8 text-right">{item.value}</span>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard gold>
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-[#D4AF37]" />
            Financeiro
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <span className="text-sm text-white/70">Comissão Recebida</span>
              <span className="text-lg font-bold text-green-400">
                R$ {(d?.comissao_recebida ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <span className="text-sm text-white/70">Comissão Pendente</span>
              <span className="text-lg font-bold text-yellow-400">
                R$ {(d?.comissao_pendente ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-sm text-white/70">Renovações 30d</span>
              <span className="text-lg font-bold text-[#D4AF37]">
                {d?.renovacoes_30d ?? 0}
              </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
