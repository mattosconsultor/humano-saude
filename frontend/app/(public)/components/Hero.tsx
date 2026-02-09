'use client';

import { useState } from 'react';
import { trackLeadGeneration } from '@/app/lib/metaPixel';
import { trackGTMLeadSubmission } from '@/app/components/GoogleTagManager';
import { trackLeadSubmission } from '@/app/components/GoogleAnalytics';

export default function Hero() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    perfil: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validação básica
    const newErrors: Record<string, string> = {};
    if (!formData.nome || formData.nome.length < 2) newErrors.nome = 'Nome inválido';
    if (!formData.email || !formData.email.includes('@')) newErrors.email = 'Email inválido';
    if (!formData.telefone || formData.telefone.length < 10) newErrors.telefone = 'Telefone inválido';
    if (!formData.perfil) newErrors.perfil = 'Selecione um perfil';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Meta Pixel Tracking
        trackLeadGeneration({
          leadId: data.leadId,
          nome: formData.nome,
          operadora: 'Landing Hero',
          valorAtual: 0,
          valorProposto: 0,
          economiaEstimada: 0,
        });

        // ✅ Google Tag Manager Tracking
        trackGTMLeadSubmission({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          perfil: formData.perfil,
        });

        // ✅ Google Analytics Tracking
        trackLeadSubmission({
          nome: formData.nome,
          perfil: formData.perfil,
          source: 'hero_form',
        });

        // Redirecionar para página de sucesso
        window.location.href = '/obrigado';
      } else {
        alert('Erro ao enviar: ' + data.error);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white min-h-screen lg:min-h-[90vh] flex pt-32 lg:pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        
        {/* ✅ Coluna Esquerda: Conteúdo */}
        <div className="text-left max-w-[620px]">
          <h2 className="text-[10px] lg:text-xs font-bold uppercase tracking-[4px] mb-6 italic bg-gradient-to-r from-[#bf953f] to-[#aa771c] bg-clip-text text-transparent">
            Especialistas em redução de custos
          </h2>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-[1.2] font-cinzel">
            <span className="block">Reduza até <span className="bg-gradient-to-r from-[#bf953f] to-[#aa771c] bg-clip-text text-transparent">50%</span></span>
            <span className="block">do custo em plano de saúde</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-lg font-medium leading-[1.6] mb-8">
            Em 10 minutos, nossa <span className="bg-gradient-to-r from-[#bf953f] to-[#aa771c] bg-clip-text text-transparent font-bold">Inteligência Artificial</span> analisa planos em diversas operadoras e apresenta opções mais eficientes, mantendo os hospitais e laboratórios que realmente importam.
          </p>

          {/* ✅ Bullets com ícones 3D */}
          <ul className="space-y-4 max-w-lg text-gray-800">
            {[
              { icon: '👥', text: 'Para planos individuais e familiares', gradient: 'from-blue-500 to-cyan-500' },
              { icon: '🏢', text: 'Para empresas e MEI (a partir de 2 vidas)', gradient: 'from-purple-500 to-pink-500' },
              { icon: '🤖', text: 'Sistema integrado com Inteligência Artificial', gradient: 'from-amber-500 to-orange-500' },
              { icon: '⏱️', text: 'Análise rápida em até 10 minutos', gradient: 'from-green-500 to-emerald-500' },
              { icon: '📅', text: 'Sua redução aplicada em até 7 dias', gradient: 'from-red-500 to-rose-500' },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 group">
                {/* Ícone 3D com glassmorphism */}
                <div className="relative flex-shrink-0">
                  {/* Sombra/glow do ícone */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
                  
                  {/* Container do ícone */}
                  <div className={`relative w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <span className="text-2xl filter drop-shadow-md">{item.icon}</span>
                  </div>
                </div>
                
                {/* Texto */}
                <p className="text-base font-medium group-hover:text-[#bf953f] transition-colors duration-300">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Coluna Direita: Formulário */}
        <div className="bg-gray-50 p-6 md:p-14 rounded-[2.5rem] lg:rounded-[3.5rem] border border-gray-100 shadow-2xl">
          <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase italic mb-6 font-cinzel">
            <span className="bg-gradient-to-r from-[#bf953f] to-[#aa771c] bg-clip-text text-transparent">
              Cotação Especializada
            </span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome */}
            <div>
              <label className="block uppercase text-gray-400 font-bold mb-1 text-xs tracking-widest">
                Nome ou empresa
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex: João Silva ou Empresa X"
                className="w-full p-4 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#bf953f]"
                required
              />
              {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block uppercase text-gray-400 font-bold mb-1 text-xs tracking-widest">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex: nome@empresa.com"
                className="w-full p-4 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#bf953f]"
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Telefone */}
            <div>
              <label className="block uppercase text-gray-400 font-bold mb-1 text-xs tracking-widest">
                WhatsApp
              </label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Ex: 21 98888-7777"
                className="w-full p-4 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#bf953f]"
                required
              />
              {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
            </div>

            {/* Perfil */}
            <div>
              <label className="block uppercase text-gray-400 font-bold mb-1 text-xs tracking-widest">
                Perfil
              </label>
              <select
                name="perfil"
                value={formData.perfil}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#bf953f]"
                required
              >
                <option value="">Selecione</option>
                <option value="Individual">Individual</option>
                <option value="Familiar">Familiar</option>
                <option value="Empresarial">Empresarial</option>
              </select>
              {errors.perfil && <p className="text-red-500 text-xs mt-1">{errors.perfil}</p>}
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#bf953f] to-[#aa771c] w-full py-5 rounded-2xl uppercase text-xs tracking-[3px] font-black flex items-center justify-center gap-3 text-white disabled:opacity-50 hover:shadow-xl transition-all"
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar cotação'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>

            <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest italic">
              Retorno em até 10 min
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
