import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Heart,
  TrendingUp,
  BarChart3,
  Clock,
  Star,
  Globe2,
  Landmark,
  FolderKanban,
  MessageSquare,
  Search,
  FileText,
  MapPin,
  Users,
  Briefcase,
  Handshake,
} from 'lucide-react';
import { CountryData } from '../types';
import { COUNTRIES_DATA } from '../data/countriesData';
import { LineChart } from './admin/MiniCharts';

interface FeaturedCountriesSectionProps {
  selectedCountry?: CountryData | null;
  onSelectCountry: (country: CountryData) => void;
  onExploreCountry: (country: CountryData) => void;
  onViewAllCountries: () => void;
  onOpenAiAssistant: () => void;
}

type CountryStatus = 'Ativo' | 'Em crescimento' | 'Novo' | 'Mapeamento';

const STATUS_CHIP: Record<CountryStatus, string> = {
  'Ativo': 'bg-emerald-500 text-white',
  'Em crescimento': 'bg-[#1455AC] text-white',
  'Novo': 'bg-amber-500 text-white',
  'Mapeamento': 'bg-slate-500 text-white',
};

const FILTERS: { id: string; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'Ativo', label: 'Mais ativos' },
  { id: 'Novo', label: 'Novos' },
  { id: 'Em crescimento', label: 'Em crescimento' },
  { id: 'Mapeamento', label: 'Mapeamento' },
];

// Metadados dos cards (estrutura da referência: iniciativas, tendência, projetos, comunidades)
const countryCardMeta: Record<
  string,
  {
    status: CountryStatus;
    initiatives: number;
    trend: string;
    projects: number;
    communities: number;
  }
> = {
  portugal: { status: 'Ativo', initiatives: 1284, trend: '+18%', projects: 74, communities: 18 },
  espanha: { status: 'Em crescimento', initiatives: 892, trend: '+12%', projects: 60, communities: 14 },
  quenia: { status: 'Novo', initiatives: 756, trend: '+15%', projects: 33, communities: 8 },
  brasil: { status: 'Ativo', initiatives: 1542, trend: '+21%', projects: 96, communities: 24 },
  alemanha: { status: 'Mapeamento', initiatives: 598, trend: '+8%', projects: 48, communities: 12 },
  japao: { status: 'Em crescimento', initiatives: 867, trend: '+11%', projects: 52, communities: 15 },
  angola: { status: 'Mapeamento', initiatives: 634, trend: '+9%', projects: 39, communities: 11 },
  'cabo-verde': { status: 'Em crescimento', initiatives: 437, trend: '+10%', projects: 26, communities: 9 },
};

const featuredCountries = COUNTRIES_DATA.filter((c) =>
  ['portugal', 'espanha', 'quenia', 'brasil', 'alemanha', 'japao', 'angola', 'cabo-verde'].includes(c.id)
);

// Formata números com separador de milhares (1.284), igual à referência
const formatNumber = (n: number) => n.toLocaleString('de-DE');

// ---------------------------------------------------------------------------
// Fileira inferior: Tendências e Impacto | Últimas Atividades | Oportunidades
// ---------------------------------------------------------------------------

const TREND_LABELS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'];
const TREND_VALUES = [42, 55, 68, 72, 88, 95, 110, 128];
const TREND_STATS = [
  { delta: '+24%', label: 'Territórios ativos' },
  { delta: '+18%', label: 'Projetos registados' },
  { delta: '+32%', label: 'Comunidades envolvidas' },
];

