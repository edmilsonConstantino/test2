import React, { useEffect } from 'react';
import {
  ShieldAlert,
  ArrowLeft,
  UserCheck,
  Shield,
  ChevronRight,
  Globe,
  Users,
  Sparkles,
} from 'lucide-react';
import { DemoUser, DEMO_USERS } from '../data/demoUsers';
import { BreadcrumbItem } from './Topbar';

interface AdminRestrictedAccessViewProps {
  currentUser: DemoUser;
  attemptedRoute?: string;
  onBackToHome: () => void;
  onNavigateToTab?: (tabId: string) => void;
  onSwitchToAdmin?: (adminUser: DemoUser) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

export const AdminRestrictedAccessView: React.FC<AdminRestrictedAccessViewProps> = ({
  currentUser,
  attemptedRoute = 'painel-gestao',
  onBackToHome,
  onNavigateToTab,
  onSwitchToAdmin,
  onBreadcrumbChange,
}) => {
  const onBackToHomeRef = React.useRef(onBackToHome);
  onBackToHomeRef.current = onBackToHome;
  const onBreadcrumbChangeRef = React.useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;

  // Informa o Topbar sobre o breadcrumb contextual de Acesso Restrito uma única vez
  useEffect(() => {
    onBreadcrumbChangeRef.current?.([
      { label: 'Início', onClick: () => onBackToHomeRef.current() },
      { label: 'Painel de Gestão' },
      { label: 'Acesso Restrito' },
    ]);
  }, []);

  // Filtra administradores disponíveis no mock para facilitar a validação
  const adminUsers = DEMO_USERS.filter((u) => u.isAdmin);

  const getRouteFriendlyName = (route: string) => {
    switch (route) {
      case 'impacto-global-plataforma':
      case 'gestao-impacto':
        return 'Impacto Global da Plataforma';
      case 'membros':
      case 'gestao-utilizadores':
        return 'Membros e Utilizadores';
      case 'parceiros':
      case 'gestao-parceiros':
        return 'Parceiros e Alianças';
      case 'recursos':
      case 'gestao-recursos':
        return 'Recursos e Infraestrutura';
      case 'suporte':
      case 'gestao-suporte':
        return 'Suporte Técnico da Plataforma';
      case 'visao-geral':
        return 'Visão Geral da Governança';
      case 'painel-gestao':
      case 'gestao':
      case 'admin':
      default:
        return 'Painel de Gestão da Plataforma';
    }
  };

  return (
    <div className="px-3.5 sm:px-5 lg:px-6 pt-6 sm:pt-10 pb-14 max-w-[1200px] mx-auto animate-in fade-in duration-200 font-sans">
      <div className="max-w-2xl mx-auto space-y-6 font-sans">
        {/* Card Principal de Acesso Restrito */}
        <div
          id="admin-guard-card"
          className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs p-6 sm:p-8 text-center space-y-6 font-sans"
        >
          {/* Ícone de Escudo / Bloqueio com anel suave */}
          <div className="relative mx-auto w-16 h-16 flex items-center justify-center font-sans">
            <div className="absolute inset-0 rounded-xl bg-amber-100/70 animate-ping opacity-25" />
            <div className="w-16 h-16 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-2xs">
              <ShieldAlert className="w-8 h-8 stroke-[2.2]" />
            </div>
          </div>

          {/* Cabeçalho */}
          <div className="space-y-2 font-sans">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-800 text-[11px] font-bold uppercase tracking-wider font-sans">
              <Shield className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Acesso Restrito a Administradores
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 font-sans tracking-tight">
              Área Exclusiva de Governança
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mx-auto font-sans">
              A página{' '}
              <strong className="text-slate-900 dark:text-slate-50 font-semibold">
                {getRouteFriendlyName(attemptedRoute)}
              </strong>{' '}
              <span className="font-mono text-[11px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                #{attemptedRoute}
              </span>{' '}
              é de uso exclusivo para perfis com permissões de administração municipal, regional ou global.
            </p>
          </div>

          {/* Cartão de Perfil Atual Ativo */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-sans shadow-2xs">
            <div className="flex items-center gap-3 min-w-0 font-sans">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover border border-white shadow-2xs shrink-0"
              />
              <div className="min-w-0 font-sans">
                <div className="flex items-center gap-2 flex-wrap font-sans">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-50 truncate font-sans">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-sans">
                    {currentUser.roleLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-sans">
                  {currentUser.email} • {currentUser.location}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right sm:border-l sm:border-slate-200 sm:pl-3 font-sans">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-200 dark:border-amber-500/20 px-2 py-0.5 rounded-full inline-block font-sans">
                Sem privilégios admin
              </span>
            </div>
          </div>

          {/* Botões de Ação Principal */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 font-sans">
            <button
              id="btn-guard-back-home"
              type="button"
              onClick={onBackToHome}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1455AC] hover:bg-[#11468F] text-white text-xs font-bold transition-all shadow-xs cursor-pointer font-sans"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Início
            </button>

            {onNavigateToTab && (
              <button
                id="btn-guard-explore"
                type="button"
                onClick={() => onNavigateToTab('explorar')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all shadow-2xs cursor-pointer font-sans"
              >
                <Globe className="w-4 h-4 text-[#1455AC]" />
                Explorar o Mundo
              </button>
            )}
          </div>
        </div>

        {/* Bloco de Ajuda para Demonstração / Teste de Perfis */}
        {onSwitchToAdmin && adminUsers.length > 0 && (
          <div
            id="admin-guard-demo-helper"
            className="bg-white dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 p-5 space-y-3 font-sans"
          >
            <div className="flex items-center justify-between font-sans">
              <div className="flex items-center gap-2 font-sans">
                <Sparkles className="w-4 h-4 text-[#1455AC]" />
                <span className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans uppercase tracking-wider">
                  Testar com perfil de Administrador (Modo Demo)
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium font-sans">
                {adminUsers.length} administradores disponíveis
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Para validar e inspecionar os ecrãs do Painel de Gestão, selecione um dos utilizadores administradores abaixo:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans">
              {adminUsers.map((admin) => (
                <button
                  key={admin.id}
                  type="button"
                  id={`btn-switch-to-${admin.id}`}
                  onClick={() => onSwitchToAdmin(admin)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:bg-blue-50/60 text-left transition-all group cursor-pointer font-sans"
                >
                  <img
                    src={admin.avatarUrl}
                    alt={admin.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <div className="min-w-0 flex-1 font-sans">
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-50 group-hover:text-[#1455AC] truncate font-sans">
                      {admin.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-sans">
                      {admin.roleLabel}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#1455AC] shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
