import React, { useState } from 'react';
import { ImpactRegionMapCard } from './ImpactRegionMapCard';
import {
  Cpu,
  Heart,
  Users,
  Building2,
  Globe,
  Leaf,
  Clock,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Compass,
  GraduationCap,
  Scale,
  HeartPulse,
  Rocket,
  Palette,
  MoreHorizontal,
  FileText,
  Share2,
  Bookmark,
  Wifi,
  Laptop,
  Brain,
  Stethoscope,
  Building,
  Code2,
  Lightbulb,
  Zap,
  Network,
  Share,
  Layers,
  TrendingUp,
} from 'lucide-react';

export interface TechnologyImpactViewProps {
  onBackToImpact?: () => void;
  onNavigateToCategory?: (category: string) => void;
  onNavigateToTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
}

// Interfaces
interface TechProject {
  id: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  image: string;
  title: string;
  description: string;
  location: string;
  impacted: string;
  progressPercent: number;
  progressBarColor: string;
}

interface TechImpactArea {
  id: string;
  name: string;
  description: string;
  count: string;
  iconBg: string;
  iconColor: string;
  iconType: 'wifi' | 'laptop' | 'brain' | 'health' | 'sustainable' | 'city';
}

interface PopularTechItem {
  rank: number;
  id: string;
  name: string;
  supporters: string;
  growth: string;
  avatar: string;
}

interface TechResource {
  id: string;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}

// 6 Áreas de impacto tecnológico
const TECH_IMPACT_AREAS: TechImpactArea[] = [
  {
    id: 'inclusao-digital',
    name: 'Inclusão Digital',
    description: 'Levar acesso à internet e dispositivos para todos.',
    count: '152 iniciativas',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    iconType: 'wifi',
  },
  {
    id: 'educacao-tecnologica',
    name: 'Educação Tecnológica',
    description: 'Ensino de habilidades digitais para o futuro do trabalho.',
    count: '138 iniciativas',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    iconType: 'laptop',
  },
  {
    id: 'inteligencia-artificial',
    name: 'Inteligência Artificial',
    description: 'IA ética para resolver desafios sociais e ambientais.',
    count: '121 iniciativas',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    iconType: 'brain',
  },
  {
    id: 'saude-digital',
    name: 'Saúde Digital',
    description: 'Tecnologias que melhoram o acesso e a qualidade da saúde.',
    count: '98 iniciativas',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    iconType: 'health',
  },
  {
    id: 'solucoes-sustentaveis',
    name: 'Soluções Sustentáveis',
    description: 'Tecnologia limpa e eficiência para um planeta melhor.',
    count: '114 iniciativas',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    iconType: 'sustainable',
  },
  {
    id: 'cidades-inteligentes',
    name: 'Cidades Inteligentes',
    description: 'Tecnologia para cidades mais humanas, seguras e eficientes.',
    count: '126 iniciativas',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    iconType: 'city',
  },
];

