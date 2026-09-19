import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, ChevronDown, ChevronRight, Bell, Menu, X, Check, User, Settings, LogOut, ShieldCheck, Home, ArrowLeft, Building2, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { GLOBAL_NOTIFICATIONS } from '../data/countriesData';
import { DemoUser } from '../data/demoUsers';
import { DemoUserSwitcher } from './DemoUserSwitcher';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface TopbarProps {
  userName?: string;
  userAvatarUrl?: string;
  currentUser?: DemoUser;
  onSelectDemoUser?: (user: DemoUser) => void;
  notificationCount?: number;
  currentLanguage?: 'PT' | 'EN' | 'ES';
  searchPlaceholder?: string;
  breadcrumb?: BreadcrumbItem[];
  onLanguageChange?: (lang: 'PT' | 'EN' | 'ES') => void;
  onSearch?: (query: string) => void;
  onOpenSearchModal?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onMarkAllNotificationsRead?: () => void;
  onNavigateToTab?: (tabId: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  userName = 'Ana Silva',
  userAvatarUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  currentUser,
  onSelectDemoUser,
  notificationCount,
  currentLanguage = 'PT',
  searchPlaceholder = 'Pesquisar países, regiões, cidades, projetos, comunidades...',
  breadcrumb,
  onLanguageChange,
  onSearch,
  onOpenSearchModal,
  onOpenMobileMenu,
  onOpenAuth,
  onMarkAllNotificationsRead,
  onNavigateToTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'PT' | 'EN' | 'ES'>(currentLanguage);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState(GLOBAL_NOTIFICATIONS);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const avatarDropdownRef = useRef<HTMLDivElement>(null);

  // Sync external language changes if provided
  useEffect(() => {
    if (currentLanguage) {
      setSelectedLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  // Global keyboard shortcut: Cmd+K or Ctrl+K to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (window.innerWidth < 768) {
          setIsMobileSearchOpen(true);
          setTimeout(() => mobileSearchInputRef.current?.focus(), 50);
        } else {
          searchInputRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setIsLangOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(target)) {
        setIsNotificationsOpen(false);
      }
      if (avatarDropdownRef.current && !avatarDropdownRef.current.contains(target)) {
        setIsAvatarMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (lang: 'PT' | 'EN' | 'ES') => {
    setSelectedLanguage(lang);
    setIsLangOpen(false);
    onLanguageChange?.(lang);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
    onOpenSearchModal?.();
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    onMarkAllNotificationsRead?.();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayCount = notificationCount !== undefined ? notificationCount : unreadCount;

  return (
    <header
      id="topbar"
      className="h-14 shrink-0 w-full bg-[#F1F5F9]/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-3.5 sm:px-5 lg:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 transition-all select-none"
    >
      {/* Mobile Menu Toggle & Brand (visible on screens < lg) */}
      <div className="flex items-center gap-2 lg:hidden">
        {onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            id="topbar-btn-mobile-menu"
            aria-label="Abrir Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <Logo showTagline={false} size="sm" />
      </div>

      {/* Breadcrumb Contextual (Desktop) */}
      {breadcrumb && breadcrumb.length > 0 && (
        <nav
          id="topbar-breadcrumb"
          className="hidden lg:flex items-center gap-2 text-[13px] font-medium shrink-0 max-w-sm truncate"
          aria-label="Breadcrumb"
        >
          {breadcrumb[0]?.onClick && (
            <button
              type="button"
              onClick={breadcrumb[0].onClick}
              className="w-8 h-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-[#1455AC] transition-colors shadow-2xs cursor-pointer shrink-0"
              title="Voltar"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            </button>
          )}

          <Globe className="w-4 h-4 text-[#1455AC] shrink-0" />
          {breadcrumb.map((item, idx) => {
            const isLast = idx === breadcrumb.length - 1;
            return (
              <React.Fragment key={`${item.label}-${idx}`}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" strokeWidth={2.5} />}
                {item.onClick && !isLast ? (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="text-slate-700 dark:text-slate-300 hover:text-[#1455AC] font-semibold truncate transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className={`truncate ${isLast ? 'font-bold text-slate-900 dark:text-slate-50' : 'text-slate-700 dark:text-slate-300 font-semibold'}`}>
                    {item.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      )}

      {/* 1. Input de Busca Centralizado */}
      <div className="hidden md:flex flex-1 max-w-xl mx-auto" id="topbar-search-container">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
          <Search className="absolute left-4 w-4.5 h-4.5 text-slate-500 dark:text-slate-500 pointer-events-none" strokeWidth={2} />
          <input
            ref={searchInputRef}
            type="text"
            id="topbar-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-lg pl-11 pr-14 py-2 text-[13px] font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#1455AC]/20 focus:border-[#1455AC] transition-all"
          />
          <kbd
            onClick={() => {
              if (onOpenSearchModal) onOpenSearchModal();
              else searchInputRef.current?.focus();
            }}
            className="absolute right-3.5 text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500 select-none cursor-pointer hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            title="Pressione ⌘K ou Ctrl+K para pesquisar"
          >
            ⌘K
          </kbd>
        </form>
      </div>

      {/* Mobile Search Icon Trigger (< md) */}
      <div className="flex md:hidden items-center ml-auto mr-1">
        <button
          type="button"
          onClick={() => {
            setIsMobileSearchOpen(true);
            setTimeout(() => mobileSearchInputRef.current?.focus(), 50);
          }}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
          id="topbar-mobile-search-trigger"
          aria-label="Abrir pesquisa"
        >
          <Search className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </button>
      </div>

      {/* Mobile Fullscreen/Overlay Search Bar */}
      {isMobileSearchOpen && (
        <div className="fixed inset-x-0 top-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50 px-4 flex items-center gap-2 shadow-md md:hidden">
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <input
              ref={mobileSearchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar no VILA..."
              className="w-full h-10 pl-9 pr-9 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1455AC]/20 focus:border-[#1455AC]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(false)}
            className="p-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* 2. Ações do Usuário (Direita) */}
      <div className="flex items-center gap-3 shrink-0" id="topbar-right-actions">
        {/* Seletor de Idioma Superior */}
        <div className="relative" ref={langDropdownRef}>
          <button
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            id="topbar-language-selector"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 transition-colors cursor-pointer py-1.5 px-2 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-800"
            aria-haspopup="menu"
            aria-expanded={isLangOpen}
          >
            <Globe className="w-4 h-4 text-slate-600 dark:text-slate-400" strokeWidth={2} />
            <span>{selectedLanguage}</span>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
                isLangOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown de Idiomas (PT / EN / ES) */}
          {isLangOpen && (
            <div
              id="topbar-lang-dropdown"
              role="menu"
              className="absolute right-0 mt-1.5 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-1 z-50 animate-in fade-in duration-150"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => handleSelectLanguage('PT')}
                className={`w-full text-left px-2.5 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  selectedLanguage === 'PT' ? 'text-[#1455AC] font-semibold bg-[#1455AC]/10' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>🇵🇹</span> Português
                </span>
                {selectedLanguage === 'PT' && <Check className="w-3.5 h-3.5 text-[#1455AC]" />}
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => handleSelectLanguage('EN')}
                className={`w-full text-left px-2.5 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  selectedLanguage === 'EN' ? 'text-[#1455AC] font-semibold bg-[#1455AC]/10' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>🇬🇧</span> English
                </span>
                {selectedLanguage === 'EN' && <Check className="w-3.5 h-3.5 text-[#1455AC]" />}
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => handleSelectLanguage('ES')}
                className={`w-full text-left px-2.5 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  selectedLanguage === 'ES' ? 'text-[#1455AC] font-semibold bg-[#1455AC]/10' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>🇪🇸</span> Español
                </span>
                {selectedLanguage === 'ES' && <Check className="w-3.5 h-3.5 text-[#1455AC]" />}
              </button>
            </div>
          )}
        </div>

        {/* Notificação com Indicador Discreto */}
        <div className="relative" ref={notifDropdownRef}>
          <button
            type="button"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            id="topbar-notifications-trigger"
            className="relative p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Notificações"
            aria-haspopup="menu"
            aria-expanded={isNotificationsOpen}
          >
            <Bell className="w-4.5 h-4.5" strokeWidth={2} />
            <span
              id="topbar-notification-badge"
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F58300] ring-2 ring-white dark:ring-slate-900"
            />
          </button>

          {/* Dropdown de Notificações */}
          {isNotificationsOpen && (
            <div
              id="topbar-notifications-dropdown"
              className="absolute right-0 mt-1.5 w-80 md:w-92 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in duration-150"
            >
              <div className="p-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50">Notificações</h4>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] text-[#1455AC] hover:underline font-medium cursor-pointer"
                  >
                    Marcar lidas
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-700/60 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                      !n.read ? 'bg-[#1455AC]/5 dark:bg-[#1455AC]/15' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{n.title}</p>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">{n.description}</p>
                  </div>
                ))}
              </div>

              <div className="p-2.5 text-center border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
                <button
                  type="button"
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-xs font-bold text-[#1455AC] hover:underline cursor-pointer"
                >
                  Ver todas as atualizações
                </button>
              </div>
            </div>
          )}
        </div>

          {/* Seletor de Utilizador Demo (Troca rápida de papel em dev) */}
          {currentUser && onSelectDemoUser && (
            <DemoUserSwitcher
              currentUser={currentUser}
              onSelectUser={onSelectDemoUser}
            />
          )}

          {/* Avatar do Usuário + Indicador Online */}
          <div className="relative" ref={avatarDropdownRef}>
            <div
              onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
              id="topbar-user-avatar-trigger"
              className="relative cursor-pointer group"
              role="button"
              tabIndex={0}
              aria-haspopup="menu"
              aria-expanded={isAvatarMenuOpen}
              onKeyDown={(e) => e.key === 'Enter' && setIsAvatarMenuOpen(!isAvatarMenuOpen)}
              title="Perfil do Utilizador"
            >
              {userAvatarUrl ? (
                <img
                  src={userAvatarUrl}
                  alt={userName}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 group-hover:ring-2 group-hover:ring-[#1455AC]/30 transition-all"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-slate-200/80 dark:group-hover:bg-slate-700 group-hover:ring-2 group-hover:ring-[#1455AC]/30 transition-all shadow-2xs">
                  <User className="w-4.5 h-4.5 text-slate-600 dark:text-slate-400" />
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22C55E] border-2 border-white dark:border-slate-900 rounded-full"></span>
            </div>

            {/* Dropdown de Menu do Avatar */}
            {isAvatarMenuOpen && (
              <div
                id="topbar-user-dropdown"
                role="menu"
                className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
                  {userAvatarUrl ? (
                    <img
                      src={userAvatarUrl}
                      alt={userName}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0">
                      <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-50 truncate">{userName}</p>
                    <p className="text-[10px] text-[#1455AC] font-semibold truncate">
                      {currentUser?.roleLabel || 'Membro Global'}
                    </p>
                    {currentUser?.scope && currentUser.scope !== '—' && (
                      <p className="text-[9.5px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                        {currentUser.scope}
                      </p>
                    )}
                  </div>
                </div>

                <div className="py-1">
                  {/* Atalho exclusivo para Administradores */}
                  {currentUser?.isAdmin && (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setIsAvatarMenuOpen(false);
                        onNavigateToTab?.('painel-gestao');
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-bold text-[#1455AC] bg-[#1455AC]/10 hover:bg-[#1455AC]/15 flex items-center gap-2.5 transition-colors cursor-pointer border-b border-slate-100 dark:border-slate-700 mb-1"
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#1455AC]" />
                      <span>Painel de Gestão</span>
                    </button>
                  )}

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsAvatarMenuOpen(false);
                      onNavigateToTab?.('perfil-vila');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>Meu Perfil</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsAvatarMenuOpen(false);
                      onNavigateToTab?.('territorios');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>Os Meus Territórios</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsAvatarMenuOpen(false);
                      onNavigateToTab?.('definicoes');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>Privacidade & Dados</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsAvatarMenuOpen(false);
                      onNavigateToTab?.('definicoes');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>Definições da Conta</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100 dark:border-slate-700">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setIsAvatarMenuOpen(false);
                      onOpenAuth?.('login');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50/60 dark:hover:bg-red-950/30 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
                    <span>Terminar Sessão</span>
                  </button>
                </div>
              </div>
            )}
          </div>
      </div>
    </header>
  );
};
