'use client';

import { LuxuryTitle } from '@/components/premium';

export default function EscalaAutomaticaPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <LuxuryTitle as="h1" className="text-5xl mb-8">
          Escala Automática
        </LuxuryTitle>

        <div className="glass-gold p-8 rounded-2xl border-beam mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-white mb-2 uppercase font-cinzel">Auto Scaling Ativo</h2>
              <p className="text-gray-300">Sistema ajusta recursos automaticamente baseado na demanda</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-3xl">⚡</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-dark p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Instâncias Ativas</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">8</div>
            <div className="text-xs text-emerald-400">Escalonamento: 6 → 8 (↑33%)</div>
          </div>

          <div className="glass-dark p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Capacidade Atual</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">240/s</div>
            <div className="text-xs text-gray-400">PDFs processados por segundo</div>
          </div>

          <div className="glass-dark p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Economia</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">R$ 48k</div>
            <div className="text-xs text-emerald-400">Economizado este mês</div>
          </div>
        </div>

        <div className="glass-dark p-8 rounded-2xl">
          <h2 className="text-2xl font-black text-white mb-6 uppercase font-cinzel">Histórico de Escala (Últimas 24h)</h2>
          
          <div className="h-64 flex items-end justify-between gap-2">
            {Array.from({ length: 24 }, (_, i) => {
              const value = Math.floor(Math.random() * 6) + 4;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg hover:scale-105 transition-transform cursor-pointer relative group" 
                       style={{ height: `${(value / 10) * 100}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {value} instâncias
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {i}h
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">↑</div>
                <div className="font-bold text-white">Scale Up Events</div>
              </div>
              <div className="text-3xl font-black text-emerald-400 mb-1">12</div>
              <div className="text-xs text-gray-400">Aumentos de capacidade nas últimas 24h</div>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">↓</div>
                <div className="font-bold text-white">Scale Down Events</div>
              </div>
              <div className="text-3xl font-black text-blue-400 mb-1">8</div>
              <div className="text-xs text-gray-400">Reduções de capacidade nas últimas 24h</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