// 6 Projetos em Destaque (Navegação 3 em 3)
const FEATURED_TECH_PROJECTS: TechProject[] = [
  {
    id: 'proj-tech-1',
    tag: 'Tecnologia',
    tagBg: 'bg-slate-900/80',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    title: 'Internet para Comunidades Rurais',
    description: 'Conectividade que transforma educação e economia local.',
    location: 'Quénia',
    impacted: 'Impactadas 120K pessoas',
    progressPercent: 80,
    progressBarColor: 'bg-emerald-600',
  },
  {
    id: 'proj-tech-2',
    tag: 'Tecnologia',
    tagBg: 'bg-slate-900/80',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    title: 'Plataforma de Aprendizado Digital',
    description: 'Educação digital gratuita para jovens de escolas públicas.',
    location: 'Brasil',
    impacted: 'Impactadas 95K pessoas',
    progressPercent: 72,
    progressBarColor: 'bg-teal-600',
  },
  {
    id: 'proj-tech-3',
    tag: 'Tecnologia',
    tagBg: 'bg-slate-900/80',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    title: 'Sensores para Agricultura Inteligente',
    description: 'IoT para otimizar o uso de água e aumentar a produtividade.',
    location: 'Índia',
    impacted: 'Impactadas 78K pessoas',
    progressPercent: 65,
    progressBarColor: 'bg-emerald-700',
  },
  {
    id: 'proj-tech-4',
    tag: 'Tecnologia',
    tagBg: 'bg-slate-900/80',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    title: 'Telemedicina para Todos',
    description: 'Plataforma de telemedicina acessível para áreas remotas.',
    location: 'Colômbia',
    impacted: 'Impactadas 66K pessoas',
    progressPercent: 68,
    progressBarColor: 'bg-cyan-600',
  },
  {
    id: 'proj-tech-5',
    tag: 'Tecnologia',
    tagBg: 'bg-slate-900/80',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    title: 'Redes de Microenergia Solar',
    description: 'Monitoramento inteligente de baterias e redes solares comunitárias.',
    location: 'Ruanda',
    impacted: 'Impactadas 84K pessoas',
    progressPercent: 82,
    progressBarColor: 'bg-emerald-600',
  },
  {
    id: 'proj-tech-6',
    tag: 'Tecnologia',
    tagBg: 'bg-slate-900/80',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    title: 'Código Aberto para Conservação',
    description: 'IA e visão computacional para rastreamento de espécies em extinção.',
    location: 'Indonésia',
    impacted: 'Impactadas 52K pessoas',
    progressPercent: 75,
    progressBarColor: 'bg-teal-600',
  },
];

// 5 Mais populares em Tecnologia
const POPULAR_TECH_ITEMS: PopularTechItem[] = [
  {
    rank: 1,
    id: 'pop-t1',
    name: 'Conectividade para Todos',
    supporters: '166K apoiadores',
    growth: '▲ 24%',
    avatar: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&auto=format&fit=crop&q=80',
  },
  {
    rank: 2,
    id: 'pop-t2',
    name: 'IA para o Bem Social',
    supporters: '132K apoiadores',
    growth: '▲ 18%',
    avatar: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=120&auto=format&fit=crop&q=80',
  },
  {
    rank: 3,
    id: 'pop-t3',
    name: 'Energia Inteligente',
    supporters: '98K apoiadores',
    growth: '▲ 16%',
    avatar: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=120&auto=format&fit=crop&q=80',
  },
  {
    rank: 4,
    id: 'pop-t4',
    name: 'Educação Digital Inclusiva',
    supporters: '87K apoiadores',
    growth: '▲ 15%',
    avatar: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&auto=format&fit=crop&q=80',
  },
  {
    rank: 5,
    id: 'pop-t5',
    name: 'Cidades Inteligentes',
    supporters: '76K apoiadores',
    growth: '▲ 12%',
    avatar: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=120&auto=format&fit=crop&q=80',
  },
];

// 6 Recursos e ferramentas
const TECH_RESOURCES: TechResource[] = [
  {
    id: 'res-t1',
    title: 'Guia de Inovação Social',
    description: 'Passo a passo para criar soluções tecnológicas',
    iconBg: 'bg-emerald-50 text-emerald-600',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'res-t2',
    title: 'Ferramentas de IA Ética',
    description: 'Recursos para desenvolver com responsabilidade',
    iconBg: 'bg-blue-50 text-blue-600',
    iconColor: 'text-blue-600',
  },
  {
    id: 'res-t3',
    title: 'Plataformas Abertas',
    description: 'Tecnologias abertas para impacto social',
    iconBg: 'bg-cyan-50 text-cyan-600',
    iconColor: 'text-cyan-600',
  },
  {
    id: 'res-t4',
    title: 'Financiamento Tech',
    description: 'Encontre apoio para projetos tecnológicos',
    iconBg: 'bg-amber-50 text-amber-600',
    iconColor: 'text-amber-600',
  },
  {
    id: 'res-t5',
    title: 'Cursos e Webinars',
    description: 'Aprenda com especialistas em tecnologia',
    iconBg: 'bg-orange-50 text-orange-600',
    iconColor: 'text-orange-600',
  },
  {
    id: 'res-t6',
    title: 'Parcerias Tech',
    description: 'Conecte-se com hubs e organizações tech',
    iconBg: 'bg-purple-50 text-purple-600',
    iconColor: 'text-purple-600',
  },
];