const RECENT_ACTIVITIES = [
  { flag: '🇵🇹', title: 'Novo projeto em Portugal', desc: 'Turismo sustentável na costa alentejana', time: '2h atrás', icon: FolderKanban, tile: 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] dark:text-blue-400' },
  { flag: '🇧🇷', title: 'Nova comunidade no Brasil', desc: 'Rede de jovens inovadores', time: '5h atrás', icon: Users, tile: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { flag: '🇪🇸', title: 'Parceria em Espanha', desc: 'Universidade de Salamanca', time: '8h atrás', icon: Handshake, tile: 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] dark:text-blue-400' },
  { flag: '🇰🇪', title: 'Projeto mapeado no Quénia', desc: 'Agricultura inteligente', time: '12h atrás', icon: MapPin, tile: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  { flag: '🇦🇴', title: 'Consulta pública em Angola', desc: 'Orçamento participativo 2026', time: '1d atrás', icon: FileText, tile: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300' },
];

const OPPORTUNITIES = [
  { title: 'Programa de capacitação jovem', meta: 'Angola · Educação · 2025–2026', chip: 'Oportunidade', chipClass: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20', icon: GraduationIcon, tile: 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] dark:text-blue-400' },
  { title: 'Parceria para energias renováveis', meta: 'Brasil · Ambiente · 2025–2027', chip: 'Parceria', chipClass: 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] dark:text-blue-400 border border-blue-200 dark:border-blue-500/20', icon: Handshake, tile: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { title: 'Projeto de inclusão digital', meta: 'Moçambique · Tecnologia · 2025–2026', chip: 'Projeto', chipClass: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20', icon: Briefcase, tile: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' },
];

function GraduationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------

export const FeaturedCountriesSection: React.FC<FeaturedCountriesSectionProps> = ({
  selectedCountry,
  onSelectCountry,
  onExploreCountry,
  onViewAllCountries,
  onOpenAiAssistant: _onOpenAiAssistant,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [sortBy, setSortBy] = useState('mais-ativos');
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const visibleCountries = useMemo(() => {
    let list = [...featuredCountries];
    if (activeFilter !== 'todos') {
      list = list.filter((c) => countryCardMeta[c.id]?.status === activeFilter);
    }
    switch (sortBy) {
      case 'mais-iniciativas':
        list.sort((a, b) => (countryCardMeta[b.id]?.initiatives ?? 0) - (countryCardMeta[a.id]?.initiatives ?? 0));
        break;
      case 'az':
        list.sort((a, b) => a.name.localeCompare(b.name, 'pt'));
        break;
      case 'recentes':
        list.reverse();
        break;
      default:
        break;
    }
    return list;
  }, [activeFilter, sortBy]);

  // Mini carrossel automático: avança suavemente card a card e volta ao início ao chegar ao fim
  useEffect(() => {
    if (isCarouselPaused || visibleCountries.length <= 3) return;

    const interval = setInterval(() => {
      const el = scrollContainerRef.current;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const cardWidth = el.firstElementChild instanceof HTMLElement ? el.firstElementChild.offsetWidth + 16 : clientWidth / 3;
      console.log('TICK', { scrollLeft, scrollWidth, clientWidth, cardWidth, isCarouselPaused });

      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [isCarouselPaused, visibleCountries]);

  return (
    <React.Fragment>
      {/* ===================================================================== */}
      {/* SECÇÃO: Países em Destaque                                            */}
      {/* ===================================================================== */}
      <section
        id="featured-countries-section"
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 sm:p-6 relative overflow-hidden"
      >
        {/* Cabeçalho: título + ordenar + ver todos */}
        <div className="flex flex-row items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100/70 dark:border-blue-500/20 text-[#1455AC] dark:text-blue-400 flex items-center justify-center shrink-0">
              <Globe2 className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-50 tracking-tight font-sans">
                Países em Destaque
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 mt-0.5 font-sans">
                Explore territórios, iniciativas e comunidades ativas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold text-slate-700 dark:text-slate-200 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="mais-ativos">Mais ativos</option>
                <option value="mais-iniciativas">Mais iniciativas</option>
                <option value="recentes">Mais recentes</option>
                <option value="az">A–Z</option>
              </select>
            </label>

            <button
              onClick={onViewAllCountries}
              id="btn-view-all-countries"
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#1455AC] hover:underline cursor-pointer group shrink-0"
            >
              <span>Ver todos os países</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Chips de filtro */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1455AC] text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Carrossel automático suave */}
        <div className="relative mt-4 -mx-5 sm:-mx-6">
          <div
            ref={scrollContainerRef}
            id="featured-countries-carousel"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="flex items-stretch gap-4 overflow-x-auto pb-2 pt-1 px-5 sm:px-6 scroll-smooth no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-proximity"
          >
            {visibleCountries.map((country) => {
              const meta = countryCardMeta[country.id];
              const isLiked = !!liked[country.id];

              return (
                <div
                  key={country.id}
                  id={`country-card-${country.id}`}
                  onClick={() => onSelectCountry(country)}
                  className="min-w-[218px] sm:min-w-[232px] max-w-[232px] bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col cursor-pointer group shrink-0 snap-start transition-all duration-200 hover:-translate-y-0.5 shadow-xs hover:shadow-sm hover:border-slate-300 dark:hover:border-slate-600"
                >
                  {/* Imagem com chip de estado e favorito */}
                  <div className="relative m-2 mb-0 rounded-lg overflow-hidden">
                    <img
                      src={country.imageUrl}
                      alt={`Imagem de ${country.name}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-32 object-cover group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span
                      className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold shadow-2xs ${STATUS_CHIP[meta.status]}`}
                    >
                      {meta.status}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLiked((prev) => ({ ...prev, [country.id]: !prev[country.id] }));
                      }}
                      aria-label="Favoritar"
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 dark:bg-slate-900/90 shadow-2xs flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-colors ${
                          isLiked ? 'fill-red-500 text-red-500' : 'text-slate-500 dark:text-slate-400'
                        }`}
                        strokeWidth={2}
                      />
                    </button>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-3 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-sm leading-none shrink-0">{country.flag}</span>
                      <h3 className="text-[13.5px] font-bold text-slate-800 dark:text-slate-100 truncate leading-snug group-hover:text-[#1455AC] transition-colors" title={country.name}>
                        {country.name}
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-[#1455AC] tracking-tight tabular-nums leading-none">
                        {formatNumber(meta.initiatives)}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">
                      iniciativas ativas
                    </span>

                    <div className="flex items-center gap-1 mt-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        {meta.trend}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">este mês</span>
                    </div>

                    {/* Rodapé: projetos e comunidades */}
                    <div className="flex items-center gap-3 mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1 font-medium">
                        <FolderKanban className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        <span className="tabular-nums font-semibold text-slate-600 dark:text-slate-300">{meta.projects}</span>
                        projetos
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Users className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                        <span className="tabular-nums font-semibold text-slate-600 dark:text-slate-300">{meta.communities}</span>
                        comunidades
                      </span>
                    </div>

                    {/* Botão Explorar em largura total */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onExploreCountry(country);
                      }}
                      id={`card-btn-explore-${country.id}`}
                      className="mt-2.5 w-full py-2 rounded-lg bg-[#1455AC] hover:bg-[#0F448A] text-white text-xs font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 group/btn"
                    >
                      <span>Explorar</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}

            {visibleCountries.length === 0 && (
              <div className="py-10 px-6 text-sm text-slate-400 dark:text-slate-500 w-full text-center">
                Nenhum país neste filtro de momento.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* FILEIRA INFERIOR: Tendências | Últimas Atividades | Oportunidades     */}
      {/* ===================================================================== */}
      <section id="home-insights-section" className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tendências e Impacto */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs p-4 sm:p-5 flex flex-col">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-100/70 dark:border-blue-500/20 text-[#1455AC] dark:text-blue-400 flex items-center justify-center shrink-0">
              <BarChart3 className="w-4 h-4" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50 tracking-tight">Tendências e Impacto</h2>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">Evolução dos territórios ativos</p>
            </div>
          </div>

          <div className="mt-3 flex-1 min-h-0">
            <LineChart
              series={[{ name: 'Territórios ativos', color: '#1455AC', values: TREND_VALUES }]}
              labels={TREND_LABELS}
              height={170}
              yTicks={4}
            />
          </div>

          <div className="grid grid-cols-1 gap-1.5 mt-3">
            {TREND_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between px-3 py-2 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40"
              >
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{stat.delta}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Últimas Atividades */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs p-4 sm:p-5 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-100/70 dark:border-blue-500/20 text-[#1455AC] dark:text-blue-400 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50 tracking-tight">Últimas Atividades</h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onViewAllCountries}
              className="text-[11px] font-semibold text-[#1455AC] hover:underline cursor-pointer inline-flex items-center gap-1 shrink-0"
            >
              <span>Ver todas</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="mt-3 space-y-1 flex-1">
            {RECENT_ACTIVITIES.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.title} className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activity.tile}`}>
                    <Icon className="w-4 h-4" strokeWidth={1.9} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight truncate">
                      <span className="mr-1">{activity.flag}</span>
                      {activity.title}
                    </h4>
                    <p className="text-[10.5px] text-slate-400 dark:text-slate-500 truncate">{activity.desc}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0 whitespace-nowrap">{activity.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Oportunidades */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs p-4 sm:p-5 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-100/70 dark:border-blue-500/20 text-[#1455AC] dark:text-blue-400 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50 tracking-tight">Oportunidades</h2>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">Projetos e parcerias em destaque</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onViewAllCountries}
              className="text-[11px] font-semibold text-[#1455AC] hover:underline cursor-pointer inline-flex items-center gap-1 shrink-0"
            >
              <span>Ver todas</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="mt-3 space-y-2 flex-1">
            {OPPORTUNITIES.map((opp) => {
              const Icon = opp.icon;
              return (
                <button
                  key={opp.title}
                  type="button"
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left cursor-pointer group"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${opp.tile}`}>
                    <Icon className="w-4 h-4" strokeWidth={1.9} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight truncate group-hover:text-[#1455AC] transition-colors">
                      {opp.title}
                    </h4>
                    <p className="text-[10.5px] text-slate-400 dark:text-slate-500 truncate">{opp.meta}</p>
                  </div>
                  <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded shrink-0 ${opp.chipClass}`}>
                    {opp.chip}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-[#1455AC] group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
