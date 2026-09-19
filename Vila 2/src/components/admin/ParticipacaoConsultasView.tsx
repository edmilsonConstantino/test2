import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Download,
  Filter,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Users,
  MessageSquareQuote,
  PieChart as PieIcon,
  Lightbulb,
  TrendingUp,
  Bike,
  Handshake,
  Recycle,
  GraduationCap,
  FileText,
  Clock,
  ChevronDown,
  X,
  Search,
  Check,
  Building2,
  MapPin,
  Vote,
  Send,
  SlidersHorizontal,
  Share2,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckSquare,
  Lock,
  Eye,
  Info,
} from 'lucide-react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import { DemoUser } from '../../data/demoUsers';
import { BreadcrumbItem } from '../Topbar';
import { ExpandableKpiHeader, KpiCardData } from './ExpandableKpiHeader';
import { LineChart } from './MiniCharts';

interface ParticipacaoConsultasViewProps {
  currentUser: DemoUser;
  onNavigateToTab: (tabId: string) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
  onOpenSupportModal?: () => void;
}

// -----------------------------------------------------------------------------
// Tipos e Interfaces
// -----------------------------------------------------------------------------
export interface ConsultaItem {
  id: string;
  title: string;
  participants: string;
  contributions: string;
  endDate: string;
  startDate?: string;
  area: string;
  status: 'Em Consulta' | 'Em Análise' | 'Em Aberto' | 'Respondidas' | 'Encerradas' | 'Planeada';
  description?: string;
  promoter?: string;
}

export interface IniciativaItem {
  id: string;
  title: string;
  location: string;
  supporters: string;
  status: 'Em Implementação' | 'Em Análise' | 'Em Consulta' | 'Em Planeamento';
  iconType: 'bulb' | 'bike' | 'handshake' | 'recycle' | 'school';
  area: string;
}

export interface RecentActivityItem {
  id: string;
  type: 'publish' | 'contribution' | 'initiative' | 'response' | 'closed';
  title: string;
  boldTarget: string;
  author: string;
  timeAgo: string;
}

