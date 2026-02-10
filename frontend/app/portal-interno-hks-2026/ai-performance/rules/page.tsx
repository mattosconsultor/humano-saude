'use client';

import { LuxuryTitle } from '@/components/premium';

export default function RulesPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <LuxuryTitle as="h1" className="text-5xl mb-8">
          Regras de IA
        </LuxuryTitle>

        <div className="glass-dark p-6 rounded-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white uppercase font-cinzel">Regras Ativas</h2>
            <button className="bg-gradient-to-r from-[#bf953f] to-[#D4AF37] text-white px-6 py-3 rounded-full text-sm font-black uppercase hover:scale-105 transition-transform">
              + Nova Regra
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                nome: 'Priorizar Empresas',
                descricao: 'PDFs de planos empresariais têm prioridade máxima na fila',
                status: 'Ativa',
                aplicacoes: 847,
              },
              {
                nome: 'Reprocessar Falhas',
                descricao: 'PDFs com precisão < 95% são reprocessados automaticamente',
                status: 'Ativa',
                aplicacoes: 23,
              },
              {
                nome: 'Notificar Anomalias',
                descricao: 'Alertar equipe quando tempo de processamento > 10s',
                status: 'Ativa',
                aplicacoes: 12,
              },
              {
                nome: 'Backup Automático',
                descricao: 'Salvar cópia de todos os PDFs processados no S3',
                status: 'Ativa',
                aplicacoes: 2847,
              },
              {
                nome: 'Validação Premium',
                descricao: 'Aplicar validação extra em planos acima de R$ 5.000',
                status: 'Pausada',
                aplicacoes: 0,
              },
            ].map((regra, i) => (
              <div key={i} className="bg-white/5 hover:bg-white/10 p-6 rounded-xl transition-all border border-white/10 hover:border-[#D4AF37]/30">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-black text-white">{regra.nome}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        regra.status === 'Ativa' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {regra.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{regra.descricao}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Aplicada <span className="text-[#D4AF37] font-bold">{regra.aplicacoes}x</span> hoje</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all text-white">
                      ⚙️
                    </button>
                    <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all text-white">
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
