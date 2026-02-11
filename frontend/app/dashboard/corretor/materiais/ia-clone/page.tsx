'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Upload, Wand2, Download, RefreshCw, Sparkles, Image as ImageIcon,
  ArrowRight, CheckCircle, Loader2, AlertCircle, Eye, Zap,
} from 'lucide-react';
import NextImage from 'next/image';
import { toast } from 'sonner';
import { useCorretorId } from '../../hooks/useCorretorToken';

/* ═══════════ TYPES ═══════════ */
interface AnalysisResult {
  headline: string;
  mensagem: string;
  cta: string;
  cores: string[];
  dicas: string[];
  layout: string;
}

/* ═══════════ OPERADORAS ═══════════ */
const OPERADORAS = [
  { id: 'amil', nome: 'Amil' },
  { id: 'sulamerica', nome: 'SulAmérica' },
  { id: 'bradesco', nome: 'Bradesco Saúde' },
  { id: 'porto', nome: 'Porto Saúde' },
  { id: 'assim', nome: 'Assim Saúde' },
  { id: 'levesaude', nome: 'Leve Saúde' },
  { id: 'unimed', nome: 'Unimed' },
  { id: 'preventsenior', nome: 'Prevent Senior' },
  { id: 'medsenior', nome: 'MedSenior' },
];

