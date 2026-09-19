import React, { useEffect } from 'react';
import {
  ShieldAlert,
  ArrowLeft,
  Home,
  UserCheck,
  Shield,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { DemoUser } from '../data/demoUsers';
import { BreadcrumbItem } from './Topbar';

interface AcessoRestritoAdminViewProps {
  currentUser: DemoUser;
  attemptedTab?: string;
  onNavigateToInicio: () => void;
  onSwitchToAdmin?: () => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

export const AcessoRestritoAdminView: React.FC<AcessoRestritoAdminViewProps> = ({
  currentUser,
  attemptedTab,
  onNavigateToInicio,
  onSwitchToAdmin,
  onBreadcrumbChange,
}) => {
  useEffect(() => {
    if (onBreadcrumbChange) {
      onBreadcrumbChange([
        { label: 'Início', onClick: onNavigateToInicio },
        { label: 'Plataforma' },
        { label: 'Acesso Restrito' },
      ]);
    }
  }, [onBreadcrumbChange, onNavigateToInicio]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs p-6 sm:p-10 relative overflow-hidden font-sans">
        {/* Subtle background decoration */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-50 dark:bg-amber-500/10 rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-rose-50 dark:bg-rose-500/10 rounded-full blur-3xl opacity-70 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6 font-sans">
          {/* Badge & Icon */}
          <div className="inline-flex items-center justify-center font-sans">
            <div className="relative">
              <div className="w-20 h-20 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-2xs">
                <ShieldAlert className="w-10 h-10" strokeWidth={2.2} />
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg bg-[#f58300] text-white flex items-center justify-center shadow-xs border-2 border-white">
                <Lock className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <div className="space-y-2 font-sans">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 text-xs font-bold uppercase tracking-wider font-sans">
              <Shield className="w-3 h-3" />
              <span>Acesso Restrito a Administradores</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50 font-sans tracking-tight">
              Permissão Insuficiente para Esta Área
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto font-sans">
              O <strong>Painel de Gestão</strong> e as ferramentas de administração da{' '}
              <strong>Plataforma VILA</strong> são de acesso reservado a administradores municipais,
              regionais e globais da rede.
            </p>
          </div>

          {/* Cartão de Estado do Utilizador Ativo */}
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 max-w-md mx-auto text-left shadow-2xs font-sans">
            <div className="flex items-center justify-between gap-3 text-xs font-sans">
              <div className="flex items-center gap-3 font-sans">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200"
                />
                <div className="font-sans">
                  <h4 className="font-bold text-slate-900 dark:text-slate-50 text-sm">{currentUser.name}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">{currentUser.roleLabel}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 text-[11px] font-bold shrink-0 font-sans">
                Não Administrador
              </span>
            </div>
            {attemptedTab && (
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between font-sans">
                <span>Rota solicitada:</span>
                <code className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 px-1.5 py-0.5 rounded font-mono text-[10px]">
                  #{attemptedTab}
                </code>
              </div>
            )}
          </div>

          {/* Ações disponíveis */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 font-sans">
            <button
              type="button"
              id="btn-acesso-restrito-inicio"
              onClick={onNavigateToInicio}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1455AC] hover:bg-[#11468F] shadow-xs transition-all cursor-pointer font-sans"
            >
              <Home className="w-4 h-4" />
              <span>Voltar para o Início</span>
            </button>

            {onSwitchToAdmin && (
              <button
                type="button"
                id="btn-acesso-restrito-switch-admin"
                onClick={onSwitchToAdmin}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer font-sans"
              >
                <UserCheck className="w-4 h-4 text-[#1455AC]" />
                <span>Trocar para "VILA Global" (Admin)</span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">
            Dica: No modo de demonstração, pode alternar para o perfil <strong>VILA Global</strong> através
            do menu de utilizador no topo direito ou usando o botão acima.
          </p>
        </div>
      </div>
    </div>
  );
};
