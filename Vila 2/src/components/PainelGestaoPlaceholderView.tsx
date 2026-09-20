import React, { useState } from 'react';
import {
  Shield,
  Users,
  MapPin,
  ArrowRight,
  Sliders,
  BarChart3,
  Globe,
  ArrowLeft,
  Eye,
  Heart,
  Package,
  HelpCircle,
  UserCheck,
  LifeBuoy,
  Cpu,
  RefreshCw,
  FolderKanban,
  MessageSquareMore,
  Calendar,
  Send,
  Boxes,
  Settings,
  PlusCircle,
  MessageSquarePlus,
  CalendarPlus,
  FileText,
  AlertTriangle,
  Clock,
  HardDrive,
  Activity,
  CheckCircle2,
  TrendingUp,
  Radio,
  Share2,
  RotateCw,
  Flag,
  Map,
  MessageSquare,
  Server,
} from 'lucide-react';
import { DemoUser } from '../data/demoUsers';
import { BreadcrumbItem } from './Topbar';
import { VisaoGeralView } from './admin/VisaoGeralView';
import { UtilizadoresComunidadesView } from './admin/UtilizadoresComunidadesView';
import { TerritoriosPaisesView } from './admin/TerritoriosPaisesView';
import { ProjetosIniciativasView } from './admin/ProjetosIniciativasView';
import { ParticipacaoConsultasView } from './admin/ParticipacaoConsultasView';
import { EventosGlobaisView } from './admin/EventosGlobaisView';
import { ParceirosColaboracoesView } from './admin/ParceirosColaboracoesView';
import { RecursosInfraestruturaView } from './admin/RecursosInfraestruturaView';
import { RelatoriosDadosView } from './admin/RelatoriosDadosView';
import { ConfiguracoesPlataformaView } from './admin/ConfiguracoesPlataformaView';
import { ImpactoGlobalView } from './ImpactoGlobalView';

interface PainelGestaoPlaceholderViewProps {
  currentUser: DemoUser;
  currentSection?: string;
  onNavigateToTab: (tabId: string) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
  onOpenSupportModal?: () => void;
}

