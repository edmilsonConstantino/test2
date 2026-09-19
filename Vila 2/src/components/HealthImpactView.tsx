import React, { useState } from 'react';
import { ImpactRegionMapCard } from './ImpactRegionMapCard';
import { ImpactAnalyticsSection } from './ImpactAnalyticsSection';
import {
  HeartPulse,
  Heart,
  Users,
  Building2,
  Globe,
  Droplets,
  Clock,
  ArrowRight,
  ChevronRight,
  Stethoscope,
  Brain,
  Sparkles,
  X,
  Compass,
  Leaf,
  Cpu,
  GraduationCap,
  Scale,
  Rocket,
  Palette,
  MoreHorizontal,
  Share2,
  Bookmark,
  MapPin,
  ExternalLink,
  ShieldAlert,
  Flame,
  FileText,
  Activity,
  Award,
  Sun,
  HandHeart,
  TrendingUp,
} from 'lucide-react';

export interface HealthImpactViewProps {
  onBackToImpact?: () => void;
  onNavigateToCategory?: (category: string) => void;
  onNavigateToTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
}

// Interfaces
interface HealthProject {
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

interface ImpactArea {
  id: string;
  name: string;
  description: string;
  count: string;
  iconBg: string;
  iconColor: string;
  iconType: 'stethoscope' | 'droplet' | 'brain' | 'heart' | 'sun' | 'activity';
}

interface PopularHealthItem {
  rank: number;
  id: string;
  name: string;
  supporters: string;
  growth: string;
  avatar: string;
}

interface HealthResource {
  id: string;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}

// 6 Áreas de impacto em saúde
const IMPACT_AREAS: ImpactArea[] = [
  {
    id: 'acesso',
    name: 'Acesso à Saúde',
    description: 'Levar serviços de saúde essenciais a todas as comunidades.',
    count: '198 iniciativas',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    iconType: 'stethoscope',
  },
  {
    id: 'agua',
    name: 'Água, Saneamento e Higiene',
    description: 'Água limpa e saneamento adequado para prevenir doenças.',
    count: '162 iniciativas',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    iconType: 'droplet',
  },
  {
    id: 'mental',
    name: 'Saúde Mental',
    description: 'Promoção do bem-estar mental e apoio psicológico comunitário.',
    count: '128 iniciativas',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    iconType: 'brain',
  },
  {
    id: 'nutricao',
    name: 'Nutrição',
    description: 'Combater a desnutrição e promover alimentação saudável.',
    count: '142 iniciativas',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    iconType: 'heart',
  },
  {
    id: 'prevencao',
    name: 'Prevenção de Doenças',
    description: 'Campanhas de vacinação, prevenção e controle de doenças.',
    count: '176 iniciativas',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    iconType: 'sun',
  },
  {
    id: 'bem-estar',
    name: 'Bem-estar e Estilo de Vida',
    description: 'Incentivar hábitos saudáveis e qualidade de vida.',
    count: '118 iniciativas',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    iconType: 'activity',
  },
];

// 6 Projetos em Destaque (Navegação 3 em 3)
const FEATURED_HEALTH_PROJECTS: HealthProject[] = [
  {
    id: 'proj-1',
    tag: 'Acesso à Saúde',
    tagBg: 'bg-emerald-700',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80',
    title: 'Clínicas Móveis',
    description: 'Atendimento médico para comunidades remotas.',
    location: 'Moçambique',
    impacted: 'Impactadas 85K pessoas',
    progressPercent: 72,
    progressBarColor: 'bg-emerald-600',
  },
  {
    id: 'proj-2',
    tag: 'Saúde Mental',
    tagBg: 'bg-purple-700',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    title: 'Círculos de Apoio',
    description: 'Apoio psicológico comunitário para jovens.',
    location: 'Brasil',
    impacted: 'Impactadas 42K pessoas',
    progressPercent: 68,
    progressBarColor: 'bg-emerald-500',
  },
  {
    id: 'proj-3',
    tag: 'Água e Higiene',
    tagBg: 'bg-blue-700',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600&auto=format&fit=crop&q=80',
    title: 'Água Limpa, Vida',
    description: 'Instalação de poços e sistemas de filtragem de água.',
    location: 'África',
    impacted: 'Impactadas 120K pessoas',
    progressPercent: 80,
    progressBarColor: 'bg-blue-600',
  },
  {
    id: 'proj-4',
    tag: 'Nutrição',
    tagBg: 'bg-rose-700',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80',
    title: 'Refeições Saudáveis',
    description: 'Combate à desnutrição infantil em escolas.',
    location: 'Índia',
    impacted: 'Impactadas 96K pessoas',
    progressPercent: 75,
    progressBarColor: 'bg-indigo-600',
  },
  {
    id: 'proj-5',
    tag: 'Saúde Materna',
    tagBg: 'bg-pink-700',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
    title: 'Maternidade Segura',
    description: 'Acompanhamento pré-natal e parto humanizado em áreas rurais.',
    location: 'Angola',
    impacted: 'Impactadas 54K pessoas',
    progressPercent: 83,
    progressBarColor: 'bg-rose-600',
  },
  {
    id: 'proj-6',
    tag: 'Prevenção',
    tagBg: 'bg-amber-700',
    tagColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&auto=format&fit=crop&q=80',
    title: 'Vacinação sem Fronteiras',
    description: 'Campanhas de imunização em comunidades isoladas.',
    location: 'Guatemala',
    impacted: 'Impactadas 78K pessoas',
    progressPercent: 88,
    progressBarColor: 'bg-amber-600',
  },
];

// 5 Mais populares em Saúde
const POPULAR_HEALTH_ITEMS: PopularHealthItem[] = [
  {
    rank: 1,
    id: 'pop-1',
    name: 'Acesso à Saúde Primária',
    supporters: '212K apoiadores',
    growth: '▲ 24%',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&auto=format&fit=crop&q=80',
  },
  {
    rank: 2,
    id: 'pop-2',
    name: 'Saúde Mental para Todos',
    supporters: '156K apoiadores',
    growth: '▲ 18%',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  },
  {
    rank: 3,
    id: 'pop-3',
    name: 'Combate a Doenças',
    supporters: '128K apoiadores',
    growth: '▲ 16%',
    avatar: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&auto=format&fit=crop&q=80',
  },
  {
    rank: 4,
    id: 'pop-4',
    name: 'Água Limpa, Vida Saudável',
    supporters: '98K apoiadores',
    growth: '▲ 15%',
    avatar: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=120&auto=format&fit=crop&q=80',
  },
  {
    rank: 5,
    id: 'pop-5',
    name: 'Nutrição para Crianças',
    supporters: '72K apoiadores',
    growth: '▲ 12%',
    avatar: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=120&auto=format&fit=crop&q=80',
  },
];

// 7 Recursos e Ferramentas
const HEALTH_RESOURCES: HealthResource[] = [
  {
    id: 'res-1',
    title: 'Guia de Saúde Comunitária',
    description: 'Passo a passo para iniciar uma iniciativa',
    iconBg: 'bg-emerald-50 text-emerald-600',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'res-2',
    title: 'Monitor de Indicadores',
    description: 'Acompanhe dados de saúde em tempo real',
    iconBg: 'bg-teal-50 text-teal-600',
    iconColor: 'text-teal-600',
  },
  {
    id: 'res-3',
    title: 'Biblioteca de Boas Práticas',
    description: 'Estudos e soluções comprovadas',
    iconBg: 'bg-cyan-50 text-cyan-600',
    iconColor: 'text-cyan-600',
  },
  {
    id: 'res-4',
    title: 'Financiamento para Saúde',
    description: 'Encontre apoio para projetos de saúde',
    iconBg: 'bg-blue-50 text-blue-600',
    iconColor: 'text-blue-600',
  },
  {
    id: 'res-5',
    title: 'Cursos e Webinars',
    description: 'Aprenda com especialistas da área',
    iconBg: 'bg-amber-50 text-amber-600',
    iconColor: 'text-amber-600',
  },
  {
    id: 'res-6',
    title: 'Parcerias em Saúde',
    description: 'Conecte-se com instituições e redes',
    iconBg: 'bg-emerald-50 text-emerald-600',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'res-7',
    title: 'Ferramentas gratuitas',
    description: 'Recursos para potencializar projetos',
    iconBg: 'bg-rose-50 text-rose-600',
    iconColor: 'text-rose-600',
  },
];

export const HealthImpactView: React.FC<HealthImpactViewProps> = ({
  onBackToImpact,
  onNavigateToCategory,
  onNavigateToTab,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenMobileMenu,
}) => {
  const [isMaisDropdownOpen, setIsMaisDropdownOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedProjectModal, setSelectedProjectModal] = useState<HealthProject | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [supportedCount, setSupportedCount] = useState(842);
  const [hasSupported, setHasSupported] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Helper para renderizar ícones das áreas
  const renderAreaIcon = (type: ImpactArea['iconType']) => {
    switch (type) {
      case 'stethoscope':
        return <Stethoscope className="w-5 h-5" />;
      case 'droplet':
        return <Droplets className="w-5 h-5" />;
      case 'brain':
        return <Brain className="w-5 h-5" />;
      case 'heart':
        return <Heart className="w-5 h-5" />;
      case 'sun':
        return <Sun className="w-5 h-5" />;
      case 'activity':
        return <Activity className="w-5 h-5" />;
      default:
        return <Stethoscope className="w-5 h-5" />;
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
    <div id="health-impact-view" className="w-full bg-[#F8FAFC] min-h-screen text-[#0F172A] flex flex-col">
      {/* Conteúdo Principal (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* 2. Cabeçalho de Saúde com Ícone, Subtítulo e Botão Apoiar Iniciativa */}
        <section id="saude-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            {/* Ícone Quadrado Arredondado com Linha de ECG em Verde Escuro #064E3B */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#064E3B] text-white flex items-center justify-center shrink-0 shadow-sm border border-emerald-950/20">
              <HeartPulse className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.4} />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight font-['Outfit'] leading-tight">
                Saúde
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] font-normal leading-snug">
                Promovemos bem-estar, acesso à saúde e sistemas resilientes para todos.
              </p>
            </div>
          </div>

          {/* Botão "Apoiar Iniciativa ♡" em Verde Floresta */}
          <button
            type="button"
            onClick={handleSupportClick}
            id="btn-apoiar-iniciativa-saude"
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#04382A] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Apoiar Iniciativa</span>
            <Heart className={`w-4 h-4 ${hasSupported ? 'fill-white' : ''}`} strokeWidth={2.2} />
          </button>
        </section>

        {/* 3. Fita com 7 Métricas Principais */}
        <section id="saude-top-metrics" className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { value: String(supportedCount), label: 'Iniciativas Ativas', icon: Users },
            { value: '215', label: 'Organizações', icon: Building2 },
            { value: '96', label: 'Países', icon: Globe },
            { value: '3.215.780', label: 'Pessoas Impactadas', icon: Users },
            { value: '1.890', label: 'Unidades de Saúde Apoiadas', icon: HeartPulse },
            { value: '2.417.890 t', label: 'CO₂ Evitado', icon: Leaf },
            { value: '78.540 h', label: 'Horas de Voluntariado', icon: Clock },
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

        {/* 4. Fita Horizontal de Categorias (com Saúde Selecionada em #064E3B) */}
        <nav
          id="categories-ribbon-saude"
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
            const isActive = cat.id === 'saude';

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
            {/* HERO BANNER: "Saúde para todos, mais forte juntos." */}
            <section
              id="hero-saude-banner"
              className="relative rounded-2xl overflow-hidden min-h-[290px] flex items-center text-white shadow-md border border-emerald-950/20 bg-[#06382B] group"
            >
              {/* Imagem de Fundo com Profissional de Saúde e Família Sorrindo */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="/imagens-paginas/06-impacto-global/saude/1saude.png"
                  alt="Profissional de saúde atendendo família"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Gradiente Escuro Verde Floresta #06382B */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#06382B]/95 via-[#06382B]/85 to-[#06382B]/40" />
              </div>

              <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Textos da Esquerda com Nós Conectados */}
                <div className="max-w-md flex flex-col gap-2.5">
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight font-['Outfit'] tracking-tight">
                    Saúde para todos, <br />
                    mais forte juntos.
                  </h2>
                  <p className="text-xs sm:text-[13px] text-emerald-100/90 leading-relaxed font-normal">
                    Apoiamos iniciativas que melhoram o acesso à saúde, fortalecem sistemas e promovem bem-estar físico e mental para comunidades saudáveis e resilientes.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('projetos-em-destaque-saude');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-emerald-50 text-[#064E3B] text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                    >
                      <span>Explorar iniciativas de saúde</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.4]" />
                    </button>
                  </div>
                </div>

                {/* Card Transparente na Direita: "Impacto da Saúde" */}
                <div className="w-full lg:w-72 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col gap-2.5 shrink-0 shadow-lg">
                  <h3 className="text-xs font-bold text-emerald-300 font-['Outfit'] tracking-wider uppercase">
                    Impacto da Saúde
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
                        <HeartPulse className="w-4 h-4 text-rose-400" />
                        <span className="text-[11.5px]">Unidades de Saúde Apoiadas</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">1.890</span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Stethoscope className="w-4 h-4 text-blue-400" />
                        <span className="text-[11.5px]">Consultas Realizadas</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">2.145.320</span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Droplets className="w-4 h-4 text-cyan-400" />
                        <span className="text-[11.5px]">Pessoas com Acesso à Água Limpa</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">1.245.780</span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-[11.5px]">Horas de Voluntariado</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">78.540</span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Globe className="w-4 h-4 text-teal-400" />
                        <span className="text-[11.5px]">Países</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">96</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 1: Áreas de impacto em saúde (6 Cards) */}
            <section id="areas-impacto-saude" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Áreas de impacto em saúde
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
                {IMPACT_AREAS.map((area) => {
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
            <section id="projetos-em-destaque-saude" className="flex flex-col gap-3.5">
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
                        onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, FEATURED_HEALTH_PROJECTS.length - 3)))}
                        className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer shadow-2xs transition-colors"
                        aria-label="Anterior"
                        title="Projetos anteriores"
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCarouselIndex((prev) => (prev < FEATURED_HEALTH_PROJECTS.length - 3 ? prev + 1 : 0))}
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
                      {FEATURED_HEALTH_PROJECTS.slice(carouselIndex, carouselIndex + 3).map((proj) => (
                        <article
                          key={proj.id}
                          onClick={() => setSelectedProjectModal(proj)}
                          className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col cursor-pointer group"
                        >
                          {/* Imagem do Projeto com Badge da Categoria Sobreposta */}
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
                      onClick={() => setCarouselIndex((prev) => (prev < FEATURED_HEALTH_PROJECTS.length - 3 ? prev + 1 : 0))}
                      className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-600 hover:text-slate-900 cursor-pointer z-10"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Widget: Impacto por Região (Mapa Autêntico e Interativo) */}
                <ImpactRegionMapCard
                  category="saude"
                  className="lg:col-span-4"
                  customRegions={[
                    { id: 'africa', name: 'África', percent: 38, projectsCount: 450, highlight: true },
                    { id: 'asia', name: 'Ásia', percent: 24, projectsCount: 310 },
                    { id: 'latin-america', name: 'América Latina', percent: 18, projectsCount: 220 },
                    { id: 'europe', name: 'Europa', percent: 12, projectsCount: 150 },
                    { id: 'north-america', name: 'América do Norte', percent: 8, projectsCount: 95 },
                  ]}
                />
              </div>
            </section>

            {/* SEÇÃO 3: O impacto em números (6 Cards com Gráficos de Linha) */}
            <section id="impacto-em-numeros-saude" className="flex flex-col gap-3">
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
                    value: '1.890',
                    label: 'Unidades de Saúde Apoiadas',
                    change: '▲ 8,7% este mês',
                    icon: HeartPulse,
                    color: '#3D4ED8',
                    path: 'M0,16 Q20,18 40,10 T80,14 T120,5',
                  },
                  {
                    value: '2.145.320',
                    label: 'Consultas Realizadas',
                    change: '▲ 13,2% este mês',
                    icon: Stethoscope,
                    color: '#9333EA',
                    path: 'M0,17 Q25,12 50,15 T90,8 T120,3',
                  },
                  {
                    value: '1.245.780',
                    label: 'Pessoas com Acesso à Água Limpa',
                    change: '▲ 11,6% este mês',
                    icon: Droplets,
                    color: '#0891B2',
                    path: 'M0,19 Q30,16 60,11 T90,13 T120,5',
                  },
                  {
                    value: '78.540 h',
                    label: 'Horas de Voluntariado',
                    change: '▲ 9,3% este mês',
                    icon: Clock,
                    color: '#D97706',
                    path: 'M0,15 Q25,14 55,16 T85,9 T120,4',
                  },
                  {
                    value: '96',
                    label: 'Países',
                    change: '▲ 6,2% este mês',
                    icon: Globe,
                    color: '#E11D48',
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

            {/* SEÇÃO 4: Análise de Impacto — Gráficos Completos (Linha Temporal + Donut) */}
            <ImpactAnalyticsSection
              accent="#059669"
              softBg="bg-emerald-50"
              labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']}
              series={[
                {
                  name: 'Consultas realizadas',
                  color: '#059669',
                  values: [152, 168, 161, 178, 192, 186, 204, 215, 224, 238, 247, 259],
                },
                {
                  name: 'Unidades apoiadas',
                  color: '#0D9488',
                  values: [98, 104, 102, 112, 118, 115, 126, 132, 138, 145, 150, 158],
                },
              ]}
              slices={[
                { label: 'África', value: 38, color: '#059669' },
                { label: 'Ásia', value: 24, color: '#10B981' },
                { label: 'América Latina', value: 18, color: '#34D399' },
                { label: 'Europa', value: 12, color: '#6EE7B7' },
                { label: 'América do Norte', value: 8, color: '#A7F3D0' },
              ]}
            />
          </div>

          {/* COLUNA LATERAL DIREITA (lg:col-span-3) */}
          <aside className="lg:col-span-3 flex flex-col gap-4">
            {/* 1. Card: Mais populares em Saúde */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit']">
                  Mais populares em Saúde
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
                {POPULAR_HEALTH_ITEMS.map((item) => (
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

            {/* 2. Card: Recursos e Ferramentas (7 Itens) */}
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
                {HEALTH_RESOURCES.map((res) => (
                  <div
                    key={res.id}
                    className="py-2 flex items-center gap-2.5 hover:bg-slate-50 px-1 rounded-lg transition-colors cursor-pointer group"
                  >
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
                ))}
              </div>
            </div>

            {/* 3. Card CTA: "Saúde é um direito." */}
            <div
              id="cta-saude-card"
              className="relative rounded-2xl overflow-hidden p-5 text-white min-h-[220px] flex flex-col justify-between shadow-md group"
            >
              {/* Imagem de Fundo com Mãos Segurando Coração Vermelho com Cruz Branca */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#06382B]">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80"
                  alt="Mãos segurando coração da saúde"
                  className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-500 opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06382B] via-[#06382B]/80 to-[#06382B]/30" />
              </div>

              <div className="relative z-10 flex flex-col gap-1.5 max-w-[210px]">
                <h3 className="text-base font-extrabold text-white font-['Outfit'] leading-tight">
                  Saúde é um direito.
                </h3>
                <p className="text-[11px] text-white/90 leading-snug">
                  Apoie iniciativas que salvam vidas e constroem comunidades mais saudáveis.
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <button
                  type="button"
                  onClick={handleSupportClick}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#064E3B] text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <span>Explorar Iniciativas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal: Detalhes do Projeto de Saúde */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden relative flex flex-col">
            <button
              type="button"
              onClick={() => setSelectedProjectModal(null)}
              className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/70 w-8 h-8 rounded-full flex items-center justify-center z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-44 w-full">
              <img
                src={selectedProjectModal.image}
                alt={selectedProjectModal.title}
                className="w-full h-full object-cover"
              />
              <span className={`absolute bottom-3 left-3 text-xs font-bold px-2.5 py-1 rounded shadow-xs ${selectedProjectModal.tagBg} ${selectedProjectModal.tagColor}`}>
                {selectedProjectModal.tag}
              </span>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] font-['Outfit']">
                  {selectedProjectModal.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {selectedProjectModal.description}
                </p>
                <span className="text-[11px] text-slate-400 font-medium block mt-1">
                  Localização: {selectedProjectModal.location}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
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

              <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    handleSupportClick();
                    setSelectedProjectModal(null);
                  }}
                  className="flex-1 py-2.5 bg-[#064E3B] text-white text-xs font-bold rounded-xl hover:bg-[#04382A] transition-colors cursor-pointer"
                >
                  Apoiar Este Projeto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Apoiar Iniciativa */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 relative flex flex-col gap-4">
            <button
              type="button"
              onClick={() => setIsSupportModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Heart className="w-6 h-6 fill-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] font-['Outfit']">
                  Apoiar Iniciativa de Saúde
                </h3>
                <p className="text-xs text-slate-500">
                  Faça a diferença na vida de milhares de pessoas.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              O seu apoio contribui diretamente para clínicas móveis, distribuição de medicamentos, poços de água tratada e apoio psicológico a comunidades vulneráveis.
            </p>

            <div className="grid grid-cols-3 gap-2">
              {['10 €', '25 €', '50 €'].map((val) => (
                <button
                  key={val}
                  type="button"
                  className="py-2 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-all cursor-pointer"
                >
                  {val}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleConfirmSupport}
                className="w-full py-2.5 bg-[#064E3B] text-white text-xs font-bold rounded-xl hover:bg-[#04382A] transition-colors cursor-pointer"
              >
                Confirmar Apoio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthImpactView;
