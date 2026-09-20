import React, { useState, useMemo } from 'react';
import {
  Globe,
  Leaf,
  Plus,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Users,
  Compass,
  Cpu,
  GraduationCap,
  Scale,
  HeartPulse,
  Rocket,
  Palette,
  MoreHorizontal,
  Waves,
  Recycle,
  Sprout,
  Check,
  X,
  Share2,
  Calendar,
  Building2,
  Brain,
  Filter,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export interface CommunityEnvironmentViewProps {
  onNavigateToTab?: (tabId: string) => void;
  onNavigateToCategory?: (category: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
  onExploreWorld?: () => void;
  onBackToOfficial?: () => void;
  onOpenCreateCommunity?: () => void;
}

// Interfaces
interface FeaturedCommunityItem {
  id: string;
  name: string;
  membersCount: string;
  description: string;
  badgeLabel: string;
  badgeColor: string; // Tailwind class
  locationTag: string;
  image: string;
  iconType: 'leaf' | 'waves' | 'sprout' | 'recycle';
  avatars: string[];
  extraAvatarsText: string;
  joined?: boolean;
}

interface InitiativeItem {
  id: string;
  title: string;
  badgeLabel: string;
  badgeBg: string;
  image: string;
  subtitle: string;
  description: string;
  participantsCount: string;
  status: string;
  isRegistered?: boolean;
}

interface TrendingItem {
  rank: number;
  id: string;
  name: string;
  members: string;
  growth: string;
  iconType: 'brain' | 'female' | 'energy' | 'rocket' | 'building';
  color: string;
  bg: string;
}

interface RecentActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  timeAgo: string;
  isOrg?: boolean;
}

// Categorias da Fita Horizontal
const CATEGORIES = [
  { id: 'todas', label: 'Todas', icon: Compass },
  { id: 'ambiente', label: 'Ambiente', icon: Leaf },
  { id: 'tecnologia', label: 'Tecnologia', icon: Cpu },
  { id: 'educacao', label: 'Educação', icon: GraduationCap },
  { id: 'direitos-humanos', label: 'Direitos Humanos', icon: Scale },
  { id: 'saude', label: 'Saúde', icon: HeartPulse },
  { id: 'empreendedorismo', label: 'Empreendedorismo', icon: Rocket },
  { id: 'cultura', label: 'Cultura', icon: Palette },
  { id: 'mais', label: 'Mais', icon: MoreHorizontal },
];

// Dados fiéis das 4 Comunidades em Destaque
const FEATURED_COMMUNITIES_DATA: FeaturedCommunityItem[] = [
  {
    id: 'comm-1',
    name: 'Planeta Verde Global',
    membersCount: '85.430 membros',
    description: 'Aceleramos soluções climáticas para um futuro regenerativo.',
    badgeLabel: 'EM ALTA',
    badgeColor: 'bg-[#10B981] text-white',
    locationTag: 'Global',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&auto=format&fit=crop&q=80',
    iconType: 'leaf',
    avatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatarsText: '+2.1K',
  },
  {
    id: 'comm-2',
    name: 'Oceanos Limpos',
    membersCount: '64.210 membros',
    description: 'Protegemos os oceanos hoje para as gerações de amanhã.',
    badgeLabel: 'POPULAR',
    badgeColor: 'bg-[#7C3AED] text-white',
    locationTag: 'Global',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
    iconType: 'waves',
    avatars: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544168190-79c17527004f?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatarsText: '+1.5K',
  },
  {
    id: 'comm-3',
    name: 'Reflorestar o Mundo',
    membersCount: '52.870 membros',
    description: 'Restauração de florestas e biodiversidade global.',
    badgeLabel: 'EM DESTAQUE',
    badgeColor: 'bg-[#D97706] text-white',
    locationTag: 'Global',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&auto=format&fit=crop&q=80',
    iconType: 'sprout',
    avatars: [
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatarsText: '+1.1K',
  },
  {
    id: 'comm-4',
    name: 'Zero Resíduos',
    membersCount: '38.920 membros',
    description: 'Rumo a um mundo sem lixo e mais consciente.',
    badgeLabel: 'NOVO',
    badgeColor: 'bg-[#3D4ED8] text-white',
    locationTag: 'Global',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
    iconType: 'recycle',
    avatars: [
      'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatarsText: '+980',
  },
];

// Dados fiéis das 5 Iniciativas em Destaque
const INITIATIVES_DATA: InitiativeItem[] = [
  {
    id: 'init-1',
    title: 'Limpeza Costeira 2024',
    badgeLabel: 'AÇÃO GLOBAL',
    badgeBg: 'bg-[#059669]',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=500&auto=format&fit=crop&q=80',
    subtitle: '23 Mai 2024 • Global',
    description: 'Mobilizamos voluntários para limpar praias e rios.',
    participantsCount: '1.4K participantes',
    status: 'Agendado',
  },
  {
    id: 'init-2',
    title: '1M de Árvores',
    badgeLabel: 'CAMPANHA',
    badgeBg: 'bg-[#65A30D]',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=80',
    subtitle: 'Em andamento',
    description: 'Plantamos árvores nativas em comunidades locais.',
    participantsCount: '5.2K apoiadores',
    status: 'Ativo',
  },
  {
    id: 'init-3',
    title: 'Energia Renovável para Todos',
    badgeLabel: 'WEBINAR',
    badgeBg: 'bg-[#3D4ED8]',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=500&auto=format&fit=crop&q=80',
    subtitle: '27 Mai 2024 • Online',
    description: 'Webinar sobre transição energética justa.',
    participantsCount: '860 inscritos',
    status: 'Inscrições abertas',
  },
  {
    id: 'init-4',
    title: 'Desafio 30 Dias Sustentáveis',
    badgeLabel: 'DESAFIO',
    badgeBg: 'bg-[#D97706]',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=500&auto=format&fit=crop&q=80',
    subtitle: 'Em andamento',
    description: 'Pequenas mudanças diárias para grandes impactos.',
    participantsCount: '2.8K participantes',
    status: 'Em curso',
  },
  {
    id: 'init-5',
    title: 'Hortas Urbanas',
    badgeLabel: 'PROJETO LOCAL',
    badgeBg: 'bg-[#0D9488]',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&auto=format&fit=crop&q=80',
    subtitle: 'Lisboa, Portugal',
    description: 'Cultivamos alimentos saudáveis em espaços urbanos.',
    participantsCount: '1.1K membros',
    status: 'Comunidade ativa',
  },
];

// Dados fiéis de Comunidades em Tendência (1 a 5)
const TRENDING_DATA: TrendingItem[] = [
  {
    rank: 1,
    id: 't-1',
    name: 'Saúde Mental Global',
    members: '45.2K membros',
    growth: '▲ 18%',
    iconType: 'brain',
    color: 'text-[#EC4899]',
    bg: 'bg-pink-50 dark:bg-pink-500/10',
  },
  {
    rank: 2,
    id: 't-2',
    name: 'Mulheres que Inspiram',
    members: '38.7K membros',
    growth: '▲ 15%',
    iconType: 'female',
    color: 'text-[#F97316]',
    bg: 'bg-orange-50',
  },
  {
    rank: 3,
    id: 't-3',
    name: 'Energia Renovável',
    members: '32.1K membros',
    growth: '▲ 12%',
    iconType: 'energy',
    color: 'text-[#0284C7]',
    bg: 'bg-sky-50',
  },
  {
    rank: 4,
    id: 't-4',
    name: 'Empreendedorismo Social',
    members: '28.9K membros',
    growth: '▲ 10%',
    iconType: 'rocket',
    color: 'text-[#8B5CF6]',
    bg: 'bg-purple-50 dark:bg-purple-500/10',
  },
  {
    rank: 5,
    id: 't-5',
    name: 'Cidades Sustentáveis',
    members: '26.3K membros',
    growth: '▲ 9%',
    iconType: 'building',
    color: 'text-[#10B981]',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
  },
];

// Dados fiéis de Atividade Recente
const RECENT_ACTIVITY_DATA: RecentActivityItem[] = [
  {
    id: 'act-1',
    user: 'Maria Silva',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    action: 'publicou uma atualização em',
    target: 'Planeta Verde Global',
    timeAgo: 'Há 1 hora',
  },
  {
    id: 'act-2',
    user: 'João Pereira',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    action: 'juntou-se à comunidade',
    target: 'Oceanos Limpos',
    timeAgo: 'Há 2 horas',
  },
  {
    id: 'act-3',
    user: 'Ana Costa',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    action: 'começou a seguir',
    target: 'Reflorestar o Mundo',
    timeAgo: 'Há 3 horas',
  },
  {
    id: 'act-4',
    user: 'Green Earth',
    avatar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=120&auto=format&fit=crop&q=80',
    action: 'iniciou um novo projeto em',
    target: 'Zero Resíduos',
    timeAgo: 'Há 5 horas',
    isOrg: true,
  },
];

export const CommunityEnvironmentView: React.FC<CommunityEnvironmentViewProps> = ({
  onNavigateToTab,
  onNavigateToCategory,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenMobileMenu,
  onExploreWorld,
  onBackToOfficial,
  onOpenCreateCommunity,
}) => {
  // Filtros e Estado
  const [selectedCategory, setSelectedCategory] = useState<string>('ambiente');
  const [commSlide, setCommSlide] = useState<number>(0); // página do carrossel de comunidades em destaque (3 por página)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [communityType, setCommunityType] = useState<string>('Todas');
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [locationFilter, setLocationFilter] = useState<string>('Qualquer lugar');
  const [languageFilter, setLanguageFilter] = useState<string>('Qualquer idioma');
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);

  // Modais interativos
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [selectedCommunityModal, setSelectedCommunityModal] = useState<FeaturedCommunityItem | null>(null);
  const [selectedInitiativeModal, setSelectedInitiativeModal] = useState<InitiativeItem | null>(null);

  // Estados dinâmicos de adesão
  const [joinedCommunities, setJoinedCommunities] = useState<Set<string>>(new Set(['comm-1']));
  const [registeredInitiatives, setRegisteredInitiatives] = useState<Set<string>>(new Set(['init-1']));

  // Formulário de Criação de Comunidade
  const [newCommunityName, setNewCommunityName] = useState<string>('');
  const [newCommunityCategory, setNewCommunityCategory] = useState<string>('Ambiente');
  const [newCommunityDesc, setNewCommunityDesc] = useState<string>('');
  const [newCommunityLocation, setNewCommunityLocation] = useState<string>('Global');
  const [createSuccessMsg, setCreateSuccessMsg] = useState<boolean>(false);

  // Alternar Checkboxes de tamanho
  const toggleSizeFilter = (size: string) => {
    setSelectedSizes((prev) => {
      const next = new Set(prev);
      if (next.has(size)) next.delete(size);
      else next.add(size);
      return next;
    });
  };

  // Limpar Filtros
  const handleClearFilters = () => {
    setCommunityType('Todas');
    setSelectedSizes(new Set());
    setLocationFilter('Qualquer lugar');
    setLanguageFilter('Qualquer idioma');
    setSearchQuery('');
  };

  // Alternar Adesão à Comunidade
  const toggleJoinCommunity = (id: string) => {
    setJoinedCommunities((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Alternar Inscrição na Iniciativa
  const toggleRegisterInitiative = (id: string) => {
    setRegisteredInitiatives((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Submeter Criação de Comunidade
  const handleCreateCommunitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommunityName.trim()) return;
    setCreateSuccessMsg(true);
    setTimeout(() => {
      setCreateSuccessMsg(false);
      setIsCreateModalOpen(false);
      setNewCommunityName('');
      setNewCommunityDesc('');
    }, 1800);
  };

  // Ícone flutuante do card
  const renderCardBadgeIcon = (iconType: string) => {
    switch (iconType) {
      case 'leaf':
        return <Leaf className="w-4 h-4 text-[#059669]" strokeWidth={2.4} />;
      case 'waves':
        return <Waves className="w-4 h-4 text-[#0284C7]" strokeWidth={2.4} />;
      case 'sprout':
        return <Sprout className="w-4 h-4 text-[#16A34A]" strokeWidth={2.4} />;
      case 'recycle':
        return <Recycle className="w-4 h-4 text-[#059669]" strokeWidth={2.4} />;
      default:
        return <Leaf className="w-4 h-4 text-[#059669]" strokeWidth={2.4} />;
    }
  };

  // Filtragem de Comunidades
  const filteredCommunities = useMemo(() => {
    return FEATURED_COMMUNITIES_DATA.filter((comm) => {
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = comm.name.toLowerCase().includes(q);
        const matchesDesc = comm.description.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc) return false;
      }
      return true;
    });
  }, [searchQuery]);

  return (
    <div id="community-environment-view" className="w-full bg-[#F8FAFC] dark:bg-slate-950 min-h-screen text-[#0F172A] dark:text-slate-50 flex flex-col">
      {/* Conteúdo Central (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* 2. Cabeçalho da Categoria "Ambiente" com Ícone de Folha e Métricas */}
        <section id="ambiente-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            {/* Ícone Quadrado Arredondado com Folha Verde */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#ECFDF5] border border-emerald-200/80 flex items-center justify-center shrink-0 shadow-2xs">
              <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-[#059669]" strokeWidth={2.4} />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-slate-50 tracking-tight leading-tight">
                Ambiente
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-normal leading-snug">
                Comunidades que trabalham por um planeta saudável e sustentável.
              </p>

              {/* Fita de Métricas: Comunidades, Membros e Países */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-1.5 text-[11.5px] sm:text-xs font-semibold text-[#64748B] dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">1.254</strong> comunidades
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">248.540</strong> membros
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">195</strong> países
                </span>
              </div>
            </div>
          </div>

          {/* Botão "+ Criar Comunidade" Verde */}
          <button
            type="button"
            id="btn-criar-comunidade-header"
            onClick={() => {
              if (onOpenCreateCommunity) {
                onOpenCreateCommunity();
              } else {
                setIsCreateModalOpen(true);
              }
            }}
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Criar Comunidade</span>
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </section>

        {/* 3. Fita Horizontal de Categorias em Pílulas */}
        <nav
          id="categories-ribbon"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
          aria-label="Categorias de Comunidades"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (cat.id === 'mais') {
                    if (onNavigateToCategory) {
                      onNavigateToCategory('mais');
                    } else if (onNavigateToTab) {
                      onNavigateToTab('mais');
                    }
                    return;
                  }
                  if (onNavigateToCategory && (cat.id === 'educacao' || cat.id === 'direitos-humanos' || cat.id === 'cultura' || cat.id === 'saude' || cat.id === 'tecnologia' || cat.id === 'empreendedorismo' || cat.id === 'todas')) {
                    onNavigateToCategory(cat.id);
                  } else {
                    setSelectedCategory(cat.id);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-[#064E3B] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-[#334155] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 dark:text-slate-500'}`} strokeWidth={2.2} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </nav>

        {/* 4. Grade Principal de Três Colunas (Filtros, Conteúdo Central, Coluna Lateral) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* COLUNA ESQUERDA: Filtros (lg:col-span-2) */}
          <aside
            id="filtros-sidebar"
            className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-5"
          >
            {/* Título e Botão Limpar Tudo */}
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm font-bold text-[#0F172A] dark:text-slate-50 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                Filtros
              </span>
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-[11.5px] font-semibold text-[#059669] hover:text-[#047857] transition-colors cursor-pointer"
              >
                Limpar tudo
              </button>
            </div>

            {/* Grupo 1: Tipo de Comunidade (Radio Buttons) */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Tipo de comunidade</span>
              <div className="flex flex-col gap-2">
                {[
                  'Todas',
                  'Organizações',
                  'ONGs',
                  'Grupos de Interesse',
                  'Iniciativas Locais',
                  'Redes Profissionais',
                ].map((type) => {
                  const isChecked = communityType === type;
                  return (
                    <label
                      key={type}
                      className="flex items-center gap-2.5 text-xs text-[#334155] dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        name="community-type"
                        checked={isChecked}
                        onChange={() => setCommunityType(type)}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'border-[#059669] bg-[#059669]'
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

            {/* Grupo 2: Tamanho (Checkboxes) */}
            <div className="flex flex-col gap-2.5 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Tamanho</span>
              <div className="flex flex-col gap-2">
                {['1 - 100 membros', '101 - 1.000 membros', '1.001 - 10.000 membros', '10.000+ membros'].map(
                  (size) => {
                    const isChecked = selectedSizes.has(size);
                    return (
                      <label
                        key={size}
                        className="flex items-center gap-2.5 text-xs text-[#334155] dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSizeFilter(size)}
                          className="sr-only"
                        />
                        <span
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                            isChecked
                              ? 'border-[#059669] bg-[#059669] text-white'
                              : 'border-slate-300 bg-white dark:bg-slate-800 hover:border-slate-400'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span>{size}</span>
                      </label>
                    );
                  }
                )}
              </div>
            </div>

            {/* Grupo 3: Localização (Dropdown) */}
            <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 relative">
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
                  {[
                    'Qualquer lugar',
                    'Global',
                    'Europa',
                    'América Latina',
                    'África',
                    'Ásia',
                    'América do Norte',
                  ].map((loc) => (
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

            {/* Grupo 4: Idioma (Dropdown) */}
            <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 relative">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Idioma</span>
              <button
                type="button"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <span className="truncate">{languageFilter}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-500 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLanguageOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 z-20 text-xs font-medium">
                  {['Qualquer idioma', 'Português', 'Inglês', 'Espanhol', 'Francês'].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setLanguageFilter(lang);
                        setIsLanguageOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300"
                    >
                      <span>{lang}</span>
                      {languageFilter === lang && <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* COLUNA CENTRAL: Hero Banner, Comunidades e Iniciativas (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* 1. Hero Banner: Floresta Ensolarada com "Pequenas ações, grandes mudanças." */}
            <section
              id="hero-ambiente-banner"
              className="relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[250px] flex items-center p-6 sm:p-8 text-white shadow-sm border border-slate-900/10 group"
            >
              {/* Imagem de Fundo de Floresta com Luz Solar */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="/imagens-paginas/05-comunidade-global/ambiente/1ambiente.png"
                  alt="Trilha na floresta verde banhada pelo sol"
                  className="w-full h-full object-cover object-center scale-102 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Gradiente Escuro na Esquerda para Leitura Ótima */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
              </div>

              {/* Conteúdo Textual e Botão de Ação */}
              <div className="relative z-10 max-w-md flex flex-col gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                  Pequenas ações, <br />
                  grandes mudanças.
                </h2>
                <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                  Encontre comunidades ambientais, partilhe ideias e faça parte da solução global.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (FEATURED_COMMUNITIES_DATA.length > 0) {
                        setSelectedCommunityModal(FEATURED_COMMUNITIES_DATA[0]);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#064E3B] text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                  >
                    <span>Juntar-se a uma comunidade</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.4]" />
                  </button>
                </div>
              </div>
            </section>

            {/* 2. Seção: Comunidades em destaque (4 Cards horizontais com botão '>' no final) */}
            <section id="comunidades-destaque-section" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                  Comunidades em destaque
                </h3>
                <button
                  type="button"
                  onClick={() => handleClearFilters()}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:underline cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Carrossel paginado: 3 cards visíveis, a seta avança para os seguintes */}
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {filteredCommunities.slice(commSlide * 3, commSlide * 3 + 3).map((comm) => {
                    const isJoined = joinedCommunities.has(comm.id);

                    return (
                      <article
                        key={comm.id}
                        onClick={() => setSelectedCommunityModal(comm)}
                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col cursor-pointer group"
                      >
                        {/* Imagem do Card com Badge "EM ALTA", "POPULAR", etc. */}
                        <div className="relative h-28 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <img
                            src={comm.image}
                            alt={comm.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          {/* Tag no canto superior esquerdo */}
                          <span
                            className={`absolute top-2 left-2 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-2xs ${comm.badgeColor}`}
                          >
                            {comm.badgeLabel}
                          </span>

                          {/* Ícone Redondo Flutuante no Canto Inferior Esquerdo */}
                          <div className="absolute -bottom-3 left-3 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs">
                            {renderCardBadgeIcon(comm.iconType)}
                          </div>
                        </div>

                        {/* Conteúdo do Card */}
                        <div className="p-3 pt-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 line-clamp-1 group-hover:text-emerald-700 dark:text-emerald-400 transition-colors">
                              {comm.name}
                            </h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-1.5">{comm.membersCount}</p>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 dark:text-slate-500 line-clamp-2 leading-tight mb-2.5">
                              {comm.description}
                            </p>
                          </div>

                          {/* Rodapé do Card: Tag "Global" + Stack de Avatares */}
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1">
                            <span className="text-[9.5px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded">
                              {comm.locationTag}
                            </span>

                            <div className="flex items-center">
                              <div className="flex -space-x-1.5 overflow-hidden">
                                {comm.avatars.slice(0, 4).map((av, idx) => (
                                  <img
                                    key={idx}
                                    src={av}
                                    alt="Membro"
                                    className="inline-block h-4.5 w-4.5 rounded-full ring-1 ring-white dark:ring-slate-900 object-cover"
                                  />
                                ))}
                              </div>
                              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 ml-1">
                                {comm.extraAvatarsText}
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Botões de navegação do carrossel: '<' anterior (quando não está na 1ª página) e '>' seguinte */}
                {commSlide > 0 && (
                  <button
                    type="button"
                    onClick={() => setCommSlide((v) => Math.max(0, v - 1))}
                    title="Comunidades anteriores"
                    className="hidden xl:flex absolute -left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer z-10 transition-transform hover:scale-105"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const maxPage = Math.max(0, Math.ceil(filteredCommunities.length / 3) - 1);
                    setCommSlide((v) => (v >= maxPage ? 0 : v + 1));
                  }}
                  title="Avançar comunidades"
                  className="hidden xl:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer z-10 transition-transform hover:scale-105"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* 3. Seção: Iniciativas em destaque (5 Cards) */}
            <section id="iniciativas-destaque-section" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                  Iniciativas em destaque
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigateToTab && onNavigateToTab('eventos')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:underline cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 5 Cards de Iniciativas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {INITIATIVES_DATA.map((init) => {
                  const isRegistered = registeredInitiatives.has(init.id);

                  return (
                    <article
                      key={init.id}
                      onClick={() => setSelectedInitiativeModal(init)}
                      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col cursor-pointer group"
                    >
                      {/* Imagem da Iniciativa com Tag */}
                      <div className="relative h-24 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={init.image}
                          alt={init.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <span
                          className={`absolute top-2 left-2 text-[8.5px] font-black text-white px-2 py-0.5 rounded shadow-2xs uppercase tracking-wider ${init.badgeBg}`}
                        >
                          {init.badgeLabel}
                        </span>
                      </div>

                      {/* Informações da Iniciativa */}
                      <div className="p-2.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-[11.5px] font-bold text-[#0F172A] dark:text-slate-50 line-clamp-1 leading-snug group-hover:text-emerald-700 dark:text-emerald-400 transition-colors">
                            {init.title}
                          </h4>
                          <p className="text-[9.5px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-1">{init.subtitle}</p>
                          <p className="text-[10.5px] text-slate-600 dark:text-slate-400 dark:text-slate-500 line-clamp-2 leading-tight">
                            {init.description}
                          </p>
                        </div>

                        {/* Rodapé com Participantes e Botão de Ação */}
                        <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <span className="text-[9.5px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 flex items-center gap-1">
                            <Users className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                            {init.participantsCount}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRegisterInitiative(init.id);
                            }}
                            title={isRegistered ? 'Inscrito' : 'Participar'}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-colors ${
                              isRegistered
                                ? 'bg-emerald-100 text-emerald-700 dark:text-emerald-400'
                                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-400 dark:text-slate-500'
                            }`}
                          >
                            {isRegistered ? <Check className="w-3 h-3 stroke-[2.5]" /> : <Plus className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>

          {/* COLUNA DIREITA: Tendências, Atividade Recente e CTA (lg:col-span-3) */}
          <aside className="lg:col-span-3 flex flex-col gap-4">
            {/* 1. Card: Comunidades em tendência (1 a 5) */}
            <div
              id="comunidades-tendencia-widget"
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3"
            >
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50">
                  Comunidades em tendência
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('todas')}
                  className="text-[11px] font-bold text-[#0066FF] hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Lista 1 a 5 */}
              <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
                {TRENDING_DATA.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      if (onOpenAuth) onOpenAuth('login');
                    }}
                    className="py-2.5 flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/80 px-1 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Número do Ranking */}
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 w-3 shrink-0">
                        {t.rank}
                      </span>

                      {/* Ícone com Cor de Fundo */}
                      <div
                        className={`w-7 h-7 rounded-lg ${t.bg} ${t.color} flex items-center justify-center shrink-0`}
                      >
                        {t.iconType === 'brain' && <Brain className="w-4 h-4" strokeWidth={2.2} />}
                        {t.iconType === 'female' && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                          >
                            <circle cx="12" cy="8.5" r="5" />
                            <path d="M12 13.5v7.5" />
                            <path d="M8.5 17.5h7" />
                          </svg>
                        )}
                        {t.iconType === 'energy' && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                          >
                            <path d="M12 2.5v19" />
                            <path d="M4 11.5l8-4.5 8 4.5" />
                            <path d="M8 19l4-2.5 4 2.5" />
                          </svg>
                        )}
                        {t.iconType === 'rocket' && <Rocket className="w-4 h-4" strokeWidth={2.2} />}
                        {t.iconType === 'building' && <Building2 className="w-4 h-4" strokeWidth={2.2} />}
                      </div>

                      {/* Informações */}
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 truncate group-hover:text-emerald-700 dark:text-emerald-400 transition-colors">
                          {t.name}
                        </h4>
                        <span className="text-[10.5px] text-slate-500 dark:text-slate-400 dark:text-slate-500 block truncate">
                          {t.members}
                        </span>
                      </div>
                    </div>

                    {/* Crescimento Percentual */}
                    <span className="text-[11px] font-bold text-[#10B981] shrink-0">
                      {t.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Card: Atividade recente */}
            <div
              id="atividade-recente-widget"
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3"
            >
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50">
                  Atividade recente
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigateToTab && onNavigateToTab('noticias')}
                  className="text-[11px] font-bold text-[#0066FF] hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Lista de Atividades */}
              <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
                {RECENT_ACTIVITY_DATA.map((act) => (
                  <div key={act.id} className="py-2.5 flex items-start gap-2.5">
                    {/* Avatar do Usuário/Organização */}
                    <div className="relative shrink-0 mt-0.5">
                      <img
                        src={act.avatar}
                        alt={act.user}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      {act.isOrg && (
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center text-white ring-1 ring-white dark:ring-slate-900">
                          <Leaf className="w-2 h-2" />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 text-[11.5px] leading-tight">
                      <p className="text-slate-700 dark:text-slate-300">
                        <strong className="font-bold text-[#0F172A] dark:text-slate-50">{act.user}</strong>{' '}
                        {act.action}{' '}
                        <strong className="font-bold text-[#0F172A] dark:text-slate-50">{act.target}</strong>
                      </p>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">
                        {act.timeAgo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Card CTA: "Não encontrou o que procura?" com Gradiente Azul/Verde e Rede de Avatares */}
            <div
              id="cta-nao-encontrou-card"
              className="relative rounded-2xl overflow-hidden p-5 text-white bg-gradient-to-br from-[#3D4ED8] via-[#006CE0] to-[#00A86B] shadow-md flex flex-col justify-between min-h-[160px]"
            >
              {/* Ilustração Abstrata de Nós de Rede e Avatares */}
              <div className="absolute right-2 -bottom-2 pointer-events-none opacity-90">
                <svg width="120" height="110" viewBox="0 0 120 110" fill="none" className="overflow-visible">
                  {/* Linhas de Conexão */}
                  <line x1="60" y1="40" x2="20" y2="75" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="60" y1="40" x2="95" y2="35" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="60" y1="40" x2="85" y2="85" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  {/* Círculo Central com Avatar */}
                  <circle cx="60" cy="40" r="16" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5" />
                  {/* Satélites */}
                  <circle cx="20" cy="75" r="11" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1.2" />
                  <circle cx="95" cy="35" r="10" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1.2" />
                  <circle cx="85" cy="85" r="12" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1.2" />
                </svg>
              </div>

              {/* Textos */}
              <div className="relative z-10 max-w-[210px] flex flex-col gap-1">
                <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                  Não encontrou o que procura?
                </h3>
                <p className="text-[11px] text-white/85 leading-snug">
                  Crie a sua comunidade e conecte pessoas em todo o mundo.
                </p>
              </div>

              {/* Botão Branco */}
              <div className="relative z-10 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#3D4ED8] text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <span>Criar Comunidade</span>
                  <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* MODAL: Criar Comunidade */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-lg w-full p-6 relative flex flex-col gap-4">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:text-slate-300 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Plus className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                  Criar Nova Comunidade
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">
                  Lidere um movimento em prol da sustentabilidade e gere impacto.
                </p>
              </div>
            </div>

            {createSuccessMsg ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 rounded-2xl text-center flex flex-col items-center gap-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                <h4 className="text-base font-bold text-emerald-900">Comunidade Criada com Sucesso!</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  A sua comunidade foi registada na rede VILA e já está visível para membros de todo o mundo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateCommunitySubmit} className="flex flex-col gap-3.5 mt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nome da Comunidade *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cidades Limpas 2030"
                    value={newCommunityName}
                    onChange={(e) => setNewCommunityName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Categoria</label>
                    <select
                      value={newCommunityCategory}
                      onChange={(e) => setNewCommunityCategory(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-emerald-500 outline-none"
                    >
                      <option value="Ambiente">Ambiente</option>
                      <option value="Tecnologia">Tecnologia</option>
                      <option value="Educação">Educação</option>
                      <option value="Direitos Humanos">Direitos Humanos</option>
                      <option value="Saúde">Saúde</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Alcance</label>
                    <select
                      value={newCommunityLocation}
                      onChange={(e) => setNewCommunityLocation(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-emerald-500 outline-none"
                    >
                      <option value="Global">Global</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Brasil">Brasil</option>
                      <option value="Angola">Angola</option>
                      <option value="Moçambique">Moçambique</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Descrição do Propósito
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Descreva as metas, iniciativas e o impacto que a sua comunidade procura alcançar..."
                    value={newCommunityDesc}
                    onChange={(e) => setNewCommunityDesc(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-[#059669] hover:bg-[#047857] rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Publicar Comunidade
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Detalhes da Comunidade */}
      {selectedCommunityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-lg w-full overflow-hidden relative flex flex-col">
            <button
              type="button"
              onClick={() => setSelectedCommunityModal(null)}
              className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-44 w-full">
              <img
                src={selectedCommunityModal.image}
                alt={selectedCommunityModal.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span
                className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm ${selectedCommunityModal.badgeColor}`}
              >
                {selectedCommunityModal.badgeLabel}
              </span>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                    {selectedCommunityModal.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{selectedCommunityModal.membersCount}</span>
                    <span>•</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">{selectedCommunityModal.locationTag}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleJoinCommunity(selectedCommunityModal.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    joinedCommunities.has(selectedCommunityModal.id)
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-[#059669] text-white hover:bg-[#047857]'
                  }`}
                >
                  {joinedCommunities.has(selectedCommunityModal.id) ? 'Membro Ativo ✓' : 'Juntar-se +'}
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 dark:text-slate-500 leading-relaxed">
                {selectedCommunityModal.description} Esta comunidade reúne voluntários, especialistas e entusiastas focados na implementação de soluções ecológicas escaláveis e impacto regenerativo.
              </p>

              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {selectedCommunityModal.avatars.map((av, i) => (
                      <img
                        key={i}
                        src={av}
                        alt="Avatar"
                        className="w-6 h-6 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500">
                    {selectedCommunityModal.extraAvatarsText} membros conectados
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Link da comunidade copiado para a área de transferência!');
                  }}
                  className="p-1.5 text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:text-slate-100 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Partilhar comunidade"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Detalhes da Iniciativa */}
      {selectedInitiativeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-lg w-full overflow-hidden relative flex flex-col">
            <button
              type="button"
              onClick={() => setSelectedInitiativeModal(null)}
              className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-44 w-full">
              <img
                src={selectedInitiativeModal.image}
                alt={selectedInitiativeModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span
                className={`absolute top-3 left-3 text-[10px] font-black text-white px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider ${selectedInitiativeModal.badgeBg}`}
              >
                {selectedInitiativeModal.badgeLabel}
              </span>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                    {selectedInitiativeModal.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{selectedInitiativeModal.subtitle}</span>
                    <span>•</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">{selectedInitiativeModal.status}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleRegisterInitiative(selectedInitiativeModal.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    registeredInitiatives.has(selectedInitiativeModal.id)
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-[#059669] text-white hover:bg-[#047857]'
                  }`}
                >
                  {registeredInitiatives.has(selectedInitiativeModal.id) ? 'Inscrito ✓' : 'Participar Agora'}
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 dark:text-slate-500 leading-relaxed">
                {selectedInitiativeModal.description} Esta ação está alinhada aos Objetivos de Desenvolvimento Sustentável das Nações Unidas, contando com voluntários dedicados à preservação ecológica no terreno.
              </p>

              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-xl p-3 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Users className="w-4 h-4 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  {selectedInitiativeModal.participantsCount}
                </span>

                <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  Ação Verificada pela VILA
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityEnvironmentView;
