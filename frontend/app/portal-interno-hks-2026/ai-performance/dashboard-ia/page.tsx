'use client';

import { LuxuryTitle } from '@/components/premium';

export default function DashboardIAPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <LuxuryTitle as="h1" className="text-5xl mb-8">
          AI Performance - Dashboard
        </LuxuryTitle>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-gold p-6 rounded-2xl border-beam">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">PDFs Processados</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">2,847</div>
            <div className="text-xs text-emerald-400">↑ 340 hoje</div>
          </div>

          <div className="glass-gold p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Precisão IA</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">98.7%</div>
            <div className="text-xs text-emerald-400">↑ 0.3% vs. semana</div>
          </div>

          <div className="glass-gold p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Tempo Médio</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">4.2s</div>
            <div className="text-xs text-emerald-400">↓ 0.8s vs. semana</div>
          </div>

          <div className="glass-gold p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Economia</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">840h</div>
            <div className="text-xs text-gray-400">Tempo humano poupado</div>
          </div>
        </div>

        {/* Status da IA */}
        <div className="glass-dark p-8 rounded-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white uppercase font-cinzel">Status da IA em Tempo Real</h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 font-bold text-sm">Sistema Operacional</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Processamento Atual</div>
              <div className="text-3xl font-black text-white mb-2">12 PDFs</div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
              <div className="text-xs text-gray-400 mt-2">Fila: 3 aguardando</div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Uso de CPU</div>
              <div className="text-3xl font-black text-white mb-2">67%</div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full" style={{ width: '67%' }} />
              </div>
              <div className="text-xs text-emerald-400 mt-2">Performance: Ótima</div>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Uso de Memória</div>
              <div className="text-3xl font-black text-white mb-2">42%</div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full" style={{ width: '42%' }} />
              </div>
              <div className="text-xs text-emerald-400 mt-2">8.4GB de 20GB</div>
            </div>
          </div>
        </div>

        {/* Últimos processamentos */}
        <div className="glass-dark p-6 rounded-2xl">
          <h2 className="text-2xl font-black text-white mb-6 uppercase font-cinzel">Últimos Processamentos</h2>
          
          <div className="space-y-3">
            {[
              { pdf: 'Plano_Amil_S450_Nacional.pdf', status: 'Sucesso', tempo: '3.2s', precisao: '99.1%', timestamp: 'Há 2 min' },
              { pdf: 'SulAmerica_Empresarial_120v.pdf', status: 'Sucesso', tempo: '4.8s', precisao: '98.9%', timestamp: 'Há 5 min' },
              { pdf: 'NotreDame_Premium_Gold.pdf', status: 'Sucesso', tempo: '3.9s', precisao: '99.4%', timestamp: 'Há 8 min' },
              { pdf: 'Unimed_Familiar_Plus.pdf', status: 'Processando', tempo: '-', precisao: '-', timestamp: 'Agora' },
              { pdf: 'Bradesco_Saude_Top.pdf', status: 'Sucesso', tempo: '4.1s', precisao: '98.8%', timestamp: 'Há 12 min' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 hover:border-[#D4AF37]/30">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#bf953f] to-[#D4AF37] rounded-lg flex items-center justify-center text-white font-bold">
                    📄
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{item.pdf}</div>
                    <div className="text-gray-400 text-xs">{item.timestamp}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Sucesso' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400 animate-pulse'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-gray-400">Tempo: <span className="text-white font-bold">{item.tempo}</span></span>
                  <span className="text-gray-400">Precisão: <span className="text-[#D4AF37] font-bold">{item.precisao}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
