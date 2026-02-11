'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  Laptop,
  Shield,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  BarChart3,
  Briefcase,
  HeartHandshake,
  Rocket,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  Target,
  Gift,
  GraduationCap,
  Handshake,
} from 'lucide-react';

// ─── Animações ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

// ─── Dados ─────────────────────────────────────────────────
const DIFERENCIAIS = [
  {
    icon: DollarSign,
    title: 'Comissões Acima do Mercado',
    desc: 'Tabela agressiva com comissões até 300% superiores à média do mercado. Recorrência vitalícia + bonificações por meta.',
    highlight: 'Até 300%',
  },
  {
    icon: Laptop,
    title: 'Plataforma Completa',
    desc: 'CRM, Pipeline Kanban, gerador de propostas, cotações automáticas e materiais de vendas — tudo integrado no seu painel.',
    highlight: 'All-in-One',
  },
  {
    icon: Zap,
    title: 'Leads Qualificados',
    desc: 'Receba leads pré-qualificados direto no seu CRM. Investimos pesado em tráfego pago para você vender mais.',
    highlight: 'Leads ∞',
  },
  {
    icon: Shield,
    title: 'Suporte Premium',
    desc: 'Equipe dedicada para pós-venda, movimentações e sinistros. Você foca em vender, nós cuidamos do resto.',
    highlight: '24/7',
  },
  {
    icon: GraduationCap,
    title: 'Treinamento Contínuo',
    desc: 'Acesso a treinamentos exclusivos, workshops de vendas e materiais atualizados das operadoras.',
    highlight: 'Academy',
  },
  {
    icon: BarChart3,
    title: 'Dashboard de Performance',
    desc: 'Acompanhe sua produção, comissões, metas e ranking em tempo real com dashboards inteligentes.',
    highlight: 'Real-time',
  },
];

const COMO_FUNCIONA = [
  {
    step: '01',
    title: 'Solicite sua vaga',
    desc: 'Preencha o formulário com seus dados profissionais. É rápido e sem burocracia.',
    icon: Target,
  },
  {
    step: '02',
    title: 'Aprovação e Onboarding',
    desc: 'Nosso time analisa seu perfil e libera seu acesso ao painel em até 24h com credenciais exclusivas.',
    icon: CheckCircle,
  },
  {
    step: '03',
    title: 'Comece a Vender',
    desc: 'Acesse o CRM, receba leads, gere cotações e acompanhe suas comissões. Simples assim.',
    icon: Rocket,
  },
];

const DEPOIMENTOS = [
  {
    nome: 'Ricardo Mendes',
    cargo: 'Corretor há 8 anos',
    texto: 'Em 3 meses na Humano Saúde, minhas comissões triplicaram. O sistema é completo e os leads são quentes.',
    estrelas: 5,
  },
  {
    nome: 'Fernanda Costa',
    cargo: 'Corretora PJ',
    texto: 'O suporte pós-venda me dá liberdade para focar 100% em prospecção. Melhor parceria da minha carreira.',
    estrelas: 5,
  },
  {
    nome: 'Marcos Oliveira',
    cargo: 'Corretor MEI',
    texto: 'Material de vendas profissional, gerador de banner e CRM top. Não preciso mais investir em ferramentas externas.',
    estrelas: 5,
  },
];

const NUMEROS = [
  { valor: '200+', label: 'Corretores Ativos' },
  { valor: 'R$ 2M+', label: 'Comissões Pagas/mês' },
  { valor: '15+', label: 'Operadoras Parceiras' },
  { valor: '98%', label: 'Satisfação dos Corretores' },
];

