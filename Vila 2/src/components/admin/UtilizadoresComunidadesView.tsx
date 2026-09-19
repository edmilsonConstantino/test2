import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Flag,
  Globe,
  Heart,
  Calendar,
  Download,
  Filter,
  ArrowRight,
  TrendingUp,
  Search,
  CheckCircle2,
  RefreshCw,
  Plus,
  Edit3,
  X,
  ChevronDown,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  Building2,
  Handshake,
  MessageSquare,
  Award,
  Send,
  Leaf,
  GraduationCap,
  HeartPulse,
  Palette,
  Cpu,
  Share2,
  FileText,
  Save,
  RotateCcw,
} from 'lucide-react';
import { DemoUser } from '../../data/demoUsers';
import { BreadcrumbItem } from '../Topbar';
import { ExpandableKpiHeader, KpiCardData } from './ExpandableKpiHeader';
import { SectionCard } from './SectionCard';
import { LineChart } from './MiniCharts';

interface UtilizadoresComunidadesViewProps {
  currentUser: DemoUser;
  onNavigateToTab: (tabId: string) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
  onOpenSupportModal?: () => void;
}

// -------------------------------------------------------------
// Interfaces de Dados
// -------------------------------------------------------------
export interface KPIItem {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendPeriod: string;
  icon: 'users' | 'user-plus' | 'flag' | 'globe' | 'heart' | 'community';
  bgClass: string;
  iconClass: string;
}

export interface SegmentItem {
  id: string;
  name: string;
  percentage: number;
  count: number;
  formattedCount: string;
  color: string;
}

export interface CountryUsersItem {
  id: string;
  country: string;
  users: number;
  formattedUsers: string;
  code: string;
}

export interface CommunityStatusItem {
  id: string;
  status: string;
  count: number;
  formattedCount: string;
  percentage: number;
  color: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  count: number;
  formattedCount: string;
  icon: 'leaf' | 'education' | 'health' | 'culture' | 'tech';
  color: string;
  bgClass: string;
}

export interface GrowthCommunityItem {
  id: string;
  name: string;
  category: string;
  members: number;
  formattedMembers: string;
  growth: string;
  location: string;
}

export interface ActiveMemberItem {
  id: string;
  name: string;
  avatar: string;
  communities: number;
  posts: number;
  interactions: number;
  formattedInteractions: string;
  role?: string;
}

export interface RecentActivityItem {
  id: string;
  type: 'community' | 'user' | 'milestone' | 'post' | 'partner';
  title: string;
  description: string;
  timeAgo: string;
}

// -------------------------------------------------------------
// Dados Padrão (Fieis à Imagem UI UTILIZADORES E COMUNIDADES.png)
// -------------------------------------------------------------
// DADOS DEFAULT (Fieis ao UI UTILIZADORES E COMUNIDADES.png)
// -------------------------------------------------------------
const DEFAULT_KPIS: KPIItem[] = [
  {
    id: 'kpi-membros',
    label: 'Membros da Rede',
    value: '2.847.562',
    trend: '↑ 24%',
    trendPeriod: 'desde o ano passado',
    icon: 'users',
    bgClass: 'bg-blue-50/90 text-[#1455AC] border-blue-100/70 dark:border-blue-800/40 border',
    iconClass: 'text-[#1455AC]',
  },
  {
    id: 'kpi-novos-membros',
    label: 'Novos Membros (30 dias)',
    value: '85.421',
    trend: '↑ 18%',
    trendPeriod: 'desde o período anterior',
    icon: 'user-plus',
    bgClass: 'bg-emerald-50/90 text-emerald-600 dark:text-emerald-400 border-emerald-100/70 dark:border-emerald-800/40 border',
    iconClass: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'kpi-ativos-mes',
    label: 'Utilizadores Ativos (Mês)',
    value: '1.236.754',
    trend: '↑ 21%',
    trendPeriod: 'desde o período anterior',
    icon: 'flag',
    bgClass: 'bg-blue-50/90 text-[#1455AC] border-blue-100/70 dark:border-blue-800/40 border',
    iconClass: 'text-[#1455AC]',
  },
  {
    id: 'kpi-ativos-dia',
    label: 'Utilizadores Ativos Diários',
    value: '156.892',
    trend: '↑ 15%',
    trendPeriod: 'desde o período anterior',
    icon: 'globe',
    bgClass: 'bg-amber-50/90 text-amber-600 dark:text-amber-400 border-amber-100/70 dark:border-amber-800/40 border',
    iconClass: 'text-amber-600 dark:text-amber-400',
  },
  {
    id: 'kpi-retencao',
    label: 'Taxa de Retenção (30 dias)',
    value: '48,7%',
    trend: '↑ 6,3 pp',
    trendPeriod: 'desde o período anterior',
    icon: 'heart',
    bgClass: 'bg-blue-50/90 text-blue-600 border-blue-100/70 dark:border-blue-800/40 border',
    iconClass: 'text-blue-600',
  },
  {
    id: 'kpi-comunidades-criadas',
    label: 'Comunidades Criadas',
    value: '18.732',
    trend: '↑ 18%',
    trendPeriod: 'desde o ano passado',
    icon: 'community',
    bgClass: 'bg-blue-50/90 text-blue-600 border-blue-100/70 dark:border-blue-800/40 border',
    iconClass: 'text-blue-600',
  },
];

const DEFAULT_SEGMENTS: SegmentItem[] = [
  { id: 'cidadaos', name: 'Cidadãos', percentage: 62, count: 1766287, formattedCount: '1.766.287', color: '#1455AC' },
  { id: 'organizacoes', name: 'Organizações', percentage: 18, count: 512742, formattedCount: '512.742', color: '#10B981' },
  { id: 'admin-publicos', name: 'Admin. Públicos', percentage: 12, count: 341707, formattedCount: '341.707', color: '#F59E0B' },
  { id: 'empresas', name: 'Empresas', percentage: 6, count: 170854, formattedCount: '170.854', color: '#5F9DE0' },
  { id: 'outros', name: 'Outros', percentage: 2, count: 55972, formattedCount: '55.972', color: '#2D79D1' },
];

