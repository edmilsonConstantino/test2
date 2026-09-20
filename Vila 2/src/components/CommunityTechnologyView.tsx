import React, { useState } from 'react';
import {
  Globe,
  Cpu,
  Plus,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Users,
  Compass,
  Leaf,
  GraduationCap,
  Scale,
  HeartPulse,
  Rocket,
  Palette,
  MoreHorizontal,
  Check,
  X,
  Filter,
  Brain,
  Code2,
  Satellite,
  Lock,
  Link2,
  MapPin,
  Clock,
} from 'lucide-react';

export interface CommunityTechnologyViewProps {
  onNavigateToTab?: (tabId: string) => void;
  onNavigateToCategory?: (category: string) => void;
  onBackToOfficial?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenCreateCommunity?: () => void;
}

// Interfaces
interface FeaturedTechCommunity {
  id: string;
  name: string;
  badge: string;
  badgeBg: string;
  members: string;
  description: string;
  tag: string;
  tagColor: string;
  avatars: string[];
  extraAvatars: string;
  iconType: 'ai' | 'dev' | 'space' | 'security';
  iconBg: string;
}

interface TechInitiative {
  id: string;
  tag: string;
  tagBg: string;
  image: string;
  title: string;
  meta: string;
  description: string;
  stat: string;
}

interface TrendingTechCommunity {
  rank: number;
  id: string;
  name: string;
  members: string;
  growth: string;
  iconType: FeaturedTechCommunity['iconType'] | 'blockchain';
  iconBg: string;
}

interface RecentActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

// Dados: 4 Comunidades em destaque
const FEATURED_TECH_COMMUNITIES: FeaturedTechCommunity[] = [
  {
    id: 'tech-1',
    name: 'IA para o Bem',
    badge: 'EM ALTA',
    badgeBg: 'bg-[#0F172A]',
    members: '78.320 membros',
    description: 'Aplicamos inteligência artificial para resolver desafios sociais e ambientais.',
    tag: 'Inteligência Artificial',
    tagColor: 'text-[#4F46E5] bg-indigo-50',
    avatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+2.3K',
    iconType: 'ai',
    iconBg: 'bg-[#4F46E5]',
  },
  {
    id: 'tech-2',
    name: 'Desenvolvedores Globais',
    badge: 'POPULAR',
    badgeBg: 'bg-[#7C3AED]',
    members: '96.450 membros',
    description: 'Rede de desenvolvedores que constroem soluções de impacto.',
    tag: 'Desenvolvimento',
    tagColor: 'text-[#059669] bg-emerald-50 dark:bg-emerald-500/10',
    avatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+1.8K',
    iconType: 'dev',
    iconBg: 'bg-[#4338CA]',
  },
  {
    id: 'tech-3',
    name: 'Tecnologia Espacial',
    badge: 'EM DESTAQUE',
    badgeBg: 'bg-[#EA580C]',
    members: '45.670 membros',
    description: 'Explorando fronteiras e promovendo inovação espacial sustentável.',
    tag: 'Espaço',
    tagColor: 'text-[#334155] dark:text-slate-300 bg-slate-100 dark:bg-slate-800',
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+1.2K',
    iconType: 'space',
    iconBg: 'bg-[#1E293B]',
  },
  {
    id: 'tech-4',
    name: 'Cibersegurança para Todos',
    badge: 'NOVO',
    badgeBg: 'bg-[#3D4ED8]',
    members: '32.190 membros',
    description: 'Promovendo um mundo digital seguro e responsável.',
    tag: 'Segurança',
    tagColor: 'text-[#0D9488] bg-teal-50',
    avatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+980',
    iconType: 'security',
    iconBg: 'bg-[#0D9488]',
  },
];

