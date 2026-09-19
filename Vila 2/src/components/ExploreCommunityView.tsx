import React, { useState, useMemo } from 'react';
import {
  Globe,
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
  Filter,
  Search,
  Sparkles,
  MapPin,
  Clock,
  Calendar,
  Heart,
  TrendingUp,
  Share2,
  Bookmark,
  ExternalLink,
} from 'lucide-react';

export interface ExploreCommunityViewProps {
  onNavigateToTab?: (tabId: string) => void;
  onNavigateToCategory?: (category: string) => void;
  onBackToOfficial?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenCreateCommunity?: () => void;
}

export type CommunityCategoryFilter =
  | 'todas'
  | 'ambiente'
  | 'educacao'
  | 'direitos-humanos'
  | 'cultura'
  | 'saude'
  | 'tecnologia'
  | 'empreendedorismo';

export interface CommunityCardData {
  id: string;
  name: string;
  category: 'ambiente' | 'educacao' | 'direitos-humanos' | 'cultura' | 'saude' | 'tecnologia' | 'empreendedorismo';
  categoryLabel: string;
  categoryBg: string;
  categoryText: string;
  image: string;
  membersCount: string;
  description: string;
  location: string;
  growth: string;
  tags: string[];
  avatars: string[];
  extraAvatars: string;
  joined?: boolean;
}

export interface GlobalCommunityEvent {
  id: string;
  day: string;
  month: string;
  title: string;
  category: string;
  categoryColor: string;
  location: string;
  time: string;
  attendees: string;
  image: string;
}

