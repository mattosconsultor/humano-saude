"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  TrendingUp,
  Target,
  ChevronDown,
  X,
  LogOut,
  HelpCircle,
  Crosshair,
  BarChart3,
  BrainCircuit,
  Gauge,
  Scale,
  ShieldAlert,
  UsersRound,
  Settings,
  Sparkles,
  ShoppingCart,
  LifeBuoy,
  Activity,
  Link2,
  MessageSquare,
  Route,
  Radar,
  Webhook,
  Wrench,
  Megaphone,
  Calendar,
  Image,
  LineChart,
  Mail,
  Users,
  Package,
  Ticket,
  CreditCard,
  FileText,
  Heart,
  Eye,
  Palette,
  Zap,
  Clock,
  PieChart,
  DollarSign,
  MessagesSquare,
  Cog,
  User,
  Shield,
  Database,
  Bell,
  Send,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import Logo, { LogoIcon } from "./Logo"

// ============================================
// TIPOS
// ============================================

interface SubItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: { text: string; variant: BadgeVariant }
}

type BadgeVariant = "default" | "gold" | "success" | "danger" | "warning" | "blue" | "green"

interface SidebarItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  badge?: { text: string; variant: BadgeVariant }
  color?: "blue" | "green"
  children?: SubItem[]
}

// ============================================
// CONSTANTE BASE
// ============================================

const P = "/portal-interno-hks-2026"

// ============================================
// MENU — MATCHING EXATO DO DESIGN (IMAGENS)
// ============================================