// Dados: 4 Iniciativas em destaque
const TECH_INITIATIVES: TechInitiative[] = [
  {
    id: 'init-1',
    tag: 'DESAFIO',
    tagBg: 'bg-[#DC2626]',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80',
    title: 'Hackathon Sustentável 2024',
    meta: '15-22 Jun 2024 • Global',
    description: 'Crie soluções tecnológicas para os desafios do clima.',
    stat: '2.1K participantes',
  },
  {
    id: 'init-2',
    tag: 'WEBINAR',
    tagBg: 'bg-[#3D4ED8]',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&auto=format&fit=crop&q=80',
    title: 'Metaverso e Sociedade',
    meta: '30 Mai 2024 • Online',
    description: 'Debate sobre o impacto do metaverso no futuro do trabalho.',
    stat: '860 inscritos',
  },
  {
    id: 'init-3',
    tag: 'PROJETO',
    tagBg: 'bg-[#059669]',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80',
    title: 'App para Impacto Social',
    meta: 'Em andamento • 12 países',
    description: 'Desenvolvendo apps que transformam comunidades.',
    stat: '5.2K apoiadores',
  },
  {
    id: 'init-4',
    tag: 'CAMPANHA',
    tagBg: 'bg-[#D97706]',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format&fit=crop&q=80',
    title: 'Reciclagem de Eletrônicos',
    meta: 'Jun - Jul 2024 • Global',
    description: 'Dê um novo destino aos seus dispositivos eletrônicos.',
    stat: '1.6K participantes',
  },
];

// Dados: Barra Lateral Comunidades em Tendência
const TRENDING_TECH_COMMUNITIES: TrendingTechCommunity[] = [
  { rank: 1, id: 'trend-1', name: 'IA para o Bem', members: '78.3K membros', growth: '▲ 22%', iconType: 'ai', iconBg: 'bg-[#4F46E5]' },
  { rank: 2, id: 'trend-2', name: 'Desenvolvedores Globais', members: '96.4K membros', growth: '▲ 18%', iconType: 'dev', iconBg: 'bg-[#4338CA]' },
  { rank: 3, id: 'trend-3', name: 'Tecnologia Espacial', members: '45.6K membros', growth: '▲ 15%', iconType: 'space', iconBg: 'bg-[#1E293B]' },
  { rank: 4, id: 'trend-4', name: 'Cibersegurança p/ Todos', members: '32.1K membros', growth: '▲ 12%', iconType: 'security', iconBg: 'bg-[#0D9488]' },
  { rank: 5, id: 'trend-5', name: 'Blockchain for Good', members: '28.7K membros', growth: '▲ 10%', iconType: 'blockchain', iconBg: 'bg-[#059669]' },
];

// Dados: Barra Lateral Atividade Recente
const RECENT_ACTIVITY: RecentActivityItem[] = [
  {
    id: 'act-1',
    actor: 'Carlos Mendes',
    action: 'publicou um artigo em',
    target: 'Desenvolvedores Globais',
    time: 'Há 1 hora',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'act-2',
    actor: 'Ana Costa',
    action: 'compartilhou um recurso em',
    target: 'IA para o Bem',
    time: 'Há 2 horas',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'act-3',
    actor: 'Tech for Education',
    action: 'adicionou um evento',
    target: 'Webinar: Futuro da Educação',
    time: 'Há 3 horas',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 'act-4',
    actor: 'João Pereira',
    action: 'começou a seguir',
    target: 'Tecnologia Espacial',
    time: 'Há 5 horas',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
  },
];

