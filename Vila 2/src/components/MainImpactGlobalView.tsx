import React, { useState } from 'react';
import { ImpactRegionMapCard } from './ImpactRegionMapCard';
import { LineChart, DonutChart, LineSeries, DonutSlice } from './admin/MiniCharts';
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
  BookOpen,
  Sparkles,
  Droplets,
  Shield,
  Target,
  X,
  Cpu,
  Coins,
  Wind,
  Info,
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
  count: string;
  growth: string;
  icon: React.ReactNode;
  iconBg: string;
  iconSoftBg: string;
  categoryTarget: string;
}

interface FeaturedProject {
  id: string;
  tag: string;
  tagBg: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  countries: number;
  people: string;
}

// 6 Áreas de impacto (estilo referência: ícone colorido, nome, nº iniciativas, crescimento)
const IMPACT_AREAS: AreaItem[] = [
  {
    id: 'area-ambiente',
    name: 'Ambiente',
    count: '842 iniciativas',
    growth: '+23%',
    iconBg: 'bg-[#064E3B] text-white',
    iconSoftBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    icon: <Leaf className="w-5 h-5" />,
    categoryTarget: 'ambiente',
  },
  {
    id: 'area-educacao',
    name: 'Educação',
    count: '615 iniciativas',
    growth: '+22%',
    iconBg: 'bg-[#2563EB] text-white',
    iconSoftBg: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    icon: <BookOpen className="w-5 h-5" />,
    categoryTarget: 'educacao',
  },
  {
    id: 'area-direitos',
    name: 'Direitos Humanos',
    count: '470 iniciativas',
    growth: '+15%',
    iconBg: 'bg-[#7C3AED] text-white',
    iconSoftBg: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
    icon: <Users className="w-5 h-5" />,
    categoryTarget: 'direitos-humanos',
  },
  {
    id: 'area-saude',
    name: 'Saúde',
    count: '522 iniciativas',
    growth: '+19%',
    iconBg: 'bg-[#E11D48] text-white',
    iconSoftBg: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
    icon: <HeartPulse className="w-5 h-5" />,
    categoryTarget: 'saude',
  },
  {
    id: 'area-empreendedorismo',
    name: 'Empreendedorismo',
    count: '388 iniciativas',
    growth: '+17%',
    iconBg: 'bg-[#EA580C] text-white',
    iconSoftBg: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
    icon: <Rocket className="w-5 h-5" />,
    categoryTarget: 'empreendedorismo',
  },
  {
    id: 'area-cultura',
    name: 'Cultura',
    count: '286 iniciativas',
    growth: '+28%',
    iconBg: 'bg-[#D97706] text-white',
    iconSoftBg: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    icon: <Palette className="w-5 h-5" />,
    categoryTarget: 'cultura',
  },
];

// 4 Projetos em Destaque (mini-cards horizontais com imagem à esquerda)
const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'p-oceano',
    tag: 'Oceano Limpo',
    tagBg: 'bg-emerald-600 text-white',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format&fit=crop&q=80',
    title: 'Oceano Limpo',
    subtitle: 'Proteção dos oceanos e vida marinha',
    description: 'Redução de plásticos e conservação marinha em cooperação com comunidades costeiras.',
    countries: 23,
    people: '+1.2M pessoas',
  },
  {
    id: 'p-cidades',
    tag: 'Cidades Verdes',
    tagBg: 'bg-teal-600 text-white',
    image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&auto=format&fit=crop&q=80',
    title: 'Cidades Verdes',
    subtitle: 'Transformação urbana sustentável',
    description: 'Mobilidade ativa, arborização e eficiência energética para cidades mais vivíveis.',
    countries: 41,
    people: '+5.8M pessoas',
  },
  {
    id: 'p-agua',
    tag: 'Água para Todos',
    tagBg: 'bg-sky-600 text-white',
    image: 'https://images.unsplash.com/photo-1541919329513-35f7af297129?w=400&auto=format&fit=crop&q=80',
    title: 'Água para Todos',
    subtitle: 'Acesso à água potável e saneamento',
    description: 'Furos, captação de água da chuva e formação de comitês locais de água.',
    countries: 36,
    people: '+1.2M pessoas',
  },
  {
    id: 'p-inovacao',
    tag: 'Inovação Social',
    tagBg: 'bg-amber-600 text-white',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&auto=format&fit=crop&q=80',
    title: 'Inovação Social',
    subtitle: 'Soluções inovadoras para desafios sociais',
    description: 'Aceleração de soluções comunitárias com mentoria e financiamento semente.',
    countries: 58,
    people: '+3.6M pessoas',
  },
];

