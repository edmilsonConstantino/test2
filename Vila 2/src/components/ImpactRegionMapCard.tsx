import React, { useState, useMemo } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import { ArrowRight } from 'lucide-react';

export type RegionCategoryTheme =
  | 'direitos-humanos'
  | 'ambiente'
  | 'saude'
  | 'tecnologia'
  | 'empreendedorismo'
  | 'educacao'
  | 'cultura'
  | 'global';

export interface RegionImpactItem {
  id: string;
  name: string;
  percent: number;
  projectsCount?: number;
  highlight?: boolean;
}

export interface ImpactRegionMapCardProps {
  category?: RegionCategoryTheme;
  title?: string;
  onOpenReport?: () => void;
  onSeeAll?: () => void;
  customRegions?: RegionImpactItem[];
  className?: string;
  showFooterButton?: boolean;
  showPercentagesInLegend?: boolean;
  hideHeader?: boolean;
}

// Mapeamento preciso de países para continentes geográficos
const COUNTRY_TO_REGION: Record<string, string> = {
  // América do Norte
  'Canada': 'north-america',
  'United States of America': 'north-america',
  'Greenland': 'north-america',

  // América Latina & Caribe
  'Mexico': 'latin-america',
  'Guatemala': 'latin-america',
  'Belize': 'latin-america',
  'El Salvador': 'latin-america',
  'Honduras': 'latin-america',
  'Nicaragua': 'latin-america',
  'Costa Rica': 'latin-america',
  'Panama': 'latin-america',
  'Cuba': 'latin-america',
  'Jamaica': 'latin-america',
  'Haiti': 'latin-america',
  'Dominican Rep.': 'latin-america',
  'Puerto Rico': 'latin-america',
  'Trinidad and Tobago': 'latin-america',
  'Bahamas': 'latin-america',
  'Colombia': 'latin-america',
  'Venezuela': 'latin-america',
  'Guyana': 'latin-america',
  'Suriname': 'latin-america',
  'Ecuador': 'latin-america',
  'Peru': 'latin-america',
  'Brazil': 'latin-america',
  'Bolivia': 'latin-america',
  'Paraguay': 'latin-america',
  'Chile': 'latin-america',
  'Argentina': 'latin-america',
  'Uruguay': 'latin-america',
  'Falkland Is.': 'latin-america',

  // Europa
  'Portugal': 'europe',
  'Spain': 'europe',
  'France': 'europe',
  'United Kingdom': 'europe',
  'Ireland': 'europe',
  'Belgium': 'europe',
  'Netherlands': 'europe',
  'Germany': 'europe',
  'Switzerland': 'europe',
  'Austria': 'europe',
  'Italy': 'europe',
  'Poland': 'europe',
  'Czechia': 'europe',
  'Slovakia': 'europe',
  'Hungary': 'europe',
  'Slovenia': 'europe',
  'Croatia': 'europe',
  'Bosnia and Herz.': 'europe',
  'Serbia': 'europe',
  'Montenegro': 'europe',
  'Kosovo': 'europe',
  'Albania': 'europe',
  'Macedonia': 'europe',
  'Greece': 'europe',
  'Bulgaria': 'europe',
  'Romania': 'europe',
  'Moldova': 'europe',
  'Ukraine': 'europe',
  'Belarus': 'europe',
  'Lithuania': 'europe',
  'Latvia': 'europe',
  'Estonia': 'europe',
  'Finland': 'europe',
  'Sweden': 'europe',
  'Norway': 'europe',
  'Denmark': 'europe',
  'Iceland': 'europe',
  'Luxembourg': 'europe',
  'N. Cyprus': 'europe',

  // África
  'Morocco': 'africa',
  'Algeria': 'africa',
  'Tunisia': 'africa',
  'Libya': 'africa',
  'Egypt': 'africa',
  'Sudan': 'africa',
  'S. Sudan': 'africa',
  'Chad': 'africa',
  'Niger': 'africa',
  'Mali': 'africa',
  'Mauritania': 'africa',
  'Senegal': 'africa',
  'Gambia': 'africa',
  'Guinea-Bissau': 'africa',
  'Guinea': 'africa',
  'Sierra Leone': 'africa',
  'Liberia': 'africa',
  'Ivory Coast': 'africa',
  "Côte d'Ivoire": 'africa',
  'Ghana': 'africa',
  'Togo': 'africa',
  'Benin': 'africa',
  'Nigeria': 'africa',
  'Cameroon': 'africa',
  'Central African Rep.': 'africa',
  'Eq. Guinea': 'africa',
  'Gabon': 'africa',
  'Congo': 'africa',
  'Dem. Rep. Congo': 'africa',
  'Angola': 'africa',
  'Namibia': 'africa',
  'South Africa': 'africa',
  'Lesotho': 'africa',
  'eSwatini': 'africa',
  'Botswana': 'africa',
  'Zimbabwe': 'africa',
  'Zambia': 'africa',
  'Malawi': 'africa',
  'Mozambique': 'africa',
  'Madagascar': 'africa',
  'Tanzania': 'africa',
  'Burundi': 'africa',
  'Rwanda': 'africa',
  'Uganda': 'africa',
  'Kenya': 'africa',
  'Somalia': 'africa',
  'Somaliland': 'africa',
  'Ethiopia': 'africa',
  'Eritrea': 'africa',
  'Djibouti': 'africa',
  'Burkina Faso': 'africa',
  'W. Sahara': 'africa',

  // Oceania
  'Australia': 'oceania',
  'New Zealand': 'oceania',
  'Papua New Guinea': 'oceania',
  'Fiji': 'oceania',
  'Solomon Is.': 'oceania',
  'Vanuatu': 'oceania',
  'New Caledonia': 'oceania',
};

