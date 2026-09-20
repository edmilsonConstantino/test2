import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  Globe,
  Landmark,
  TrendingUp,
  Leaf,
  Cpu,
  HeartPulse,
  Scale,
  Shield,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowRight,
  Bookmark,
  Share2,
  Users,
  Flame,
  Radio,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Building2,
  Stethoscope,
  Vote,
  LifeBuoy,
  MapPin,
  Eye,
  Activity,
  BarChart2,
} from 'lucide-react';

export interface GlobalNewsViewProps {
  onOpenAiAssistant?: () => void;
  onExploreMap?: () => void;
}

interface FilterPillItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconColor?: string;
  hasDropdown?: boolean;
  subcategories?: string[];
}

const CATEGORY_PILLS: FilterPillItem[] = [
  { id: 'todas', label: 'Todas', icon: Globe },
  { id: 'politica-global', label: 'Política Global', icon: Landmark, iconColor: 'text-slate-700 dark:text-slate-300' },
  { id: 'economia', label: 'Economia', icon: TrendingUp, iconColor: 'text-emerald-600' },
  {
    id: 'direitos-humanos',
    label: 'Direitos Humanos',
    icon: Scale,
    iconColor: 'text-orange-500',
    hasDropdown: true,
    subcategories: [
      'Todos em Direitos Humanos',
      'Liberdade de Expressão',
      'Refugiados & Migrações',
      'Igualdade & Diversidade',
      'Justiça Social',
    ],
  },
  { id: 'tecnologia', label: 'Tecnologia', icon: Cpu, iconColor: 'text-blue-600' },
  { id: 'saude', label: 'Saúde', icon: HeartPulse, iconColor: 'text-pink-500' },
  { id: 'seguranca', label: 'Segurança', icon: Shield, iconColor: 'text-rose-500' },
  { id: 'ambiente', label: 'Ambiente', icon: Leaf, iconColor: 'text-emerald-600' },
  {
    id: 'mais',
    label: 'Mais',
    icon: Plus,
    iconColor: 'text-slate-500 dark:text-slate-400',
    hasDropdown: true,
    subcategories: [
      'Cultura Global',
      'Educação & Futuro',
      'Inovação Social',
      'Ciência & Espaço',
    ],
  },
];

// 6 Cards da seção "Principais notícias" (exatamente como na imagem)
interface MainNewsCard {
  id: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  image: string;
  time: string;
  title: string;
  countries: string;
}

const MAIN_NEWS_LIST: MainNewsCard[] = [
  {
    id: 'main-1',
    category: 'ECONOMIA',
    categoryColor: 'text-blue-600 dark:text-blue-400',
    categoryBg: 'bg-blue-50 dark:bg-blue-500/10',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80',
    time: 'Há 2 horas',
    title: 'Comércio global cresce 3,2% no primeiro trimestre de 2024',
    countries: '195 países',
  },
  {
    id: 'main-2',
    category: 'TECNOLOGIA',
    categoryColor: 'text-purple-600 dark:text-purple-400',
    categoryBg: 'bg-purple-50 dark:bg-purple-500/10',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    time: 'Há 4 horas',
    title: 'IA generativa revoluciona educação em países em desenvolvimento',
    countries: '87 países',
  },
  {
    id: 'main-3',
    category: 'AMBIENTE',
    categoryColor: 'text-emerald-600 dark:text-emerald-400',
    categoryBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&auto=format&fit=crop&q=80',
    time: 'Há 5 horas',
    title: 'Investimentos em energias renováveis atingem recorde de $2,1 trilhões',
    countries: '160 países',
  },
  {
    id: 'main-4',
    category: 'POLÍTICA GLOBAL',
    categoryColor: 'text-rose-600 dark:text-rose-400',
    categoryBg: 'bg-rose-50 dark:bg-rose-500/10',
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=600&auto=format&fit=crop&q=80',
    time: 'Há 6 horas',
    title: 'Conselho de Segurança da ONU aprova cessar-fogo global',
    countries: '75 países',
  },
  {
    id: 'main-5',
    category: 'SAÚDE GLOBAL',
    categoryColor: 'text-purple-600 dark:text-purple-400',
    categoryBg: 'bg-purple-50 dark:bg-purple-500/10',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
    time: 'Há 8 horas',
    title: 'OMS declara fim da emergência internacional por nova cepa',
    countries: '150 países',
  },
  {
    id: 'main-6',
    category: 'SEGURANÇA',
    categoryColor: 'text-amber-600 dark:text-amber-400',
    categoryBg: 'bg-amber-50 dark:bg-amber-500/10',
    image: 'https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?w=600&auto=format&fit=crop&q=80',
    time: 'Há 9 horas',
    title: 'Esforços diplomáticos intensificam-se em regiões de conflito',
    countries: '60 países',
  },
];

