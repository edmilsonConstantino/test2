import React, { useState } from 'react';
import {
  GraduationCap,
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
  Scale,
  HeartPulse,
  Rocket,
  Palette,
  MoreHorizontal,
  BookOpen,
  Monitor,
  Smile,
  Sprout,
  School,
  Award,
  Video,
  FileText,
  Handshake,
  Clock,
  Coins,
  Languages,
  Sparkles,
  Building2,
  Search,
  Check,
} from 'lucide-react';
import { ImpactRegionMapCard, RegionImpactItem } from './ImpactRegionMapCard';
import { ImpactAnalyticsSection } from './ImpactAnalyticsSection';

const EDUCATION_REGIONS: RegionImpactItem[] = [
  { id: 'africa', name: 'África', percent: 34, projectsCount: 460, highlight: true },
  { id: 'asia', name: 'Ásia', percent: 28, projectsCount: 380 },
  { id: 'latin-america', name: 'América Latina', percent: 20, projectsCount: 270 },
  { id: 'europe', name: 'Europa', percent: 12, projectsCount: 160 },
  { id: 'north-america', name: 'América do Norte', percent: 6, projectsCount: 85 },
];

export interface EducationImpactViewProps {
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
  tagColor?: string;
  title: string;
  location: string;
  description: string;
  impactPeople: string;
  progressPercent: number;
  imageUrl: string;
}

