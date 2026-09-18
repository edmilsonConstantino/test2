import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Shield, Users, User, Building2, Globe } from 'lucide-react';
import { DemoUser, DEMO_USERS } from '../data/demoUsers';

interface DemoUserSwitcherProps {
  currentUser: DemoUser;
  onSelectUser: (user: DemoUser) => void;
}

export const DemoUserSwitcher: React.FC<DemoUserSwitcherProps> = ({
  currentUser,
  onSelectUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleBadgeStyle = (role: DemoUser['role']) => {
    switch (role) {
      case 'cidadao':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'moderador':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'admin_municipal':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'admin_regional':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'admin_global':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getRoleIcon = (role: DemoUser['role']) => {
    switch (role) {
      case 'cidadao':
        return <User className="w-3 h-3 text-slate-500" />;
      case 'moderador':
        return <Users className="w-3 h-3 text-emerald-600" />;
      case 'admin_municipal':
        return <Building2 className="w-3 h-3 text-amber-600" />;
      case 'admin_regional':
        return <Shield className="w-3 h-3 text-indigo-600" />;
      case 'admin_global':
        return <Globe className="w-3 h-3 text-purple-600" />;
      default:
        return <User className="w-3 h-3" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão Gatilho do Seletor */}
      <button
        type="button"
        id="demo-user-switcher-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title="Trocar utilizador de demonstração para testar papéis"
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-[#1455AC]/20 bg-[#1455AC]/10 hover:bg-[#1455AC]/15 text-slate-800 transition-all text-xs cursor-pointer shadow-2xs group"
      >
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1455AC]/40 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1455AC]"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#1455AC] bg-white/90 px-1 py-0.5 rounded border border-[#1455AC]/20">
            DEMO
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-left max-w-[140px] md:max-w-[180px]">
          <span className="font-bold text-slate-900 truncate text-[11px]">
            {currentUser.name}
          </span>
          <span
            className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full border truncate shrink-0 ${getRoleBadgeStyle(
              currentUser.role
            )}`}
          >
            {currentUser.badgeLabel}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Menu Suspenso */}
      {isOpen && (
        <div
          id="demo-user-switcher-dropdown"
          role="listbox"
          className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-2xl py-2.5 z-60 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {/* Cabeçalho */}
          <div className="px-4 py-2 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Teste de Papéis & Permissões
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1455AC]/10 text-[#1455AC] border border-[#1455AC]/20">
                5 Perfis Demo
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Alterne entre os perfis para simular a visão da plataforma com diferentes níveis de autoridade e escopos.
            </p>
          </div>

          {/* Lista de Utilizadores */}
          <div className="py-1.5 max-h-[380px] overflow-y-auto no-scrollbar space-y-1 px-1.5">
            {DEMO_USERS.map((user) => {
              const isSelected = user.id === currentUser.id;
              return (
                <button
                  key={user.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  id={`demo-user-option-${user.id}`}
                  onClick={() => {
                    onSelectUser(user);
                    setIsOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1455AC]/10 border border-[#1455AC]/30 shadow-2xs'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0 mt-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {user.name}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getRoleBadgeStyle(
                            user.role
                          )}`}
                        >
                          {getRoleIcon(user.role)}
                          <span>{user.roleLabel}</span>
                        </span>
                      </div>

                      {/* Escopo */}
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
                        <span className="font-medium text-slate-400">Escopo:</span>
                        <span className="font-medium text-slate-700 truncate">
                          {user.scope}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator / Check */}
                  <div className="shrink-0 pt-1">
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-[#1455AC] text-white flex items-center justify-center shadow-2xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-200" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Rodapé Informativo */}
          <div className="pt-2 pb-1 px-4 border-t border-slate-100 bg-slate-50/50 rounded-b-xl">
            <div className="flex items-start gap-2 text-[11px] text-slate-500 leading-snug">
              <Shield className="w-3.5 h-3.5 text-[#1455AC] shrink-0 mt-0.5" />
              <span>
                <strong>Regra de Visualização:</strong> Perfis de Administrador (Municipal, Regional, Global) ativam a secção <strong>PLATAFORMA</strong> na Sidebar com atalho para o Painel de Gestão.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
