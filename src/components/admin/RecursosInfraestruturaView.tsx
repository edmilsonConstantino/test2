import React, { useState, useMemo, useEffect } from 'react';
import {
  Activity,
  Server,
  HardDrive,
  Wifi,
  Database,
  Euro,
  Globe,
  Compass,
  Building2,
  Users,
  Monitor,
  ShieldCheck,
  LayoutGrid,
  Sparkles,
  Bot,
  UserCheck,
  Clock,
  ArrowRight,
  TrendingUp,
  Download,
  SlidersHorizontal,
  Calendar as CalendarIcon,
  ChevronDown,
  Layers,
  ShieldAlert,
  Shield,
  KeyRound,
  FileBadge,
  CloudDownload,
  AlertTriangle,
  Wrench,
  CheckCircle2,
  Leaf,
  Cpu,
  RefreshCw,
  Search,
  Check,
  X,
  ExternalLink,
  Info,
} from 'lucide-react';
import { DemoUser } from '../../data/demoUsers';
import { BreadcrumbItem } from '../Topbar';
import { ExpandableKpiHeader, KpiCardData } from './ExpandableKpiHeader';

interface RecursosInfraestruturaViewProps {
  currentUser: DemoUser;
  onNavigateToTab: (tabId: string) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
  onOpenSupportModal?: (actionContext?: string) => void;
}

