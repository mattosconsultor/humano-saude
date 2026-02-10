# 🚀 GUIA DE NAVEGAÇÃO - SISTEMA PREMIUM

## 📍 URLs do Sistema

### 🌐 Produção
```
https://humanosaude.com.br
```

### 💻 Local (Desenvolvimento)
```
http://localhost:3000
```

---

## 🗺️ MAPA DE ROTAS

### 1️⃣ ÁREA PÚBLICA

#### Landing Page Principal
```
http://localhost:3000/
```
**Recursos:**
- Hero section com calculadora
- Seção "Como Funciona" (HowItWorks)
- Planos e benefícios
- Formulário de cotação
- Meta Pixel tracking

---

### 2️⃣ PORTAL INTERNO (Admin)

#### Login Secreto
```
http://localhost:3000/portal-interno-hks-2026
```
**Credenciais:** (configurar no Supabase Auth)

---

### 3️⃣ COCKPIT

#### Dashboard de Campanhas
```
http://localhost:3000/portal-interno-hks-2026/cockpit/campanhas
```
**Features:**
- ✅ 24 campanhas ativas
- ✅ ROI médio: 4.8x
- ✅ Investimento total: R$ 180k
- ✅ Lista completa de campanhas
- ✅ Status: Ativa/Pausada/Planejamento

#### Consolidado
```
http://localhost:3000/portal-interno-hks-2026/cockpit/consolidado
```
**Features:**
- ✅ 1.847 leads totais
- ✅ Taxa de conversão: 18.4%
- ✅ Receita total: R$ 2.4M
- ✅ ROI global: 6.2x
- ✅ Gráfico de 6 meses
- ✅ Canais de origem
- ✅ Top produtos

---

### 4️⃣ AI PERFORMANCE

#### Dashboard IA
```
http://localhost:3000/portal-interno-hks-2026/ai-performance/dashboard-ia
```
**Features:**
- ✅ 2.847 PDFs processados
- ✅ Precisão: 98.7%
- ✅ Tempo médio: 4.2s
- ✅ Economia: 840h
- ✅ Status em tempo real
- ✅ Uso de CPU/Memória
- ✅ Últimos processamentos

#### Escala Automática
```
http://localhost:3000/portal-interno-hks-2026/ai-performance/escala-automatica
```
**Features:**
- ✅ 8 instâncias ativas
- ✅ Capacidade: 240 PDFs/s
- ✅ Economia: R$ 48k/mês
- ✅ Histórico 24h
- ✅ 12 scale-ups
- ✅ 8 scale-downs

#### Regras de IA
```
http://localhost:3000/portal-interno-hks-2026/ai-performance/rules
```
**Features:**
- ✅ Priorizar Empresas
- ✅ Reprocessar Falhas
- ✅ Notificar Anomalias
- ✅ Backup Automático
- ✅ Validação Premium
- ✅ Criar/editar/excluir regras

#### Audiências
```
http://localhost:3000/portal-interno-hks-2026/ai-performance/audiences
```
**Features:**
- ✅ 247 audiências criadas
- ✅ 12.4k leads segmentados
- ✅ Taxa conversão: 24.8%
- ✅ 6 audiências exemplo:
  - Empresas Tech (1.240 leads, 31.2%)
  - Famílias Premium (2.150 leads, 28.4%)
  - Profissionais Liberais (890 leads, 22.1%)
  - Aposentados (1.820 leads, 19.8%)
  - Startups (670 leads, 35.7%)
  - Alto Valor (340 leads, 41.2%)

#### Configurações IA
```
http://localhost:3000/portal-interno-hks-2026/ai-performance/settings
```
**Features:**
- ✅ Modelo: GPT-4 Turbo Vision
- ✅ Alternativas: Claude 3, Gemini 1.5
- ✅ Sliders: PDFs/s, Precisão, Timeout
- ✅ Notificações configuráveis
- ✅ Salvar/Restaurar padrões

---

### 5️⃣ SCANNER PREMIUM (⭐ DESTAQUE)

#### GoldScanner com Three.js
```
http://localhost:3000/portal-interno-hks-2026/scanner
```
**Features:**
- ✅ **Three.js 3D**: Anel dourado girante + 100 partículas
- ✅ **Drag & Drop**: Arraste PDFs diretamente
- ✅ **Progress Bar**: 0-100% animada
- ✅ **Confetti**: 200 partículas douradas no sucesso
- ✅ **Auto-save**: Lead salvo automaticamente
- ✅ **Stats**: PDFs hoje, Precisão, Tempo médio
- ✅ **Último scan**: Detalhes do processamento
- ✅ **Como funciona**: 4 passos ilustrados

**Como usar:**
1. Acesse a URL
2. Arraste um PDF ou clique para selecionar
3. Aguarde o processamento (animação 3D)
4. 🎉 Confetti dourado ao concluir
5. Lead salvo automaticamente no Supabase

---

