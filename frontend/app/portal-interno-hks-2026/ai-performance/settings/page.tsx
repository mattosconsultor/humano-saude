'use client';

import { LuxuryTitle } from '@/components/premium';

export default function AISettingsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <LuxuryTitle as="h1" className="text-5xl mb-8">
          Configurações de IA
        </LuxuryTitle>

        <div className="space-y-6">
          {/* Modelo de IA */}
          <div className="glass-dark p-6 rounded-2xl">
            <h2 className="text-xl font-black text-white mb-4 uppercase font-cinzel">Modelo de IA</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-[#D4AF37]/30">
                <div>
                  <div className="text-white font-bold mb-1">GPT-4 Turbo Vision</div>
                  <div className="text-gray-400 text-sm">Modelo atual para análise de PDFs</div>
                </div>
                <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold">Ativo</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                  <div className="text-white font-bold mb-1">Claude 3 Opus</div>
                  <div className="text-gray-400 text-sm">Alternativa disponível</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                  <div className="text-white font-bold mb-1">Gemini 1.5 Pro</div>
                  <div className="text-gray-400 text-sm">Alternativa disponível</div>
                </div>
              </div>
            </div>
          </div>

          {/* Limites e Performance */}
          <div className="glass-dark p-6 rounded-2xl">
            <h2 className="text-xl font-black text-white mb-4 uppercase font-cinzel">Limites e Performance</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm font-bold mb-2 block">PDFs por Segundo</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    defaultValue="30" 
                    className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-[#bf953f] [&::-webkit-slider-thumb]:to-[#D4AF37]" 
                  />
                  <span className="text-[#D4AF37] font-black text-xl w-12">30</span>
                </div>
              </div>

              <div>
                <label className="text-gray-300 text-sm font-bold mb-2 block">Precisão Mínima (%)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="80" 
                    max="100" 
                    defaultValue="95" 
                    className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-[#bf953f] [&::-webkit-slider-thumb]:to-[#D4AF37]" 
                  />
                  <span className="text-[#D4AF37] font-black text-xl w-12">95%</span>
                </div>
              </div>

              <div>
                <label className="text-gray-300 text-sm font-bold mb-2 block">Timeout (segundos)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="5" 
                    max="30" 
                    defaultValue="15" 
                    className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-[#bf953f] [&::-webkit-slider-thumb]:to-[#D4AF37]" 
                  />
                  <span className="text-[#D4AF37] font-black text-xl w-12">15s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notificações */}
          <div className="glass-dark p-6 rounded-2xl">
            <h2 className="text-xl font-black text-white mb-4 uppercase font-cinzel">Notificações</h2>
            <div className="space-y-3">
              {[
                { label: 'Alertar quando processamento falhar', checked: true },
                { label: 'Notificar quando precisão < 95%', checked: true },
                { label: 'Alertar sobre uso excessivo de recursos', checked: true },
                { label: 'Resumo diário de performance', checked: false },
                { label: 'Notificar quando fila > 100 PDFs', checked: true },
              ].map((item, i) => (
                <label key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked={item.checked}
                    className="w-5 h-5 rounded bg-white/10 border-2 border-white/20 checked:bg-gradient-to-r checked:from-[#bf953f] checked:to-[#D4AF37] checked:border-[#D4AF37] cursor-pointer" 
                  />
                  <span className="text-white font-bold text-sm">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-4">
            <button className="flex-1 bg-gradient-to-r from-[#bf953f] to-[#D4AF37] text-white px-8 py-4 rounded-full text-sm font-black uppercase hover:scale-105 transition-transform">
              Salvar Configurações
            </button>
            <button className="px-8 py-4 bg-white/10 text-white rounded-full text-sm font-black uppercase hover:bg-white/20 transition-all">
              Restaurar Padrões
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