export const CommunityTechnologyView: React.FC<CommunityTechnologyViewProps> = ({
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
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [techFocus, setTechFocus] = useState<string>('Selecione um foco');
  const [isTechFocusOpen, setIsTechFocusOpen] = useState<boolean>(false);
  const [locationFilter, setLocationFilter] = useState<string>('Qualquer lugar');
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [languageFilter, setLanguageFilter] = useState<string>('Qualquer idioma');
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);

  // Dropdown "Mais"
  const [isMaisDropdownOpen, setIsMaisDropdownOpen] = useState<boolean>(false);

  // Modais
  const [selectedCommunityModal, setSelectedCommunityModal] = useState<FeaturedTechCommunity | null>(null);
  const [selectedInitiativeModal, setSelectedInitiativeModal] = useState<TechInitiative | null>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<Set<string>>(new Set());

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => {
      const next = new Set(prev);
      if (next.has(size)) next.delete(size);
      else next.add(size);
      return next;
    });
  };

  const handleClearFilters = () => {
    setCommunityType('Todas');
    setSelectedSizes(new Set());
    setTechFocus('Selecione um foco');
    setLocationFilter('Qualquer lugar');
    setLanguageFilter('Qualquer idioma');
  };

  const toggleJoinCommunity = (id: string) => {
    setJoinedCommunities((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderCardIcon = (type: TrendingTechCommunity['iconType']) => {
    switch (type) {
      case 'ai':
        return <Brain className="w-5 h-5" />;
      case 'dev':
        return <Code2 className="w-5 h-5" />;
      case 'space':
        return <Satellite className="w-5 h-5" />;
      case 'security':
        return <Lock className="w-5 h-5" />;
      case 'blockchain':
        return <Link2 className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <div id="community-technology-view" className="w-full bg-[#F8FAFC] dark:bg-slate-950 min-h-screen text-[#0F172A] dark:text-slate-50 flex flex-col">
      {/* Conteúdo Principal (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* 2. Cabeçalho de Tecnologia com Ícone e Métricas */}
        <section id="tecnologia-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#4F46E5] text-white flex items-center justify-center shrink-0 shadow-sm border border-indigo-900/20">
              <Cpu className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.2} />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-slate-50 tracking-tight leading-tight">
                Tecnologia
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-normal leading-snug">
                Inovação, transformação digital e soluções tecnológicas para um futuro melhor.
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-1.5 text-[11.5px] sm:text-xs font-semibold text-[#64748B] dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">1.386</strong> comunidades
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">312.450</strong> membros
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">198</strong> países
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenCreateCommunity}
            id="btn-criar-comunidade-tecnologia"
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Criar Comunidade</span>
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </section>

        {/* 3. Fita Horizontal de Categorias (com Tecnologia Selecionada) */}
        <nav
          id="categories-ribbon-tecnologia"
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
                    ? 'bg-[#4F46E5] text-white shadow-xs'
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
            id="filtros-tecnologia-sidebar"
            className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm font-bold text-[#0F172A] dark:text-slate-50 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                Filtros
              </span>
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-[11.5px] font-semibold text-[#4F46E5] hover:underline transition-colors cursor-pointer"
              >
                Limpar tudo
              </button>
            </div>

            {/* Tipo de comunidade (Radio) */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Tipo de comunidade</span>
              <div className="flex flex-col gap-1.5">
                {['Todas', 'Organizações', 'ONGs', 'Grupos de Interesse', 'Iniciativas Locais', 'Redes Profissionais'].map((type) => {
                  const isChecked = communityType === type;
                  return (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-[11.5px] text-[#334155] dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        name="tech-type"
                        checked={isChecked}
                        onChange={() => setCommunityType(type)}
                        className="sr-only"
                      />
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'border-[#4F46E5] bg-[#4F46E5]'
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

            {/* Tamanho (Checkboxes) */}
            <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Tamanho</span>
              <div className="flex flex-col gap-1.5">
                {['1 - 100 membros', '101 - 1.000 membros', '1.001 - 10.000 membros', '10.000+ membros'].map((size) => {
                  const isChecked = selectedSizes.has(size);
                  return (
                    <label
                      key={size}
                      className="flex items-center gap-2 text-[11.5px] text-[#334155] dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer select-none"
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
                            ? 'border-[#4F46E5] bg-[#4F46E5] text-white'
                            : 'border-slate-300 bg-white dark:bg-slate-800 hover:border-slate-400'
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

            {/* Foco tecnológico (Dropdown) */}
            <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800 relative">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Foco tecnológico</span>
              <button
                type="button"
                onClick={() => setIsTechFocusOpen(!isTechFocusOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <span className="truncate">{techFocus}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-500 transition-transform ${isTechFocusOpen ? 'rotate-180' : ''}`} />
              </button>

              {isTechFocusOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 z-20 text-xs font-medium">
                  {['Selecione um foco', 'Inteligência Artificial', 'Desenvolvimento', 'Espaço', 'Segurança', 'Blockchain'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => {
                        setTechFocus(f);
                        setIsTechFocusOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300"
                    >
                      <span>{f}</span>
                      {techFocus === f && <Check className="w-3 h-3 text-indigo-600" />}
                    </button>
                  ))}
                </div>
              )}
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
                      {locationFilter === loc && <Check className="w-3 h-3 text-indigo-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Idioma (Dropdown) */}
            <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800 relative">
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
                      {languageFilter === lang && <Check className="w-3 h-3 text-indigo-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs shadow-xs transition-all cursor-pointer mt-1"
            >
              Aplicar Filtros
            </button>
          </aside>

          {/* COLUNA CENTRAL: Hero Banner, Comunidades em Destaque e Iniciativas (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* HERO BANNER: "Conectando mentes, criando o futuro." */}
            <section
              id="hero-tecnologia-banner"
              className="relative rounded-2xl overflow-hidden min-h-[260px] flex items-center text-white shadow-sm border border-slate-900/10 bg-[#05060F] group"
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&auto=format&fit=crop&q=85"
                  alt="Rede global de conexões tecnológicas"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#05060F]/95 via-[#05060F]/60 to-[#05060F]/10" />
              </div>

              <div className="relative z-10 p-6 sm:p-8 max-w-md flex flex-col gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                  Conectando mentes, <br />
                  criando o futuro.
                </h2>
                <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                  Colabore com inovadores e soluções que impulsionam a transformação tecnológica global.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (FEATURED_TECH_COMMUNITIES.length > 0) {
                        setSelectedCommunityModal(FEATURED_TECH_COMMUNITIES[0]);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#4F46E5] text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                  >
                    <span>Juntar-se a uma comunidade</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.4]" />
                  </button>
                </div>
              </div>
            </section>

            {/* Seção: Comunidades em destaque (4 Cards) */}
            <section id="comunidades-destaque-tecnologia-section" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                  Comunidades em destaque
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {FEATURED_TECH_COMMUNITIES.map((comm) => (
                    <article
                      key={comm.id}
                      onClick={() => setSelectedCommunityModal(comm)}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col cursor-pointer group"
                    >
                      <div className="relative h-24 w-full overflow-hidden bg-[#0B1120] flex items-center justify-center">
                        <span
                          className={`absolute top-2 left-2 text-[8.5px] font-black text-white uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs ${comm.badgeBg}`}
                        >
                          {comm.badge}
                        </span>
                        <div
                          className={`w-11 h-11 rounded-full ${comm.iconBg} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                        >
                          {renderCardIcon(comm.iconType)}
                        </div>
                      </div>

                      <div className="p-3 pt-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                            {comm.name}
                          </h4>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-1.5 mt-0.5">{comm.members}</div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 dark:text-slate-500 line-clamp-2 leading-tight mb-2.5">
                            {comm.description}
                          </p>
                          <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded ${comm.tagColor}`}>
                            {comm.tag}
                          </span>
                        </div>

                        <div className="pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <div className="flex -space-x-1.5 overflow-hidden">
                            {comm.avatars.map((av, idx) => (
                              <img
                                key={idx}
                                src={av}
                                alt="Membro"
                                className="inline-block h-4.5 w-4.5 rounded-full ring-1 ring-white dark:ring-slate-900 object-cover"
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500">{comm.extraAvatars}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Seção: Iniciativas em destaque (4 Cards) */}
            <section id="iniciativas-destaque-tecnologia-section" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                  Iniciativas em destaque
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {TECH_INITIATIVES.map((init) => (
                  <article
                    key={init.id}
                    onClick={() => setSelectedInitiativeModal(init)}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col cursor-pointer group"
                  >
                    <div className="relative h-24 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={init.image}
                        alt={init.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span
                        className={`absolute top-2 left-2 text-[8.5px] font-black text-white uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs ${init.tagBg}`}
                      >
                        {init.tag}
                      </span>
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                          {init.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">{init.meta}</p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 dark:text-slate-500 line-clamp-2 leading-tight mt-1.5">
                          {init.description}
                        </p>
                      </div>
                      <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500">
                        <Users className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                        <span>{init.stat}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* COLUNA DIREITA: Comunidades em tendência, Atividade recente e CTA (lg:col-span-3) */}
          <aside className="lg:col-span-3 flex flex-col gap-4">
            {/* 1. Card: Comunidades em tendência */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50">
                  Comunidades em tendência
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
                {TRENDING_TECH_COMMUNITIES.map((item) => (
                  <div
                    key={item.id}
                    className="py-2 flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 px-1 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 w-3 shrink-0">{item.rank}</span>
                      <div className={`w-7 h-7 rounded-lg ${item.iconBg} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
                        {renderCardIcon(item.iconType)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 truncate group-hover:text-indigo-600 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500 block truncate">{item.members}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#10B981] shrink-0">{item.growth}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Card: Atividade recente */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50">
                  Atividade recente
                </h3>
                <button
                  type="button"
                  className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
                {RECENT_ACTIVITY.map((act) => (
                  <div key={act.id} className="py-2.5 flex items-start gap-2.5">
                    <img
                      src={act.avatar}
                      alt={act.actor}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1 text-[11px] leading-snug">
                      <p className="text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-[#0F172A] dark:text-slate-50">{act.actor}</span>{' '}
                        {act.action}{' '}
                        <span className="font-bold text-indigo-600">{act.target}</span>
                      </p>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Card CTA em Índigo: "Inove. Colabore. Transforme." */}
            <div
              id="cta-tecnologia-card"
              className="relative rounded-2xl overflow-hidden p-5 text-white bg-gradient-to-br from-[#0B1120] via-[#312E81] to-[#4F46E5] shadow-md flex flex-col justify-between min-h-[170px]"
            >
              <div className="relative z-10 max-w-[210px] flex flex-col gap-1">
                <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                  Inove. Colabore. <br />
                  Transforme.
                </h3>
                <p className="text-[10.5px] text-white/85 leading-snug">
                  Crie ou participe de comunidades tecnológicas que geram impacto global e impulsionam o futuro.
                </p>
              </div>

              <div className="relative z-10 pt-3">
                <button
                  type="button"
                  onClick={onOpenCreateCommunity}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#4F46E5] text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <span>Criar Comunidade</span>
                  <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
                </button>
              </div>

              <div className="absolute right-3 -bottom-2 pointer-events-none opacity-90">
                <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-white" />
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
                  <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">{selectedCommunityModal.members}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 dark:text-slate-500 leading-relaxed">
                {selectedCommunityModal.description}
              </p>

              <span className={`inline-block w-fit text-xs font-semibold px-2.5 py-1 rounded-md ${selectedCommunityModal.tagColor}`}>
                {selectedCommunityModal.tag}
              </span>

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
                      : 'bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-xs'
                  }`}
                >
                  {joinedCommunities.has(selectedCommunityModal.id) ? 'Membro ativo' : 'Juntar-se à Comunidade'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes da Iniciativa Selecionada */}
      {selectedInitiativeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-md w-full overflow-hidden relative flex flex-col">
            <button
              type="button"
              onClick={() => setSelectedInitiativeModal(null)}
              className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/70 w-8 h-8 rounded-full flex items-center justify-center z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-44 w-full">
              <img
                src={selectedInitiativeModal.image}
                alt={selectedInitiativeModal.title}
                className="w-full h-full object-cover"
              />
              <span className={`absolute bottom-3 left-3 text-white text-[11px] font-bold px-3 py-1 rounded-md ${selectedInitiativeModal.tagBg}`}>
                {selectedInitiativeModal.tag}
              </span>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50">
                  {selectedInitiativeModal.title}
                </h3>
                <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-2">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    {selectedInitiativeModal.meta}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    {selectedInitiativeModal.stat}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 dark:text-slate-500 leading-relaxed mt-2">
                  {selectedInitiativeModal.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedInitiativeModal(null)}
                  className="px-4 py-2 bg-[#4F46E5] text-white text-xs font-bold rounded-xl hover:bg-[#4338CA]"
                >
                  Participar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityTechnologyView;