export const EducationImpactView: React.FC<EducationImpactViewProps> = ({
  onOpenAiAssistant = () => {},
  onExploreWorld = () => {},
  onExploreCommunity = () => {},
  onOpenMobileMenu,
  onOpenAuth = () => {},
  onNavigateToTab = (_tabId?: string) => {},
  onNavigateToCategory,
}) => {
  const [activeCategory] = useState<string>('educacao');
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

  // 1. Fita de Métricas Globais (diretamente abaixo do título - fiel à referência visual)
  const ribbonMetrics = [
    { label: 'Iniciativas Ativas', value: '1.248', icon: <Users className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2D3BA8] stroke-[1.8]" /> },
    { label: 'Organizações', value: '382', icon: <School className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2D3BA8] stroke-[1.8]" /> },
    { label: 'Países', value: '96', icon: <Globe className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2D3BA8] stroke-[1.8]" /> },
    { label: 'Pessoas Impactadas', value: '5.684.230', icon: <Users className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2D3BA8] stroke-[1.8]" /> },
    { label: 'Escolas Apoiadas', value: '1.890', icon: <Building2 className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2D3BA8] stroke-[1.8]" /> },
    { label: 'Bolsas Concedidas', value: '428.760', icon: <Award className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2D3BA8] stroke-[1.8]" /> },
    { label: 'Horas de Voluntariado', value: '2.147.580 h', icon: <Clock className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2D3BA8] stroke-[1.8]" /> },
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

  // 3. Áreas de impacto em educação (6 cards em 1 linha)
  const impactAreas = [
    {
      id: 'acesso',
      title: 'Acesso à Educação',
      description: 'Garantir que todos tenham acesso à educação básica e de qualidade.',
      initiativesCount: '312 iniciativas',
      icon: <BookOpen className="w-5 h-5 text-white" />,
      iconBg: 'bg-[#3D4ED8]', // Azul
    },
    {
      id: 'inclusao',
      title: 'Inclusão & Equidade',
      description: 'Promover inclusão de grupos vulneráveis e reduzir desigualdades.',
      initiativesCount: '268 iniciativas',
      icon: <Users className="w-5 h-5 text-white" />,
      iconBg: 'bg-[#059669]', // Esmeralda
    },
    {
      id: 'digital',
      title: 'Educação Digital',
      description: 'Desenvolver competências digitais e acesso a novas tecnologias.',
      initiativesCount: '198 iniciativas',
      icon: <Monitor className="w-5 h-5 text-white" />,
      iconBg: 'bg-[#7C3AED]', // Roxo
    },
    {
      id: 'qualidade',
      title: 'Educação de Qualidade',
      description: 'Melhorar ensino, formação de professores e recursos pedagógicos.',
      initiativesCount: '356 iniciativas',
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      iconBg: 'bg-[#D97706]', // Âmbar
    },
    {
      id: 'socioemocional',
      title: 'Socioemocional',
      description: 'Desenvolver habilidades socioemocionais para uma vida plena.',
      initiativesCount: '142 iniciativas',
      icon: <Smile className="w-5 h-5 text-white" />,
      iconBg: 'bg-[#E11D48]', // Rosa / Vermelho
    },
    {
      id: 'sustentavel',
      title: 'Educação Sustentável',
      description: 'Promover educação para a sustentabilidade e cidadania global.',
      initiativesCount: '126 iniciativas',
      icon: <Sprout className="w-5 h-5 text-white" />,
      iconBg: 'bg-[#0D9488]', // Verde Petróleo
    },
  ];

  // 4. Projetos em Destaque (Carrossel 3 em 3)
  const featuredProjects: ProjectItem[] = [
    {
      id: 'p1',
      tag: 'Acesso à Educação',
      tagColor: 'bg-[#3D4ED8]',
      title: 'Escolas para Comunidades Rurais',
      location: 'Moçambique',
      description: 'Construção e reabilitação de escolas em comunidades remotas.',
      impactPeople: '78K pessoas',
      progressPercent: 78,
      imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'p2',
      tag: 'Educação Digital',
      tagColor: 'bg-[#7C3AED]',
      title: 'Laboratórios Digitais Comunitários',
      location: 'Quénia',
      description: 'Formação em competências digitais para jovens e professores locais.',
      impactPeople: '65K pessoas',
      progressPercent: 72,
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'p3',
      tag: 'Bolsas de Estudo',
      tagColor: 'bg-[#D97706]',
      title: 'Bolsas que Mudam Vidas',
      location: 'Brasil',
      description: 'Bolsas integrais e tutoria para estudantes em vulnerabilidade social.',
      impactPeople: '112K pessoas',
      progressPercent: 60,
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'p4',
      tag: 'STEM',
      tagColor: 'bg-[#0891B2]',
      title: 'Meninas na Ciência e Tecnologia',
      location: 'Índia',
      description: 'Inspirar e capacitar meninas em áreas científicas e de inovação.',
      impactPeople: '55K pessoas',
      progressPercent: 78,
      imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'p5',
      tag: 'Alfabetização',
      tagColor: 'bg-[#059669]',
      title: 'Leitura e Bibliotecas Itinerantes',
      location: 'Colômbia',
      description: 'Bibliotecas itinerantes e programas comunitários de incentivo à leitura.',
      impactPeople: '94K pessoas',
      progressPercent: 82,
      imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'p6',
      tag: 'Inclusão',
      tagColor: 'bg-[#E11D48]',
      title: 'Educação Especial e Adaptada',
      location: 'Portugal',
      description: 'Materiais pedagógicos inclusivos e tecnologia assistiva para escolas.',
      impactPeople: '43K pessoas',
      progressPercent: 88,
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=700&auto=format&fit=crop&q=80',
    },
  ];

  // 5. O impacto em números (6 KPI cards com sparklines)
  const impactCards = [
    {
      id: 'num1',
      icon: <Users className="w-4 h-4 text-emerald-600" />,
      value: '5.684.230',
      label: 'Pessoas Impactadas',
      change: '12,4% este mês',
      color: '#059669',
      sparkline: [25, 30, 42, 38, 55, 62, 70, 85, 95],
    },
    {
      id: 'num2',
      icon: <School className="w-4 h-4 text-blue-600" />,
      value: '1.890',
      label: 'Escolas Apoiadas',
      change: '8,7% este mês',
      color: '#3D4ED8',
      sparkline: [30, 32, 45, 52, 60, 58, 68, 80, 92],
    },
    {
      id: 'num3',
      icon: <Award className="w-4 h-4 text-purple-600" />,
      value: '428.760',
      label: 'Bolsas Concedidas',
      change: '15,2% este mês',
      color: '#7C3AED',
      sparkline: [20, 28, 35, 48, 44, 60, 72, 85, 98],
    },
    {
      id: 'num4',
      icon: <Clock className="w-4 h-4 text-amber-600" />,
      value: '2.147.580 h',
      label: 'Horas de Voluntariado',
      change: '11,6% este mês',
      color: '#D97706',
      sparkline: [35, 38, 42, 50, 62, 70, 68, 84, 91],
    },
    {
      id: 'num5',
      icon: <Handshake className="w-4 h-4 text-cyan-600" />,
      value: '382',
      label: 'Organizações Parceiras',
      change: '9,3% este mês',
      color: '#0891B2',
      sparkline: [22, 28, 38, 46, 52, 65, 75, 82, 94],
    },
    {
      id: 'num6',
      icon: <Globe className="w-4 h-4 text-rose-600" />,
      value: '96',
      label: 'Países',
      change: '6,2% este mês',
      color: '#E11D48',
      sparkline: [28, 35, 44, 52, 50, 68, 77, 85, 96],
    },
  ];

  // 6. Mais populares em Educação (Sidebar)
  const popularInitiatives = [
    {
      id: 'pop1',
      rank: 1,
      title: 'Educação para Todos',
      supporters: '286K apoiadores',
      growth: '24%',
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop2',
      rank: 2,
      title: 'Alfabetização Digital',
      supporters: '198K apoiadores',
      growth: '18%',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop3',
      rank: 3,
      title: 'STEM para o Futuro',
      supporters: '142K apoiadores',
      growth: '16%',
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop4',
      rank: 4,
      title: 'Bolsas que Transformam',
      supporters: '112K apoiadores',
      growth: '15%',
      image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'pop5',
      rank: 5,
      title: 'Escolas Sustentáveis',
      supporters: '98K apoiadores',
      growth: '12%',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=120&auto=format&fit=crop&q=80',
    },
  ];

  // 7. Recursos e ferramentas (Sidebar)
  const toolsAndResources = [
    {
      id: 'guia',
      title: 'Guia de Projetos Educacionais',
      description: 'Passo a passo para criar iniciativas pedagógicas',
      icon: <BookOpen className="w-4 h-4 text-blue-600" />,
      bg: 'bg-blue-50 border-blue-100',
    },
    {
      id: 'cursos',
      title: 'Plataforma de Cursos Abertos',
      description: 'Cursos gratuitos com certificados reconhecidos',
      icon: <Monitor className="w-4 h-4 text-indigo-600" />,
      bg: 'bg-indigo-50 border-indigo-100',
    },
    {
      id: 'biblioteca',
      title: 'Biblioteca de Recursos',
      description: 'Materiais pedagógicos e didáticos para todos',
      icon: <FileText className="w-4 h-4 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      id: 'financiamento',
      title: 'Financiamento e Bolsas',
      description: 'Encontre apoio financeiro para estudantes e escolas',
      icon: <Award className="w-4 h-4 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-100',
    },
    {
      id: 'parcerias',
      title: 'Parcerias Educacionais',
      description: 'Conecte-se com universidades, ONGs e fundações',
      icon: <Handshake className="w-4 h-4 text-rose-600" />,
      bg: 'bg-rose-50 border-rose-100',
    },
    {
      id: 'webinars',
      title: 'Webinars e Workshops',
      description: 'Aprenda com educadores e especialistas da área',
      icon: <Video className="w-4 h-4 text-cyan-600" />,
      bg: 'bg-cyan-50 border-cyan-100',
    },
    {
      id: 'ferramentas',
      title: 'Ferramentas Gratuitas',
      description: 'Recursos digitais para ensinar e aprender melhor',
      icon: <Sparkles className="w-4 h-4 text-purple-600" />,
      bg: 'bg-purple-50 border-purple-100',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 antialiased text-[#1E293B]">
      {supportSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D3BA8] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-blue-400 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-blue-200" />
          <span className="text-sm font-semibold">{supportSuccessToast}</span>
        </div>
      )}

      {/* ÁREA PRINCIPAL DA PÁGINA (Com largura máxima padronizada de 1600px) */}
      <main className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* 1. Header Superior da Página */}
        <section id="educacao-header" className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#2D3BA8] text-white flex items-center justify-center shadow-md shrink-0">
                <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#0F172A] font-['Outfit'] tracking-tight">
                  Educação
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Educação de qualidade para todos. Aprender hoje, liderar o amanhã.
                </p>
              </div>
            </div>

            {/* Botão Apoiar Iniciativa */}
            <button
              type="button"
              onClick={() => setIsSupportModalOpen(true)}
              id="btn-apoiar-iniciativa-educacao"
              className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D3BA8] hover:bg-[#1E40AF] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer shrink-0 group"
            >
              <span>Apoiar Iniciativa</span>
              <Heart className="w-4 h-4 text-blue-200 group-hover:fill-current group-hover:text-rose-300 transition-colors" />
            </button>
          </div>

          {/* Fita de Métricas Globais (Fiel à imagem de referência enviada) */}
          <div className="w-full bg-white rounded-2xl border border-slate-200/80 px-4 sm:px-6 py-3.5 shadow-2xs">
            <div className="flex items-center justify-between gap-4 lg:gap-6 overflow-x-auto no-scrollbar">
              {ribbonMetrics.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                  <div className="text-[#2D3BA8] shrink-0 flex items-center justify-center">
                    {m.icon}
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-black text-[#0F172A] text-sm sm:text-[15px] font-['Outfit'] tracking-tight">
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
        </section>

        {/* 2. Fita Horizontal de Categorias (com "Educação" ativo) */}
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
                  if (cat.id !== 'educacao') {
                    if (onNavigateToCategory) {
                      onNavigateToCategory(cat.id);
                    } else if (onNavigateToTab) {
                      onNavigateToTab(cat.id);
                    }
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-[#2D3BA8] text-white shadow-xs'
                    : 'bg-white border border-slate-200/90 text-[#334155] hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-500'}>{cat.icon}</span>
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white border border-slate-200/90 text-[#334155] hover:bg-slate-50 hover:text-slate-900 transition-all whitespace-nowrap cursor-pointer shadow-2xs"
          >
            <MoreHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Mais</span>
          </button>
        </nav>

        {/* 3. Grade Principal de Conteúdo (Lado Esquerdo/Central e Barra Lateral Direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* COLUNA ESQUERDA / CENTRAL (lg:col-span-8 xl:col-span-9) */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
            {/* 3.1 HERO CARD EXCLUSIVO COM DIAGRAMA DE REDE E IMAGEM DE SALA DE AULA */}
            <div
              id="hero-educacao"
              className="relative rounded-3xl bg-gradient-to-r from-[#07132B] via-[#0E204E] to-[#1E3A8A] p-6 sm:p-8 text-white overflow-hidden shadow-lg border border-blue-900/40"
            >
              {/* Imagem de estudantes ao fundo à direita com blend suave */}
              <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[60%] lg:w-[45%] pointer-events-none overflow-hidden opacity-35 sm:opacity-50 mix-blend-screen">
                <img
                  src="/imagens-paginas/06-impacto-global/educacao/educacao.png"
                  alt="Estudantes em sala de aula"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07132B] via-[#0E204E]/70 to-transparent" />
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Lado Esquerdo do Hero: Título, Descrição e Botão */}
                <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center gap-3">
                  <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-black text-white font-['Outfit'] tracking-tight leading-snug">
                    Educação é oportunidade. Oportunidade é futuro.
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Apoiamos iniciativas que garantem acesso à educação de qualidade, promovem inclusão, desenvolvem competências e constroem sociedades mais justas e preparadas para o futuro.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('projetos-destaque');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#07132B] hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer group"
                    >
                      <span>Explorar iniciativas de educação</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Centro do Hero: Diagrama de Constelação Educacional (Hub Central + Órbitas Conectadas) */}
                <div className="hidden md:flex md:col-span-2 lg:col-span-3 items-center justify-center relative">
                  <div className="w-44 h-44 relative flex items-center justify-center">
                    {/* Linhas de conexão do diagrama */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="62" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" fill="none" />
                      <line x1="80" y1="80" x2="80" y2="22" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />
                      <line x1="80" y1="80" x2="132" y2="50" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />
                      <line x1="80" y1="80" x2="132" y2="110" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />
                      <line x1="80" y1="80" x2="80" y2="138" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />
                      <line x1="80" y1="80" x2="28" y2="110" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />
                      <line x1="80" y1="80" x2="28" y2="50" stroke="#93C5FD" strokeWidth="1.5" opacity="0.6" />
                    </svg>

                    {/* Nodo Central: GraduationCap em círculo azul */}
                    <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-lg relative z-10 border-2 border-white/20">
                      <GraduationCap className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    {/* Nodos Orbitais com ícones de educação */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-md">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute top-6 right-2 w-7 h-7 rounded-full bg-white text-cyan-600 flex items-center justify-center shadow-md">
                      <Monitor className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute bottom-6 right-2 w-7 h-7 rounded-full bg-white text-amber-600 flex items-center justify-center shadow-md">
                      <School className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white text-rose-600 flex items-center justify-center shadow-md">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute bottom-6 left-2 w-7 h-7 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-md">
                      <Sprout className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute top-6 left-2 w-7 h-7 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-md">
                      <Languages className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Lado Direito do Hero: Painel Estatístico "Impacto da Educação" */}
                <div className="md:col-span-4 lg:col-span-4 bg-[#07132B]/65 backdrop-blur-md rounded-2xl border border-white/15 p-4 sm:p-5 flex flex-col gap-3">
                  <h3 className="text-xs font-bold text-blue-200 font-['Outfit'] uppercase tracking-wider">
                    Impacto da Educação
                  </h3>
                  <div className="flex flex-col gap-2.5 text-xs">
                    {[
                      { icon: <Users className="w-3.5 h-3.5 text-blue-400" />, value: '5.684.230', label: 'Pessoas Impactadas' },
                      { icon: <School className="w-3.5 h-3.5 text-indigo-400" />, value: '1.890', label: 'Escolas Apoiadas' },
                      { icon: <Award className="w-3.5 h-3.5 text-amber-400" />, value: '428.760', label: 'Bolsas Concedidas' },
                      { icon: <Clock className="w-3.5 h-3.5 text-emerald-400" />, value: '2.147.580 h', label: 'Horas de Voluntariado' },
                      { icon: <Globe className="w-3.5 h-3.5 text-teal-400" />, value: '96', label: 'Países' },
                      { icon: <Handshake className="w-3.5 h-3.5 text-rose-400" />, value: '382', label: 'Organizações Parceiras' },
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

            {/* 3.2 ÁREAS DE IMPACTO EM EDUCAÇÃO (6 Cards em uma única linha no desktop) */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-black text-[#0F172A] font-['Outfit'] tracking-tight">
                  Áreas de impacto em educação
                </h2>
                <button
                  type="button"
                  onClick={() => showToast('Exibindo todas as áreas de impacto em educação')}
                  className="text-xs font-bold text-[#2D3BA8] hover:text-[#1E40AF] inline-flex items-center gap-1 cursor-pointer"
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
                    className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      {/* Ícone Circular Colorido */}
                      <div className={`w-10 h-10 rounded-full ${area.iconBg} flex items-center justify-center mb-3 shadow-xs group-hover:scale-105 transition-transform`}>
                        {area.icon}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] font-['Outfit'] mb-1 group-hover:text-[#2D3BA8] transition-colors leading-snug">
                        {area.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                        {area.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-600">
                        {area.initiativesCount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3.3 PROJETOS EM DESTAQUE + IMPACTO POR REGIÃO (Lado a Lado Perfeitamente Alinhados) */}
            <section id="projetos-destaque" className="flex flex-col gap-3">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
                {/* Lado Esquerdo: Projetos com Carrossel de 3 em 3 (lg:col-span-8) */}
                <div className="lg:col-span-8 flex flex-col min-w-0">
                  <div className="flex items-center justify-between mb-3 h-7">
                    <h2 className="text-base sm:text-lg font-black text-[#0F172A] font-['Outfit'] tracking-tight">
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

                  <div className="relative flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 h-full">
                      {featuredProjects.slice(carouselIndex, carouselIndex + 3).map((proj) => (
                        <div
                          key={proj.id}
                          onClick={() => setSelectedProject(proj)}
                          className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs overflow-hidden transition-all cursor-pointer flex flex-col justify-between group h-full"
                        >
                          <div className="relative h-28 sm:h-32 overflow-hidden bg-slate-100 shrink-0">
                            <img
                              src={proj.imageUrl}
                              alt={proj.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#2D3BA8]/90 backdrop-blur-xs text-white shadow-xs">
                              {proj.tag}
                            </span>
                          </div>

                          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                            <div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {proj.location}
                              </div>
                              <h3 className="text-xs sm:text-[13px] font-bold text-[#0F172A] font-['Outfit'] mt-0.5 group-hover:text-[#2D3BA8] transition-colors line-clamp-1">
                                {proj.title}
                              </h3>
                              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                {proj.description}
                              </p>
                            </div>

                            <div className="space-y-1.5 pt-2 border-t border-slate-100">
                              <div className="flex items-center justify-between text-[10.5px]">
                                <span className="text-slate-500">
                                  Impactadas: <strong className="text-slate-800 font-bold">{proj.impactPeople}</strong>
                                </span>
                                <span className="font-bold text-[#2D3BA8] shrink-0">{proj.progressPercent}% da meta</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#2D3BA8] rounded-full transition-all duration-500"
                                  style={{ width: `${proj.progressPercent}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

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

                {/* Lado Direito: Impacto por Região com Mapa (lg:col-span-4) */}
                <div className="lg:col-span-4 flex flex-col min-w-0">
                  <div className="flex items-center justify-between mb-3 h-7">
                    <h2 className="text-base sm:text-lg font-black text-[#0F172A] font-['Outfit'] tracking-tight">
                      Impacto por região
                    </h2>
                    <button
                      type="button"
                      onClick={() => setIsReportModalOpen(true)}
                      className="text-xs font-semibold text-[#2D3BA8] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer transition-colors group"
                    >
                      <span>Ver todas</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  <div className="flex-1 h-full">
                    <ImpactRegionMapCard
                      category="educacao"
                      hideHeader={true}
                      className="h-full"
                      customRegions={EDUCATION_REGIONS}
                      showPercentagesInLegend={true}
                      onOpenReport={() => setIsReportModalOpen(true)}
                      onSeeAll={() => setIsReportModalOpen(true)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 3.4 O IMPACTO EM NÚMEROS (6 KPI cards com sparklines em linha) */}
            <section className="flex flex-col gap-3">
              <h2 className="text-base sm:text-lg font-black text-[#0F172A] font-['Outfit'] tracking-tight">
                O impacto em números
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {impactCards.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center mb-2">
                        {c.icon}
                      </div>
                      <div className="text-sm sm:text-[15px] font-black text-[#0F172A] font-['Outfit'] tracking-tight truncate">
                        {c.value}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mb-1.5 truncate">
                        {c.label}
                      </div>
                      <div className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 bg-blue-50 text-blue-700">
                        ▲ {c.change}
                      </div>
                    </div>

                    <div className="h-8 w-full pt-1">
                      <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id={`spark-${c.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={c.color} stopOpacity="0.35" />
                            <stop offset="100%" stopColor={c.color} stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <polyline
                          fill={`url(#spark-${c.id})`}
                          stroke={c.color}
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

            {/* 3.5 ANÁLISE DE IMPACTO — GRÁFICOS COMPLETOS (LINHA TEMPORAL + DONUT) */}
            <ImpactAnalyticsSection
              accent="#2D3BA8"
              softBg="bg-blue-50"
              labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']}
              series={[
                {
                  name: 'Alunos alcançados (K)',
                  color: '#2D3BA8',
                  values: [320, 348, 342, 371, 395, 388, 412, 436, 448, 472, 489, 512],
                },
                {
                  name: 'Escolas apoiadas',
                  color: '#0EA5E9',
                  values: [96, 104, 101, 112, 118, 115, 124, 130, 135, 142, 147, 154],
                },
              ]}
              slices={[
                { label: 'África', value: 32, color: '#2D3BA8' },
                { label: 'Ásia', value: 28, color: '#0EA5E9' },
                { label: 'América Latina', value: 20, color: '#38BDF8' },
                { label: 'Europa', value: 12, color: '#7DD3FC' },
                { label: 'América do Norte', value: 8, color: '#BAE6FD' },
              ]}
            />
          </div>

          {/* COLUNA DIREITA: Barra Lateral (lg:col-span-4 xl:col-span-3) */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6">
            {/* Mais populares em Educação */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#0F172A] font-['Outfit']">
                  Mais populares em Educação
                </h3>
                <button
                  type="button"
                  onClick={() => showToast('Exibindo lista completa de iniciativas')}
                  className="text-xs font-bold text-[#2D3BA8] hover:text-[#1E40AF] inline-flex items-center gap-1 cursor-pointer"
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
                    className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 text-center text-xs font-bold text-slate-400 shrink-0">
                        {item.rank}
                      </span>
                      <div className="w-9 h-9 rounded-xl overflow-hidden bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#0F172A] truncate group-hover:text-[#2D3BA8] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">
                          {item.supporters}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                      ▲ {item.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recursos e ferramentas */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#0F172A] font-['Outfit']">
                  Recursos e ferramentas
                </h3>
                <button
                  type="button"
                  onClick={() => showToast('Todos os recursos disponíveis')}
                  className="text-xs font-bold text-[#2D3BA8] hover:text-[#1E40AF] inline-flex items-center gap-1 cursor-pointer"
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
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/60 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl ${t.bg} border flex items-center justify-center shrink-0`}>
                        {t.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#2D3BA8] transition-colors truncate">
                          {t.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {t.description}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Banner de Doação / Apoio */}
            <div className="rounded-2xl bg-[#07132B] text-white p-6 border border-blue-900/40 relative overflow-hidden shadow-sm space-y-4">
              <div className="h-40 rounded-xl overflow-hidden relative shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&auto=format&fit=crop&q=80"
                  alt="Crianças estudando"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07132B] via-transparent to-transparent" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-black font-['Outfit'] leading-snug">
                  Investir em educação é investir no futuro de todos.
                </h3>
                <p className="text-xs text-blue-100/80 leading-relaxed font-normal">
                  Apoie iniciativas que levam conhecimento, oportunidades e esperança a milhões de pessoas no mundo.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSupportModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-blue-50 text-[#2D3BA8] font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Apoiar Iniciativas</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL APOIAR INICIATIVA */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#2D3BA8] text-white flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0F172A] font-['Outfit']">
                    Apoiar Iniciativa Educacional
                  </h3>
                  <p className="text-xs text-slate-500">Contribua diretamente para o acesso à educação</p>
                </div>
              </div>
              <button onClick={() => setIsSupportModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer">
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
                          ? 'bg-[#2D3BA8] text-white border-[#2D3BA8] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {amt} €
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl text-xs text-blue-900 space-y-1">
                <span className="font-bold">Impacto estimado com {donationAmount} €:</span>
                <p className="text-[11.5px] text-blue-800">
                  {donationAmount * 3} livros escolares e material didático para {Math.round(donationAmount / 5)} estudantes por um trimestre.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSupportModalOpen(false);
                    showToast(`Obrigado pelo seu apoio de ${donationAmount} €! Iniciativa fortalecida.`);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#2D3BA8] hover:bg-[#1E40AF] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
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

      {/* MODAL DETALHES DO PROJETO */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="relative h-56">
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <button onClick={() => setSelectedProject(null)} className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <span className="absolute bottom-3 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#2D3BA8] text-white">
                {selectedProject.tag} • {selectedProject.location}
              </span>
            </div>

            <div className="p-6 pt-2 space-y-4">
              <div>
                <h3 className="text-xl font-black text-[#0F172A] font-['Outfit']">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedProject.description} Este projeto reúne escolas, professores e voluntários comprometidos com o acesso duradouro à educação de qualidade.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Pessoas Beneficiadas</span>
                  <span className="font-extrabold text-[#0F172A] text-sm">{selectedProject.impactPeople}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Status do Projeto</span>
                  <span className="font-extrabold text-[#2D3BA8] text-sm">{selectedProject.progressPercent}% Concluído</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    setIsSupportModalOpen(true);
                  }}
                  className="flex-1 py-2.5 px-4 bg-[#2D3BA8] hover:bg-[#1E40AF] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  <span>Apoiar este Projeto</span>
                </button>
                <button onClick={() => setSelectedProject(null)} className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FERRAMENTA / RECURSO */}
      {activeToolModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0F172A] font-['Outfit']">
                {activeToolModal}
              </h3>
              <button onClick={() => setActiveToolModal(null)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              O módulo <strong>{activeToolModal}</strong> faz parte do ecossistema aberto VILA para apoiar estudantes, educadores e organizações com recursos práticos de educação.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-blue-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Acesso público e gratuito</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Conteúdo revisado por especialistas</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveToolModal(null);
                  showToast(`${activeToolModal} iniciado com sucesso!`);
                }}
                className="w-full py-2.5 px-4 bg-[#2D3BA8] hover:bg-[#1E40AF] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Abrir Ferramenta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RELATÓRIO DE IMPACTO REGIONAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-[#0F172A] font-['Outfit']">
                  Relatório de Impacto Regional
                </h3>
                <p className="text-xs text-slate-500">Distribuição global de iniciativas educacionais ativas</p>
              </div>
              <button onClick={() => setIsReportModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-blue-900">
                <span className="font-bold block mb-1">África (34% do impacto total)</span>
                Construção de escolas rurais, formação de professores e bolsas para estudantes de baixa renda.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <span className="font-bold block mb-1">Ásia (28% do impacto total)</span>
                Laboratórios digitais, educação STEM para meninas e alfabetização digital.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <span className="font-bold block mb-1">América Latina (20% do impacto total)</span>
                Bolsas de estudo integrais e programas de mentoria para jovens em vulnerabilidade.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <span className="font-bold block mb-1">Europa (12% do impacto total)</span>
                Inclusão escolar, educação especial e inovação pedagógica digital.
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsReportModalOpen(false)}
              className="w-full py-2.5 px-4 bg-[#2D3BA8] hover:bg-[#1E40AF] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Concluir Leitura
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationImpactView;
