import React, { useEffect, useRef } from 'react';
import { ArrowRight, Eye, Sparkles, Clock, Globe2 } from 'lucide-react';
import { CountryData } from '../types';
import { COUNTRIES_DATA } from '../data/countriesData';

interface FeaturedCountriesSectionProps {
  selectedCountry?: CountryData | null;
  onSelectCountry: (country: CountryData) => void;
  onExploreCountry: (country: CountryData) => void;
  onViewAllCountries: () => void;
  onOpenAiAssistant: () => void;
}

export const FeaturedCountriesSection: React.FC<FeaturedCountriesSectionProps> = ({
  selectedCountry,
  onSelectCountry,
  onExploreCountry,
  onViewAllCountries,
  onOpenAiAssistant,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);

  // Exact featured countries list
  const featuredCountries = COUNTRIES_DATA.filter((c) =>
    ['portugal', 'espanha', 'quenia', 'brasil', 'alemanha', 'japao', 'angola', 'cabo-verde'].includes(c.id)
  );

  // Dados complementares para simular a estética exata dos cards da imagem (preços de apoio/início, status, tempo, visualizações e licitações/iniciativas)
  const countryCardMeta: Record<string, {
    statusBadge: string;
    subStatus: string;
    timer: string;
    startLabel: string;
    valueFormatted: string;
    views: number;
    bids: number;
  }> = {
    portugal: {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 1.250',
      views: 74,
      bids: 18,
    },
    espanha: {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 980',
      views: 60,
      bids: 14,
    },
    quenia: {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 550',
      views: 33,
      bids: 8,
    },
    brasil: {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 1.800',
      views: 96,
      bids: 24,
    },
    alemanha: {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 2.100',
      views: 48,
      bids: 12,
    },
    japao: {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 1.450',
      views: 52,
      bids: 15,
    },
    angola: {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 620',
      views: 41,
      bids: 9,
    },
    'cabo-verde': {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 390',
      views: 29,
      bids: 6,
    },
  };

  // Carrossel suave e pausável
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (!container || isInteractingRef.current) return;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      if (container.scrollLeft >= maxScroll - 6) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 240, behavior: 'smooth' });
      }
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  const pauseAutoScroll = () => {
    isInteractingRef.current = true;
  };

  const resumeAutoScroll = () => {
    isInteractingRef.current = false;
  };

  return (
    <section
      id="featured-countries-section"
      className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 lg:p-7 relative mb-6 overflow-hidden"
    >
      {/* Section Header with Roboto and clean understated button */}
      <div className="flex flex-row items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none">🏛️</span>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-[-0.01em] font-sans flex items-center gap-2">
              Países em Destaque
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5 font-sans">
              Nações ativas, iniciativas locais e oportunidades de engajamento.
            </p>
          </div>
        </div>

        <button
          onClick={onViewAllCountries}
          id="btn-view-all-countries"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs sm:text-[13px] font-semibold text-[#1455AC] hover:bg-slate-50 hover:border-[#1455AC]/40 transition-all shadow-2xs group shrink-0 cursor-pointer"
        >
          <span>Explorar Países</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform stroke-[2]" />
        </button>
      </div>

      {/* Carrossel de Cards - 12px radius, font-sans, dense marketplace style */}
      <div className="relative -mx-5 sm:-mx-6 lg:-mx-7">
        <div
          ref={scrollContainerRef}
          id="featured-countries-carousel"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
          onTouchStart={pauseAutoScroll}
          onTouchEnd={resumeAutoScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-3 pt-1 pl-5 sm:pl-6 lg:pl-7 pr-4 scroll-smooth no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-proximity"
        >
          {featuredCountries.map((country) => {
            const isSelected = selectedCountry?.id === country.id || (!selectedCountry && country.id === 'portugal');
            const meta = countryCardMeta[country.id] || {
              statusBadge: 'Em Destaque',
              subStatus: 'Ativo',
              timer: '00h 00m 00s',
              startLabel: 'Iniciativas',
              valueFormatted: '€ 750',
              views: 35,
              bids: 5,
            };

            return (
              <div
                key={country.id}
                id={`country-card-${country.id}`}
                onClick={() => onSelectCountry(country)}
                className={`min-w-[215px] sm:min-w-[230px] max-w-[230px] bg-white rounded-xl border flex flex-col justify-between cursor-pointer group shrink-0 snap-start transition-all duration-200 hover:-translate-y-0.5 relative shadow-xs hover:shadow-sm ${
                  isSelected
                    ? 'border-[#1455AC] ring-1 ring-[#1455AC]/30'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* 1. Top Section com Badge Retangular Suave (rounded-md) com acento Laranja #f58300 */}
                <div className="relative p-2.5 pb-0">
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2 py-0.5 rounded-md bg-[#F58300] text-white text-[10px] font-semibold tracking-normal inline-block shadow-2xs">
                      {meta.statusBadge}
                    </span>
                  </div>

                  {/* Imagem do País em moldura limpa */}
                  <div className="w-full h-36 sm:h-38 rounded-lg overflow-hidden bg-[#F8FAFC] flex items-center justify-center relative p-1">
                    <img
                      src={country.imageUrl}
                      alt={`Imagem de ${country.name}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-md group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Faixa com Substatus e Timer */}
                  <div className="flex items-center justify-between mt-2.5 px-0.5 text-[11px] font-medium text-slate-600 border-b border-slate-100 pb-2">
                    <span className="text-slate-700 font-semibold">{meta.subStatus}</span>
                    <div className="flex items-center gap-1 text-[#DC2626] font-semibold text-[11px] tabular-nums">
                      <Clock className="w-3 h-3 stroke-[2]" />
                      <span>{meta.timer}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Conteúdo Central: Título e Métrica em Roboto */}
                <div className="p-3 pt-2">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-sm leading-none shrink-0">{country.flag}</span>
                    <h3
                      className="text-[13.5px] font-semibold text-slate-800 truncate leading-snug group-hover:text-[#1455AC] transition-colors"
                      title={country.name}
                    >
                      {country.name}
                    </h3>
                  </div>

                  {/* Linha de "Iniciativas" com número */}
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-[11px] text-slate-500 font-normal">
                      {meta.startLabel}
                    </span>
                    <span className="text-[14px] font-bold text-[#1455AC] tracking-tight tabular-nums">
                      {country.projectsCount.toLocaleString('pt-PT')}
                    </span>
                  </div>

                  {/* 3. Rodapé com Visualizações, Ações e Botão */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2.5 text-slate-600 text-[11px]">
                      {/* Visualizações */}
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10.5px] tabular-nums font-semibold">{meta.views}</span>
                      </span>

                      {/* Iniciativas */}
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Globe2 className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10.5px] tabular-nums font-semibold">{meta.bids}</span>
                      </span>
                    </div>

                    {/* Botão Retangular Suave (rounded-md) "Participar" */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onExploreCountry(country);
                      }}
                      id={`card-btn-participate-${country.id}`}
                      className="px-2.5 py-1 rounded-md bg-[#1455AC] hover:bg-[#0F448A] text-white text-[11.5px] font-semibold tracking-normal shadow-2xs hover:shadow-xs transition-all cursor-pointer inline-flex items-center justify-center"
                    >
                      Participar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Action Button (FAB) for VILA AI - Restrained, dignified styling */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={onOpenAiAssistant}
          id="fab-vila-ai"
          className="relative group flex items-center justify-center w-12 h-12 rounded-xl bg-[#1455AC] hover:bg-[#0F448A] text-white shadow-lg transition-all duration-200 cursor-pointer"
          aria-label="Abrir Assistente VILA AI"
          title="Assistente VILA AI"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </button>
      </div>
    </section>
  );
};

