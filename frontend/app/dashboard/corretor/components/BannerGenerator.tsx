'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Palette,
  Sparkles,
  Phone,
  User,
  Image,
  Download,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { requestBanner } from '@/app/actions/corretor-ops';
import { toast } from 'sonner';

const TEMPLATES = [
  { id: 'saude-pme', name: 'Saúde PME', preview: '🏢', description: 'Banner para empresas' },
  { id: 'saude-individual', name: 'Saúde Individual', preview: '👤', description: 'Planos individuais' },
  { id: 'saude-adesao', name: 'Saúde Adesão', preview: '🤝', description: 'Planos por adesão' },
  { id: 'promo-black', name: 'Promoção Black', preview: '🖤', description: 'Estética Black Piano' },
  { id: 'promo-gold', name: 'Promoção Gold', preview: '✨', description: 'Estética Gold Premium' },
  { id: 'stories', name: 'Stories', preview: '📱', description: 'Formato vertical' },
];

export default function BannerGenerator({ corretorId }: { corretorId: string }) {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!nome.trim() || !whatsapp.trim()) {
      toast.error('Preencha nome e WhatsApp');
      return;
    }

    setSubmitting(true);
    const result = await requestBanner(
      corretorId,
      nome.trim(),
      whatsapp.trim(),
      selectedTemplate ?? undefined,
    );

    if (result.success) {
      toast.success('Banner solicitado! Processando...');
      // Mock: em produção, usaria polling ou Realtime para pegar a imagem
      setTimeout(() => {
        setGeneratedUrl('https://via.placeholder.com/1080x1080/0B1215/D4AF37?text=Banner+Gerado');
        setSubmitting(false);
      }, 3000);
    } else {
      toast.error(result.error ?? 'Erro ao gerar banner');
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Palette className="h-5 w-5 text-[#D4AF37]" />
          Gerador de Banners
        </h2>
        <p className="text-sm text-white/50">Crie criativos personalizados com sua identidade</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-4">
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <User className="h-4 w-4 text-[#D4AF37]" />
              Seus Dados
            </h3>

            <div>
              <label className="text-xs text-white/50 mb-1 block">Nome no Banner</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/30"
              />
            </div>

            <div>
              <label className="text-xs text-white/50 mb-1 block">WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="(21) 99999-9999"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#D4AF37]/30"
                />
              </div>
            </div>
          </div>

          {/* Templates */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Image className="h-4 w-4 text-[#D4AF37]" />
              Escolha o Template
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={cn(
                    'p-3 rounded-xl border text-left transition-all',
                    selectedTemplate === tmpl.id
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 shadow-lg shadow-[#D4AF37]/5'
                      : 'bg-white/[0.02] border-white/[0.05] hover:border-white/15',
                  )}
                >
                  <span className="text-2xl block mb-2">{tmpl.preview}</span>
                  <p className="text-xs font-medium text-white">{tmpl.name}</p>
                  <p className="text-[10px] text-white/40">{tmpl.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={submitting || !nome.trim() || !whatsapp.trim()}
            className={cn(
              'w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2',
              submitting
                ? 'bg-[#D4AF37]/50 text-black/50 cursor-wait'
                : 'bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] text-black hover:shadow-lg hover:shadow-[#D4AF37]/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
            )}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Gerar Banner HD
              </>
            )}
          </button>
        </div>

        {/* Preview */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 flex flex-col items-center justify-center min-h-[400px]">
          {generatedUrl ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/20">
                <img
                  src={generatedUrl}
                  alt="Banner gerado"
                  className="w-full max-w-[400px]"
                />
                <div className="absolute top-2 right-2">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
              </div>

              <a
                href={generatedUrl}
                download
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black text-sm font-semibold hover:bg-[#F6E05E] transition-colors"
              >
                <Download className="h-4 w-4" />
                Download HD
              </a>
            </motion.div>
          ) : (
            <div className="text-center text-white/20">
              <Palette className="h-12 w-12 mx-auto mb-3" />
              <p className="text-sm">Preview do Banner</p>
              <p className="text-xs mt-1">Preencha os dados e clique em gerar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
