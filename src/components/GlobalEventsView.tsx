import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  MapPin,
  Sparkles,
  Users,
  Calendar as CalendarIcon,
  Ticket,
  Globe,
  Cpu,
  Briefcase,
  Palette,
  Leaf,
  HeartPulse,
  GraduationCap,
  Trophy,
  MoreHorizontal,
  X,
  Share2,
  Check,
  Award,
} from 'lucide-react';
import { GlobalWorldMapHero } from './GlobalWorldMapHero';
import { GlobalCalendarWidget } from './GlobalCalendarWidget';

interface GlobalEventsViewProps {
  onOpenAiAssistant?: () => void;
  onExploreMap?: () => void;
}

const FILTER_PILLS = [
  { id: 'todas', label: 'Todas', icon: Globe },
  { id: 'tecnologia', label: 'Tecnologia', icon: Cpu },
  { id: 'negocios', label: 'Negócios', icon: Briefcase },
  { id: 'cultura', label: 'Cultura', icon: Palette },
  { id: 'ambiente', label: 'Ambiente', icon: Leaf },
  { id: 'saude', label: 'Saúde', icon: HeartPulse },
  { id: 'educacao', label: 'Educação', icon: GraduationCap },
  { id: 'desporto', label: 'Desporto', icon: Trophy },
];