// Itens da coluna lateral "Em destaque agora"
interface HighlightItem {
  id: string;
  category: string;
  categoryColor: string;
  image: string;
  title: string;
  time: string;
}

const HIGHLIGHT_ITEMS: HighlightItem[] = [
  {
    id: 'h-1',
    category: 'AMBIENTE',
    categoryColor: 'text-emerald-700 dark:text-emerald-400 font-bold',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&auto=format&fit=crop&q=80',
    title: 'O planeta ultrapassa limite crítico de aquecimento em 2024',
    time: 'Há 1 hora',
  },
  {
    id: 'h-2',
    category: 'ECONOMIA',
    categoryColor: 'text-blue-700 dark:text-blue-400 font-bold',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&auto=format&fit=crop&q=80',
    title: 'Bancos centrais do mundo mantêm taxas de juros',
    time: 'Há 3 horas',
  },
  {
    id: 'h-3',
    category: 'SAÚDE GLOBAL',
    categoryColor: 'text-purple-700 dark:text-purple-400 font-bold',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
    title: 'Nova vacina mostra 95% de eficácia contra vírus emergente',
    time: 'Há 5 horas',
  },
  {
    id: 'h-4',
    category: 'DIREITOS HUMANOS',
    categoryColor: 'text-amber-700 dark:text-amber-400 font-bold',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=300&auto=format&fit=crop&q=80',
    title: 'ONU aprova resolução histórica sobre migrações climáticas',
    time: 'Há 6 horas',
  },
];

// Lista de "Tendências globais"
interface GlobalTrendItem {
  rank: number;
  label: string;
  direction: 'up' | 'down';
}

const GLOBAL_TRENDS: GlobalTrendItem[] = [
  { rank: 1, label: 'IA Responsável', direction: 'up' },
  { rank: 2, label: 'Ação Climática', direction: 'up' },
  { rank: 3, label: 'Economia Global', direction: 'up' },
  { rank: 4, label: 'Saúde Mental', direction: 'down' },
  { rank: 5, label: 'Conflitos Regionais', direction: 'down' },
];

