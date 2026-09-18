import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  FolderKanban,
  FileSpreadsheet,
  CheckCircle2,
  Wallet,
  TrendingUp,
  Users,
  Calendar,
  Download,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  RefreshCw,
  Search,
  X,
  Droplets,
  GraduationCap,
  Building2,
  Heart,
  Activity,
  FileText,
  Clock,
  Sparkles,
  Award,
  Globe,
  PlusCircle,
  ExternalLink,
  MapPin,
  HeartHandshake,
  Megaphone,
} from 'lucide-react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import { DemoUser } from '../../data/demoUsers';
import { BreadcrumbItem } from '../Topbar';

interface ProjetosIniciativasViewProps {
  currentUser: DemoUser;
  onNavigateToTab: (tabId: string) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
  onOpenSupportModal?: () => void;
}

// -----------------------------------------------------------------------------
// Modelos e Tipos
// -----------------------------------------------------------------------------
export interface ProjectKpi {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendPeriod: string;
  bgClass: string;
  iconType: 'folder' | 'document' | 'check' | 'wallet' | 'trend' | 'users';
}

export interface AreaDistributionItem {
  name: string;
  percentage: number;
  count: number;
  color: string;
}

export interface StatusDistributionItem {
  name: string;
  percentage: number;
  count: number;
  color: string;
}

export interface FundingSourceItem {
  name: string;
  percentage: number;
  amount: string;
  color: string;
}

export interface TopImpactProject {
  id: string;
  name: string;
  area: string;
  beneficiaries: string;
  progress: number;
  impactLevel: 'Alto' | 'Médio' | 'Muito Alto';
  iconType: 'droplet' | 'education' | 'building' | 'heart' | 'health';
  description?: string;
  countries?: string[];
  budget?: string;
}

export interface RecentProject {
  id: string;
  name: string;
  area: string;
  location: string;
  partnersCount: number;
  budget: string;
  status: 'Em Execução' | 'Planeamento' | 'Concluído';
}

export interface OpenCallItem {
  id: string;
  title: string;
  area: string;
  deadline: string;
  candidatesCount: number;
  budget: string;
  description: string;
}

export interface ActivityFeedItem {
  id: string;
  type: 'project_created' | 'milestone' | 'partnership' | 'report' | 'call_published';
  title: string;
  subtitle: string;
  timestamp: string;
}

