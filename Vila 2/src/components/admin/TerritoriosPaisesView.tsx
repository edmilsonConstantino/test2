import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  GlobeAltIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  FlagIcon,
  PlusCircleIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import {
  Globe,
  MapPin,
  Building2,
  Flag,
  PlusCircle,
  PieChart,
  Calendar,
  Download,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  RefreshCw,
  Search,
  ShieldCheck,
  TrendingUp,
  X,
  CheckCircle2,
  Activity,
  Layers,
  Edit3,
  Users,
  Compass,
  FileSpreadsheet,
  FileText,
  Copy,
  Info,
} from 'lucide-react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import { DemoUser } from '../../data/demoUsers';
import { BreadcrumbItem } from '../Topbar';
import { ExpandableKpiHeader, KpiCardData } from './ExpandableKpiHeader';
import { LineChart, VerticalBars } from './MiniCharts';

interface TerritoriosPaisesViewProps {
  currentUser: DemoUser;
  onNavigateToTab: (tabId: string) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
  onOpenSupportModal?: () => void;
}

// -----------------------------------------------------------------------------
// Modelos e Tipos
// -----------------------------------------------------------------------------
export interface KPIItem {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendPeriod: string;
  icon: 'globe' | 'mappin' | 'building' | 'flag' | 'plus' | 'pie';
  bgClass: string;
  iconClass: string;
}

export interface TerritoryGrowthRow {
  id: string;
  territory: string;
  country: string;
  type: string;
  growth: string;
  status: 'Ativo' | 'Pendente' | 'Em Validação';
}

export interface TerritoryActivityRow {
  level: 'Elevado' | 'Médio' | 'Baixo' | 'Inativo';
  count: string;
  percentage: string;
  variation: string;
  isPositive: boolean;
  color: string;
}

export interface CountryExplorerRow {
  id: string;
  flag: string;
  name: string;
  continent: string;
  activeTerritories: number;
  municipalities: number;
  coverage: string;
  status: 'Ativo' | 'Em Expansão' | 'Inicial';
}

// -----------------------------------------------------------------------------
// Dados Padrão (Fieis à UI de Referência TERRITÓRIOS E PAÍSES)
// -----------------------------------------------------------------------------
const DEFAULT_KPIS: KPIItem[] = [
  {
    id: 'kpi-paises',
    label: 'Países na Plataforma',
    value: '156',
    trend: '↑ 8%',
    trendPeriod: 'desde o ano passado',
    icon: 'globe',
    bgClass: 'bg-amber-50/90 text-amber-600 dark:text-amber-400 border-amber-100/70 dark:border-amber-800/40 border',
    iconClass: 'text-amber-600 dark:text-amber-400',
  },
  {
    id: 'kpi-regioes',
    label: 'Regiões Ativas',
    value: '324',
    trend: '↑ 10%',
    trendPeriod: 'desde o ano passado',
    icon: 'mappin',
    bgClass: 'bg-emerald-50/90 text-emerald-600 dark:text-emerald-400 border-emerald-100/70 dark:border-emerald-800/40 border',
    iconClass: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'kpi-municipios',
    label: 'Municípios Ativos',
    value: '3.642',
    trend: '↑ 12%',
    trendPeriod: 'desde o ano passado',
    icon: 'building',
    bgClass: 'bg-blue-50/90 text-[#1455AC] border-blue-100/70 dark:border-blue-800/40 border',
    iconClass: 'text-[#1455AC]',
  },
  {
    id: 'kpi-territorios',
    label: 'Territórios Registados',
    value: '5.964',
    trend: '↑ 14%',
    trendPeriod: 'desde o ano passado',
    icon: 'flag',
    bgClass: 'bg-blue-50/90 text-[#1455AC] border-blue-100/70 dark:border-blue-800/40 border',
    iconClass: 'text-[#1455AC]',
  },
  {
    id: 'kpi-novos-territorios',
    label: 'Novos Territórios (30 dias)',
    value: '128',
    trend: '↑ 36%',
    trendPeriod: 'desde o período anterior',
    icon: 'plus',
    bgClass: 'bg-emerald-50/90 text-emerald-600 dark:text-emerald-400 border-emerald-100/70 dark:border-emerald-800/40 border',
    iconClass: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'kpi-cobertura',
    label: 'Cobertura Global',
    value: '78%',
    trend: 'dos países do mundo',
    trendPeriod: '156 de 195 nações',
    icon: 'pie',
    bgClass: 'bg-blue-50/90 text-[#1455AC] border-blue-100/70 dark:border-blue-800/40 border',
    iconClass: 'text-[#1455AC]',
  },
];