export const GlobalNewsView: React.FC<GlobalNewsViewProps> = ({
  onOpenAiAssistant,
  onExploreMap,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('todas');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [savedNewsIds, setSavedNewsIds] = useState<Set<string>>(new Set());
  const [shareFeedback, setShareFeedback] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainNewsScrollRef = useRef<HTMLDivElement>(null);

  const scrollMainNews = (direction: 'left' | 'right') => {
    if (mainNewsScrollRef.current) {
      const card = mainNewsScrollRef.current.querySelector('article');
      const cardWidth = card ? card.offsetWidth + 14 : (mainNewsScrollRef.current.clientWidth + 14) / 4;
      const amount = direction === 'left' ? -cardWidth : cardWidth;
      mainNewsScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Pills de categoria: todas menos "+ Mais" (que fica sempre fixo por último)
  const regularPills = CATEGORY_PILLS.slice(0, -1);
  const morePill = CATEGORY_PILLS[CATEGORY_PILLS.length - 1];

  // Quais pills "regulares" cabem numa única linha antes do "+ Mais" — recalculado por medição real.
  // Guarda os IDs (não apenas uma contagem) porque um pill mais estreito mais à frente pode caber
  // no espaço restante mesmo que um pill mais largo antes dele não tenha coubido.
  const [visiblePillIds, setVisiblePillIds] = useState<string[]>(() =>
    regularPills.filter((p) => p.id !== 'ambiente').map((p) => p.id)
  );
  const measureRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const moreMeasureRef = useRef<HTMLButtonElement | null>(null);

  // Mede a largura real de cada pill (numa camada invisível) e encaixa (first-fit) o máximo
  // possível na largura disponível da nav, sem deixar espaço desperdiçado. O que não couber
  // vai para dentro do dropdown "+ Mais", que fica sempre reservado no final.
  useLayoutEffect(() => {
    const navEl = containerRef.current;
    if (!navEl) return;

    const recalcVisiblePills = () => {
      const containerWidth = navEl.clientWidth;
      const gap = 6; // gap-1.5
      const moreWidth = moreMeasureRef.current?.offsetWidth ?? 88;

      let used = 0;
      const fittingIds: string[] = [];

      // Ambiente fica sempre no menu "+ Mais", conforme solicitado pelo usuário
      const candidates = regularPills.filter((p) => p.id !== 'ambiente');

      for (let i = 0; i < candidates.length; i++) {
        const originalIndex = regularPills.findIndex((p) => p.id === candidates[i].id);
        const width = measureRefs.current[originalIndex]?.offsetWidth ?? 0;
        const gapBefore = fittingIds.length > 0 ? gap : 0;
        const prospectiveUsed = used + gapBefore + width;
        // Encaixa o pill se couber com o "+ Mais" reservado no final
        const totalWithMore = prospectiveUsed + gap + moreWidth;

        // Se for o último candidato (Segurança), permitimos uma margem para que preencha a fila
        // até o final do card sem sobrar espaço em branco
        if (totalWithMore <= containerWidth || (i === candidates.length - 1 && prospectiveUsed + gap + moreWidth <= containerWidth + 40)) {
          used = prospectiveUsed;
          fittingIds.push(candidates[i].id);
        }
      }

      setVisiblePillIds((prev) => (prev.join(',') === fittingIds.join(',') ? prev : fittingIds));
    };

    recalcVisiblePills();
    const observer = new ResizeObserver(recalcVisiblePills);
    observer.observe(navEl);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regularPills.length]);

  const visiblePillIdSet = new Set(visiblePillIds);
  const visiblePills = regularPills.filter((p) => visiblePillIdSet.has(p.id));
  const overflowPills = regularPills.filter((p) => !visiblePillIdSet.has(p.id));
  const activeOverflowPill = overflowPills.find((p) => p.id === activeFilter);

  const toggleSaveNews = (id: string) => {
    setSavedNewsIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    }
  };

  // Fecha dropdowns se clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePillClick = (pill: FilterPillItem) => {
    if (pill.hasDropdown) {
      setOpenDropdownId((prev) => (prev === pill.id ? null : pill.id));
    } else {
      setActiveFilter(pill.id);
      setSelectedSubcategory(null);
      setOpenDropdownId(null);
    }
  };

  const handleSubcategorySelect = (pillId: string, subcategory: string) => {
    setActiveFilter(pillId);
    setSelectedSubcategory(subcategory);
    setOpenDropdownId(null);
  };

  const handleOverflowPillSelect = (pill: FilterPillItem) => {
    setActiveFilter(pill.id);
    setSelectedSubcategory(null);
    setOpenDropdownId(null);
  };

  const renderPillButton = (pill: FilterPillItem) => {
    const Icon = pill.icon;
    const isMore = pill.id === morePill.id;
    const isDropdownOpen = openDropdownId === pill.id;
    const isActive = isMore ? activeFilter === pill.id || !!activeOverflowPill : activeFilter === pill.id;

    const displayLabel =
      isMore && activeOverflowPill
        ? `${pill.label}: ${activeOverflowPill.label}`
        : pill.id === activeFilter && selectedSubcategory && selectedSubcategory !== pill.subcategories?.[0]
        ? `${pill.label}: ${selectedSubcategory}`
        : pill.label;

    return (
      <div key={pill.id} className="relative shrink-0">
        <button
          type="button"
          id={`filter-pill-${pill.id}`}
          onClick={() => handlePillClick(pill)}
          className={`inline-flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer shrink-0 font-sans ${
            isActive
              ? 'bg-[#1455AC] text-white border border-[#1455AC] shadow-xs hover:bg-[#0F448A]'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-50 hover:border-slate-300 dark:hover:border-slate-600 shadow-2xs'
          }`}
          aria-expanded={pill.hasDropdown ? isDropdownOpen : undefined}
          aria-current={isActive ? 'true' : undefined}
        >
          <Icon
            className={`w-3 h-3 shrink-0 transition-colors ${
              isActive ? 'text-white' : pill.iconColor || 'text-slate-500'
            }`}
            strokeWidth={2.2}
          />

          <span>{displayLabel}</span>

          {pill.hasDropdown && (
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 stroke-[2.2] ${
                isDropdownOpen ? 'rotate-180' : ''
              } ${isActive ? 'text-white/90' : 'text-slate-400'}`}
            />
          )}
        </button>

        {/* Submenu Dropdown */}
        {pill.hasDropdown && isDropdownOpen && (
          <div
            id={`dropdown-menu-${pill.id}`}
            className="absolute top-full right-0 sm:right-auto sm:left-0 mt-2 w-60 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/90 dark:border-slate-700 shadow-xl py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150 font-sans"
          >
            {/* Categorias que não couberam numa linha só ficam aqui dentro do "+ Mais" */}
            {isMore && overflowPills.length > 0 && (
              <>
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-[10.5px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-sans">
                    Mais categorias
                  </span>
                </div>
                <div className="py-1 font-sans">
                  {overflowPills.map((hiddenPill) => {
                    const HiddenIcon = hiddenPill.icon;
                    const isSelected = activeFilter === hiddenPill.id;
                    return (
                      <button
                        key={hiddenPill.id}
                        type="button"
                        onClick={() => handleOverflowPillSelect(hiddenPill)}
                        className={`w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold transition-colors text-left cursor-pointer ${
                          isSelected
                            ? 'bg-[#1455AC]/10 dark:bg-[#1455AC]/20 text-[#1455AC]'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-50'
                        }`}
                      >
                        <HiddenIcon
                          className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#1455AC]' : hiddenPill.iconColor || 'text-slate-400'}`}
                          strokeWidth={2.2}
                        />
                        <span className="truncate flex-1">{hiddenPill.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#1455AC] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {pill.subcategories && (
              <>
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-[10.5px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-sans">
                    {pill.label}
                  </span>
                </div>

                <div className="py-1 font-sans">
                  {pill.subcategories.map((subcat) => {
                    const isSelected = activeFilter === pill.id && selectedSubcategory === subcat;
                    return (
                      <button
                        key={subcat}
                        type="button"
                        onClick={() => handleSubcategorySelect(pill.id, subcat)}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold transition-colors text-left cursor-pointer ${
                          isSelected
                            ? 'bg-[#1455AC]/10 dark:bg-[#1455AC]/20 text-[#1455AC]'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-50'
                        }`}
                      >
                        <span className="truncate">{subcat}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#1455AC] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="mundo-em-movimento-view" className="w-full bg-[#F1F5F9] min-h-full pb-14 font-sans">
      <div className="max-w-[1600px] mx-auto px-3.5 sm:px-5 lg:px-6 py-5 sm:py-6 flex flex-col gap-6">
        {/* 1. Cabeçalho Principal da Página */}
        <header className="flex flex-col gap-1 font-sans">
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 dark:text-slate-50 leading-tight tracking-tight font-sans">
            Mundo em Movimento
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed font-normal">
            As notícias e acontecimentos que têm impacto global. <br className="hidden sm:inline" />
            Essencial para entender o presente e construir o futuro.
          </p>
        </header>

        {/* 3. Grade Principal em 2 Colunas: Área de Conteúdo à Esquerda + Barra Lateral à Direita */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start w-full">
          {/* COLUNA ESQUERDA (xl:col-span-9 / ~75%) */}
          <div className="xl:col-span-9 flex flex-col gap-6 w-full">
            {/* 2. Pills de Filtro de Categoria (restrita à largura da coluna principal) */}
            <nav
              ref={containerRef}
              id="category-filter-pills"
              className="relative z-20 flex items-center gap-1.5 pt-0.5 select-none"
              aria-label="Filtro de Categorias"
            >
              {/* Camada invisível só para medir a largura real de cada pill (não afeta o layout) */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 flex items-center gap-1.5"
                style={{ visibility: 'hidden', height: 0, overflow: 'hidden', whiteSpace: 'nowrap' }}
              >
                {regularPills.map((pill, index) => {
                  const Icon = pill.icon;
                  return (
                    <button
                      key={`measure-${pill.id}`}
                      ref={(el) => {
                        measureRefs.current[index] = el;
                      }}
                      type="button"
                      tabIndex={-1}
                      className="inline-flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-full text-[11px] sm:text-xs font-semibold border border-transparent"
                    >
                      <Icon className="w-3 h-3 shrink-0" strokeWidth={2.2} />
                      <span>{pill.label}</span>
                      {pill.hasDropdown && <ChevronDown className="w-3 h-3" />}
                    </button>
                  );
                })}
                <button
                  ref={moreMeasureRef}
                  type="button"
                  tabIndex={-1}
                  className="inline-flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-full text-[11px] sm:text-xs font-semibold border border-transparent"
                >
                  <Plus className="w-3 h-3 shrink-0" strokeWidth={2.2} />
                  <span>{morePill.label}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Pills visíveis que cabem numa única linha + "+ Mais" sempre fixo por último */}
              {visiblePills.map((pill) => renderPillButton(pill))}
              {renderPillButton(morePill)}
            </nav>
            {/* Bloco Superior: Hero à esquerda + Impacto em números à direita */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch w-full">
              {/* Card Hero (~65% da coluna esquerda / lg:col-span-8) */}
              <article
                id="hero-news-card"
                className="lg:col-span-8 relative overflow-hidden rounded-[18px] min-h-[290px] lg:min-h-[310px] flex flex-col p-4 sm:p-5 pb-8 sm:pb-9 text-white shadow-md group border border-slate-900/10 font-['Inter']"
              >
                {/* Imagem da Terra vista do espaço com iluminação noturna das cidades */}
                <img
                  src="/mundo.png"
                  alt="Terra vista do espaço à noite com cidades iluminadas"
                  className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Overlay: escuro à esquerda para legibilidade, transparente à direita pra revelar a Terra */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, rgba(2,8,23,0.92) 0%, rgba(2,8,23,0.72) 38%, rgba(2,8,23,0.25) 72%, rgba(2,8,23,0.05) 100%)',
                  }}
                />
                {/* Leve gradiente inferior de apoio */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

                {/* Conteúdo agrupado e compacto no topo-esquerda (sem distribuição uniforme no eixo vertical) */}
                <div className="relative z-10 flex flex-col">
                  {/* 1. Badge sozinho na primeira linha */}
                  <span
                    id="hero-badge-impacto"
                    className="self-start inline-flex items-center px-2.5 py-[5px] rounded-full text-[10px] font-bold uppercase tracking-wide bg-[#E11D48] text-white shadow-xs"
                  >
                    IMPACTO MUNDIAL
                  </span>

                  {/* 2. Metadados logo abaixo do badge */}
                  <div className="mt-2 text-[11px] text-slate-200/90 tracking-wide font-medium flex items-center gap-2">
                    <span className="font-medium text-white/85 uppercase tracking-wide">POLÍTICA GLOBAL</span>
                    <span className="opacity-70">Há 2 horas</span>
                  </div>

                  {/* 3. Título, pouco espaço abaixo dos metadados */}
                  <h2 className="mt-3 max-w-[460px] text-xl lg:text-2xl font-bold text-white leading-[1.35] tracking-tight">
                    Líderes mundiais chegam a<br />
                    acordo histórico sobre IA segura<br />
                    e responsável
                  </h2>

                  {/* 4. Descrição (deslocada um pouco para baixo) */}
                  <p className="mt-6 sm:mt-7 max-w-[440px] text-[12px] sm:text-[13px] text-white leading-[1.6] font-normal">
                    Mais de 120 países assinam o primeiro tratado global para regular o desenvolvimento e uso ético da inteligência artificial.
                  </p>

                  {/* 5. CTA + Ações, junto um pouco para baixo */}
                  <div className="mt-6 sm:mt-7 flex items-center gap-2.5">
                    <button
                      type="button"
                      id="btn-ler-noticia-completa"
                      className="inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-[#1455AC] hover:bg-[#0F448A] text-white text-[11px] sm:text-xs font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer group/btn"
                    >
                      <span>Ler notícia completa</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform stroke-[2.2]" />
                    </button>

                    {/* Bookmark circular */}
                    <button
                      type="button"
                      onClick={() => toggleSaveNews('hero')}
                      aria-label="Salvar notícia"
                      className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border ${
                        savedNewsIds.has('hero')
                          ? 'bg-[#1455AC] text-white border-[#1455AC]'
                          : 'bg-black/35 hover:bg-black/55 text-white/90 hover:text-white border-white/20'
                      }`}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${savedNewsIds.has('hero') ? 'fill-current' : ''}`}
                        strokeWidth={2}
                      />
                    </button>

                    {/* Compartilhar circular */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={handleShare}
                        aria-label="Compartilhar notícia"
                        className="w-9 h-9 rounded-full bg-black/35 hover:bg-black/55 text-white/90 hover:text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" strokeWidth={2} />
                      </button>
                      {shareFeedback && (
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[11px] font-semibold bg-slate-900 text-white rounded-md whitespace-nowrap shadow-md z-30">
                          Link copiado!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dots de paginação no rodapé do Hero */}
                <div
                  id="hero-carousel-dots"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5"
                  aria-label="Controles do Carrossel"
                >
                  {[0, 1, 2, 3, 4, 5].map((index) => {
                    const isCurrent = activeSlide === index;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Ir para notícia ${index + 1}`}
                        className={`transition-all duration-200 cursor-pointer ${
                          isCurrent
                            ? 'w-5 h-2 rounded-full bg-white shadow-sm'
                            : 'w-2 h-2 rounded-full bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    );
                  })}
                </div>
              </article>

              {/* Card "Impacto em números" (~35% da coluna esquerda / lg:col-span-4) */}
              <aside
                id="impacto-em-numeros-card"
                className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs p-4 sm:p-5 flex flex-col justify-between font-sans"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3 font-sans">
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 dark:text-slate-50 font-sans tracking-tight">
                    Impacto em números
                  </h3>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-[#1455AC] hover:underline transition-colors cursor-pointer group shrink-0 whitespace-nowrap"
                  >
                    <span>Ver relatório completo</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2]" />
                  </button>
                </div>

                {/* Grid 2x2 com os 4 Indicadores Estatísticos - Layout leve e horizontal com tipografia suave */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 flex-1 content-center font-sans">
                  {/* Indicador 1: 195 Países afetados */}
                  <div className="bg-slate-50/70 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl p-3 sm:p-3.5 flex flex-col justify-between border border-slate-100 dark:border-slate-800 transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100/70 dark:border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Users className="w-4.5 h-4.5" strokeWidth={2} />
                      </div>
                      <div className="text-xl sm:text-[22px] font-bold text-slate-900 dark:text-slate-50 font-sans tracking-tight">
                        195
                      </div>
                    </div>
                    <div className="mt-2.5 flex flex-col gap-0.5">
                      <div className="text-[11.5px] sm:text-xs font-normal text-slate-500 dark:text-slate-400 leading-snug">
                        Países afetados
                      </div>
                      <div className="text-[10.5px] sm:text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="font-bold">+12</span>
                        <span className="text-slate-400 dark:text-slate-500 font-normal">desde ontem</span>
                      </div>
                    </div>
                  </div>

                  {/* Indicador 2: 28 Acontecimentos relevantes */}
                  <div className="bg-slate-50/70 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl p-3 sm:p-3.5 flex flex-col justify-between border border-slate-100 dark:border-slate-800 transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] dark:text-blue-400 border border-blue-100/70 dark:border-blue-500/20 flex items-center justify-center shrink-0">
                        <Globe className="w-4.5 h-4.5" strokeWidth={2} />
                      </div>
                      <div className="text-xl sm:text-[22px] font-bold text-slate-900 dark:text-slate-50 font-sans tracking-tight">
                        28
                      </div>
                    </div>
                    <div className="mt-2.5 flex flex-col gap-0.5">
                      <div className="text-[11.5px] sm:text-xs font-normal text-slate-500 dark:text-slate-400 leading-snug">
                        Acontecimentos relevantes
                      </div>
                      <div className="text-[10.5px] sm:text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="font-bold">+5</span>
                        <span className="text-slate-400 dark:text-slate-500 font-normal">desde ontem</span>
                      </div>
                    </div>
                  </div>

                  {/* Indicador 3: 7,4B Pessoas impactadas */}
                  <div className="bg-slate-50/70 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl p-3 sm:p-3.5 flex flex-col justify-between border border-slate-100 dark:border-slate-800 transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-100/70 dark:border-purple-500/20 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4.5 h-4.5" strokeWidth={2} />
                      </div>
                      <div className="text-xl sm:text-[22px] font-bold text-slate-900 dark:text-slate-50 font-sans tracking-tight">
                        7,4B
                      </div>
                    </div>
                    <div className="mt-2.5 flex flex-col gap-0.5">
                      <div className="text-[11.5px] sm:text-xs font-normal text-slate-500 dark:text-slate-400 leading-snug">
                        Pessoas impactadas
                      </div>
                      <div className="text-[10.5px] sm:text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="font-bold">+1,2B</span>
                        <span className="text-slate-400 dark:text-slate-500 font-normal">desde ontem</span>
                      </div>
                    </div>
                  </div>

                  {/* Indicador 4: 12 Crises ativas */}
                  <div className="bg-slate-50/70 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl p-3 sm:p-3.5 flex flex-col justify-between border border-slate-100 dark:border-slate-800 transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-orange-50 dark:bg-orange-500/10 text-[#f58300] border border-orange-100/70 dark:border-orange-500/20 flex items-center justify-center shrink-0">
                        <Flame className="w-4.5 h-4.5" strokeWidth={2} />
                      </div>
                      <div className="text-xl sm:text-[22px] font-bold text-slate-900 dark:text-slate-50 font-sans tracking-tight">
                        12
                      </div>
                    </div>
                    <div className="mt-2.5 flex flex-col gap-0.5">
                      <div className="text-[11.5px] sm:text-xs font-normal text-slate-500 dark:text-slate-400 leading-snug">
                        Crises ativas
                      </div>
                      <div className="text-[10.5px] sm:text-[11px] font-medium text-[#f58300] flex items-center gap-1">
                        <span className="font-bold">-1</span>
                        <span className="text-slate-400 dark:text-slate-500 font-normal">desde ontem</span>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
              {/* Seção "Principais notícias" com cards mais largos nas laterais, altura reduzida e navegação fluida */}
              <section id="principais-noticias-section" className="flex flex-col gap-3.5 font-sans">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-[22px] font-bold text-slate-900 dark:text-slate-50 font-sans tracking-tight">
                    Principais notícias
                  </h3>
                  <div className="flex items-center gap-1.5">
                    {/* Botões de navegação horizontal (Prev / Next) */}
                    <button
                      type="button"
                      onClick={() => scrollMainNews('left')}
                      className="w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-400 hover:text-[#1455AC] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                      aria-label="Notícia anterior"
                      title="Notícia anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollMainNews('right')}
                      className="w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-400 hover:text-[#1455AC] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                      aria-label="Próxima notícia"
                      title="Próxima notícia"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Opção "Ver todas" com texto e seta dentro de borda arredondada (estilo pílula) */}
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 hover:border-[#1455AC]/40 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs sm:text-[13px] font-medium text-[#1455AC] transition-all shadow-2xs cursor-pointer group ml-1"
                    >
                      <span>Ver todas</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2]" />
                    </button>
                  </div>
                </div>

                {/* Carrossel de Cards: exatamente 4 cards visíveis sem cortar no desktop (w-[calc((100%-42px)/4)]) */}
                <div
                  ref={mainNewsScrollRef}
                  className="flex items-stretch gap-3.5 overflow-x-auto pb-2.5 pt-0.5 no-scrollbar snap-x scroll-smooth font-sans"
                >
                  {MAIN_NEWS_LIST.map((item) => {
                    const isSaved = savedNewsIds.has(item.id);
                    return (
                      <article
                        key={item.id}
                        className="w-[82%] sm:w-[calc((100%-14px)/2)] md:w-[calc((100%-28px)/3)] lg:w-[calc((100%-42px)/4)] shrink-0 snap-start bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-3 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between group"
                      >
                        {/* Topo: Categoria + Imagem + Metadados + Título */}
                        <div>
                          {/* 1. Badge da Categoria acima da imagem */}
                          <div className="mb-2">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider ${item.categoryBg} ${item.categoryColor} border border-current/15 whitespace-nowrap`}
                            >
                              {item.category}
                            </span>
                          </div>

                          {/* 2. Imagem com cantos arredondados e proporção horizontal ampla (altura contida) */}
                          <div className="relative w-full h-[88px] sm:h-[92px] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* 3. Timestamp e Título com tipografia equilibrada e altura contida em 2 linhas */}
                          <div className="mt-2 flex flex-col gap-0.5">
                            <span className="text-[10.5px] font-medium text-slate-400 dark:text-slate-500">
                              {item.time}
                            </span>
                            <h4 className="text-xs sm:text-[12.5px] font-bold text-slate-900 dark:text-slate-50 leading-snug font-sans line-clamp-2 group-hover:text-[#1455AC] transition-colors">
                              {item.title}
                            </h4>
                          </div>
                        </div>

                        {/* Rodapé: Países e Ações (Bookmark / Share) com espaçamento limpo e compacto */}
                        <div className="mt-2.5 pt-1.5 border-t border-slate-100/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-sans">
                          <span className="inline-flex items-center gap-1 font-normal truncate text-slate-500 dark:text-slate-400 max-w-[130px]">
                            <Globe className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" strokeWidth={1.8} />
                            <span className="truncate">{item.countries}</span>
                          </span>

                          <div className="flex items-center gap-1.5 shrink-0 text-slate-400 dark:text-slate-500">
                            <button
                              type="button"
                              onClick={() => toggleSaveNews(item.id)}
                              className="p-1 rounded text-slate-400 dark:text-slate-500 hover:text-[#1455AC] transition-colors cursor-pointer"
                              aria-label="Salvar"
                            >
                              <Bookmark
                                className={`w-3.5 h-3.5 ${isSaved ? 'text-[#1455AC] fill-current' : ''}`}
                                strokeWidth={1.8}
                              />
                            </button>
                            <button
                              type="button"
                              onClick={handleShare}
                              className="p-1 rounded text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
                              aria-label="Compartilhar"
                            >
                              <Share2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
          </div>

          {/* COLUNA DIREITA (xl:col-span-3 / ~25%) */}
          <div className="xl:col-span-3 flex flex-col gap-6 w-full">
            {/* Card 1: Em destaque agora */}
            <div
              id="em-destaque-agora-card"
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5 shadow-2xs flex flex-col gap-4 font-sans"
            >
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans tracking-tight">
                  Em destaque agora
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1455AC] hover:underline transition-colors cursor-pointer group"
                >
                  <span>Ver todos</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
                </button>
              </div>

              {/* Lista com as 4 notícias em destaque */}
              <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
                {HIGHLIGHT_ITEMS.map((item) => {
                  const isSaved = savedNewsIds.has(item.id);
                  return (
                    <article key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3 group font-sans">
                      <div className="w-[68px] h-[68px] rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between h-[68px] py-0.5">
                        <span className={`text-[9.5px] font-extrabold uppercase tracking-wider ${item.categoryColor}`}>
                          {item.category}
                        </span>
                        <h4 className="text-[12px] font-bold text-slate-900 dark:text-slate-50 leading-snug line-clamp-2 group-hover:text-[#1455AC] transition-colors font-sans">
                          {item.title}
                        </h4>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                          <span>{item.time}</span>
                          <button
                            type="button"
                            onClick={() => toggleSaveNews(item.id)}
                            className="text-slate-400 dark:text-slate-500 hover:text-[#1455AC] transition-colors cursor-pointer"
                            aria-label="Salvar"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-[#1455AC] fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Card 2: Tendências globais - Altura reduzida e espaçamento mais compacto */}
            <div
              id="tendencias-globais-card"
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3.5 sm:px-4.5 sm:py-3.5 shadow-2xs flex flex-col gap-2.5 font-sans"
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-[15px] sm:text-base font-bold text-slate-900 dark:text-slate-50 font-sans tracking-tight">
                  Tendências globais
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1455AC] hover:underline transition-colors cursor-pointer group"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
                </button>
              </div>

              {/* Lista dos 5 tópicos em tendência com espaçamento vertical reduzido */}
              <div className="flex flex-col gap-1">
                {GLOBAL_TRENDS.map((trend) => (
                  <div
                    key={trend.rank}
                    className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-5.5 h-5.5 rounded-full bg-[#1455AC]/10 dark:bg-[#1455AC]/20 text-[#1455AC] flex items-center justify-center text-[11px] font-bold font-sans shrink-0">
                        {trend.rank}
                      </div>
                      <span className="text-xs sm:text-[12.5px] font-bold text-slate-900 dark:text-slate-50 tracking-tight font-sans">
                        {trend.label}
                      </span>
                    </div>

                    <div className="shrink-0">
                      {trend.direction === 'up' ? (
                        <ArrowUp className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                      ) : (
                        <ArrowDown className="w-3.5 h-3.5 text-rose-600 stroke-[2.5]" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Linha Inferior de Largura Total: "Acompanhe o mundo ao vivo" */}
        <section
          id="acompanhe-o-mundo-ao-vivo-section"
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs flex flex-col gap-4 mt-2 font-sans"
        >
          {/* Cabeçalho da Secção */}
          <div className="flex flex-col gap-0.5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-50 font-sans tracking-tight">
              Acompanhe o mundo ao vivo
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-sans">
              Monitore acontecimentos em tempo real que estão moldando o nosso futuro.
            </p>
          </div>

          {/* Grade de Eventos ao Vivo + Card de Acesso ao Mapa */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5 items-stretch font-sans">
            {/* Evento 1: Cúpula do Clima 2024 */}
            <div className="bg-slate-50/90 dark:bg-slate-800/60 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-600 text-white">
                  AO VIVO
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 shadow-2xs">
                  <Landmark className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-slate-50 leading-tight truncate font-sans">
                    Cúpula do Clima 2024
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate flex items-center gap-1 font-sans">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>Dubai, Emirados Árabes</span>
                  </p>
                  <p className="text-[10.5px] text-slate-400 dark:text-slate-500 mt-0.5 font-sans">
                    • 2.4K assistindo
                  </p>
                </div>
              </div>
            </div>

            {/* Evento 2: Mercados Globais */}
            <div className="bg-slate-50/90 dark:bg-slate-800/60 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-600 text-white">
                  AO VIVO
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 shadow-2xs">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-slate-50 leading-tight truncate font-sans">
                    Mercados Globais
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate font-sans">
                    Atualizações contínuas
                  </p>
                  <p className="text-[10.5px] text-slate-400 dark:text-slate-500 mt-0.5 font-sans">
                    • 1.8K assistindo
                  </p>
                </div>
              </div>
            </div>

            {/* Evento 3: Eleições na Índia */}
            <div className="bg-slate-50/90 dark:bg-slate-800/60 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-800 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  EM DESENVOLVIMENTO
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 shadow-2xs">
                  <Vote className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-slate-50 leading-tight truncate font-sans">
                    Eleições na Índia
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate font-sans">
                    Resultados parciais
                  </p>
                  <p className="text-[10.5px] text-slate-400 dark:text-slate-500 mt-0.5 font-sans">
                    • 856 assistindo
                  </p>
                </div>
              </div>
            </div>

            {/* Evento 4: Crise Humanitária */}
            <div className="bg-slate-50/90 dark:bg-slate-800/60 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-600 text-white">
                  AO VIVO
                </span>
                <span className="w-2 h-2 rounded-full bg-rose-500" />
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300 shadow-2xs">
                  <LifeBuoy className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-slate-50 leading-tight truncate font-sans">
                    Crise Humanitária
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate font-sans">
                    Ajuda internacional
                  </p>
                  <p className="text-[10.5px] text-slate-400 dark:text-slate-500 mt-0.5 font-sans">
                    • 3.1K assistindo
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5: Link para o Mapa de Crises e Acontecimentos */}
            <div
              onClick={onExploreMap}
              className="bg-[#1455AC]/5 dark:bg-[#1455AC]/15 hover:bg-[#1455AC]/10 dark:hover:bg-[#1455AC]/25 rounded-xl p-3.5 border border-[#1455AC]/20 flex items-center justify-center gap-3 transition-colors cursor-pointer group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-[#1455AC]/30 text-[#1455AC] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-[13px] font-bold text-[#1455AC] group-hover:underline text-left leading-snug font-sans">
                Ver mapa de crises <br /> e acontecimentos
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Botão Flutuante VILA AI (canto inferior direito) */}
      <button
        type="button"
        onClick={onOpenAiAssistant}
        id="floating-vila-ai-btn"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1455AC] hover:bg-[#0F448A] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer border-2 border-white/20 group font-sans"
        aria-label="Assistente VILA AI"
      >
        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform text-[#f58300]" />
        <span className="text-[9px] font-extrabold tracking-wider">VILA AI</span>
      </button>
    </div>
  );
};