const DEFAULT_COUNTRIES: CountryUsersItem[] = [
  { id: 'pt', country: 'Portugal', users: 532814, formattedUsers: '532.814', code: 'PT' },
  { id: 'br', country: 'Brasil', users: 412587, formattedUsers: '412.587', code: 'BR' },
  { id: 'es', country: 'Espanha', users: 308456, formattedUsers: '308.456', code: 'ES' },
  { id: 'mz', country: 'Moçambique', users: 187235, formattedUsers: '187.235', code: 'MZ' },
  { id: 'ao', country: 'Angola', users: 165432, formattedUsers: '165.432', code: 'AO' },
  { id: 'fr', country: 'França', users: 126875, formattedUsers: '126.875', code: 'FR' },
  { id: 'mx', country: 'México', users: 117432, formattedUsers: '117.432', code: 'MX' },
  { id: 'co', country: 'Colômbia', users: 98761, formattedUsers: '98.761', code: 'CO' },
  { id: 'de', country: 'Alemanha', users: 76542, formattedUsers: '76.542', code: 'DE' },
  { id: 'it', country: 'Itália', users: 62884, formattedUsers: '62.884', code: 'IT' },
];

const DEFAULT_COMMUNITY_STATUS: CommunityStatusItem[] = [
  { id: 'ativas', status: 'Ativas', count: 10452, formattedCount: '10.452', percentage: 56, color: '#10B981' },
  { id: 'crescimento', status: 'Em Crescimento', count: 4236, formattedCount: '4.236', percentage: 23, color: '#1455AC' },
  { id: 'planeadas', status: 'Planeadas', count: 2718, formattedCount: '2.718', percentage: 14, color: '#F59E0B' },
  { id: 'inativas', status: 'Inativas', count: 1326, formattedCount: '1.326', percentage: 7, color: '#DC2626' },
];

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: 'ambiental', name: 'Ambiental', count: 3852, formattedCount: '3.852', icon: 'leaf', color: '#10B981', bgClass: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { id: 'educacao', name: 'Educação', count: 3242, formattedCount: '3.242', icon: 'education', color: '#2D79D1', bgClass: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  { id: 'saude', name: 'Saúde', count: 2981, formattedCount: '2.981', icon: 'health', color: '#F58300', bgClass: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  { id: 'cultura', name: 'Cultura', count: 2456, formattedCount: '2.456', icon: 'culture', color: '#DC7600', bgClass: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  { id: 'inovacao', name: 'Inovação', count: 2120, formattedCount: '2.120', icon: 'tech', color: '#0F448A', bgClass: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' },
];

const DEFAULT_GROWTH_COMMUNITIES: GrowthCommunityItem[] = [
  { id: 'c1', name: 'Jovens pelo Clima', category: 'Ambiental', members: 12842, formattedMembers: '12.842', growth: '↑ 35%', location: 'Brasil' },
  { id: 'c2', name: 'Educação para Todos', category: 'Educação', members: 9765, formattedMembers: '9.765', growth: '↑ 28%', location: 'Portugal' },
  { id: 'c3', name: 'Saúde em Rede', category: 'Saúde', members: 8532, formattedMembers: '8.532', growth: '↑ 24%', location: 'Moçambique' },
  { id: 'c4', name: 'Inovação Social', category: 'Inovação', members: 7921, formattedMembers: '7.921', growth: '↑ 21%', location: 'Espanha' },
  { id: 'c5', name: 'Cultura em Movimento', category: 'Cultura', members: 6887, formattedMembers: '6.887', growth: '↑ 19%', location: 'México' },
];

const DEFAULT_ACTIVE_MEMBERS: ActiveMemberItem[] = [
  { id: 'm1', name: 'João Silva', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', communities: 28, posts: 156, interactions: 2432, formattedInteractions: '2.432', role: 'Embaixador Cívico' },
  { id: 'm2', name: 'Ana Costa', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80', communities: 34, posts: 142, interactions: 2105, formattedInteractions: '2.105', role: 'Líder de Comunidade' },
  { id: 'm3', name: 'Maria Oliveira', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', communities: 22, posts: 121, interactions: 1876, formattedInteractions: '1.876', role: 'Moderadora' },
  { id: 'm4', name: 'Carlos Santos', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', communities: 19, posts: 98, interactions: 1543, formattedInteractions: '1.543', role: 'Ativista' },
  { id: 'm5', name: 'Luciana Pereira', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', communities: 27, posts: 93, interactions: 1398, formattedInteractions: '1.398', role: 'Investigadora' },
];

const DEFAULT_RECENT_ACTIVITIES: RecentActivityItem[] = [
  { id: 'a1', type: 'community', title: 'Nova comunidade criada', description: 'Comunidade "Energia Solar para Todos"', timeAgo: 'há 5 min' },
  { id: 'a2', type: 'user', title: 'Utilizador registado', description: 'Ricardo Almeida juntou-se à VILA', timeAgo: 'há 8 min' },
  { id: 'a3', type: 'milestone', title: 'Comunidade atingiu marco', description: '"Educação para Todos" atingiu 10K membros', timeAgo: 'há 15 min' },
  { id: 'a4', type: 'post', title: 'Nova publicação em destaque', description: 'Publicado na comunidade "Inovação Social"', timeAgo: 'há 20 min' },
  { id: 'a5', type: 'partner', title: 'Parceria oficializada', description: 'Parceria entre Município de Guimarães e VILA', timeAgo: 'há 35 min' },
];

// Dados dos 30 dias de Novos Registos
const DAILY_REGISTRATIONS = [
  820, 940, 1100, 1050, 1300, 1420, 1280, 1560, 1890, 2100,
  1950, 2300, 2450, 2200, 2150, 2600, 2800, 3100, 2900, 2750,
  3300, 3150, 2950, 3400, 3100, 2850, 3050, 2650, 3200, 3842,
];

// Meses da Linha de Crescimento
const MONTHS_LABELS = ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'];
const GROWTH_DATA = {
  totalMembros: [1200000, 1350000, 1500000, 1680000, 1850000, 2020000, 2180000, 2340000, 2480000, 2610000, 2720000, 2847562],
  utilizadoresAtivos: [520000, 590000, 680000, 750000, 820000, 890000, 940000, 1010000, 1070000, 1120000, 1180000, 1236754],
  novosMembros: [45000, 48000, 52000, 56000, 61000, 64000, 69000, 72000, 75000, 79000, 81000, 85421],
};

export const UtilizadoresComunidadesView: React.FC<UtilizadoresComunidadesViewProps> = ({
  currentUser: _currentUser,
  onNavigateToTab,
  onBreadcrumbChange,
  onOpenSupportModal: _onOpenSupportModal,
}) => {
  // -------------------------------------------------------------
  // Estados de Dados e Controles
  // -------------------------------------------------------------
  const [kpis, setKpis] = useState<KPIItem[]>(DEFAULT_KPIS);
  const [growthCommunities, setGrowthCommunities] = useState<GrowthCommunityItem[]>(DEFAULT_GROWTH_COMMUNITIES);
  const [activeMembers, setActiveMembers] = useState<ActiveMemberItem[]>(DEFAULT_ACTIVE_MEMBERS);
  const [recentActivities, setRecentActivities] = useState<RecentActivityItem[]>(DEFAULT_RECENT_ACTIVITIES);
  const [countriesList, setCountriesList] = useState<CountryUsersItem[]>(DEFAULT_COUNTRIES);
  const [categoriesList] = useState<CategoryItem[]>(DEFAULT_CATEGORIES);

  // Filtro de Data
  const [selectedDateRange, setSelectedDateRange] = useState('01 Mai 2024 - 24 Mai 2025');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  // Filtro do Gráfico de Crescimento
  const [growthPeriod, setGrowthPeriod] = useState<'12meses' | '6meses' | '30dias'>('12meses');
  const [isGrowthPeriodOpen, setIsGrowthPeriodOpen] = useState(false);
  const [activeGrowthLines, setActiveGrowthLines] = useState({
    total: true,
    ativos: true,
    novos: true,
  });
  const [hoveredGrowthIndex, setHoveredGrowthIndex] = useState<number | null>(null);

  // Filtro de Segmento e Status
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [communitySearchTerm, setCommunitySearchTerm] = useState('');

  // Status de atualização em tempo real
  const [lastUpdateTime, setLastUpdateTime] = useState('10:32');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modais Interativos de Alteração de Conteúdo
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isEditContentModalOpen, setIsEditContentModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [activeDetailModal, setActiveDetailModal] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Hover states nos gráficos
  const [hoveredDonutSegment, setHoveredDonutSegment] = useState<string | null>(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Breadcrumb estável
  const onBreadcrumbChangeRef = useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;
  const onNavigateToTabRef = useRef(onNavigateToTab);
  onNavigateToTabRef.current = onNavigateToTab;

  useEffect(() => {
    onBreadcrumbChangeRef.current?.([
      { label: 'Plataforma VILA', onClick: () => onNavigateToTabRef.current('painel-gestao') },
      { label: 'Utilizadores e Comunidades' },
    ]);
  }, []);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Refresh Simulado
  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setLastUpdateTime(`${hours}:${mins}`);
      setIsRefreshing(false);
      showToast('Dados em tempo real atualizados com sucesso!');
    }, 500);
  };

  // -------------------------------------------------------------
  // Cálculos SVG: Gráfico de Linha de Crescimento
  // -------------------------------------------------------------
  const lineChartData = useMemo(() => {
    const width = 580;
    const height = 180;
    const paddingX = 40;
    const paddingY = 20;
    const maxY = 3000000;

    const dataLength = growthPeriod === '6meses' ? 6 : MONTHS_LABELS.length;
    const months = MONTHS_LABELS.slice(-dataLength);
    const totalData = GROWTH_DATA.totalMembros.slice(-dataLength);
    const ativosData = GROWTH_DATA.utilizadoresAtivos.slice(-dataLength);
    const novosData = GROWTH_DATA.novosMembros.slice(-dataLength);

    const scaleX = (idx: number) => paddingX + idx * ((width - paddingX - 20) / (dataLength - 1));
    const scaleY = (val: number) => height - (val / maxY) * (height - paddingY) + paddingY;

    // Novos membros escalados para visualização harmônica (multiplicado por 15 para aparecer na mesma escala gráfica)
    const scaleYNovos = (val: number) => scaleY(val * 12);

    const makePath = (vals: number[], customScaleY = scaleY) => {
      return vals
        .map((v, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i).toFixed(1)} ${customScaleY(v).toFixed(1)}`)
        .join(' ');
    };

    return {
      months,
      totalData,
      ativosData,
      novosData,
      scaleX,
      scaleY,
      scaleYNovos,
      totalPath: makePath(totalData),
      ativosPath: makePath(ativosData),
      novosPath: makePath(novosData, scaleYNovos),
    };
  }, [growthPeriod]);

  // Cards do cabeçalho expansível
  const kpiCards: KpiCardData[] = useMemo(
    () =>
      kpis.map((kpi, idx) => ({
        id: kpi.id,
        label: kpi.label,
        value: kpi.value,
        trend: kpi.trend,
        trendPeriod: kpi.trendPeriod,
        icon:
          kpi.icon === 'users' || kpi.icon === 'community' ? (
            <Users className="w-3.5 h-3.5" strokeWidth={2.2} />
          ) : kpi.icon === 'user-plus' ? (
            <UserPlus className="w-3.5 h-3.5" strokeWidth={2.2} />
          ) : kpi.icon === 'flag' ? (
            <Flag className="w-3.5 h-3.5" strokeWidth={2.2} />
          ) : kpi.icon === 'globe' ? (
            <Globe className="w-3.5 h-3.5" strokeWidth={2.2} />
          ) : (
            <Heart className="w-3.5 h-3.5" strokeWidth={2.2} />
          ),
        bgClass: kpi.bgClass,
        spark: [
          18 + idx, 24 + idx, 21 + idx, 28 + idx, 26 + idx, 33 + idx,
          31 + idx, 38 + idx, 36 + idx, 44 + idx, 42 + idx, 50 + idx,
        ],
      })),
    [kpis]
  );

  // -------------------------------------------------------------
  // Séries do gráfico de crescimento (respeitando toggles de legenda)
  // -------------------------------------------------------------
  const growthChartSeries = useMemo(() => {
    const dataLength = growthPeriod === '6meses' ? 6 : MONTHS_LABELS.length;
    const series = [
      { name: 'Total', color: '#1455AC', values: GROWTH_DATA.totalMembros.slice(-dataLength), on: activeGrowthLines.total },
      { name: 'Ativos', color: '#10B981', values: GROWTH_DATA.utilizadoresAtivos.slice(-dataLength), on: activeGrowthLines.ativos },
      {
        name: 'Novos',
        color: '#0F448A',
        values: GROWTH_DATA.novosMembros.slice(-dataLength).map((v) => v * 12),
        on: activeGrowthLines.novos,
      },
    ];
    return series.filter((s) => s.on).map(({ name, color, values }) => ({ name, color, values }));
  }, [growthPeriod, activeGrowthLines]);

  // -------------------------------------------------------------
  // Cálculos SVG: Donut Chart de Segmentos
  // -------------------------------------------------------------
  const segmentDonutData = useMemo(() => {
    let currentAngle = 0;
    return DEFAULT_SEGMENTS.map((seg) => {
      const angle = (seg.percentage / 100) * 360;
      const startAngle = currentAngle;
      currentAngle += angle;
      return {
        ...seg,
        startAngle,
        endAngle: currentAngle,
        dashArray: `${(seg.percentage * 2 * Math.PI * 40) / 100} ${2 * Math.PI * 40}`,
        dashOffset: `${-((startAngle * 2 * Math.PI * 40) / 360)}`,
      };
    });
  }, []);

  // -------------------------------------------------------------
  // Cálculos SVG: Donut Chart de Comunidades por Status
  // -------------------------------------------------------------
  const statusDonutData = useMemo(() => {
    let currentAngle = 0;
    return DEFAULT_COMMUNITY_STATUS.map((st) => {
      const angle = (st.percentage / 100) * 360;
      const startAngle = currentAngle;
      currentAngle += angle;
      return {
        ...st,
        startAngle,
        endAngle: currentAngle,
      };
    });
  }, []);

  // Max value para barras de países
  const maxCountryUsers = useMemo(() => {
    return Math.max(...countriesList.map((c) => c.users), 600000);
  }, [countriesList]);

  // Filtragem da Tabela de Comunidades
  const filteredCommunities = useMemo(() => {
    return growthCommunities.filter((com) => {
      const matchesSearch = com.name.toLowerCase().includes(communitySearchTerm.toLowerCase()) ||
        com.category.toLowerCase().includes(communitySearchTerm.toLowerCase()) ||
        com.location.toLowerCase().includes(communitySearchTerm.toLowerCase());
      const matchesCategory = selectedCategoryFilter === 'all' || com.category.toLowerCase() === selectedCategoryFilter.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [growthCommunities, communitySearchTerm, selectedCategoryFilter]);

  // Handler para adicionar ou alterar comunidade via modal rápido
  const handleAddNewCommunity = (newCom: Omit<GrowthCommunityItem, 'id'>) => {
    const newItem: GrowthCommunityItem = {
      ...newCom,
      id: `c-${Date.now()}`,
    };
    setGrowthCommunities((prev) => [newItem, ...prev]);
    showToast(`Comunidade "${newCom.name}" adicionada com sucesso!`);
  };

  // Handler para alterar métrica de KPI
  const handleUpdateKpi = (id: string, newVal: string, newTrend: string) => {
    setKpis((prev) =>
      prev.map((k) => (k.id === id ? { ...k, value: newVal, trend: newTrend } : k))
    );
    showToast('Indicador atualizado!');
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5 animate-in fade-in duration-200">
      {/* Toast de notificação flutuante */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 border border-slate-700">
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
            <Users className="w-5 h-5 text-[#1455AC]" strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-slate-50 font-sans tracking-tight leading-tight">
              Utilizadores e Comunidades
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5 max-w-xl">
              Visão completa da base de utilizadores e do ecossistema de comunidades da rede VILA.
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
                      showToast(`Filtro de período alterado para: ${p}`);
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

          {/* Botão Filtros (Roxo Sólido como na imagem) */}
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
      {/* 3. SEGUNDA LINHA: 3 COLUNAS (Crescimento | Distribuição | Países Top 10)  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* COLUNA 1: Crescimento de Utilizadores (Gráfico Multi-linha SVG) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-700">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Crescimento de Utilizadores
              </h2>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsGrowthPeriodOpen(!isGrowthPeriodOpen)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  <span>{growthPeriod === '12meses' ? 'Últimos 12 meses' : growthPeriod === '6meses' ? 'Últimos 6 meses' : 'Últimos 30 dias'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                </button>
                {isGrowthPeriodOpen && (
                  <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-20 py-1 text-xs">
                    <button
                      type="button"
                      onClick={() => { setGrowthPeriod('12meses'); setIsGrowthPeriodOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-[#1455AC] font-medium"
                    >
                      Últimos 12 meses
                    </button>
                    <button
                      type="button"
                      onClick={() => { setGrowthPeriod('6meses'); setIsGrowthPeriodOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-[#1455AC] font-medium"
                    >
                      Últimos 6 meses
                    </button>
                    <button
                      type="button"
                      onClick={() => { setGrowthPeriod('30dias'); setIsGrowthPeriodOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-[#1455AC] font-medium"
                    >
                      Últimos 30 dias
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Legenda Interativa com Marcadores */}
            <div className="flex flex-wrap items-center gap-4 pt-3 pb-1 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setActiveGrowthLines((p) => ({ ...p, total: !p.total }))}
                className={`inline-flex items-center gap-1.5 cursor-pointer transition-opacity ${
                  activeGrowthLines.total ? 'opacity-100 text-slate-800 dark:text-slate-100' : 'opacity-40 text-slate-400 dark:text-slate-500 line-through'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#1455AC]" />
                <span>Total de Membros</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveGrowthLines((p) => ({ ...p, ativos: !p.ativos }))}
                className={`inline-flex items-center gap-1.5 cursor-pointer transition-opacity ${
                  activeGrowthLines.ativos ? 'opacity-100 text-slate-800 dark:text-slate-100' : 'opacity-40 text-slate-400 dark:text-slate-500 line-through'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span>Utilizadores Ativos</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveGrowthLines((p) => ({ ...p, novos: !p.novos }))}
                className={`inline-flex items-center gap-1.5 cursor-pointer transition-opacity ${
                  activeGrowthLines.novos ? 'opacity-100 text-slate-800 dark:text-slate-100' : 'opacity-40 text-slate-400 dark:text-slate-500 line-through'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F448A]" />
                <span>Novos Membros</span>
              </button>
            </div>

            {/* Gráfico de Linha realista (grelha, eixos, área suave e pontos) */}
            <div
              className="relative mt-2 w-full cursor-crosshair"
              onMouseLeave={() => setHoveredGrowthIndex(null)}
              onMouseMove={(e) => {
                const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                const relX = (e.clientX - rect.left) / rect.width;
                setHoveredGrowthIndex(
                  Math.min(lineChartData.months.length - 1, Math.max(0, Math.round(relX * (lineChartData.months.length - 1))))
                );
              }}
            >
              <LineChart
                series={growthChartSeries}
                labels={lineChartData.months}
                height={200}
                yTicks={4}
                formatY={(v) =>
                  v >= 1000000
                    ? `${(v / 1000000).toFixed(v % 1000000 === 0 ? 0 : 2).replace('.', ',')}M`
                    : v >= 1000
                    ? `${Math.round(v / 1000)}K`
                    : String(v)
                }
              />

              {/* Tooltip flutuante quando o usuário passa o mouse num mês */}
              {hoveredGrowthIndex !== null && (
                <div
                  className="absolute bg-slate-900/95 text-white text-[10px] p-2.5 rounded-xl shadow-xl pointer-events-none z-10 space-y-1 left-3 top-3"
                >
                  <div className="font-bold text-slate-300 pb-1 border-b border-slate-700">
                    Mês: {lineChartData.months[hoveredGrowthIndex]}
                  </div>
                  {activeGrowthLines.total && (
                    <div className="flex items-center justify-between gap-3 text-blue-300">
                      <span>Total:</span>
                      <strong className="font-mono">{lineChartData.totalData[hoveredGrowthIndex]?.toLocaleString('pt-PT')}</strong>
                    </div>
                  )}
                  {activeGrowthLines.ativos && (
                    <div className="flex items-center justify-between gap-3 text-emerald-300">
                      <span>Ativos:</span>
                      <strong className="font-mono">{lineChartData.ativosData[hoveredGrowthIndex]?.toLocaleString('pt-PT')}</strong>
                    </div>
                  )}
                  {activeGrowthLines.novos && (
                    <div className="flex items-center justify-between gap-3 text-blue-300">
                      <span>Novos:</span>
                      <strong className="font-mono">{lineChartData.novosData[hoveredGrowthIndex]?.toLocaleString('pt-PT')}</strong>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setActiveDetailModal('Relatório Completo de Crescimento')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1455AC] hover:text-blue-800 transition-colors cursor-pointer group"
            >
              <span>Ver relatório completo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* COLUNA 2: Distribuição por Segmento (Donut Chart + Legenda) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans pb-3 border-b border-slate-200/70 dark:border-slate-700">
              Distribuição por Segmento
            </h2>

            <div className="flex flex-col items-center justify-center pt-3 pb-2">
              {/* Gráfico Donut SVG */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
                  {/* Fundo do círculo */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="16" />
                  {segmentDonutData.map((seg) => (
                    <circle
                      key={seg.id}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={seg.color}
                      strokeWidth={hoveredDonutSegment === seg.id ? "19" : "16"}
                      strokeDasharray={seg.dashArray}
                      strokeDashoffset={seg.dashOffset}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredDonutSegment(seg.id)}
                      onMouseLeave={() => setHoveredDonutSegment(null)}
                    />
                  ))}
                </svg>
                {/* Centro do Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    {hoveredDonutSegment
                      ? segmentDonutData.find((s) => s.id === hoveredDonutSegment)?.percentage + '%'
                      : '100%'}
                  </span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium">Total</span>
                </div>
              </div>

              {/* Tabela de Segmentos com Porcentagem e Valores Exatos */}
              <div className="w-full mt-3 space-y-2 text-xs">
                {segmentDonutData.map((seg) => (
                  <div
                    key={seg.id}
                    onMouseEnter={() => setHoveredDonutSegment(seg.id)}
                    onMouseLeave={() => setHoveredDonutSegment(null)}
                    className={`flex items-center justify-between p-1 rounded-lg transition-colors cursor-pointer ${
                      hoveredDonutSegment === seg.id ? 'bg-slate-50 dark:bg-slate-800/60 font-bold' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                      <span className="text-slate-700 dark:text-slate-300 truncate">{seg.name}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-semibold text-slate-900 dark:text-slate-50 w-8 text-right">{seg.percentage}%</span>
                      <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] w-16 text-right">{seg.formattedCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setActiveDetailModal('Segmentos de Utilizadores')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1455AC] hover:text-blue-800 transition-colors cursor-pointer group"
            >
              <span>Ver todos os segmentos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* COLUNA 3: Utilizadores por País (Top 10) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-700">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Utilizadores por País (Top 10)
              </h2>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Utilizadores</span>
            </div>

            {/* Lista das 10 barras horizontais */}
            <div className="mt-3 space-y-2">
              {countriesList.map((item) => {
                const barWidth = Math.min(Math.round((item.users / maxCountryUsers) * 100), 100);
                return (
                  <div key={item.id} className="flex items-center gap-2 text-xs group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 p-0.5 rounded-lg transition-colors">
                    <span className="w-24 text-slate-700 dark:text-slate-300 font-medium truncate shrink-0">
                      {item.country}
                    </span>
                    <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden relative">
                      <div
                        className="bg-[#1455AC] h-full rounded-full transition-all duration-500 group-hover:bg-[#2D79D1]"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                    <span className="w-14 text-right font-semibold text-slate-800 dark:text-slate-100 font-mono text-[11px] shrink-0">
                      {item.formattedUsers}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setActiveDetailModal('Ranking Global de Países')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1455AC] hover:text-blue-800 transition-colors cursor-pointer group"
            >
              <span>Ver todos os países</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. TERCEIRA LINHA: grelha assimétrica 8+4 (Engajamento/Tipos/Registos em cima, Status à direita) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Bloco esquerdo: Tipos + Engajamento + Registos/Dia (8 colunas) */}
        <div className="lg:col-span-8 flex flex-col gap-4 min-w-0">
        {/* Card 2: Tipos de Comunidades (Cards de Categorias) */}
        <SectionCard title="Tipos de Comunidades" footerLabel="Ver todas as categorias" onFooterClick={() => setActiveDetailModal('Categorias de Comunidades')}>
            <div className="grid grid-cols-2 gap-2">
              {categoriesList.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategoryFilter(selectedCategoryFilter === cat.name ? 'all' : cat.name);
                    showToast(`Filtrando comunidades por: ${cat.name}`);
                  }}
                  className={`border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl p-2.5 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    selectedCategoryFilter === cat.name ? 'ring-2 ring-[#1455AC] shadow-xs' : 'hover:scale-[1.02] hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1 ${cat.bgClass}`}>
                    {cat.icon === 'leaf' && <Leaf className="w-4 h-4" />}
                    {cat.icon === 'education' && <GraduationCap className="w-4 h-4" />}
                    {cat.icon === 'health' && <HeartPulse className="w-4 h-4" />}
                    {cat.icon === 'culture' && <Palette className="w-4 h-4" />}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">{cat.name}</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-50 mt-0.5">{cat.formattedCount}</span>
                </button>
              ))}
            </div>

            {/* 5ª Categoria: Inovação */}
            {categoriesList[4] && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategoryFilter(selectedCategoryFilter === categoriesList[4].name ? 'all' : categoriesList[4].name);
                  showToast(`Filtrando comunidades por: ${categoriesList[4].name}`);
                }}
                className={`w-full mt-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs transition-all cursor-pointer ${
                  selectedCategoryFilter === categoriesList[4].name ? 'ring-2 ring-[#1455AC]' : 'hover:scale-[1.01] hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">{categoriesList[4].name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-50">{categoriesList[4].formattedCount}</span>
              </button>
            )}
        </SectionCard>

        {/* Card 3: Engajamento nas Comunidades */}
        <SectionCard title="Engajamento nas Comunidades" footerLabel="Ver métricas de engajamento" onFooterClick={() => setActiveDetailModal('Métricas Detalhadas de Engajamento')}>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Publicações</span>
                <div className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-0.5">
                  125.842
                </div>
                <div className="text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  ↑ 22%
                </div>
              </div>

              <div className="bg-slate-50/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Comentários</span>
                <div className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-0.5">
                  98.713
                </div>
                <div className="text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  ↑ 18%
                </div>
              </div>

              <div className="bg-slate-50/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Reações</span>
                <div className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-0.5">
                  287.654
                </div>
                <div className="text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  ↑ 25%
                </div>
              </div>

              <div className="bg-slate-50/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Partilhas</span>
                <div className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-0.5">
                  45.321
                </div>
                <div className="text-[10.5px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  ↑ 16%
                </div>
              </div>
            </div>
        </SectionCard>

        {/* Card 4: Novos Registos por Dia (30 dias) */}
        <SectionCard title="Novos Registos por Dia (30 dias)" footerLabel="Ver análise completa" onFooterClick={() => setActiveDetailModal('Análise Diária de Registos')}>
            {/* Gráfico de Barras SVG */}
            <div className="relative h-36 w-full">
              <svg viewBox="0 0 300 130" className="w-full h-full overflow-visible">
                {/* Linhas Horizontais de Referência */}
                {[0, 1000, 2000, 3000, 4000].map((val) => {
                  const y = 110 - (val / 4000) * 90;
                  return (
                    <g key={`reg-grid-${val}`}>
                      <line x1="25" y1={y} x2="295" y2={y} stroke="#F1F5F9" strokeWidth="1" />
                      <text x="20" y={y + 3} textAnchor="end" className="text-[8.5px] fill-slate-400 font-medium select-none">
                        {val === 0 ? '0' : `${val / 1000}K`}
                      </text>
                    </g>
                  );
                })}

                {/* 30 Barras Roxas Verticais */}
                {DAILY_REGISTRATIONS.map((count, idx) => {
                  const barW = 5.8;
                  const x = 32 + idx * 8.6;
                  const barH = (count / 4000) * 90;
                  const y = 110 - barH;
                  const isHovered = hoveredBarIndex === idx;

                  return (
                    <g
                      key={`reg-bar-${idx}`}
                      onMouseEnter={() => setHoveredBarIndex(idx)}
                      onMouseLeave={() => setHoveredBarIndex(null)}
                      className="cursor-pointer"
                    >
                      <rect
                        x={x}
                        y={y}
                        width={barW}
                        height={barH}
                        rx="1.5"
                        fill={isHovered ? '#2D79D1' : '#1455AC'}
                        className="transition-colors"
                      />
                    </g>
                  );
                })}

                {/* Rótulos do Eixo X */}
                <text x="35" y="125" textAnchor="start" className="text-[8.5px] fill-slate-400 font-medium select-none">25 Abr</text>
                <text x="95" y="125" textAnchor="middle" className="text-[8.5px] fill-slate-400 font-medium select-none">2 Mai</text>
                <text x="160" y="125" textAnchor="middle" className="text-[8.5px] fill-slate-400 font-medium select-none">9 Mai</text>
                <text x="225" y="125" textAnchor="middle" className="text-[8.5px] fill-slate-400 font-medium select-none">16 Mai</text>
                <text x="290" y="125" textAnchor="end" className="text-[8.5px] fill-slate-400 font-medium select-none">23 Mai</text>
              </svg>

              {/* Tooltip do dia hover */}
              {hoveredBarIndex !== null && (
                <div className="absolute top-1 right-1 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-md pointer-events-none">
                  Dia {hoveredBarIndex + 1}: <strong>{DAILY_REGISTRATIONS[hoveredBarIndex]} registos</strong>
                </div>
              )}
            </div>
        </SectionCard>
        </div>

        {/* Coluna direita: Comunidades por Status (donut, 4 colunas) */}
        <div className="lg:col-span-4 min-w-0">
          <SectionCard
            title="Comunidades por Status"
            footerLabel="Ver todas as comunidades"
            onFooterClick={() => setActiveDetailModal('Todas as Comunidades')}
            contentClassName="flex items-center justify-center"
          >
            <div className="relative w-40 h-40 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#F1F5F9" strokeWidth="14" />
                {statusDonutData.map((st) => {
                  const dash = (st.percentage * 2 * Math.PI * 38) / 100;
                  const offset = -((st.startAngle * 2 * Math.PI * 38) / 360);
                  return (
                    <circle
                      key={`status-lg-${st.id}`}
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke={st.color}
                      strokeWidth="14"
                      strokeDasharray={`${dash} ${2 * Math.PI * 38}`}
                      strokeDashoffset={offset}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold text-[#0F172A] dark:text-slate-50 font-sans">18.732</span>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Comunidades</span>
              </div>
            </div>

            {/* Legenda com percentuais */}
            <div className="w-full space-y-2 mt-2">
              {statusDonutData.map((st) => (
                <div key={`status-lg-${st.id}`} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: st.color }} />
                    <span className="text-slate-700 dark:text-slate-300 font-medium truncate">{st.status}</span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-slate-50 shrink-0">
                    {st.formattedCount} <span className="text-slate-400 dark:text-slate-500 font-normal">({st.percentage}%)</span>
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. QUARTA LINHA: 3 COLUNAS (Maior Crescimento | Membros | Atividade Recente) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* COLUNA 1: Comunidades com Maior Crescimento (Tabela) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-700">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Comunidades com Maior Crescimento
              </h2>
              {/* Quick Search */}
              <div className="relative w-36">
                <Search className="w-3 h-3 text-slate-400 dark:text-slate-500 absolute left-2 top-2" />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  value={communitySearchTerm}
                  onChange={(e) => setCommunitySearchTerm(e.target.value)}
                  className="w-full pl-6 pr-2 py-1 text-xs border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 bg-slate-50/50 dark:bg-slate-800/60"
                />
              </div>
            </div>

            {/* Tabela de Comunidades */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 font-semibold border-b border-slate-200/70 dark:border-slate-700 text-[11px]">
                    <th className="pb-2 font-medium">Comunidade</th>
                    <th className="pb-2 font-medium">Categoria</th>
                    <th className="pb-2 font-medium text-right">Membros</th>
                    <th className="pb-2 font-medium text-right">Crescimento (30 dias)</th>
                    <th className="pb-2 font-medium text-right">Localização</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                  {filteredCommunities.slice(0, 5).map((com) => (
                    <tr
                      key={com.id}
                      className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                      onClick={() => setActiveDetailModal(`Comunidade: ${com.name}`)}
                    >
                      <td className="py-2.5 font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#1455AC] transition-colors">
                        {com.name}
                      </td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {com.category}
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-mono text-slate-700 dark:text-slate-300">
                        {com.formattedMembers}
                      </td>
                      <td className="py-2.5 text-right font-bold text-emerald-600 dark:text-emerald-400">
                        {com.growth}
                      </td>
                      <td className="py-2.5 text-right text-slate-600 dark:text-slate-400">
                        {com.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 flex items-center justify-between mt-4">
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              A exibir {Math.min(filteredCommunities.length, 5)} de {growthCommunities.length} comunidades
            </span>
            <button
              type="button"
              onClick={() => setActiveDetailModal('Todas as Comunidades')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1455AC] hover:text-blue-800 transition-colors cursor-pointer group"
            >
              <span>Ver todas as comunidades</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* COLUNA 2: Membros Mais Ativos (Tabela com Avatares) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans pb-3 border-b border-slate-200/70 dark:border-slate-700">
              Membros Mais Ativos
            </h2>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 font-semibold border-b border-slate-200/70 dark:border-slate-700 text-[11px]">
                    <th className="pb-2 font-medium">Membro</th>
                    <th className="pb-2 font-medium text-center">Comunidades</th>
                    <th className="pb-2 font-medium text-center">Posts</th>
                    <th className="pb-2 font-medium text-right">Interações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                  {activeMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                      onClick={() => setActiveDetailModal(`Perfil do Membro: ${member.name}`)}
                    >
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <span className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#1455AC] transition-colors truncate max-w-[110px]">
                            {member.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 text-center font-mono text-slate-700 dark:text-slate-300">
                        {member.communities}
                      </td>
                      <td className="py-2.5 text-center font-mono text-slate-700 dark:text-slate-300">
                        {member.posts}
                      </td>
                      <td className="py-2.5 text-right font-mono font-semibold text-slate-900 dark:text-slate-50">
                        {member.formattedInteractions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 flex items-center justify-end mt-4">
            <button
              type="button"
              onClick={() => setActiveDetailModal('Ranking Completo de Membros')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1455AC] hover:text-blue-800 transition-colors cursor-pointer group"
            >
              <span>Ver ranking completo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* COLUNA 3: Atividade Recente (Feed em Tempo Real) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans pb-3 border-b border-slate-200/70 dark:border-slate-700">
              Atividade Recente
            </h2>

            <div className="mt-3 space-y-3">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-2.5 text-xs group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 p-1 rounded-lg transition-colors">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {act.type === 'community' && <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                    {act.type === 'user' && <Users className="w-3.5 h-3.5 text-blue-600" />}
                    {act.type === 'milestone' && <Award className="w-3.5 h-3.5 text-amber-500" />}
                    {act.type === 'post' && <Send className="w-3.5 h-3.5 text-blue-600" />}
                    {act.type === 'partner' && <Building2 className="w-3.5 h-3.5 text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-slate-800 dark:text-slate-100 text-[11px] truncate group-hover:text-[#1455AC] transition-colors">
                        {act.title}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">{act.timeAgo}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 flex items-center justify-end mt-4">
            <button
              type="button"
              onClick={() => setActiveDetailModal('Todas as Atividades da Rede')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1455AC] hover:text-blue-800 transition-colors cursor-pointer group"
            >
              <span>Ver todas as atividades</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. MODAIS INTERATIVOS PARA ALTERAR CONTEÚDO E FILTRAR                    */}
      {/* ========================================================================= */}

      {/* Modal: Filtros Interativos */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#1455AC]" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Filtros de Utilizadores e Comunidades
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              {/* Filtro por Categoria */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Filtrar por Categoria
                </label>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/60 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">Todas as Categorias</option>
                  <option value="Ambiental">Ambiental</option>
                  <option value="Educação">Educação</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Cultura">Cultura</option>
                  <option value="Inovação">Inovação</option>
                </select>
              </div>

              {/* Filtro por Período */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Janela Temporal
                </label>
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/60 focus:outline-none focus:border-blue-500"
                >
                  <option value="01 Mai 2024 - 24 Mai 2025">01 Mai 2024 - 24 Mai 2025 (Padrão)</option>
                  <option value="Últimos 30 dias">Últimos 30 dias</option>
                  <option value="Últimos 90 dias">Últimos 90 dias</option>
                  <option value="Últimos 12 meses">Últimos 12 meses</option>
                  <option value="Ano de 2025">Ano de 2025</option>
                </select>
              </div>

              {/* Status de Comunidades */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Status da Comunidade
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Ativas', 'Em Crescimento', 'Planeadas', 'Inativas'].map((st) => (
                    <label key={st} className="flex items-center gap-2 p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-[#1455AC] focus:ring-blue-500" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{st}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2.5 pt-3 border-t border-slate-200/70 dark:border-slate-700">
              <button
                type="button"
                onClick={() => {
                  setIsFilterModalOpen(false);
                  setIsEditContentModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1455AC] hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                title="Editar métricas e adicionar comunidades"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Personalizar Dados</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategoryFilter('all');
                    setCommunitySearchTerm('');
                    setIsFilterModalOpen(false);
                    showToast('Filtros repostos com sucesso!');
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                >
                  Limpar Filtros
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFilterModalOpen(false);
                    showToast('Filtros aplicados com sucesso!');
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#1455AC] hover:bg-blue-700 rounded-xl cursor-pointer shadow-xs"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Alterar Conteúdo / Personalizar Dados */}
      {isEditContentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#1455AC]" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Alterar Conteúdo & Métricas
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditContentModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-5 text-xs">
              <p className="text-slate-500 dark:text-slate-400">
                Altere os valores principais da base de utilizadores ou adicione novas comunidades e membros ativos para testar cenários.
              </p>

              {/* Edição dos KPIs Principais */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs uppercase tracking-wider">
                  Métricas dos Cards Superiores
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {kpis.map((k) => (
                    <div key={k.id} className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">{k.label}</span>
                      <input
                        type="text"
                        value={k.value}
                        onChange={(e) => handleUpdateKpi(k.id, e.target.value, k.trend)}
                        className="w-full font-bold text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-900 border border-slate-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Adicionar Nova Comunidade */}
              <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>Adicionar Nova Comunidade</span>
                  <Plus className="w-4 h-4 text-[#1455AC]" />
                </h4>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const name = (form.elements.namedItem('comName') as HTMLInputElement).value;
                    const cat = (form.elements.namedItem('comCat') as HTMLSelectElement).value;
                    const loc = (form.elements.namedItem('comLoc') as HTMLInputElement).value;
                    const mem = Number((form.elements.namedItem('comMem') as HTMLInputElement).value) || 5000;
                    if (name.trim()) {
                      handleAddNewCommunity({
                        name,
                        category: cat,
                        members: mem,
                        formattedMembers: mem.toLocaleString('pt-PT'),
                        growth: '↑ 42%',
                        location: loc || 'Global',
                      });
                      form.reset();
                    }
                  }}
                  className="space-y-2 bg-blue-50/40 p-3 rounded-xl border border-blue-100 dark:border-blue-800/40"
                >
                  <input
                    name="comName"
                    type="text"
                    required
                    placeholder="Nome da comunidade..."
                    className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-xs"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="comCat"
                      className="px-2 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-xs"
                    >
                      <option value="Ambiental">Ambiental</option>
                      <option value="Educação">Educação</option>
                      <option value="Saúde">Saúde</option>
                      <option value="Cultura">Cultura</option>
                      <option value="Inovação">Inovação</option>
                    </select>
                    <input
                      name="comLoc"
                      type="text"
                      placeholder="País / Cidade"
                      className="px-2 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>
                  <input
                    name="comMem"
                    type="number"
                    placeholder="Nº de membros (ex: 7500)"
                    className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-xs"
                  />
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-[#1455AC] hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer"
                  >
                    Salvar e Adicionar à Tabela
                  </button>
                </form>
              </div>

              {/* Botão de Repor Padrões */}
              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => {
                    setKpis(DEFAULT_KPIS);
                    setGrowthCommunities(DEFAULT_GROWTH_COMMUNITIES);
                    setActiveMembers(DEFAULT_ACTIVE_MEMBERS);
                    setRecentActivities(DEFAULT_RECENT_ACTIVITIES);
                    setCountriesList(DEFAULT_COUNTRIES);
                    showToast('Dados repostos aos valores originais da imagem de referência!');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Repor Dados Originais</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-200/70 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setIsEditContentModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#1455AC] hover:bg-blue-700 rounded-xl cursor-pointer"
              >
                Concluir Edição
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Exportar Dados */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-[#1455AC]" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Exportar Relatório
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 py-3">
              Escolha o formato pretendido para descarregar todos os indicadores consolidados de utilizadores e comunidades:
            </p>

            <div className="space-y-2 py-1">
              {[
                { format: 'CSV', desc: 'Dados brutos para folhas de cálculo' },
                { format: 'JSON', desc: 'Estrutura completa para APIs e relatórios' },
                { format: 'PDF', desc: 'Relatório executivo formatado' },
              ].map((item) => (
                <button
                  key={item.format}
                  type="button"
                  onClick={() => {
                    setIsExportModalOpen(false);
                    showToast(`Exportação ${item.format} gerada com sucesso!`);
                  }}
                  className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all text-left flex items-center justify-between cursor-pointer group"
                >
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#1455AC] block text-xs">
                      Exportar como {item.format}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">{item.desc}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#1455AC]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Genérico de Detalhe (Ao clicar em "Ver detalhes" / "Ver todas...") */}
      {activeDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#1455AC] flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                  {activeDetailModal}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDetailModal(null)}
                className="p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <p>
                Apresentação detalhada com dados em tempo real consolidados para <strong>{activeDetailModal}</strong>.
              </p>

              {/* Exibição condicional com base no modal */}
              {activeDetailModal.includes('Comunidade') ? (
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                      Resumo da Entidade
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">
                      Esta comunidade mantém moderação participativa ativa, fóruns cívicos abertos e iniciativas ligadas aos Objetivos de Desenvolvimento Sustentável.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-2">
                    <div className="bg-blue-50 dark:bg-blue-500/10 p-2 rounded-lg">
                      <span className="text-[10px] text-blue-700 block">Status</span>
                      <strong className="text-slate-900 dark:text-slate-50 text-xs font-bold">Ativa</strong>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded-lg">
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block">Moderação</span>
                      <strong className="text-slate-900 dark:text-slate-50 text-xs font-bold">Aprovada</strong>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-500/10 p-2 rounded-lg">
                      <span className="text-[10px] text-blue-700 block">Engajamento</span>
                      <strong className="text-slate-900 dark:text-slate-50 text-xs font-bold">Alto (92%)</strong>
                    </div>
                  </div>
                </div>
              ) : activeDetailModal.includes('Membro') ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1455AC] font-bold flex items-center justify-center text-sm">
                      M
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-50 text-sm">Perfil Cívico Ativo</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">Identidade validada e participação em múltiplos territórios da VILA.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Os dados completos foram agregados da telemetria da rede VILA para o período selecionado ({selectedDateRange}). Todos os registos cumprem as diretrizes de privacidade e governança transparente.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200/70 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setActiveDetailModal(null)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#1455AC] hover:bg-blue-700 rounded-xl cursor-pointer"
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
