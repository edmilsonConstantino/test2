import React, { useState, useMemo } from 'react';
import {
  Globe,
  Plus,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
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
  Filter,
  Layers,
  LayoutGrid,
  List,
  Droplets,
  Lightbulb,
  Shield,
  BookOpen,
  Building2,
  Brain,
  Sparkles,
  Heart,
  Wind,
  X,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { BreadcrumbItem } from './Topbar';

export interface CommunityExploreViewProps {
  onNavigateToTab?: (tabId: string) => void;
  onNavigateToCategory?: (category: string) => void;
  onBackToOfficial?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenCreateCommunity?: () => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

// Carousel featured community interface
interface FeaturedCommunitySlide {
  id: string;
  name: string;
  badge: string;
  badgeBg: string;
  members: string;
  description: string;
  tag: string;
  tagColor: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  avatars: string[];
  extraAvatars: string;
  category: string;
}

// Detailed list community row interface
interface DetailedCommunityRow {
  id: string;
  name: string;
  members: string;
  membersNum: number;
  type: 'Organização' | 'ONG' | 'Comunidade de Interesse' | 'Iniciativa Local' | 'Rede Profissional';
  description: string;
  location: string;
  languages: string;
  status: 'Ativa' | 'Muito Ativa' | 'Em Formação';
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
}

// Trending Community Interface (reused)
interface TrendingItem {
  rank: number;
  id: string;
  name: string;
  members: string;
  growth: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

// Recent Activity Interface (reused)
interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

// 1. CAROUSEL FEATURED DATA
const FEATURED_SLIDES: FeaturedCommunitySlide[] = [
  {
    id: 'feat-1',
    name: 'Ação Climática Global',
    badge: 'EM ALTA',
    badgeBg: 'bg-[#15803D]',
    members: '128.540 membros',
    description: 'Unindo vozes e soluções para proteger o nosso planeta.',
    tag: 'Ambiente',
    tagColor: 'text-[#16A34A] bg-[#DCFCE7] border-[#BBF7D0]',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=700&auto=format&fit=crop&q=80',
    icon: Leaf,
    iconBg: 'bg-white',
    iconColor: 'text-[#16A34A]',
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+2.3K',
    category: 'ambiente',
  },
  {
    id: 'feat-2',
    name: 'Inovação & Tecnologia',
    badge: 'POPULAR',
    badgeBg: 'bg-[#7C3AED]',
    members: '96.432 membros',
    description: 'Explorando o futuro da tecnologia para o bem da humanidade.',
    tag: 'Tecnologia',
    tagColor: 'text-[#7C3AED] bg-[#EDE9FE] border-[#DDD6FE]',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&auto=format&fit=crop&q=80',
    icon: Cpu,
    iconBg: 'bg-white',
    iconColor: 'text-[#7C3AED]',
    avatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+1.8K',
    category: 'tecnologia',
  },
  {
    id: 'feat-3',
    name: 'Direitos Humanos',
    badge: 'EM DESTAQUE',
    badgeBg: 'bg-[#EA580C]',
    members: '64.231 membros',
    description: 'Promovendo dignidade, igualdade e justiça para todos.',
    tag: 'Direitos Humanos',
    tagColor: 'text-[#E11D48] bg-[#FFE4E6] border-[#FECDD3]',
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=700&auto=format&fit=crop&q=80',
    icon: Heart,
    iconBg: 'bg-white',
    iconColor: 'text-[#E11D48]',
    avatars: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+1.5K',
    category: 'direitos-humanos',
  },
  {
    id: 'feat-4',
    name: 'Educação Sem Fronteiras',
    badge: 'NOVO',
    badgeBg: 'bg-[#3D4ED8]',
    members: '78.911 membros',
    description: 'Educação inclusiva e de qualidade para transformar vidas.',
    tag: 'Educação',
    tagColor: 'text-[#3D4ED8] bg-[#DBEAFE] border-[#BFDBFE]',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=700&auto=format&fit=crop&q=80',
    icon: GraduationCap,
    iconBg: 'bg-white',
    iconColor: 'text-[#3D4ED8]',
    avatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+1.2K',
    category: 'educacao',
  },
  {
    id: 'feat-5',
    name: 'Saúde Mental Global',
    badge: 'CRESCENDO',
    badgeBg: 'bg-[#DB2777]',
    members: '52.840 membros',
    description: 'Acolhimento humanizado e suporte psicossocial comunitário aberto.',
    tag: 'Saúde',
    tagColor: 'text-[#DB2777] bg-[#FCE7F3] border-[#FBCFE8]',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&auto=format&fit=crop&q=80',
    icon: Brain,
    iconBg: 'bg-white',
    iconColor: 'text-[#DB2777]',
    avatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+980',
    category: 'saude',
  },
  {
    id: 'feat-6',
    name: 'Cidades Sustentáveis & Regenerativas',
    badge: 'DESTAQUE',
    badgeBg: 'bg-[#059669]',
    members: '41.300 membros',
    description: 'Urbanismo verde, mobilidade ativa e hortas urbanas agroecológicas.',
    tag: 'Ambiente',
    tagColor: 'text-[#059669] bg-[#D1FAE5] border-[#A7F3D0]',
    image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=700&auto=format&fit=crop&q=80',
    icon: Building2,
    iconBg: 'bg-white',
    iconColor: 'text-[#059669]',
    avatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+1.1K',
    category: 'ambiente',
  },
];

// 2. DETAILED LIST DATA (Exact items from image.png + complementary rich items)
const DETAILED_COMMUNITIES: DetailedCommunityRow[] = [
  {
    id: 'det-1',
    name: 'Água para Todos',
    members: '12.450 membros',
    membersNum: 12450,
    type: 'Organização',
    description: 'Trabalhamos para garantir acesso à água potável para comunidades em todo o mundo.',
    location: 'Global',
    languages: 'PT, EN, ES',
    status: 'Ativa',
    category: 'ambiente',
    icon: Droplets,
    iconBg: 'bg-[#06B6D4] text-white',
  },
  {
    id: 'det-2',
    name: 'Mulheres que Transformam',
    members: '8.732 membros',
    membersNum: 8732,
    type: 'Comunidade de Interesse',
    description: 'Uma rede global de mulheres líderes e empreendedoras que inspiram mudanças positivas.',
    location: 'Global',
    languages: 'PT, EN, FR',
    status: 'Ativa',
    category: 'empreendedorismo',
    icon: Rocket,
    iconBg: 'bg-[#8B5CF6] text-white',
  },
  {
    id: 'det-3',
    name: 'Startups for Good',
    members: '5.981 membros',
    membersNum: 5981,
    type: 'Rede Profissional',
    description: 'Conectamos empreendedores que criam soluções sustentáveis para desafios sociais e ambientais.',
    location: 'Global',
    languages: 'EN',
    status: 'Ativa',
    category: 'empreendedorismo',
    icon: Lightbulb,
    iconBg: 'bg-[#EAB308] text-white',
  },
  {
    id: 'det-4',
    name: 'Guardiões da Biodiversidade Atlântica',
    members: '14.280 membros',
    membersNum: 14280,
    type: 'ONG',
    description: 'Conservação de ecossistemas costeiros, monitoramento marinho e combate ao lixo nos oceanos.',
    location: 'Portugal, Cabo Verde e Brasil',
    languages: 'PT, ES',
    status: 'Muito Ativa',
    category: 'ambiente',
    icon: Leaf,
    iconBg: 'bg-[#10B981] text-white',
  },
  {
    id: 'det-5',
    name: 'Inclusão Digital & IA Aberta',
    members: '18.920 membros',
    membersNum: 18920,
    type: 'Iniciativa Local',
    description: 'Democratização do acesso à tecnologia e alfabetização digital para populações periféricas e rurais.',
    location: 'Moçambique e Angola',
    languages: 'PT, EN',
    status: 'Ativa',
    category: 'tecnologia',
    icon: Cpu,
    iconBg: 'bg-[#6366F1] text-white',
  },
  {
    id: 'det-6',
    name: 'Defensores da Dignidade Humana',
    members: '22.150 membros',
    membersNum: 22150,
    type: 'Organização',
    description: 'Advocacy internacional e assessoria jurídica voluntária para garantia dos direitos fundamentais.',
    location: 'Global',
    languages: 'PT, EN, ES, FR',
    status: 'Ativa',
    category: 'direitos-humanos',
    icon: Shield,
    iconBg: 'bg-[#EF4444] text-white',
  },
  {
    id: 'det-7',
    name: 'Rede Pedagógica Sem Fronteiras',
    members: '16.890 membros',
    membersNum: 16890,
    type: 'Rede Profissional',
    description: 'Desenvolvimento e distribuição colaborativa de materiais escolares abertos em comunidades isoladas.',
    location: 'Timor-Leste, Brasil e Portugal',
    languages: 'PT',
    status: 'Ativa',
    category: 'educacao',
    icon: BookOpen,
    iconBg: 'bg-[#3D4ED8] text-white',
  },
  {
    id: 'det-8',
    name: 'Saúde Mental na Comunidade',
    members: '11.340 membros',
    membersNum: 11340,
    type: 'Comunidade de Interesse',
    description: 'Círculos de apoio emocional, prevenção de burnout social e assistência psicológica comunitária.',
    location: 'Global',
    languages: 'PT, EN',
    status: 'Muito Ativa',
    category: 'saude',
    icon: HeartPulse,
    iconBg: 'bg-[#F43F5E] text-white',
  },
];

// 3. TRENDING COMMUNITIES (Matching right column in image)
const TRENDING_LIST: TrendingItem[] = [
  {
    rank: 1,
    id: 'trend-1',
    name: 'Saúde Mental Global',
    members: '45.2K membros',
    growth: '▲ 18%',
    icon: Brain,
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-600',
  },
  {
    rank: 2,
    id: 'trend-2',
    name: 'Mulheres que Inspiram',
    members: '38.7K membros',
    growth: '▲ 15%',
    icon: Heart,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    rank: 3,
    id: 'trend-3',
    name: 'Energia Renovável',
    members: '32.1K membros',
    growth: '▲ 12%',
    icon: Wind,
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    rank: 4,
    id: 'trend-4',
    name: 'Empreendedorismo Social',
    members: '28.9K membros',
    growth: '▲ 10%',
    icon: Rocket,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    rank: 5,
    id: 'trend-5',
    name: 'Cidades Sustentáveis',
    members: '26.3K membros',
    growth: '▲ 9%',
    icon: Building2,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
];

// 4. RECENT ACTIVITY (Matching right column in image)
const RECENT_ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: 'act-1',
    actor: 'Maria Silva',
    action: 'publicou uma atualização em',
    target: 'Ação Climática Global',
    time: 'Há 1 hora',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'act-2',
    actor: 'João Pereira',
    action: 'juntou-se à comunidade',
    target: 'Inovação & Tecnologia',
    time: 'Há 2 horas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'act-3',
    actor: 'Ana Costa',
    action: 'comentou numa discussão em',
    target: 'Educação Sem Fronteiras',
    time: 'Há 3 horas',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'act-4',
    actor: 'Green Earth',
    action: 'iniciou um novo projeto em',
    target: 'Cidades Sustentáveis',
    time: 'Há 5 horas',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
  },
];

export const CommunityExploreView: React.FC<CommunityExploreViewProps> = ({
  onNavigateToTab,
  onNavigateToCategory,
  onBackToOfficial,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenMobileMenu,
  onOpenCreateCommunity,
  onBreadcrumbChange,
}) => {
  // Category Pill Filter
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [isMaisDropdownOpen, setIsMaisDropdownOpen] = useState<boolean>(false);

  // Filters State (from left column)
  const [communityType, setCommunityType] = useState<string>('Todas');
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Qualquer idioma');
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('Qualquer lugar');
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);

  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const totalSlides = FEATURED_SLIDES.length;
  // We can advance 1 slide per step, max index totalSlides - 1
  const maxSlideIndex = Math.max(0, totalSlides - 4);

  // Sort and View Mode State
  const [sortBy, setSortBy] = useState<'relevantes' | 'membros' | 'recentes' | 'alfabetica'>('relevantes');
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Joined Communities tracking
  const [joinedCommunities, setJoinedCommunities] = useState<Set<string>>(new Set(['det-1']));
  const [detailModalItem, setDetailModalItem] = useState<DetailedCommunityRow | null>(null);

  const handleClearFilters = () => {
    setCommunityType('Todas');
    setSelectedSizes(new Set());
    setSelectedLanguage('Qualquer idioma');
    setSelectedLocation('Qualquer lugar');
    setSelectedCategory('todas');
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => {
      const next = new Set(prev);
      if (next.has(size)) next.delete(size);
      else next.add(size);
      return next;
    });
  };

  const toggleJoin = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setJoinedCommunities((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filtered List
  const filteredCommunities = useMemo(() => {
    return DETAILED_COMMUNITIES.filter((item) => {
      // Category filter
      if (selectedCategory !== 'todas' && item.category !== selectedCategory) {
        return false;
      }
      // Type filter
      if (communityType !== 'Todas') {
        if (communityType === 'Organizações' && item.type !== 'Organização') return false;
        if (communityType === 'ONGs' && item.type !== 'ONG') return false;
        if (communityType === 'Grupos de Interesse' && item.type !== 'Comunidade de Interesse') return false;
        if (communityType === 'Iniciativas Locais' && item.type !== 'Iniciativa Local') return false;
        if (communityType === 'Redes Profissionais' && item.type !== 'Rede Profissional') return false;
      }
      // Size filter
      if (selectedSizes.size > 0) {
        let sizeMatch = false;
        if (selectedSizes.has('1 - 100 membros') && item.membersNum <= 100) sizeMatch = true;
        if (selectedSizes.has('101 - 1.000 membros') && item.membersNum > 100 && item.membersNum <= 1000) sizeMatch = true;
        if (selectedSizes.has('1.001 - 10.000 membros') && item.membersNum > 1000 && item.membersNum <= 10000) sizeMatch = true;
        if (selectedSizes.has('10.000+ membros') && item.membersNum > 10000) sizeMatch = true;
        if (!sizeMatch) return false;
      }
      // Language filter
      if (selectedLanguage !== 'Qualquer idioma') {
        if (selectedLanguage === 'Português' && !item.languages.includes('PT')) return false;
        if (selectedLanguage === 'Inglês' && !item.languages.includes('EN')) return false;
        if (selectedLanguage === 'Espanhol' && !item.languages.includes('ES')) return false;
        if (selectedLanguage === 'Francês' && !item.languages.includes('FR')) return false;
      }
      // Location filter
      if (selectedLocation !== 'Qualquer lugar') {
        if (!item.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'membros') return b.membersNum - a.membersNum;
      if (sortBy === 'alfabetica') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedCategory, communityType, selectedSizes, selectedLanguage, selectedLocation, sortBy]);

  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => (prev <= 0 ? maxSlideIndex : prev - 1));
  };

  return (
    <div id="community-explore-view" className="w-full bg-[#F8FAFC] min-h-screen text-[#0F172A] flex flex-col pb-16">
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-6">

        {/* 1. Header com Título, Subtítulo e Botão "Criar Comunidade +" */}
        <section id="explore-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F1E3D] tracking-tight font-['Outfit'] leading-tight">
              Explorar Comunidade
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] font-normal leading-relaxed">
              Descubra comunidades globais, conecte-se com pessoas que partilham dos mesmos interesses e participe em iniciativas que transformam o mundo.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCreateCommunity}
            id="btn-criar-comunidade-explore"
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3D4ED8] hover:bg-[#2D3BA8] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Criar Comunidade</span>
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </section>

        {/* 2. Fita Horizontal de Categorias (com "Todas" selecionada por padrão) */}
        <nav
          id="categories-ribbon-explore"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 relative"
          aria-label="Categorias de Comunidades"
        >
          {[
            { id: 'todas', label: 'Todas', icon: Layers },
            { id: 'ambiente', label: 'Ambiente', icon: Leaf },
            { id: 'tecnologia', label: 'Tecnologia', icon: Cpu },
            { id: 'educacao', label: 'Educação', icon: GraduationCap },
            { id: 'direitos-humanos', label: 'Direitos Humanos', icon: Scale },
            { id: 'saude', label: 'Saúde', icon: HeartPulse },
            { id: 'empreendedorismo', label: 'Empreendedorismo', icon: Rocket },
            { id: 'cultura', label: 'Cultura', icon: Palette },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (cat.id !== 'todas' && onNavigateToCategory) {
                    onNavigateToCategory(cat.id);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-[#3D4ED8] text-white shadow-xs'
                    : 'bg-white border border-slate-200/90 text-[#334155] hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} strokeWidth={2.2} />
                <span>{cat.label}</span>
              </button>
            );
          })}

          {/* Botão Mais */}
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
                  'Turismo & Hospitalidade',
                  'Desporto & Vida Ativa',
                  'Habitação Acessível',
                  'Igualdade de Género',
                  'Juventude Global',
                  'Proteção Social',
                  'Paz e Segurança',
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

        {/* 3. Grid Principal de Três Colunas (Filtros | Conteúdo Central | Tendências & Atividade) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* ======================================================== */}
          {/* COLUNA ESQUERDA: Filtros (Sem secção de temas)          */}
          {/* ======================================================== */}
          <aside
            id="filtros-explorar-sidebar"
            className="lg:col-span-3 xl:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-4 sticky top-20"
          >
            {/* Header Filtros */}
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                Filtros
              </span>
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-[11.5px] font-semibold text-[#0D9488] hover:text-[#047857] hover:underline transition-colors cursor-pointer"
              >
                Limpar tudo
              </button>
            </div>

            {/* Tipo de comunidade (Radio) */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#0F172A]">Tipo de comunidade</span>
              <div className="flex flex-col gap-1.5">
                {['Todas', 'Organizações', 'ONGs', 'Grupos de Interesse', 'Iniciativas Locais', 'Redes Profissionais'].map((type) => {
                  const isChecked = communityType === type;
                  return (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-[11.5px] text-[#334155] hover:text-slate-900 cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        name="explore-type"
                        checked={isChecked}
                        onChange={() => setCommunityType(type)}
                        className="sr-only"
                      />
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'border-[#3D4ED8] bg-[#3D4ED8]'
                            : 'border-slate-300 bg-white hover:border-slate-400'
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

            {/* Tamanho (Checkboxes) */}
            <div className="flex flex-col gap-2 pt-1 border-t border-slate-100">
              <span className="text-xs font-bold text-[#0F172A]">Tamanho</span>
              <div className="flex flex-col gap-1.5">
                {['1 - 100 membros', '101 - 1.000 membros', '1.001 - 10.000 membros', '10.000+ membros'].map((size) => {
                  const isChecked = selectedSizes.has(size);
                  return (
                    <label
                      key={size}
                      className="flex items-center gap-2 text-[11.5px] text-[#334155] hover:text-slate-900 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSize(size)}
                        className="sr-only"
                      />
                      <span
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'border-[#3D4ED8] bg-[#3D4ED8] text-white'
                            : 'border-slate-300 bg-white hover:border-slate-400'
                        }`}
                      >
                        {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                      <span>{size}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Idioma (Dropdown) */}
            <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-100 relative">
              <span className="text-xs font-bold text-[#0F172A]">Idioma</span>
              <button
                type="button"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 bg-[#F8FAFC] border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span className="truncate">{selectedLanguage}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLanguageOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-30 text-xs font-medium">
                  {['Qualquer idioma', 'Português', 'Inglês', 'Espanhol', 'Francês'].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsLanguageOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between text-slate-700"
                    >
                      <span>{lang}</span>
                      {selectedLanguage === lang && <Check className="w-3 h-3 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* País / Região (Dropdown) */}
            <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-100 relative">
              <span className="text-xs font-bold text-[#0F172A]">País / Região</span>
              <button
                type="button"
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 bg-[#F8FAFC] border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span className="truncate">{selectedLocation}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLocationOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-30 text-xs font-medium">
                  {['Qualquer lugar', 'Global', 'Portugal', 'Brasil', 'Angola', 'Moçambique', 'Cabo Verde', 'Espanha'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsLocationOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between text-slate-700"
                    >
                      <span>{loc}</span>
                      {selectedLocation === loc && <Check className="w-3 h-3 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                // Trigger quick visual confirmation
              }}
              className="w-full py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs shadow-xs transition-all cursor-pointer mt-1"
            >
              Aplicar Filtros
            </button>
          </aside>

          {/* ======================================================== */}
          {/* COLUNA CENTRAL: Carrossel em Destaque + Lista Detalhada */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-6">

            {/* 1. SEÇÃO: Comunidades em destaque (CARROSSEL COM DOTS) */}
            <section id="comunidades-destaque-carousel" className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-[#0F172A] font-['Outfit']">
                  Comunidades em destaque
                </h2>
                <button
                  type="button"
                  onClick={() => setCarouselIndex((prev) => (prev + 1) % (totalSlides - 1))}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Contêiner do Carrossel com Seta Flutuante */}
              <div className="relative group">
                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex gap-3 transition-transform duration-500 ease-out"
                    style={{
                      transform: `translateX(-${carouselIndex * 260}px)`,
                    }}
                  >
                    {FEATURED_SLIDES.map((slide) => {
                      const IconComponent = slide.icon;

                      return (
                        <article
                          key={slide.id}
                          className="w-[245px] sm:w-[250px] shrink-0 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group/card"
                        >
                          {/* Banner com Imagem, Badge e Ícone Redondo */}
                          <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                            <img
                              src={slide.image}
                              alt={slide.name}
                              className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <span
                              className={`absolute top-2.5 left-2.5 text-[8.5px] font-black text-white uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs ${slide.badgeBg}`}
                            >
                              {slide.badge}
                            </span>

                            {/* Ícone Redondo Flutuante */}
                            <div
                              className="absolute -bottom-3.5 left-3 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-xs"
                            >
                              <IconComponent className={`w-4 h-4 ${slide.iconColor}`} strokeWidth={2.4} />
                            </div>
                          </div>

                          {/* Conteúdo Textual */}
                          <div className="p-3 pt-4 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit'] line-clamp-1 group-hover/card:text-blue-600 transition-colors">
                                {slide.name}
                              </h3>
                              <p className="text-[10px] text-slate-500 mb-1 font-medium">
                                {slide.members}
                              </p>
                              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed mb-2.5">
                                {slide.description}
                              </p>
                            </div>

                            <div className="space-y-2.5 pt-1 border-t border-slate-100">
                              <span
                                className={`inline-block text-[9.5px] font-bold px-2 py-0.5 rounded border ${slide.tagColor}`}
                              >
                                {slide.tag}
                              </span>

                              {/* Linha de Membros/Avatares */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center -space-x-1.5 overflow-hidden">
                                  {slide.avatars.map((av, avIdx) => (
                                    <img
                                      key={avIdx}
                                      src={av}
                                      alt="Membro"
                                      className="inline-block h-5 w-5 rounded-full ring-1.5 ring-white object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  ))}
                                </div>
                                <span className="text-[10px] font-bold text-slate-500">
                                  {slide.extraAvatars}
                                </span>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>

                {/* Seta de Navegação Direita */}
                <button
                  type="button"
                  onClick={handleNextSlide}
                  title="Próximas comunidades"
                  className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer z-10 transition-transform hover:scale-105"
                  aria-label="Avançar carrossel"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Seta de Navegação Esquerda (visível se index > 0) */}
                {carouselIndex > 0 && (
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    title="Comunidades anteriores"
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer z-10 transition-transform hover:scale-105"
                    aria-label="Voltar carrossel"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Bolinhas de Paginação (Dots) */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {[0, 1, 2, 3].map((dotIndex) => {
                  const isActive = carouselIndex === dotIndex;
                  return (
                    <button
                      key={dotIndex}
                      type="button"
                      onClick={() => setCarouselIndex(dotIndex)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        isActive ? 'w-4 bg-[#3D4ED8]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Slide ${dotIndex + 1}`}
                    />
                  );
                })}
              </div>
            </section>

            {/* 2. SEÇÃO: Lista de Resultados (X comunidades encontradas + ordenar + toggle grade/lista) */}
            <section id="lista-resultados-explorar" className="flex flex-col gap-3">
              {/* Barra de Controles da Lista */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
                <span className="text-xs sm:text-sm font-bold text-slate-700">
                  {filteredCommunities.length} comunidades encontradas
                </span>

                <div className="flex items-center gap-2">
                  {/* Dropdown Ordenar por */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsSortOpen(!isSortOpen)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
                    >
                      <span className="text-slate-400 font-normal">Ordenar por:</span>
                      <span>
                        {sortBy === 'relevantes'
                          ? 'Mais relevantes'
                          : sortBy === 'membros'
                          ? 'Mais membros'
                          : sortBy === 'recentes'
                          ? 'Recentes'
                          : 'Alfabética'}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {isSortOpen && (
                      <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-30 text-xs font-medium">
                        {[
                          { id: 'relevantes', label: 'Mais relevantes' },
                          { id: 'membros', label: 'Mais membros' },
                          { id: 'recentes', label: 'Recentes' },
                          { id: 'alfabetica', label: 'Alfabética' },
                        ].map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              setSortBy(s.id as any);
                              setIsSortOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between text-slate-700"
                          >
                            <span>{s.label}</span>
                            {sortBy === s.id && <Check className="w-3 h-3 text-blue-600" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Toggle Grade / Lista */}
                  <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      title="Visualização em Grade"
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        viewMode === 'grid'
                          ? 'bg-slate-100 text-[#3D4ED8]'
                          : 'text-slate-400 hover:text-slate-700'
                      }`}
                      aria-label="Grade"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      title="Visualização em Lista"
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        viewMode === 'list'
                          ? 'bg-slate-100 text-[#3D4ED8]'
                          : 'text-slate-400 hover:text-slate-700'
                      }`}
                      aria-label="Lista"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* RENDERIZAÇÃO DOS RESULTADOS */}
              {viewMode === 'list' ? (
                /* MODO LISTA: Linhas detalhadas (ícone, nome, membros, tipo, descrição, idiomas, status, botão Juntar-se) */
                <div className="flex flex-col gap-3">
                  {filteredCommunities.map((item) => {
                    const IconComp = item.icon;
                    const isJoined = joinedCommunities.has(item.id);

                    return (
                      <article
                        key={item.id}
                        onClick={() => setDetailModalItem(item)}
                        className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer group"
                      >
                        {/* Bloco Esquerdo: Ícone Redondo + Informações Principais */}
                        <div className="flex items-start gap-3.5 min-w-0 flex-1">
                          {/* Ícone Redondo Grande */}
                          <div
                            className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}
                          >
                            <IconComp className="w-5 h-5 stroke-[2.2]" />
                          </div>

                          {/* Textos */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] font-['Outfit'] group-hover:text-blue-600 transition-colors">
                                {item.name}
                              </h3>
                            </div>

                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              {item.members} • <span className="text-slate-600">{item.type}</span>
                            </p>

                            <p className="text-xs text-slate-600 leading-relaxed mt-1 line-clamp-2 max-w-xl">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Bloco Direito: Metadados (Global, Idiomas, Status) + Botão Juntar-se */}
                        <div className="flex items-center justify-between md:justify-end gap-5 sm:gap-6 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                          {/* Coluna de Status e Metadados */}
                          <div className="flex flex-col gap-1 text-[11px] text-slate-500">
                            <span className="flex items-center gap-1.5 font-medium text-slate-700">
                              <Globe className="w-3.5 h-3.5 text-slate-400" />
                              <span>{item.location}</span>
                            </span>

                            <span className="flex items-center gap-1.5 text-slate-500">
                              <span className="text-[12px]">🗣</span>
                              <span>{item.languages}</span>
                            </span>

                            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span>{item.status}</span>
                            </span>
                          </div>

                          {/* Botão Juntar-se / Membro */}
                          <button
                            type="button"
                            onClick={(e) => toggleJoin(item.id, e)}
                            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                              isJoined
                                ? 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                                : 'bg-white border border-blue-200 text-[#3D4ED8] hover:bg-blue-50/80 hover:border-blue-300 shadow-2xs'
                            }`}
                          >
                            {isJoined ? 'Membro ativo' : 'Juntar-se'}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                /* MODO GRADE: Se o usuário alternar para o ícone de grade */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredCommunities.map((item) => {
                    const IconComp = item.icon;
                    const isJoined = joinedCommunities.has(item.id);

                    return (
                      <article
                        key={item.id}
                        onClick={() => setDetailModalItem(item)}
                        className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3 cursor-pointer group"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}
                          >
                            <IconComp className="w-5 h-5 stroke-[2.2]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] font-['Outfit'] truncate group-hover:text-blue-600 transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-[11px] text-slate-500">
                              {item.members} • {item.type}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="truncate max-w-[120px]">{item.location}</span>
                          <button
                            type="button"
                            onClick={(e) => toggleJoin(item.id, e)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              isJoined
                                ? 'bg-slate-100 text-slate-700'
                                : 'text-[#3D4ED8] bg-blue-50 hover:bg-blue-100'
                            }`}
                          >
                            {isJoined ? 'Membro' : 'Juntar-se'}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {/* ======================================================== */}
          {/* COLUNA DIREITA: Tendências + Atividade + CTA Criar       */}
          {/* ======================================================== */}
          <aside className="lg:col-span-3 xl:col-span-3 flex flex-col gap-4">

            {/* 1. Card: Comunidades em tendência */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit']">
                  Comunidades em tendência
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('todas')}
                  className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100">
                {TRENDING_LIST.map((item) => {
                  const TrendIcon = item.icon;

                  return (
                    <div
                      key={item.id}
                      className="py-2.5 flex items-center justify-between gap-2 hover:bg-slate-50/80 px-1 rounded-lg transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xs font-bold text-slate-400 w-3 shrink-0">{item.rank}</span>
                        <div
                          className={`w-7 h-7 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0`}
                        >
                          <TrendIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-[#0F172A] truncate group-hover:text-blue-600 transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-slate-500 block truncate">{item.members}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#10B981] shrink-0">{item.growth}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Card: Atividade recente */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit']">
                  Atividade recente
                </h3>
                <button
                  type="button"
                  className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver tudo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100">
                {RECENT_ACTIVITY_ITEMS.map((act) => (
                  <div key={act.id} className="py-2.5 flex items-start gap-2.5">
                    <img
                      src={act.avatar}
                      alt={act.actor}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1 text-[11px] leading-snug">
                      <p className="text-slate-700">
                        <span className="font-bold text-[#0F172A]">{act.actor}</span>{' '}
                        {act.action}{' '}
                        <span className="font-bold text-blue-600">{act.target}</span>
                      </p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Card Promocional: "Não encontrou o que procura?" */}
            <div
              id="cta-criar-comunidade-promo"
              className="relative rounded-2xl overflow-hidden p-5 text-white bg-gradient-to-br from-[#3D4ED8] to-[#1E40AF] shadow-md flex flex-col justify-between min-h-[190px]"
            >
              <div className="relative z-10 max-w-[210px] flex flex-col gap-1.5">
                <h3 className="text-sm sm:text-base font-extrabold text-white font-['Outfit'] leading-tight">
                  Não encontrou o que procura?
                </h3>
                <p className="text-[11px] text-blue-100/90 leading-snug">
                  Crie a sua comunidade e conecte pessoas em todo o mundo.
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <button
                  type="button"
                  onClick={onOpenCreateCommunity}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#3D4ED8] text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <span>Criar Comunidade</span>
                  <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
                </button>
              </div>

              {/* Elementos decorativos (círculo e avatares conectados) */}
              <div className="absolute -right-4 -bottom-4 pointer-events-none opacity-80">
                <div className="w-28 h-28 rounded-full border border-white/20 flex items-center justify-center relative">
                  <Globe className="w-14 h-14 text-white/25" />
                  <span className="absolute top-1 right-3 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-blue-600" />
                  <span className="absolute bottom-4 left-1 w-3.5 h-3.5 rounded-full bg-amber-400 ring-2 ring-blue-600" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal de Detalhes da Comunidade Selecionada */}
      {detailModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setDetailModalItem(null)}
        >
          <div
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setDetailModalItem(null)}
              className="absolute top-3.5 right-3.5 text-slate-500 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center z-10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl ${detailModalItem.iconBg} flex items-center justify-center shrink-0 shadow-xs`}
                >
                  <detailModalItem.icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] font-['Outfit']">
                    {detailModalItem.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {detailModalItem.members} • {detailModalItem.type}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {detailModalItem.description}
              </p>

              <div className="flex flex-wrap gap-2 py-2 border-y border-slate-100 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <strong>Alcance:</strong> {detailModalItem.location}
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <strong>Idiomas:</strong> {detailModalItem.languages}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    toggleJoin(detailModalItem.id);
                    setDetailModalItem(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    joinedCommunities.has(detailModalItem.id)
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-[#3D4ED8] text-white hover:bg-[#2D3BA8] shadow-xs'
                  }`}
                >
                  {joinedCommunities.has(detailModalItem.id) ? 'Membro ativo ✓' : 'Juntar-se à Comunidade'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityExploreView;
