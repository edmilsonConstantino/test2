import React, { useState, useMemo } from 'react';
import {
  Globe,
  Handshake,
  ArrowRight,
  ChevronRight,
  Check,
  Plus,
  Users,
  X,
  CheckCircle2,
  Landmark,
  Leaf,
  BookOpen,
  HeartPulse,
  Cpu,
  Palette,
  Briefcase,
  Scale,
  Rocket,
  Compass,
  Shield,
  Building2,
  Target,
  Share2,
  Award,
  FileText,
  Megaphone,
  BarChart3,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import { BreadcrumbItem } from './Topbar';
import { useTheme } from '../contexts/ThemeContext';

export interface GlobalPartnersViewProps {
  onNavigateToTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

// ---------------------------------------------------------------------------
// Dados (fiéis à referência UI PARCEIROS GLOBAIS)
// ---------------------------------------------------------------------------

const TOP_KPIS = [
  { value: '1.248', label: 'Parceiros Ativos', delta: '↑ 18% este mês', icon: Handshake },
  { value: '78', label: 'Países Representados', delta: null, icon: Globe },
  { value: '358', label: 'Projetos Conjuntos', delta: '↑ 24% este mês', icon: Briefcase },
  { value: '23M+', label: 'Pessoas Impactadas', delta: '↑ 32% este mês', icon: Users },
  { value: '12', label: 'Áreas de Atuação', delta: null, icon: Layers },
];

interface MapRegion {
  id: string;
  name: string;
  count: number;
  color: string;
  center: [number, number];
}

const MAP_REGIONS: MapRegion[] = [
  { id: 'europa', name: 'Europa', count: 216, color: '#8DA7E8', center: [15, 52] },
  { id: 'asia', name: 'Ásia', count: 276, color: '#5F9DE0', center: [90, 45] },
  { id: 'africa', name: 'África', count: 312, color: '#6FBF94', center: [20, 3] },
  { id: 'america-norte', name: 'América do Norte', count: 128, color: '#E8A866', center: [-100, 44] },
  { id: 'america-sul', name: 'América do Sul', count: 94, color: '#F0C070', center: [-60, -14] },
  { id: 'oceania', name: 'Oceania', count: 88, color: '#9CCFAE', center: [134, -24] },
];

// Grupos de países por continente (nomes do world-atlas 110m)
const CONTINENT_COUNTRIES: Record<string, string[]> = {
  europa: [
    'Iceland', 'Norway', 'Sweden', 'Finland', 'Denmark', 'United Kingdom', 'Ireland', 'Portugal', 'Spain', 'France',
    'Belgium', 'Netherlands', 'Luxembourg', 'Germany', 'Switzerland', 'Austria', 'Italy', 'Czechia', 'Poland',
    'Slovakia', 'Hungary', 'Slovenia', 'Croatia', 'Bosnia and Herz.', 'Serbia', 'Montenegro', 'Kosovo',
    'North Macedonia', 'Macedonia', 'Albania', 'Greece', 'Bulgaria', 'Romania', 'Moldova', 'Ukraine', 'Belarus',
    'Lithuania', 'Latvia', 'Estonia', 'Russia',
  ],
  asia: [
    'China', 'India', 'Japan', 'South Korea', 'North Korea', 'Mongolia', 'Kazakhstan', 'Uzbekistan', 'Turkmenistan',
    'Kyrgyzstan', 'Tajikistan', 'Afghanistan', 'Pakistan', 'Iran', 'Iraq', 'Syria', 'Lebanon', 'Israel', 'Jordan',
    'Saudi Arabia', 'Yemen', 'Oman', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Turkey', 'Türkiye', 'Georgia',
    'Armenia', 'Azerbaijan', 'Bangladesh', 'Nepal', 'Bhutan', 'Myanmar', 'Thailand', 'Laos', 'Vietnam', 'Cambodia',
    'Malaysia', 'Indonesia', 'Philippines', 'Sri Lanka', 'Taiwan',
  ],
  africa: [
    'Morocco', 'Algeria', 'Tunisia', 'Libya', 'Egypt', 'Sudan', 'Chad', 'Niger', 'Mali', 'Mauritania', 'Senegal',
    'Gambia', 'Guinea', 'Guinea-Bissau', 'Sierra Leone', 'Liberia', "Côte d'Ivoire", 'Ghana', 'Togo', 'Benin',
    'Burkina Faso', 'Nigeria', 'Cameroon', 'Central African Rep.', 'South Sudan', 'S. Sudan', 'Ethiopia', 'Eritrea',
    'Djibouti', 'Somalia', 'Kenya', 'Uganda', 'Rwanda', 'Burundi', 'Tanzania', 'Dem. Rep. Congo', 'Congo', 'Gabon',
    'Eq. Guinea', 'Angola', 'Zambia', 'Malawi', 'Mozambique', 'Zimbabwe', 'Botswana', 'Namibia', 'South Africa',
    'Lesotho', 'eSwatini', 'Eswatini', 'Madagascar', 'Cape Verde', 'W. Sahara',
  ],
  'america-norte': [
    'Canada', 'United States of America', 'Mexico', 'Greenland', 'Guatemala', 'Belize', 'Honduras', 'El Salvador',
    'Nicaragua', 'Costa Rica', 'Panama', 'Cuba', 'Haiti', 'Dominican Rep.', 'Jamaica', 'Bahamas',
    'Trinidad and Tobago', 'Puerto Rico',
  ],
  'america-sul': [
    'Brazil', 'Argentina', 'Chile', 'Peru', 'Bolivia', 'Paraguay', 'Uruguay', 'Colombia', 'Venezuela', 'Ecuador',
    'Guyana', 'Suriname', 'Falkland Is.',
  ],
  oceania: ['Australia', 'New Zealand', 'Papua New Guinea', 'Fiji', 'Solomon Is.', 'Vanuatu', 'New Caledonia'],
};

const FEATURED_LOGOS = [
  {
    id: 'un',
    render: (
      <span className="flex items-center gap-1.5 font-sans">
        <span className="w-7 h-7 rounded-full bg-[#1455AC] text-white text-[10px] font-black flex items-center justify-center tracking-tight">UN</span>
        <span className="text-left leading-tight">
          <span className="block text-xs font-bold text-slate-800 dark:text-slate-100">United Nations</span>
          <span className="block text-[10px] text-slate-500 dark:text-slate-400">(UNDP)</span>
        </span>
      </span>
    ),
    subtitle: 'Desenvolvimento Humano',
  },
  {
    id: 'wb',
    render: (
      <span className="flex items-center gap-1.5 font-sans">
        <Landmark className="w-6 h-6 text-[#1455AC]" strokeWidth={1.8} />
        <span className="text-left leading-tight">
          <span className="block text-xs font-bold text-slate-800 dark:text-slate-100">World Bank</span>
        </span>
      </span>
    ),
    subtitle: 'Desenvolvimento Sustentável',
  },
  {
    id: 'unesco',
    render: (
      <span className="flex items-center gap-1.5 font-sans">
        <GraduationCap className="w-6 h-6 text-[#0F448A]" strokeWidth={1.8} />
        <span className="text-left leading-tight">
          <span className="block text-sm font-black tracking-wide text-[#0F448A] dark:text-blue-300">UNESCO</span>
        </span>
      </span>
    ),
    subtitle: 'Educação & Cultura',
  },
  {
    id: 'iclei',
    render: (
      <span className="flex items-center gap-1.5 font-sans">
        <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-black">ICLEI</span>
        <span className="text-left leading-tight">
          <span className="block text-[11px] font-bold text-slate-800 dark:text-slate-100">ICLEI</span>
        </span>
      </span>
    ),
    subtitle: 'Ação Climática Local',
  },
  {
    id: 'ashoka',
    render: (
      <span className="flex items-center gap-1.5 font-sans">
        <Leaf className="w-6 h-6 text-slate-800 dark:text-slate-100" strokeWidth={1.8} />
        <span className="text-left leading-tight">
          <span className="block text-xs font-bold text-slate-800 dark:text-slate-100">Ashoka</span>
        </span>
      </span>
    ),
    subtitle: 'Inovação Social',
  },
  {
    id: 'google',
    render: (
      <span className="font-sans text-sm font-bold whitespace-nowrap">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
        <span className="text-slate-500 dark:text-slate-400 font-normal text-xs">.org</span>
      </span>
    ),
    subtitle: 'Tecnologia & Impacto',
  },
];

const PARTNER_PROJECTS = [
  {
    id: 'pp-1',
    title: 'Cidades Inteligentes Sustentáveis',
    subtitle: 'Mobilidade, energia e gestão urbana',
    status: 'Em andamento',
    statusClass: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20',
    flag: '🇵🇹',
    country: 'Portugal',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=200&auto=format&fit=crop&q=70',
  },
  {
    id: 'pp-2',
    title: 'Educação Digital para Todos',
    subtitle: 'Inclusão digital e formação',
    status: 'Planejamento',
    statusClass: 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] dark:text-blue-400 border border-blue-200 dark:border-blue-500/20',
    flag: '🇲🇿',
    country: 'Moçambique',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&auto=format&fit=crop&q=70',
  },
  {
    id: 'pp-3',
    title: 'Saúde Comunitária 360',
    subtitle: 'Acesso à saúde e bem-estar',
    status: 'Em andamento',
    statusClass: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20',
    flag: '🇧🇷',
    country: 'Brasil',
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=200&auto=format&fit=crop&q=70',
  },
  {
    id: 'pp-4',
    title: 'Agricultura Regenerativa',
    subtitle: 'Segurança alimentar e clima',
    status: 'Em estudo',
    statusClass: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20',
    flag: '🇰🇪',
    country: 'Quénia',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=200&auto=format&fit=crop&q=70',
  },
];

const COLLAB_AREAS = [
  { label: 'Ação Climática', icon: Leaf },
  { label: 'Educação', icon: BookOpen },
  { label: 'Saúde & Bem-estar', icon: HeartPulse },
  { label: 'Tecnologia & Inovação', icon: Cpu },
  { label: 'Inclusão Social', icon: Users },
  { label: 'Cultura & Património', icon: Palette },
  { label: 'Desenvolvimento Econômico', icon: Briefcase },
  { label: 'Direitos Humanos', icon: Scale },
  { label: 'Empreendedorismo', icon: Rocket },
  { label: 'Turismo Sustentável', icon: Compass },
  { label: 'Governança & Transparência', icon: Shield },
  { label: 'Infraestrutura', icon: Building2 },
];

const WHY_PARTNER = [
  { title: 'Impacto real e mensurável', desc: 'Projetos alinhados com os ODS e com resultados concretos.', icon: Target },
  { title: 'Rede global e diversa', desc: 'Conecte-se com organizações, governos e comunidades.', icon: Globe },
  { title: 'Co-criação de soluções', desc: 'Desenvolva iniciativas inovadoras e sustentáveis.', icon: Share2 },
  { title: 'Visibilidade e reconhecimento', desc: 'Destaque o seu trabalho e inspire mudanças globais.', icon: Award },
];

const TOP_ACTIVE = [
  { rank: 1, name: 'ONU – PNUD', projects: '24 projetos', delta: '↑ 12%', icon: Globe, tile: 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] dark:text-blue-400' },
  { rank: 2, name: 'World Bank', projects: '18 projetos', delta: '↑ 8%', icon: Landmark, tile: 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] dark:text-blue-400' },
  { rank: 3, name: 'UNESCO', projects: '15 projetos', delta: '↑ 15%', icon: GraduationCap, tile: 'bg-blue-50 dark:bg-blue-500/10 text-[#0F448A] dark:text-blue-300' },
  { rank: 4, name: 'ICLEI', projects: '14 projetos', delta: '↑ 10%', icon: Leaf, tile: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { rank: 5, name: 'Ashoka', projects: '12 projetos', delta: '↑ 18%', icon: Users, tile: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' },
];

const PARTNER_EVENTS = [
  { day: '25', month: 'JUN', title: 'Fórum Global de Impacto', location: 'Lisboa, Portugal', mode: 'Presencial', modeClass: 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] dark:text-blue-400 border border-blue-200 dark:border-blue-500/20' },
  { day: '08', month: 'JUL', title: 'Webinar: Financiamento Sustentável', location: 'Online', mode: 'Online', modeClass: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20' },
  { day: '19', month: 'AGO', title: 'Cimeira de Cidades Inteligentes', location: 'Barcelona, Espanha', mode: 'Presencial', modeClass: 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] dark:text-blue-400 border border-blue-200 dark:border-blue-500/20' },
];

const PARTNER_RESOURCES = [
  { title: 'Guia de Parceiro VILA', desc: 'Documentos e diretrizes', icon: FileText },
  { title: 'Kit de Comunicação', desc: 'Logótipos, templates e materiais', icon: Megaphone },
  { title: 'Relatórios de Impacto', desc: 'Dados, métricas e análises', icon: BarChart3 },
  { title: 'Plataforma de Colaboração', desc: 'Ferramentas e espaços de trabalho', icon: Layers },
];

export const GlobalPartnersView: React.FC<GlobalPartnersViewProps> = ({
  onNavigateToTab,
  onOpenAuth: _onOpenAuth,
  onOpenAiAssistant: _onOpenAiAssistant,
  onBreadcrumbChange,
}) => {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mapZoom, setMapZoom] = useState<1 | 2>(1);
  const { isDark } = useTheme();

  // Form State
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('Fundação');
  const [contactEmail, setContactEmail] = useState('');
  const [country, setCountry] = useState('');
  const [proposalMsg, setProposalMsg] = useState('');

  const onBreadcrumbChangeRef = React.useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;

  React.useEffect(() => {
    onBreadcrumbChangeRef.current?.([{ label: 'Parceiros Globais' }]);
  }, []);

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsPartnerModalOpen(false);
      setOrgName('');
      setContactEmail('');
      setProposalMsg('');
    }, 2200);
  };

  // Mapa mundial: países coloridos por continente (nomes do world-atlas)
  const worldPaths = useMemo(() => {
    const width = 520;
    const height = 270;
    const projection = geoNaturalEarth1().scale(85).translate([width / 2, height / 2 + 8]);
    const pathGen = geoPath(projection);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topology = worldData as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countriesFeature = feature(topology, topology.objects.countries);

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
        const name: string = f.properties?.name || '';
        let fill = isDark ? '#334155' : '#E9EEF4';
        for (const region of MAP_REGIONS) {
          if (CONTINENT_COUNTRIES[region.id]?.includes(name)) {
            fill = region.color;
            break;
          }
        }
        return { key: `pg-${f.id ?? index}-${index}`, d, fill };
      })
      .filter(Boolean);
  }, [isDark]);

  const regionBadges = useMemo(() => {
    const projection = geoNaturalEarth1().scale(85).translate([520 / 2, 270 / 2 + 8]);
    return MAP_REGIONS.map((region) => {
      const [x, y] = projection(region.center) || [0, 0];
      return { ...region, x, y };
    });
  }, []);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-50 pb-16 font-sans">
      <div className="max-w-[1600px] mx-auto px-3.5 sm:px-5 lg:px-6 pt-4 sm:pt-6 font-sans">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          {/* =================================================================== */}
          {/* CONTEÚDO PRINCIPAL (9 colunas) */}
          {/* =================================================================== */}
          <div className="xl:col-span-9 space-y-5 min-w-0">

            {/* Cabeçalho: ícone + título + subtítulo */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#1455AC] text-white flex items-center justify-center shrink-0 shadow-sm border border-blue-950/20">
                <Handshake className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F172A] dark:text-slate-50 leading-tight">
                  Parceiros Globais
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-snug">
                  Juntos, criamos soluções, impulsionamos impacto e construímos um futuro sustentável para todos.
                </p>
              </div>
            </div>

            {/* KPIs (5 cards sempre visíveis — a grelha adapta-se a cada tela) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {TOP_KPIS.map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <div
                    key={kpi.label}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-3.5 shadow-2xs flex items-start gap-3 hover:border-slate-300 dark:hover:border-slate-600 transition-colors last:col-span-2 sm:last:col-span-1"
                  >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] dark:text-blue-400 border border-blue-100/70 dark:border-blue-500/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-lg font-black text-[#0F172A] dark:text-slate-50 leading-none tracking-tight">
                          {kpi.value}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block mt-1 leading-tight">
                          {kpi.label}
                        </span>
                        {kpi.delta && (
                          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                            {kpi.delta}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>


            {/* Parceiros pelo mundo (mapa + legenda) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                  Parceiros pelo mundo
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
                {/* Mapa */}
                <div className="lg:col-span-8 relative rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 overflow-hidden">
                  <svg viewBox={mapZoom === 1 ? '0 0 520 270' : '80 40 360 190'} className="w-full h-auto block">
                    <g>
                      {worldPaths.map((p) => (
                        <path
                          key={p!.key}
                          d={p!.d}
                          fill={p!.fill}
                          stroke={isDark ? '#0F172A' : '#FFFFFF'}
                          strokeWidth="0.4"
                          className="transition-opacity hover:opacity-80"
                        />
                      ))}
                    </g>
                    {regionBadges.map((r) => (
                      <g key={`badge-${r.id}`}>
                        <circle cx={r.x} cy={r.y} r="13" fill="#1455AC" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text x={r.x} y={r.y + 3.5} textAnchor="middle" fontSize="10" fontWeight="700" fill="#FFFFFF">
                          {r.count}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {/* Controles de zoom */}
                  <div className="absolute bottom-3 left-3 flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setMapZoom((z) => (z === 1 ? 2 : 1))}
                      className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-base leading-none"
                      title="Ampliar"
                    >
                      +
                    </button>
                    <div className="h-px bg-slate-200 dark:bg-slate-700" />
                    <button
                      type="button"
                      onClick={() => setMapZoom(1)}
                      className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-base leading-none"
                      title="Reduzir"
                    >
                      −
                    </button>
                  </div>
                </div>

                {/* Legenda */}
                <div className="lg:col-span-4 flex flex-col justify-center gap-2">
                  {MAP_REGIONS.map((r) => (
                    <div key={r.id} className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                      <span className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                        {r.name}
                      </span>
                      <span className="font-bold text-[#0F172A] dark:text-slate-50 font-mono">{r.count}</span>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => onNavigateToTab && onNavigateToTab('explorar')}
                    className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-[#1455AC] dark:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-500/10 hover:border-blue-200 transition-all cursor-pointer"
                  >
                    <span>Ver mapa interativo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Parceiros em destaque (logos) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                  Parceiros em destaque
                </h2>
                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(true)}
                  className="text-[11px] sm:text-xs font-bold text-[#1455AC] dark:text-blue-400 hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Ver todos os parceiros</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
                {FEATURED_LOGOS.map((logo) => (
                  <div
                    key={logo.id}
                    className="h-16 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-2xs flex flex-col items-center justify-center px-2 transition-all cursor-default"
                    title={logo.subtitle}
                  >
                    {logo.render}
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5 text-center leading-tight truncate w-full">
                      {logo.subtitle}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fileira inferior: Projetos em parceria | Áreas de colaboração | Por que ser parceiro */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

              {/* Projetos em parceria */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 sm:p-5 shadow-2xs flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h2 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                    Projetos em parceria
                  </h2>
                  <button
                    type="button"
                    onClick={() => onNavigateToTab && onNavigateToTab('mundo-em-movimento')}
                    className="text-[11px] font-bold text-[#1455AC] dark:text-blue-400 hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Ver todos</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="mt-3 space-y-2.5 flex-1">
                  {PARTNER_PROJECTS.map((proj) => (
                    <div
                      key={proj.id}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-default"
                    >
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 leading-tight truncate">
                          {proj.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{proj.subtitle}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap ${proj.statusClass}`}>
                          {proj.status}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {proj.flag} {proj.country}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Áreas de colaboração */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 sm:p-5 shadow-2xs flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h2 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                    Áreas de colaboração
                  </h2>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 flex-1">
                  {COLLAB_AREAS.map((area) => {
                    const Icon = area.icon;
                    return (
                      <div
                        key={area.label}
                        className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 hover:bg-blue-50/60 dark:hover:bg-blue-500/10 hover:border-blue-100 dark:hover:border-blue-500/30 transition-all p-2 flex flex-col items-center justify-center text-center gap-1.5 cursor-default"
                        title={area.label}
                      >
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-[#1455AC] dark:text-blue-400 flex items-center justify-center shadow-2xs">
                          <Icon className="w-4 h-4" strokeWidth={1.9} />
                        </div>
                        <span className="text-[9px] font-semibold text-slate-600 dark:text-slate-300 leading-tight">
                          {area.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(true)}
                  className="mt-3 w-full py-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-xs font-bold text-[#1455AC] dark:text-blue-400 hover:bg-blue-100/70 dark:hover:bg-blue-500/20 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Propor nova colaboração</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Por que ser parceiro da VILA? */}
              <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 sm:p-5 shadow-2xs flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h2 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">
                    Por que ser parceiro da VILA?
                  </h2>
                </div>

                <div className="mt-3 space-y-3.5 flex-1">
                  {WHY_PARTNER.map((w) => {
                    const Icon = w.icon;
                    return (
                      <div key={w.title} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-100/70 dark:border-blue-500/20 text-[#1455AC] dark:text-blue-400 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" strokeWidth={1.9} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 leading-tight">{w.title}</h4>
                          <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{w.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(true)}
                  className="mt-4 w-full py-2.5 rounded-xl bg-[#1455AC] hover:bg-[#0F448A] text-white text-xs font-bold shadow-xs transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Tornar-se parceiro</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* BARRA LATERAL DIREITA (3 colunas) */}
          {/* =================================================================== */}
          <aside className="xl:col-span-3 space-y-5 min-w-0">

            {/* Parceiros mais ativos */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-sm font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">Parceiros mais ativos</h2>
                <button
                  type="button"
                  className="text-[11px] font-bold text-[#1455AC] dark:text-blue-400 hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Ver ranking</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="mt-3 space-y-2.5">
                {TOP_ACTIVE.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.rank} className="flex items-center gap-2.5">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 w-3 text-center shrink-0">{p.rank}</span>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${p.tile}`}>
                        <Icon className="w-4 h-4" strokeWidth={1.9} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 leading-tight truncate">{p.name}</h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">{p.projects}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">{p.delta}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Próximos eventos para parceiros */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-sm font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">Próximos eventos para parceiros</h2>
                <button
                  type="button"
                  onClick={() => onNavigateToTab && onNavigateToTab('eventos')}
                  className="text-[11px] font-bold text-[#1455AC] dark:text-blue-400 hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Ver todos</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="mt-3 space-y-3">
                {PARTNER_EVENTS.map((ev) => (
                  <div key={ev.title} className="flex items-center gap-3">
                    <div className="w-11 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100/70 dark:border-blue-500/20 text-center shrink-0">
                      <span className="block text-sm font-black text-[#1455AC] dark:text-blue-400 leading-none">{ev.day}</span>
                      <span className="block text-[8.5px] font-bold text-[#1455AC] dark:text-blue-400 uppercase mt-0.5">{ev.month}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 leading-tight">{ev.title}</h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{ev.location}</p>
                    </div>
                    <span className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded shrink-0 ${ev.modeClass}`}>
                      {ev.mode}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recursos para parceiros */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-sm font-bold text-[#0F172A] dark:text-slate-50 tracking-tight">Recursos para parceiros</h2>
              </div>

              <div className="mt-3 space-y-1.5">
                {PARTNER_RESOURCES.map((res) => {
                  const Icon = res.icon;
                  return (
                    <button
                      key={res.title}
                      type="button"
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-100/70 dark:border-blue-500/20 text-[#1455AC] dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" strokeWidth={1.9} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-50 leading-tight group-hover:text-[#1455AC] dark:group-hover:text-blue-400 transition-colors">
                          {res.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{res.desc}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0 group-hover:text-[#1455AC] transition-colors" />
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                <button
                  type="button"
                  className="text-xs font-bold text-[#1455AC] dark:text-blue-400 hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Aceder aos recursos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal: Tornar-se Parceiro */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 font-sans">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Candidatura de Parceria Institucional
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  Junte-se à rede global de cooperação da plataforma VILA
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPartnerModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-3 font-sans">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-sans">Proposta Enviada com Sucesso!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto font-sans">
                  A equipa de relações institucionais da VILA analisará os dados e entrará em contacto em até 48 horas úteis.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nome da Organização / Instituição *
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Ex: Fundação Oceano Vivo"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1455AC]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tipo de Organização
                    </label>
                    <select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1455AC] text-slate-700"
                    >
                      <option value="Fundação">Fundação Filantrópica</option>
                      <option value="Universidade">Universidade / Pesquisa</option>
                      <option value="Governo">Governo / Município</option>
                      <option value="Empresa B">Empresa B / Privada</option>
                      <option value="ONG">ONG Internacional</option>
                      <option value="Multilateral">Agência Multilateral</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      País Sede *
                    </label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Ex: Portugal"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1455AC]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Institucional de Contacto *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="parcerias@organizacao.org"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1455AC]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Proposta de Colaboração / Áreas de Interesse
                  </label>
                  <textarea
                    rows={3}
                    value={proposalMsg}
                    onChange={(e) => setProposalMsg(e.target.value)}
                    placeholder="Descreva brevemente como a sua instituição pretende colaborar com as comunidades da VILA..."
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1455AC]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPartnerModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1455AC] hover:bg-[#0F448A] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    Submeter Proposta
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalPartnersView;
