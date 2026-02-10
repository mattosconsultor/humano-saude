# 🎨 Sistema Premium de Design Luxury - Humano Saúde

## ✅ Implementado

### 1. Componentes Premium (`/components/premium`)

#### GoldCard
- Card interativo com brilho dourado que segue o mouse
- Efeito Border Beam sutil
- Animações com physics spring (stiffness: 300, damping: 30)
- 3 níveis de intensidade: subtle, medium, strong
- Glassmorphism integrado

#### LuxuryTitle
- Gradiente dourado metálico animado (AA8A2E → D4AF37 → F6E05E)
- Usa fonte Perpetua Titling MT
- Animação de entrada com cubic-bezier luxury
- Background position animado infinito (8s)
- Scroll reveal integrado

#### SmoothScroll
- Hook `useSmoothScroll()` - Rolagem suave estilo Lenis (ease: 0.075)
- Hook `useScrollReveal()` - Elementos aparecem ao scroll
- Provider `<SmoothScrollProvider>` para aplicação global
- Funciona apenas em desktop (>= 1024px)

### 2. Mesh Gradient Black Piano (`globals.css`)

```css
body::before {
  background: 
    radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(246, 224, 94, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(170, 138, 46, 0.05) 0%, transparent 60%),
    #050505; /* Black Piano */
  animation: meshMove 15s ease-in-out infinite;
}
```

**Efeito Seda Dourada:**
- 3 gradientes radiais sutis em movimento
- Cores: Dourado Escuro (#AA8A2E), Dourado Real (#D4AF37), Dourado Claro (#F6E05E)
- Animação de 15 segundos com transições suaves
- Opacidades baixas (5-8%) para efeito de seda

### 3. Dot Pattern Interativo

```css
body::after {
  background-image: radial-gradient(circle, rgba(212, 175, 55, 0.3) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.03;
}
```

### 4. Glassmorphism Premium

**`.glass-gold`:**
- Background: rgba(212, 175, 55, 0.05)
- Backdrop-filter: blur(20px)
- Border dourado sutil
- Box-shadow duplo (externo + interno)

**`.glass-dark`:**
- Background: rgba(5, 5, 5, 0.6)
- Backdrop-filter: blur(20px)
- Border branco ultra-sutil

### 5. Border Beam Animation

```css
@keyframes borderBeam {
  /* Feixe de luz que percorre a borda */
}
```

### 6. Scroll Reveal System

Classes CSS:
- `.scroll-reveal` - Adicione em elementos que devem aparecer
- `.scroll-revealed` - Aplicado automaticamente ao scroll
- Transição: 0.8s cubic-bezier(0.22, 1, 0.36, 1)

---

## 🔄 Próximos Passos

### Para Implementar no HowItWorks:

1. **Adicionar imports:**
```tsx
'use client';
import { motion } from 'framer-motion';
import { GoldCard, LuxuryTitle } from '@/components/premium';
```

2. **Substituir título:**
```tsx
<LuxuryTitle as="h2" className="text-4xl md:text-5xl mb-6">
  Seu Atendimento
  <span className="block mt-2">Rápido e Personalizado</span>
</LuxuryTitle>
```

3. **Envolver cards em GoldCard:**
```tsx
<GoldCard className="h-full" glowIntensity="medium">
  {/* conteúdo do card */}
</GoldCard>
```

4. **Adicionar scroll reveal:**
```tsx
<div className="scroll-reveal">
  {/* elementos que devem aparecer ao scroll */}
</div>
```

5. **Animar números com spring physics:**
```tsx
<motion.div
  whileHover={{ scale: 1.15, rotateZ: 5 }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
>
  {step.num}
</motion.div>
```

### Para aplicar globalmente:

1. **No layout raiz (`app/layout.tsx`):**
```tsx
import { SmoothScrollProvider } from '@/components/premium';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

2. **Adicionar tema dark no HTML:**
```tsx
<html className="dark">
```

---

## 🎯 Resultado Esperado

- ✨ Background Black Piano (#050505) com Mesh Gradient dourado sutil em movimento
- 🌟 Dot Pattern texturizado discreto
- 💎 Cards com brilho dourado que segue o mouse
- 🏆 Títulos com gradiente metálico animado (fonte Perpetua)
- 🎪 Micro-interações com spring physics premium
- 🌊 Scroll suave estilo Lenis
- 👁️ Elementos aparecem suavemente ao scroll
- 🔮 Glassmorphism em overlays e modals

**Visual Final:** Aplicativo nativo de luxo estilo Linear.app / Raycast, não um site.

---

## 📦 Dependências

- ✅ framer-motion (já instalado)
- ✅ Tailwind CSS (configurado)
- ✅ Next.js 16.1.6 (Turbopack)

---

## 🎨 Paleta de Cores Premium

| Cor | Hex | Uso |
|-----|-----|-----|
| Black Piano | `#050505` | Background principal |
| Dourado Escuro | `#AA8A2E` | Gradientes, borders |
| Dourado Real | `#D4AF37` | Cor primária, acentos |
| Dourado Claro | `#F6E05E` | Highlights, hovers |
| Branco Puro | `#FFFFFF` | Texto, cards |

---

## 🚀 Status

**Sistema Premium:** ✅ Implementado e pronto
**HowItWorks atual:** 📝 Versão básica (sem animações premium)
**Próximo:** Aplicar componentes premium no HowItWorks

**Para ativar:** Basta usar os componentes `GoldCard`, `LuxuryTitle` e adicionar `<SmoothScrollProvider>` no layout.