// ODS usados no donut + barras (números e cores oficiais)
interface SdgItem {
  number: number;
  name: string;
  color: string;
  short: string;
  value: number;
}

const ODS_ITEMS: SdgItem[] = [
  { number: 13, name: 'Ação Climática', color: '#3F7E44', short: 'Ação Climática', value: 812 },
  { number: 11, name: 'Cidades e Comunidades Sustentáveis', color: '#FD9D24', short: 'Cidades Sustentáveis', value: 578 },
  { number: 7, name: 'Energia Acessível e Limpa', color: '#F5B942', short: 'Energia Limpa', value: 402 },
  { number: 4, name: 'Educação de Qualidade', color: '#C5192D', short: 'Educação', value: 356 },
  { number: 3, name: 'Saúde e Bem-Estar', color: '#4C9F38', short: 'Saúde e Bem-Estar', value: 298 },
];

const ODS_OUTROS = 401;

// KPIs do topo (estilo referência com variação vs. último ano)
const TOP_KPIS = [
  { value: '2.847', label: 'Iniciativas de Impacto', delta: '+18% vs. último ano', icon: Leaf, iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' },
  { value: '185M', label: 'Pessoas Impactadas', delta: '+24% vs. último ano', icon: Users, iconBg: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400' },
  { value: '197', label: 'Países Envolvidos', delta: '+6 novos este ano', icon: Globe, iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400' },
  { value: '14,2B €', label: 'Investimento Mobilizado', delta: '+21% vs. último ano', icon: Coins, iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' },
  { value: '68,5M t', label: 'CO₂ Evitado', delta: '+29% vs. último ano', icon: Wind, iconBg: 'bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400' },
];

// Sidebar: Destaques de Impacto
const HIGHLIGHTS = [
  { title: 'Reforestamento Global', desc: '2.1M árvores plantadas', meta: '24 países', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&auto=format&fit=crop&q=70' },
  { title: 'Energia Limpa para Todos', desc: '+18M pessoas com acesso', meta: '45 projetos', image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=200&auto=format&fit=crop&q=70' },
  { title: 'Educação Inclusiva', desc: '+3.4M estudantes', meta: '68 países', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&auto=format&fit=crop&q=70' },
  { title: 'Economia Circular', desc: '+2.7M toneladas recicladas', meta: '32 países', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200&auto=format&fit=crop&q=70' },
];

// Sidebar: Ações que Fazem a Diferença
const ACTIONS = [
  { title: 'Apoie iniciativas de impacto', desc: 'Descubra projetos para apoiar', icon: Leaf, bg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' },
  { title: 'Partilhe conhecimento', desc: 'Ajude a inspirar e transformar', icon: BookOpen, bg: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' },
  { title: 'Participe na comunidade', desc: 'Colabore em ações globais', icon: Users, bg: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400' },
  { title: 'Meça o seu impacto', desc: 'Acompanhe e gere resultados', icon: Target, bg: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' },
];

export const MainImpactGlobalView: React.FC<MainImpactGlobalViewProps> = ({
  onNavigateToCategory,
  onNavigateToTab,
  onOpenAiAssistant,
}) => {
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [isOdsModalOpen, setIsOdsModalOpen] = useState(false);
  const [selectedProjectModal, setSelectedProjectModal] = useState<FeaturedProject | null>(null);
  const [isSuccessToast, setIsSuccessToast] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Ambiente');
  const [newLocation, setNewLocation] = useState('');
  const [newGoal, setNewGoal] = useState('');

  const handleLaunchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLaunchModalOpen(false);
    setIsSuccessToast(true);
    setNewTitle('');
    setNewCategory('Ambiente');
    setNewLocation('');
    setNewGoal('');
    setTimeout(() => setIsSuccessToast(false), 4000);
  };

  const odsSlices: DonutSlice[] = ODS_ITEMS.map((o) => ({ label: o.short, value: o.value, color: o.color }));
  const odsMax = Math.max(...ODS_ITEMS.map((o) => o.value), ODS_OUTROS);
  const odsTotal = ODS_ITEMS.reduce((a, o) => a + o.value, 0) + ODS_OUTROS;
  // Lista única estilo referência: emblema do ODS + nome + barra + valor (inclui "Outros ODS")
  const odsList = [
    ...ODS_ITEMS.map((o) => ({ number: o.number, name: o.short, color: o.color, value: o.value })),
    { number: 0, name: 'Outros ODS', color: '#94A3B8', value: ODS_OUTROS },
  ];
  const odsSeries: LineSeries[] = [
    {
      name: 'Índice de Impacto',
      color: '#059669',
      values: [56, 60, 64, 68, 72],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FB] dark:bg-slate-950">
      {isSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#064E3B] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-700 animate-in fade-in slide-in-from-bottom-4">
          <Check className="w-5 h-5 text-emerald-300" />
          <span className="text-sm font-semibold">Iniciativa enviada com sucesso para moderação comunitária!</span>
        </div>
      )}

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
      {/* 1. CABEÇALHO: ícone + título + subtítulo à esquerda; imagem de rede global à direita */}
        <section id="impacto-global-header" className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#064E3B] text-white flex items-center justify-center shrink-0 shadow-sm border border-emerald-950/20">
              <Leaf className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.4} />
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-slate-50 tracking-tight font-['Outfit'] leading-tight">
                Impacto Global
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-normal leading-snug max-w-lg">
                Acompanhe o impacto das iniciativas, projetos e ações que estão a transformar o mundo em direção a um futuro melhor.
              </p>
            </div>
          </div>

          {/* Botão Lançar Iniciativa (fora do fluxo da referência, mas mantém a ação principal) */}
          <button
            type="button"
            onClick={() => setIsLaunchModalOpen(true)}
            id="btn-lancar-iniciativa-global"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#04382A] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Lançar Iniciativa</span>
            <Plus className="w-4 h-4 stroke-[2.8]" />
          </button>
        </section>

        {/* Linha principal: conteúdo + sidebar começando ao nível dos KPIs */}
        <div className="flex flex-col xl:flex-row gap-5 items-start w-full">
        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 min-w-0 flex flex-col gap-5 w-full">
        {/* 2. KPIs DO TOPO (5 cards com ícone à esquerda, valor, label e variação) */}
        <section id="impacto-global-top-metrics" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {TOP_KPIS.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex items-center gap-3 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className={`w-11 h-11 rounded-xl ${m.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5.5 h-5.5" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <span className="block text-lg font-black text-[#0F172A] dark:text-slate-50 font-['Outfit'] leading-none">
                    {m.value}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block mt-1 leading-tight">
                    {m.label}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    {m.delta}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {/* 3. ÁREAS DE IMPACTO (6 cards com header "Ver todas as áreas") */}
        <section id="areas-de-impacto-main" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                Áreas de Impacto
              </h3>
              <Info className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
            </div>
            <button
              type="button"
              onClick={() => onNavigateToCategory && onNavigateToCategory('mais')}
              className="text-[11px] sm:text-xs font-bold text-[#059669] hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <span>Ver todas as áreas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
            {IMPACT_AREAS.map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={() => onNavigateToCategory && onNavigateToCategory(area.categoryTarget)}
                className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-xs transition-all p-3 flex flex-col items-start text-left cursor-pointer group"
              >
                <div className={`w-10 h-10 rounded-xl ${area.iconSoftBg} flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform`}>
                  {area.icon}
                </div>
                <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] leading-snug">
                  {area.name}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {area.count}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {area.growth}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 4. ODS (donut + barras) LADO A LADO com EVOLUÇÃO (linha) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Impacto por ODS */}
          <section id="ods-alignment-main" className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 sm:p-5 shadow-2xs flex flex-col gap-3">
            <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight leading-snug">
              Impacto por Objetivos de Desenvolvimento Sustentável (ODS)
            </h3>

            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="relative shrink-0 self-center md:self-auto">
                <DonutChart
                  slices={odsSlices}
                  size={148}
                  thickness={24}
                  centerLabel={odsTotal.toLocaleString('pt-PT')}
                  centerSub="Iniciativas"
                  hideLegend
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-2.5">
                {odsList.map((o) => (
                  <div key={o.name} className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-7 h-7 rounded-lg text-white flex items-center justify-center text-[11px] font-black shrink-0"
                      style={{ background: o.color }}
                      title={o.name}
                    >
                      {o.number > 0 ? o.number : '+'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">{o.name}</span>
                        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">{o.value}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 mt-1 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${(o.value / odsMax) * 100}%`, background: o.color }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Evolução do Impacto Global */}
          <section id="impact-evolution-main" className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 sm:p-5 shadow-2xs flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
                Evolução do Impacto Global
              </h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1">
                Últimos 5 anos
                <ChevronRight className="w-3 h-3 rotate-90" />
              </span>
            </div>

            {/* Índice de Impacto Global: número grande + delta */}
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-['Outfit'] leading-none">72</span>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">/100</span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 rounded-full px-2 py-0.5 ml-1">
                ▲ +16 pontos vs. 5 anos atrás
              </span>
            </div>

            <div className="flex-1 min-h-[170px]">
              <LineChart
                series={odsSeries}
                labels={['2020', '2021', '2022', '2023', '2024']}
                height={190}
                yTicks={4}
                formatY={(v) => String(Math.round(v))}
              />
            </div>
          </section>
        </div>

        {/* 5. PROJETOS DE IMPACTO EM DESTAQUE (4 mini-cards horizontais) */}
        <section id="projetos-em-destaque-main" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
              Projetos de Impacto em Destaque
            </h3>
            <button
              type="button"
              onClick={() => onNavigateToCategory && onNavigateToCategory('ambiente')}
              className="text-[11px] sm:text-xs font-bold text-[#059669] hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <span>Ver todos os projetos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 pt-1">
            {FEATURED_PROJECTS.map((proj) => (
              <article
                key={proj.id}
                onClick={() => setSelectedProjectModal(proj)}
                className="rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 hover:shadow-xs hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer group flex"
              >
                {/* Imagem quadrada à esquerda */}
                <div className="relative w-20 h-auto shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Conteúdo à direita */}
                <div className="p-3 flex-1 min-w-0">
                  <span className={`inline-block text-[8.5px] font-bold px-1.5 py-0.5 rounded ${proj.tagBg}`}>
                    {proj.tag}
                  </span>
                  <h4 className="text-[11.5px] font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] leading-snug mt-1.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 line-clamp-2">
                    {proj.subtitle}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-[9px] text-slate-400 dark:text-slate-500 font-medium">
                    <Globe className="w-3 h-3" />
                    <span>{proj.countries} países</span>
                    <span>{proj.people}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 6. CTA FINAL: Pequenas ações, grande impacto (faixa larga verde clara) */}
        <section
          id="cta-impacto-global-final"
          className="rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-900/40 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-black text-[#0F172A] dark:text-slate-50 font-['Outfit']">
                Pequenas ações, grande impacto.
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Juntos, estamos a construir um mundo melhor para hoje e para as próximas gerações.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsLaunchModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#059669] to-[#10B981] hover:from-[#047857] hover:to-[#059669] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Explorar oportunidades de impacto</span>
            <ArrowRight className="w-4 h-4 stroke-[2.4]" />
          </button>
        </section>
      </main>

      {/* BARRA LATERAL DIREITA — começa ao nível dos KPIs, por baixo do cabeçalho */}
      <aside className="hidden xl:flex w-[300px] shrink-0 flex-col gap-4">
        {/* 1. Destaques de Impacto (4 itens com imagem à esquerda) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit']">Destaques de Impacto</h3>
            <button
              type="button"
              className="text-[11px] font-bold text-[#059669] hover:underline cursor-pointer inline-flex items-center gap-0.5"
            >
              <span>Ver todos</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="py-2.5 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 px-1 -mx-1 rounded-lg transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                  <img src={h.image} alt={h.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                    {h.title}
                  </h4>
                  <p className="text-[10.5px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">{h.desc}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{h.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Ações que Fazem a Diferença (4 linhas com ícone e chevron) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 shadow-2xs flex flex-col gap-2">
          <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] pb-1 border-b border-slate-100 dark:border-slate-800">
            Ações que Fazem a Diferença
          </h3>

          <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
            {ACTIONS.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.title} className="py-2.5 flex items-center justify-between gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 px-1 -mx-1 rounded-lg transition-colors cursor-pointer group">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className={`w-9 h-9 rounded-xl ${a.bg} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        {a.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate leading-tight">{a.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Card VILA AI (fundo azul-marinho com estrela de 4 pontas) */}
        <div className="rounded-2xl bg-[#0B2C58] text-white p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-sky-300" />
            <span className="text-sm font-black font-['Outfit']">VILA AI</span>
            <span className="text-[10px] text-sky-200/80">A sua assistente inteligente</span>
          </div>
          <p className="text-xs text-sky-100/90 leading-relaxed">
            Pergunte à VILA AI sobre impacto, resultados e oportunidades.
          </p>
          <button
            type="button"
            onClick={onOpenAiAssistant}
            className="mt-1 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#10B981] to-[#3B82F6] hover:from-[#059669] hover:to-[#2563EB] text-white text-xs font-bold inline-flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <span>Falar com a VILA AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
      </div>
      </div>
      {/* MODAL: Lançar Iniciativa + */}
      {isLaunchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <Plus className="w-4 h-4 stroke-[3]" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-50 font-['Outfit']">Lançar Nova Iniciativa</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLaunchModalOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLaunchSubmit} className="mt-4 flex flex-col gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Título da Iniciativa</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Reflorestamento e Proteção de Nascentes"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Categoria de Impacto</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-slate-800 dark:text-slate-100"
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
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Localização (País / Cidade)</label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Ex: Brasil, Amazônia"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Meta de Impacto</label>
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Ex: 50.000 árvores plantadas"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
                <button
                  type="button"
                  onClick={() => setIsLaunchModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
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
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <h3 className="font-bold text-slate-900 dark:text-slate-50 font-['Outfit']">Objetivos de Desenvolvimento Sustentável (ODS)</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOdsModalOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              A plataforma VILA alinha todas as suas iniciativas diretamente aos 17 Objetivos de Desenvolvimento Sustentável da ONU, assegurando transparência e impacto verificável.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
              {ODS_ITEMS.map((ods) => (
                <div key={ods.number} className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60">
                  <div className="w-8 h-8 rounded-lg text-white flex items-center justify-center font-bold text-xs shrink-0" style={{ background: ods.color }}>
                    {ods.number}
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-100 block truncate">{ods.short}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">Meta Global 2030</span>
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
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
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
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 font-['Outfit']">
                  {selectedProjectModal.title}
                </h3>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{selectedProjectModal.subtitle}</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {selectedProjectModal.description}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Alcance</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{selectedProjectModal.countries} países</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Pessoas Impactadas</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">{selectedProjectModal.people}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProjectModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
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
