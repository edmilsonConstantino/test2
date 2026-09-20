import React, { useState, useRef, useEffect } from 'react';
import {
  Globe,
  Compass,
  Film,
  Calendar,
  Users,
  Sparkles,
  Leaf,
  Heart,
  Info,
  Settings,
  ChevronDown,
  ArrowRight,
  Sun,
  Moon,
  X,
  Check,
  LogOut,
  Building2,
  Eye,
  Package,
  HelpCircle,
  UserCheck,
} from 'lucide-react';
import { Logo } from './Logo';
import { DemoUser } from '../data/demoUsers';
import { useTheme } from '../contexts/ThemeContext';

export interface SidebarProps {
  currentTab: string;
  settingsSubTab?: string;
  currentUser?: DemoUser;
  onSelectTab: (tabId: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenImpactModal?: () => void;
  onOpenSupportModal?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  currentUser,
  onSelectTab,
  onOpenAuth,
  onOpenSupportModal,
  isMobileOpen = false,
  onCloseMobile,
  isLoggedIn = false,
  onLogout,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const isLightMode = !isDark;
  const [selectedLang, setSelectedLang] = useState<'PT' | 'EN' | 'ES'>('PT');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Indicador de "mais opções abaixo" quando a navegação excede a altura visível (ex: ecrãs mais baixos)
  const navRef = useRef<HTMLElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const checkScroll = () => {
      setShowScrollHint(el.scrollHeight - el.scrollTop - el.clientHeight > 8);
    };

    checkScroll();
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [currentTab]);

