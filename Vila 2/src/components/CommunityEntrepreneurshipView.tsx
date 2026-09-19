import React, { useState } from 'react';
import {
  Globe,
  Rocket,
  Plus,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Users,
  Compass,
  Leaf,
  Cpu,
  GraduationCap,
  Scale,
  HeartPulse,
  Palette,
  MoreHorizontal,
  Check,
  X,
  Filter,
  TrendingUp,
  Lightbulb,
  ShoppingCart,
  MapPin,
  Clock,
} from 'lucide-react';

export interface CommunityEntrepreneurshipViewProps {
  onNavigateToTab?: (tabId: string) => void;
  onNavigateToCategory?: (category: string) => void;
  onBackToOfficial?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenCreateCommunity?: () => void;
}

interface TrendingEntrepreneurshipCommunity {
  rank: number;
  id: string;
  name: string;
  membersCount: string;
  growth: string;
  description: string;
  topics: string[];
  iconType: 'startups' | 'investment' | 'social' | 'ecommerce' | 'local';
  iconBg: string;
}

interface EntrepreneurshipEvent {
  id: string;
  day: string;
  month: string;
  image: string;
  title: string;
  location: string;
  time: string;
  attendees: string;
  tag: string;
}

interface PopularEntrepreneurshipItem {
  rank: number;
  id: string;
  name: string;
  members: string;
  growth: string;
  iconType: TrendingEntrepreneurshipCommunity['iconType'];
  iconBg: string;
}

interface FeaturedEntrepreneurshipArticle {
  id: string;
  title: string;
  type: 'Guia' | 'Artigo';
  image: string;
}

const TRENDING_ENTREPRENEURSHIP_COMMUNITIES: TrendingEntrepreneurshipCommunity[] = [
  {
    rank: 1,
    id: 'emp-1',
    name: 'Startups & Inovação',
    membersCount: '68.2K membros',
    growth: '▲ 27% esta semana',
    description: 'Para fundadores e equipas que constroem o futuro.',
    topics: ['Validação de Ideias', 'Pitch', 'Inovação Aberta'],
    iconType: 'startups',
    iconBg: 'bg-[#059669]',
  },
  {
    rank: 2,
    id: 'emp-2',
    name: 'Financiamento & Investimento',
    membersCount: '52.7K membros',
    growth: '▲ 19% esta semana',
    description: 'Conecte-se com investidores e descubra oportunidades de capital.',
    topics: ['Investimento Anjo', 'VC', 'Captação de Recursos'],
    iconType: 'investment',
    iconBg: 'bg-[#3D4ED8]',
  },
  {
    rank: 3,
    id: 'emp-3',
    name: 'Empreendedorismo Social',
    membersCount: '41.9K membros',
    growth: '▲ 16% esta semana',
    description: 'Negócios que geram impacto positivo na sociedade e no planeta.',
    topics: ['Impacto Social', 'ODS', 'Sustentabilidade'],
    iconType: 'social',
    iconBg: 'bg-[#7C3AED]',
  },
  {
    rank: 4,
    id: 'emp-4',
    name: 'E-commerce & Digital',
    membersCount: '38.6K membros',
    growth: '▲ 14% esta semana',
    description: 'Estratégias e ferramentas para vender mais e escalar online.',
    topics: ['Loja Online', 'Marketplaces', 'Growth Hacking'],
    iconType: 'ecommerce',
    iconBg: 'bg-[#EA580C]',
  },
  {
    rank: 5,
    id: 'emp-5',
    name: 'Negócios Locais',
    membersCount: '33.8K membros',
    growth: '▲ 12% esta semana',
    description: 'Apoio a empreendedores que fortalecem as economias locais.',
    topics: ['Gestão de Negócios', 'Vendas Locais'],
    iconType: 'local',
    iconBg: 'bg-[#DB2777]',
  },
];

