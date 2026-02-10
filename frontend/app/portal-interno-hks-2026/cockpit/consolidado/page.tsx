'use client';

import { LuxuryTitle } from '@/components/premium';

export default function ConsolidadoPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <LuxuryTitle as="h1" className="text-5xl mb-8">
          Cockpit - Consolidado
        </LuxuryTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-gold p-6 rounded-2xl border-beam">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Total de Leads</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">1,847</div>
            <div className="text-xs text-emerald-400">↑ 23% vs. período anterior</div>
          </div>

          <div className="glass-gold p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Taxa de Conversão</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">18.4%</div>
            <div className="text-xs text-emerald-400">↑ 2.8% vs. período anterior</div>
          </div>

          <div className="glass-gold p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Receita Total</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">R$ 2.4M</div>
            <div className="text-xs text-emerald-400">↑ 31% vs. período anterior</div>
          </div>

          <div className="glass-gold p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">ROI Global</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">6.2x</div>
            <div className="text-xs text-emerald-400">↑ 1.4x vs. período anterior</div>
          </div>
        </div>

        {/* Gráfico consolidado */}
        <div className="glass-dark p-8 rounded-2xl mb-8">
          <h2 className="text-2xl font-black text-white mb-6 uppercase font-cinzel">Performance Consolidada (Últimos 6 Meses)</h2>
          <div className="h-80 flex items-end justify-between gap-4">
            {[42, 58, 67, 75, 83, 96].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-[#bf953f] via-[#D4AF37] to-[#F6E05E] rounded-t-xl hover:scale-105 transition-transform cursor-pointer" 
                     style={{ height: `${value}%` }}>
                  <div className="text-white font-bold text-sm text-center mt-2">{value}%</div>
                </div>
                <div className="text-xs text-gray-400 uppercase">
                  {['Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Canais de origem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-dark p-6 rounded-2xl">
            <h3 className="text-xl font-black text-white mb-4 uppercase font-cinzel">Canais de Origem</h3>
            <div className="space-y-3">
              {[
                { canal: 'Meta Ads', leads: 847, percent: 45.9 },
                { canal: 'Google Ads', leads: 532, percent: 28.8 },
                { canal: 'Orgânico', leads: 312, percent: 16.9 },
                { canal: 'WhatsApp', leads: 156, percent: 8.4 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300 font-bold">{item.canal}</span>
                    <span className="text-[#D4AF37] font-black">{item.leads} leads ({item.percent}%)</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#bf953f] to-[#D4AF37] h-full rounded-full transition-all duration-500" 
                         style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-dark p-6 rounded-2xl">
            <h3 className="text-xl font-black text-white mb-4 uppercase font-cinzel">Top Produtos</h3>
            <div className="space-y-3">
              {[
                { produto: 'Plano Individual Premium', vendas: 'R$ 890k' },
                { produto: 'Plano Familiar Gold', vendas: 'R$ 720k' },
                { produto: 'Plano Empresarial', vendas: 'R$ 580k' },
                { produto: 'Plano Individual Básico', vendas: 'R$ 210k' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer">
                  <span className="text-gray-300 font-bold text-sm">{item.produto}</span>
                  <span className="text-[#D4AF37] font-black text-lg">{item.vendas}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
