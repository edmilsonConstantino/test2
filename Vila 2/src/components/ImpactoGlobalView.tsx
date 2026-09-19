import React, { useState, useEffect } from 'react';
import {
  Users,
  Flag,
  Globe2,
  Zap,
  Handshake,
  ArrowRight,
  TrendingUp,
  Download,
  Calendar,
  FileText,
  Database,
  Info,
  ChevronDown,
  Megaphone,
  CheckCircle2,
  Sparkles,
  Heart,
  BookOpen,
  Activity,
  Building2,
  Leaf,
  Globe,
  Share2,
  ExternalLink,
  X,
  Search,
} from 'lucide-react';
import { DemoUser } from '../data/demoUsers';
import { BreadcrumbItem } from './Topbar';

interface ImpactoGlobalViewProps {
  currentUser?: DemoUser;
  onNavigateToTab: (tabId: string) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
  onOpenAuth?: (mode?: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
}

export const ImpactoGlobalView: React.FC<ImpactoGlobalViewProps> = ({
  currentUser,
  onNavigateToTab,
  onBreadcrumbChange,
}) => {
  // Breadcrumb synchronization
  useEffect(() => {
    onBreadcrumbChange?.([
      { label: 'Plataforma VILA', onClick: () => onNavigateToTab('inicio') },
      { label: 'Impacto Global', onClick: () => onNavigateToTab('impacto') },
      { label: 'Visão Geral' },
    ]);
  }, [onBreadcrumbChange, onNavigateToTab]);

  const [timeframe, setTimeframe] = useState<'Últimos 12 meses' | 'Últimos 6 meses' | 'Ano Corrente' | 'Desde o Início'>('Últimos 12 meses');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeKpiModal, setActiveKpiModal] = useState<{
    title: string;
    value: string;
    growth: string;
    details: Array<{ label: string; val: string }>;
  } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // KPI items
  const kpis = [
    {
      id: 'pessoas',
      title: 'Pessoas Alcançadas',
      value: '2.847.562',
      trend: '↑ 24%',
      period: 'desde o mês passado',
      icon: Users,
      iconBg: 'bg-purple-50/90',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-100/70',
      details: [
        { label: 'Utilizadores Diretos', val: '1.248.300' },
        { label: 'Beneficiários Indiretos', val: '1.599.262' },
        { label: 'Taxa de Retenção', val: '78.4%' },
      ],
    },
    {
      id: 'comunidades',
      title: 'Comunidades Ativas',
      value: '18.732',
      trend: '↑ 18%',
      period: 'desde o mês passado',
      icon: Users,
      iconBg: 'bg-indigo-50/90',
      iconColor: 'text-indigo-600',
      borderColor: 'border-indigo-100/70',
      details: [
        { label: 'Comunidades Rurais', val: '7.420' },
        { label: 'Comunidades Urbanas', val: '11.312' },
        { label: 'Crescimento Mensal', val: '+412 novas' },
      ],
    },
    {
      id: 'territorios',
      title: 'Territórios Ativos',
      value: '1.248',
      trend: '↑ 15%',
      period: 'desde o mês passado',
      icon: Flag,
      iconBg: 'bg-rose-50/90',
      iconColor: 'text-rose-600',
      borderColor: 'border-rose-100/70',
      details: [
        { label: 'Municípios Digitais', val: '864' },
        { label: 'Regiões Transfronteiriças', val: '384' },
        { label: 'Pactos Territoriais', val: '156' },
      ],
    },
    {
      id: 'paises',
      title: 'Países Envolvidos',
      value: '156',
      trend: '↑ 8%',
      period: 'desde o mês passado',
      icon: Globe2,
      iconBg: 'bg-blue-50/90',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100/70',
      details: [
        { label: 'CPLP & Lusofonia', val: '9 países (100%)' },
        { label: 'Europa', val: '38 países' },
        { label: 'Américas & África', val: '109 países' },
      ],
    },
    {
      id: 'iniciativas',
      title: 'Iniciativas Ativas',
      value: '24.963',
      trend: '↑ 27%',
      period: 'desde o mês passado',
      icon: Zap,
      iconBg: 'bg-emerald-50/90',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-100/70',
      details: [
        { label: 'Projetos em Curso', val: '16.420' },
        { label: 'Consultas Populares', val: '5.120' },
        { label: 'Eventos Comunitários', val: '3.423' },
      ],
    },
    {
      id: 'parceiros',
      title: 'Parceiros Globais',
      value: '342',
      trend: '↑ 12%',
      period: 'desde o mês passado',
      icon: Handshake,
      iconBg: 'bg-amber-50/90',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-100/70',
      details: [
        { label: 'Governos & Municípios', val: '184' },
        { label: 'ONGs & Fundações', val: '98' },
        { label: 'Academia & Empresas', val: '60' },
      ],
    },
  ];

