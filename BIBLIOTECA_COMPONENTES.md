# 🎨 BIBLIOTECA DE COMPONENTES PREMIUM - EXEMPLOS DE USO

## 📚 Índice
1. [GoldScanner](#goldscanner)
2. [LuxuryTitle](#luxurytitle)
3. [GoldCard](#goldcard)
4. [SmoothScroll](#smoothscroll)
5. [Border Beam](#border-beam)
6. [Glassmorphism](#glassmorphism)
7. [Animações Tailwind](#animações-tailwind)
8. [Confetti](#confetti)
9. [Three.js Custom](#threejs-custom)

---

## 🔷 GoldScanner

### Uso Básico
```tsx
import { GoldScanner } from '@/components/premium';

export default function MyPage() {
  const handlePdfDropped = (file: File) => {
    console.log('PDF recebido:', file.name);
  };

  const handleScanComplete = (data: any) => {
    console.log('Scan completo:', data);
  };

  return (
    <GoldScanner 
      onPdfDropped={handlePdfDropped}
      onScanComplete={handleScanComplete}
    />
  );
}
```

### Com Integração Backend
```tsx
'use client';

import { GoldScanner } from '@/components/premium';
import { saveScannedLead } from '@/app/actions/leads';

export default function ScannerPage() {
  const handlePdfDropped = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // Chamada para backend Python
    const response = await fetch('/api/scanner/process', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    // Salvar no Supabase
    const result = await saveScannedLead(data);
    
    if (result.success) {
      console.log('✅ Lead salvo:', result.lead_id);
    }
  };

  return <GoldScanner onPdfDropped={handlePdfDropped} />;
}
```

---

## 🔷 LuxuryTitle

### Uso Básico
```tsx
import { LuxuryTitle } from '@/components/premium';

// H1
<LuxuryTitle as="h1" className="text-5xl mb-8">
  Título Premium
</LuxuryTitle>

// H2
<LuxuryTitle as="h2" className="text-4xl mb-6">
  Subtítulo Dourado
</LuxuryTitle>

// H3
<LuxuryTitle as="h3" className="text-3xl mb-4">
  Seção Destacada
</LuxuryTitle>
```

### Com Animação Desabilitada
```tsx
<LuxuryTitle as="h1" animated={false}>
  Título Estático
</LuxuryTitle>
```

### Customizado
```tsx
<LuxuryTitle 
  as="h2" 
  className="text-6xl font-extrabold mb-12 text-center"
>
  Dashboard <span className="block mt-2">Executivo</span>
</LuxuryTitle>
```

---

## 🔷 GoldCard

### Uso Básico
```tsx
import { GoldCard } from '@/components/premium';

<GoldCard>
  <h3 className="text-2xl font-bold text-white mb-4">Card Premium</h3>
  <p className="text-gray-300">Conteúdo do card com efeito de brilho.</p>
</GoldCard>
```

### Com Intensidade Customizada
```tsx
// Brilho sutil
<GoldCard glowIntensity="subtle">
  <p>Card com brilho discreto</p>
</GoldCard>

// Brilho médio (padrão)
<GoldCard glowIntensity="medium">
  <p>Card com brilho padrão</p>
</GoldCard>

// Brilho forte
<GoldCard glowIntensity="strong">
  <p>Card com brilho intenso</p>
</GoldCard>
```

### Grid de Cards
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {[1, 2, 3].map((item) => (
    <GoldCard key={item} glowIntensity="medium">
      <div className="text-center">
        <div className="text-4xl mb-4">📊</div>
        <h4 className="text-xl font-bold text-white">Métrica {item}</h4>
        <p className="text-gray-300 mt-2">Descrição</p>
      </div>
    </GoldCard>
  ))}
</div>
```

---

## 🔷 SmoothScroll

### No Root Layout
```tsx
// app/layout.tsx
import { SmoothScrollProvider } from '@/components/premium';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="dark">
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

### Em Página Específica
```tsx
'use client';

import { useSmoothScroll, useScrollReveal } from '@/components/premium';

export default function MyPage() {
  useSmoothScroll();
  useScrollReveal();

  return (
    <div>
      <section className="scroll-reveal">
        <h2>Esta seção aparece com scroll reveal</h2>
      </section>
    </div>
  );
}
```

---

## 🔷 Border Beam

### CSS Puro
```tsx
<div className="border-beam p-8 rounded-2xl bg-white/5">
  <h3 className="text-white text-2xl">Card com Border Beam</h3>
  <p className="text-gray-300">Borda animada estilo Magic UI</p>
</div>
```

### Em Card
```tsx
<div className="glass-gold border-beam p-6 rounded-2xl">
  <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">
    Métrica Premium
  </div>
  <div className="text-4xl font-black text-[#D4AF37]">
    R$ 2.4M
  </div>
</div>
```

---

## 🔷 Glassmorphism

### Glass Gold
```tsx
<div className="glass-gold p-8 rounded-2xl">
  <h3 className="text-white text-2xl mb-4">Card Gold</h3>
  <p className="text-gray-300">
    Fundo dourado translúcido com blur
  </p>
</div>
```

### Glass Dark
```tsx
<div className="glass-dark p-8 rounded-2xl">
  <h3 className="text-white text-2xl mb-4">Card Dark</h3>
  <p className="text-gray-300">
    Fundo escuro translúcido com blur
  </p>
</div>
```

### Combinado com Border Beam
```tsx
<div className="glass-gold border-beam p-8 rounded-3xl">
  <h2 className="text-3xl font-black text-white mb-4">
    Premium Card
  </h2>
  <p className="text-gray-300">
    Glass + Border Beam = Efeito máximo
  </p>
</div>
```

---

## 🔷 Animações Tailwind

### Float
```tsx
<div className="animate-float">
  <div className="w-16 h-16 bg-gradient-to-br from-[#bf953f] to-[#D4AF37] rounded-full flex items-center justify-center text-2xl">
    ⭐
  </div>
</div>
```

### Pulse Glow
```tsx
<div className="animate-pulse-glow w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-3xl">
  ✓
</div>
```

### Shimmer
```tsx
<div className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
  <div className="relative p-6">Conteúdo</div>
</div>
```

### Gradient Shift
```tsx
<h1 className="bg-gold-gradient bg-clip-text text-transparent animate-gradient-shift text-5xl font-black" style={{ backgroundSize: '200% 200%' }}>
  Título Animado
</h1>
```

### Scanner Line
```tsx
<div className="relative h-64 overflow-hidden">
  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-scanner-line" />
</div>
```

---

## 🔷 Confetti

### Básico
```tsx
import confetti from 'canvas-confetti';

const fireConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#D4AF37', '#F6E05E', '#AA8A2E'],
  });
};

<button onClick={fireConfetti}>
  Disparar Confetti
</button>
```

### Explosão Premium (5 Ângulos)
```tsx
import confetti from 'canvas-confetti';

const fireGoldConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#D4AF37', '#F6E05E', '#AA8A2E', '#FFD700'],
  };

  function fire(particleRatio: number, opts: any) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
};
```

### Chuva Contínua
```tsx
const rainConfetti = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#D4AF37', '#F6E05E'],
    });
    
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#D4AF37', '#F6E05E'],
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};
```

---

## 🔷 Three.js Custom

### Cena Básica
```tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      canvas.clientWidth / canvas.clientHeight, 
      0.1, 
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.position.z = 5;

    // Criar geometria
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xD4AF37 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animação
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ width: '100%', height: '400px' }}
    />
  );
}
```

### Partículas Douradas
```tsx
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 100;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute(
  'position', 
  new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.05,
  color: 0xF6E05E,
  transparent: true,
  opacity: 0.6,
});

const particlesMesh = new THREE.Points(
  particlesGeometry, 
  particlesMaterial
);

scene.add(particlesMesh);
```

---

## 🎨 PATTERNS DE DESIGN

### Dashboard Card
```tsx
<div className="glass-gold p-6 rounded-2xl border-beam">
  <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">
    Label da Métrica
  </div>
  <div className="text-4xl font-black text-[#D4AF37] mb-1">
    1,847
  </div>
  <div className="text-xs text-emerald-400">
    ↑ 23% vs. período anterior
  </div>
</div>
```

### Lista com Hover
```tsx
<div className="space-y-3">
  {items.map((item, i) => (
    <div 
      key={i} 
      className="bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all duration-300 cursor-pointer border border-white/10 hover:border-[#D4AF37]/30"
    >
      <h3 className="text-white font-bold">{item.title}</h3>
      <p className="text-gray-400 text-sm">{item.description}</p>
    </div>
  ))}
</div>
```

### Button Premium
```tsx
<button className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#bf953f] via-[#ffd700] to-[#aa771c] text-slate-900 px-10 py-5 rounded-full text-sm uppercase tracking-widest font-black shadow-2xl hover:shadow-[0_20px_60px_rgba(255,215,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden">
  <span className="relative">🎯 Ação Premium</span>
  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
</button>
```

### Progress Bar Animada
```tsx
<div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
  <motion.div
    className="h-full bg-gradient-to-r from-[#bf953f] via-[#D4AF37] to-[#F6E05E] rounded-full"
    initial={{ width: 0 }}
    animate={{ width: '67%' }}
    transition={{ duration: 1, ease: 'easeOut' }}
  />
</div>
```

---

## 📦 IMPORTS ÚTEIS

```tsx
// Componentes Premium
import { 
  GoldScanner, 
  LuxuryTitle, 
  GoldCard, 
  SmoothScrollProvider,
  useSmoothScroll,
  useScrollReveal,
} from '@/components/premium';

// Animações
import { motion, useAnimation } from 'framer-motion';

// Confetti
import confetti from 'canvas-confetti';

// Three.js
import * as THREE from 'three';

// Server Actions
import { saveScannedLead } from '@/app/actions/leads';
```

---

## 🎯 SPRING PHYSICS PADRÃO

```tsx
// Configuração Elite
const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

<motion.div
  whileHover={{ scale: 1.05 }}
  transition={springConfig}
>
  Elemento
</motion.div>
```

---

## 🏆 BEST PRACTICES

1. **Sempre use `useSmoothScroll` em páginas longas**
2. **LuxuryTitle para todos os H1/H2 principais**
3. **GoldCard para métricas importantes**
4. **Border Beam em cards premium**
5. **Confetti apenas em sucessos importantes**
6. **Cleanup de Three.js sempre no useEffect return**
7. **Spring physics 300/30 para consistência**
8. **Glassmorphism com backdrop-blur 20px**

---

🎨 **Biblioteca Completa de Componentes Premium - Pronta para Uso!**
