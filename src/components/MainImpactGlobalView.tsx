import React, { useState } from 'react';
import { ImpactRegionMapCard } from './ImpactRegionMapCard';
import {
  Globe,
  Leaf,
  GraduationCap,
  Scale,
  HeartPulse,
  Rocket,
  Palette,
  Compass,
  ArrowRight,
  ChevronRight,
  Check,
  Plus,
  TreePine,
  Heart,
  Users,
  Building2,
  CloudRain,
  BookOpen,
  Sparkles,
  Droplets,
  Shield,
  Briefcase,
  Target,
  ExternalLink,
  X,
  Share2,
  Smile,
  Zap,
  MoreHorizontal,
  Cpu,
} from 'lucide-react';

export interface MainImpactGlobalViewProps {
  onNavigateToCategory?: (category: string) => void;
  onNavigateToTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
}

interface AreaItem {
  id: string;
  name: string;
  description: string;
  count: string;
  icon: React.ReactNode;
  iconBg: string;
  categoryTarget: string;
}

interface FeaturedProject {
  id: string;
  tag: string;
  tagBg: string;
  image: string;
  title: string;
  location: string;
  description: string;
  impactLabel: string;
  progressPercent: number;
  progressBarColor: string;
}

interface SdgItem {
  number: number;
  name: string;
  color: string;
  iconLabel: string;
}

// 6 Áreas de impacto
const IMPACT_AREAS: AreaItem[] = [
  {
    id: 'area-ambiente',
    name: 'Ambiente',
    description: 'Proteção do planeta e biodiversidade.',
    count: '842 iniciativas',
    iconBg: 'bg-[#064E3B] text-white',
    icon: <Leaf className="w-5 h-5" />,
    categoryTarget: 'ambiente',
  },
  {
    id: 'area-educacao',
    name: 'Educação',
    description: 'Acesso e qualidade de educação.',
    count: '615 iniciativas',
    iconBg: 'bg-[#2563EB] text-white',
    icon: <BookOpen className="w-5 h-5" />,
    categoryTarget: 'educacao',
  },
  {
    id: 'area-direitos',
    name: 'Direitos Humanos',
    description: 'Justiça, igualdade e dignidade.',
    count: '470 iniciativas',
    iconBg: 'bg-[#7C3AED] text-white',
    icon: <Users className="w-5 h-5" />,
    categoryTarget: 'direitos-humanos',
  },
  {
    id: 'area-saude',
    name: 'Saúde',
    description: 'Bem-estar e acesso a cuidados.',
    count: '522 iniciativas',
    iconBg: 'bg-[#E11D48] text-white',
    icon: <Heart className="w-5 h-5" />,
    categoryTarget: 'saude',
  },
  {
    id: 'area-empreendedorismo',
    name: 'Empreendedorismo',
    description: 'Inovação social e geração de oportunidades.',
    count: '388 iniciativas',
    iconBg: 'bg-[#EA580C] text-white',
    icon: <Rocket className="w-5 h-5" />,
    categoryTarget: 'empreendedorismo',
  },
  {
    id: 'area-cultura',
    name: 'Cultura',
    description: 'Preservação cultural e diversidade.',
    count: '286 iniciativas',
    iconBg: 'bg-[#D97706] text-white',
    icon: <Palette className="w-5 h-5" />,
    categoryTarget: 'cultura',
  },
];

