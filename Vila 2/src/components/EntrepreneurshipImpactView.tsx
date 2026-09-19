import React, { useState } from 'react';
import {
  Rocket,
  Heart,
  Users,
  Building2,
  Globe,
  Leaf,
  Clock,
  ArrowRight,
  ChevronRight,
  Check,
  Compass,
  GraduationCap,
  Scale,
  HeartPulse,
  Palette,
  MoreHorizontal,
  FileText,
  Briefcase,
  TrendingUp,
  Lightbulb,
  Sparkles,
  Share2,
  Calculator,
  Layers,
  Wrench,
  Video,
  Banknote,
  DollarSign,
  Euro,
  UserCheck,
  Building,
  Target,
  ShieldCheck,
  Sun,
  X,
} from 'lucide-react';
import { ImpactRegionMapCard } from './ImpactRegionMapCard';
import { ImpactAnalyticsSection } from './ImpactAnalyticsSection';

export interface EntrepreneurshipImpactViewProps {
  onBackToImpact?: () => void;
  onNavigateToCategory?: (category: string) => void;
  onNavigateToTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
}

// Interfaces
interface EntrepreneurshipProject {
  id: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  image: string;
  title: string;
  description: string;
  location: string;
  investment: string;
  progressPercent: number;
  progressBarColor: string;
}

interface EntrepreneurshipImpactArea {
  id: string;
  name: string;
  description: string;
  count: string;
  iconBg: string;
  iconColor: string;
  iconType: 'ideation' | 'incubation' | 'funding' | 'training' | 'connections' | 'expansion';
}

interface PopularEntrepreneurshipItem {
  rank: number;
  id: string;
  name: string;
  supporters: string;
  growth: string;
  avatar: string;
}

interface EntrepreneurshipResource {
  id: string;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  icon: 'guide' | 'template' | 'calculator' | 'mentorship' | 'webinar' | 'funding' | 'tools';
}

// 6 Áreas de impacto no empreendedorismo
const ENTREPRENEURSHIP_IMPACT_AREAS: EntrepreneurshipImpactArea[] = [
  {
    id: 'ideacao-inovacao',
    name: 'Ideação & Inovação',
    description: 'Apoio à criação de ideias e soluções inovadoras para os desafios do mundo.',
    count: '186 iniciativas',
    iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconType: 'ideation',
  },
  {
    id: 'incubacao-aceleracao',
    name: 'Incubação & Aceleração',
    description: 'Programas que aceleram startups e fortalecem negócios emergentes.',
    count: '142 iniciativas',
    iconBg: 'bg-purple-50 dark:bg-purple-500/10',
    iconColor: 'text-purple-600 dark:text-purple-400',
    iconType: 'incubation',
  },
  {
    id: 'financiamento',
    name: 'Financiamento',
    description: 'Facilitamos o acesso a capital e investimento para empreendedores.',
    count: '124 iniciativas',
    iconBg: 'bg-blue-50 dark:bg-blue-500/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconType: 'funding',
  },
  {
    id: 'capacitacao',
    name: 'Capacitação',
    description: 'Formação, workshops e mentorias para desenvolver competências.',
    count: '198 iniciativas',
    iconBg: 'bg-orange-50 dark:bg-orange-500/10',
    iconColor: 'text-orange-600 dark:text-orange-400',
    iconType: 'training',
  },
  {
    id: 'conexoes-redes',
    name: 'Conexões & Redes',
    description: 'Ligamos empreendedores a parceiros, mercados e oportunidades.',
    count: '156 iniciativas',
    iconBg: 'bg-teal-50 dark:bg-teal-500/10',
    iconColor: 'text-teal-600 dark:text-teal-400',
    iconType: 'connections',
  },
  {
    id: 'expansao-impacto',
    name: 'Expansão & Impacto',
    description: 'Apoio à expansão de negócios e geração de impacto sustentável.',
    count: '134 iniciativas',
    iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconType: 'expansion',
  },
];