const FAQ_ITEMS = [
  {
    q: 'Preciso ter SUSEP para me cadastrar?',
    a: 'Sim, é necessário ter registro ativo na SUSEP para atuar como corretor. Se você está em processo de obtenção, pode se cadastrar mesmo assim e informar quando obtiver.',
  },
  {
    q: 'Qual o valor de investimento para começar?',
    a: 'Zero. Não cobramos nenhuma taxa de adesão, mensalidade ou licença. Você só precisa de vontade de vender. Todo o investimento em plataforma, leads e marketing é por nossa conta.',
  },
  {
    q: 'Como funciona o pagamento das comissões?',
    a: 'As comissões são depositadas diretamente na sua conta bancária cadastrada no painel. Você acompanha tudo em tempo real no dashboard Financeiro, com extrato detalhado.',
  },
  {
    q: 'Posso trabalhar com outras corretoras ao mesmo tempo?',
    a: 'Sim, não exigimos exclusividade. Porém, nossos diferenciais de comissão e plataforma fazem com que a maioria dos corretores concentrem suas operações conosco.',
  },
  {
    q: 'Quais operadoras vocês trabalham?',
    a: 'Trabalhamos com as maiores operadoras do Brasil: Amil, Bradesco Saúde, SulAmérica, Unimed, NotreDame Intermédica, Porto Seguro Saúde e muitas outras.',
  },
  {
    q: 'Recebo leads da corretora?',
    a: 'Sim. Investimos fortemente em marketing digital e distribuímos leads qualificados para nossa equipe de corretores, direto no CRM da plataforma.',
  },
];

// ─── Componente de Seção ───────────────────────────────────
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} id={id} className={`relative py-20 lg:py-28 ${className}`}>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {children}
      </motion.div>
    </section>
  );
}

