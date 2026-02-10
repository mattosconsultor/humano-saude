'use client';

import { useState } from 'react';
import { 
  FloatingShield, 
  MetallicIcon, 
  MagneticButton, 
  StarField, 
  GlassCard, 
  BenefitGlassCard,
  LuxuryTitle 
} from '@/components/premium';
import { motion } from 'framer-motion';

export default function PremiumShowcase() {
  const [leadCaptured, setLeadCaptured] = useState(false);

  const handleLeadCapture = () => {
    setLeadCaptured(true);
    setTimeout(() => setLeadCaptured(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-hidden">
      {/* StarField Background */}
      <StarField />

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Header */}
          <div className="text-center space-y-6">
            <LuxuryTitle as="h1" className="text-5xl md:text-7xl">
              Humano Saúde
              <span className="block mt-2">Premium Components</span>
            </LuxuryTitle>
            <p className="text-white/60 text-xl max-w-3xl mx-auto">
              Componentes de nível Apple/Linear para uma experiência visual extraordinária
            </p>
          </div>

          {/* FloatingShield Demo */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-white uppercase font-cinzel text-center">
              Escudo 3D Flutuante
            </h2>
            <p className="text-white/60 text-center max-w-2xl mx-auto mb-8">
              Escudo dourado metálico com partículas orbitantes e reflexões realistas usando Three.js
            </p>
            <div className="max-w-2xl mx-auto">
              <FloatingShield />
            </div>
          </section>

          {/* MetallicIcon Gallery */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-white uppercase font-cinzel text-center">
              Ícones 3D Metálicos
            </h2>
            <p className="text-white/60 text-center max-w-2xl mx-auto mb-8">
              Sistema completo de ícones 3D com material de ouro polido e animações suaves
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {(['shield', 'heart', 'document', 'checkmark', 'star', 'lightning', 'dollar', 'users'] as const).map((icon) => (
                <motion.div
                  key={icon}
                  whileHover={{ scale: 1.1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 flex flex-col items-center gap-3"
                >
                  <MetallicIcon type={icon} size={100} />
                  <span className="text-white/80 text-sm uppercase tracking-wider font-bold">
                    {icon}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* MagneticButton Demo */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-white uppercase font-cinzel text-center">
              Botões Magnéticos
            </h2>
            <p className="text-white/60 text-center max-w-2xl mx-auto mb-8">
              Botões que reagem ao movimento do mouse com efeito de magnetismo e profundidade 3D
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <MagneticButton strength={0.5} range={150}>
                <button className="bg-gradient-to-r from-[#bf953f] via-[#ffd700] to-[#aa771c] text-slate-900 px-8 py-4 rounded-full text-sm uppercase tracking-wider font-black shadow-2xl">
                  Botão Primário
                </button>
              </MagneticButton>

              <MagneticButton strength={0.4} range={120}>
                <button className="bg-white/10 backdrop-blur-xl text-white border-2 border-white/20 px-8 py-4 rounded-full text-sm uppercase tracking-wider font-black">
                  Botão Secundário
                </button>
              </MagneticButton>

              <MagneticButton strength={0.6} range={100}>
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-2xl shadow-2xl">
                  <MetallicIcon type="heart" size={60} />
                </div>
              </MagneticButton>
            </div>
          </section>

          {/* GlassCard with Border Beam */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-white uppercase font-cinzel text-center">
              Cards Glassmorphism + Border Beam
            </h2>
            <p className="text-white/60 text-center max-w-2xl mx-auto mb-8">
              Cards com efeito de vidro fosco e animação de Border Beam dourado (ativa ao capturar lead)
            </p>
            
            <div className="max-w-md mx-auto mb-8">
              <button
                onClick={handleLeadCapture}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
              >
                🎉 Simular Captura de Lead (Border Beam)
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <GlassCard borderBeam onLeadCaptured={leadCaptured}>
                <div className="space-y-3">
                  <MetallicIcon type="shield" size={80} />
                  <h3 className="text-xl font-black text-white uppercase">Segurança</h3>
                  <p className="text-white/70">Proteção total para sua família</p>
                </div>
              </GlassCard>

              <GlassCard borderBeam onLeadCaptured={leadCaptured}>
                <div className="space-y-3">
                  <MetallicIcon type="heart" size={80} />
                  <h3 className="text-xl font-black text-white uppercase">Cuidado</h3>
                  <p className="text-white/70">Atendimento humanizado 24/7</p>
                </div>
              </GlassCard>

              <GlassCard borderBeam onLeadCaptured={leadCaptured}>
                <div className="space-y-3">
                  <MetallicIcon type="dollar" size={80} />
                  <h3 className="text-xl font-black text-white uppercase">Economia</h3>
                  <p className="text-white/70">Até 50% de desconto garantido</p>
                </div>
              </GlassCard>
            </div>
          </section>

          {/* BenefitGlassCard Component */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-white uppercase font-cinzel text-center">
              Cards de Benefícios Premium
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <BenefitGlassCard
                icon={<MetallicIcon type="lightning" size={100} />}
                title="Atendimento Instantâneo"
                description="Respostas em menos de 10 minutos através de IA avançada e equipe especializada disponível 24 horas por dia."
              />
              
              <BenefitGlassCard
                icon={<MetallicIcon type="users" size={100} />}
                title="Planos para Toda Família"
                description="Cobertura completa para você e seus dependentes com condições especiais e descontos progressivos."
              />
            </div>
          </section>

          {/* StarField Info */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-white uppercase font-cinzel text-center">
              Poeira Estelar Background
            </h2>
            <div className="max-w-2xl mx-auto">
              <GlassCard>
                <div className="space-y-4 text-white/80">
                  <p>
                    <strong className="text-[#FFD700]">StarField</strong> é um componente de background com 2.000+ estrelas douradas e 500 partículas de poeira estelar animadas com Three.js.
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Rotação automática suave da esfera de estrelas</li>
                    <li>Pulsação individual de cada estrela</li>
                    <li>Movimento browniano das partículas de poeira</li>
                    <li>Fog para efeito de profundidade espacial</li>
                    <li>Paleta de cores douradas (Gold, Pure Gold, Gold Light)</li>
                  </ul>
                  <p className="text-sm text-white/60">
                    Perfeito para dashboards premium e seções de destaque no estilo Black Piano.
                  </p>
                </div>
              </GlassCard>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center py-12">
            <MagneticButton strength={0.4} range={150}>
              <a
                href="/"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#bf953f] via-[#ffd700] to-[#aa771c] text-slate-900 px-10 py-5 rounded-full text-sm uppercase tracking-widest font-black shadow-2xl"
              >
                <MetallicIcon type="shield" size={24} />
                Voltar para Home
              </a>
            </MagneticButton>
          </div>

        </div>
      </div>
    </div>
  );
}