export const TechnologyImpactView: React.FC<TechnologyImpactViewProps> = ({
  onBackToImpact,
  onNavigateToCategory,
  onNavigateToTab,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenMobileMenu,
}) => {
  const [isMaisDropdownOpen, setIsMaisDropdownOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedProjectModal, setSelectedProjectModal] = useState<TechProject | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [supportedCount, setSupportedCount] = useState(842);
  const [hasSupported, setHasSupported] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Helper para ícones das áreas
  const renderAreaIcon = (type: TechImpactArea['iconType']) => {
    switch (type) {
      case 'wifi':
        return <Wifi className="w-5 h-5" />;
      case 'laptop':
        return <Laptop className="w-5 h-5" />;
      case 'brain':
        return <Brain className="w-5 h-5" />;
      case 'health':
        return <HeartPulse className="w-5 h-5" />;
      case 'sustainable':
        return <Leaf className="w-5 h-5" />;
      case 'city':
        return <Building className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
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
    <div id="technology-impact-view" className="w-full bg-[#F8FAFC] min-h-screen text-[#0F172A] flex flex-col">
      {/* Conteúdo Principal (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* 2. Cabeçalho de Tecnologia com Ícone, Subtítulo e Botão Apoiar Iniciativa */}
        <section id="tecnologia-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            {/* Ícone Quadrado Arredondado com Chip em Verde Escuro #064E3B */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#064E3B] text-white flex items-center justify-center shrink-0 shadow-sm border border-emerald-950/20">
              <Cpu className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.4} />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight font-['Outfit'] leading-tight">
                Tecnologia
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] font-normal leading-snug">
                Inovação e tecnologia a serviço das pessoas e do planeta para um futuro mais inteligente e sustentável.
              </p>
            </div>
          </div>

          {/* Botão "Apoiar Iniciativa ♡" em Verde Floresta */}
          <button
            type="button"
            onClick={handleSupportClick}
            id="btn-apoiar-iniciativa-tecnologia"
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#04382A] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Apoiar Iniciativa</span>
            <Heart className={`w-4 h-4 ${hasSupported ? 'fill-white' : ''}`} strokeWidth={2.2} />
          </button>
        </section>

        {/* 3. Fita com 7 Métricas Principais de Tecnologia */}
        <section id="tecnologia-top-metrics" className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { value: String(supportedCount), label: 'Iniciativas Ativas', icon: Users },
            { value: '215', label: 'Organizações', icon: Building2 },
            { value: '96', label: 'Países', icon: Globe },
            { value: '3.215.780', label: 'Pessoas Impactadas', icon: Users },
            { value: '1.247', label: 'Soluções Inovadoras', icon: Lightbulb },
            { value: '2.417.890 t', label: 'CO₂ Evitado', icon: Leaf },
            { value: '78.540', label: 'Voluntários Tech', icon: Code2 },
          ].map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs flex items-center gap-2.5 hover:border-slate-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-black text-[#0F172A] font-['Outfit'] leading-none truncate">
                    {m.value}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium truncate block mt-0.5">
                    {m.label}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {/* 4. Fita Horizontal de Categorias (com Tecnologia Selecionada em #064E3B) */}
        <nav
          id="categories-ribbon-tecnologia"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 relative"
          aria-label="Categorias de Impacto Global"
        >
          {[
            { id: 'todas', label: 'Todas', icon: Compass },
            { id: 'ambiente', label: 'Ambiente', icon: Leaf },
            { id: 'tecnologia', label: 'Tecnologia', icon: Cpu },
            { id: 'educacao', label: 'Educação', icon: GraduationCap },
            { id: 'direitos-humanos', label: 'Direitos Humanos', icon: Scale },
            { id: 'saude', label: 'Saúde', icon: HeartPulse },
            { id: 'empreendedorismo', label: 'Empreendedorismo', icon: Rocket },
            { id: 'cultura', label: 'Cultura', icon: Palette },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === 'tecnologia';

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
                    : 'bg-white border border-slate-200/90 text-[#334155] hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} strokeWidth={2.2} />
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white border border-slate-200/90 text-[#334155] hover:bg-slate-50 whitespace-nowrap cursor-pointer shadow-2xs"
            >
              <MoreHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Mais</span>
            </button>

            {isMaisDropdownOpen && (
              <div className="absolute left-0 mt-1 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-40 text-xs font-medium">
                {[
                  'Inclusão Social',
                  'Saneamento Básico',
                  'Energias Limpas',
                  'Agricultura Sustentável',
                  'Habitação Digna',
                  'Proteção Animal',
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
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 text-slate-700 flex items-center justify-between cursor-pointer"
                  >
                    <span>{extra}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* 5. Grade Principal: Coluna Central (Hero + Áreas + Projetos + Métricas) e Coluna Lateral (Mais Populares + Recursos + CTA) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* COLUNA PRINCIPAL (lg:col-span-9) */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            {/* HERO BANNER: "Tecnologia que conecta. Inovação que transforma." */}
            <section
              id="hero-tecnologia-banner"
              className="relative rounded-2xl overflow-hidden min-h-[300px] flex items-center text-white shadow-md border border-emerald-950/20 bg-[#062A2B] group"
            >
              {/* Imagem de Fundo com Conexões Tecnológicas e Planeta */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="/imagens-paginas/06-impacto-global/tecnologia/tech1.png"
                  alt="Tecnologia e inovação conectando o mundo"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 opacity-30"
                  referrerPolicy="no-referrer"
                />
                {/* Gradiente Escuro Verde Floresta & Azul Noturno */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#062A2B] via-[#06382B]/95 to-[#062024]" />
              </div>

              {/* Elementos Visuais Flutuantes de Rede (Rede de Conexões) */}
              <div className="absolute right-40 sm:right-64 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none">
                <div className="relative w-64 h-64 flex items-center justify-center">
                  {/* Círculo Central com Globo/Ícone */}
                  <div className="w-32 h-32 rounded-full border-2 border-emerald-400/40 bg-emerald-950/60 backdrop-blur-md flex items-center justify-center shadow-lg relative z-10">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
                      <Globe className="w-10 h-10 text-emerald-300 animate-pulse" />
                    </div>
                  </div>

                  {/* Nós Conectados Satélites */}
                  <div className="absolute -top-3 left-10 w-9 h-9 rounded-full bg-blue-600/80 border border-blue-300 flex items-center justify-center shadow-md">
                    <Wifi className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-2 right-4 w-9 h-9 rounded-full bg-cyan-600/80 border border-cyan-300 flex items-center justify-center shadow-md">
                    <Laptop className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-8 w-9 h-9 rounded-full bg-emerald-600/80 border border-emerald-300 flex items-center justify-center shadow-md">
                    <Leaf className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-3 left-14 w-9 h-9 rounded-full bg-amber-600/80 border border-amber-300 flex items-center justify-center shadow-md">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-9 h-9 rounded-full bg-purple-600/80 border border-purple-300 flex items-center justify-center shadow-md">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Textos da Esquerda */}
                <div className="max-w-md flex flex-col gap-2.5">
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight font-['Outfit'] tracking-tight">
                    Tecnologia que conecta. <br />
                    Inovação que transforma.
                  </h2>
                  <p className="text-xs sm:text-[13px] text-emerald-100/90 leading-relaxed font-normal">
                    Conheça iniciativas que usam tecnologia para resolver problemas reais, promover inclusão digital e construir um futuro mais conectado e sustentável.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('projetos-em-destaque-tecnologia');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-emerald-50 text-[#064E3B] text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                    >
                      <span>Explorar iniciativas tecnológicas</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.4]" />
                    </button>
                  </div>
                </div>

                {/* Card Transparente na Direita: "Impacto da Tecnologia" */}
                <div className="w-full lg:w-72 bg-black/45 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col gap-2.5 shrink-0 shadow-lg">
                  <h3 className="text-xs font-bold text-emerald-300 font-['Outfit'] tracking-wider uppercase">
                    Impacto da Tecnologia
                  </h3>

                  <div className="flex flex-col divide-y divide-white/10 text-xs">
                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <span className="text-[11.5px]">Pessoas Impactadas</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">3.215.780</span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        <span className="text-[11.5px]">Soluções Inovadoras</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">1.247</span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Leaf className="w-4 h-4 text-teal-400" />
                        <span className="text-[11.5px]">CO₂ Evitado</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">2.417.890 t</span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <span className="text-[11.5px]">Países</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">96</span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Code2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-[11.5px]">Voluntários Tech</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">78.540</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 1: Áreas de impacto tecnológico (6 Cards) */}
            <section id="areas-impacto-tecnologia" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Áreas de impacto tecnológico
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedArea(null)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid com 6 Cartões de Áreas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {TECH_IMPACT_AREAS.map((area) => {
                  const isSelected = selectedArea === area.id;

                  return (
                    <div
                      key={area.id}
                      onClick={() => setSelectedArea(isSelected ? null : area.id)}
                      className={`bg-white rounded-xl border p-3.5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all cursor-pointer group ${
                        isSelected
                          ? 'border-emerald-600 ring-2 ring-emerald-600/20'
                          : 'border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        {/* Ícone Redondo Colorido */}
                        <div className={`w-10 h-10 rounded-full ${area.iconBg} ${area.iconColor} flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform`}>
                          {renderAreaIcon(area.iconType)}
                        </div>

                        <h4 className="text-xs font-bold text-[#0F172A] font-['Outfit'] leading-snug group-hover:text-emerald-700 transition-colors">
                          {area.name}
                        </h4>

                        <p className="text-[10px] text-slate-500 leading-tight mt-1 mb-2.5 line-clamp-3">
                          {area.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-emerald-700">
                          {area.count}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SEÇÃO 2: Projetos em Destaque (4 Cards) + Impacto por Região (Widget com Mapa) */}
            <section id="projetos-em-destaque-tecnologia" className="flex flex-col gap-3.5">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Projetos em destaque (3 em 3 cards) */}
                <div className="lg:col-span-8 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                      Projetos em destaque
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, FEATURED_TECH_PROJECTS.length - 3)))}
                        className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer shadow-2xs transition-colors"
                        aria-label="Anterior"
                        title="Projetos anteriores"
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCarouselIndex((prev) => (prev < FEATURED_TECH_PROJECTS.length - 3 ? prev + 1 : 0))}
                        className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer shadow-2xs transition-colors"
                        aria-label="Seguinte"
                        title="Próximos projetos"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {FEATURED_TECH_PROJECTS.slice(carouselIndex, carouselIndex + 3).map((proj) => (
                        <article
                          key={proj.id}
                          onClick={() => setSelectedProjectModal(proj)}
                          className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col cursor-pointer group"
                        >
                          {/* Imagem do Projeto com Badge "Tecnologia" Sobreposta */}
                          <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <span className={`absolute top-2 left-2 text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-2xs ${proj.tagBg} ${proj.tagColor}`}>
                              {proj.tag}
                            </span>
                          </div>

                          {/* Conteúdo */}
                          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                            <div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {proj.location}
                              </div>
                              <h4 className="text-xs sm:text-[13px] font-bold text-[#0F172A] font-['Outfit'] line-clamp-1 leading-snug group-hover:text-emerald-700 transition-colors mt-0.5">
                                {proj.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mt-1">
                                {proj.description}
                              </p>
                            </div>

                            {/* Barra de Progresso da Meta */}
                            <div className="pt-2 border-t border-slate-100 space-y-1.5">
                              <div className="flex items-center justify-between text-[10.5px]">
                                <span className="text-slate-500 truncate">{proj.impacted}</span>
                                <span className="font-bold text-emerald-700 shrink-0">{proj.progressPercent}% da meta</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
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
                      onClick={() => setCarouselIndex((prev) => (prev < FEATURED_TECH_PROJECTS.length - 3 ? prev + 1 : 0))}
                      className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-600 hover:text-slate-900 cursor-pointer z-10"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Widget: Impacto por Região (Mapa Autêntico e Interativo) */}
                <ImpactRegionMapCard
                  category="tecnologia"
                  className="lg:col-span-4"
                  customRegions={[
                    { id: 'asia', name: 'Ásia', percent: 32, projectsCount: 412, highlight: true },
                    { id: 'europe', name: 'Europa', percent: 24, projectsCount: 298 },
                    { id: 'north-america', name: 'América do Norte', percent: 20, projectsCount: 260 },
                    { id: 'latin-america', name: 'América Latina', percent: 16, projectsCount: 195 },
                    { id: 'africa', name: 'África', percent: 8, projectsCount: 110 },
                  ]}
                />
              </div>
            </section>

            {/* SEÇÃO 3: O impacto em números (6 Cards com Gráficos de Linha) */}
            <section id="impacto-em-numeros-tecnologia" className="flex flex-col gap-3">
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                O impacto em números
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  {
                    value: '3.215.780',
                    label: 'Pessoas Impactadas',
                    change: '▲ 12,4% este mês',
                    icon: Users,
                    color: '#059669',
                    path: 'M0,18 Q15,8 30,14 T60,6 T90,12 T120,4',
                  },
                  {
                    value: '1.247',
                    label: 'Soluções Inovadoras',
                    change: '▲ 8,7% este mês',
                    icon: Lightbulb,
                    color: '#2563EB',
                    path: 'M0,16 Q20,18 40,10 T80,14 T120,5',
                  },
                  {
                    value: '78.540',
                    label: 'Voluntários Tech',
                    change: '▲ 15,2% este mês',
                    icon: Code2,
                    color: '#047857',
                    path: 'M0,17 Q25,12 50,15 T90,8 T120,3',
                  },
                  {
                    value: '2.417.890 t',
                    label: 'CO₂ Evitado',
                    change: '▲ 11,6% este mês',
                    icon: Leaf,
                    color: '#0891B2',
                    path: 'M0,19 Q30,16 60,11 T90,13 T120,5',
                  },
                  {
                    value: '96',
                    label: 'Países',
                    change: '▲ 5,3% este mês',
                    icon: Globe,
                    color: '#9333EA',
                    path: 'M0,15 Q25,14 55,16 T85,9 T120,4',
                  },
                  {
                    value: '256',
                    label: 'Parcerias Tech',
                    change: '▲ 9,1% este mês',
                    icon: Network,
                    color: '#D97706',
                    path: 'M0,18 Q30,13 60,15 T90,10 T120,6',
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <Icon className="w-4 h-4 text-slate-400" />
                          <span className="text-[9px] font-bold text-emerald-600">
                            {item.change}
                          </span>
                        </div>
                        <span className="text-sm font-black text-[#0F172A] font-['Outfit'] block truncate">
                          {item.value}
                        </span>
                        <span className="text-[9.5px] text-slate-500 font-medium block leading-tight mt-0.5">
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
          </div>

          {/* COLUNA LATERAL DIREITA (lg:col-span-3) */}
          <aside className="lg:col-span-3 flex flex-col gap-4">
            {/* 1. Card: Mais populares em Tecnologia */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit']">
                  Mais populares em Tecnologia
                </h3>
                <button
                  type="button"
                  className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100">
                {POPULAR_TECH_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="py-2 flex items-center justify-between gap-2 hover:bg-slate-50 px-1 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xs font-bold text-slate-400 w-3 shrink-0">
                        {item.rank}
                      </span>
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#0F172A] truncate group-hover:text-emerald-700 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 block truncate">
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

            {/* 2. Card: Recursos e Ferramentas (6 Itens) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit']">
                  Recursos e ferramentas
                </h3>
                <button
                  type="button"
                  className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100">
                {TECH_RESOURCES.map((res) => (
                  <div
                    key={res.id}
                    className="py-2 flex items-center justify-between gap-2.5 hover:bg-slate-50 px-1 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className={`w-8 h-8 rounded-lg ${res.iconBg} flex items-center justify-center shrink-0`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[11px] font-bold text-[#0F172A] truncate group-hover:text-emerald-700 transition-colors">
                          {res.title}
                        </h4>
                        <span className="text-[9.5px] text-slate-500 block truncate">
                          {res.description}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:text-slate-700" />
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Card CTA: "Inovação hoje, impacto para sempre." */}
            <div
              id="cta-tecnologia-card"
              className="relative rounded-2xl overflow-hidden p-5 text-white min-h-[230px] flex flex-col justify-between shadow-md group bg-[#041E26]"
            >
              {/* Imagem de Fundo com Mão Segurando Globo Holográfico Tecnológico */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80"
                  alt="Inovação e impacto tecnológico"
                  className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-500 opacity-30"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02141A] via-[#041E26]/90 to-transparent" />
              </div>

              <div className="relative z-10 flex flex-col gap-1.5 max-w-[220px]">
                <h3 className="text-base font-extrabold text-white font-['Outfit'] leading-tight">
                  Inovação hoje, <br />
                  impacto para sempre.
                </h3>
                <p className="text-[11px] text-white/90 leading-snug">
                  Apoie soluções tecnológicas que transformam vidas, protegem o planeta e constroem um mundo mais justo e conectado.
                </p>
              </div>

              <div className="relative z-10 pt-3">
                <button
                  type="button"
                  onClick={handleSupportClick}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#041E26] hover:bg-slate-100 text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  <span>Explorar Iniciativas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal de Detalhes do Projeto */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="relative h-48 w-full">
              <img
                src={selectedProjectModal.image}
                alt={selectedProjectModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => setSelectedProjectModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer"
              >
                ✕
              </button>
              <span className={`absolute bottom-3 left-3 text-xs font-bold px-2.5 py-1 rounded shadow-md ${selectedProjectModal.tagBg} ${selectedProjectModal.tagColor}`}>
                {selectedProjectModal.tag}
              </span>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div>
                <h3 className="text-lg font-black text-[#0F172A] font-['Outfit']">
                  {selectedProjectModal.title}
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedProjectModal.location}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProjectModal.description} Esta iniciativa impulsiona inclusão digital, educação de alta qualidade e sustentabilidade comunitária através de inovação aberta e tecnologias conectadas.
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-700">{selectedProjectModal.impacted}</span>
                  <span className="font-bold text-emerald-700">{selectedProjectModal.progressPercent}% da meta</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${selectedProjectModal.progressBarColor}`}
                    style={{ width: `${selectedProjectModal.progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProjectModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProjectModal(null);
                    handleSupportClick();
                  }}
                  className="px-5 py-2 rounded-xl bg-[#064E3B] text-white text-xs font-bold hover:bg-[#04382A] transition-colors cursor-pointer"
                >
                  Apoiar esta Iniciativa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Apoiar Iniciativa */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] font-['Outfit']">
                    Apoiar Iniciativa Tech
                  </h3>
                  <span className="text-xs text-slate-500">
                    Tecnologia e Inovação para o Impacto Global
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSupportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Ao apoiar esta iniciativa, você se une a mais de 3.2 milhões de pessoas que impulsionam acesso digital, soluções abertas e ferramentas de alto impacto para comunidades vulneráveis.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsSupportModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmSupport}
                className="flex-1 py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold hover:bg-[#04382A] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Confirmar Apoio</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnologyImpactView;
