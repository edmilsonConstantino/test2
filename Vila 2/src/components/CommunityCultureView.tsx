import React, { useState } from 'react';
import {
  Globe,
  Landmark,
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
  Rocket,
  Palette,
  MoreHorizontal,
  Check,
  X,
  Share2,
  Filter,
  CheckCircle2,
  Sparkles,
  Music,
  BookOpen,
  Theater,
  MapPin,
  Clock,
  Calendar,
  FileText,
  Bookmark,
  Building2,
} from 'lucide-react';

export interface CommunityCultureViewProps {
  onNavigateToTab?: (tabId: string) => void;
  onNavigateToCategory?: (category: string) => void;
  onBackToOfficial?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenCreateCommunity?: () => void;
}

// Interfaces
interface TrendingCultureCommunity {
  rank: number;
  id: string;
  name: string;
  membersCount: string;
  growth: string;
  description: string;
  topics: string[];
  iconType: 'visual' | 'music' | 'literature' | 'heritage' | 'theater';
  iconBg: string;
  iconColor: string;
}

interface CultureEvent {
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

interface PopularCultureItem {
  rank: number;
  id: string;
  name: string;
  members: string;
  growth: string;
  iconType: 'visual' | 'music' | 'literature' | 'heritage' | 'theater';
  iconBg: string;
}

interface FeaturedCultureArticle {
  id: string;
  title: string;
  type: 'Guia' | 'Artigo';
  image: string;
}

// Dados: 5 Comunidades em Tendência (Cultura)
const TRENDING_CULTURE_COMMUNITIES: TrendingCultureCommunity[] = [
  {
    rank: 1,
    id: 'cult-1',
    name: 'Artes Visuais Globais',
    membersCount: '61.2K membros',
    growth: '▲ 26% esta semana',
    description: 'Explore pinturas, fotografia, ilustração e arte digital de artistas do mundo todo.',
    topics: ['Arte Digital', 'Fotografia', 'Exposições'],
    iconType: 'visual',
    iconBg: 'bg-[#4338CA]',
    iconColor: 'text-white',
  },
  {
    rank: 2,
    id: 'cult-2',
    name: 'Música do Mundo',
    membersCount: '58.4K membros',
    growth: '▲ 20% esta semana',
    description: 'Partilhe músicas, descubra novos sons e conecte-se com músicos e fãs.',
    topics: ['Música Tradicional', 'Indie', 'Instrumentos'],
    iconType: 'music',
    iconBg: 'bg-[#EA580C]',
    iconColor: 'text-white',
  },
  {
    rank: 3,
    id: 'cult-3',
    name: 'Literatura & Poesia',
    membersCount: '52.1K membros',
    growth: '▲ 17% esta semana',
    description: 'Celebre livros, poemas e autores. Inspire-se e seja inspirado.',
    topics: ['Poesia', 'Contos', 'Romances'],
    iconType: 'literature',
    iconBg: 'bg-[#0F766E]',
    iconColor: 'text-white',
  },
  {
    rank: 4,
    id: 'cult-4',
    name: 'Património Cultural',
    membersCount: '47.3K membros',
    growth: '▲ 15% esta semana',
    description: 'Preserve e valorize o património material e imaterial da humanidade.',
    topics: ['Monumentos', 'Tradições', 'Memória'],
    iconType: 'heritage',
    iconBg: 'bg-[#DC2626]',
    iconColor: 'text-white',
  },
  {
    rank: 5,
    id: 'cult-5',
    name: 'Artes Cénicas',
    membersCount: '43.7K membros',
    growth: '▲ 12% esta semana',
    description: 'Teatro, dança, circo e outras formas de expressão que emocionam e transformam.',
    topics: ['Teatro', 'Dança', 'Performance'],
    iconType: 'theater',
    iconBg: 'bg-[#0D9488]',
    iconColor: 'text-white',
  },
];

// Dados: 5 Eventos Culturais em Destaque
const FEATURED_CULTURE_EVENTS: CultureEvent[] = [
  {
    id: 'event-1',
    day: '28',
    month: 'MAI',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    title: 'Exposição: Cores da Alma',
    location: 'Lisboa, Portugal',
    time: '10:00 (GMT)',
    attendees: '1.2K vão participar',
    tag: 'Exposição',
  },
  {
    id: 'event-2',
    day: '02',
    month: 'JUN',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    title: 'Festival de Músicas do Mundo',
    location: 'Salvador, Brasil',
    time: '16:00 (GMT-3)',
    attendees: '2.3K vão participar',
    tag: 'Festival',
  },
  {
    id: 'event-3',
    day: '08',
    month: 'JUN',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop&q=80',
    title: 'Feira do Livro Internacional',
    location: 'São Paulo, Brasil',
    time: '09:00 (GMT-3)',
    attendees: '3.1K vão participar',
    tag: 'Feira',
  },
  {
    id: 'event-4',
    day: '15',
    month: 'JUN',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    title: 'Festival de Dança Contemporânea',
    location: 'Porto, Portugal',
    time: '20:00 (GMT)',
    attendees: '1.8K vão participar',
    tag: 'Festival',
  },
  {
    id: 'event-5',
    day: '22',
    month: 'JUN',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=80',
    title: 'Celebração das Culturas do Mundo',
    location: 'Maputo, Moçambique',
    time: '15:00 (GMT+2)',
    attendees: '3.4K vão participar',
    tag: 'Celebração',
  },
];

// Dados: Barra Lateral Mais Populares em Cultura
const POPULAR_CULTURE_ITEMS: PopularCultureItem[] = [
  {
    rank: 1,
    id: 'pop-1',
    name: 'Artes Visuais Globais',
    members: '61.2K membros',
    growth: '▲ 26%',
    iconType: 'visual',
    iconBg: 'bg-[#4338CA]',
  },
  {
    rank: 2,
    id: 'pop-2',
    name: 'Música do Mundo',
    members: '58.4K membros',
    growth: '▲ 20%',
    iconType: 'music',
    iconBg: 'bg-[#EA580C]',
  },
  {
    rank: 3,
    id: 'pop-3',
    name: 'Literatura & Poesia',
    members: '52.1K membros',
    growth: '▲ 17%',
    iconType: 'literature',
    iconBg: 'bg-[#0F766E]',
  },
  {
    rank: 4,
    id: 'pop-4',
    name: 'Património Cultural',
    members: '47.3K membros',
    growth: '▲ 15%',
    iconType: 'heritage',
    iconBg: 'bg-[#DC2626]',
  },
  {
    rank: 5,
    id: 'pop-5',
    name: 'Artes Cénicas',
    members: '43.7K membros',
    growth: '▲ 12%',
    iconType: 'theater',
    iconBg: 'bg-[#0D9488]',
  },
];

// Dados: Barra Lateral Artigos e Recursos em Destaque
const FEATURED_ARTICLES: FeaturedCultureArticle[] = [
  {
    id: 'art-1',
    title: 'A importância da cultura na sociedade moderna',
    type: 'Guia',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-2',
    title: 'Como preservar o património imaterial',
    type: 'Artigo',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-3',
    title: '10 livros que mudaram o mundo',
    type: 'Guia',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-4',
    title: 'A música como linguagem universal',
    type: 'Artigo',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-5',
    title: 'Festivais culturais que você precisa conhecer',
    type: 'Guia',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&auto=format&fit=crop&q=80',
  },
];

export const CommunityCultureView: React.FC<CommunityCultureViewProps> = ({
  onNavigateToTab,
  onNavigateToCategory,
  onBackToOfficial,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenMobileMenu,
  onOpenCreateCommunity,
}) => {
  // Filtros
  const [communityType, setCommunityType] = useState<string>('Todas');
  const [selectedThemes, setSelectedThemes] = useState<Set<string>>(new Set());
  const [locationFilter, setLocationFilter] = useState<string>('Qualquer lugar');
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [showMoreThemes, setShowMoreThemes] = useState<boolean>(false);

  // Dropdown "Mais"
  const [isMaisDropdownOpen, setIsMaisDropdownOpen] = useState<boolean>(false);

  // Modais
  const [selectedCommunityModal, setSelectedCommunityModal] = useState<TrendingCultureCommunity | null>(null);
  const [selectedEventModal, setSelectedEventModal] = useState<CultureEvent | null>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<Set<string>>(new Set(['cult-1']));

  // Alternar tema de checkbox
  const toggleTheme = (theme: string) => {
    setSelectedThemes((prev) => {
      const next = new Set(prev);
      if (next.has(theme)) next.delete(theme);
      else next.add(theme);
      return next;
    });
  };

  // Limpar filtros
  const handleClearFilters = () => {
    setCommunityType('Todas');
    setSelectedThemes(new Set());
    setLocationFilter('Qualquer lugar');
  };

  // Toggle Join
  const toggleJoinCommunity = (id: string) => {
    setJoinedCommunities((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Helper para ícones dos cards
  const renderCardIcon = (type: TrendingCultureCommunity['iconType']) => {
    switch (type) {
      case 'visual':
        return <Palette className="w-5 h-5" />;
      case 'music':
        return <Music className="w-5 h-5" />;
      case 'literature':
        return <BookOpen className="w-5 h-5" />;
      case 'heritage':
        return <Landmark className="w-5 h-5" />;
      case 'theater':
        return <Theater className="w-5 h-5" />;
      default:
        return <Palette className="w-5 h-5" />;
    }
  };

  return (
    <div id="community-culture-view" className="w-full bg-[#F8FAFC] dark:bg-slate-950 min-h-screen text-[#0F172A] dark:text-slate-50 flex flex-col">
      {/* Conteúdo Principal (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* 2. Cabeçalho de Cultura com Ícone e Métricas */}
        <section id="cultura-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            {/* Ícone Quadrado Arredondado com Templo Clássico em Roxo/Índigo */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#1E1B4B] text-white flex items-center justify-center shrink-0 shadow-sm border border-indigo-900/20">
              <Landmark className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.2} />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-slate-50 tracking-tight font-['Outfit'] leading-tight">
                Cultura
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-normal leading-snug">
                Celebre a diversidade, preserve tradições e conecte-se através da arte e da cultura.
              </p>

              {/* Fita de Métricas: 1.482 comunidades, 189.750 membros, 167 países, 3.980 recursos */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-1.5 text-[11.5px] sm:text-xs font-semibold text-[#64748B] dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">1.482</strong> comunidades
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">189.750</strong> membros
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">167</strong> países
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">3.980</strong> recursos
                </span>
              </div>
            </div>
          </div>

          {/* Botão "+ Criar Comunidade" em Índigo Escuro */}
          <button
            type="button"
            onClick={onOpenCreateCommunity}
            id="btn-criar-comunidade-cultura"
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E1B4B] hover:bg-[#2E1065] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Criar Comunidade</span>
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </section>

        {/* 3. Fita Horizontal de Categorias (com Cultura Selecionada) */}
        <nav
          id="categories-ribbon-cultura"
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
            const isActive = cat.id === 'cultura';

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (onNavigateToCategory) onNavigateToCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-[#1E1B4B] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-[#334155] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 dark:text-slate-500'}`} strokeWidth={2.2} />
                <span>{cat.label}</span>
              </button>
            );
          })}

          {/* Botão "Mais" como Dropdown */}
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
            id="filtros-cultura-sidebar"
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
                className="text-[11.5px] font-semibold text-[#1E1B4B] hover:underline transition-colors cursor-pointer"
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
                  'Artes Visuais',
                  'Música',
                  'Literatura',
                  'Património Cultural',
                  'Artes Cénicas',
                  'Tradições & Costumes',
                  'Idiomas',
                  'História & Memória',
                  'Festivais & Celebrações',
                ].map((type) => {
                  const isChecked = communityType === type;
                  return (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-[11.5px] text-[#334155] dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        name="culture-type"
                        checked={isChecked}
                        onChange={() => setCommunityType(type)}
                        className="sr-only"
                      />
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'border-[#1E1B4B] bg-[#1E1B4B]'
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

            {/* Temas de Cultura (Checkboxes) */}
            <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Temas de Cultura</span>
              <div className="flex flex-col gap-1.5">
                {[
                  'Arte Contemporânea',
                  'Música e Sons do Mundo',
                  'Livros e Leitura',
                  'Cultura Popular',
                  'Património Imaterial',
                  'Cultura Indígena',
                  'Diversidade Cultural',
                  'Cultura Urbana',
                  ...(showMoreThemes
                    ? [
                        'Gastronomia Tradicional',
                        'Artesanato & Design',
                        'Cinema e Audiovisual',
                        'Arquitetura Histórica',
                      ]
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
                            ? 'border-[#1E1B4B] bg-[#1E1B4B] text-white'
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

            {/* Botão Aplicar Filtros em Roxo/Índigo */}
            <button
              type="button"
              className="w-full py-2.5 rounded-xl bg-[#1E1B4B] hover:bg-[#2E1065] text-white font-bold text-xs shadow-xs transition-all cursor-pointer mt-1"
            >
              Aplicar Filtros
            </button>
          </aside>

          {/* COLUNA CENTRAL: Hero Banner, Comunidades em Tendência e Eventos Culturais (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* HERO BANNER: "A cultura nos conecta." */}
            <section
              id="hero-cultura-banner"
              className="relative rounded-2xl overflow-hidden min-h-[260px] flex items-center text-white shadow-sm border border-slate-900/10 bg-[#2E1065] group"
            >
              {/* Imagem de Fundo com mulher sorrindo em vestes tradicionais vibrantes */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="/imagens-paginas/05-comunidade-global/cultura/cultura1.png"
                  alt="Mulher celebrando a cultura"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Gradiente Escuro para Leitura Perfeita */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E1B4B]/95 via-[#1E1B4B]/80 to-[#1E1B4B]/30" />
              </div>

              <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Textos da Esquerda */}
                <div className="max-w-md flex flex-col gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-['Outfit'] tracking-tight">
                    A cultura <br />
                    nos conecta.
                  </h2>
                  <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                    Partilhe histórias, expressões e tradições que tornam o nosso mundo mais rico e diverso.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (TRENDING_CULTURE_COMMUNITIES.length > 0) {
                          setSelectedCommunityModal(TRENDING_CULTURE_COMMUNITIES[0]);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#1E1B4B] text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                    >
                      <span>Juntar-se a uma comunidade</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.4]" />
                    </button>
                  </div>
                </div>

                {/* 4 Cartões de Métricas na Direita */}
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 shrink-0 w-full sm:w-auto">
                  <div className="bg-black/35 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-indigo-300" />
                    <div>
                      <span className="block text-sm font-black text-white font-['Outfit']">2.950</span>
                      <span className="text-[10px] text-slate-200">Recursos culturais</span>
                    </div>
                  </div>

                  <div className="bg-black/35 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-rose-300" />
                    <div>
                      <span className="block text-sm font-black text-white font-['Outfit']">2.180</span>
                      <span className="text-[10px] text-slate-200">Eventos culturais</span>
                    </div>
                  </div>

                  <div className="bg-black/35 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 flex items-center gap-3">
                    <Users className="w-5 h-5 text-amber-300" />
                    <div>
                      <span className="block text-sm font-black text-white font-['Outfit']">1.620</span>
                      <span className="text-[10px] text-slate-200">Artistas e criadores</span>
                    </div>
                  </div>

                  <div className="bg-black/35 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 flex items-center gap-3">
                    <Landmark className="w-5 h-5 text-emerald-300" />
                    <div>
                      <span className="block text-sm font-black text-white font-['Outfit']">192</span>
                      <span className="text-[10px] text-slate-200">Projetos culturais</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção: Comunidades em tendência (Cultura) (5 Cards) */}
            <section id="comunidades-tendencia-cultura-section" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                  Comunidades em tendência (Cultura)
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

              {/* Grid de 5 Cards */}
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {TRENDING_CULTURE_COMMUNITIES.map((comm) => (
                    <article
                      key={comm.id}
                      onClick={() => setSelectedCommunityModal(comm)}
                      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700 p-3 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between cursor-pointer group"
                    >
                      <div>
                        {/* Topo com Rank e Ícone Circular Colorido */}
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 dark:text-slate-500 text-[10px] font-bold flex items-center justify-center">
                            {comm.rank}
                          </span>
                          <div className={`w-9 h-9 rounded-full ${comm.iconBg} ${comm.iconColor} flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}>
                            {renderCardIcon(comm.iconType)}
                          </div>
                        </div>

                        {/* Nome e Membros */}
                        <h4 className="text-[12px] font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] line-clamp-1 leading-snug group-hover:text-indigo-600 transition-colors">
                          {comm.name}
                        </h4>
                        <p className="text-[9.5px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-1">{comm.membersCount}</p>
                        <span className="text-[10px] font-bold text-[#10B981] block mb-2">
                          {comm.growth}
                        </span>

                        {/* Descrição */}
                        <p className="text-[10.5px] text-slate-600 dark:text-slate-400 dark:text-slate-500 line-clamp-2 leading-tight mb-2.5">
                          {comm.description}
                        </p>
                      </div>

                      {/* Tópicos em Alta */}
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

                <button
                  type="button"
                  title="Avançar"
                  className="hidden xl:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer z-10 transition-transform hover:scale-105"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* Seção: Eventos culturais em destaque (5 Cards) */}
            <section id="eventos-culturais-destaque-section" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                  Eventos culturais em destaque
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid de 5 Eventos */}
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {FEATURED_CULTURE_EVENTS.map((evt) => (
                    <article
                      key={evt.id}
                      onClick={() => setSelectedEventModal(evt)}
                      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col cursor-pointer group"
                    >
                      {/* Imagem do Evento com Badge de Data Sobreposta */}
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

                      {/* Informações do Evento */}
                      <div className="p-2.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-[11.5px] font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] line-clamp-1 leading-snug group-hover:text-indigo-600 transition-colors">
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

                        {/* Tag no Rodapé */}
                        <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
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
            {/* 1. Card: Mais populares em Cultura */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">
                  Mais populares em Cultura
                </h3>
                <button
                  type="button"
                  className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Lista 1 a 5 */}
              <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
                {POPULAR_CULTURE_ITEMS.map((item) => (
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
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 truncate group-hover:text-indigo-600 transition-colors">
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
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">
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
                      <h4 className="font-bold text-[#0F172A] dark:text-slate-50 group-hover:text-indigo-600 transition-colors line-clamp-2">
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

            {/* 3. Card CTA em Roxo: "A cultura transforma. Partilhe, aprenda e celebre a diversidade." */}
            <div
              id="cta-cultura-card"
              className="relative rounded-2xl overflow-hidden p-5 text-white bg-gradient-to-br from-[#1E1B4B] via-[#2E1065] to-[#3B0764] shadow-md flex flex-col justify-between min-h-[170px]"
            >
              <div className="relative z-10 max-w-[210px] flex flex-col gap-1">
                <h3 className="text-sm sm:text-base font-extrabold text-white font-['Outfit'] leading-tight">
                  A cultura transforma. <br />
                  Partilhe, aprenda <br />
                  e celebre a diversidade.
                </h3>
                <p className="text-[10.5px] text-white/85 leading-snug">
                  Crie ou participe de comunidades culturais e ajude a manter viva a herança da humanidade.
                </p>
              </div>

              {/* Botão Branco */}
              <div className="relative z-10 pt-3">
                <button
                  type="button"
                  onClick={onOpenCreateCommunity}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#1E1B4B] text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <span>Criar Comunidade</span>
                  <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
                </button>
              </div>

              {/* Ilustração do Templo Clássico e Vaso de Planta no Canto */}
              <div className="absolute right-1 -bottom-1 pointer-events-none opacity-95">
                <svg width="110" height="95" viewBox="0 0 110 95" fill="none">
                  {/* Templo Grego */}
                  <polygon points="55,15 15,35 95,35" fill="#E2E8F0" />
                  <rect x="20" y="35" width="70" height="4" fill="#CBD5E1" />
                  {/* Colunas */}
                  <rect x="24" y="39" width="8" height="35" fill="#F1F5F9" />
                  <rect x="42" y="39" width="8" height="35" fill="#F1F5F9" />
                  <rect x="60" y="39" width="8" height="35" fill="#F1F5F9" />
                  <rect x="78" y="39" width="8" height="35" fill="#F1F5F9" />
                  {/* Base */}
                  <rect x="15" y="74" width="80" height="6" fill="#CBD5E1" />
                  {/* Planta em Vaso */}
                  <ellipse cx="94" cy="74" rx="8" ry="4" fill="#78350F" />
                  <polygon points="88,74 90,82 98,82 100,74" fill="#92400E" />
                  <path d="M94 74 Q90 65 85 62" stroke="#10B981" strokeWidth="2.5" fill="none" />
                  <path d="M94 74 Q98 63 103 64" stroke="#059669" strokeWidth="2.5" fill="none" />
                </svg>
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
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">
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
                      : 'bg-[#1E1B4B] text-white hover:bg-[#2E1065] shadow-xs'
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
                <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">
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
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {selectedEventModal.tag}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedEventModal(null)}
                  className="px-4 py-2 bg-[#1E1B4B] text-white text-xs font-bold rounded-xl hover:bg-[#2E1065]"
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

export default CommunityCultureView;