const RECOMMENDED_EVENTS = [
  {
    id: 1,
    categoryId: 'tecnologia',
    regionId: 'america-do-sul',
    category: 'TECNOLOGIA',
    categoryBadgeClass: 'bg-[#1E1B4B] text-white',
    modality: 'ONLINE',
    modalityClass: 'bg-white/95 text-emerald-600 border border-emerald-500/80',
    date: '21 – 23 Mai 2024',
    title: 'Web Summit Rio 2024',
    location: 'Rio de Janeiro, Brasil',
    description: 'O maior evento global de tecnologia, startups e inovação.',
    interested: '25.4K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&auto=format&fit=crop&q=80',
    fullDescription: 'O Web Summit Rio reúne mais de 30.000 participantes e as empresas que estão a redefinir o ecossistema tecnológico global. Conecte-se com fundadores de topo, investidores de capital de risco e líderes de pensamento em inteligência artificial, clima, fintech e sustentabilidade.',
  },
  {
    id: 2,
    categoryId: 'ambiente',
    regionId: 'europa',
    category: 'AMBIENTE',
    categoryBadgeClass: 'bg-[#059669] text-white',
    modality: 'PRESENCIAL',
    modalityClass: 'bg-white/95 text-emerald-600 border border-emerald-500/80',
    date: '30 Mai – 5 Jun 2024',
    title: 'UN Climate Change Conference (SB60)',
    location: 'Bonn, Alemanha',
    description: 'Negociações globais para ações climáticas e sustentabilidade.',
    interested: '12.7K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=700&auto=format&fit=crop&q=80',
    fullDescription: 'A 60ª sessão dos órgãos subsidiários da UNFCCC reúne delegações de 190 países para avançar nas diretrizes operacionais de financiamento climático, transição energética justa e mitigação de perdas e danos globais.',
  },
  {
    id: 3,
    categoryId: 'cultura',
    regionId: 'europa',
    category: 'CULTURA',
    categoryBadgeClass: 'bg-[#7C3AED] text-white',
    modality: 'PRESENCIAL',
    modalityClass: 'bg-white/95 text-amber-600 border border-amber-500/80',
    date: '18 – 26 Mai 2024',
    title: 'Nuit des Musées 2024',
    location: 'Paris, França',
    description: 'Uma noite mágica de arte, cultura e património mundial.',
    interested: '8.9K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=700&auto=format&fit=crop&q=80',
    fullDescription: 'Durante a Noite Europeia dos Museus, centenas de instituições culturais de prestígio abrem as suas portas gratuitamente ao público à noite, com instalações luminosas, concertos imersivos e percursos guiados inéditos.',
  },
  {
    id: 4,
    categoryId: 'negocios',
    regionId: 'america-do-norte',
    category: 'NEGÓCIOS',
    categoryBadgeClass: 'bg-[#D97706] text-white',
    modality: 'ONLINE',
    modalityClass: 'bg-white/95 text-emerald-600 border border-emerald-500/80',
    date: '3 – 6 Jun 2024',
    title: 'Global Business Forum 2024',
    location: 'Virtual',
    description: 'Líderes globais discutem o futuro dos negócios e da economia.',
    interested: '15.2K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=700&auto=format&fit=crop&q=80',
    fullDescription: 'Com conferencistas executivos de corporações Fortune 500, o fórum proporciona painéis interativos sobre cadeias de abastecimento resilientes, finanças sustentáveis e automação empresarial orientada por IA.',
  },
  {
    id: 5,
    categoryId: 'saude',
    regionId: 'europa',
    category: 'SAÚDE',
    categoryBadgeClass: 'bg-[#DB2777] text-white',
    modality: 'PRESENCIAL',
    modalityClass: 'bg-white/95 text-emerald-600 border border-emerald-500/80',
    date: '27 Mai – 1 Jun 2024',
    title: 'World Health Assembly (WHA77)',
    location: 'Genebra, Suíça',
    description: 'O órgão de decisão supremo da OMS definindo prioridades sanitárias globais.',
    interested: '18.3K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&auto=format&fit=crop&q=80',
    fullDescription: 'A 77ª Assembleia Mundial da Saúde reúne ministros da saúde e peritos de todo o mundo para debater o acordo global sobre pandemias, cobertura universal de saúde e resiliência sanitária.',
  },
  {
    id: 6,
    categoryId: 'educacao',
    regionId: 'europa',
    category: 'EDUCAÇÃO',
    categoryBadgeClass: 'bg-[#1455AC] text-white',
    modality: 'ONLINE',
    modalityClass: 'bg-white/95 text-emerald-600 border border-emerald-500/80',
    date: '19 – 22 Mai 2024',
    title: 'World Education Forum 2024',
    location: 'Londres, Reino Unido',
    description: 'O maior encontro anual de ministros da educação e inovadores pedagógicos globais.',
    interested: '14.1K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&auto=format&fit=crop&q=80',
    fullDescription: 'Debatendo o impacto da IA nas salas de aula, metodologias STEM e inclusão educacional em países em desenvolvimento.',
  },
  {
    id: 7,
    categoryId: 'tecnologia',
    regionId: 'europa',
    category: 'TECNOLOGIA',
    categoryBadgeClass: 'bg-[#1E1B4B] text-white',
    modality: 'ONLINE',
    modalityClass: 'bg-white/95 text-emerald-600 border border-emerald-500/80',
    date: '12 – 14 Jun 2024',
    title: 'AI for Good Global Summit',
    location: 'Genebra, Suíça',
    description: 'A principal plataforma global da ONU para acelerar os ODS com Inteligência Artificial.',
    interested: '21.8K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&auto=format&fit=crop&q=80',
    fullDescription: 'Organizado pela UIT em parceria com 40 agências irmãs da ONU, o encontro foca em soluções práticas para robótica sustentável, ética algorítmica e saúde planetária.',
  },
  {
    id: 8,
    categoryId: 'desporto',
    regionId: 'europa',
    category: 'DESPORTO',
    categoryBadgeClass: 'bg-[#EA580C] text-white',
    modality: 'PRESENCIAL',
    modalityClass: 'bg-white/95 text-emerald-600 border border-emerald-500/80',
    date: '26 Jul – 11 Ago 2024',
    title: 'Olympic Cultural Festival',
    location: 'Paris, França',
    description: 'Celebração da união global por meio do esporte, arte e patrimônio mundial.',
    interested: '34.2K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=700&auto=format&fit=crop&q=80',
    fullDescription: 'Eventos artísticos, fóruns de juventude e concertos abertos realizados em paralelo aos Jogos Olímpicos, conectando povos de todas as nações.',
  },
];

const REGIONS = [
  {
    id: 'america-do-norte',
    name: 'América do Norte',
    count: '128 eventos',
    imageUrl: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'america-do-sul',
    name: 'América do Sul',
    count: '96 eventos',
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'europa',
    name: 'Europa',
    count: '312 eventos',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'africa',
    name: 'África',
    count: '74 eventos',
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'asia',
    name: 'Ásia',
    count: '208 eventos',
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'oceania',
    name: 'Oceânia',
    count: '56 eventos',
    imageUrl: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=600&auto=format&fit=crop&q=80',
  },
];