// Coordenadas geográficas dos centros das regiões para os pontos de pulso e tooltips
const REGION_COORDINATES: Record<string, [number, number]> = {
  'africa': [20, 4],
  'latin-america': [-58, -14],
  'asia': [95, 34],
  'europe': [16, 50],
  'north-america': [-100, 42],
  'oceania': [135, -25],
};

// Cores temáticas para cada categoria
const THEME_STYLES: Record<
  RegionCategoryTheme,
  {
    primaryDark: string;
    primaryMedium: string;
    border: string;
    hoverPin: string;
    btnText: string;
    btnHover: string;
    palette: Record<string, { fill: string; stroke: string; dot: string }>;
  }
> = {
  'empreendedorismo': {
    primaryDark: '#064E3B',
    primaryMedium: '#059669',
    border: '#A7F3D0',
    hoverPin: '#064E3B',
    btnText: '#064E3B',
    btnHover: '#043d2e',
    palette: {
      'africa': { fill: '#16A34A', stroke: '#15803D', dot: 'bg-amber-500' },
      'asia': { fill: '#047857', stroke: '#065F46', dot: 'bg-[#047857]' },
      'latin-america': { fill: '#4ADE80', stroke: '#22C55E', dot: 'bg-[#16A34A]' },
      'europe': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
      'north-america': { fill: '#A7F3D0', stroke: '#86EFAC', dot: 'bg-[#064E3B]' },
      'oceania': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
    },
  },
  'ambiente': {
    primaryDark: '#064E3B',
    primaryMedium: '#059669',
    border: '#A7F3D0',
    hoverPin: '#064E3B',
    btnText: '#064E3B',
    btnHover: '#043d2e',
    palette: {
      'africa': { fill: '#16A34A', stroke: '#15803D', dot: 'bg-amber-500' },
      'asia': { fill: '#047857', stroke: '#065F46', dot: 'bg-[#047857]' },
      'latin-america': { fill: '#4ADE80', stroke: '#22C55E', dot: 'bg-[#16A34A]' },
      'europe': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
      'north-america': { fill: '#A7F3D0', stroke: '#86EFAC', dot: 'bg-[#064E3B]' },
      'oceania': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
    },
  },
  'global': {
    primaryDark: '#064E3B',
    primaryMedium: '#059669',
    border: '#A7F3D0',
    hoverPin: '#064E3B',
    btnText: '#064E3B',
    btnHover: '#043d2e',
    palette: {
      'africa': { fill: '#16A34A', stroke: '#15803D', dot: 'bg-amber-500' },
      'asia': { fill: '#047857', stroke: '#065F46', dot: 'bg-[#047857]' },
      'latin-america': { fill: '#4ADE80', stroke: '#22C55E', dot: 'bg-[#16A34A]' },
      'europe': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
      'north-america': { fill: '#A7F3D0', stroke: '#86EFAC', dot: 'bg-[#064E3B]' },
      'oceania': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
    },
  },
  'direitos-humanos': {
    primaryDark: '#312E81',
    primaryMedium: '#6D28D9',
    border: '#C4B5FD',
    hoverPin: '#4C1D95',
    btnText: '#312E81',
    btnHover: '#26246a',
    palette: {
      'africa': { fill: '#8B5CF6', stroke: '#6D28D9', dot: 'bg-[#6D28D9]' },
      'asia': { fill: '#A78BFA', stroke: '#7C3AED', dot: 'bg-[#7C3AED]' },
      'latin-america': { fill: '#C4B5FD', stroke: '#8B5CF6', dot: 'bg-[#8B5CF6]' },
      'europe': { fill: '#DDD6FE', stroke: '#8B5CF6', dot: 'bg-[#A78BFA]' },
      'north-america': { fill: '#EDE9FE', stroke: '#A78BFA', dot: 'bg-[#C4B5FD]' },
      'oceania': { fill: '#EDE9FE', stroke: '#A78BFA', dot: 'bg-[#C4B5FD]' },
    },
  },
  'saude': {
    primaryDark: '#115E59',
    primaryMedium: '#0D9488',
    border: '#99F6E4',
    hoverPin: '#115E59',
    btnText: '#115E59',
    btnHover: '#0f4f4b',
    palette: {
      'africa': { fill: '#0D9488', stroke: '#0F766E', dot: 'bg-[#0F766E]' },
      'asia': { fill: '#14B8A6', stroke: '#0D9488', dot: 'bg-[#0D9488]' },
      'latin-america': { fill: '#2DD4BF', stroke: '#0D9488', dot: 'bg-[#14B8A6]' },
      'europe': { fill: '#5EEAD4', stroke: '#14B8A6', dot: 'bg-[#2DD4BF]' },
      'north-america': { fill: '#99F6E4', stroke: '#2DD4BF', dot: 'bg-[#5EEAD4]' },
      'oceania': { fill: '#CCFBF1', stroke: '#2DD4BF', dot: 'bg-[#99F6E4]' },
    },
  },
  'tecnologia': {
    primaryDark: '#0D3570',
    primaryMedium: '#1455AC',
    border: '#BFDBFE',
    hoverPin: '#0D3570',
    btnText: '#1455AC',
    btnHover: '#0F448A',
    palette: {
      'asia': { fill: '#1455AC', stroke: '#0D3570', dot: 'bg-[#0D3570]' },
      'europe': { fill: '#2563EB', stroke: '#1455AC', dot: 'bg-[#1455AC]' },
      'north-america': { fill: '#60A5FA', stroke: '#1455AC', dot: 'bg-[#2563EB]' },
      'latin-america': { fill: '#93C5FD', stroke: '#2563EB', dot: 'bg-[#60A5FA]' },
      'africa': { fill: '#BFDBFE', stroke: '#60A5FA', dot: 'bg-[#93C5FD]' },
      'oceania': { fill: '#DBEAFE', stroke: '#60A5FA', dot: 'bg-[#BFDBFE]' },
    },
  },
  'educacao': {
    primaryDark: '#0369A1',
    primaryMedium: '#0284C7',
    border: '#BAE6FD',
    hoverPin: '#0369A1',
    btnText: '#0284C7',
    btnHover: '#0369a1',
    palette: {
      'africa': { fill: '#0284C7', stroke: '#0369A1', dot: 'bg-[#0369A1]' },
      'latin-america': { fill: '#0EA5E9', stroke: '#0284C7', dot: 'bg-[#0284C7]' },
      'asia': { fill: '#38BDF8', stroke: '#0284C7', dot: 'bg-[#0EA5E9]' },
      'europe': { fill: '#7DD3FC', stroke: '#0EA5E9', dot: 'bg-[#38BDF8]' },
      'north-america': { fill: '#BAE6FD', stroke: '#38BDF8', dot: 'bg-[#7DD3FC]' },
      'oceania': { fill: '#E0F2FE', stroke: '#38BDF8', dot: 'bg-[#BAE6FD]' },
    },
  },
  'cultura': {
    primaryDark: '#371B80',
    primaryMedium: '#7C3AED',
    border: '#DDD6FE',
    hoverPin: '#371B80',
    btnText: '#371B80',
    btnHover: '#281363',
    palette: {
      'africa': { fill: '#F59E0B', stroke: '#D97706', dot: 'bg-amber-500' },
      'asia': { fill: '#7C3AED', stroke: '#6D28D9', dot: 'bg-violet-600' },
      'latin-america': { fill: '#3B82F6', stroke: '#1455AC', dot: 'bg-blue-600' },
      'europe': { fill: '#A855F7', stroke: '#9333EA', dot: 'bg-purple-500' },
      'north-america': { fill: '#312E81', stroke: '#1E1B4B', dot: 'bg-indigo-900' },
      'oceania': { fill: '#C084FC', stroke: '#A855F7', dot: 'bg-fuchsia-400' },
    },
  },
};

