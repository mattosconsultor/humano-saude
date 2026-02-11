import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

/* ═══════════ PROMPTS ═══════════ */

const ANALYZE_SYSTEM = `Você é um designer gráfico e copywriter especialista em anúncios de planos de saúde do Brasil.
Analise a imagem do anúncio enviada e extraia as seguintes informações em formato JSON:

{
  "headline": "A frase principal/título do anúncio (se houver)",
  "mensagem": "O texto complementar/corpo do anúncio",
  "cta": "O call-to-action (botão/frase de ação)",
  "cores": ["#hex1", "#hex2", "#hex3"] (até 4 cores dominantes detectadas em formato hex),
  "dicas": ["dica1", "dica2", "dica3"] (3 a 5 sugestões de melhoria para o anúncio),
  "layout": "Descrição curta do layout: posição dos elementos, se tem foto, se é minimalista, etc."
}

Regras:
- Responda SOMENTE com o JSON válido, sem markdown, sem explicações
- Se não conseguir detectar algum campo, use string vazia
- Cores devem ser hex válidas
- Dicas devem ser específicas e acionáveis
- Layout deve descrever a composição visual em 1-2 frases`;

const GENERATE_SYSTEM = `Você é um designer gráfico e copywriter de elite especialista em anúncios de planos de saúde do Brasil.
Sua tarefa é gerar o código HTML+CSS inline de um anúncio (stories 1080x1920) que CLONE o estilo visual do anúncio original mas com DADOS PERSONALIZADOS do corretor.

ANÁLISE DO ORIGINAL:
{{ANALYSIS}}

DADOS DO CORRETOR:
- Operadora: {{OPERADORA}}
- Plano: {{PLANO}}
- Preço: {{PRECO}}
- Nome: {{NOME}}
- WhatsApp: {{WHATSAPP}}

{{INSTRUCAO_EXTRA}}

Regras CRÍTICAS:
1. Gere SOMENTE o HTML (uma única div raiz). Sem <!DOCTYPE>, sem <html>, sem <head>, sem <body>, sem markdown.
2. A div raiz DEVE ter style="width:1080px;height:1920px;position:relative;overflow:hidden;"
3. Use SOMENTE CSS inline nos elementos. Sem <style>, sem classes.
4. Clone o ESTILO do original (cores, layout, composição) mas use os dados personalizados
5. Se o original tem gradientes, use gradientes similares
6. Texto do headline deve ser grande e impactante (min 80px)
7. O preço deve ser MUITO destacado (min 120px bold)
8. Inclua o CTA (botão ou frase de ação) bem visível
9. Se tiver nome do corretor e WhatsApp, inclua no rodapé
10. Use fontes sans-serif (system-ui, sans-serif)
11. As cores devem seguir a paleta detectada no original, adaptadas à operadora
12. NÃO use imagens externas (sem <img src>), use apenas CSS para efeitos visuais
13. NÃO use tags <script>
14. Garanta contraste legível (texto claro em fundo escuro ou vice-versa)
15. O resultado deve parecer PROFISSIONAL e pronto para postar
16. Responda SOMENTE com o HTML, sem explicações, sem backticks`;

