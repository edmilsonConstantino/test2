import React from 'react';
import {
  LayoutGrid,
  Compass,
  Users,
  Flag,
  FolderKanban,
  MessageSquareMore,
  Calendar,
  Send,
  Boxes,
  BarChart3,
  Settings,
  TrendingUp,
  PlusCircle,
  MessageSquarePlus,
  CalendarPlus,
  FileText,
  Sun,
  Moon,
  Bookmark,
  Handshake,
  UserPlus,
  Server,
  Activity,
  Search,
  Bell,
  Clock,
  X,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { Logo } from './Logo';
import { DemoUser } from '../data/demoUsers';
import { useTheme } from '../contexts/ThemeContext';

export interface AdminSidebarProps {
  currentTab: string;
  currentUser?: DemoUser;
  onSelectTab: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenImpactModal?: () => void;
  onOpenSupportModal?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

interface AdminNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  matches?: string[];
  badge?: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  currentUser,
  onSelectTab,
  onOpenSupportModal,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { isDark: isDarkMode, toggleTheme } = useTheme();

  // 12 Navigation items da Plataforma conforme UI de Referência
  const adminNavItems: AdminNavItem[] = [
    {
      id: 'painel-gestao',
      label: 'Painel de Gestão',
      icon: <LayoutGrid className="w-4 h-4" strokeWidth={2.2} />,
      matches: ['painel-gestao', 'gestao', 'admin'],
    },
    {
      id: 'visao-geral',
      label: 'Visão Geral',
      icon: <Compass className="w-4 h-4" strokeWidth={2.2} />,
      matches: ['visao-geral'],
    },
    {
      id: 'gestao-utilizadores',
      label: 'Utilizadores e Comunidades',
      icon: <Users className="w-4 h-4" strokeWidth={2.2} />,
      matches: ['gestao-utilizadores', 'utilizadores-comunidades', 'membros'],
    },
    {
      id: 'territorios-paises',
      label: 'Territórios e Países',
      icon: <Flag className="w-4 h-4" strokeWidth={2.2} />,
      matches: ['territorios-paises', 'gestao-territorios'],
    },
    {
      id: 'projetos-iniciativas',
      label: 'Projetos e Iniciativas',
      icon: <FolderKanban className="w-4 h-4" strokeWidth={2.2} />,
      matches: ['projetos-iniciativas', 'gestao-projetos'],
    },
    {
      id: 'participacao-consultas',
      label: 'Participação e Consultas',
      icon: <MessageSquareMore className="w-4 h-4" strokeWidth={2.2} />,
      matches: ['participacao-consultas', 'gestao-consultas'],
    },
    {
      id: 'eventos-globais-admin',
      label: 'Eventos Globais',
      icon: <Calendar className="w-4 h-4" strokeWidth={2.2} />,
      matches: ['eventos-globais-admin', 'gestao-eventos'],
    },
    {
      id: 'gestao-parceiros',
      label: 'Parceiros e Colaborações',
      icon: <Send className="w-4 h-4" strokeWidth={2.2} />,
      matches: ['gestao-parceiros', 'parceiros-colaboracoes'],
    },
    {
      id: 'gestao-recursos',
      label: 'Recursos e Infraestrutura',
      icon: <Boxes className="w-4 h-4" strokeWidth={2.2} />,
      matches: ['gestao-recursos', 'recursos-infraestrutura', 'recursos'],
    },
    {
      id: 'relatorios-dados',
      label: 'Relatórios e Dados',
      icon: <BarChart3 className="w-4 h-4" strokeWidth={2.2} />,
      matches: ['relatorios-dados', 'gestao-relatorios'],
    },
    {
      id: 'configuracoes-plataforma',
      label: 'Configurações',
      icon: <Settings className="w-4 h-4" strokeWidth={2.2} />,
      matches: ['configuracoes-plataforma', 'gestao-configuracoes', 'configuracoes'],
    },
    {
      id: 'impacto-global-plataforma',
      label: 'Impacto Global',
      icon: <TrendingUp className="w-4 h-4" strokeWidth={2.2} />,
      matches: ['impacto-global-plataforma', 'gestao-impacto', 'impacto-plataforma'],
    },
  ];

  // 4 Atalhos rápidos da Plataforma conforme UI de Referência
  const isEventsTab = currentTab === 'eventos-globais-admin' || currentTab === 'gestao-eventos';
  const isPartnersTab = currentTab === 'gestao-parceiros' || currentTab === 'parceiros-colaboracoes';
  const isResourcesTab = currentTab === 'gestao-recursos' || currentTab === 'recursos-infraestrutura' || currentTab === 'recursos';
  const isReportsTab = currentTab === 'relatorios-dados' || currentTab === 'gestao-relatorios' || currentTab === 'relatorios';
  const isSettingsTab = currentTab === 'configuracoes-plataforma' || currentTab === 'gestao-configuracoes' || currentTab === 'configuracoes';
  const isImpactTab = currentTab === 'impacto-global-plataforma' || currentTab === 'gestao-impacto' || currentTab === 'impacto-plataforma' || currentTab === 'impacto' || currentTab === 'impacto-global';

  const quickActions = isImpactTab
    ? [
        {
          id: 'action-impact-reports',
          label: 'Relatórios e Dados',
          icon: <Search className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'impacto-global-plataforma',
        },
        {
          id: 'action-global-presence',
          label: 'Presença Global',
          icon: <Search className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'impacto-global-plataforma',
        },
        {
          id: 'action-ods-contribution',
          label: 'Contribuição ODS',
          icon: <Search className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'impacto-global-plataforma',
        },
        {
          id: 'action-recent-activities',
          label: 'Atividades Recentes',
          icon: <Search className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'impacto-global-plataforma',
        },
        {
          id: 'action-impact-methodology',
          label: 'Metodologia de Impacto',
          icon: <Search className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'impacto-global-plataforma',
        },
      ]
    : isSettingsTab
    ? [
        {
          id: 'action-org-profile',
          label: 'Perfil da Organização',
          icon: <Search className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'configuracoes-plataforma',
        },
        {
          id: 'action-teams-mgmt',
          label: 'Gestão de Equipas',
          icon: <Search className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'configuracoes-plataforma',
        },
        {
          id: 'action-plans-billing',
          label: 'Planos e Faturação',
          icon: <Search className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'configuracoes-plataforma',
        },
        {
          id: 'action-help-center',
          label: 'Centro de Ajuda',
          icon: <Search className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'configuracoes-plataforma',
        },
        {
          id: 'action-documentation',
          label: 'Documentação',
          icon: <Search className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'configuracoes-plataforma',
        },
      ]
    : isReportsTab
    ? [
        {
          id: 'action-generate-report',
          label: 'Gerar Relatório',
          icon: <FileText className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'relatorios-dados',
        },
        {
          id: 'action-explore-data',
          label: 'Explorar Dados',
          icon: <Search className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'relatorios-dados',
        },
        {
          id: 'action-schedule-report',
          label: 'Agendar Relatório',
          icon: <Clock className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'relatorios-dados',
        },
        {
          id: 'action-alerts-notifications',
          label: 'Alertas e Notificações',
          icon: <Bell className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'relatorios-dados',
        },
        {
          id: 'action-my-reports',
          label: 'Meus Relatórios',
          icon: <Bookmark className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'relatorios-dados',
        },
      ]
    : isResourcesTab
    ? [
        {
          id: 'action-add-resource',
          label: 'Adicionar Recurso',
          icon: <PlusCircle className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'gestao-recursos',
        },
        {
          id: 'action-manage-infrastructure',
          label: 'Gerir Infraestrutura',
          icon: <Server className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'gestao-recursos',
        },
        {
          id: 'action-manage-systems',
          label: 'Gestão de Sistemas',
          icon: <Boxes className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'gestao-recursos',
        },
        {
          id: 'action-monitoring',
          label: 'Monitorização',
          icon: <Activity className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'gestao-recursos',
        },
      ]
    : isPartnersTab
    ? [
        {
          id: 'action-add-partner',
          label: 'Adicionar Parceiro',
          icon: <UserPlus className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'gestao-parceiros',
        },
        {
          id: 'action-propose-collab',
          label: 'Propor Colaboração',
          icon: <Handshake className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'gestao-parceiros',
        },
        {
          id: 'action-manage-partnerships',
          label: 'Gerir Parcerias',
          icon: <Boxes className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'gestao-parceiros',
        },
        {
          id: 'action-generate-report',
          label: 'Gerar Relatório',
          icon: <FileText className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'relatorios-dados',
        },
      ]
    : isEventsTab
    ? [
        {
          id: 'action-create-event',
          label: 'Criar Evento',
          icon: <PlusCircle className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'eventos-globais-admin',
        },
        {
          id: 'action-global-calendar',
          label: 'Calendário Global',
          icon: <Calendar className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'eventos-globais-admin',
        },
        {
          id: 'action-my-events',
          label: 'Meus Eventos',
          icon: <Bookmark className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'eventos-globais-admin',
        },
        {
          id: 'action-generate-report',
          label: 'Gerar Relatório',
          icon: <FileText className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'relatorios-dados',
        },
      ]
    : [
        {
          id: 'action-create-consultation',
          label: 'Criar Consulta',
          icon: <MessageSquarePlus className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'participacao-consultas',
        },
        {
          id: 'action-create-initiative',
          label: 'Criar Iniciativa',
          icon: <PlusCircle className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'projetos-iniciativas',
        },
        {
          id: 'action-publish-call',
          label: 'Publicar Chamada',
          icon: <CalendarPlus className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'eventos-globais-admin',
        },
        {
          id: 'action-generate-report',
          label: 'Gerar Relatório',
          icon: <FileText className="w-3.5 h-3.5 text-blue-600" />,
          targetTab: 'relatorios-dados',
        },
      ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-35 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Admin Sidebar Container - Width ~240px */}
      <aside
        id="admin-sidebar"
        className={`fixed top-0 left-0 bottom-0 z-40 w-[240px] h-screen max-h-[100dvh] bg-white dark:bg-slate-950 border-r border-slate-200/90 dark:border-slate-700 px-3 py-2.5 flex flex-col justify-between select-none overflow-y-auto no-scrollbar transition-transform duration-300 ease-in-out shadow-xs ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* 1. Header: Logotipo VILA com Marca "PLATAFORMA VILA" */}
        <div className="shrink-0 flex flex-col gap-2 px-1.5 pb-2 pt-0.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start justify-between">
            <button
              type="button"
              onClick={() => onSelectTab('inicio')}
              className="text-left cursor-pointer hover:opacity-90 transition-opacity"
              title="Voltar ao Portal do Cidadão"
            >
              <Logo size="sm" />
            </button>
            {isMobileOpen && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="md:hidden p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                aria-label="Fechar menu"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Section Brand Tag: PLATAFORMA VILA */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
              PLATAFORMA VILA
            </span>
            <span className="inline-flex items-center gap-1 text-[8.5px] font-bold px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-700 border border-blue-200">
              <ShieldCheck className="w-2.5 h-2.5" />
              <span>Admin</span>
            </span>
          </div>
        </div>

        {/* 2. Menu de Navegação da Plataforma (12 itens) */}
        <nav
          className="flex-1 min-h-0 overflow-y-auto no-scrollbar py-2 flex flex-col gap-0.5 pr-0.5"
          aria-label="Navegação da Plataforma VILA"
          id="admin-sidebar-nav"
        >
          {adminNavItems.map((item) => {
            const isActive =
              currentTab === item.id ||
              (item.matches && item.matches.includes(currentTab));

            return (
              <button
                key={item.id}
                type="button"
                id={`admin-nav-item-${item.id}`}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[12px] leading-tight transition-all duration-200 group cursor-pointer ${
                  isActive
                    ? 'bg-[#1455AC] text-white font-bold shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-[#1455AC]/5 dark:hover:bg-[#1455AC]/15 hover:text-[#1455AC] font-medium'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`shrink-0 transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-500 dark:text-slate-400 group-hover:text-[#1455AC]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate tracking-tight">{item.label}</span>
                </div>
              </button>
            );
          })}

          {/* 3. Secção ATALHOS */}
          <div className="pt-2.5 mt-1.5 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1">
            <div className="px-2 py-0.5">
              <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                ATALHOS
              </span>
            </div>

            {quickActions.map((action) => (
              <button
                key={action.id}
                type="button"
                id={`admin-shortcut-${action.id}`}
                onClick={() => {
                  onSelectTab(action.targetTab);
                  if (onCloseMobile) onCloseMobile();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-[11.5px] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50 font-medium transition-colors cursor-pointer"
              >
                <span className="shrink-0">{action.icon}</span>
                <span className="truncate">{action.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* 4. Bloco Inferior: Card Promocional da Missão VILA + Modo Escuro + Voltar ao Portal */}
        <div className="shrink-0 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5 bg-white dark:bg-slate-950">
          {/* Card Missão VILA exatamente como na referência */}
          <div className="p-3 rounded-2xl bg-[#1455AC]/5 dark:bg-[#1455AC]/15 border border-slate-200 dark:border-slate-700 relative overflow-hidden flex flex-col items-center text-center shadow-2xs">
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-100 leading-tight">
              {isReportsTab || isSettingsTab
                ? 'A VILA transforma dados em conhecimento e conhecimento em ação.'
                : 'A VILA conecta pessoas, comunidades e territórios para transformar o mundo.'}
            </p>

            {/* Ilustração com pessoas unidas em torno do globo */}
            <div className="mt-2 w-full flex items-center justify-center">
              <svg viewBox="0 0 160 50" className="w-36 h-10">
                {/* Globe no centro */}
                <defs>
                  <linearGradient id="admin-sidebar-globe" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1455AC" />
                    <stop offset="100%" stopColor="#0F448A" />
                  </linearGradient>
                </defs>
                <circle cx="80" cy="25" r="16" fill="url(#admin-sidebar-globe)" />
                {/* Continentes */}
                <path d="M74 18 Q 78 15 82 17 Q 85 22 83 26 Q 78 28 75 25 Z" fill="#10B981" opacity="0.9" />
                <path d="M82 27 Q 86 26 89 29 Q 88 34 84 35 Z" fill="#10B981" opacity="0.9" />

                {/* Pessoas unidas à esquerda */}
                <circle cx="45" cy="18" r="4" fill="#F43F5E" />
                <path d="M40 38 L42 24 L48 24 L50 38" fill="#F43F5E" stroke="#F43F5E" strokeWidth="1" strokeLinejoin="round" />

                <circle cx="58" cy="17" r="4.5" fill="#1455AC" />
                <path d="M53 38 L55 23 L61 23 L63 38" fill="#1455AC" stroke="#1455AC" strokeWidth="1" strokeLinejoin="round" />

                {/* Pessoas unidas à direita */}
                <circle cx="102" cy="17" r="4.5" fill="#F59E0B" />
                <path d="M97 38 L99 23 L105 23 L107 38" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" strokeLinejoin="round" />

                <circle cx="115" cy="18" r="4" fill="#10B981" />
                <path d="M110 38 L112 24 L118 24 L120 38" fill="#10B981" stroke="#10B981" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </div>
            {/* Ponto indicador */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#1455AC] mt-1" />
          </div>

          {/* Toggle de Modo Escuro */}
          <div className="flex items-center justify-between w-full text-[12px] font-bold text-slate-700 dark:text-slate-300 px-1">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              {isDarkMode ? (
                <Moon className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 dark:text-slate-500" strokeWidth={2.2} />
              ) : (
                <Sun className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 dark:text-slate-500" strokeWidth={2.2} />
              )}
              {isDarkMode ? 'Modo escuro' : 'Modo claro'}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isDarkMode}
              onClick={toggleTheme}
              id="admin-theme-toggle-switch"
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isDarkMode ? 'bg-[#1455AC]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                  isDarkMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Botão de retorno ao Portal do Cidadão */}
          <button
            type="button"
            id="admin-btn-back-to-citizen-portal"
            onClick={() => {
              onSelectTab('inicio');
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 hover:bg-[#1455AC]/10 dark:bg-[#1455AC]/20 border border-slate-200 dark:border-slate-700 hover:border-[#1455AC]/30 text-slate-700 dark:text-slate-300 hover:text-[#1455AC] font-bold rounded-xl py-2 px-3 text-[11.5px] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Portal do Cidadão</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
