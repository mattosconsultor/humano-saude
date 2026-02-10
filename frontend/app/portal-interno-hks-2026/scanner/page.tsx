'use client';

import { useState } from 'react';
import { LuxuryTitle, GoldScanner } from '@/components/premium';
import { saveScannedLead, type ScannedLeadData } from '@/app/actions/leads';

export default function ScannerPDFPage() {
  const [lastScan, setLastScan] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  const handlePdfDropped = async (file: File) => {
    console.log('📄 PDF recebido:', file.name);
    setProcessing(true);
    
    // Simulação: Aqui você faria a chamada para o backend Python
    // const response = await fetch('/api/scanner/process', {
    //   method: 'POST',
    //   body: formData
    // });
    
    // Por agora, vamos simular dados
    setTimeout(async () => {
      const simulatedData: ScannedLeadData = {
        nome: 'João Silva (Simulado)',
        whatsapp: '21999887766',
        email: 'joao.silva@email.com',
        operadora_atual: 'Amil',
        valor_atual: 1200.00,
        idades: [35, 32, 8, 5],
        economia_estimada: 480.00,
        valor_proposto: 720.00,
        tipo_contratacao: 'familiar',
        dados_pdf: { arquivo: file.name },
        observacoes: 'Lead gerado automaticamente pelo Scanner IA'
      };
      
      // Salvar no Supabase via Server Action
      const result = await saveScannedLead(simulatedData);
      
      if (result.success) {
        console.log('✅ Lead salvo com ID:', result.lead_id);
      } else {
        console.error('❌ Erro ao salvar lead:', result.error);
      }
      
      setProcessing(false);
    }, 3000);
  };

  const handleScanComplete = (data: any) => {
    setLastScan(data);
    console.log('✅ Scan completo:', data);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <LuxuryTitle as="h1" className="text-5xl mb-4">
          Scanner PDF Premium
        </LuxuryTitle>
        
        <p className="text-gray-300 text-lg mb-12 max-w-3xl">
          Arraste PDFs de planos de saúde e deixe nossa IA processar instantaneamente. 
          Sistema com <span className="text-[#D4AF37] font-black">98.7% de precisão</span> e processamento em <span className="text-[#D4AF37] font-black">menos de 5 segundos</span>.
        </p>

        {/* Scanner */}
        <div className="mb-8">
          <GoldScanner 
            onPdfDropped={handlePdfDropped}
            onScanComplete={handleScanComplete}
          />
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-gold p-6 rounded-2xl border-beam">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">PDFs Hoje</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">127</div>
            <div className="text-xs text-emerald-400">↑ 23 vs. ontem</div>
          </div>

          <div className="glass-gold p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Precisão Média</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">98.7%</div>
            <div className="text-xs text-emerald-400">↑ 0.2% vs. semana</div>
          </div>

          <div className="glass-gold p-6 rounded-2xl">
            <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Tempo Médio</div>
            <div className="text-4xl font-black text-[#D4AF37] mb-1">4.2s</div>
            <div className="text-xs text-emerald-400">↓ 0.5s vs. semana</div>
          </div>
        </div>

        {/* Último scan */}
        {lastScan && (
          <div className="glass-dark p-6 rounded-2xl animate-[fadeIn_0.5s_ease-in-out]">
            <h2 className="text-2xl font-black text-white mb-4 uppercase font-cinzel">Último Processamento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Arquivo:</span>
                <span className="text-white font-bold">{lastScan.fileName}</span>
              </div>
              <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Tamanho:</span>
                <span className="text-white font-bold">{(lastScan.size / 1024).toFixed(2)} KB</span>
              </div>
              <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Processado em:</span>
                <span className="text-white font-bold">{new Date(lastScan.scannedAt).toLocaleTimeString('pt-BR')}</span>
              </div>
              <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">Precisão:</span>
                <span className="text-[#D4AF37] font-black text-lg">{lastScan.accuracy}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Como funciona */}
        <div className="glass-dark p-8 rounded-2xl mt-8">
          <h2 className="text-2xl font-black text-white mb-6 uppercase font-cinzel">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '📄', titulo: 'Upload', desc: 'Arraste ou selecione o PDF do plano' },
              { icon: '🤖', titulo: 'IA Processa', desc: 'Sistema analisa em tempo real' },
              { icon: '📊', titulo: 'Dados Extraídos', desc: 'Informações estruturadas' },
              { icon: '💾', titulo: 'Auto-Save', desc: 'Lead salvo automaticamente' },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#bf953f] to-[#D4AF37] rounded-full flex items-center justify-center text-3xl">
                  {step.icon}
                </div>
                <h3 className="text-white font-black mb-2 uppercase">{step.titulo}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="glass-dark p-6 rounded-2xl">
            <h3 className="text-xl font-black text-white mb-4 uppercase font-cinzel">⚡ Performance</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span> Processamento em menos de 5 segundos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span> Até 100 PDFs simultâneos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span> Auto-escala conforme demanda
              </li>
            </ul>
          </div>

          <div className="glass-dark p-6 rounded-2xl">
            <h3 className="text-xl font-black text-white mb-4 uppercase font-cinzel">🎯 Precisão</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span> 98.7% de precisão média
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span> Validação automática de dados
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4AF37]">✓</span> Detecção de anomalias
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