/* ═══════════ HANDLER ═══════════ */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, imageBase64, operadora, plano, preco, nomeCorretor, whatsapp, instrucao, analysis } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: 'Imagem obrigatória' }, { status: 400 });
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json({ error: 'GOOGLE_AI_API_KEY não configurada no servidor' }, { status: 500 });
    }

    // Modelos em ordem de preferência (melhor qualidade primeiro, fallback segundo)
    const TEXT_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash'];

    /* ── ANALYZE ── */
    if (action === 'analyze') {
      // Extract base64 data and MIME type — flexible regex
      const match = imageBase64.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
      if (!match) {
        console.error('[AI Clone] Invalid base64 format. Starts with:', imageBase64.slice(0, 50));
        return NextResponse.json({ error: 'Formato de imagem inválido. Envie JPG, PNG ou WebP.' }, { status: 400 });
      }
      const [, mimeType, base64Data] = match;

      // Check size (Gemini limit ~20MB inline)
      const sizeBytes = base64Data.length * 0.75;
      if (sizeBytes > 15 * 1024 * 1024) {
        return NextResponse.json({ error: 'Imagem muito grande para análise. Máximo ~15MB.' }, { status: 400 });
      }

      console.log(`[AI Clone] Analyzing image: ${mimeType}, ~${Math.round(sizeBytes / 1024)}KB`);

      let result;
      for (const modelName of TEXT_MODELS) {
        try {
          console.log(`[AI Clone] Tentando modelo: ${modelName}`);
          const model = genAI.getGenerativeModel({ model: modelName });
          result = await model.generateContent([
            { text: ANALYZE_SYSTEM },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data,
              },
            },
            { text: `Operadora do corretor: ${operadora || 'Amil'}. Plano: ${plano || 'não especificado'}.${instrucao ? ` Instrução adicional: ${instrucao}` : ''}` },
          ]);
          console.log(`[AI Clone] Análise OK com modelo: ${modelName}`);
          break;
        } catch (modelErr) {
          console.warn(`[AI Clone] Modelo ${modelName} falhou na análise:`, modelErr instanceof Error ? modelErr.message : modelErr);
          if (modelName === TEXT_MODELS[TEXT_MODELS.length - 1]) throw modelErr;
        }
      }

      const rawText = result!.response.text().trim();
      // Try to parse JSON from response (may have markdown wrappers)
      let parsed;
      try {
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        parsed = JSON.parse(jsonMatch?.[0] || rawText);
      } catch {
        parsed = {
          headline: '',
          mensagem: rawText.slice(0, 200),
          cta: '',
          cores: [],
          dicas: ['Não foi possível analisar completamente o anúncio'],
          layout: 'Não detectado',
        };
      }

      // Normalize cores
      if (!Array.isArray(parsed.cores)) parsed.cores = [];
      if (!Array.isArray(parsed.dicas)) parsed.dicas = [];

      return NextResponse.json({
        success: true,
        analysis: {
          headline: parsed.headline || '',
          mensagem: parsed.mensagem || '',
          cta: parsed.cta || '',
          cores: parsed.cores.slice(0, 5),
          dicas: parsed.dicas.slice(0, 5),
          layout: parsed.layout || '',
        },
      });
    }

    /* ── GENERATE ── */
    if (action === 'generate') {
      if (!analysis) {
        return NextResponse.json({ error: 'Análise obrigatória para gerar' }, { status: 400 });
      }

      const match = imageBase64.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
      if (!match) {
        return NextResponse.json({ error: 'Formato de imagem inválido' }, { status: 400 });
      }
      const [, mimeType, base64Data] = match;

      // Build prompt from template
      const opNome = operadora
        ? (['amil','sulamerica','bradesco','porto','assim','levesaude','unimed','preventsenior','medsenior']
            .includes(operadora) ? ({ amil:'Amil', sulamerica:'SulAmérica', bradesco:'Bradesco Saúde', porto:'Porto Saúde', assim:'Assim Saúde', levesaude:'Leve Saúde', unimed:'Unimed', preventsenior:'Prevent Senior', medsenior:'MedSenior' } as Record<string,string>)[operadora] : operadora)
        : 'Amil';

      const prompt = GENERATE_SYSTEM
        .replace('{{ANALYSIS}}', JSON.stringify(analysis, null, 2))
        .replace('{{OPERADORA}}', opNome || 'Amil')
        .replace('{{PLANO}}', plano || 'Plano Saúde')
        .replace('{{PRECO}}', preco || 'Consulte')
        .replace('{{NOME}}', nomeCorretor || '')
        .replace('{{WHATSAPP}}', whatsapp || '')
        .replace('{{INSTRUCAO_EXTRA}}', instrucao ? `INSTRUÇÃO EXTRA DO CORRETOR: ${instrucao}` : '');

      let genResult;
      for (const modelName of TEXT_MODELS) {
        try {
          console.log(`[AI Clone] Gerando HTML com modelo: ${modelName}`);
          const model = genAI.getGenerativeModel({ model: modelName });
          genResult = await model.generateContent([
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data,
              },
            },
            { text: 'Gere o HTML do anúncio clonado e personalizado agora. Responda SOMENTE com o HTML.' },
          ]);
          console.log(`[AI Clone] Geração OK com modelo: ${modelName}`);
          break;
        } catch (modelErr) {
          console.warn(`[AI Clone] Modelo ${modelName} falhou na geração:`, modelErr instanceof Error ? modelErr.message : modelErr);
          if (modelName === TEXT_MODELS[TEXT_MODELS.length - 1]) throw modelErr;
        }
      }

      let html = genResult!.response.text().trim();

      // Remove markdown code block wrappers if present
      html = html.replace(/^```html?\s*\n?/i, '').replace(/\n?```\s*$/i, '');

      // Basic sanitization - remove script tags
      html = html.replace(/<script[\s\S]*?<\/script>/gi, '');
      html = html.replace(/on\w+="[^"]*"/gi, '');
      html = html.replace(/on\w+='[^']*'/gi, '');

      return NextResponse.json({ success: true, html });
    }

    return NextResponse.json({ error: 'Action inválida (use: analyze ou generate)' }, { status: 400 });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[AI Clone] Error:', msg);
    return NextResponse.json({ error: 'Erro interno na IA Clone' }, { status: 500 });
  }
}