const sidebarItems: SidebarItem[] = [
  {
    id: "analytics",
    label: "Analytics",
    icon: TrendingUp,
    href: `${P}/analytics`,
    badge: { text: "GA4", variant: "danger" },
  },
  {
    id: "cockpit",
    label: "Cockpit",
    icon: Target,
    children: [
      { id: "cockpit-campanhas", label: "Campanhas", icon: Crosshair, href: `${P}/cockpit/campanhas` },
      { id: "cockpit-consolidado", label: "Consolidado", icon: BarChart3, href: `${P}/cockpit/consolidado`, badge: { text: "NOVO", variant: "danger" } },
    ],
  },
  {
    id: "ai-performance",
    label: "AI Performance",
    icon: BrainCircuit,
    children: [
      { id: "ai-dashboard", label: "Dashboard IA", icon: Gauge, href: `${P}/ai-performance/dashboard-ia` },
      { id: "ai-escala", label: "Escala Automática", icon: Scale, href: `${P}/ai-performance/escala-automatica` },
      { id: "ai-regras", label: "Regras de Alerta", icon: ShieldAlert, href: `${P}/ai-performance/regras-alerta` },
      { id: "ai-publicos", label: "Públicos", icon: UsersRound, href: `${P}/ai-performance/publicos` },
      { id: "ai-config-meta", label: "Configurações Meta", icon: Settings, href: `${P}/ai-performance/configuracoes-meta` },
    ],
  },
  {
    id: "automacao",
    label: "Automação",
    icon: Sparkles,
    children: [
      { id: "auto-carrinhos", label: "Carrinhos Abandonados", icon: ShoppingCart, href: `${P}/automacao/carrinhos-abandonados` },
      { id: "auto-sala", label: "Sala de Recuperação", icon: LifeBuoy, href: `${P}/automacao/sala-recuperacao` },
      { id: "auto-tracking", label: "Tracking Dashboard", icon: Activity, href: `${P}/automacao/tracking-dashboard` },
      { id: "auto-links", label: "Links Rastreáveis", icon: Link2, href: `${P}/automacao/links-rastreaveis` },
      { id: "auto-mensagens", label: "Mensagens Rastreáveis", icon: MessageSquare, href: `${P}/automacao/mensagens-rastreaveis` },
      { id: "auto-jornada", label: "Jornada de Compra", icon: Route, href: `${P}/automacao/jornada-compra` },
      { id: "auto-pixel", label: "Disparos de Pixel", icon: Radar, href: `${P}/automacao/disparos-pixel` },
      { id: "auto-webhook-disparos", label: "Disparos de Webhook", icon: Zap, href: `${P}/automacao/disparos-webhook` },
      { id: "auto-config", label: "Config. Tracking", icon: Wrench, href: `${P}/automacao/config-tracking` },
      { id: "auto-webhooks", label: "Webhooks", icon: Webhook, href: `${P}/automacao/webhooks` },
    ],
  },
  {
    id: "configuracoes",
    label: "Configurações",
    icon: Cog,
    children: [
      { id: "config-geral", label: "Geral", icon: Settings, href: `${P}/configuracoes` },
      { id: "config-perfil", label: "Perfil", icon: User, href: `${P}/perfil` },
      { id: "config-seguranca", label: "Segurança", icon: Shield, href: `${P}/seguranca` },
      { id: "config-integracoes", label: "Integrações", icon: Database, href: `${P}/integracoes` },
      { id: "config-notificacoes", label: "Notificações", icon: Bell, href: `${P}/notificacoes` },
    ],
  },
  {
    id: "social-flow",
    label: "Social Flow",
    icon: Send,
    children: [
      { id: "sf-dashboard", label: "Dashboard", icon: LayoutDashboard, href: `${P}/social-flow` },
      { id: "sf-calendario", label: "Calendário", icon: Calendar, href: `${P}/social-flow/calendar` },
      { id: "sf-biblioteca", label: "Biblioteca", icon: Image, href: `${P}/social-flow/library` },
      { id: "sf-analytics", label: "Analytics", icon: LineChart, href: `${P}/social-flow/analytics` },
      { id: "sf-config", label: "Configurações", icon: Settings, href: `${P}/social-flow/settings` },
    ],
  },
  {
    id: "emails",
    label: "E-mails",
    icon: Mail,
    children: [
      { id: "email-inbox", label: "Inbox", icon: Mail, href: `${P}/email` },
      { id: "email-campanhas", label: "Campanhas", icon: Megaphone, href: `${P}/email/campanhas` },
      { id: "email-templates", label: "Templates", icon: FileText, href: `${P}/email/templates` },
    ],
  },
  {
    id: "gestao",
    label: "Gestão",
    icon: UsersRound,
    children: [
      { id: "gestao-crm", label: "CRM", icon: UsersRound, href: `${P}/leads` },
      { id: "gestao-clientes", label: "Clientes", icon: Users, href: `${P}/clientes` },
      { id: "gestao-produtos", label: "Produtos", icon: Package, href: `${P}/cotacoes` },
      { id: "gestao-cupons", label: "Cupons", icon: Ticket, href: `${P}/contratos` },
      { id: "gestao-pagamentos", label: "Pagamentos", icon: CreditCard, href: `${P}/financeiro` },
      { id: "gestao-relatorios", label: "Relatórios", icon: BarChart3, href: `${P}/relatorios` },
    ],
  },
  {
    id: "lovable",
    label: "Lovable",
    icon: Heart,
    children: [
      { id: "lovable-chat", label: "Chat", icon: MessagesSquare, href: `${P}/chat` },
      { id: "lovable-insights", label: "Insights IA", icon: Sparkles, href: `${P}/insights` },
    ],
  },
  {
    id: "meta-ads",
    label: "Meta Ads",
    icon: Eye,
    color: "blue",
    children: [
      { id: "meta-visao", label: "Visão Geral", icon: LayoutDashboard, href: `${P}/meta-ads` },
      { id: "meta-campanhas", label: "Campanhas", icon: Target, href: `${P}/meta-ads/campanhas` },
      { id: "meta-criativos", label: "Criativos", icon: Palette, href: `${P}/meta-ads/criativos` },
      { id: "meta-engajamento", label: "Engajamento", icon: Zap, href: `${P}/meta-ads/engajamento` },
      { id: "meta-historico", label: "Histórico", icon: Clock, href: `${P}/meta-ads/historico` },
      { id: "meta-demografico", label: "Demográfico", icon: PieChart, href: `${P}/meta-ads/demografico` },
    ],
  },
  {
    id: "vendas",
    label: "Vendas",
    icon: DollarSign,
    href: `${P}/vendas`,
  },
  {
    id: "visao-geral",
    label: "Visão Geral",
    icon: LayoutDashboard,
    href: P,
    color: "green",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessagesSquare,
    href: `${P}/whatsapp`,
    color: "green",
    badge: { text: "8", variant: "success" },
  },
]