export interface TrendingGlobalCommunity {
  rank: number;
  id: string;
  name: string;
  category: string;
  categoryBg: string;
  members: string;
  growth: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ALL_COMMUNITIES: CommunityCardData[] = [
  {
    id: 'comm-1',
    name: 'Guardiões do Oceano Atlântico',
    category: 'ambiente',
    categoryLabel: 'Ambiente',
    categoryBg: 'bg-[#10B981]',
    categoryText: 'text-[#10B981]',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    membersCount: '142.850 membros',
    description: 'Rede de conservação marinha, limpeza costeira colaborativa e monitoramento por satélite no Atlântico Norte e Sul.',
    location: 'Portugal, Cabo Verde e Brasil',
    growth: '+14% este mês',
    tags: ['Oceanos', 'Biodiversidade', 'Costas'],
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+3.2K',
  },
  {
    id: 'comm-2',
    name: 'Educação Aberta Sem Fronteiras',
    category: 'educacao',
    categoryLabel: 'Educação',
    categoryBg: 'bg-[#3D4ED8]',
    categoryText: 'text-[#3D4ED8]',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    membersCount: '98.420 membros',
    description: 'Criação e distribuição multilíngue de materiais pedagógicos abertos para comunidades rurais e isoladas.',
    location: 'Moçambique, Angola e Timor-Leste',
    growth: '+18% este mês',
    tags: ['Inclusão', 'Acesso Livre', 'Pedagogia'],
    avatars: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+1.9K',
  },
  {
    id: 'comm-3',
    name: 'Vozes da Cidadania & Direitos',
    category: 'direitos-humanos',
    categoryLabel: 'Direitos Humanos',
    categoryBg: 'bg-[#DC2626]',
    categoryText: 'text-[#DC2626]',
    image: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=800&auto=format&fit=crop&q=80',
    membersCount: '76.190 membros',
    description: 'Advocacy global por justiça social, combate a discriminações e defesa dos direitos civis fundamentais.',
    location: 'Rede Internacional',
    growth: '+11% este mês',
    tags: ['Justiça Social', 'Igualdade', 'Defesa Civil'],
    avatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+840',
  },
  {
    id: 'comm-4',
    name: 'Património & Memória Coletiva',
    category: 'cultura',
    categoryLabel: 'Cultura',
    categoryBg: 'bg-[#F59E0B]',
    categoryText: 'text-[#F59E0B]',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=80',
    membersCount: '58.730 membros',
    description: 'Digitalização comunitária de património imaterial, tradições orais e celebrações artísticas locais.',
    location: 'América Latina e Sul da Europa',
    growth: '+9% este mês',
    tags: ['Tradições', 'Arte', 'Memória Viva'],
    avatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+1.1K',
  },
  {
    id: 'comm-5',
    name: 'Rede Saúde Primária Global',
    category: 'saude',
    categoryLabel: 'Saúde',
    categoryBg: 'bg-[#EC4899]',
    categoryText: 'text-[#EC4899]',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    membersCount: '89.600 membros',
    description: 'Médicos comunitários, sanitaristas e promotores de saúde promovendo medicina preventiva e saúde mental.',
    location: '12 Países em Desenvolvimento',
    growth: '+22% este mês',
    tags: ['Prevenção', 'Saúde Mental', 'Acesso'],
    avatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+2.4K',
  },
  {
    id: 'comm-6',
    name: 'Tecnologia Aberta & IA Ética',
    category: 'tecnologia',
    categoryLabel: 'Tecnologia',
    categoryBg: 'bg-[#6366F1]',
    categoryText: 'text-[#6366F1]',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    membersCount: '112.300 membros',
    description: 'Desenvolvedores e pesquisadores construindo ferramentas open source para resolver desafios ecológicos e sociais.',
    location: 'Hub Global Virtual',
    growth: '+27% este mês',
    tags: ['Open Source', 'IA Cívica', 'Dados Livres'],
    avatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+4.5K',
  },
  {
    id: 'comm-7',
    name: 'Startups de Impacto Circular',
    category: 'empreendedorismo',
    categoryLabel: 'Empreendedorismo',
    categoryBg: 'bg-[#8B5CF6]',
    categoryText: 'text-[#8B5CF6]',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80',
    membersCount: '63.450 membros',
    description: 'Aceleradora colaborativa para negócios regenerativos, microcrédito e cooperativas comunitárias sustentáveis.',
    location: 'Portugal, Brasil e Espanha',
    growth: '+19% este mês',
    tags: ['Economia Circular', 'ESG', 'Inovação Social'],
    avatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+1.3K',
  },
  {
    id: 'comm-8',
    name: 'Reflorestamento Nativo Ibérico',
    category: 'ambiente',
    categoryLabel: 'Ambiente',
    categoryBg: 'bg-[#10B981]',
    categoryText: 'text-[#10B981]',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    membersCount: '52.900 membros',
    description: 'Recuperação de encostas e matas nativas contra incêndios florestais através de sementes autóctones.',
    location: 'Península Ibérica',
    growth: '+15% este mês',
    tags: ['Florestas', 'Biodiversidade', 'Clima'],
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+950',
  },
];

const GLOBAL_EVENTS: GlobalCommunityEvent[] = [
  {
    id: 'ev-1',
    day: '15',
    month: 'OUT',
    title: 'Cúpula Global de Ação Comunitária 2026',
    category: 'Geral',
    categoryColor: 'bg-blue-600',
    location: 'Lisboa & Transmissão Global',
    time: '09:00 - 18:30 GMT',
    attendees: '3.420 participantes',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'ev-2',
    day: '22',
    month: 'OUT',
    title: 'Hackathon de Tecnologia & Clima',
    category: 'Tecnologia',
    categoryColor: 'bg-indigo-600',
    location: 'Online / Híbrido',
    time: '48 horas ininterruptas',
    attendees: '1.180 equipas',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'ev-3',
    day: '28',
    month: 'OUT',
    title: 'Fórum de Financiamento Comunitário',
    category: 'Empreendedorismo',
    categoryColor: 'bg-purple-600',
    location: 'São Paulo & Online',
    time: '14:00 - 19:00 GMT-3',
    attendees: '860 investidores de impacto',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
  },
];

const TRENDING_COMMUNITIES: TrendingGlobalCommunity[] = [
  {
    rank: 1,
    id: 'comm-1',
    name: 'Guardiões do Oceano Atlântico',
    category: 'Ambiente',
    categoryBg: 'bg-[#10B981]',
    members: '142.8K',
    growth: '+14%',
    icon: Leaf,
  },
  {
    rank: 2,
    id: 'comm-6',
    name: 'Tecnologia Aberta & IA Ética',
    category: 'Tecnologia',
    categoryBg: 'bg-[#6366F1]',
    members: '112.3K',
    growth: '+27%',
    icon: Cpu,
  },
  {
    rank: 3,
    id: 'comm-2',
    name: 'Educação Aberta Sem Fronteiras',
    category: 'Educação',
    categoryBg: 'bg-[#3D4ED8]',
    members: '98.4K',
    growth: '+18%',
    icon: GraduationCap,
  },
  {
    rank: 4,
    id: 'comm-5',
    name: 'Rede Saúde Primária Global',
    category: 'Saúde',
    categoryBg: 'bg-[#EC4899]',
    members: '89.6K',
    growth: '+22%',
    icon: HeartPulse,
  },
  {
    rank: 5,
    id: 'comm-7',
    name: 'Startups de Impacto Circular',
    category: 'Empreendedorismo',
    categoryBg: 'bg-[#8B5CF6]',
    members: '63.4K',
    growth: '+19%',
    icon: Rocket,
  },
];

const CATEGORIES_NAV = [
  { id: 'todas', label: 'Todas as Causas', icon: Globe, count: '45.2K' },
  { id: 'ambiente', label: 'Ambiente', icon: Leaf, count: '12.4K', color: 'text-[#10B981]' },
  { id: 'educacao', label: 'Educação', icon: GraduationCap, count: '8.9K', color: 'text-[#3D4ED8]' },
  { id: 'direitos-humanos', label: 'Direitos Humanos', icon: Scale, count: '6.3K', color: 'text-[#DC2626]' },
  { id: 'cultura', label: 'Cultura', icon: Palette, count: '5.1K', color: 'text-[#F59E0B]' },
  { id: 'saude', label: 'Saúde', icon: HeartPulse, count: '4.8K', color: 'text-[#EC4899]' },
  { id: 'tecnologia', label: 'Tecnologia', icon: Cpu, count: '4.2K', color: 'text-[#6366F1]' },
  { id: 'empreendedorismo', label: 'Empreendedorismo', icon: Rocket, count: '3.5K', color: 'text-[#8B5CF6]' },
];

export const ExploreCommunityView: React.FC<ExploreCommunityViewProps> = ({
  onNavigateToTab,
  onNavigateToCategory,
  onBackToOfficial,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenMobileMenu,
  onOpenCreateCommunity,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CommunityCategoryFilter>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('todas');
  const [sortBy, setSortBy] = useState<'populares' | 'recentes' | 'crescimento'>('populares');
  const [joinedCommunities, setJoinedCommunities] = useState<Record<string, boolean>>({});
  const [selectedCommunityModal, setSelectedCommunityModal] = useState<CommunityCardData | null>(null);

  const toggleJoin = (id: string) => {
    setJoinedCommunities((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredCommunities = useMemo(() => {
    return ALL_COMMUNITIES.filter((item) => {
      if (selectedCategory !== 'todas' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesLocation && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-slate-950 min-h-screen text-[#0F1E3D] dark:text-slate-50 pb-16">
      {/* Container Principal Centralizado */}
      <div className="max-w-[1600px] mx-auto px-3.5 sm:px-5 lg:px-6 pt-4 sm:pt-6 space-y-6">

        {/* Barra Superior de Categorias Rápidas */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES_NAV.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (cat.id === 'todas') {
                    setSelectedCategory('todas');
                  } else {
                    setSelectedCategory(cat.id as CommunityCategoryFilter);
                  }
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0F1E3D] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : cat.color || 'text-slate-500 dark:text-slate-400 dark:text-slate-500'}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 dark:text-slate-500'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Hero Banner: Explorar Comunidade */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F1E3D] via-[#1E3A8A] to-[#0284C7] p-6 sm:p-8 lg:p-10 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-cyan-300" />
              <span>Explorar o Ecossistema Global VILA</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Outfit']">
              Descubra e Participe nas Comunidades que Transformam o Mundo
            </h1>

            <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-xl">
              Conecte-se com mais de 7.8 milhões de ativistas, cientistas, educadores e empreendedores sociais em 195 países. Junte-se a uma causa ou lidere a sua própria iniciativa comunitária.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenCreateCommunity}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-[#10B981] hover:bg-[#059669] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Criar Nova Comunidade</span>
              </button>

              <button
                type="button"
                onClick={onOpenAiAssistant}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-white/15 hover:bg-white/20 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Pedir Recomendação à VILA AI</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar no Rodapé do Banner */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/15">
            <div>
              <p className="text-lg sm:text-2xl font-black font-['Outfit']">45.230+</p>
              <p className="text-[11px] text-slate-300">Comunidades Ativas</p>
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-black font-['Outfit']">195</p>
              <p className="text-[11px] text-slate-300">Países Representados</p>
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-black font-['Outfit']">7.8M+</p>
              <p className="text-[11px] text-slate-300">Membros Globais</p>
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-black font-['Outfit']">7 Causas</p>
              <p className="text-[11px] text-slate-300">Impacto Transversal</p>
            </div>
          </div>
        </div>

        {/* Barra de Pesquisa e Filtros */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
          {/* Campo de Pesquisa */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por nome, palavra-chave, causa ou localidade..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3D4ED8]/30 focus:border-[#3D4ED8] text-[#0F1E3D] dark:text-slate-50 placeholder-slate-400 transition-all"
            />
          </div>

          {/* Filtros em Linha */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ordenar:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="populares">Mais Populares</option>
              <option value="crescimento">Maior Crescimento</option>
              <option value="recentes">Mais Recentes</option>
            </select>

            {onBackToOfficial && (
              <button
                type="button"
                onClick={onBackToOfficial}
                className="px-3 py-2 text-xs font-bold text-[#3D4ED8] hover:bg-blue-50 dark:bg-blue-500/10 border border-blue-200 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Página Oficial
              </button>
            )}
          </div>
        </div>

        {/* Layout em 2 Colunas: Grid de Comunidades (Esquerda) + Sidebar de Destaques (Direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Coluna Principal: Lista de Comunidades (8 colunas) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0F1E3D] dark:text-slate-50 font-['Outfit']">
                  {selectedCategory === 'todas'
                    ? 'Todas as Comunidades'
                    : `Comunidades de ${CATEGORIES_NAV.find((c) => c.id === selectedCategory)?.label}`}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">
                  A mostrar {filteredCommunities.length} comunidades encontradas
                </p>
              </div>

              {selectedCategory !== 'todas' && onNavigateToCategory && (
                <button
                  type="button"
                  onClick={() => onNavigateToCategory(selectedCategory)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#3D4ED8] hover:underline cursor-pointer"
                >
                  <span>Ver Página Exclusiva</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Grid dos Cards de Comunidade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCommunities.map((comm) => {
                const isJoined = joinedCommunities[comm.id];

                return (
                  <div
                    key={comm.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
                  >
                    {/* Imagem de Capa com Badge da Categoria */}
                    <div className="relative h-36 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={comm.image}
                        alt={comm.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span
                        className={`absolute top-2.5 left-2.5 text-[9px] font-black text-white uppercase tracking-wider px-2.5 py-1 rounded-md shadow-2xs ${comm.categoryBg}`}
                      >
                        {comm.categoryLabel}
                      </span>
                      <span className="absolute bottom-2.5 right-2.5 text-[10px] font-semibold text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        {comm.growth}
                      </span>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h3
                            onClick={() => setSelectedCommunityModal(comm)}
                            className="text-sm font-bold text-[#0F1E3D] dark:text-slate-50 hover:text-[#3D4ED8] cursor-pointer line-clamp-1"
                          >
                            {comm.name}
                          </h3>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed">
                          {comm.description}
                        </p>
                      </div>

                      {/* Localização e Tags */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 dark:text-slate-500">
                          <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                          <span className="truncate">{comm.location}</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {comm.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 dark:text-slate-500 px-2 py-0.5 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Rodapé do Card: Avatares + Botão de Aderir */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <div className="flex -space-x-1.5">
                            {comm.avatars.map((av, idx) => (
                              <img
                                key={idx}
                                src={av}
                                alt="Membro"
                                className="w-5 h-5 rounded-full border border-white object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500">
                            {comm.membersCount}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleJoin(comm.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                            isJoined
                              ? 'bg-emerald-50 dark:bg-emerald-500/10 text-[#10B981] border border-emerald-200'
                              : 'bg-[#3D4ED8] text-white hover:bg-blue-700 shadow-2xs'
                          }`}
                        >
                          {isJoined ? 'Aderido ✓' : 'Aderir'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredCommunities.length === 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center space-y-3">
                <Search className="w-8 h-8 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-[#0F1E3D] dark:text-slate-50">Nenhuma comunidade encontrada</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">
                  Tente ajustar a sua pesquisa ou selecionar outra categoria.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('todas');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-bold text-[#3D4ED8] bg-blue-50 dark:bg-blue-500/10 rounded-xl"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>

          {/* Coluna Lateral: Tendências, Eventos e VILA AI (4 colunas) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Card de Tendências Globais */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#3D4ED8]" />
                  <h3 className="text-sm font-bold text-[#0F1E3D] dark:text-slate-50 font-['Outfit']">
                    Em Alta no Ecossistema
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">Top 5</span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {TRENDING_COMMUNITIES.map((trend) => {
                  const Icon = trend.icon;

                  return (
                    <div
                      key={trend.id}
                      onClick={() => {
                        const target = ALL_COMMUNITIES.find((c) => c.id === trend.id);
                        if (target) setSelectedCommunityModal(target);
                      }}
                      className="py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl px-2 -mx-2 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xs font-black text-slate-400 dark:text-slate-500 group-hover:text-[#3D4ED8] w-4 shrink-0">
                          0{trend.rank}
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 dark:text-slate-500 shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#0F1E3D] dark:text-slate-50 truncate group-hover:text-[#3D4ED8]">
                            {trend.name}
                          </p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                            {trend.category} • {trend.members} membros
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded shrink-0">
                        {trend.growth}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Próximos Eventos Globais */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#3D4ED8]" />
                  <h3 className="text-sm font-bold text-[#0F1E3D] dark:text-slate-50 font-['Outfit']">
                    Eventos Comunitários
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.('eventos')}
                  className="text-[10px] font-bold text-[#3D4ED8] hover:underline cursor-pointer"
                >
                  Ver todos
                </button>
              </div>

              <div className="space-y-3">
                {GLOBAL_EVENTS.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all space-y-2"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                        <span className="text-xs font-black text-[#3D4ED8] leading-none">{ev.day}</span>
                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">{ev.month}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#0F1E3D] dark:text-slate-50 line-clamp-1">{ev.title}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                          <span>{ev.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500">
                      <span>{ev.location}</span>
                      <span className="font-semibold text-[#3D4ED8]">{ev.attendees}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Banner VILA AI Assistant */}
            <div className="rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-5 text-white shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#3D4ED8] to-[#10B981] flex items-center justify-center text-white shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-['Outfit']">VILA AI Matchmaker</h4>
                  <p className="text-[10px] text-slate-300">Descubra grupos compatíveis com os seus interesses</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                A inteligência coletiva VILA analisa o seu perfil para sugerir comunidades onde a sua contribuição terá o maior impacto.
              </p>

              <button
                type="button"
                onClick={onOpenAiAssistant}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#3D4ED8] to-[#10B981] text-white text-xs font-bold shadow-xs hover:opacity-95 transition-all text-center cursor-pointer"
              >
                Obter Recomendações Personalizadas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes da Comunidade */}
      {selectedCommunityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800">
              <img
                src={selectedCommunityModal.image}
                alt={selectedCommunityModal.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedCommunityModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <span
                className={`absolute bottom-3 left-3 text-[10px] font-black text-white uppercase px-3 py-1 rounded-md shadow-sm ${selectedCommunityModal.categoryBg}`}
              >
                {selectedCommunityModal.categoryLabel}
              </span>
            </div>

            <div className="p-6 pt-0 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#0F1E3D] dark:text-slate-50 font-['Outfit']">
                  {selectedCommunityModal.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">
                  <span>{selectedCommunityModal.membersCount}</span>
                  <span>•</span>
                  <span>{selectedCommunityModal.location}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 dark:text-slate-500 leading-relaxed">
                {selectedCommunityModal.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {selectedCommunityModal.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 dark:text-slate-500 px-2.5 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                {onNavigateToCategory && (
                  <button
                    type="button"
                    onClick={() => {
                      const cat = selectedCommunityModal.category;
                      setSelectedCommunityModal(null);
                      onNavigateToCategory(cat);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Ir para Causa
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    toggleJoin(selectedCommunityModal.id);
                    setSelectedCommunityModal(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#3D4ED8] hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer text-center"
                >
                  {joinedCommunities[selectedCommunityModal.id] ? 'Deixar Comunidade' : 'Aderir à Comunidade'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreCommunityView;
