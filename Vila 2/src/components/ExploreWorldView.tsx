import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Globe,
  Map,
  LayoutGrid,
  Trees,
  Palette,
  Cpu,
  Briefcase,
  Recycle,
  GraduationCap,
  Compass,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowRight,
  FolderKanban,
  Handshake,
  HeartHandshake,
  Heart,
  History,
  Leaf,
  Sprout,
  Star,
  Clock,
  Filter,
  X,
  TrendingUp,
  Sparkles,
  Activity,
  BarChart3,
  Download,
  Menu,
  MoreHorizontal
} from 'lucide-react';
import { CountryData } from '../types';
import { COUNTRIES_DATA } from '../data/countriesData';
import { WorldMap } from './WorldMap';

interface DiscoverItem {
  id: string;
  name: string;
  flag: string;
  category: string;
  categoryColor: string;
  metric: string;
  imageUrl: string;
}

const DISCOVER_WORLD_ITEMS: DiscoverItem[] = [
  {
    id: 'colombia',
    name: 'Colômbia',
    flag: '🇨🇴',
    category: 'Cultura',
    categoryColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
    metric: '320 projetos em curso',
    imageUrl: 'https://images.unsplash.com/photo-1599827552599-eadf5fb3c75f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'japao',
    name: 'Japão',
    flag: '🇯🇵',
    category: 'Negócios',
    categoryColor: 'bg-blue-50 text-[#1455AC] border-blue-200/80',
    metric: '85 eventos esta semana',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'islandia',
    name: 'Islândia',
    flag: '🇮🇸',
    category: 'Natureza',
    categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    metric: '120 iniciativas ativas',
    imageUrl: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=400&q=80',
  },
];

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ElementType;
}

const PRIMARY_CATEGORIES: CategoryItem[] = [
  { id: 'all', name: 'Todos', icon: Globe },
  { id: 'natureza', name: 'Natureza', icon: Trees },
  { id: 'cultura', name: 'Cultura', icon: Palette },
  { id: 'tecnologia', name: 'Tecnologia', icon: Cpu },
  { id: 'negocios', name: 'Negócios', icon: Briefcase },
  { id: 'sustentabilidade', name: 'Sustentabilidade', icon: Recycle },
  { id: 'educacao', name: 'Educação', icon: GraduationCap },
  { id: 'mais', name: 'Mais', icon: MoreHorizontal },
];