const FEATURED_ENTREPRENEURSHIP_EVENTS: EntrepreneurshipEvent[] = [
  {
    id: 'event-1',
    day: '27',
    month: 'MAI',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
    title: 'Webinar: Validação de Ideias e MVP',
    location: 'Online',
    time: '15:00 (GMT)',
    attendees: '1.1K vão participar',
    tag: 'Webinar',
  },
  {
    id: 'event-2',
    day: '03',
    month: 'JUN',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80',
    title: 'Workshop: Modelo de Negócio Canvas',
    location: 'São Paulo, Brasil',
    time: '10:00 (GMT-3)',
    attendees: '764 vão participar',
    tag: 'Workshop',
  },
  {
    id: 'event-3',
    day: '10',
    month: 'JUN',
    image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&auto=format&fit=crop&q=80',
    title: 'Pitch Day Global para Startups',
    location: 'Online',
    time: 'Início às 00:00 (GMT)',
    attendees: '2.9K inscritos',
    tag: 'Desafio',
  },
  {
    id: 'event-4',
    day: '16',
    month: 'JUN',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80',
    title: 'Finanças para Empreendedores',
    location: 'Evento de 7 dias',
    time: 'Todo o dia',
    attendees: '2.1K vão participar',
    tag: 'Curso Online',
  },
  {
    id: 'event-5',
    day: '23',
    month: 'JUN',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80',
    title: 'Empreendedorismo Local em Ação',
    location: 'Lisboa, Portugal',
    time: '14:00 (GMT)',
    attendees: '582 vão participar',
    tag: 'Palestra',
  },
];

const POPULAR_ENTREPRENEURSHIP_ITEMS: PopularEntrepreneurshipItem[] = TRENDING_ENTREPRENEURSHIP_COMMUNITIES.map((c) => ({
  rank: c.rank,
  id: `pop-${c.id}`,
  name: c.name,
  members: c.membersCount,
  growth: c.growth.replace(' esta semana', ''),
  iconType: c.iconType,
  iconBg: c.iconBg,
}));

const FEATURED_ARTICLES: FeaturedEntrepreneurshipArticle[] = [
  {
    id: 'art-1',
    title: '10 passos para validar a sua ideia de negócio',
    type: 'Guia',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-2',
    title: 'Como criar um plano de negócios vencedor',
    type: 'Artigo',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-3',
    title: 'Captação de investimento: o que os investidores procuram',
    type: 'Guia',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-4',
    title: 'Marketing digital para pequenas empresas',
    type: 'Guia',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-5',
    title: 'Ferramentas essenciais para empreendedores',
    type: 'Artigo',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=200&auto=format&fit=crop&q=80',
  },
];

