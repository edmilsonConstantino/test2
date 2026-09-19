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
  onOpenImpactModal,
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
        <nav
          className="flex-1 min-h-0 overflow-y-auto no-scrollbar py-2 flex flex-col justify-evenly gap-1 pr-0.5"
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
              (item.id === 'sobre' && currentTab === 'sobre-a-vila') ||
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

        {/* 3. Bloco Inferior Fixo: Card Promocional + Idioma + Tema + Autenticação */}
        <div
          id="sidebar-bottom-fixed-container"
          className="shrink-0 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5 bg-white dark:bg-slate-900"
        >
          {/* Card Promocional Fixo (sempre idêntico em todas as páginas) */}
          <div
            id="sidebar-promo-card"
            className="p-3 rounded-2xl bg-[#1455AC]/5 dark:bg-[#1455AC]/10 border border-slate-200 dark:border-slate-700 relative overflow-hidden flex flex-col items-start text-left shadow-2xs"
          >
            {/* 3D Earth Globe Graphic com nós e malha de constelação */}
            <div className="relative w-11 h-11 mb-1.5 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
                <defs>
                  {/* Outer atmospheric radial glow */}
                  <radialGradient id="promo-atmos-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="60%" stopColor="#1455AC" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0F448A" stopOpacity="0" />
                  </radialGradient>

                  {/* 3D Sphere Lighting Gradient */}
                  <radialGradient id="promo-sphere-lighting" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="45%" stopColor="#E2E8F0" />
                    <stop offset="80%" stopColor="#CBD5E1" />
                    <stop offset="100%" stopColor="#94A3B8" />
                  </radialGradient>

                  {/* Ocean & Continent gradients */}
                  <linearGradient id="promo-continent-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1455AC" />
                    <stop offset="100%" stopColor="#0F448A" />
                  </linearGradient>
                  <linearGradient id="promo-continent-green" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>

                {/* Atmospheric Glow */}
                <circle cx="50" cy="50" r="48" fill="url(#promo-atmos-glow)" />

                {/* Earth Sphere Base */}
                <circle cx="50" cy="50" r="36" fill="url(#promo-sphere-lighting)" stroke="#E2E8F0" strokeWidth="0.8" />

                {/* Curved Latitude/Longitude Wireframe */}
                <ellipse cx="50" cy="50" rx="36" ry="12" fill="none" stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
                <ellipse cx="50" cy="50" rx="14" ry="36" fill="none" stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
                <path d="M14 50 Q 50 68 86 50" fill="none" stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
                <path d="M14 50 Q 50 32 86 50" fill="none" stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />

                {/* Landmass Continents */}
                <path
                  d="M44 26 C47 24 53 25 55 28 C56 31 52 34 50 36 C49 40 52 45 54 50 C55 56 50 63 46 68 C42 67 40 60 41 54 C42 48 39 42 41 36 C41 30 42 27 44 26 Z"
                  fill="url(#promo-continent-blue)"
                />
                <path
                  d="M26 25 C29 23 33 26 31 31 C29 34 26 36 28 41 C29 44 32 47 30 53 C28 58 25 64 23 62 C21 57 23 50 22 44 C21 37 22 28 26 25 Z"
                  fill="url(#promo-continent-green)"
                  opacity="0.9"
                />
                <path
                  d="M59 23 C66 22 74 26 76 32 C78 38 72 44 69 47 C66 49 63 44 60 40 C58 36 56 32 57 26 Z"
                  fill="url(#promo-continent-blue)"
                />
                <path
                  d="M66 54 C72 52 76 56 75 62 C72 65 67 64 65 60 C64 57 65 55 66 54 Z"
                  fill="url(#promo-continent-green)"
                />

                {/* Constellation Connecting Lines */}
                <path d="M28 32 Q 40 22 50 30" fill="none" stroke="#60A5FA" strokeWidth="0.8" strokeDasharray="1.5 1.5" opacity="0.8" />
                <path d="M50 30 Q 62 24 70 34" fill="none" stroke="#60A5FA" strokeWidth="0.8" strokeDasharray="1.5 1.5" opacity="0.8" />
                <path d="M50 30 Q 54 44 53 48" fill="none" stroke="#60A5FA" strokeWidth="0.8" strokeDasharray="1.5 1.5" opacity="0.8" />
                <path d="M28 32 Q 24 48 30 52" fill="none" stroke="#60A5FA" strokeWidth="0.8" strokeDasharray="1.5 1.5" opacity="0.6" />
                <path d="M70 34 Q 74 48 66 54" fill="none" stroke="#60A5FA" strokeWidth="0.8" strokeDasharray="1.5 1.5" opacity="0.6" />

                {/* Nodes */}
                <circle cx="48" cy="30" r="3" fill="#1455AC" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="53" cy="48" r="2.8" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="70" cy="34" r="2.4" fill="#1455AC" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="28" cy="32" r="2.4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="46" cy="62" r="2" fill="#1455AC" stroke="#FFFFFF" strokeWidth="0.8" />
                <circle cx="66" cy="54" r="2" fill="#F58300" stroke="#FFFFFF" strokeWidth="0.8" />
              </svg>
            </div>

            <h4 className="text-[12px] font-bold text-[#1455AC] leading-tight font-sans">
              Juntos, construímos um mundo melhor.
            </h4>

            <button
              type="button"
              onClick={() => {
                if (onOpenImpactModal) {
                  onOpenImpactModal();
                } else {
                  onSelectTab('impacto');
                }
                if (onCloseMobile) onCloseMobile();
              }}
              className="mt-1.5 text-[11px] font-bold text-[#1455AC] hover:text-[#0F448A] inline-flex items-center gap-1 cursor-pointer hover:underline transition-colors"
            >
              <span>Ver impacto global</span>
              <ArrowRight className="w-3 h-3" />
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
