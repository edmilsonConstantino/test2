import React, { useState } from 'react';
import {
  Target,
  Eye,
  Heart,
  Flag,
  Landmark,
  Users,
  ShieldCheck,
  Rocket,
  Globe,
  Share2,
  Shield,
  Star,
  ArrowRight,
  Menu,
  Search,
  Bell,
  ChevronDown,
  Calendar,
  X,
  ChevronRight,
  Home,
  Check
} from 'lucide-react';

interface AboutVilaViewProps {
  onOpenMobileMenu?: () => void;
  onNavigateToTab?: (tabId: string) => void;
  onOpenAiAssistant?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

export const AboutVilaView: React.FC<AboutVilaViewProps> = ({
  onOpenMobileMenu,
  onNavigateToTab = (_tabId: string) => {},
  onOpenAiAssistant = () => {},
  onOpenAuth = (_mode: 'login' | 'register') => {},
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedPillarModal, setSelectedPillarModal] = useState<typeof pillars[0] | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activePillar, setActivePillar] = useState<number | null>(null);

  const pillars = [
    {
      id: 1,
      title: 'GOVERNANÇA ABERTA',
      desc: 'Transparência, participação e responsabilidade em todas as ações.',
      extendedDesc: 'A infraestrutura da VILA é construída sobre protocolos de dados abertos e governação auditável. Cada tomada de decisão e fluxo de investimento é rastreável, garantindo legitimidade institucional e empoderamento cívico em cada território.',
      icon: <Landmark className="w-5 h-5 stroke-[2.2]" />,
      bg: 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC]',
      border: 'border-blue-100/90 dark:border-blue-500/20',
      tag: 'Transparência & Governança',
    },
    {
      id: 2,
      title: 'COLABORAÇÃO GLOBAL',
      desc: 'Parcerias que multiplicam recursos, conhecimento e oportunidades.',
      extendedDesc: 'Unimos governos locais, ONGs, empresas sociais e cidadãos ativos numa rede transfronteiriça de entreajuda. Ao eliminar silos geográficos, soluções testadas com sucesso num continente são replicadas noutros.',
      icon: <Users className="w-5 h-5 stroke-[2.2]" />,
      bg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500',
      border: 'border-emerald-100/90 dark:border-emerald-500/20',
      tag: 'Redes & Cooperação',
    },
    {
      id: 3,
      title: 'DADOS CONFIÁVEIS',
      desc: 'Informação segura, integrada e acessível para todos.',
      extendedDesc: 'Garantimos integridade estatística e privacidade de ponta a ponta. Monitorizamos indicadores dos Objetivos de Desenvolvimento Sustentável (ODS) com precisão geoespacial para orientar investimentos onde são mais urgentes.',
      icon: <ShieldCheck className="w-5 h-5 stroke-[2.2]" />,
      bg: 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC]',
      border: 'border-blue-100/90 dark:border-blue-500/20',
      tag: 'Inteligência & Segurança',
    },
    {
      id: 4,
      title: 'INOVAÇÃO CONTÍNUA',
      desc: 'Tecnologia e criatividade para resolver os desafios de hoje e de amanhã.',
      extendedDesc: 'Desenvolvemos algoritmos preditivos, interfaces intuitivas e ferramentas colaborativas em tempo real. A tecnologia na VILA é humanizada, acelerando soluções para clima, educação e regeneração económica.',
      icon: <Rocket className="w-5 h-5 stroke-[2.2]" />,
      bg: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
      border: 'border-purple-100/90 dark:border-purple-500/20',
      tag: 'Tecnologia & Futuro',
    },
    {
      id: 5,
      title: 'FOCO NAS PESSOAS',
      desc: 'As pessoas estão no centro de tudo o que fazemos.',
      extendedDesc: 'Nenhuma tecnologia tem valor sem dignidade humana. Cada recurso e funcionalidade da VILA é concebido a partir de necessidades reais das comunidades, assegurando acessibilidade universal, escuta ativa e respeito pela diversidade cultural.',
      icon: <Users className="w-5 h-5 stroke-[2.2]" />,
      bg: 'bg-amber-50 dark:bg-amber-500/10 text-amber-500',
      border: 'border-amber-100/90 dark:border-amber-500/20',
      tag: 'Impacto Humano',
    },
  ];

  const objectives = [
    'Conectar pessoas, organizações e territórios num ecossistema global inclusivo.',
    'Promover transparência, participação e boa governança.',
    'Impulsionar iniciativas e projetos que geram impacto positivo e mensurável.',
    'Disponibilizar dados confiáveis e inteligência para decisões melhores.',
    'Fomentar uma comunidade global colaborativa e inovadora.',
    'Contribuir para um futuro sustentável, equilibrado e humano.',
  ];

  const timelineMilestones = [
    {
      year: '2018',
      title: 'A ideia nasce',
      desc: 'O sonho de conectar o mundo para gerar impacto.',
      details: 'Conceção da infraestrutura digital VILA por um consórcio internacional de inovadores sociais, urbanistas e defensores de direitos cívicos em Lisboa e Genebra.',
      status: 'completed',
    },
    {
      year: '2020',
      title: 'Primeiros passos',
      desc: 'Lançamento da plataforma e primeiros parceiros.',
      details: 'Lançamento da versão 1.0 em 12 países e integração de mais de 50 organizações comunitárias pioneiras na monitorização transparente de iniciativas locais.',
      status: 'completed',
    },
    {
      year: '2022',
      title: 'Expansão global',
      desc: 'Crescimento da rede e projetos em escala global.',
      details: 'Atingimento de 78 nações com mais de 300 iniciativas ativas e incorporação de IA geoespacial para mapeamento de vulnerabilidades territoriais.',
      status: 'completed',
    },
    {
      year: 'Hoje',
      title: 'Construindo o futuro',
      desc: 'Mais impacto, mais pessoas, mais VILA.',
      details: 'Superação do marco de 23 milhões de pessoas beneficiadas, integração de mapas em tempo real e consolidação de parcerias com mais de 800 organizações e agências internacionais.',
      status: 'active',
    },
  ];

  const filteredPillars = pillars.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-16 font-sans antialiased text-slate-900 dark:text-slate-50 select-text">
      {/* 1. Header / Topbar - Exact Match to Screenshot 9 UI VILA SOBRE */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 lg:px-8 py-3 font-sans">
        <div className="max-w-[1540px] mx-auto flex items-center justify-between gap-4 font-sans">
          {/* Left: Mobile Toggle & Exact Breadcrumb */}
          <div className="flex items-center gap-2.5 min-w-0 font-sans">
            {onOpenMobileMenu && (
              <button
                type="button"
                onClick={onOpenMobileMenu}
                className="md:hidden p-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer shadow-2xs mr-1 font-sans"
                aria-label="Abrir menu lateral"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* Breadcrumb matching screenshot: blue outline home icon, text and separator */}
            <nav className="flex items-center gap-2 text-[13px] font-medium truncate font-sans">
              <button
                type="button"
                onClick={() => onNavigateToTab('comunidade')}
                className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-[#1455AC] transition-colors cursor-pointer group font-sans"
              >
                <Home className="w-4 h-4 text-[#1455AC] group-hover:scale-105 transition-transform" />
                <span className="font-semibold text-slate-900 dark:text-slate-50">Comunidade Global</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" strokeWidth={2.5} />
              <span className="font-bold text-slate-900 dark:text-slate-50 tracking-tight truncate">Sobre a VILA</span>
            </nav>
          </div>

          {/* Center: Search pill matching screenshot */}
          <div className="relative hidden md:block w-72 lg:w-96 font-sans">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar..."
              className="w-full pl-9 pr-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-[#1455AC] focus:ring-1 focus:ring-[#1455AC]/20 transition-all shadow-2xs font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-sans"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center gap-3 font-sans">
            {/* Notification Bell with solid blue badge '3' */}
            <div className="relative font-sans">
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer font-sans"
                aria-label="Notificações"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1455AC] text-white text-[9.5px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                  3
                </span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-3.5 z-50 animate-in fade-in slide-in-from-top-2 font-sans">
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800 font-sans">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Notificações Globais</span>
                    <span className="text-[10px] text-[#1455AC] font-bold hover:underline cursor-pointer font-sans">Marcar todas</span>
                  </div>
                  <div className="mt-2.5 space-y-2 text-xs font-sans">
                    <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-500/10 border border-blue-100/80 dark:border-blue-500/20 font-sans">
                      <p className="font-bold text-slate-900 dark:text-slate-50">Novo Marco Alcançado</p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">23M+ de cidadãos com impacto verificado na plataforma.</p>
                    </div>
                    <div className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 transition-colors font-sans">
                      <p className="font-bold text-slate-900 dark:text-slate-50">Iniciativa Apoiada em Moçambique</p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Educação digital em 24 escolas rurais ativada.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill matching screenshot: Divan Mellert | Administrador */}
            <div className="relative font-sans">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer shadow-2xs transition-colors font-sans"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                  alt="Divan Mellert"
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                />
                <div className="text-left hidden sm:block font-sans">
                  <p className="text-[11.5px] font-bold text-slate-900 dark:text-slate-50 leading-tight">Divan Mellert</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">Administrador</p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50 text-xs font-sans">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 font-sans">
                    <p className="font-bold text-slate-900 dark:text-slate-50">Divan Mellert</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">divan@vila.org</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateToTab('definicoes');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 mt-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-slate-700 dark:text-slate-300 cursor-pointer flex items-center justify-between"
                  >
                    <span>Definições do Perfil</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onOpenAuth('login');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 font-medium text-red-600 dark:text-red-400 cursor-pointer"
                  >
                    Terminar sessão
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Content Grid */}
      <main className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7">
          {/* Left Column (9 cols on LG/XL) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            
            {/* HERO SECTION: Sobre a VILA + Globe Graphic */}
            <section
              id="hero-about-vila"
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white via-[#F8FAFC] to-[#EFF6FF]/60 border border-slate-200 dark:border-slate-700 p-6 sm:p-8 lg:p-10 shadow-2xs transition-all hover:shadow-xs font-sans"
            >
              {/* Subtle background ambient reflections */}
              <div className="absolute -top-28 -right-28 w-[32rem] h-[32rem] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 font-sans">
                {/* Hero Typography */}
                <div className="max-w-xl font-sans">
                  <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 dark:text-slate-50 font-sans tracking-tight leading-[1.15]">
                    Sobre a <span className="text-[#1455AC]">VILA</span>
                  </h1>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-lg font-sans">
                    A VILA é a infraestrutura digital que conecta pessoas, organizações e territórios para criar impacto real e sustentável.
                  </p>

                  {/* Horizontal brand blue bar indicator from reference */}
                  <div className="w-14 h-1 bg-[#1455AC] rounded-full mt-5" />
                </div>

                {/* Hero Illustration: Realistic 3D Globe with Skyline, Trees & People Silhouettes */}
                <div className="w-full max-w-[340px] md:max-w-[420px] shrink-0 flex items-center justify-center">
                  <div className="relative w-72 h-56 sm:w-88 sm:h-64 flex items-center justify-center">
                    <svg viewBox="0 0 440 320" className="w-full h-full drop-shadow-md select-none" fill="none">
                      <defs>
                        {/* Glow surrounding globe */}
                        <radialGradient id="globe-halo" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
                          <stop offset="70%" stopColor="#1455AC" stopOpacity="0.1" />
                          <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
                        </radialGradient>
                        
                        {/* Realistic 3D Earth sphere gradient */}
                        <radialGradient id="earth-sphere" cx="30%" cy="25%" r="75%">
                          <stop offset="0%" stopColor="#93C5FD" />
                          <stop offset="25%" stopColor="#3B82F6" />
                          <stop offset="65%" stopColor="#11468F" />
                          <stop offset="95%" stopColor="#172554" />
                        </radialGradient>

                        {/* City Skylines Gradient */}
                        <linearGradient id="city-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#E0F2FE" />
                          <stop offset="100%" stopColor="#BAE6FD" />
                        </linearGradient>

                        {/* Grass Gradient */}
                        <linearGradient id="hill-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#34D399" />
                          <stop offset="40%" stopColor="#10B981" />
                          <stop offset="100%" stopColor="#047857" />
                        </linearGradient>
                      </defs>

                      {/* Atmosphere Glow */}
                      <circle cx="260" cy="130" r="115" fill="url(#globe-halo)" />

                      {/* Earth 3D Sphere */}
                      <circle cx="260" cy="130" r="82" fill="url(#earth-sphere)" stroke="#BFDBFE" strokeWidth="1.2" />

                      {/* Continents overlay (Africa, Europe, Americas representation) */}
                      {/* Europe & Africa */}
                      <path d="M245 80 Q 260 75 272 85 Q 285 98 275 115 Q 268 135 275 160 Q 265 175 250 165 Q 235 150 240 120 Q 248 100 245 80 Z" fill="#10B981" opacity="0.95" />
                      {/* Asia/Middle East */}
                      <path d="M280 82 Q 305 78 320 95 Q 330 115 315 130 Q 295 132 285 115 Z" fill="#059669" opacity="0.9" />
                      {/* Atlantic islands / South America glimpse */}
                      <path d="M205 125 Q 220 120 225 140 Q 215 170 200 165 Q 192 145 205 125 Z" fill="#34D399" opacity="0.88" />

                      {/* Specular White Highlight curved glare */}
                      <path d="M200 95 Q 230 65 275 75" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
                      
                      {/* Cloud Layers */}
                      <path d="M220 110 Q 250 100 280 105 Q 295 108 310 115" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
                      <path d="M235 145 Q 260 152 290 142" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.5" />

                      {/* City Skylines behind the hill and around the globe */}
                      {/* Left side modern skyscrapers */}
                      <rect x="35" y="145" width="20" height="70" rx="1.5" fill="url(#city-grad)" opacity="0.85" />
                      <polygon points="45,130 35,145 55,145" fill="#BAE6FD" />
                      <rect x="60" y="125" width="24" height="90" rx="2" fill="url(#city-grad)" opacity="0.95" />
                      <polygon points="72,112 60,125 84,125" fill="#93C5FD" />
                      <rect x="88" y="150" width="18" height="65" rx="1.5" fill="url(#city-grad)" opacity="0.8" />
                      <rect x="110" y="135" width="26" height="80" rx="2" fill="url(#city-grad)" opacity="0.9" />
                      <rect x="140" y="155" width="20" height="60" rx="1.5" fill="url(#city-grad)" opacity="0.85" />

                      {/* Right side skyline */}
                      <rect x="345" y="140" width="22" height="75" rx="2" fill="url(#city-grad)" opacity="0.85" />
                      <polygon points="356,128 345,140 367,140" fill="#BAE6FD" />
                      <rect x="372" y="150" width="26" height="65" rx="1.5" fill="url(#city-grad)" opacity="0.8" />
                      <rect x="402" y="160" width="18" height="55" rx="1.5" fill="url(#city-grad)" opacity="0.75" />

                      {/* Windows grid lines */}
                      <line x1="66" y1="135" x2="78" y2="135" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="66" y1="145" x2="78" y2="145" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="116" y1="145" x2="130" y2="145" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="116" y1="155" x2="130" y2="155" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" />

                      {/* Green Hill Landscape Base in Foreground */}
                      <path d="M0 265 Q 160 205 440 245 L 440 320 L 0 320 Z" fill="url(#hill-grad)" />

                      {/* Park Trees & Nature */}
                      <circle cx="80" cy="210" r="13" fill="#047857" />
                      <circle cx="70" cy="214" r="10" fill="#10B981" />
                      <circle cx="90" cy="216" r="9" fill="#34D399" />
                      <rect x="78" y="220" width="4" height="12" fill="#78350F" />

                      <circle cx="150" cy="222" r="12" fill="#059669" />
                      <circle cx="162" cy="225" r="9" fill="#10B981" />
                      <rect x="154" y="230" width="3.5" height="10" fill="#78350F" />

                      <circle cx="360" cy="220" r="14" fill="#047857" />
                      <circle cx="372" cy="224" r="10" fill="#10B981" />
                      <rect x="364" y="230" width="4" height="11" fill="#78350F" />

                      {/* Silhouette People / Citizens looking towards the globe */}
                      {/* Person 1 (Young woman) */}
                      <circle cx="178" cy="224" r="4.5" fill="#0F172A" />
                      <path d="M174 231 C174 227 182 227 182 231 L181 247 L175 247 Z" fill="#0F172A" />
                      <line x1="176" y1="247" x2="176" y2="260" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="180" y1="247" x2="180" y2="260" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

                      {/* Person 2 (Man standing tall) */}
                      <circle cx="198" cy="219" r="5" fill="#0F172A" />
                      <rect x="194" y="226" width="8" height="19" rx="2" fill="#0F172A" />
                      <line x1="196" y1="245" x2="196" y2="258" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="200" y1="245" x2="200" y2="258" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

                      {/* Person 3 (Child looking up) */}
                      <circle cx="214" cy="232" r="3.5" fill="#0F172A" />
                      <rect x="211.5" y="237" width="5" height="11" rx="1.5" fill="#0F172A" />
                      <line x1="213" y1="248" x2="213" y2="257" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
                      <line x1="215" y1="248" x2="215" y2="257" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />

                      {/* Person 4 (Professional pointing/observing) */}
                      <circle cx="230" cy="220" r="4.8" fill="#0F172A" />
                      <rect x="226" y="227" width="8" height="18" rx="2" fill="#0F172A" />
                      <line x1="228" y1="245" x2="228" y2="259" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="232" y1="245" x2="232" y2="259" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

                      {/* Person 5 */}
                      <circle cx="250" cy="222" r="4.5" fill="#0F172A" />
                      <rect x="246.5" y="229" width="7" height="17" rx="2" fill="#0F172A" />
                      <line x1="248" y1="246" x2="248" y2="260" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="252" y1="246" x2="252" y2="260" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

                      {/* Soft drifting clouds in the sky */}
                      <path d="M30 100 Q 40 86 55 90 Q 70 86 75 100 Q 80 114 65 114 L 40 114 Q 25 114 30 100 Z" fill="#FFFFFF" opacity="0.7" />
                      <path d="M330 85 Q 340 72 355 76 Q 370 74 375 86 Q 380 98 365 98 L 340 98 Q 325 98 330 85 Z" fill="#FFFFFF" opacity="0.65" />
                    </svg>
                  </div>
                </div>
              </div>
            </section>

            {/* 4 CORE CARDS: Missão, Visão, Propósito, Objectivos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Card 1: MISSÃO */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group font-sans">
                <div>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3.5 shadow-2xs group-hover:scale-105 transition-transform">
                    <Target className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <h3 className="text-xs font-bold tracking-wider text-slate-900 dark:text-slate-50 uppercase font-sans">
                    MISSÃO
                  </h3>

                  <p className="mt-3 text-[12.5px] leading-relaxed text-slate-600 dark:text-slate-400 font-normal font-sans">
                    Conectar o mundo através da tecnologia e da colaboração, disponibilizando ferramentas inteligentes que promovem transparência, participação e impacto positivo em <strong className="font-bold text-slate-900 dark:text-slate-50">escala global</strong>.
                  </p>
                </div>
              </div>

              {/* Card 2: VISÃO */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group font-sans">
                <div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center mb-3.5 shadow-2xs group-hover:scale-105 transition-transform">
                    <Eye className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <h3 className="text-xs font-bold tracking-wider text-slate-900 dark:text-slate-50 uppercase font-sans">
                    VISÃO
                  </h3>

                  <p className="mt-3 text-[12.5px] leading-relaxed text-slate-600 dark:text-slate-400 font-normal font-sans">
                    Ser a infraestrutura global de referência que capacita comunidades e organizações a co-criar soluções para um mundo mais próspero, justo e sustentável.
                  </p>
                </div>

                {/* Blue underline accent as in reference design */}
                <div className="w-9 h-0.5 bg-[#1455AC] rounded-full mt-4" />
              </div>

              {/* Card 3: PROPÓSITO */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group font-sans">
                <div>
                  <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3.5 shadow-2xs group-hover:scale-105 transition-transform">
                    <Heart className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <h3 className="text-xs font-bold tracking-wider text-slate-900 dark:text-slate-50 uppercase font-sans">
                    PROPÓSITO
                  </h3>

                  <p className="mt-3 text-[12.5px] leading-relaxed text-slate-600 dark:text-slate-400 font-normal font-sans">
                    Transformar conexões em impacto. Acreditamos que, quando pessoas e organizações trabalham juntas com propósito, o mundo torna-se um lugar <strong className="font-bold text-slate-900 dark:text-slate-50">melhor para todos</strong>.
                  </p>
                </div>

                {/* Red/pink underline accent as in reference design */}
                <div className="w-9 h-0.5 bg-rose-500 rounded-full mt-4" />
              </div>

              {/* Card 4: OBJECTIVOS */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group font-sans">
                <div>
                  <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3.5 shadow-2xs group-hover:scale-105 transition-transform">
                    <Flag className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <h3 className="text-xs font-bold tracking-wider text-slate-900 dark:text-slate-50 uppercase font-sans">
                    OBJECTIVOS
                  </h3>

                  <ul className="mt-3 space-y-2 font-sans">
                    {objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11.5px] leading-tight text-slate-600 dark:text-slate-400 font-sans">
                        {/* Circular amber checkmark badge matching screenshot */}
                        <div className="w-4 h-4 rounded-full border border-amber-500 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* SECTION: "Os pilares da VILA" */}
            <div className="pt-1 font-sans">
              <div className="flex items-center justify-between mb-1 font-sans">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-50 font-sans">
                    Os pilares da VILA
                  </h2>
                  <div className="w-8 h-0.5 bg-[#1455AC] rounded-full mt-1 mb-3.5" />
                </div>

                {searchQuery && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                    Mostrando {filteredPillars.length} de {pillars.length} pilares
                  </span>
                )}
              </div>

              {/* 5 Pillar Cards in a Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 font-sans">
                {filteredPillars.map((pillar) => (
                  <div
                    key={pillar.id}
                    onClick={() => setSelectedPillarModal(pillar)}
                    onMouseEnter={() => setActivePillar(pillar.id)}
                    onMouseLeave={() => setActivePillar(null)}
                    className={`bg-white dark:bg-slate-800 rounded-xl border ${pillar.border} p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col items-start font-sans ${
                      activePillar === pillar.id ? 'ring-2 ring-blue-400/20 translate-y-[-2px]' : ''
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-full ${pillar.bg} flex items-center justify-center mb-3 shadow-2xs`}>
                      {pillar.icon}
                    </div>

                    <h4 className="text-[11.5px] font-bold text-slate-900 dark:text-slate-50 uppercase tracking-tight font-sans">
                      {pillar.title}
                    </h4>

                    <p className="mt-1.5 text-[11px] leading-snug text-slate-500 dark:text-slate-400 font-medium font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* BANNER: "A VILA não é apenas uma plataforma." */}
            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50/70 via-slate-50 to-amber-50/70 p-6 sm:p-7 shadow-2xs font-sans">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
                {/* Text side with prominent blue quote mark */}
                <div className="max-w-xl font-sans">
                  {/* Big Blue Quote Symbol */}
                  <div className="text-[#1455AC] text-4xl sm:text-5xl font-serif font-black leading-none mb-1 select-none">
                    “
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 font-sans">
                    A VILA não é apenas uma plataforma.
                  </p>

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-50 font-sans tracking-tight mt-0.5 leading-snug">
                    É um movimento global de colaboração e transformação.
                  </h3>

                  <div className="w-10 h-0.5 bg-[#1455AC] rounded-full mt-3" />
                </div>

                {/* Silhouette Illustration of people/community on a hill at sunset */}
                <div className="w-full max-w-[280px] shrink-0 flex items-center justify-end">
                  <div className="relative w-64 h-24 sm:h-28">
                    <svg viewBox="0 0 300 120" className="w-full h-full select-none" fill="none">
                      <defs>
                        <linearGradient id="quote-sunset" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#FDBA74" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>

                      {/* Golden Sun Glow */}
                      <circle cx="150" cy="110" r="60" fill="url(#quote-sunset)" />

                      {/* Hill Crest */}
                      <path d="M0 120 Q 150 70 300 110 L 300 120 L 0 120 Z" fill="#0F172A" />

                      {/* People Silhouettes Holding Hands */}
                      {/* Person 1 (Mother holding child) */}
                      <circle cx="115" cy="58" r="4" fill="#0F172A" />
                      <rect x="111.5" y="64" width="7" height="15" rx="1.5" fill="#0F172A" />
                      <line x1="113" y1="78" x2="113" y2="92" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
                      <line x1="117" y1="78" x2="117" y2="92" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />

                      {/* Child holding hand */}
                      <circle cx="127" cy="70" r="3" fill="#0F172A" />
                      <rect x="124.5" y="74" width="5" height="10" rx="1" fill="#0F172A" />
                      <line x1="126" y1="84" x2="126" y2="93" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="128" y1="84" x2="128" y2="93" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="118" y1="69" x2="125" y2="76" stroke="#0F172A" strokeWidth="1.6" />

                      {/* Person 3 (Father tall) */}
                      <circle cx="140" cy="50" r="4.5" fill="#0F172A" />
                      <rect x="136" y="56" width="8" height="18" rx="2" fill="#0F172A" />
                      <line x1="138" y1="74" x2="138" y2="88" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
                      <line x1="142" y1="74" x2="142" y2="88" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
                      <line x1="129" y1="76" x2="136" y2="65" stroke="#0F172A" strokeWidth="1.6" />

                      {/* Person 4 (Youth) */}
                      <circle cx="154" cy="55" r="4" fill="#0F172A" />
                      <rect x="150.5" y="61" width="7" height="16" rx="1.5" fill="#0F172A" />
                      <line x1="152" y1="76" x2="152" y2="90" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
                      <line x1="156" y1="76" x2="156" y2="90" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
                      <line x1="144" y1="65" x2="151" y2="68" stroke="#0F172A" strokeWidth="1.6" />

                      {/* Person 5 (Young girl) */}
                      <circle cx="166" cy="65" r="3.5" fill="#0F172A" />
                      <rect x="163.5" y="70" width="5.5" height="11" rx="1.2" fill="#0F172A" />
                      <line x1="165" y1="81" x2="165" y2="92" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
                      <line x1="168" y1="81" x2="168" y2="92" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
                      <line x1="157" y1="69" x2="164" y2="73" stroke="#0F172A" strokeWidth="1.6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (3 cols on XL / 4 cols on LG) */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6 font-sans">
            
            {/* Card 1: O nosso impacto */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs font-sans">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800 font-sans">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50 font-sans">
                  O nosso impacto
                </h3>
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(true)}
                  className="text-xs font-bold text-[#1455AC] hover:underline inline-flex items-center gap-1 transition-colors cursor-pointer font-sans"
                >
                  <span>Ver relatório</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Metrics List matching screenshot */}
              <div className="mt-4 space-y-4 font-sans">
                {/* Metric 1: 23M+ Pessoas impactadas */}
                <div className="flex items-center gap-3.5 group cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-700 p-1 rounded-xl transition-colors font-sans">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-slate-50 font-sans leading-tight">
                      23M+
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                      Pessoas impactadas
                    </p>
                  </div>
                </div>

                {/* Metric 2: 358 Projetos apoiados */}
                <div className="flex items-center gap-3.5 group cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-700 p-1 rounded-xl transition-colors font-sans">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Share2 className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-slate-50 font-sans leading-tight">
                      358
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                      Projetos apoiados
                    </p>
                  </div>
                </div>

                {/* Metric 3: 78 Países representados */}
                <div className="flex items-center gap-3.5 group cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-700 p-1 rounded-xl transition-colors font-sans">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-slate-50 font-sans leading-tight">
                      78
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                      Países representados
                    </p>
                  </div>
                </div>

                {/* Metric 4: 12 Áreas de atuação */}
                <div className="flex items-center gap-3.5 group cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-700 p-1 rounded-xl transition-colors font-sans">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-slate-50 font-sans leading-tight">
                      12
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-sans">
                      Áreas de atuação
                    </p>
                  </div>
                </div>

                {/* Metric 5: 4.715 Avaliação média + 5 Stars */}
                <div className="flex items-center gap-3.5 group cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-700 p-1 rounded-xl transition-colors font-sans">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-slate-50 font-sans leading-tight">
                      4.715
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-0.5 font-sans">
                      Avaliação média
                    </p>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: A nossa jornada (Vertical Timeline) */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs font-sans">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800 font-sans">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50 font-sans">
                  A nossa jornada
                </h3>
                <button
                  type="button"
                  onClick={() => setIsTimelineModalOpen(true)}
                  className="text-xs font-bold text-[#1455AC] hover:underline inline-flex items-center gap-1 transition-colors cursor-pointer font-sans"
                >
                  <span>Ver linha do tempo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Timeline Items with Continuous Blue Line */}
              <div className="relative mt-5 pl-5 space-y-6 font-sans">
                {/* Continuous Vertical Blue Line matching reference */}
                <div className="absolute left-[7px] top-2 bottom-4 w-0.5 bg-blue-200" />

                {timelineMilestones.map((item, index) => (
                  <div key={index} className="relative group font-sans">
                    {/* Circle Node on Timeline */}
                    <div
                      className={`absolute -left-5 top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs transition-transform group-hover:scale-125 ${
                        item.status === 'active'
                          ? 'bg-[#1455AC] ring-4 ring-blue-100 animate-pulse'
                          : 'bg-[#1455AC]'
                      }`}
                    />

                    <div>
                      <span className={`text-[11px] font-bold ${item.status === 'active' ? 'text-[#1455AC]' : 'text-slate-800 dark:text-slate-100'}`}>
                        {item.year}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans mt-0.5">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL 1: Linha do Tempo Completa */}
      {isTimelineModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200 font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 font-sans">
              <div className="flex items-center gap-2.5 font-sans">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center font-sans">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">Linha do Tempo VILA</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">A evolução do nosso impacto de 2018 a hoje</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsTimelineModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer font-sans"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4 max-h-[60vh] overflow-y-auto pr-2 font-sans">
              {timelineMilestones.map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-sans">
                  <div className="flex items-center justify-between font-sans">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1455AC] font-sans">
                      {m.year}
                    </span>
                    <span className="text-[11px] font-bold text-slate-900 dark:text-slate-50 font-sans">{m.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed font-sans">
                    {m.details}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end font-sans">
              <button
                type="button"
                onClick={() => setIsTimelineModalOpen(false)}
                className="px-4 py-2 bg-[#1455AC] hover:bg-[#11468F] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer font-sans"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Relatório de Impacto Resumido */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200 font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 font-sans">
              <div className="flex items-center gap-2.5 font-sans">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-sans">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">Relatório Global de Impacto</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">Dados consolidados e auditados do ecossistema VILA</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer font-sans"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-3 font-sans">
              <div className="grid grid-cols-2 gap-3 font-sans">
                <div className="p-3 bg-blue-50/70 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20 font-sans">
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">População Atendida</span>
                  <p className="text-xl font-extrabold text-[#1455AC] mt-0.5 font-sans">23.418.090</p>
                </div>
                <div className="p-3 bg-emerald-50/70 dark:bg-emerald-500/10 rounded-xl border border-emerald-100 dark:border-emerald-500/20 font-sans">
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">Projetos Concluídos</span>
                  <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 font-sans">358 iniciativas</p>
                </div>
                <div className="p-3 bg-purple-50/70 dark:bg-purple-500/10 rounded-xl border border-purple-100 dark:border-purple-500/20 font-sans">
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">Países Participantes</span>
                  <p className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-0.5 font-sans">78 nações</p>
                </div>
                <div className="p-3 bg-amber-50/70 dark:bg-amber-500/10 rounded-xl border border-amber-100 dark:border-amber-500/20 font-sans">
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">Índice de Satisfação</span>
                  <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-0.5 font-sans">4.715 / 5.0</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Todas as métricas são monitoradas e validadas através dos protocolos abertos de transparência da VILA, garantindo que cada conexão resulte em impacto palpável.
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between font-sans">
              <button
                type="button"
                onClick={() => {
                  setIsReportModalOpen(false);
                  onNavigateToTab('impacto');
                }}
                className="text-xs font-bold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer font-sans"
              >
                <span>Ver página de Impacto Global completa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-colors cursor-pointer font-sans"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Pilar Expandido */}
      {selectedPillarModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200 font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 font-sans">
              <div className="flex items-center gap-3 font-sans">
                <div className={`w-10 h-10 rounded-xl ${selectedPillarModal.bg} flex items-center justify-center font-sans`}>
                  {selectedPillarModal.icon}
                </div>
                <div>
                  <span className="text-[10.5px] font-bold text-[#1455AC] uppercase tracking-wider font-sans">{selectedPillarModal.tag}</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">{selectedPillarModal.title}</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPillarModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer font-sans"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 font-sans">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 font-sans leading-snug">
                {selectedPillarModal.desc}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                {selectedPillarModal.extendedDesc}
              </p>
            </div>

            <div className="mt-6 flex justify-end font-sans">
              <button
                type="button"
                onClick={() => setSelectedPillarModal(null)}
                className="px-4 py-2 bg-[#1455AC] hover:bg-[#11468F] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer font-sans"
              >
                Concluir leitura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