// 4 Projetos em Destaque
const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'p-mangais',
    tag: 'Ambiente',
    tagBg: 'bg-[#064E3B] text-white',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
    title: 'Restauração de Mangais',
    location: 'Moçambique',
    description: 'Recuperação de ecossistemas costeiros e proteção de comunidades.',
    impactLabel: 'Impactadas 78K pessoas',
    progressPercent: 76,
    progressBarColor: 'bg-emerald-600',
  },
  {
    id: 'p-bibliotecas',
    tag: 'Educação',
    tagBg: 'bg-[#2563EB] text-white',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80',
    title: 'Bibliotecas do Amanhã',
    location: 'Brasil',
    description: 'Leitura e aprendizagem para crianças e jovens.',
    impactLabel: 'Impactadas 63K pessoas',
    progressPercent: 64,
    progressBarColor: 'bg-blue-600',
  },
  {
    id: 'p-igualdade',
    tag: 'Direitos Humanos',
    tagBg: 'bg-[#7C3AED] text-white',
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&auto=format&fit=crop&q=80',
    title: 'Vozes pela Igualdade',
    location: 'Índia',
    description: 'Empoderamento feminino e combate à discriminação.',
    impactLabel: 'Impactadas 112K pessoas',
    progressPercent: 81,
    progressBarColor: 'bg-purple-600',
  },
  {
    id: 'p-clinicas',
    tag: 'Saúde',
    tagBg: 'bg-[#0D9488] text-white',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
    title: 'Clínicas Itinerantes',
    location: 'Quénia',
    description: 'Saúde básica para comunidades remotas e vulneráveis.',
    impactLabel: 'Impactadas 95K pessoas',
    progressPercent: 72,
    progressBarColor: 'bg-teal-600',
  },
];

// ODS / SDG
const ODS_ITEMS: SdgItem[] = [
  { number: 1, name: 'Erradicação da Pobreza', color: 'bg-[#E5243B]', iconLabel: '1' },
  { number: 3, name: 'Saúde e Bem-Estar', color: 'bg-[#4C9F38]', iconLabel: '3' },
  { number: 4, name: 'Educação de Qualidade', color: 'bg-[#C5192D]', iconLabel: '4' },
  { number: 5, name: 'Igualdade de Gênero', color: 'bg-[#FF3A21]', iconLabel: '5' },
  { number: 6, name: 'Água Potável e Saneamento', color: 'bg-[#26BDE2]', iconLabel: '6' },
  { number: 8, name: 'Trabalho Decente e Crescimento', color: 'bg-[#A21942]', iconLabel: '8' },
  { number: 10, name: 'Redução das Desigualdades', color: 'bg-[#DD1367]', iconLabel: '10' },
  { number: 11, name: 'Cidades e Comunidades Sustentáveis', color: 'bg-[#FD9D24]', iconLabel: '11' },
  { number: 13, name: 'Ação Contra Mudança do Clima', color: 'bg-[#3F7E44]', iconLabel: '13' },
  { number: 17, name: 'Parcerias e Meios de Implementação', color: 'bg-[#19486A]', iconLabel: '17' },
];

