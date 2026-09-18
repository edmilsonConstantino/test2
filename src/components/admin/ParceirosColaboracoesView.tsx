import React, { useState, useMemo } from 'react';
import {
  Handshake,
  Download,
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
  Users,
  Building2,
  Globe2,
  Briefcase,
  Euro,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Check,
  Building,
  GraduationCap,
  Shield,
  HeartHandshake,
  Network,
  Landmark,
  Crown,
  FileText,
  Search,
  PlusCircle,
  Clock,
  Sparkles,
  Award,
  ExternalLink,
  Filter,
} from 'lucide-react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import { DemoUser } from '../../data/demoUsers';
import { BreadcrumbItem } from '../Topbar';

interface ParceirosColaboracoesViewProps {
  currentUser: DemoUser;
  onNavigateToTab: (tabId: string) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
  onOpenSupportModal?: () => void;
}

export interface StrategicPartnerItem {
  id: string;
  name: string;
  slogan: string;
  activeProjects: number;
  countries: number;
  investment: string;
  imageUrl: string;
  description: string;
  headquarters: string;
  category: string;
}

export const ParceirosColaboracoesView: React.FC<ParceirosColaboracoesViewProps> = ({
  currentUser,
  onNavigateToTab,
  onBreadcrumbChange,
}) => {
  // ---------------------------------------------------------------------------
  // Estados Locais
  // ---------------------------------------------------------------------------
  const [dateRange, setDateRange] = useState('01 Mai 2024 - 24 Mai 2025');
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isNewPartnerModalOpen, setIsNewPartnerModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedPartnerModal, setSelectedPartnerModal] = useState<StrategicPartnerItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Carrossel Parceiro do Mês
  const [partnerMonthIndex, setPartnerMonthIndex] = useState(0);

  // Gráfico de Evolução
  const [chartPeriod, setChartPeriod] = useState('Últimos 12 meses');
  const [hoveredChartMonth, setHoveredChartMonth] = useState<number | null>(null);

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
      { label: 'Parceiros e Colaborações' },
    ]);
  }, [onBreadcrumbChange, onNavigateToTab]);

  // ---------------------------------------------------------------------------
  // 1. KPIs Cards Data (6 Cards Conforme Screenshot)
  // ---------------------------------------------------------------------------
  const kpiCards = [
    {
      id: 'kpi-parceiros-ativos',
      title: 'Parceiros Ativos',
      value: '342',
      trend: '↑ 18%',
      period: 'desde o ano passado',
      icon: Users,
      iconBg: 'bg-purple-50/90',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-100/70',
    },
    {
      id: 'kpi-organizacoes-parceiras',
      title: 'Organizações Parceiras',
      value: '248',
      trend: '↑ 16%',
      period: 'desde o ano passado',
      icon: Building2,
      iconBg: 'bg-emerald-50/90',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-100/70',
    },
    {
      id: 'kpi-acordos-colaboracao',
      title: 'Acordos de Colaboração',
      value: '126',
      trend: '↑ 20%',
      period: 'desde o ano passado',
      icon: Handshake,
      iconBg: 'bg-blue-50/90',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100/70',
    },
    {
      id: 'kpi-paises-representados',
      title: 'Países Representados',
      value: '78',
      trend: '↑ 12%',
      period: 'desde o ano passado',
      icon: Globe2,
      iconBg: 'bg-emerald-50/90',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-100/70',
    },
    {
      id: 'kpi-projetos-parceria',
      title: 'Projetos em Parceria',
      value: '189',
      trend: '↑ 23%',
      period: 'desde o ano passado',
      icon: Briefcase,
      iconBg: 'bg-purple-50/90',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-100/70',
    },
    {
      id: 'kpi-investimento-mobilizado',
      title: 'Investimento Mobilizado',
      value: '€15,7M',
      trend: '↑ 32%',
      period: 'desde o ano passado',
      icon: Euro,
      iconBg: 'bg-amber-50/90',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-100/70',
    },
  ];

  // ---------------------------------------------------------------------------
  // 2. Parceiro do Mês (Featured Partner)
  // ---------------------------------------------------------------------------
  const parceirosDoMes: StrategicPartnerItem[] = [
    {
      id: 'un-habitat',
      name: 'UN-Habitat',
      slogan: 'Por um futuro urbano melhor para todos',
      activeProjects: 18,
      countries: 24,
      investment: '€2,4M',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      description:
        'O Programa das Nações Unidas para os Assentamentos Humanos promove o desenvolvimento urbano social e ambientalmente sustentável e a garantia de habitação digna para todos.',
      headquarters: 'Nairobi, Quénia',
      category: 'Organismo Internacional',
    },
    {
      id: 'unesco',
      name: 'UNESCO',
      slogan: 'Construir a paz através da educação, ciência e cultura',
      activeProjects: 14,
      countries: 20,
      investment: '€1,9M',
      imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
      description:
        'Parceria estratégica para a preservação do património material e imaterial das cidades lusófonas e redes de aprendizagem.',
      headquarters: 'Paris, França',
      category: 'Educação e Cultura',
    },
    {
      id: 'gulbenkian',
      name: 'Fundação Calouste Gulbenkian',
      slogan: 'Fomentar o conhecimento e melhorar a qualidade de vida',
      activeProjects: 11,
      countries: 6,
      investment: '€1,5M',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      description:
        'Cofinanciamento de projetos cívicos de transição justa, inovação social comunitária e capacitação juvenil.',
      headquarters: 'Lisboa, Portugal',
      category: 'Fundação Filantrópica',
    },
  ];

  const currentFeaturedPartner = parceirosDoMes[partnerMonthIndex];

  // ---------------------------------------------------------------------------
  // 3. Mapa D3 da Rede Global de Parceiros com Badges Numéricas
  // ---------------------------------------------------------------------------
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
        return {
          key: `geom-${index}`,
          d,
          name: f.properties?.name || '',
        };
      });

    // Posições com contagens exatas da imagem
    const clusterPins = [
      { name: 'América do Norte', count: 126, xy: projection([-98, 42]) },
      { name: 'América do Sul', count: 42, xy: projection([-58, -14]) },
      { name: 'Europa', count: 186, xy: projection([16, 50]) },
      { name: 'África', count: 64, xy: projection([20, 4]) },
      { name: 'Ásia / Médio Oriente', count: 34, xy: projection([78, 30]) },
      { name: 'Oceânia', count: 18, xy: projection([134, -25]) },
    ];

    return { paths, clusterPins };
  }, []);

  // ---------------------------------------------------------------------------
  // 4. Ecossistema de Parceiros (7 Tipos)
  // ---------------------------------------------------------------------------
  const ecossistemaTipos = [
    { name: 'Municípios e Governos Locais', count: 128, icon: <Building className="w-4 h-4 text-blue-600" />, iconBg: 'bg-blue-50' },
    { name: 'Universidades e Centros de Pesquisa', count: 64, icon: <GraduationCap className="w-4 h-4 text-indigo-600" />, iconBg: 'bg-indigo-50' },
    { name: 'Empresas e Indústria', count: 48, icon: <Briefcase className="w-4 h-4 text-emerald-600" />, iconBg: 'bg-emerald-50' },
    { name: 'ONGs e Organizações da Sociedade Civil', count: 56, icon: <HeartHandshake className="w-4 h-4 text-orange-600" />, iconBg: 'bg-orange-50' },
    { name: 'Organismos Internacionais', count: 28, icon: <Landmark className="w-4 h-4 text-sky-600" />, iconBg: 'bg-sky-50' },
    { name: 'Associações e Redes', count: 18, icon: <Network className="w-4 h-4 text-purple-600" />, iconBg: 'bg-purple-50' },
    { name: 'Fundações', count: 14, icon: <Building2 className="w-4 h-4 text-cyan-600" />, iconBg: 'bg-cyan-50' },
  ];

  // ---------------------------------------------------------------------------
  // 5. Evolução das Parcerias (3 Linhas Suaves: Parceiros Ativos, Acordos, Projetos)
  // ---------------------------------------------------------------------------
  const partnersTimeline = [
    { month: 'Jun', ativos: 210, acordos: 95, projetos: 45 },
    { month: 'Jul', ativos: 235, acordos: 105, projetos: 52 },
    { month: 'Ago', ativos: 250, acordos: 118, projetos: 60 },
    { month: 'Set', ativos: 270, acordos: 135, projetos: 75 },
    { month: 'Out', ativos: 300, acordos: 160, projetos: 90 },
    { month: 'Nov', ativos: 335, acordos: 185, projetos: 105 },
    { month: 'Dez', ativos: 365, acordos: 205, projetos: 120 },
    { month: 'Jan', ativos: 390, acordos: 220, projetos: 135 },
    { month: 'Fev', ativos: 415, acordos: 240, projetos: 150 },
    { month: 'Mar', ativos: 440, acordos: 260, projetos: 165 },
    { month: 'Abr', ativos: 465, acordos: 285, projetos: 175 },
    { month: 'Mai', ativos: 490, acordos: 320, projetos: 210 },
  ];

  const lineChartPoints = useMemo(() => {
    const startX = 42;
    const stepX = 42;
    const baseY = 175;
    const maxYVal = 500;
    const heightSpan = 145;

    const atCoords = partnersTimeline.map((d, i) => ({
      x: startX + i * stepX,
      y: baseY - (d.ativos / maxYVal) * heightSpan,
      ...d,
    }));

    const acCoords = partnersTimeline.map((d, i) => ({
      x: startX + i * stepX,
      y: baseY - (d.acordos / maxYVal) * heightSpan,
      ...d,
    }));

    const prCoords = partnersTimeline.map((d, i) => ({
      x: startX + i * stepX,
      y: baseY - (d.projetos / maxYVal) * heightSpan,
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
      atCoords,
      acCoords,
      prCoords,
      atPath: buildPath(atCoords),
      acPath: buildPath(acCoords),
      prPath: buildPath(prCoords),
    };
  }, []);

  // ---------------------------------------------------------------------------
  // 6. Parceiros por Nível (4 Tiers com Containers Coloridos)
  // ---------------------------------------------------------------------------
  const niveisParceiros = [
    {
      id: 'nivel-estrategicos',
      name: 'Parceiros Estratégicos',
      count: '48',
      icon: <Crown className="w-4 h-4 text-purple-700" />,
      containerBg: 'bg-[#F3E8FF] border border-purple-200/90 text-purple-900',
      iconBoxBg: 'bg-purple-200/70',
    },
    {
      id: 'nivel-institucionais',
      name: 'Parceiros Institucionais',
      count: '126',
      icon: <Landmark className="w-4 h-4 text-blue-700" />,
      containerBg: 'bg-[#E0F2FE] border border-sky-200/90 text-sky-900',
      iconBoxBg: 'bg-sky-200/70',
    },
    {
      id: 'nivel-operacionais',
      name: 'Parceiros Operacionais',
      count: '342',
      icon: <Shield className="w-4 h-4 text-emerald-700" />,
      containerBg: 'bg-[#DCFCE7] border border-emerald-200/90 text-emerald-900',
      iconBoxBg: 'bg-emerald-200/70',
    },
    {
      id: 'nivel-locais',
      name: 'Parceiros Locais',
      count: '1.248',
      icon: <Users className="w-4 h-4 text-amber-700" />,
      containerBg: 'bg-[#FEF3C7] border border-amber-200/90 text-amber-900',
      iconBoxBg: 'bg-amber-200/70',
    },
  ];

  // ---------------------------------------------------------------------------
  // 7. Parceiros por Território (Barras Horizontais)
  // ---------------------------------------------------------------------------
  const parceirosTerritorios = [
    { country: 'Portugal', count: 126, pct: 80 },
    { country: 'Brasil', count: 98, pct: 62 },
    { country: 'Moçambique', count: 64, pct: 40 },
    { country: 'Espanha', count: 58, pct: 36 },
    { country: 'França', count: 46, pct: 29 },
    { country: 'Angola', count: 38, pct: 24 },
    { country: 'Alemanha', count: 34, pct: 21 },
    { country: 'Outros', count: 156, pct: 98 },
  ];

  // ---------------------------------------------------------------------------
  // 8. Projetos em Parceria em Destaque (Tabela)
  // ---------------------------------------------------------------------------
  const projetosEmParceria = [
    {
      id: 'proj-1',
      title: 'Cidades Sustentáveis para Todos',
      partners: 'UN-Habitat, ICLEI, Municípios Locais',
      countries: 12,
      investment: '€4,2M',
      impact: '1,2M pessoas',
      imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'proj-2',
      title: 'Educação para o Futuro',
      partners: 'UNESCO, Ministérios da Educação',
      countries: 8,
      investment: '€2,8M',
      impact: '850K pessoas',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'proj-3',
      title: 'Inovação Social e Tecnologia',
      partners: 'Banco Mundial, Parceiros Privados',
      countries: 6,
      investment: '€3,1M',
      impact: '620K pessoas',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'proj-4',
      title: 'Água e Saneamento para Comunidades',
      partners: 'UNICEF, ONGs Locais',
      countries: 10,
      investment: '€2,3M',
      impact: '1,1M pessoas',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'proj-5',
      title: 'Proteção das Zonas Costeiras',
      partners: 'ONU Ambiente, Instituições de Pesquisa',
      countries: 7,
      investment: '€1,6M',
      impact: '500K pessoas',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=120&q=80',
    },
  ];

  // ---------------------------------------------------------------------------
  // 9. Oportunidades de Colaboração (4 Itens com Badges Numéricas)
  // ---------------------------------------------------------------------------
  const oportunidadesColaboracao = [
    {
      id: 'op-1',
      title: 'Chamadas Abertas',
      desc: 'Oportunidades de financiamento e colaboração abertas',
      count: 12,
      icon: <FileText className="w-4 h-4 text-emerald-600" />,
      iconBg: 'bg-emerald-50 border border-emerald-100',
    },
    {
      id: 'op-2',
      title: 'Parcerias em Negociação',
      desc: 'Parcerias em fase avançada de negociação',
      count: 8,
      icon: <Handshake className="w-4 h-4 text-blue-600" />,
      iconBg: 'bg-blue-50 border border-blue-100',
    },
    {
      id: 'op-3',
      title: 'Projetos à Procura de Parceiros',
      desc: 'Projetos que procuram parceiros estratégicos',
      count: 15,
      icon: <Search className="w-4 h-4 text-purple-600" />,
      iconBg: 'bg-purple-50 border border-purple-100',
    },
    {
      id: 'op-4',
      title: 'Novas Organizações Interessadas',
      desc: 'Organizações que manifestaram interesse na VILA',
      count: 23,
      icon: <Building2 className="w-4 h-4 text-indigo-600" />,
      iconBg: 'bg-indigo-50 border border-indigo-100',
    },
  ];

  // ---------------------------------------------------------------------------
  // 10. Acordos Recentes (Tabela)
  // ---------------------------------------------------------------------------
  const acordosRecentes = [
    {
      id: 'ac-1',
      acordo: 'Acordo de Cooperação Técnica',
      parceiros: 'VILA Global & UN-Habitat',
      area: 'Desenvolvimento Urbano',
      inicio: '15 Mai 2025',
      status: 'Ativo',
    },
    {
      id: 'ac-2',
      acordo: 'Memorando de Entendimento',
      parceiros: 'VILA Global & UNESCO',
      area: 'Educação',
      inicio: '10 Mai 2025',
      status: 'Ativo',
    },
    {
      id: 'ac-3',
      acordo: 'Acordo de Parceria',
      parceiros: 'VILA Global & Banco Mundial',
      area: 'Inovação Social',
      inicio: '05 Mai 2025',
      status: 'Ativo',
    },
    {
      id: 'ac-4',
      acordo: 'Protocolo de Colaboração',
      parceiros: 'VILA Global & União Europeia',
      area: 'Sustentabilidade',
      inicio: '28 Abr 2025',
      status: 'Em Curso',
    },
    {
      id: 'ac-5',
      acordo: 'Acordo de Cooperação',
      parceiros: 'VILA Global & PNUD',
      area: 'Inclusão Social',
      inicio: '20 Abr 2025',
      status: 'Ativo',
    },
  ];

  // ---------------------------------------------------------------------------
  // 11. Parceiros Estratégicos (10 Marcas Globais)
  // ---------------------------------------------------------------------------
  const logosParceiros = [
    {
      id: 'logo-un-habitat',
      name: 'ONU-HABITAT',
      render: (
        <div className="flex items-center gap-1.5 font-black text-sky-700 tracking-tight text-xs">
          <Globe2 className="w-4 h-4 text-sky-600" />
          <span>UN-HABITAT</span>
        </div>
      ),
    },
    {
      id: 'logo-unesco',
      name: 'UNESCO',
      render: (
        <div className="flex items-center gap-1.5 font-black text-blue-800 tracking-wider text-xs">
          <Landmark className="w-4 h-4 text-blue-700" />
          <span>unesco</span>
        </div>
      ),
    },
    {
      id: 'logo-world-bank',
      name: 'THE WORLD BANK',
      render: (
        <div className="flex items-center gap-1 font-bold text-slate-800 text-[10.5px]">
          <div className="w-3.5 h-3.5 rounded-full border border-blue-600 flex items-center justify-center text-[7px] font-black text-blue-700">W</div>
          <span className="tracking-tighter font-serif">THE WORLD BANK</span>
        </div>
      ),
    },
    {
      id: 'logo-unicef',
      name: 'UNICEF',
      render: (
        <div className="flex flex-col items-center leading-none">
          <span className="font-extrabold text-sky-500 text-xs lowercase">unicef</span>
          <span className="text-[7.5px] text-sky-700 font-semibold mt-0.5">para cada criança</span>
        </div>
      ),
    },
    {
      id: 'logo-eu',
      name: 'União Europeia',
      render: (
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-4 rounded-xs bg-[#003399] flex items-center justify-center p-0.5">
            <span className="text-[8px] text-[#FFCC00]">★★★★</span>
          </div>
          <span className="text-[10px] font-bold text-slate-700">União Europeia</span>
        </div>
      ),
    },
    {
      id: 'logo-iclei',
      name: 'ICLEI',
      render: (
        <div className="flex items-center gap-1">
          <span className="text-sm font-black text-emerald-600 tracking-tight">ICLEI</span>
        </div>
      ),
    },
    {
      id: 'logo-pnud',
      name: 'PNUD',
      render: (
        <div className="w-6 h-6 rounded bg-blue-600 text-white flex flex-col items-center justify-center font-black text-[9px] leading-tight">
          <span>PN</span>
          <span>UD</span>
        </div>
      ),
    },
    {
      id: 'logo-uclg',
      name: 'UCLG CGLU',
      render: (
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
          <span>UCLG CGLU</span>
        </div>
      ),
    },
    {
      id: 'logo-gulbenkian',
      name: 'Fundação Calouste Gulbenkian',
      render: (
        <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-700">
          <div className="w-3.5 h-3.5 rounded-full border border-slate-700 flex items-center justify-center text-[8px]">G</div>
          <span className="truncate">Fundação Calouste Gulbenkian</span>
        </div>
      ),
    },
    {
      id: 'logo-bid',
      name: 'BID',
      render: (
        <div className="flex items-center gap-1 text-xs font-black text-blue-900 tracking-wider">
          <span>BID</span>
        </div>
      ),
    },
  ];

  // ---------------------------------------------------------------------------
  // 12. Atividade Recente (Feed de 5 Itens)
  // ---------------------------------------------------------------------------
  const atividadesRecentes = [
    {
      id: 'ar-1',
      title: 'Novo parceiro adicionado: ',
      highlight: 'Fundação Calouste Gulbenkian',
      subtitle: 'Portugal • Fundação • Cultura',
      time: 'há 30 min',
      icon: <Users className="w-4 h-4 text-emerald-600" />,
      iconBg: 'bg-emerald-50 border border-emerald-100',
    },
    {
      id: 'ar-2',
      title: 'Acordo assinado: ',
      highlight: 'VILA Global & PNUD',
      subtitle: 'Inclusão Social • 3 anos',
      time: 'há 1 h',
      icon: <FileText className="w-4 h-4 text-blue-600" />,
      iconBg: 'bg-blue-50 border border-blue-100',
    },
    {
      id: 'ar-3',
      title: 'Projeto atualizado: ',
      highlight: 'Cidades Sustentáveis para Todos',
      subtitle: '12 países • 78% de progresso',
      time: 'há 2 h',
      icon: <Briefcase className="w-4 h-4 text-cyan-600" />,
      iconBg: 'bg-cyan-50 border border-cyan-100',
    },
    {
      id: 'ar-4',
      title: 'Nova proposta de parceria recebida: ',
      highlight: 'Green Future Initiative',
      subtitle: 'Ambiente • Internacional',
      time: 'há 3 h',
      icon: <HeartHandshake className="w-4 h-4 text-emerald-600" />,
      iconBg: 'bg-emerald-50 border border-emerald-100',
    },
    {
      id: 'ar-5',
      title: 'Reunião de parceiros realizada',
      highlight: '',
      subtitle: '35 participantes • Online',
      time: 'há 4 h',
      icon: <Users className="w-4 h-4 text-purple-600" />,
      iconBg: 'bg-purple-50 border border-purple-100',
    },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-7 py-4 sm:py-6 space-y-5">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          CABEÇALHO DA PÁGINA (Com Titular, Subtítulo e Controles à Direita)
          ===================================================================== */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Lado Esquerdo: Ícone + Título + Descrição */}
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] text-[#5B21B6] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <Handshake className="w-6 h-6" strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-sans tracking-tight">
              Parceiros e Colaborações
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5 max-w-2xl leading-relaxed">
              Fortaleça conexões, desenvolva parcerias estratégicas e crie impacto global através da colaboração entre organizações, instituições e comunidades.
            </p>
          </div>
        </div>

        {/* Lado Direito: Status em Tempo Real + Seletor de Datas + Botões de Ação */}
        <div className="flex flex-col items-start xl:items-end gap-2.5 shrink-0">
          {/* Indicadores de Atualização e Tempo Real */}
          <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Dados atualizados: 10:32</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span>Dados em tempo real</span>
            </span>
          </div>

          {/* Grupo de Ações: Data, Exportar e Filtros */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Seletor de Intervalo de Datas */}
            <button
              type="button"
              onClick={() => setIsDateModalOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/90 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Botão Exportar */}
            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Exportar</span>
            </button>

            {/* Botão Filtros (Sólido Roxo #5B21B6) */}
            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          LINHA 1: 6 CARDS KPI + CAROUSEL PARCEIRO DO MÊS
          ===================================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Lado Esquerdo: 6 Cards de Indicadores (Ocupa 8 colunas no xl) */}
        <div className="xl:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5">
          {kpiCards.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.id}
                id={kpi.id}
                className="bg-white rounded-2xl border border-slate-200/70 p-3 sm:p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-purple-200/90 transition-all duration-200 flex flex-col justify-between group min-w-0"
              >
                {/* Linha Superior: Ícone + Indicador/Delta */}
                <div className="flex items-center justify-between gap-1.5">
                  <div className={`w-8 h-8 rounded-xl ${kpi.iconBg} ${kpi.iconColor} ${kpi.borderColor} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs`}>
                    <Icon className="w-4 h-4" strokeWidth={2.2} />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50/90 border border-emerald-200/60 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                    {kpi.trend}
                  </span>
                </div>

                {/* Conteúdo Central: Métrica de Alto Impacto + Rótulo com Quebra Natural */}
                <div className="mt-3">
                  <p className="text-xl sm:text-2xl font-extrabold text-[#0F172A] font-sans tracking-tight leading-none">
                    {kpi.value}
                  </p>
                  <p className="text-[11.5px] font-semibold text-[#64748B] mt-1.5 leading-snug whitespace-normal break-words min-h-[32px] flex items-center">
                    <span>{kpi.title}</span>
                  </p>
                  <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                    {kpi.period}
                  </p>
                </div>

                {/* Rodapé: Divisor com link e transição suave */}
                <div className="pt-2 mt-2.5 border-t border-slate-100/90 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => showToast(`A carregar detalhes: ${kpi.title}`)}
                    className="text-[11px] font-semibold text-[#5B21B6] hover:text-purple-800 inline-flex items-center gap-1 transition-colors cursor-pointer group-hover:underline"
                  >
                    <span>Ver detalhes</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lado Direito: Parceiro do Mês (Ocupa 4 colunas no xl) */}
        <div className="xl:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            {/* Topo: Ícone + Título + Setas de Navegação */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
                <Star className="w-4 h-4 text-blue-600 fill-blue-600" />
                <span>Parceiro do Mês</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  type="button"
                  onClick={() =>
                    setPartnerMonthIndex((prev) => (prev === 0 ? parceirosDoMes.length - 1 : prev - 1))
                  }
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPartnerMonthIndex((prev) => (prev === parceirosDoMes.length - 1 ? 0 : prev + 1))
                  }
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Identidade do Parceiro e Foto */}
            <div className="mt-3 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-sky-200 bg-sky-50 flex items-center justify-center shrink-0">
                    <Globe2 className="w-4 h-4 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0F172A] leading-tight">
                      {currentFeaturedPartner.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">
                      {currentFeaturedPartner.slogan}
                    </p>
                  </div>
                </div>

                {/* 3 Métricas do Parceiro */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-sm font-black text-[#0F172A] block font-sans">
                      {currentFeaturedPartner.activeProjects}
                    </span>
                    <span className="text-[9.5px] text-slate-400 block truncate">
                      Projetos ativos
                    </span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-sm font-black text-[#0F172A] block font-sans">
                      {currentFeaturedPartner.countries}
                    </span>
                    <span className="text-[9.5px] text-slate-400 block truncate">
                      Países
                    </span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-sm font-black text-emerald-600 block font-sans">
                      {currentFeaturedPartner.investment}
                    </span>
                    <span className="text-[9.5px] text-slate-400 block truncate">
                      Investimento
                    </span>
                  </div>
                </div>
              </div>

              {/* Foto do Edifício / Sede com Badge */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
                <img
                  src={currentFeaturedPartner.imageUrl}
                  alt={currentFeaturedPartner.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-white/95 px-1.5 py-0.5 rounded text-[8.5px] font-black text-sky-800 shadow-xs">
                  {currentFeaturedPartner.name}
                </div>
              </div>
            </div>
          </div>

          {/* Botão Ver Perfil do Parceiro */}
          <div className="mt-3 pt-2">
            <button
              type="button"
              onClick={() => setSelectedPartnerModal(currentFeaturedPartner)}
              className="w-full py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Ver perfil do parceiro</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          LINHA 2: 4 CARDS (Grid 4 Colunas)
          1. Rede Global de Parceiros
          2. Ecossistema de Parceiros
          3. Evolução das Parcerias
          4. Parceiros por Nível
          ===================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* CARD 1: Rede Global de Parceiros */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-sans">
              Rede Global de Parceiros
            </h2>

            {/* Mapa Vetorial com Clusters Numéricos */}
            <div className="relative w-full h-[180px] mt-2 flex items-center justify-center">
              <svg viewBox="0 0 480 240" className="w-full h-full object-contain select-none">
                <g>
                  {mapFeatures.paths.map((p) => {
                    if (!p) return null;
                    return (
                      <path
                        key={p.key}
                        d={p.d}
                        fill="#E2E8F0"
                        stroke="#FFFFFF"
                        strokeWidth={0.5}
                      />
                    );
                  })}
                </g>

                {/* Pins com Contagens Numéricas Exatas */}
                {mapFeatures.clusterPins.map((pin) => {
                  if (!pin.xy) return null;
                  const [cx, cy] = pin.xy;
                  return (
                    <g
                      key={pin.name}
                      className="cursor-pointer group"
                      onClick={() => showToast(`Região: ${pin.name} (${pin.count} parceiros)`)}
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r="11"
                        fill="#5B21B6"
                        className="transition-transform group-hover:scale-110"
                      />
                      <text
                        x={cx}
                        y={cy + 3.5}
                        textAnchor="middle"
                        fontSize="9"
                        fill="#FFFFFF"
                        fontWeight="bold"
                      >
                        {pin.count}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Legenda dos Níveis de Densidade */}
            <div className="mt-2 space-y-1 text-[10.5px] font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#312E81]" />
                <span>Mais de 50 parceiros</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#6366F1]" />
                <span>Entre 21 e 50 parceiros</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#A5B4FC]" />
                <span>Entre 6 e 20 parceiros</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#E0E7FF]" />
                <span>Entre 1 e 5 parceiros</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#F1F5F9] border border-slate-200" />
                <span>Sem parceiros</span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
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

        {/* CARD 2: Ecossistema de Parceiros */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-sans">
              Ecossistema de Parceiros
            </h2>

            <div className="mt-3 space-y-2.5">
              {ecossistemaTipos.map((item) => (
                <div
                  key={item.name}
                  onClick={() => showToast(`Filtrar: ${item.name}`)}
                  className="flex items-center justify-between p-1 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`p-1.5 rounded-lg shrink-0 ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-black text-[#0F172A] ml-2 shrink-0">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A exibir todos os parceiros')}
              className="text-xs sm:text-sm font-bold text-[#4F46E5] hover:text-indigo-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver todos os parceiros</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 3: Evolução das Parcerias */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between gap-1">
              <h2 className="text-base font-bold text-[#0F172A] font-sans">
                Evolução das Parcerias
              </h2>
              <div className="relative">
                <select
                  value={chartPeriod}
                  onChange={(e) => setChartPeriod(e.target.value)}
                  className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg px-2 py-0.5 pr-5 cursor-pointer focus:outline-none appearance-none"
                >
                  <option value="Últimos 12 meses">Últimos 12 meses</option>
                  <option value="Ano 2024">Ano 2024</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Legenda das 3 Linhas */}
            <div className="mt-2.5 flex flex-wrap items-center gap-2.5 text-[11px] font-medium text-slate-600">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
                <span>Parceiros Ativos</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Acordos de Colaboração</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
                <span>Projetos em Parceria</span>
              </div>
            </div>

            {/* Gráfico SVG com 3 Linhas */}
            <div className="relative w-full h-[180px] mt-2">
              <svg viewBox="0 0 520 200" className="w-full h-full overflow-visible">
                {/* Linhas de Grade */}
                {[
                  { val: '500', y: 30 },
                  { val: '400', y: 59 },
                  { val: '300', y: 88 },
                  { val: '200', y: 117 },
                  { val: '100', y: 146 },
                  { val: '0', y: 175 },
                ].map((g) => (
                  <g key={g.val}>
                    <line
                      x1="40"
                      y1={g.y}
                      x2="505"
                      y2={g.y}
                      stroke="#F1F5F9"
                      strokeWidth="1"
                      strokeDasharray={g.val === '0' ? undefined : '3 3'}
                    />
                    <text
                      x="32"
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

                {/* Linhas */}
                <path d={lineChartPoints.atPath} fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
                <path d={lineChartPoints.acPath} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                <path d={lineChartPoints.prPath} fill="none" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" />

                {/* Marcadores */}
                {lineChartPoints.atCoords.map((pt, i) => (
                  <circle
                    key={`at-${i}`}
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredChartMonth === i ? 5 : 3}
                    fill="#6366F1"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredChartMonth(i)}
                    onMouseLeave={() => setHoveredChartMonth(null)}
                  />
                ))}

                {lineChartPoints.acCoords.map((pt, i) => (
                  <circle
                    key={`ac-${i}`}
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredChartMonth === i ? 5 : 3}
                    fill="#10B981"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredChartMonth(i)}
                    onMouseLeave={() => setHoveredChartMonth(null)}
                  />
                ))}

                {lineChartPoints.prCoords.map((pt, i) => (
                  <g key={`pr-${i}`}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredChartMonth === i ? 5 : 3}
                      fill="#0EA5E9"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredChartMonth(i)}
                      onMouseLeave={() => setHoveredChartMonth(null)}
                    />
                    <text
                      x={pt.x}
                      y="194"
                      textAnchor="middle"
                      fontSize="9.5"
                      fill={hoveredChartMonth === i ? '#0F172A' : '#64748B'}
                      fontWeight={hoveredChartMonth === i ? '700' : '500'}
                    >
                      {pt.month}
                    </text>
                  </g>
                ))}
              </svg>

              {hoveredChartMonth !== null && (
                <div
                  className="absolute bg-slate-900/95 text-white px-2.5 py-1.5 rounded-lg text-[10px] pointer-events-none shadow-xl border border-slate-700 z-10"
                  style={{
                    left: `${(lineChartPoints.atCoords[hoveredChartMonth].x / 520) * 100}%`,
                    top: '15px',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <p className="font-bold text-slate-200">
                    {partnersTimeline[hoveredChartMonth].month} 2025
                  </p>
                  <p className="text-indigo-300">
                    Ativos: {partnersTimeline[hoveredChartMonth].ativos}
                  </p>
                  <p className="text-emerald-300">
                    Acordos: {partnersTimeline[hoveredChartMonth].acordos}
                  </p>
                  <p className="text-sky-300">
                    Projetos: {partnersTimeline[hoveredChartMonth].projetos}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateToTab('relatorios-dados')}
              className="text-xs sm:text-sm font-bold text-[#4F46E5] hover:text-indigo-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver relatório completo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 4: Parceiros por Nível */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-sans">
              Parceiros por Nível
            </h2>

            <div className="mt-3.5 space-y-2.5">
              {niveisParceiros.map((nv) => (
                <div
                  key={nv.id}
                  onClick={() => showToast(`Nível: ${nv.name} (${nv.count})`)}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01] ${nv.containerBg}`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${nv.iconBoxBg}`}>
                      {nv.icon}
                    </div>
                    <span className="text-xs font-bold">{nv.name}</span>
                  </div>
                  <span className="text-sm font-black font-sans">{nv.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A carregar análise de níveis de parceria')}
              className="text-xs sm:text-sm font-bold text-[#4F46E5] hover:text-indigo-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver níveis de parceria</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          LINHA 3: 3 CARDS (Grid 3 Colunas)
          1. Parceiros por Território
          2. Projetos em Parceria em Destaque
          3. Oportunidades de Colaboração
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* CARD 1: Parceiros por Território (Ocupa 3 colunas) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-sans">
              Parceiros por Território
            </h2>

            <div className="mt-4 space-y-3">
              {parceirosTerritorios.map((t) => (
                <div key={t.country} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                    <span>{t.country}</span>
                    <span className="font-bold text-[#0F172A]">{t.count}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#5B21B6] transition-all duration-500"
                      style={{ width: `${t.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateToTab('territorios-paises')}
              className="text-xs sm:text-sm font-bold text-[#4F46E5] hover:text-indigo-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver todos os territórios</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 2: Projetos em Parceria em Destaque (Ocupa 6 colunas) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-sans">
              Projetos em Parceria em Destaque
            </h2>

            {/* Tabela de Projetos */}
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100 pb-2">
                    <th className="pb-2">Projeto</th>
                    <th className="pb-2">Parceiros Principais</th>
                    <th className="pb-2 text-center">Países</th>
                    <th className="pb-2 text-right">Investimento</th>
                    <th className="pb-2 text-right">Impacto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {projetosEmParceria.map((proj) => (
                    <tr
                      key={proj.id}
                      onClick={() => showToast(`Projeto: ${proj.title}`)}
                      className="hover:bg-slate-50/70 cursor-pointer transition-colors group"
                    >
                      <td className="py-2.5 pr-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
                            className="w-7 h-7 rounded-lg object-cover shrink-0"
                          />
                          <span className="font-bold text-[#0F172A] group-hover:text-[#5B21B6] truncate max-w-[170px] transition-colors">
                            {proj.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-slate-500 truncate max-w-[160px]">
                        {proj.partners}
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold text-slate-700">
                        {proj.countries}
                      </td>
                      <td className="py-2.5 px-2 text-right font-bold text-emerald-600">
                        {proj.investment}
                      </td>
                      <td className="py-2.5 pl-2 text-right text-slate-500 font-medium">
                        {proj.impact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => onNavigateToTab('projetos-iniciativas')}
              className="text-xs sm:text-sm font-bold text-[#4F46E5] hover:text-indigo-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver todos os projetos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 3: Oportunidades de Colaboração (Ocupa 3 colunas) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-sans">
              Oportunidades de Colaboração
            </h2>

            <div className="mt-3.5 space-y-3">
              {oportunidadesColaboracao.map((op) => (
                <div
                  key={op.id}
                  onClick={() => showToast(`Oportunidades: ${op.title}`)}
                  className="p-3 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-slate-50/50 flex items-start gap-3 cursor-pointer transition-all group"
                >
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${op.iconBg}`}>
                    {op.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-xs font-bold text-[#0F172A] group-hover:text-[#5B21B6] truncate transition-colors">
                        {op.title}
                      </h3>
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[11px] font-bold shrink-0">
                        {op.count}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      {op.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A carregar todas as oportunidades')}
              className="text-xs sm:text-sm font-bold text-[#4F46E5] hover:text-indigo-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver todas as oportunidades</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          LINHA 4: 3 CARDS (Grid 3 Colunas)
          1. Acordos Recentes
          2. Parceiros Estratégicos (Logos)
          3. Atividade Recente
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* CARD 1: Acordos Recentes */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-sans">
              Acordos Recentes
            </h2>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100 pb-2">
                    <th className="pb-2">Acordo</th>
                    <th className="pb-2">Parceiros</th>
                    <th className="pb-2">Área</th>
                    <th className="pb-2">Início</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {acordosRecentes.map((ac) => (
                    <tr
                      key={ac.id}
                      onClick={() => showToast(`Acordo: ${ac.acordo}`)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="py-2 font-bold text-[#0F172A] truncate max-w-[130px]">
                        {ac.acordo}
                      </td>
                      <td className="py-2 text-slate-500 truncate max-w-[110px]">
                        {ac.parceiros}
                      </td>
                      <td className="py-2 text-slate-600 truncate">
                        {ac.area}
                      </td>
                      <td className="py-2 text-slate-400 text-[11px] truncate">
                        {ac.inicio}
                      </td>
                      <td className="py-2 text-right">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold ${
                            ac.status === 'Ativo'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {ac.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A exibir todos os acordos')}
              className="text-xs sm:text-sm font-bold text-[#4F46E5] hover:text-indigo-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver todos os acordos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 2: Parceiros Estratégicos (Logos) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-sans">
              Parceiros Estratégicos
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {logosParceiros.map((lg) => (
                <div
                  key={lg.id}
                  onClick={() => showToast(`Parceiro: ${lg.name}`)}
                  className="h-14 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-purple-200 hover:shadow-2xs flex items-center justify-center p-2 text-center cursor-pointer transition-all"
                >
                  {lg.render}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A carregar diretório de parceiros')}
              className="text-xs sm:text-sm font-bold text-[#4F46E5] hover:text-indigo-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver todos os parceiros</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 3: Atividade Recente */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-sans">
              Atividade Recente
            </h2>

            <div className="mt-3 space-y-3">
              {atividadesRecentes.map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${act.iconBg}`}>
                    {act.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 leading-snug">
                      <span className="font-medium text-slate-600">{act.title}</span>
                      <span className="font-bold text-[#0F172A]">{act.highlight}</span>
                    </p>
                    <div className="mt-0.5 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="truncate">{act.subtitle}</span>
                      <span className="shrink-0 ml-1 font-medium">{act.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => showToast('A abrir histórico completo de atividades')}
              className="text-xs sm:text-sm font-bold text-[#4F46E5] hover:text-indigo-800 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Ver toda a atividade</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODAL 1: PERFIL DO PARCEIRO SELECIONADO
          ===================================================================== */}
      {selectedPartnerModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-black">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">
                    {selectedPartnerModal.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedPartnerModal.category} • Sede: {selectedPartnerModal.headquarters}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPartnerModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-44 rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={selectedPartnerModal.imageUrl}
                alt={selectedPartnerModal.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-[11px] text-slate-400">Projetos Ativos</p>
                <p className="text-base font-black text-[#0F172A] mt-0.5">{selectedPartnerModal.activeProjects}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-[11px] text-slate-400">Países</p>
                <p className="text-base font-black text-[#0F172A] mt-0.5">{selectedPartnerModal.countries}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <p className="text-[11px] text-slate-400">Investimento</p>
                <p className="text-base font-black text-emerald-600 mt-0.5">{selectedPartnerModal.investment}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Missão e Cooperação
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                {selectedPartnerModal.description}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedPartnerModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Proposta de colaboração enviada a ${selectedPartnerModal.name}`);
                  setSelectedPartnerModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold shadow-xs transition-colors"
              >
                Propor Nova Colaboração
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: SELETOR DE DATAS
          ===================================================================== */}
      {isDateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F172A]">Período de Análise</h3>
              <button
                type="button"
                onClick={() => setIsDateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1.5">
              {[
                '01 Mai 2024 - 24 Mai 2025',
                'Ano 2025 (Ano Corrente)',
                'Ano 2024 (Consolidado)',
                'Últimos 3 Anos de Parcerias',
                'Histórico Desde a Criação da VILA',
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
                      ? 'bg-purple-50 text-[#5B21B6] border border-purple-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{range}</span>
                  {dateRange === range && <Check className="w-4 h-4 text-[#5B21B6]" />}
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
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Exportar Relatório de Parcerias</h3>
                <p className="text-xs text-slate-500">Selecione o formato de exportação</p>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Relatório Executivo PDF', desc: 'Resumo visual com gráficos e acordos', ext: 'PDF' },
                { title: 'Planilha Excel Completa', desc: 'Dados brutos de 342 parceiros ativos', ext: 'XLSX' },
                { title: 'Base Estruturada CSV', desc: 'Ideal para análise e importação', ext: 'CSV' },
                { title: 'Pacote de Dados JSON', desc: 'Interoperabilidade com portais públicos', ext: 'JSON' },
              ].map((exp) => (
                <button
                  key={exp.ext}
                  type="button"
                  onClick={() => {
                    showToast(`A descarregar ficheiro ${exp.ext}...`);
                    setIsExportModalOpen(false);
                  }}
                  className="p-3 rounded-2xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-left transition-all group cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#5B21B6] block">
                    {exp.title}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
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
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0F172A]">Filtros de Parcerias</h3>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nível de Parceria</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Estratégico', 'Institucional', 'Operacional', 'Local'].map((nv) => (
                    <button
                      key={nv}
                      type="button"
                      onClick={() => showToast(`Nível: ${nv}`)}
                      className="px-2 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                    >
                      {nv}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tipo de Organização</label>
                <select className="w-full text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                  <option value="">Todas as Organizações</option>
                  <option value="municipios">Municípios e Governos Locais (128)</option>
                  <option value="universidades">Universidades e Centros de Pesquisa (64)</option>
                  <option value="empresas">Empresas e Indústria (48)</option>
                  <option value="ongs">ONGs e Sociedade Civil (56)</option>
                  <option value="internacionais">Organismos Internacionais (28)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Limpar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFilterModalOpen(false);
                    showToast('Filtros de parcerias aplicados!');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#5B21B6] text-white text-xs font-bold shadow-xs hover:bg-[#4C1D95]"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 5: MAPA MUNDIAL EXPANDIDO
          ===================================================================== */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Rede Mundial de Parceiros e Colaborações</h3>
                <p className="text-xs text-slate-500">Distribuição em 78 países representados</p>
              </div>
              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-[380px] bg-slate-50 rounded-2xl border border-slate-200/80 p-4 flex items-center justify-center relative">
              <svg viewBox="0 0 480 240" className="w-full h-full object-contain">
                <g>
                  {mapFeatures.paths.map((p) => {
                    if (!p) return null;
                    return (
                      <path
                        key={p.key}
                        d={p.d}
                        fill="#CBD5E1"
                        stroke="#FFFFFF"
                        strokeWidth={0.5}
                      />
                    );
                  })}
                </g>
                {mapFeatures.clusterPins.map((pin) => {
                  if (!pin.xy) return null;
                  const [cx, cy] = pin.xy;
                  return (
                    <g key={`modal-pin-${pin.name}`}>
                      <circle cx={cx} cy={cy} r="13" fill="#5B21B6" />
                      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fill="#FFFFFF" fontWeight="bold">
                        {pin.count}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
              {mapFeatures.clusterPins.map((c) => (
                <div key={`modal-kpi-${c.name}`} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block truncate">{c.name}</span>
                  <span className="text-sm font-bold text-[#0F172A] block mt-0.5">{c.count} parceiros</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