// 6 Projetos em Destaque (Navegação 3 em 3)
const FEATURED_ENTREPRENEURSHIP_PROJECTS: EntrepreneurshipProject[] = [
  {
    id: 'proj-ent-1',
    tag: 'Tecnologia',
    tagBg: 'bg-emerald-800 text-white',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
    title: 'Plataforma de Educação Digital',
    description: 'Solução que conecta estudantes a conteúdo e tutores de qualidade.',
    location: 'Quénia',
    investment: '120K €',
    progressPercent: 78,
    progressBarColor: 'bg-emerald-600',
  },
  {
    id: 'proj-ent-2',
    tag: 'Agronegócio',
    tagBg: 'bg-emerald-900 text-white',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80',
    title: 'AgroHub Inteligente',
    description: 'Marketplace que conecta pequenos produtores a grandes mercados.',
    location: 'Brasil',
    investment: '85K €',
    progressPercent: 60,
    progressBarColor: 'bg-teal-600',
  },
  {
    id: 'proj-ent-3',
    tag: 'Saúde',
    tagBg: 'bg-teal-800 text-white',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
    title: 'Saúde Acessível',
    description: 'Solução de telemedicina acessível para comunidades remotas.',
    location: 'Moçambique',
    investment: '95K €',
    progressPercent: 72,
    progressBarColor: 'bg-cyan-600',
  },
  {
    id: 'proj-ent-4',
    tag: 'Energia',
    tagBg: 'bg-slate-900 text-white',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
    title: 'Energia Solar para Todos',
    description: 'Instalação de sistemas solares em comunidades fora da rede elétrica.',
    location: 'Nigéria',
    investment: '150K €',
    progressPercent: 80,
    progressBarColor: 'bg-emerald-600',
  },
  {
    id: 'proj-ent-5',
    tag: 'Fintech',
    tagBg: 'bg-indigo-900 text-white',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
    title: 'Microcrédito Comunitário',
    description: 'Inclusão bancária e microcrédito rotativo para mulheres artesãs.',
    location: 'Cabo Verde',
    investment: '110K €',
    progressPercent: 86,
    progressBarColor: 'bg-indigo-600',
  },
  {
    id: 'proj-ent-6',
    tag: 'Economia Circular',
    tagBg: 'bg-amber-900 text-white',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
    title: 'EcoLogística Reversa',
    description: 'Transformação de resíduos plásticos urbanos em materiais de construção.',
    location: 'Portugal',
    investment: '135K €',
    progressPercent: 74,
    progressBarColor: 'bg-amber-600',
  },
];

// 5 Mais populares em Empreendedorismo
const POPULAR_ENTREPRENEURSHIP_ITEMS: PopularEntrepreneurshipItem[] = [
  {
    rank: 1,
    id: 'pop-e1',
    name: 'Fundo para Startups de Impacto',
    supporters: '256K apoiadores',
    growth: '▲ 24%',
    avatar: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=120&auto=format&fit=crop&q=80',
  },
  {
    rank: 2,
    id: 'pop-e2',
    name: 'Aceleração de Negócios Locais',
    supporters: '198K apoiadores',
    growth: '▲ 18%',
    avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=120&auto=format&fit=crop&q=80',
  },
  {
    rank: 3,
    id: 'pop-e3',
    name: 'Mulheres que Empreendem',
    supporters: '142K apoiadores',
    growth: '▲ 16%',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
  },
  {
    rank: 4,
    id: 'pop-e4',
    name: 'Inovação Sustentável',
    supporters: '112K apoiadores',
    growth: '▲ 15%',
    avatar: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=120&auto=format&fit=crop&q=80',
  },
  {
    rank: 5,
    id: 'pop-e5',
    name: 'Negócios Globais',
    supporters: '98K apoiadores',
    growth: '▲ 12%',
    avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=120&auto=format&fit=crop&q=80',
  },
];

