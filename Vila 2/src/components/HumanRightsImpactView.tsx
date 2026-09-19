import React, { useState } from 'react';
import { ImpactRegionMapCard } from './ImpactRegionMapCard';
import { ImpactAnalyticsSection } from './ImpactAnalyticsSection';
import {
  Scale,
  Users,
  Globe,
  Heart,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  X,
  Compass,
  Leaf,
  Zap,
  GraduationCap,
  Activity,
  Rocket,
  Palette,
  MoreHorizontal,
  Megaphone,
  Gavel,
  HeartHandshake,
  ShieldCheck,
  BookOpen,
  Database,
  Coins,
  Video,
  FileText,
  Landmark,
  Clock,
  ShieldAlert,
} from 'lucide-react';

export interface HumanRightsImpactViewProps {
  onOpenAiAssistant?: () => void;
  onExploreWorld?: () => void;
  onExploreCommunity?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onNavigateToTab?: (tabId: string) => void;
  onNavigateToCategory?: (category: string) => void;
}

interface ProjectItem {
  id: string;
  tag: string;
  badgeColor: string;
  title: string;
  location: string;
  description: string;
  impactPeople: string;
  progressPercent: number;
  imageUrl: string;
}

export const HumanRightsImpactView: React.FC<HumanRightsImpactViewProps> = ({
  onOpenAiAssistant = () => {},
  onExploreWorld = () => {},
  onExploreCommunity = () => {},
  onOpenMobileMenu,
  onOpenAuth = () => {},
  onNavigateToTab = (_tabId?: string) => {},
  onNavigateToCategory,
}) => {
  const [activeCategory] = useState<string>('direitos');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeToolModal, setActiveToolModal] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [supportSuccessToast, setSupportSuccessToast] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(25);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  const showToast = (msg: string) => {
    setSupportSuccessToast(msg);
    setTimeout(() => setSupportSuccessToast(null), 3000);
  };

  // 1. Ribbon de Métricas do Topo (7 Métricas exatas da imagem)
  const ribbonMetrics = [
    { label: 'Iniciativas Ativas', value: '1.124', icon: <Users className="w-4 h-4 text-slate-500 dark:text-slate-400" /> },
    { label: 'Organizações', value: '276', icon: <Landmark className="w-4 h-4 text-slate-500 dark:text-slate-400" /> },
    { label: 'Países', value: '98', icon: <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400" /> },
    { label: 'Pessoas Impactadas', value: '4.875.320', icon: <Users className="w-4 h-4 text-slate-500 dark:text-slate-400" /> },
    { label: 'Campanhas Ativas', value: '214', icon: <Megaphone className="w-4 h-4 text-slate-500 dark:text-slate-400" /> },
    { label: 'Pessoas Apoiadas', value: '783.650', icon: <HeartHandshake className="w-4 h-4 text-slate-500 dark:text-slate-400" /> },
    { label: 'Horas de Voluntariado', value: '2.143.480 h', icon: <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" /> },
  ];

  // 2. Fita de Categorias
  const categories = [
    { id: 'todas', label: 'Todas', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'ambiente', label: 'Ambiente', icon: <Leaf className="w-3.5 h-3.5" /> },
    { id: 'tecnologia', label: 'Tecnologia', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'educacao', label: 'Educação', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'direitos', label: 'Direitos Humanos', icon: <Scale className="w-3.5 h-3.5" /> },
    { id: 'saude', label: 'Saúde', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'empreendedorismo', label: 'Empreendedorismo', icon: <Rocket className="w-3.5 h-3.5" /> },
    { id: 'cultura', label: 'Cultura', icon: <Palette className="w-3.5 h-3.5" /> },
  ];

  // 3. Áreas de Impacto em Direitos Humanos (6 cards alinhados em linha horizontal)
  const impactAreas = [
    {
      id: 'igualdade',
      title: 'Igualdade e Não Discriminação',
      description: 'Promover igualdade de oportunidades para todos.',
      initiativesCount: '189 iniciativas',
      icon: <Users className="w-4 h-4 text-white" />,
      circleBg: 'bg-[#7C3AED]',
    },
    {
      id: 'liberdade',
      title: 'Liberdade de Expressão',
      description: 'Defender o direito de expressar ideias e opiniões.',
      initiativesCount: '142 iniciativas',
      icon: <Megaphone className="w-4 h-4 text-white" />,
      circleBg: 'bg-[#E11D48]',
    },
    {
      id: 'criancas',
      title: 'Direitos das Crianças',
      description: 'Proteger e promover os direitos de todas as crianças.',
      initiativesCount: '161 iniciativas',
      icon: <Heart className="w-4 h-4 text-white" />,
      circleBg: 'bg-[#3D4ED8]',
    },
    {
      id: 'justica',
      title: 'Justiça e Estado de Direito',
      description: 'Garantir acesso à justiça e processos justos para todos.',
      initiativesCount: '128 iniciativas',
      icon: <Gavel className="w-4 h-4 text-white" />,
      circleBg: 'bg-[#059669]',
    },
    {
      id: 'mulheres',
      title: 'Direitos das Mulheres',
      description: 'Promover igualdade de género e combater a violência.',
      initiativesCount: '176 iniciativas',
      icon: <HeartHandshake className="w-4 h-4 text-white" />,
      circleBg: 'bg-[#D97706]',
    },
    {
      id: 'vulneraveis',
      title: 'Direitos de Grupos Vulneráveis',
      description: 'Apoiar refugiados, minorias e populações vulneráveis.',
      initiativesCount: '134 iniciativas',
      icon: <ShieldCheck className="w-4 h-4 text-white" />,
      circleBg: 'bg-[#0D9488]',
    },
  ];

  // 4. Projetos em Destaque (6 projetos para navegação 3 em 3)
  const featuredProjects: ProjectItem[] = [
    {
      id: 'p1',
      tag: 'Igualdade',
      badgeColor: 'bg-[#EC4899]',
      title: 'Juventude Sem Discriminação',
      location: 'Global',
      description: 'Promovendo inclusão e igualdade para jovens em comunidades.',
      impactPeople: '210K pessoas',
      progressPercent: 78,
      imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'p2',
      tag: 'Liberdade',
      badgeColor: 'bg-[#E11D48]',
      title: 'Vozes Livres',
      location: 'Brasil',
      description: 'Defendendo a liberdade de expressão e o jornalismo independente.',
      impactPeople: '95K pessoas',
      progressPercent: 72,
      imageUrl: 'https://images.unsplash.com/photo-1591189824344-e0e0c8a5db77?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'p3',
      tag: 'Crianças',
      badgeColor: 'bg-[#3D4ED8]',
      title: 'Infância Protegida',
      location: 'Moçambique',
      description: 'Proteção de crianças contra trabalho infantil e abuso.',
      impactPeople: '112K pessoas',
      progressPercent: 68,
      imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'p4',
      tag: 'Justiça',
      badgeColor: 'bg-[#312E81]',
      title: 'Justiça para Todos',
      location: 'Índia',
      description: 'Acesso à justiça gratuita para comunidades marginalizadas.',
      impactPeople: '88K pessoas',
      progressPercent: 75,
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'p5',
      tag: 'Refugiados',
      badgeColor: 'bg-[#0D9488]',
      title: 'Acolhimento e Dignidade',
      location: 'Grécia',
      description: 'Assistência jurídica, psicológica e habitação temporária.',
      impactPeople: '64K pessoas',
      progressPercent: 81,
      imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'p6',
      tag: 'Indígenas',
      badgeColor: 'bg-[#D97706]',
      title: 'Povos Originários',
      location: 'Colômbia',
      description: 'Demarcação de terras e proteção de líderes comunitários.',
      impactPeople: '58K pessoas',
      progressPercent: 85,
      imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&auto=format&fit=crop&q=80',
    },
  ];

  // 5. O Impacto em Números (6 cards em linha horizontal)
  const impactCards = [
    {
      id: 'num1',
      value: '4.875.320',
      label: 'Pessoas Impactadas',
      change: '12,4% este mês',
      icon: <Users className="w-5 h-5 text-[#312E81]" />,
      sparkline: [25, 30, 42, 38, 55, 62, 70, 85, 95],
    },
    {
      id: 'num2',
      value: '276',
      label: 'Organizações Parceiras',
      change: '8,7% este mês',
      icon: <Landmark className="w-5 h-5 text-[#312E81]" />,
      sparkline: [30, 32, 45, 52, 60, 58, 68, 80, 92],
    },
    {
      id: 'num3',
      value: '214',
      label: 'Campanhas Ativas',
      change: '15,3% este mês',
      icon: <Megaphone className="w-5 h-5 text-[#312E81]" />,
      sparkline: [20, 28, 35, 48, 44, 60, 72, 85, 98],
    },
    {
      id: 'num4',
      value: '783.650',
      label: 'Pessoas Apoiadas',
      change: '11,6% este mês',
      icon: <HeartHandshake className="w-5 h-5 text-[#312E81]" />,
      sparkline: [35, 38, 42, 50, 62, 70, 68, 84, 91],
    },
    {
      id: 'num5',
      value: '2.143.480 h',
      label: 'Horas de Voluntariado',
      change: '14,2% este mês',
      icon: <Clock className="w-5 h-5 text-[#312E81]" />,
      sparkline: [22, 28, 38, 46, 52, 65, 75, 82, 94],
    },
    {
      id: 'num6',
      value: '98',
      label: 'Países',
      change: '6,3% este mês',
      icon: <Globe className="w-5 h-5 text-[#312E81]" />,
      sparkline: [28, 35, 44, 52, 50, 68, 77, 85, 96],
    },
  ];

  // 6. Mais Populares em Direitos Humanos (Right Sidebar)
  const popularInitiatives = [
    {
      id: 'pop1',
      rank: 1,
      title: 'Igualdade e Não Discriminação',
      supporters: '215K apoiadores',
      growth: '24%',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop2',
      rank: 2,
      title: 'Liberdade de Expressão',
      supporters: '162K apoiadores',
      growth: '18%',
      avatar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop3',
      rank: 3,
      title: 'Direitos das Crianças',
      supporters: '128K apoiadores',
      growth: '16%',
      avatar: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop4',
      rank: 4,
      title: 'Acesso à Justiça',
      supporters: '98K apoiadores',
      growth: '15%',
      avatar: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop5',
      rank: 5,
      title: 'Direitos das Mulheres',
      supporters: '87K apoiadores',
      growth: '12%',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&auto=format&fit=crop&q=80',
    },
  ];

  // 7. Recursos e Ferramentas (Right Sidebar)
  const toolsAndResources = [
    {
      id: 'guia',
      title: 'Guia de Direitos Humanos',
      description: 'Aprenda sobre direitos fundamentais',
      icon: <BookOpen className="w-4 h-4 text-[#6366F1]" />,
      bg: 'bg-indigo-50/80 border-indigo-100',
    },
    {
      id: 'monitor',
      title: 'Ferramenta de Monitorização',
      description: 'Acompanhe violações e alertas',
      icon: <ShieldAlert className="w-4 h-4 text-[#4F46E5]" />,
      bg: 'bg-violet-50/80 border-violet-100',
    },
    {
      id: 'base',
      title: 'Base de Dados de Organizações',
      description: 'Encontre ONGs e defensores',
      icon: <Database className="w-4 h-4 text-[#3D4ED8]" />,
      bg: 'bg-blue-50 dark:bg-blue-500/10/80 border-blue-100',
    },
    {
      id: 'financiamento',
      title: 'Financiamento e Doações',
      description: 'Apoie causas de direitos humanos',
      icon: <Coins className="w-4 h-4 text-[#D97706]" />,
      bg: 'bg-amber-50 dark:bg-amber-500/10/80 border-amber-100',
    },
    {
      id: 'cursos',
      title: 'Cursos e Capacitações',
      description: 'Formação em direitos humanos',
      icon: <GraduationCap className="w-4 h-4 text-[#059669]" />,
      bg: 'bg-emerald-50 dark:bg-emerald-500/10/80 border-emerald-100',
    },
    {
      id: 'webinars',
      title: 'Webinars e Debates',
      description: 'Participe de eventos e discussões',
      icon: <Video className="w-4 h-4 text-[#0D9488]" />,
      bg: 'bg-teal-50/80 border-teal-100',
    },
    {
      id: 'documentos',
      title: 'Documentos e Relatórios',
      description: 'Acesse estudos e relatórios globais',
      icon: <FileText className="w-4 h-4 text-[#7C3AED]" />,
      bg: 'bg-purple-50 dark:bg-purple-500/10/80 border-purple-100',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-16 antialiased text-[#1E293B] dark:text-slate-100">
      {/* TOAST FLUTUANTE */}
      {supportSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#312E81] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-violet-700 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-violet-300" />
          <span className="text-sm font-semibold">{supportSuccessToast}</span>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* TÍTULO + BOTÃO APOIAR INICIATIVA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#312E81] flex items-center justify-center shrink-0 shadow-sm">
              <Scale className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                Direitos Humanos
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mt-0.5">
                Dignidade, igualdade e justiça para todas as pessoas, em todos os lugares.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="self-start sm:self-center inline-flex items-center gap-2 bg-[#312E81] hover:bg-[#26246a] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer group"
          >
            <span>Apoiar iniciativa</span>
            <Heart className="w-4 h-4 text-violet-200 group-hover:fill-current group-hover:text-rose-400 transition-colors" />
          </button>
        </div>

        {/* STATS RIBBON (7 METRICS IN 1 WHITE BAR) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-3 sm:p-4 shadow-2xs overflow-x-auto">
          <div className="flex items-center justify-between min-w-[860px] divide-x divide-slate-100 dark:divide-slate-700">
            {ribbonMetrics.map((m, idx) => (
              <div key={idx} className="flex items-center gap-3 px-3.5 first:pl-1 last:pr-1 flex-1">
                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  {m.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-black text-[#0F1E3D] font-['Outfit'] tracking-tight truncate">
                    {m.value}
                  </div>
                  <div className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium truncate">
                    {m.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY FILTER RIBBON */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (onNavigateToCategory) {
                    onNavigateToCategory(cat.id === 'direitos' ? 'direitos-humanos' : cat.id);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#312E81] text-white shadow-xs border border-[#312E81]'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => {
              if (onNavigateToCategory) {
                onNavigateToCategory('mais');
              } else if (onNavigateToTab) {
                onNavigateToTab('mais');
              } else {
                showToast('Mais categorias em breve!');
              }
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
            <span>Mais</span>
          </button>
        </div>

        {/* LAYOUT PRINCIPAL: COLUNA PRINCIPAL (LADO ESQUERDO/CENTRAL) E SIDEBAR (DIREITA) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* COLUNA ESQUERDA/CENTRAL (9 COLUNAS NO DESKTOP) */}
          <div className="xl:col-span-9 space-y-6">
            {/* 1. HERO: MÃOS UNIDAS + IMPACTO EM DIREITOS HUMANOS (AO LADO DE "MAIS POPULARES") */}
            <div className="rounded-3xl bg-[#090623] text-white border border-violet-950/60 relative overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 min-h-[290px]">
              {/* Imagem de Fundo (Mãos unidas) cobrindo o centro e lado direito */}
              <div className="lg:col-span-12 lg:absolute lg:inset-0 lg:col-start-1">
                <img
                  src="/imagens-paginas/06-impacto-global/direitos-humanos/1direitoshumanos.png"
                  alt="Mãos unidas em solidariedade e dignidade"
                  className="w-full h-full object-cover object-center opacity-90"
                  referrerPolicy="no-referrer"
                />
                {/* Gradiente escuro para perfeita legibilidade dos textos da esquerda e destaque da foto */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#090623] via-[#090623]/80 to-transparent" />
              </div>

              <div className="relative z-10 lg:col-span-7 p-6 sm:p-7 lg:p-8 flex flex-col justify-center space-y-3.5">
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black font-['Outfit'] leading-tight tracking-tight text-white max-w-lg">
                  Direitos Humanos<br />são direitos de todos.
                </h2>
                <p className="text-xs sm:text-sm text-violet-100/85 font-normal leading-relaxed max-w-md">
                  Promovemos a dignidade humana, a igualdade, a liberdade e a justiça. Apoie iniciativas que defendem e protegem os direitos fundamentais em todo o mundo.
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => {
                      const el = document.getElementById('projetos-destaque');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#312E81] hover:bg-violet-50 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer group"
                  >
                    <span>Explorar iniciativas de direitos humanos</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="relative z-10 lg:col-span-5 p-4 sm:p-5 lg:my-4 lg:mr-5 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 space-y-3 self-center mx-4 mb-4 lg:mx-0 lg:mb-0">
                <h3 className="text-xs font-bold text-violet-200 font-['Outfit'] uppercase tracking-wider">
                  Impacto em Direitos Humanos
                </h3>
                <div className="space-y-2.5 text-xs">
                  {[
                    { icon: <Users className="w-3.5 h-3.5" />, value: '4.875.320', label: 'Pessoas Impactadas' },
                    { icon: <Landmark className="w-3.5 h-3.5" />, value: '276', label: 'Organizações' },
                    { icon: <Megaphone className="w-3.5 h-3.5" />, value: '214', label: 'Campanhas Ativas' },
                    { icon: <HeartHandshake className="w-3.5 h-3.5" />, value: '783.650', label: 'Pessoas Apoiadas' },
                    { icon: <Clock className="w-3.5 h-3.5" />, value: '2.143.480 h', label: 'Horas de Voluntariado' },
                    { icon: <Globe className="w-3.5 h-3.5" />, value: '98', label: 'Países' },
                  ].map((row, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-violet-500/20 text-violet-300 flex items-center justify-center shrink-0">
                        {row.icon}
                      </div>
                      <div>
                        <div className="font-extrabold text-white text-xs sm:text-sm font-['Outfit'] leading-none">{row.value}</div>
                        <div className="text-[10.5px] text-violet-100/70 mt-0.5">{row.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. ÁREAS DE IMPACTO EM DIREITOS HUMANOS (6 CARDS EM UMA LINHA CONTÍNUA) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                  Áreas de impacto em direitos humanos
                </h2>
                <button
                  onClick={() => showToast('Exibindo todas as 6 áreas de impacto')}
                  className="text-xs font-bold text-[#312E81] hover:text-[#26246a] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
                {impactAreas.map((area) => (
                  <div
                    key={area.id}
                    onClick={() => showToast(`Área selecionada: ${area.title}`)}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:shadow-xs hover:border-violet-300 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className={`w-9 h-9 rounded-full ${area.circleBg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-xs`}>
                        {area.icon}
                      </div>
                      <h3 className="text-xs sm:text-[13px] font-bold text-[#0F1E3D] font-['Outfit'] mb-1 leading-snug line-clamp-2 min-h-[34px]">
                        {area.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 min-h-[32px]">
                        {area.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#059669]">
                        {area.initiativesCount}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. PROJETOS EM DESTAQUE (4 CARDS) + IMPACTO POR REGIÃO (SIDE-BY-SIDE) */}
            <section id="projetos-destaque" className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              {/* LADO ESQUERDO: PROJETOS EM DESTAQUE (3 EM 3 CARDS) COM NAVEGAÇÃO */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                    Projetos em destaque
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, featuredProjects.length - 3)))}
                      className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 cursor-pointer shadow-2xs transition-colors"
                      aria-label="Anterior"
                      title="Projetos anteriores"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCarouselIndex((prev) => (prev < featuredProjects.length - 3 ? prev + 1 : 0))}
                      className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 cursor-pointer shadow-2xs transition-colors"
                      aria-label="Seguinte"
                      title="Próximos projetos"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 h-full">
                    {featuredProjects.slice(carouselIndex, carouselIndex + 3).map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => setSelectedProject(proj)}
                        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:shadow-xs overflow-hidden transition-all cursor-pointer flex flex-col group justify-between"
                      >
                        <div>
                          <div className="relative h-28 sm:h-32 overflow-hidden bg-slate-100 dark:bg-slate-800">
                            <img
                              src={proj.imageUrl}
                              alt={proj.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9.5px] font-bold ${proj.badgeColor} text-white shadow-xs`}>
                              {proj.tag}
                            </span>
                          </div>

                          <div className="p-3.5 space-y-1">
                            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                              {proj.location}
                            </div>
                            <h3 className="text-xs sm:text-[13px] font-bold text-[#0F1E3D] font-['Outfit'] leading-snug line-clamp-1 group-hover:text-[#312E81] transition-colors mt-0.5">
                              {proj.title}
                            </h3>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-1">
                              {proj.description}
                            </p>
                          </div>
                        </div>

                        <div className="p-3.5 pt-0 space-y-1.5">
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10.5px]">
                            <span className="text-slate-500 dark:text-slate-400 truncate">
                              Impactadas: <strong className="text-slate-800 dark:text-slate-100 font-bold">{proj.impactPeople}</strong>
                            </span>
                            <span className="font-bold text-[#312E81] shrink-0">{proj.progressPercent}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#312E81] rounded-full transition-all duration-500"
                              style={{ width: `${proj.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Botão de navegação do carrossel no canto direito */}
                  <button
                    type="button"
                    onClick={() => setCarouselIndex((prev) => (prev < featuredProjects.length - 3 ? prev + 1 : 0))}
                    className="hidden md:flex absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#312E81] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer z-10"
                    title="Próximos projetos"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* LADO DIREITO: IMPACTO POR REGIÃO (Mapa Geográfico Autêntico e Interativo) */}
              <ImpactRegionMapCard
                category="direitos-humanos"
                className="lg:col-span-4"
                showFooterButton={true}
                onOpenReport={() => setIsReportModalOpen(true)}
                onSeeAll={() => setIsReportModalOpen(true)}
              />
            </section>

            {/* 3. O IMPACTO EM NÚMEROS (6 CARDS EM UMA LINHA CONTÍNUA) */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                O impacto em números
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                {impactCards.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="p-1 rounded-md bg-violet-50 shrink-0">
                          {c.icon}
                        </div>
                        <div className="text-sm sm:text-base font-black text-[#0F1E3D] font-['Outfit'] tracking-tight truncate">
                          {c.value}
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-1.5 truncate">
                        {c.label}
                      </div>
                      <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
                        ▲ {c.change}
                      </div>
                    </div>

                    <div className="h-8 w-full pt-1.5 mt-2">
                      <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id={`spark-${c.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <polyline
                          fill={`url(#spark-${c.id})`}
                          stroke="#7C3AED"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={c.sparkline.map((val, idx) => `${idx * 12.5},${30 - (val / 100) * 24}`).join(' ')}
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. ANÁLISE DE IMPACTO — GRÁFICOS COMPLETOS (LINHA TEMPORAL + DONUT) */}
            <ImpactAnalyticsSection
              accent="#312E81"
              softBg="bg-indigo-50"
              labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']}
              series={[
                {
                  name: 'Pessoas apoiadas (K)',
                  color: '#4C1D95',
                  values: [54, 58, 56, 62, 66, 64, 70, 74, 77, 82, 85, 90],
                },
                {
                  name: 'Campanhas ativas',
                  color: '#8B5CF6',
                  values: [32, 35, 34, 38, 41, 40, 44, 47, 49, 52, 55, 58],
                },
              ]}
              slices={[
                { label: 'África', value: 34, color: '#4C1D95' },
                { label: 'Ásia', value: 26, color: '#7C3AED' },
                { label: 'América Latina', value: 20, color: '#8B5CF6' },
                { label: 'Europa', value: 14, color: '#A78BFA' },
                { label: 'América do Norte', value: 6, color: '#C4B5FD' },
              ]}
            />
          </div>

          {/* COLUNA DIREITA (SIDEBAR DE 3 COLUNAS) */}
          <div className="xl:col-span-3 space-y-6">
            {/* 1. MAIS POPULARES EM DIREITOS HUMANOS (ALINHADO AO LADO DO HERO) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between pb-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-[#0F1E3D] font-['Outfit']">
                  Mais populares em Direitos Humanos
                </h3>
                <button
                  onClick={() => showToast('Exibindo ranking completo de popularidade')}
                  className="text-xs font-bold text-[#312E81] hover:text-[#26246a] inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {popularInitiatives.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => showToast(`Iniciativa: ${item.title}`)}
                    className="flex items-center justify-between gap-2.5 p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10.5px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0">
                        {item.rank}
                      </span>
                      <img
                        src={item.avatar}
                        alt={item.title}
                        className="w-9 h-9 rounded-xl object-cover shrink-0 border border-slate-100 dark:border-slate-800 group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#0F1E3D] truncate group-hover:text-[#312E81] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {item.supporters}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-[#059669] shrink-0">
                      ▲ {item.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. RECURSOS E FERRAMENTAS */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between pb-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-[#0F1E3D] font-['Outfit']">
                  Recursos e ferramentas
                </h3>
                <button
                  onClick={() => showToast('Todos os recursos disponíveis')}
                  className="text-xs font-bold text-[#312E81] hover:text-[#26246a] inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1.5">
                {toolsAndResources.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setActiveToolModal(t.title)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-xl ${t.bg} border flex items-center justify-center shrink-0`}>
                        {t.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#0F1E3D] group-hover:text-[#312E81] transition-colors truncate">
                          {t.title}
                        </div>
                        <div className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate">
                          {t.description}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* 3. CTA "DEFENDER DIREITOS É CONSTRUIR UM FUTURO MAIS JUSTO" COM IMAGEM DE MÃOS E SILHUETAS */}
            <div className="rounded-3xl bg-gradient-to-br from-[#1A163B] via-[#1E1B4B] to-[#2E1065] text-white p-5 sm:p-6 border border-violet-900/40 relative overflow-hidden shadow-sm flex flex-col justify-between min-h-[300px]">
              {/* Imagem de mãos com silhuetas de papel unidas na lateral direita */}
              <div className="absolute right-0 top-0 bottom-0 w-[44%] overflow-hidden pointer-events-none">
                <img
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&auto=format&fit=crop&q=80"
                  alt="Defender direitos humanos com mãos unidas"
                  className="w-full h-full object-cover object-left"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A163B] via-[#1A163B]/70 to-transparent" />
              </div>

              <div className="relative z-10 space-y-2 max-w-[62%]">
                <h3 className="text-sm sm:text-base font-black font-['Outfit'] leading-snug text-white">
                  Defender direitos é construir um futuro mais justo para todos.
                </h3>
                <p className="text-xs text-violet-200/80 leading-relaxed font-normal">
                  Junte-se a iniciativas que protegem a dignidade humana em todo o mundo.
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <button
                  onClick={() => setIsSupportModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-violet-50 text-[#1E1B4B] font-bold text-xs shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer group"
                >
                  <span>Explorar Iniciativas</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL: APOIAR INICIATIVA */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#312E81] text-white flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0F1E3D] font-['Outfit']">
                    Apoiar Iniciativa de Direitos Humanos
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Contribua diretamente para a defesa da dignidade humana</p>
                </div>
              </div>
              <button
                onClick={() => setIsSupportModalOpen(false)}
                className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  Escolha o valor de contribuição (EUR)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 25, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDonationAmount(amt)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        donationAmount === amt
                          ? 'bg-[#312E81] text-white border-[#312E81] shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {amt} €
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-violet-50/70 border border-violet-100 rounded-2xl text-xs text-violet-900 space-y-1">
                <span className="font-bold">Impacto estimado com {donationAmount} €:</span>
                <p className="text-[11.5px] text-violet-800">
                  Apoio jurídico para {donationAmount * 2} pessoas e {donationAmount * 3} horas de capacitação em direitos humanos para defensores locais.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSupportModalOpen(false);
                    showToast(`Obrigado pelo seu apoio de ${donationAmount} €! Iniciativa fortalecida.`);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#312E81] hover:bg-[#26246a] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Confirmar Apoio
                </button>
                <button
                  type="button"
                  onClick={() => setIsSupportModalOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DETALHES DO PROJETO */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="relative h-56">
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <span className={`absolute bottom-3 left-4 px-3 py-1 rounded-full text-xs font-bold ${selectedProject.badgeColor} text-white`}>
                {selectedProject.tag} • {selectedProject.location}
              </span>
            </div>

            <div className="p-6 pt-2 space-y-4">
              <div>
                <h3 className="text-xl font-black text-[#0F1E3D] font-['Outfit']">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {selectedProject.description} Este projeto reúne organizações locais, defensores de direitos humanos e voluntários comprometidos com mudanças estruturais duradouras.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">Pessoas Beneficiadas</span>
                  <span className="font-extrabold text-[#0F1E3D] text-sm">{selectedProject.impactPeople}</span>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">Status do Projeto</span>
                  <span className="font-extrabold text-[#312E81] text-sm">{selectedProject.progressPercent}% Concluído</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setIsSupportModalOpen(true);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#312E81] hover:bg-[#26246a] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  <span>Apoiar este Projeto</span>
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: FERRAMENTA / RECURSO */}
      {activeToolModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black text-[#0F1E3D] font-['Outfit']">
                {activeToolModal}
              </h3>
              <button
                onClick={() => setActiveToolModal(null)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              O módulo <strong>{activeToolModal}</strong> faz parte do ecossistema aberto VILA para apoiar defensores de direitos humanos, organizações e cidadãos com informação confiável e recursos práticos.
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-violet-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Acesso público e gratuito</span>
              </div>
              <div className="flex items-center gap-2 text-violet-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dados verificados por parceiros independentes</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveToolModal(null);
                  showToast(`${activeToolModal} iniciado com sucesso!`);
                }}
                className="w-full py-2.5 px-4 bg-[#312E81] hover:bg-[#26246a] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Abrir Ferramenta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: RELATÓRIO COMPLETO */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-black text-[#0F1E3D] font-['Outfit']">
                  Relatório de Impacto Regional
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Distribuição global de iniciativas de direitos humanos ativas</p>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-violet-50/60 rounded-xl border border-violet-100 text-violet-900">
                <span className="font-bold block mb-1">África (34% do impacto total)</span>
                Campanhas de igualdade, apoio jurídico a comunidades marginalizadas e proteção de defensores de direitos humanos.
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <span className="font-bold block mb-1">Ásia (26% do impacto total)</span>
                Liberdade de expressão, proteção de minorias religiosas e acesso à justiça para populações rurais.
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <span className="font-bold block mb-1">América Latina (20% do impacto total)</span>
                Direitos das crianças, proteção de jornalistas e combate à violência de género.
              </div>
            </div>

            <button
              onClick={() => setIsReportModalOpen(false)}
              className="w-full py-2.5 px-4 bg-[#312E81] hover:bg-[#26246a] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Concluir Leitura
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HumanRightsImpactView;