interface FeaturedEventItem {
  id: number;
  category: string;
  categoryBadgeClass: string;
  title: string;
  info: string;
  customType?: 'uefa' | 'who' | 'apple' | 'cannes';
  imageUrl?: string;
}

const FEATURED_EVENTS: FeaturedEventItem[] = [
  {
    id: 1,
    category: 'DESPORTO',
    categoryBadgeClass: 'bg-[#FFF7ED] text-[#EA580C]',
    title: 'UEFA Champions League Final 2024',
    info: '1 Jun 2024 · Londres, Reino Unido',
    customType: 'uefa',
  },
  {
    id: 2,
    category: 'SAÚDE',
    categoryBadgeClass: 'bg-[#FAF5FF] text-[#9333EA]',
    title: 'World Health Assembly 77th Session',
    info: '27 Mai – 1 Jun 2024 · Genebra',
    customType: 'who',
  },
  {
    id: 3,
    category: 'TECNOLOGIA',
    categoryBadgeClass: 'bg-[#1455AC]/10 text-[#1455AC]',
    title: 'Apple WWDC24',
    info: '10 – 14 Jun 2024 · Apple Park, EUA',
    customType: 'apple',
  },
  {
    id: 4,
    category: 'CULTURA',
    categoryBadgeClass: 'bg-[#FDF2F8] text-[#DB2777]',
    title: 'Cannes Film Festival 2024',
    info: '14 – 25 Mai 2024 · Cannes, França',
    customType: 'cannes',
  },
];

const UPCOMING_EVENTS = [
  {
    id: 1,
    timeTag: 'EM 2 HORAS',
    tagClass: 'text-emerald-500',
    title: 'AI for Good Global Summit',
    location: 'Online',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=320&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    timeTag: 'EM 5 HORAS',
    tagClass: 'text-blue-600',
    title: 'Global Education Summit',
    location: 'Londres, Reino Unido',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=320&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    timeTag: 'AMANHÃ',
    tagClass: 'text-blue-600',
    title: 'World Economic Forum Annual Meeting 2024',
    location: 'Davos, Suíça',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=320&auto=format&fit=crop&q=80',
  },
];