/* ═══════════ PAGE ═══════════ */
export default function IAClonePage() {
  const corretorId = useCorretorId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [fileName, setFileName] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState('');

  /* Campos de personalização */
  const [operadora, setOperadora] = useState('amil');
  const [plano, setPlano] = useState('');
  const [preco, setPreco] = useState('');
  const [nomeCorretor, setNomeCorretor] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instrucao, setInstrucao] = useState('');

  /* ── Upload handler ── */
  const handleUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Envie apenas imagens (JPG, PNG, WebP)');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Imagem muito grande. Máximo 10MB.');
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setAnalysis(null);
      setGeneratedHtml('');
    };
    reader.readAsDataURL(file);
  }, []);

  /* ── Drag & Drop ── */
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  /* ── Analisar com IA ── */
  const analyzeImage = async () => {
    if (!uploadedImage) return;
    setAnalyzing(true);
    setAnalysis(null);
    try {
      const res = await fetch('/api/corretor/banners/ai-clone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze',
          imageBase64: uploadedImage,
          operadora,
          plano,
          preco,
          instrucao,
        }),
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
        toast.success('✨ Análise concluída!');
      } else {
        toast.error(data.error || 'Erro na análise');
      }
    } catch {
      toast.error('Erro de conexão com IA');
    } finally {
      setAnalyzing(false);
    }
  };

  /* ── Gerar versão clonada ── */
  const generateClone = async () => {
    if (!uploadedImage || !analysis) return;
    setGenerating(true);
    setGeneratedHtml('');
    try {
      const res = await fetch('/api/corretor/banners/ai-clone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          imageBase64: uploadedImage,
          analysis,
          operadora,
          plano,
          preco,
          nomeCorretor,
          whatsapp,
          instrucao,
        }),
      });
      const data = await res.json();
      if (data.success && data.html) {
        setGeneratedHtml(data.html);
        toast.success('🎨 Criativo clonado gerado!');
      } else {
        toast.error(data.error || 'Erro ao gerar');
      }
    } catch {
      toast.error('Erro de conexão');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              IA Clone
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold">BETA</span>
            </h1>
            <p className="text-gray-500 text-xs">Envie uma imagem de anúncio e a IA clona com sua personalização</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ════════ COLUNA ESQUERDA ════════ */}
        <div className="space-y-4">
          {/* Guia */}
          <div className="bg-gradient-to-r from-purple-600/10 to-transparent border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-bold text-sm">Como funciona</span>
            </div>
            <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
              <li>Envie a imagem do anúncio que quer clonar/melhorar</li>
              <li>Preencha sua operadora, plano e dados</li>
              <li>A IA analisa layout, cores, texto e estilo do anúncio</li>
              <li>Gera uma versão personalizada com seus dados</li>
            </ol>
          </div>

          {/* Upload */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#D4AF37]" />
              Imagem de Referência
            </h3>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-700 hover:border-purple-500/50 rounded-xl p-8 text-center cursor-pointer transition-all hover:bg-purple-500/5"
            >
              {uploadedImage ? (
                <div className="space-y-3">
                  <div className="relative w-full max-w-[300px] mx-auto aspect-[9/16] rounded-lg overflow-hidden">
                    <NextImage src={uploadedImage} alt="Upload" fill className="object-contain" unoptimized />
                  </div>
                  <p className="text-gray-400 text-xs">{fileName}</p>
                  <p className="text-purple-400 text-xs">Clique para trocar</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <ImageIcon className="w-12 h-12 text-gray-600 mx-auto" />
                  <p className="text-gray-400 text-sm font-medium">Arraste uma imagem ou clique para enviar</p>
                  <p className="text-gray-600 text-xs">JPG, PNG ou WebP • Máx. 10MB</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
          </div>

          {/* Personalização */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#D4AF37]" />
              Personalização
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-500 text-[10px] uppercase mb-1 block">Operadora</label>
                  <select value={operadora} onChange={(e) => setOperadora(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:border-purple-500 outline-none">
                    {OPERADORAS.map((o) => (
                      <option key={o.id} value={o.id}>{o.nome}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 text-[10px] uppercase mb-1 block">Nome do Plano</label>
                  <input value={plano} onChange={(e) => setPlano(e.target.value)} placeholder="Ex: Essencial II"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:border-purple-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-500 text-[10px] uppercase mb-1 block">Preço a partir de</label>
                  <input value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="R$ 199,90"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:border-purple-500 outline-none" />
                </div>
                <div>
                  <label className="text-gray-500 text-[10px] uppercase mb-1 block">Seu Nome</label>
                  <input value={nomeCorretor} onChange={(e) => setNomeCorretor(e.target.value)} placeholder="Seu nome"
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:border-purple-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="text-gray-500 text-[10px] uppercase mb-1 block">WhatsApp</label>
                <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="(21) 99999-9999"
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:border-purple-500 outline-none" />
              </div>
              <div>
                <label className="text-gray-500 text-[10px] uppercase mb-1 block">Instrução Adicional (Opcional)</label>
                <textarea value={instrucao} onChange={(e) => setInstrucao(e.target.value)} rows={2}
                  placeholder="Ex: Use cores mais vibrantes, destaque a economia, mantenha o estilo minimalista..."
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white resize-none placeholder:text-gray-500 focus:border-purple-500 outline-none" />
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-4 space-y-3">
            <button onClick={analyzeImage} disabled={!uploadedImage || analyzing}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-sm hover:opacity-90 transition disabled:opacity-50">
              {analyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
              {analyzing ? 'Analisando...' : '1. Analisar Anúncio com IA'}
            </button>
            {analysis && (
              <button onClick={generateClone} disabled={generating}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#D4AF37] to-[#b8960c] text-black rounded-lg font-bold text-sm hover:opacity-90 transition disabled:opacity-50">
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                {generating ? 'Gerando...' : '2. Gerar Versão Clonada'}
              </button>
            )}
          </div>
        </div>

        {/* ════════ COLUNA DIREITA — RESULTADOS ════════ */}
        <div className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          {/* Resultado da Análise */}
          {analysis && (
            <div className="bg-[#111] border border-purple-500/30 rounded-xl p-4">
              <h3 className="text-purple-400 font-semibold text-sm mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Análise do Anúncio
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 text-[10px] uppercase">Headline Detectada</span>
                  <p className="text-white text-sm font-medium">{analysis.headline}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase">Mensagem</span>
                  <p className="text-white/80 text-xs">{analysis.mensagem}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase">CTA</span>
                  <p className="text-[#D4AF37] text-sm font-bold">{analysis.cta}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase">Layout</span>
                  <p className="text-white/60 text-xs">{analysis.layout}</p>
                </div>
                {analysis.cores.length > 0 && (
                  <div>
                    <span className="text-gray-500 text-[10px] uppercase block mb-1">Cores Detectadas</span>
                    <div className="flex gap-2">
                      {analysis.cores.map((c, i) => (
                        <div key={i} className="w-8 h-8 rounded-lg border border-white/20" style={{ background: c }} title={c} />
                      ))}
                    </div>
                  </div>
                )}
                {analysis.dicas.length > 0 && (
                  <div>
                    <span className="text-gray-500 text-[10px] uppercase block mb-1">Dicas de Melhoria</span>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {analysis.dicas.map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Sparkles className="w-3 h-3 text-purple-400 mt-0.5 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Comparativo lado a lado */}
          {uploadedImage && (
            <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
              <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                {generatedHtml ? 'Original vs Clonado' : 'Imagem Original'}
              </h3>
              <div className={`grid ${generatedHtml ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                {/* Original */}
                <div>
                  <span className="text-gray-500 text-[10px] uppercase block mb-1">Original</span>
                  <div className="relative aspect-[9/16] rounded-lg overflow-hidden border border-gray-700">
                    <NextImage src={uploadedImage} alt="Original" fill className="object-contain bg-black" unoptimized />
                  </div>
                </div>
                {/* Clonado */}
                {generatedHtml && (
                  <div>
                    <span className="text-[#D4AF37] text-[10px] uppercase block mb-1 font-bold">✨ Versão IA</span>
                    <div className="relative aspect-[9/16] rounded-lg overflow-hidden border border-[#D4AF37]/30 bg-black">
                      <div dangerouslySetInnerHTML={{ __html: generatedHtml }}
                        className="w-full h-full [&>*]:w-full [&>*]:h-full" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Placeholder quando vazio */}
          {!uploadedImage && (
            <div className="bg-[#111] border border-gray-800 rounded-xl p-12 text-center">
              <ImageIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Envie uma imagem de anúncio para começar</p>
              <p className="text-gray-600 text-xs mt-1">A IA vai analisar e criar uma versão personalizada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