  // EXACT 10 Navigation items in the official required order (UI de referência):
  // Início → Explorar o Mundo → Mundo em Movimento (badge "NOVO") → Eventos Globais →
  // Comunidade Global → Impacto Global → VILA AI → Parceiros Globais → Sobre a VILA → Definições
  const navItems: NavItem[] = [
    {
      id: 'inicio',
      label: 'Início',
      icon: <Globe className="w-4 h-4" strokeWidth={2.2} />,
    },
    {
      id: 'explorar',
      label: 'Explorar o Mundo',
      icon: <Compass className="w-4 h-4" strokeWidth={2.2} />,
    },
    {
      id: 'movimento',
      label: 'Mundo em Movimento',
      icon: <Film className="w-4 h-4" strokeWidth={2.2} />,
      badge: 'NOVO',
    },
    {
      id: 'eventos',
      label: 'Eventos Globais',
      icon: <Calendar className="w-4 h-4" strokeWidth={2.2} />,
    },
    {
      id: 'comunidade',
      label: 'Comunidade Global',
      icon: <Users className="w-4 h-4" strokeWidth={2.2} />,
    },
    {
      id: 'impacto',
      label: 'Impacto Global',
      icon: <Leaf className="w-4 h-4" strokeWidth={2.2} />,
    },
    {
      id: 'ia',
      label: 'VILA AI',
      icon: <Sparkles className="w-4 h-4" strokeWidth={2.2} />,
    },
    {
      id: 'parceiros',
      label: 'Parceiros Globais',
      icon: <Heart className="w-4 h-4" strokeWidth={2.2} />,
    },
    {
      id: 'sobre',
      label: 'Sobre a VILA',
      icon: <Info className="w-4 h-4" strokeWidth={2.2} />,
    },
    {
      id: 'definicoes',
      label: 'Definições',
      icon: <Settings className="w-4 h-4" strokeWidth={2.2} />,
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

      {/* Main Sidebar Container - Fixed ~230px width, shared across all pages */}
      <aside
        id="main-sidebar"
        className={`fixed top-0 left-0 bottom-0 z-40 w-[230px] h-screen max-h-[100dvh] bg-white dark:bg-slate-900 border-r border-slate-200/90 dark:border-slate-800 px-3 py-2.5 flex flex-col justify-between select-none overflow-y-auto no-scrollbar transition-transform duration-300 ease-in-out shadow-xs ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* 1. Header Fixo: Logotipo (Pin + VILA) à esquerda e tagline indentada por baixo, como na UI de referência */}
        <div className="relative shrink-0 px-1.5 pb-2.5 pt-1 border-b border-slate-100 dark:border-slate-800">
          <Logo size="sm" showTagline={false} />
          {isMobileOpen && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="md:hidden absolute right-1.5 top-1.5 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-300 cursor-pointer"
              aria-label="Fechar menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {/* Tagline indentada por baixo do wordmark, alinhada com o "V" de VILA */}
          <div className="pl-[42px] mt-0.5">
            <div className="text-[8px] leading-[1.25] font-extrabold tracking-[0.05em] text-[#64748B] dark:text-slate-400 uppercase font-sans select-none">
              <p className="whitespace-nowrap">O MUNDO É UMA VILA.</p>
              <p className="whitespace-nowrap mt-[1px]">
                E NÓS SOMOS <span className="text-[#F58300] font-black">UM.</span>
              </p>
            </div>
          </div>
        </div>

        {/* 2. Menu de Navegação Completo: exatamente 10 itens na ordem oficial */}
        <div className="relative flex-1 min-h-0">
        <nav
          ref={navRef}
          className="h-full overflow-y-auto no-scrollbar py-2 flex flex-col justify-evenly gap-1 pr-0.5"
          aria-label="Navegação Principal"
          id="sidebar-nav-container"
        >
          {navItems.map((item) => {
            const isActive =
              currentTab === item.id ||
              (item.id === 'inicio' && (currentTab === 'home' || currentTab === '')) ||
              (item.id === 'movimento' &&
                (currentTab === 'noticias' || currentTab === 'mundo-em-movimento')) ||
              (item.id === 'comunidade' &&
                (currentTab === 'comunidade-global' ||
                  currentTab === 'ambiente' ||
                  currentTab === 'educacao' ||
                  currentTab === 'direitos-humanos' ||
                  currentTab === 'cultura' ||
                  currentTab === 'criar-comunidade' ||
                  currentTab === 'explorar-comunidade')) ||
              (item.id === 'impacto' &&
                (currentTab === 'impacto' ||
                  currentTab === 'impacto-global' ||
                  currentTab === 'impacto-global-plataforma' ||
                  currentTab === 'gestao-impacto' ||
                  currentTab === 'impacto-plataforma' ||
                  currentTab === 'saude' ||
                  currentTab === 'tecnologia' ||
                  currentTab === 'empreendedorismo' ||
                  currentTab === 'direitos-humanos' ||
                  currentTab === 'impacto-cultura' ||
                  currentTab === 'cultura-impacto')) ||
              (item.id === 'sobre' && (currentTab === 'sobre' || currentTab === 'sobre-a-vila')) ||
              (item.id === 'definicoes' &&
                (currentTab === 'preferencias' ||
                  currentTab === 'settings' ||
                  currentTab === 'configuracoes' ||
                  currentTab === 'privacidade' ||
                  currentTab === 'seguranca' ||
                  currentTab === 'contas' ||
                  currentTab === 'integracoes'));

            return (
              <button
                key={item.id}
                type="button"
                id={`nav-item-${item.id}`}
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
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`shrink-0 transition-colors ${
                      isActive
                        ? 'text-white'
                        : item.id === 'ia'
                        ? 'text-emerald-500 group-hover:text-[#1455AC]'
                        : 'text-slate-500 dark:text-slate-400 group-hover:text-[#1455AC]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate tracking-tight">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-md text-[8.5px] font-bold tracking-wider uppercase shrink-0 transition-colors ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-[#F58300]/15 text-[#F58300] border border-[#F58300]/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Secção Extra PLATAFORMA: visível exclusivamente para utilizadores com papel de Administrador */}
          {currentUser?.isAdmin && (
            <div className="pt-2 mt-1.5 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1">
              <div className="px-2 py-0.5 flex items-center justify-between">
                <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Plataforma
                </span>
                <span className="text-[8.5px] font-bold px-1.5 py-0.2 rounded-md bg-amber-50 text-amber-700 border border-amber-200 truncate max-w-[110px]">
                  {currentUser.roleLabel.replace('Administradora ', '').replace('Administrador ', '')}
                </span>
              </div>

              {/* 5 Atalhos Rápidos da Secção PLATAFORMA conforme UI de Referência */}
              {[
                {
                  id: 'painel-gestao',
                  label: 'Painel de Gestão',
                  targetTab: 'painel-gestao',
                  icon: <UserCheck className="w-4 h-4" strokeWidth={2.2} />,
                  badge: 'Admin',
                },
                {
                  id: 'membros',
                  label: 'Membros',
                  targetTab: 'gestao-utilizadores',
                  icon: <Eye className="w-4 h-4" strokeWidth={2.2} />,
                },
                {
                  id: 'parceiros',
                  label: 'Parceiros',
                  targetTab: 'gestao-parceiros',
                  icon: <Heart className="w-4 h-4" strokeWidth={2.2} />,
                },
                {
                  id: 'recursos',
                  label: 'Recursos',
                  targetTab: 'gestao-recursos',
                  icon: <Package className="w-4 h-4" strokeWidth={2.2} />,
                },
                {
                  id: 'suporte',
                  label: 'Suporte',
                  targetTab: 'gestao-suporte',
                  icon: <HelpCircle className="w-4 h-4" strokeWidth={2.2} />,
                },
              ].map((shortcut) => {
                const isActive = currentTab === shortcut.targetTab;
                return (
                  <button
                    key={shortcut.id}
                    type="button"
                    id={`nav-item-plataforma-${shortcut.id}`}
                    onClick={() => {
                      if (shortcut.id === 'suporte' && onOpenSupportModal) {
                        onOpenSupportModal();
                      } else {
                        onSelectTab(shortcut.targetTab);
                      }
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[12px] leading-tight transition-all duration-200 group cursor-pointer ${
                      isActive
                        ? 'bg-[#1455AC] text-white font-bold shadow-xs'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-[#1455AC]/5 dark:hover:bg-[#1455AC]/15 hover:text-[#1455AC] font-medium'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`shrink-0 transition-colors ${
                          isActive
                            ? 'text-white'
                            : 'text-slate-500 dark:text-slate-400 group-hover:text-[#1455AC]'
                        }`}
                      >
                        {shortcut.icon}
                      </span>
                      <span className="truncate tracking-tight font-semibold">
                        {shortcut.label}
                      </span>
                    </div>

                    {shortcut.badge && (
                      <span
                        className={`ml-1 px-1.5 py-0.5 rounded-full text-[8px] font-extrabold tracking-wider uppercase shrink-0 transition-colors ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : 'bg-amber-100/80 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {shortcut.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </nav>

        {/* Indicador "mais opções abaixo" — visível apenas quando a navegação tem conteúdo por rolar (ex: ecrãs mais baixos) */}
        {showScrollHint && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-9 flex items-end justify-center pb-1 bg-gradient-to-t from-white dark:from-slate-900 to-transparent">
            <button
              type="button"
              onClick={() => navRef.current?.scrollBy({ top: 140, behavior: 'smooth' })}
              title="Ver mais opções"
              className="pointer-events-auto w-7 h-7 rounded-full bg-[#1455AC] hover:bg-[#0F448A] shadow-md shadow-[#1455AC]/30 flex items-center justify-center text-white hover:scale-110 transition-all cursor-pointer"
            >
              <ChevronDown className="w-4 h-4 text-white" strokeWidth={2.5} />
            </button>
          </div>
        )}
        </div>

        {/* 3. Bloco Inferior Fixo: Card Promocional + Idioma + Tema + Autenticação */}
        <div
          id="sidebar-bottom-fixed-container"
          className="shrink-0 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5 bg-white dark:bg-slate-900"
        >
          {/* Card Promocional Fixo (sempre idêntico em todas as páginas) */}
          <div
            id="sidebar-promo-card"
            className="p-3.5 pt-4 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 relative overflow-hidden flex flex-col items-center text-center shadow-2xs"
          >
            {/* Brilho ambiente subtil por trás da ilustração (mais visível no modo escuro) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-16 bg-[#1455AC]/25 dark:bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

            {/* Ilustração: globo em rede (imagem oficial) */}
            <div className="relative w-full rounded-xl overflow-hidden bg-white p-1 border border-slate-100 dark:border-slate-700/60 shadow-2xs">
              <img
                src="/imagens/sidebar.png"
                alt=""
                className="w-full h-20 object-cover object-top rounded-lg"
              />
            </div>

            <h4 className="mt-1 text-[12.5px] font-extrabold text-slate-900 dark:text-slate-50 leading-tight font-sans tracking-tight">
              Juntos, construímos um mundo melhor.
            </h4>

            <button
              type="button"
              onClick={() => {
                onSelectTab('impacto');
                if (onCloseMobile) onCloseMobile();
              }}
              className="mt-1.5 inline-flex items-center justify-center gap-1 text-[11.5px] font-bold text-[#1455AC] dark:text-blue-300 hover:text-[#0F448A] dark:hover:text-blue-200 hover:underline transition-colors cursor-pointer"
            >
              <span>Ver impacto global</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Seletor de Idioma Dropdown Compacto (PT/EN/ES com Bandeiras) */}
          <div className="relative w-full" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              id="sidebar-lang-btn"
              className="flex items-center justify-between border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-[12px] font-bold text-slate-700 bg-white dark:bg-slate-800 dark:hover:bg-slate-700 hover:bg-slate-50 w-full shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer"
              aria-haspopup="menu"
              aria-expanded={isLangOpen}
            >
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" strokeWidth={2.2} />
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  {selectedLang === 'PT' && 'PT'}
                  {selectedLang === 'EN' && 'EN'}
                  {selectedLang === 'ES' && 'ES'}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div
                role="menu"
                className="absolute bottom-full mb-1.5 left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-1 z-30 animate-in fade-in slide-in-from-bottom-1 duration-150"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => { setSelectedLang('PT'); setIsLangOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                    selectedLang === 'PT' ? 'text-[#1455AC] bg-[#1455AC]/10' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2"><span>🇵🇹</span> Português</span>
                  {selectedLang === 'PT' && <Check className="w-3.5 h-3.5 text-[#1455AC]" />}
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => { setSelectedLang('EN'); setIsLangOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                    selectedLang === 'EN' ? 'text-[#1455AC] bg-[#1455AC]/10' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2"><span>🇬🇧</span> English</span>
                  {selectedLang === 'EN' && <Check className="w-3.5 h-3.5 text-[#1455AC]" />}
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => { setSelectedLang('ES'); setIsLangOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                    selectedLang === 'ES' ? 'text-[#1455AC] bg-[#1455AC]/10' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2"><span>🇪🇸</span> Español</span>
                  {selectedLang === 'ES' && <Check className="w-3.5 h-3.5 text-[#1455AC]" />}
                </button>
              </div>
            )}
          </div>

          {/* Toggle de Tema Claro / Escuro */}
          <div className="flex items-center justify-between w-full text-[12px] font-bold text-slate-700 dark:text-slate-300 px-1">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              {isLightMode ? (
                <Sun className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" strokeWidth={2.2} />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" strokeWidth={2.2} />
              )}
              {isLightMode ? 'Tema Claro' : 'Tema Escuro'}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isLightMode}
              onClick={toggleTheme}
              id="theme-toggle-switch"
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isLightMode ? 'bg-[#1455AC]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                  isLightMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Área de Autenticação: Condicional Logado vs. Deslogado */}
          {isLoggedIn ? (
            /* Estado Logado: Sair da plataforma */
            <button
              type="button"
              id="sidebar-btn-logout"
              onClick={() => onLogout?.()}
              className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-800 hover:bg-rose-50/70 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 font-bold rounded-xl py-2 px-3 text-[11.5px] shadow-2xs transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair da plataforma</span>
            </button>
          ) : (
            /* Estado Deslogado: Botões Entrar (outline) e Criar Conta (azul sólido) */
            <div className="grid grid-cols-2 gap-2 w-full pt-0.5">
              <button
                type="button"
                id="sidebar-btn-login"
                onClick={() => onOpenAuth('login')}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs rounded-xl py-2 px-2.5 text-[11.5px] font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-center transition-colors cursor-pointer"
              >
                Entrar
              </button>
              <button
                type="button"
                id="sidebar-btn-register"
                onClick={() => onOpenAuth('register')}
                className="bg-[#1455AC] hover:bg-[#0F448A] text-white font-bold rounded-xl py-2 px-2.5 text-[11.5px] shadow-2xs text-center transition-all cursor-pointer"
              >
                Criar Conta
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