// 7 Recursos e ferramentas
const ENTREPRENEURSHIP_RESOURCES: EntrepreneurshipResource[] = [
  {
    id: 'res-e1',
    title: 'Guia do Empreendedor',
    description: 'Passo a passo para iniciar seu negócio',
    iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    icon: 'guide',
  },
  {
    id: 'res-e2',
    title: 'Modelo de Plano de Negócios',
    description: 'Templates e exemplos práticos',
    iconBg: 'bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400',
    iconColor: 'text-teal-600 dark:text-teal-400',
    icon: 'template',
  },
  {
    id: 'res-e3',
    title: 'Calculadora Financeira',
    description: 'Projete custos, lucros e investimentos',
    iconBg: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    icon: 'calculator',
  },
  {
    id: 'res-e4',
    title: 'Plataforma de Mentoria',
    description: 'Conecte-se com mentores experientes',
    iconBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    iconColor: 'text-emerald-700 dark:text-emerald-400',
    icon: 'mentorship',
  },
  {
    id: 'res-e5',
    title: 'Cursos e Webinars',
    description: 'Aprenda com especialistas do mercado',
    iconBg: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    iconColor: 'text-green-600 dark:text-green-400',
    icon: 'webinar',
  },
  {
    id: 'res-e6',
    title: 'Financiamento e Editais',
    description: 'Encontre fundos e oportunidades',
    iconBg: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    iconColor: 'text-blue-600 dark:text-blue-400',
    icon: 'funding',
  },
  {
    id: 'res-e7',
    title: 'Ferramentas Gratuitas',
    description: 'Recursos para impulsionar seu negócio',
    iconBg: 'bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400',
    iconColor: 'text-teal-700 dark:text-teal-400',
    icon: 'tools',
  },
];