## 🎨 EFEITOS PREMIUM VISÍVEIS

### Em TODAS as Páginas

#### Background
```css
✅ Black Piano (#050505)
✅ Mesh Gradient (3 radiais dourados)
✅ Dot Pattern (grid 40×40px)
✅ Animação 15s ease-in-out infinite
```

#### Títulos
```typescript
✅ LuxuryTitle component
✅ Perpetua Titling MT
✅ Gradiente dourado 5 pontos
✅ Animação 8s linear infinite
```

#### Cards
```css
✅ glass-gold (backdrop-blur 20px)
✅ glass-dark (fundo escuro translúcido)
✅ border-beam (borda animada 3s)
✅ Hover effects (scale, shadow)
```

#### Animações
```typescript
✅ Spring physics (300/30)
✅ Fade in/out suaves
✅ Scroll reveals
✅ Pulse glow
✅ Float
✅ Shimmer
```

---

## 🧪 TESTES RECOMENDADOS

### 1. Scanner Premium
```
1. Acesse /scanner
2. Arraste qualquer PDF
3. Observe:
   - Anel 3D girando
   - Partículas flutuantes
   - Linha de scanner animada
   - Progress bar 0-100%
   - Confetti dourado
   - Lead salvo no Supabase
```

### 2. Cockpit
```
1. Acesse /cockpit/campanhas
2. Veja 24 campanhas com métricas
3. Hover nos cards (efeito scale)
4. Observe títulos com gradiente dourado
```

### 3. Dashboard IA
```
1. Acesse /ai-performance/dashboard-ia
2. Veja status em tempo real
3. Progress bars animadas
4. Últimos processamentos
5. Tags de status coloridas
```

### 4. Audiências
```
1. Acesse /ai-performance/audiences
2. 6 cards com ícones animados
3. Hover effect com scale
4. Métricas coloridas (conv, valor)
```

---

## 🎯 ATALHOS DO TECLADO

```
⌘ + K          - Busca global (implementar)
⌘ + /          - Ajuda (implementar)
Esc            - Fechar modais
Tab            - Navegação
```

---

## 📱 RESPONSIVIDADE

### Desktop (>= 1024px)
```
✅ Smooth scroll ativo
✅ Animações 3D completas
✅ Grid 3-4 colunas
✅ Sidebar expandida
```

### Tablet (768px - 1023px)
```
✅ Grid 2 colunas
✅ Sidebar colapsável
✅ Animações simplificadas
```

### Mobile (< 768px)
```
✅ Grid 1 coluna
✅ Menu hamburger
✅ Sem smooth scroll
✅ Animações essenciais
```

---

## 🔒 SEGURANÇA

### Rotas Protegidas
```
✅ /portal-interno-hks-2026/*
✅ Requer autenticação Supabase
✅ Middleware de validação
✅ Redirect para login se não autenticado
```

### Variáveis de Ambiente
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key
META_PIXEL_ID=seu_pixel_id
```

---

## 📊 MÉTRICAS SIMULADAS

### Campanhas
- 24 ativas
- ROI: 4.8x
- Budget: R$ 180k

### Leads
- Total: 1.847
- Conversão: 18.4%
- Receita: R$ 2.4M

### IA
- PDFs: 2.847
- Precisão: 98.7%
- Tempo: 4.2s

### Audiências
- Total: 247
- Leads: 12.4k
- Conv: 24.8%

---

## 🎨 PALETA DE CORES

```css
Piano Black:    #050505
Gold Dark:      #AA8A2E
Gold:           #D4AF37
Gold Light:     #F6E05E
Pure Gold:      #FFD700
White:          #FFFFFF
Emerald:        #10B981
Blue:           #3B82F6
Purple:         #8B5CF6
```

---

## 🚀 PERFORMANCE

### Lighthouse Score (Target)
```
⚡ Performance:      95+
♿ Accessibility:    90+
🔍 SEO:             95+
✅ Best Practices:  95+
```

### Core Web Vitals
```
LCP: < 2.5s
FID: < 100ms
CLS: < 0.1
```

---

## 📞 SUPORTE

**Desenvolvedor:** Elite Software Architecture Team  
**Data:** 9 de fevereiro de 2026  
**Stack:** Next.js 16.1.6 + Tailwind + Three.js + Framer Motion  

---

## ✅ CHECKLIST DE TESTES

- [ ] Landing page carrega corretamente
- [ ] Login admin funciona
- [ ] Todas as 8 páginas do portal carregam
- [ ] GoldScanner aceita drag & drop
- [ ] Confetti dispara no sucesso
- [ ] Títulos com gradiente dourado
- [ ] Animações border-beam funcionam
- [ ] Glass effects aplicados
- [ ] Mesh gradient visível
- [ ] Hover effects responsivos
- [ ] Mobile responsivo
- [ ] Sem erros no console
- [ ] Performance 60 FPS

---

🏆 **Sistema Pronto para Uso e Demonstração!**
