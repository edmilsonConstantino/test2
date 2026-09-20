import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Download,
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
  Users,
  Globe2,
  Wifi,
  ChevronDown,
  X,
  Search,
  Check,
  Building2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Clock,
  Video,
  FileText,
  ExternalLink,
  Share2,
  Eye,
  CheckCircle2,
  Tag,
  Bookmark,
  Award,
  Radio,
  Layers,
  BarChart3,
  CalendarCheck2,
  Info,
} from 'lucide-react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import { DemoUser } from '../../data/demoUsers';
import { BreadcrumbItem } from '../Topbar';
import { ExpandableKpiHeader, KpiCardData } from './ExpandableKpiHeader';
import { useTheme } from '../../contexts/ThemeContext';

interface EventosGlobaisViewProps {
  currentUser: DemoUser;
  onNavigateToTab: (tabId: string) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
  onOpenSupportModal?: () => void;
}

export interface GlobalEventItem {
  id: string;
  dayBadge: string;
  monthBadge: string;
  title: string;
  format: 'Presencial' | 'Online' | 'Híbrido' | 'Sob Demanda';
  isFeatured?: boolean;
  datesText: string;
  countdown: string;
  locationText: string;
  participantsCount: string;
  organizer: string;
  description: string;
  image?: string;
  agenda?: { time: string; topic: string }[];
}

