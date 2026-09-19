import React from 'react';
import { ArrowRight, Play, Globe2 } from 'lucide-react';
import { CountryData } from '../types';
import { WorldMap } from './WorldMap';
import { COUNTRIES_DATA } from '../data/countriesData';

interface MapHeroSectionProps {
  selectedCountry: CountryData;
  onSelectCountry: (country: CountryData) => void;
  onExploreWorld: () => void;
  onWatchTour: () => void;
  onExploreCountry: (country: CountryData) => void;
}

const QUICK_TERRITORIES = [
  { id: 'portugal', label: 'Portugal', code: 'PT', flag: '🇵🇹' },
  { id: 'brasil', label: 'Brasil', code: 'BR', flag: '🇧🇷' },
  { id: 'espanha', label: 'Espanha', code: 'ES', flag: '🇪🇸' },
  { id: 'angola', label: 'Angola', code: 'AO', flag: '🇦🇴' },
  { id: 'cabo-verde', label: 'Cabo Verde', code: 'CV', flag: '🇨🇻' },
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
      className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 lg:p-7 shadow-xs"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* =========================================================================
            COLUNA DA ESQUERDA: Contexto Editorial, Ações e Resumo da Plataforma
            ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 select-none">
          <div className="space-y-4">
            {/* 1. Badge contextual com ponto laranja */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1455AC]/10 border border-[#1455AC]/20 text-[#1455AC] text-xs font-semibold w-fit">
              <span className="w-2 h-2 rounded-full bg-[#F58300]" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1455AC]">
                Observatório Territorial VILA
              </span>
            </div>

            {/* 2. Título principal */}
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight leading-[1.2] font-sans">
              Mapeamento e cooperação territorial em escala global
            </h1>

            {/* 3. Texto descritivo */}
            <p className="text-[13.5px] sm:text-sm text-slate-600 leading-relaxed font-normal">
              Plataforma integrada de dados abertos, projetos comunitários e monitorização contínua de impacto social e territorial em Portugal e na rede internacional.
            </p>

            {/* 4. Ações */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                id="hero-cta-explore-world"
                type="button"
                onClick={onExploreWorld}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1455AC] hover:bg-[#0F448A] text-white font-semibold text-[13.5px] transition-all shadow-xs hover:shadow-sm cursor-pointer"
              >
                <span>Explorar Territórios</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>

              <button
                id="hero-cta-watch-video"
                type="button"
                onClick={onWatchTour}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-[13.5px] font-medium transition-all shadow-2xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-slate-600 text-slate-600" />
                <span>Apresentação (2:14)</span>
              </button>
            </div>

            {/* 5. Em foco (alinhados na mesma linha) */}
            <div className="pt-2 flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap py-0.5">
              <span className="text-xs font-medium text-slate-400 shrink-0 whitespace-nowrap">Em foco:</span>
              <div className="flex items-center gap-1.5 shrink-0 flex-nowrap">
                {QUICK_TERRITORIES.map((territory) => {
                  const isSelected = selectedCountry.id === territory.id;
                  return (
                    <button
                      key={territory.id}
                      type="button"
                      onClick={() => {
                        const found = COUNTRIES_DATA.find((c) => c.id === territory.id);
                        if (found) onSelectCountry(found);
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-[#1455AC] text-white shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                        {territory.code}
                      </span>
                      <span>{territory.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 6. Resumo da Plataforma */}
          <div className="pt-4 border-t border-slate-100 mt-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Resumo da Plataforma
              </span>
              <span className="text-[11px] text-[#1455AC] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F58300]" />
                Ativo em tempo real
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs">
                <div className="text-lg sm:text-xl font-bold text-[#1455AC] tracking-tight leading-none">
                  128
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-1.5 leading-tight">
                  Territórios ativos
                </div>
              </div>

              <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs">
                <div className="text-lg sm:text-xl font-bold text-[#1455AC] tracking-tight leading-none">
                  7.8M
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-1.5 leading-tight">
                  Cidadãos alcançados
                </div>
              </div>

              <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs">
                <div className="text-lg sm:text-xl font-bold text-[#1455AC] tracking-tight leading-none">
                  24.651
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-1.5 leading-tight">
                  Projetos registados
                </div>
              </div>

              <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs">
                <div className="text-lg sm:text-xl font-bold text-[#1455AC] tracking-tight leading-none">
                  3.412
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-1.5 leading-tight">
                  Entidades parceiras
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            COLUNA DA DIREITA: Módulo Cartográfico Autocontido
            ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="w-full h-[380px] sm:h-[420px] lg:h-[460px] rounded-xl border border-slate-200 bg-[#F8FAFC] relative overflow-hidden flex flex-col shadow-2xs">
            {/* Top Bar do Módulo do Mapa */}
            <div className="px-3.5 py-2 border-b border-slate-200 bg-white/90 backdrop-blur-xs flex items-center justify-between text-xs z-10 select-none">
              <div className="flex items-center gap-2">
                <Globe2 className="w-3.5 h-3.5 text-[#1455AC]" />
                <span className="font-semibold text-slate-800 text-[11.5px]">Mapa Territorial Interativo</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>128 territórios integrados</span>
              </div>
            </div>

            {/* Canvas do Mapa Interativo */}
            <div className="flex-1 relative overflow-hidden">
              <WorldMap
                selectedCountry={selectedCountry}
                onSelectCountry={onSelectCountry}
                onExploreCountry={onExploreCountry}
                showLegend={false}
                className="w-full h-full rounded-none"
              />
            </div>

            {/* Rodapé Integrado do Módulo: Legenda e Apoio */}
            <div className="px-3.5 py-2 border-t border-slate-200 bg-white/90 backdrop-blur-xs flex items-center justify-between text-[11px] text-slate-600 z-10 select-none">
              <div className="flex items-center gap-3.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-medium text-slate-700">País Ativo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1455AC] shrink-0" />
                  <span className="font-medium text-slate-700">Com Atividade</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
                  <span className="font-medium text-slate-700">Mapeamento</span>
                </div>
              </div>

              <span className="text-slate-400 hidden sm:inline text-[10.5px]">
                Selecione um ponto para inspecionar
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