export const CommunityEntrepreneurshipView: React.FC<CommunityEntrepreneurshipViewProps> = ({
  onNavigateToTab,
  onNavigateToCategory,
  onBackToOfficial,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenMobileMenu,
  onOpenCreateCommunity,
}) => {
  const [communityType, setCommunityType] = useState<string>('Todas');
  const [selectedThemes, setSelectedThemes] = useState<Set<string>>(new Set());
  const [locationFilter, setLocationFilter] = useState<string>('Qualquer lugar');
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [showMoreThemes, setShowMoreThemes] = useState<boolean>(false);
  const [isMaisDropdownOpen, setIsMaisDropdownOpen] = useState<boolean>(false);

  const [selectedCommunityModal, setSelectedCommunityModal] = useState<TrendingEntrepreneurshipCommunity | null>(null);
  const [selectedEventModal, setSelectedEventModal] = useState<EntrepreneurshipEvent | null>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<Set<string>>(new Set());

  const toggleTheme = (theme: string) => {
    setSelectedThemes((prev) => {
      const next = new Set(prev);
      if (next.has(theme)) next.delete(theme);
      else next.add(theme);
      return next;
    });
  };

  const handleClearFilters = () => {
    setCommunityType('Todas');
    setSelectedThemes(new Set());
    setLocationFilter('Qualquer lugar');
  };

  const toggleJoinCommunity = (id: string) => {
    setJoinedCommunities((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderCardIcon = (type: TrendingEntrepreneurshipCommunity['iconType']) => {
    switch (type) {
      case 'startups':
        return <Rocket className="w-5 h-5" />;
      case 'investment':
        return <TrendingUp className="w-5 h-5" />;
      case 'social':
        return <Lightbulb className="w-5 h-5" />;
      case 'ecommerce':
        return <ShoppingCart className="w-5 h-5" />;
      case 'local':
        return <Users className="w-5 h-5" />;
      default:
        return <Rocket className="w-5 h-5" />;
    }
  };

  return (
    <div id="community-entrepreneurship-view" className="w-full bg-[#F8FAFC] dark:bg-slate-950 min-h-screen text-[#0F172A] dark:text-slate-50 flex flex-col">
      {/* Conteúdo Principal (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* 2. Cabeçalho de Empreendedorismo com Ícone e Métricas */}
        <section id="empreendedorismo-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#059669] text-white flex items-center justify-center shrink-0 shadow-sm border border-emerald-900/20">
              <Rocket className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.2} />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-slate-50 tracking-tight font-['Outfit'] leading-tight">
                Empreendedorismo
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-normal leading-snug">
                Inspire-se, conecte-se e cresça com empreendedores de todo o mundo.
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-1.5 text-[11.5px] sm:text-xs font-semibold text-[#64748B] dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">1.256</strong> comunidades
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">198.430</strong> membros
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">163</strong> países
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenCreateCommunity}
            id="btn-criar-comunidade-empreendedorismo"
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Criar Comunidade</span>
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </section>

        {/* 3. Fita Horizontal de Categorias (com Empreendedorismo Selecionado) */}
        <nav
          id="categories-ribbon-empreendedorismo"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 relative"
          aria-label="Categorias de Comunidades"
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
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-[#334155] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 dark:text-slate-500'}`} strokeWidth={2.2} />
                <span>{cat.label}</span>
              </button>
            );
          })}

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
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-[#334155] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 whitespace-nowrap cursor-pointer shadow-2xs"
            >
              <MoreHorizontal className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
              <span>Mais</span>
            </button>

            {isMaisDropdownOpen && (
              <div className="absolute left-0 mt-1 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl py-1.5 z-40 text-xs font-medium">
                {['Turismo', 'Desporto', 'Habitação', 'Igualdade de Género', 'Juventude', 'Proteção Social', 'Paz e Segurança', 'Governança'].map((extra) => (
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

        {/* 4. Grade Principal de Três Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* COLUNA ESQUERDA: Filtros (lg:col-span-2) */}
          <aside
            id="filtros-empreendedorismo-sidebar"
            className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm font-bold text-[#0F172A] dark:text-slate-50 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                Filtrar comunidades
              </span>
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-[11.5px] font-semibold text-[#059669] hover:underline transition-colors cursor-pointer"
              >
                Limpar
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Tipo de comunidade</span>
              <div className="flex flex-col gap-1.5">
                {[
                  'Todas',
                  'Organizações de Apoio',
                  'Empreendedores',
                  'Investidores & Mentores',
                  'Incubadoras & Aceleradoras',
                  'Profissionais & Consultores',
                  'Startups',
                  'Negócios Locais',
                ].map((type) => {
                  const isChecked = communityType === type;
                  return (
                    <label key={type} className="flex items-center gap-2 text-[11.5px] text-[#334155] dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer select-none">
                      <input type="radio" name="entrepreneurship-type" checked={isChecked} onChange={() => setCommunityType(type)} className="sr-only" />
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                          isChecked ? 'border-[#059669] bg-[#059669]' : 'border-slate-300 bg-white dark:bg-slate-800 hover:border-slate-400'
                        }`}
                      >
                        {isChecked && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </span>
                      <span>{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Temas de Empreendedorismo</span>
              <div className="flex flex-col gap-1.5">
                {[
                  'Startups & Inovação',
                  'Empreendedorismo Social',
                  'Financiamento & Investimento',
                  'Marketing & Vendas',
                  'E-commerce',
                  'Liderança & Gestão',
                  'Transformação Digital',
                  'Economia Criativa',
                  ...(showMoreThemes ? ['Franchising', 'Negócios Familiares', 'Exportação', 'Propriedade Intelectual'] : []),
                ].map((theme) => {
                  const isChecked = selectedThemes.has(theme);
                  return (
                    <label key={theme} className="flex items-center gap-2 text-[11.5px] text-[#334155] dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer select-none">
                      <input type="checkbox" checked={isChecked} onChange={() => toggleTheme(theme)} className="sr-only" />
                      <span
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                          isChecked ? 'border-[#059669] bg-[#059669] text-white' : 'border-slate-300 bg-white dark:bg-slate-800 hover:border-slate-400'
                        }`}
                      >
                        {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                      <span>{theme}</span>
                    </label>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setShowMoreThemes(!showMoreThemes)}
                  className="text-[11px] font-bold text-blue-600 hover:underline text-left mt-0.5 cursor-pointer"
                >
                  {showMoreThemes ? 'Ver menos' : 'Ver mais'}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800 relative">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Localização</span>
              <button
                type="button"
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <span className="truncate">{locationFilter}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-500 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLocationOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 z-20 text-xs font-medium">
                  {['Qualquer lugar', 'Global', 'África', 'América Latina', 'Europa', 'Ásia'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setLocationFilter(loc);
                        setIsLocationOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300"
                    >
                      <span>{loc}</span>
                      {locationFilter === loc && <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-xs transition-all cursor-pointer mt-1"
            >
              Aplicar Filtros
            </button>
          </aside>

          {/* COLUNA CENTRAL: Hero Banner, Comunidades em Tendência e Eventos (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* HERO BANNER */}
            <section
              id="hero-empreendedorismo-banner"
              className="relative rounded-2xl overflow-hidden min-h-[220px] flex items-center text-white shadow-sm border border-slate-900/10 bg-[#022C22] group"
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="/imagens-paginas/05-comunidade-global/empreendedorismo/empreendedorismo1.png"
                  alt="Empreendedora trabalhando"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#022C22]/95 via-[#022C22]/70 to-[#022C22]/10" />
              </div>

              <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="max-w-md flex flex-col gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-['Outfit'] tracking-tight">
                    Grandes ideias <br />
                    começam na comunidade.
                  </h2>
                  <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                    Troque experiências, encontre parceiros, aceda a recursos e leve o seu projeto para o próximo nível.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (TRENDING_ENTREPRENEURSHIP_COMMUNITIES.length > 0) {
                          setSelectedCommunityModal(TRENDING_ENTREPRENEURSHIP_COMMUNITIES[0]);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#059669] text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                    >
                      <span>Juntar-se a uma comunidade</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.4]" />
                    </button>
                  </div>
                </div>

                <div className="w-full sm:w-56 shrink-0 bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-3.5 flex flex-col gap-2.5">
                  {[
                    { icon: Compass, value: '3.210', label: 'Recursos de apoio', color: 'text-[#059669]' },
                    { icon: Clock, value: '2.145', label: 'Eventos & workshops', color: 'text-[#3D4ED8]' },
                    { icon: Users, value: '1.890', label: 'Mentores ativos', color: 'text-[#7C3AED]' },
                    { icon: Rocket, value: '157', label: 'Programas de apoio', color: 'text-[#EA580C]' },
                  ].map((row) => {
                    const Icon = row.icon;
                    return (
                      <div key={row.label} className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${row.color} shrink-0`} strokeWidth={2.2} />
                        <div className="min-w-0">
                          <span className="block text-sm font-black text-[#0F172A] dark:text-slate-50 font-['Outfit'] leading-none">{row.value}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500 leading-tight">{row.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Seção: Comunidades em tendência (Empreendedorismo) (5 Cards) */}
            <section id="comunidades-tendencia-empreendedorismo-section" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                  Comunidades em tendência (Empreendedorismo)
                </h3>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {TRENDING_ENTREPRENEURSHIP_COMMUNITIES.map((comm) => (
                    <article
                      key={comm.id}
                      onClick={() => setSelectedCommunityModal(comm)}
                      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700 p-3 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between cursor-pointer group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 dark:text-slate-500 text-[10px] font-bold flex items-center justify-center">
                            {comm.rank}
                          </span>
                          <div className={`w-9 h-9 rounded-full ${comm.iconBg} text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}>
                            {renderCardIcon(comm.iconType)}
                          </div>
                        </div>

                        <h4 className="text-[12px] font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] line-clamp-1 leading-snug group-hover:text-emerald-700 dark:text-emerald-400 transition-colors">
                          {comm.name}
                        </h4>
                        <p className="text-[9.5px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-1">{comm.membersCount}</p>
                        <span className="text-[10px] font-bold text-[#10B981] block mb-2">{comm.growth}</span>

                        <p className="text-[10.5px] text-slate-600 dark:text-slate-400 dark:text-slate-500 line-clamp-2 leading-tight mb-2.5">{comm.description}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 block mb-1">Tópicos em alta:</span>
                        <div className="flex flex-wrap gap-1">
                          {comm.topics.map((t) => (
                            <span key={t} className="text-[8.5px] font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 px-1.5 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  title="Avançar"
                  className="hidden xl:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer z-10 transition-transform hover:scale-105"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* Seção: Eventos de empreendedorismo em destaque (5 Cards) */}
            <section id="eventos-empreendedorismo-destaque-section" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                  Eventos de empreendedorismo em destaque
                </h3>
                <button type="button" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {FEATURED_ENTREPRENEURSHIP_EVENTS.map((evt) => (
                    <article
                      key={evt.id}
                      onClick={() => setSelectedEventModal(evt)}
                      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col cursor-pointer group"
                    >
                      <div className="relative h-24 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={evt.image}
                          alt={evt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 bg-[#059669] text-white rounded-md px-2 py-0.5 text-center shadow-xs">
                          <span className="block text-xs font-black leading-none">{evt.day}</span>
                          <span className="block text-[8px] font-bold tracking-wider leading-none mt-0.5">{evt.month}</span>
                        </div>
                      </div>

                      <div className="p-2.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-[11.5px] font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] line-clamp-1 leading-snug group-hover:text-emerald-700 dark:text-emerald-400 transition-colors">
                            {evt.title}
                          </h4>

                          <div className="flex flex-col gap-0.5 mt-1.5 text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500">
                            <span className="flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                              <span className="truncate">{evt.location}</span>
                            </span>
                            <span className="flex items-center gap-1 truncate">
                              <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                              <span className="truncate">{evt.time}</span>
                            </span>
                            <span className="flex items-center gap-1 truncate">
                              <Users className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                              <span className="truncate">{evt.attendees}</span>
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded">{evt.tag}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  title="Avançar"
                  className="hidden xl:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer z-10 transition-transform hover:scale-105"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>
          </div>

          {/* COLUNA DIREITA: Mais populares, Artigos em destaque e Banner CTA (lg:col-span-3) */}
          <aside className="lg:col-span-3 flex flex-col gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">Mais populares em Empreendedorismo</h3>
                <button type="button" className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5">
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
                {POPULAR_ENTREPRENEURSHIP_ITEMS.map((item) => (
                  <div key={item.id} className="py-2 flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 px-1 rounded-lg transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 w-3 shrink-0">{item.rank}</span>
                      <div className={`w-7 h-7 rounded-lg ${item.iconBg} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
                        {renderCardIcon(item.iconType)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 truncate group-hover:text-emerald-700 dark:text-emerald-400 transition-colors">{item.name}</h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500 block truncate">{item.members}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#10B981] shrink-0">{item.growth}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">Artigos e recursos em destaque</h3>
                <button type="button" className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5">
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
                {FEATURED_ARTICLES.map((art) => (
                  <div key={art.id} className="py-2 flex items-center gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 rounded-lg transition-colors cursor-pointer group">
                    <img src={art.image} alt={art.title} className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200 shrink-0" referrerPolicy="no-referrer" />
                    <div className="min-w-0 flex-1 text-[11px] leading-tight">
                      <h4 className="font-bold text-[#0F172A] dark:text-slate-50 group-hover:text-emerald-700 dark:text-emerald-400 transition-colors line-clamp-2">{art.title}</h4>
                      <span className="text-[9.5px] text-slate-400 dark:text-slate-500 block mt-0.5 font-medium">{art.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="cta-empreendedorismo-card"
              className="relative rounded-2xl overflow-hidden p-5 text-white bg-gradient-to-br from-[#022C22] via-[#065F46] to-[#059669] shadow-md flex flex-col justify-between min-h-[170px]"
            >
              <div className="relative z-10 max-w-[210px] flex flex-col gap-1">
                <h3 className="text-sm sm:text-base font-extrabold text-white font-['Outfit'] leading-tight">
                  Faça parte do movimento empreendedor global.
                </h3>
                <p className="text-[10.5px] text-white/85 leading-snug">
                  Crie ou participe de comunidades, partilhe conhecimento e cresça em conjunto.
                </p>
              </div>

              <div className="relative z-10 pt-3">
                <button
                  type="button"
                  onClick={onOpenCreateCommunity}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#059669] text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <span>Criar Comunidade</span>
                  <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
                </button>
              </div>

              <div className="absolute right-4 -bottom-2 pointer-events-none opacity-90">
                <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal de Detalhes da Comunidade Selecionada */}
      {selectedCommunityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-md w-full overflow-hidden relative flex flex-col">
            <button
              type="button"
              onClick={() => setSelectedCommunityModal(null)}
              className="absolute top-3 right-3 text-slate-600 dark:text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${selectedCommunityModal.iconBg} text-white flex items-center justify-center`}>
                  {renderCardIcon(selectedCommunityModal.iconType)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">{selectedCommunityModal.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">
                    {selectedCommunityModal.membersCount} • {selectedCommunityModal.growth}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 dark:text-slate-500 leading-relaxed">{selectedCommunityModal.description}</p>

              <div>
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 block mb-1.5">Tópicos em alta:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCommunityModal.topics.map((t) => (
                    <span key={t} className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    toggleJoinCommunity(selectedCommunityModal.id);
                    setSelectedCommunityModal(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    joinedCommunities.has(selectedCommunityModal.id)
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      : 'bg-[#059669] text-white hover:bg-[#047857] shadow-xs'
                  }`}
                >
                  {joinedCommunities.has(selectedCommunityModal.id) ? 'Membro ativo' : 'Juntar-se à Comunidade'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Evento Selecionado */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-md w-full overflow-hidden relative flex flex-col">
            <button
              type="button"
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/70 w-8 h-8 rounded-full flex items-center justify-center z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-44 w-full">
              <img src={selectedEventModal.image} alt={selectedEventModal.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <span className="absolute bottom-3 left-3 bg-[#059669] text-white text-[11px] font-bold px-3 py-1 rounded-md">
                {selectedEventModal.day} {selectedEventModal.month}
              </span>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">{selectedEventModal.title}</h3>
                <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-2">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    {selectedEventModal.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    {selectedEventModal.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    {selectedEventModal.attendees}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded">{selectedEventModal.tag}</span>
                <button
                  type="button"
                  onClick={() => setSelectedEventModal(null)}
                  className="px-4 py-2 bg-[#059669] text-white text-xs font-bold rounded-xl hover:bg-[#047857]"
                >
                  Confirmar Presença
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityEntrepreneurshipView;