const DEFAULT_REGIONS: RegionImpactItem[] = [
  { id: 'africa', name: 'África', percent: 34, projectsCount: 428, highlight: true },
  { id: 'asia', name: 'Ásia', percent: 26, projectsCount: 312 },
  { id: 'latin-america', name: 'América Latina', percent: 20, projectsCount: 245 },
  { id: 'europe', name: 'Europa', percent: 12, projectsCount: 168 },
  { id: 'north-america', name: 'América do Norte', percent: 8, projectsCount: 94 },
];

export const ImpactRegionMapCard: React.FC<ImpactRegionMapCardProps> = ({
  category = 'direitos-humanos',
  title = 'Impacto por região',
  onOpenReport,
  onSeeAll,
  customRegions,
  className = '',
  showFooterButton = false,
  showPercentagesInLegend = false,
  hideHeader = false,
}) => {
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);

  const theme = THEME_STYLES[category] || THEME_STYLES['direitos-humanos'];
  const regions = customRegions || DEFAULT_REGIONS;

  // Gerar projeção geoNaturalEarth1 e caminhos vetoriais autênticos da Terra
  const { countryPaths, bordersPath, pinCoords } = useMemo(() => {
    // Escala e translação calibradas para viewBox 350x170 (apenas massa terrestre sem Antártida)
    const proj = geoNaturalEarth1()
      .scale(58)
      .translate([170, 95]);

    const pathGen = geoPath(proj);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topology = worldData as any;
    const countriesFeature = feature(topology, topology.objects.countries);

    // Mapear cada país para sua região e gerar o SVG path real
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paths = ((countriesFeature as any).features || [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((f: any) => {
        const name = f.properties?.name;
        const id = f.id !== undefined && f.id !== null ? String(f.id) : '';
        return name !== 'Antarctica' && name !== 'Fr. S. Antarctic Lands' && id !== '010' && id !== '10' && id !== 'ATA';
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((f: any, index: number) => {
        const name = f.properties?.name || '';
        const regionId = COUNTRY_TO_REGION[name] || 'asia'; // default para Ásia se não estiver listado
        const d = pathGen(f) || '';
        const uniqueId = f.id !== undefined && f.id !== null && String(f.id) !== 'undefined'
          ? `geo-${f.id}-${index}`
          : `geo-${name ? name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() : 'feat'}-${index}`;
        return {
          id: uniqueId,
          name,
          regionId,
          d,
        };
      });

    // Malha interna de fronteiras
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bordersMesh = mesh(topology, topology.objects.countries, (a: any, b: any) => {
      const isAntarcticaA = String(a.id) === '010' || a.properties?.name === 'Antarctica';
      const isAntarcticaB = String(b.id) === '010' || b.properties?.name === 'Antarctica';
      if (isAntarcticaA || isAntarcticaB) return false;
      return a !== b;
    });
    const bordersD = pathGen(bordersMesh) || '';

    // Coordenadas projetadas para os pinos de cada região
    const pins: Record<string, { x: number; y: number }> = {};
    Object.entries(REGION_COORDINATES).forEach(([regId, coords]) => {
      const p = proj(coords);
      if (p) {
        pins[regId] = { x: p[0], y: p[1] };
      }
    });

    return {
      countryPaths: paths,
      bordersPath: bordersD,
      pinCoords: pins,
    };
  }, []);

  // Região ativa para o pino pulsante (por defeito África ou a região com maior percentual)
  const activeRegion = useMemo(() => {
    if (hoveredRegionId) {
      return regions.find((r) => r.id === hoveredRegionId) || regions[0];
    }
    return regions.find((r) => r.highlight) || regions[0];
  }, [hoveredRegionId, regions]);

  const activePinPos = pinCoords[activeRegion.id] || { x: 187, y: 95 };

  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700 shadow-2xs flex flex-col justify-between font-sans ${className}`}
    >
      {/* 1. Header com Título e Ação "Ver todas" */}
      {!hideHeader && (
        <div className="flex items-center justify-between pb-1">
          <h3
            className="text-sm sm:text-[15px] font-bold font-sans tracking-tight"
            style={{ color: theme.btnText }}
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onSeeAll || onOpenReport}
            className="text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors group hover:opacity-85"
            style={{ color: theme.btnText }}
          >
            <span>Ver todas</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}

      {/* 2. Mapa Mundi Autêntico com Projeção e Cores Fiéis ao Mockup */}
      <div className="relative py-1.5 flex items-center justify-between gap-1 group/map">
        <div className="flex-1 min-w-0">
          <svg
            viewBox="0 0 350 170"
            className="w-full h-auto select-none drop-shadow-2xs"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Filtro sutil de relevo adaptado ao tema */}
              <filter id={`map-shadow-${category}`} x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor={theme.primaryDark} floodOpacity="0.12" />
              </filter>
            </defs>

            {/* Camada Base de Países Geográficos Reais com Cores Fiéis */}
            <g filter={`url(#map-shadow-${category})`}>
              {countryPaths.map((country, idx) => {
                const regPalette = theme.palette[country.regionId] || theme.palette['oceania'];
                const isHovered = hoveredRegionId === country.regionId;
                const isDimmed = hoveredRegionId !== null && !isHovered;

                return (
                  <path
                    key={country.id || `country-path-${idx}`}
                    d={country.d}
                    fill={regPalette.fill}
                    stroke={regPalette.stroke}
                    strokeWidth={isHovered ? 0.8 : 0.35}
                    className="transition-all duration-200 cursor-pointer"
                    style={{
                      opacity: isDimmed ? 0.45 : isHovered ? 1 : 0.95,
                      filter: isHovered ? 'brightness(1.08)' : 'none',
                    }}
                    onMouseEnter={() => setHoveredRegionId(country.regionId)}
                    onMouseLeave={() => setHoveredRegionId(null)}
                  >
                    <title>{`${country.name} (${regions.find((r) => r.id === country.regionId)?.name || 'Região'})`}</title>
                  </path>
                );
              })}
            </g>

            {/* Fronteiras Internas Nacionais Suaves em Branco */}
            <path
              d={bordersPath}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.35"
              strokeOpacity="0.55"
              strokeLinejoin="round"
              className="pointer-events-none"
            />

            {/* Ponto Interativo Sutil na Região em Foco ao passar o mouse */}
            {hoveredRegionId && (
              <g className="pointer-events-none transition-all duration-300">
                <circle
                  cx={activePinPos.x}
                  cy={activePinPos.y}
                  r="7"
                  fill="none"
                  stroke={theme.primaryDark}
                  strokeWidth="1"
                  opacity="0.4"
                  className="animate-ping"
                />
                <circle
                  cx={activePinPos.x}
                  cy={activePinPos.y}
                  r="3.5"
                  fill={theme.primaryDark}
                  stroke="#FFFFFF"
                  strokeWidth="0.8"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Escala Percentual Vertical na lateral direita se showPercentagesInLegend for false */}
        {!showPercentagesInLegend && (
          <div className="flex flex-col justify-between py-1 text-[9.5px] font-bold text-slate-400 dark:text-slate-500 select-none shrink-0 h-[100px] text-right pr-0.5">
            <span>{regions[0]?.percent || 34}%</span>
            <span>{regions[1]?.percent || 26}%</span>
            <span>{regions[2]?.percent || 20}%</span>
            <span>{regions[3]?.percent || 12}%</span>
            <span>{regions[4]?.percent || 8}%</span>
          </div>
        )}

        {/* Tooltip flutuante ao passar o cursor na região */}
        {hoveredRegionId && (
          <div className="absolute bottom-1 left-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs text-[11px] font-bold text-slate-800 dark:text-slate-100 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            {regions.find((r) => r.id === hoveredRegionId)?.name}:{' '}
            <span style={{ color: theme.btnText }}>
              {regions.find((r) => r.id === hoveredRegionId)?.percent}%
            </span>
          </div>
        )}
      </div>

      {/* 3. Legenda Vertical com Pontos Coloridos (África, Ásia, América Latina, Europa, América do Norte) */}
      <div className="flex flex-col gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium pt-1 select-none">
        {regions.slice(0, 5).map((reg) => {
          const regPalette = theme.palette[reg.id] || theme.palette['oceania'];
          const isHovered = hoveredRegionId === reg.id;

          return (
            <div
              key={reg.id}
              onMouseEnter={() => setHoveredRegionId(reg.id)}
              onMouseLeave={() => setHoveredRegionId(null)}
              className={`flex items-center justify-between cursor-pointer transition-colors ${
                isHovered ? 'font-bold text-slate-950 dark:text-slate-50' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${regPalette.dot}`} />
                <span className="truncate">{reg.name}</span>
              </div>
              {showPercentagesInLegend ? (
                <span className="font-bold text-[#0F172A] dark:text-slate-50 text-xs shrink-0">
                  {reg.percent}%
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* 4. Botão Opcional de Ação */}
      {showFooterButton && (
        <button
          type="button"
          onClick={onOpenReport}
          className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer group mt-2"
          style={{ color: theme.btnText }}
        >
          <span>Ver relatório completo</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
};