// Helper to format numbers with dots as thousand separator consistently
const formatWithDot = (value: number | string): string => {
  const num = typeof value === 'string' ? parseInt(value.replace(/\D/g, ''), 10) : value;
  if (isNaN(num)) return String(value);
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Mapping of country IDs to thematic categories
const COUNTRY_CATEGORIES_MAP: Record<string, string[]> = {
  portugal: ['cultura', 'tecnologia', 'negocios', 'turismo', 'comunidade'],
  espanha: ['cultura', 'turismo', 'sustentabilidade', 'negocios'],
  franca: ['cultura', 'educacao', 'negocios', 'tecnologia'],
  brasil: ['natureza', 'sustentabilidade', 'cultura', 'comunidade'],
  quenia: ['natureza', 'sustentabilidade', 'educacao', 'comunidade'],
  angola: ['cultura', 'comunidade', 'negocios', 'natureza'],
  japao: ['tecnologia', 'educacao', 'cultura', 'negocios'],
  alemanha: ['tecnologia', 'sustentabilidade', 'negocios', 'educacao'],
  eua: ['tecnologia', 'negocios', 'educacao'],
  cabo_verde: ['cultura', 'turismo', 'natureza', 'comunidade'],
  mocambique: ['natureza', 'comunidade', 'sustentabilidade', 'cultura'],
  india: ['tecnologia', 'cultura', 'comunidade', 'educacao'],
  italia: ['cultura', 'turismo', 'negocios'],
  costa_rica: ['natureza', 'sustentabilidade', 'turismo'],
  canada: ['natureza', 'tecnologia', 'educacao', 'sustentabilidade'],
  australia: ['natureza', 'sustentabilidade', 'tecnologia', 'turismo'],
  noruega: ['sustentabilidade', 'natureza', 'tecnologia', 'educacao'],
  singapura: ['tecnologia', 'negocios', 'sustentabilidade', 'educacao'],
  chile: ['natureza', 'sustentabilidade', 'turismo'],
  colombia: ['cultura', 'natureza', 'comunidade'],
  islandia: ['natureza', 'sustentabilidade', 'comunidade'],
  mexico: ['cultura', 'turismo', 'comunidade', 'negocios'],
  coreia_sul: ['tecnologia', 'cultura', 'educacao', 'negocios'],
  emirados_arabes: ['negocios', 'tecnologia', 'turismo'],
  argentina: ['cultura', 'natureza', 'negocios'],
  peru: ['cultura', 'natureza', 'turismo'],
};

interface ExploreWorldViewProps {
  selectedCountry: CountryData;
  onSelectCountry: (country: CountryData) => void;
  onExploreCountry: (country: CountryData) => void;
  onBackToHome: () => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
}

export const ExploreWorldView: React.FC<ExploreWorldViewProps> = ({
  selectedCountry,
  onSelectCountry,
  onExploreCountry,
  onBackToHome,
  onOpenAiAssistant,
  onOpenMobileMenu,
}) => {
  // Toggle view mode: 'map' or 'grid'
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('map');

  // Search query state
  const [searchQuery, setSearchQuery] = useState('');

  // Category selection
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Region filter (for the "Ver por regiões" dropdown)
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  // Sort order state
  const [sortOrder, setSortOrder] = useState<'name-asc' | 'name-desc' | 'projects-desc' | 'communities-desc' | 'status'>('name-asc');

  // Favorites & History states
  const [favoriteCountryIds, setFavoriteCountryIds] = useState<string[]>(['portugal', 'brasil', 'quenia']);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [historyList, setHistoryList] = useState<CountryData[]>([
    COUNTRIES_DATA[0], // Portugal
    COUNTRIES_DATA[3], // Brasil
    COUNTRIES_DATA[1], // Espanha
  ]);

  // Carousel ref for horizontal scrolling
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Handle selecting country
  const handleCountryClick = (country: CountryData) => {
    onSelectCountry(country);
    setHistoryList((prev) => {
      const filtered = prev.filter((c) => c.id !== country.id);
      return [country, ...filtered].slice(0, 5);
    });
  };

  // Region change handler
  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    if (region !== 'all') {
      const countryInRegion = COUNTRIES_DATA.find((c) => c.region === region);
      if (countryInRegion) {
        handleCountryClick(countryInRegion);
      }
    }
  };

  // Filtered and Sorted Countries
  const filteredAndSortedCountries = useMemo(() => {
    // 1. Filter
    const filtered = COUNTRIES_DATA.filter((country) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = country.name.toLowerCase().includes(query);
        const matchesRegion = country.region?.toLowerCase().includes(query);
        const matchesCapital = country.capital?.toLowerCase().includes(query);
        if (!matchesName && !matchesRegion && !matchesCapital) {
          return false;
        }
      }

      // Region filter
      if (selectedRegion !== 'all') {
        if (country.region !== selectedRegion) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all') {
        const categories = COUNTRY_CATEGORIES_MAP[country.id] || ['cultura', 'comunidade'];
        if (!categories.includes(selectedCategory)) {
          return false;
        }
      }

      // Favorites filter
      if (showOnlyFavorites && !favoriteCountryIds.includes(country.id)) {
        return false;
      }

      return true;
    });

    // 2. Sort
    return filtered.sort((a, b) => {
      if (sortOrder === 'name-asc') {
        return a.name.localeCompare(b.name, 'pt-PT');
      }
      if (sortOrder === 'name-desc') {
        return b.name.localeCompare(a.name, 'pt-PT');
      }
      if (sortOrder === 'projects-desc') {
        return b.projectsCount - a.projectsCount;
      }
      if (sortOrder === 'communities-desc') {
        return b.communitiesCount - a.communitiesCount;
      }
      if (sortOrder === 'status') {
        const priority: Record<string, number> = { active: 1, 'with-activity': 2, inactive: 3 };
        return (priority[a.status] || 4) - (priority[b.status] || 4);
      }
      return 0;
    });
  }, [searchQuery, selectedRegion, selectedCategory, showOnlyFavorites, favoriteCountryIds, sortOrder]);

  // Total de países ativos exibidos na plataforma e no mapa
  const TOTAL_ACTIVE_COUNTRIES_COUNT = '128';

  // 5 Quick Stats items for horizontal row
  const QUICK_STATS = [
    {
      id: 'stat-paises',
      label: 'Países Ativos',
      value: TOTAL_ACTIVE_COUNTRIES_COUNT,
      icon: Globe,
      iconBg: 'bg-[#1455AC]/10 dark:bg-[#1455AC]/20',
      iconColor: 'text-[#1455AC]',
      onClick: () => {
        setViewMode('grid');
        setSortOrder('name-asc');
      },
    },
    {
      id: 'stat-projetos',
      label: 'Projetos Ativos',
      value: '24.651',
      icon: Sprout,
      iconBg: 'bg-emerald-50/90 dark:bg-emerald-500/10',
      iconColor: 'text-emerald-600',
      onClick: () => {
        setViewMode('grid');
        setSortOrder('projects-desc');
      },
    },
    {
      id: 'stat-cidadaos',
      label: 'Cidadãos Ativos',
      value: '7.842.521',
      icon: Users,
      iconBg: 'bg-blue-50/90 dark:bg-blue-500/10',
      iconColor: 'text-blue-600',
      onClick: () => {
        setViewMode('grid');
        setSortOrder('communities-desc');
      },
    },
    {
      id: 'stat-parceiros',
      label: 'Parceiros Globais',
      value: '3.412',
      icon: HeartHandshake,
      iconBg: 'bg-amber-50/90 dark:bg-amber-500/10',
      iconColor: 'text-amber-600',
      onClick: () => {
        setViewMode('grid');
      },
    },
    {
      id: 'stat-acoes',
      label: 'Ações Sustentáveis',
      value: '2,4M',
      icon: Leaf,
      iconBg: 'bg-teal-50/90 dark:bg-teal-500/10',
      iconColor: 'text-teal-600',
      onClick: () => {
        setSelectedCategory('sustentabilidade');
      },
    },
  ];

  // Ativação do atalho Cmd+K / Ctrl+K para focar a barra de pesquisa superior
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('top-main-search') as HTMLInputElement | null;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* ========================================================================= */}
      {/* 1. HEADER SUPERIOR CONFORME A REFERÊNCIA VISUAL                           */}
      {/* [Título + Subtítulo] [Busca com ⌘K] [Favoritos] [Histórico] [Filtros]     */}
      {/* e à direita [Card VILA AI] alinhado acima da coluna lateral               */}
      {/* ========================================================================= */}
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2">
        {/* Lado Esquerdo: Título e Subtítulo (+ trigger mobile quando em ecrãs menores) */}
        <div className="shrink-0 flex items-start gap-3">
          {onOpenMobileMenu && (
            <button
              type="button"
              onClick={onOpenMobileMenu}
              id="explore-mobile-menu-trigger"
              className="lg:hidden p-2 mt-0.5 rounded-xl text-slate-700 bg-white border border-slate-200/80 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer shrink-0 dark:text-slate-300 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800"
              aria-label="Abrir menu lateral"
            >
              <Menu className="w-5 h-5 text-slate-900 dark:text-slate-50" />
            </button>
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans tracking-tight dark:text-slate-50">
              Explorar o Mundo
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-1 font-normal leading-relaxed dark:text-slate-400">
              Descubra países, culturas, iniciativas e oportunidades<br className="hidden sm:inline" />
              {' '}em qualquer lugar do planeta.
            </p>
          </div>
        </div>

        {/* Centro: Barra de Busca com atalho ⌘K + Botões de Ação */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap flex-1 max-w-2xl justify-start xl:justify-center">
          {/* Barra de Pesquisa */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none dark:text-slate-500" />
            <input
              type="text"
              id="top-main-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar países, regiões, projetos, comunidades..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-12 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1455AC]/20 focus:border-[#1455AC] shadow-2xs font-medium transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50 dark:placeholder:text-slate-500"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer dark:text-slate-500 dark:hover:text-slate-300"
                  title="Limpar busca"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 font-mono bg-slate-50 border border-slate-200/80 rounded shadow-2xs select-none dark:text-slate-500 dark:bg-slate-800 dark:border-slate-700">
                  ⌘K
                </kbd>
              )}
            </div>
          </div>

          {/* Ações Rápidas: Favoritos, Histórico, Filtros */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Favoritos */}
            <button
              type="button"
              id="btn-header-favoritos"
              onClick={() => setShowOnlyFavorites((prev) => !prev)}
              className={`flex flex-col items-center justify-center gap-1 p-1 px-2 rounded-xl transition-all cursor-pointer group ${
                showOnlyFavorites ? 'text-rose-600 bg-rose-50 dark:bg-rose-500/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 dark:text-slate-400 dark:hover:text-slate-50 dark:hover:bg-slate-800'
              }`}
              title="Favoritos"
            >
              <Heart className={`w-4 h-4 transition-transform group-hover:scale-110 ${showOnlyFavorites ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="text-[10px] font-medium leading-none">Favoritos</span>
            </button>

            {/* Histórico */}
            <button
              type="button"
              id="btn-header-historico"
              onClick={() => {
                setSelectedRegion('all');
                setSelectedCategory('todas');
                setSearchQuery('');
                setShowOnlyFavorites(false);
              }}
              className="flex flex-col items-center justify-center gap-1 p-1 px-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-all cursor-pointer group dark:text-slate-400 dark:hover:text-slate-50 dark:hover:bg-slate-800"
              title="Histórico"
            >
              <History className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="text-[10px] font-medium leading-none">Histórico</span>
            </button>

            {/* Filtros */}
            <button
              type="button"
              id="btn-header-filtros"
              onClick={() => {
                const filterElem = document.getElementById('secao-filtros-categorias');
                if (filterElem) {
                  filterElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
              }}
              className={`flex flex-col items-center justify-center gap-1 p-1 px-2 rounded-xl transition-all cursor-pointer group ${
                selectedCategory !== 'todas' || selectedRegion !== 'all'
                  ? 'text-[#1455AC] bg-[#1455AC]/10 dark:bg-[#1455AC]/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 dark:text-slate-400 dark:hover:text-slate-50 dark:hover:bg-slate-800'
              }`}
              title="Filtros"
            >
              <Filter className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="text-[10px] font-medium leading-none">Filtros</span>
            </button>
          </div>
        </div>

        {/* Lado Direito: Card VILA AI (alinhado sobre a coluna lateral) */}
        <div
          id="header-vila-ai-card"
          onClick={onOpenAiAssistant}
          className="w-full sm:w-auto xl:w-[340px] shrink-0 bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:border-[#1455AC]/40 hover:shadow-xs transition-all p-3 px-3.5 flex items-center justify-between gap-3 cursor-pointer group select-none dark:bg-slate-900 dark:border-slate-700"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#1455AC]/10 dark:bg-[#1455AC]/20 text-[#1455AC] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
              <Sparkles className="w-5 h-5 text-[#1455AC]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 font-sans group-hover:text-[#1455AC] transition-colors leading-tight dark:text-slate-50">
                VILA AI
              </p>
              <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5 dark:text-slate-400">
                Pergunte-me sobre<br />qualquer lugar do mundo
              </p>
            </div>
          </div>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[#1455AC] group-hover:translate-x-1 transition-transform shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. LAYOUT PRINCIPAL EM 2 COLUNAS: ÁREA CENTRAL/MAPA + SIDEBAR DIREITA     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">

        {/* ========================================================= */}
        {/* COLUNA ESQUERDA / PRINCIPAL: STATS, MAPA, FILTROS E CARROSSEL */}
        {/* ========================================================= */}
        <main className="w-full flex flex-col gap-5 min-w-0">

          {/* --------------------------------------------------------- */}
          {/* A. ESTATÍSTICAS RÁPIDAS: FAIXA COM 5 CARDS LADO A LADO    */}
          {/* Alinhada horizontalmente com o card de Portugal à direita  */}
          {/* --------------------------------------------------------- */}
          <section className="w-full" id="faixa-estatisticas-rapidas">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 w-full">
              {QUICK_STATS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className="bg-white rounded-xl border border-slate-200/60 p-3 sm:p-3.5 xl:p-3 2xl:p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-slate-300/70 transition-all duration-200 flex flex-col justify-between group min-w-0 dark:bg-slate-900 dark:border-slate-700 dark:hover:border-slate-600"
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-4 h-4" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0 flex-1 overflow-visible">
                        <p className="text-base sm:text-lg xl:text-[17px] 2xl:text-[19px] font-extrabold text-slate-900 tracking-tight font-sans leading-tight whitespace-nowrap dark:text-slate-50">
                          {item.value}
                        </p>
                        <p
                          className="text-[11.5px] xl:text-[10.5px] 2xl:text-[11.5px] font-medium text-slate-500 mt-0.5 leading-snug whitespace-normal break-words dark:text-slate-400"
                        >
                          {item.label}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-100/90 dark:border-slate-800 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={item.onClick}
                        className="text-[11px] font-semibold text-[#1455AC] hover:text-[#0F448A] inline-flex items-center gap-1 transition-colors cursor-pointer group-hover:underline"
                      >
                        <span>Ver todos</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* --------------------------------------------------------- */}
          {/* A. CONTAINER DO MAPA (OU GRADE GERAL CONFORME O TOGGLE)   */}
          {/* Layout imersivo fiel ao design fornecido:                 */}
          {/* - Sem borda/moldura branca externa, o mapa é o próprio card*/}
          {/* - Dropdown "Ver por regiões" no canto superior esquerdo   */}
          {/* - Controles de zoom e botão "Mapa Interativo" à esquerda   */}
          {/* - Legenda flutuante centralizada na parte inferior        */}
          {/* --------------------------------------------------------- */}
          {viewMode === 'map' ? (
            <div className="relative w-full rounded-2xl bg-[#F8FAFD] border border-slate-200/80 shadow-xs overflow-hidden dark:bg-slate-950 dark:border-slate-700">
              <WorldMap
                selectedCountry={selectedCountry}
                onSelectCountry={handleCountryClick}
                onExploreCountry={onExploreCountry}
                className="h-[500px] sm:h-[540px] lg:h-[560px]"
                showLegend={false}
                controlsPosition="top-right"
              />

              {/* 1. BOTÃO FLUTUANTE "VER POR REGIÕES" (Canto Superior Esquerdo) */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-30">
                <div className="relative inline-flex items-center">
                  <select
                    id="select-region-dropdown"
                    value={selectedRegion}
                    onChange={(e) => handleRegionChange(e.target.value)}
                    className="appearance-none text-xs sm:text-[12.5px] font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl pl-4 pr-9 py-2.5 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1455AC]/40 shadow-xs border-0 cursor-pointer transition-all font-sans select-none"
                  >
                    <option value="all" className="bg-slate-900 text-white">Ver por regiões</option>
                    <option value="Europa" className="bg-slate-900 text-white">Europa</option>
                    <option value="América do Sul" className="bg-slate-900 text-white">América do Sul</option>
                    <option value="África" className="bg-slate-900 text-white">África</option>
                    <option value="Ásia" className="bg-slate-900 text-white">Ásia</option>
                    <option value="América do Norte" className="bg-slate-900 text-white">América do Norte</option>
                    <option value="Oceania" className="bg-slate-900 text-white">Oceania</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-white absolute right-3 pointer-events-none stroke-[2.5]" />
                </div>
              </div>

              {/* 2. BOTÃO FLUTUANTE "MAPA INTERATIVO" (Canto Inferior Esquerdo, abaixo do zoom) */}
              <div
                id="floating-interactive-map-pill"
                className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-25 inline-flex items-center select-none"
              >
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-[12.5px] font-bold bg-white text-slate-900 shadow-xs border border-slate-200/80 dark:bg-slate-900 dark:text-slate-50 dark:border-slate-700">
                  <Map className="w-4 h-4 text-[#1455AC] stroke-[2.2]" />
                  <span>Mapa Interativo</span>
                </div>
              </div>

              {/* 3. LEGENDA FLUTUANTE DO MAPA (Centralizada na Parte Inferior) */}
              <div
                id="world-map-floating-legend"
                className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-25 bg-white rounded-full px-5 sm:px-6 py-2 sm:py-2.5 shadow-sm border border-slate-200/80 flex items-center gap-5 sm:gap-6 select-none dark:bg-slate-900 dark:border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
                  <span className="text-slate-900 font-semibold text-xs sm:text-[12.5px] whitespace-nowrap font-sans dark:text-slate-50">
                    País Ativo
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1455AC] shrink-0 shadow-[0_0_6px_rgba(20,85,172,0.4)]" />
                  <span className="text-slate-900 font-semibold text-xs sm:text-[12.5px] whitespace-nowrap font-sans dark:text-slate-50">
                    País com Atividade
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
                  <span className="text-slate-900 font-semibold text-xs sm:text-[12.5px] whitespace-nowrap font-sans dark:text-slate-50">
                    País Inativo
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Visualização em Grade quando o usuário clica no toggle Grade */
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col gap-4 dark:bg-slate-900 dark:border-slate-700">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#1455AC]/10 dark:bg-[#1455AC]/20 text-[#1455AC] flex items-center justify-center">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 font-sans dark:text-slate-50">
                      Grade Geral de Territórios
                    </h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Exibindo {filteredAndSortedCountries.length} países cadastrados na VILA.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setViewMode('map')}
                  className="text-xs font-bold text-[#1455AC] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Voltar ao Mapa</span>
                </button>
              </div>

              {/* Grid de Cards Médios */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredAndSortedCountries.map((country) => (
                  <div
                    key={`grid-card-${country.id}`}
                    onClick={() => handleCountryClick(country)}
                    className="bg-white rounded-2xl border border-slate-200/90 p-3.5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between group dark:bg-slate-900 dark:border-slate-700"
                  >
                    <div>
                      <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-100 mb-3 dark:bg-slate-800">
                        <img
                          src={country.imageUrl}
                          alt={country.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-2 right-2">
                          <span
                            className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-wider ${
                              country.status === 'active'
                                ? 'bg-[#16A34A] text-white'
                                : country.status === 'with-activity'
                                ? 'bg-[#1455AC] text-white'
                                : 'bg-slate-600 text-white'
                            }`}
                          >
                            {country.status === 'active'
                              ? 'ATIVO'
                              : country.status === 'with-activity'
                              ? 'COM ATIVIDADE'
                              : 'INATIVO'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{country.flag}</span>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1455AC] transition-colors truncate font-sans dark:text-slate-50">
                          {country.name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3 dark:text-slate-400">
                        {country.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block dark:text-slate-500">Projetos:</span>
                        <span className="font-extrabold text-slate-900 dark:text-slate-50">
                          {country.projectsCount.toLocaleString('pt-PT')}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onExploreCountry(country);
                        }}
                        className="text-xs font-bold text-[#1455AC] inline-flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span>Explorar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --------------------------------------------------------- */}
          {/* B. PAINEL DE FILTROS: PILLS HORIZONTAIS NUMA ÚNICA LINHA  */}
          {/* Posicionados ABAIXO do mapa (não numa sidebar à esquerda) */}
          {/* --------------------------------------------------------- */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {PRIMARY_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  id={`category-pill-${category.id}`}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-bold dark:bg-slate-700 dark:border-slate-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:border-slate-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* --------------------------------------------------------- */}
          {/* C. SEÇÃO "TODOS OS PAÍSES (128)" COM CARROSSEL HORIZONTAL */}
          {/* Busca + Dropdown Ordenar alinhados na mesma linha do título */}
          {/* --------------------------------------------------------- */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col gap-3.5 dark:bg-slate-900 dark:border-slate-700">

            {/* Cabeçalho da seção com Título, Busca, Ordenar e Seta Próximo */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 font-sans dark:text-slate-50">
                  Todos os Países (128)
                </h3>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
                {/* Busca "Pesquisar país..." */}
                <div className="relative flex items-center min-w-[160px] sm:min-w-[190px]">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none dark:text-slate-500" />
                  <input
                    type="text"
                    id="input-search-countries-carousel"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar país..."
                    className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1455AC]/20 focus:border-[#1455AC] font-medium transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50 dark:placeholder:text-slate-500"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer dark:text-slate-500 dark:hover:text-slate-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Dropdown "Ordenar: A-Z" */}
                <div className="relative inline-flex items-center">
                  <select
                    id="select-sort-order-carousel"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl pl-2.5 pr-7 py-1.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1455AC]/20 cursor-pointer appearance-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50"
                  >
                    <option value="name-asc">Ordenar: A-Z</option>
                    <option value="name-desc">Ordenar: Z-A</option>
                    <option value="projects-desc">Mais Projetos</option>
                    <option value="communities-desc">Mais Comunidades</option>
                    <option value="status">Status Operacional</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none dark:text-slate-500" />
                </div>

                {/* Botão Único Próximo (›) com scroll suave */}
                <button
                  type="button"
                  id="btn-carousel-next"
                  onClick={() => {
                    if (carouselRef.current) {
                      const scrollAmount = 300;
                      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
                      if (carouselRef.current.scrollLeft >= maxScroll - 20) {
                        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                      } else {
                        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                      }
                    }
                  }}
                  className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-[#1455AC] transition-colors cursor-pointer shrink-0 shadow-2xs dark:border-slate-700 dark:hover:bg-slate-800 dark:text-slate-400"
                  title="Próximos países"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carrossel Horizontal de Cards de Países */}
            {filteredAndSortedCountries.length === 0 ? (
              <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-6 text-center text-slate-500 dark:bg-slate-800/60 dark:border-slate-700 dark:text-slate-400">
                <p className="text-xs">Nenhum país encontrado com os filtros selecionados.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedRegion('all');
                    setShowOnlyFavorites(false);
                    setSortOrder('name-asc');
                  }}
                  className="mt-2 text-xs font-bold text-[#1455AC] hover:underline cursor-pointer"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div
                ref={carouselRef}
                className="flex items-stretch gap-4 overflow-x-auto pb-2 pt-1 scroll-smooth no-scrollbar"
              >
                {filteredAndSortedCountries.map((country) => {
                  const isSelected = selectedCountry.id === country.id;
                  return (
                    <div
                      key={`carousel-${country.id}`}
                      id={`country-carousel-card-${country.id}`}
                      onClick={() => handleCountryClick(country)}
                      className={`w-[230px] shrink-0 bg-white rounded-xl p-3 border transition-all duration-200 flex flex-col justify-between cursor-pointer group hover:shadow-md hover:-translate-y-0.5 select-none dark:bg-slate-900 ${
                        isSelected
                          ? 'border-[#1455AC] ring-2 ring-[#1455AC]/15 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
                      }`}
                    >
                      <div>
                        {/* Imagem + Badge de Status */}
                        <div className="relative h-28 w-full rounded-lg overflow-hidden bg-slate-100 mb-2.5 shadow-2xs dark:bg-slate-800">
                          <img
                            src={country.imageUrl}
                            alt={country.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-2 right-2">
                            <span
                              className={`px-2 py-0.5 text-[8.5px] font-black rounded-md uppercase tracking-wider shadow-xs ${
                                country.status === 'active'
                                  ? 'bg-[#16A34A] text-white'
                                  : country.status === 'with-activity'
                                  ? 'bg-[#1455AC] text-white'
                                  : 'bg-slate-600 text-white'
                              }`}
                            >
                              {country.status === 'active'
                                ? 'ATIVO'
                                : country.status === 'with-activity'
                                ? 'COM ATIVIDADE'
                                : 'INATIVO'}
                            </span>
                          </div>
                        </div>

                        {/* Bandeira e Nome */}
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="text-xl shrink-0">{country.flag}</span>
                          <h4 className="text-sm font-bold text-slate-900 font-sans truncate group-hover:text-[#1455AC] transition-colors dark:text-slate-50">
                            {country.name}
                          </h4>
                        </div>

                        {/* Projetos e Comunidades */}
                        <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-slate-50/80 rounded-lg p-2 border border-slate-100 mb-2 dark:bg-slate-800/60 dark:border-slate-700">
                          <div>
                            <p className="text-[9.5px] font-semibold text-slate-400 dark:text-slate-500">Projetos</p>
                            <p className="font-extrabold text-slate-900 truncate dark:text-slate-50">
                              {country.projectsCount.toLocaleString('pt-PT')}
                            </p>
                          </div>
                          <div>
                            <p className="text-[9.5px] font-semibold text-slate-400 dark:text-slate-500">Comunidades</p>
                            <p className="font-extrabold text-slate-900 truncate dark:text-slate-50">
                              {(country.communitiesCount || 0).toLocaleString('pt-PT')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Link Explorar → */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-medium truncate dark:text-slate-500">
                          {country.region}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onExploreCountry(country);
                          }}
                          className="text-xs font-bold text-[#1455AC] group-hover:text-[#0F448A] inline-flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <span>Explorar</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

        </main>

        {/* ========================================================= */}
        {/* COLUNA DIREITA: CARD PORTUGAL, ATIVIDADE GLOBAL, DESCUBRA */}
        {/* O MUNDO E WIDGET VILA AI                                  */}
        {/* ========================================================= */}
        <aside className="w-full flex flex-col gap-4">

          {/* 1. Card de Destaque do País Selecionado (ex: Portugal) */}
          {(() => {
            const featuredCountry = selectedCountry || COUNTRIES_DATA[0];
            const isPortugal = featuredCountry.id === 'portugal';
            const shortDesc = isPortugal
              ? 'Portugal é o primeiro país ativo da VILA. Iniciativas, comunidades e projetos que estão a transformar o país.'
              : (featuredCountry.description || 'Território participante na rede comunitária global VILA.');

            return (
              <div
                id="card-destaque-pais"
                className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all group/feat dark:bg-slate-900 dark:border-slate-700 dark:hover:border-slate-600"
              >
                <div>
                  {/* Linha Superior: Bandeira + Nome + Badge "PAÍS ATIVO" numa linha, ACIMA da imagem */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-2xl shrink-0 leading-none">{featuredCountry.flag}</span>
                      <h4 className="text-base font-extrabold text-slate-900 font-sans truncate dark:text-slate-50">
                        {featuredCountry.name}
                      </h4>
                    </div>
                    <span className="shrink-0 bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {featuredCountry.status === 'active' ? 'PAÍS ATIVO' : (featuredCountry.statusLabel || 'PAÍS ATIVO')}
                    </span>
                  </div>

                  {/* Imagem de Capa Abaixo (tamanho moderado, cantos arredondados, sem texto sobreposto) */}
                  <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 bg-slate-100 shadow-2xs dark:bg-slate-800">
                    <img
                      src={featuredCountry.imageUrl}
                      alt={featuredCountry.name}
                      className="w-full h-full object-cover group-hover/feat:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Texto Descritivo Curto Abaixo da Imagem */}
                  <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-3 font-medium dark:text-slate-400">
                    {shortDesc}
                  </p>

                  {/* As 4 Estatísticas em LISTA VERTICAL SIMPLES (sem caixas/grid quadrado) */}
                  <div className="divide-y divide-slate-100 border-t border-b border-slate-100 py-0.5 mb-4 dark:divide-slate-800 dark:border-slate-800">
                    {/* Linha 1: Projetos Ativos */}
                    <div className="flex items-center justify-between py-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <FolderKanban className="w-3.5 h-3.5 text-[#1455AC] shrink-0" />
                        <span className="font-medium text-[11.5px]">Projetos Ativos</span>
                      </div>
                      <span className="font-bold text-slate-900 font-sans text-xs dark:text-slate-50">
                        {formatWithDot(featuredCountry.projectsCount)}
                      </span>
                    </div>

                    {/* Linha 2: Comunidades */}
                    <div className="flex items-center justify-between py-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span className="font-medium text-[11.5px]">Comunidades</span>
                      </div>
                      <span className="font-bold text-slate-900 font-sans text-xs dark:text-slate-50">
                        {formatWithDot(featuredCountry.communitiesCount || 532760)}
                      </span>
                    </div>

                    {/* Linha 3: Parceiros */}
                    <div className="flex items-center justify-between py-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Handshake className="w-3.5 h-3.5 text-[#F58300] shrink-0" />
                        <span className="font-medium text-[11.5px]">Parceiros</span>
                      </div>
                      <span className="font-bold text-slate-900 font-sans text-xs dark:text-slate-50">
                        {isPortugal ? '312' : formatWithDot(Math.round(featuredCountry.projectsCount * 0.28 || 84))}
                      </span>
                    </div>

                    {/* Linha 4: Iniciativas */}
                    <div className="flex items-center justify-between py-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Leaf className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium text-[11.5px]">Iniciativas</span>
                      </div>
                      <span className="font-bold text-slate-900 font-sans text-xs dark:text-slate-50">
                        {isPortugal ? '86' : (featuredCountry.initiatives?.length ? String(featuredCountry.initiatives.length) : '86')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botão "Explorar Portugal" com Tom de Marca */}
                <button
                  type="button"
                  onClick={() => onExploreCountry(featuredCountry)}
                  id="btn-explore-featured-country"
                  className="w-full bg-[#1455AC] hover:bg-[#0F448A] text-white font-extrabold py-2.5 px-4 rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 group/btn cursor-pointer text-xs sm:text-sm select-none"
                >
                  <span>Explorar {featuredCountry.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })()}

          {/* 2. Card "Atividade Global" Simplificado (Formato Original) */}
          <div
            id="card-atividade-global"
            className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all dark:bg-slate-900 dark:border-slate-700 dark:hover:border-slate-600"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-extrabold text-slate-900 font-sans flex items-center gap-1.5 dark:text-slate-50">
                <Activity className="w-4 h-4 text-[#1455AC]" />
                <span>Atividade Global</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowReportModal(true)}
                id="btn-view-global-report"
                className="text-xs font-bold text-[#1455AC] hover:text-[#0F448A] inline-flex items-center gap-1 transition-colors cursor-pointer group/rep"
              >
                <span>Ver relatório</span>
                <ArrowRight className="w-3 h-3 group-hover/rep:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Sparkline fino sem eixos/grades visíveis e texto "+12% vs. mês anterior" ao lado */}
            <div className="flex items-center justify-between gap-3 my-2.5">
              <div className="flex-1 h-10">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 160 36" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="simpleSparklineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1455AC" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#1455AC" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <polygon
                    fill="url(#simpleSparklineGrad)"
                    points="0,36 0,26 25,24 50,20 75,22 100,14 125,10 160,4 160,36"
                  />
                  <path
                    d="M 0,26 Q 12,25 25,24 T 50,20 T 75,22 T 100,14 T 125,10 T 160,4"
                    fill="none"
                    stroke="#1455AC"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="160" cy="4" r="2.5" fill="#1455AC" />
                </svg>
              </div>

              <div className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-extrabold whitespace-nowrap">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>+12% vs. mês anterior</span>
              </div>
            </div>
          </div>

          {/* 3. Seção "Descubra o Mundo" com 3 mini-cards (Colômbia, Japão, Islândia) */}
          <div
            id="secao-descubra-o-mundo"
            className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all dark:bg-slate-900 dark:border-slate-700 dark:hover:border-slate-600"
          >
            <div>
              {/* Cabeçalho */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-extrabold text-slate-900 font-sans flex items-center gap-1.5 dark:text-slate-50">
                  <Compass className="w-4 h-4 text-[#1455AC]" />
                  <span>Descubra o Mundo</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('grid');
                  }}
                  id="btn-discover-view-all"
                  className="text-xs font-bold text-[#1455AC] hover:text-[#0F448A] inline-flex items-center gap-1 transition-colors cursor-pointer group/link"
                >
                  <span>Ver todos</span>
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* 3 Mini-cards com Imagem, Nome do local, Categoria e Métrica */}
              <div className="flex flex-col gap-2.5 mt-3">
                {DISCOVER_WORLD_ITEMS.map((item) => {
                  const targetCountry = COUNTRIES_DATA.find((c) => c.id === item.id);
                  return (
                    <div
                      key={`discover-${item.id}`}
                      onClick={() => {
                        if (targetCountry) {
                          handleCountryClick(targetCountry);
                        } else {
                          setSearchQuery(item.name);
                        }
                      }}
                      className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-200 hover:shadow-2xs transition-all cursor-pointer group select-none dark:border-slate-800 dark:bg-slate-800/40 dark:hover:bg-slate-800 dark:hover:border-slate-700"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-2xs">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-0.5 right-0.5 text-xs drop-shadow-sm">
                          {item.flag}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <h4 className="text-xs font-bold text-slate-900 font-sans truncate group-hover:text-[#1455AC] transition-colors dark:text-slate-50">
                            {item.name}
                          </h4>
                          <span className={`text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md border whitespace-nowrap ${item.categoryColor}`}>
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 dark:text-slate-400">
                          <Sprout className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span className="truncate">{item.metric}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </aside>

      </div>

      {/* Modal Interativo de Relatório de Atividade Global */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in zoom-in-95 duration-200 dark:bg-slate-900 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#1455AC]/10 dark:bg-[#1455AC]/20 text-[#1455AC] flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 font-sans dark:text-slate-50">
                    Relatório de Atividade Global
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Consolidado Mensal VILA • 2026</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-900 dark:text-slate-100">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2 dark:bg-slate-800/60 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Crescimento Mensal:</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">+12% vs. mês anterior</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Projetos Ativos no Mundo:</span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-50">24.651 iniciativas</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Cidadãos Conectados:</span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-50">7.842.521 membros</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Alinhamento com ODS:</span>
                  <span className="font-extrabold text-[#1455AC]">98.6% de conformidade</span>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed dark:text-slate-400">
                As redes comunitárias registraram crescimento contínuo nos polos de Portugal, Brasil, Quénia e novos núcleos na América do Sul e Europa.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer dark:text-slate-400 dark:hover:bg-slate-800"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#1455AC] hover:bg-[#0F448A] rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Relatório (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
