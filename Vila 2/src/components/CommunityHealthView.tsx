import React, { useEffect, useRef, useState } from 'react';
import {
  Globe,
  HeartPulse,
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
  Rocket,
  Palette,
  MoreHorizontal,
  Check,
  X,
  Filter,
  Brain,
  Heart,
  Activity,
  ShieldCheck,
  HeartHandshake,
  BookOpen,
  Calendar,
  Stethoscope,
  MapPin,
  Clock,
} from 'lucide-react';

export interface CommunityHealthViewProps {
  onNavigateToTab?: (tabId: string) => void;
  onNavigateToCategory?: (category: string) => void;
  onBackToOfficial?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenCreateCommunity?: () => void;
}

// Interfaces
interface TrendingHealthCommunity {
  rank: number;
  id: string;
  name: string;
  membersCount: string;
  growth: string;
  description: string;
  topics: string[];
  iconType: 'mental' | 'nutrition' | 'activity' | 'prevention' | 'women';
  iconBg: string;
}

interface HealthEvent {
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

interface PopularHealthItem {
  rank: number;
  id: string;
  name: string;
  members: string;
  growth: string;
  iconType: TrendingHealthCommunity['iconType'];
  iconBg: string;
}

interface FeaturedHealthArticle {
  id: string;
  title: string;
  type: 'Guia' | 'Artigo';
  image: string;
}

// Dados: 5 Comunidades em Tendência (Saúde)
const TRENDING_HEALTH_COMMUNITIES: TrendingHealthCommunity[] = [
  {
    rank: 1,
    id: 'saude-1',
    name: 'Saúde Mental & Apoio',
    membersCount: '78.4K membros',
    growth: '▲ 24% esta semana',
    description: 'Apoio emocional, prevenção de stress e bem-estar mental.',
    topics: ['Ansiedade', 'Depressão', 'Mindfulness'],
    iconType: 'mental',
    iconBg: 'bg-[#7C3AED]',
  },
  {
    rank: 2,
    id: 'saude-2',
    name: 'Nutrição Consciente',
    membersCount: '65.2K membros',
    growth: '▲ 18% esta semana',
    description: 'Alimentação equilibrada, receitas saudáveis e educação nutricional.',
    topics: ['Alimentação', 'Receitas', 'Suplementos'],
    iconType: 'nutrition',
    iconBg: 'bg-[#E11D48]',
  },
  {
    rank: 3,
    id: 'saude-3',
    name: 'Atividade Física para Todos',
    membersCount: '61.7K membros',
    growth: '▲ 16% esta semana',
    description: 'Movimente-se, supere limites e inspire outras pessoas.',
    topics: ['Treino', 'Corrida', 'Alongamento'],
    iconType: 'activity',
    iconBg: 'bg-[#0D9488]',
  },
  {
    rank: 4,
    id: 'saude-4',
    name: 'Prevenção & Vacinação',
    membersCount: '54.3K membros',
    growth: '▲ 14% esta semana',
    description: 'Informação confiável sobre vacinas, prevenção e saúde pública.',
    topics: ['Vacinas', 'Imunidade', 'Prevenção'],
    iconType: 'prevention',
    iconBg: 'bg-[#D97706]',
  },
  {
    rank: 5,
    id: 'saude-5',
    name: 'Saúde da Mulher',
    membersCount: '48.9K membros',
    growth: '▲ 12% esta semana',
    description: 'Cuidado integral em todas as fases da vida da mulher.',
    topics: ['Gravidez', 'Menopausa', 'Saúde Íntima'],
    iconType: 'women',
    iconBg: 'bg-[#A21CAF]',
  },
];

// Dados: 5 Eventos de Saúde em Destaque
const FEATURED_HEALTH_EVENTS: HealthEvent[] = [
  {
    id: 'event-1',
    day: '25',
    month: 'MAI',
    image: 'https://images.unsplash.com/photo-1591343395902-1adc9a1e46a1?w=600&auto=format&fit=crop&q=80',
    title: 'Webinar: Saúde Mental na Comunidade',
    location: 'Online',
    time: '16:00 (GMT)',
    attendees: '1.2K vão participar',
    tag: 'Webinar',
  },
  {
    id: 'event-2',
    day: '02',
    month: 'JUN',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&auto=format&fit=crop&q=80',
    title: 'Workshop: Nutrição para uma Vida Saudável',
    location: 'São Paulo, Brasil',
    time: '10:00 (GMT-3)',
    attendees: '856 vão participar',
    tag: 'Workshop',
  },
  {
    id: 'event-3',
    day: '08',
    month: 'JUN',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
    title: 'Desafio 30 Dias Mais Ativo',
    location: 'Global',
    time: 'Início às 00:00 (GMT)',
    attendees: '3.1K inscritos',
    tag: 'Desafio',
  },
  {
    id: 'event-4',
    day: '15',
    month: 'JUN',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    title: 'Semana da Vacinação & Prevenção',
    location: 'Evento de 7 dias',
    time: 'Todo o dia',
    attendees: '2.4K vão participar',
    tag: 'Campanha',
  },
  {
    id: 'event-5',
    day: '22',
    month: 'JUN',
    image: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=600&auto=format&fit=crop&q=80',
    title: 'Envelhecimento Ativo e Saudável',
    location: 'Lisboa, Portugal',
    time: '14:00 (GMT)',
    attendees: '642 vão participar',
    tag: 'Palestra',
  },
];

// Dados: Barra Lateral Mais Populares em Saúde (mesmo ranking das tendências)
const POPULAR_HEALTH_ITEMS: PopularHealthItem[] = TRENDING_HEALTH_COMMUNITIES.map((c) => ({
  rank: c.rank,
  id: `pop-${c.id}`,
  name: c.name,
  members: c.membersCount,
  growth: c.growth.replace(' esta semana', ''),
  iconType: c.iconType,
  iconBg: c.iconBg,
}));

// Dados: Barra Lateral Artigos e Recursos em Destaque
const FEATURED_ARTICLES: FeaturedHealthArticle[] = [
  {
    id: 'art-1',
    title: '10 hábitos diários para uma vida mais saudável',
    type: 'Guia',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-2',
    title: 'Como cuidar da saúde mental no dia a dia',
    type: 'Artigo',
    image: 'https://images.unsplash.com/photo-1591343395902-1adc9a1e46a1?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-3',
    title: 'Alimentação que fortalece o corpo e a mente',
    type: 'Artigo',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-4',
    title: 'Vacinas salvam vidas: mitos e verdades',
    type: 'Guia',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-5',
    title: 'Atividade física: comece de onde você está',
    type: 'Guia',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&auto=format&fit=crop&q=80',
  },
];

export const CommunityHealthView: React.FC<CommunityHealthViewProps> = ({
  onNavigateToTab,
  onNavigateToCategory,
  onBackToOfficial,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenMobileMenu,
  onOpenCreateCommunity,
}) => {
  // Filtros
  const trendingHealthCarouselRef = useRef<HTMLDivElement>(null);
  const [isTrendingHealthPaused, setIsTrendingHealthPaused] = useState(false);
  const [communityType, setCommunityType] = useState<string>('Todas');
  const [selectedThemes, setSelectedThemes] = useState<Set<string>>(new Set());
  const [locationFilter, setLocationFilter] = useState<string>('Qualquer lugar');
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [showMoreThemes, setShowMoreThemes] = useState<boolean>(false);

  // Dropdown "Mais"
  const [isMaisDropdownOpen, setIsMaisDropdownOpen] = useState<boolean>(false);

  // Modais
  const [selectedCommunityModal, setSelectedCommunityModal] = useState<TrendingHealthCommunity | null>(null);
  const [selectedEventModal, setSelectedEventModal] = useState<HealthEvent | null>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<Set<string>>(new Set(['saude-1']));

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

  // Helper para ícones dos cards
  const renderCardIcon = (type: TrendingHealthCommunity['iconType']) => {
    switch (type) {
      case 'mental':
        return <Brain className="w-5 h-5" />;
      case 'nutrition':
        return <Heart className="w-5 h-5" />;
      case 'activity':
        return <Activity className="w-5 h-5" />;
      case 'prevention':
        return <ShieldCheck className="w-5 h-5" />;
      case 'women':
        return <HeartHandshake className="w-5 h-5" />;
      default:
        return <HeartPulse className="w-5 h-5" />;
    }
  };

  // Mini carrossel automático: avança suavemente card a card e volta ao início ao chegar ao fim
  useEffect(() => {
    if (isTrendingHealthPaused || TRENDING_HEALTH_COMMUNITIES.length <= 3) return;

    const interval = setInterval(() => {
      const el = trendingHealthCarouselRef.current;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const cardWidth = el.firstElementChild instanceof HTMLElement ? el.firstElementChild.offsetWidth + 12 : clientWidth / 3;

      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [isTrendingHealthPaused]);

  return (
    <div id="community-health-view" className="w-full bg-[#F8FAFC] dark:bg-slate-950 min-h-screen text-[#0F172A] dark:text-slate-50 flex flex-col">
      {/* Conteúdo Principal (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* 2. Cabeçalho de Saúde com Ícone e Métricas */}
        <section id="saude-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#0F766E] text-white flex items-center justify-center shrink-0 shadow-sm border border-teal-900/20">
              <HeartPulse className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.2} />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-slate-50 tracking-tight leading-tight">
                Saúde
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-normal leading-snug">
                Promova bem-estar, compartilhe conhecimento e construa comunidades mais saudáveis.
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-1.5 text-[11.5px] sm:text-xs font-semibold text-[#64748B] dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">1.356</strong> comunidades
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">203.780</strong> membros
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">187</strong> países
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">4.720</strong> recursos
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenCreateCommunity}
            id="btn-criar-comunidade-saude"
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Criar Comunidade</span>
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </section>

        {/* 3. Fita Horizontal de Categorias (com Saúde Selecionada) */}
        <nav
          id="categories-ribbon-saude"
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
                    ? 'bg-[#0F766E] text-white shadow-xs'
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
                {[
                  'Turismo',
                  'Desporto',
                  'Habitação',
                  'Igualdade de Género',
                  'Juventude',
                  'Proteção Social',
                  'Paz e Segurança',
                  'Governança',
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

        {/* 4. Grade Principal de Três Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* COLUNA ESQUERDA: Filtros (lg:col-span-2) */}
          <aside
            id="filtros-saude-sidebar"
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
                className="text-[11.5px] font-semibold text-[#0F766E] hover:underline transition-colors cursor-pointer"
              >
                Limpar
              </button>
            </div>

            {/* Tipo de comunidade (Radio) */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Tipo de comunidade</span>
              <div className="flex flex-col gap-1.5">
                {[
                  'Todas',
                  'Organizações de Saúde',
                  'Profissionais de Saúde',
                  'Pacientes e Cuidadores',
                  'Bem-estar e Estilo de Vida',
                  'Pesquisa e Inovação',
                  'Apoio e Solidariedade',
                  'Saúde Mental',
                ].map((type) => {
                  const isChecked = communityType === type;
                  return (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-[11.5px] text-[#334155] dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        name="health-type"
                        checked={isChecked}
                        onChange={() => setCommunityType(type)}
                        className="sr-only"
                      />
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'border-[#0F766E] bg-[#0F766E]'
                            : 'border-slate-300 bg-white dark:bg-slate-800 hover:border-slate-400'
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

            {/* Temas de Saúde (Checkboxes) */}
            <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Temas de Saúde</span>
              <div className="flex flex-col gap-1.5">
                {[
                  'Saúde Mental',
                  'Nutrição',
                  'Atividade Física',
                  'Doenças Crônicas',
                  'Prevenção & Vacinação',
                  'Saúde da Mulher',
                  'Saúde Infantil',
                  'Envelhecimento Saudável',
                  ...(showMoreThemes
                    ? ['Saúde Digital', 'Telemedicina', 'Saúde Ocupacional', 'Cuidados Paliativos']
                    : []),
                ].map((theme) => {
                  const isChecked = selectedThemes.has(theme);
                  return (
                    <label
                      key={theme}
                      className="flex items-center gap-2 text-[11.5px] text-[#334155] dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleTheme(theme)}
                        className="sr-only"
                      />
                      <span
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'border-[#0F766E] bg-[#0F766E] text-white'
                            : 'border-slate-300 bg-white dark:bg-slate-800 hover:border-slate-400'
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

            {/* Localização (Dropdown) */}
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
                      {locationFilter === loc && <Check className="w-3 h-3 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-bold text-xs shadow-xs transition-all cursor-pointer mt-1"
            >
              Aplicar Filtros
            </button>
          </aside>

          {/* COLUNA CENTRAL: Hero Banner, Comunidades em Tendência e Eventos de Saúde (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* HERO BANNER: "Saúde começa na comunidade." */}
            <section
              id="hero-saude-banner"
              className="relative rounded-2xl overflow-hidden min-h-[220px] flex items-center text-white shadow-sm border border-slate-900/10 bg-[#042F2E] group"
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1400&auto=format&fit=crop&q=85"
                  alt="Pessoas praticando bem-estar em comunidade"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#042F2E]/95 via-[#042F2E]/70 to-[#042F2E]/10" />
              </div>

              <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="max-w-md flex flex-col gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                    Saúde começa <br />
                    na comunidade.
                  </h2>
                  <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                    Conecte-se, compartilhe experiências e acesse informação confiável para viver melhor e ajudar mais pessoas.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (TRENDING_HEALTH_COMMUNITIES.length > 0) {
                          setSelectedCommunityModal(TRENDING_HEALTH_COMMUNITIES[0]);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F766E] text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                    >
                      <span>Juntar-se a uma comunidade</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.4]" />
                    </button>
                  </div>
                </div>

                {/* Painel Branco de Estatísticas (4 linhas) */}
                <div className="w-full sm:w-56 shrink-0 bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-3.5 flex flex-col gap-2.5">
                  {[
                    { icon: BookOpen, value: '4.720', label: 'Recursos de saúde', color: 'text-[#0F766E]' },
                    { icon: Calendar, value: '2.890', label: 'Eventos de saúde', color: 'text-[#DC2626]' },
                    { icon: Stethoscope, value: '1.150', label: 'Profissionais ativos', color: 'text-[#3D4ED8]' },
                    { icon: Globe, value: '187', label: 'Países envolvidos', color: 'text-[#7C3AED]' },
                  ].map((row) => {
                    const Icon = row.icon;
                    return (
                      <div key={row.label} className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${row.color} shrink-0`} strokeWidth={2.2} />
                        <div className="min-w-0">
                          <span className="block text-sm font-black text-[#0F172A] dark:text-slate-50 leading-none">
                            {row.value}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500 leading-tight">{row.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Seção: Comunidades em tendência (Saúde) (5 Cards) */}
            <section id="comunidades-tendencia-saude-section" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                  Comunidades em tendência (Saúde)
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
                <div
                  ref={trendingHealthCarouselRef}
                  onMouseEnter={() => setIsTrendingHealthPaused(true)}
                  onMouseLeave={() => setIsTrendingHealthPaused(false)}
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  className="flex items-stretch gap-3 overflow-x-auto pb-1 scroll-smooth no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-proximity"
                >
                  {TRENDING_HEALTH_COMMUNITIES.map((comm) => (
                    <article
                      key={comm.id}
                      onClick={() => setSelectedCommunityModal(comm)}
                      className="w-[calc(33.333%-8px)] min-w-[220px] shrink-0 snap-start bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700 p-3 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between cursor-pointer group"
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

                        <h4 className="text-[12px] font-bold text-[#0F172A] dark:text-slate-50 line-clamp-1 leading-snug group-hover:text-teal-700 transition-colors">
                          {comm.name}
                        </h4>
                        <p className="text-[9.5px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-1">{comm.membersCount}</p>
                        <span className="text-[10px] font-bold text-[#10B981] block mb-2">
                          {comm.growth}
                        </span>

                        <p className="text-[10.5px] text-slate-600 dark:text-slate-400 dark:text-slate-500 line-clamp-2 leading-tight mb-2.5">
                          {comm.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 block mb-1">
                          Tópicos em alta:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {comm.topics.map((t) => (
                            <span
                              key={t}
                              className="text-[8.5px] font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 px-1.5 py-0.5 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Seção: Eventos de saúde em destaque (5 Cards) */}
            <section id="eventos-saude-destaque-section" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                  Eventos de saúde em destaque
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {FEATURED_HEALTH_EVENTS.map((evt) => (
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
                        <div className="absolute top-2 left-2 bg-[#0F766E] text-white rounded-md px-2 py-0.5 text-center shadow-xs">
                          <span className="block text-xs font-black leading-none">{evt.day}</span>
                          <span className="block text-[8px] font-bold tracking-wider leading-none mt-0.5">{evt.month}</span>
                        </div>
                      </div>

                      <div className="p-2.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-[11.5px] font-bold text-[#0F172A] dark:text-slate-50 line-clamp-1 leading-snug group-hover:text-teal-700 transition-colors">
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
                          <span className="text-[9px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                            {evt.tag}
                          </span>
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
            {/* 1. Card: Mais populares em Saúde */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50">
                  Mais populares em Saúde
                </h3>
                <button
                  type="button"
                  className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
                {POPULAR_HEALTH_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="py-2 flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 px-1 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 w-3 shrink-0">
                        {item.rank}
                      </span>
                      <div className={`w-7 h-7 rounded-lg ${item.iconBg} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
                        {renderCardIcon(item.iconType)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 truncate group-hover:text-teal-700 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500 block truncate">
                          {item.members}
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

            {/* 2. Card: Artigos e recursos em destaque */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50">
                  Artigos e recursos em destaque
                </h3>
                <button
                  type="button"
                  className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
                {FEATURED_ARTICLES.map((art) => (
                  <div key={art.id} className="py-2 flex items-center gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 rounded-lg transition-colors cursor-pointer group">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1 text-[11px] leading-tight">
                      <h4 className="font-bold text-[#0F172A] dark:text-slate-50 group-hover:text-teal-700 transition-colors line-clamp-2">
                        {art.title}
                      </h4>
                      <span className="text-[9.5px] text-slate-400 dark:text-slate-500 block mt-0.5 font-medium">
                        {art.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Card CTA em Verde: "Compartilhe saúde. Inspire bem-estar." */}
            <div
              id="cta-saude-card"
              className="relative rounded-2xl overflow-hidden p-5 text-white bg-gradient-to-br from-[#042F2E] via-[#0F766E] to-[#0D9488] shadow-md flex flex-col justify-between min-h-[170px]"
            >
              <div className="relative z-10 max-w-[210px] flex flex-col gap-1">
                <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                  Compartilhe saúde. <br />
                  Inspire bem-estar.
                </h3>
                <p className="text-[10.5px] text-white/85 leading-snug">
                  Crie ou participe de comunidades que promovem saúde, previnem doenças e melhoram vidas.
                </p>
              </div>

              <div className="relative z-10 pt-3">
                <button
                  type="button"
                  onClick={onOpenCreateCommunity}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#0F766E] text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <span>Criar Comunidade</span>
                  <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
                </button>
              </div>

              {/* Ícone decorativo de coração no canto */}
              <div className="absolute right-4 -bottom-2 pointer-events-none opacity-95">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-[#DC2626]" fill="#DC2626" />
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
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
                    {selectedCommunityModal.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">
                    {selectedCommunityModal.membersCount} • {selectedCommunityModal.growth}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 dark:text-slate-500 leading-relaxed">
                {selectedCommunityModal.description}
              </p>

              <div>
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 block mb-1.5">
                  Tópicos em alta:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCommunityModal.topics.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md"
                    >
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
                      : 'bg-[#0F766E] text-white hover:bg-[#0D9488] shadow-xs'
                  }`}
                >
                  {joinedCommunities.has(selectedCommunityModal.id)
                    ? 'Membro ativo'
                    : 'Juntar-se à Comunidade'}
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
              <img
                src={selectedEventModal.image}
                alt={selectedEventModal.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-3 bg-[#0F766E] text-white text-[11px] font-bold px-3 py-1 rounded-md">
                {selectedEventModal.day} {selectedEventModal.month}
              </span>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50">
                  {selectedEventModal.title}
                </h3>
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
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {selectedEventModal.tag}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedEventModal(null)}
                  className="px-4 py-2 bg-[#0F766E] text-white text-xs font-bold rounded-xl hover:bg-[#0D9488]"
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

export default CommunityHealthView;
