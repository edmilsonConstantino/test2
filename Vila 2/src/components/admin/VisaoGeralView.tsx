import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Users,
  Flag,
  Globe,
  Zap,
  Building2,
  Coins,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Compass,
  Sprout,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Handshake,
  MapPin,
  BarChart3,
  CheckSquare,
  Award,
  BookOpen,
  HeartPulse,
} from 'lucide-react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import { DemoUser } from '../../data/demoUsers';
import { BreadcrumbItem } from '../Topbar';
import { ExpandableKpiHeader, KpiCardData } from './ExpandableKpiHeader';
import { LineChart } from './MiniCharts';
import { useTheme } from '../../contexts/ThemeContext';

interface VisaoGeralViewProps {
  currentUser: DemoUser;
  onNavigateToTab: (tabId: string) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

// 1. Mapeamento de Países para Regiões da Rede VILA
const COUNTRY_TO_REGION: Record<string, string> = {
  // América do Norte
  'Canada': 'north-america',
  'United States of America': 'north-america',
  'Greenland': 'north-america',
  // América Latina
  'Mexico': 'latin-america',
  'Guatemala': 'latin-america',
  'Colombia': 'latin-america',
  'Brazil': 'latin-america',
  'Argentina': 'latin-america',
  'Chile': 'latin-america',
  'Peru': 'latin-america',
  'Ecuador': 'latin-america',
  // Europa
  'Portugal': 'europe',
  'Spain': 'europe',
  'France': 'europe',
  'United Kingdom': 'europe',
  'Germany': 'europe',
  'Italy': 'europe',
  'Netherlands': 'europe',
  'Belgium': 'europe',
  'Switzerland': 'europe',
  'Sweden': 'europe',
  'Norway': 'europe',
  // África
  'Angola': 'africa',
  'Mozambique': 'africa',
  'Cabo Verde': 'africa',
  'São Tomé and Principe': 'africa',
  'Guinea-Bissau': 'africa',
  'South Africa': 'africa',
  'Kenya': 'africa',
  'Nigeria': 'africa',
  'Senegal': 'africa',
  'Morocco': 'africa',
  'Egypt': 'africa',
  // Ásia
  'Timor-Leste': 'asia',
  'Macau': 'asia',
  'Japan': 'asia',
  'India': 'asia',
  'China': 'asia',
  'Singapore': 'asia',
};

// Coordenadas dos hotspots de presença global (para pontos no mapa)
const MAP_HOTSPOTS = [
  { id: 'lisboa', name: 'Lisboa (Hub Central)', coords: [-9.1393, 38.7223], size: 10, pulsing: true },
  { id: 'porto', name: 'Porto', coords: [-8.611, 41.1496], size: 7 },
  { id: 'luanda', name: 'Luanda', coords: [13.2343, -8.839], size: 9, pulsing: true },
  { id: 'maputo', name: 'Maputo', coords: [32.5732, -25.9692], size: 8 },
  { id: 'praia', name: 'Praia (Cabo Verde)', coords: [-23.5133, 14.933], size: 6 },
  { id: 'sao-paulo', name: 'São Paulo', coords: [-46.6333, -23.5505], size: 9, pulsing: true },
  { id: 'rio', name: 'Rio de Janeiro', coords: [-43.1729, -22.9068], size: 7 },
  { id: 'dili', name: 'Díli (Timor)', coords: [125.5736, -8.5586], size: 6 },
  { id: 'nairobi', name: 'Nairóbi', coords: [36.8219, -1.2921], size: 8 },
  { id: 'paris', name: 'Paris', coords: [2.3522, 48.8566], size: 6 },
  { id: 'londres', name: 'Londres', coords: [-0.1278, 51.5074], size: 6 },
  { id: 'madrid', name: 'Madrid', coords: [-3.7038, 40.4168], size: 6 },
  { id: 'bogota', name: 'Bogotá', coords: [-74.0721, 4.711], size: 7 },
  { id: 'cidade-cabo', name: 'Cidade do Cabo', coords: [18.4241, -33.9249], size: 7 },
];

export const VisaoGeralView: React.FC<VisaoGeralViewProps> = ({
  currentUser: _currentUser,
  onNavigateToTab,
  onBreadcrumbChange,
}) => {
  const { isDark } = useTheme();

  // Cards do cabeçalho expansível (7 métricas da fita principal)
  const visaoKpiCards: KpiCardData[] = [
    {
      id: 'kpi-membros',
      label: 'Membros da Rede',
      value: '2.847.562',
      trend: '↑ 24%',
      trendPeriod: 'desde o ano passado',
      bgClass: 'bg-blue-50/90 text-[#1455AC] border-blue-100/70 dark:border-blue-800/40 border',
      iconClass: 'text-[#1455AC]',
      icon: <Users className="w-4.5 h-4.5" />,
      spark: [20, 27, 24, 32, 30, 38, 35, 44, 41, 50, 47, 56],
    },
    {
      id: 'kpi-comunidades',
      label: 'Comunidades Ativas',
      value: '18.732',
      trend: '↑ 18%',
      trendPeriod: 'desde o ano passado',
      bgClass: 'bg-emerald-50/90 text-emerald-600 dark:text-emerald-400 border-emerald-100/70 dark:border-emerald-800/40 border',
      iconClass: 'text-emerald-600 dark:text-emerald-400',
      icon: <Users className="w-4.5 h-4.5" />,
      spark: [18, 24, 21, 29, 27, 34, 32, 40, 37, 46, 43, 52],
    },
    {
      id: 'kpi-territorios',
      label: 'Territórios Ativos',
      value: '1.248',
      trend: '↑ 15%',
      trendPeriod: 'desde o ano passado',
      bgClass: 'bg-blue-50/90 text-[#1455AC] border-blue-100/70 dark:border-blue-800/40 border',
      iconClass: 'text-[#1455AC]',
      icon: <Flag className="w-4.5 h-4.5" />,
      spark: [22, 28, 25, 33, 31, 39, 36, 45, 42, 51, 48, 57],
    },
    {
      id: 'kpi-paises',
      label: 'Países na Plataforma',
      value: '156',
      trend: '↑ 8%',
      trendPeriod: 'desde o ano passado',
      bgClass: 'bg-amber-50/90 text-amber-600 dark:text-amber-400 border-amber-100/70 dark:border-amber-800/40 border',
      iconClass: 'text-amber-600 dark:text-amber-400',
      icon: <Globe className="w-4.5 h-4.5" />,
      spark: [16, 22, 19, 26, 24, 31, 29, 36, 34, 42, 40, 48],
    },
    {
      id: 'kpi-projetos',
      label: 'Projetos Ativos',
      value: '1.248',
      trend: '↑ 16%',
      trendPeriod: 'desde o ano passado',
      bgClass: 'bg-blue-50/90 text-[#1455AC] border-blue-100/70 dark:border-blue-800/40 border',
      iconClass: 'text-[#1455AC]',
      icon: <Zap className="w-4.5 h-4.5" />,
      spark: [21, 27, 24, 31, 29, 37, 34, 43, 40, 49, 46, 55],
    },
    {
      id: 'kpi-municipios',
      label: 'Municípios Ativos',
      value: '3.642',
      trend: '↑ 9%',
      trendPeriod: 'desde o ano passado',
      bgClass: 'bg-blue-50/90 text-[#1455AC] border-blue-100/70 dark:border-blue-800/40 border',
      iconClass: 'text-[#1455AC]',
      icon: <Building2 className="w-4.5 h-4.5" />,
      spark: [17, 23, 20, 27, 25, 32, 30, 37, 35, 43, 41, 49],
    },
    {
      id: 'kpi-orcamento',
      label: 'Orçamento Gerido',
      value: '€24,6M',
      trend: '↑ 21%',
      trendPeriod: 'desde o ano passado',
      bgClass: 'bg-blue-50/90 text-[#1455AC] border-blue-100/70 dark:border-blue-800/40 border',
      iconClass: 'text-[#1455AC]',
      icon: <Coins className="w-4.5 h-4.5" />,
      spark: [24, 30, 27, 34, 32, 40, 37, 46, 43, 52, 49, 58],
    },
  ];
  const [selectedPeriod, setSelectedPeriod] = useState<'5anos' | '3anos' | '1ano'>('5anos');
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [hoveredDataYear, setHoveredDataYear] = useState<number | null>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  // Referência estável para navegação e breadcrumb
  const onBreadcrumbChangeRef = useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;
  const onNavigateToTabRef = useRef(onNavigateToTab);
  onNavigateToTabRef.current = onNavigateToTab;

  useEffect(() => {
    onBreadcrumbChangeRef.current?.([
      { label: 'Plataforma VILA', onClick: () => onNavigateToTabRef.current('painel-gestao') },
      { label: 'Visão Geral' },
    ]);
  }, []);

  // Dados para Evolução da Rede VILA
  const evolutionYears = [2021, 2022, 2023, 2024, 2025];
  const evolutionData = {
    membros: [920000, 1340000, 1850000, 2310000, 2847562],
    comunidades: [510000, 780000, 1150000, 1490000, 1873200], // Normalizado proporcionalmente para o gráfico
    territorios: [290000, 480000, 720000, 980000, 1248000],
    paises: [48000, 72000, 105000, 132000, 156000],
  };

  // Coordenadas normalizadas do gráfico SVG de Linha (viewBox 600 x 240)
  const chartPoints = useMemo(() => {
    const width = 560;
    const height = 180;
    const paddingX = 40;
    const paddingY = 20;
    const maxVal = 3000000;

    const scaleX = (idx: number) => paddingX + idx * ((width - paddingX) / (evolutionYears.length - 1));
    const scaleY = (val: number) => height - (val / maxVal) * (height - paddingY) + paddingY;

    const makePath = (values: number[]) => {
      return values
        .map((v, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i).toFixed(1)} ${scaleY(v).toFixed(1)}`)
        .join(' ');
    };

    return {
      membrosPath: makePath(evolutionData.membros),
      comunidadesPath: makePath(evolutionData.comunidades),
      territoriosPath: makePath(evolutionData.territorios),
      paisesPath: makePath(evolutionData.paises),
      scaleX,
      scaleY,
    };
  }, []);

  // Projeção Cartográfica com D3 para o mapa mundial da rede
  const { countryPaths, bordersPath, hotspotScreenCoords } = useMemo(() => {
    const proj = geoNaturalEarth1().scale(58).translate([170, 95]);
    const pathGen = geoPath(proj);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topology = worldData as any;
    const countriesFeature = feature(topology, topology.objects.countries);

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
        const regionId = COUNTRY_TO_REGION[name] || 'asia';
        const d = pathGen(f) || '';
        const uniqueId = f.id !== undefined && f.id !== null && String(f.id) !== 'undefined'
          ? `vg-geo-${f.id}-${index}`
          : `vg-geo-${name ? name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() : 'feat'}-${index}`;
        return {
          id: uniqueId,
          name,
          regionId,
          d,
          isHighlighted: ['Portugal', 'Angola', 'Mozambique', 'Brazil', 'Cabo Verde', 'São Tomé and Principe', 'Timor-Leste'].includes(name),
        };
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bordersMesh = mesh(topology, topology.objects.countries, (a: any, b: any) => {
      const isAntarcticaA = String(a.id) === '010' || a.properties?.name === 'Antarctica';
      const isAntarcticaB = String(b.id) === '010' || b.properties?.name === 'Antarctica';
      if (isAntarcticaA || isAntarcticaB) return false;
      return a !== b;
    });
    const bordersD = pathGen(bordersMesh) || '';

    const screenHotspots = MAP_HOTSPOTS.map((h) => {
      const p = proj(h.coords as [number, number]);
      return {
        ...h,
        x: p ? p[0] : 0,
        y: p ? p[1] : 0,
      };
    });

    return {
      countryPaths: paths,
      bordersPath: bordersD,
      hotspotScreenCoords: screenHotspots,
    };
  }, []);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5 animate-in fade-in duration-200">
      {/* 1. Header com Título, Ilustração de Skyline/Comunidade e Status */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 overflow-hidden relative">
        {/* Esquerda: Ícone Roxo + Título + Subtítulo */}
        <div className="flex items-start sm:items-center gap-3.5 z-10">
          <div className="w-12 h-12 rounded-2xl bg-[#E2ECF9]/70 border border-blue-200/60 flex items-center justify-center text-[#1455AC] shrink-0 shadow-2xs">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] dark:text-slate-50 font-sans tracking-tight">
              Visão Geral
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
              Panorama global da rede VILA.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Indicadores-chave, tendências e alcance da plataforma.
            </p>
          </div>
        </div>

        {/* Centro: Ilustração Artística da Comunidade & Skyline Urbano */}
        <div className="hidden md:flex items-end justify-center flex-1 h-20 max-w-md mx-auto opacity-95 pointer-events-none select-none">
          <svg viewBox="0 0 420 80" className="w-full h-full" fill="none">
            {/* Skyline suave ao fundo */}
            <path
              d="M10 80 V55 H30 V45 H50 V35 H75 V50 H95 V40 H115 V60 H140 V30 H160 V50 H185 V45 H210 V25 H235 V50 H260 V38 H285 V58 H310 V42 H335 V52 H360 V32 H385 V52 H410 V80 Z"
              fill="#E2ECF9"
              fillOpacity="0.45"
            />
            <path
              d="M35 80 V58 H60 V48 H80 V62 H120 V48 H150 V38 H175 V58 H220 V32 H245 V48 H270 V42 H300 V60 H340 V48 H370 V58 H400 V80 Z"
              fill="#C4DAF3"
              fillOpacity="0.35"
            />
            {/* Árvores sutis */}
            <circle cx="25" cy="65" r="8" fill="#A7F3D0" fillOpacity="0.6" />
            <circle cx="90" cy="63" r="10" fill="#A7F3D0" fillOpacity="0.6" />
            <circle cx="330" cy="64" r="9" fill="#A7F3D0" fillOpacity="0.6" />
            <circle cx="395" cy="66" r="8" fill="#A7F3D0" fillOpacity="0.6" />

            {/* Figuras estilizadas de pessoas diversas no primeiro plano */}
            {/* Pessoa 1: Usuário de cadeira de rodas */}
            <g transform="translate(140, 42)">
              <circle cx="8" cy="4" r="3.5" fill="#1455AC" />
              <path d="M8 8 v9 l6 3" stroke="#1455AC" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="8" cy="22" r="7" stroke="#1D4ED8" strokeWidth="2.2" fill="none" />
              <path d="M8 17 h5 v5" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Pessoa 2: Jovem com camisa amarela */}
            <g transform="translate(170, 34)">
              <circle cx="6" cy="4" r="3.5" fill="#F59E0B" />
              <path d="M6 8 v14 m-4 -9 h8 m-6 9 v12 m4 -12 v12" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
            </g>

            {/* Pessoa 3: Mulher com camisa roxa */}
            <g transform="translate(195, 30)">
              <circle cx="6" cy="4" r="3.8" fill="#2D79D1" />
              <path d="M6 8 v16 m-5 -10 h10 m-7 10 v14 m4 -14 v14" stroke="#2D79D1" strokeWidth="2.4" strokeLinecap="round" />
            </g>

            {/* Pessoa 4: Cidadão com camisa vermelha acenando */}
            <g transform="translate(225, 33)">
              <circle cx="6" cy="4" r="3.6" fill="#EF4444" />
              <path d="M6 8 v15 m-5 -8 l5 -4 m0 4 l6 4 m-6 7 v13 m3 -13 v13" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
            </g>

            {/* Pessoa 5: Jovem com prancheta/tecnologia em verde */}
            <g transform="translate(255, 36)">
              <circle cx="6" cy="4" r="3.5" fill="#10B981" />
              <path d="M6 8 v14 m-4 -8 h8 m-6 8 v12 m4 -12 v12" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />
            </g>

            {/* Pessoa 6: Líder comunitário com bicicleta/apoio */}
            <g transform="translate(280, 38)">
              <circle cx="10" cy="4" r="3.5" fill="#1455AC" />
              <path d="M10 8 v13 l4 3 m-8 0 v10 m6 -10 v10" stroke="#1455AC" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="2" cy="24" r="5" stroke="#60A5FA" strokeWidth="1.8" fill="none" />
              <circle cx="20" cy="24" r="5" stroke="#60A5FA" strokeWidth="1.8" fill="none" />
              <path d="M2 24 l8 -8 l10 8" stroke="#60A5FA" strokeWidth="1.5" />
            </g>
          </svg>
        </div>

        {/* Direita: Última Atualização & Dados Consolidados */}
        <div className="flex flex-col sm:items-end gap-1 shrink-0 z-10">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Última atualização: <strong className="text-slate-700 dark:text-slate-300">24 Mai 2025</strong>
          </span>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Dados consolidados</span>
          </div>
        </div>
      </div>

      {/* 2. Fita de 7 Métricas: colapsado em 5 + botão "Ver mais cards" */}
      <ExpandableKpiHeader cards={visaoKpiCards} visibleCount={4} xlCols={6} />

      {/* 3. Segunda Fileira: Gráfico de Evolução (Linha) + Mapa Global da Rede + Cobertura por Região (Rosca) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Card 1: Evolução da Rede VILA (5 colunas) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 duration-200 flex flex-col justify-between">
          <div>
            {/* Header com Título e Dropdown de Período */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-700 relative">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Evolução da Rede VILA
              </h2>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  <span>{selectedPeriod === '5anos' ? 'Últimos 5 anos' : selectedPeriod === '3anos' ? 'Últimos 3 anos' : 'Ano atual'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </button>
                {isPeriodDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-20 py-1 text-xs">
                    <button
                      type="button"
                      onClick={() => { setSelectedPeriod('5anos'); setIsPeriodDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-[#1455AC] font-medium"
                    >
                      Últimos 5 anos
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedPeriod('3anos'); setIsPeriodDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-[#1455AC] font-medium"
                    >
                      Últimos 3 anos
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedPeriod('1ano'); setIsPeriodDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-[#1455AC] font-medium"
                    >
                      Ano atual
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Legenda com Marcadores de Cor */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3 pb-1 text-[11px] font-semibold">
              <div className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1455AC]" />
                <span>Membros</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span>Comunidades</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1455AC]" />
                <span>Territórios</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span>Países</span>
              </div>
            </div>

            {/* Gráfico SVG de Linha Interativo com Grid */}
            <div className="relative mt-2 h-44 sm:h-48 w-full">
              <svg viewBox="0 0 580 200" className="w-full h-full overflow-visible">
                {/* Gradientes de Área (estilo dashboard realista) */}
                <defs>
                  {[['membros', '#1455AC'], ['comunidades', '#10B981'], ['territorios', '#1455AC'], ['paises', '#F59E0B']].map(([key, color]) => (
                    <linearGradient key={`grad-${key}`} id={`vg-area-${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity="0.18" />
                      <stop offset="100%" stopColor={color} stopOpacity="0.01" />
                    </linearGradient>
                  ))}
                </defs>
                {/* Linhas de Grade Horizontais */}
                {[0, 750000, 1500000, 2250000, 3000000].map((val) => {
                  const y = chartPoints.scaleY(val);
                  return (
                    <g key={`grid-${val}`}>
                      <line
                        x1="40"
                        y1={y}
                        x2="560"
                        y2={y}
                        stroke="#F1F5F9"
                        strokeWidth="1"
                        strokeDasharray={val === 0 ? '0' : '2,2'}
                      />
                      <text
                        x="34"
                        y={y + 3.5}
                        textAnchor="end"
                        className="text-[10px] fill-slate-400 font-medium select-none"
                      >
                        {val === 3000000 ? '3M' : val === 2250000 ? '2.25M' : val === 1500000 ? '1.5M' : val === 750000 ? '750K' : '0'}
                      </text>
                    </g>
                  );
                })}

                {/* Eixo X: Anos */}
                {evolutionYears.map((year, idx) => {
                  const x = chartPoints.scaleX(idx);
                  return (
                    <text
                      key={`x-year-${year}`}
                      x={x}
                      y="196"
                      textAnchor="middle"
                      className={`text-[11px] select-none font-semibold ${hoveredDataYear === year ? 'fill-[#1455AC]' : 'fill-slate-500'}`}
                    >
                      {year}
                    </text>
                  );
                })}

                {/* Áreas preenchidas sob cada linha */}
                {(['membros', 'comunidades', 'territorios', 'paises'] as const).map((key) => (
                  <path
                    key={`area-${key}`}
                    d={`${chartPoints[`${key}Path` as keyof typeof chartPoints]} L 560 200 L 40 200 Z`}
                    fill={`url(#vg-area-${key})`}
                  />
                ))}

                {/* Linhas de Dados */}
                {/* 1. Membros (Roxo #1455AC) */}
                <path
                  d={chartPoints.membrosPath}
                  fill="none"
                  stroke="#1455AC"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {evolutionData.membros.map((val, idx) => {
                  const cx = chartPoints.scaleX(idx);
                  const cy = chartPoints.scaleY(val);
                  return (
                    <circle
                      key={`dot-membros-${idx}`}
                      cx={cx}
                      cy={cy}
                      r="3.8"
                      fill="#1455AC"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      className="cursor-pointer hover:r-5 transition-all"
                      onMouseEnter={() => setHoveredDataYear(evolutionYears[idx])}
                      onMouseLeave={() => setHoveredDataYear(null)}
                    />
                  );
                })}

                {/* 2. Comunidades (Verde #10B981) */}
                <path
                  d={chartPoints.comunidadesPath}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {evolutionData.comunidades.map((val, idx) => {
                  const cx = chartPoints.scaleX(idx);
                  const cy = chartPoints.scaleY(val);
                  return (
                    <circle
                      key={`dot-comunidades-${idx}`}
                      cx={cx}
                      cy={cy}
                      r="3.2"
                      fill="#10B981"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* 3. Territórios (Azul #1455AC) */}
                <path
                  d={chartPoints.territoriosPath}
                  fill="none"
                  stroke="#1455AC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {evolutionData.territorios.map((val, idx) => {
                  const cx = chartPoints.scaleX(idx);
                  const cy = chartPoints.scaleY(val);
                  return (
                    <circle
                      key={`dot-territorios-${idx}`}
                      cx={cx}
                      cy={cy}
                      r="3"
                      fill="#1455AC"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* 4. Países (Laranja #F59E0B) */}
                <path
                  d={chartPoints.paisesPath}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {evolutionData.paises.map((val, idx) => {
                  const cx = chartPoints.scaleX(idx);
                  const cy = chartPoints.scaleY(val);
                  return (
                    <circle
                      key={`dot-paises-${idx}`}
                      cx={cx}
                      cy={cy}
                      r="2.8"
                      fill="#F59E0B"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>

              {/* Tooltip no Hover do Ano (todas as 4 séries) */}
              {hoveredDataYear && (
                <div className="absolute top-2 right-4 bg-slate-900 text-white text-[11px] p-2 rounded-xl shadow-lg pointer-events-none space-y-0.5">
                  <div className="font-bold text-slate-200">Ano: {hoveredDataYear}</div>
                  <div className="text-blue-300">
                    Membros: {evolutionData.membros[evolutionYears.indexOf(hoveredDataYear)].toLocaleString('pt-PT')}
                  </div>
                  <div className="text-emerald-300">
                    Comunidades: {evolutionData.comunidades[evolutionYears.indexOf(hoveredDataYear)].toLocaleString('pt-PT')}
                  </div>
                  <div className="text-sky-300">
                    Territórios: {evolutionData.territorios[evolutionYears.indexOf(hoveredDataYear)].toLocaleString('pt-PT')}
                  </div>
                  <div className="text-amber-300">
                    Países: {evolutionData.paises[evolutionYears.indexOf(hoveredDataYear)].toLocaleString('pt-PT')}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rodapé do Card: Link para Ver Relatório */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateToTab('relatorios-dados')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1455AC] hover:text-blue-800 transition-colors cursor-pointer"
            >
              <span>Ver relatório completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Rede Global VILA (Mapa Cartográfico em Tons de Roxo) (4 colunas) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 duration-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-700">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Rede Global VILA
              </h2>
            </div>

            {/* Mapa Mundial em SVG */}
            <div className="relative mt-2 h-44 sm:h-48 w-full flex items-center justify-center">
              <svg viewBox="0 0 350 170" className="w-full h-full">
                {/* Países base em lavanda/roxo suave */}
                <g>
                  {countryPaths.map((p) => (
                    <path
                      key={p.id}
                      d={p.d}
                      fill={p.isHighlighted ? (isDark ? '#3B5C8F' : '#C4DAF3') : (isDark ? '#334155' : '#E2ECF9')}
                      stroke={isDark ? '#475569' : '#99C0EB'}
                      strokeWidth="0.45"
                      className="transition-colors hover:fill-blue-300 cursor-pointer"
                    />
                  ))}
                  {/* Fronteiras internacionais sutis */}
                  {bordersPath && (
                    <path
                      d={bordersPath}
                      fill="none"
                      stroke={isDark ? '#475569' : '#99C0EB'}
                      strokeWidth="0.35"
                    />
                  )}
                </g>

                {/* Hotspots de Presença Ativa da Rede VILA */}
                {hotspotScreenCoords.map((h) => (
                  <g
                    key={`map-hotspot-${h.id}`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredHotspot(h.name)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                  >
                    {h.pulsing && (
                      <circle
                        cx={h.x}
                        cy={h.y}
                        r={h.size + 4}
                        fill="#1455AC"
                        fillOpacity="0.25"
                        className="animate-ping"
                      />
                    )}
                    <circle
                      cx={h.x}
                      cy={h.y}
                      r={h.size / 2}
                      fill="#1455AC"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                    />
                    <circle
                      cx={h.x}
                      cy={h.y}
                      r={h.size / 4}
                      fill="#FFFFFF"
                    />
                  </g>
                ))}
              </svg>

              {/* Tooltip de Hotspot */}
              {hoveredHotspot && (
                <div className="absolute top-2 left-2 bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-md pointer-events-none font-semibold">
                  {hoveredHotspot}
                </div>
              )}
            </div>

            {/* Barra Gradiente de Menor/Maior Presença */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium px-1 mt-1">
              <span>Menor presença</span>
              <div className="h-2 w-28 rounded-full bg-gradient-to-r from-blue-200 via-blue-500 to-[#1455AC]" />
              <span>Maior presença</span>
            </div>
          </div>

          {/* Rodapé do Card: Link para Ver Mapa Interativo */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 flex justify-end mt-2">
            <button
              type="button"
              onClick={() => onNavigateToTab('territorios-paises')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1455AC] hover:text-blue-800 transition-colors cursor-pointer"
            >
              <span>Ver mapa interativo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Cobertura por Região (Gráfico de Rosca) (3 colunas) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 duration-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-700">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Cobertura por Região
              </h2>
            </div>

            {/* Rosca com Legenda Lateral */}
            <div className="flex items-center gap-4 mt-4">
              {/* Gráfico SVG de Rosca */}
              <div className="w-32 h-32 shrink-0 relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* África: 32% (stroke-dasharray 32 68) -> #1455AC */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#1455AC"
                    strokeWidth="16"
                    strokeDasharray="76.5 162.5"
                    strokeDashoffset="0"
                  />
                  {/* América do Sul: 24% (57.3) -> #1455AC */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#1455AC"
                    strokeWidth="16"
                    strokeDasharray="57.3 181.7"
                    strokeDashoffset="-76.5"
                  />
                  {/* Europa: 20% (47.8) -> #10B981 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="16"
                    strokeDasharray="47.8 191.2"
                    strokeDashoffset="-133.8"
                  />
                  {/* Ásia: 16% (38.2) -> #F59E0B */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="16"
                    strokeDasharray="38.2 200.8"
                    strokeDashoffset="-181.6"
                  />
                  {/* América do Norte: 8% (19.1) -> #5F9DE0 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#5F9DE0"
                    strokeWidth="16"
                    strokeDasharray="19.1 219.9"
                    strokeDashoffset="-219.8"
                  />
                </svg>
              </div>

              {/* Legenda com Cores e Percentuais */}
              <div className="space-y-2 text-xs flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1455AC]" />
                    <span>África</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-50">32%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1455AC]" />
                    <span>América do Sul</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-50">24%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span>Europa</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-50">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span>Ásia</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-50">16%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5F9DE0]" />
                    <span>América do Norte</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-50">8%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé do Card: Link para Ver Detalhamento Regional */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 flex justify-end mt-4">
            <button
              type="button"
              onClick={() => onNavigateToTab('territorios-paises')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1455AC] hover:text-blue-800 transition-colors cursor-pointer"
            >
              <span>Ver detalhamento regional</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Terceira Fileira: Ecossistema VILA + Organizações Parceiras + ODS + Principais Tendências */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Card 1: Ecossistema VILA */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 duration-200 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Ecossistema VILA
            </h2>
            <div className="space-y-3.5 mt-5">

              <div key="Municípios" className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 dark:bg-blue-500/10 text-blue-600">
                    <Building2 className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">Municípios</span>
                </div>
                <span className="text-sm font-bold text-[#0F172A] dark:text-slate-50 font-sans shrink-0">3.642</span>
              </div>

              <div key="Comunidades" className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Users className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">Comunidades</span>
                </div>
                <span className="text-sm font-bold text-[#0F172A] dark:text-slate-50 font-sans shrink-0">18.732</span>
              </div>

              <div key="Organizações" className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 dark:bg-blue-500/10 text-blue-600">
                    <Users className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">Organizações</span>
                </div>
                <span className="text-sm font-bold text-[#0F172A] dark:text-slate-50 font-sans shrink-0">1.248</span>
              </div>

              <div key="Parceiros Institucionais" className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-amber-50 dark:bg-amber-500/10 text-amber-500">
                    <Handshake className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">Parceiros Institucionais</span>
                </div>
                <span className="text-sm font-bold text-[#0F172A] dark:text-slate-50 font-sans shrink-0">342</span>
              </div>

              <div key="Eventos Realizados" className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 dark:bg-blue-500/10 text-blue-500">
                    <Calendar className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">Eventos Realizados</span>
                </div>
                <span className="text-sm font-bold text-[#0F172A] dark:text-slate-50 font-sans shrink-0">9.580</span>
              </div>

              <div key="Consultas Realizadas" className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 dark:bg-blue-500/10 text-blue-600">
                    <MessageSquare className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">Consultas Realizadas</span>
                </div>
                <span className="text-sm font-bold text-[#0F172A] dark:text-slate-50 font-sans shrink-0">1.156</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateToTab('utilizadores-comunidades')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F448A] hover:text-[#1455AC] transition-colors cursor-pointer"
            >
              <span>Ver ecossistema completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Organizações Parceiras (Rosca) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 duration-200 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Organizações Parceiras
            </h2>
            <div className="flex items-center gap-3.5 mt-5">
              {/* Rosca SVG */}
              <div className="w-28 h-28 shrink-0 relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* ONGs: 42% -> #10B981 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="15"
                    strokeDasharray="100.3 238.8"
                    strokeDashoffset="0"
                  />
                  {/* Instituições Públicas: 28% -> #1455AC */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#1455AC"
                    strokeWidth="15"
                    strokeDasharray="66.9 238.8"
                    strokeDashoffset="-100.3"
                  />
                  {/* Empresas: 20% -> #F58300 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#F58300"
                    strokeWidth="15"
                    strokeDasharray="47.8 238.8"
                    strokeDashoffset="-167.2"
                  />
                  {/* Academia: 10% -> #2D79D1 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#2D79D1"
                    strokeWidth="15"
                    strokeDasharray="23.9 238.8"
                    strokeDashoffset="-215.0"
                  />
                </svg>
              </div>

              {/* Legenda com percentuais */}
              <div className="space-y-2.5 text-xs flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span>ONGs</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-50">42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1455AC]" />
                    <span>Instituições Públicas</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-50">28%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F58300]" />
                    <span>Empresas</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-50">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2D79D1]" />
                    <span>Academia</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-50">10%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateToTab('parceiros-colaboracoes')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F448A] hover:text-[#1455AC] transition-colors cursor-pointer"
            >
              <span>Ver todas as organizações</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Objetivos de Desenvolvimento Sustentável (ODS) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 duration-200 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Objetivos de Desenvolvimento Sustentável
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Áreas com maior contribuição da rede VILA
            </p>

            {/* Grid com 3 cards em cima e 2 centralizados embaixo */}
            <div className="grid grid-cols-6 gap-x-2.5 gap-y-3 sm:gap-x-3 sm:gap-y-3.5 mt-4">
              {/* Linha de Cima: 3 Cards (col-span-2 cada) */}
              {/* ODS 11: Cidades Sustentáveis */}
              <div className="col-span-2 flex flex-col items-center">
                <div className="w-full aspect-square rounded-2xl bg-[#F58300] text-white p-2 sm:p-2.5 flex flex-col justify-between shadow-xs transition-transform hover:scale-105">
                  <div className="w-full flex items-start justify-between">
                    <span className="text-xs sm:text-sm font-black font-sans leading-none">11</span>
                    <span className="text-[6.5px] font-bold tracking-tight opacity-75 uppercase">ODS</span>
                  </div>
                  <div className="my-auto flex items-center justify-center">
                    <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 fill-white">
                      <path d="M4 14h6v14H4zM12 6h8v22h-8zM22 10h6v18h-6z" opacity="0.95" />
                      <rect x="6" y="16" width="2" height="2" fill="#F58300" />
                      <rect x="6" y="20" width="2" height="2" fill="#F58300" />
                      <rect x="6" y="24" width="2" height="2" fill="#F58300" />
                      <rect x="14" y="9" width="2" height="2" fill="#F58300" />
                      <rect x="14" y="13" width="2" height="2" fill="#F58300" />
                      <rect x="14" y="17" width="2" height="2" fill="#F58300" />
                      <rect x="14" y="21" width="2" height="2" fill="#F58300" />
                      <rect x="14" y="25" width="2" height="2" fill="#F58300" />
                      <rect x="17" y="9" width="2" height="2" fill="#F58300" />
                      <rect x="17" y="13" width="2" height="2" fill="#F58300" />
                      <rect x="17" y="17" width="2" height="2" fill="#F58300" />
                      <rect x="17" y="21" width="2" height="2" fill="#F58300" />
                      <rect x="17" y="25" width="2" height="2" fill="#F58300" />
                      <rect x="24" y="13" width="2" height="2" fill="#F58300" />
                      <rect x="24" y="17" width="2" height="2" fill="#F58300" />
                      <rect x="24" y="21" width="2" height="2" fill="#F58300" />
                      <rect x="24" y="25" width="2" height="2" fill="#F58300" />
                    </svg>
                  </div>
                </div>
                <div className="mt-1.5 text-center">
                  <div className="text-[10px] sm:text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-tight min-h-[30px] flex items-center justify-center">
                    Cidades e Comunidades
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-0.5">
                    26%
                  </div>
                </div>
              </div>

              {/* ODS 3: Saúde e Bem-Estar */}
              <div className="col-span-2 flex flex-col items-center">
                <div className="w-full aspect-square rounded-2xl bg-[#10B981] text-white p-2 sm:p-2.5 flex flex-col justify-between shadow-xs transition-transform hover:scale-105">
                  <div className="w-full flex items-start justify-between">
                    <span className="text-xs sm:text-sm font-black font-sans leading-none">3</span>
                    <span className="text-[6.5px] font-bold tracking-tight opacity-75 uppercase">ODS</span>
                  </div>
                  <div className="my-auto flex items-center justify-center">
                    <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 17h6l2.5-7 4 14 3.5-10 2 5 2.5-2h3" />
                      <path d="M25 12.5a2.5 2.5 0 0 1 4.2 1.8c0 2.2-3.2 4.7-4.2 5.5-.9-.8-4.2-3.3-4.2-5.5a2.5 2.5 0 0 1 4.2-1.8z" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                </div>
                <div className="mt-1.5 text-center">
                  <div className="text-[10px] sm:text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-tight min-h-[30px] flex items-center justify-center">
                    Saúde e Bem-Estar
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-0.5">
                    21%
                  </div>
                </div>
              </div>

              {/* ODS 13: Ação Climática */}
              <div className="col-span-2 flex flex-col items-center">
                <div className="w-full aspect-square rounded-2xl bg-[#15803D] text-white p-2 sm:p-2.5 flex flex-col justify-between shadow-xs transition-transform hover:scale-105">
                  <div className="w-full flex items-start justify-between">
                    <span className="text-xs sm:text-sm font-black font-sans leading-none">13</span>
                    <span className="text-[6.5px] font-bold tracking-tight opacity-75 uppercase">ODS</span>
                  </div>
                  <div className="my-auto flex items-center justify-center">
                    <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 16s5.5-8 14-8 14 8 14 8-5.5 8-14 8-14-8-14-8z" />
                      <circle cx="16" cy="16" r="5" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.8" />
                      <ellipse cx="16" cy="16" rx="2.2" ry="5" stroke="currentColor" strokeWidth="1.2" />
                      <line x1="11" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </div>
                </div>
                <div className="mt-1.5 text-center">
                  <div className="text-[10px] sm:text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-tight min-h-[30px] flex items-center justify-center">
                    Ação Climática
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-0.5">
                    18%
                  </div>
                </div>
              </div>

              {/* Linha de Baixo: 2 Cards centralizados (col-start-2 e col-span-2) */}
              {/* ODS 4: Educação de Qualidade */}
              <div className="col-start-2 col-span-2 flex flex-col items-center">
                <div className="w-full aspect-square rounded-2xl bg-[#DC2626] text-white p-2 sm:p-2.5 flex flex-col justify-between shadow-xs transition-transform hover:scale-105">
                  <div className="w-full flex items-start justify-between">
                    <span className="text-xs sm:text-sm font-black font-sans leading-none">4</span>
                    <span className="text-[6.5px] font-bold tracking-tight opacity-75 uppercase">ODS</span>
                  </div>
                  <div className="my-auto flex items-center justify-center">
                    <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 8c4-1 9 0 10 3v13c-2-1-6-2-10-1V8z" fill="currentColor" fillOpacity="0.2" />
                      <path d="M24 8c-4-1-9 0-10 3v13c2-1 6-2 10-1V8z" fill="currentColor" fillOpacity="0.2" />
                      <path d="M14 11c1-3 6-4 10-3v15c-4-1-8 0-10 1" />
                      <path d="M14 11c-1-3-6-4-10-3v15c4-1 8 0 10 1" />
                      <path d="M27 7l2 2-7 7-2-2 7-7z" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                </div>
                <div className="mt-1.5 text-center">
                  <div className="text-[10px] sm:text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-tight min-h-[30px] flex items-center justify-center">
                    Educação de Qualidade
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-0.5">
                    15%
                  </div>
                </div>
              </div>

              {/* ODS 17: Parcerias */}
              <div className="col-span-2 flex flex-col items-center">
                <div className="w-full aspect-square rounded-2xl bg-[#1E3A8A] text-white p-2 sm:p-2.5 flex flex-col justify-between shadow-xs transition-transform hover:scale-105">
                  <div className="w-full flex items-start justify-between">
                    <span className="text-xs sm:text-sm font-black font-sans leading-none">17</span>
                    <span className="text-[6.5px] font-bold tracking-tight opacity-75 uppercase">ODS</span>
                  </div>
                  <div className="my-auto flex items-center justify-center">
                    <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 text-white" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="16" cy="11" r="5.2" />
                      <circle cx="20.3" cy="13.5" r="5.2" />
                      <circle cx="20.3" cy="18.5" r="5.2" />
                      <circle cx="16" cy="21" r="5.2" />
                      <circle cx="11.7" cy="18.5" r="5.2" />
                      <circle cx="11.7" cy="13.5" r="5.2" />
                    </svg>
                  </div>
                </div>
                <div className="mt-1.5 text-center">
                  <div className="text-[10px] sm:text-[11px] font-medium text-slate-700 dark:text-slate-300 leading-tight min-h-[30px] flex items-center justify-center">
                    Parcerias e Meios
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-0.5">
                    10%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateToTab('projetos-iniciativas')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F448A] hover:text-[#1455AC] transition-colors cursor-pointer"
            >
              <span>Ver contribuição completa aos ODS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

        {/* Card 4: Principais Tendências da Rede */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 duration-200 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Principais Tendências da Rede
            </h2>
            <div className="space-y-3.5 mt-4">
              {/* Tendência 1 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50">Expansão global contínua</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                    A rede VILA cresceu 18% no último ano, com destaque para a América Latina e África.
                  </p>
                </div>
              </div>

              {/* Tendência 2 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Sprout className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50">Municípios cada vez mais ativos</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                    A participação dos municípios aumentou 31%, impulsionando projetos locais.
                  </p>
                </div>
              </div>

              {/* Tendência 3 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50">Sustentabilidade em destaque</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                    Projetos ligados ao ODS 11, 13 e 3 lideram em número e impacto.
                  </p>
                </div>
              </div>

              {/* Tendência 4 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50">Fortalecimento de parcerias</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                    Novas parcerias estratégicas aumentaram 27% desde o início do ano.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateToTab('relatorios-dados')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F448A] hover:text-[#1455AC] transition-colors cursor-pointer"
            >
              <span>Ver todas as tendências</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      {/* 5. Quarta Fileira: Impacto Global da Rede + Próximos Eventos Globais + Parceiros em Destaque */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Card 1: Impacto Global da Rede (4 colunas) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 duration-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-700">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Impacto Global da Rede
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Pessoas Alcançadas */}
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Pessoas Alcançadas</div>
                <div className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-slate-50 font-sans">2,8M+</div>
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">↑ 22%</div>
              </div>

              {/* Projetos Implementados */}
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Projetos Implementados</div>
                <div className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-slate-50 font-sans">5.430</div>
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">↑ 17%</div>
              </div>

              {/* Países com Projetos Ativos */}
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Países com Projetos Ativos</div>
                <div className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-slate-50 font-sans">123</div>
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">↑ 12%</div>
              </div>

              {/* Investimento Mobilizado */}
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Coins className="w-4 h-4" />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Investimento Mobilizado</div>
                <div className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-slate-50 font-sans">€98M+</div>
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">↑ 19%</div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 flex justify-end mt-4">
            <button
              type="button"
              onClick={() => onNavigateToTab('relatorios-dados')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1455AC] hover:text-blue-800 transition-colors cursor-pointer"
            >
              <span>Ver relatório de impacto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Próximos Eventos Globais (4 colunas) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 duration-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-700">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Próximos Eventos Globais
              </h2>
            </div>
            <div className="space-y-3.5 mt-3.5">
              {/* Evento 1 */}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-800/40 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-blue-700 font-sans leading-none">26</span>
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider mt-0.5">MAI</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 truncate">Fórum Global de Comunidades</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:text-emerald-400 shrink-0">
                      Ao vivo
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5 line-clamp-1">
                    Encontro anual de líderes comunitários da rede VILA.
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>Lisboa, Portugal</span>
                  </div>
                </div>
              </div>

              {/* Evento 2 */}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-800/40 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-blue-700 font-sans leading-none">02</span>
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider mt-0.5">JUN</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 truncate">Semana da Sustentabilidade</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 shrink-0">
                      Em breve
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5 line-clamp-1">
                    Ações globais para um futuro sustentável.
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>Online</span>
                  </div>
                </div>
              </div>

              {/* Evento 3 */}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-800/40 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-blue-700 font-sans leading-none">15</span>
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider mt-0.5">JUN</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 truncate">Cimeira de Inovação Social</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 shrink-0">
                      Inscrições abertas
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5 line-clamp-1">
                    Conectando ideias e soluções para transformar territórios.
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>Nairóbi, Quênia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 flex justify-end mt-4">
            <button
              type="button"
              onClick={() => onNavigateToTab('eventos-globais-admin')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1455AC] hover:text-blue-800 transition-colors cursor-pointer"
            >
              <span>Ver todos os eventos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Parceiros em Destaque (4 colunas) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 duration-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-700">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Parceiros em Destaque
              </h2>
            </div>
            {/* Logos Vetoriais dos Parceiros em 2 fileiras (3 em cima, 2 centralizados embaixo) para evitar cortes em telas menores */}
            <div className="grid grid-cols-6 gap-x-3 gap-y-4 py-4 px-1 items-center">
              {/* Linha de Cima: 3 Logos */}
              {/* UN / Nações Unidas */}
              <div className="col-span-2 h-11 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity" title="Nações Unidas">
                <svg viewBox="0 0 50 50" className="h-9 w-9">
                  <circle cx="25" cy="25" r="23" fill="#1E3A8A" />
                  <circle cx="25" cy="25" r="14" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
                  <path d="M25 11 v28 M11 25 h28 M15 15 l20 20 M15 35 l20 -20" stroke="#FFFFFF" strokeWidth="0.8" />
                  <path d="M14 36 C10 30 10 20 16 14 C18 20 18 30 14 36 Z M36 36 C40 30 40 20 34 14 C32 20 32 30 36 36 Z" fill="#FFFFFF" opacity="0.8" />
                </svg>
              </div>

              {/* UNESCO */}
              <div className="col-span-2 h-11 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity" title="UNESCO">
                <svg viewBox="0 0 80 40" className="h-8 w-16">
                  <path d="M10 12 L40 4 L70 12 H10 Z" fill="#1455AC" />
                  <rect x="14" y="14" width="6" height="18" fill="#1455AC" />
                  <rect x="26" y="14" width="6" height="18" fill="#1455AC" />
                  <rect x="38" y="14" width="6" height="18" fill="#1455AC" />
                  <rect x="50" y="14" width="6" height="18" fill="#1455AC" />
                  <rect x="62" y="14" width="6" height="18" fill="#1455AC" />
                  <rect x="8" y="33" width="66" height="4" fill="#1455AC" />
                </svg>
              </div>

              {/* ICLEI */}
              <div className="col-span-2 h-11 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity" title="ICLEI">
                <span className="font-sans font-bold text-xl tracking-tight text-[#059669]">
                  ICLEI
                </span>
              </div>

              {/* Linha de Baixo: 2 Logos Centralizados */}
              {/* WHO / OMS */}
              <div className="col-start-2 col-span-2 h-11 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity" title="Organização Mundial da Saúde">
                <div className="flex items-center gap-1.5 text-[#0F448A]">
                  <svg viewBox="0 0 30 30" className="w-7 h-7 fill-current shrink-0">
                    <circle cx="15" cy="15" r="13" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M15 6 v18 M12 11 c3 -2 3 4 0 6 c3 2 3 8 0 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <div className="text-[9px] font-bold uppercase leading-tight">
                    World Health<br />Organization
                  </div>
                </div>
              </div>

              {/* Google.org */}
              <div className="col-span-2 h-11 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity" title="Google.org">
                <span className="font-sans font-bold text-base text-slate-800 dark:text-slate-100 whitespace-nowrap">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                  <span className="text-slate-500 dark:text-slate-400 font-normal text-sm">.org</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 flex justify-end mt-4">
            <button
              type="button"
              onClick={() => onNavigateToTab('parceiros-colaboracoes')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1455AC] hover:text-blue-800 transition-colors cursor-pointer"
            >
              <span>Ver todos os parceiros</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