// ============================================
// BADGE VARIANTS
// ============================================

const badgeStyles: Record<BadgeVariant, string> = {
  default: "bg-white/10 text-white",
  gold: "bg-gradient-to-r from-[#D4AF37] to-[#F6E05E] text-black",
  success: "bg-green-500/20 text-green-400",
  danger: "bg-red-500 text-white",
  warning: "bg-yellow-500/20 text-yellow-400",
  blue: "bg-blue-500/20 text-blue-400",
  green: "bg-green-500/20 text-green-400",
}

// Resolve cor de destaque por grupo
function resolveColors(item: SidebarItem, isHighlighted: boolean) {
  if (item.color === "blue") {
    return {
      parentBg: isHighlighted ? "bg-blue-600/15 border border-blue-500/30" : "border border-transparent hover:bg-white/5",
      icon: isHighlighted ? "text-blue-400" : "text-white/50",
      text: isHighlighted ? "text-blue-400" : "text-white/70",
      childActive: "bg-blue-600/15 text-blue-300",
    }
  }
  if (item.color === "green") {
    return {
      parentBg: isHighlighted ? "bg-green-600/15 border border-green-500/30" : "border border-transparent hover:bg-white/5",
      icon: isHighlighted ? "text-green-400" : "text-white/50",
      text: isHighlighted ? "text-green-400" : "text-white/70",
      childActive: "bg-green-600/15 text-green-300",
    }
  }
  return {
    parentBg: isHighlighted ? "bg-white/5 border border-transparent" : "border border-transparent hover:bg-white/5",
    icon: isHighlighted ? "text-white" : "text-white/50",
    text: isHighlighted ? "text-white" : "text-white/70",
    childActive: "bg-white/5 text-white",
  }
}

// ============================================
// COMPONENTE
// ============================================

