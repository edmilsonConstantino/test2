import React, { useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import { Plus, Minus, Crosshair, Box, ArrowRight, X } from 'lucide-react';
import { CountryData } from '../types';
import { COUNTRIES_DATA } from '../data/countriesData';

interface WorldMapProps {
  selectedCountry: CountryData;
  onSelectCountry: (country: CountryData) => void;
  onExploreCountry: (country: CountryData) => void;
  className?: string;
  showLegend?: boolean;
  controlsPosition?: 'bottom-left' | 'bottom-right' | 'lateral-right' | 'bottom-left-stacked' | 'top-right';
  initialZoom?: number;
}

// Geographic coordinates for accurate pins and projection matching the global map
export const MAP_PINS = [
  // 1. Territórios Ativos
  {
    id: 'portugal',
    name: 'Portugal',
    flag: '🇵🇹',
    status: 'active' as const,
    statusLabel: 'ATIVO',
    projectsCount: 1284,
    communitiesCount: 532760,
    lng: -8.2245,
    lat: 39.3999,
  },
  // 2. Territórios com Atividade
  {
    id: 'brasil',
    name: 'Brasil',
    flag: '🇧🇷',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 1542,
    communitiesCount: 892130,
    lng: -48.0,
    lat: -14.5,
  },
  {
    id: 'espanha',
    name: 'Espanha',
    flag: '🇪🇸',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 890,
    communitiesCount: 340000,
    lng: -3.7038,
    lat: 40.4168,
  },
  {
    id: 'angola',
    name: 'Angola',
    flag: '🇦🇴',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 420,
    communitiesCount: 180000,
    lng: 17.8739,
    lat: -11.2027,
  },
  {
    id: 'cabo-verde',
    name: 'Cabo Verde',
    flag: '🇨🇻',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 215,
    communitiesCount: 75000,
    lng: -23.5133,
    lat: 14.933,
  },
  {
    id: 'mocambique',
    name: 'Moçambique',
    flag: '🇲🇿',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 310,
    communitiesCount: 110000,
    lng: 35.5296,
    lat: -18.6657,
  },
  {
    id: 'eua',
    name: 'Estados Unidos',
    flag: '🇺🇸',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 1120,
    communitiesCount: 420000,
    lng: -98.5795,
    lat: 39.8283,
  },
  {
    id: 'africa-sul',
    name: 'África do Sul',
    flag: '🇿🇦',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 280,
    communitiesCount: 95000,
    lng: 24.5,
    lat: -29.5,
  },
  {
    id: 'japao',
    name: 'Japão',
    flag: '🇯🇵',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 432,
    communitiesCount: 156320,
    lng: 138.2529,
    lat: 36.2048,
  },
  {
    id: 'australia',
    name: 'Austrália',
    flag: '🇦🇺',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 340,
    communitiesCount: 124000,
    lng: 133.7751,
    lat: -25.2744,
  },
  // 3. Em Mapeamento
  {
    id: 'india',
    name: 'Índia',
    flag: '🇮🇳',
    status: 'inactive' as const,
    statusLabel: 'EM MAPEAMENTO',
    projectsCount: 940,
    communitiesCount: 380000,
    lng: 78.9629,
    lat: 20.5937,
  },
  {
    id: 'canada',
    name: 'Canadá',
    flag: '🇨🇦',
    status: 'inactive' as const,
    statusLabel: 'EM MAPEAMENTO',
    projectsCount: 180,
    communitiesCount: 65000,
    lng: -106.3468,
    lat: 56.1304,
  },
];

export const WorldMap: React.FC<WorldMapProps> = ({
  selectedCountry,
  onSelectCountry,
  onExploreCountry,
  className = '',
  showLegend = true,
  controlsPosition = 'bottom-left',
  initialZoom = 0.85,
}) => {
  const [zoomLevel, setZoomLevel] = useState(initialZoom);
  const [is3DMode, setIs3DMode] = useState(false);
  const [isPopupDismissed, setIsPopupDismissed] = useState(false);

  // Whenever selectedCountry changes, re-open popup
  React.useEffect(() => {
    setIsPopupDismissed(false);
  }, [selectedCountry.id]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.8));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.7));
  const handleReset = () => {
    setZoomLevel(initialZoom);
    setIs3DMode(false);
  };
  const toggle3D = () => setIs3DMode((prev) => !prev);

  // SVG Geometry generation with Natural Earth projection
  const { landPath, bordersPath, portugalPath, projectedPins, portugalPos, projection } = useMemo(() => {
    // Natural Earth 1 projection matching the visual reference
    const proj = geoNaturalEarth1()
      .scale(185)
      .translate([620, 290]);

    const pathGenerator = geoPath(proj);

    // Extract TopoJSON features and exclude Antarctica (code 010 / 10 / ATA)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topology = worldData as any;
    const countriesFeature = feature(topology, topology.objects.countries);

    // Filter out Antarctica
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredCountries = {
      type: 'FeatureCollection',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      features: ((countriesFeature as any).features || []).filter((f: any) => {
        const id = String(f.id);
        const name = f.properties?.name;
        if (id === '010' || id === '10' || id === 'ATA' || name === 'Antarctica') {
          return false;
        }
        return true;
      }),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bordersMesh = mesh(topology, topology.objects.countries, (a: any, b: any) => {
      const isAntarcticaA = String(a.id) === '010' || String(a.id) === '10' || a.id === 'ATA';
      const isAntarcticaB = String(b.id) === '010' || String(b.id) === '10' || b.id === 'ATA';
      if (isAntarcticaA || isAntarcticaB) return false;
      return a !== b;
    });

    // Find Portugal (ISO 620)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ptFeature = (countriesFeature as any).features?.find(
      (f: { id: string | number }) => f.id === '620' || f.id === 620
    );

    const landD = pathGenerator(filteredCountries as any) || '';
    const bordersD = pathGenerator(bordersMesh) || '';
    const ptD = ptFeature ? pathGenerator(ptFeature) || '' : '';

    // Calculate projected positions for all pins
    const pins = MAP_PINS.map((pin) => {
      const coords = proj([pin.lng, pin.lat]);
      return {
        ...pin,
        x: coords ? coords[0] : 0,
        y: coords ? coords[1] : 0,
      };
    });

    const ptCoords = proj([-8.2245, 39.3999]) || [599, 161];

    return {
      landPath: landD,
      bordersPath: bordersD,
      portugalPath: ptD,
      projectedPins: pins,
      portugalPos: { x: ptCoords[0], y: ptCoords[1] },
      projection: proj,
    };
  }, []);

  // Compute active target pin position for wave pulses & popup
  const activePinPos = useMemo(() => {
    // 1. Direct match by ID in projected pins
    const found = projectedPins.find(
      (p) => p.id === selectedCountry.id || p.name.toLowerCase() === selectedCountry.name.toLowerCase()
    );
    if (found) {
      return { x: found.x, y: found.y };
    }

    // 2. Try mapPos percentage in selectedCountry
    if (selectedCountry.mapPos) {
      return {
        x: (selectedCountry.mapPos.x / 100) * 1180,
        y: (selectedCountry.mapPos.y / 100) * 580,
      };
    }

    // Fallback to Portugal
    return { x: portugalPos.x, y: portugalPos.y };
  }, [selectedCountry, projectedPins, portugalPos]);

  // Determine pulse ring color based on selectedCountry status
  const ringColor = useMemo(() => {
    if (selectedCountry.status === 'active') return '#10B981';
    if (selectedCountry.status === 'with-activity') return '#1264FF';
    return '#94A3B8';
  }, [selectedCountry.status]);

  // Determine popup coordinates:
  // If pin is in the right area (x > 720), position popup on the LEFT of the pin with right-facing arrow
  // If pin is in the left/center, position popup on the RIGHT of the pin with left-facing arrow
  const isPinOnRight = activePinPos.x > 720;
  const pinXPercent = (activePinPos.x / 1180) * 100;
  const pinYPercent = (activePinPos.y / 580) * 100;
  // Clamped Y position so popup stays visible inside SVG bounds
  const clampedYPercent = Math.max(16, Math.min(84, pinYPercent));

  return (
    <div
      id="interactive-world-map-wrapper"
      className={`relative w-full h-full select-none bg-[#F8FAFC] dark:bg-slate-950 overflow-hidden ${className}`}
      style={{
        perspective: is3DMode ? '1200px' : 'none',
      }}
    >
      {/* Fixed Legend if explicitly enabled */}
      {showLegend && (
        <div
          id="world-map-fixed-legend"
          className="absolute bottom-3 right-3 z-25 bg-white/90 backdrop-blur-xs border border-slate-200 rounded-md px-3 py-1.5 shadow-2xs flex items-center gap-3 select-none text-[11px] dark:bg-slate-800/90 dark:border-slate-700"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-slate-700 font-medium whitespace-nowrap dark:text-slate-300">Ativo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            <span className="text-slate-700 font-medium whitespace-nowrap dark:text-slate-300">Com Atividade</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
            <span className="text-slate-700 font-medium whitespace-nowrap dark:text-slate-300">Mapeamento</span>
          </div>
        </div>
      )}

      {/* SVG Map Canvas with Zoom & 3D Transform */}
      <div
        id="world-map-canvas"
        className="w-full h-full relative transition-all duration-500 ease-out"
        style={{
          transform: `scale(${zoomLevel}) ${is3DMode ? 'rotateX(22deg) rotateY(-6deg) translateZ(10px)' : ''}`,
          transformOrigin: '55% 45%',
        }}
      >
        <svg
          viewBox="0 0 1180 580"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Ocean Base Layer - Natural clean slate */}
          <rect x="-2000" y="-2000" width="6000" height="5000" fill="#F8FAFC" />

          {/* Natural Landmass Base Layer */}
          <g id="geo-landmass">
            <path
              d={landPath}
              fill="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth="0.55"
            />
          </g>

          {/* Internal Country Borders */}
          <g id="geo-borders">
            <path
              d={bordersPath}
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="0.45"
              strokeLinejoin="round"
            />
          </g>

          {/* Portugal Highlight */}
          {portugalPath && (
            <path
              d={portugalPath}
              fill="#10B981"
              stroke="#059669"
              strokeWidth="0.8"
            />
          )}
        </svg>

        {/* Dynamic Map Pins Layer matching precise geographic coordinates */}
        {projectedPins.map((pin) => {
          const isSelected = selectedCountry.id === pin.id || selectedCountry.name.toLowerCase() === pin.name.toLowerCase();
          const isActiveGreen = pin.status === 'active';
          const isActivityBlue = pin.status === 'with-activity';

          return (
            <div
              key={pin.id}
              style={{
                left: `${(pin.x / 1180) * 100}%`,
                top: `${(pin.y / 580) * 100}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-transform duration-150 ${
                isSelected ? 'z-30 scale-110' : 'z-20 hover:scale-125'
              }`}
              onClick={() => {
                const matched = COUNTRIES_DATA.find(
                  (c) => c.id === pin.id || c.name.toLowerCase() === pin.name.toLowerCase()
                ) || {
                  id: pin.id,
                  name: pin.name,
                  code: pin.id.slice(0, 2).toUpperCase(),
                  flag: pin.flag,
                  status: pin.status,
                  statusLabel: pin.statusLabel,
                  projectsCount: pin.projectsCount,
                  communitiesCount: pin.communitiesCount,
                  citizensCount: pin.communitiesCount * 2,
                  imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80',
                  description: `Iniciativas de sustentabilidade e desenvolvimento comunitário em ${pin.name}.`,
                  capital: pin.name,
                  region: 'Global',
                  mapPos: { x: (pin.x / 1180) * 100, y: (pin.y / 580) * 100 },
                  initiatives: ['Desenvolvimento Local Sustentável', 'Educação Comunitária'],
                };
                onSelectCountry(matched);
              }}
              id={`map-pin-${pin.id}`}
              title={`${pin.name} (${pin.statusLabel})`}
            >
              {isActiveGreen ? (
                /* Active Green Pinpoint Marker */
                <div className="relative flex flex-col items-center -translate-y-4 select-none pointer-events-auto">
                  <div className={`w-5 h-6 text-emerald-600 transition-transform duration-200 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                    <svg viewBox="0 0 24 30" fill="none" className="w-full h-full">
                      <path
                        d="M12 1C6 1 1 6 1 12C1 20 12 29 12 29C12 29 23 20 23 12C23 6 18 1 12 1Z"
                        fill="#059669"
                        stroke="#047857"
                        strokeWidth="0.8"
                      />
                      <circle cx="12" cy="11" r="3.5" fill="#FFFFFF" />
                    </svg>
                  </div>
                </div>
              ) : isActivityBlue ? (
                /* Clean Blue Dot with White Ring */
                <div className="relative flex items-center justify-center">
                  <div className={`w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-white shadow-2xs transition-transform duration-150 ${isSelected ? 'ring-2 ring-blue-400 scale-125' : 'group-hover:scale-125'}`} />
                </div>
              ) : (
                /* Subtle Slate Dot */
                <div className="relative flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full bg-slate-400 ring-1.5 ring-white dark:ring-slate-900 shadow-2xs transition-transform duration-150 ${isSelected ? 'ring-2 ring-slate-400 scale-125' : 'group-hover:scale-125'}`} />
                </div>
              )}

              {/* Hover Name Badge for non-selected pins */}
              {!isSelected && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-slate-900 text-white text-[10px] font-medium py-0.5 px-1.5 rounded whitespace-nowrap shadow-xs z-40">
                  {pin.flag} {pin.name}
                </div>
              )}
            </div>
          );
        })}

        {/* 4. Contextual Inspector Card */}
        {!isPopupDismissed && (
          <div
            style={{
              left: isPinOnRight
                ? `${pinXPercent - 2}%`
                : `${pinXPercent + 3}%`,
              top: `${clampedYPercent}%`,
              transform: isPinOnRight
                ? 'translate(-100%, -50%)'
                : 'translate(0%, -50%)',
            }}
            id="country-card-pin-tooltip"
            className="absolute z-35 min-w-[190px] sm:min-w-[210px] bg-white border border-slate-200 rounded-lg p-3 shadow-sm select-none pointer-events-auto dark:bg-slate-900 dark:border-slate-700"
          >
            {/* Card Header: Code/Flag + Country Name + Status Badge + Close Button */}
            <div className="relative flex items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-sm leading-none shrink-0" role="img" aria-label={selectedCountry.name}>
                  {selectedCountry.flag}
                </span>

                <h3 className="text-xs font-bold text-slate-900 tracking-tight font-sans truncate dark:text-slate-50">
                  {selectedCountry.name}
                </h3>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <span
                  className={`text-[9.5px] font-semibold px-1.5 py-0.5 rounded border uppercase ${
                    selectedCountry.status === 'active'
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                      : selectedCountry.status === 'with-activity'
                      ? 'bg-blue-50 dark:bg-blue-500/10 text-[#1E3A8A] dark:text-blue-400 border-blue-200 dark:border-blue-800'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {selectedCountry.status === 'active'
                    ? 'Ativo'
                    : selectedCountry.status === 'with-activity'
                    ? 'Atividade'
                    : 'Mapeamento'}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPopupDismissed(true);
                  }}
                  className="w-4.5 h-4.5 rounded flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer dark:text-slate-500 dark:hover:text-slate-200 dark:hover:bg-slate-800"
                  title="Fechar painel"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Stats List */}
            <div className="relative py-2 space-y-1.5 text-[11.5px]">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span>Projetos</span>
                <span className="font-semibold text-slate-900 tabular-nums dark:text-slate-50">
                  {selectedCountry.projectsCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span>Comunidades</span>
                <span className="font-semibold text-slate-900 tabular-nums dark:text-slate-50">
                  {selectedCountry.communitiesCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </span>
              </div>
            </div>

            {/* Explore Action Link */}
            <div className="relative pt-1.5 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => onExploreCountry(selectedCountry)}
                className="w-full text-center text-[11.5px] font-semibold text-[#1E3A8A] hover:text-[#162D6D] inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <span>Ver território</span>
                <ArrowRight className="w-3 h-3 stroke-[2]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Floating Map Controls (Zoom +/-, Reset) - Compact & integrated */}
      <div
        id="map-floating-controls"
        className="absolute top-2.5 right-2.5 z-25 flex flex-col items-center bg-white/95 border border-slate-200 rounded-md p-0.5 shadow-2xs space-y-0.5 select-none dark:bg-slate-800/95 dark:border-slate-700"
      >
        <button
          onClick={handleZoomIn}
          title="Aumentar Zoom (+)"
          type="button"
          className="w-6 h-6 flex items-center justify-center rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-50"
        >
          <Plus className="w-3 h-3 stroke-[2.2]" />
        </button>

        <button
          onClick={handleReset}
          title="Recentrar mapa"
          type="button"
          className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-50"
        >
          <Crosshair className="w-3 h-3 stroke-[2]" />
        </button>

        <div className="w-3.5 h-[1px] bg-slate-200 dark:bg-slate-700" />

        <button
          onClick={handleZoomOut}
          title="Diminuir Zoom (-)"
          type="button"
          className="w-6 h-6 flex items-center justify-center rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-50"
        >
          <Minus className="w-3 h-3 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
};