export const EventosGlobaisView: React.FC<EventosGlobaisViewProps> = ({
  currentUser,
  onNavigateToTab,
  onBreadcrumbChange,
}) => {
  const { isDark } = useTheme();

  // ---------------------------------------------------------------------------
  // Estados Locais e Interativos
  // ---------------------------------------------------------------------------
  const [dateRange, setDateRange] = useState('01 Mai 2024 - 24 Mai 2025');
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<GlobalEventItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estados de Filtros e Gráficos
  const [chartPeriod, setChartPeriod] = useState('Últimos 12 meses');
  const [hoveredLineMonth, setHoveredLineMonth] = useState<number | null>(null);
  const [hoveredTypeSegment, setHoveredTypeSegment] = useState<string | null>(null);
  const [hoveredTierSegment, setHoveredTierSegment] = useState<string | null>(null);
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);

  // Estado do Calendário Global
  const [calendarMonth, setCalendarMonth] = useState<'Maio 2025' | 'Junho 2025' | 'Abril 2025'>('Maio 2025');
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(24);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // Sincronização de Breadcrumbs no Topbar
  React.useEffect(() => {
    onBreadcrumbChange?.([
      { label: 'Plataforma VILA', onClick: () => onNavigateToTab('painel-gestao') },
      { label: 'Eventos Globais' },
    ]);
  }, [onBreadcrumbChange, onNavigateToTab]);

  // ---------------------------------------------------------------------------
  // 1. KPIs Cards Data (Conforme Screenshot Exata)
  // ---------------------------------------------------------------------------
  const kpiCards = [
    {
      id: 'kpi-eventos-totais',
      title: 'Eventos Totais',
      value: '9.580',
      trend: '↑ 18%',
      period: 'desde o ano passado',
      icon: Calendar,
      iconBg: 'bg-blue-50/90',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100/70 dark:border-blue-800/40',
    },
    {
      id: 'kpi-eventos-ativos',
      title: 'Eventos Ativos',
      value: '342',
      trend: '↑ 22%',
      period: 'desde o ano passado',
      icon: CalendarCheck2,
      iconBg: 'bg-emerald-50/90',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-100/70 dark:border-emerald-800/40',
    },
    {
      id: 'kpi-participantes-totais',
      title: 'Participantes Totais',
      value: '2,8M+',
      trend: '↑ 25%',
      period: 'desde o ano passado',
      icon: Users,
      iconBg: 'bg-blue-50/90',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100/70 dark:border-blue-800/40',
    },
    {
      id: 'kpi-paises-eventos',
      title: 'Países com Eventos',
      value: '156',
      trend: '↑ 12%',
      period: 'desde o ano passado',
      icon: Globe2,
      iconBg: 'bg-amber-50/90',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-100/70 dark:border-amber-800/40',
    },
    {
      id: 'kpi-eventos-online',
      title: 'Eventos Online',
      value: '2.145',
      trend: '↑ 28%',
      period: 'desde o ano passado',
      icon: Wifi,
      iconBg: 'bg-blue-50/90',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100/70 dark:border-blue-800/40',
    },
    {
      id: 'kpi-taxa-participacao',
      title: 'Taxa de Participação',
      value: '67%',
      trend: '↑ 8 pp',
      period: 'desde o ano passado',
      icon: TrendingUp,
      iconBg: 'bg-blue-50/90',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100/70 dark:border-blue-800/40',
    },
  ];

  // Cards do cabeçalho expansível (mesmos dados, formato KpiCardData)
  const eventosKpiCards: KpiCardData[] = kpiCards.map((kpi, idx) => {
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
        15 + idx, 21 + idx, 18 + idx, 25 + idx, 23 + idx, 30 + idx,
        28 + idx, 35 + idx, 33 + idx, 41 + idx, 39 + idx, 47 + idx,
      ],
    };
  });

  // ---------------------------------------------------------------------------
  // 2. Card 1: Eventos por Tipo (Donut Chart & Legenda)
  // ---------------------------------------------------------------------------
  const tiposData = [
    { label: 'Conferências', percentage: 28, count: '2.682', color: '#1455AC', dotClass: 'bg-blue-600' },
    { label: 'Webinars', percentage: 22, count: '2.108', color: '#5F9DE0', dotClass: 'bg-blue-500' },
    { label: 'Workshops', percentage: 18, count: '1.726', color: '#F59E0B', dotClass: 'bg-amber-500' },
    { label: 'Fóruns', percentage: 14, count: '1.342', color: '#F58300', dotClass: 'bg-blue-500' },
    { label: 'Feiras', percentage: 10, count: '958', color: '#10B981', dotClass: 'bg-emerald-500' },
    { label: 'Outros', percentage: 8, count: '764', color: '#5F9DE0', dotClass: 'bg-blue-500' },
  ];

  // ---------------------------------------------------------------------------
  // 3. Card 2: Eventos por Continente (Mapa D3 com Hotspots e Legenda)
  // ---------------------------------------------------------------------------
  const continentesData = [
    { name: 'Europa', count: '3.245', pct: '34%', color: '#0F448A', coords: [50, 20] },
    { name: 'África', count: '2.186', pct: '23%', color: '#2D79D1', coords: [15, 10] },
    { name: 'Américas', count: '2.276', pct: '24%', color: '#2D79D1', coords: [-60, -10] },
    { name: 'Ásia', count: '1.408', pct: '14%', color: '#99C0EB', coords: [90, 30] },
    { name: 'Oceânia', count: '465', pct: '5%', color: '#99C0EB', coords: [135, -25] },
  ];

  const mapFeatures = useMemo(() => {
    const width = 480;
    const height = 240;
    const projection = geoNaturalEarth1()
      .scale(78)
      .translate([width / 2 - 40, height / 2 + 10]);
    const pathGen = geoPath().projection(projection);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countriesFeature = feature(worldData as any, (worldData as any).objects.countries);

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

        // Densidade de eventos por país (cores da legenda de continentes):
        // Europa #0F448A | África/Américas #2D79D1 | Ásia #5F9DE0 | Oceânia #99C0EB
        let fill = isDark ? '#334155' : '#F1F5F9';
        if (['Portugal', 'Spain', 'France', 'Germany', 'United Kingdom', 'Italy', 'Netherlands', 'Belgium', 'Switzerland'].includes(name)) {
          fill = '#0F448A';
        } else if (['Brazil', 'Mozambique', 'Angola', 'United States of America', 'Mexico', 'Colombia', 'Kenya', 'South Africa', 'Nigeria', 'Cabo Verde', 'Cape Verde'].includes(name)) {
          fill = '#2D79D1';
        } else if (['China', 'India', 'Japan', 'South Korea', 'Indonesia', 'Singapore', 'United Arab Emirates', 'Saudi Arabia', 'Turkey'].includes(name)) {
          fill = '#5F9DE0';
        } else if (['Australia', 'New Zealand', 'Canada', 'Argentina', 'Chile', 'Peru', 'Morocco', 'Egypt', 'Timor-Leste', 'Guinea-Bissau'].includes(name)) {
          fill = '#99C0EB';
        }

        return {
          key: `geom-${index}`,
          d,
          fill,
          name,
        };
      });

    // Posições projetadas dos continentes para anéis de densidade
    const continentRings = [
      { name: 'Europa', xy: projection([15, 50]), count: '3.245', pct: '34%', color: '#0F448A' },
      { name: 'África', xy: projection([20, 5]), count: '2.186', pct: '23%', color: '#2D79D1' },
      { name: 'América do Norte', xy: projection([-98, 40]), count: '1.420', pct: '15%', color: '#2D79D1' },
      { name: 'América do Sul', xy: projection([-55, -15]), count: '856', pct: '9%', color: '#2D79D1' },
      { name: 'Ásia', xy: projection([85, 35]), count: '1.408', pct: '14%', color: '#5F9DE0' },
      { name: 'Oceânia', xy: projection([134, -25]), count: '465', pct: '5%', color: '#99C0EB' },
    ];

    return { paths, continentRings };
  }, [isDark]);

  // ---------------------------------------------------------------------------
  // 4. Card 3: Evolução de Eventos (Gráfico de 3 Linhas Suaves)
  // ---------------------------------------------------------------------------
  const monthlyTimeline = [
    { month: 'Jun', total: 3.2, ativos: 1.8, participantes: 0.9 },
    { month: 'Jul', total: 4.1, ativos: 2.1, participantes: 1.1 },
    { month: 'Ago', total: 4.8, ativos: 2.5, participantes: 1.3 },
    { month: 'Set', total: 5.6, ativos: 3.1, participantes: 1.6 },
    { month: 'Out', total: 6.4, ativos: 3.6, participantes: 1.8 },
    { month: 'Nov', total: 7.2, ativos: 4.0, participantes: 2.0 },
    { month: 'Dez', total: 7.9, ativos: 4.3, participantes: 2.1 },
    { month: 'Jan', total: 8.3, ativos: 4.7, participantes: 2.3 },
    { month: 'Fev', total: 8.6, ativos: 5.1, participantes: 2.4 },
    { month: 'Mar', total: 8.9, ativos: 5.5, participantes: 2.5 },
    { month: 'Abr', total: 9.3, ativos: 5.9, participantes: 2.6 },
    { month: 'Mai', total: 9.6, ativos: 6.4, participantes: 2.8 },
  ];

  const lineChartPoints = useMemo(() => {
    const startX = 48;
    const stepX = 41.5;
    const baseY = 175;
    const maxYVal = 10;
    const heightSpan = 145;

    const tCoords = monthlyTimeline.map((d, i) => ({
      x: startX + i * stepX,
      y: baseY - (d.total / maxYVal) * heightSpan,
      ...d,
    }));

    const aCoords = monthlyTimeline.map((d, i) => ({
      x: startX + i * stepX,
      y: baseY - (d.ativos / maxYVal) * heightSpan,
      ...d,
    }));

    const pCoords = monthlyTimeline.map((d, i) => ({
      x: startX + i * stepX,
      y: baseY - (d.participantes / maxYVal) * heightSpan,
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
      tCoords,
      aCoords,
      pCoords,
      tPath: buildPath(tCoords),
      aPath: buildPath(aCoords),
      pPath: buildPath(pCoords),
    };
  }, []);

  // ---------------------------------------------------------------------------
  // 5. Linha 3 - Card 1: Próximos Eventos Globais (5 Itens com Badges de Data)
  // ---------------------------------------------------------------------------
  const proximosEventos: GlobalEventItem[] = [
    {
      id: 'pe-1',
      dayBadge: '28',
      monthBadge: 'MAI',
      title: 'Fórum Global de Comunidades 2025',
      format: 'Presencial',
      isFeatured: true,
      datesText: '28 - 30 Mai 2025',
      countdown: 'Em 4 dias',
      locationText: 'Lisboa, Portugal',
      participantsCount: '1.250 participantes',
      organizer: 'Município de Lisboa & VILA Global',
      description:
        'O maior encontro global de líderes comunitários, inovadores sociais e agentes de mudança para partilha de boas práticas e cooperação territorial.',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
      agenda: [
        { time: '09:30', topic: 'Sessão Plenária de Abertura e Alianças Globais' },
        { time: '14:00', topic: 'Painéis Temáticos: Territórios Inteligentes e Cidadania' },
        { time: '17:30', topic: 'Assembleia Aberta das Comunidades VILA' },
      ],
    },
    {
      id: 'pe-2',
      dayBadge: '02',
      monthBadge: 'JUN',
      title: 'Webinar: Cidades Sustentáveis',
      format: 'Online',
      datesText: '02 Jun 2025',
      countdown: 'Em 9 dias',
      locationText: 'Online',
      participantsCount: '850 participantes',
      organizer: 'ONU-Habitat & Rede Cidades',
      description:
        'Transição energética nas cidades, corredores verdes urbanos e governação descentralizada orientada para a neutralidade climática.',
      agenda: [
        { time: '15:00', topic: 'Apresentação do Guia Global de Descarbonização' },
        { time: '16:15', topic: 'Casos de Estudo: Curitiba, Barcelona e Maputo' },
      ],
    },
    {
      id: 'pe-3',
      dayBadge: '10',
      monthBadge: 'JUN',
      title: 'Workshop de Inovação Social',
      format: 'Presencial',
      datesText: '10 - 11 Jun 2025',
      countdown: 'Em 17 dias',
      locationText: 'Nairobi, Quénia',
      participantsCount: '320 participantes',
      organizer: 'Hub de Inovação Africano VILA',
      description:
        'Capacitação prática em design participativo, angariação comunitária de fundos e aceleração de microprojetos de impacto.',
      agenda: [
        { time: '10:00', topic: 'Mapeamento de Necessidades Territoriais' },
        { time: '14:30', topic: 'Hackathon Cívico: Soluções Comunitárias' },
      ],
    },
    {
      id: 'pe-4',
      dayBadge: '18',
      monthBadge: 'JUN',
      title: 'Cúpula de Juventude VILA',
      format: 'Híbrido',
      datesText: '18 - 20 Jun 2025',
      countdown: 'Em 25 dias',
      locationText: 'São Paulo, Brasil',
      participantsCount: '2.100 participantes',
      organizer: 'VILA Global Juventude',
      description:
        'Encontro intergeracional de jovens ativistas, líderes climáticos e criadores de tecnologia cívica de toda a lusofonia e mundo.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      agenda: [
        { time: '10:00', topic: 'Manifesto Jovem das Comunidades do Século XXI' },
        { time: '15:00', topic: 'Mesas Redondas e Laboratórios Criativos' },
      ],
    },
    {
      id: 'pe-5',
      dayBadge: '25',
      monthBadge: 'JUN',
      title: 'Feira Global de Projetos',
      format: 'Online',
      datesText: '25 - 27 Jun 2025',
      countdown: 'Em 32 dias',
      locationText: 'Online',
      participantsCount: '1.800 participantes',
      organizer: 'Rede Global de Parceiros VILA',
      description:
        'Exposição virtual e sessões de pitch para os mais destacados projetos financiados por orçamentos participativos e fundos cívicos.',
      agenda: [
        { time: '11:00', topic: 'Mostra de Projetos de Impacto Local' },
        { time: '16:00', topic: 'Sessões de Conexão com Financiadores Globais' },
      ],
    },
  ];

  // ---------------------------------------------------------------------------
  // 6. Linha 3 - Card 2: Calendário Global (Maio 2025 com Event Dots)
  // ---------------------------------------------------------------------------
  // Matriz de 5 semanas (Seg a Dom)
  // Seg: 28 Abr, Ter: 29 Abr, Qua: 30 Abr, Qui: 1 Mai, Sex: 2 Mai, Sáb: 3 Mai, Dom: 4 Mai...
  const calendarDays = [
    // Semana 1
    { day: 28, isCurrentMonth: false, dots: [] },
    { day: 29, isCurrentMonth: false, dots: [] },
    { day: 30, isCurrentMonth: false, dots: [] },
    { day: 1, isCurrentMonth: true, dots: ['online'] },
    { day: 2, isCurrentMonth: true, dots: ['presencial'] },
    { day: 3, isCurrentMonth: true, dots: ['hibrido'] },
    { day: 4, isCurrentMonth: true, dots: [] },
    // Semana 2
    { day: 5, isCurrentMonth: true, dots: [] },
    { day: 6, isCurrentMonth: true, dots: [] },
    { day: 7, isCurrentMonth: true, dots: ['online'] },
    { day: 8, isCurrentMonth: true, dots: ['presencial', 'online'] },
    { day: 9, isCurrentMonth: true, dots: ['online'] },
    { day: 10, isCurrentMonth: true, dots: ['online'] },
    { day: 11, isCurrentMonth: true, dots: [] },
    // Semana 3
    { day: 12, isCurrentMonth: true, dots: [] },
    { day: 13, isCurrentMonth: true, dots: ['hibrido'] },
    { day: 14, isCurrentMonth: true, dots: ['presencial', 'online'] },
    { day: 15, isCurrentMonth: true, dots: [] },
    { day: 16, isCurrentMonth: true, dots: ['hibrido'] },
    { day: 17, isCurrentMonth: true, dots: ['online'] },
    { day: 18, isCurrentMonth: true, dots: ['hibrido'] },
    // Semana 4
    { day: 19, isCurrentMonth: true, dots: ['presencial', 'hibrido'] },
    { day: 20, isCurrentMonth: true, dots: ['hibrido', 'online'] },
    { day: 21, isCurrentMonth: true, dots: ['online', 'hibrido'] },
    { day: 22, isCurrentMonth: true, dots: ['hibrido'] },
    { day: 23, isCurrentMonth: true, dots: ['online'] },
    { day: 24, isCurrentMonth: true, dots: [], isSelected: true },
    { day: 25, isCurrentMonth: true, dots: [] },
    // Semana 5
    { day: 26, isCurrentMonth: true, dots: ['hibrido'] },
    { day: 27, isCurrentMonth: true, dots: ['hibrido', 'online'] },
    { day: 28, isCurrentMonth: true, dots: ['presencial', 'online'] },
    { day: 29, isCurrentMonth: true, dots: ['hibrido'] },
    { day: 30, isCurrentMonth: true, dots: ['presencial'] },
    { day: 31, isCurrentMonth: true, dots: ['online', 'hibrido'] },
    { day: 1, isCurrentMonth: false, dots: [] },
  ];

  // ---------------------------------------------------------------------------
  // 7. Linha 3 - Card 3: Eventos em Destaque
  // ---------------------------------------------------------------------------
  const destaquePrincipal = {
    id: 'hero-destaque',
    badge: 'EM DESTAQUE',
    title: 'Fórum Global de Comunidades 2025',
    subtitle: 'O maior encontro global de líderes comunitários, inovadores sociais e agentes de mudança.',
    date: '28 - 30 Mai 2025',
    location: 'Lisboa, Portugal',
    participants: '1.250 participantes',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
  };

  const miniDestaques = [
    {
      id: 'mini-1',
      title: 'Cúpula de Juventude VILA',
      details: '18 - 20 Jun 2025 • São Paulo, Brasil',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'mini-2',
      title: 'Cidades Inteligentes e Sustentáveis',
      details: '05 - 07 Jul 2025 • Barcelona, Espanha',
      imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=300&q=80',
    },
  ];

  // ---------------------------------------------------------------------------
  // 8. Linha 4 - Card 1: Eventos por Formato (Barras Horizontais)
  // ---------------------------------------------------------------------------
  const formatosData = [
    { name: 'Presencial', count: '4.125', pct: 43, color: '#1455AC', bgClass: 'bg-blue-600' },
    { name: 'Online', count: '2.145', pct: 22, color: '#2D79D1', bgClass: 'bg-blue-500' },
    { name: 'Híbrido', count: '1.876', pct: 20, color: '#5F9DE0', bgClass: 'bg-blue-400' },
    { name: 'Sob Demanda', count: '1.434', pct: 15, color: '#99C0EB', bgClass: 'bg-blue-300' },
  ];

  // ---------------------------------------------------------------------------
  // 9. Linha 4 - Card 2: Participação por Faixa (Donut Chart & Legenda)
  // ---------------------------------------------------------------------------
  const faixasData = [
    { label: '0 - 100 participantes', percentage: 26, count: '2.491', color: '#2D79D1', dotClass: 'bg-blue-500' },
    { label: '101 - 500 participantes', percentage: 34, count: '3.257', color: '#1455AC', dotClass: 'bg-blue-600' },
    { label: '501 - 1.000 participantes', percentage: 18, count: '1.725', color: '#F59E0B', dotClass: 'bg-amber-500' },
    { label: '1.001 - 5.000 participantes', percentage: 14, count: '1.341', color: '#10B981', dotClass: 'bg-emerald-500' },
    { label: '+ 5.000 participantes', percentage: 8, count: '766', color: '#F58300', dotClass: 'bg-blue-500' },
  ];

  // ---------------------------------------------------------------------------
  // 10. Linha 4 - Card 3: Principais Organizadores
  // ---------------------------------------------------------------------------
  const principaisOrganizadores = [
    { rank: 1, name: 'Município de Lisboa', count: '156 eventos' },
    { rank: 2, name: 'VILA Global', count: '142 eventos' },
    { rank: 3, name: 'Universidade de Coimbra', count: '98 eventos' },
    { rank: 4, name: 'ONU-Habitat', count: '87 eventos' },
    { rank: 5, name: 'Banco Mundial', count: '65 eventos' },
  ];

  // ---------------------------------------------------------------------------
  // 11. Linha 4 - Card 4: Atividade Recente
  // ---------------------------------------------------------------------------
  const atividadesRecentes = [
    {
      id: 'ar-1',
      title: 'Novo evento criado: ',
      highlight: '"Fórum de Inovação Urbana"',
      subtitle: 'por João Silva • Município de Lisboa',
      time: 'há 10 min',
      icon: <Calendar className="w-4 h-4 text-blue-600" />,
      iconBg: 'bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-800/40',
    },
    {
      id: 'ar-2',
      title: 'Evento atualizado: ',
      highlight: '"Cúpula de Juventude VILA"',
      subtitle: 'por Maria Costa • VILA Global',
      time: 'há 25 min',
      icon: <Calendar className="w-4 h-4 text-[#1455AC]" />,
      iconBg: 'bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-800/40',
    },
    {
      id: 'ar-3',
      title: 'Inscrições abertas: ',
      highlight: '"Workshop de Inovação Social"',
      subtitle: '245 novas inscrições',
      time: 'há 1 h',
      icon: <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      iconBg: 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-800/40',
    },
    {
      id: 'ar-4',
      title: 'Evento concluído: ',
      highlight: '"Webinar sobre ODS"',
      subtitle: '1.200 participaram',
      time: 'há 2 h',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      iconBg: 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-800/40',
    },
  ];

  // ---------------------------------------------------------------------------
  // Helpers de Formato e Badges
  // ---------------------------------------------------------------------------
  const renderFormatBadge = (format: string) => {
    switch (format) {
      case 'Presencial':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80">
            Presencial
          </span>
        );
      case 'Online':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-700 border border-blue-200/80">
            Online
          </span>
        );
      case 'Híbrido':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-700 border border-blue-200/80">
            Híbrido
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
            {format}
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-3.5 sm:px-5 lg:px-6 py-4 sm:py-6 space-y-5 lg:space-y-6">
      {/* Toast Feedback */}
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
            <Calendar className="w-6 h-6" strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-slate-50 font-sans tracking-tight">
              Eventos Globais
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal mt-0.5 max-w-2xl leading-relaxed">
              Descubra, organize e acompanhe eventos que conectam pessoas, comunidades e territórios em todo o mundo.
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

            {/* Botão Filtros (Sólido Roxo #1455AC) */}
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
          LINHA 1: 6 CARDS KPI (Grid 6 Colunas)
          ===================================================================== */}
      <ExpandableKpiHeader
        cards={eventosKpiCards}
        visibleCount={4}
        xlCols={6}
        onOpenDetail={(label) => showToast(`A abrir detalhes: ${label}`)}
      />

      {/* =====================================================================
          LINHA 2: 3 CARDS ANALÍTICOS (Grid 3 Colunas)
          1. Eventos por Tipo
          2. Eventos por Continente
          3. Evolução de Eventos
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* CARD 1: Eventos por Tipo (Donut Chart & Estatísticas) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div className="flex-1">
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Eventos por Tipo
            </h2>

            <div className="mt-4 flex items-center justify-between gap-4">
              {/* Donut Chart SVG */}
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Circunferência de r=36 é aprox 226.19 */}
                  {/* 1. Conferências: 28% -> dash 63.3 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#1455AC"
                    strokeWidth="14"
                    strokeDasharray="63.3 162.9"
                    strokeDashoffset="0"
                    className="transition-all duration-300 hover:opacity-85 cursor-pointer"
                    onMouseEnter={() => setHoveredTypeSegment('Conferências')}
                    onMouseLeave={() => setHoveredTypeSegment(null)}
                  />
                  {/* 2. Webinars: 22% -> dash 49.7, offset -63.3 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#5F9DE0"
                    strokeWidth="14"
                    strokeDasharray="49.7 176.5"
                    strokeDashoffset="-63.3"
                    className="transition-all duration-300 hover:opacity-85 cursor-pointer"
                    onMouseEnter={() => setHoveredTypeSegment('Webinars')}
                    onMouseLeave={() => setHoveredTypeSegment(null)}
                  />
                  {/* 3. Workshops: 18% -> dash 40.7, offset -113.0 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray="40.7 185.5"
                    strokeDashoffset="-113.0"
                    className="transition-all duration-300 hover:opacity-85 cursor-pointer"
                    onMouseEnter={() => setHoveredTypeSegment('Workshops')}
                    onMouseLeave={() => setHoveredTypeSegment(null)}
                  />
                  {/* 4. Fóruns: 14% -> dash 31.6, offset -153.7 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#F58300"
                    strokeWidth="14"
                    strokeDasharray="31.6 194.6"
                    strokeDashoffset="-153.7"
                    className="transition-all duration-300 hover:opacity-85 cursor-pointer"
                    onMouseEnter={() => setHoveredTypeSegment('Fóruns')}
                    onMouseLeave={() => setHoveredTypeSegment(null)}
                  />
                  {/* 5. Feiras: 10% -> dash 22.6, offset -185.3 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="22.6 203.6"
                    strokeDashoffset="-185.3"
                    className="transition-all duration-300 hover:opacity-85 cursor-pointer"
                    onMouseEnter={() => setHoveredTypeSegment('Feiras')}
                    onMouseLeave={() => setHoveredTypeSegment(null)}
                  />
                  {/* 6. Outros: 8% -> dash 18.2, offset -207.9 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#5F9DE0"
                    strokeWidth="14"
                    strokeDasharray="18.2 208.0"
                    strokeDashoffset="-207.9"
                    className="transition-all duration-300 hover:opacity-85 cursor-pointer"
                    onMouseEnter={() => setHoveredTypeSegment('Outros')}
                    onMouseLeave={() => setHoveredTypeSegment(null)}
                  />
                </svg>

                {/* Centro do Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-black text-[#0F172A] dark:text-slate-50 font-sans">
                    9.580
                  </span>
                  <span className="text-[9.5px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Total
                  </span>
                </div>
              </div>

              {/* Lista de Legenda e Percentagens */}
              <div className="flex-1 space-y-1.5">
                {tiposData.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 px-1.5 py-0.5 rounded-md transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
                    </div>
                    <span className="font-bold text-[#0F172A] dark:text-slate-50">
                      {item.percentage}% <span className="text-slate-400 dark:text-slate-500 font-normal">({item.count})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rodapé: Ver todos os tipos */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A filtrar por todos os tipos de eventos')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos os tipos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 2: Eventos por Continente (Mapa com Pontos de Densidade) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div className="flex-1">
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Eventos por Continente
            </h2>

            <div className="mt-2 flex flex-col sm:flex-row items-center gap-3">
              {/* Mapa D3 com Anéis Radiantes de Densidade */}
              <div className="relative flex-1 w-full h-[185px] flex items-center justify-center">
                <svg viewBox="0 0 480 240" className="w-full h-full object-contain select-none">
                  {/* Países em Fundo Claro Suave */}
                  <g>
                    {mapFeatures.paths.map((p) => {
                      if (!p) return null;
                      return (
                        <path
                          key={p.key}
                          d={p.d}
                          fill={p.fill}
                          stroke={isDark ? '#0F172A' : '#FFFFFF'}
                          strokeWidth={0.5}
                          className="transition-colors hover:opacity-85"
                        />
                      );
                    })}
                  </g>

                  {/* Círculos e Ondas de Densidade nos Continentes */}
                  {mapFeatures.continentRings.map((c) => {
                    if (!c.xy) return null;
                    const [cx, cy] = c.xy;
                    return (
                      <g
                        key={c.name}
                        className="cursor-pointer group"
                        onMouseEnter={() => setHoveredContinent(c.name)}
                        onMouseLeave={() => setHoveredContinent(null)}
                        onClick={() => showToast(`Continente: ${c.name} (${c.count} eventos)`)}
                      >
                        {/* Onda externa suave */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r="14"
                          fill="#1455AC"
                          opacity="0.15"
                          className="animate-pulse"
                        />
                        {/* Círculo intermediário */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r="8"
                          fill="#2D79D1"
                          opacity="0.4"
                        />
                        {/* Núcleo sólido */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r="4"
                          fill="#0F448A"
                          stroke="#FFFFFF"
                          strokeWidth="1"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Tooltip Dinâmico do Continente */}
                {hoveredContinent && (
                  <div className="absolute top-1 left-2 bg-slate-900/90 text-white px-2.5 py-1.5 rounded-lg text-[10.5px] pointer-events-none shadow-xl z-10 border border-slate-700 animate-in fade-in duration-100">
                    <p className="font-bold text-slate-100">{hoveredContinent}</p>
                    <p className="text-blue-300 font-semibold">Alta densidade de eventos</p>
                  </div>
                )}
              </div>

              {/* Legenda Vertical à Direita */}
              <div className="w-full sm:w-36 space-y-2 shrink-0 self-center">
                {continentesData.map((cont) => (
                  <div
                    key={cont.name}
                    className="flex items-center justify-between text-xs font-medium text-[#0B2C58]"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-[3px] shrink-0"
                        style={{ backgroundColor: cont.color }}
                      />
                      <span>{cont.name}</span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                      {cont.count} <span className="text-slate-400 dark:text-slate-500 font-normal">({cont.pct})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rodapé: Ver mapa interativo */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setIsMapModalOpen(true)}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver mapa interativo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 3: Evolução de Eventos (Gráfico de 3 Linhas) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans">
                Evolução de Eventos
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

            {/* Legenda das 3 Linhas */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1455AC]" />
                <span>Total de Eventos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span>Eventos Ativos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D79D1]" />
                <span>Participantes</span>
              </div>
            </div>

            {/* Gráfico SVG de 3 Linhas */}
            <div className="relative w-full h-[185px] mt-2">
              <svg viewBox="0 0 520 200" className="w-full h-full overflow-visible">
                {/* Gradientes de área */}
                <defs>
                  <linearGradient id="eg-area-total" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1455AC" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="#1455AC" stopOpacity="0.01" />
                  </linearGradient>
                  <linearGradient id="eg-area-ativos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.01" />
                  </linearGradient>
                  <linearGradient id="eg-area-part" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2D79D1" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#2D79D1" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                {/* Linhas de Grade Horizontais */}
                {[
                  { val: '10K', y: 30 },
                  { val: '8K', y: 59 },
                  { val: '6K', y: 88 },
                  { val: '4K', y: 117 },
                  { val: '2K', y: 146 },
                  { val: '0', y: 175 },
                ].map((g) => (
                  <g key={g.val}>
                    <line
                      x1="45"
                      y1={g.y}
                      x2="505"
                      y2={g.y}
                      stroke="#F1F5F9"
                      strokeWidth="1"
                      strokeDasharray={g.val === '0' ? undefined : '3 3'}
                    />
                    <text
                      x="38"
                      y={g.y + 3}
                      textAnchor="end"
                      fontSize="9.5"
                      fill="#94A3B8"
                      fontWeight="500"
                    >
                      {g.val}
                    </text>
                  </g>
                ))}

                {/* Áreas preenchidas */}
                <path d={`${lineChartPoints.tPath} L ${lineChartPoints.tCoords[lineChartPoints.tCoords.length - 1].x},175 L ${lineChartPoints.tCoords[0].x},175 Z`} fill="url(#eg-area-total)" />
                <path d={`${lineChartPoints.aPath} L ${lineChartPoints.aCoords[lineChartPoints.aCoords.length - 1].x},175 L ${lineChartPoints.aCoords[0].x},175 Z`} fill="url(#eg-area-ativos)" />
                <path d={`${lineChartPoints.pPath} L ${lineChartPoints.pCoords[lineChartPoints.pCoords.length - 1].x},175 L ${lineChartPoints.pCoords[0].x},175 Z`} fill="url(#eg-area-part)" />

                {/* Curva 1: Total de Eventos (Azul #1455AC) */}
                <path
                  d={lineChartPoints.tPath}
                  fill="none"
                  stroke="#1455AC"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Curva 2: Eventos Ativos (Verde #10B981) */}
                <path
                  d={lineChartPoints.aPath}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Curva 3: Participantes (Azul #2D79D1) */}
                <path
                  d={lineChartPoints.pPath}
                  fill="none"
                  stroke="#2D79D1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Pontos Interativos com Marcadores */}
                {lineChartPoints.tCoords.map((pt, i) => (
                  <g key={`t-pt-${i}`}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredLineMonth === i ? 5 : 3.5}
                      fill="#1455AC"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredLineMonth(i)}
                      onMouseLeave={() => setHoveredLineMonth(null)}
                    />
                  </g>
                ))}

                {lineChartPoints.aCoords.map((pt, i) => (
                  <g key={`a-pt-${i}`}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredLineMonth === i ? 5 : 3.5}
                      fill="#10B981"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredLineMonth(i)}
                      onMouseLeave={() => setHoveredLineMonth(null)}
                    />
                  </g>
                ))}

                {lineChartPoints.pCoords.map((pt, i) => (
                  <g key={`p-pt-${i}`}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredLineMonth === i ? 5 : 3.5}
                      fill="#2D79D1"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredLineMonth(i)}
                      onMouseLeave={() => setHoveredLineMonth(null)}
                    />
                    {/* Rótulo do Eixo X */}
                    <text
                      x={pt.x}
                      y="194"
                      textAnchor="middle"
                      fontSize="10"
                      fill={hoveredLineMonth === i ? '#0F172A' : '#64748B'}
                      fontWeight={hoveredLineMonth === i ? '700' : '500'}
                    >
                      {pt.month}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Tooltip Dinâmico do Gráfico */}
              {hoveredLineMonth !== null && (
                <div
                  className="absolute bg-slate-900/95 text-white px-2.5 py-1.5 rounded-lg text-[10px] pointer-events-none shadow-xl border border-slate-700 z-10"
                  style={{
                    left: `${(lineChartPoints.tCoords[hoveredLineMonth].x / 520) * 100}%`,
                    top: '15px',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <p className="font-bold text-slate-200">
                    {monthlyTimeline[hoveredLineMonth].month} 2025
                  </p>
                  <p className="text-blue-300">
                    Total: {monthlyTimeline[hoveredLineMonth].total}K
                  </p>
                  <p className="text-emerald-300">
                    Ativos: {monthlyTimeline[hoveredLineMonth].ativos}K
                  </p>
                  <p className="text-blue-300">
                    Participantes: {monthlyTimeline[hoveredLineMonth].participantes}M
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Rodapé: Ver Relatório Completo */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateToTab('relatorios-dados')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver relatório completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          LINHA 3: 3 CARDS OPERACIONAIS (Grid 3 Colunas)
          1. Próximos Eventos Globais
          2. Calendário Global
          3. Eventos em Destaque
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* CARD 1: Próximos Eventos Globais */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div className="flex-1">
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Próximos Eventos Globais
            </h2>

            <div className="mt-3 divide-y divide-slate-200/70">
              {proximosEventos.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEvent(ev)}
                  className="py-3 flex items-start gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/60 p-2 rounded-xl cursor-pointer transition-all group"
                >
                  {/* Badge Quadrado com Data (Dia + Mês) */}
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-800/40 flex flex-col items-center justify-center shrink-0 group-hover:bg-[#1455AC] group-hover:text-white transition-colors">
                    <span className="text-sm font-black text-[#1455AC] group-hover:text-white leading-none font-sans">
                      {ev.dayBadge}
                    </span>
                    <span className="text-[9px] font-bold text-blue-600 group-hover:text-blue-200 uppercase tracking-wider mt-0.5">
                      {ev.monthBadge}
                    </span>
                  </div>

                  {/* Conteúdo Central e Metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-xs sm:text-[13px] font-bold text-[#0F172A] dark:text-slate-50 group-hover:text-[#1455AC] truncate transition-colors">
                        {ev.title}
                      </h3>
                      {renderFormatBadge(ev.format)}
                      {ev.isFeatured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-700 border border-blue-200/80">
                          Em destaque
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{ev.locationText} • {ev.participantsCount}</span>
                      <div className="text-right shrink-0 ml-2">
                        <p className="font-semibold text-slate-700 dark:text-slate-300">{ev.datesText}</p>
                        <p className="text-slate-400 dark:text-slate-500 text-[10.5px]">{ev.countdown}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé: Ver todos os eventos */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A exibir todos os eventos')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos os eventos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 2: Calendário Global */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div>
            {/* Header do Calendário: Navegação de Mês */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans">
                Calendário Global
              </h2>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCalendarMonth('Abril 2025')}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-1">
                  {calendarMonth}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setCalendarMonth('Maio 2025');
                    setSelectedCalendarDay(24);
                  }}
                  className="px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  Hoje
                </button>
                <button
                  type="button"
                  onClick={() => setCalendarMonth('Junho 2025')}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Grelha dos Dias da Semana */}
            <div className="grid grid-cols-7 gap-1 mt-4 text-center">
              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((w) => (
                <div key={w} className="text-[11px] font-bold text-slate-400 dark:text-slate-500 pb-1">
                  {w}
                </div>
              ))}

              {/* Dias do Mês */}
              {calendarDays.map((cell, idx) => {
                const isSelected = cell.day === selectedCalendarDay && cell.isCurrentMonth;
                return (
                  <button
                    key={`cal-${idx}`}
                    type="button"
                    onClick={() => {
                      if (cell.isCurrentMonth) setSelectedCalendarDay(cell.day);
                    }}
                    className={`h-9 rounded-xl flex flex-col items-center justify-center relative cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#0F172A] text-white shadow-xs font-bold'
                        : cell.isCurrentMonth
                        ? 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 font-medium'
                        : 'text-slate-300 pointer-events-none'
                    }`}
                  >
                    <span className="text-xs leading-none">{cell.day}</span>
                    {/* Event Dots */}
                    {cell.dots && cell.dots.length > 0 && (
                      <div className="flex items-center gap-0.5 mt-1">
                        {cell.dots.map((dot, dIdx) => (
                          <span
                            key={`dot-${dIdx}`}
                            className={`w-1 h-1 rounded-full ${
                              dot === 'presencial'
                                ? 'bg-[#2D79D1]'
                                : dot === 'online'
                                ? 'bg-[#10B981]'
                                : 'bg-[#F59E0B]'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legenda do Calendário */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-700 flex items-center justify-center gap-4 text-[11px] font-medium text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2D79D1]" />
                <span>Eventos Presenciais</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Eventos Online</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span>Eventos Híbridos</span>
              </div>
            </div>
          </div>

          {/* Rodapé: Ver calendário completo */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A abrir vista completa do calendário')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver calendário completo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 3: Eventos em Destaque */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div className="flex-1">
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Eventos em Destaque
            </h2>

            {/* Card Hero: Fórum Global de Comunidades 2025 */}
            <div className="mt-3 rounded-2xl border border-slate-200/90 dark:border-slate-700 overflow-hidden shadow-2xs hover:border-blue-200 transition-all group">
              {/* Imagem com Overlay e Badge */}
              <div className="relative h-28 w-full bg-slate-900 overflow-hidden">
                <img
                  src={destaquePrincipal.imageUrl}
                  alt={destaquePrincipal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-[#1455AC] text-white tracking-wider shadow-sm">
                    {destaquePrincipal.badge}
                  </span>
                </div>
              </div>

              {/* Conteúdo do Hero */}
              <div className="p-3.5 space-y-2">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50 group-hover:text-[#1455AC] transition-colors leading-tight">
                  {destaquePrincipal.title}
                </h3>
                <p className="text-[11.5px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {destaquePrincipal.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                  <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{destaquePrincipal.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{destaquePrincipal.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                    <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{destaquePrincipal.participants}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => showToast('A abrir detalhes do evento principal')}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-bold text-[#0F172A] dark:text-slate-50 cursor-pointer transition-colors"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            </div>

            {/* Lista dos 2 Mini Cards de Destaque */}
            <div className="mt-3 space-y-2">
              {miniDestaques.map((mini) => (
                <div
                  key={mini.id}
                  onClick={() => showToast(`A abrir: ${mini.title}`)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer transition-colors group"
                >
                  <img
                    src={mini.imageUrl}
                    alt={mini.title}
                    className="w-12 h-10 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 group-hover:text-[#1455AC] truncate transition-colors">
                      {mini.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                      {mini.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé: Ver todos os destaques */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A exibir todos os eventos em destaque')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos os destaques</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          LINHA 4: 4 CARDS OPERACIONAIS & MÉTRICAS (Grid 4 Colunas)
          1. Eventos por Formato
          2. Participação por Faixa
          3. Principais Organizadores
          4. Atividade Recente
          ===================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* CARD 1: Eventos por Formato */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div className="flex-1">
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Eventos por Formato
            </h2>

            <div className="mt-4 space-y-3.5">
              {formatosData.map((f) => (
                <div key={f.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                    <span>{f.name}</span>
                    <span className="font-bold text-[#0F172A] dark:text-slate-50">
                      {f.count} <span className="text-slate-400 dark:text-slate-500 font-normal">({f.pct}%)</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${f.bgClass} transition-all duration-500`}
                      style={{ width: `${f.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé: Ver análise completa */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A carregar análise completa por formato')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver análise completa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 2: Participação por Faixa */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div className="flex-1">
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Participação por Faixa
            </h2>

            <div className="mt-4 flex flex-col items-center gap-3">
              {/* Donut Chart SVG */}
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Circunferência de r=36 é aprox 226.19 */}
                  {/* 1. 0 - 100: 26% -> dash 58.8 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#2D79D1"
                    strokeWidth="14"
                    strokeDasharray="58.8 167.4"
                    strokeDashoffset="0"
                    className="hover:opacity-85 cursor-pointer"
                  />
                  {/* 2. 101 - 500: 34% -> dash 76.9, offset -58.8 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#1455AC"
                    strokeWidth="14"
                    strokeDasharray="76.9 149.3"
                    strokeDashoffset="-58.8"
                    className="hover:opacity-85 cursor-pointer"
                  />
                  {/* 3. 501 - 1000: 18% -> dash 40.7, offset -135.7 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeDasharray="40.7 185.5"
                    strokeDashoffset="-135.7"
                    className="hover:opacity-85 cursor-pointer"
                  />
                  {/* 4. 1001 - 5000: 14% -> dash 31.7, offset -176.4 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="31.7 194.5"
                    strokeDashoffset="-176.4"
                    className="hover:opacity-85 cursor-pointer"
                  />
                  {/* 5. + 5000: 8% -> dash 18.1, offset -208.1 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#F58300"
                    strokeWidth="14"
                    strokeDasharray="18.1 208.1"
                    strokeDashoffset="-208.1"
                    className="hover:opacity-85 cursor-pointer"
                  />
                </svg>
              </div>

              {/* Legenda dos Intervalos */}
              <div className="w-full space-y-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                {faixasData.map((fx) => (
                  <div key={fx.label} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`w-2 h-2 rounded-full ${fx.dotClass} shrink-0`} />
                      <span className="truncate">{fx.label}</span>
                    </div>
                    <span className="font-bold text-[#0F172A] dark:text-slate-50 shrink-0">
                      {fx.percentage}% <span className="font-normal text-slate-400 dark:text-slate-500 text-[10px]">({fx.count})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rodapé: Ver todos os dados */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A carregar dados completos de participação')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos os dados</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 3: Principais Organizadores */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div className="flex-1">
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Principais Organizadores
            </h2>

            <div className="mt-3 space-y-2.5">
              {principaisOrganizadores.map((org) => (
                <div
                  key={org.rank}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-700 border border-blue-200/80 flex items-center justify-center text-xs font-black">
                      {org.rank}
                    </span>
                    <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50">
                      {org.name}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {org.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé: Ver todos os organizadores */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A listar todos os organizadores')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos os organizadores</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CARD 4: Atividade Recente */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all rounded-2xl p-4 sm:p-5 flex flex-col">
          <div className="flex-1">
            <h2 className="text-sm sm:text-[15px] font-bold text-[#0F172A] dark:text-slate-50 font-sans">
              Atividade Recente
            </h2>

            <div className="mt-3 space-y-3">
              {atividadesRecentes.map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${act.iconBg}`}>
                    {act.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                      <span className="font-medium text-slate-600 dark:text-slate-400">{act.title}</span>
                      <span className="font-bold text-[#0F172A] dark:text-slate-50">{act.highlight}</span>
                    </p>
                    <div className="mt-0.5 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                      <span className="truncate">{act.subtitle}</span>
                      <span className="shrink-0 ml-1 font-medium">{act.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rodapé: Ver toda a atividade */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700 mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A carregar histórico de atividades')}
              className="text-xs font-semibold text-[#1455AC] hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Ver toda a atividade</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODAL 1: DETALHE DO EVENTO SELECIONADO
          ===================================================================== */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center font-black">
                  {selectedEvent.dayBadge}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedEvent.organizer}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedEvent.image && (
              <div className="h-44 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <p className="text-[11px] text-slate-400 dark:text-slate-500">Datas</p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">{selectedEvent.datesText}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <p className="text-[11px] text-slate-400 dark:text-slate-500">Localização</p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">{selectedEvent.locationText}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <p className="text-[11px] text-slate-400 dark:text-slate-500">Participantes</p>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedEvent.participantsCount}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Sobre o Evento
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                {selectedEvent.description}
              </p>
            </div>

            {selectedEvent.agenda && (
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Destaques da Agenda
                </h4>
                <div className="space-y-1.5">
                  {selectedEvent.agenda.map((ag, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                      <span className="font-bold text-blue-600 w-12 shrink-0">{ag.time}</span>
                      <span className="text-slate-700 dark:text-slate-300">{ag.topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200/70 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Inscrição confirmada em: ${selectedEvent.title}`);
                  setSelectedEvent(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#1455AC] hover:bg-[#0F448A] text-white text-xs font-bold shadow-xs transition-colors"
              >
                Inscrever-se no Evento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: SELETOR DE INTERVALO DE DATAS
          ===================================================================== */}
      {isDateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50">Período de Análise</h3>
              <button
                type="button"
                onClick={() => setIsDateModalOpen(false)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1.5">
              {[
                '01 Mai 2024 - 24 Mai 2025',
                'Ano Completo 2024',
                'Ano 2025 (Ano Corrente)',
                'Próximo Trimestre (Jun - Ago 2025)',
                'Histórico Global (Desde a fundação)',
              ].map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => {
                    setDateRange(range);
                    setIsDateModalOpen(false);
                    showToast(`Período atualizado: ${range}`);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    dateRange === range
                      ? 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] border border-blue-200'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>{range}</span>
                  {dateRange === range && <Check className="w-4 h-4 text-[#1455AC]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: EXPORTAR DADOS
          ===================================================================== */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50">Exportar Relatório de Eventos</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Selecione o formato de ficheiro pretendido</p>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Relatório Executivo PDF', desc: 'Resumo com gráficos e estatísticas', ext: 'PDF' },
                { title: 'Tabela Completa Excel', desc: 'Dados brutos de 9.580 eventos', ext: 'XLSX' },
                { title: 'Ficheiro Estruturado CSV', desc: 'Compatível com GIS e BI', ext: 'CSV' },
                { title: 'Formato de Integração JSON', desc: 'Para interoperabilidade e APIs', ext: 'JSON' },
              ].map((exp) => (
                <button
                  key={exp.ext}
                  type="button"
                  onClick={() => {
                    showToast(`A descarregar ficheiro ${exp.ext}...`);
                    setIsExportModalOpen(false);
                  }}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:bg-blue-50/50 text-left transition-all group cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#0F172A] dark:text-slate-50 group-hover:text-[#1455AC] block">
                    {exp.title}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-1">
                    {exp.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: FILTROS AVANÇADOS
          ===================================================================== */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50">Filtros de Eventos</h3>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Formato</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Todos', 'Presencial', 'Online', 'Híbrido'].map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => showToast(`Filtro formato: ${fmt}`)}
                      className="px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Continente</label>
                <select className="w-full text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5">
                  <option value="">Todos os Continentes</option>
                  <option value="europa">Europa (3.245 eventos)</option>
                  <option value="africa">África (2.186 eventos)</option>
                  <option value="americas">Américas (2.276 eventos)</option>
                  <option value="asia">Ásia (1.408 eventos)</option>
                  <option value="oceania">Oceânia (465 eventos)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200/70 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Limpar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFilterModalOpen(false);
                    showToast('Filtros aplicados com sucesso!');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1455AC] text-white text-xs font-bold shadow-xs hover:bg-[#0F448A]"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 5: MAPA MUNDIAL INTERATIVO AMPLIADO
          ===================================================================== */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50">Mapa Interativo de Eventos Globais</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Distribuição geográfica em 156 países parceiros</p>
              </div>
              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-[380px] bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 flex items-center justify-center relative">
              <svg viewBox="0 0 480 240" className="w-full h-full object-contain">
                <g>
                  {mapFeatures.paths.map((p) => {
                    if (!p) return null;
                    return (
                      <path
                        key={p.key}
                        d={p.d}
                        fill={isDark ? '#475569' : '#CBD5E1'}
                        stroke={isDark ? '#0F172A' : '#FFFFFF'}
                        strokeWidth={0.5}
                      />
                    );
                  })}
                </g>
                {mapFeatures.continentRings.map((c) => {
                  if (!c.xy) return null;
                  const [cx, cy] = c.xy;
                  return (
                    <g key={`modal-c-${c.name}`}>
                      <circle cx={cx} cy={cy} r="16" fill="#1455AC" opacity="0.2" className="animate-pulse" />
                      <circle cx={cx} cy={cy} r="8" fill="#2D79D1" opacity="0.6" />
                      <circle cx={cx} cy={cy} r="4" fill="#0F448A" stroke="#FFFFFF" strokeWidth="1" />
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              {continentesData.map((c) => (
                <div key={`modal-kpi-${c.name}`} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 block">{c.name}</span>
                  <span className="text-sm font-bold text-[#0F172A] dark:text-slate-50 block mt-0.5">{c.count}</span>
                  <span className="text-[10px] text-blue-600 font-semibold">{c.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