export default function DockSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set())
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => pathname === href
  const isChildActive = (item: SidebarItem) =>
    item.children?.some((c) => pathname === c.href || pathname.startsWith(c.href + "/")) ?? false

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleLogout = async () => {
    try { await fetch("/api/auth/logout", { method: "POST" }) } catch { /* redirect anyway */ }
    router.push("/admin-login")
  }

  // Auto-abrir pai do item ativo
  const effectiveOpen = new Set(openMenus)
  sidebarItems.forEach((item) => {
    if (item.children && isChildActive(item)) effectiveOpen.add(item.id)
  })

  // ============================================
  // RENDER MENU ITEMS
  // ============================================

  const renderMenu = (expanded: boolean, onNav?: () => void) => (
    <nav className="space-y-0.5 px-2">
      {sidebarItems.map((item) => {
        const Icon = item.icon
        const hasChildren = !!item.children?.length
        const isOpen = effectiveOpen.has(item.id)
        const active = item.href ? isActive(item.href) : false
        const highlighted = active || (hasChildren && (isOpen || isChildActive(item)))
        const colors = resolveColors(item, highlighted)

        // Link direto (sem filhos)
        if (!hasChildren && item.href) {
          return (
            <Link key={item.id} href={item.href} onClick={onNav}>
              <div className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative", colors.parentBg)}>
                <Icon className={cn("h-5 w-5 flex-shrink-0", colors.icon)} />
                {expanded && (
                  <>
                    <span className={cn("text-sm font-medium flex-1 truncate", colors.text)}>{item.label}</span>
                    {item.badge && (
                      <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-bold", badgeStyles[item.badge.variant])}>{item.badge.text}</span>
                    )}
                  </>
                )}
                {!expanded && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60]">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                  </div>
                )}
              </div>
            </Link>
          )
        }

        // Accordion (com filhos)
        return (
          <div key={item.id}>
            <button
              onClick={() => expanded ? toggleMenu(item.id) : setIsExpanded(true)}
              className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative", colors.parentBg)}
            >
              <Icon className={cn("h-5 w-5 flex-shrink-0", colors.icon)} />
              {expanded && (
                <>
                  <span className={cn("text-sm font-medium flex-1 text-left truncate", colors.text)}>{item.label}</span>
                  {item.badge && (
                    <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-bold mr-1", badgeStyles[item.badge.variant])}>{item.badge.text}</span>
                  )}
                  <ChevronDown className={cn("h-4 w-4 text-white/40 transition-transform duration-200", isOpen && "rotate-180")} />
                </>
              )}
              {!expanded && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60]">
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-white/40 mt-0.5">{item.children?.length} sub-itens</p>
                </div>
              )}
            </button>

            <AnimatePresence>
              {isOpen && expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="ml-4 pl-3 border-l border-white/10 mt-1 space-y-0.5">
                    {item.children?.map((child) => {
                      const ChildIcon = child.icon
                      const childIsActive = isActive(child.href) || pathname.startsWith(child.href + "/")
                      return (
                        <Link key={child.id} href={child.href} onClick={onNav}>
                          <div className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                            childIsActive ? colors.childActive : "text-white/60 hover:text-white/80 hover:bg-white/5"
                          )}>
                            <ChildIcon className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm truncate">{child.label}</span>
                            {child.badge && (
                              <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-bold ml-auto", badgeStyles[child.badge.variant])}>{child.badge.text}</span>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </nav>
  )

  // ============================================
  // FOOTER
  // ============================================

  const renderFooter = (expanded: boolean, onNav?: () => void) => (
    <div className="border-t border-white/10 p-2 space-y-1">
      <Link href="/ajuda" onClick={onNav}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group relative">
          <HelpCircle className="h-5 w-5 text-white/50 flex-shrink-0" />
          {expanded && <span className="text-sm text-white/70">Ajuda</span>}
          {!expanded && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60]">
              <p className="text-sm text-white">Ajuda</p>
            </div>
          )}
        </div>
      </Link>
      <div
        onClick={() => { onNav?.(); handleLogout() }}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group relative"
      >
        <LogOut className="h-5 w-5 text-white/50 flex-shrink-0" />
        {expanded && <span className="text-sm text-white/70">Sair</span>}
        {!expanded && (
          <div className="absolute left-full ml-2 px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60]">
            <p className="text-sm text-white">Sair</p>
          </div>
        )}
      </div>
    </div>
  )

  // ============================================
  // RENDER
  // ============================================

  return (
    <>
      {/* DESKTOP */}
      <motion.aside
        initial={{ width: 72 }}
        animate={{ width: isExpanded ? 260 : 72 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="hidden lg:flex fixed left-0 top-0 h-screen bg-[#0B1215]/95 backdrop-blur-xl border-r border-white/10 flex-col z-50"
      >
        <div className="h-16 flex items-center justify-center border-b border-white/10 px-4 overflow-hidden">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div key="full" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }} className="flex items-center justify-center h-12">
                <Logo variant="2" size="sm" className="max-w-[160px] max-h-[40px]" />
              </motion.div>
            ) : (
              <motion.div key="icon" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }} className="flex items-center justify-center h-10 w-10">
                <LogoIcon variant="2" size="sm" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 sidebar-scroll">
          {renderMenu(isExpanded)}
        </div>
        {renderFooter(isExpanded)}
      </motion.aside>

      {/* MOBILE TOGGLE */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-4 right-4 h-14 w-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F6E05E] flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 z-50"
      >
        {isMobileOpen ? <X className="h-6 w-6 text-black" /> : <LayoutDashboard className="h-6 w-6 text-black" />}
      </button>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileOpen(false)} className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-[#0B1215]/98 backdrop-blur-xl border-r border-white/10 flex flex-col z-50"
            >
              <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                <Logo variant="2" size="sm" className="max-w-[140px] max-h-[36px]" />
                <button onClick={() => setIsMobileOpen(false)} className="h-8 w-8 rounded-lg hover:bg-white/5 flex items-center justify-center">
                  <X className="h-5 w-5 text-white/60" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-3 sidebar-scroll">
                {renderMenu(true, () => setIsMobileOpen(false))}
              </div>
              {renderFooter(true, () => setIsMobileOpen(false))}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
