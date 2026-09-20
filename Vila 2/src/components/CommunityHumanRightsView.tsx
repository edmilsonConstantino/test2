import React, { useState, useMemo } from 'react';
import {
  Globe,
  Scale,
  Plus,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Users,
  Compass,
  Leaf,
  Cpu,
  GraduationCap,
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
  Megaphone,
  FileText,
  Shield,
  Heart,
  HandHeart,
} from 'lucide-react';

export interface CommunityHumanRightsViewProps {
  onNavigateToTab?: (tabId: string) => void;
  onNavigateToCategory?: (category: string) => void;
  onBackToOfficial?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenCreateCommunity?: () => void;
}

// Interfaces
interface TrendingHumanRightsCommunity {
  rank: number;
  id: string;
  name: string;
  membersCount: string;
  description: string;
  tag: string;
  growth: string;
  image: string;
}

interface HumanRightsInitiative {
  id: string;
  title: string;
  badgeLabel: string;
  badgeBg: string;
  image: string;
  subtitle: string;
  description: string;
  meta: string;
  actionText?: string;
  isActionLink?: boolean;
}

interface TrendingRightItem {
  rank: number;
  id: string;
  name: string;
  members: string;
  growth: string;
  iconType: 'equality' | 'speech' | 'children' | 'refugees' | 'pride';
  bg: string;
  color: string;
}

interface RecentHumanRightsActivity {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  timeAgo: string;
}

// 5 Comunidades em Tendência (Direitos Humanos)
const TRENDING_HR_COMMUNITIES: TrendingHumanRightsCommunity[] = [
  {
    rank: 1,
    id: 'hr-comm-1',
    name: 'Igualdade para Todos',
    membersCount: '72.3K membros',
    description: 'Promovemos igualdade racial e combate à discriminação.',
    tag: 'Igualdade Racial',
    growth: '▲ 24%',
    image: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=600&auto=format&fit=crop&q=80',
  },
  {
    rank: 2,
    id: 'hr-comm-2',
    name: 'Liberdade de Expressão',
    membersCount: '64.1K membros',
    description: 'Defendemos o direito de todos à expressão livre e segura.',
    tag: 'Liberdade',
    growth: '▲ 18%',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
  },
  {
    rank: 3,
    id: 'hr-comm-3',
    name: 'Crianças, Futuro e Dignidade',
    membersCount: '58.7K membros',
    description: 'Protegemos os direitos das crianças e garantimos um futuro melhor.',
    tag: 'Direitos das Crianças',
    growth: '▲ 16%',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80',
  },
  {
    rank: 4,
    id: 'hr-comm-4',
    name: 'Direitos dos Refugiados',
    membersCount: '51.2K membros',
    description: 'Apoio, integração e defesa dos direitos de refugiados e migrantes.',
    tag: 'Refugiados',
    growth: '▲ 14%',
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&auto=format&fit=crop&q=80',
  },
  {
    rank: 5,
    id: 'hr-comm-5',
    name: 'Orgulho e Direitos LGBTQIA+',
    membersCount: '43.8K membros',
    description: 'Construímos espaços seguros e defendemos diversidade e inclusão.',
    tag: 'LGBTQIA+',
    growth: '▲ 12%',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&auto=format&fit=crop&q=80',
  },
];

// 5 Iniciativas em Destaque
const HR_INITIATIVES: HumanRightsInitiative[] = [
  {
    id: 'init-1',
    title: 'Fim da Violência de Género',
    badgeLabel: 'CAMPANHA',
    badgeBg: 'bg-[#6366F1]',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&auto=format&fit=crop&q=80',
    subtitle: 'Campanha Global',
    description: '#TodosContraAViolência',
    meta: '15 países • 12.5K apoiadores',
  },
  {
    id: 'init-2',
    title: 'Trabalho Digno, Vida Digna',
    badgeLabel: 'PROJETO',
    badgeBg: 'bg-[#059669]',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&auto=format&fit=crop&q=80',
    subtitle: 'Projeto Internacional',
    description: 'Promover condições justas de trabalho para todos.',
    meta: '23 países • 8.7K beneficiados',
  },
  {
    id: 'init-3',
    title: 'Direitos Humanos em Foco',
    badgeLabel: 'WEBINAR',
    badgeBg: 'bg-[#0284C7]',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=80',
    subtitle: 'Webinar • 29 Mai 2024',
    description: 'Entenda os desafios e avanços dos direitos humanos hoje.',
    meta: '1.2K inscritos',
    actionText: 'Gratuito',
  },
  {
    id: 'init-4',
    title: 'Justiça para Todos',
    badgeLabel: 'PETIÇÃO',
    badgeBg: 'bg-[#EA580C]',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=80',
    subtitle: 'Petição Global',
    description: 'Apoie a petição por sistemas judiciais mais justos.',
    meta: '58.3K assinaturas',
  },
  {
    id: 'init-5',
    title: 'Relatório Anual 2024',
    badgeLabel: 'RELATÓRIO',
    badgeBg: 'bg-[#0F766E]',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
    subtitle: 'Publicação',
    description: 'Panorama global dos direitos humanos em 2024.',
    meta: 'PDF',
    actionText: 'Download',
    isActionLink: true,
  },
];