// ─── FAQ Accordion ─────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
      >
        <span className="text-sm lg:text-base font-semibold text-white pr-4">{q}</span>
        <ChevronDown className={`h-5 w-5 text-[#D4AF37] flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-sm text-white/60 pb-5 leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

// ─── Página Principal ──────────────────────────────────────
export default function SejaCorretorPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-montserrat overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════ */}
      {/*  HEADER                                            */}
      {/* ═══════════════════════════════════════════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/images/logos/LOGO 1 SEM FUNDO.png"
              alt="Humano Saúde"
              width={180}
              height={60}
              className="h-10 lg:h-14 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/corretor/cadastro"
              className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs tracking-wider hover:bg-[#F6E05E] transition-all"
            >
              QUERO SER CORRETOR
            </Link>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  HERO                                              */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#1a1508_0%,_#050505_50%,_#000_100%)]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/3 blur-[120px] rounded-full" />
          {/* Grid sutil */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center pt-28 pb-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-xs font-bold tracking-widest mb-8"
          >
            <Briefcase className="h-3.5 w-3.5" />
            PROGRAMA DE CORRETORES 2026
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] mb-6 font-cinzel"
          >
            <span className="text-white">Sua Carreira</span>
            <br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F6E05E] to-[#D4AF37] bg-clip-text text-transparent">
              Merece Mais.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            As <strong className="text-white">melhores comissões</strong> do mercado de planos de saúde,
            uma <strong className="text-white">plataforma completa</strong> de gestão e{' '}
            <strong className="text-white">leads qualificados</strong> para você vender mais.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/dashboard/corretor/cadastro"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#aa771c] text-black font-bold text-sm tracking-wider hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all"
            >
              SOLICITAR MINHA VAGA
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#diferenciais"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-white/80 text-sm font-semibold hover:bg-white/5 transition-all"
            >
              CONHEÇA OS BENEFÍCIOS
              <ChevronDown className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Números rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
          >
            {NUMEROS.map((n) => (
              <div key={n.label} className="text-center">
                <p className="text-2xl md:text-3xl font-black text-[#D4AF37] font-cinzel">{n.valor}</p>
                <p className="text-xs text-white/40 mt-1 tracking-wider">{n.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="h-6 w-6 text-[#D4AF37]/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  DIFERENCIAIS                                      */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section id="diferenciais" className="bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-bold tracking-[4px] mb-4 block">POR QUE NOS ESCOLHER</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-cinzel">
              Diferenciais{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] bg-clip-text text-transparent">Exclusivos</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFERENCIAIS.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.title}
                  variants={fadeUp}
                  custom={i + 1}
                  className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/20 hover:bg-[#D4AF37]/[0.02] transition-all duration-500"
                >
                  {/* Highlight badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold tracking-wider">
                      {d.highlight}
                    </span>
                  </div>

                  <div className="h-12 w-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-colors">
                    <Icon className="h-6 w-6 text-[#D4AF37]" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{d.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{d.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  COMISSÕES — Grande destaque                       */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section className="bg-gradient-to-b from-[#050505] via-[#0a0804] to-[#050505]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-bold tracking-[4px] mb-4 block">TABELA DE COMISSÕES</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-cinzel mb-4">
              Ganhe{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] bg-clip-text text-transparent">Muito Mais</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Nossas comissões são referência no mercado. Sem teto, sem limite. Quanto mais você vende, mais você ganha.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Individual */}
            <motion.div variants={fadeUp} custom={1} className="relative bg-white/[0.02] border border-white/10 rounded-2xl p-8 text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-bold tracking-widest">INDIVIDUAL</span>
              </div>
              <HeartHandshake className="h-10 w-10 text-[#D4AF37] mx-auto mb-4" />
              <p className="text-4xl font-black text-white font-cinzel mb-1">40%</p>
              <p className="text-sm text-white/40 mb-4">Comissão sobre a venda</p>
              <ul className="text-xs text-white/50 space-y-2 text-left">
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" /> Recorrência vitalícia</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" /> Pagamento mensal garantido</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" /> Sem taxa de adesão</li>
              </ul>
            </motion.div>

            {/* Empresarial — destaque */}
            <motion.div variants={fadeUp} custom={2} className="relative bg-gradient-to-b from-[#D4AF37]/10 to-transparent border-2 border-[#D4AF37]/30 rounded-2xl p-8 text-center scale-105">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full bg-[#D4AF37] text-black text-[10px] font-black tracking-widest">EMPRESARIAL</span>
              </div>
              <Award className="h-10 w-10 text-[#D4AF37] mx-auto mb-4" />
              <p className="text-5xl font-black text-[#D4AF37] font-cinzel mb-1">80%</p>
              <p className="text-sm text-white/40 mb-4">Comissão sobre a venda</p>
              <ul className="text-xs text-white/50 space-y-2 text-left">
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#D4AF37] flex-shrink-0" /> Maior comissão do mercado</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#D4AF37] flex-shrink-0" /> Bonificação por carteira</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#D4AF37] flex-shrink-0" /> Suporte pós-venda dedicado</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-[#D4AF37] flex-shrink-0" /> Leads empresariais exclusivos</li>
              </ul>
            </motion.div>

            {/* Adesão */}
            <motion.div variants={fadeUp} custom={3} className="relative bg-white/[0.02] border border-white/10 rounded-2xl p-8 text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-bold tracking-widest">ADESÃO</span>
              </div>
              <Users className="h-10 w-10 text-[#D4AF37] mx-auto mb-4" />
              <p className="text-4xl font-black text-white font-cinzel mb-1">50%</p>
              <p className="text-sm text-white/40 mb-4">Comissão sobre a venda</p>
              <ul className="text-xs text-white/50 space-y-2 text-left">
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" /> Planos por adesão facilitados</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" /> Tabelas negociadas</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-400 flex-shrink-0" /> Comissionamento acelerado</li>
              </ul>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div variants={fadeUp} custom={4} className="text-center mt-12">
            <Link
              href="/dashboard/corretor/cadastro"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#D4AF37] text-black font-bold text-sm tracking-wider hover:bg-[#F6E05E] transition-all"
            >
              COMEÇAR AGORA
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  COMO FUNCIONA                                     */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section className="bg-[#050505]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-bold tracking-[4px] mb-4 block">PROCESSO SIMPLES</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-cinzel">
              Como{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] bg-clip-text text-transparent">Funciona</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {COMO_FUNCIONA.map((item, i) => {
              const StepIcon = item.icon;
              return (
                <motion.div key={item.step} variants={fadeUp} custom={i + 1} className="text-center">
                  <div className="relative mx-auto mb-6">
                    <div className="h-20 w-20 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mx-auto">
                      <StepIcon className="h-10 w-10 text-[#D4AF37]" />
                    </div>
                    <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-[#D4AF37] text-black text-xs font-black flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  PLATAFORMA — Preview                              */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section className="bg-gradient-to-b from-[#050505] via-[#0a0804] to-[#050505]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-bold tracking-[4px] mb-4 block">TECNOLOGIA</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-cinzel mb-4">
              Sua{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] bg-clip-text text-transparent">Plataforma</span>
              {' '}Completa
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Um painel profissional, moderno e integrado para você gerenciar toda sua operação de vendas.
            </p>
          </motion.div>

          <motion.div variants={scaleIn} className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            {/* Mockup do painel */}
            <div className="p-6 lg:p-10">
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Leads Ativos', value: '47', icon: Users, color: 'text-blue-400' },
                  { label: 'Propostas', value: '23', icon: Briefcase, color: 'text-green-400' },
                  { label: 'Comissões', value: 'R$ 18.5K', icon: DollarSign, color: 'text-[#D4AF37]' },
                  { label: 'Conversão', value: '68%', icon: TrendingUp, color: 'text-purple-400' },
                ].map((card) => {
                  const CardIcon = card.icon;
                  return (
                    <div key={card.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CardIcon className={`h-4 w-4 ${card.color}`} />
                        <span className="text-xs text-white/40">{card.label}</span>
                      </div>
                      <p className="text-2xl font-bold text-white">{card.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 h-48">
                  <p className="text-xs text-white/40 mb-3 font-semibold">PIPELINE KANBAN</p>
                  <div className="flex gap-3 h-32">
                    {['Novo', 'Cotação', 'Proposta', 'Fechado'].map((stage, i) => (
                      <div key={stage} className="flex-1 bg-white/[0.02] border border-white/5 rounded-lg p-2">
                        <p className="text-[10px] text-white/30 mb-2">{stage}</p>
                        {Array.from({ length: 3 - i }).map((_, j) => (
                          <div key={j} className="h-4 rounded bg-white/5 mb-1.5" />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 h-48">
                  <p className="text-xs text-white/40 mb-3 font-semibold">PRODUÇÃO MENSAL</p>
                  <div className="flex items-end gap-2 h-32 pb-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 95, 60, 75, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-[#D4AF37]/40 to-[#D4AF37]/10 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Gradiente overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
          </motion.div>

          <motion.div variants={fadeUp} custom={2} className="text-center mt-8">
            <p className="text-sm text-white/40">CRM · Pipeline · Cotações · Financeiro · Materiais · Ranking — tudo em um só lugar</p>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  DEPOIMENTOS                                       */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section className="bg-[#050505]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-bold tracking-[4px] mb-4 block">DEPOIMENTOS</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-cinzel">
              Quem Já{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] bg-clip-text text-transparent">Faz Parte</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {DEPOIMENTOS.map((d, i) => (
              <motion.div
                key={d.nome}
                variants={fadeUp}
                custom={i + 1}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: d.estrelas }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-6 italic">&ldquo;{d.texto}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                    {d.nome.split(' ').map((w) => w[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{d.nome}</p>
                    <p className="text-xs text-white/40">{d.cargo}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  FAQ                                               */}
      {/* ═══════════════════════════════════════════════════ */}
      <Section id="faq" className="bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-12">
            <span className="text-[#D4AF37] text-xs font-bold tracking-[4px] mb-4 block">DÚVIDAS</span>
            <h2 className="text-3xl md:text-4xl font-black font-cinzel">
              Perguntas{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] bg-clip-text text-transparent">Frequentes</span>
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} custom={1}>
            {FAQ_ITEMS.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  CTA FINAL                                         */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-[#050505] to-[#D4AF37]/5" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Gift className="h-12 w-12 text-[#D4AF37] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-cinzel mb-4">
              Pronto para{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] bg-clip-text text-transparent">
                Crescer?
              </span>
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
              Junte-se à rede de corretores que mais cresce no Brasil.
              Vagas limitadas para sua região.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard/corretor/cadastro"
                className="group flex items-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#aa771c] text-black font-black text-sm tracking-widest hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] transition-all"
              >
                SOLICITAR MINHA VAGA
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/5521988179407?text=Olá! Tenho interesse em ser corretor Humano Saúde."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold hover:bg-[#D4AF37]/5 transition-all"
              >
                <Phone className="h-4 w-4" />
                FALAR COM COMERCIAL
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/*  FOOTER                                            */}
      {/* ═══════════════════════════════════════════════════ */}
      <footer className="bg-black border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logos/LOGO 1 SEM FUNDO.png"
                alt="Humano Saúde"
                width={140}
                height={47}
                className="h-10 w-auto"
              />
              <div className="h-6 w-px bg-white/10" />
              <span className="text-xs text-white/30">Programa de Corretores 2026</span>
            </div>

            <div className="flex items-center gap-6 text-xs text-white/40">
              <a href="mailto:comercial@humanosaude.com.br" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" /> comercial@humanosaude.com.br
              </a>
              <a href="https://wa.me/5521988179407" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" /> (21) 98817-9407
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[11px] text-white/20">
              © {new Date().getFullYear()} Humano Saúde — Todos os direitos reservados. CNPJ: XX.XXX.XXX/0001-XX
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