export const ParticipacaoConsultasView: React.FC<ParticipacaoConsultasViewProps> = ({
  currentUser,
  onNavigateToTab,
  onBreadcrumbChange,
}) => {
  // ---------------------------------------------------------------------------
  // Estados Locais e Interativos
  // ---------------------------------------------------------------------------
  const [dateRange, setDateRange] = useState('01 Mai 2024 - 24 Mai 2025');
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isNewConsultaModalOpen, setIsNewConsultaModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedConsulta, setSelectedConsulta] = useState<ConsultaItem | null>(null);
  const [selectedIniciativa, setSelectedIniciativa] = useState<IniciativaItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filtros de seleção
  const [selectedAreaFilter, setSelectedAreaFilter] = useState('Todas');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('Todos');
  const [chartPeriod, setChartPeriod] = useState('Últimos 12 meses');
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);
  const [hoveredDonutSegment, setHoveredDonutSegment] = useState<string | null>(null);
  const [mapZoom, setMapZoom] = useState(1);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // Breadcrumb synchronization
  React.useEffect(() => {
    onBreadcrumbChange?.([
      { label: 'Plataforma VILA', onClick: () => onNavigateToTab('painel-gestao') },
      { label: 'Participação e Consultas' },
    ]);
  }, [onBreadcrumbChange, onNavigateToTab]);

  // ---------------------------------------------------------------------------
  // 1. KPIs Cards Data (Conforme Screenshot)
  // ---------------------------------------------------------------------------
  const kpiCards = [
    {
      id: 'kpi-ativas',
      title: 'Consultas Ativas',
      value: '25',
      trend: '↑ 19%',
      period: 'desde o ano passado',
      icon: MessageSquare,
      iconBg: 'bg-emerald-50/90',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-100/70',
    },
    {
      id: 'kpi-concluidas',
      title: 'Consultas Concluídas',
      value: '148',
      trend: '↑ 24%',
      period: 'desde o ano passado',
      icon: CheckCircle2,
      iconBg: 'bg-blue-50/90',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100/70',
    },
    {
      id: 'kpi-participantes',
      title: 'Participantes Únicos',
      value: '128.742',
      trend: '↑ 28%',
      period: 'desde o ano passado',
      icon: Users,
      iconBg: 'bg-blue-50/90',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100/70',
    },
    {
      id: 'kpi-contributos',
      title: 'Contributos Recebidos',
      value: '356.891',
      trend: '↑ 31%',
      period: 'desde o ano passado',
      icon: MessageSquareQuote,
      iconBg: 'bg-amber-50/90',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-100/70',
    },
    {
      id: 'kpi-taxa',
      title: 'Taxa de Participação',
      value: '18,6%',
      trend: '↑ 2,4 pp',
      period: 'desde o ano passado',
      icon: Clock,
      iconBg: 'bg-blue-50/90',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100/70',
    },
    {
      id: 'kpi-iniciativas',
      title: 'Iniciativas Cidadãs',
      value: '67',
      trend: '↑ 17%',
      period: 'desde o ano passado',
      icon: Lightbulb,
      iconBg: 'bg-blue-50/90',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100/70',
    },
  ];

  // Cards do cabeçalho expansível (mesmos dados, formato KpiCardData)
  const participacaoKpiCards: KpiCardData[] = kpiCards.map((kpi, idx) => {
    const Icon = kpi.icon;
    return {
      id: kpi.id,
      label: kpi.title,
      value: kpi.value,
      trend: kpi.trend,
      trendPeriod: kpi.period,
      bgClass: kpi.iconBg,
      iconClass: kpi.iconColor,
      icon: <Icon className="w-4 h-4" strokeWidth={2.2} />,
      spark: [
        16 + idx, 22 + idx, 19 + idx, 26 + idx, 24 + idx, 31 + idx,
        29 + idx, 36 + idx, 34 + idx, 42 + idx, 40 + idx, 48 + idx,
      ],
    };
  });

  // ---------------------------------------------------------------------------
  // 2. Evolução da Participação (Gráfico de Linha 12 Meses)
  // ---------------------------------------------------------------------------
  const monthlyData = [
    { month: 'Jun', participants: 55, contributions: 26, pLabel: '55.200', cLabel: '26.100' },
    { month: 'Jul', participants: 68, contributions: 33, pLabel: '68.400', cLabel: '33.200' },
    { month: 'Ago', participants: 76, contributions: 41, pLabel: '76.100', cLabel: '41.500' },
    { month: 'Set', participants: 88, contributions: 49, pLabel: '88.300', cLabel: '49.000' },
    { month: 'Out', participants: 98, contributions: 56, pLabel: '98.900', cLabel: '56.400' },
    { month: 'Nov', participants: 108, contributions: 65, pLabel: '108.500', cLabel: '65.200' },
    { month: 'Dez', participants: 115, contributions: 68, pLabel: '115.000', cLabel: '68.100' },
    { month: 'Jan', participants: 118, contributions: 74, pLabel: '118.200', cLabel: '74.300' },
    { month: 'Fev', participants: 124, contributions: 79, pLabel: '124.600', cLabel: '79.200' },
    { month: 'Mar', participants: 131, contributions: 84, pLabel: '131.800', cLabel: '84.600' },
    { month: 'Abr', participants: 140, contributions: 89, pLabel: '140.200', cLabel: '89.500' },
    { month: 'Mai', participants: 148, contributions: 96, pLabel: '148.742', cLabel: '96.891' },
  ];

  // ---------------------------------------------------------------------------
  // 3. Mapa D3 Natural Earth: Participação por Região
  // ---------------------------------------------------------------------------
  const [hoveredCountry, setHoveredCountry] = useState<{
    name: string;
    level: string;
    participants: string;
  } | null>(null);

  const mapFeatures = useMemo(() => {
    const width = 520;
    const height = 260;
    const projection = geoNaturalEarth1()
      .scale(84)
      .translate([width / 2, height / 2 + 10]);
    const pathGen = geoPath().projection(projection);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countriesFeature = feature(worldData as any, (worldData as any).objects.countries);

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

        // Cores de Participação por Região:
        // Muito Elevada: #0F448A
        // Elevada: #2D79D1
        // Média: #99C0EB
        // Baixa: #C4DAF3
        // Muito Baixa: #F1F5F9
        let fill = '#F1F5F9';
        let level = 'Muito Baixa';
        let participants = '320';

        if (['Portugal', 'Brazil', 'Mozambique', 'Angola', 'United States of America'].includes(name)) {
          fill = '#0F448A';
          level = 'Muito Elevada';
          participants = name === 'Portugal' ? '42.800' : name === 'Brazil' ? '38.400' : '18.900';
        } else if (['Russia', 'China', 'Spain', 'France', 'Germany', 'United Kingdom', 'India', 'South Africa'].includes(name)) {
          fill = '#2D79D1';
          level = 'Elevada';
          participants = '14.200';
        } else if (['Canada', 'Australia', 'Italy', 'Japan', 'Mexico', 'Colombia', 'Argentina', 'Kenya', 'Cape Verde', 'Guinea-Bissau', 'Timor-Leste', 'Sao Tome and Principe'].includes(name)) {
          fill = '#99C0EB';
          level = 'Média';
          participants = '6.450';
        } else if (['Greenland', 'Chile', 'Peru', 'Norway', 'Sweden', 'Finland', 'Morocco', 'Algeria', 'Dem. Rep. Congo', 'Saudi Arabia', 'Turkey', 'Kazakhstan', 'New Zealand'].includes(name)) {
          fill = '#C4DAF3';
          level = 'Baixa';
          participants = '1.820';
        }

        return {
          key: `pc-map-${f.id !== undefined && f.id !== null ? f.id : index}-${index}`,
          d,
          name,
          fill,
          level,
          participants,
        };
      });
  }, []);

  // ---------------------------------------------------------------------------
  // 4. Consultas por Status (Donut Chart)
  // ---------------------------------------------------------------------------
  const statusData = [
    { label: 'Em Aberto', count: 25, percentage: 21, color: '#10B981', dotClass: 'bg-emerald-500' },
    { label: 'Em Consulta', count: 43, percentage: 36, color: '#2D79D1', dotClass: 'bg-blue-500' },
    { label: 'Em Análise', count: 28, percentage: 23, color: '#5F9DE0', dotClass: 'bg-blue-500' },
    { label: 'Respondidas', count: 31, percentage: 16, color: '#F58300', dotClass: 'bg-blue-500' },
    { label: 'Encerradas', count: 21, percentage: 4, color: '#DC7600', dotClass: 'bg-blue-500' },
  ];

  // ---------------------------------------------------------------------------
  // 5. Top 5 Consultas por Participação
  // ---------------------------------------------------------------------------
  const topConsultas: ConsultaItem[] = [
    {
      id: 'tc-1',
      title: 'Plano de Mobilidade Urbana',
      participants: '12.842',
      contributions: '34.215',
      endDate: '12 Jun 2025',
      area: 'Mobilidade',
      status: 'Em Consulta',
      promoter: 'Município de Lisboa',
      description: 'Consulta pública para renovação de ciclovias, faixas bus elétricas e pedestrianização da zona central.',
    },
    {
      id: 'tc-2',
      title: 'Estratégia de Sustentabilidade 2030',
      participants: '9.675',
      contributions: '26.913',
      endDate: '25 Mai 2025',
      area: 'Ambiente',
      status: 'Em Consulta',
      promoter: 'Rede Cívica VILA',
      description: 'Definição de metas de neutralidade carbónica territorial e fomento às comunidades solares.',
    },
    {
      id: 'tc-3',
      title: 'Orçamento Participativo 2025',
      participants: '8.321',
      contributions: '21.667',
      endDate: '05 Jun 2025',
      area: 'Cidadania',
      status: 'Em Consulta',
      promoter: 'Câmara Municipal do Porto',
      description: 'Votação dos projetos finalistas nas áreas de educação, cultura de proximidade e áreas verdes.',
    },
    {
      id: 'tc-4',
      title: 'Plano Diretor Municipal',
      participants: '6.784',
      contributions: '17.542',
      endDate: '02 Jun 2025',
      area: 'Urbanismo',
      status: 'Em Análise',
      promoter: 'Direção Geral do Território',
      description: 'Revisão periódica dos índices de edificabilidade e preservação do património histórico arquitetónico.',
    },
    {
      id: 'tc-5',
      title: 'Proteção das Zonas Costeiras',
      participants: '5.943',
      contributions: '13.876',
      endDate: '30 Mai 2025',
      area: 'Ambiente',
      status: 'Em Consulta',
      promoter: 'Município de Cascais',
      description: 'Ações de contingência contra erosão costeira, preservação dunar e ordenamento balnear.',
    },
  ];

  // ---------------------------------------------------------------------------
  // 6. Iniciativas Cidadãs em Destaque
  // ---------------------------------------------------------------------------
  const iniciativasDestaque: IniciativaItem[] = [
    {
      id: 'ini-1',
      title: 'Jardins Comunitários',
      location: 'Lisboa, Portugal',
      supporters: '1.256 apoiantes',
      status: 'Em Implementação',
      iconType: 'bulb',
      area: 'Ambiente',
    },
    {
      id: 'ini-2',
      title: 'Rede de Bicicletas Comunitárias',
      location: 'Porto, Portugal',
      supporters: '892 apoiantes',
      status: 'Em Análise',
      iconType: 'bike',
      area: 'Mobilidade',
    },
    {
      id: 'ini-3',
      title: 'Plataforma de Voluntariado Jovem',
      location: 'Coimbra, Portugal',
      supporters: '743 apoiantes',
      status: 'Em Consulta',
      iconType: 'handshake',
      area: 'Juventude',
    },
    {
      id: 'ini-4',
      title: 'Reciclagem Inteligente',
      location: 'Faro, Portugal',
      supporters: '612 apoiantes',
      status: 'Em Planeamento',
      iconType: 'recycle',
      area: 'Sustentabilidade',
    },
    {
      id: 'ini-5',
      title: 'Educação Ambiental nas Escolas',
      location: 'Braga, Portugal',
      supporters: '598 apoiantes',
      status: 'Em Implementação',
      iconType: 'school',
      area: 'Educação',
    },
  ];

  // ---------------------------------------------------------------------------
  // 7. Contributos por Tema (Progress Bars)
  // ---------------------------------------------------------------------------
  const temasData = [
    { name: 'Ambiente', percentage: 28 },
    { name: 'Mobilidade', percentage: 22 },
    { name: 'Educação', percentage: 16 },
    { name: 'Economia', percentage: 12 },
    { name: 'Cultura', percentage: 8 },
    { name: 'Saúde', percentage: 7 },
    { name: 'Outros', percentage: 7 },
  ];

  // ---------------------------------------------------------------------------
  // 8. Consultas Recentes
  // ---------------------------------------------------------------------------
  const consultasRecentes: ConsultaItem[] = [
    {
      id: 'cr-1',
      title: 'Requalificação da Frente Ribeirinha',
      area: 'Ambiente',
      startDate: '20 Mai 2025',
      endDate: '30 Jun 2025',
      participants: '3.421',
      contributions: '8.920',
      status: 'Em Consulta',
    },
    {
      id: 'cr-2',
      title: 'Tarifas de Transportes Públicos',
      area: 'Mobilidade',
      startDate: '19 Mai 2025',
      endDate: '28 Jun 2025',
      participants: '2.876',
      contributions: '6.450',
      status: 'Em Consulta',
    },
    {
      id: 'cr-3',
      title: 'Programa de Apoio ao Empreendedorismo',
      area: 'Economia',
      startDate: '18 Mai 2025',
      endDate: '25 Jun 2025',
      participants: '1.984',
      contributions: '4.120',
      status: 'Em Análise',
    },
    {
      id: 'cr-4',
      title: 'Plano de Arborização Urbana',
      area: 'Ambiente',
      startDate: '17 Mai 2025',
      endDate: '24 Jun 2025',
      participants: '2.213',
      contributions: '5.670',
      status: 'Em Consulta',
    },
    {
      id: 'cr-5',
      title: 'Eventos Culturais 2025',
      area: 'Cultura',
      startDate: '16 Mai 2025',
      endDate: '20 Jun 2025',
      participants: '1.654',
      contributions: '3.890',
      status: 'Em Consulta',
    },
  ];

  // ---------------------------------------------------------------------------
  // 9. Próximas Consultas a Iniciar
  // ---------------------------------------------------------------------------
  const proximasConsultas = [
    {
      id: 'pc-1',
      title: 'Habitação Acessível',
      area: 'Habitação',
      startDate: '01 Jun 2025',
      status: 'Planeada',
    },
    {
      id: 'pc-2',
      title: 'Energia Renovável Comunitária',
      area: 'Ambiente',
      startDate: '03 Jun 2025',
      status: 'Planeada',
    },
    {
      id: 'pc-3',
      title: 'Digitalização dos Serviços Municipais',
      area: 'Tecnologia',
      startDate: '05 Jun 2025',
      status: 'Planeada',
    },
    {
      id: 'pc-4',
      title: 'Plano de Juventude',
      area: 'Educação',
      startDate: '07 Jun 2025',
      status: 'Planeada',
    },
    {
      id: 'pc-5',
      title: 'Turismo Sustentável',
      area: 'Turismo',
      startDate: '10 Jun 2025',
      status: 'Planeada',
    },
  ];

  // ---------------------------------------------------------------------------
  // 10. Atividade Recente
  // ---------------------------------------------------------------------------
  const atividadesRecentes: RecentActivityItem[] = [
    {
      id: 'act-1',
      type: 'publish',
      title: 'Nova consulta publicada: ',
      boldTarget: '"Plano de Mobilidade Urbana"',
      author: 'por Município de Lisboa',
      timeAgo: 'há 10 min',
    },
    {
      id: 'act-2',
      type: 'contribution',
      title: 'Contributo destacado em ',
      boldTarget: '"Orçamento Participativo 2025"',
      author: 'por João Silva',
      timeAgo: 'há 25 min',
    },
    {
      id: 'act-3',
      type: 'initiative',
      title: 'Iniciativa cidadã apoiada: ',
      boldTarget: '"Jardins Comunitários"',
      author: 'atingiu 1000 apoiantes',
      timeAgo: 'há 1 h',
    },
    {
      id: 'act-4',
      type: 'response',
      title: 'Nova resposta oficial em ',
      boldTarget: '"Proteção das Zonas Costeiras"',
      author: 'por Município de Cascais',
      timeAgo: 'há 2 h',
    },
    {
      id: 'act-5',
      type: 'closed',
      title: 'Consulta encerrada: ',
      boldTarget: '"Eventos Culturais 2024"',
      author: 'Resultados publicados',
      timeAgo: 'há 3 h',
    },
  ];

  // ---------------------------------------------------------------------------
  // Status Badge Helper
  // ---------------------------------------------------------------------------
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Em Consulta':
      case 'Em Aberto':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80">
            {status}
          </span>
        );
      case 'Em Análise':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200/80">
            {status}
          </span>
        );
      case 'Em Implementação':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80">
            {status}
          </span>
        );
      case 'Em Planeamento':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-700 border border-blue-200/80">
            {status}
          </span>
        );
      case 'Planeada':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-700 border border-blue-200/80">
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
            {status}
          </span>
        );
    }
  };

  // ---------------------------------------------------------------------------
  // Render Principal
  // ---------------------------------------------------------------------------
  return (
    <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-7 py-4 sm:py-6 space-y-5">
      {/* Toast de Notificação */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          CABEÇALHO DA PÁGINA (Com Titular, Subtítulo e Controles à Direita)
          ===================================================================== */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Lado Esquerdo: Ícone + Título + Descrição */}
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#E2ECF9] text-[#1455AC] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-slate-50 font-sans tracking-tight">
              Participação e Consultas
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal mt-0.5 max-w-2xl leading-relaxed">
              Promova a participação cidadã e acompanhe todas as consultas públicas e iniciativas participativas na rede VILA.
            </p>
          </div>
        </div>

        {/* Lado Direito: Status em Tempo Real + Seletor de Datas + Botões de Ação */}
        <div className="flex flex-col items-start xl:items-end gap-2.5 shrink-0">
          {/* Indicadores de Atualização e Tempo Real */}
          <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Dados atualizados: 10:32</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Dados em tempo real</span>
            </span>
          </div>

          {/* Grupo de Ações: Data, Exportar e Filtros */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Seletor de Intervalo de Datas */}
            <button
              type="button"
              onClick={() => setIsDateModalOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors shadow-2xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            </button>

            {/* Botão Exportar */}
            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Exportar</span>
            </button>

            {/* Botão Filtros (Sólido Roxo) */}
            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1455AC] hover:bg-[#0F448A] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          LINHA 1: colapsado em 5 + botão "Ver mais cards" (6 no total)
          ===================================================================== */}
      <ExpandableKpiHeader
        cards={participacaoKpiCards}
        visibleCount={5}
        xlCols={6}
        onOpenDetail={(label) => showToast(`A abrir detalhes: ${label}`)}
      />

      {/* =====================================================================
          LINHA 2: 3 CARDS ANALÍTICOS (Grid 3 Colunas)
          1. Evolução da Participação
          2. Participação por Região
          3. Consultas por Status
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* CARD 1: Evolução da Participação */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">
                Evolução da Participação
              </h2>
              {/* Dropdown de Período */}
              <div className="relative">
                <select
                  value={chartPeriod}
                  onChange={(e) => setChartPeriod(e.target.value)}
                  className="text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-lg px-2.5 py-1 pr-6 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                >
                  <option value="Últimos 12 meses">Últimos 12 meses</option>
                  <option value="Ano 2024">Ano 2024</option>
                  <option value="Últimos 6 meses">Últimos 6 meses</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Legenda: Participantes vs Contributos */}
            <div className="mt-3 flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D79D1]" />
                <span>Participantes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span>Contributos</span>
              </div>
            </div>

            {/* Gráfico de Linha realista (grelha, eixos e pontos) */}
            <div
              className="relative w-full mt-2 cursor-crosshair"
              onMouseLeave={() => setHoveredMonthIndex(null)}
              onMouseMove={(e) => {
                const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                const relX = (e.clientX - rect.left) / rect.width;
                setHoveredMonthIndex(
                  Math.min(monthlyData.length - 1, Math.max(0, Math.round(relX * (monthlyData.length - 1))))
                );
              }}
            >
              <LineChart
                series={[
                  { name: 'Participantes', color: '#2D79D1', values: monthlyData.map((d) => d.participants * 1000) },
                  { name: 'Contributos', color: '#10B981', values: monthlyData.map((d) => d.contributions * 1000) },
                ]}
                labels={monthlyData.map((d) => d.month)}
                height={195}
                yTicks={5}
                formatY={(v) => (v >= 1000 ? `${Math.round(v / 1000)}K` : String(v))}
              />

              {/* Tooltip Dinâmico do Gráfico */}
              {hoveredMonthIndex !== null && (
                <div
                  className="absolute bg-slate-900/90 text-white px-2.5 py-1.5 rounded-lg text-[10px] pointer-events-none shadow-xl border border-slate-700 z-10 left-3 top-2"
                >
                  <p className="font-bold text-slate-200">
                    {monthlyData[hoveredMonthIndex].month} 2025
                  </p>
                  <p className="text-blue-300">
                    Participantes: {monthlyData[hoveredMonthIndex].pLabel}
                  </p>
                  <p className="text-emerald-300">
                    Contributos: {monthlyData[hoveredMonthIndex].cLabel}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Rodapé: Ver Relatório Completo */}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateToTab('relatorios-dados')}
              className="text-xs sm:text-sm font-bold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver relatório completo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 2: Participação por Região (World Map com Legenda) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Participação por Região
            </h2>

            <div className="mt-3 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              {/* Legenda Vertical à Esquerda */}
              <div className="w-full sm:w-36 space-y-2 shrink-0 self-center">
                <div className="flex items-center gap-2 text-xs font-medium text-[#0B2C58]">
                  <span className="w-3 h-3 rounded-[3px] bg-[#0F448A] shrink-0" />
                  <span>Muito Elevada</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#0B2C58]">
                  <span className="w-3 h-3 rounded-[3px] bg-[#2D79D1] shrink-0" />
                  <span>Elevada</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#0B2C58]">
                  <span className="w-3 h-3 rounded-[3px] bg-[#99C0EB] shrink-0" />
                  <span>Média</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#0B2C58]">
                  <span className="w-3 h-3 rounded-[3px] bg-[#C4DAF3] shrink-0" />
                  <span>Baixa</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#0B2C58]">
                  <span className="w-3 h-3 rounded-[3px] bg-[#F1F5F9] border border-slate-200 dark:border-slate-700 shrink-0" />
                  <span>Muito Baixa</span>
                </div>
              </div>

              {/* Mapa D3 Natural Earth */}
              <div className="relative flex-1 w-full h-[180px] flex items-center justify-center">
                <svg
                  viewBox="0 0 520 260"
                  className="w-full h-full object-contain select-none"
                >
                  <g>
                    {mapFeatures.map((feat) => {
                      if (!feat) return null;
                      return (
                        <path
                          key={feat.key}
                          d={feat.d}
                          fill={feat.fill}
                          stroke="#FFFFFF"
                          strokeWidth={0.5}
                          className="transition-all duration-150 cursor-pointer hover:opacity-85 hover:stroke-[#0F448A] hover:stroke-[1px]"
                          onMouseEnter={() => {
                            setHoveredCountry({
                              name: feat.name,
                              level: feat.level,
                              participants: feat.participants,
                            });
                          }}
                          onMouseLeave={() => setHoveredCountry(null)}
                          onClick={() => {
                            showToast(`Região selecionada: ${feat.name} (${feat.level})`);
                          }}
                        />
                      );
                    })}
                  </g>
                </svg>

                {/* Tooltip do Mapa */}
                {hoveredCountry && (
                  <div className="absolute top-1 right-1 bg-slate-900/90 text-white px-2.5 py-1.5 rounded-lg text-[10.5px] pointer-events-none shadow-xl z-10 border border-slate-700 animate-in fade-in duration-100">
                    <p className="font-bold text-slate-100">{hoveredCountry.name}</p>
                    <p className="text-blue-300 font-semibold">{hoveredCountry.level}</p>
                    <p className="text-slate-300 text-[10px]">
                      {hoveredCountry.participants} participantes
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rodapé: Ver mapa interativo */}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setIsMapModalOpen(true)}
              className="text-xs sm:text-sm font-bold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver mapa interativo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 3: Consultas por Status (Donut Chart) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Consultas por Status
            </h2>

            <div className="mt-4 flex items-center justify-between gap-4">
              {/* Donut Chart SVG */}
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Segmentos do Donut baseados em porcentagens cumulativas */}
                  {/* Círculo base: r=38, perimetro = 2 * PI * 38 ≈ 238.76 */}
                  {/* 1. Em Aberto: 21% (dash: 50.14, offset: 0) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="47.5 178.6"
                    strokeDashoffset="0"
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                    onMouseEnter={() => setHoveredDonutSegment('Em Aberto')}
                    onMouseLeave={() => setHoveredDonutSegment(null)}
                  />
                  {/* 2. Em Consulta: 36% (dash: 81.4, offset: -47.5) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#2D79D1"
                    strokeWidth="14"
                    strokeDasharray="81.4 144.7"
                    strokeDashoffset="-47.5"
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                    onMouseEnter={() => setHoveredDonutSegment('Em Consulta')}
                    onMouseLeave={() => setHoveredDonutSegment(null)}
                  />
                  {/* 3. Em Análise: 23% (dash: 52.0, offset: -128.9) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#5F9DE0"
                    strokeWidth="14"
                    strokeDasharray="52.0 174.1"
                    strokeDashoffset="-128.9"
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                    onMouseEnter={() => setHoveredDonutSegment('Em Análise')}
                    onMouseLeave={() => setHoveredDonutSegment(null)}
                  />
                  {/* 4. Respondidas: 16% (dash: 36.2, offset: -180.9) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#F58300"
                    strokeWidth="14"
                    strokeDasharray="36.2 189.9"
                    strokeDashoffset="-180.9"
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                    onMouseEnter={() => setHoveredDonutSegment('Respondidas')}
                    onMouseLeave={() => setHoveredDonutSegment(null)}
                  />
                  {/* 5. Encerradas: 4% (dash: 9.0, offset: -217.1) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#DC7600"
                    strokeWidth="14"
                    strokeDasharray="9.0 217.1"
                    strokeDashoffset="-217.1"
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                    onMouseEnter={() => setHoveredDonutSegment('Encerradas')}
                    onMouseLeave={() => setHoveredDonutSegment(null)}
                  />
                </svg>

                {/* Centro do Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-black text-[#0F172A] dark:text-slate-50 font-sans">
                    148
                  </span>
                  <span className="text-[9.5px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Total
                  </span>
                </div>
              </div>

              {/* Lista de Legenda e Estatísticas */}
              <div className="flex-1 space-y-2">
                {statusData.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 p-1 rounded-md transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
                    </div>
                    <span className="font-bold text-[#0F172A] dark:text-slate-50">
                      {item.count} <span className="text-slate-400 dark:text-slate-500 font-normal">({item.percentage}%)</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rodapé: Ver todas as consultas */}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A filtrar por todas as consultas')}
              className="text-xs sm:text-sm font-bold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver todas as consultas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          LINHA 3: 3 CARDS DE CONTEÚDO (Grid 3 Colunas)
          1. Top 5 Consultas por Participação
          2. Iniciativas Cidadãs em Destaque
          3. Contributos por Tema
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* CARD 1: Top 5 Consultas por Participação */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Top 5 Consultas por Participação
            </h2>

            <div className="mt-3 overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/70 dark:border-slate-700 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                    <th className="pb-2 font-medium">Consulta</th>
                    <th className="pb-2 text-right font-medium">Participantes</th>
                    <th className="pb-2 text-right font-medium">Contributos</th>
                    <th className="pb-2 text-right font-medium">Termina em</th>
                    <th className="pb-2 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-xs">
                  {topConsultas.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedConsulta(c)}
                      className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                    >
                      <td className="py-2.5 pr-2 font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#1455AC] max-w-[150px] truncate">
                        {c.title}
                      </td>
                      <td className="py-2.5 px-2 text-right text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">
                        {c.participants}
                      </td>
                      <td className="py-2.5 px-2 text-right text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">
                        {c.contributions}
                      </td>
                      <td className="py-2.5 px-2 text-right text-slate-500 dark:text-slate-400 whitespace-nowrap text-[11px]">
                        {c.endDate}
                      </td>
                      <td className="py-2.5 pl-2 text-right whitespace-nowrap">
                        {renderStatusBadge(c.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rodapé */}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A ver listagem integral das consultas por participação')}
              className="text-xs sm:text-sm font-bold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver todas as consultas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 2: Iniciativas Cidadãs em Destaque */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Iniciativas Cidadãs em Destaque
            </h2>

            <div className="mt-3 space-y-2.5">
              {iniciativasDestaque.map((ini) => {
                return (
                  <div
                    key={ini.id}
                    onClick={() => setSelectedIniciativa(ini)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Caixa de Ícone Temática */}
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                        {ini.iconType === 'bulb' && <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                        {ini.iconType === 'bike' && <Bike className="w-4 h-4 text-blue-600" />}
                        {ini.iconType === 'handshake' && <Handshake className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                        {ini.iconType === 'recycle' && <Recycle className="w-4 h-4 text-blue-600" />}
                        {ini.iconType === 'school' && <GraduationCap className="w-4 h-4 text-blue-600" />}
                      </div>

                      {/* Nome e Local / Apoiantes */}
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#1455AC] truncate">
                          {ini.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {ini.location} • <span className="font-semibold text-slate-600 dark:text-slate-400">{ini.supporters}</span>
                        </p>
                      </div>
                    </div>

                    {/* Badge de Status */}
                    <div className="shrink-0 ml-2">
                      {renderStatusBadge(ini.status)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rodapé */}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A ver todas as iniciativas cidadãs')}
              className="text-xs sm:text-sm font-bold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver todas as iniciativas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 3: Contributos por Tema */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Contributos por Tema
            </h2>

            <div className="mt-4 space-y-3">
              {temasData.map((tema) => (
                <div key={tema.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300">{tema.name}</span>
                    <span className="font-bold text-[#0F172A] dark:text-slate-50">{tema.percentage}%</span>
                  </div>
                  {/* Barra de Progresso Roxo Vívido */}
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#1455AC] transition-all duration-500"
                      style={{ width: `${tema.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé */}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A abrir análise completa dos temas participativos')}
              className="text-xs sm:text-sm font-bold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver análise completa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          LINHA 4: 3 CARDS DE OPERAÇÃO E HISTÓRICO (Grid 3 Colunas)
          1. Consultas Recentes
          2. Próximas Consultas a Iniciar
          3. Atividade Recente
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* CARD 1: Consultas Recentes */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Consultas Recentes
            </h2>

            <div className="mt-3 overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/70 dark:border-slate-700 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                    <th className="pb-2 font-medium">Consulta</th>
                    <th className="pb-2 font-medium">Área</th>
                    <th className="pb-2 font-medium">Início</th>
                    <th className="pb-2 text-right font-medium">Participantes</th>
                    <th className="pb-2 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-xs">
                  {consultasRecentes.map((cr) => (
                    <tr
                      key={cr.id}
                      onClick={() => setSelectedConsulta(cr)}
                      className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                    >
                      <td className="py-2.5 pr-2 font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#1455AC] max-w-[140px] truncate">
                        {cr.title}
                      </td>
                      <td className="py-2.5 px-2 text-slate-600 dark:text-slate-400 text-[11px] whitespace-nowrap">
                        {cr.area}
                      </td>
                      <td className="py-2.5 px-2 text-slate-500 dark:text-slate-400 text-[11px] whitespace-nowrap">
                        {cr.startDate}
                      </td>
                      <td className="py-2.5 px-2 text-right text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">
                        {cr.participants}
                      </td>
                      <td className="py-2.5 pl-2 text-right whitespace-nowrap">
                        {renderStatusBadge(cr.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rodapé */}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A ver histórico integral de consultas recentes')}
              className="text-xs sm:text-sm font-bold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver todas as consultas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 2: Próximas Consultas a Iniciar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Próximas Consultas a Iniciar
            </h2>

            <div className="mt-3 overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/70 dark:border-slate-700 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                    <th className="pb-2 font-medium">Consulta</th>
                    <th className="pb-2 font-medium">Área</th>
                    <th className="pb-2 font-medium">Início Previsto</th>
                    <th className="pb-2 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 text-xs">
                  {proximasConsultas.map((pc) => (
                    <tr
                      key={pc.id}
                      onClick={() => showToast(`Consulta planeada: ${pc.title}`)}
                      className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                    >
                      <td className="py-2.5 pr-2 font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 max-w-[160px] truncate">
                        {pc.title}
                      </td>
                      <td className="py-2.5 px-2 text-slate-600 dark:text-slate-400 text-[11px] whitespace-nowrap">
                        {pc.area}
                      </td>
                      <td className="py-2.5 px-2 text-slate-500 dark:text-slate-400 text-[11px] whitespace-nowrap">
                        {pc.startDate}
                      </td>
                      <td className="py-2.5 pl-2 text-right whitespace-nowrap">
                        {renderStatusBadge(pc.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rodapé */}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A ver calendário de futuras consultas agendadas')}
              className="text-xs sm:text-sm font-bold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver todas as futuras consultas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 3: Atividade Recente */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Atividade Recente
            </h2>

            <div className="mt-3 space-y-2.5">
              {atividadesRecentes.map((act) => (
                <div
                  key={act.id}
                  className="flex items-start justify-between gap-2 p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    {/* Ícone de Atividade */}
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                      {act.type === 'publish' && <FileText className="w-3.5 h-3.5 text-blue-600" />}
                      {act.type === 'contribution' && <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                      {act.type === 'initiative' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                      {act.type === 'response' && <MessageSquare className="w-3.5 h-3.5 text-blue-600" />}
                      {act.type === 'closed' && <CheckSquare className="w-3.5 h-3.5 text-blue-600" />}
                    </div>

                    {/* Texto com título em negrito */}
                    <div className="min-w-0 text-xs">
                      <p className="text-slate-700 dark:text-slate-300 leading-snug">
                        {act.title}
                        <span className="font-bold text-[#0F172A] dark:text-slate-50">{act.boldTarget}</span>
                      </p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{act.author}</p>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500 whitespace-nowrap shrink-0">
                    {act.timeAgo}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé */}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A abrir registo de auditoria e atividade')}
              className="text-xs sm:text-sm font-bold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver toda a atividade</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODAIS INTERATIVOS
          ===================================================================== */}

      {/* MODAL 1: Detalhes da Consulta */}
      {selectedConsulta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  {selectedConsulta.area}
                </span>
                <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
                  {selectedConsulta.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedConsulta(null)}
                className="p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {selectedConsulta.description ||
                'Consulta pública em andamento com auscultação participativa dos cidadãos e organizações locais da rede VILA.'}
            </p>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold">Participantes</span>
                <p className="font-extrabold text-[#0F172A] dark:text-slate-50 text-sm">{selectedConsulta.participants}</p>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold">Contributos</span>
                <p className="font-extrabold text-[#0F172A] dark:text-slate-50 text-sm">{selectedConsulta.contributions}</p>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold">Data de Encerramento</span>
                <p className="font-semibold text-slate-700 dark:text-slate-300">{selectedConsulta.endDate}</p>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold">Estado</span>
                <div className="mt-0.5">{renderStatusBadge(selectedConsulta.status)}</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/70 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setSelectedConsulta(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Relatório gerado para "${selectedConsulta.title}"`);
                  setSelectedConsulta(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1455AC] text-white hover:bg-[#0F448A] cursor-pointer"
              >
                Exportar Relatório
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Detalhes da Iniciativa Cidadã */}
      {selectedIniciativa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  {selectedIniciativa.area}
                </span>
                <h2 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
                  {selectedIniciativa.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{selectedIniciativa.location}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIniciativa(null)}
                className="p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-600">Apoio Cidadão</span>
                <p className="text-sm font-black text-blue-900">{selectedIniciativa.supporters}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Estado</span>
                <div>{renderStatusBadge(selectedIniciativa.status)}</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/70 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setSelectedIniciativa(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Iniciativa "${selectedIniciativa.title}" submetida a aprovação`);
                  setSelectedIniciativa(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1455AC] text-white hover:bg-[#0F448A] cursor-pointer"
              >
                Acompanhar Iniciativa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Filtros Globais */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50">Filtros de Participação</h3>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Área Temática</label>
                <select
                  value={selectedAreaFilter}
                  onChange={(e) => setSelectedAreaFilter(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-100"
                >
                  <option value="Todas">Todas as Áreas</option>
                  <option value="Ambiente">Ambiente e Sustentabilidade</option>
                  <option value="Mobilidade">Mobilidade Urbana</option>
                  <option value="Educação">Educação e Juventude</option>
                  <option value="Economia">Economia Local</option>
                  <option value="Cultura">Cultura e Lazer</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Status da Consulta</label>
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-100"
                >
                  <option value="Todos">Todos os Status</option>
                  <option value="Em Consulta">Em Consulta</option>
                  <option value="Em Análise">Em Análise</option>
                  <option value="Em Aberto">Em Aberto</option>
                  <option value="Encerradas">Encerradas</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200/70 dark:border-slate-700">
              <button
                type="button"
                onClick={() => {
                  setSelectedAreaFilter('Todas');
                  setSelectedStatusFilter('Todos');
                  showToast('Filtros repostos com sucesso');
                  setIsFilterModalOpen(false);
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast('Filtros aplicados com sucesso');
                  setIsFilterModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1455AC] text-white hover:bg-[#0F448A] cursor-pointer"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Seletor de Intervalo de Datas */}
      {isDateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50">Selecionar Período</h3>
              <button
                type="button"
                onClick={() => setIsDateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {[
                '01 Mai 2024 - 24 Mai 2025',
                '01 Jan 2025 - 31 Dez 2025',
                'Últimos 6 meses',
                'Últimos 30 dias',
                'Ano 2024 completo',
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setDateRange(opt);
                    showToast(`Período alterado para: ${opt}`);
                    setIsDateModalOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                    dateRange === opt
                      ? 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] font-bold border border-blue-200'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{opt}</span>
                  {dateRange === opt && <Check className="w-4 h-4 text-[#1455AC]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Exportar Dados */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50">Exportar Relatório</h3>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  showToast('Download do PDF de Participação e Consultas iniciado...');
                  setIsExportModalOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-center gap-3 cursor-pointer"
              >
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Relatório Executivo PDF</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">Sumário com gráficos e KPIs</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  showToast('Download do ficheiro CSV concluído...');
                  setIsExportModalOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-center gap-3 cursor-pointer"
              >
                <Download className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Tabela de Dados CSV / Excel</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">Todos os registos e contributos</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: Mapa Interativo Expandido */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-slate-50">
                  Mapa Global de Participação Cidadã
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Distribuição de consultas públicas e votos por país e continente
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMapZoom((z) => Math.min(2.5, z + 0.25))}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 cursor-pointer"
                  title="Aumentar Zoom"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setMapZoom((z) => Math.max(1, z - 0.25))}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 cursor-pointer"
                  title="Diminuir Zoom"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setMapZoom(1)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 cursor-pointer"
                  title="Repor"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative w-full h-[400px] bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 520 260" className="w-full h-full object-contain select-none">
                <g transform={`scale(${mapZoom})`} style={{ transformOrigin: 'center center', transition: 'transform 0.2s ease' }}>
                  {mapFeatures.map((feat) => {
                    if (!feat) return null;
                    return (
                      <path
                        key={`modal-${feat.key}`}
                        d={feat.d}
                        fill={feat.fill}
                        stroke="#FFFFFF"
                        strokeWidth={0.5}
                        className="transition-all duration-150 cursor-pointer hover:opacity-85 hover:stroke-[#0F448A] hover:stroke-[1px]"
                        onClick={() => {
                          showToast(`${feat.name}: ${feat.level} (${feat.participants} participantes)`);
                        }}
                      />
                    );
                  })}
                </g>
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/70 dark:border-slate-700">
              <span>* Clique em qualquer país para inspecionar os índices de participação ativa.</span>
              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1455AC] text-white hover:bg-[#0F448A] cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