// Barra Lateral: Comunidades em Tendência
const TRENDING_SIDEBAR_ITEMS: TrendingRightItem[] = [
  {
    rank: 1,
    id: 'side-1',
    name: 'Igualdade para Todos',
    members: '72.3K membros',
    growth: '▲ 24%',
    iconType: 'equality',
    bg: 'bg-purple-50 dark:bg-purple-500/10',
    color: 'text-[#8B5CF6]',
  },
  {
    rank: 2,
    id: 'side-2',
    name: 'Liberdade de Expressão',
    members: '64.1K membros',
    growth: '▲ 18%',
    iconType: 'speech',
    bg: 'bg-rose-50 dark:bg-rose-500/10',
    color: 'text-[#F43F5E]',
  },
  {
    rank: 3,
    id: 'side-3',
    name: 'Crianças, Futuro e Dignidade',
    members: '58.7K membros',
    growth: '▲ 16%',
    iconType: 'children',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    color: 'text-[#3D4ED8]',
  },
  {
    rank: 4,
    id: 'side-4',
    name: 'Direitos dos Refugiados',
    members: '51.2K membros',
    growth: '▲ 14%',
    iconType: 'refugees',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    color: 'text-[#D97706]',
  },
  {
    rank: 5,
    id: 'side-5',
    name: 'Orgulho e Direitos LGBTQIA+',
    members: '43.8K membros',
    growth: '▲ 12%',
    iconType: 'pride',
    bg: 'bg-rainbow',
    color: 'text-white',
  },
];

// Atividades Recentes em Direitos Humanos
const RECENT_ACTIVITIES: RecentHumanRightsActivity[] = [
  {
    id: 'act-1',
    user: 'Mariana Lopes',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    action: 'publicou uma atualização em',
    target: 'Igualdade para Todos',
    timeAgo: 'Há 1 hora',
  },
  {
    id: 'act-2',
    user: 'João Pereira',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    action: 'iniciou uma campanha em',
    target: 'Liberdade de Expressão',
    timeAgo: 'Há 2 horas',
  },
  {
    id: 'act-3',
    user: 'Ana Costa',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    action: 'compartilhou um recurso em',
    target: 'Direitos dos Refugiados',
    timeAgo: 'Há 3 horas',
  },
  {
    id: 'act-4',
    user: 'Lucas Mendes',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    action: 'organizou um evento em',
    target: 'Justiça para Todos',
    timeAgo: 'Há 4 horas',
  },
  {
    id: 'act-5',
    user: 'Carla Souza',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    action: 'participou da discussão em',
    target: 'Fim da Violência de Gênero',
    timeAgo: 'Há 5 horas',
  },
];