  // ODS items
  const odsItems = [
    {
      number: '3',
      title: 'Saúde e Bem-Estar',
      color: '#10B981',
      percentage: '86%',
      width: '86%',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      number: '11',
      title: 'Cidades e Comunidades Sustentáveis',
      color: '#F59E0B',
      percentage: '82%',
      width: '82%',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M6 21V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v12M14 21V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v12" />
        </svg>
      ),
    },
    {
      number: '13',
      title: 'Ação Climática',
      color: '#059669',
      percentage: '76%',
      width: '76%',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
        </svg>
      ),
    },
    {
      number: '4',
      title: 'Educação de Qualidade',
      color: '#DC2626',
      percentage: '70%',
      width: '70%',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      number: '10',
      title: 'Redução das Desigualdades',
      color: '#DB2777',
      percentage: '68%',
      width: '68%',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m14 10-2-2-2 2M14 14l-2 2-2-2M8 4h8M8 20h8" />
        </svg>
      ),
    },
    {
      number: '17',
      title: 'Parcerias para a Implementação',
      color: '#1E3A8A',
      percentage: '64%',
      width: '64%',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-900" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="9" r="6" />
          <circle cx="15" cy="15" r="6" />
        </svg>
      ),
    },
  ];

  // Atividades recentes
  const recentActivities = [
    {
      title: 'Campanha Planeta em Ação',
      icon: <Leaf className="w-4 h-4 text-emerald-600" />,
      bg: 'bg-emerald-50',
      reach: '512.000',
      countries: '32 países',
    },
    {
      title: 'Semana da Mobilidade Sustentável',
      icon: <Users className="w-4 h-4 text-blue-600" />,
      bg: 'bg-blue-50',
      reach: '386.000',
      countries: '28 países',
    },
    {
      title: 'Educação para Todos',
      icon: <BookOpen className="w-4 h-4 text-amber-600" />,
      bg: 'bg-amber-50',
      reach: '274.000',
      countries: '24 países',
    },
    {
      title: 'Saúde & Bem-Estar',
      icon: <Heart className="w-4 h-4 text-rose-600" />,
      bg: 'bg-rose-50',
      reach: '231.000',
      countries: '22 países',
    },
    {
      title: 'Apoio a Comunidades Vulneráveis',
      icon: <Handshake className="w-4 h-4 text-sky-600" />,
      bg: 'bg-sky-50',
      reach: '198.000',
      countries: '19 países',
    },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5 animate-in fade-in duration-200">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0D1E3A] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal Detalhes de KPI */}
      {activeKpiModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-100 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveKpiModal(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-[#0D1E3A]">{activeKpiModal.title}</h3>
            <div className="flex items-baseline gap-2 my-2">
              <span className="text-2xl font-extrabold text-[#0D1E3A]">{activeKpiModal.value}</span>
              <span className="text-xs font-semibold text-emerald-600">{activeKpiModal.growth}</span>
            </div>

            <div className="divide-y divide-slate-100 my-4 border-y border-slate-100">
              {activeKpiModal.details.map((d, i) => (
                <div key={i} className="py-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{d.label}</span>
                  <span className="font-semibold text-slate-800">{d.val}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveKpiModal(null)}
              className="w-full py-2 bg-[#5B21B6] text-white text-xs font-semibold rounded-xl hover:bg-purple-800 transition-colors"
            >
              Fechar Detalhes
            </button>
          </div>
        </div>
      )}

      {/* 1. HEADER DO MÓDULO COM ARTE ILUSTRADA DAS COMUNIDADES GLOBAIS */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 overflow-hidden relative">
        <div className="flex items-start sm:items-center gap-3.5 z-10 max-w-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE]/80 border border-purple-200/60 flex items-center justify-center text-[#5B21B6] shrink-0 shadow-2xs">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#0D1E3A] font-['Outfit'] tracking-tight">
              Impacto Global da Plataforma VILA
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              Visão geral do impacto coletivo gerado pela plataforma VILA e pela sua rede global de pessoas, comunidades e territórios.
            </p>
          </div>
        </div>

        {/* Ilustração com pessoas de diferentes origens e cidades ao fundo */}
        <div className="w-full lg:w-auto flex items-center justify-end z-10">
          <div className="w-full lg:w-[480px] h-[75px] relative overflow-hidden flex items-end justify-end">
            <svg viewBox="0 0 500 80" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
              {/* Skyline & Trees Silhouette */}
              <path d="M300 80 V45 H320 V80 M330 80 V30 H350 V80 M360 80 V50 H380 V80 M410 80 V40 H440 V80" fill="#E2E8F0" opacity="0.6" />
              {/* Skyline lines */}
              <line x1="310" y1="50" x2="310" y2="75" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="340" y1="35" x2="340" y2="75" stroke="#CBD5E1" strokeWidth="1" />
              {/* Árvores estilizadas */}
              <circle cx="280" cy="65" r="12" fill="#86EFAC" opacity="0.8" />
              <circle cx="395" cy="62" r="14" fill="#86EFAC" opacity="0.8" />
              <circle cx="465" cy="66" r="10" fill="#86EFAC" opacity="0.8" />

              {/* Dotted Constellation Network */}
              <g stroke="#C4B5FD" strokeWidth="1" strokeDasharray="2 2">
                <line x1="60" y1="45" x2="110" y2="35" />
                <line x1="110" y1="35" x2="160" y2="50" />
                <line x1="160" y1="50" x2="220" y2="38" />
                <line x1="220" y1="38" x2="270" y2="45" />
              </g>
              <circle cx="60" cy="45" r="2.5" fill="#8B5CF6" />
              <circle cx="110" cy="35" r="3" fill="#3B82F6" />
              <circle cx="160" cy="50" r="2.5" fill="#10B981" />
              <circle cx="220" cy="38" r="3" fill="#EC4899" />
              <circle cx="270" cy="45" r="2.5" fill="#6366F1" />

              {/* Diverse Community Figures */}
              {/* Pessoa 1: Azul */}
              <circle cx="70" cy="40" r="4.5" fill="#1E40AF" />
              <path d="M64 80 L67 52 L73 52 L76 80" fill="#2563EB" />

              {/* Pessoa 2: Verde (camisola) */}
              <circle cx="105" cy="36" r="5" fill="#065F46" />
              <path d="M98 80 L102 48 L108 48 L112 80" fill="#059669" />

              {/* Pessoa 3: Utilizador de Cadeira de Rodas */}
              <circle cx="145" cy="42" r="4.5" fill="#4338CA" />
              <path d="M141 52 H149 V66 H141 Z" fill="#6366F1" />
              <circle cx="145" cy="68" r="9" stroke="#3B82F6" strokeWidth="2.5" fill="none" />
              <circle cx="145" cy="68" r="3" fill="#3B82F6" />

              {/* Pessoa 4: Vermelho/Coral com mão levantada */}
              <circle cx="190" cy="35" r="5" fill="#991B1B" />
              <path d="M184 80 L188 47 L194 47 L198 80" fill="#DC2626" />
              <path d="M194 48 L202 36" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />

              {/* Pessoa 5: Amarelo/Laranja */}
              <circle cx="225" cy="38" r="4.5" fill="#B45309" />
              <path d="M220 80 L223 50 L229 50 L232 80" fill="#F59E0B" />

              {/* Pessoa 6: Índigo / Roxo */}
              <circle cx="255" cy="36" r="5" fill="#4C1D95" />
              <path d="M249 80 L252 48 L258 48 L261 80" fill="#7C3AED" />

              {/* Pessoa 7: Ciano / Azul claro */}
              <circle cx="285" cy="39" r="4.5" fill="#0E7490" />
              <path d="M280 80 L283 51 L289 51 L292 80" fill="#06B6D4" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. LINHA 1 (6 KPI Cards): Pessoas Alcançadas, Comunidades, Territórios, Países, Iniciativas, Parceiros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-3.5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              id={`kpi-impact-${kpi.id}`}
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
                <p className="text-xl sm:text-2xl font-extrabold text-[#0D1E3A] font-['Outfit'] tracking-tight leading-none">
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
                  onClick={() =>
                    setActiveKpiModal({
                      title: kpi.title,
                      value: kpi.value,
                      growth: kpi.trend,
                      details: kpi.details,
                    })
                  }
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

      {/* 3. LINHA 2 (3 CARDS): Evolução do Impacto (45%), Impacto por Dimensão (27%), Presença Global (28%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Card 1: Evolução do Impacto Global (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-[#0D1E3A]">Evolução do Impacto Global</h3>
              <div className="relative">
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value as any)}
                  className="text-[10.5px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1 pr-5 cursor-pointer focus:outline-none appearance-none"
                >
                  <option value="Últimos 12 meses">Últimos 12 meses</option>
                  <option value="Últimos 6 meses">Últimos 6 meses</option>
                  <option value="Ano Corrente">Ano Corrente</option>
                  <option value="Desde o Início">Desde o Início</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">
              Crescimento do impacto agregado da plataforma ao longo do tempo.
            </p>

            {/* Gráfico de Evolução com Tooltip no mês de Maio */}
            <div className="relative w-full h-[190px] pt-4">
              <svg viewBox="0 0 450 170" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="impact-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[20, 55, 90, 125, 155].map((y, idx) => (
                  <line key={idx} x1="35" y1={y} x2="440" y2={y} stroke="#F1F5F9" strokeWidth="1" />
                ))}

                {/* Y-Axis Labels */}
                <text x="5" y="24" fontSize="9" fill="#94A3B8" fontWeight="500">3M</text>
                <text x="5" y="59" fontSize="9" fill="#94A3B8" fontWeight="500">2.25M</text>
                <text x="5" y="94" fontSize="9" fill="#94A3B8" fontWeight="500">1.5M</text>
                <text x="5" y="129" fontSize="9" fill="#94A3B8" fontWeight="500">750K</text>
                <text x="18" y="159" fontSize="9" fill="#94A3B8" fontWeight="500">0</text>

                {/* Area Fill */}
                <path
                  d="M 45 145 C 75 140, 100 138, 125 130 C 155 120, 185 110, 215 95 C 245 80, 275 80, 305 75 C 335 70, 365 65, 395 55 L 430 45 L 430 155 L 45 155 Z"
                  fill="url(#impact-gradient)"
                />

                {/* Line Path */}
                <path
                  d="M 45 145 C 75 140, 100 138, 125 130 C 155 120, 185 110, 215 95 C 245 80, 275 80, 305 75 C 335 70, 365 65, 395 55 L 430 45"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                {[
                  { x: 45, y: 145, m: 'Jun' },
                  { x: 75, y: 140, m: 'Jul' },
                  { x: 105, y: 135, m: 'Ago' },
                  { x: 135, y: 128, m: 'Set' },
                  { x: 165, y: 118, m: 'Out' },
                  { x: 195, y: 105, m: 'Nov' },
                  { x: 225, y: 92, m: 'Dez' },
                  { x: 260, y: 84, m: 'Jan' },
                  { x: 295, y: 78, m: 'Fev' },
                  { x: 330, y: 72, m: 'Mar' },
                  { x: 375, y: 62, m: 'Abr' },
                  { x: 430, y: 45, m: 'Mai' },
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r={pt.m === 'Mai' ? 4 : 2.5} fill="#7C3AED" stroke="#FFFFFF" strokeWidth={pt.m === 'Mai' ? 2 : 1} />
                    <text x={pt.x} y="169" fontSize="8.5" fill="#64748B" textAnchor="middle">{pt.m}</text>
                  </g>
                ))}

                {/* Tooltip on Mai exactly like screenshot */}
                <g transform="translate(325, 0)">
                  <rect x="0" y="0" width="115" height="38" rx="8" fill="#0D1E3A" />
                  <text x="10" y="16" fontSize="9" fill="#93C5FD" fontWeight="bold">Mai 2025</text>
                  <text x="10" y="29" fontSize="8.5" fill="#FFFFFF">Pessoas alcançadas: 2.847.562</text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Impacto por dimensão (3.5 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0D1E3A]">Impacto por dimensão</h3>
            <p className="text-[11px] text-slate-400 mb-4">
              Distribuição do impacto gerado pela plataforma.
            </p>

            <div className="flex items-center justify-center gap-6 pt-2">
              {/* Donut Chart SVG */}
              <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Ambiental: 36% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="14"
                    strokeDasharray="86 153"
                    strokeDashoffset="0"
                  />
                  {/* Social: 29% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="14"
                    strokeDasharray="69 170"
                    strokeDashoffset="-86"
                  />
                  {/* Económico: 18% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#F97316"
                    strokeWidth="14"
                    strokeDasharray="43 196"
                    strokeDashoffset="-155"
                  />
                  {/* Educação: 10% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="14"
                    strokeDasharray="24 215"
                    strokeDashoffset="-198"
                  />
                  {/* Cultural: 7% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#E11D48"
                    strokeWidth="14"
                    strokeDasharray="17 222"
                    strokeDashoffset="-222"
                  />
                </svg>
              </div>

              {/* Legend List */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span className="text-slate-600 font-medium">Ambiental</span>
                  </div>
                  <span className="font-bold text-slate-800">36%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
                    <span className="text-slate-600 font-medium">Social</span>
                  </div>
                  <span className="font-bold text-slate-800">29%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
                    <span className="text-slate-600 font-medium">Económico</span>
                  </div>
                  <span className="font-bold text-slate-800">18%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]" />
                    <span className="text-slate-600 font-medium">Educação</span>
                  </div>
                  <span className="font-bold text-slate-800">10%</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
                    <span className="text-slate-600 font-medium">Cultural</span>
                  </div>
                  <span className="font-bold text-slate-800">7%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50 mt-4 flex justify-center">
            <button
              onClick={() => onNavigateToTab('relatorios-dados')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group cursor-pointer"
            >
              <span>Ver relatório completo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 3: Presença Global (3.5 cols) */}
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0D1E3A]">Presença Global</h3>
            <p className="text-[11px] text-slate-400 mb-3">
              A plataforma VILA está presente em todos os continentes.
            </p>

            {/* Mapa-Múndi Estilizado com nós de presença roxa */}
            <div className="relative w-full h-[130px] flex items-center justify-center">
              <svg viewBox="0 0 320 160" className="w-full h-full opacity-90">
                {/* Continents soft lavender fill */}
                {/* América do Norte */}
                <path d="M40 25 C60 15, 80 20, 100 35 C90 60, 70 80, 50 65 C35 50, 25 35, 40 25 Z" fill="#EDE9FE" />
                {/* América do Sul */}
                <path d="M75 80 C95 85, 105 110, 95 135 C85 150, 70 140, 65 115 C60 95, 65 85, 75 80 Z" fill="#EDE9FE" />
                {/* Europa */}
                <path d="M140 25 C160 20, 175 35, 170 50 C155 55, 140 45, 135 35 Z" fill="#EDE9FE" />
                {/* África */}
                <path d="M140 60 C165 55, 185 75, 180 110 C175 135, 155 135, 145 110 C135 85, 130 65, 140 60 Z" fill="#EDE9FE" />
                {/* Ásia */}
                <path d="M185 20 C230 15, 270 40, 260 75 C240 85, 200 80, 190 55 Z" fill="#EDE9FE" />
                {/* Oceania */}
                <path d="M245 105 C265 100, 280 115, 275 130 C260 140, 245 135, 240 120 Z" fill="#EDE9FE" />

                {/* Hubs / Pulsing Nodes */}
                {[
                  { cx: 70, cy: 45 },
                  { cx: 85, cy: 110 },
                  { cx: 145, cy: 38 },
                  { cx: 160, cy: 85 },
                  { cx: 168, cy: 115 },
                  { cx: 215, cy: 48 },
                  { cx: 250, cy: 60 },
                  { cx: 260, cy: 120 },
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.cx} cy={pt.cy} r="6" fill="#8B5CF6" opacity="0.2" className="animate-ping" />
                    <circle cx={pt.cx} cy={pt.cy} r="3.5" fill="#7C3AED" />
                    <circle cx={pt.cx} cy={pt.cy} r="1.5" fill="#FFFFFF" />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50 mt-4 flex justify-center">
            <button
              onClick={() => onNavigateToTab('territorios-paises')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group cursor-pointer"
            >
              <span>Ver mapa completo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. LINHA 3: Contribuição para os ODS (70%) + Destaques do período (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Contribuição para os ODS (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-[#0D1E3A]">Contribuição da VILA para os ODS</h3>
            <button
              onClick={() => showToast('A abrir catálogo completo dos 17 Objetivos de Desenvolvimento Sustentável')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group cursor-pointer"
            >
              <span>Ver todos os ODS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mb-4">
            A plataforma VILA contribui ativamente para os Objetivos de Desenvolvimento Sustentável.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {odsItems.map((ods, i) => (
              <div
                key={i}
                onClick={() => showToast(`ODS ${ods.number}: ${ods.title} — ${ods.percentage} de progresso consolidado`)}
                className="p-3 border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-2xs transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="text-2xl font-black font-['Outfit']" style={{ color: ods.color }}>
                      {ods.number}
                    </span>
                    <div className="shrink-0">{ods.icon}</div>
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-700 mt-2 line-clamp-2 leading-tight">
                    {ods.title}
                  </h4>
                </div>

                <div className="mt-4">
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: ods.width, backgroundColor: ods.color }}
                    />
                  </div>
                  <div className="text-right text-[10.5px] font-bold text-slate-600 mt-1">
                    {ods.percentage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Destaques do período (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0D1E3A]">Destaques do período</h3>
            <p className="text-[11px] text-slate-400 mb-3">
              Principais marcos alcançados pela plataforma.
            </p>

            <div className="space-y-3 pt-1">
              {[
                { icon: <Users className="w-3.5 h-3.5 text-purple-600" />, text: '+1,2M de novas pessoas alcançadas' },
                { icon: <Handshake className="w-3.5 h-3.5 text-blue-600" />, text: '342 parcerias estratégicas estabelecidas' },
                { icon: <Globe className="w-3.5 h-3.5 text-teal-600" />, text: 'Lançamento em 12 novos países' },
                { icon: <Flag className="w-3.5 h-3.5 text-indigo-600" />, text: '+850 projetos comunitários apoiados' },
                { icon: <Megaphone className="w-3.5 h-3.5 text-purple-600" />, text: '3 grandes campanhas globais realizadas' },
              ].map((m, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    {m.icon}
                  </div>
                  <span className="truncate">{m.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50 mt-4 flex justify-center">
            <button
              onClick={() => showToast('A exibir todos os marcos de impacto histórico')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group cursor-pointer"
            >
              <span>Ver todos os marcos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. LINHA 4: Atividades Recentes com Maior Alcance (70%) + Relatórios e Dados (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Atividades Recentes com Maior Alcance (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-[#0D1E3A]">Atividades Recentes com Maior Alcance</h3>
            <button
              onClick={() => onNavigateToTab('projetos-iniciativas')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group cursor-pointer"
            >
              <span>Ver todas as atividades</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mb-4">
            Principais iniciativas da plataforma que geraram mais impacto recentemente.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {recentActivities.map((act, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateToTab('projetos-iniciativas')}
                className="p-3 border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-2xs transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className={`w-8 h-8 rounded-lg ${act.bg} flex items-center justify-center mb-2.5`}>
                    {act.icon}
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-800 line-clamp-2 leading-tight">
                    {act.title}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-50">
                  <div className="text-[10px] text-slate-400">Pessoas alcançadas</div>
                  <div className="text-sm font-black text-[#0D1E3A] font-['Outfit']">{act.reach}</div>
                  <div className="text-[10.5px] text-slate-500 mt-0.5">{act.countries}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Relatórios e Dados (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0D1E3A]">Relatórios e Dados</h3>
            <p className="text-[11px] text-slate-400 mb-3">
              Aceda a relatórios detalhados e dados abertos da plataforma.
            </p>

            <div className="space-y-2 pt-1">
              {[
                { title: 'Relatório de Impacto Global 2025', icon: <FileText className="w-4 h-4 text-purple-600" /> },
                { title: 'Dados Abertos (Open Data)', icon: <Database className="w-4 h-4 text-purple-600" /> },
                { title: 'Metodologia de Impacto', icon: <Info className="w-4 h-4 text-purple-600" /> },
              ].map((doc, i) => (
                <div
                  key={i}
                  onClick={() => showToast(`A descarregar ficheiro: ${doc.title}`)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold truncate pr-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                      {doc.icon}
                    </div>
                    <span className="truncate">{doc.title}</span>
                  </div>
                  <button className="p-1 text-slate-400 group-hover:text-purple-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50 mt-4 flex justify-center">
            <button
              onClick={() => onNavigateToTab('relatorios-dados')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group cursor-pointer"
            >
              <span>Ver todos os relatórios</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