const DEFAULT_GROWTH_TABLE: TerritoryGrowthRow[] = [
  { id: '1', territory: 'Município de Nampula', country: 'Moçambique', type: 'Município', growth: '↑ 48%', status: 'Ativo' },
  { id: '2', territory: 'Região de Valparaíso', country: 'Chile', type: 'Região', growth: '↑ 42%', status: 'Ativo' },
  { id: '3', territory: 'Distrito de Huambo', country: 'Angola', type: 'Distrito', growth: '↑ 35%', status: 'Ativo' },
  { id: '4', territory: 'Município de Joinville', country: 'Brasil', type: 'Município', growth: '↑ 31%', status: 'Ativo' },
  { id: '5', territory: 'Região de Coimbra', country: 'Portugal', type: 'Região', growth: '↑ 28%', status: 'Ativo' },
];

const DEFAULT_ACTIVITY_TABLE: TerritoryActivityRow[] = [
  { level: 'Elevado', count: '1.856', percentage: '51%', variation: '↑ 12%', isPositive: true, color: '#16A34A' },
  { level: 'Médio', count: '1.248', percentage: '34%', variation: '↑ 8%', isPositive: true, color: '#D97706' },
  { level: 'Baixo', count: '428', percentage: '12%', variation: '↓ 5%', isPositive: false, color: '#F58300' },
  { level: 'Inativo', count: '110', percentage: '3%', variation: '↓ 2%', isPositive: false, color: '#94A3B8' },
];

const DEFAULT_COUNTRIES: CountryExplorerRow[] = [
  { id: 'pt', flag: '🇵🇹', name: 'Portugal', continent: 'Europa', activeTerritories: 308, municipalities: 278, coverage: '100%', status: 'Ativo' },
  { id: 'br', flag: '🇧🇷', name: 'Brasil', continent: 'América do Sul', activeTerritories: 275, municipalities: 1245, coverage: '92%', status: 'Ativo' },
  { id: 'es', flag: '🇪🇸', name: 'Espanha', continent: 'Europa', activeTerritories: 210, municipalities: 412, coverage: '98%', status: 'Ativo' },
  { id: 'mz', flag: '🇲🇿', name: 'Moçambique', continent: 'África', activeTerritories: 168, municipalities: 128, coverage: '85%', status: 'Ativo' },
  { id: 'fr', flag: '🇫🇷', name: 'França', continent: 'Europa', activeTerritories: 128, municipalities: 356, coverage: '90%', status: 'Ativo' },
  { id: 'ao', flag: '🇦🇴', name: 'Angola', continent: 'África', activeTerritories: 152, municipalities: 114, coverage: '82%', status: 'Ativo' },
  { id: 'mx', flag: '🇲🇽', name: 'México', continent: 'América do Norte', activeTerritories: 118, municipalities: 245, coverage: '75%', status: 'Ativo' },
  { id: 'co', flag: '🇨🇴', name: 'Colômbia', continent: 'América do Sul', activeTerritories: 110, municipalities: 198, coverage: '78%', status: 'Ativo' },
  { id: 'de', flag: '🇩🇪', name: 'Alemanha', continent: 'Europa', activeTerritories: 96, municipalities: 210, coverage: '84%', status: 'Ativo' },
  { id: 'it', flag: '🇮🇹', name: 'Itália', continent: 'Europa', activeTerritories: 88, municipalities: 184, coverage: '80%', status: 'Ativo' },
];

const TOP_COUNTRIES_BARS = [
  { name: 'Portugal', value: 308, max: 350 },
  { name: 'Brasil', value: 275, max: 350 },
  { name: 'Espanha', value: 210, max: 350 },
  { name: 'Moçambique', value: 168, max: 350 },
  { name: 'Angola', value: 152, max: 350 },
  { name: 'França', value: 128, max: 350 },
  { name: 'México', value: 118, max: 350 },
  { name: 'Colômbia', value: 110, max: 350 },
  { name: 'Alemanha', value: 96, max: 350 },
  { name: 'Itália', value: 88, max: 350 },
];

const CONTINENT_PRESENCE = [
  { name: 'Europa', percent: 94 },
  { name: 'América do Sul', percent: 86 },
  { name: 'África', percent: 62 },
  { name: 'América do Norte', percent: 58 },
  { name: 'Ásia', percent: 51 },
  { name: 'Oceânia', percent: 38 },
];

const NEW_TERRITORIES_BY_CONTINENT = [
  { continent: 'América do Sul', value: 58 },
  { continent: 'África', value: 34 },
  { continent: 'Europa', value: 18 },
  { continent: 'Ásia', value: 12 },
  { continent: 'América do Norte', value: 4 },
  { continent: 'Oceânia', value: 2 },
];

