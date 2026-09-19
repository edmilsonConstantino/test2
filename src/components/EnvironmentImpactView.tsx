import React, { useState } from 'react';
import { ImpactRegionMapCard } from './ImpactRegionMapCard';
import { ImpactAnalyticsSection } from './ImpactAnalyticsSection';
import {
  Leaf,
  Users,
  Globe,
  TrendingUp,
  Heart,
  ArrowRight,
  Sparkles,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  TreePine,
  Zap,
  GraduationCap,
  Recycle,
  Lightbulb,
  Building2,
  Droplets,
  Sun,
  X,
  Target,
  SlidersHorizontal,
  Share2,
  Scale,
  Activity,
  Rocket,
  Palette,
  MoreHorizontal,
  Calendar,
  Calculator,
  Coins,
  Video,
  Network,
  Wrench,
  ExternalLink,
  Sprout,
  Compass,
  Filter,
  Cloud,
  HeartHandshake,
  Award,
  School
} from 'lucide-react';

export interface EnvironmentImpactViewProps {
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
  title: string;
  location: string;
  description: string;
  impactPeople: string;
  progressPercent: number;
  imageUrl: string;
  category: string;
}

export const EnvironmentImpactView: React.FC<EnvironmentImpactViewProps> = ({
  onOpenAiAssistant = () => {},
  onExploreWorld = () => {},
  onExploreCommunity = () => {},
  onOpenMobileMenu,
  onOpenAuth = () => {},
  onNavigateToTab = (_tabId?: string) => {},
  onNavigateToCategory,
}) => {
  // State
  const [activeCategory, setActiveCategory] = useState<string>('ambiente');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeToolModal, setActiveToolModal] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [supportSuccessToast, setSupportSuccessToast] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(25);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  const showToast = (msg: string) => {
    setSupportSuccessToast(msg);
    setTimeout(() => setSupportSuccessToast(null), 3000);
  };

  // Top Metrics Ribbon (Fiel à referência exata da imagem)
  const ribbonMetrics = [
    { label: 'Iniciativas Ativas', value: '1.248', icon: <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-600 stroke-[1.8]" /> },
    { label: 'Organizações', value: '382', icon: <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-600 stroke-[1.8]" /> },
    { label: 'Países', value: '96', icon: <Globe className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-600 stroke-[1.8]" /> },
    { label: 'Pessoas Impactadas', value: '5.684.230', icon: <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-600 stroke-[1.8]" /> },
    { label: 'Escolas Apoiadas', value: '1.890', icon: <School className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-600 stroke-[1.8]" /> },
    { label: 'Bolsas Concedidas', value: '428.760', icon: <Award className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-600 stroke-[1.8]" /> },
    { label: 'Horas de Voluntariado', value: '2.147.580 h', icon: <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-600 stroke-[1.8]" /> },
  ];

  // Category Filter Pills
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

  // 6 Áreas de Impacto Ambiental
  const impactAreas = [
    {
      id: 'clima',
      title: 'Ação Climática',
      description: 'Redução de emissões e transição para energias renováveis.',
      initiativesCount: '312 iniciativas',
      icon: <Leaf className="w-5 h-5 text-emerald-600" />,
      iconBg: 'bg-emerald-50 border-emerald-100',
      badgeColor: 'text-emerald-700',
    },
    {
      id: 'agua',
      title: 'Água Limpa',
      description: 'Preservação de recursos hídricos e saneamento.',
      initiativesCount: '126 iniciativas',
      icon: <Droplets className="w-5 h-5 text-blue-600" />,
      iconBg: 'bg-blue-50 border-blue-100',
      badgeColor: 'text-blue-700',
    },
    {
      id: 'natureza',
      title: 'Proteção da Natureza',
      description: 'Conservação de florestas, oceanos, fauna e flora.',
      initiativesCount: '198 iniciativas',
      icon: <TreePine className="w-5 h-5 text-emerald-800" />,
      iconBg: 'bg-emerald-100/70 border-emerald-200',
      badgeColor: 'text-emerald-900',
    },
    {
      id: 'residuos',
      title: 'Resíduos & Reciclagem',
      description: 'Redução, reutilização e reciclagem de resíduos.',
      initiativesCount: '142 iniciativas',
      icon: <Recycle className="w-5 h-5 text-purple-600" />,
      iconBg: 'bg-purple-50 border-purple-100',
      badgeColor: 'text-purple-700',
    },
    {
      id: 'agricultura',
      title: 'Agricultura Sustentável',
      description: 'Práticas agrícolas que regeneram o solo e comunidades.',
      initiativesCount: '98 iniciativas',
      icon: <Sprout className="w-5 h-5 text-amber-600" />,
      iconBg: 'bg-amber-50 border-amber-100',
      badgeColor: 'text-amber-700',
    },
    {
      id: 'consumo',
      title: 'Consumo Consciente',
      description: 'Promoção de estilos de vida sustentáveis e responsáveis.',
      initiativesCount: '116 iniciativas',
      icon: <Lightbulb className="w-5 h-5 text-teal-600" />,
      iconBg: 'bg-teal-50 border-teal-100',
      badgeColor: 'text-teal-700',
    },
  ];

  // Projetos em Destaque (6 Projetos para Navegação 3 em 3)
  const featuredProjects: ProjectItem[] = [
    {
      id: 'p1',
      tag: 'Ambiente',
      title: 'Limpeza dos Oceanos',
      location: 'Global',
      description: 'Remoção de plásticos e resíduos dos oceanos e praias costeiras.',
      impactPeople: '210K pessoas',
      progressPercent: 84,
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop&q=80',
      category: 'ambiente',
    },
    {
      id: 'p2',
      tag: 'Ambiente',
      title: 'Plantando o Amanhã',
      location: 'Brasil',
      description: 'Reflorestamento de áreas degradadas e recuperação de nascentes.',
      impactPeople: '150K pessoas',
      progressPercent: 72,
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&auto=format&fit=crop&q=80',
      category: 'ambiente',
    },
    {
      id: 'p3',
      tag: 'Ambiente',
      title: 'Energia para Comunidades',
      location: 'África',
      description: 'Instalação de energia solar em comunidades rurais e isoladas.',
      impactPeople: '95K pessoas',
      progressPercent: 68,
      imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=700&auto=format&fit=crop&q=80',
      category: 'ambiente',
    },
    {
      id: 'p4',
      tag: 'Ambiente',
      title: 'Cidades Mais Verdes',
      location: 'Índia',
      description: 'Criação de espaços verdes e jardins urbanos comunitários.',
      impactPeople: '78K pessoas',
      progressPercent: 65,
      imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=700&auto=format&fit=crop&q=80',
      category: 'ambiente',
    },
    {
      id: 'p5',
      tag: 'Ambiente',
      title: 'Recifes Vivos',
      location: 'Filipinas',
      description: 'Restauração de barreiras de corais e proteção da fauna marinha.',
      impactPeople: '112K pessoas',
      progressPercent: 79,
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&auto=format&fit=crop&q=80',
      category: 'ambiente',
    },
    {
      id: 'p6',
      tag: 'Ambiente',
      title: 'Guardiões das Florestas',
      location: 'Peru',
      description: 'Monitoramento comunitário e conservação florestal na bacia andina.',
      impactPeople: '86K pessoas',
      progressPercent: 74,
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&auto=format&fit=crop&q=80',
      category: 'ambiente',
    },
  ];

  // O impacto em números (6 Sparkline Cards)
  const impactCards = [
    {
      id: 'num1',
      value: '3.215.780',
      label: 'Pessoas Impactadas',
      change: '12,4% este mês',
      icon: <Users className="w-4 h-4 text-emerald-600" />,
      color: 'emerald',
      sparkline: [25, 30, 42, 38, 55, 62, 70, 85, 95],
      stroke: '#059669',
      badgeBg: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'num2',
      value: '2.417.890 t',
      label: 'CO₂ Evitado',
      change: '8,7% este mês',
      icon: <Cloud className="w-4 h-4 text-sky-600" />,
      color: 'blue',
      sparkline: [30, 32, 45, 52, 60, 58, 68, 80, 92],
      stroke: '#0284C7',
      badgeBg: 'bg-sky-50 text-sky-700',
    },
    {
      id: 'num3',
      value: '78.540 ha',
      label: 'Áreas Restauradas',
      change: '15,3% este mês',
      icon: <TreePine className="w-4 h-4 text-emerald-700" />,
      color: 'emerald',
      sparkline: [20, 28, 35, 48, 44, 60, 72, 85, 98],
      stroke: '#059669',
      badgeBg: 'bg-emerald-50 text-emerald-800',
    },
    {
      id: 'num4',
      value: '1.245.780 m³',
      label: 'Água Preservada',
      change: '9,1% este mês',
      icon: <Droplets className="w-4 h-4 text-sky-600" />,
      color: 'sky',
      sparkline: [35, 38, 42, 50, 62, 70, 68, 84, 91],
      stroke: '#0284C7',
      badgeBg: 'bg-sky-50 text-sky-700',
    },
    {
      id: 'num5',
      value: '2.356.890 kg',
      label: 'Resíduos Removidos',
      change: '11,6% este mês',
      icon: <Recycle className="w-4 h-4 text-purple-600" />,
      color: 'purple',
      sparkline: [22, 28, 38, 46, 52, 65, 75, 82, 94],
      stroke: '#8B5CF6',
      badgeBg: 'bg-purple-50 text-purple-700',
    },
    {
      id: 'num6',
      value: '159.342',
      label: 'Voluntários Ativos',
      change: '10,2% este mês',
      icon: <HeartHandshake className="w-4 h-4 text-amber-600" />,
      color: 'amber',
      sparkline: [28, 35, 44, 52, 50, 68, 77, 85, 96],
      stroke: '#F59E0B',
      badgeBg: 'bg-amber-50 text-amber-700',
    },
  ];

  // Coluna Direita: Mais Populares em Ambiente
  const popularInitiatives = [
    {
      id: 'pop1',
      rank: 1,
      title: 'Restauração de Florestas',
      supporters: '158K apoiadores',
      growth: '24%',
      imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop2',
      rank: 2,
      title: 'Energia Renovável Comunitária',
      supporters: '132K apoiadores',
      growth: '18%',
      imageUrl: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop3',
      rank: 3,
      title: 'Proteção dos Oceanos',
      supporters: '98K apoiadores',
      growth: '16%',
      imageUrl: 'https://images.unsplash.com/photo-1518399681705-1c1a55e5e883?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop4',
      rank: 4,
      title: 'Água Potável para Todos',
      supporters: '87K apoiadores',
      growth: '15%',
      imageUrl: 'https://images.unsplash.com/photo-1527199768775-bdabf3b31023?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop5',
      rank: 5,
      title: 'Agricultura Regenerativa',
      supporters: '76K apoiadores',
      growth: '12%',
      imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=200&auto=format&fit=crop&q=80',
    },
  ];

  // Recursos e ferramentas
  const toolsAndResources = [
    {
      id: 'guia',
      title: 'Guia de Ação Ambiental',
      description: 'Passo a passo para iniciar sua iniciativa',
      icon: <BookOpen className="w-4 h-4 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      id: 'carbono',
      title: 'Calculadora de Carbono',
      description: 'Meça e reduza sua pegada de carbono',
      icon: <Calculator className="w-4 h-4 text-teal-600" />,
      bg: 'bg-teal-50 border-teal-100',
    },
    {
      id: 'financiamento',
      title: 'Financiamento Verde',
      description: 'Encontre apoios para projetos ambientais',
      icon: <Coins className="w-4 h-4 text-emerald-700" />,
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      id: 'cursos',
      title: 'Cursos e Webinars',
      description: 'Aprenda com especialistas em sustentabilidade',
      icon: <Video className="w-4 h-4 text-cyan-600" />,
      bg: 'bg-cyan-50 border-cyan-100',
    },
    {
      id: 'parcerias',
      title: 'Parcerias Ambientais',
      description: 'Conecte-se com organizações e redes',
      icon: <Network className="w-4 h-4 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      id: 'ferramentas',
      title: 'Ferramentas gratuitas',
      description: 'Recursos para potencializar projetos',
      icon: <Wrench className="w-4 h-4 text-orange-600" />,
      bg: 'bg-orange-50 border-orange-100',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 antialiased text-[#1E293B]">
      {/* Toast de Confirmação */}
      {supportSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#064E3B] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-700 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-sm font-semibold">{supportSuccessToast}</span>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* TÍTULO DA PÁGINA + BOTÃO APOIAR INICIATIVA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4">
            {/* Ícone de Folha em Fundo Verde Escuro */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#064E3B] flex items-center justify-center shrink-0 shadow-xs">
              <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-[#0F172A] font-['Outfit'] tracking-tight leading-none">
                Ambiente
              </h1>
              <p className="text-xs sm:text-sm text-[#1E3A8A] font-semibold mt-1.5">
                Protegemos o planeta e promovemos um futuro sustentável para todas as formas de vida.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="self-start sm:self-center inline-flex items-center gap-2 bg-[#064E3B] hover:bg-[#043d2e] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer group shrink-0"
          >
            <span>Apoiar Iniciativa</span>
            <Heart className="w-4 h-4 text-white group-hover:scale-110 transition-transform" strokeWidth={2} />
          </button>
        </div>

        {/* STATS RIBBON (7 MÉTRICAS HORIZONTAIS CONFORME A IMAGEM DE REFERÊNCIA) */}
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 px-4 sm:px-6 py-3.5 sm:py-4 shadow-2xs">
          <div className="flex items-center justify-between gap-4 lg:gap-6 overflow-x-auto no-scrollbar divide-x divide-slate-100">
            {ribbonMetrics.map((m, idx) => (
              <div key={idx} className={`flex items-center gap-3 shrink-0 ${idx > 0 ? 'pl-4 sm:pl-6' : ''}`}>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100/90 flex items-center justify-center text-slate-600 shrink-0">
                  {m.icon}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-[#0F172A] text-sm sm:text-[15px] font-['Outfit'] tracking-tight">
                    {m.value}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-medium whitespace-nowrap mt-0.5">
                    {m.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY FILTER RIBBON */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (onNavigateToCategory && (cat.id === 'todas' || cat.id === 'saude' || cat.id === 'tecnologia' || cat.id === 'cultura' || cat.id === 'educacao' || cat.id === 'direitos' || cat.id === 'ambiente' || cat.id === 'empreendedorismo')) {
                    onNavigateToCategory(cat.id === 'direitos' ? 'direitos-humanos' : cat.id);
                  } else {
                    setActiveCategory(cat.id);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#064E3B] text-white shadow-xs border border-[#064E3B]'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
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
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 transition-colors whitespace-nowrap cursor-pointer"
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
            <span>Mais</span>
          </button>
        </div>

        {/* LAYOUT PRINCIPAL EM DUAS COLUNAS CONFORME A REFERÊNCIA:
            - Coluna Esquerda (lg:col-span-8 xl:col-span-9): Hero Card, Áreas de Impacto, Projetos em Destaque + Impacto por Região, O Impacto em Números
            - Coluna Direita (lg:col-span-4 xl:col-span-3): Mais populares em Ambiente, Recursos e ferramentas (todos os 6), Seja parte da mudança (com foto de mãos segurando broto na terra)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUNA ESQUERDA PRINCIPAL (lg:col-span-8 xl:col-span-9) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6 min-w-0">
            {/* 1. HERO BANNER */}
            <div className="rounded-3xl bg-[#04281E] text-white p-6 sm:p-7 lg:p-8 border border-emerald-900/60 relative overflow-hidden shadow-md flex flex-col justify-between min-h-[380px]">
              {/* Imagem de fundo com floresta/rio e gradiente conforme a referência */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/imagens-paginas/06-impacto-global/ambiente/1ambiente.png"
                  alt="Natureza sustentável"
                  className="w-full h-full object-cover opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#031d16] via-[#04281E]/95 to-[#06382B]/90" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
                {/* Esquerda: Frase de Impacto + Texto + Botão (md:col-span-5) */}
                <div className="md:col-span-5 space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] leading-tight tracking-tight text-white">
                    Cuidar do planeta<br />é cuidar do futuro.
                  </h2>
                  <p className="text-xs sm:text-[13px] text-emerald-100/90 font-normal leading-relaxed">
                    Descubra iniciativas que protegem o meio ambiente, restauram ecossistemas e promovem um planeta mais saudável para as gerações presentes e futuras.
                  </p>
                  <div className="pt-1">
                    <button
                      onClick={() => {
                        const el = document.getElementById('projetos-destaque');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#064E3B] hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer group"
                    >
                      <span>Explorar iniciativas ambientais</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Centro: Globo Terrestre com Nós Orbitais (md:col-span-4) */}
                <div className="md:col-span-4 flex items-center justify-center py-2">
                  <div className="relative w-52 h-52 sm:w-56 sm:h-56 flex items-center justify-center">
                    {/* Linhas orbitais tracejadas */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 240">
                      <circle
                        cx="120"
                        cy="120"
                        r="98"
                        fill="none"
                        stroke="#34D399"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity="0.45"
                      />
                    </svg>

                    {/* Globo Terrestre Realista */}
                    <div className="w-34 h-34 sm:w-36 sm:h-36 rounded-full relative overflow-hidden shadow-2xl ring-2 ring-emerald-400/40">
                      <img
                        src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&auto=format&fit=crop&q=80"
                        alt="Planeta Terra"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* 6 Nós Orbitais Conectados conforme a imagem de referência */}
                    {/* 1. Topo Esquerdo: Árvore */}
                    <div className="absolute top-2 left-6 w-8 h-8 rounded-full bg-white text-[#064E3B] flex items-center justify-center shadow-md ring-2 ring-white">
                      <TreePine className="w-4 h-4" />
                    </div>
                    {/* 2. Topo Direito: Água */}
                    <div className="absolute top-4 right-5 w-8 h-8 rounded-full bg-white text-[#064E3B] flex items-center justify-center shadow-md ring-2 ring-white">
                      <Droplets className="w-4 h-4" />
                    </div>
                    {/* 3. Meio Esquerda: Reciclagem */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-8 rounded-full bg-white text-[#064E3B] flex items-center justify-center shadow-md ring-2 ring-white">
                      <Recycle className="w-4 h-4" />
                    </div>
                    {/* 4. Meio Direito: Sol */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 w-8 h-8 rounded-full bg-white text-[#064E3B] flex items-center justify-center shadow-md ring-2 ring-white">
                      <Sun className="w-4 h-4" />
                    </div>
                    {/* 5. Base Esquerda: Folha */}
                    <div className="absolute bottom-3 left-8 w-8 h-8 rounded-full bg-white text-[#064E3B] flex items-center justify-center shadow-md ring-2 ring-white">
                      <Leaf className="w-4 h-4" />
                    </div>
                    {/* 6. Base Direita: Broto */}
                    <div className="absolute bottom-3 right-8 w-8 h-8 rounded-full bg-white text-[#064E3B] flex items-center justify-center shadow-md ring-2 ring-white">
                      <Sprout className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Direita: Impacto Ambiental Global (md:col-span-3) */}
                <div className="md:col-span-3 bg-black/20 backdrop-blur-xs rounded-2xl p-4 border border-white/10 space-y-3">
                  <h3 className="text-xs sm:text-sm font-bold text-white font-['Outfit'] tracking-tight">
                    Impacto Ambiental Global
                  </h3>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-emerald-300 shrink-0" />
                      <div>
                        <div className="font-extrabold text-white text-[13px] font-['Outfit']">3.215.780</div>
                        <div className="text-[10px] text-emerald-100/80">Pessoas Impactadas</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <TreePine className="w-4 h-4 text-emerald-300 shrink-0" />
                      <div>
                        <div className="font-extrabold text-white text-[13px] font-['Outfit']">78.540 ha</div>
                        <div className="text-[10px] text-emerald-100/80">Áreas Restauradas</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Recycle className="w-4 h-4 text-emerald-300 shrink-0" />
                      <div>
                        <div className="font-extrabold text-white text-[13px] font-['Outfit']">2.417.890 t</div>
                        <div className="text-[10px] text-emerald-100/80">CO₂ Evitado</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Droplets className="w-4 h-4 text-emerald-300 shrink-0" />
                      <div>
                        <div className="font-extrabold text-white text-[13px] font-['Outfit']">1.245.780 m³</div>
                        <div className="text-[10px] text-emerald-100/80">Água Preservada</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Recycle className="w-4 h-4 text-emerald-300 shrink-0" />
                      <div>
                        <div className="font-extrabold text-white text-[13px] font-['Outfit']">2.356.890 kg</div>
                        <div className="text-[10px] text-emerald-100/80">Resíduos Removidos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. ÁREAS DE IMPACTO AMBIENTAL */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                  Áreas de impacto ambiental
                </h2>
                <button
                  onClick={() => setSelectedArea('todas')}
                  className="text-xs font-bold text-[#0F1E3D] hover:text-[#064E3B] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {impactAreas.map((area) => (
                  <div
                    key={area.id}
                    onClick={() => setSelectedArea(area.title)}
                    className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className={`w-9 h-9 rounded-full ${area.iconBg} border flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform`}>
                        {area.icon}
                      </div>
                      <h3 className="text-xs sm:text-[13px] font-bold text-[#0F1E3D] font-['Outfit'] mb-1">
                        {area.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                        {area.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100">
                      <span className={`text-[11px] font-bold ${area.badgeColor}`}>
                        {area.initiativesCount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. PROJETOS EM DESTAQUE + IMPACTO POR REGIÃO (LADO A LADO) */}
            <section id="projetos-destaque">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
                {/* Projetos em destaque (lg:col-span-8) - 3 em 3 cards */}
                <div className="lg:col-span-8 space-y-3 min-w-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                      Projetos em destaque
                    </h2>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, featuredProjects.length - 3)))}
                        className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer shadow-2xs transition-colors"
                        aria-label="Anterior"
                        title="Projetos anteriores"
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCarouselIndex((prev) => (prev < featuredProjects.length - 3 ? prev + 1 : 0))}
                        className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer shadow-2xs transition-colors"
                        aria-label="Seguinte"
                        title="Próximos projetos"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {featuredProjects.slice(carouselIndex, carouselIndex + 3).map((proj) => (
                        <div
                          key={proj.id}
                          onClick={() => setSelectedProject(proj)}
                          className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs overflow-hidden transition-all cursor-pointer flex flex-col group"
                        >
                          {/* Imagem do Projeto com Tag Ambiente */}
                          <div className="relative h-28 sm:h-32 overflow-hidden bg-slate-100">
                            <img
                              src={proj.imageUrl}
                              alt={proj.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#064E3B]/90 backdrop-blur-xs text-white shadow-xs">
                              {proj.tag}
                            </span>
                          </div>

                          {/* Detalhes */}
                          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                            <div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {proj.location}
                              </div>
                              <h3 className="text-xs sm:text-[13px] font-bold text-[#0F1E3D] font-['Outfit'] mt-0.5 group-hover:text-[#064E3B] transition-colors line-clamp-1">
                                {proj.title}
                              </h3>
                              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                {proj.description}
                              </p>
                            </div>

                            {/* Progresso e Pessoas Impactadas */}
                            <div className="space-y-1.5 pt-2 border-t border-slate-100">
                              <div className="flex items-center justify-between text-[10.5px]">
                                <span className="text-slate-500">
                                  Impactadas: <strong className="text-slate-800 font-bold">{proj.impactPeople}</strong>
                                </span>
                                <span className="font-bold text-[#064E3B] shrink-0">{proj.progressPercent}% da meta</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#064E3B] rounded-full transition-all duration-500"
                                  style={{ width: `${proj.progressPercent}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Seta circular flutuante de navegação na borda direita */}
                    <button
                      type="button"
                      onClick={() => setCarouselIndex((prev) => (prev < featuredProjects.length - 3 ? prev + 1 : 0))}
                      className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-md border border-slate-200 items-center justify-center text-slate-700 hover:bg-slate-50 z-10 cursor-pointer"
                      title="Ver mais projetos"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Impacto por região (lg:col-span-4) */}
                <div className="lg:col-span-4 min-w-0">
                  <ImpactRegionMapCard
                    category="ambiente"
                    title="Impacto por região"
                    customRegions={[
                      { id: 'latin-america', name: 'América Latina', percent: 32, projectsCount: 430, highlight: false },
                      { id: 'africa', name: 'África', percent: 24, projectsCount: 320 },
                      { id: 'asia', name: 'Ásia-Pacífico', percent: 20, projectsCount: 270 },
                      { id: 'europe', name: 'Europa', percent: 16, projectsCount: 215 },
                      { id: 'north-america', name: 'América do Norte', percent: 8, projectsCount: 110, highlight: true },
                    ]}
                    onOpenReport={() => setIsReportModalOpen(true)}
                    onSeeAll={() => setIsReportModalOpen(true)}
                  />
                </div>
              </div>
            </section>

            {/* 4. O IMPACTO EM NÚMEROS (6 SPARKLINES EM UMA LINHA) */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-black text-[#0F1E3D] font-['Outfit'] tracking-tight">
                O impacto em números
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {impactCards.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-6 h-6 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                          {c.icon}
                        </div>
                        <div className="text-sm sm:text-[15px] font-black text-[#0F1E3D] font-['Outfit'] tracking-tight truncate">
                          {c.value}
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mb-1.5 truncate">
                        {c.label}
                      </div>
                      <div className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 ${c.badgeBg}`}>
                        <span>▲</span>
                        <span>{c.change}</span>
                      </div>
                    </div>

                    {/* Mini Sparkline SVG */}
                    <div className="h-8 w-full pt-1">
                      <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id={`spark-${c.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={c.stroke} stopOpacity="0.25" />
                            <stop offset="100%" stopColor={c.stroke} stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <polyline
                          fill={`url(#spark-${c.id})`}
                          stroke={c.stroke}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={c.sparkline
                            .map((val, idx) => `${idx * 12.5},${30 - (val / 100) * 24}`)
                            .join(' ')}
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. ANÁLISE DE IMPACTO — GRÁFICOS COMPLETOS (LINHA TEMPORAL + DONUT) */}
            <ImpactAnalyticsSection
              accent="#059669"
              softBg="bg-emerald-50"
              labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']}
              series={[
                {
                  name: 'CO₂ evitado (t)',
                  color: '#059669',
                  values: [148, 162, 158, 176, 190, 184, 205, 218, 226, 240, 248, 262],
                },
                {
                  name: 'Áreas restauradas (ha)',
                  color: '#0D9488',
                  values: [42, 48, 46, 55, 60, 58, 66, 72, 70, 80, 84, 90],
                },
              ]}
              slices={[
                { label: 'América Latina', value: 32, color: '#059669' },
                { label: 'África', value: 24, color: '#10B981' },
                { label: 'Ásia-Pacífico', value: 20, color: '#34D399' },
                { label: 'Europa', value: 16, color: '#6EE7B7' },
                { label: 'América do Norte', value: 8, color: '#A7F3D0' },
              ]}
            />
          </div>

          {/* COLUNA DIREITA / SIDEBAR (lg:col-span-4 xl:col-span-3) */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4 min-w-0">
            {/* 1. MAIS POPULARES EM AMBIENTE */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-[15px] font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Mais populares em Ambiente
                </h3>
                <button
                  onClick={() => showToast('Exibindo lista completa de iniciativas')}
                  className="text-xs font-bold text-[#064E3B] hover:text-[#043d2e] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {popularInitiatives.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => showToast(`Iniciativa: ${item.title}`)}
                    className="flex items-center justify-between gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Posição 1, 2, 3... */}
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10.5px] font-bold shrink-0">
                        {item.rank}
                      </span>
                      {/* Miniatura */}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-9 h-9 rounded-xl object-cover shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#0F172A] truncate group-hover:text-[#064E3B] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">
                          {item.supporters}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10.5px] font-bold text-[#064E3B] shrink-0 flex items-center gap-0.5">
                      <span className="text-xs">▲</span> {item.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. RECURSOS E FERRAMENTAS (TODOS OS 6 ITENS) */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-[15px] font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Recursos e ferramentas
                </h3>
                <button
                  onClick={() => showToast('Todos os recursos disponíveis')}
                  className="text-xs font-bold text-[#1E3A8A] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                {toolsAndResources.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setActiveToolModal(t.title)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg ${t.bg} border flex items-center justify-center shrink-0`}>
                        {t.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#064E3B] transition-colors truncate">
                          {t.title}
                        </div>
                        <div className="text-[10.5px] text-slate-500 truncate">
                          {t.description}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* 3. SEJA PARTE DA MUDANÇA (CARD LATERAL COM FOTO DE MÃOS SEGURANDO BROTO NA TERRA) */}
            <div className="rounded-3xl bg-[#063324] text-white p-5 sm:p-6 border border-emerald-900/40 relative overflow-hidden shadow-sm space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-black font-['Outfit'] leading-snug text-white">
                  Seja parte da mudança que o mundo precisa.
                </h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed font-normal">
                  Apoie iniciativas ambientais e faça parte de um futuro mais sustentável para todos.
                </p>
              </div>

              {/* Foto realista com mãos segurando broto com terra fértil */}
              <div className="relative h-44 rounded-2xl overflow-hidden shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&auto=format&fit=crop&q=80"
                  alt="Mãos segurando broto na terra"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <button
                type="button"
                onClick={() => setIsSupportModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-emerald-50 text-[#064E3B] font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Explorar Iniciativas</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL: APOIAR INICIATIVA */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#064E3B] text-white flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0F1E3D] font-['Outfit']">
                    Apoiar Iniciativa Ambiental
                  </h3>
                  <p className="text-xs text-slate-500">Contribua diretamente para a regeneração do planeta</p>
                </div>
              </div>
              <button
                onClick={() => setIsSupportModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
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
                          ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {amt} €
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl text-xs text-emerald-900 space-y-1">
                <span className="font-bold">Impacto estimado com {donationAmount} €:</span>
                <p className="text-[11.5px] text-emerald-800">
                  {donationAmount * 4} árvores nativas plantadas e aproximadamente {donationAmount * 25} kg de resíduos plásticos retirados do ecossistema marinho.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSupportModalOpen(false);
                    showToast(`Obrigado pelo seu apoio de ${donationAmount} €! Iniciativa fortalecida.`);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#064E3B] hover:bg-[#043d2e] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Confirmar Apoio
                </button>
                <button
                  type="button"
                  onClick={() => setIsSupportModalOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
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
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="relative h-56">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#064E3B] text-white">
                {selectedProject.tag} • {selectedProject.location}
              </span>
            </div>

            <div className="p-6 pt-2 space-y-4">
              <div>
                <h3 className="text-xl font-black text-[#0F1E3D] font-['Outfit']">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedProject.description} Este projeto colaborativo reúne ONGs, comunidades locais e cidadãos voluntários comprometidos com soluções de longo prazo e monitoramento por satélite.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Pessoas Beneficiadas</span>
                  <span className="font-extrabold text-[#0F1E3D] text-sm">{selectedProject.impactPeople}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Status do Projeto</span>
                  <span className="font-extrabold text-[#064E3B] text-sm">{selectedProject.progressPercent}% Concluído</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setIsSupportModalOpen(true);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#064E3B] hover:bg-[#043d2e] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  <span>Apoiar este Projeto</span>
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
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
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0F1E3D] font-['Outfit']">
                {activeToolModal}
              </h3>
              <button
                onClick={() => setActiveToolModal(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              O módulo <strong>{activeToolModal}</strong> faz parte do ecossistema aberto VILA para empoderar coletivos, organizações e cidadãos com metodologias científicas de regeneração.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Acesso público e gratuito</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dados auditados e certificados</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveToolModal(null);
                  showToast(`${activeToolModal} iniciado com sucesso!`);
                }}
                className="w-full py-2.5 px-4 bg-[#064E3B] hover:bg-[#043d2e] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-[#0F1E3D] font-['Outfit']">
                  Relatório de Impacto Regional
                </h3>
                <p className="text-xs text-slate-500">Distribuição global de intervenções ecológicas ativas</p>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-emerald-900">
                <span className="font-bold block mb-1">América do Norte (32% do impacto total)</span>
                Projetos de energia renovável descentralizada e proteção de corredores ecológicos na Costa Oeste e Grandes Lagos.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <span className="font-bold block mb-1">Europa (24% do impacto total)</span>
                Restauração de bacias fluviais, reciclagem circular e hortas comunitárias metropolitanas.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <span className="font-bold block mb-1">América Latina (20% do impacto total)</span>
                Reflorestamento de biomas tropicais, conservação de nascentes e apoio a populações tradicionais.
              </div>
            </div>

            <button
              onClick={() => setIsReportModalOpen(false)}
              className="w-full py-2.5 px-4 bg-[#064E3B] hover:bg-[#043d2e] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Concluir Leitura
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