export const GlobalEventsView: React.FC<GlobalEventsViewProps> = ({
  onOpenAiAssistant,
  onExploreMap,
}) => {
  const [activeFilter, setActiveFilter] = useState('todas');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [selectedEventModal, setSelectedEventModal] = useState<typeof RECOMMENDED_EVENTS[0] | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredEvents = useMemo(() => {
    return RECOMMENDED_EVENTS.filter((event) => {
      const matchesCategory = activeFilter === 'todas' || event.categoryId === activeFilter;
      const matchesRegion = !selectedRegion || event.regionId === selectedRegion;
      return matchesCategory && matchesRegion;
    });
  }, [activeFilter, selectedRegion]);

  const checkScrollButtons = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [activeFilter, selectedRegion, checkScrollButtons]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.clientWidth;
      const scrollAmount = direction === 'left' ? -containerWidth : containerWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 350);
    }
  };

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleRegister = (id: number) => {
    setRegisteredEvents((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleShare = (title: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${title} - Confira na plataforma VILA!`);
    }
    setShareToast('Link copiado para a área de transferência!');
    setTimeout(() => setShareToast(null), 2500);
  };

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-16 max-w-[1600px] mx-auto">
        {/* 
          LAYOUT PRINCIPAL: 2 Colunas
          - Coluna Principal Esquerda (lg:col-span-8 xl:col-span-9):
              1) Cabeçalho da Página ("Eventos Globais")
              2) Hero (Mapa Mundi + Calendário Global)
              3) Filtros em Pílula
              4) Eventos recomendados para si (Carrossel)
              5) Explore por região
          - Coluna Lateral Direita (lg:col-span-4 xl:col-span-3):
              Começa no topo, alinhada com o cabeçalho,
              ficando MAIS ALTO / MAIS EM CIMA em relação ao Card de Calendário Global!
              1) Eventos em destaque
              2) Próximos a começar (logo abaixo)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start font-sans">
          {/* Coluna Principal da Esquerda */}
          <section className="lg:col-span-8 xl:col-span-9 space-y-6 min-w-0" aria-label="Conteúdo Principal de Eventos">
            {/* Cabeçalho da Página */}
            <header className="pb-1 font-sans">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                Eventos Globais
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed max-w-2xl font-sans">
                Descubra eventos que conectam pessoas, ideias e soluções.
                <br className="hidden sm:inline" />
                {' '}Participe presencialmente ou online de qualquer lugar do mundo.
              </p>
            </header>

            {/* 1. Top Hero: Mapa Mundi Interativo (7 cols) + Calendário Global (5 cols) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              {/* Card 1: Mapa Mundi Interativo */}
              <div className="md:col-span-7 flex flex-col">
                <GlobalWorldMapHero
                  className="h-full min-h-[380px]"
                  onExploreMap={onExploreMap}
                  title="O mundo está acontecendo agora."
                  subtitle="Explore eventos em todo o planeta em tempo real."
                />
              </div>

              {/* Card 2: Calendário Global */}
              <div className="md:col-span-5 flex flex-col">
                <GlobalCalendarWidget
                  className="h-full min-h-[380px]"
                  onSelectDay={() => {}}
                />
              </div>
            </div>

            {/* 2. Linha Horizontal de Filtros em Pílula */}
            <div
              id="events-category-filters"
              className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none font-sans"
            >
              {FILTER_PILLS.map((pill) => {
                const Icon = pill.icon;
                const isActive = activeFilter === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setActiveFilter(pill.id)}
                    className={`inline-flex items-center gap-2 py-2 px-4 rounded-full text-xs sm:text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 font-sans ${
                      isActive
                        ? 'bg-[#1455AC] text-white shadow-xs border border-[#1455AC]'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{pill.label}</span>
                  </button>
                );
              })}

              {/* Pill Mais */}
              <button
                type="button"
                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 text-xs sm:text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer shadow-2xs shrink-0 font-sans"
              >
                <MoreHorizontal className="w-3.5 h-3.5 text-slate-500" />
                <span>Mais</span>
              </button>
            </div>

            {/* 3. Seção: Eventos recomendados para si */}
            <div className="space-y-3 pt-1 font-sans">
              {/* Header da Seção */}
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                  Eventos recomendados para si
                </h3>

                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter('todas');
                    setSelectedRegion(null);
                  }}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#1455AC] hover:underline transition-colors cursor-pointer font-sans"
                >
                  <span>Ver todos os eventos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Carrossel com Botões Laterais Centrais < e > */}
              <div className="relative group/carousel font-sans">
                {/* Botão Seta Esquerda */}
                {filteredEvents.length > 4 && (
                  <button
                    type="button"
                    onClick={() => scrollCarousel('left')}
                    aria-label="Eventos anteriores"
                    disabled={!canScrollLeft}
                    className={`absolute -left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md text-slate-700 hover:text-[#1455AC] hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer hidden md:flex ${
                      !canScrollLeft ? 'opacity-30 pointer-events-none' : 'opacity-100'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}

                {/* Carrossel Horizontal de Linha Única sem quebra de linhas */}
                <div
                  ref={carouselRef}
                  onScroll={checkScrollButtons}
                  id="recommended-events-carousel"
                  className="flex gap-4 overflow-x-auto pb-2 pt-1 scroll-smooth scrollbar-none snap-x snap-mandatory font-sans"
                >
                  {filteredEvents.map((event) => {
                    const isBookmarked = bookmarkedIds.includes(event.id);

                    return (
                      <article
                        key={event.id}
                        onClick={() => setSelectedEventModal(event)}
                        className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] shrink-0 snap-start bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer"
                      >
                        {/* Imagem com Badges no Topo */}
                        <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />

                          {/* Badge de Categoria (Canto Superior Esquerdo) */}
                          <div className="absolute top-2.5 left-2.5">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold tracking-wider uppercase shadow-xs ${event.categoryBadgeClass}`}>
                              {event.category}
                            </span>
                          </div>

                          {/* Badge de Modalidade (Canto Superior Direito) */}
                          <div className="absolute top-2.5 right-2.5">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wider uppercase shadow-xs backdrop-blur-md ${event.modalityClass}`}>
                              {event.modality}
                            </span>
                          </div>
                        </div>

                        {/* Conteúdo do Card */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3 font-sans">
                          <div className="space-y-1">
                            {/* Data */}
                            <span className="text-[11px] font-semibold text-slate-500 block font-sans">
                              {event.date}
                            </span>

                            {/* Título */}
                            <h4
                              className="text-sm font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-[#1455AC] transition-colors font-sans"
                              title={event.title}
                            >
                              {event.title}
                            </h4>

                            {/* Localização */}
                            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-sans">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>

                            {/* Descrição */}
                            <p
                              className="text-xs text-slate-500 leading-relaxed pt-1 line-clamp-2 font-sans"
                              title={event.description}
                            >
                              {event.description}
                            </p>
                          </div>

                          {/* Rodapé: Interessados + Bookmark */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-sans">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="text-[11px] font-medium text-slate-500">
                                {event.interested}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => toggleBookmark(event.id, e)}
                              title={isBookmarked ? 'Remover dos guardados' : 'Guardar evento'}
                              className="p-1 rounded-md text-slate-400 hover:text-[#1455AC] transition-colors cursor-pointer"
                            >
                              <Bookmark
                                className={`w-4 h-4 transition-transform active:scale-90 ${
                                  isBookmarked
                                    ? 'fill-[#1455AC] text-[#1455AC]'
                                    : 'hover:text-[#1455AC]'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Botão Seta Direita */}
                {filteredEvents.length > 4 && (
                  <button
                    type="button"
                    onClick={() => scrollCarousel('right')}
                    aria-label="Próximos eventos"
                    disabled={!canScrollRight}
                    className={`absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md text-slate-700 hover:text-[#1455AC] hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer hidden md:flex ${
                      !canScrollRight ? 'opacity-30 pointer-events-none' : 'opacity-100'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* 4. Seção: Explore por região */}
            <div className="space-y-3 pt-2 font-sans">
              {/* Header da Seção */}
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                  Explore por região
                </h3>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedRegion(null);
                    setShareToast('Mostrando todas as regiões');
                    setTimeout(() => setShareToast(null), 2000);
                  }}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#1455AC] hover:underline transition-colors cursor-pointer font-sans"
                >
                  <span>Ver todas as regiões</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid de 6 Colunas de Regiões */}
              <div
                id="events-regions-grid"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 font-sans"
              >
                {REGIONS.map((region) => {
                  const isSelected = selectedRegion === region.id;
                  return (
                    <div
                      key={region.id}
                      onClick={() => {
                        if (selectedRegion === region.id) {
                          setSelectedRegion(null);
                        } else {
                          setSelectedRegion(region.id);
                        }
                      }}
                      className={`relative h-28 sm:h-32 rounded-xl overflow-hidden group cursor-pointer border shadow-2xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 select-none ${
                        isSelected
                          ? 'ring-2 ring-[#1455AC] border-transparent shadow-md'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Imagem de Fundo */}
                      <img
                        src={region.imageUrl}
                        alt={region.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />

                      {/* Gradiente Escuro na Parte Inferior */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                      {/* Ícone no Canto Superior Esquerdo */}
                      <div className="absolute top-2.5 left-2.5 z-10 w-5 h-5 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white/90 border border-white/20">
                        <MapPin className="w-3 h-3 stroke-[2.2]" />
                      </div>

                      {/* Títulos Sobrepostos */}
                      <div className="absolute bottom-2.5 left-3 right-3 z-10 font-sans">
                        <h4 className="text-xs sm:text-[13px] font-bold text-white leading-tight font-sans truncate">
                          {region.name}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] font-medium text-white/80 mt-0.5 font-sans">
                          {region.count}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 
            Coluna Lateral Direita (lg:col-span-4 xl:col-span-3)
            Alinhada exatamente no mesmo nível horizontal que o subtítulo da secção:
            "Descubra eventos que conectam pessoas, ideias e soluções."
          */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6 min-w-0 lg:pt-[42px] font-sans" aria-label="Barra Lateral de Eventos">
            {/* Card 1: Eventos em destaque */}
            <div
              id="featured-events-card"
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3.5 font-sans"
            >
              {/* Header do Card */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-sans">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-sans">
                  Eventos em destaque
                </h3>
                <button
                  type="button"
                  className="text-xs font-semibold text-[#1455AC] hover:underline inline-flex items-center gap-1 cursor-pointer font-sans"
                >
                  <span>Ver todos</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Lista dos 4 Destaques com imagens e badges estilizados */}
              <div className="space-y-2.5 font-sans">
                {FEATURED_EVENTS.map((item) => (
                  <article
                    key={item.id}
                    className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group font-sans"
                  >
                    {/* Thumbnail quadrada arredondada */}
                    <div className="w-13 h-13 rounded-xl overflow-hidden shrink-0 shadow-2xs border border-slate-100 relative flex items-center justify-center">
                      {item.customType === 'uefa' ? (
                        <div className="w-full h-full bg-gradient-to-br from-[#060D23] via-[#0A1A4A] to-[#040816] flex flex-col items-center justify-center text-white relative p-1">
                          <div className="text-[10px] font-black tracking-widest text-sky-400 leading-none">UEFA</div>
                          <div className="w-4 h-4 rounded-full border border-sky-300/70 flex items-center justify-center mt-1">
                            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-xs" />
                          </div>
                        </div>
                      ) : item.customType === 'who' ? (
                        <div className="w-full h-full bg-[#008DC9] flex flex-col items-center justify-center text-white relative p-1">
                          {/* Emblema estilizado da OMS / WHO */}
                          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
                            <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1" />
                            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1" />
                            <path d="M12 4v16" stroke="white" strokeWidth="1.8" />
                            <path d="M10 8c2-1 3 1 2 3s-3 2-2 4 2 2 3 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        </div>
                      ) : item.customType === 'apple' ? (
                        <div className="w-full h-full bg-black flex items-center justify-center text-white p-1">
                          {/* Logo Apple WWDC24 */}
                          <svg className="w-6 h-6 fill-white" viewBox="0 0 170 170">
                            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.71-7.96-12.03-14.64-5.99-9.33-10.6-19.8-13.82-31.42-3.23-11.62-4.84-22.77-4.84-33.45 0-14.07 3.51-25.96 10.53-35.68 7.02-9.72 15.89-14.69 26.61-14.92 4.12 0 8.89 1.15 14.31 3.44 5.43 2.29 9.17 3.49 11.22 3.61 2.05-.12 6.07-1.43 12.06-3.92 5.99-2.49 10.97-3.63 14.94-3.44 14.08.73 24.96 6.31 32.65 16.74-12.39 7.55-18.42 17.8-18.09 30.76.33 10.22 4.29 18.8 11.88 25.75 7.59 6.95 16.63 10.9 27.12 11.85-2.22 6.54-4.89 13.06-8.01 19.57zM119.22 31.84c0-7.39 2.67-14.39 8.01-21 5.34-6.61 11.83-10.47 19.46-11.58.22 1.09.33 2.18.33 3.27 0 7.39-2.73 14.49-8.19 21.31-5.46 6.82-12.01 10.74-19.64 11.75-.22-1.2-.33-2.4-.33-3.6z" />
                          </svg>
                        </div>
                      ) : item.customType === 'cannes' ? (
                        <div className="w-full h-full bg-gradient-to-br from-[#991B1B] via-[#7F1D1D] to-[#450A0A] flex flex-col items-center justify-center text-amber-300 p-1">
                          <Award className="w-6 h-6 text-amber-300" />
                          <span className="text-[8px] font-bold tracking-wider text-amber-200 mt-0.5">CANNES</span>
                        </div>
                      ) : (
                        <img
                          src={item.imageUrl || ''}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=320&auto=format&fit=crop&q=80';
                          }}
                        />
                      )}
                    </div>

                    {/* Informações */}
                    <div className="flex-1 min-w-0 font-sans">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase ${item.categoryBadgeClass}`}>
                        {item.category}
                      </span>
                      <h4
                        className="text-xs font-bold text-slate-900 leading-snug line-clamp-1 mt-0.5 group-hover:text-[#1455AC] transition-colors font-sans"
                        title={item.title}
                      >
                        {item.title}
                      </h4>
                      <p className="text-[10.5px] text-slate-400 font-medium truncate mt-0.5 font-sans">
                        {item.info}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              {/* Botão Ver todos os destaques */}
              <div className="pt-2 border-t border-slate-100 font-sans">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1455AC]/10 hover:bg-[#1455AC]/20 text-[#1455AC] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs font-sans"
                >
                  <Ticket className="w-3.5 h-3.5 text-[#1455AC]" />
                  <span>Ver todos os destaques</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Próximos a começar */}
            <div
              id="upcoming-events-card"
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3.5 font-sans"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-sans">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-sans">
                  Próximos a começar
                </h3>
                <button
                  type="button"
                  className="text-xs font-semibold text-[#1455AC] hover:underline inline-flex items-center gap-1 cursor-pointer font-sans"
                >
                  <span>Ver todos</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Lista de 3 Próximos Eventos */}
              <div className="space-y-2.5 font-sans">
                {UPCOMING_EVENTS.map((item) => (
                  <article
                    key={item.id}
                    className="flex items-start gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group font-sans"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100 shadow-2xs border border-slate-100 flex items-center justify-center">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=320&auto=format&fit=crop&q=80';
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0 font-sans">
                      <span className={`inline-block text-[9.5px] font-black tracking-wider uppercase ${item.tagClass}`}>
                        {item.timeTag}
                      </span>
                      <h4
                        className="text-xs font-bold text-slate-900 leading-snug line-clamp-1 mt-0.5 group-hover:text-[#1455AC] transition-colors font-sans"
                        title={item.title}
                      >
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1 text-[10.5px] text-slate-400 font-medium truncate mt-0.5 font-sans">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Botão Ver agenda completa */}
              <div className="pt-2 border-t border-slate-100 font-sans">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1455AC]/10 hover:bg-[#1455AC]/20 text-[#1455AC] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs font-sans"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-[#1455AC]" />
                  <span>Ver agenda completa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal de Detalhes do Evento */}
      {selectedEventModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 font-sans"
          onClick={() => setSelectedEventModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagem de Capa */}
            <div className="relative h-48 sm:h-56 w-full bg-slate-900 shrink-0">
              <img
                src={selectedEventModal.imageUrl}
                alt={selectedEventModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <button
                type="button"
                onClick={() => setSelectedEventModal(null)}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${selectedEventModal.categoryBadgeClass}`}>
                  {selectedEventModal.category}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold tracking-wider uppercase ${selectedEventModal.modalityClass}`}>
                  {selectedEventModal.modality}
                </span>
              </div>
            </div>

            {/* Detalhes */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 font-sans">
              <div>
                <span className="text-xs font-semibold text-[#1455AC] uppercase tracking-wide font-sans">
                  {selectedEventModal.date}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-sans mt-1 leading-snug">
                  {selectedEventModal.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{selectedEventModal.location}</span>
                  <span className="text-slate-300">•</span>
                  <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{selectedEventModal.interested}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 font-sans">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                  Sobre o Evento
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {selectedEventModal.fullDescription || selectedEventModal.description}
                </p>
              </div>

              {/* Ações */}
              <div className="pt-2 flex items-center gap-2 font-sans">
                <button
                  type="button"
                  onClick={() => toggleRegister(selectedEventModal.id)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs font-sans ${
                    registeredEvents.includes(selectedEventModal.id)
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-[#f58300] hover:bg-[#d97400] text-white'
                  }`}
                >
                  {registeredEvents.includes(selectedEventModal.id) ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Inscrição Confirmada</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4" />
                      <span>Inscrever-se no Evento</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleShare(selectedEventModal.title)}
                  title="Partilhar"
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-[#1455AC] transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={(e) => toggleBookmark(selectedEventModal.id, e)}
                  title={bookmarkedIds.includes(selectedEventModal.id) ? 'Guardado' : 'Guardar'}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-[#1455AC] transition-colors cursor-pointer"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      bookmarkedIds.includes(selectedEventModal.id)
                        ? 'fill-[#1455AC] text-[#1455AC]'
                        : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {shareToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 font-sans">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{shareToast}</span>
        </div>
      )}

      {/* Botão Flutuante VILA AI no Canto Inferior Direito exatamente como no design */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={onOpenAiAssistant}
          id="fab-vila-ai-events"
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#1455AC] hover:bg-[#11468F] text-white shadow-xl shadow-blue-900/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Abrir Assistente VILA AI"
          title="Assistente VILA AI"
        >
          <div className="flex flex-col items-center justify-center">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <span className="text-[8px] font-black tracking-tight uppercase leading-none mt-1">VILA AI</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default GlobalEventsView;