export const TerritoriosPaisesView: React.FC<TerritoriosPaisesViewProps> = ({
  currentUser: _currentUser,
  onNavigateToTab,
  onBreadcrumbChange,
  onOpenSupportModal: _onOpenSupportModal,
}) => {
  // Breadcrumb synchronization
  const onBreadcrumbChangeRef = useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;
  const onNavigateToTabRef = useRef(onNavigateToTab);
  onNavigateToTabRef.current = onNavigateToTab;

  useEffect(() => {
    onBreadcrumbChangeRef.current?.([
      { label: 'Plataforma VILA', onClick: () => onNavigateToTabRef.current('painel-gestao') },
      { label: 'Territórios e Países' },
    ]);
  }, []);

  // Estados locais
  const [kpis] = useState<KPIItem[]>(DEFAULT_KPIS);
  const [selectedDateRange, setSelectedDateRange] = useState('01 Mai 2024 - 24 Mai 2025');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState('10:32');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filtros da tabela de países
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [selectedContinentFilter, setSelectedContinentFilter] = useState('all');

  // Modais
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeDetailModal, setActiveDetailModal] = useState<string | null>(null);
  const [timeGrowthFilter, setTimeGrowthFilter] = useState('Últimos 12 meses');

  // Hover interactivo para gráficos
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      const formatted = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setLastUpdateTime(formatted);
      setIsRefreshing(false);
      showToast('Dados territoriais e globais sincronizados com sucesso!');
    }, 600);
  };

  // Filtragem da tabela Explorar Países
  const filteredCountries = useMemo(() => {
    return DEFAULT_COUNTRIES.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(countrySearchTerm.toLowerCase()) ||
        c.continent.toLowerCase().includes(countrySearchTerm.toLowerCase());
      const matchesContinent =
        selectedContinentFilter === 'all' || c.continent.toLowerCase() === selectedContinentFilter.toLowerCase();
      return matchesSearch && matchesContinent;
    });
  }, [countrySearchTerm, selectedContinentFilter]);

  // Projeção D3 Natural Earth para o mapa mundial temático
  const worldPaths = useMemo(() => {
    const proj = geoNaturalEarth1().scale(62).translate([200, 110]);
    const pathGen = geoPath(proj);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topology = worldData as any;
    const countriesFeature = feature(topology, topology.objects.countries);

    // Identificação de coloração de presença
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ((countriesFeature as any).features || [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((f: any) => {
        const name = f.properties?.name;
        const id = f.id !== undefined && f.id !== null ? String(f.id) : '';
        return name !== 'Antarctica' && name !== 'Fr. S. Antarctic Lands' && id !== '010' && id !== '10' && id !== 'ATA';
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((f: any, index: number) => {
        const d = pathGen(f);
        if (!d) return null;
        const name = f.properties?.name || '';
        
        // Cores de presença da legenda
        // Presença Elevada: #1455AC
        // Presença Média: #5F9DE0
        // Presença Baixa: #99C0EB
        // Exploração Inicial: #C4DAF3
        // Sem Presença: #F1F5F9
        let fill = '#99C0EB';
        let category = 'Presença Baixa';

        if (['Portugal', 'Spain', 'France', 'Brazil', 'Mozambique', 'Angola'].includes(name)) {
          fill = '#1455AC';
          category = 'Presença Elevada';
        } else if (['Germany', 'Italy', 'United Kingdom', 'Mexico', 'Colombia', 'Chile', 'Argentina', 'South Africa'].includes(name)) {
          fill = '#5F9DE0';
          category = 'Presença Média';
        } else if (['United States of America', 'Canada', 'India', 'Japan', 'Australia', 'Kenya', 'Morocco'].includes(name)) {
          fill = '#C4DAF3';
          category = 'Exploração Inicial';
        } else if (['Russia', 'China', 'Mongolia', 'Kazakhstan', 'Saudi Arabia'].includes(name)) {
          fill = '#F1F5F9';
          category = 'Sem Presença';
        }

        const uniqueId = `tp-country-${f.id !== undefined && f.id !== null && String(f.id) !== 'undefined' ? f.id : (name ? name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() : 'feat')}-${index}`;
        return {
          id: uniqueId,
          name,
          category,
          d,
          fill,
        };
      })
      .filter(Boolean);
  }, []);

  // Dados para o Gráfico de Crescimento de Territórios (Linha Multi-Série)
  const growthMonths = ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Mar', 'Abr', 'Mai'];
  const municipiosPoints = [2100, 2400, 2480, 2800, 3100, 3400, 3700, 3800, 4200, 4500, 4750];
  const territoriosPoints = [1100, 1300, 1450, 1600, 1800, 2200, 2300, 2500, 2600, 2900, 3100];
  const regioesPoints = [200, 250, 280, 320, 350, 400, 420, 450, 520, 560, 600];

  // Cards do cabeçalho expansível (sparks de 12 pontos para micro-tendência)
  const kpiCards: KpiCardData[] = useMemo(
    () =>
      kpis.map((kpi, idx) => ({
        id: kpi.id,
        label: kpi.label,
        value: kpi.value,
        trend: kpi.trend,
        trendPeriod: kpi.trendPeriod,
        trendClassName:
          kpi.id === 'kpi-cobertura'
            ? 'text-blue-700 bg-blue-50 dark:bg-blue-500/10 border border-blue-200/70'
            : 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/70',
        icon:
          kpi.icon === 'globe' ? (
            <GlobeAltIcon className="w-4 h-4" />
          ) : kpi.icon === 'mappin' ? (
            <MapPinIcon className="w-4 h-4" />
          ) : kpi.icon === 'building' ? (
            <BuildingOffice2Icon className="w-4 h-4" />
          ) : kpi.icon === 'flag' ? (
            <FlagIcon className="w-4 h-4" />
          ) : kpi.icon === 'plus' ? (
            <PlusCircleIcon className="w-4 h-4" />
          ) : (
            <ChartPieIcon className="w-4 h-4" />
          ),
        bgClass: kpi.bgClass,
        iconClass: kpi.iconClass,
        spark: [
          20 + idx, 26 + idx, 22 + idx, 30 + idx, 28 + idx, 34 + idx,
          32 + idx, 40 + idx, 38 + idx, 46 + idx, 44 + idx, 52 + idx,
        ],
      })),
    [kpis]
  );

  const growthSeries = useMemo(
    () => [
      { name: 'Municípios', color: '#1455AC', values: municipiosPoints },
      { name: 'Territórios', color: '#10B981', values: territoriosPoints },
      { name: 'Regiões', color: '#0F448A', values: regioesPoints },
    ],
    []
  );

  return (
    <div className="w-full max-w-[1600px] mx-auto px-3.5 sm:px-5 lg:px-6 py-4 sm:py-6 space-y-5 lg:space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0F172A] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HEADER DA PÁGINA (Compacto, elegante e proporcional)                   */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-700">
        {/* Esquerda: Ícone Reduzido + Título + Subtítulo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#E2ECF9] border border-blue-200/60 flex items-center justify-center text-[#1455AC] shrink-0 shadow-2xs">
            <Globe className="w-5 h-5 text-[#1455AC]" strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-slate-50 font-sans tracking-tight leading-tight">
              Territórios e Países
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5 max-w-xl">
              Gestão e monitorização da presença territorial global da rede VILA.
            </p>
          </div>
        </div>

        {/* Direita: Controles e Indicadores de Telemetria alinhados horizontalmente */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Seletor de Data */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>{selectedDateRange}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500" />
            </button>
            {isDateDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-60 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-30 py-1 text-xs">
                <div className="px-3 py-1.5 font-bold text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-wider border-b border-slate-200/70 dark:border-slate-700">
                  Período de Análise
                </div>
                {[
                  '01 Mai 2024 - 24 Mai 2025',
                  'Últimos 30 dias',
                  'Últimos 90 dias',
                  'Últimos 12 meses',
                  'Ano de 2025',
                  'Todo o histórico',
                ].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setSelectedDateRange(p);
                      setIsDateDropdownOpen(false);
                      showToast(`Período alterado para: ${p}`);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors flex items-center justify-between ${
                      selectedDateRange === p ? 'text-[#1455AC] font-bold bg-blue-50/50' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{p}</span>
                    {selectedDateRange === p && <CheckCircle2 className="w-3.5 h-3.5 text-[#1455AC]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Botão Exportar */}
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Exportar</span>
          </button>

          {/* Botão Filtros (Roxo Sólido) */}
          <button
            type="button"
            onClick={() => setIsFilterModalOpen(true)}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-xs font-bold text-white bg-[#1455AC] hover:bg-[#0F448A] shadow-xs transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-white" />
            <span>Filtros</span>
          </button>

          {/* Indicadores de Telemetria */}
          <div className="flex flex-col justify-center text-[11px] text-slate-600 dark:text-slate-400 pl-1 space-y-0.5 border-l border-slate-200/80 dark:border-slate-700 pl-2.5 ml-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
              <span className="whitespace-nowrap text-slate-600 dark:text-slate-400">
                Atualizado: <strong className="font-semibold text-slate-800 dark:text-slate-100">{lastUpdateTime}</strong>
              </span>
              <button
                type="button"
                onClick={handleManualRefresh}
                className="text-slate-400 dark:text-slate-500 hover:text-[#1455AC] transition-colors p-0.5 rounded cursor-pointer"
                title="Atualizar dados agora"
              >
                <RefreshCw className={`w-2.5 h-2.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0 animate-pulse" />
              <span className="font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                Tempo real
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP KPI ROW: colapsado em 5 + botão "Ver mais cards" (6 no total)      */}
      {/* ========================================================================= */}
      <ExpandableKpiHeader
        cards={kpiCards}
        visibleCount={5}
        xlCols={6}
        onOpenDetail={(label) => setActiveDetailModal(label)}
      />

      {/* ========================================================================= */}
      {/* 3. ROW 1: MAPA GLOBAL + CRESCIMENTO LINHA + TOP 10 PAÍSES                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Card 1: Presença Global da VILA (5 colunas no desktop) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans">
                Presença Global da VILA
              </h2>
            </div>

            {/* Legenda de Presença */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 dark:text-slate-400 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#1455AC]" />
                <span>Presença Elevada</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#5F9DE0]" />
                <span>Presença Média</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#99C0EB]" />
                <span>Presença Baixa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#C4DAF3]" />
                <span>Exploração Inicial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#F1F5F9] border border-slate-200 dark:border-slate-700" />
                <span>Sem Presença</span>
              </div>
            </div>

            {/* Mapa Mundial Temático Vetorial */}
            <div className="relative w-full h-44 sm:h-52 bg-slate-50/50 dark:bg-slate-800/60 rounded-xl border border-slate-100/80 dark:border-slate-800 overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 400 210" className="w-full h-full">
                <g>
                  {worldPaths.map((p) => (
                    <path
                      key={p.id}
                      d={p.d}
                      fill={p.fill}
                      stroke="#FFFFFF"
                      strokeWidth="0.4"
                      className="transition-colors hover:opacity-85 cursor-pointer"
                      onClick={() => showToast(`Região selecionada: ${p.name} (${p.category})`)}
                    >
                      <title>{`${p.name} - ${p.category}`}</title>
                    </path>
                  ))}
                </g>
              </svg>
            </div>

            {/* Continentes com maior presença */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-700">
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Continentes com maior presença
              </p>
              <div className="space-y-1.5">
                {CONTINENT_PRESENCE.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between text-xs hover:bg-blue-50/50 px-1 py-0.5 rounded transition-colors cursor-pointer"
                    onMouseEnter={() => setHoveredContinent(c.name)}
                    onMouseLeave={() => setHoveredContinent(null)}
                    onClick={() => {
                      setSelectedContinentFilter(c.name);
                      showToast(`Filtrando tabela por: ${c.name}`);
                    }}
                  >
                    <span className="text-slate-600 dark:text-slate-400 font-medium w-28 shrink-0">{c.name}</span>
                    <div className="flex-1 mx-2.5 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          hoveredContinent === c.name ? 'bg-[#0F448A]' : 'bg-[#1455AC]'
                        }`}
                        style={{ width: `${c.percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50 font-mono w-9 text-right">
                      {c.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateToTab('explorar')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver mapa interativo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Crescimento de Territórios (4 colunas no desktop) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans">
                Crescimento de Territórios
              </h2>
              <div className="relative">
                <select
                  value={timeGrowthFilter}
                  onChange={(e) => {
                    setTimeGrowthFilter(e.target.value);
                    showToast(`Período do gráfico: ${e.target.value}`);
                  }}
                  className="text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 rounded-lg px-2 py-1 pr-6 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400"
                >
                  <option>Últimos 12 meses</option>
                  <option>Últimos 6 meses</option>
                  <option>Ano de 2025</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500 absolute right-1.5 top-2 pointer-events-none" />
              </div>
            </div>

            {/* Legenda do Gráfico de Linha */}
            <div className="flex items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1455AC]" />
                <span>Municípios</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span>Territórios</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F448A]" />
                <span>Regiões</span>
              </div>
            </div>

            {/* Gráfico de Linhas realista (grelha, eixos e pontos) */}
            <div
              className="relative w-full pt-2 cursor-crosshair"
              onMouseLeave={() => setHoveredMonthIndex(null)}
              onMouseMove={(e) => {
                const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                const relX = (e.clientX - rect.left) / rect.width;
                setHoveredMonthIndex(
                  Math.min(growthMonths.length - 1, Math.max(0, Math.round(relX * (growthMonths.length - 1))))
                );
              }}
            >
              <LineChart
                series={growthSeries}
                labels={growthMonths}
                height={190}
                yTicks={4}
                formatY={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v))}
              />

              {/* Tooltip Dinâmico ao passar o cursor no mês */}
              {hoveredMonthIndex !== null && (
                <div
                  className="absolute bg-[#0F172A] text-white text-[11px] p-2 rounded-lg shadow-lg pointer-events-none z-20"
                  style={{ left: '12px', top: '18px' }}
                >
                  <p className="font-bold border-b border-slate-700 pb-1 text-blue-200">
                    Mês: {growthMonths[hoveredMonthIndex]}
                  </p>
                  <p className="mt-1">Municípios: <strong className="text-white">{municipiosPoints[hoveredMonthIndex]}</strong></p>
                  <p>Territórios: <strong className="text-emerald-400">{territoriosPoints[hoveredMonthIndex]}</strong></p>
                  <p>Regiões: <strong className="text-blue-400">{regioesPoints[hoveredMonthIndex]}</strong></p>
                </div>
              )}
            </div>
          </div>

          {/* Rodapé */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('Gerando relatório completo de crescimento territorial...')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver relatório completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Top 10 Países por Territórios Ativos (3 colunas no desktop) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div>
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans mb-3">
              Top 10 Países por Territórios Ativos
            </h2>

            {/* Lista com Barras Horizontais */}
            <div className="space-y-2 mt-1">
              {TOP_COUNTRIES_BARS.map((item) => {
                const percent = Math.round((item.value / item.max) * 100);
                return (
                  <div
                    key={item.name}
                    onClick={() => {
                      setCountrySearchTerm(item.name);
                      showToast(`Filtrando tabela para: ${item.name}`);
                    }}
                    className="flex items-center justify-between text-xs hover:bg-blue-50/50 p-1 rounded transition-colors cursor-pointer group"
                  >
                    <span className="text-slate-700 dark:text-slate-300 font-medium w-24 shrink-0 truncate group-hover:text-[#1455AC]">
                      {item.name}
                    </span>
                    <div className="flex-1 mx-2.5 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1455AC] rounded-full group-hover:bg-[#0F448A] transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50 font-mono w-7 text-right">
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rodapé */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setSelectedContinentFilter('all');
                setCountrySearchTerm('');
                showToast('Exibindo todos os países na plataforma');
              }}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos os países</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. ROW 2: DISTRIBUIÇÃO TIPO + NÍVEL ATIVIDADE + NOVOS TERRITÓRIOS         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Card 1: Distribuição por Tipo de Território */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div>
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans mb-4">
              Distribuição por Tipo de Território
            </h2>

            <div className="flex items-center gap-4">
              {/* Donut Chart SVG */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Segmento 1: Municípios (64%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#1455AC"
                    strokeWidth="14"
                    strokeDasharray="153 239"
                    strokeDashoffset="0"
                  />
                  {/* Segmento 2: Regiões (18%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#0F448A"
                    strokeWidth="14"
                    strokeDasharray="43 239"
                    strokeDashoffset="-153"
                  />
                  {/* Segmento 3: Distritos (9%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="21 239"
                    strokeDashoffset="-196"
                  />
                  {/* Segmento 4: Estados/Províncias (7%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#DC7600"
                    strokeWidth="14"
                    strokeDasharray="16 239"
                    strokeDashoffset="-217"
                  />
                  {/* Segmento 5: Outros (5%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#5F9DE0"
                    strokeWidth="14"
                    strokeDasharray="12 239"
                    strokeDashoffset="-233"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">5.964</span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500">Total</span>
                </div>
              </div>

              {/* Legenda de Tipos */}
              <div className="space-y-1.5 text-xs flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1455AC]" />
                    <span className="text-slate-700 dark:text-slate-300">Municípios</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">64% <span className="font-normal text-slate-400 dark:text-slate-500 text-[11px]">(3.642)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0F448A]" />
                    <span className="text-slate-700 dark:text-slate-300">Regiões</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">18% <span className="font-normal text-slate-400 dark:text-slate-500 text-[11px]">(1.074)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span className="text-slate-700 dark:text-slate-300">Distritos</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">9% <span className="font-normal text-slate-400 dark:text-slate-500 text-[11px]">(536)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#DC7600]" />
                    <span className="text-slate-700 dark:text-slate-300">Estados/Províncias</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">7% <span className="font-normal text-slate-400 dark:text-slate-500 text-[11px]">(417)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#5F9DE0]" />
                    <span className="text-slate-700 dark:text-slate-300">Outros</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">5% <span className="font-normal text-slate-400 dark:text-slate-500 text-[11px]">(295)</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('Filtrando todos os territórios')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos os territórios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Nível de Atividade dos Territórios (4 Colunas) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div>
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans mb-4">
              Nível de Atividade dos Territórios
            </h2>

            <div className="grid grid-cols-4 gap-2">
              {/* Elevado */}
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Elevado</span>
                <span className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-1">1.856</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">51%</span>
                {/* Sparkline Verde */}
                <svg viewBox="0 0 50 16" className="w-full h-4 mt-2">
                  <path d="M 0 12 Q 12 4 25 10 T 50 4" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Médio */}
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-1">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Médio</span>
                <span className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-1">1.248</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">34%</span>
                {/* Sparkline Amarelo */}
                <svg viewBox="0 0 50 16" className="w-full h-4 mt-2">
                  <path d="M 0 10 Q 15 14 30 8 T 50 12" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Baixo */}
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center mb-1">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Baixo</span>
                <span className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-1">428</span>
                <span className="text-[10px] text-blue-600 font-medium">12%</span>
                {/* Sparkline Vermelho */}
                <svg viewBox="0 0 50 16" className="w-full h-4 mt-2">
                  <path d="M 0 8 Q 15 6 30 14 T 50 10" fill="none" stroke="#F58300" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Inativo */}
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center mb-1">
                  <X className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Inativo</span>
                <span className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-1">110</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">3%</span>
                {/* Sparkline Cinza */}
                <svg viewBox="0 0 50 16" className="w-full h-4 mt-2">
                  <path d="M 0 10 Q 15 12 30 10 T 50 11" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('Abrindo classificação completa de atividade...')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver classificação completa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Novos Territórios por Continente (30 dias) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div>
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans mb-4">
              Novos Territórios por Continente <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">(30 dias)</span>
            </h2>

            {/* Gráfico de Barras Verticais realista com valores */}
            <div className="pt-2">
              <VerticalBars
                items={NEW_TERRITORIES_BY_CONTINENT.map((item) => ({
                  label: item.continent.replace('América do ', 'Am. '),
                  value: item.value,
                  color: '#5F9DE0',
                }))}
                height={120}
              />
            </div>
          </div>

          {/* Rodapé */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('Abrindo análise completa de novos territórios...')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver análise completa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. ROW 3: MAIOR CRESCIMENTO + NÍVEL ATIVIDADE + EXPLORAR PAÍSES            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Card 1: Territórios com Maior Crescimento (4 colunas) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div>
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans mb-3">
              Territórios com Maior Crescimento
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200/70 dark:border-slate-700 text-[11px] text-slate-400 dark:text-slate-500 font-semibold">
                    <th className="pb-2 font-medium">Território</th>
                    <th className="pb-2 font-medium">País</th>
                    <th className="pb-2 font-medium">Tipo</th>
                    <th className="pb-2 font-medium text-right">Cresc. (30d)</th>
                    <th className="pb-2 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                  {DEFAULT_GROWTH_TABLE.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => setActiveDetailModal(row.territory)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                    >
                      <td className="py-2.5 font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[110px]">{row.territory}</td>
                      <td className="py-2.5 text-slate-600 dark:text-slate-400">{row.country}</td>
                      <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">{row.type}</td>
                      <td className="py-2.5 text-right font-bold text-emerald-600 dark:text-emerald-400 font-mono">{row.growth}</td>
                      <td className="py-2.5 text-right">
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('Exibindo todos os territórios em expansão')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos os territórios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Territórios por Nível de Atividade (3 colunas) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div>
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans mb-3">
              Territórios por Nível de Atividade
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200/70 dark:border-slate-700 text-[11px] text-slate-400 dark:text-slate-500 font-semibold">
                    <th className="pb-2 font-medium">Nível</th>
                    <th className="pb-2 font-medium text-right">Territórios</th>
                    <th className="pb-2 font-medium text-right">% do Total</th>
                    <th className="pb-2 font-medium text-right">Var. (30d)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                  {DEFAULT_ACTIVITY_TABLE.map((row) => (
                    <tr
                      key={row.level}
                      onClick={() => setActiveDetailModal(`Territórios com Atividade: ${row.level}`)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                    >
                      <td className="py-2.5 font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: row.color }}
                        />
                        <span>{row.level}</span>
                      </td>
                      <td className="py-2.5 text-right font-bold text-slate-800 dark:text-slate-100 font-mono">{row.count}</td>
                      <td className="py-2.5 text-right text-slate-600 dark:text-slate-400 font-mono">{row.percentage}</td>
                      <td className={`py-2.5 text-right font-bold font-mono ${row.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-500'}`}>
                        {row.variation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('Exibindo detalhamento completo de atividade')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos os territórios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Explorar Países (5 colunas) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
              <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans">
                Explorar Países
              </h2>

              {/* Controles de Busca e Filtro de Continente */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={countrySearchTerm}
                    onChange={(e) => setCountrySearchTerm(e.target.value)}
                    placeholder="Pesquisar país..."
                    className="h-8 pl-8 pr-3 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg w-32 sm:w-36 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                  {countrySearchTerm && (
                    <button
                      type="button"
                      onClick={() => setCountrySearchTerm('')}
                      className="absolute right-2 top-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="relative">
                  <select
                    value={selectedContinentFilter}
                    onChange={(e) => setSelectedContinentFilter(e.target.value)}
                    className="h-8 pl-2 pr-6 text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400"
                  >
                    <option value="all">Todos os Continentes</option>
                    <option value="Europa">Europa</option>
                    <option value="América do Sul">América do Sul</option>
                    <option value="América do Norte">América do Norte</option>
                    <option value="África">África</option>
                    <option value="Ásia">Ásia</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500 absolute right-1.5 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Tabela de Países */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200/70 dark:border-slate-700 text-[11px] text-slate-400 dark:text-slate-500 font-semibold">
                    <th className="pb-2 font-medium">País</th>
                    <th className="pb-2 font-medium text-right">Territórios Ativos</th>
                    <th className="pb-2 font-medium text-right">Municípios</th>
                    <th className="pb-2 font-medium text-right">Cobertura</th>
                    <th className="pb-2 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                  {filteredCountries.slice(0, 5).map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => setActiveDetailModal(row.name)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                    >
                      <td className="py-2.5 font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                        <span className="text-base leading-none">{row.flag}</span>
                        <span>{row.name}</span>
                      </td>
                      <td className="py-2.5 text-right font-bold text-slate-800 dark:text-slate-100 font-mono">{row.activeTerritories}</td>
                      <td className="py-2.5 text-right text-slate-600 dark:text-slate-400 font-mono">{row.municipalities}</td>
                      <td className="py-2.5 text-right font-bold text-[#1455AC] font-mono">{row.coverage}</td>
                      <td className="py-2.5 text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>{row.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setCountrySearchTerm('');
                setSelectedContinentFilter('all');
                showToast('Carregando lista completa de todos os países...');
              }}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos os países</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. MODAIS INTERATIVOS: DETALHES, EXPORTAR E FILTROS                       */}
      {/* ========================================================================= */}

      {/* Modal de Detalhes de Métrica ou Território */}
      {activeDetailModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">
                    {activeDetailModal}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Relatório detalhado e histórico territorial</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveDetailModal(null)}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="p-3 bg-blue-50/60 border border-blue-100 dark:border-blue-800/40 rounded-xl space-y-1">
                <p className="font-semibold text-blue-900">Estado Atual da Região/Métrica</p>
                <p className="text-blue-700">
                  Os dados territoriais da rede VILA são validados em tempo real com base na geolocalização dos membros e lideranças de projetos locais.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-lg">
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500">Projetos Ativos</span>
                  <p className="text-base font-bold text-[#0F172A] dark:text-slate-50">142</p>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-lg">
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500">Comunidades Conectadas</span>
                  <p className="text-base font-bold text-[#0F172A] dark:text-slate-50">68</p>
                </div>
              </div>

              <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Índice de Engajamento Cívico</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">92% (Excelente)</strong>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[92%]" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200/70 dark:border-slate-700">
              <button
                type="button"
                onClick={() => {
                  showToast(`Relatório de ${activeDetailModal} exportado!`);
                  setActiveDetailModal(null);
                }}
                className="px-4 py-2 bg-[#1455AC] hover:bg-[#0F448A] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Baixar Dados em CSV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Exportação */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">Exportar Dados Territoriais</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Escolha o formato pretendido para exportação</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <button
                type="button"
                onClick={() => {
                  setIsExportModalOpen(false);
                  showToast('Exportando dados em formato CSV...');
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#1455AC]">Folha de Cálculo (CSV)</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">Todos os territórios, países e municípios ativos</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#1455AC]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsExportModalOpen(false);
                  showToast('Exportando relatório em PDF executivo...');
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#1455AC]">Relatório Executivo (PDF)</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">Sumário visual dos 156 países e cobertura global</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#1455AC]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsExportModalOpen(false);
                  showToast('Exportando dados em formato JSON Geoespacial...');
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Copy className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#1455AC]">JSON Geoespacial (GeoJSON)</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">Coordenadas e polígonos territoriais da rede</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#1455AC]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Filtros */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">Filtros Territoriais</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Refine as estatísticas e os dados da página</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Continente</label>
                <select
                  value={selectedContinentFilter}
                  onChange={(e) => setSelectedContinentFilter(e.target.value)}
                  className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="all">Todos os Continentes (Global)</option>
                  <option value="Europa">Europa</option>
                  <option value="América do Sul">América do Sul</option>
                  <option value="América do Norte">América do Norte</option>
                  <option value="África">África</option>
                  <option value="Ásia">Ásia</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Nível Mínimo de Atividade</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Elevado', 'Médio', 'Baixo', 'Todos'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => showToast(`Filtro de atividade: ${lvl}`)}
                      className="p-2 border border-slate-200 dark:border-slate-700 hover:border-blue-300 rounded-xl text-center font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50/50 cursor-pointer"
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200/70 dark:border-slate-700">
              <button
                type="button"
                onClick={() => {
                  setSelectedContinentFilter('all');
                  setCountrySearchTerm('');
                  setIsFilterModalOpen(false);
                  showToast('Filtros repostos');
                }}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsFilterModalOpen(false);
                  showToast('Filtros aplicados à visualização!');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#1455AC] hover:bg-[#0F448A] rounded-xl cursor-pointer shadow-xs"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TerritoriosPaisesView;