export const CommunityHumanRightsView: React.FC<CommunityHumanRightsViewProps> = ({
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

  // Dropdown "Mais"
  const [isMaisDropdownOpen, setIsMaisDropdownOpen] = useState<boolean>(false);

  // Modais
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [selectedCommunityModal, setSelectedCommunityModal] = useState<TrendingHumanRightsCommunity | null>(null);
  const [selectedInitiativeModal, setSelectedInitiativeModal] = useState<HumanRightsInitiative | null>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<Set<string>>(new Set(['hr-comm-1']));

  // Alternar Checkbox Tema
  const toggleTheme = (theme: string) => {
    setSelectedThemes((prev) => {
      const next = new Set(prev);
      if (next.has(theme)) next.delete(theme);
      else next.add(theme);
      return next;
    });
  };

  // Limpar Filtros
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

  return (
    <div id="community-human-rights-view" className="w-full bg-[#F8FAFC] dark:bg-slate-950 min-h-screen text-[#0F172A] dark:text-slate-50 flex flex-col">
      {/* Conteúdo Principal (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* 2. Cabeçalho de Direitos Humanos com Ícone e Métricas */}
        <section id="direitos-humanos-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            {/* Ícone Quadrado Arredondado com Balança Azul/Violeta */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#EEF2FF] border border-indigo-200/80 flex items-center justify-center shrink-0 shadow-2xs">
              <Scale className="w-7 h-7 sm:w-8 sm:h-8 text-[#4338CA]" strokeWidth={2.2} />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-slate-50 tracking-tight leading-tight">
                Direitos Humanos
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-normal leading-snug">
                Dignidade para todos. Promova direitos, defenda liberdades e construa sociedades mais justas.
              </p>

              {/* Fita de Métricas: Comunidades, Membros e Países */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-1.5 text-[11.5px] sm:text-xs font-semibold text-[#64748B] dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">1.248</strong> comunidades
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">198.450</strong> membros
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">187</strong> países
                </span>
              </div>
            </div>
          </div>

          {/* Botão "+ Criar Comunidade" Azul */}
          <button
            type="button"
            onClick={() => {
              if (onOpenCreateCommunity) {
                onOpenCreateCommunity();
              } else {
                setIsCreateModalOpen(true);
              }
            }}
            id="btn-criar-comunidade-direitos-humanos"
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3D4ED8] hover:bg-[#2D3BA8] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Criar Comunidade</span>
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </section>

        {/* 3. Fita Horizontal de Categorias (com Direitos Humanos Selecionado) */}
        <nav
          id="categories-ribbon-direitos-humanos"
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
            const isActive = cat.id === 'direitos-humanos';

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (onNavigateToCategory) onNavigateToCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-[#4338CA] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-[#334155] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 dark:text-slate-500'}`} strokeWidth={2.2} />
                <span>{cat.label}</span>
              </button>
            );
          })}

          {/* Botão "Mais" como Dropdown Exclusivo (sem criar página de rota) */}
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

        {/* 4. Grade de Três Colunas (Filtros, Centro com Banner/Comunidades/Iniciativas, Coluna Lateral) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* COLUNA ESQUERDA: Filtros (lg:col-span-2) */}
          <aside
            id="filtros-direitos-humanos-sidebar"
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
                className="text-[11.5px] font-semibold text-[#3D4ED8] hover:text-[#2D3BA8] transition-colors cursor-pointer"
              >
                Limpar tudo
              </button>
            </div>

            {/* Grupo 1: Tipo de comunidade (Radio) */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Tipo de comunidade</span>
              <div className="flex flex-col gap-1.5">
                {[
                  'Todas',
                  'Organizações',
                  'ONGs',
                  'Grupos de Advocacia',
                  'Iniciativas Locais',
                  'Redes de Apoio',
                  'Movimentos Sociais',
                  'Centros de Pesquisa',
                ].map((type) => {
                  const isChecked = communityType === type;
                  return (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-[11.5px] text-[#334155] dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        name="hr-community-type"
                        checked={isChecked}
                        onChange={() => setCommunityType(type)}
                        className="sr-only"
                      />
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'border-[#3D4ED8] bg-[#3D4ED8]'
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

            {/* Grupo 2: Temas de Direitos Humanos (Checkboxes) */}
            <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Temas de Direitos Humanos</span>
              <div className="flex flex-col gap-1.5">
                {[
                  'Liberdade de Expressão',
                  'Direitos das Mulheres',
                  'Igualdade Racial',
                  'Direitos das Crianças',
                  'Direitos de Refugiados',
                  'Pessoas com Deficiência',
                  'Direitos LGBTQIA+',
                  'Justiça Social',
                  'Trabalho Digno',
                  'Povos Indígenas',
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
                            ? 'border-[#3D4ED8] bg-[#3D4ED8] text-white'
                            : 'border-slate-300 bg-white dark:bg-slate-800 hover:border-slate-400'
                        }`}
                      >
                        {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                      <span>{theme}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Grupo 3: Localização (Dropdown) */}
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

            {/* Botão Aplicar Filtros com Gradiente Azul/Esmeralda */}
            <button
              type="button"
              className="w-full py-2.5 rounded-xl bg-[#1455AC] hover:bg-[#0F448A] text-white font-bold text-xs shadow-xs transition-all cursor-pointer mt-1"
            >
              Aplicar Filtros
            </button>
          </aside>

          {/* COLUNA CENTRAL: Hero Banner, Comunidades e Iniciativas (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* HERO BANNER: "Direitos não são privilégios. São dignidade." */}
            <section
              id="hero-direitos-humanos-banner"
              className="relative rounded-2xl overflow-hidden min-h-[260px] flex items-center text-white shadow-sm border border-slate-900/10 bg-[#1E1B4B] group"
            >
              {/* Imagem de Fundo com braços erguidos em união */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="/imagens-paginas/05-comunidade-global/direitos-humanos/1direitoshumanos.png"
                  alt="Pessoas unidas pelos direitos humanos"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Gradiente Escuro para Leitura */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/75 to-[#0F172A]/25" />
              </div>

              <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Textos da Esquerda */}
                <div className="max-w-md flex flex-col gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                    Direitos não são <br />
                    privilégios. São dignidade.
                  </h2>
                  <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                    Descubra comunidades que defendem direitos humanos em todo o mundo e faça parte da mudança.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (TRENDING_HR_COMMUNITIES.length > 0) {
                          setSelectedCommunityModal(TRENDING_HR_COMMUNITIES[0]);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F172A] dark:text-slate-50 text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                    >
                      <span>Juntar-se a uma comunidade</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.4]" />
                    </button>
                  </div>
                </div>

                {/* 3 Cartões de Métricas Empilhados na Direita */}
                <div className="flex sm:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
                  <div className="bg-black/35 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 flex items-center gap-3">
                    <Shield className="w-5 h-5 text-indigo-400" />
                    <div>
                      <span className="block text-sm font-black text-white">3.650</span>
                      <span className="text-[10px] text-slate-200">Projetos ativos</span>
                    </div>
                  </div>

                  <div className="bg-black/35 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 flex items-center gap-3">
                    <Megaphone className="w-5 h-5 text-rose-400" />
                    <div>
                      <span className="block text-sm font-black text-white">2.180</span>
                      <span className="text-[10px] text-slate-200">Campanhas em curso</span>
                    </div>
                  </div>

                  <div className="bg-black/35 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="block text-sm font-black text-white">98</span>
                      <span className="text-[10px] text-slate-200">Países envolvidos</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção: Comunidades em tendência (Direitos Humanos) (5 Cards) */}
            <section id="comunidades-tendencia-direitos-humanos-section" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                  Comunidades em tendência (Direitos Humanos)
                </h3>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:underline cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid de 5 Cards com Botão Slider '>' */}
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {TRENDING_HR_COMMUNITIES.map((comm) => (
                    <article
                      key={comm.id}
                      onClick={() => setSelectedCommunityModal(comm)}
                      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col cursor-pointer group"
                    >
                      {/* Imagem do Card com Badge Numérica 1, 2, 3... */}
                      <div className="relative h-24 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={comm.image}
                          alt={comm.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2 left-2 w-5 h-5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold flex items-center justify-center">
                          {comm.rank}
                        </span>
                      </div>

                      {/* Informações do Card */}
                      <div className="p-2.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-[11.5px] font-bold text-[#0F172A] dark:text-slate-50 line-clamp-1 leading-snug group-hover:text-indigo-600 transition-colors">
                            {comm.name}
                          </h4>
                          <p className="text-[9.5px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-1">{comm.membersCount}</p>
                          <p className="text-[10px] text-slate-600 dark:text-slate-400 dark:text-slate-500 line-clamp-2 leading-tight mb-2">
                            {comm.description}
                          </p>
                        </div>

                        {/* Tag e Percentual de Crescimento */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1">
                          <span className="text-[9px] font-bold text-blue-700 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded truncate self-start">
                            {comm.tag}
                          </span>
                          <span className="text-[10px] font-bold text-[#10B981]">{comm.growth}</span>
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

            {/* Seção: Iniciativas em destaque (5 Cards) */}
            <section id="iniciativas-destaque-section" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                  Iniciativas em destaque
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:underline cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid de 5 Iniciativas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {HR_INITIATIVES.map((init) => (
                  <article
                    key={init.id}
                    onClick={() => setSelectedInitiativeModal(init)}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col cursor-pointer group"
                  >
                    {/* Imagem da Iniciativa com Badge */}
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

                    {/* Informações */}
                    <div className="p-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-[11.5px] font-bold text-[#0F172A] dark:text-slate-50 line-clamp-1 leading-snug group-hover:text-indigo-600 transition-colors">
                          {init.title}
                        </h4>
                        <p className="text-[9.5px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-1">{init.subtitle}</p>
                        <p className="text-[10px] text-slate-600 dark:text-slate-400 dark:text-slate-500 line-clamp-2 leading-tight">
                          {init.description}
                        </p>
                      </div>

                      {/* Rodapé */}
                      <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium truncate">{init.meta}</span>
                        {init.actionText && (
                          <span
                            className={`font-bold shrink-0 ml-1 ${
                              init.isActionLink ? 'text-blue-600 hover:underline' : 'text-emerald-600 dark:text-emerald-400'
                            }`}
                          >
                            {init.actionText}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* COLUNA DIREITA: Tendências, Atividades Recentes e CTA (lg:col-span-3) */}
          <aside className="lg:col-span-3 flex flex-col gap-4">
            {/* 1. Card: Comunidades em tendência */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50">
                  Comunidades em tendência
                </h3>
                <button
                  type="button"
                  className="text-[11px] font-bold text-[#0066FF] hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Lista 1 a 5 */}
              <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
                {TRENDING_SIDEBAR_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="py-2 flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 px-1 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 w-3 shrink-0">
                        {item.rank}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-lg ${
                          item.bg === 'bg-rainbow'
                            ? 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-indigo-500'
                            : item.bg
                        } ${item.color} flex items-center justify-center shrink-0 shadow-2xs`}
                      >
                        {item.iconType === 'equality' && <Scale className="w-4 h-4" />}
                        {item.iconType === 'speech' && <Megaphone className="w-4 h-4" />}
                        {item.iconType === 'children' && <Heart className="w-4 h-4" />}
                        {item.iconType === 'refugees' && <Globe className="w-4 h-4" />}
                        {item.iconType === 'pride' && <span className="text-[10px] font-black">🏳️‍🌈</span>}
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

            {/* 2. Card: Atividades recentes (Direitos Humanos) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50">
                  Atividades recentes (Direitos Humanos)
                </h3>
                <button
                  type="button"
                  className="text-[11px] font-bold text-[#0066FF] hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
                {RECENT_ACTIVITIES.map((act) => (
                  <div key={act.id} className="py-2.5 flex items-start gap-2.5">
                    <img
                      src={act.avatar}
                      alt={act.user}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 shrink-0 mt-0.5"
                    />
                    <div className="min-w-0 flex-1 text-[11px] leading-tight">
                      <p className="text-slate-700 dark:text-slate-300">
                        <strong className="font-bold text-[#0F172A] dark:text-slate-50">{act.user}</strong>{' '}
                        {act.action}{' '}
                        <strong className="font-bold text-[#0F172A] dark:text-slate-50">{act.target}</strong>
                      </p>
                      <span className="text-[9.5px] text-slate-400 dark:text-slate-500 block mt-0.5">
                        {act.timeAgo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Card CTA: "Seja a voz da mudança. Defenda direitos. Inspire ações." */}
            <div
              id="cta-direitos-humanos-card"
              className="relative rounded-2xl overflow-hidden p-5 text-white bg-gradient-to-br from-[#312E81] via-[#4338CA] to-[#6366F1] shadow-md flex flex-col justify-between min-h-[170px]"
            >
              <div className="relative z-10 max-w-[210px] flex flex-col gap-1">
                <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                  Seja a voz da mudança. <br />
                  Defenda direitos. Inspire ações.
                </h3>
                <p className="text-[10.5px] text-white/85 leading-snug">
                  Crie ou participe de comunidades que protegem a dignidade humana em todo o mundo.
                </p>
              </div>

              {/* Botão Branco */}
              <div className="relative z-10 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#312E81] text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <span>Criar Comunidade</span>
                  <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
                </button>
              </div>

              {/* Ilustração no Canto Inferior Direito: Grupo diverso com megafone e cartazes */}
              <div className="absolute right-0 -bottom-1 pointer-events-none opacity-95">
                <svg width="115" height="100" viewBox="0 0 115 100" fill="none">
                  {/* Globo de Fundo */}
                  <circle cx="75" cy="50" r="32" fill="#4F46E5" fillOpacity="0.4" />
                  <ellipse cx="75" cy="50" rx="20" ry="32" stroke="#818CF8" strokeWidth="1" strokeOpacity="0.5" />
                  {/* Pessoas em Ilustração Simplificada */}
                  <circle cx="95" cy="45" r="9" fill="#FBBF24" />
                  <path d="M85 70 C85 58, 105 58, 105 70 Z" fill="#F43F5E" />
                  {/* Pessoa Central com Megafone */}
                  <circle cx="70" cy="38" r="10" fill="#F59E0B" />
                  <path d="M57 68 C57 54, 83 54, 83 68 Z" fill="#10B981" />
                  {/* Megafone */}
                  <polygon points="52,40 40,35 40,48 52,44" fill="#FBBF24" />
                  <rect x="36" y="38" width="5" height="6" fill="#F59E0B" />
                  <path d="M42 45 L40 52" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Pessoa na Esquerda */}
                  <circle cx="48" cy="48" r="8" fill="#FCD34D" />
                  <path d="M38 72 C38 60, 58 60, 58 72 Z" fill="#3B82F6" />
                </svg>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal Criar Comunidade de Direitos Humanos */}
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
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
                  Criar Comunidade de Direitos Humanos
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">
                  Conecte pessoas, defenda liberdades e amplifique vozes.
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsCreateModalOpen(false);
              }}
              className="flex flex-col gap-3.5 mt-2"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nome da Comunidade
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Aliança pela Igualdade"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tema Principal
                </label>
                <select className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <option>Igualdade Racial</option>
                  <option>Direitos das Mulheres</option>
                  <option>Liberdade de Expressão</option>
                  <option>Direitos dos Refugiados</option>
                  <option>Direitos LGBTQIA+</option>
                  <option>Justiça Social</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Descrição e Propósito
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explique o impacto e as ações que esta comunidade busca realizar..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#3D4ED8] hover:bg-[#2D3BA8] rounded-xl shadow-xs"
                >
                  Criar Comunidade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Detalhes da Comunidade Selecionada */}
      {selectedCommunityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-md w-full overflow-hidden relative flex flex-col">
            <button
              type="button"
              onClick={() => setSelectedCommunityModal(null)}
              className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/70 w-8 h-8 rounded-full flex items-center justify-center z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-40 w-full">
              <img
                src={selectedCommunityModal.image}
                alt={selectedCommunityModal.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                {selectedCommunityModal.tag}
              </span>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50">
                  {selectedCommunityModal.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">
                  {selectedCommunityModal.membersCount} • {selectedCommunityModal.growth}
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 dark:text-slate-500 leading-relaxed">
                {selectedCommunityModal.description}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    toggleJoinCommunity(selectedCommunityModal.id);
                    setSelectedCommunityModal(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    joinedCommunities.has(selectedCommunityModal.id)
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      : 'bg-[#3D4ED8] text-white hover:bg-[#2D3BA8] shadow-xs'
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

      {/* Modal de Iniciativa Selecionada */}
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

            <div className="relative h-40 w-full">
              <img
                src={selectedInitiativeModal.image}
                alt={selectedInitiativeModal.title}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-3 left-3 text-[9px] font-bold text-white px-2.5 py-1 rounded ${selectedInitiativeModal.badgeBg}`}
              >
                {selectedInitiativeModal.badgeLabel}
              </span>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50">
                  {selectedInitiativeModal.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">
                  {selectedInitiativeModal.subtitle}
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 dark:text-slate-500 leading-relaxed">
                {selectedInitiativeModal.description}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500">
                  {selectedInitiativeModal.meta}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedInitiativeModal(null)}
                  className="px-4 py-2 bg-[#3D4ED8] text-white text-xs font-bold rounded-xl hover:bg-[#2D3BA8]"
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

export default CommunityHumanRightsView;
