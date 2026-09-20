import React from 'react';
import { ArrowRight, Play, Globe2, Users, FolderKanban, HeartHandshake } from 'lucide-react';
import { CountryData } from '../types';
import { WorldMap } from './WorldMap';

interface MapHeroSectionProps {
  selectedCountry: CountryData;
  onSelectCountry: (country: CountryData) => void;
  onExploreWorld: () => void;
  onWatchTour: () => void;
  onExploreCountry: (country: CountryData) => void;
}

// Estatísticas da pílula inferior (estrutura da referência)
const HERO_STATS = [
  { value: '128', label: 'Países ativos', icon: Globe2, color: 'text-[#1455AC] dark:text-blue-400' },
  { value: '7.842.521', label: 'Cidadãos ativos', icon: Users, color: 'text-emerald-600 dark:text-emerald-400' },
  { value: '24.651', label: 'Projetos ativos', icon: FolderKanban, color: 'text-amber-500 dark:text-amber-400' },
  { value: '3.412', label: 'Parceiros globais', icon: HeartHandshake, color: 'text-[#F58300] dark:text-orange-400' },
];

// Legenda flutuante do mapa
const HERO_LEGEND = [
  { label: 'País Ativo', color: 'bg-emerald-500' },
  { label: 'País com Atividade', color: 'bg-[#1455AC]' },
  { label: 'País Inativo', color: 'bg-slate-400' },
];

export const MapHeroSection: React.FC<MapHeroSectionProps> = ({
  selectedCountry,
  onSelectCountry,
  onExploreWorld,
  onWatchTour,
  onExploreCountry,
}) => {
  return (
    <section
      id="map-hero-section"
      className="relative rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-[#F8FAFC] dark:bg-slate-900 shadow-xs"
    >
      <div className="relative h-[420px] sm:h-[460px] lg:h-[500px]">
        {/* ================================================================= */}
        {/* Mapa mundial como fundo (interativo)                              */}
        {/* ================================================================= */}
        <div className="absolute inset-0">
          <WorldMap
            selectedCountry={selectedCountry}
            onSelectCountry={onSelectCountry}
            onExploreCountry={onExploreCountry}
            showLegend={false}
            className="w-full h-full rounded-none"
          />
        </div>

        {/* Véu escuro apenas no dark mode — o mapa mantém cores claras fixas, então o texto precisa de contraste aqui */}
        <div
          className="absolute inset-0 pointer-events-none hidden dark:block"
          style={{
            background:
              'linear-gradient(90deg, rgba(2,6,23,0.94) 0%, rgba(2,6,23,0.55) 18%, rgba(2,6,23,0) 42%)',
          }}
        />


        {/* ================================================================= */}
        {/* Mensagem principal (sobreposta à esquerda)                        */}
        {/* ================================================================= */}
        <div className="absolute z-10 left-5 sm:left-8 lg:left-12 top-6 lg:top-1/2 lg:-translate-y-[62%] max-w-[320px] sm:max-w-[420px] lg:max-w-[480px] pointer-events-none select-none">
          <h1 className="text-[34px] sm:text-5xl lg:text-[46px] font-black tracking-tight leading-[1.12] text-slate-900 dark:text-white font-sans">
            O mundo
            <br />
            é uma vila.
            <br />
            E nós somos <span className="text-emerald-600 dark:text-emerald-400">um.</span>
          </h1>

          <p className="mt-4 sm:mt-5 text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-[320px] sm:max-w-[380px]">
            Explore territórios. Descubra comunidades. Participe em iniciativas que transformam vidas em todo o planeta.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-row flex-wrap items-center gap-3 sm:gap-4 w-max max-w-full sm:max-w-none">
            <button
              id="hero-cta-explore-world"
              type="button"
              onClick={onExploreWorld}
              className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1455AC] hover:bg-[#0F448A] text-white text-sm font-semibold shadow-sm transition-all cursor-pointer"
            >
              <Globe2 className="w-4 h-4" strokeWidth={2} />
              <span>Explorar o Mundo</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>

            <button
              id="hero-cta-watch-video"
              type="button"
              onClick={onWatchTour}
              className="pointer-events-auto inline-flex items-center gap-2 text-[13px] font-semibold text-slate-600 dark:text-slate-300 hover:text-[#1455AC] dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-slate-900/5 dark:bg-white/10 flex items-center justify-center">
                <Play className="w-3 h-3 fill-current" />
              </span>
              <span>Ver como funciona (2:14)</span>
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Pílula de estatísticas (canto inferior esquerdo)                  */}
        {/* ================================================================= */}
        <div className="absolute z-10 bottom-5 left-5 sm:right-auto max-w-[640px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs rounded-2xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 pointer-events-auto">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {HERO_STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 shrink-0 ${stat.color}`} strokeWidth={1.9} />
                  <div className="leading-tight">
                    <span className="block text-sm font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                      {stat.value}
                    </span>
                    <span className="block text-[10.5px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* Legenda flutuante (centro inferior, apenas desktop)               */}
        {/* ================================================================= */}
        <div className="hidden lg:flex absolute z-10 bottom-6 right-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs rounded-full border border-slate-200 dark:border-slate-700 px-4 py-2 items-center gap-4 select-none pointer-events-none">
          {HERO_LEGEND.map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap"
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${item.color}`} />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
