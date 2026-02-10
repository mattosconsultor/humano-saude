'use client';

import { LuxuryTitle } from '@/components/premium';

export default function CampanhasPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <LuxuryTitle as="h1" className="text-5xl mb-8">
          Cockpit - Campanhas
        </LuxuryTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Métricas principais */}
          <div className="glass-gold p-6 rounded-2xl border-beam">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Campanhas Ativas</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">24</div>
            <div className="text-xs text-emerald-400">↑ 12% vs. mês anterior</div>
          </div>

          <div className="glass-gold p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">ROI Médio</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">4.8x</div>
            <div className="text-xs text-emerald-400">↑ 0.8x vs. mês anterior</div>
          </div>

          <div className="glass-gold p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Investimento Total</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">R$ 180k</div>
            <div className="text-xs text-gray-400">Distribuído em 24 campanhas</div>
          </div>
        </div>

        {/* Lista de campanhas */}
        <div className="glass-dark p-6 rounded-2xl">
          <h2 className="text-2xl font-black text-white mb-6 uppercase font-cinzel">Suas Campanhas</h2>
          
          <div className="space-y-4">
            {[
              { nome: 'Black Friday Saúde', status: 'Ativa', budget: 'R$ 25k', roi: '5.2x', leads: 340 },
              { nome: 'Planos Empresariais Q1', status: 'Ativa', budget: 'R$ 32k', roi: '4.8x', leads: 280 },
              { nome: 'Campanha Verão Família', status: 'Pausada', budget: 'R$ 18k', roi: '3.9x', leads: 195 },
              { nome: 'Natal Premium 2025', status: 'Planejamento', budget: 'R$ 40k', roi: '-', leads: 0 },
            ].map((campanha, i) => (
              <div key={i} className="bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all duration-300 cursor-pointer border border-white/10 hover:border-[#D4AF37]/30">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{campanha.nome}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        campanha.status === 'Ativa' ? 'bg-emerald-500/20 text-emerald-400' :
                        campanha.status === 'Pausada' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {campanha.status}
                      </span>
                      <span className="text-gray-400">Budget: <span className="text-[#D4AF37] font-bold">{campanha.budget}</span></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-center">
                    <div>
                      <div className="text-2xl font-black text-[#D4AF37]">{campanha.roi}</div>
                      <div className="text-xs text-gray-400">ROI</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">{campanha.leads}</div>
                      <div className="text-xs text-gray-400">Leads</div>
                    </div>
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
