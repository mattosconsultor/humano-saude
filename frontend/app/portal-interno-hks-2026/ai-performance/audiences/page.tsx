'use client';

import { LuxuryTitle } from '@/components/premium';

export default function AudiencesPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <LuxuryTitle as="h1" className="text-5xl mb-8">
          Audiências IA
        </LuxuryTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-gold p-6 rounded-2xl border-beam">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Audiências Criadas</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">247</div>
            <div className="text-xs text-emerald-400">↑ 18 esta semana</div>
          </div>

          <div className="glass-gold p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Leads Segmentados</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">12.4k</div>
            <div className="text-xs text-gray-400">Distribuídos em 247 grupos</div>
          </div>

          <div className="glass-gold p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Taxa de Conversão</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">24.8%</div>
            <div className="text-xs text-emerald-400">↑ 3.2% com segmentação IA</div>
          </div>
        </div>

        <div className="glass-dark p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white uppercase font-cinzel">Suas Audiências</h2>
            <button className="bg-gradient-to-r from-[#bf953f] to-[#D4AF37] text-white px-6 py-3 rounded-full text-sm font-black uppercase hover:scale-105 transition-transform">
              + Criar Audiência
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { nome: 'Empresas Tech', leads: 1240, conv: '31.2%', valor: 'R$ 8.500', cor: 'from-blue-500 to-blue-600' },
              { nome: 'Famílias Premium', leads: 2150, conv: '28.4%', valor: 'R$ 2.800', cor: 'from-purple-500 to-purple-600' },
              { nome: 'Profissionais Liberais', leads: 890, conv: '22.1%', valor: 'R$ 1.200', cor: 'from-emerald-500 to-emerald-600' },
              { nome: 'Aposentados', leads: 1820, conv: '19.8%', valor: 'R$ 1.500', cor: 'from-orange-500 to-orange-600' },
              { nome: 'Startups', leads: 670, conv: '35.7%', valor: 'R$ 4.200', cor: 'from-pink-500 to-pink-600' },
              { nome: 'Alto Valor', leads: 340, conv: '41.2%', valor: 'R$ 15.000', cor: 'from-yellow-500 to-yellow-600' },
            ].map((audiencia, i) => (
              <div key={i} className="bg-white/5 hover:bg-white/10 p-6 rounded-xl transition-all border border-white/10 hover:border-[#D4AF37]/30 cursor-pointer group">
                <div className={`w-12 h-12 bg-gradient-to-br ${audiencia.cor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-black text-white mb-3">{audiencia.nome}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Leads:</span>
                    <span className="text-white font-bold">{audiencia.leads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conversão:</span>
                    <span className="text-emerald-400 font-bold">{audiencia.conv}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ticket Médio:</span>
                    <span className="text-[#D4AF37] font-bold">{audiencia.valor}</span>
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
