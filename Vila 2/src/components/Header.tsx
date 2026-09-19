import React, { useState } from 'react';
import { Search, Bell, Menu, ChevronDown, Check, Sparkles } from 'lucide-react';
import { GLOBAL_NOTIFICATIONS } from '../data/countriesData';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenAiChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenMobileMenu,
  onOpenAuth,
  onOpenAiChat,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'PT' | 'EN' | 'ES'>('PT');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [notifications, setNotifications] = useState(GLOBAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header
      id="main-top-header"
      className="sticky top-0 z-30 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 shadow-2xs"
    >
      {/* Mobile Menu Button on Small Screens */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          id="btn-mobile-menu-toggle"
          aria-label="Abrir Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-extrabold text-xl text-[#1455AC] font-sans">VILA</span>
      </div>

      {/* Central Wide Search Bar matching screenshot */}
      <div className="flex-1 max-w-2xl mx-auto">
        <button
          type="button"
          onClick={onOpenSearch}
          id="global-search-trigger"
          className="w-full flex items-center justify-between px-4 py-2.5 bg-[#F8FAFC] dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-[#94A3B8] transition-all group shadow-2xs hover:border-[#1455AC]/40 cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#1455AC] transition-colors shrink-0" />
            <span className="text-xs md:text-sm text-[#94A3B8] group-hover:text-slate-600 truncate">
              Pesquisar países, regiões, cidades, projetos, comunidades...
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <kbd className="px-2 py-0.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </button>
      </div>

      {/* Right Actions: Language Selector, Notification Bell with Red Badge, User Avatar */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        {/* Language Selector: Globe Icon + PT + Chevron */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            id="header-lang-selector"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#1455AC] hover:bg-[#1455AC]/10 transition-colors cursor-pointer"
          >
            {/* Globe Vector Icon */}
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#1455AC]" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <span>{selectedLanguage}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1.5 z-40">
              <button
                onClick={() => { setSelectedLanguage('PT'); setShowLangMenu(false); }}
                className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between cursor-pointer"
              >
                <span>🇵🇹 PT</span>
                {selectedLanguage === 'PT' && <Check className="w-3.5 h-3.5 text-[#1455AC]" />}
              </button>
              <button
                onClick={() => { setSelectedLanguage('EN'); setShowLangMenu(false); }}
                className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between cursor-pointer"
              >
                <span>🇬🇧 EN</span>
                {selectedLanguage === 'EN' && <Check className="w-3.5 h-3.5 text-[#1455AC]" />}
              </button>
              <button
                onClick={() => { setSelectedLanguage('ES'); setShowLangMenu(false); }}
                className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between cursor-pointer"
              >
                <span>🇪🇸 ES</span>
                {selectedLanguage === 'ES' && <Check className="w-3.5 h-3.5 text-[#1455AC]" />}
              </button>
            </div>
          )}
        </div>

        {/* Notification Bell with Red Badge "3" matching screenshot */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            id="header-notification-btn"
            className="relative p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-[#1455AC]/10 hover:text-[#1455AC] transition-colors cursor-pointer"
            aria-label="Notificações"
          >
            <Bell className="w-5 h-5" />
            <span
              id="header-notification-badge"
              className="absolute top-1 right-1 flex items-center justify-center min-w-[17px] h-[17px] px-1 text-[9.5px] font-bold text-white bg-[#F58300] rounded-full ring-2 ring-white dark:ring-slate-900"
            >
              3
            </span>
          </button>

          {/* Notifications Dropdown Card */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="p-3.5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#1455AC]">Notificações</h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#F58300]/15 text-[#F58300] rounded-full">
                      {unreadCount} novas
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-[#1455AC] hover:underline font-semibold cursor-pointer"
                  >
                    Marcar lidas
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                      !n.read ? 'bg-[#1455AC]/5 dark:bg-[#1455AC]/15' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">{n.title}</p>
                      <span className="text-[10px] text-[#94A3B8] shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-[#475569] dark:text-slate-400 mt-1 line-clamp-2">{n.description}</p>
                  </div>
                ))}
              </div>

              <div className="p-2.5 text-center border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-[#1455AC] hover:underline cursor-pointer"
                >
                  Ver histórico completo
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar with Online Status Dot and Dropdown Arrow matching screenshot */}
        <div
          onClick={() => onOpenAuth('login')}
          id="header-user-profile"
          className="flex items-center gap-1.5 pl-1 cursor-pointer group"
          title="Perfil do Utilizador"
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Avatar do Utilizador"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white dark:ring-slate-900 shadow-xs group-hover:ring-blue-200 transition-all"
            />
            {/* Online Green Status Dot */}
            <span
              id="header-user-status-dot"
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-2 ring-white dark:ring-slate-900"
            />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </header>
  );
};