export const PainelGestaoPlaceholderView: React.FC<PainelGestaoPlaceholderViewProps> = ({
  currentUser,
  currentSection = 'painel-gestao',
  onNavigateToTab,
  onBreadcrumbChange,
  onOpenSupportModal,
}) => {
  const [timeFilter, setTimeFilter] = useState('Últimas 24 horas');
  const [alertFilter, setAlertFilter] = useState('Todos');
  const [lastUpdated, setLastUpdated] = useState('10:32:45');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString('pt-PT'));
      setIsRefreshing(false);
    }, 400);
  };

  const getSectionMetadata = () => {
    switch (currentSection) {
      case 'visao-geral':
        return {
          title: 'Visão Geral da Plataforma',
          breadcrumb: 'Visão Geral',
          subtitle: 'Indicadores macro, mapa de operações ativas e tendências de crescimento territorial.',
          badge: 'Módulo: Visão Geral',
          icon: <Globe className="w-5 h-5 text-indigo-400" />,
        };
      case 'gestao-utilizadores':
      case 'utilizadores-comunidades':
      case 'membros':
        return {
          title: 'Utilizadores e Comunidades',
          breadcrumb: 'Utilizadores e Comunidades',
          subtitle: 'Supervisão de contas, assembleias cívicas, moderação comunitária e validação de identidades.',
          badge: 'Módulo: Utilizadores',
          icon: <Users className="w-5 h-5 text-blue-400" />,
        };
      case 'territorios-paises':
      case 'gestao-territorios':
        return {
          title: 'Territórios e Países',
          breadcrumb: 'Territórios e Países',
          subtitle: 'Gestão de divisões administrativas, bairros, freguesias, municípios e conectividade territorial.',
          badge: 'Módulo: Territórios',
          icon: <MapPin className="w-5 h-5 text-cyan-400" />,
        };
      case 'projetos-iniciativas':
      case 'gestao-projetos':
        return {
          title: 'Projetos e Iniciativas',
          breadcrumb: 'Projetos e Iniciativas',
          subtitle: 'Acompanhamento, aprovação e impacto de projetos submetidos pelos cidadãos e comunidades.',
          badge: 'Módulo: Projetos',
          icon: <FolderKanban className="w-5 h-5 text-amber-400" />,
        };
      case 'participacao-consultas':
      case 'gestao-consultas':
        return {
          title: 'Participação e Consultas',
          breadcrumb: 'Participação e Consultas',
          subtitle: 'Orçamentos participativos, consultas públicas, votações cívicas e propostas legislativas locais.',
          badge: 'Módulo: Consultas',
          icon: <MessageSquareMore className="w-5 h-5 text-rose-400" />,
        };
      case 'eventos-globais-admin':
      case 'gestao-eventos':
        return {
          title: 'Eventos Globais',
          breadcrumb: 'Eventos Globais',
          subtitle: 'Calendário institucional, moderação de cimeiras e conferências cívicas territoriais.',
          badge: 'Módulo: Eventos',
          icon: <Calendar className="w-5 h-5 text-emerald-400" />,
        };
      case 'gestao-parceiros':
      case 'parceiros-colaboracoes':
        return {
          title: 'Parceiros e Colaborações',
          breadcrumb: 'Parceiros e Colaborações',
          subtitle: 'Alianças institucionais, governos locais, universidades, ONGs e setor privado sustentável.',
          badge: 'Módulo: Parceiros',
          icon: <Send className="w-5 h-5 text-pink-400" />,
        };
      case 'gestao-recursos':
      case 'recursos-infraestrutura':
      case 'recursos':
        return {
          title: 'Recursos e Infraestrutura',
          breadcrumb: 'Recursos e Infraestrutura',
          subtitle: 'Monitorização técnica em tempo real: servidores, consumo de IA, APIs e telemetria.',
          badge: 'Módulo: Recursos',
          icon: <Boxes className="w-5 h-5 text-purple-400" />,
        };
      case 'relatorios-dados':
      case 'gestao-relatorios':
        return {
          title: 'Relatórios e Dados',
          breadcrumb: 'Relatórios e Dados',
          subtitle: 'Exportação de dados cívicos abertos, relatórios de impacto territorial e inteligência estatística.',
          badge: 'Módulo: Relatórios',
          icon: <BarChart3 className="w-5 h-5 text-teal-400" />,
        };
      case 'configuracoes-plataforma':
      case 'gestao-configuracoes':
        return {
          title: 'Configurações da Plataforma',
          breadcrumb: 'Configurações',
          subtitle: 'Políticas de segurança, parâmetros de governança, permissões de administradores e integrações.',
          badge: 'Módulo: Configurações',
          icon: <Settings className="w-5 h-5 text-slate-400 dark:text-slate-500" />,
        };
      case 'impacto-global-plataforma':
      case 'gestao-impacto':
      case 'impacto-plataforma':
        return {
          title: 'Impacto Global da Plataforma VILA',
          breadcrumb: 'Impacto Global',
          subtitle: 'Visão geral do impacto coletivo gerado pela plataforma VILA e pela sua rede global de pessoas, comunidades e territórios.',
          badge: 'Módulo: Impacto Global',
          icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
        };
      case 'gestao-suporte':
      case 'suporte':
        return {
          title: 'Suporte e Atendimento da Plataforma',
          breadcrumb: 'Suporte',
          subtitle: 'Canal direto e prioritário de assistência técnica para administradores e moderadores.',
          badge: 'Módulo: Suporte Operacional',
          icon: <HelpCircle className="w-5 h-5 text-amber-400" />,
        };
      case 'painel-gestao':
      case 'gestao':
      case 'admin':
      default:
        return {
          title: 'Painel de Gestão',
          breadcrumb: 'Painel de Gestão',
          subtitle: 'Monitorização operacional em tempo real da plataforma VILA. Acompanhe atividades, serviços, alertas e ações em curso.',
          badge: 'Painel Principal',
          icon: <UserCheck className="w-5 h-5 text-purple-400" />,
        };
    }
  };

  const meta = getSectionMetadata();
  const onBreadcrumbChangeRef = React.useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;
  const onNavigateToTabRef = React.useRef(onNavigateToTab);
  onNavigateToTabRef.current = onNavigateToTab;

  React.useEffect(() => {
    if (
      currentSection === 'visao-geral' ||
      currentSection === 'gestao-utilizadores' ||
      currentSection === 'utilizadores-comunidades' ||
      currentSection === 'membros' ||
      currentSection === 'territorios-paises' ||
      currentSection === 'gestao-territorios' ||
      currentSection === 'paises' ||
      currentSection === 'projetos-iniciativas' ||
      currentSection === 'gestao-projetos' ||
      currentSection === 'projetos' ||
      currentSection === 'participacao-consultas' ||
      currentSection === 'gestao-consultas' ||
      currentSection === 'eventos-globais-admin' ||
      currentSection === 'gestao-eventos' ||
      currentSection === 'eventos-globais' ||
      currentSection === 'gestao-parceiros' ||
      currentSection === 'parceiros-colaboracoes' ||
      currentSection === 'parceiros' ||
      currentSection === 'gestao-recursos' ||
      currentSection === 'recursos-infraestrutura' ||
      currentSection === 'recursos' ||
      currentSection === 'gestao-relatorios' ||
      currentSection === 'relatorios-dados' ||
      currentSection === 'relatorios' ||
      currentSection === 'configuracoes-plataforma' ||
      currentSection === 'gestao-configuracoes' ||
      currentSection === 'configuracoes' ||
      currentSection === 'impacto-global-plataforma' ||
      currentSection === 'gestao-impacto' ||
      currentSection === 'impacto-plataforma' ||
      currentSection === 'impacto' ||
      currentSection === 'impacto-global'
    ) return;
    onBreadcrumbChangeRef.current?.([
      { label: 'Plataforma VILA', onClick: () => onNavigateToTabRef.current('painel-gestao') },
      { label: meta.breadcrumb },
    ]);
  }, [meta.breadcrumb, currentSection]);

  // Se a secção for Visão Geral, renderiza a tela completa com fidelidade visual à referência UI VISAO GERAL.png
  if (currentSection === 'visao-geral') {
    return (
      <VisaoGeralView
        currentUser={currentUser}
        onNavigateToTab={onNavigateToTab}
        onBreadcrumbChange={onBreadcrumbChange}
      />
    );
  }

  // Se a secção for Utilizadores e Comunidades, renderiza a tela completa com fidelidade visual à referência UI UTILIZADORES E COMUNIDADES.png
  if (
    currentSection === 'gestao-utilizadores' ||
    currentSection === 'utilizadores-comunidades' ||
    currentSection === 'membros'
  ) {
    return (
      <UtilizadoresComunidadesView
        currentUser={currentUser}
        onNavigateToTab={onNavigateToTab}
        onBreadcrumbChange={onBreadcrumbChange}
        onOpenSupportModal={onOpenSupportModal}
      />
    );
  }

  // Se a secção for Territórios e Países, renderiza a tela completa com fidelidade visual à referência UI TERRITÓRIOS E PAÍSES
  if (
    currentSection === 'territorios-paises' ||
    currentSection === 'gestao-territorios' ||
    currentSection === 'paises'
  ) {
    return (
      <TerritoriosPaisesView
        currentUser={currentUser}
        onNavigateToTab={onNavigateToTab}
        onBreadcrumbChange={onBreadcrumbChange}
        onOpenSupportModal={onOpenSupportModal}
      />
    );
  }

  // Se a secção for Projetos e Iniciativas, renderiza a tela completa com fidelidade visual à referência UI PROJETOS E INICIATIVAS
  if (
    currentSection === 'projetos-iniciativas' ||
    currentSection === 'gestao-projetos' ||
    currentSection === 'projetos'
  ) {
    return (
      <ProjetosIniciativasView
        currentUser={currentUser}
        onNavigateToTab={onNavigateToTab}
        onBreadcrumbChange={onBreadcrumbChange}
        onOpenSupportModal={onOpenSupportModal}
      />
    );
  }

  // Se a secção for Participação e Consultas, renderiza a tela completa com fidelidade visual à referência UI PARTICIPAÇÃO E CONSULTAS
  if (
    currentSection === 'participacao-consultas' ||
    currentSection === 'gestao-consultas'
  ) {
    return (
      <ParticipacaoConsultasView
        currentUser={currentUser}
        onNavigateToTab={onNavigateToTab}
        onBreadcrumbChange={onBreadcrumbChange}
        onOpenSupportModal={onOpenSupportModal}
      />
    );
  }

  // Se a secção for Eventos Globais, renderiza a tela completa com fidelidade visual à referência UI EVENTOS GLOBAIS
  if (
    currentSection === 'eventos-globais-admin' ||
    currentSection === 'gestao-eventos' ||
    currentSection === 'eventos-globais'
  ) {
    return (
      <EventosGlobaisView
        currentUser={currentUser}
        onNavigateToTab={onNavigateToTab}
        onBreadcrumbChange={onBreadcrumbChange}
        onOpenSupportModal={onOpenSupportModal}
      />
    );
  }

  // Se a secção for Parceiros e Colaborações, renderiza a tela completa com fidelidade visual à referência UI PARCEIROS E COLABORAÇÕES
  if (
    currentSection === 'gestao-parceiros' ||
    currentSection === 'parceiros-colaboracoes' ||
    currentSection === 'parceiros'
  ) {
    return (
      <ParceirosColaboracoesView
        currentUser={currentUser}
        onNavigateToTab={onNavigateToTab}
        onBreadcrumbChange={onBreadcrumbChange}
        onOpenSupportModal={onOpenSupportModal}
      />
    );
  }

  // Se a secção for Recursos e Infraestrutura, renderiza a tela completa com fidelidade visual à referência UI RECURSOS E INFRAESTRUTURA
  if (
    currentSection === 'gestao-recursos' ||
    currentSection === 'recursos-infraestrutura' ||
    currentSection === 'recursos'
  ) {
    return (
      <RecursosInfraestruturaView
        currentUser={currentUser}
        onNavigateToTab={onNavigateToTab}
        onBreadcrumbChange={onBreadcrumbChange}
        onOpenSupportModal={onOpenSupportModal}
      />
    );
  }

  // Se a secção for Relatórios e Dados, renderiza a tela completa com fidelidade visual à referência UI RELATORIOS E DADOS
  if (
    currentSection === 'gestao-relatorios' ||
    currentSection === 'relatorios-dados' ||
    currentSection === 'relatorios'
  ) {
    return (
      <RelatoriosDadosView
        currentUser={currentUser}
        onNavigateToTab={onNavigateToTab}
        onBreadcrumbChange={onBreadcrumbChange}
        onOpenSupportModal={onOpenSupportModal}
      />
    );
  }

  // Se a secção for Configurações, renderiza a tela completa com fidelidade visual à referência UI CONFIGURACOES
  if (
    currentSection === 'configuracoes-plataforma' ||
    currentSection === 'gestao-configuracoes' ||
    currentSection === 'configuracoes'
  ) {
    return (
      <ConfiguracoesPlataformaView
        currentUser={currentUser}
        onNavigateToTab={onNavigateToTab}
        onBreadcrumbChange={onBreadcrumbChange}
        onOpenSupportModal={onOpenSupportModal}
      />
    );
  }

  // Se a secção for Impacto Global, renderiza a tela completa com fidelidade visual à referência UI IMPACTO GLOBAL
  if (
    currentSection === 'impacto-global-plataforma' ||
    currentSection === 'gestao-impacto' ||
    currentSection === 'impacto-plataforma' ||
    currentSection === 'impacto' ||
    currentSection === 'impacto-global'
  ) {
    return (
      <ImpactoGlobalView
        currentUser={currentUser}
        onNavigateToTab={onNavigateToTab}
        onBreadcrumbChange={onBreadcrumbChange}
      />
    );
  }

  // Se não for o Painel de Gestão principal, exibe a visualização de gestão específica
  if (currentSection !== 'painel-gestao' && currentSection !== 'gestao' && currentSection !== 'admin') {
    return (
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header do Módulo Administrativo */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans">
          <div className="space-y-1.5 font-sans">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20 text-xs font-bold font-sans">
              <Shield className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>{meta.badge}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 font-sans tracking-tight">
              {meta.title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed font-sans">
              {meta.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {(currentSection === 'gestao-suporte' || currentSection === 'suporte') && onOpenSupportModal && (
              <button
                type="button"
                onClick={onOpenSupportModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#5B21B6] hover:bg-purple-700 shadow-xs transition-colors cursor-pointer"
              >
                <LifeBuoy className="w-4 h-4" />
                <span>Abrir Modal de Suporte</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => onNavigateToTab('painel-gestao')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Painel de Gestão</span>
            </button>
          </div>
        </div>

        {/* Conteúdo Contextual do Módulo */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold">
                {meta.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Operações e Gestão Ativa</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Módulo integrado à infraestrutura da Plataforma VILA com autoridade no escopo <strong>{currentUser.scope}</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Sincronização em Tempo Real</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                As alterações realizadas pelos administradores refletem imediatamente em todas as assembleias e vilas ativas.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Privilégios de Administrador</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Sessão autorizada para <strong>{currentUser.name}</strong> ({currentUser.roleLabel}).
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Visualização Principal: Painel de Gestão (alinhado rigorosamente aos traços de ExploreWorldView)
  const KPI_STATS = [
    {
      id: 'kpi-users-online',
      title: 'Utilizadores Online',
      subtitle: '',
      value: '4.382',
      delta: '↑ 12%',
      deltaLabel: 'vs ontem',
      deltaType: 'positive' as const,
      icon: Users,
      iconBg: 'bg-purple-50/90 dark:bg-purple-500/10',
      iconColor: 'text-[#5B21B6]',
      borderColor: 'border-purple-100/70 dark:border-purple-500/20',
      tab: 'gestao-utilizadores',
    },
    {
      id: 'kpi-new-users',
      title: 'Novos Utilizadores',
      subtitle: '(Hoje)',
      value: '1.248',
      delta: '↑ 18%',
      deltaLabel: 'vs ontem',
      deltaType: 'positive' as const,
      icon: Users,
      iconBg: 'bg-emerald-50/90 dark:bg-emerald-500/10',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-100/70 dark:border-emerald-500/20',
      tab: 'gestao-utilizadores',
    },
    {
      id: 'kpi-new-communities',
      title: 'Novas Comunidades',
      subtitle: '(Hoje)',
      value: '14',
      delta: '↑ 7%',
      deltaLabel: 'vs ontem',
      deltaType: 'positive' as const,
      icon: Flag,
      iconBg: 'bg-blue-50/90 dark:bg-blue-500/10',
      iconColor: 'text-[#1455AC]',
      borderColor: 'border-blue-100/70 dark:border-blue-500/20',
      tab: 'gestao-utilizadores',
    },
    {
      id: 'kpi-new-projects',
      title: 'Novos Projetos',
      subtitle: '(Hoje)',
      value: '28',
      delta: '↑ 22%',
      deltaLabel: 'vs ontem',
      deltaType: 'positive' as const,
      icon: Map,
      iconBg: 'bg-amber-50/90 dark:bg-amber-500/10',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-100/70 dark:border-amber-500/20',
      tab: 'projetos-iniciativas',
    },
    {
      id: 'kpi-active-consultations',
      title: 'Consultas Ativas',
      subtitle: '',
      value: '25',
      badge: 'Ativas',
      deltaLabel: 'em debate',
      deltaType: 'neutral' as const,
      icon: MessageSquare,
      iconBg: 'bg-rose-50/90 dark:bg-rose-500/10',
      iconColor: 'text-rose-600 dark:text-rose-400',
      borderColor: 'border-rose-100/70 dark:border-rose-500/20',
      tab: 'participacao-consultas',
    },
    {
      id: 'kpi-active-events',
      title: 'Eventos Ativos',
      subtitle: '',
      value: '12',
      badge: 'Agendados',
      deltaLabel: 'este mês',
      deltaType: 'neutral' as const,
      icon: Calendar,
      iconBg: 'bg-sky-50/90 dark:bg-sky-500/10',
      iconColor: 'text-sky-600 dark:text-sky-400',
      borderColor: 'border-sky-100/70 dark:border-sky-500/20',
      tab: 'eventos-globais-admin',
    },
    {
      id: 'kpi-pending-tasks',
      title: 'Tarefas Pendentes',
      subtitle: '',
      value: '36',
      badge: 'Pendente',
      deltaLabel: 'ação requerida',
      deltaType: 'warning' as const,
      icon: FileText,
      iconBg: 'bg-purple-50/90 dark:bg-purple-500/10',
      iconColor: 'text-[#5B21B6]',
      borderColor: 'border-purple-100/70 dark:border-purple-500/20',
      tab: 'painel-gestao',
    },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6 animate-in fade-in duration-200">
      {/* 1. Header do Painel de Gestão com os traços refinados de ExploreWorld */}
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-1">
        <div className="flex items-start gap-3.5">
          {/* Quadrant Icon */}
          <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] border border-purple-200/80 dark:border-purple-500/20 flex items-center justify-center text-[#5B21B6] shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#5B21B6]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="2" />
              <rect x="14" y="3" width="7" height="7" rx="2" />
              <rect x="3" y="14" width="7" height="7" rx="2" />
              <rect x="14" y="14" width="7" height="7" rx="2" />
              <path d="M6.5 6.5v1M17.5 6.5v1M6.5 17.5v1M17.5 17.5v1" strokeWidth="2.5" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 font-sans tracking-tight">
              Painel de Gestão
            </h1>
            <p className="text-xs sm:text-[13px] text-[#64748B] dark:text-slate-400 mt-1 font-normal leading-relaxed">
              Monitorização operacional em tempo real da plataforma VILA.
              <br className="hidden sm:inline" /> Acompanhe atividades, serviços, alertas e ações em curso.
            </p>
          </div>
        </div>

        {/* Painel Consolidado de Status + Ação Atualizar (mesmo traço do header de ExploreWorld) */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 sm:px-4 py-2 shadow-2xs shrink-0 self-start xl:self-center flex-wrap sm:flex-nowrap font-sans">
          <div className="text-xs text-[#64748B] dark:text-slate-400 font-medium pr-3 border-r border-slate-200 dark:border-slate-700">
            Última atualização: <strong className="text-slate-900 dark:text-slate-50 font-bold font-mono">{lastUpdated}</strong>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-900 dark:text-slate-50 font-semibold pr-3 border-r border-slate-200 dark:border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span>Dados em tempo real</span>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            id="btn-refresh-painel"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-purple-200 dark:border-purple-500/20 bg-purple-50 dark:bg-purple-500/10 hover:bg-[#5B21B6] hover:text-white text-xs font-bold text-[#5B21B6] transition-all cursor-pointer shadow-2xs group font-sans"
          >
            <span>Atualizar</span>
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          </button>
        </div>
      </header>

      {/* 2. 7 KPI Stat Cards - Layout sem cortes nem truncamentos, seguindo os traços de ExploreWorldView */}
      <section className="w-full font-sans" id="faixa-kpis-gestao">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-3.5 font-sans">
          {KPI_STATS.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.id}
                id={kpi.id}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-3 sm:p-3.5 shadow-2xs hover:shadow-xs hover:border-purple-200 transition-all duration-200 flex flex-col justify-between group min-w-0 font-sans"
              >
                {/* Linha Superior: Ícone + Indicador/Delta */}
                <div className="flex items-center justify-between gap-1.5">
                  <div className={`w-8 h-8 rounded-xl ${kpi.iconBg} ${kpi.iconColor} ${kpi.borderColor} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs`}>
                    <Icon className="w-4 h-4" strokeWidth={2.2} />
                  </div>
                  {kpi.delta ? (
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/90 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                      {kpi.delta}
                    </span>
                  ) : kpi.badge ? (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap ${
                      kpi.deltaType === 'warning'
                        ? 'text-amber-700 dark:text-amber-400 bg-amber-50/90 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-500/20'
                        : 'text-slate-600 dark:text-slate-400 bg-slate-50/90 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700'
                    }`}>
                      {kpi.badge}
                    </span>
                  ) : null}
                </div>

                {/* Conteúdo Central: Métrica de Alto Impacto + Rótulo com Quebra Natural (sem elipses) */}
                <div className="mt-3 font-sans">
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 font-sans tracking-tight leading-none">
                    {kpi.value}
                  </p>
                  <p className="text-[11.5px] font-semibold text-[#64748B] dark:text-slate-400 mt-1.5 leading-snug whitespace-normal break-words min-h-[32px] flex items-center font-sans">
                    <span>
                      {kpi.title}{' '}
                      {kpi.subtitle && (
                        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 block sm:inline">
                          {kpi.subtitle}
                        </span>
                      )}
                    </span>
                  </p>
                  <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-0.5 font-sans">
                    {kpi.deltaLabel}
                  </p>
                </div>

                {/* Rodapé: Divisor com link e transição suave */}
                <div className="pt-2 mt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between font-sans">
                  <button
                    type="button"
                    onClick={() => onNavigateToTab(kpi.tab)}
                    className="text-[11px] font-semibold text-[#5B21B6] hover:text-purple-800 inline-flex items-center gap-1 transition-colors cursor-pointer group-hover:underline font-sans"
                  >
                    <span>Ver detalhes</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Middle Row: Atividade em Tempo Real, Atividades Recentes, Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 font-sans">
        {/* Atividade em Tempo Real */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-200 group font-sans">
          <div>
            <div className="flex items-center justify-between font-sans">
              <h2 className="text-sm sm:text-[15px] font-extrabold text-slate-900 dark:text-slate-50 font-sans tracking-tight">Atividade em Tempo Real</h2>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1 text-slate-700 dark:text-slate-300 cursor-pointer font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-sans"
              >
                <option>Últimas 24 horas</option>
                <option>Últimos 7 dias</option>
                <option>Último mês</option>
              </select>
            </div>

            {/* Legenda */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-[11px] font-sans">
              <span className="flex items-center gap-1.5 text-[#64748B] dark:text-slate-400 font-medium font-sans">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
                Utilizadores
              </span>
              <span className="flex items-center gap-1.5 text-[#64748B] dark:text-slate-400 font-medium font-sans">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Comunidades
              </span>
              <span className="flex items-center gap-1.5 text-[#64748B] dark:text-slate-400 font-medium font-sans">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1455AC]" />
                Projetos
              </span>
              <span className="flex items-center gap-1.5 text-[#64748B] dark:text-slate-400 font-medium font-sans">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Consultas
              </span>
            </div>

            {/* Gráfico SVG vetorial multi-linhas suave */}
            <div className="mt-4 relative h-40 w-full">
              <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
                {/* Linhas de grelha horizontal */}
                <line x1="40" y1="20" x2="390" y2="20" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="60" x2="390" y2="60" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="100" x2="390" y2="100" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="140" x2="390" y2="140" stroke="#E2E8F0" strokeWidth="1" />

                {/* Eixo Y */}
                <text x="10" y="24" fontSize="9" fill="#94A3B8" fontWeight="600">2.5K</text>
                <text x="10" y="64" fontSize="9" fill="#94A3B8" fontWeight="600">2K</text>
                <text x="10" y="104" fontSize="9" fill="#94A3B8" fontWeight="600">1.5K</text>
                <text x="10" y="144" fontSize="9" fill="#94A3B8" fontWeight="600">500</text>

                {/* Curva 1: Utilizadores (Roxo) */}
                <path
                  d="M 50 110 Q 100 100 150 70 T 250 65 T 320 50 T 380 40"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="2.2"
                />
                <circle cx="50" cy="110" r="3" fill="#7C3AED" />
                <circle cx="150" cy="70" r="3" fill="#7C3AED" />
                <circle cx="250" cy="65" r="3" fill="#7C3AED" />
                <circle cx="320" cy="50" r="3" fill="#7C3AED" />
                <circle cx="380" cy="40" r="3" fill="#7C3AED" />

                {/* Curva 2: Comunidades (Verde) */}
                <path
                  d="M 50 135 Q 100 120 150 110 T 250 95 T 320 90 T 380 85"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                />
                <circle cx="50" cy="135" r="2.5" fill="#10B981" />
                <circle cx="150" cy="110" r="2.5" fill="#10B981" />
                <circle cx="250" cy="95" r="2.5" fill="#10B981" />
                <circle cx="380" cy="85" r="2.5" fill="#10B981" />

                {/* Curva 3: Projetos (Azul) */}
                <path
                  d="M 50 145 Q 100 135 150 125 T 250 115 T 320 105 T 380 95"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
                <circle cx="50" cy="145" r="2.5" fill="#3B82F6" />
                <circle cx="150" cy="125" r="2.5" fill="#3B82F6" />
                <circle cx="250" cy="115" r="2.5" fill="#3B82F6" />
                <circle cx="380" cy="95" r="2.5" fill="#3B82F6" />

                {/* Curva 4: Consultas (Laranja) */}
                <path
                  d="M 50 150 Q 100 140 150 130 T 250 125 T 320 120 T 380 115"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
                <circle cx="50" cy="150" r="2.5" fill="#F59E0B" />
                <circle cx="250" cy="125" r="2.5" fill="#F59E0B" />
                <circle cx="380" cy="115" r="2.5" fill="#F59E0B" />
              </svg>
            </div>

            {/* Eixo X */}
            <div className="flex justify-between pl-8 text-[9.5px] text-slate-400 dark:text-slate-500 mt-1 font-mono font-medium">
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
              <span>00:00</span>
              <span>04:00</span>
              <span>08:00</span>
              <span>12:00</span>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100/90 dark:border-slate-800 flex items-center justify-end">
            <button
              type="button"
              onClick={() => onNavigateToTab('relatorios-dados')}
              className="text-xs font-semibold text-[#5B21B6] hover:text-purple-800 flex items-center gap-1 cursor-pointer group-hover:underline"
            >
              <span>Ver relatório completo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Atividades Recentes */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-200 group font-sans">
          <div>
            <h2 className="text-sm sm:text-[15px] font-extrabold text-slate-900 dark:text-slate-50 font-sans tracking-tight">Atividades Recentes</h2>

            <div className="mt-3.5 space-y-3 font-sans">
              {[
                {
                  title: 'Nova comunidade criada',
                  desc: 'Jovens pelo Clima - México',
                  time: 'há 2 min',
                  icon: <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
                  bg: 'bg-emerald-50 dark:bg-emerald-500/10',
                },
                {
                  title: 'Projeto submetido para aprovação',
                  desc: 'Mobilidade Urbana Sustentável - Lisboa',
                  time: 'há 5 min',
                  icon: <FolderKanban className="w-3.5 h-3.5 text-[#1455AC]" />,
                  bg: 'bg-blue-50 dark:bg-blue-500/10',
                },
                {
                  title: 'Consulta pública criada',
                  desc: 'Plano de Ação Climática - Porto',
                  time: 'há 7 min',
                  icon: <MessageSquareMore className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />,
                  bg: 'bg-cyan-50 dark:bg-cyan-500/10',
                },
                {
                  title: 'Evento publicado',
                  desc: 'Fórum de Inovação Social - Online',
                  time: 'há 9 min',
                  icon: <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
                  bg: 'bg-amber-50 dark:bg-amber-500/10',
                },
                {
                  title: 'Novo utilizador registado',
                  desc: 'João Silva - Portugal',
                  time: 'há 10 min',
                  icon: <UserCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />,
                  bg: 'bg-indigo-50 dark:bg-indigo-500/10',
                },
              ].map((act, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 text-xs font-sans">
                  <div className="flex items-start gap-2.5 min-w-0 font-sans">
                    <div className={`p-2 rounded-xl ${act.bg} shrink-0 shadow-2xs`}>
                      {act.icon}
                    </div>
                    <div className="min-w-0 font-sans">
                      <div className="font-bold text-slate-900 dark:text-slate-50 truncate font-sans">{act.title}</div>
                      <div className="text-[11.5px] text-[#64748B] dark:text-slate-400 truncate mt-0.5 font-sans">{act.desc}</div>
                    </div>
                  </div>
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500 whitespace-nowrap shrink-0 font-medium font-sans">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end font-sans">
            <button
              type="button"
              onClick={() => onNavigateToTab('painel-gestao')}
              className="text-xs font-semibold text-[#5B21B6] hover:text-purple-800 flex items-center gap-1 cursor-pointer group-hover:underline font-sans"
            >
              <span>Ver todas as atividades</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Alertas e Notificações */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-200 group font-sans">
          <div>
            <div className="flex items-center justify-between font-sans">
              <h2 className="text-sm sm:text-[15px] font-extrabold text-slate-900 dark:text-slate-50 font-sans tracking-tight">Alertas e Notificações</h2>
              <select
                value={alertFilter}
                onChange={(e) => setAlertFilter(e.target.value)}
                className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1 text-slate-700 dark:text-slate-300 cursor-pointer font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-sans"
              >
                <option>Todos</option>
                <option>Críticos</option>
                <option>Pendentes</option>
              </select>
            </div>

            <div className="mt-3.5 space-y-3 font-sans">
              {[
                {
                  title: 'Serviço de IA com alta utilização',
                  desc: 'Utilização acima de 90%',
                  badge: '2',
                  badgeBg: 'bg-rose-100 text-rose-700 dark:text-rose-400',
                  icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />,
                },
                {
                  title: 'Consultas a terminar em breve',
                  desc: '3 consultas terminam nas próximas 24h',
                  badge: '3',
                  badgeBg: 'bg-amber-100 text-amber-700 dark:text-amber-400',
                  icon: <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
                },
                {
                  title: 'Projetos aguardando aprovação',
                  desc: '8 projetos pendentes de revisão',
                  badge: '8',
                  badgeBg: 'bg-amber-100 text-amber-700 dark:text-amber-400',
                  icon: <FolderKanban className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
                },
                {
                  title: 'Eventos com inscrições abertas',
                  desc: '5 eventos com inscrições a fechar',
                  badge: '5',
                  badgeBg: 'bg-blue-100 text-blue-700 dark:text-blue-400',
                  icon: <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
                },
                {
                  title: 'Relatórios agendados',
                  desc: '2 relatórios prontos para gerar',
                  badge: '2',
                  badgeBg: 'bg-purple-100 text-purple-700 dark:text-purple-400',
                  icon: <FileText className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />,
                },
              ].map((alert, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs font-sans">
                  <div className="flex items-start gap-2.5 min-w-0 font-sans">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 shrink-0 shadow-2xs">
                      {alert.icon}
                    </div>
                    <div className="min-w-0 font-sans">
                      <div className="font-bold text-slate-900 dark:text-slate-50 truncate font-sans">{alert.title}</div>
                      <div className="text-[11.5px] text-[#64748B] dark:text-slate-400 truncate mt-0.5 font-sans">{alert.desc}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${alert.badgeBg} font-sans`}>
                    {alert.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end font-sans">
            <button
              type="button"
              onClick={() => onNavigateToTab('painel-gestao')}
              className="text-xs font-semibold text-[#5B21B6] hover:text-purple-800 flex items-center gap-1 cursor-pointer group-hover:underline font-sans"
            >
              <span>Ver todos os alertas</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Saúde da Plataforma, Uso de Recursos, Ações Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 font-sans">
        {/* Saúde da Plataforma */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-4.5 flex flex-col justify-between shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-200 group font-sans">
          <div>
            <div className="flex items-center justify-between font-sans">
              <h2 className="text-sm sm:text-[14.5px] font-bold text-slate-900 dark:text-slate-50 font-sans tracking-tight">Saúde da Plataforma</h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 border border-emerald-200 dark:border-emerald-500/20 shadow-2xs font-sans">
                <span>Sistema Operacional</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-3.5 gap-y-4 mt-4 w-full font-sans">
              {/* Disponibilidade */}
              <div className="min-w-0 flex flex-col justify-between font-sans">
                <div>
                  <div className="text-[10.5px] sm:text-[11px] text-[#64748B] dark:text-slate-400 font-medium leading-snug whitespace-normal break-words min-h-[26px] sm:min-h-[28px] flex items-start font-sans">
                    Disponibilidade
                  </div>
                  <div className="text-sm sm:text-base lg:text-[17px] font-extrabold text-slate-900 dark:text-slate-50 mt-0.5 font-sans tracking-tight leading-none">
                    99,98%
                  </div>
                  <div className="text-[10px] sm:text-[10.5px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 flex items-center gap-0.5 font-sans">
                    ↑ 0,02%
                  </div>
                </div>
                <div className="h-6 sm:h-7 w-full mt-2">
                  <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="spark-disp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="27.5" x2="100" y2="27.5" stroke="#E2E8F0" strokeWidth="0.8" />
                    <path d="M 0,21 L 14,21 L 20,17 L 28,18 L 36,14 L 46,17 L 56,19 L 68,10 L 78,15 L 88,13 L 100,16 L 100,27.5 L 0,27.5 Z" fill="url(#spark-disp)" />
                    <path d="M 0,21 L 14,21 L 20,17 L 28,18 L 36,14 L 46,17 L 56,19 L 68,10 L 78,15 L 88,13 L 100,16" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Tempo de Resposta */}
              <div className="min-w-0 flex flex-col justify-between font-sans">
                <div>
                  <div className="text-[10.5px] sm:text-[11px] text-[#64748B] dark:text-slate-400 font-medium leading-snug whitespace-normal break-words min-h-[26px] sm:min-h-[28px] flex items-start font-sans">
                    Tempo de Resposta (média)
                  </div>
                  <div className="text-sm sm:text-base lg:text-[17px] font-extrabold text-slate-900 dark:text-slate-50 mt-0.5 font-sans tracking-tight leading-none">
                    120ms
                  </div>
                  <div className="text-[10px] sm:text-[10.5px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 flex items-center gap-0.5 font-sans">
                    ↓ 15ms
                  </div>
                </div>
                <div className="h-6 sm:h-7 w-full mt-2">
                  <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="spark-resp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="27.5" x2="100" y2="27.5" stroke="#E2E8F0" strokeWidth="0.8" />
                    <path d="M 0,21 L 12,21 L 18,17 L 28,18 L 38,14 L 48,16 L 58,12 L 68,19 L 78,10 L 88,16 L 100,15 L 100,27.5 L 0,27.5 Z" fill="url(#spark-resp)" />
                    <path d="M 0,21 L 12,21 L 18,17 L 28,18 L 38,14 L 48,16 L 58,12 L 68,19 L 78,10 L 88,16 L 100,15" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Serviços Operacionais */}
              <div className="min-w-0 flex flex-col justify-between font-sans">
                <div>
                  <div className="text-[10.5px] sm:text-[11px] text-[#64748B] dark:text-slate-400 font-medium leading-snug whitespace-normal break-words min-h-[26px] sm:min-h-[28px] flex items-start font-sans">
                    Serviços Operacionais
                  </div>
                  <div className="text-sm sm:text-base lg:text-[17px] font-extrabold text-slate-900 dark:text-slate-50 mt-0.5 font-sans tracking-tight leading-none">
                    98%
                  </div>
                  <div className="text-[10px] sm:text-[10.5px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 flex items-center gap-0.5 font-sans">
                    ↑ 2%
                  </div>
                </div>
                <div className="h-6 sm:h-7 w-full mt-2">
                  <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="spark-serv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="27.5" x2="100" y2="27.5" stroke="#E2E8F0" strokeWidth="0.8" />
                    <path d="M 0,23 L 16,7 L 26,16 L 36,18 L 46,13 L 56,19 L 66,18 L 76,14 L 88,19 L 100,21 L 100,27.5 L 0,27.5 Z" fill="url(#spark-serv)" />
                    <path d="M 0,23 L 16,7 L 26,16 L 36,18 L 46,13 L 56,19 L 66,18 L 76,14 L 88,19 L 100,21" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* APIs Ativas */}
              <div className="min-w-0 flex flex-col justify-between font-sans">
                <div>
                  <div className="text-[10.5px] sm:text-[11px] text-[#64748B] dark:text-slate-400 font-medium leading-snug whitespace-normal break-words min-h-[26px] sm:min-h-[28px] flex items-start font-sans">
                    APIs Ativas
                  </div>
                  <div className="text-sm sm:text-base lg:text-[17px] font-extrabold text-slate-900 dark:text-slate-50 mt-0.5 font-sans tracking-tight leading-none">
                    44 / 50
                  </div>
                  <div className="text-[10px] sm:text-[10.5px] text-[#64748B] dark:text-slate-400 font-semibold mt-0.5 font-sans">
                    88%
                  </div>
                </div>
                <div className="h-6 sm:h-7 w-full mt-2">
                  <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="spark-api" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="27.5" x2="100" y2="27.5" stroke="#E2E8F0" strokeWidth="0.8" />
                    <path d="M 0,21 L 14,14 L 26,18 L 40,12 L 52,9 L 66,14 L 78,11 L 88,16 L 100,15 L 100,27.5 L 0,27.5 Z" fill="url(#spark-api)" />
                    <path d="M 0,21 L 14,14 L 26,18 L 40,12 L 52,9 L 66,14 L 78,11 L 88,16 L 100,15" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end font-sans">
            <button
              type="button"
              onClick={() => onNavigateToTab('gestao-recursos')}
              className="text-[11px] sm:text-xs font-semibold text-[#6D28D9] hover:text-[#5B21B6] flex items-center gap-1 cursor-pointer group-hover:underline font-sans"
            >
              <span>Ver monitorização completa</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Uso de Recursos (Atual) */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-4.5 flex flex-col justify-between shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-200 group font-sans">
          <div>
            <h2 className="text-sm sm:text-[15px] font-extrabold text-slate-900 dark:text-slate-50 font-sans tracking-tight">Uso de Recursos (Atual)</h2>

            <div className="mt-5 space-y-4 font-sans">
              {/* CPU */}
              <div className="flex items-center text-xs font-sans">
                <div className="w-28 sm:w-32 flex items-center gap-2 shrink-0 font-semibold text-slate-700 dark:text-slate-300 font-sans">
                  <Cpu className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span>CPU</span>
                </div>
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mx-3 sm:mx-4 overflow-hidden">
                  <div className="h-full bg-[#5B21B6] rounded-full" style={{ width: '68%' }} />
                </div>
                <div className="text-right text-xs font-bold text-slate-900 dark:text-slate-50 shrink-0 min-w-[36px] font-sans">
                  68%
                </div>
              </div>

              {/* Memória */}
              <div className="flex items-center text-xs font-sans">
                <div className="w-28 sm:w-32 flex items-center gap-2 shrink-0 font-semibold text-slate-700 dark:text-slate-300 font-sans">
                  <Server className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span>Memória</span>
                </div>
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mx-3 sm:mx-4 overflow-hidden">
                  <div className="h-full bg-[#5B21B6] rounded-full" style={{ width: '62%' }} />
                </div>
                <div className="text-right text-xs font-bold text-slate-900 dark:text-slate-50 shrink-0 min-w-[36px] font-sans">
                  62%
                </div>
              </div>

              {/* Armazenamento */}
              <div className="flex items-center text-xs font-sans">
                <div className="w-28 sm:w-32 flex items-center gap-2 shrink-0 font-semibold text-slate-700 dark:text-slate-300 font-sans">
                  <HardDrive className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span>Armazenamento</span>
                </div>
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mx-3 sm:mx-4 overflow-hidden">
                  <div className="h-full bg-[#5B21B6] rounded-full" style={{ width: '71%' }} />
                </div>
                <div className="text-right text-xs shrink-0 whitespace-nowrap font-sans">
                  <span className="font-bold text-slate-900 dark:text-slate-50 font-sans">71%</span>
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500 font-normal ml-1.5 font-sans">6,8 TB / 10 TB</span>
                </div>
              </div>

              {/* Banda de Rede */}
              <div className="flex items-center text-xs font-sans">
                <div className="w-28 sm:w-32 flex items-center gap-2 shrink-0 font-semibold text-slate-700 dark:text-slate-300 font-sans">
                  <Radio className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span>Banda de Rede</span>
                </div>
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mx-3 sm:mx-4 overflow-hidden">
                  <div className="h-full bg-[#5B21B6] rounded-full" style={{ width: '52%' }} />
                </div>
                <div className="text-right text-xs shrink-0 whitespace-nowrap font-sans">
                  <span className="font-bold text-slate-900 dark:text-slate-50 font-sans">52%</span>
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500 font-normal ml-1.5 font-sans">5,2 TB / 10 TB</span>
                </div>
              </div>

              {/* Serviços de IA */}
              <div className="flex items-center text-xs font-sans">
                <div className="w-28 sm:w-32 flex items-center gap-2 shrink-0 font-semibold text-slate-700 dark:text-slate-300 font-sans">
                  <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span>Serviços de IA</span>
                </div>
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full mx-3 sm:mx-4 overflow-hidden">
                  <div className="h-full bg-[#5B21B6] rounded-full" style={{ width: '94%' }} />
                </div>
                <div className="text-right text-xs font-bold text-slate-900 dark:text-slate-50 shrink-0 min-w-[36px] font-sans">
                  94%
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-2 flex items-center justify-end font-sans">
            <button
              type="button"
              onClick={() => onNavigateToTab('gestao-recursos')}
              className="text-xs font-semibold text-[#5B21B6] hover:text-purple-800 flex items-center gap-1 cursor-pointer group-hover:underline font-sans"
            >
              <span>Ver todos os recursos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-4.5 flex flex-col justify-between shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-200 group font-sans">
          <div>
            <h2 className="text-sm sm:text-[15px] font-extrabold text-slate-900 dark:text-slate-50 font-sans tracking-tight">Ações Rápidas</h2>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-4 font-sans">
              <button
                type="button"
                onClick={() => onNavigateToTab('projetos-iniciativas')}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-purple-300 transition-all text-left shadow-2xs group cursor-pointer font-sans"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-[#7C3AED] border border-purple-100 dark:border-purple-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CalendarPlus className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-[12.5px] font-bold text-slate-900 dark:text-slate-50 leading-snug font-sans">Adicionar Projeto</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('participacao-consultas')}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-emerald-300 transition-all text-left shadow-2xs group cursor-pointer font-sans"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquarePlus className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-[12.5px] font-bold text-slate-900 dark:text-slate-50 leading-snug font-sans">Criar Consulta</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('eventos-globais-admin')}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-amber-300 transition-all text-left shadow-2xs group cursor-pointer font-sans"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-[12.5px] font-bold text-slate-900 dark:text-slate-50 leading-snug font-sans">Publicar Evento</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('gestao-utilizadores')}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-300 transition-all text-left shadow-2xs group cursor-pointer font-sans"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] border border-blue-100 dark:border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-[12.5px] font-bold text-slate-900 dark:text-slate-50 leading-snug font-sans">Adicionar Comunidade</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('relatorios-dados')}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-sky-300 transition-all text-left shadow-2xs group cursor-pointer font-sans"
              >
                <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-[12.5px] font-bold text-slate-900 dark:text-slate-50 leading-snug font-sans">Gerar Relatório</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('painel-gestao')}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-orange-300 transition-all text-left shadow-2xs group cursor-pointer font-sans"
              >
                <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquareMore className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-[12.5px] font-bold text-slate-900 dark:text-slate-50 leading-snug font-sans">Enviar Comunicado</span>
              </button>
            </div>
          </div>

          <div className="pt-4 mt-2 flex items-center justify-end">
            <button
              type="button"
              onClick={() => onNavigateToTab('painel-gestao')}
              className="text-xs font-semibold text-[#5B21B6] hover:text-purple-800 flex items-center gap-1 cursor-pointer group-hover:underline"
            >
              <span>Ver todos as ações</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Row de Tabelas: Consultas Públicas Ativas, Projetos Pendentes de Aprovação, Eventos Ativos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Consultas Públicas Ativas */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50">Consultas Públicas Ativas</h2>

            <div className="overflow-x-auto no-scrollbar mt-3">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[10.5px] text-slate-400 dark:text-slate-500 font-semibold">
                    <th className="pb-2">Consulta</th>
                    <th className="pb-2">Território</th>
                    <th className="pb-2">Fim</th>
                    <th className="pb-2 text-right">Participantes</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-100">Plano de Ação Climática 2030</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">Porto, Portugal</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">25 Mai 2025</td>
                    <td className="py-2.5 font-bold text-slate-700 dark:text-slate-300 text-right">1.248</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                        Em curso
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-100">Orçamento Participativo 2025</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">Lisboa, Portugal</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">28 Mai 2025</td>
                    <td className="py-2.5 font-bold text-slate-700 dark:text-slate-300 text-right">2.156</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                        Em curso
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-100">Mobilidade Urbana Sustentável</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">Barcelona, Espanha</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">30 Mai 2025</td>
                    <td className="py-2.5 font-bold text-slate-700 dark:text-slate-300 text-right">856</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                        Em curso
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-100">Estratégia Digital Municipal</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">Curitiba, Brasil</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">01 Jun 2025</td>
                    <td className="py-2.5 font-bold text-slate-700 dark:text-slate-300 text-right">542</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                        Em análise
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToTab('participacao-consultas')}
            className="mt-4 text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-800 flex items-center justify-end gap-1 cursor-pointer"
          >
            <span>Ver todas as consultas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Projetos Pendentes de Aprovação */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50">Projetos Pendentes de Aprovação</h2>

            <div className="overflow-x-auto no-scrollbar mt-3">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[10.5px] text-slate-400 dark:text-slate-500 font-semibold">
                    <th className="pb-2">Projeto</th>
                    <th className="pb-2">Submetido por</th>
                    <th className="pb-2">Data</th>
                    <th className="pb-2 text-right">Prioridade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-100">Parque Verde Comunitário</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">Mun. de Guimarães</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">24 Mai 2025</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20">
                        Alta
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-100">Educação para Todos</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">Associação Saber</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">24 Mai 2025</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                        Média
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-100">Energia Solar nas Escolas</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">Mun. de Lagos</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">23 Mai 2025</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                        Média
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-100">Centro de Inovação Social</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">VILA Labs</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">23 Mai 2025</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        Baixa
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToTab('projetos-iniciativas')}
            className="mt-4 text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-800 flex items-center justify-end gap-1 cursor-pointer"
          >
            <span>Ver todos os projetos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Eventos Ativos */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50">Eventos Ativos</h2>

            <div className="overflow-x-auto no-scrollbar mt-3">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[10.5px] text-slate-400 dark:text-slate-500 font-semibold">
                    <th className="pb-2">Evento</th>
                    <th className="pb-2">Data</th>
                    <th className="pb-2">Local</th>
                    <th className="pb-2 text-right">Inscritos</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-100">Fórum Global de Comunidades</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">26 Mai 2025</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">Lisboa, PT</td>
                    <td className="py-2.5 font-bold text-slate-700 dark:text-slate-300 text-right">1.532</td>
                    <td className="py-2.5 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Ao vivo
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-100">Semana da Sustentabilidade</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">02 Jun 2025</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">Online</td>
                    <td className="py-2.5 font-bold text-slate-700 dark:text-slate-300 text-right">2.378</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                        Em breve
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-100">Cimeira de Inovação Social</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">15 Jun 2025</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400 text-[11px]">Nairóbi, Quênia</td>
                    <td className="py-2.5 font-bold text-slate-700 dark:text-slate-300 text-right">864</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
                        Inscrições abertas
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToTab('eventos-globais-admin')}
            className="mt-4 text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-800 flex items-center justify-end gap-1 cursor-pointer"
          >
            <span>Ver todos os eventos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PainelGestaoPlaceholderView;