export const ProjetosIniciativasView: React.FC<ProjetosIniciativasViewProps> = ({
  currentUser,
  onNavigateToTab,
  onBreadcrumbChange,
}) => {
  // ---------------------------------------------------------------------------
  // 1. Estados de Filtros e Seleções da Barra Superior
  // ---------------------------------------------------------------------------
  const [selectedDateRange, setSelectedDateRange] = useState('01 Mai 2024 - 24 Mai 2025');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterArea, setFilterArea] = useState('Todas');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState('10:32');

  // Notificação / Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Breadcrumb Synchronization
  const onBreadcrumbChangeRef = useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;
  const onNavigateToTabRef = useRef(onNavigateToTab);
  onNavigateToTabRef.current = onNavigateToTab;

  useEffect(() => {
    onBreadcrumbChangeRef.current?.([
      { label: 'Plataforma VILA', onClick: () => onNavigateToTabRef.current('painel-gestao') },
      { label: 'Projetos e Iniciativas' },
    ]);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setLastUpdateTime(`${h}:${m}`);
      setIsRefreshing(false);
      showToast('Dados de Projetos e Iniciativas sincronizados com sucesso.');
    }, 500);
  };

  // ---------------------------------------------------------------------------
  // 2. Modais Interativos e Detalhes
  // ---------------------------------------------------------------------------
  const [activeKpiDetail, setActiveKpiDetail] = useState<string | null>(null);
  const [activeProjectDetail, setActiveProjectDetail] = useState<TopImpactProject | RecentProject | null>(null);
  const [isAllAreasModalOpen, setIsAllAreasModalOpen] = useState(false);
  const [isAllStatusModalOpen, setIsAllStatusModalOpen] = useState(false);
  const [isAllFundingModalOpen, setIsAllFundingModalOpen] = useState(false);
  const [isAllProjectsModalOpen, setIsAllProjectsModalOpen] = useState(false);
  const [isAllCallsModalOpen, setIsAllCallsModalOpen] = useState(false);
  const [isAllActivitiesModalOpen, setIsAllActivitiesModalOpen] = useState(false);
  const [isFullReportModalOpen, setIsFullReportModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // 3. Dados dos KPIs Principais (Exatos do Screenshot)
  // ---------------------------------------------------------------------------
  const kpis: ProjectKpi[] = useMemo(() => [
    {
      id: 'kpi-proj-ativos',
      label: 'Projetos Ativos',
      value: '1.248',
      trend: '↑ 18%',
      trendPeriod: 'desde o ano passado',
      bgClass: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
      iconType: 'folder',
    },
    {
      id: 'kpi-inic-ativas',
      label: 'Iniciativas Ativas',
      value: '856',
      trend: '↑ 12%',
      trendPeriod: 'desde o ano passado',
      bgClass: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
      iconType: 'document',
    },
    {
      id: 'kpi-proj-concluidos',
      label: 'Projetos Concluídos',
      value: '342',
      trend: '↑ 18%',
      trendPeriod: 'desde o ano passado',
      bgClass: 'bg-blue-50 text-blue-700 border border-blue-100',
      iconType: 'check',
    },
    {
      id: 'kpi-orcamento-total',
      label: 'Orçamento Total',
      value: '€24,6M',
      trend: '↑ 21%',
      trendPeriod: 'desde o ano passado',
      bgClass: 'bg-amber-50 text-amber-700 border border-amber-100',
      iconType: 'wallet',
    },
    {
      id: 'kpi-financ-captado',
      label: 'Financiamento Captado',
      value: '€15,2M',
      trend: '↑ 25%',
      trendPeriod: 'desde o ano passado',
      bgClass: 'bg-rose-50 text-rose-700 border border-rose-100',
      iconType: 'trend',
    },
    {
      id: 'kpi-beneficiarios',
      label: 'Beneficiários Alcançados',
      value: '2,8M+',
      trend: '↑ 23%',
      trendPeriod: 'desde o ano passado',
      bgClass: 'bg-teal-50 text-teal-700 border border-teal-100',
      iconType: 'users',
    },
  ], []);

  // ---------------------------------------------------------------------------
  // 4. Projetos por Área de Atuação (Donut)
  // ---------------------------------------------------------------------------
  const areaDistribution: AreaDistributionItem[] = useMemo(() => [
    { name: 'Ambiente', percentage: 26, count: 324, color: '#10B981' },
    { name: 'Educação', percentage: 20, count: 250, color: '#3B82F6' },
    { name: 'Inclusão Social', percentage: 16, count: 200, color: '#8B5CF6' },
    { name: 'Desenvolvimento Econ.', percentage: 14, count: 174, color: '#06B6D4' },
    { name: 'Saúde', percentage: 10, count: 124, color: '#F59E0B' },
    { name: 'Cultura', percentage: 7, count: 86, color: '#EC4899' },
    { name: 'Outros', percentage: 7, count: 90, color: '#64748B' },
  ], []);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState<number | null>(null);

  // ---------------------------------------------------------------------------
  // 5. Distribuição Global dos Projetos (World Map D3)
  // ---------------------------------------------------------------------------
  const [hoveredCountry, setHoveredCountry] = useState<{
    name: string;
    projects: number;
    category: string;
    x: number;
    y: number;
  } | null>(null);

  // Mapa com projeção D3 Natural Earth exatamente como no design de referência
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

        // Cores e categorias do screenshot de referência:
        // Mais de 100 projetos: #4338CA
        // Entre 50 e 100 projetos: #7C3AED
        // Entre 10 e 50 projetos: #A78BFA
        // Menos de 10 projetos: #DDD6FE
        // Sem projetos: #CBD5E1
        let fill = '#CBD5E1';
        let category = 'Sem projetos';
        let projects = 0;

        if (['Portugal', 'Brazil', 'Mozambique', 'Angola', 'United States of America'].includes(name)) {
          fill = '#4338CA';
          category = 'Mais de 100 projetos';
          projects = name === 'Portugal' ? 245 : name === 'Brazil' ? 186 : name === 'Mozambique' ? 142 : name === 'Angola' ? 118 : 124;
        } else if (['Russia', 'China', 'Spain', 'France', 'Germany', 'United Kingdom', 'India', 'South Africa'].includes(name)) {
          fill = '#7C3AED';
          category = 'Entre 50 e 100 projetos';
          projects = name === 'Spain' ? 84 : name === 'France' ? 68 : name === 'Germany' ? 58 : name === 'Russia' ? 74 : name === 'China' ? 82 : name === 'India' ? 76 : 64;
        } else if (['Canada', 'Australia', 'Italy', 'Japan', 'Mexico', 'Colombia', 'Argentina', 'Kenya', 'Nigeria', 'Egypt', 'Cape Verde', 'Guinea-Bissau', 'Timor-Leste', 'Sao Tome and Principe', 'Poland', 'Indonesia'].includes(name)) {
          fill = '#A78BFA';
          category = 'Entre 10 e 50 projetos';
          projects = 28;
        } else if (['Greenland', 'Chile', 'Peru', 'Norway', 'Sweden', 'Finland', 'Morocco', 'Algeria', 'Dem. Rep. Congo', 'Saudi Arabia', 'Turkey', 'Kazakhstan', 'New Zealand', 'Thailand'].includes(name)) {
          fill = '#DDD6FE';
          category = 'Menos de 10 projetos';
          projects = 6;
        }

        const uniqueKey = `pi-map-${f.id !== undefined && f.id !== null ? f.id : index}-${index}`;
        return {
          key: uniqueKey,
          name,
          category,
          projects,
          d,
          fill,
        };
      })
      .filter(Boolean);
  }, []);

  // ---------------------------------------------------------------------------
  // 6. Status dos Projetos (Donut)
  // ---------------------------------------------------------------------------
  const statusDistribution: StatusDistributionItem[] = useMemo(() => [
    { name: 'Em Execução', percentage: 58, count: 724, color: '#10B981' },
    { name: 'Planeamento', percentage: 20, count: 250, color: '#3B82F6' },
    { name: 'Concluídos', percentage: 14, count: 174, color: '#8B5CF6' },
    { name: 'Suspensos', percentage: 5, count: 62, color: '#F59E0B' },
    { name: 'Cancelados', percentage: 3, count: 38, color: '#EF4444' },
  ], []);

  const [hoveredStatusIndex, setHoveredStatusIndex] = useState<number | null>(null);

  // ---------------------------------------------------------------------------
  // 7. Evolução dos Projetos (Multi-line SVG Chart)
  // ---------------------------------------------------------------------------
  const [evolutionPeriod, setEvolutionPeriod] = useState<'12meses' | '6meses' | '30dias'>('12meses');
  const [isEvolutionPeriodDropdownOpen, setIsEvolutionPeriodDropdownOpen] = useState(false);
  const [activeEvolutionSeries, setActiveEvolutionSeries] = useState({
    criados: true,
    execucao: true,
    concluidos: true,
  });

  const evolutionMonths = ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'];
  const evolutionSeries = {
    // 0 to 1500 scale
    criados: [620, 680, 740, 810, 890, 980, 1050, 1140, 1210, 1260, 1310, 1390],
    execucao: [450, 480, 520, 550, 600, 680, 710, 750, 790, 830, 860, 910],
    concluidos: [120, 150, 190, 220, 240, 270, 300, 320, 340, 350, 360, 390],
  };

  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);

  // ---------------------------------------------------------------------------
  // 8. Top 5 Projetos por Impacto
  // ---------------------------------------------------------------------------
  const topProjects: TopImpactProject[] = useMemo(() => [
    {
      id: 'proj-1',
      name: 'Água para Todos',
      area: 'Ambiente',
      beneficiaries: '425.680',
      progress: 85,
      impactLevel: 'Alto',
      iconType: 'droplet',
      description: 'Captação sustentável, poços solares e redes comunitárias de saneamento em comunidades rurais.',
      countries: ['Moçambique', 'Malaui', 'Zâmbia'],
      budget: '€1.450.000',
    },
    {
      id: 'proj-2',
      name: 'Educação para o Futuro',
      area: 'Educação',
      beneficiaries: '312.450',
      progress: 78,
      impactLevel: 'Alto',
      iconType: 'education',
      description: 'Salas digitais com conectividade solar e bibliotecas comunitárias interativas.',
      countries: ['Angola', 'Portugal', 'Cabo Verde'],
      budget: '€920.000',
    },
    {
      id: 'proj-3',
      name: 'Cidades Sustentáveis',
      area: 'Desenv. Econ.',
      beneficiaries: '298.730',
      progress: 72,
      impactLevel: 'Alto',
      iconType: 'building',
      description: 'Planeamento urbano participativo, mobilidade verde e hortas periurbanas.',
      countries: ['Brasil', 'Portugal'],
      budget: '€1.180.000',
    },
    {
      id: 'proj-4',
      name: 'Incluir para Transformar',
      area: 'Inclusão Social',
      beneficiaries: '245.170',
      progress: 65,
      impactLevel: 'Médio',
      iconType: 'heart',
      description: 'Capacitação profissional feminina e microcrédito comunitário rotativo.',
      countries: ['Brasil', 'Guiné-Bissau'],
      budget: '€640.000',
    },
    {
      id: 'proj-5',
      name: 'Saúde + Perto',
      area: 'Saúde',
      beneficiaries: '198.540',
      progress: 60,
      impactLevel: 'Médio',
      iconType: 'health',
      description: 'Clínicas móveis, rastreios preventivos e telemedicina para áreas isoladas.',
      countries: ['São Tomé e Príncipe', 'Moçambique'],
      budget: '€510.000',
    },
  ], []);

  // ---------------------------------------------------------------------------
  // 9. Fontes de Financiamento (Donut)
  // ---------------------------------------------------------------------------
  const fundingSources: FundingSourceItem[] = useMemo(() => [
    { name: 'Fundos Públicos', percentage: 42, amount: '€10,3M', color: '#5B21B6' },
    { name: 'Doações', percentage: 24, amount: '€5,9M', color: '#3B82F6' },
    { name: 'Parcerias Privadas', percentage: 18, amount: '€4,4M', color: '#F59E0B' },
    { name: 'Organizações Internacionais', percentage: 10, amount: '€2,5M', color: '#EC4899' },
    { name: 'Outros', percentage: 6, amount: '€1,5M', color: '#64748B' },
  ], []);

  const [hoveredFundingIndex, setHoveredFundingIndex] = useState<number | null>(null);

  // ---------------------------------------------------------------------------
  // 10. Projetos Recentes
  // ---------------------------------------------------------------------------
  const recentProjects: RecentProject[] = useMemo(() => [
    {
      id: 'rec-1',
      name: 'Parque Verde Comunitário',
      area: 'Ambiente',
      location: 'Maputo, Moçambique',
      partnersCount: 8,
      budget: '€320.000',
      status: 'Em Execução',
    },
    {
      id: 'rec-2',
      name: 'Bibliotecas do Amanhã',
      area: 'Educação',
      location: 'Luanda, Angola',
      partnersCount: 6,
      budget: '€215.000',
      status: 'Em Execução',
    },
    {
      id: 'rec-3',
      name: 'Energia Limpa nas Escolas',
      area: 'Ambiente',
      location: 'Lagos, Portugal',
      partnersCount: 5,
      budget: '€180.000',
      status: 'Planeamento',
    },
    {
      id: 'rec-4',
      name: 'Mulheres que Transformam',
      area: 'Inclusão Social',
      location: 'Salvador, Brasil',
      partnersCount: 7,
      budget: '€150.000',
      status: 'Em Execução',
    },
    {
      id: 'rec-5',
      name: 'Arte e Cultura para Todos',
      area: 'Cultura',
      location: 'Porto, Portugal',
      partnersCount: 4,
      budget: '€95.000',
      status: 'Planeamento',
    },
  ], []);

  // ---------------------------------------------------------------------------
  // 11. Chamadas e Oportunidades Abertas
  // ---------------------------------------------------------------------------
  const openCalls: OpenCallItem[] = useMemo(() => [
    {
      id: 'call-1',
      title: 'Fundo VILA para Inovação Social',
      area: 'Inovação',
      deadline: '30 Jun 2025',
      candidatesCount: 56,
      budget: '€500.000',
      description: 'Financiamento para soluções tecnológicas e comunitárias que acelerem a autonomia cívica local.',
    },
    {
      id: 'call-2',
      title: 'Projetos de Educação Ambiental',
      area: 'Ambiente',
      deadline: '15 Jun 2025',
      candidatesCount: 42,
      budget: '€350.000',
      description: 'Apoio a escolas e associações de moradores para reflorestação e conservação de bacias hidrográficas.',
    },
    {
      id: 'call-3',
      title: 'Inclusão Digital nas Comunidades',
      area: 'Educação',
      deadline: '10 Jun 2025',
      candidatesCount: 38,
      budget: '€280.000',
      description: 'Capacitação digital para seniores e jovens em risco de exclusão social e económica.',
    },
    {
      id: 'call-4',
      title: 'Saúde Comunitária 2025',
      area: 'Saúde',
      deadline: '05 Jun 2025',
      candidatesCount: 27,
      budget: '€400.000',
      description: 'Equipamentos e formação de agentes de proximidade para prevenção e cuidados primários.',
    },
  ], []);

  // ---------------------------------------------------------------------------
  // 12. Atividade Recente
  // ---------------------------------------------------------------------------
  const recentActivities: ActivityFeedItem[] = useMemo(() => [
    {
      id: 'act-1',
      type: 'project_created',
      title: 'Novo projeto criado: "Hortas Comunitárias"',
      subtitle: 'Por João Silva • Município de Coimbra',
      timestamp: 'há 10 min',
    },
    {
      id: 'act-2',
      type: 'milestone',
      title: 'Projeto "Água para Todos" atingiu 80% de progresso',
      subtitle: 'Moçambique, Malaui e Zâmbia',
      timestamp: 'há 35 min',
    },
    {
      id: 'act-3',
      type: 'partnership',
      title: 'Nova parceria adicionada: Fundação Gulbenkian',
      subtitle: 'No projeto "Educação para o Futuro"',
      timestamp: 'há 1 h',
    },
    {
      id: 'act-4',
      type: 'report',
      title: 'Relatório de impacto publicado: "Cidades Sustentáveis"',
      subtitle: 'Resultados do 1º trimestre de 2025',
      timestamp: 'há 2 h',
    },
    {
      id: 'act-5',
      type: 'call_published',
      title: 'Nova chamada publicada: "Fundo VILA para Inovação Social"',
      subtitle: 'Candidaturas abertas até 30 Jun 2025',
      timestamp: 'há 3 h',
    },
  ], []);

  // ---------------------------------------------------------------------------
  // Helper: SVG Donut Generator
  // ---------------------------------------------------------------------------
  const renderDonutSegments = (
    data: { percentage: number; color: string; name: string }[],
    hoveredIndex: number | null,
    setHoveredIndex: (idx: number | null) => void,
    size = 140,
    strokeWidth = 26
  ) => {
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;
    let accumulatedAngle = -90; // Top start

    return (
      <svg width={size} height={size} className="overflow-visible">
        {data.map((item, idx) => {
          const strokeLength = (item.percentage / 100) * circumference;
          const strokeDasharray = `${strokeLength} ${circumference - strokeLength}`;
          const currentAngle = accumulatedAngle;
          accumulatedAngle += (item.percentage / 100) * 360;

          const isHovered = hoveredIndex === idx;

          return (
            <circle
              key={item.name}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={item.color}
              strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={0}
              transform={`rotate(${currentAngle} ${center} ${center})`}
              className="transition-all duration-200 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6 py-4 sm:py-5 space-y-4">
      {/* Toast Notificação Flutuante */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HEADER DA PÁGINA (Compacto, elegante e proporcional)                   */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200/70">
        {/* Esquerda: Ícone Reduzido + Título + Subtítulo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#EDE9FE] border border-purple-200/60 flex items-center justify-center text-[#5B21B6] shrink-0 shadow-2xs">
            <FolderKanban className="w-5 h-5 text-[#5B21B6]" strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#0F172A] font-sans tracking-tight leading-tight">
              Projetos e Iniciativas
            </h1>
            <p className="text-xs text-slate-500 font-normal mt-0.5 max-w-xl">
              Acompanhe todos os projetos e iniciativas em curso na rede VILA. Explore o impacto, o progresso e as áreas de atuação.
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
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{selectedDateRange}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {isDateDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-60 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1 text-xs">
                <div className="px-3 py-1.5 font-bold text-slate-400 text-[10px] uppercase tracking-wider border-b border-slate-100">
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
                      showToast(`Filtro de período alterado para: ${p}`);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-purple-50 transition-colors flex items-center justify-between ${
                      selectedDateRange === p ? 'text-[#5B21B6] font-bold bg-purple-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{p}</span>
                    {selectedDateRange === p && <CheckCircle2 className="w-3.5 h-3.5 text-[#5B21B6]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Botão Exportar */}
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Exportar</span>
          </button>

          {/* Botão Filtros (Roxo Sólido como na imagem) */}
          <button
            type="button"
            onClick={() => setIsFilterModalOpen(true)}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-xs font-bold text-white bg-[#5B21B6] hover:bg-[#4C1D95] shadow-xs transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-white" />
            <span>Filtros</span>
          </button>

          {/* Indicadores de Telemetria */}
          <div className="flex flex-col justify-center text-[11px] text-slate-600 pl-1 space-y-0.5 border-l border-slate-200/80 pl-2.5 ml-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
              <span className="whitespace-nowrap text-slate-600">
                Dados atualizados: <strong className="font-semibold text-slate-800">{lastUpdateTime}</strong>
              </span>
              <button
                type="button"
                onClick={handleManualRefresh}
                className="text-slate-400 hover:text-[#5B21B6] transition-colors p-0.5 rounded cursor-pointer"
                title="Atualizar dados agora"
              >
                <RefreshCw className={`w-2.5 h-2.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0 animate-pulse" />
              <span className="font-medium text-slate-500 whitespace-nowrap">
                Dados em tempo real
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP KPI ROW: 6 CARDS (Padrão Proporcional, Compacto e Refinado)        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3">
        {kpis.map((kpi) => (
          <div
            key={kpi.id}
            onClick={() => setActiveKpiDetail(kpi.label)}
            className="bg-white rounded-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-2xs hover:shadow-xs hover:border-purple-300 transition-all duration-200 flex flex-col justify-between group min-w-0 cursor-pointer"
          >
            {/* Topo do Card: Ícone Pastel + Indicador/Delta */}
            <div className="flex items-center justify-between gap-1.5">
              <div className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg ${kpi.bgClass} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs`}>
                {kpi.iconType === 'folder' && <FolderKanban className="w-3.5 h-3.5" strokeWidth={2.2} />}
                {kpi.iconType === 'document' && <FileSpreadsheet className="w-3.5 h-3.5" strokeWidth={2.2} />}
                {kpi.iconType === 'check' && <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.2} />}
                {kpi.iconType === 'wallet' && <Wallet className="w-3.5 h-3.5" strokeWidth={2.2} />}
                {kpi.iconType === 'trend' && <TrendingUp className="w-3.5 h-3.5" strokeWidth={2.2} />}
                {kpi.iconType === 'users' && <Users className="w-3.5 h-3.5" strokeWidth={2.2} />}
              </div>
              <span className="text-[9.5px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-1.5 py-0.5 rounded whitespace-nowrap shadow-2xs">
                {kpi.trend}
              </span>
            </div>

            {/* Conteúdo Central: Métrica Compacta + Rótulo Elegante */}
            <div className="mt-2">
              <p className="text-lg sm:text-[20px] font-bold text-[#0F172A] font-sans tracking-tight leading-tight">
                {kpi.value}
              </p>
              <p className="text-[11px] sm:text-[11.5px] font-medium text-slate-700 mt-0.5 leading-tight truncate" title={kpi.label}>
                {kpi.label}
              </p>
              <p className="text-[9.5px] sm:text-[10px] text-slate-400 mt-0.5 truncate">
                {kpi.trendPeriod}
              </p>
            </div>

            {/* Rodapé: Link Interativo Compacto */}
            <div className="pt-1.5 mt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10.5px] font-semibold text-[#5B21B6] group-hover:text-purple-800 inline-flex items-center gap-1 transition-colors cursor-pointer group-hover:underline">
                <span>Ver detalhes</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 3. LINHA 1 (3 CARDS): Área de Atuação | Mapa Global | Status             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* CARD 1: Projetos por Área de Atuação */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] font-sans">
              Projetos por Área de Atuação
            </h2>
            
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Donut Chart SVG */}
              <div className="relative shrink-0 flex items-center justify-center">
                {renderDonutSegments(
                  areaDistribution.map((a) => ({ percentage: a.percentage, color: a.color, name: a.name })),
                  hoveredAreaIndex,
                  setHoveredAreaIndex,
                  130,
                  22
                )}
                {/* Centro do Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  {hoveredAreaIndex !== null ? (
                    <>
                      <span className="text-base font-extrabold text-[#0F172A] font-sans">
                        {areaDistribution[hoveredAreaIndex].percentage}%
                      </span>
                      <span className="text-[9px] font-medium text-slate-500 max-w-[70px] truncate">
                        {areaDistribution[hoveredAreaIndex].name}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-base font-extrabold text-[#0F172A] font-sans">
                        1.248
                      </span>
                      <span className="text-[9px] font-medium text-slate-400">
                        Projetos
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Lista de Áreas e Percentagens */}
              <div className="flex-1 w-full space-y-1 text-xs">
                {areaDistribution.map((area, idx) => (
                  <div
                    key={area.name}
                    onMouseEnter={() => setHoveredAreaIndex(idx)}
                    onMouseLeave={() => setHoveredAreaIndex(null)}
                    className={`flex items-center justify-between py-0.5 px-1.5 rounded cursor-pointer transition-colors ${
                      hoveredAreaIndex === idx ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: area.color }}
                      />
                      <span className="text-slate-700 truncate">{area.name}</span>
                    </div>
                    <div className="text-right shrink-0 pl-2">
                      <span className="font-bold text-[#0F172A]">{area.percentage}%</span>{' '}
                      <span className="text-slate-400 text-[10px]">({area.count})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rodapé: Ver todas as áreas */}
          <div className="pt-2 mt-3 border-t border-slate-100 text-right">
            <button
              type="button"
              onClick={() => setIsAllAreasModalOpen(true)}
              className="text-xs font-semibold text-[#5B21B6] hover:text-purple-800 inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Ver todas as áreas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 2: Distribuição Global dos Projetos (World Map) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A] font-sans">
              Distribuição Global dos Projetos
            </h2>

            <div className="mt-3 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              {/* Legenda Vertical à Esquerda */}
              <div className="w-full sm:w-48 space-y-2.5 shrink-0 self-center">
                <div className="flex items-center gap-2.5 text-xs font-medium text-[#1E1B4B]">
                  <span className="w-3.5 h-3.5 rounded-[3px] bg-[#4338CA] shrink-0" />
                  <span>Mais de 100 projetos</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-[#1E1B4B]">
                  <span className="w-3.5 h-3.5 rounded-[3px] bg-[#7C3AED] shrink-0" />
                  <span>Entre 50 e 100 projetos</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-[#1E1B4B]">
                  <span className="w-3.5 h-3.5 rounded-[3px] bg-[#A78BFA] shrink-0" />
                  <span>Entre 10 e 50 projetos</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-[#1E1B4B]">
                  <span className="w-3.5 h-3.5 rounded-[3px] bg-[#DDD6FE] shrink-0" />
                  <span>Menos de 10 projetos</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-[#1E1B4B]">
                  <span className="w-3.5 h-3.5 rounded-[3px] bg-[#CBD5E1] shrink-0" />
                  <span>Sem projetos</span>
                </div>
              </div>

              {/* Mapa D3 Natural Earth */}
              <div className="relative flex-1 w-full h-[180px] sm:h-[200px] flex items-center justify-center">
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
                          className="transition-all duration-150 cursor-pointer hover:opacity-85 hover:stroke-[#4338CA] hover:stroke-[1px]"
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredCountry({
                              name: feat.name,
                              projects: feat.projects,
                              category: feat.category,
                              x: rect.left + rect.width / 2,
                              y: rect.top,
                            });
                          }}
                          onMouseLeave={() => setHoveredCountry(null)}
                          onClick={() => {
                            showToast(`País selecionado: ${feat.name} (${feat.category})`);
                          }}
                        />
                      );
                    })}
                  </g>
                </svg>

                {/* Tooltip do Mapa */}
                {hoveredCountry && (
                  <div className="absolute top-1 right-1 bg-slate-900/90 backdrop-blur-xs text-white px-2.5 py-1.5 rounded-lg text-[10.5px] pointer-events-none shadow-xl z-10 border border-slate-700/60 animate-in fade-in duration-100">
                    <p className="font-bold text-slate-100">{hoveredCountry.name}</p>
                    <p className="text-purple-300 font-semibold">{hoveredCountry.category}</p>
                    {hoveredCountry.projects > 0 && (
                      <p className="text-slate-300 text-[10px]">{hoveredCountry.projects} projetos ativos</p>
                    )}
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
              className="text-xs sm:text-sm font-bold text-[#4F46E5] hover:text-indigo-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver mapa interativo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 3: Status dos Projetos */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] font-sans">
              Status dos Projetos
            </h2>

            <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Donut Chart SVG */}
              <div className="relative shrink-0 flex items-center justify-center">
                {renderDonutSegments(
                  statusDistribution.map((s) => ({ percentage: s.percentage, color: s.color, name: s.name })),
                  hoveredStatusIndex,
                  setHoveredStatusIndex,
                  130,
                  22
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  {hoveredStatusIndex !== null ? (
                    <>
                      <span className="text-base font-extrabold text-[#0F172A] font-sans">
                        {statusDistribution[hoveredStatusIndex].percentage}%
                      </span>
                      <span className="text-[9px] font-medium text-slate-500 max-w-[70px] truncate">
                        {statusDistribution[hoveredStatusIndex].name}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-base font-extrabold text-[#0F172A] font-sans">
                        1.248
                      </span>
                      <span className="text-[9px] font-medium text-slate-400">
                        Total
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Lista de Status */}
              <div className="flex-1 w-full space-y-1.5 text-xs">
                {statusDistribution.map((status, idx) => (
                  <div
                    key={status.name}
                    onMouseEnter={() => setHoveredStatusIndex(idx)}
                    onMouseLeave={() => setHoveredStatusIndex(null)}
                    className={`flex items-center justify-between py-0.5 px-1.5 rounded cursor-pointer transition-colors ${
                      hoveredStatusIndex === idx ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: status.color }}
                      />
                      <span className="text-slate-700 truncate">{status.name}</span>
                    </div>
                    <div className="text-right shrink-0 pl-2">
                      <span className="font-bold text-[#0F172A]">{status.percentage}%</span>{' '}
                      <span className="text-slate-400 text-[10px]">({status.count})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rodapé: Ver todos os status */}
          <div className="pt-2 mt-3 border-t border-slate-100 text-right">
            <button
              type="button"
              onClick={() => setIsAllStatusModalOpen(true)}
              className="text-xs font-semibold text-[#5B21B6] hover:text-purple-800 inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Ver todos os status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. LINHA 2 (3 CARDS): Evolução | Top 5 Impacto | Fontes de Financiamento */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* CARD 1: Evolução dos Projetos (Multi-line SVG Chart) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm sm:text-base font-bold text-[#0F172A] font-sans">
                Evolução dos Projetos
              </h2>
              {/* Dropdown Período */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsEvolutionPeriodDropdownOpen(!isEvolutionPeriodDropdownOpen)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2 py-1 rounded-md cursor-pointer transition-colors"
                >
                  <span>{evolutionPeriod === '12meses' ? 'Últimos 12 meses' : evolutionPeriod === '6meses' ? 'Últimos 6 meses' : 'Últimos 30 dias'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {isEvolutionPeriodDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-xs">
                    <button
                      type="button"
                      onClick={() => { setEvolutionPeriod('12meses'); setIsEvolutionPeriodDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-purple-50 hover:text-[#5B21B6] font-medium"
                    >
                      Últimos 12 meses
                    </button>
                    <button
                      type="button"
                      onClick={() => { setEvolutionPeriod('6meses'); setIsEvolutionPeriodDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-purple-50 hover:text-[#5B21B6] font-medium"
                    >
                      Últimos 6 meses
                    </button>
                    <button
                      type="button"
                      onClick={() => { setEvolutionPeriod('30dias'); setIsEvolutionPeriodDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-purple-50 hover:text-[#5B21B6] font-medium"
                    >
                      Últimos 30 dias
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Legenda dos Marcadores Interativos */}
            <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setActiveEvolutionSeries((p) => ({ ...p, criados: !p.criados }))}
                className={`inline-flex items-center gap-1.5 cursor-pointer transition-opacity ${
                  activeEvolutionSeries.criados ? 'text-slate-800' : 'opacity-40 line-through text-slate-400'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#5B21B6]" />
                <span>Criados</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveEvolutionSeries((p) => ({ ...p, execucao: !p.execucao }))}
                className={`inline-flex items-center gap-1.5 cursor-pointer transition-opacity ${
                  activeEvolutionSeries.execucao ? 'text-slate-800' : 'opacity-40 line-through text-slate-400'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span>Em Execução</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveEvolutionSeries((p) => ({ ...p, concluidos: !p.concluidos }))}
                className={`inline-flex items-center gap-1.5 cursor-pointer transition-opacity ${
                  activeEvolutionSeries.concluidos ? 'text-slate-800' : 'opacity-40 line-through text-slate-400'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
                <span>Concluídos</span>
              </button>
            </div>

            {/* Gráfico SVG com Linhas Suaves e Eixos */}
            <div className="relative mt-3 h-44 w-full">
              <svg viewBox="0 0 460 160" className="w-full h-full overflow-visible">
                {/* Linhas de Grade Horizontal */}
                {[0, 40, 80, 120].map((y, i) => (
                  <line
                    key={i}
                    x1="35"
                    y1={y + 10}
                    x2="450"
                    y2={y + 10}
                    stroke="#F1F5F9"
                    strokeWidth={1}
                  />
                ))}

                {/* Rótulos do Eixo Y */}
                <text x="30" y="15" textAnchor="end" className="text-[9px] fill-slate-400 font-medium">1.5K</text>
                <text x="30" y="55" textAnchor="end" className="text-[9px] fill-slate-400 font-medium">900</text>
                <text x="30" y="95" textAnchor="end" className="text-[9px] fill-slate-400 font-medium">600</text>
                <text x="30" y="135" textAnchor="end" className="text-[9px] fill-slate-400 font-medium">0</text>

                {/* Caminhos SVG */}
                {/* Helper para converter índice e valor em coordenadas x,y */}
                {(() => {
                  const getX = (i: number) => 40 + i * (400 / 11);
                  const getY = (val: number) => 135 - (val / 1500) * 120;

                  const generatePath = (vals: number[]) => {
                    return vals
                      .map((val, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(val)}`)
                      .join(' ');
                  };

                  return (
                    <>
                      {/* Série Criados (Roxo #5B21B6) */}
                      {activeEvolutionSeries.criados && (
                        <>
                          <path
                            d={generatePath(evolutionSeries.criados)}
                            fill="none"
                            stroke="#5B21B6"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {evolutionSeries.criados.map((val, i) => (
                            <circle
                              key={`c-${i}`}
                              cx={getX(i)}
                              cy={getY(val)}
                              r={hoveredMonthIndex === i ? 4 : 2.5}
                              fill="#FFFFFF"
                              stroke="#5B21B6"
                              strokeWidth={2}
                              className="cursor-pointer"
                              onMouseEnter={() => setHoveredMonthIndex(i)}
                              onMouseLeave={() => setHoveredMonthIndex(null)}
                            />
                          ))}
                        </>
                      )}

                      {/* Série Em Execução (Verde #10B981) */}
                      {activeEvolutionSeries.execucao && (
                        <>
                          <path
                            d={generatePath(evolutionSeries.execucao)}
                            fill="none"
                            stroke="#10B981"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {evolutionSeries.execucao.map((val, i) => (
                            <circle
                              key={`e-${i}`}
                              cx={getX(i)}
                              cy={getY(val)}
                              r={hoveredMonthIndex === i ? 4 : 2.5}
                              fill="#FFFFFF"
                              stroke="#10B981"
                              strokeWidth={2}
                              className="cursor-pointer"
                              onMouseEnter={() => setHoveredMonthIndex(i)}
                              onMouseLeave={() => setHoveredMonthIndex(null)}
                            />
                          ))}
                        </>
                      )}

                      {/* Série Concluídos (Azul #0284C7) */}
                      {activeEvolutionSeries.concluidos && (
                        <>
                          <path
                            d={generatePath(evolutionSeries.concluidos)}
                            fill="none"
                            stroke="#0284C7"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {evolutionSeries.concluidos.map((val, i) => (
                            <circle
                              key={`k-${i}`}
                              cx={getX(i)}
                              cy={getY(val)}
                              r={hoveredMonthIndex === i ? 4 : 2.5}
                              fill="#FFFFFF"
                              stroke="#0284C7"
                              strokeWidth={2}
                              className="cursor-pointer"
                              onMouseEnter={() => setHoveredMonthIndex(i)}
                              onMouseLeave={() => setHoveredMonthIndex(null)}
                            />
                          ))}
                        </>
                      )}

                      {/* Eixo X - Meses */}
                      {evolutionMonths.map((m, i) => (
                        <text
                          key={m}
                          x={getX(i)}
                          y="152"
                          textAnchor="middle"
                          className={`text-[9px] font-medium transition-colors ${
                            hoveredMonthIndex === i ? 'fill-[#5B21B6] font-bold' : 'fill-slate-500'
                          }`}
                        >
                          {m}
                        </text>
                      ))}
                    </>
                  );
                })()}
              </svg>

              {/* Tooltip do Mês */}
              {hoveredMonthIndex !== null && (
                <div className="absolute top-0 right-2 bg-slate-900 text-white px-2 py-1 rounded text-[10px] pointer-events-none shadow-md z-10 space-y-0.5">
                  <p className="font-bold border-b border-slate-700 pb-0.5">
                    {evolutionMonths[hoveredMonthIndex]} 2024/25
                  </p>
                  <p className="text-purple-300">
                    Criados: <strong>{evolutionSeries.criados[hoveredMonthIndex]}</strong>
                  </p>
                  <p className="text-emerald-300">
                    Execução: <strong>{evolutionSeries.execucao[hoveredMonthIndex]}</strong>
                  </p>
                  <p className="text-sky-300">
                    Concluídos: <strong>{evolutionSeries.concluidos[hoveredMonthIndex]}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Rodapé: Ver relatório completo */}
          <div className="pt-2 mt-3 border-t border-slate-100 text-right">
            <button
              type="button"
              onClick={() => setIsFullReportModalOpen(true)}
              className="text-xs font-semibold text-[#5B21B6] hover:text-purple-800 inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Ver relatório completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 2: Top 5 Projetos por Impacto (Tabela com Barras de Progresso e Badges) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] font-sans">
              Top 5 Projetos por Impacto
            </h2>

            {/* Cabeçalho da Tabela */}
            <div className="grid grid-cols-12 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mt-3 pb-1 border-b border-slate-100">
              <span className="col-span-4">Projeto</span>
              <span className="col-span-2">Área</span>
              <span className="col-span-2 text-right">Beneficiários</span>
              <span className="col-span-2 text-center">Progresso</span>
              <span className="col-span-2 text-right">Impacto</span>
            </div>

            {/* Linhas de Projetos */}
            <div className="divide-y divide-slate-100 text-xs">
              {topProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setActiveProjectDetail(p)}
                  className="grid grid-cols-12 items-center py-2 hover:bg-purple-50/40 rounded transition-colors cursor-pointer group"
                >
                  {/* Projeto com Ícone Mini */}
                  <div className="col-span-4 flex items-center gap-1.5 min-w-0 pr-1">
                    <div className="w-6 h-6 rounded-md bg-purple-100/70 text-[#5B21B6] flex items-center justify-center shrink-0">
                      {p.iconType === 'droplet' && <Droplets className="w-3 h-3" />}
                      {p.iconType === 'education' && <GraduationCap className="w-3 h-3" />}
                      {p.iconType === 'building' && <Building2 className="w-3 h-3" />}
                      {p.iconType === 'heart' && <Heart className="w-3 h-3" />}
                      {p.iconType === 'health' && <Activity className="w-3 h-3" />}
                    </div>
                    <span className="font-semibold text-slate-800 text-[11.5px] truncate group-hover:text-[#5B21B6]">
                      {p.name}
                    </span>
                  </div>

                  {/* Área */}
                  <span className="col-span-2 text-slate-500 text-[11px] truncate">
                    {p.area}
                  </span>

                  {/* Beneficiários */}
                  <span className="col-span-2 text-right font-medium text-slate-700 text-[11px]">
                    {p.beneficiaries}
                  </span>

                  {/* Barra de Progresso */}
                  <div className="col-span-2 px-1 flex flex-col items-center">
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#5B21B6] h-1.5 rounded-full"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <span className="text-[9.5px] font-semibold text-slate-500 mt-0.5">
                      {p.progress}%
                    </span>
                  </div>

                  {/* Badge de Impacto */}
                  <div className="col-span-2 text-right">
                    <span
                      className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${
                        p.impactLevel === 'Alto'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                          : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                      }`}
                    >
                      {p.impactLevel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé: Ver todos os projetos */}
          <div className="pt-2 mt-3 border-t border-slate-100 text-right">
            <button
              type="button"
              onClick={() => setIsAllProjectsModalOpen(true)}
              className="text-xs font-semibold text-[#5B21B6] hover:text-purple-800 inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Ver todos os projetos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 3: Fontes de Financiamento (Donut) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] font-sans">
              Fontes de Financiamento
            </h2>

            <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Donut Chart SVG */}
              <div className="relative shrink-0 flex items-center justify-center">
                {renderDonutSegments(
                  fundingSources.map((f) => ({ percentage: f.percentage, color: f.color, name: f.name })),
                  hoveredFundingIndex,
                  setHoveredFundingIndex,
                  130,
                  22
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  {hoveredFundingIndex !== null ? (
                    <>
                      <span className="text-base font-extrabold text-[#0F172A] font-sans">
                        {fundingSources[hoveredFundingIndex].percentage}%
                      </span>
                      <span className="text-[9px] font-medium text-slate-500 max-w-[70px] truncate">
                        {fundingSources[hoveredFundingIndex].amount}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-base font-extrabold text-[#0F172A] font-sans">
                        €24,6M
                      </span>
                      <span className="text-[9px] font-medium text-slate-400">
                        Total
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Lista de Fontes */}
              <div className="flex-1 w-full space-y-1.5 text-xs">
                {fundingSources.map((source, idx) => (
                  <div
                    key={source.name}
                    onMouseEnter={() => setHoveredFundingIndex(idx)}
                    onMouseLeave={() => setHoveredFundingIndex(null)}
                    className={`flex items-center justify-between py-0.5 px-1.5 rounded cursor-pointer transition-colors ${
                      hoveredFundingIndex === idx ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-slate-700 truncate">{source.name}</span>
                    </div>
                    <div className="text-right shrink-0 pl-2">
                      <span className="font-bold text-[#0F172A]">{source.percentage}%</span>{' '}
                      <span className="text-slate-400 text-[10px]">({source.amount})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rodapé: Ver todas as fontes */}
          <div className="pt-2 mt-3 border-t border-slate-100 text-right">
            <button
              type="button"
              onClick={() => setIsAllFundingModalOpen(true)}
              className="text-xs font-semibold text-[#5B21B6] hover:text-purple-800 inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Ver todas as fontes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. LINHA 3 (3 CARDS): Projetos Recentes | Chamadas Abertas | Atividades   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* CARD 1: Projetos Recentes (Tabela) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] font-sans">
              Projetos Recentes
            </h2>

            {/* Cabeçalho */}
            <div className="grid grid-cols-12 text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-3 pb-1 border-b border-slate-100">
              <span className="col-span-3">Projeto</span>
              <span className="col-span-2">Área</span>
              <span className="col-span-3">Localização</span>
              <span className="col-span-1 text-center">Parc.</span>
              <span className="col-span-3 text-right">Orçamento</span>
            </div>

            {/* Linhas */}
            <div className="divide-y divide-slate-100 text-xs">
              {recentProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setActiveProjectDetail(p)}
                  className="grid grid-cols-12 items-center py-2 hover:bg-purple-50/40 rounded transition-colors cursor-pointer group"
                >
                  <span className="col-span-3 font-semibold text-slate-800 text-[11.5px] truncate group-hover:text-[#5B21B6]">
                    {p.name}
                  </span>
                  <span className="col-span-2 text-slate-500 text-[11px] truncate">
                    {p.area}
                  </span>
                  <span className="col-span-3 text-slate-600 text-[11px] truncate">
                    {p.location}
                  </span>
                  <span className="col-span-1 text-center text-slate-500 text-[11px]">
                    {p.partnersCount}
                  </span>
                  <div className="col-span-3 text-right space-y-0.5">
                    <p className="font-semibold text-slate-800 text-[11px]">{p.budget}</p>
                    <span
                      className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        p.status === 'Em Execução'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé: Ver todos os projetos */}
          <div className="pt-2 mt-3 border-t border-slate-100 text-right">
            <button
              type="button"
              onClick={() => setIsAllProjectsModalOpen(true)}
              className="text-xs font-semibold text-[#5B21B6] hover:text-purple-800 inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Ver todos os projetos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 2: Chamadas e Oportunidades Abertas */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] font-sans">
              Chamadas e Oportunidades Abertas
            </h2>

            {/* Cabeçalho */}
            <div className="grid grid-cols-12 text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-3 pb-1 border-b border-slate-100">
              <span className="col-span-5">Título</span>
              <span className="col-span-2">Área</span>
              <span className="col-span-3 text-center">Encerramento</span>
              <span className="col-span-2 text-right">Candidaturas</span>
            </div>

            {/* Linhas */}
            <div className="divide-y divide-slate-100 text-xs">
              {openCalls.map((c) => (
                <div
                  key={c.id}
                  onClick={() => showToast(`Detalhes da Chamada: ${c.title} (Orçamento: ${c.budget})`)}
                  className="grid grid-cols-12 items-center py-2.5 hover:bg-purple-50/40 rounded transition-colors cursor-pointer group"
                >
                  <span className="col-span-5 font-semibold text-slate-800 text-[11.5px] truncate group-hover:text-[#5B21B6]">
                    {c.title}
                  </span>
                  <span className="col-span-2 text-slate-500 text-[11px] truncate">
                    {c.area}
                  </span>
                  <span className="col-span-3 text-center text-slate-600 text-[11px]">
                    {c.deadline}
                  </span>
                  <div className="col-span-2 text-right">
                    <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                      {c.candidatesCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé: Ver todas as chamadas */}
          <div className="pt-2 mt-3 border-t border-slate-100 text-right">
            <button
              type="button"
              onClick={() => setIsAllCallsModalOpen(true)}
              className="text-xs font-semibold text-[#5B21B6] hover:text-purple-800 inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Ver todas as chamadas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 3: Atividade Recente (Feed com Ícones) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] font-sans">
              Atividade Recente
            </h2>

            {/* Linhas de Atividades */}
            <div className="divide-y divide-slate-100 text-xs mt-3">
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  onClick={() => showToast(`Atividade: ${act.title}`)}
                  className="py-2 flex items-start gap-2.5 hover:bg-purple-50/40 rounded px-1 transition-colors cursor-pointer group"
                >
                  {/* Ícone por tipo */}
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-[#5B21B6] flex items-center justify-center shrink-0 mt-0.5">
                    {act.type === 'project_created' && <FolderKanban className="w-3.5 h-3.5 text-blue-600" />}
                    {act.type === 'milestone' && <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}
                    {act.type === 'partnership' && <HeartHandshake className="w-3.5 h-3.5 text-teal-600" />}
                    {act.type === 'report' && <FileText className="w-3.5 h-3.5 text-indigo-600" />}
                    {act.type === 'call_published' && <Megaphone className="w-3.5 h-3.5 text-amber-600" />}
                  </div>

                  {/* Textos */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-[11.5px] leading-tight truncate group-hover:text-[#5B21B6]">
                      {act.title}
                    </p>
                    <p className="text-slate-500 text-[10.5px] leading-snug mt-0.5 truncate">
                      {act.subtitle}
                    </p>
                  </div>

                  {/* Timestamp */}
                  <span className="text-[10px] text-slate-400 shrink-0 whitespace-nowrap pl-1">
                    {act.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé: Ver todas as atividades */}
          <div className="pt-2 mt-3 border-t border-slate-100 text-right">
            <button
              type="button"
              onClick={() => setIsAllActivitiesModalOpen(true)}
              className="text-xs font-semibold text-[#5B21B6] hover:text-purple-800 inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Ver todas as atividades</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. MODAIS OPERACIONAIS INTERATIVOS                                        */}
      {/* ========================================================================= */}

      {/* Modal: Exportação */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800">
                <Download className="w-4 h-4 text-[#5B21B6]" />
                <h3 className="font-bold text-sm sm:text-base font-sans">Exportar Dados de Projetos</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-3">
              Selecione o formato desejado para exportar o relatório consolidado de <strong>1.248 projetos</strong> e dados financeiros.
            </p>

            <div className="space-y-2 mt-4 text-xs">
              <button
                type="button"
                onClick={() => {
                  setIsExportModalOpen(false);
                  showToast('Exportação CSV iniciada: Projetos_VILA_2025.csv');
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-[#5B21B6] hover:bg-purple-50/50 transition-all font-medium text-slate-700"
              >
                <span>Planilha Completa (CSV / Excel)</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">.CSV</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsExportModalOpen(false);
                  showToast('Exportação PDF gerada com sucesso.');
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-[#5B21B6] hover:bg-purple-50/50 transition-all font-medium text-slate-700"
              >
                <span>Dossiê Executivo de Impacto (PDF)</span>
                <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">.PDF</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsExportModalOpen(false);
                  showToast('Exportação de dados abertos JSON concluída.');
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-[#5B21B6] hover:bg-purple-50/50 transition-all font-medium text-slate-700"
              >
                <span>Dados Abertos para Integrações (JSON API)</span>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">.JSON</span>
              </button>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Filtros */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800">
                <SlidersHorizontal className="w-4 h-4 text-[#5B21B6]" />
                <h3 className="font-bold text-sm sm:text-base font-sans">Filtros de Projetos e Iniciativas</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 mt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Área de Atuação</label>
                <select
                  value={filterArea}
                  onChange={(e) => setFilterArea(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2 text-slate-700 text-xs focus:border-[#5B21B6] focus:ring-1 focus:ring-[#5B21B6]"
                >
                  <option value="Todas">Todas as Áreas</option>
                  <option value="Ambiente">Ambiente</option>
                  <option value="Educação">Educação</option>
                  <option value="Inclusão Social">Inclusão Social</option>
                  <option value="Desenvolvimento Econ.">Desenvolvimento Económico</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Cultura">Cultura</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Status do Projeto</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2 text-slate-700 text-xs focus:border-[#5B21B6] focus:ring-1 focus:ring-[#5B21B6]"
                >
                  <option value="Todos">Todos os Status</option>
                  <option value="Em Execução">Em Execução</option>
                  <option value="Planeamento">Planeamento</option>
                  <option value="Concluídos">Concluídos</option>
                  <option value="Suspensos">Suspensos</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setFilterArea('Todas');
                  setFilterStatus('Todos');
                  setIsFilterModalOpen(false);
                  showToast('Filtros repostos com sucesso.');
                }}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsFilterModalOpen(false);
                  showToast(`Filtros aplicados: ${filterArea} • ${filterStatus}`);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#5B21B6] hover:bg-[#4C1D95] rounded-lg shadow-xs"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Detalhes do Projeto / Dossiê */}
      {activeProjectDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800">
                <FolderKanban className="w-4 h-4 text-[#5B21B6]" />
                <h3 className="font-bold text-sm sm:text-base font-sans">{activeProjectDetail.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProjectDetail(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Área temática:</span>
                <span className="font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {activeProjectDetail.area}
                </span>
              </div>

              {'location' in activeProjectDetail && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Localização geográfica:</span>
                  <span className="font-semibold text-slate-800">{activeProjectDetail.location}</span>
                </div>
              )}

              {'beneficiaries' in activeProjectDetail && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Beneficiários Diretos:</span>
                  <span className="font-bold text-emerald-700">{activeProjectDetail.beneficiaries} pessoas</span>
                </div>
              )}

              {'budget' in activeProjectDetail && activeProjectDetail.budget && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Orçamento Alocado:</span>
                  <span className="font-bold text-[#0F172A]">{activeProjectDetail.budget}</span>
                </div>
              )}

              {'progress' in activeProjectDetail && (
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Execução física:</span>
                    <span className="font-bold text-[#5B21B6]">{activeProjectDetail.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#5B21B6] h-2 rounded-full" style={{ width: `${activeProjectDetail.progress}%` }} />
                  </div>
                </div>
              )}

              {'description' in activeProjectDetail && activeProjectDetail.description && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 leading-relaxed">
                  {activeProjectDetail.description}
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveProjectDetail(null);
                  showToast(`Dossiê de ${activeProjectDetail.name} descarregado.`);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descarregar Ficha</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveProjectDetail(null)}
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#5B21B6] hover:bg-[#4C1D95] rounded-lg shadow-xs"
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: KPI Detail */}
      {activeKpiDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm sm:text-base font-sans text-slate-800">
                Detalhamento: {activeKpiDetail}
              </h3>
              <button
                type="button"
                onClick={() => setActiveKpiDetail(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Os dados consolidados de <strong>{activeKpiDetail}</strong> abrangem projetos cívicos, municipais e comunitários auditados nos 11 países ativos da rede VILA.
            </p>

            <div className="mt-4 p-3 bg-purple-50/60 rounded-xl border border-purple-100 text-xs space-y-1 text-slate-700">
              <p>• <strong>Validação em tempo real:</strong> Auditado por comissões locais.</p>
              <p>• <strong>Critérios:</strong> Transparência de verbas e impacto comunitário direto.</p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveKpiDetail(null)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#5B21B6] hover:bg-[#4C1D95] rounded-lg shadow-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Mapa Interativo Expandido */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800">
                <Globe className="w-4 h-4 text-[#5B21B6]" />
                <h3 className="font-bold text-sm sm:text-base font-sans">Presença Global de Projetos VILA</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-3">
              A rede VILA apoia 1.248 projetos em 4 continentes, com densidade máxima em Portugal, Brasil, Moçambique e Angola.
            </p>

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50">
                <p className="text-slate-400 text-[10px]">Europa</p>
                <p className="text-sm font-bold text-[#0F172A]">452 projetos</p>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50">
                <p className="text-slate-400 text-[10px]">África</p>
                <p className="text-sm font-bold text-[#0F172A]">418 projetos</p>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50">
                <p className="text-slate-400 text-[10px]">América Latina</p>
                <p className="text-sm font-bold text-[#0F172A]">326 projetos</p>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50">
                <p className="text-slate-400 text-[10px]">Ásia-Pacífico</p>
                <p className="text-sm font-bold text-[#0F172A]">52 projetos</p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#5B21B6] hover:bg-[#4C1D95] rounded-lg shadow-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ver Todas as Áreas */}
      {isAllAreasModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm sm:text-base font-sans text-slate-800">
                Todas as Áreas de Atuação
              </h3>
              <button
                type="button"
                onClick={() => setIsAllAreasModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-3 text-xs">
              {areaDistribution.map((a) => (
                <div key={a.name} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: a.color }} />
                    <span className="font-medium text-slate-800">{a.name}</span>
                  </div>
                  <span className="font-bold text-[#5B21B6]">{a.count} projetos ({a.percentage}%)</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsAllAreasModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#5B21B6] hover:bg-[#4C1D95] rounded-lg shadow-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ver Todos os Status */}
      {isAllStatusModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm sm:text-base font-sans text-slate-800">
                Distribuição de Status dos Projetos
              </h3>
              <button
                type="button"
                onClick={() => setIsAllStatusModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-3 text-xs">
              {statusDistribution.map((s) => (
                <div key={s.name} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="font-medium text-slate-800">{s.name}</span>
                  </div>
                  <span className="font-bold text-[#5B21B6]">{s.count} projetos ({s.percentage}%)</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsAllStatusModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#5B21B6] hover:bg-[#4C1D95] rounded-lg shadow-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ver Todas as Fontes de Financiamento */}
      {isAllFundingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm sm:text-base font-sans text-slate-800">
                Fontes de Financiamento Auditadas
              </h3>
              <button
                type="button"
                onClick={() => setIsAllFundingModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-3 text-xs">
              {fundingSources.map((f) => (
                <div key={f.name} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: f.color }} />
                    <span className="font-medium text-slate-800">{f.name}</span>
                  </div>
                  <span className="font-bold text-[#5B21B6]">{f.amount} ({f.percentage}%)</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsAllFundingModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#5B21B6] hover:bg-[#4C1D95] rounded-lg shadow-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ver Todos os Projetos */}
      {isAllProjectsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <h3 className="font-bold text-sm sm:text-base font-sans text-slate-800">
                Diretório Geral de Projetos (1.248)
              </h3>
              <button
                type="button"
                onClick={() => setIsAllProjectsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 divide-y divide-slate-100 mt-3 text-xs">
              {[...topProjects, ...recentProjects].map((p, idx) => (
                <div key={`${p.id}-${idx}`} className="py-2.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded">
                  <div>
                    <p className="font-bold text-slate-800">{p.name}</p>
                    <p className="text-slate-500 text-[11px]">{p.area}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAllProjectsModalOpen(false);
                      setActiveProjectDetail(p);
                    }}
                    className="text-xs font-semibold text-[#5B21B6] hover:underline"
                  >
                    Ver Dossiê →
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setIsAllProjectsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#5B21B6] hover:bg-[#4C1D95] rounded-lg shadow-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ver Todas as Chamadas */}
      {isAllCallsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm sm:text-base font-sans text-slate-800">
                Chamadas Públicas e Bolsas Abertas
              </h3>
              <button
                type="button"
                onClick={() => setIsAllCallsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-3 text-xs">
              {openCalls.map((c) => (
                <div key={c.id} className="py-2.5">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{c.title}</span>
                    <span className="text-emerald-700">{c.budget}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">{c.description}</p>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
                    <span>Encerra: {c.deadline}</span>
                    <span>{c.candidatesCount} candidaturas submetidas</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsAllCallsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#5B21B6] hover:bg-[#4C1D95] rounded-lg shadow-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ver Todas as Atividades */}
      {isAllActivitiesModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm sm:text-base font-sans text-slate-800">
                Fluxo em Tempo Real de Atividades
              </h3>
              <button
                type="button"
                onClick={() => setIsAllActivitiesModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-3 text-xs">
              {recentActivities.map((act) => (
                <div key={act.id} className="py-2">
                  <p className="font-semibold text-slate-800">{act.title}</p>
                  <p className="text-slate-500 text-[11px]">{act.subtitle}</p>
                  <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsAllActivitiesModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#5B21B6] hover:bg-[#4C1D95] rounded-lg shadow-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Relatório Completo */}
      {isFullReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm sm:text-base font-sans text-slate-800">
                Relatório de Evolução Trimestral
              </h3>
              <button
                type="button"
                onClick={() => setIsFullReportModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              O relatório trimestral detalha os 1.390 projetos criados nos últimos 12 meses, com 910 em execução contínua e 390 concluídos com impacto verificado.
            </p>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <p>• Taxa de conclusão com êxito: <strong>94,8%</strong></p>
              <p>• Tempo médio de execução: <strong>7,4 meses</strong></p>
              <p>• Retenção de parceiros: <strong>89,2%</strong></p>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsFullReportModalOpen(false);
                  showToast('Download do Relatório Completo iniciado.');
                }}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descarregar PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setIsFullReportModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#5B21B6] hover:bg-[#4C1D95] rounded-lg shadow-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
