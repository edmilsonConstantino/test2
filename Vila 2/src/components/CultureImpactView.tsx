import React, { useState } from 'react';
import {
  Landmark,
  Users,
  Globe,
  Heart,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  X,
  Compass,
  Leaf,
  Cpu,
  GraduationCap,
  Scale,
  HeartPulse,
  Rocket,
  Palette,
  MoreHorizontal,
  Music,
  BookOpen,
  Camera,
  Coins,
  Theater,
  Clock,
  Building2,
  Network,
  Video,
  FileText,
  Sparkles,
  Share2,
  Check,
  Search,
} from 'lucide-react';
import { ImpactRegionMapCard, RegionImpactItem } from './ImpactRegionMapCard';
import { ImpactAnalyticsSection } from './ImpactAnalyticsSection';

const CULTURE_REGIONS: RegionImpactItem[] = [
  { id: 'africa', name: 'África', percent: 36, projectsCount: 428, highlight: true },
  { id: 'asia', name: 'Ásia', percent: 27, projectsCount: 312 },
  { id: 'latin-america', name: 'América Latina', percent: 18, projectsCount: 245 },
  { id: 'europe', name: 'Europa', percent: 11, projectsCount: 168 },
  { id: 'north-america', name: 'América do Norte', percent: 8, projectsCount: 94 },
];

export interface CultureImpactViewProps {
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
  tagColor: string;
  title: string;
  location: string;
  description: string;
  impactPeople: string;
  progressPercent: number;
  imageUrl: string;
}

