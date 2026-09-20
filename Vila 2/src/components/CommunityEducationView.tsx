import React, { useState, useMemo } from 'react';
import {
  Globe,
  GraduationCap,
  Plus,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Users,
  Compass,
  Leaf,
  Cpu,
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
  BookOpen,
  Award,
  Video,
  FileText,
  Atom,
  Languages,
} from 'lucide-react';

export interface CommunityEducationViewProps {
  onNavigateToTab?: (tabId: string) => void;
  onNavigateToCategory?: (category: string) => void;
  onBackToOfficial?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenCreateCommunity?: () => void;
}

// Interfaces
interface TrendingEducationCommunity {
  rank: number;
  id: string;
  name: string;
  membersCount: string;
  description: string;
  tag: string;
  growth: string;
  image: string;
}

interface EducationResource {
  id: string;
  title: string;
  badgeLabel: string;
  badgeBg: string;
  image: string;
  subtitle: string;
  description: string;
  meta: string;
  actionText: string;
  isActionLink?: boolean;
}

interface TrendingRightItem {
  rank: number;
  id: string;
  name: string;
  members: string;
  growth: string;
  iconType: 'ai' | 'cap' | 'scholarship' | 'book' | 'stem';
  bg: string;
  color: string;
}

interface RecentEducationActivity {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  timeAgo: string;
}

// 5 Comunidades em Tendência na Educação
const TRENDING_EDUCATION_COMMUNITIES: TrendingEducationCommunity[] = [
  {
    rank: 1,
    id: 'edu-comm-1',
    name: 'IA na Educação',
    membersCount: '78.3K membros',
    description: 'Explorando como a inteligência artificial pode melhorar a aprendizagem.',
    tag: 'Tecnologia Educacional',
    growth: '▲ 22%',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
  },
  {
    rank: 2,
    id: 'edu-comm-2',
    name: 'Mulheres na Ciência',
    membersCount: '64.2K membros',
    description: 'Incentivando meninas e mulheres a liderarem na ciência e tecnologia.',
    tag: 'Equidade de Gênero',
    growth: '▲ 18%',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80',
  },
  {
    rank: 3,
    id: 'edu-comm-3',
    name: 'Bolsas pelo Mundo',
    membersCount: '76.8K membros',
    description: 'Compartilhamos oportunidades de bolsas de estudo em todo o mundo.',
    tag: 'Bolsas de Estudo',
    growth: '▲ 16%',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
  },
  {
    rank: 4,
    id: 'edu-comm-4',
    name: 'Educação Sem Fronteiras',
    membersCount: '45.1K membros',
    description: 'Recursos e metodologias para uma educação acessível e inclusiva.',
    tag: 'Educação Inclusiva',
    growth: '▲ 14%',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80',
  },
  {
    rank: 5,
    id: 'edu-comm-5',
    name: 'Leitura que Transforma',
    membersCount: '38.6K membros',
    description: 'Promovendo o hábito da leitura e o acesso a livros para todos.',
    tag: 'Leitura e Literatura',
    growth: '▲ 12%',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
  },
];

// 5 Recursos em Destaque
const EDUCATION_RESOURCES: EducationResource[] = [
  {
    id: 'res-1',
    title: 'Design Thinking na Escola',
    badgeLabel: 'CURSO',
    badgeBg: 'bg-[#6366F1]',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80',
    subtitle: 'Curso online • Iniciante',
    description: 'Aprenda a aplicar o design thinking para resolver problemas reais.',
    meta: '2.4K inscritos',
    actionText: 'Gratuito',
  },
  {
    id: 'res-2',
    title: 'Avaliação para Aprendizagem',
    badgeLabel: 'WEBINAR',
    badgeBg: 'bg-[#D97706]',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    subtitle: 'Webinar • 28 Mai 2024',
    description: 'Estratégias práticas para avaliar e potencializar o aprendizado.',
    meta: '1.1K inscritos',
    actionText: 'Gratuito',
  },
  {
    id: 'res-3',
    title: 'Guia: Ensino Híbrido',
    badgeLabel: 'GUIA',
    badgeBg: 'bg-[#059669]',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=80',
    subtitle: 'Guia prático',
    description: 'Passo a passo para implementar ensino híbrido com sucesso.',
    meta: 'PDF',
    actionText: 'Gratuito',
  },
  {
    id: 'res-4',
    title: 'Escolas Sustentáveis',
    badgeLabel: 'PROJETO',
    badgeBg: 'bg-[#EA580C]',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&auto=format&fit=crop&q=80',
    subtitle: 'Projeto colaborativo',
    description: 'Compartilhe iniciativas de sustentabilidade nas escolas.',
    meta: '860 participantes',
    actionText: 'Participar',
    isActionLink: true,
  },
  {
    id: 'res-5',
    title: 'Plataformas Educacionais',
    badgeLabel: 'FERRAMENTA',
    badgeBg: 'bg-[#0284C7]',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80',
    subtitle: 'Comparativo • 2024',
    description: 'Compare as melhores plataformas para ensino online.',
    meta: 'Acessar guia',
    actionText: 'Gratuito',
  },
];