export const EntrepreneurshipImpactView: React.FC<EntrepreneurshipImpactViewProps> = ({
  onBackToImpact,
  onNavigateToCategory,
  onNavigateToTab,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenMobileMenu,
}) => {
  const [isMaisDropdownOpen, setIsMaisDropdownOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedProjectModal, setSelectedProjectModal] = useState<EntrepreneurshipProject | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [supportedCount, setSupportedCount] = useState(1248);
  const [hasSupported, setHasSupported] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Helper para ícones das áreas
  const renderAreaIcon = (type: EntrepreneurshipImpactArea['iconType']) => {
    switch (type) {
      case 'ideation':
        return <Lightbulb className="w-5 h-5" />;
      case 'incubation':
        return <Sparkles className="w-5 h-5" />;
      case 'funding':
        return <Banknote className="w-5 h-5" />;
      case 'training':
        return <GraduationCap className="w-5 h-5" />;
      case 'connections':
        return <Share2 className="w-5 h-5" />;
      case 'expansion':
        return <Globe className="w-5 h-5" />;
      default:
        return <Rocket className="w-5 h-5" />;
    }
  };

  const renderResourceIcon = (icon: EntrepreneurshipResource['icon']) => {
    switch (icon) {
      case 'guide':
        return <FileText className="w-4 h-4" />;
      case 'template':
        return <Layers className="w-4 h-4" />;
      case 'calculator':
        return <Calculator className="w-4 h-4" />;
      case 'mentorship':
        return <UserCheck className="w-4 h-4" />;
      case 'webinar':
        return <Video className="w-4 h-4" />;
      case 'funding':
        return <Banknote className="w-4 h-4" />;
      case 'tools':
        return <Wrench className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleSupportClick = () => {
    setIsSupportModalOpen(true);
  };

  const handleConfirmSupport = () => {
    if (!hasSupported) {
      setSupportedCount((prev) => prev + 1);
      setHasSupported(true);
    }
    setIsSupportModalOpen(false);
  };

  return (
    <div id="entrepreneurship-impact-view" className="w-full bg-[#F8FAFC] dark:bg-slate-950 min-h-screen text-[#0F172A] dark:text-slate-50 flex flex-col">
      {/* Conteúdo Principal (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* 2. Cabeçalho de Empreendedorismo com Ícone de Foguete, Subtítulo e Botão Apoiar Iniciativa */}
        <section id="empreendedorismo-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            {/* Ícone Quadrado Arredondado com Foguete em Verde Escuro #064E3B */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#064E3B] text-white flex items-center justify-center shrink-0 shadow-sm border border-emerald-950/20">
              <Rocket className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.4} />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-slate-50 tracking-tight font-['Outfit'] leading-tight">
                Empreendedorismo
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-normal leading-snug">
                Impulsionamos ideias, fortalecemos negócios e criamos impacto positivo no mundo.
              </p>
            </div>
          </div>

          {/* Botão "Apoiar Iniciativa ♡" em Verde Floresta */}
          <button
            type="button"
            onClick={handleSupportClick}
            id="btn-apoiar-iniciativa-empreendedorismo"
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#04382A] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Apoiar Iniciativa</span>
            <Heart className={`w-4 h-4 ${hasSupported ? 'fill-white' : ''}`} strokeWidth={2.2} />
          </button>
        </section>

        {/* 3. Fita com 7 Métricas Principais de Empreendedorismo */}
        <section id="empreendedorismo-top-metrics" className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { value: String(supportedCount), label: 'Iniciativas Ativas', icon: Users },
            { value: '382', label: 'Organizações', icon: Building2 },
            { value: '96', label: 'Países', icon: Globe },
            { value: '3.215.780', label: 'Empreendedores Impactados', icon: Users },
            { value: '1.847', label: 'Startups Apoiadas', icon: Sparkles },
            { value: '2.417.890 €', label: 'Investimento Mobilizado', icon: Banknote },
            { value: '78.540 h', label: 'Mentorias & Formação', icon: Clock },
          ].map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-3 shadow-2xs flex items-center gap-2.5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-black text-[#0F172A] dark:text-slate-50 font-['Outfit'] leading-none truncate">
                    {m.value}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate block mt-0.5">
                    {m.label}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {/* 4. Fita Horizontal de Categorias (com Empreendedorismo Selecionado em #064E3B) */}
        <nav
          id="categories-ribbon-empreendedorismo"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 relative"
          aria-label="Categorias de Impacto Global"
        >
          {[
            { id: 'todas', label: 'Todas', icon: Compass },
            { id: 'ambiente', label: 'Ambiente', icon: Leaf },
            { id: 'tecnologia', label: 'Tecnologia', icon: Sparkles },
            { id: 'educacao', label: 'Educação', icon: GraduationCap },
            { id: 'direitos-humanos', label: 'Direitos Humanos', icon: Scale },
            { id: 'saude', label: 'Saúde', icon: HeartPulse },
            { id: 'empreendedorismo', label: 'Empreendedorismo', icon: Rocket },
            { id: 'cultura', label: 'Cultura', icon: Palette },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === 'empreendedorismo';

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (onNavigateToCategory) onNavigateToCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-[#064E3B] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700/90 text-[#334155] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} strokeWidth={2.2} />
                <span>{cat.label}</span>
              </button>
            );
          })}

          {/* Botão "Mais" */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                if (onNavigateToCategory) {
                  onNavigateToCategory('mais');
                } else if (onNavigateToTab) {
                  onNavigateToTab('mais');
                } else {
                  setIsMaisDropdownOpen(!isMaisDropdownOpen);
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700/90 text-[#334155] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 whitespace-nowrap cursor-pointer shadow-2xs"
            >
              <MoreHorizontal className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Mais</span>
            </button>

            {isMaisDropdownOpen && (
              <div className="absolute left-0 mt-1 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl py-1.5 z-40 text-xs font-medium">
                {[
                  'Economia Circular',
                  'Impacto Social',
                  'Comércio Justo',
                  'Microfinanças',
                  'Cooperativas Locais',
                  'Liderança Juvenil',
                ].map((extra) => (
                  <button
                    key={extra}
                    type="button"
                    onClick={() => {
                      setIsMaisDropdownOpen(false);
                      if (onNavigateToCategory) {
                        onNavigateToCategory('mais');
                      } else if (onNavigateToTab) {
                        onNavigateToTab('mais');
                      }
                    }}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-between cursor-pointer"
                  >
                    <span>{extra}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* 5. Grade Principal: Coluna Central (Hero + Áreas + Projetos + Métricas) e Coluna Lateral */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* COLUNA PRINCIPAL (lg:col-span-9) */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            {/* HERO BANNER: "Grandes ideias. Grandes negócios. Grande impacto." */}
            <section
              id="hero-empreendedorismo-banner"
              className="relative rounded-2xl overflow-hidden min-h-[310px] flex items-center text-white shadow-md border border-emerald-950/20 bg-[#063228] group"
            >
              {/* Imagem de Fundo de Empreendedora trabalhando em notebook */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="/imagens-paginas/06-impacto-global/empreendedorismo/empreendedorismo1.png"
                  alt="Empreendedora com notebook trabalhando"
                  className="w-full h-full object-cover object-right group-hover:scale-102 transition-transform duration-700 opacity-40"
                  referrerPolicy="no-referrer"
                />
                {/* Gradiente Escuro Verde Floresta */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#052820] via-[#063428]/95 to-transparent" />
              </div>

              {/* Elementos Visuais Radiais de Rede e Foguete Central */}
              <div className="absolute right-48 sm:right-72 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none">
                <div className="relative w-64 h-64 flex items-center justify-center">
                  {/* Círculo Central com Foguete */}
                  <div className="w-24 h-24 rounded-full border-2 border-emerald-400/50 bg-[#064E3B]/90 backdrop-blur-md flex items-center justify-center shadow-xl relative z-10">
                    <Rocket className="w-12 h-12 text-white animate-pulse" />
                  </div>

                  {/* Nós Satélites com Ícones */}
                  <div className="absolute top-1 left-12 w-9 h-9 rounded-full bg-emerald-700/90 border border-emerald-300 flex items-center justify-center shadow-md">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-4 right-10 w-9 h-9 rounded-full bg-teal-700/90 border border-teal-300 flex items-center justify-center shadow-md">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute bottom-6 right-8 w-9 h-9 rounded-full bg-emerald-600/90 border border-emerald-200 flex items-center justify-center shadow-md">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-2 left-16 w-9 h-9 rounded-full bg-cyan-700/90 border border-cyan-300 flex items-center justify-center shadow-md">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-9 h-9 rounded-full bg-emerald-800/90 border border-emerald-300 flex items-center justify-center shadow-md">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Textos da Esquerda */}
                <div className="max-w-md flex flex-col gap-2.5">
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight font-['Outfit'] tracking-tight">
                    Grandes ideias. <br />
                    Grandes negócios. <br />
                    Grande impacto.
                  </h2>
                  <p className="text-xs sm:text-[13px] text-emerald-100/90 leading-relaxed font-normal">
                    Apoiamos empreendedores em todas as fases da jornada, desde a ideação até a expansão global, gerando oportunidades e desenvolvimento sustentável.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('projetos-em-destaque-empreendedorismo');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-[#064E3B] text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                    >
                      <span>Explorar iniciativas de empreendedorismo</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.4]" />
                    </button>
                  </div>
                </div>

                {/* Card Transparente na Direita: "Impacto do Empreendedorismo" */}
                <div className="w-full lg:w-72 bg-black/45 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col gap-2.5 shrink-0 shadow-lg">
                  <h3 className="text-xs font-bold text-emerald-300 font-['Outfit'] tracking-wider uppercase">
                    Impacto do Empreendedorismo
                  </h3>

                  <div className="flex flex-col divide-y divide-white/10 text-xs">
                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span className="text-[11.5px]">Startups Apoiadas</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">1.847</span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Banknote className="w-4 h-4 text-teal-400" />
                        <span className="text-[11.5px]">Investimento Mobilizado</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">2.417.890 €</span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Briefcase className="w-4 h-4 text-amber-400" />
                        <span className="text-[11.5px]">Empregos Gerados</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">15.680</span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <span className="text-[11.5px]">Países Impactados</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">98</span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span className="text-[11.5px]">Mentorias & Formação</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">78.540 h</span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <span className="text-[11.5px]">Empreendedores Impactados</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">3.215.780</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 1: Áreas de impacto no empreendedorismo (6 Cards) */}
            <section id="areas-impacto-empreendedorismo" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                  Áreas de impacto no empreendedorismo
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedArea(null)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid com 6 Cartões de Áreas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {ENTREPRENEURSHIP_IMPACT_AREAS.map((area) => {
                  const isSelected = selectedArea === area.id;

                  return (
                    <div
                      key={area.id}
                      onClick={() => setSelectedArea(isSelected ? null : area.id)}
                      className={`bg-white dark:bg-slate-900 rounded-xl border p-3.5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all cursor-pointer group ${
                        isSelected
                          ? 'border-emerald-600 ring-2 ring-emerald-600/20'
                          : 'border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div>
                        {/* Ícone Redondo Colorido */}
                        <div className={`w-10 h-10 rounded-full ${area.iconBg} ${area.iconColor} flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform`}>
                          {renderAreaIcon(area.iconType)}
                        </div>

                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {area.name}
                        </h4>

                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-1 mb-2.5 line-clamp-3">
                          {area.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                          {area.count}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SEÇÃO 2: Projetos em Destaque (4 Cards) + Impacto por Região (Widget com Mapa) */}
            <section id="projetos-em-destaque-empreendedorismo" className="flex flex-col gap-3.5">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Projetos em destaque (3 em 3 cards) */}
                <div className="lg:col-span-8 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                      Projetos em destaque
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, FEATURED_ENTREPRENEURSHIP_PROJECTS.length - 3)))}
                        className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 cursor-pointer shadow-2xs transition-colors"
                        aria-label="Anterior"
                        title="Projetos anteriores"
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCarouselIndex((prev) => (prev < FEATURED_ENTREPRENEURSHIP_PROJECTS.length - 3 ? prev + 1 : 0))}
                        className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 cursor-pointer shadow-2xs transition-colors"
                        aria-label="Seguinte"
                        title="Próximos projetos"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {FEATURED_ENTREPRENEURSHIP_PROJECTS.slice(carouselIndex, carouselIndex + 3).map((proj) => (
                        <article
                          key={proj.id}
                          onClick={() => setSelectedProjectModal(proj)}
                          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-xs transition-all flex flex-col cursor-pointer group"
                        >
                          {/* Imagem do Projeto com Badge Sobreposta */}
                          <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <span className={`absolute top-2 left-2 text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-2xs ${proj.tagBg}`}>
                              {proj.tag}
                            </span>
                          </div>

                          {/* Conteúdo */}
                          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                            <div>
                              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                {proj.location}
                              </div>
                              <h4 className="text-xs sm:text-[13px] font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] line-clamp-1 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors mt-0.5">
                                {proj.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-1">
                                {proj.description}
                              </p>
                            </div>

                            {/* Investimento & Barra de Progresso da Meta */}
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                              <div className="flex items-center justify-between text-[10.5px]">
                                <span className="text-slate-500 dark:text-slate-400 truncate">Investimento: <strong className="text-slate-800 dark:text-slate-100 font-bold">{proj.investment}</strong></span>
                                <span className="font-bold text-emerald-700 dark:text-emerald-400 shrink-0">{proj.progressPercent}% da meta</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${proj.progressBarColor}`}
                                  style={{ width: `${proj.progressPercent}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>

                    <button
                      type="button"
                      title="Ver mais projetos"
                      onClick={() => setCarouselIndex((prev) => (prev < FEATURED_ENTREPRENEURSHIP_PROJECTS.length - 3 ? prev + 1 : 0))}
                      className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer z-10"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Widget: Impacto por Região (lg:col-span-4) */}
                <ImpactRegionMapCard
                  category="empreendedorismo"
                  className="lg:col-span-4"
                  onOpenReport={() => setIsReportModalOpen(true)}
                  onSeeAll={() => setIsReportModalOpen(true)}
                />
              </div>
            </section>

            {/* SEÇÃO 3: O impacto em números (6 Cards com Gráficos de Linha) */}
            <section id="impacto-em-numeros-empreendedorismo" className="flex flex-col gap-3">
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                O impacto em números
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  {
                    value: '1.847',
                    label: 'Startups Apoiadas',
                    change: '▲ 18,5% este mês',
                    icon: Users,
                    color: '#059669',
                    path: 'M0,18 Q15,8 30,14 T60,6 T90,12 T120,4',
                  },
                  {
                    value: '2.417.890 €',
                    label: 'Investimento Mobilizado',
                    change: '▲ 22,1% este mês',
                    icon: Banknote,
                    color: '#3D4ED8',
                    path: 'M0,16 Q20,18 40,10 T80,14 T120,5',
                  },
                  {
                    value: '15.680',
                    label: 'Empregos Gerados',
                    change: '▲ 16,3% este mês',
                    icon: Briefcase,
                    color: '#9333EA',
                    path: 'M0,17 Q25,12 50,15 T90,8 T120,3',
                  },
                  {
                    value: '3.215.780',
                    label: 'Empreendedores Impactados',
                    change: '▲ 12,4% este mês',
                    icon: Leaf,
                    color: '#059669',
                    path: 'M0,19 Q30,16 60,11 T90,13 T120,5',
                  },
                  {
                    value: '78.540 h',
                    label: 'Mentorias & Formação',
                    change: '▲ 14,8% este mês',
                    icon: Sun,
                    color: '#D97706',
                    path: 'M0,15 Q25,14 55,16 T85,9 T120,4',
                  },
                  {
                    value: '98',
                    label: 'Países Impactados',
                    change: '▲ 6,7% este mês',
                    icon: Globe,
                    color: '#0D9488',
                    path: 'M0,18 Q30,13 60,15 T90,10 T120,6',
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700/80 p-3 shadow-2xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                          <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                            {item.change}
                          </span>
                        </div>
                        <span className="text-sm font-black text-[#0F172A] dark:text-slate-50 font-['Outfit'] block truncate">
                          {item.value}
                        </span>
                        <span className="text-[9.5px] text-slate-500 dark:text-slate-400 font-medium block leading-tight mt-0.5">
                          {item.label}
                        </span>
                      </div>

                      {/* Mini Sparkline em SVG */}
                      <div className="pt-2">
                        <svg viewBox="0 0 120 22" className="w-full h-5 overflow-visible">
                          <path
                            d={item.path}
                            fill="none"
                            stroke={item.color}
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SEÇÃO 4: Análise de Impacto — Gráficos Completos (Linha Temporal + Donut) */}
            <ImpactAnalyticsSection
              accent="#059669"
              softBg="bg-emerald-50 dark:bg-emerald-500/10"
              labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']}
              series={[
                {
                  name: 'Startups incubadas',
                  color: '#059669',
                  values: [118, 126, 122, 135, 144, 140, 152, 161, 168, 178, 185, 196],
                },
                {
                  name: 'Investimento (x100K €)',
                  color: '#0D9488',
                  values: [52, 58, 55, 64, 70, 67, 75, 81, 85, 91, 96, 103],
                },
              ]}
              slices={[
                { label: 'África', value: 34, color: '#059669' },
                { label: 'Ásia', value: 26, color: '#10B981' },
                { label: 'América Latina', value: 20, color: '#34D399' },
                { label: 'Europa', value: 14, color: '#6EE7B7' },
                { label: 'Oceania', value: 6, color: '#A7F3D0' },
              ]}
            />
          </div>

          {/* COLUNA LATERAL DIREITA (lg:col-span-3) */}
          <aside className="lg:col-span-3 flex flex-col gap-4">
            {/* 1. Card: Mais populares em Empreendedorismo */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">
                  Mais populares em Empreendedorismo
                </h3>
                <button
                  type="button"
                  className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
                {POPULAR_ENTREPRENEURSHIP_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="py-2 flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 px-1 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 w-3 shrink-0">
                        {item.rank}
                      </span>
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                          {item.supporters}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#10B981] shrink-0">
                      {item.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Card: Recursos e Ferramentas (7 Itens) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">
                  Recursos e ferramentas
                </h3>
                <button
                  type="button"
                  className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
                {ENTREPRENEURSHIP_RESOURCES.map((res) => (
                  <div
                    key={res.id}
                    className="py-2 flex items-center justify-between gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 px-1 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className={`w-8 h-8 rounded-lg ${res.iconBg} flex items-center justify-center shrink-0`}>
                        {renderResourceIcon(res.icon)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                          {res.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate leading-tight">
                          {res.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Card de Chamada CTA: "Empreender é transformar ideias em impacto." */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0A1118] text-white p-5 shadow-sm flex flex-col justify-between min-h-[340px]">
              {/* Imagem do Homem de Terno e Óculos com braços cruzados */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80"
                  alt="Empreendedor de impacto"
                  className="w-full h-full object-cover object-top opacity-35 hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118] via-[#0A1118]/80 to-transparent" />
              </div>

              <div className="relative z-10">
                <h3 className="text-base sm:text-lg font-black text-white font-['Outfit'] leading-tight mb-2">
                  Empreender é transformar ideias em impacto.
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Junte-se a uma comunidade global de empreendedores e faça parte da mudança que o mundo precisa.
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('projetos-em-destaque-empreendedorismo');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-[#0F172A] dark:text-slate-50 text-xs font-bold inline-flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Explorar Iniciativas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal Interativo para Apoiar Iniciativa */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <Rocket className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-50 font-['Outfit']">Apoiar Empreendedorismo</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSupportModalOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              Ao apoiar esta categoria, você ajuda a financiar startups de impacto, bolsas de capacitação e mentorias especializadas para negócios emergentes ao redor do globo.
            </p>

            <div className="my-4 bg-emerald-50 dark:bg-emerald-500/10/70 border border-emerald-100 rounded-xl p-3 flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-emerald-900">Total de Iniciativas Ativas</p>
                <p className="text-emerald-700 dark:text-emerald-400">{supportedCount} projetos com apoio comunitário</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsSupportModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmSupport}
                className="px-5 py-2 rounded-xl bg-[#064E3B] hover:bg-[#04382A] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>{hasSupported ? 'Apoio Confirmado' : 'Confirmar Apoio'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Projeto */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="relative h-44 w-full">
              <img
                src={selectedProjectModal.image}
                alt={selectedProjectModal.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedProjectModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
              >
                <X className="w-4 h-4" />
              </button>
              <span className={`absolute bottom-3 left-3 text-xs font-bold px-2.5 py-1 rounded shadow-md ${selectedProjectModal.tagBg}`}>
                {selectedProjectModal.tag}
              </span>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 font-['Outfit']">
                  {selectedProjectModal.title}
                </h3>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{selectedProjectModal.location}</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {selectedProjectModal.description}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Investimento</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{selectedProjectModal.investment}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Progresso</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">{selectedProjectModal.progressPercent}%</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProjectModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProjectModal(null);
                    handleSupportClick();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#064E3B] hover:bg-[#04382A] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Apoiar este Projeto</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: RELATÓRIO REGIONAL DE EMPREENDEDORISMO */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-black text-[#0F172A] dark:text-slate-50 font-['Outfit']">
                  Relatório de Impacto Regional
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Distribuição global de iniciativas de empreendedorismo ativas</p>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10/70 rounded-xl border border-emerald-100 text-emerald-950">
                <span className="font-bold block mb-1 text-emerald-800">África (34% do impacto total)</span>
                Aceleração de fintechs comunitárias, startups de agritech e capacitação de jovens e mulheres empreendedoras.
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <span className="font-bold block mb-1 text-slate-900 dark:text-slate-50">Ásia (26% do impacto total)</span>
                Ecossistemas de manufatura tecnológica, inclusão financeira digital e microempreendedorismo rural.
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <span className="font-bold block mb-1 text-slate-900 dark:text-slate-50">América Latina (20% do impacto total)</span>
                Inovação social, negócios de impacto ecológico e incubação de cooperativas locais.
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <span className="font-bold block mb-1 text-slate-900 dark:text-slate-50">Europa & América do Norte (20% do impacto total)</span>
                Transferência de tecnologia, mentoria transfronteiriça e fundos semente para startups sustentáveis.
              </div>
            </div>

            <button
              onClick={() => setIsReportModalOpen(false)}
              className="w-full py-2.5 px-4 bg-[#064E3B] hover:bg-[#04382A] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Concluir Leitura
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntrepreneurshipImpactView;
