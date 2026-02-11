import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { prompt, operadora, plano, modalidade } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt obrigatorio' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const systemPrompt = `Voce e um copywriter especialista em planos de saude do Brasil.
Gere APENAS o texto solicitado, curto e persuasivo, para uso em banner de redes sociais.
Contexto: Operadora ${operadora || 'generica'}, Plano ${plano || 'generico'}, Modalidade ${modalidade || 'PME'}.
Regras:
- Maximo 2 frases curtas (total max 120 caracteres)
- Tom profissional mas acessivel
- Pode usar emojis com moderacao (max 2)
- NAO invente precos ou dados
- NAO use hashtags
- Foco em beneficio/urgencia/escassez
- Responda SOMENTE com o texto, sem explicacoes`;

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: `Pedido do corretor: ${prompt}` },
    ]);

    const text = result.response.text().trim();

    return NextResponse.json({ success: true, text });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[AI Text] Error:', msg);
    return NextResponse.json({ error: 'Erro ao gerar texto' }, { status: 500 });
  }
}