// Dados da Barra Lateral: Tendências na Educação
const TRENDING_RIGHT_ITEMS: TrendingRightItem[] = [
  {
    rank: 1,
    id: 'tr-1',
    name: 'IA na Educação',
    members: '78.3K membros',
    growth: '▲ 22%',
    iconType: 'ai',
    bg: 'bg-[#5B4DF6]',
    color: 'text-white',
  },
  {
    rank: 2,
    id: 'tr-2',
    name: 'Educação Sem Fronteiras',
    members: '64.2K membros',
    growth: '▲ 18%',
    iconType: 'cap',
    bg: 'bg-[#0B1536]',
    color: 'text-white',
  },
  {
    rank: 3,
    id: 'tr-3',
    name: 'Bolsas pelo Mundo',
    members: '76.8K membros',
    growth: '▲ 16%',
    iconType: 'scholarship',
    bg: 'bg-[#10B981]',
    color: 'text-white',
  },
  {
    rank: 4,
    id: 'tr-4',
    name: 'Alfabetização para Todos',
    members: '52.6K membros',
    growth: '▲ 14%',
    iconType: 'book',
    bg: 'bg-[#E11D48]',
    color: 'text-white',
  },
  {
    rank: 5,
    id: 'tr-5',
    name: 'STEM para o Futuro',
    members: '41.3K membros',
    growth: '▲ 12%',
    iconType: 'stem',
    bg: 'bg-[#0284C7]',
    color: 'text-white',
  },
];

// Atividades Recentes em Educação
const RECENT_EDUCATION_ACTIVITIES: RecentEducationActivity[] = [
  {
    id: 'act-1',
    user: 'Ana Costa',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    action: 'compartilhou um recurso em',
    target: 'IA na Educação',
    timeAgo: 'Há 1 hora',
  },
  {
    id: 'act-2',
    user: 'João Pereira',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    action: 'publicou um evento em',
    target: 'Bolsas pelo Mundo',
    timeAgo: 'Há 2 horas',
  },
  {
    id: 'act-3',
    user: 'Mariana Lopes',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    action: 'comentou em um discussão em',
    target: 'Professores que Inspiram',
    timeAgo: 'Há 3 horas',
  },
  {
    id: 'act-4',
    user: 'Lucas Mendes',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    action: 'criou uma publicação em',
    target: 'Educação Inclusiva',
    timeAgo: 'Há 4 horas',
  },
  {
    id: 'act-5',
    user: 'Carla Souza',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&auto=format&fit=crop&q=80',
    action: 'entrou na comunidade',
    target: 'Leitura que Transforma',
    timeAgo: 'Há 5 horas',
  },
];

