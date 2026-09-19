import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  ArrowRight,
  Check,
  Sparkles,
  Shield,
  Users,
  Building2,
  Globe,
  KeyRound,
} from 'lucide-react';
import { Logo } from './Logo';
import { DemoUser, DEMO_USERS } from '../data/demoUsers';

export interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  currentUser?: DemoUser;
  onSelectUser?: (user: DemoUser) => void;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  currentUser,
  onSelectUser,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [loginMethod, setLoginMethod] = useState<'demo' | 'credentials'>('demo');
  const [submitted, setSubmitted] = useState(false);

  // Sincroniza o modo quando o modal é aberto externamente
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setLoginMethod('demo');
      setSubmitted(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onLoginSuccess?.();
      onClose();
    }, 900);
  };

  const handleSelectDemoProfile = (user: DemoUser) => {
    onSelectUser?.(user);
    onLoginSuccess?.();
    onClose();
  };

  const getRoleBadgeStyle = (role: DemoUser['role']) => {
    switch (role) {
      case 'cidadao':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
      case 'moderador':
        return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
      case 'admin_municipal':
        return 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
      case 'admin_regional':
        return 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20';
      case 'admin_global':
        return 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const getRoleIcon = (role: DemoUser['role']) => {
    switch (role) {
      case 'cidadao':
        return <User className="w-3 h-3 text-slate-500 dark:text-slate-400" />;
      case 'moderador':
        return <Users className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />;
      case 'admin_municipal':
        return <Building2 className="w-3 h-3 text-amber-600 dark:text-amber-400" />;
      case 'admin_regional':
        return <Shield className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />;
      case 'admin_global':
        return <Globe className="w-3 h-3 text-purple-600 dark:text-purple-400" />;
      default:
        return <User className="w-3 h-3" />;
    }
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="auth-modal-container"
        className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-[#E2E8F0] p-5 sm:p-7 animate-in zoom-in-95 duration-150 relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          id="auth-modal-close-btn"
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer z-10"
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo & Cabeçalho */}
        <div className="text-center flex flex-col items-center shrink-0">
          <Logo showTagline={false} size="md" />
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-50 font-sans mt-2.5">
            {mode === 'login' ? 'Acesso à Plataforma VILA' : 'Faça parte da nossa VILA'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-sm">
            {mode === 'login'
              ? 'Escolha um perfil de demonstração para testar papéis ou entre com credenciais'
              : 'Junte-se a mais de 7,8 milhões de cidadãos globais'}
          </p>
        </div>

        {/* Alternador Principal: Entrar vs. Criar Conta */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl my-4 text-xs font-semibold shrink-0">
          <button
            type="button"
            id="auth-tab-login"
            onClick={() => setMode('login')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            id="auth-tab-register"
            onClick={() => setMode('register')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-xs font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50'
            }`}
          >
            Criar Conta
          </button>
        </div>

        {/* Feedback de submissão do formulário */}
        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#10B981] mx-auto flex items-center justify-center shadow-xs">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50">Autenticado com sucesso!</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">A carregar a sua experiência na VILA...</p>
          </div>
        ) : mode === 'login' ? (
          /* MODO DE LOGIN */
          <div className="flex flex-col flex-1 min-h-0">
            {/* Sub-abas de Login: Perfis Demo vs. E-mail/Senha */}
            <div className="flex items-center gap-1 p-1 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-xl mb-3.5 text-xs shrink-0">
              <button
                type="button"
                id="auth-method-demo-btn"
                onClick={() => setLoginMethod('demo')}
                className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  loginMethod === 'demo'
                    ? 'bg-white dark:bg-slate-800 text-[#1455AC] shadow-2xs font-bold border border-slate-200/80 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 font-medium'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#1455AC] shrink-0" />
                <span>Perfis Demo</span>
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-[#1455AC]/10 dark:bg-[#1455AC]/20 text-[#1455AC] border border-[#1455AC]/20">
                  5 Perfis
                </span>
              </button>
              <button
                type="button"
                id="auth-method-credentials-btn"
                onClick={() => setLoginMethod('credentials')}
                className={`flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  loginMethod === 'credentials'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-2xs font-bold border border-slate-200/80 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 font-medium'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                <span>E-mail e Senha</span>
              </button>
            </div>

            {loginMethod === 'demo' ? (
              /* 1. SELETOR DE PERFIS DEMO INTEGRADO */
              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex items-center justify-between mb-2 shrink-0">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Selecione um Perfil para Entrar Instantaneamente
                  </span>
                  <span className="text-[10.5px] font-semibold text-[#1455AC]">
                    Clique no perfil desejado
                  </span>
                </div>

                {/* Lista de 5 Perfis Demo (com visual de cartão do DemoUserSwitcher) */}
                <div
                  id="auth-demo-users-list"
                  className="space-y-2 overflow-y-auto max-h-[290px] pr-1 pb-1"
                >
                  {DEMO_USERS.map((user) => {
                    const isSelected = currentUser?.id === user.id;
                    return (
                      <button
                        key={user.id}
                        type="button"
                        id={`auth-demo-user-${user.id}`}
                        onClick={() => handleSelectDemoProfile(user)}
                        className={`w-full p-2.5 sm:p-3 rounded-xl text-left transition-all flex items-center justify-between gap-3 cursor-pointer group border ${
                          isSelected
                            ? 'bg-[#1455AC]/5 dark:bg-[#1455AC]/15 border-[#1455AC] shadow-2xs ring-1 ring-[#1455AC]/30'
                            : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative shrink-0">
                            <img
                              src={user.avatarUrl}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                            />
                            {isSelected && (
                              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#1455AC] text-white rounded-full flex items-center justify-center border-2 border-white shadow-2xs">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </span>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-bold text-slate-900 dark:text-slate-50 truncate">
                                {user.name}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${getRoleBadgeStyle(
                                  user.role
                                )}`}
                              >
                                {getRoleIcon(user.role)}
                                <span>{user.roleLabel}</span>
                              </span>
                            </div>

                            {/* Escopo de Atuação */}
                            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                              <span className="font-medium text-slate-400 dark:text-slate-500">Escopo:</span>
                              <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
                                {user.scope}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Botão de Ação Rápida */}
                        <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-[#1455AC] text-slate-600 dark:text-slate-400 group-hover:text-white font-bold text-[11px] transition-all">
                          <span>Entrar</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Dica / Alternador no Rodapé */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
                  <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                    <Shield className="w-3.5 h-3.5 text-[#1455AC] shrink-0" />
                    Simula níveis de autoridade e Sidebar
                  </span>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('credentials')}
                    className="font-bold text-[#1455AC] hover:underline cursor-pointer"
                  >
                    Usar e-mail e senha →
                  </button>
                </div>
              </div>
            ) : (
              /* 2. FORMULÁRIO DE CREDENCIAIS CONVENCIONAL */
              <form onSubmit={handleSubmit} className="space-y-3 shrink-0">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="seu.email@exemplo.com"
                      defaultValue={currentUser?.email || ''}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#1455AC] text-slate-900 dark:text-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Palavra-passe
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      defaultValue="palavrapasse123"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#1455AC] text-slate-900 dark:text-slate-50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="auth-submit-login-btn"
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-white transition-all shadow-xs mt-2 flex items-center justify-center gap-2 bg-[#1455AC] hover:bg-[#0F448A] cursor-pointer"
                >
                  <span>Entrar na Conta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('demo')}
                    className="text-[11px] font-bold text-[#1455AC] hover:underline cursor-pointer inline-flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#1455AC]" />
                    <span>Voltar aos perfis de demonstração (acesso rápido)</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* MODO DE REGISTO (CRIAR CONTA) */
          <form onSubmit={handleSubmit} className="space-y-3 shrink-0">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nome Completo
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Maria Santos"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#1455AC] text-slate-900 dark:text-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#1455AC] text-slate-900 dark:text-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Palavra-passe
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#1455AC] text-slate-900 dark:text-slate-50"
                />
              </div>
            </div>

            <button
              type="submit"
              id="auth-submit-register-btn"
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white transition-all shadow-xs mt-2 flex items-center justify-center gap-2 bg-[#1455AC] hover:bg-[#0F448A] cursor-pointer"
            >
              <span>Concluir Registo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