export const RecursosInfraestruturaView: React.FC<RecursosInfraestruturaViewProps> = ({
  currentUser,
  onNavigateToTab,
  onBreadcrumbChange,
  onOpenSupportModal,
}) => {
  // Breadcrumb synchronization
  useEffect(() => {
    onBreadcrumbChange?.([
      { label: 'Plataforma VILA', onClick: () => onNavigateToTab('painel-gestao') },
      { label: 'Recursos e Infraestrutura' },
    ]);
  }, [onBreadcrumbChange, onNavigateToTab]);

  // State
  const [selectedPeriod, setSelectedPeriod] = useState<'24h' | '7d' | '30d' | '1y'>('24h');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isExportToastOpen, setIsExportToastOpen] = useState(false);
  const [selectedDC, setSelectedDC] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Growth chart monthly data
  const growthData = useMemo(() => [
    { month: 'Jun', storage: 180, bandwidth: 90, servers: 60 },
    { month: 'Jul', storage: 200, bandwidth: 95, servers: 62 },
    { month: 'Ago', storage: 220, bandwidth: 105, servers: 64 },
    { month: 'Set', storage: 235, bandwidth: 110, servers: 65 },
    { month: 'Nov', storage: 240, bandwidth: 112, servers: 67 },
    { month: 'Dez', storage: 248, bandwidth: 118, servers: 70 },
    { month: 'Jan', storage: 255, bandwidth: 122, servers: 72 },
    { month: 'Fev', storage: 265, bandwidth: 126, servers: 75 },
    { month: 'Mar', storage: 275, bandwidth: 130, servers: 77 },
    { month: 'Abr', storage: 285, bandwidth: 135, servers: 79 },
    { month: 'Mai', storage: 295, bandwidth: 140, servers: 82 },
  ], []);

  // Data Centers
  const dataCenters = useMemo(() => [
    { id: 'VILA-DC01', name: 'Lisboa, Portugal', status: 'Online', utilization: '42%', availability: '99,99%', ip: '194.65.21.10', ping: '12ms' },
    { id: 'VILA-DC02', name: 'Frankfurt, Alemanha', status: 'Online', utilization: '61%', availability: '99,98%', ip: '185.12.89.4', ping: '28ms' },
    { id: 'VILA-DC03', name: 'São Paulo, Brasil', status: 'Online', utilization: '49%', availability: '99,97%', ip: '177.18.90.15', ping: '110ms' },
    { id: 'VILA-DC04', name: 'Singapura, Ásia', status: 'Online', utilization: '55%', availability: '99,98%', ip: '165.22.44.8', ping: '175ms' },
    { id: 'VILA-DC05', name: 'N. Virginia, EUA', status: 'Online', utilization: '45%', availability: '99,99%', ip: '52.14.77.2', ping: '84ms' },
  ], []);

  // Services & Systems
  const servicesList = useMemo(() => [
    { name: 'Portal VILA', status: 'Online', availability: '99,99%', responseTime: '120ms', version: 'v3.8.4' },
    { name: 'VILA AI', status: 'Online', availability: '99,98%', responseTime: '150ms', version: 'v2.1.0-gemini' },
    { name: 'API Gateway', status: 'Online', availability: '99,99%', responseTime: '98ms', version: 'v4.0.2' },
    { name: 'Serviço de Autenticação', status: 'Online', availability: '99,99%', responseTime: '85ms', version: 'v3.1.2' },
    { name: 'Armazenamento de Ficheiros', status: 'Online', availability: '99,98%', responseTime: '110ms', version: 'v2.9.5' },
    { name: 'Serviço de Notificações', status: 'Online', availability: '99,97%', responseTime: '95ms', version: 'v2.4.1' },
  ], []);

  // Integrations
  const integrations = useMemo(() => [
    { name: 'Open Data', status: 'Ativa', availability: '98,7%', icon: <Database className="w-4 h-4 text-blue-600" /> },
    { name: 'AIMA (APIs)', status: 'Ativa', availability: '99,2%', icon: <ShieldCheck className="w-4 h-4 text-blue-600" /> },
    { name: 'Portal dos Municípios', status: 'Ativa', availability: '97,8%', icon: <Building2 className="w-4 h-4 text-emerald-600" /> },
    { name: 'Turismo de Portugal', status: 'Ativa', availability: '98,1%', icon: <Compass className="w-4 h-4 text-amber-600" /> },
    { name: 'Transportes e Mobilidade', status: 'Ativa', availability: '97,5%', icon: <Activity className="w-4 h-4 text-indigo-600" /> },
    { name: 'APIs Externas', status: 'Ativa', availability: '96,9%', icon: <Globe className="w-4 h-4 text-purple-600" /> },
  ], []);

  // Donut chart resource types breakdown
  const resourceTypes = [
    { label: 'Servidores Físicos', percent: '32%', count: 41, color: '#3B82F6' },
    { label: 'Servidores Virtuais', percent: '28%', count: 36, color: '#06B6D4' },
    { label: 'Armazenamento', percent: '20%', count: 26, color: '#10B981' },
    { label: 'Bases de Dados', percent: '10%', count: 13, color: '#F97316' },
    { label: 'Redes e Segurança', percent: '6%', count: 8, color: '#EF4444' },
    { label: 'Outros', percent: '4%', count: 4, color: '#EAB308' },
  ];

  // 2. LINHA 1: 6 Cards de Indicadores (KPIs) — colapsado em 5 + botão "Ver mais"
  const infraKpiCards: KpiCardData[] = [
    {
      id: 'kpi-disponibilidade',
      label: 'Disponibilidade da Plataforma',
      value: '99,98%',
      trend: '↑ 0,02 pp',
      trendPeriod: 'desde o ano passado',
      icon: <Activity className="w-3.5 h-3.5" strokeWidth={2.2} />,
      bgClass: 'bg-emerald-50 border border-emerald-100/70',
      iconClass: 'text-emerald-600',
      spark: [99.9, 99.92, 99.91, 99.94, 99.93, 99.95, 99.96, 99.95, 99.97, 99.96, 99.98, 99.98],
      onClick: () => setSelectedService('Portal VILA'),
    },
    {
      id: 'kpi-servidores-ativos',
      label: 'Servidores Ativos',
      value: '128',
      trend: '↑ 12%',
      trendPeriod: 'desde o ano passado',
      icon: <Server className="w-3.5 h-3.5" strokeWidth={2.2} />,
      bgClass: 'bg-purple-50 border border-purple-100/70',
      iconClass: 'text-purple-600',
      spark: [98, 102, 105, 108, 110, 112, 115, 118, 121, 124, 126, 128],
      onClick: () => setSelectedDC('VILA-DC01'),
    },
    {
      id: 'kpi-armazenamento-total',
      label: 'Armazenamento Total',
      value: '256 TB',
      trend: '↑ 18%',
      trendPeriod: 'desde o ano passado',
      icon: <HardDrive className="w-3.5 h-3.5" strokeWidth={2.2} />,
      bgClass: 'bg-blue-50 border border-blue-100/70',
      iconClass: 'text-blue-600',
      spark: [180, 190, 198, 208, 216, 224, 230, 238, 244, 250, 254, 256],
      onClick: () => setSelectedService('Armazenamento de Ficheiros'),
    },
    {
      id: 'kpi-largura-banda',
      label: 'Largura de Banda',
      value: '18,7 Tbps',
      trend: '↑ 22%',
      trendPeriod: 'desde o ano passado',
      icon: <Wifi className="w-3.5 h-3.5" strokeWidth={2.2} />,
      bgClass: 'bg-orange-50 border border-orange-100/70',
      iconClass: 'text-orange-600',
      spark: [11.2, 11.8, 12.4, 13, 13.6, 14.4, 15, 15.9, 16.6, 17.4, 18.1, 18.7],
      onClick: () => setSelectedService('API Gateway'),
    },
    {
      id: 'kpi-bases-dados',
      label: 'Bases de Dados',
      value: '42',
      trend: '↑ 14%',
      trendPeriod: 'desde o ano passado',
      icon: <Database className="w-3.5 h-3.5" strokeWidth={2.2} />,
      bgClass: 'bg-rose-50 border border-rose-100/70',
      iconClass: 'text-rose-600',
      spark: [30, 31, 32, 33, 34, 35, 36, 38, 39, 40, 41, 42],
      onClick: () => setSelectedService('Open Data'),
    },
    {
      id: 'kpi-custo-infraestrutura',
      label: 'Custo de Infraestrutura',
      value: '€2,48M',
      trend: '↓ 5%',
      trendPeriod: 'desde o ano passado',
      trendClassName: 'text-red-700 bg-red-50 border border-red-200/70',
      icon: <Euro className="w-3.5 h-3.5" strokeWidth={2.2} />,
      bgClass: 'bg-amber-50 border border-amber-100/70',
      iconClass: 'text-amber-600',
      spark: [2.9, 2.85, 2.8, 2.75, 2.7, 2.65, 2.62, 2.58, 2.55, 2.52, 2.5, 2.48],
      onClick: () => onOpenSupportModal?.('Custo de Infraestrutura'),
    },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5 animate-in fade-in duration-200">
      {/* 1. Header do Módulo com Identidade VILA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE]/80 border border-purple-200/60 flex items-center justify-center text-[#5B21B6] shrink-0 shadow-2xs">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] font-sans tracking-tight">
              Recursos e Infraestrutura
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-3xl mt-0.5 leading-relaxed">
              Monitorize a infraestrutura tecnológica e territorial que sustenta a rede global VILA e capacita comunidades, municípios e parceiros em todo o mundo.
            </p>
          </div>
        </div>

        {/* Telemetria e Controles */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto justify-end">
          <div className="flex items-center gap-4 text-xs text-slate-500 mr-2">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Dados atualizados: 10:32
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Dados em tempo real
            </span>
          </div>

          {/* Seletor de Período */}
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs">
            <CalendarIcon className="w-3.5 h-3.5 text-slate-500" />
            <span>01 Mai 2024 - 24 Mai 2025</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </div>

          {/* Exportar */}
          <button
            onClick={() => {
              setIsExportToastOpen(true);
              setTimeout(() => setIsExportToastOpen(false), 3000);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Exportar</span>
          </button>

          {/* Filtros */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#5B21B6] hover:bg-purple-800 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {/* 2. LINHA 1: 6 Cards de Indicadores — 5 visíveis + botão "Ver mais cards" */}
      <ExpandableKpiHeader cards={infraKpiCards} visibleCount={5} xlCols={6} />

      {/* 3. LINHA 2: 3 Cards de Infraestrutura (Territorial, Digital VILA, VILA AI) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Card 1: Infraestrutura Territorial */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Infraestrutura Territorial</h2>
            <p className="text-xs text-slate-500 mt-0.5">A rede territorial que a VILA suporta</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none">156</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Países Ativos</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none">324</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Regiões</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none">3.642</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Municípios</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none">18.732</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Comunidades</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 flex justify-end">
            <button
              onClick={() => onNavigateToTab('territorios-paises')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>Ver mapa territorial</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 2: Infraestrutura Digital VILA */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Infraestrutura Digital VILA</h2>
            <p className="text-xs text-slate-500 mt-0.5">Portais, instâncias e aplicações ativas na rede</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none">324</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Portais Regionais</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none">3.642</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Portais Municipais</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none">18.732</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Instâncias Comunitárias</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none">156</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Apps Ativas</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 flex justify-end">
            <button
              onClick={() => onNavigateToTab('utilizadores-comunidades')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>Ver todas as instâncias</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 3: Infraestrutura IA (VILA AI) */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Infraestrutura IA (VILA AI)</h2>
            <p className="text-xs text-slate-500 mt-0.5">Inteligência Artificial ao serviço dos territórios</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none">1.248.562</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Pedidos IA Hoje</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none">324</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Assistentes Territoriais</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none">3.642</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Assistentes Municipais</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 leading-none">1,2s</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Tempo Médio Resposta</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 flex justify-end">
            <button
              onClick={() => onOpenSupportModal?.('VILA AI')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>Explorar VILA AI</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. LINHA 3: Utilização de Recursos, Pirâmide da Rede e Centros de Dados */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Coluna 1: Utilização de Recursos (4 Gauges radiais) */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0F172A]">Utilização de Recursos</h3>
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-200 text-[11px] text-slate-600 font-medium cursor-pointer hover:bg-slate-50">
              <span>Últimas 24 horas</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-auto py-4">
            {/* CPU - 35% */}
            <div className="flex flex-col items-center text-center">
              <div className="text-xs font-bold text-slate-700 mb-2">CPU</div>
              <div className="relative w-18 h-18 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-indigo-600"
                    strokeDasharray="35, 100"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-sm font-bold text-slate-900">35%</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-2">Média de utilização</span>
            </div>

            {/* Memória - 62% */}
            <div className="flex flex-col items-center text-center">
              <div className="text-xs font-bold text-slate-700 mb-2">Memória</div>
              <div className="relative w-18 h-18 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-teal-500"
                    strokeDasharray="62, 100"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-sm font-bold text-slate-900">62%</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-2">Média de utilização</span>
            </div>

            {/* Armazenamento - 58% */}
            <div className="flex flex-col items-center text-center">
              <div className="text-xs font-bold text-slate-700 mb-2">Armazenamento</div>
              <div className="relative w-18 h-18 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-500"
                    strokeDasharray="58, 100"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-sm font-bold text-slate-900">58%</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-2">Média de utilização</span>
            </div>

            {/* Rede - 41% */}
            <div className="flex flex-col items-center text-center">
              <div className="text-xs font-bold text-slate-700 mb-2">Rede</div>
              <div className="relative w-18 h-18 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-500"
                    strokeDasharray="41, 100"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-sm font-bold text-slate-900">41%</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-2">Média de utilização</span>
            </div>
          </div>
          <div className="h-4" />
        </div>

        {/* Coluna 2: Infraestrutura por Camada da Rede VILA (Pirâmide estilizada) */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">Infraestrutura por Camada da Rede VILA</h3>

          <div className="flex items-center justify-between gap-4 my-auto py-2">
            {/* Diagrama Piramidal Vetorial */}
            <div className="w-36 h-36 shrink-0 relative flex items-center justify-center">
              <svg viewBox="0 0 140 120" className="w-full h-full drop-shadow-2xs">
                {/* Camada 1: Topo / Global */}
                <polygon points="70,10 82,30 58,30" fill="#7C3AED" />
                <text x="70" y="24" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">1</text>

                {/* Camada 2: País */}
                <polygon points="56,33 84,33 96,53 44,53" fill="#6366F1" />

                {/* Camada 3: Região */}
                <polygon points="42,56 98,56 110,76 30,76" fill="#0EA5E9" />

                {/* Camada 4: Município */}
                <polygon points="28,79 112,79 124,99 16,99" fill="#10B981" />

                {/* Camada 5: Comunidade (Base) */}
                <polygon points="14,102 126,102 138,118 2,118" fill="#F59E0B" />
              </svg>
            </div>

            {/* Lista com Indicadores e Totais */}
            <div className="flex-1 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                  Global (Data Centers)
                </span>
                <span className="font-semibold text-slate-900">6 centros</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
                  Nível País
                </span>
                <span className="font-semibold text-slate-900">156 instâncias</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
                  Nível Região
                </span>
                <span className="font-semibold text-slate-900">324 instâncias</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  Nível Município
                </span>
                <span className="font-semibold text-slate-900">3.642 instâncias</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  Nível Comunidade
                </span>
                <span className="font-semibold text-slate-900">18.732 instâncias</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onOpenSupportModal?.('Arquitetura da Rede')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>Ver arquitetura da rede</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Coluna 3: Centros de Dados */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">Centros de Dados</h3>

          <div className="overflow-x-auto my-auto py-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[11px] font-semibold text-slate-400 border-b border-slate-200/70">
                  <th className="pb-2">Centro de Dados</th>
                  <th className="pb-2">Localização</th>
                  <th className="pb-2 text-center">Estado</th>
                  <th className="pb-2 text-right">Utilização</th>
                  <th className="pb-2 text-right">Disponibilidade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {dataCenters.map((dc) => (
                  <tr
                    key={dc.id}
                    onClick={() => setSelectedDC(dc.id)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-2 font-semibold text-slate-900">{dc.id}</td>
                    <td className="py-2 text-slate-500">{dc.name}</td>
                    <td className="py-2 text-center">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">
                        {dc.status}
                      </span>
                    </td>
                    <td className="py-2 text-right font-medium text-slate-700">{dc.utilization}</td>
                    <td className="py-2 text-right font-semibold text-slate-900">{dc.availability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setSelectedDC('VILA-DC01')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>Ver todos os centros</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. LINHA 4: 4 Colunas (Serviços e Sistemas, Integrações, Segurança, Tipos de Recursos) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Coluna 1: Serviços e Sistemas */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Serviços e Sistemas</h3>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[10px] font-semibold text-slate-400 border-b border-slate-200/70">
                    <th className="pb-1.5">Serviço</th>
                    <th className="pb-1.5 text-center">Status</th>
                    <th className="pb-1.5 text-right">Disponibilidade</th>
                    <th className="pb-1.5 text-right">Tempo de Resposta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {servicesList.map((svc) => (
                    <tr
                      key={svc.name}
                      onClick={() => setSelectedService(svc.name)}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                    >
                      <td className="py-1.5 font-medium text-slate-800 text-[11px]">{svc.name}</td>
                      <td className="py-1.5 text-center">
                        <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-emerald-50 text-emerald-600">
                          {svc.status}
                        </span>
                      </td>
                      <td className="py-1.5 text-right font-medium text-slate-900 text-[11px]">{svc.availability}</td>
                      <td className="py-1.5 text-right text-slate-500 text-[11px]">{svc.responseTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => setSelectedService('Portal VILA')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>Ver todos os serviços</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Coluna 2: Integrações Ativas */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Integrações Ativas</h3>
            <div className="space-y-2.5 mt-3 text-xs">
              {integrations.map((item) => (
                <div key={item.name} className="flex items-center justify-between py-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{item.icon}</span>
                    <span className="font-medium text-slate-800">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">
                      {item.status}
                    </span>
                    <span className="font-bold text-slate-900">{item.availability}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => onOpenSupportModal?.('Integrações Ativas')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>Ver todas as integrações</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Coluna 3: Segurança da Plataforma */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Segurança da Plataforma</h3>
            <div className="space-y-3 mt-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <ShieldAlert className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Incidentes Bloqueados (30 dias)</span>
                </div>
                <span className="font-bold text-slate-900">1.248</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Utilizadores com MFA Ativo</span>
                </div>
                <span className="font-bold text-slate-900">78,2%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <UserCheck className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Utilizadores Verificados</span>
                </div>
                <span className="font-bold text-slate-900">2,1M</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <KeyRound className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Tentativas de Acesso Bloqueadas</span>
                </div>
                <span className="font-bold text-slate-900">19.732</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <FileBadge className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Conformidade (ISO 27001)</span>
                </div>
                <span className="font-bold text-emerald-600">100%</span>
              </div>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => onOpenSupportModal?.('Segurança da Plataforma')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>Ver centro de segurança</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Coluna 4: Tipos de Recursos (Donut & Legenda) */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Tipos de Recursos</h3>

            <div className="flex items-center gap-3.5 mt-3">
              {/* Donut Chart SVG */}
              <div className="w-24 h-24 shrink-0 relative flex items-center justify-center">
                <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90">
                  {/* Físicos 32% */}
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#3B82F6" strokeWidth="6" strokeDasharray="32 68" strokeDashoffset="0" />
                  {/* Virtuais 28% */}
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#06B6D4" strokeWidth="6" strokeDasharray="28 72" strokeDashoffset="-32" />
                  {/* Armazenamento 20% */}
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#10B981" strokeWidth="6" strokeDasharray="20 80" strokeDashoffset="-60" />
                  {/* Bases de Dados 10% */}
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#F97316" strokeWidth="6" strokeDasharray="10 90" strokeDashoffset="-80" />
                  {/* Redes 6% */}
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#EF4444" strokeWidth="6" strokeDasharray="6 94" strokeDashoffset="-90" />
                  {/* Outros 4% */}
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#EAB308" strokeWidth="6" strokeDasharray="4 96" strokeDashoffset="-96" />
                </svg>
              </div>

              {/* Legenda com Cores e Valores */}
              <div className="flex-1 space-y-1 text-[11px]">
                {resourceTypes.map((res) => (
                  <div key={res.label} className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: res.color }} />
                      <span className="truncate max-w-[90px]">{res.label}</span>
                    </span>
                    <span className="font-semibold text-slate-900 shrink-0">
                      {res.percent} <span className="text-slate-400 font-normal">({res.count})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => onOpenSupportModal?.('Tipos de Recursos')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>Ver todos os recursos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 6. LINHA 5: Backups, Incidentes e Sustentabilidade da Rede */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Coluna 1: Backups e Recuperação */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">Backups e Recuperação</h3>

          <div className="flex items-center justify-between gap-4 my-auto py-3">
            {/* Ícone de Nuvem e Último Backup */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <CloudDownload className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] text-slate-500">Último Backup</div>
                <div className="text-lg font-bold text-slate-900">Hoje, 08:32</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Próximo Backup: <span className="font-medium text-slate-600">Hoje, 20:00</span></div>
              </div>
            </div>

            {/* Métricas dos Últimos 7 dias */}
            <div className="text-right space-y-1">
              <div>
                <div className="text-[10px] text-slate-400">Backups (últimos 7 dias)</div>
                <div className="text-base font-bold text-slate-900">27</div>
                <div className="text-[10px] text-emerald-600 font-medium">↑ 17% vs semana anterior</div>
              </div>
              <div className="pt-1 border-t border-slate-200/70">
                <div className="text-[10px] text-slate-400">Taxa de Sucesso</div>
                <div className="text-sm font-bold text-emerald-600">100% <span className="text-slate-400 font-normal text-[10px]">(0 falhas)</span></div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onOpenSupportModal?.('Política de Backups')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>Ver política de backups</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Coluna 2: Incidentes e Manutenção */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">Incidentes e Manutenção</h3>

          <div className="grid grid-cols-2 gap-3 my-auto py-2">
            {/* Incidentes (30 dias) */}
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/60 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500">Incidentes (30 dias)</div>
                <div className="text-base font-bold text-slate-900">3</div>
                <div className="text-[10px] text-emerald-600 font-medium">↓ -40% vs período anterior</div>
              </div>
            </div>

            {/* Tempo Médio de Resolução */}
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/60 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500">Tempo Médio de Resolução</div>
                <div className="text-base font-bold text-slate-900">42 min</div>
                <div className="text-[10px] text-emerald-600 font-medium">↓ -18% vs período anterior</div>
              </div>
            </div>

            {/* Manutenções Planeadas */}
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/60 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500">Manutenções Planeadas</div>
                <div className="text-base font-bold text-slate-900">5</div>
                <div className="text-[10px] text-slate-500 font-medium">Próxima: 02 Jun 2025</div>
              </div>
            </div>

            {/* Manutenções Concluídas */}
            <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/60 border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500">Manutenções Concluídas</div>
                <div className="text-base font-bold text-slate-900">12</div>
                <div className="text-[10px] text-slate-500 font-medium">Este mês</div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onOpenSupportModal?.('Histórico de Incidentes')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>Ver histórico completo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Coluna 3: Sustentabilidade da Rede */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">Sustentabilidade da Rede</h3>

          <div className="flex items-center gap-4 my-auto py-2">
            {/* Ícone de Folha / Eco */}
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Leaf className="w-7 h-7" />
            </div>

            {/* 4 Indicadores de Sustentabilidade */}
            <div className="grid grid-cols-2 gap-3 flex-1">
              <div>
                <div className="text-[10px] text-slate-500">Energia Renovável</div>
                <div className="text-lg font-bold text-[#0F172A]">78%</div>
                <div className="text-[10px] text-slate-400">dos centros de dados</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500">Eficiência Energética</div>
                <div className="text-lg font-bold text-[#0F172A]">1.42</div>
                <div className="text-[10px] text-slate-400">PUE médio global</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500">Emissões Evitadas</div>
                <div className="text-lg font-bold text-[#0F172A]">1.862 tCO₂</div>
                <div className="text-[10px] text-slate-400">Este ano</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500">Centros Verdes</div>
                <div className="text-lg font-bold text-[#0F172A]">5</div>
                <div className="text-[10px] text-slate-400">certificados</div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onOpenSupportModal?.('Relatório de Sustentabilidade')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
            >
              <span>Ver relatório de sustentabilidade</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 7. LINHA 6: Capacidade e Crescimento (Full Width) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Gráfico de Evolução Multilinha (7 Colunas) */}
          <div className="lg:col-span-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="text-sm font-bold text-[#0F172A]">Capacidade e Crescimento</h3>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#1E293B]" />
                  Armazenamento (TB)
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
                  Largura de Banda (Tbps)
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  Servidores Ativos
                </span>
              </div>
            </div>

            {/* Gráfico SVG Suave */}
            <div className="relative h-44 w-full">
              <svg viewBox="0 0 550 140" className="w-full h-full overflow-visible">
                {/* Gradientes de area */}
                <defs>
                  <linearGradient id="ri-area-storage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E293B" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#1E293B" stopOpacity="0.01" />
                  </linearGradient>
                  <linearGradient id="ri-area-bandwidth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.01" />
                  </linearGradient>
                  <linearGradient id="ri-area-servers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                {/* Linhas horizontais de grade */}
                {[0, 100, 200, 300, 400].map((val, idx) => {
                  const y = 120 - (val / 400) * 100;
                  return (
                    <g key={val}>
                      <line x1="30" y1={y} x2="540" y2={y} stroke="#F1F5F9" strokeWidth="1" />
                      <text x="22" y={y + 3} textAnchor="end" fontSize="9" fill="#94A3B8">
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Areas preenchidas (realismo) */}
                <path d="M 40 75 Q 85 70 135 65 T 235 60 T 335 55 T 435 50 T 535 45 L 535 120 L 40 120 Z" fill="url(#ri-area-storage)" />
                <path d="M 40 95 Q 85 92 135 88 T 235 85 T 335 82 T 435 78 T 535 72 L 535 120 L 40 120 Z" fill="url(#ri-area-bandwidth)" />
                <path d="M 40 110 Q 85 108 135 106 T 235 104 T 335 102 T 435 99 T 535 96 L 535 120 L 40 120 Z" fill="url(#ri-area-servers)" />

                {/* Linha 1: Armazenamento (TB) */}
                <path
                  d="M 40 75 Q 85 70 135 65 T 235 60 T 335 55 T 435 50 T 535 45"
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="2.5"
                />
                {[
                  { cx: 40, cy: 75, val: '180 TB' },
                  { cx: 135, cy: 65, val: '220 TB' },
                  { cx: 235, cy: 60, val: '240 TB' },
                  { cx: 335, cy: 55, val: '255 TB' },
                  { cx: 435, cy: 50, val: '275 TB' },
                  { cx: 535, cy: 45, val: '295 TB' },
                ].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.cx}
                    cy={pt.cy}
                    r={hoveredPoint === i ? 5 : 3.5}
                    fill="#ffffff"
                    stroke="#1E293B"
                    strokeWidth="2"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                ))}

                {/* Linha 2: Largura de Banda (Tbps) */}
                <path
                  d="M 40 95 Q 85 92 135 88 T 235 85 T 335 82 T 435 78 T 535 72"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="2.2"
                />
                {[
                  { cx: 40, cy: 95 },
                  { cx: 135, cy: 88 },
                  { cx: 235, cy: 85 },
                  { cx: 335, cy: 82 },
                  { cx: 435, cy: 78 },
                  { cx: 535, cy: 72 },
                ].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.cx}
                    cy={pt.cy}
                    r="3"
                    fill="#ffffff"
                    stroke="#06B6D4"
                    strokeWidth="2"
                  />
                ))}

                {/* Linha 3: Servidores Ativos */}
                <path
                  d="M 40 110 Q 85 108 135 106 T 235 104 T 335 102 T 435 99 T 535 96"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
                {[
                  { cx: 40, cy: 110 },
                  { cx: 135, cy: 106 },
                  { cx: 235, cy: 104 },
                  { cx: 335, cy: 102 },
                  { cx: 435, cy: 99 },
                  { cx: 535, cy: 96 },
                ].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.cx}
                    cy={pt.cy}
                    r="2.5"
                    fill="#ffffff"
                    stroke="#3B82F6"
                    strokeWidth="1.8"
                  />
                ))}

                {/* Eixo X: Meses */}
                {growthData.map((d, idx) => {
                  const x = 40 + idx * 49.5;
                  return (
                    <text key={d.month} x={x} y="135" textAnchor="middle" fontSize="9" fill="#94A3B8">
                      {d.month}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* 3 Caixas de Capacidade Total (2.5 Colunas) */}
          <div className="lg:col-span-2 flex flex-col justify-center gap-3">
            <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-center">
              <div className="text-[10px] text-slate-400">Capacidade Total</div>
              <div className="text-xl font-bold text-[#0F172A]">512 TB</div>
              <div className="text-xs text-slate-600 font-medium">Armazenamento</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-center">
              <div className="text-[10px] text-slate-400">Capacidade Total</div>
              <div className="text-xl font-bold text-[#0F172A]">25 Tbps</div>
              <div className="text-xs text-slate-600 font-medium">Largura de Banda</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-center">
              <div className="text-[10px] text-slate-400">Capacidade Total</div>
              <div className="text-xl font-bold text-[#0F172A]">200</div>
              <div className="text-xs text-slate-600 font-medium">Servidores</div>
            </div>
          </div>

          {/* Previsão de Crescimento (próx. 12 meses) (2.5 Colunas) */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full pl-0 lg:pl-2">
            <div>
              <h4 className="text-xs font-bold text-[#0F172A] mb-3">Previsão de Crescimento (próx. 12 meses)</h4>

              <div className="space-y-3 text-xs">
                {/* Armazenamento +40% */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-600 font-medium">Armazenamento</span>
                    <span className="font-bold text-emerald-600">↑ 40%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>

                {/* Largura de Banda +35% */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-600 font-medium">Largura de Banda</span>
                    <span className="font-bold text-emerald-600">↑ 35%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>

                {/* Servidores +30% */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-600 font-medium">Servidores</span>
                    <span className="font-bold text-emerald-600">↑ 30%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2 flex justify-end">
              <button
                onClick={() => onOpenSupportModal?.('Previsão de Crescimento')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group"
              >
                <span>Ver previsão detalhada</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Interativo de Detalhes do Centro de Dados */}
      {selectedDC && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 font-sans text-lg">{selectedDC}</h3>
                  <p className="text-xs text-slate-500">
                    {dataCenters.find((d) => d.id === selectedDC)?.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDC(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {dataCenters.find((d) => d.id === selectedDC) && (
              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Endereço IP / Gateway</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {dataCenters.find((d) => d.id === selectedDC)?.ip}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Latência Média</span>
                    <span className="font-semibold text-emerald-600">
                      {dataCenters.find((d) => d.id === selectedDC)?.ping}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Disponibilidade</span>
                    <span className="font-semibold text-slate-900">
                      {dataCenters.find((d) => d.id === selectedDC)?.availability}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Carga Operacional</span>
                    <span className="font-semibold text-slate-900">
                      {dataCenters.find((d) => d.id === selectedDC)?.utilization}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 leading-relaxed">
                  Infraestrutura com redundância Tier III, alimentação 100% de fontes renováveis e monitorização 24/7 com proteção contra ataques DDoS integrados ao VILA Cloud Shield.
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedDC(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  setSelectedDC(null);
                  onOpenSupportModal?.(`Centro de Dados ${selectedDC}`);
                }}
                className="px-4 py-2 bg-[#5B21B6] hover:bg-purple-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Configurar Recursos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes de Serviço */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 font-sans text-lg">{selectedService}</h3>
                  <span className="text-[11px] text-emerald-600 font-medium">Operacional em todos os nós</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Tempo de Resposta Médio</span>
                <span className="font-semibold text-slate-900">
                  {servicesList.find((s) => s.name === selectedService)?.responseTime || '95ms'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Taxa de Disponibilidade (SLA)</span>
                <span className="font-semibold text-emerald-600">
                  {servicesList.find((s) => s.name === selectedService)?.availability || '99,99%'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Versão Implementada</span>
                <span className="font-mono text-slate-700">
                  {servicesList.find((s) => s.name === selectedService)?.version || 'v3.8.4'}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenSupportModal?.(`Serviço ${selectedService}`);
                }}
                className="px-4 py-2 bg-[#5B21B6] hover:bg-purple-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Diagnóstico Avançado
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Filtros */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 font-sans text-base">Filtros de Infraestrutura</h3>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 mb-1 font-medium">Período de Análise</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                >
                  <option value="24h">Últimas 24 horas</option>
                  <option value="7d">Últimos 7 dias</option>
                  <option value="30d">Últimos 30 dias</option>
                  <option value="1y">Último ano completo</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 mb-1 font-medium">Região de Centros de Dados</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800">
                  <option>Todos os Centros de Dados (Global)</option>
                  <option>Europa (Lisboa, Frankfurt)</option>
                  <option>América Latina (São Paulo)</option>
                  <option>Ásia (Singapura)</option>
                  <option>América do Norte (N. Virginia)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 mb-1 font-medium">Nível de Severidade</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-slate-800">
                  <option>Todos os Status</option>
                  <option>Apenas Online</option>
                  <option>Com Manutenção Agendada</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-4 py-2 bg-[#5B21B6] hover:bg-purple-800 text-white rounded-xl text-xs font-semibold transition-colors w-full"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast de Exportação */}
      {isExportToastOpen && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Relatório de Recursos e Infraestrutura exportado em PDF/CSV!</span>
        </div>
      )}
    </div>
  );
};