export const CommunityEducationView: React.FC<CommunityEducationViewProps> = ({
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
  const [selectedLevels, setSelectedLevels] = useState<Set<string>>(new Set());
  const [languageFilter, setLanguageFilter] = useState<string>('Qualquer idioma');
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);

  // Dropdown "Mais"
  const [isMaisDropdownOpen, setIsMaisDropdownOpen] = useState<boolean>(false);

  // Modais
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [selectedCommunityModal, setSelectedCommunityModal] = useState<TrendingEducationCommunity | null>(null);
  const [selectedResourceModal, setSelectedResourceModal] = useState<EducationResource | null>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<Set<string>>(new Set(['edu-comm-1']));

  // Alternar Checkbox Nível Educacional
  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) => {
      const next = new Set(prev);
      if (next.has(level)) next.delete(level);
      else next.add(level);
      return next;
    });
  };

  // Limpar Filtros
  const handleClearFilters = () => {
    setCommunityType('Todas');
    setSelectedLevels(new Set());
    setLanguageFilter('Qualquer idioma');
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
    <div id="community-education-view" className="w-full bg-[#F8FAFC] dark:bg-slate-950 min-h-screen text-[#0F172A] dark:text-slate-50 flex flex-col">
      {/* Conteúdo Principal (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* 2. Cabeçalho de Educação com Ícone, Título, Métricas e Botão Criar Comunidade (mesmo padrão da seção de tecnologia) */}
        <section id="educacao-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            {/* Ícone Quadrado Arredondado com Capelo Azul */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#EEF2FF] border border-indigo-200/80 flex items-center justify-center shrink-0 shadow-2xs">
              <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-[#4F46E5]" strokeWidth={2.2} />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-slate-50 tracking-tight leading-tight">
                Educação
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-normal leading-snug">
                Aprendizagem para todos. Compartilhe conhecimento, recursos e oportunidades educacionais.
              </p>

              {/* Fita de Métricas: Comunidades, Membros e Países */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-1.5 text-[11.5px] sm:text-xs font-semibold text-[#64748B] dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">1.572</strong> comunidades
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">285.620</strong> membros
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 dark:text-slate-500" />
                  <strong className="font-bold text-[#0F172A] dark:text-slate-50">192</strong> países
                </span>
              </div>
            </div>
          </div>

          {/* Botão Criar Comunidade (da mesma forma que está na seção de tecnologia) */}
          <button
            type="button"
            onClick={() => {
              if (onOpenCreateCommunity) {
                onOpenCreateCommunity();
              } else {
                setIsCreateModalOpen(true);
              }
            }}
            id="btn-criar-comunidade-educacao"
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Criar Comunidade</span>
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </section>

        {/* 3. Fita Horizontal de Categorias (com Educação Selecionada) */}
        <nav
          id="categories-ribbon-educacao"
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
            const isActive = cat.id === 'educacao';

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (onNavigateToCategory) onNavigateToCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-[#3730A3] text-white shadow-xs'
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

        {/* 4. Grade Principal de Três Colunas (Filtros, Hero/Conteúdo e Tendências alinhados no mesmo nível) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* COLUNA ESQUERDA: Filtros (lg:col-span-2) */}
          <aside
            id="filtros-educacao-sidebar"
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
                  'Escolas e Universidades',
                  'Cursos e Formação',
                  'Grupos de Estudo',
                  'Educação Infantil',
                  'Educação Inclusiva',
                  'Pesquisa e Inovação',
                  'Bolsa de Estudos',
                  'Iniciativas Educacionais',
                ].map((type) => {
                  const isChecked = communityType === type;
                  return (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-[11.5px] text-[#334155] dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        name="edu-community-type"
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

            {/* Grupo 2: Nível Educacional (Checkboxes) */}
            <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Nível Educacional</span>
              <div className="flex flex-col gap-1.5">
                {[
                  'Educação Infantil',
                  'Ensino Fundamental',
                  'Ensino Médio',
                  'Ensino Superior',
                  'Pós-graduação',
                  'Educação Contínua',
                ].map((level) => {
                  const isChecked = selectedLevels.has(level);
                  return (
                    <label
                      key={level}
                      className="flex items-center gap-2 text-[11.5px] text-[#334155] dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleLevel(level)}
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
                      <span>{level}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Grupo 3: Idioma (Dropdown) */}
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
                      {languageFilter === lang && <Check className="w-3 h-3 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botão Aplicar Filtros */}
            <button
              type="button"
              className="w-full py-2.5 rounded-xl bg-[#1455AC] hover:bg-[#0F448A] text-white font-bold text-xs shadow-xs transition-all cursor-pointer mt-1"
            >
              Aplicar Filtros
            </button>
          </aside>

          {/* COLUNA CENTRAL: Hero Banner, Comunidades e Recursos (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* HERO BANNER: "Educação que transforma vidas" com 3 Métricas Integradas */}
            <section
              id="hero-educacao-banner"
              className="relative rounded-2xl overflow-hidden min-h-[260px] flex items-center text-white shadow-sm border border-slate-900/10 bg-[#1E293B] group"
            >
              {/* Imagem de Fundo com Estudantes e Laptop */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="/imagens-paginas/05-comunidade-global/educacao/PrincipalCard.png"
                  alt="Estudantes e professores em sala de aula"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Gradiente Escuro na Esquerda para Leitura */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/75 to-[#0F172A]/30" />
              </div>

              <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Textos da Esquerda */}
                <div className="max-w-md flex flex-col gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                    Educação <br />
                    que transforma vidas
                  </h2>
                  <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                    Junte-se a educadores e aprendizes do mundo todo para construir um futuro com mais conhecimento, equidade e oportunidades.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (TRENDING_EDUCATION_COMMUNITIES.length > 0) {
                          setSelectedCommunityModal(TRENDING_EDUCATION_COMMUNITIES[0]);
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
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <div>
                      <span className="block text-sm font-black text-white">8.450</span>
                      <span className="text-[10px] text-slate-200">Recursos compartilhados</span>
                    </div>
                  </div>

                  <div className="bg-black/35 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-indigo-400" />
                    <div>
                      <span className="block text-sm font-black text-white">3.120</span>
                      <span className="text-[10px] text-slate-200">Cursos e formações</span>
                    </div>
                  </div>

                  <div className="bg-black/35 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="block text-sm font-black text-white">192</span>
                      <span className="text-[10px] text-slate-200">Países envolvidos</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção: Comunidades em tendência na Educação (5 Cards) */}
            <section id="comunidades-tendencia-educacao-section" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                  Comunidades em tendência na Educação
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {TRENDING_EDUCATION_COMMUNITIES.map((comm) => (
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

            {/* Seção: Recursos em destaque (5 Cards) */}
            <section id="recursos-destaque-section" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                  Recursos em destaque
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:underline cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid de 5 Recursos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {EDUCATION_RESOURCES.map((res) => (
                  <article
                    key={res.id}
                    onClick={() => setSelectedResourceModal(res)}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col cursor-pointer group"
                  >
                    {/* Imagem do Recurso com Badge */}
                    <div className="relative h-24 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={res.image}
                        alt={res.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span
                        className={`absolute top-2 left-2 text-[8.5px] font-black text-white px-2 py-0.5 rounded shadow-2xs uppercase tracking-wider ${res.badgeBg}`}
                      >
                        {res.badgeLabel}
                      </span>
                    </div>

                    {/* Informações */}
                    <div className="p-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-[11.5px] font-bold text-[#0F172A] dark:text-slate-50 line-clamp-1 leading-snug group-hover:text-indigo-600 transition-colors">
                          {res.title}
                        </h4>
                        <p className="text-[9.5px] text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-1">{res.subtitle}</p>
                        <p className="text-[10px] text-slate-600 dark:text-slate-400 dark:text-slate-500 line-clamp-2 leading-tight">
                          {res.description}
                        </p>
                      </div>

                      {/* Rodapé */}
                      <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">{res.meta}</span>
                        <span
                          className={`font-bold ${
                            res.isActionLink ? 'text-blue-600 hover:underline' : 'text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          {res.actionText}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* COLUNA DIREITA: Card Comunidades em tendência (Educação) no Topo + Atividades + CTA (lg:col-span-3) */}
          <aside id="right-sidebar-educacao" className="lg:col-span-3 flex flex-col gap-4">
        {/* 1. Card: Comunidades em tendência (Educação) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs flex flex-col gap-4">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">
              Comunidades em tendência (Educação)
            </h3>
            <button
              type="button"
              onClick={() => {
                if (onNavigateToCategory) onNavigateToCategory('todas');
              }}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-1 shrink-0"
            >
              <span>Ver todas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Lista 1 a 5 */}
          <div className="flex flex-col space-y-3.5">
            {TRENDING_RIGHT_ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-4 text-xs font-semibold text-slate-400 dark:text-slate-500 text-center shrink-0">
                    {item.rank}
                  </span>
                  <div className={`w-9 h-9 rounded-full ${item.bg} ${item.color} flex items-center justify-center shrink-0 shadow-2xs`}>
                    {item.iconType === 'ai' && <Sparkles className="w-4 h-4 stroke-[2.2]" />}
                    {item.iconType === 'cap' && <GraduationCap className="w-4 h-4 stroke-[2.2]" />}
                    {item.iconType === 'scholarship' && <Award className="w-4 h-4 stroke-[2.2]" />}
                    {item.iconType === 'book' && <BookOpen className="w-4 h-4 stroke-[2.2]" />}
                    {item.iconType === 'stem' && <Atom className="w-4 h-4 stroke-[2.2]" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 truncate group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 block truncate font-normal">
                      {item.members}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0 flex items-center gap-0.5">
                  {item.growth}
                </span>
              </div>
            ))}
          </div>
        </div>

            {/* 2. Card: Atividades recentes (Educação) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50">
                  Atividades recentes (Educação)
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
                {RECENT_EDUCATION_ACTIVITIES.map((act) => (
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

            {/* 3. Card CTA: "Compartilhe conhecimento. Inspire o futuro." com Grafismo de Globo e Livros */}
            <div
              id="cta-educacao-card"
              className="relative rounded-2xl overflow-hidden p-5 text-white bg-gradient-to-br from-[#4338CA] via-[#4F46E5] to-[#6366F1] shadow-md flex flex-col justify-between min-h-[170px]"
            >
              <div className="relative z-10 max-w-[210px] flex flex-col gap-1">
                <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                  Compartilhe conhecimento. <br />
                  Inspire o futuro.
                </h3>
                <p className="text-[10.5px] text-white/85 leading-snug">
                  Crie ou participe de comunidades educacionais e faça parte da transformação global.
                </p>
              </div>

              {/* Botão Branco */}
              <div className="relative z-10 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#4338CA] text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <span>Criar Comunidade</span>
                  <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
                </button>
              </div>

              {/* Ilustração no Canto Inferior Direito: Globo com capelo e livros */}
              <div className="absolute right-1 -bottom-1 pointer-events-none opacity-90">
                <svg width="105" height="95" viewBox="0 0 105 95" fill="none">
                  {/* Livros Empilhados */}
                  <rect x="52" y="76" width="48" height="7" rx="2" fill="#E2E8F0" />
                  <rect x="55" y="70" width="44" height="6" rx="2" fill="#F59E0B" />
                  <rect x="58" y="64" width="40" height="6" rx="2" fill="#3B82F6" />
                  {/* Globo */}
                  <circle cx="45" cy="50" r="22" fill="#10B981" />
                  <ellipse cx="45" cy="50" rx="14" ry="22" stroke="#34D399" strokeWidth="1.5" />
                  <line x1="23" y1="50" x2="67" y2="50" stroke="#34D399" strokeWidth="1.5" />
                  {/* Capelo no Topo */}
                  <polygon points="45,22 25,30 45,36 65,30" fill="#1E1B4B" />
                  <polygon points="45,36 33,32 33,40 45,43 57,40 57,32" fill="#312E81" />
                  <line x1="62" y1="30" x2="64" y2="42" stroke="#F59E0B" strokeWidth="2" />
                  <circle cx="64" cy="43" r="1.5" fill="#F59E0B" />
                </svg>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal Criar Comunidade Educacional */}
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
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                  Criar Comunidade Educacional
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">
                  Conecte educadores, estudantes e compartilhe conhecimento transformador.
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsCreateModalOpen(false);
                alert('Comunidade Educacional criada com sucesso!');
              }}
              className="flex flex-col gap-3.5 mt-1"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nome da Comunidade *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Robótica para Jovens"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tipo</label>
                  <select className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-indigo-500 outline-none">
                    <option>Cursos e Formação</option>
                    <option>Grupos de Estudo</option>
                    <option>Escolas e Universidades</option>
                    <option>Bolsa de Estudos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nível</label>
                  <select className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-indigo-500 outline-none">
                    <option>Ensino Médio</option>
                    <option>Ensino Superior</option>
                    <option>Educação Contínua</option>
                    <option>Geral</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Missão e Atividades
                </label>
                <textarea
                  rows={3}
                  placeholder="Descreva o propósito da comunidade, tópicos de estudo e frequência dos encontros..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none"
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
                  className="px-5 py-2 text-xs font-bold text-white bg-[#3D4ED8] hover:bg-[#2D3BA8] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Publicar Comunidade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detalhes da Comunidade */}
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
              <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm bg-blue-600 text-white">
                {selectedCommunityModal.tag}
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
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">{selectedCommunityModal.growth}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleJoinCommunity(selectedCommunityModal.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    joinedCommunities.has(selectedCommunityModal.id)
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-[#3D4ED8] text-white hover:bg-[#2D3BA8]'
                  }`}
                >
                  {joinedCommunities.has(selectedCommunityModal.id) ? 'Membro Ativo ✓' : 'Juntar-se +'}
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 dark:text-slate-500 leading-relaxed">
                {selectedCommunityModal.description} Uma rede internacional de educadores e alunos promovendo a troca contínua de metodologias e materiais didáticos abertos.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityEducationView;