export const CultureImpactView: React.FC<CultureImpactViewProps> = ({
  onOpenAiAssistant = () => {},
  onExploreWorld = () => {},
  onExploreCommunity = () => {},
  onOpenMobileMenu,
  onOpenAuth = () => {},
  onNavigateToTab = (_tabId?: string) => {},
  onNavigateToCategory,
}) => {
  const [activeCategory] = useState<string>('cultura');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeToolModal, setActiveToolModal] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [supportSuccessToast, setSupportSuccessToast] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(25);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const showToast = (msg: string) => {
    setSupportSuccessToast(msg);
    setTimeout(() => setSupportSuccessToast(null), 3000);
  };

  // 1. Fita de Métricas Globais (diretamente abaixo do título - fiel à referência visual)
  const ribbonMetrics = [
    { label: 'Iniciativas Ativas', value: '1.132', icon: <Users className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#371B80] stroke-[1.8]" /> },
    { label: 'Organizações', value: '278', icon: <Users className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#371B80] stroke-[1.8]" /> },
    { label: 'Países', value: '98', icon: <Globe className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#371B80] stroke-[1.8]" /> },
    { label: 'Pessoas Impactadas', value: '3.215.780', icon: <Users className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#371B80] stroke-[1.8]" /> },
    { label: 'Projetos de Património', value: '1.560', icon: <Landmark className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#371B80] stroke-[1.8]" /> },
    { label: 'Investimento Cultural', value: '2.145.890 €', icon: <Coins className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#371B80] stroke-[1.8]" /> },
    { label: 'Horas de Voluntariado', value: '78.540 h', icon: <Clock className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#371B80] stroke-[1.8]" /> },
  ];

  // 2. Categorias de Impacto Global
  const categories = [
    { id: 'todas', label: 'Todas', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'ambiente', label: 'Ambiente', icon: <Leaf className="w-3.5 h-3.5" /> },
    { id: 'tecnologia', label: 'Tecnologia', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'educacao', label: 'Educação', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'direitos-humanos', label: 'Direitos Humanos', icon: <Scale className="w-3.5 h-3.5" /> },
    { id: 'saude', label: 'Saúde', icon: <HeartPulse className="w-3.5 h-3.5" /> },
    { id: 'empreendedorismo', label: 'Empreendedorismo', icon: <Rocket className="w-3.5 h-3.5" /> },
    { id: 'cultura', label: 'Cultura', icon: <Palette className="w-3.5 h-3.5" /> },
  ];

  // 3. Áreas de impacto em cultura (6 cards em 1 linha)
  const impactAreas = [
    {
      id: 'patrimonio',
      title: 'Património & História',
      description: 'Preservar e valorizar o património material e imaterial.',
      initiativesCount: '186 iniciativas',
      icon: <Landmark className="w-5 h-5 text-white" />,
      iconBg: 'bg-[#7C3AED]', // Roxo / Violeta
    },
    {
      id: 'artes',
      title: 'Artes & Criatividade',
      description: 'Apoio às artes visuais, música, dança, teatro e literatura.',
      initiativesCount: '162 iniciativas',
      icon: <Music className="w-5 h-5 text-white" />,
      iconBg: 'bg-[#DB2777]', // Magenta / Rosa
    },
    {
      id: 'diversidade',
      title: 'Diversidade Cultural',
      description: 'Promover o diálogo intercultural e celebrar a diversidade de expressões.',
      initiativesCount: '178 iniciativas',
      icon: <Users className="w-5 h-5 text-white" />,
      iconBg: 'bg-[#EA580C]', // Laranja
    },
    {
      id: 'educacao',
      title: 'Educação Cultural',
      description: 'Levar a cultura às escolas e comunidades, formando novas gerações.',
      initiativesCount: '142 iniciativas',
      icon: <BookOpen className="w-5 h-5 text-white" />,
      iconBg: 'bg-[#0D9488]', // Teal / Verde Petróleo
    },
    {
      id: 'industrias',
      title: 'Indústrias Criativas',
      description: 'Impulsionar economia criativa, design, moda, cinema e multimédia.',
      initiativesCount: '128 iniciativas',
      icon: <Camera className="w-5 h-5 text-white" />,
      iconBg: 'bg-[#D97706]', // Âmbar / Amarelo
    },
    {
      id: 'acesso',
      title: 'Acesso à Cultura',
      description: 'Democratizar o acesso à cultura para todos, sem barreiras.',
      initiativesCount: '134 iniciativas',
      icon: <Theater className="w-5 h-5 text-white" />,
      iconBg: 'bg-[#4F46E5]', // Índigo / Azul Real
    },
  ];

  // 4. Projetos em destaque
  const featuredProjects: ProjectItem[] = [
    {
      id: 'p1',
      tag: 'Património',
      tagColor: 'bg-[#371B80]',
      title: 'Restauração de Património Histórico',
      location: 'Portugal',
      description: 'Preservação de monumentos e locais históricos.',
      impactPeople: '85K pessoas',
      progressPercent: 78,
      imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'p2',
      tag: 'Artes',
      tagColor: 'bg-[#BE185D]',
      title: 'Festival de Músicas do Mundo',
      location: 'Brasil',
      description: 'Festival que conecta culturas através da música.',
      impactPeople: '112K pessoas',
      progressPercent: 82,
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'p3',
      tag: 'Diversidade',
      tagColor: 'bg-[#EA580C]',
      title: 'Diálogos Interculturais',
      location: 'Quénia',
      description: 'Oficinas e encontros que promovem o entendimento entre culturas.',
      impactPeople: '68K pessoas',
      progressPercent: 76,
      imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'p4',
      tag: 'Educação',
      tagColor: 'bg-[#0D9488]',
      title: 'Bibliotecas Comunitárias',
      location: 'Índia',
      description: 'Criação de bibliotecas e clubes de leitura em comunidades locais.',
      impactPeople: '95K pessoas',
      progressPercent: 70,
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'p5',
      tag: 'Artes',
      tagColor: 'bg-[#4F46E5]',
      title: 'Vila da Escultura e Tradição',
      location: 'Moçambique',
      description: 'Capacitação de jovens artesãos em técnicas ancestrais de escultura.',
      impactPeople: '45K pessoas',
      progressPercent: 88,
      imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'p6',
      tag: 'Património',
      tagColor: 'bg-[#7C3AED]',
      title: 'Tradições Vivas dos Andes',
      location: 'Peru',
      description: 'Resgate de tecelagem ancestral e preservação de idiomas nativos.',
      impactPeople: '52K pessoas',
      progressPercent: 91,
      imageUrl: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=600&auto=format&fit=crop&q=80',
    },
  ];

  // 5. O impacto em números (6 KPI cards com sparklines)
  const impactCards = [
    {
      id: 'num1',
      icon: <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      value: '3.215.780',
      label: 'Pessoas Impactadas',
      change: '12,4% este mês',
      color: '#059669',
      sparkline: [25, 30, 42, 38, 55, 62, 70, 85, 95],
    },
    {
      id: 'num2',
      icon: <Landmark className="w-4 h-4 text-blue-600" />,
      value: '1.560',
      label: 'Projetos de Património',
      change: '8,7% este mês',
      color: '#3D4ED8',
      sparkline: [30, 32, 45, 52, 60, 58, 68, 80, 92],
    },
    {
      id: 'num3',
      icon: <Coins className="w-4 h-4 text-purple-600" />,
      value: '2.145.890 €',
      label: 'Investimento Cultural',
      change: '15,2% este mês',
      color: '#7C3AED',
      sparkline: [20, 28, 35, 48, 44, 60, 72, 85, 98],
    },
    {
      id: 'num4',
      icon: <Sparkles className="w-4 h-4 text-cyan-600" />,
      value: '15.240',
      label: 'Artistas & Criadores',
      change: '11,6% este mês',
      color: '#0891B2',
      sparkline: [35, 38, 42, 50, 62, 70, 68, 84, 91],
    },
    {
      id: 'num5',
      icon: <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      value: '78.540 h',
      label: 'Horas de Voluntariado',
      change: '14,8% este mês',
      color: '#D97706',
      sparkline: [22, 28, 38, 46, 52, 65, 75, 82, 94],
    },
    {
      id: 'num6',
      icon: <Globe className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
      value: '98',
      label: 'Países',
      change: '6,3% este mês',
      color: '#E11D48',
      sparkline: [28, 35, 44, 52, 50, 68, 77, 85, 96],
    },
  ];

  // 6. Mais populares em Cultura (Sidebar)
  const popularInitiatives = [
    {
      id: 'pop1',
      rank: 1,
      title: 'Festival de Artes Globais',
      supporters: '245K apoiadores',
      growth: '24%',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop2',
      rank: 2,
      title: 'Património para o Futuro',
      supporters: '186K apoiadores',
      growth: '18%',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop3',
      rank: 3,
      title: 'Música que Transforma',
      supporters: '132K apoiadores',
      growth: '16%',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop4',
      rank: 4,
      title: 'Cinema com Impacto Social',
      supporters: '112K apoiadores',
      growth: '15%',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop5',
      rank: 5,
      title: 'Dança Sem Fronteiras',
      supporters: '98K apoiadores',
      growth: '12%',
      image: '/imagens-paginas/06-impacto-global/cultura/cultura1.png',
    },
  ];

  // 7. Recursos e ferramentas (Sidebar)
  const toolsAndResources = [
    {
      id: 'guia',
      title: 'Guia de Financiamento Cultural',
      description: 'Encontre fundos para projetos culturais',
      icon: <FileText className="w-4 h-4 text-purple-600" />,
      bg: 'bg-purple-50 dark:bg-purple-500/10 border-purple-100',
    },
    {
      id: 'colaboracao',
      title: 'Plataforma de Colaboração',
      description: 'Conecte-se com artistas e organizações',
      icon: <Network className="w-4 h-4 text-indigo-600" />,
      bg: 'bg-indigo-50 border-indigo-100',
    },
    {
      id: 'calendario',
      title: 'Calendário Cultural Global',
      description: 'Eventos, festivais e chamadas abertas',
      icon: <Clock className="w-4 h-4 text-blue-600" />,
      bg: 'bg-blue-50 dark:bg-blue-500/10 border-blue-100',
    },
    {
      id: 'biblioteca',
      title: 'Biblioteca de Recursos',
      description: 'Estudos, relatórios e publicações',
      icon: <BookOpen className="w-4 h-4 text-violet-600" />,
      bg: 'bg-violet-50 border-violet-100',
    },
    {
      id: 'cursos',
      title: 'Cursos e Webinars',
      description: 'Capacitação para profissionais da cultura',
      icon: <Video className="w-4 h-4 text-teal-600" />,
      bg: 'bg-teal-50 border-teal-100',
    },
    {
      id: 'parcerias',
      title: 'Parcerias Culturais',
      description: 'Conecte-se com instituições culturais',
      icon: <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      bg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100',
    },
    {
      id: 'ferramentas',
      title: 'Ferramentas Gratuitas',
      description: 'Recursos para criar e divulgar projetos',
      icon: <Sparkles className="w-4 h-4 text-pink-600" />,
      bg: 'bg-pink-50 border-pink-100',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-16 antialiased text-[#1E293B] dark:text-slate-100">
      {supportSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#371B80] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-violet-400 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-violet-200" />
          <span className="text-sm font-semibold">{supportSuccessToast}</span>
        </div>
      )}

      {/* ÁREA PRINCIPAL DA PÁGINA (Com largura máxima padronizada de 1600px) */}
      <main className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* 1. Header Superior da Página */}
        <section id="cultura-header" className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#371B80] text-white flex items-center justify-center shadow-md shrink-0">
                <Landmark className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                  Cultura
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Celebramos a diversidade, preservamos o património e fortalecemos identidades.
                </p>
              </div>
            </div>

            {/* Botão Apoiar Iniciativa */}
            <button
              type="button"
              onClick={() => setIsSupportModalOpen(true)}
              id="btn-apoiar-iniciativa-cultura"
              className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#371B80] hover:bg-[#2B1464] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer shrink-0 group"
            >
              <span>Apoiar Iniciativa</span>
              <Heart className="w-4 h-4 text-violet-200 group-hover:fill-current group-hover:text-rose-300 transition-colors" />
            </button>
          </div>

          {/* Fita de Métricas Globais (Fiel à imagem de referência enviada) */}
          <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 px-4 sm:px-6 py-3.5 shadow-2xs">
            <div className="flex items-center justify-between gap-4 lg:gap-6 overflow-x-auto no-scrollbar">
              {ribbonMetrics.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                  <div className="text-[#371B80] shrink-0 flex items-center justify-center">
                    {m.icon}
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-black text-[#0F172A] dark:text-slate-50 text-sm sm:text-[15px] font-['Outfit'] tracking-tight">
                      {m.value}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap mt-0.5">
                      {m.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Fita Horizontal de Categorias (com "Cultura" ativo) */}
        <nav
          id="categories-ribbon"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 relative"
          aria-label="Categorias de Impacto Global"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (cat.id !== 'cultura') {
                    if (onNavigateToCategory) {
                      onNavigateToCategory(cat.id);
                    } else if (onNavigateToTab) {
                      onNavigateToTab(cat.id);
                    }
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-[#371B80] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700/90 text-[#334155] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => {
              if (onNavigateToCategory) onNavigateToCategory('mais');
              else if (onNavigateToTab) onNavigateToTab('mais');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700/90 text-[#334155] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50 transition-all whitespace-nowrap cursor-pointer shadow-2xs"
          >
            <MoreHorizontal className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Mais</span>
          </button>
        </nav>

        {/* 3. Grade Principal de Conteúdo (Lado Esquerdo/Central e Barra Lateral Direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* COLUNA ESQUERDA / CENTRAL (lg:col-span-8 xl:col-span-9) */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
            {/* 3.1 HERO CARD EXCLUSIVO COM DIAGRAMA DE REDE E FOTO DA DANÇARINA */}
            <div
              id="hero-cultura"
              className="relative rounded-3xl bg-gradient-to-r from-[#0B112C] via-[#12113A] to-[#1F0C3B] p-6 sm:p-8 text-white overflow-hidden shadow-lg border border-violet-900/40"
            >
              {/* Foto da dançarina tradicional ao fundo à direita */}
              <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[60%] lg:w-[45%] pointer-events-none overflow-hidden opacity-40 sm:opacity-55 mix-blend-screen">
                <img
                  src="/imagens-paginas/06-impacto-global/cultura/cultura1.png"
                  alt="Dançarina celebrando cultura"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B112C] via-[#12113A]/70 to-transparent" />
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Lado Esquerdo do Hero: Título, Descrição e Botão */}
                <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center gap-3">
                  <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-black text-white font-['Outfit'] tracking-tight leading-snug">
                    A cultura é a alma de um povo e a ponte entre gerações.
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Apoiamos iniciativas que promovem a diversidade cultural, preservam o património, impulsionam as artes e aproximam comunidades.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('projetos-destaque');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0B112C] hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer group"
                    >
                      <span>Explorar iniciativas de cultura</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Centro do Hero: Diagrama de Constelação Cultural (Hub Central + Órbitas Conectadas) */}
                <div className="hidden md:flex md:col-span-2 lg:col-span-3 items-center justify-center relative">
                  <div className="w-44 h-44 relative flex items-center justify-center">
                    {/* Linhas de conexão do diagrama */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="62" stroke="#6366F1" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" fill="none" />
                      <line x1="80" y1="80" x2="80" y2="22" stroke="#818CF8" strokeWidth="1.5" opacity="0.6" />
                      <line x1="80" y1="80" x2="132" y2="50" stroke="#818CF8" strokeWidth="1.5" opacity="0.6" />
                      <line x1="80" y1="80" x2="132" y2="110" stroke="#818CF8" strokeWidth="1.5" opacity="0.6" />
                      <line x1="80" y1="80" x2="80" y2="138" stroke="#818CF8" strokeWidth="1.5" opacity="0.6" />
                      <line x1="80" y1="80" x2="28" y2="110" stroke="#818CF8" strokeWidth="1.5" opacity="0.6" />
                      <line x1="80" y1="80" x2="28" y2="50" stroke="#818CF8" strokeWidth="1.5" opacity="0.6" />
                    </svg>

                    {/* Nodo Central: Landmark em círculo azul */}
                    <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-lg relative z-10 border-2 border-white/20">
                      <Landmark className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    {/* Nodos Orbitais com ícones de cultura */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white text-indigo-700 flex items-center justify-center shadow-md">
                      <Music className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute top-6 right-2 w-7 h-7 rounded-full bg-white text-pink-600 flex items-center justify-center shadow-md">
                      <Theater className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute bottom-6 right-2 w-7 h-7 rounded-full bg-white text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-md">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-md">
                      <Palette className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute bottom-6 left-2 w-7 h-7 rounded-full bg-white text-teal-600 flex items-center justify-center shadow-md">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute top-6 left-2 w-7 h-7 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-md">
                      <Camera className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Lado Direito do Hero: Painel Estatístico "Impacto da Cultura" */}
                <div className="md:col-span-4 lg:col-span-4 bg-[#0B112C]/65 backdrop-blur-md rounded-2xl border border-white/15 p-4 sm:p-5 flex flex-col gap-3">
                  <h3 className="text-xs font-bold text-violet-200 font-['Outfit'] uppercase tracking-wider">
                    Impacto da Cultura
                  </h3>
                  <div className="flex flex-col gap-2.5 text-xs">
                    {[
                      { icon: <Users className="w-3.5 h-3.5 text-blue-400" />, value: '3.215.780', label: 'Pessoas Impactadas' },
                      { icon: <Landmark className="w-3.5 h-3.5 text-violet-400" />, value: '1.560', label: 'Projetos de Património' },
                      { icon: <Coins className="w-3.5 h-3.5 text-amber-400" />, value: '2.145.890 €', label: 'Investimento Cultural' },
                      { icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" />, value: '15.240', label: 'Artistas & Criadores Apoiados' },
                      { icon: <Globe className="w-3.5 h-3.5 text-teal-400" />, value: '98', label: 'Países' },
                      { icon: <Clock className="w-3.5 h-3.5 text-rose-400" />, value: '78.540 h', label: 'Horas de Voluntariado' },
                    ].map((row, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                          {row.icon}
                        </div>
                        <div className="min-w-0">
                          <span className="font-extrabold text-white text-xs font-['Outfit'] mr-1.5">{row.value}</span>
                          <span className="text-[11px] text-slate-300 font-normal">{row.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3.2 ÁREAS DE IMPACTO EM CULTURA (6 Cards em uma única linha no desktop) */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-black text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                  Áreas de impacto em cultura
                </h2>
                <button
                  type="button"
                  onClick={() => showToast('Exibindo todas as áreas de impacto em cultura')}
                  className="text-xs font-bold text-[#371B80] hover:text-[#281363] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {impactAreas.map((area) => (
                  <div
                    key={area.id}
                    onClick={() => showToast(`Filtrando por ${area.title}`)}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:shadow-xs hover:border-violet-300 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      {/* Ícone Circular Colorido */}
                      <div className={`w-10 h-10 rounded-full ${area.iconBg} flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform`}>
                        {area.icon}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] mb-1 group-hover:text-[#371B80] transition-colors leading-snug">
                        {area.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {area.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        {area.initiativesCount}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3.3 LINHA CENTRAL: PROJETOS EM DESTAQUE + IMPACTO POR REGIÃO (WIDGET COM MAPA) */}
            <section id="projetos-destaque-cultura" className="flex flex-col gap-3.5">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                {/* 3 Cards de Projetos (lg:col-span-8) */}
                <div className="lg:col-span-8 flex flex-col min-w-0">
                  <div className="flex items-center justify-between mb-3 h-7">
                    <h2 className="text-base sm:text-lg font-black text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                      Projetos em destaque
                    </h2>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, featuredProjects.length - 3)))}
                        className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 cursor-pointer shadow-2xs transition-colors"
                        aria-label="Anterior"
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCarouselIndex((prev) => (prev < featuredProjects.length - 3 ? prev + 1 : 0))}
                        className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 cursor-pointer shadow-2xs transition-colors"
                        aria-label="Seguinte"
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
                          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:shadow-xs overflow-hidden transition-all cursor-pointer flex flex-col justify-between group h-full"
                        >
                          {/* Imagem do Projeto com Badge da Categoria */}
                          <div className="relative h-28 sm:h-30 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                            <img
                              src={proj.imageUrl}
                              alt={proj.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold ${proj.tagColor} text-white shadow-xs`}>
                              {proj.tag}
                            </span>
                          </div>

                          {/* Informações do Projeto */}
                          <div className="p-3 flex-1 flex flex-col justify-between gap-2.5">
                            <div>
                              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                {proj.location}
                              </div>
                              <h3 className="text-xs sm:text-[13px] font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] mt-0.5 line-clamp-2 group-hover:text-[#371B80] transition-colors leading-snug">
                                {proj.title}
                              </h3>
                              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                {proj.description}
                              </p>
                            </div>

                            {/* Barra de Progresso e Pessoas Impactadas */}
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1">
                              <div className="flex items-center justify-between text-[10px] gap-2">
                                <span className="text-slate-500 dark:text-slate-400 truncate">
                                  Impactadas: <strong className="text-slate-800 dark:text-slate-100 font-bold">{proj.impactPeople}</strong>
                                </span>
                                <span className="font-bold text-[#371B80] whitespace-nowrap shrink-0">{proj.progressPercent}% da meta</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#371B80] rounded-full transition-all duration-500"
                                  style={{ width: `${proj.progressPercent}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Widget: Impacto por Região (lg:col-span-4) - Mesmo formato e mapa da aba de Empreendedorismo */}
                <div className="lg:col-span-4 flex flex-col min-w-0">
                  <div className="flex items-center justify-between mb-3 h-7">
                    <h2 className="text-base sm:text-lg font-black text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                      Impacto por região
                    </h2>
                    <button
                      type="button"
                      onClick={() => setIsReportModalOpen(true)}
                      className="text-xs font-semibold text-[#371B80] hover:opacity-85 inline-flex items-center gap-1 cursor-pointer transition-colors group"
                    >
                      <span>Ver todas</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  <div className="flex-1 h-full">
                    <ImpactRegionMapCard
                      category="cultura"
                      hideHeader={true}
                      className="h-full"
                      customRegions={CULTURE_REGIONS}
                      showPercentagesInLegend={true}
                      onOpenReport={() => setIsReportModalOpen(true)}
                      onSeeAll={() => setIsReportModalOpen(true)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 3.4 O IMPACTO EM NÚMEROS (6 KPI Cards com curvas sparklines) */}
            <section className="flex flex-col gap-3">
              <h2 className="text-base sm:text-lg font-black text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                O impacto em números
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {impactCards.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                          {c.icon}
                        </div>
                      </div>
                      <div className="text-base sm:text-lg font-black text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                        {c.value}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-1 truncate">
                        {c.label}
                      </div>
                      <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                        ▲ {c.change}
                      </div>
                    </div>

                    {/* Curva de Tendência Sparkline */}
                    <div className="h-8 w-full pt-1">
                      <svg viewBox="0 0 100 25" className="w-full h-full overflow-visible">
                        <polyline
                          fill="none"
                          stroke={c.color}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={c.sparkline.map((val, idx) => `${idx * 12.5},${25 - (val / 100) * 20}`).join(' ')}
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3.5 ANÁLISE DE IMPACTO — GRÁFICOS COMPLETOS (LINHA TEMPORAL + DONUT) */}
            <ImpactAnalyticsSection
              accent="#371B80"
              softBg="bg-violet-50"
              labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']}
              series={[
                {
                  name: 'Projetos culturais',
                  color: '#371B80',
                  values: [86, 92, 89, 99, 106, 103, 112, 119, 124, 132, 138, 146],
                },
                {
                  name: 'Artistas apoiados (K)',
                  color: '#7C3AED',
                  values: [58, 62, 60, 66, 71, 69, 75, 79, 82, 87, 91, 96],
                },
              ]}
              slices={[
                { label: 'Europa', value: 30, color: '#371B80' },
                { label: 'América Latina', value: 26, color: '#7C3AED' },
                { label: 'África', value: 22, color: '#8B5CF6' },
                { label: 'Ásia', value: 14, color: '#A78BFA' },
                { label: 'América do Norte', value: 8, color: '#C4B5FD' },
              ]}
            />
          </div>

          {/* COLUNA DIREITA (BARRA LATERAL DIREITA: lg:col-span-4 xl:col-span-3) */}
          <aside id="cultura-right-sidebar" className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
            {/* 1. CARD: Mais populares em Cultura */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-2xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">
                  Mais populares em Cultura
                </h3>
                <button
                  type="button"
                  onClick={() => showToast('Exibindo lista completa de mais populares')}
                  className="text-xs font-bold text-[#371B80] hover:text-[#281363] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-col space-y-3.5">
                {popularInitiatives.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => showToast(`Iniciativa: ${item.title}`)}
                    className="flex items-center justify-between gap-3 p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-4 text-center text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0">
                        {item.rank}
                      </span>
                      {/* Thumbnail circular com imagem real */}
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/60 dark:border-slate-700/60 shadow-2xs group-hover:scale-105 transition-transform">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 truncate group-hover:text-[#371B80] transition-colors leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {item.supporters}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 shrink-0">
                      <span>▲</span>
                      <span>{item.growth}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. CARD: Recursos e ferramentas */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-2xs flex flex-col gap-3.5">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">
                  Recursos e ferramentas
                </h3>
                <button
                  type="button"
                  onClick={() => showToast('Exibindo todos os recursos culturais')}
                  className="text-xs font-bold text-[#371B80] hover:text-[#281363] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-col space-y-2">
                {toolsAndResources.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setActiveToolModal(t.title)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200/60 dark:hover:border-slate-700/60 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl ${t.bg} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                        {t.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#0F172A] dark:text-slate-50 group-hover:text-[#371B80] transition-colors truncate">
                          {t.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {t.description}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* 3. CARD: BANNER PROMOCIONAL "Cultura é identidade. É memória. É futuro." */}
            <div className="rounded-2xl bg-gradient-to-br from-[#270E4E] via-[#351468] to-[#1E0B33] text-white p-5 border border-violet-900/40 relative overflow-hidden shadow-md flex flex-col justify-between min-h-[360px]">
              {/* Imagem da Dançarina Africana em Vestes Tradicionais na lateral direita */}
              <div className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none overflow-hidden opacity-85">
                <img
                  src="/imagens-paginas/06-impacto-global/cultura/cultura1.png"
                  alt="Celebração da cultura viva"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#270E4E] via-[#270E4E]/40 to-transparent" />
              </div>

              {/* Textos da Faixa Promocional */}
              <div className="relative z-10 max-w-[210px] flex flex-col gap-2 pt-2">
                <h3 className="text-lg sm:text-xl font-black font-['Outfit'] leading-tight text-white">
                  Cultura é identidade.<br />É memória. É futuro.
                </h3>
                <p className="text-xs text-violet-100/90 leading-relaxed font-normal">
                  Apoie iniciativas que mantêm vivas as nossas histórias e constroem pontes entre povos.
                </p>
              </div>

              {/* Botão de Ação */}
              <div className="relative z-10 pt-6">
                <button
                  type="button"
                  onClick={() => setIsSupportModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-violet-50 text-[#371B80] font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Explorar Iniciativas</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* MODAL: APOIAR INICIATIVA */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#371B80] text-white flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0F172A] dark:text-slate-50 font-['Outfit']">
                    Apoiar Iniciativa Cultural
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Contribua diretamente para a preservação cultural</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSupportModalOpen(false)}
                className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">Selecione o valor do apoio:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        donationAmount === amount
                          ? 'bg-[#371B80] text-white border-[#371B80] shadow-xs'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      {amount} €
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-violet-50 rounded-2xl border border-violet-100 text-xs text-violet-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-[#371B80]">
                  <Sparkles className="w-4 h-4" />
                  Impacto estimado com {donationAmount} €:
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Ajuda a financiar materiais educativos para oficinas culturais comunitárias e registro de património imaterial.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSupportModalOpen(false);
                  showToast(`Obrigado pelo seu apoio de ${donationAmount} € à Cultura!`);
                }}
                className="w-full py-3 rounded-xl bg-[#371B80] hover:bg-[#281363] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Confirmar Apoio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DETALHES DO PROJETO */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="relative h-44">
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <span className={`absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold ${selectedProject.tagColor} text-white`}>
                {selectedProject.tag} • {selectedProject.location}
              </span>
            </div>
            <div className="p-5 space-y-4">
              <h3 className="text-base font-black text-[#0F172A] dark:text-slate-50 font-['Outfit']">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedProject.description} Este projeto atua diretamente com mestres de tradição oral e comunidades locais para preservar saberes históricos.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between text-xs">
                <span>Pessoas impactadas: <strong className="text-slate-900 dark:text-slate-50">{selectedProject.impactPeople}</strong></span>
                <span className="font-bold text-[#371B80]">{selectedProject.progressPercent}% da meta</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedProject(null);
                  setIsSupportModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-[#371B80] text-white font-bold text-xs hover:bg-[#281363] transition-colors cursor-pointer"
              >
                Apoiar este Projeto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: RECURSO / FERRAMENTA */}
      {activeToolModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">
                {activeToolModal}
              </h3>
              <button
                type="button"
                onClick={() => setActiveToolModal(null)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              O recurso <strong>{activeToolModal}</strong> permite que artistas, criadores e gestores culturais tenham acesso a instrumentos de trabalho e capacitação profissional.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveToolModal(null);
                showToast(`Acesso iniciado para ${activeToolModal}`);
              }}
              className="w-full py-2 rounded-xl bg-[#371B80] text-white text-xs font-bold hover:bg-[#281363] cursor-pointer"
            >
              Aceder ao Recurso
            </button>
          </div>
        </div>
      )}

      {/* MODAL: RELATÓRIO COMPLETO */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#371B80]" />
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">
                  Relatório Global de Cultura 2026
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              O relatório consolida dados de 1.132 iniciativas em 98 países, detalhando investimentos, impacto social e salvaguarda do património material e imaterial.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-lg font-medium">
                <span>Total de Investimento:</span>
                <strong className="text-slate-900 dark:text-slate-50">2.145.890 €</strong>
              </div>
              <div className="flex justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-lg font-medium">
                <span>Comunidades Beneficiadas:</span>
                <strong className="text-slate-900 dark:text-slate-50">3.215.780 pessoas</strong>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsReportModalOpen(false);
                showToast('Download do Relatório Cultural iniciado em PDF.');
              }}
              className="w-full py-2.5 rounded-xl bg-[#371B80] text-white text-xs font-bold hover:bg-[#281363] cursor-pointer"
            >
              Baixar Relatório Completo (PDF)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
