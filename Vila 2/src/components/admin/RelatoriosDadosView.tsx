import React, { useState, useMemo, useEffect } from 'react';
import {
  FileText,
  Search,
  Database,
  Share2,
  Download,
  Users,
  SlidersHorizontal,
  Calendar as CalendarIcon,
  ChevronDown,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Globe2,
  Compass,
  Building2,
  Activity,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  Layers,
  BarChart3,
  PieChart,
  Terminal,
  Boxes,
  Code2,
  ShieldCheck,
  Check,
  X,
  Plus,
  RefreshCw,
  Bell,
  Eye,
} from 'lucide-react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import { DemoUser } from '../../data/demoUsers';
import { BreadcrumbItem } from '../Topbar';
import { ExpandableKpiHeader, KpiCardData } from './ExpandableKpiHeader';

interface RelatoriosDadosViewProps {
  currentUser: DemoUser;
  onNavigateToTab: (tabId: string) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
  onOpenSupportModal?: (actionContext?: string) => void;
}

export const RelatoriosDadosView: React.FC<RelatoriosDadosViewProps> = ({
  currentUser,
  onNavigateToTab,
  onBreadcrumbChange,
  onOpenSupportModal,
}) => {
  // Breadcrumb synchronization
  useEffect(() => {
    onBreadcrumbChange?.([
      { label: 'Plataforma VILA', onClick: () => onNavigateToTab('painel-gestao') },
      { label: 'Relatórios e Dados' },
    ]);
  }, [onBreadcrumbChange, onNavigateToTab]);

  // States
  const [dateRange, setDateRange] = useState('01 Mai 2024 - 24 Mai 2025');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [selectedSource, setSelectedSource] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [evolutionPeriod, setEvolutionPeriod] = useState('Últimos 12 meses');
  const [hoveredPointEvolution, setHoveredPointEvolution] = useState<number | null>(null);
  const [hoveredPointTrends, setHoveredPointTrends] = useState<number | null>(null);

  // Scheduled reports toggles
  const [scheduledReports, setScheduledReports] = useState([
    { id: 'sch-1', name: 'Relatório Semanal de Atividades', freq: 'Semanal', schedule: 'Segundas, 08:00', active: true },
    { id: 'sch-2', name: 'Monitorização de Projetos', freq: 'Semanal', schedule: 'Sextas, 09:00', active: true },
    { id: 'sch-3', name: 'Indicadores de Territórios', freq: 'Mensal', schedule: 'Dia 5, 07:00', active: true },
    { id: 'sch-4', name: 'Análise de Participação', freq: 'Mensal', schedule: 'Dia 10, 08:00', active: false },
    { id: 'sch-5', name: 'Relatório de Sustentabilidade', freq: 'Trimestral', schedule: 'Dia 1, 09:00', active: true },
  ]);

  const toggleSchedule = (id: string) => {
    setScheduledReports((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    );
    showToast('Preferência de agendamento atualizada');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // 1. KPI Cards — colapsado em 5 + botão "Ver mais cards"
  const kpiCards: KpiCardData[] = [
    {
      id: 'kpi-relatorios-gerados',
      label: 'Relatórios Gerados',
      value: '1.248',
      trend: '↑ 26%',
      trendPeriod: 'desde o ano passado',
      icon: <FileText className="w-3.5 h-3.5" strokeWidth={2.2} />,
      bgClass: 'bg-blue-50 dark:bg-blue-500/10 border border-blue-100',
      iconClass: 'text-blue-600',
      actionText: 'Ver relatórios',
      spark: [780, 830, 870, 910, 950, 990, 1030, 1080, 1120, 1170, 1210, 1248],
      onClick: () => showToast('A carregar todos os relatórios gerados'),
    },
    {
      id: 'kpi-consultas-dados',
      label: 'Consultas de Dados',
      value: '24.562',
      trend: '↑ 32%',
      trendPeriod: 'desde o ano passado',
      icon: <Search className="w-3.5 h-3.5" strokeWidth={2.2} />,
      bgClass: 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100',
      iconClass: 'text-emerald-600 dark:text-emerald-400',
      actionText: 'Ver detalhes',
      spark: [15.2, 16.1, 17, 17.8, 18.6, 19.4, 20.3, 21.1, 22, 23, 23.8, 24.56],
      onClick: () => showToast('A carregar histórico de consultas de dados'),
    },
    {
      id: 'kpi-conjuntos-dados',
      label: 'Conjuntos de Dados',
      value: '356',
      trend: '↑ 18%',
      trendPeriod: 'desde o ano passado',
      icon: <Database className="w-3.5 h-3.5" strokeWidth={2.2} />,
      bgClass: 'bg-blue-50 dark:bg-blue-500/10 border border-blue-100',
      iconClass: 'text-blue-600',
      actionText: 'Ver conjuntos',
      spark: [268, 276, 284, 292, 300, 308, 316, 326, 336, 344, 350, 356],
      onClick: () => showToast('A abrir catálogo de conjuntos de dados'),
    },
    {
      id: 'kpi-fontes-dados',
      label: 'Fontes de Dados',
      value: '42',
      trend: '↑ 12%',
      trendPeriod: 'desde o ano passado',
      icon: <Share2 className="w-3.5 h-3.5" strokeWidth={2.2} />,
      bgClass: 'bg-blue-50 dark:bg-blue-500/10 border border-blue-100',
      iconClass: 'text-blue-600',
      actionText: 'Ver fontes',
      spark: [34, 35, 35, 36, 37, 37, 38, 39, 40, 41, 42, 42],
      onClick: () => showToast('A carregar lista de fontes de dados integradas'),
    },
    {
      id: 'kpi-downloads-dados',
      label: 'Downloads de Dados',
      value: '8.732',
      trend: '↑ 25%',
      trendPeriod: 'desde o ano passado',
      icon: <TrendingUp className="w-3.5 h-3.5" strokeWidth={2.2} />,
      bgClass: 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100',
      iconClass: 'text-emerald-600 dark:text-emerald-400',
      actionText: 'Ver downloads',
      spark: [5.4, 5.8, 6.1, 6.5, 6.8, 7.1, 7.4, 7.7, 8, 8.3, 8.55, 8.73],
      onClick: () => showToast('A analisar estatísticas de downloads de datasets'),
    },
    {
      id: 'kpi-utilizadores-analiticos',
      label: 'Utilizadores Analíticos',
      value: '842',
      trend: '↑ 20%',
      trendPeriod: 'desde o ano passado',
      icon: <Users className="w-3.5 h-3.5" strokeWidth={2.2} />,
      bgClass: 'bg-blue-50 dark:bg-blue-500/10 border border-blue-100',
      iconClass: 'text-blue-600',
      actionText: 'Ver utilizadores',
      spark: [620, 645, 665, 688, 706, 725, 744, 762, 784, 806, 824, 842],
      onClick: () => showToast('A carregar utilizadores com perfil analítico'),
    },
  ];

  // 2. Dados por Categoria (Donut Breakdown)
  const categoryData = [
    { label: 'Demografia', percent: 28, count: 100, color: '#1455AC', textCol: 'text-blue-600' },
    { label: 'Participação', percent: 22, count: 78, color: '#10B981', textCol: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Projetos', percent: 18, count: 64, color: '#F59E0B', textCol: 'text-amber-500' },
    { label: 'Territórios', percent: 15, count: 53, color: '#2D79D1', textCol: 'text-blue-500' },
    { label: 'Eventos', percent: 9, count: 31, color: '#EF4444', textCol: 'text-blue-500' },
    { label: 'Recursos', percent: 5, count: 18, color: '#F58300', textCol: 'text-amber-500' },
    { label: 'Outros', percent: 3, count: 12, color: '#5F9DE0', textCol: 'text-blue-500' },
  ];

  // 3. Mapa D3 da Cobertura de Dados por Território
  const mapFeatures = useMemo(() => {
    const width = 480;
    const height = 230;
    const projection = geoNaturalEarth1()
      .scale(82)
      .translate([width / 2 - 25, height / 2 + 10]);
    const pathGen = geoPath().projection(projection);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countriesFeature = feature(worldData as any, (worldData as any).objects.countries);

    // Realistic density coloring simulation based on name/id
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
        const d = pathGen(f);
        if (!d) return null;
        const name = f.properties?.name || '';

        // Deterministic classification matching visual map
        let fill = '#99C0EB'; // Default medium light purple
        if (['Portugal', 'Spain', 'France', 'Germany', 'United Kingdom', 'Italy'].includes(name)) {
          fill = '#0F448A'; // Muito Alta
        } else if (['Brazil', 'United States', 'Canada', 'Mozambique', 'Angola'].includes(name)) {
          fill = '#0F448A'; // Alta
        } else if (['India', 'China', 'Australia', 'South Africa', 'Mexico', 'Argentina'].includes(name)) {
          fill = '#5F9DE0'; // Média
        } else if (['Japan', 'Chile', 'Egypt', 'Morocco', 'Kenya'].includes(name)) {
          fill = '#99C0EB'; // Baixa
        } else if (['Russia', 'Kazakhstan', 'Mongolia'].includes(name)) {
          fill = '#C4DAF3'; // Muito Baixa
        } else {
          // Semi-random consistent
          const code = (name.charCodeAt(0) || 0) + index;
          if (code % 5 === 0) fill = '#0F448A';
          else if (code % 5 === 1) fill = '#5F9DE0';
          else if (code % 5 === 2) fill = '#99C0EB';
          else if (code % 5 === 3) fill = '#99C0EB';
          else fill = '#E2ECF9';
        }

        return {
          key: `geom-rep-${index}`,
          d,
          name,
          fill,
        };
      });

    return { paths };
  }, []);

  // 4. Evolução de Dados (3 Linhas: Relatórios, Conjuntos de Dados, Downloads)
  const evolutionTimeline = [
    { month: 'Jun', relatorios: 2.8, conjuntos: 1.4, downloads: 4.8 },
    { month: 'Jul', relatorios: 3.5, conjuntos: 1.9, downloads: 5.4 },
    { month: 'Ago', relatorios: 4.2, conjuntos: 2.3, downloads: 5.9 },
    { month: 'Set', relatorios: 4.8, conjuntos: 2.8, downloads: 6.4 },
    { month: 'Dez', relatorios: 5.5, conjuntos: 3.2, downloads: 7.1 },
    { month: 'Dez', relatorios: 6.2, conjuntos: 3.6, downloads: 7.6 },
    { month: 'Jan', relatorios: 6.8, conjuntos: 3.9, downloads: 8.0 },
    { month: 'Fev', relatorios: 7.3, conjuntos: 4.3, downloads: 8.4 },
    { month: 'Mar', relatorios: 7.8, conjuntos: 4.7, downloads: 8.8 },
    { month: 'Abr', relatorios: 8.2, conjuntos: 5.0, downloads: 9.3 },
    { month: 'Mai', relatorios: 8.7, conjuntos: 5.4, downloads: 9.8 },
  ];

  const evolutionPoints = useMemo(() => {
    const startX = 35;
    const stepX = 43;
    const baseY = 165;
    const maxYVal = 10; // 10K
    const heightSpan = 135;

    const relCoords = evolutionTimeline.map((d, i) => ({
      x: startX + i * stepX,
      y: baseY - (d.relatorios / maxYVal) * heightSpan,
      ...d,
    }));

    const conCoords = evolutionTimeline.map((d, i) => ({
      x: startX + i * stepX,
      y: baseY - (d.conjuntos / maxYVal) * heightSpan,
      ...d,
    }));

    const downCoords = evolutionTimeline.map((d, i) => ({
      x: startX + i * stepX,
      y: baseY - (d.downloads / maxYVal) * heightSpan,
      ...d,
    }));

    const buildPath = (coords: { x: number; y: number }[]) => {
      return coords.reduce((acc, pt, i, arr) => {
        if (i === 0) return `M ${pt.x},${pt.y}`;
        const prev = arr[i - 1];
        const cpX1 = prev.x + (pt.x - prev.x) / 2;
        const cpY1 = prev.y;
        const cpX2 = prev.x + (pt.x - prev.x) / 2;
        const cpY2 = pt.y;
        return `${acc} C ${cpX1},${cpY1} ${cpX2},${cpY2} ${pt.x},${pt.y}`;
      }, '');
    };

    return {
      relCoords,
      conCoords,
      downCoords,
      relPath: buildPath(relCoords),
      conPath: buildPath(conCoords),
      downPath: buildPath(downCoords),
    };
  }, []);

  // 5. Relatórios em Destaque
  const relatoriosDestaque = [
    {
      id: 'rep-1',
      title: 'Índice Global de Comunidades 2025',
      scope: 'Global',
      date: '20 Mai 2025',
      format: 'PDF',
      size: '12.4 MB',
      iconCol: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100',
    },
    {
      id: 'rep-2',
      title: 'Relatório de Sustentabilidade VILA',
      scope: 'Global',
      date: '15 Mai 2025',
      format: 'PDF',
      size: '8.7 MB',
      iconCol: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 border-blue-100',
    },
    {
      id: 'rep-3',
      title: 'Panorama de Participação Cívica',
      scope: 'Europa',
      date: '10 Mai 2025',
      format: 'PDF',
      size: '6.1 MB',
      iconCol: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 border-blue-100',
    },
    {
      id: 'rep-4',
      title: 'Ranking de Municípios Inteligentes',
      scope: 'Global',
      date: '05 Mai 2025',
      format: 'PDF',
      size: '9.3 MB',
      iconCol: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 border-blue-100',
    },
    {
      id: 'rep-5',
      title: 'Relatório de Projetos e Impacto',
      scope: 'Global',
      date: '01 Mai 2025',
      format: 'PDF',
      size: '7.8 MB',
      iconCol: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 border-blue-100',
    },
  ];

  // 6. Fontes de Dados Ativas
  const fontesDados = [
    {
      id: 'src-1',
      nome: 'Censos Nacionais',
      tipo: 'Oficial',
      atualizacao: 'Diária',
      registos: '12.4M',
      qualidade: 'Excelente',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'src-2',
      nome: 'Portais Municipais',
      tipo: 'Institucional',
      atualizacao: 'Diária',
      registos: '8.7M',
      qualidade: 'Excelente',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'src-3',
      nome: 'Plataforma VILA',
      tipo: 'Interna',
      atualizacao: 'Tempo real',
      registos: '25.6M',
      qualidade: 'Excelente',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'src-4',
      nome: 'Open Data Gov.',
      tipo: 'Aberta',
      atualizacao: 'Diária',
      registos: '6.3M',
      qualidade: 'Boa',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'src-5',
      nome: 'Redes Sociais',
      tipo: 'Externa',
      atualizacao: 'Tempo real',
      registos: '15.8M',
      qualidade: 'Boa',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'src-6',
      nome: 'Sensores IoT',
      tipo: 'Dispositivo',
      atualizacao: 'Tempo real',
      registos: '3.2M',
      qualidade: 'Média',
      badgeBg: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
  ];

  // 7. Qualidade dos Dados (Critérios)
  const qualidadeCriterios = [
    { label: 'Precisão', percent: '92%', color: 'bg-emerald-500' },
    { label: 'Completude', percent: '88%', color: 'bg-blue-500' },
    { label: 'Consistência', percent: '87%', color: 'bg-amber-500' },
    { label: 'Atualidade', percent: '90%', color: 'bg-blue-500' },
    { label: 'Validade', percent: '88%', color: 'bg-blue-400' },
  ];

  // 8. Dados por Dimensão
  const dimensoesDados = [
    { label: 'Territorial', percent: 92 },
    { label: 'Temporal', percent: 88 },
    { label: 'Demográfica', percent: 85 },
    { label: 'Económica', percent: 78 },
    { label: 'Ambiental', percent: 75 },
    { label: 'Social', percent: 90 },
  ];

  // 9. Ações Explorar Dados
  const exploradorCards = [
    {
      id: 'exp-1',
      title: 'Explorador de Dados',
      desc: 'Navegue e visualize conjuntos de dados',
      icon: <Compass className="w-5 h-5 text-blue-600" />,
      action: () => showToast('A abrir Explorador de Dados Interativo'),
    },
    {
      id: 'exp-2',
      title: 'Consultas Avançadas',
      desc: 'Execute consultas SQL personalizadas',
      icon: <Terminal className="w-5 h-5 text-blue-600" />,
      action: () => showToast('A abrir Consola de Consultas SQL'),
    },
    {
      id: 'exp-3',
      title: 'Dados Abertos',
      desc: 'Aceda a dados públicos e abertos',
      icon: <Boxes className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      action: () => showToast('A abrir Portal de Dados Abertos VILA'),
    },
    {
      id: 'exp-4',
      title: 'API de Dados',
      desc: 'Integre dados via API REST',
      icon: <Code2 className="w-5 h-5 text-blue-600" />,
      action: () => showToast('A carregar Documentação da API REST'),
    },
  ];

  // 10. Alertas e Notificações de Dados
  const alertasDados = [
    {
      id: 'alt-1',
      title: 'Atualização de dados concluída',
      subtitle: 'Censos Nacionais 2025',
      time: 'há 15 min',
      type: 'success',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      iconBg: 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100',
    },
    {
      id: 'alt-2',
      title: 'Falha na fonte de dados',
      subtitle: 'Sensores IoT - Região Sul',
      time: 'há 45 min',
      type: 'error',
      icon: <AlertCircle className="w-4 h-4 text-blue-600" />,
      iconBg: 'bg-blue-50 dark:bg-blue-500/10 border border-blue-100',
    },
    {
      id: 'alt-3',
      title: 'Qualidade de dados baixa',
      subtitle: 'Dados Ambientais - Norte',
      time: 'há 1 h',
      type: 'warning',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      iconBg: 'bg-amber-50 dark:bg-amber-500/10 border border-amber-100',
    },
    {
      id: 'alt-4',
      title: 'Novo conjunto de dados disponível',
      subtitle: 'Planos Municipais 2024',
      time: 'há 2 h',
      type: 'info',
      icon: <Database className="w-4 h-4 text-blue-600" />,
      iconBg: 'bg-blue-50 dark:bg-blue-500/10 border border-blue-100',
    },
    {
      id: 'alt-5',
      title: 'Anomalia detectada',
      subtitle: 'Participação - Pico Incomum',
      time: 'há 3 h',
      type: 'info',
      icon: <Activity className="w-4 h-4 text-blue-600" />,
      iconBg: 'bg-blue-50 dark:bg-blue-500/10 border border-blue-100',
    },
  ];

  // 11. Tendências de Utilização de Dados (SVG Multi-line)
  const trendsData = [
    { month: 'Jun', consultas: 6.2, downloads: 3.2, relatorios: 1.8 },
    { month: 'Jul', consultas: 8.5, downloads: 4.1, relatorios: 2.3 },
    { month: 'Ago', consultas: 11.2, downloads: 5.6, relatorios: 3.1 },
    { month: 'Set', consultas: 9.8, downloads: 6.2, relatorios: 3.9 },
    { month: 'Out', consultas: 12.4, downloads: 7.5, relatorios: 4.8 },
    { month: 'Nov', consultas: 14.1, downloads: 8.8, relatorios: 5.4 },
    { month: 'Dez', consultas: 13.5, downloads: 9.2, relatorios: 6.2 },
    { month: 'Jan', consultas: 15.2, downloads: 10.4, relatorios: 7.0 },
    { month: 'Fev', consultas: 14.8, downloads: 11.2, relatorios: 7.8 },
    { month: 'Mar', consultas: 16.5, downloads: 12.1, relatorios: 8.5 },
    { month: 'Abr', consultas: 15.8, downloads: 12.8, relatorios: 9.1 },
    { month: 'Mai', consultas: 18.2, downloads: 14.5, relatorios: 10.2 },
  ];

  const trendsPoints = useMemo(() => {
    const startX = 35;
    const stepX = 43;
    const baseY = 165;
    const maxYVal = 20; // 20K
    const heightSpan = 135;

    const conCoords = trendsData.map((d, i) => ({
      x: startX + i * stepX,
      y: baseY - (d.consultas / maxYVal) * heightSpan,
      ...d,
    }));

    const downCoords = trendsData.map((d, i) => ({
      x: startX + i * stepX,
      y: baseY - (d.downloads / maxYVal) * heightSpan,
      ...d,
    }));

    const relCoords = trendsData.map((d, i) => ({
      x: startX + i * stepX,
      y: baseY - (d.relatorios / maxYVal) * heightSpan,
      ...d,
    }));

    const buildPath = (coords: { x: number; y: number }[]) => {
      return coords.reduce((acc, pt, i, arr) => {
        if (i === 0) return `M ${pt.x},${pt.y}`;
        const prev = arr[i - 1];
        const cpX1 = prev.x + (pt.x - prev.x) / 2;
        const cpY1 = prev.y;
        const cpX2 = prev.x + (pt.x - prev.x) / 2;
        const cpY2 = pt.y;
        return `${acc} C ${cpX1},${cpY1} ${cpX2},${cpY2} ${pt.x},${pt.y}`;
      }, '');
    };

    return {
      conCoords,
      downCoords,
      relCoords,
      conPath: buildPath(conCoords),
      downPath: buildPath(downCoords),
      relPath: buildPath(relCoords),
    };
  }, []);

  // 12. Top Datasets Mais Utilizados
  const topDatasets = [
    { rank: 1, name: 'Dados Demográficos', count: '12.456' },
    { rank: 2, name: 'Projetos Ativos', count: '9.812' },
    { rank: 3, name: 'Indicadores de Sustentabilidade', count: '8.735' },
    { rank: 4, name: 'Participação Cívica', count: '7.621' },
    { rank: 5, name: 'Dados Territoriais', count: '6.543' },
  ];

  // 13. Impacto dos Dados (4 Métricas)
  const metricasImpacto = [
    {
      id: 'imp-decisoes',
      title: 'Decisões Apoiadas',
      value: '3.642',
      trend: '↑ 28%',
      period: 'desde o ano passado',
    },
    {
      id: 'imp-politicas',
      title: 'Políticas Influenciadas',
      value: '156',
      trend: '↑ 18%',
      period: 'desde o ano passado',
    },
    {
      id: 'imp-projetos',
      title: 'Projetos Otimizados',
      value: '892',
      trend: '↑ 25%',
      period: 'desde o ano passado',
    },
    {
      id: 'imp-comunidades',
      title: 'Comunidades Impactadas',
      value: '18.732',
      trend: '↑ 32%',
      period: 'desde o ano passado',
    },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5 animate-in fade-in duration-200">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header do Módulo com Identidade VILA */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#E2ECF9]/80 border border-blue-200/60 flex items-center justify-center text-[#1455AC] shrink-0 shadow-2xs">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] dark:text-slate-50 font-sans tracking-tight">
              Relatórios e Dados
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl mt-0.5 leading-relaxed">
              Explore dados estratégicos, gere relatórios personalizados e obtenha insights para apoiar decisões e transformar territórios.
            </p>
          </div>
        </div>

        {/* Telemetria e Controles */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto justify-end">
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mr-2">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Dados atualizados: 10:32
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Atualização em tempo real
            </span>
          </div>

          {/* Seletor de Período */}
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs">
            <CalendarIcon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>{dateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 ml-1" />
          </div>

          {/* Exportar */}
          <button
            onClick={() => {
              setIsExportModalOpen(true);
              setTimeout(() => setIsExportModalOpen(false), 2800);
              showToast('A exportar relatórios consolidados em PDF e CSV...');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Exportar</span>
          </button>

          {/* Filtros */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1455AC] hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {/* 2. LINHA 1: 6 Cards de Indicadores — 5 visíveis + botão "Ver mais cards" */}
      <ExpandableKpiHeader cards={kpiCards} visibleCount={5} xlCols={6} />

      {/* 3. LINHA 2: 3 Cards (Dados por Categoria, Cobertura Territorial, Evolução de Dados) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Coluna 1: Dados por Categoria (Donut Chart) - 4 cols */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">Dados por Categoria</h3>

            <div className="flex items-center gap-4 mt-4">
              {/* Donut Chart SVG */}
              <div className="w-36 h-36 shrink-0 relative flex items-center justify-center">
                <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90">
                  {/* Demografia 28% */}
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#1455AC" strokeWidth="6.5" strokeDasharray="28 72" strokeDashoffset="0" />
                  {/* Participação 22% */}
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#10B981" strokeWidth="6.5" strokeDasharray="22 78" strokeDashoffset="-28" />
                  {/* Projetos 18% */}
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#F59E0B" strokeWidth="6.5" strokeDasharray="18 82" strokeDashoffset="-50" />
                  {/* Territórios 15% */}
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#2D79D1" strokeWidth="6.5" strokeDasharray="15 85" strokeDashoffset="-68" />
                  {/* Eventos 9% */}
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#EF4444" strokeWidth="6.5" strokeDasharray="9 91" strokeDashoffset="-83" />
                  {/* Recursos 5% */}
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#F58300" strokeWidth="6.5" strokeDasharray="5 95" strokeDashoffset="-92" />
                  {/* Outros 3% */}
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#5F9DE0" strokeWidth="6.5" strokeDasharray="3 97" strokeDashoffset="-97" />
                </svg>
              </div>

              {/* Legenda com Cores e Percentagens */}
              <div className="flex-1 space-y-1.5 text-xs">
                {categoryData.map((cat) => (
                  <div
                    key={cat.label}
                    onClick={() => {
                      setSelectedCategory(cat.label);
                      showToast(`Filtrar categoria: ${cat.label}`);
                    }}
                    className="flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 px-1 py-0.5 rounded transition-colors"
                  >
                    <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      <span className="font-medium text-slate-800 dark:text-slate-100">{cat.label}</span>
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-50">
                      {cat.percent}% <span className="text-slate-400 dark:text-slate-500 font-normal">({cat.count})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => showToast('A abrir detalhe de todas as categorias de dados')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ver todas as categorias</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Coluna 2: Cobertura de Dados por Território (Mapa Vetorial) - 4 cols */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">Cobertura de Dados por Território</h3>

            <div className="relative w-full h-[180px] mt-2 flex items-center justify-center">
              <svg viewBox="0 0 480 230" className="w-full h-full object-contain select-none">
                <g>
                  {mapFeatures.paths.map((p) => {
                    if (!p) return null;
                    return (
                      <path
                        key={p.key}
                        d={p.d}
                        fill={p.fill}
                        stroke="#FFFFFF"
                        strokeWidth={0.5}
                        className="transition-colors hover:opacity-85 cursor-pointer"
                        onClick={() => showToast(`Território: ${p.name}`)}
                      >
                        <title>{p.name}</title>
                      </path>
                    );
                  })}
                </g>
              </svg>

              {/* Legenda de Níveis no canto direito */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-1 text-[10px] font-medium text-slate-600 dark:text-slate-400 bg-white/90 dark:bg-slate-800/90 p-2 rounded-xl backdrop-blur-xs border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0F448A]" />
                  <span>Muito Alta (90-100%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0F448A]" />
                  <span>Alta (70-89%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5F9DE0]" />
                  <span>Média (40-69%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#99C0EB]" />
                  <span>Baixa (10-39%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C4DAF3]" />
                  <span>Muito Baixa (0-9%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <span>Sem Dados</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => onNavigateToTab('territorios-paises')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ver mapa interativo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Coluna 3: Evolução de Dados (Gráfico de Linhas) - 4 cols */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">Evolução de Dados</h3>
              <div className="relative">
                <select
                  value={evolutionPeriod}
                  onChange={(e) => setEvolutionPeriod(e.target.value)}
                  className="text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-lg px-2 py-0.5 pr-5 cursor-pointer focus:outline-none appearance-none"
                >
                  <option value="Últimos 12 meses">Últimos 12 meses</option>
                  <option value="Ano 2024">Ano 2024</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Legenda das Linhas */}
            <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-2">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Relatórios Gerados</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Conjuntos de Dados</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2D79D1]" />
                <span>Downloads</span>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="relative w-full h-[180px] mt-2">
              <svg viewBox="0 0 500 190" className="w-full h-full overflow-visible">
                {/* Gradientes de área */}
                <defs>
                  <linearGradient id="rd-area-rel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1455AC" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#1455AC" stopOpacity="0.01" />
                  </linearGradient>
                  <linearGradient id="rd-area-con" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.01" />
                  </linearGradient>
                  <linearGradient id="rd-area-down" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2D79D1" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#2D79D1" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                {/* Linhas de Grade e Eixo Y */}
                {[
                  { val: '10K', y: 30 },
                  { val: '8K', y: 57 },
                  { val: '6K', y: 84 },
                  { val: '4K', y: 111 },
                  { val: '2K', y: 138 },
                  { val: '0', y: 165 },
                ].map((g) => (
                  <g key={g.val}>
                    <line
                      x1="30"
                      y1={g.y}
                      x2="480"
                      y2={g.y}
                      stroke="#F1F5F9"
                      strokeWidth="1"
                      strokeDasharray={g.val === '0' ? undefined : '2 2'}
                    />
                    <text
                      x="24"
                      y={g.y + 3}
                      textAnchor="end"
                      fontSize="9"
                      fill="#94A3B8"
                      fontWeight="500"
                    >
                      {g.val}
                    </text>
                  </g>
                ))}

                {/* Áreas preenchidas */}
                <path d={`${evolutionPoints.relPath} L ${evolutionPoints.relCoords[evolutionPoints.relCoords.length - 1].x},165 L ${evolutionPoints.relCoords[0].x},165 Z`} fill="url(#rd-area-rel)" />
                <path d={`${evolutionPoints.conPath} L ${evolutionPoints.conCoords[evolutionPoints.conCoords.length - 1].x},165 L ${evolutionPoints.conCoords[0].x},165 Z`} fill="url(#rd-area-con)" />
                <path d={`${evolutionPoints.downPath} L ${evolutionPoints.downCoords[evolutionPoints.downCoords.length - 1].x},165 L ${evolutionPoints.downCoords[0].x},165 Z`} fill="url(#rd-area-down)" />

                {/* Linhas SVG */}
                <path d={evolutionPoints.downPath} fill="none" stroke="#2D79D1" strokeWidth="2.2" strokeLinecap="round" />
                <path d={evolutionPoints.relPath} fill="none" stroke="#1455AC" strokeWidth="2.2" strokeLinecap="round" />
                <path d={evolutionPoints.conPath} fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />

                {/* Pontos Downloads */}
                {evolutionPoints.downCoords.map((pt, i) => (
                  <circle
                    key={`down-${i}`}
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPointEvolution === i ? 4.5 : 2.5}
                    fill="#2D79D1"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPointEvolution(i)}
                    onMouseLeave={() => setHoveredPointEvolution(null)}
                  />
                ))}

                {/* Pontos Relatórios */}
                {evolutionPoints.relCoords.map((pt, i) => (
                  <circle
                    key={`rel-${i}`}
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPointEvolution === i ? 4.5 : 2.5}
                    fill="#1455AC"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPointEvolution(i)}
                    onMouseLeave={() => setHoveredPointEvolution(null)}
                  />
                ))}

                {/* Pontos Conjuntos */}
                {evolutionPoints.conCoords.map((pt, i) => (
                  <g key={`con-${i}`}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredPointEvolution === i ? 4.5 : 2.5}
                      fill="#10B981"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPointEvolution(i)}
                      onMouseLeave={() => setHoveredPointEvolution(null)}
                    />
                    <text
                      x={pt.x}
                      y="182"
                      textAnchor="middle"
                      fontSize="9"
                      fill={hoveredPointEvolution === i ? '#0F172A' : '#64748B'}
                      fontWeight={hoveredPointEvolution === i ? '700' : '500'}
                    >
                      {pt.month}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Tooltip interativo */}
              {hoveredPointEvolution !== null && (
                <div
                  className="absolute bg-slate-900 text-white px-2.5 py-1.5 rounded-lg text-[10px] pointer-events-none shadow-xl border border-slate-700 z-10"
                  style={{
                    left: `${(evolutionPoints.downCoords[hoveredPointEvolution].x / 500) * 100}%`,
                    top: '15px',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <p className="font-bold text-slate-200">
                    {evolutionTimeline[hoveredPointEvolution].month} 2025
                  </p>
                  <p className="text-blue-300">
                    Downloads: {evolutionTimeline[hoveredPointEvolution].downloads}K
                  </p>
                  <p className="text-blue-300">
                    Relatórios: {evolutionTimeline[hoveredPointEvolution].relatorios}K
                  </p>
                  <p className="text-emerald-300">
                    Conjuntos: {evolutionTimeline[hoveredPointEvolution].conjuntos}K
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => showToast('A gerar relatório completo de evolução')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ver relatório completo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. LINHA 3: 3 Cards (Relatórios em Destaque, Fontes de Dados Ativas, Qualidade dos Dados) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Card 1: Relatórios em Destaque - 4 cols */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">Relatórios em Destaque</h3>

            <div className="space-y-2.5 mt-3">
              {relatoriosDestaque.map((rep) => (
                <div
                  key={rep.id}
                  onClick={() => {
                    setSelectedReport(rep);
                    showToast(`A descarregar: ${rep.title}`);
                  }}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${rep.iconCol}`}>
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 transition-colors">
                        {rep.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                        <span>{rep.scope}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <CalendarIcon className="w-2.5 h-2.5" />
                          {rep.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {rep.format}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                      {rep.size}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => showToast('A abrir arquivo completo de relatórios')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ver todos os relatórios</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 2: Fontes de Dados Ativas - 5 cols */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">Fontes de Dados Ativas</h3>

            <div className="overflow-x-auto mt-3">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 border-b border-slate-200/70 dark:border-slate-700">
                    <th className="pb-2">Fonte</th>
                    <th className="pb-2">Tipo</th>
                    <th className="pb-2">Atualização</th>
                    <th className="pb-2 text-right">Registos</th>
                    <th className="pb-2 text-center">Qualidade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                  {fontesDados.map((src) => (
                    <tr
                      key={src.id}
                      onClick={() => {
                        setSelectedSource(src);
                        showToast(`Fonte de dados: ${src.nome}`);
                      }}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                    >
                      <td className="py-2 font-semibold text-slate-800 dark:text-slate-100 text-[11px]">{src.nome}</td>
                      <td className="py-2 text-slate-500 dark:text-slate-400 text-[11px]">{src.tipo}</td>
                      <td className="py-2 text-slate-500 dark:text-slate-400 text-[11px]">{src.atualizacao}</td>
                      <td className="py-2 text-right font-medium text-slate-900 dark:text-slate-50 text-[11px]">{src.registos}</td>
                      <td className="py-2 text-center">
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9.5px] font-semibold ${src.badgeBg}`}>
                          {src.qualidade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => showToast('A carregar todas as fontes')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ver todas as fontes</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 3: Qualidade dos Dados - 3 cols */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">Qualidade dos Dados</h3>

            <div className="flex items-center justify-between gap-3 mt-4">
              {/* Semi-circle Gauge */}
              <div className="w-28 h-28 shrink-0 relative flex flex-col items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path
                    className="text-slate-100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-500"
                    strokeDasharray="89, 100"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-[#0F172A] dark:text-slate-50 font-sans">89%</span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium">Qualidade Geral</span>
                </div>
              </div>

              {/* Critérios com percentagens */}
              <div className="flex-1 space-y-2 text-xs">
                {qualidadeCriterios.map((crit) => (
                  <div key={crit.label} className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${crit.color}`} />
                      <span className="text-[11px] font-medium">{crit.label}</span>
                    </span>
                    <span className="font-bold text-slate-900 dark:text-slate-50 text-[11px]">{crit.percent}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => showToast('A abrir relatório de validação de qualidade de dados')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ver detalhes de qualidade</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. LINHA 4: 4 Colunas (Dados por Dimensão, Explorar Dados, Relatórios Agendados, Alertas e Notificações) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Coluna 1: Dados por Dimensão */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">Dados por Dimensão</h3>

            <div className="space-y-3 mt-4">
              {dimensoesDados.map((dim) => (
                <div key={dim.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{dim.label}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-50">{dim.percent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${dim.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => showToast('A carregar todas as dimensões de análise')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ver todas as dimensões</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Coluna 2: Explorar Dados (2x2 Cards) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">Explorar Dados</h3>

            <div className="grid grid-cols-2 gap-2.5 mt-4">
              {exploradorCards.map((card) => (
                <button
                  key={card.id}
                  onClick={card.action}
                  className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 bg-slate-50/50 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[95px]"
                >
                  <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-2xs mb-2">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">{card.title}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-snug line-clamp-2">{card.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => showToast('A abrir o explorador avançado')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ir para o explorador</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Coluna 3: Relatórios Agendados (com Toggle Switches) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">Relatórios Agendados</h3>

            <div className="space-y-3 mt-4 text-xs">
              {scheduledReports.map((sch) => (
                <div key={sch.id} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">{sch.name}</h4>
                    <p className="text-[10.5px] text-slate-400 dark:text-slate-500 mt-0.5">
                      {sch.freq} • {sch.schedule}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSchedule(sch.id)}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors relative shrink-0 cursor-pointer ${
                      sch.active ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white dark:bg-slate-900 transition-transform ${
                        sch.active ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => showToast('A abrir gestão de agendamentos')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ver todos os agendamentos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Coluna 4: Alertas e Notificações de Dados */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">Alertas e Notificações de Dados</h3>

            <div className="space-y-2.5 mt-3">
              {alertasDados.map((alt) => (
                <div
                  key={alt.id}
                  onClick={() => showToast(`Detalhe do alerta: ${alt.title}`)}
                  className="flex items-start justify-between gap-2 p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-2 min-w-0">
                    <div className={`p-1.5 rounded-lg shrink-0 ${alt.iconBg}`}>
                      {alt.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-tight truncate">
                        {alt.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">{alt.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0 font-medium">{alt.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => showToast('A carregar todos os alertas')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ver todos os alertas</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 6. LINHA 5: 3 Cards (Tendências de Utilização, Top Datasets, Impacto dos Dados) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Card 1: Tendências de Utilização de Dados - 5 cols */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">Tendências de Utilização de Dados</h3>
              {/* Legenda */}
              <div className="flex items-center gap-2.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-700" />
                  <span>Consultas</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Downloads</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Relatórios</span>
                </div>
              </div>
            </div>

            {/* SVG Multi-line com curvas */}
            <div className="relative w-full h-[180px] mt-2">
              <svg viewBox="0 0 520 190" className="w-full h-full overflow-visible">
                {/* Linhas de Grade e Eixo Y */}
                {[
                  { val: '20K', y: 30 },
                  { val: '15K', y: 64 },
                  { val: '10K', y: 98 },
                  { val: '5K', y: 132 },
                  { val: '0', y: 165 },
                ].map((g) => (
                  <g key={g.val}>
                    <line
                      x1="30"
                      y1={g.y}
                      x2="505"
                      y2={g.y}
                      stroke="#F1F5F9"
                      strokeWidth="1"
                      strokeDasharray={g.val === '0' ? undefined : '2 2'}
                    />
                    <text
                      x="24"
                      y={g.y + 3}
                      textAnchor="end"
                      fontSize="9"
                      fill="#94A3B8"
                      fontWeight="500"
                    >
                      {g.val}
                    </text>
                  </g>
                ))}

                {/* Linhas */}
                <path d={trendsPoints.conPath} fill="none" stroke="#1455AC" strokeWidth="2.2" strokeLinecap="round" />
                <path d={trendsPoints.downPath} fill="none" stroke="#2D79D1" strokeWidth="2.2" strokeLinecap="round" />
                <path d={trendsPoints.relPath} fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" />

                {/* Marcadores Consultas */}
                {trendsPoints.conCoords.map((pt, i) => (
                  <circle
                    key={`tcon-${i}`}
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPointTrends === i ? 4.5 : 2.5}
                    fill="#1455AC"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPointTrends(i)}
                    onMouseLeave={() => setHoveredPointTrends(null)}
                  />
                ))}

                {/* Marcadores Downloads */}
                {trendsPoints.downCoords.map((pt, i) => (
                  <circle
                    key={`tdown-${i}`}
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPointTrends === i ? 4.5 : 2.5}
                    fill="#2D79D1"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPointTrends(i)}
                    onMouseLeave={() => setHoveredPointTrends(null)}
                  />
                ))}

                {/* Marcadores Relatórios */}
                {trendsPoints.relCoords.map((pt, i) => (
                  <g key={`trel-${i}`}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredPointTrends === i ? 4.5 : 2.5}
                      fill="#10B981"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPointTrends(i)}
                      onMouseLeave={() => setHoveredPointTrends(null)}
                    />
                    <text
                      x={pt.x}
                      y="182"
                      textAnchor="middle"
                      fontSize="9"
                      fill={hoveredPointTrends === i ? '#0F172A' : '#64748B'}
                      fontWeight={hoveredPointTrends === i ? '700' : '500'}
                    >
                      {pt.month}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Tooltip */}
              {hoveredPointTrends !== null && (
                <div
                  className="absolute bg-slate-900 text-white px-2.5 py-1.5 rounded-lg text-[10px] pointer-events-none shadow-xl border border-slate-700 z-10"
                  style={{
                    left: `${(trendsPoints.conCoords[hoveredPointTrends].x / 520) * 100}%`,
                    top: '15px',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <p className="font-bold text-slate-200">
                    {trendsData[hoveredPointTrends].month} 2025
                  </p>
                  <p className="text-blue-300">
                    Consultas: {trendsData[hoveredPointTrends].consultas}K
                  </p>
                  <p className="text-blue-300">
                    Downloads: {trendsData[hoveredPointTrends].downloads}K
                  </p>
                  <p className="text-emerald-300">
                    Relatórios: {trendsData[hoveredPointTrends].relatorios}K
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="h-4" />
        </div>

        {/* Card 2: Top Datasets Mais Utilizados - 3 cols */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">Top Datasets Mais Utilizados</h3>

            <div className="space-y-3 mt-4 text-xs">
              {topDatasets.map((ds) => (
                <div
                  key={ds.rank}
                  onClick={() => showToast(`Dataset selecionado: ${ds.name}`)}
                  className="flex items-center justify-between p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center font-bold text-slate-400 dark:text-slate-500">{ds.rank}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{ds.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-50">{ds.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => showToast('A abrir catálogo completo de datasets')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ver todos os datasets</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 3: Impacto dos Dados - 4 cols */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">Impacto dos Dados</h3>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {metricasImpacto.map((imp) => (
                <div
                  key={imp.id}
                  className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center"
                >
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block truncate">
                    {imp.title}
                  </span>
                  <span className="text-xl font-black text-[#0F172A] dark:text-slate-50 font-sans block mt-1">
                    {imp.value}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    {imp.trend} <span className="font-normal text-slate-400 dark:text-slate-500">desde o ano passado</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => showToast('A gerar relatório de impacto estratégico')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ver relatório de impacto</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