export const MainImpactGlobalView: React.FC<MainImpactGlobalViewProps> = ({
  onNavigateToCategory,
  onNavigateToTab,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenMobileMenu,
}) => {
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [isOdsModalOpen, setIsOdsModalOpen] = useState(false);
  const [selectedProjectModal, setSelectedProjectModal] = useState<FeaturedProject | null>(null);

  // Form de Lançar Iniciativa
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Ambiente');
  const [newLocation, setNewLocation] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  const handleLaunchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLaunchModalOpen(false);
    setIsSuccessToast(true);
    setTimeout(() => setIsSuccessToast(false), 4000);
    setNewTitle('');
    setNewLocation('');
    setNewGoal('');
  };

  return (
    <div id="main-impact-global-view" className="w-full bg-[#F8FAFC] min-h-screen text-[#0F172A] flex flex-col">
      {/* Toast de Sucesso */}
      {isSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#064E3B] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-700 animate-in fade-in slide-in-from-bottom-4">
          <Check className="w-5 h-5 text-emerald-300" />
          <span className="text-sm font-semibold">Iniciativa enviada com sucesso para moderação comunitária!</span>
        </div>
      )}

      {/* Conteúdo Principal (busca/idioma/notificações/perfil já vêm do Topbar compartilhado no AppLayout) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* 2. Cabeçalho de Impacto Global com Ícone de Folha, Subtítulo e Botão Lançar Iniciativa + */}
        <section id="impacto-global-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            {/* Ícone Quadrado Arredondado com Folha Verde Escuro #064E3B */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#064E3B] text-white flex items-center justify-center shrink-0 shadow-sm border border-emerald-950/20">
              <Leaf className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.4} />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight font-['Outfit'] leading-tight">
                Impacto Global
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] font-normal leading-snug">
                Acompanhe, participe e gere iniciativas que geram impacto positivo real no mundo.
              </p>
            </div>
          </div>

          {/* Botão "Lançar Iniciativa +" em Verde Floresta */}
          <button
            type="button"
            onClick={() => setIsLaunchModalOpen(true)}
            id="btn-lancar-iniciativa-global"
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#04382A] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Lançar Iniciativa</span>
            <Plus className="w-4 h-4 stroke-[2.8]" />
          </button>
        </section>

        {/* 3. Fita com 6 Métricas Principais */}
        <section id="impacto-global-top-metrics" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { value: '3.420', label: 'Iniciativas Ativas', icon: Users },
            { value: '1.248', label: 'Organizações', icon: Building2 },
            { value: '196', label: 'Países', icon: Globe },
            { value: '8.735.412', label: 'Pessoas Impactadas', icon: Shield },
            { value: '2.417.890 t', label: 'CO₂ Evitado', icon: Leaf },
            { value: '159.342', label: 'Voluntários Ativos', icon: Heart },
          ].map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs flex items-center gap-2.5 hover:border-slate-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-black text-[#0F172A] font-['Outfit'] leading-none truncate">
                    {m.value}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium truncate block mt-0.5">
                    {m.label}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {/* 4. Fita Horizontal de Categorias (com 'Todas' Ativa em #064E3B) */}
        <nav
          id="categories-ribbon-impacto-global"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
          aria-label="Categorias de Impacto Global"
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
            { id: 'mais', label: 'Mais', icon: MoreHorizontal },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === 'todas';

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (onNavigateToCategory) {
                    onNavigateToCategory(cat.id);
                  } else if (cat.id === 'mais' && onNavigateToTab) {
                    onNavigateToTab('mais');
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-[#064E3B] text-white shadow-xs'
                    : 'bg-white border border-slate-200/90 text-[#334155] hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} strokeWidth={2.2} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </nav>

        {/* 5. Grade Principal: Coluna Central (Hero + Áreas + Projetos + Métricas) e Coluna Lateral */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* COLUNA PRINCIPAL (lg:col-span-9) */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            {/* HERO BANNER: "Pequenas ações. Grandes mudanças." com Globo 3D Central */}
            <section
              id="hero-impacto-global-banner"
              className="relative rounded-2xl overflow-hidden min-h-[310px] flex items-center text-white shadow-md border border-emerald-950/20 bg-[#062D27] group"
            >
              {/* Elementos Visuais Radiais de Rede e Planeta Central */}
              <div className="absolute right-40 sm:right-64 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center pointer-events-none">
                <div className="relative w-72 h-72 flex items-center justify-center">
                  {/* Globo Fotográfico Renderizado no Centro com Brilho Atmosférico */}
                  <div className="w-36 h-36 rounded-full overflow-hidden shadow-2xl relative ring-4 ring-emerald-400/30 z-10 animate-spin-slow">
                    <img
                      src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&auto=format&fit=crop&q=85"
                      alt="Planeta Terra"
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>

                  {/* Linhas de Conexão Órbita */}
                  <div className="absolute inset-0 rounded-full border border-emerald-500/20 pointer-events-none" />

                  {/* Nós Satélites com Ícones Coloridos */}
                  <div className="absolute top-2 left-12 w-9 h-9 rounded-full bg-[#10B981] border border-white/50 flex items-center justify-center shadow-lg">
                    <Leaf className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-6 right-10 w-9 h-9 rounded-full bg-[#2563EB] border border-white/50 flex items-center justify-center shadow-lg">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute bottom-6 right-8 w-9 h-9 rounded-full bg-[#E11D48] border border-white/50 flex items-center justify-center shadow-lg">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -bottom-2 left-16 w-9 h-9 rounded-full bg-[#EA580C] border border-white/50 flex items-center justify-center shadow-lg">
                    <Rocket className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-9 h-9 rounded-full bg-[#7C3AED] border border-white/50 flex items-center justify-center shadow-lg">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-9 h-9 rounded-full bg-[#D97706] border border-white/50 flex items-center justify-center shadow-lg">
                    <Palette className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Conteúdo do Banner */}
              <div className="relative z-10 p-6 sm:p-8 w-full flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Textos da Esquerda */}
                <div className="max-w-md flex flex-col gap-2.5">
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight font-['Outfit'] tracking-tight">
                    Pequenas ações. <br />
                    Grandes mudanças.
                  </h2>
                  <p className="text-xs sm:text-[13px] text-emerald-100/90 leading-relaxed font-normal">
                    Cada iniciativa conecta pessoas, ideias e recursos para construir um futuro mais justo, sustentável e próspero para todos.
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('projetos-em-destaque-main');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-emerald-50 text-[#064E3B] text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                    >
                      <span>Explorar iniciativas</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.4]" />
                    </button>
                  </div>
                </div>

                {/* Card Transparente na Direita: Métricas Chave do Impacto */}
                <div className="w-full lg:w-72 bg-black/45 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col gap-2.5 shrink-0 shadow-lg">
                  <div className="flex flex-col divide-y divide-white/10 text-xs">
                    <div className="py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <span className="text-[11.5px]">Pessoas Impactadas</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">8.735.412</span>
                    </div>

                    <div className="py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Leaf className="w-4 h-4 text-teal-400" />
                        <span className="text-[11.5px]">CO₂ Evitado</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">2.417.890 t</span>
                    </div>

                    <div className="py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <TreePine className="w-4 h-4 text-emerald-400" />
                        <span className="text-[11.5px]">Árvores Plantadas</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">1.082.345</span>
                    </div>

                    <div className="py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/90">
                        <Heart className="w-4 h-4 text-rose-400" />
                        <span className="text-[11.5px]">Voluntários Ativos</span>
                      </div>
                      <span className="font-bold text-white font-['Outfit']">159.342</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 1: Áreas de Impacto (6 Cards em Linha) */}
            <section id="areas-de-impacto-main" className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Áreas de impacto
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {IMPACT_AREAS.map((area) => (
                  <div
                    key={area.id}
                    onClick={() => {
                      if (onNavigateToCategory) onNavigateToCategory(area.categoryTarget);
                    }}
                    className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      {/* Ícone Redondo com Cor Vibrante */}
                      <div className={`w-9 h-9 rounded-full ${area.iconBg} flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform`}>
                        {area.icon}
                      </div>

                      <h4 className="text-xs font-bold text-[#0F172A] font-['Outfit'] leading-snug group-hover:text-emerald-700 transition-colors">
                        {area.name}
                      </h4>

                      <p className="text-[10px] text-slate-500 leading-tight mt-1 line-clamp-2">
                        {area.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 mt-2">
                      <span className="text-[9.5px] font-bold text-emerald-700 block">
                        {area.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SEÇÃO 2: Projetos em Destaque (4 Cards) + Impacto por Região (Lado a Lado) */}
            <section id="projetos-em-destaque-main" className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              {/* 4 Cards de Projetos (lg:col-span-8) */}
              <div className="lg:col-span-8 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                    Projetos em destaque
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                  {FEATURED_PROJECTS.map((proj) => (
                    <article
                      key={proj.id}
                      onClick={() => setSelectedProjectModal(proj)}
                      className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col cursor-pointer group"
                    >
                      {/* Imagem do Projeto com Badge da Categoria */}
                      <div className="relative h-24 w-full overflow-hidden bg-slate-100">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <span className={`absolute top-2 left-2 text-[8px] font-bold px-2 py-0.5 rounded shadow-2xs ${proj.tagBg}`}>
                          {proj.tag}
                        </span>
                      </div>

                      {/* Conteúdo */}
                      <div className="p-2.5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-[11.5px] font-bold text-[#0F172A] font-['Outfit'] line-clamp-1 leading-snug group-hover:text-emerald-700 transition-colors">
                            {proj.title}
                          </h4>
                          <span className="text-[9.5px] text-slate-400 font-medium block">
                            {proj.location}
                          </span>
                          <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight mt-1 mb-1.5">
                            {proj.description}
                          </p>
                        </div>

                        {/* Barra de Progresso */}
                        <div className="pt-2 border-t border-slate-100 mt-2">
                          <div className="flex items-center justify-between text-[9px] mb-1">
                            <span className="text-slate-500 truncate">{proj.impactLabel}</span>
                            <span className="font-bold text-emerald-700 shrink-0">{proj.progressPercent}% da meta</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${proj.progressBarColor}`}
                              style={{ width: `${proj.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Impacto por Região com Mapa Interativo (lg:col-span-4) */}
              <ImpactRegionMapCard
                category="global"
                className="lg:col-span-4"
                customRegions={[
                  { id: 'africa', name: 'África', percent: 32, projectsCount: 420, highlight: true },
                  { id: 'latin-america', name: 'América Latina', percent: 24, projectsCount: 315 },
                  { id: 'asia', name: 'Ásia', percent: 20, projectsCount: 260 },
                  { id: 'europe', name: 'Europa', percent: 16, projectsCount: 210 },
                  { id: 'north-america', name: 'América do Norte', percent: 8, projectsCount: 105 },
                ]}
              />
            </section>

            {/* SEÇÃO 3: Alinhamento com os ODS (10 Ícones Coloridos Oficiais) */}
            <section id="ods-alignment-main" className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] font-['Outfit']">
                    Alinhamento com os Objetivos de Desenvolvimento Sustentável (ODS)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOdsModalOpen(true)}
                  className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todos os 17 ODS</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Grid de 10 Badges ODS Coloridas em linha elegante */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 py-1">
                {ODS_ITEMS.map((ods) => (
                  <div
                    key={ods.number}
                    onClick={() => setIsOdsModalOpen(true)}
                    title={`ODS ${ods.number}: ${ods.name}`}
                    className={`h-14 rounded-xl ${ods.color} text-white flex flex-col items-center justify-center p-1.5 shadow-2xs cursor-pointer hover:scale-105 transition-transform group`}
                  >
                    <span className="text-sm font-black leading-none font-['Outfit']">
                      {ods.number}
                    </span>
                    <span className="text-[8px] font-bold opacity-90 truncate max-w-full text-center leading-tight mt-1">
                      {ods.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* SEÇÃO 3: O Impacto em Números (6 Cards com Gráficos) */}
            <section id="impacto-em-numeros-main" className="flex flex-col gap-3">
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                O impacto em números
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  {
                    value: '8.735.412',
                    label: 'Pessoas Impactadas',
                    change: '▲ 12,4% este mês',
                    icon: Users,
                    color: '#059669',
                    path: 'M0,18 Q20,12 40,16 T80,8 T120,4',
                  },
                  {
                    value: '2.417.890 t',
                    label: 'CO₂ Evitado',
                    change: '▲ 8,7% este mês',
                    icon: Leaf,
                    color: '#2563EB',
                    path: 'M0,16 Q25,18 50,11 T90,14 T120,5',
                  },
                  {
                    value: '1.082.345',
                    label: 'Árvores Plantadas',
                    change: '▲ 15,3% este mês',
                    icon: TreePine,
                    color: '#059669',
                    path: 'M0,17 Q30,10 60,14 T90,6 T120,3',
                  },
                  {
                    value: '1.248',
                    label: 'Organizações Ativas',
                    change: '▲ 9,1% este mês',
                    icon: Building2,
                    color: '#D97706',
                    path: 'M0,18 Q30,16 60,11 T90,13 T120,5',
                  },
                  {
                    value: '159.342',
                    label: 'Voluntários Ativos',
                    change: '▲ 11,6% este mês',
                    icon: Heart,
                    color: '#E11D48',
                    path: 'M0,15 Q25,13 55,16 T85,8 T120,4',
                  },
                  {
                    value: '3.420',
                    label: 'Iniciativas Ativas',
                    change: '▲ 10,2% este mês',
                    icon: Rocket,
                    color: '#7C3AED',
                    path: 'M0,18 Q30,14 60,15 T90,9 T120,4',
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <Icon className="w-4 h-4 text-slate-400" />
                          <span className="text-[9px] font-bold text-emerald-600">
                            {item.change}
                          </span>
                        </div>
                        <span className="text-sm font-black text-[#0F172A] font-['Outfit'] block truncate">
                          {item.value}
                        </span>
                        <span className="text-[9.5px] text-slate-500 font-medium block leading-tight mt-0.5">
                          {item.label}
                        </span>
                      </div>

                      <div className="pt-2">
                        <svg viewBox="0 0 120 22" className="w-full h-5 overflow-visible">
                          <path
                            d={item.path}
                            fill="none"
                            stroke={item.color}
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* COLUNA LATERAL DIREITA (lg:col-span-3) */}
          <aside className="lg:col-span-3 flex flex-col gap-4">
            {/* 1. Card: Mais populares em Impacto Global */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit']">
                  Mais populares em Impacto Global
                </h3>
                <button
                  type="button"
                  className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100">
                {[
                  { rank: 1, name: 'Ação Climática Global', supporters: '215K apoiadores', growth: '▲ 24%', icon: Leaf, bg: 'bg-[#064E3B] text-white' },
                  { rank: 2, name: 'Educação para Todos', supporters: '189K apoiadores', growth: '▲ 18%', icon: BookOpen, bg: 'bg-[#EA580C] text-white' },
                  { rank: 3, name: 'Água Limpa e Saneamento', supporters: '142K apoiadores', growth: '▲ 16%', icon: Droplets, bg: 'bg-[#2563EB] text-white' },
                  { rank: 4, name: 'Igualdade de Gênero', supporters: '128K apoiadores', growth: '▲ 15%', icon: Users, bg: 'bg-[#E11D48] text-white' },
                  { rank: 5, name: 'Fome Zero', supporters: '115K apoiadores', growth: '▲ 12%', icon: Sparkles, bg: 'bg-[#D97706] text-white' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.rank}
                      className="py-2 flex items-center justify-between gap-2 hover:bg-slate-50 px-1 rounded-lg transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-bold text-slate-400 w-3 shrink-0">
                          {item.rank}
                        </span>
                        <div className={`w-7 h-7 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-[#0F172A] truncate group-hover:text-emerald-700 transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-slate-500 block truncate">
                            {item.supporters}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#10B981] shrink-0">
                        {item.growth}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Card: Recursos e Ferramentas (5 Itens) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit']">
                  Recursos e ferramentas
                </h3>
                <button
                  type="button"
                  className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100">
                {[
                  { title: 'Guia para criar impacto', desc: 'Passo a passo para iniciar sua iniciativa', bg: 'bg-orange-50 text-orange-600', icon: Target },
                  { title: 'Como medir impacto', desc: 'Métricas e indicadores essenciais', bg: 'bg-blue-50 text-blue-600', icon: Shield },
                  { title: 'Financiamento e doações', desc: 'Encontre apoio para sua causa', bg: 'bg-emerald-50 text-emerald-600', icon: Heart },
                  { title: 'Parcerias e colaborações', desc: 'Conecte-se com organizações', bg: 'bg-teal-50 text-teal-600', icon: Users },
                  { title: 'Ferramentas gratuitas', desc: 'Recursos para potencializar projetos', bg: 'bg-rose-50 text-rose-600', icon: Sparkles },
                ].map((res, i) => {
                  const Icon = res.icon;
                  return (
                    <div
                      key={i}
                      className="py-2 flex items-center justify-between gap-2.5 hover:bg-slate-50 px-1 rounded-lg transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className={`w-8 h-8 rounded-lg ${res.bg} flex items-center justify-center shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-emerald-700 transition-colors leading-snug">
                            {res.title}
                          </h4>
                          <p className="text-[10px] text-slate-500 truncate leading-tight">
                            {res.desc}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:text-slate-600 transition-colors" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Card de Chamada CTA: "Seja parte da mudança que o mundo precisa." com mãos segurando muda */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0C221C] text-white p-5 shadow-sm flex flex-col justify-between min-h-[340px]">
              {/* Imagem de Mãos Segurando Broto Verde */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80"
                  alt="Mãos segurando muda"
                  className="w-full h-full object-cover object-center opacity-40 hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C221C] via-[#0C221C]/80 to-transparent" />
              </div>

              <div className="relative z-10">
                <h3 className="text-base sm:text-lg font-black text-white font-['Outfit'] leading-tight mb-2">
                  Seja parte da mudança que o mundo precisa.
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Crie ou apoie iniciativas que geram impacto real e duradouro nas comunidades ao redor do mundo.
                </p>
              </div>

              <div className="relative z-10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsLaunchModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-emerald-50 text-[#0F172A] text-xs font-bold inline-flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Explorar Iniciativas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* MODAL: Lançar Iniciativa + */}
      {isLaunchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Plus className="w-4 h-4 stroke-[3]" />
                </div>
                <h3 className="font-bold text-slate-900 font-['Outfit']">Lançar Nova Iniciativa</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLaunchModalOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLaunchSubmit} className="mt-4 flex flex-col gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título da Iniciativa</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Reflorestamento e Proteção de Nascentes"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Categoria de Impacto</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                >
                  <option value="Ambiente">Ambiente</option>
                  <option value="Educação">Educação</option>
                  <option value="Direitos Humanos">Direitos Humanos</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Empreendedorismo">Empreendedorismo</option>
                  <option value="Cultura">Cultura</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Localização (País / Cidade)</label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Ex: Brasil, Amazônia"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Meta de Impacto</label>
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Ex: 50.000 árvores plantadas"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={() => setIsLaunchModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#064E3B] hover:bg-[#04382A] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Publicar Iniciativa</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Alinhamento com os ODS Detalhado */}
      {isOdsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-slate-900 font-['Outfit']">Objetivos de Desenvolvimento Sustentável (ODS)</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOdsModalOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              A plataforma VILA alinha todas as suas iniciativas diretamente aos 17 Objetivos de Desenvolvimento Sustentável da ONU, assegurando transparência e impacto verificável.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
              {ODS_ITEMS.map((ods) => (
                <div key={ods.number} className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-100 bg-slate-50/70">
                  <div className={`w-8 h-8 rounded-lg ${ods.color} text-white flex items-center justify-center font-bold text-xs shrink-0`}>
                    {ods.number}
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-slate-800 block truncate">{ods.name}</span>
                    <span className="text-[10px] text-slate-400">Meta Global 2030</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsOdsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#064E3B] text-white text-xs font-bold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Projeto */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="relative h-44 w-full">
              <img
                src={selectedProjectModal.image}
                alt={selectedProjectModal.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedProjectModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
              >
                <X className="w-4 h-4" />
              </button>
              <span className={`absolute bottom-3 left-3 text-xs font-bold px-2.5 py-1 rounded shadow-md ${selectedProjectModal.tagBg}`}>
                {selectedProjectModal.tag}
              </span>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  {selectedProjectModal.title}
                </h3>
                <span className="text-xs text-slate-400 font-medium">{selectedProjectModal.location}</span>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {selectedProjectModal.description}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Impacto Alcançado</span>
                  <span className="font-bold text-slate-800 text-sm">{selectedProjectModal.impactLabel}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">Meta Cumprida</span>
                  <span className="font-bold text-emerald-700 text-sm">{selectedProjectModal.progressPercent}%</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProjectModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProjectModal(null);
                    setIsSuccessToast(true);
                    setTimeout(() => setIsSuccessToast(false), 4000);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#064E3B] hover:bg-[#04382A] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Apoiar este Projeto</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainImpactGlobalView;
