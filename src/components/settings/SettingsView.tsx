import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  Search,
  Bell,
  ChevronDown,
  User,
  Sliders,
  ShieldCheck,
  Users,
  Link2,
  Clock,
  Info,
  Menu,
  Sparkles,
} from 'lucide-react';
import { SettingsTabId } from './types';
import { ProfileTab } from './ProfileTab';
import { PreferencesTab } from './PreferencesTab';
import { NotificationsTab } from './NotificationsTab';
import { PrivacySecurityTab } from './PrivacySecurityTab';
import { AccountsAccessTab } from './AccountsAccessTab';
import { IntegrationsTab } from './IntegrationsTab';
import { AboutTab } from './AboutTab';

interface SettingsViewProps {
  initialTab?: SettingsTabId;
  onOpenMobileMenu?: () => void;
  onNavigateToTab?: (tabId: string) => void;
  onOpenAiAssistant?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  initialTab = 'sobre',
  onOpenMobileMenu,
  onNavigateToTab,
  onOpenAiAssistant,
  onOpenAuth,
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTabId>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Update active tab if initialTab changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Tab definitions in exact specified order matching UI CONTAS E ACESSOS and UI INTEGRACOES
  const tabs: { id: SettingsTabId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'preferencias', label: 'Preferências', icon: Sliders },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'privacidade', label: 'Privacidade e Segurança', icon: ShieldCheck },
    { id: 'contas', label: 'Contas e Acessos', icon: Users },
    { id: 'integracoes', label: 'Integrações', icon: Link2 },
    { id: 'sobre', label: 'Sobre', icon: Info },
  ];

  // Dynamic titles and subtitles per tab matching mockup
  const tabMetadata: Record<
    SettingsTabId,
    { title: string; subtitle: string; breadcrumb: string }
  > = {
    perfil: {
      title: 'Perfil',
      subtitle: 'Consulte o seu resumo pessoal, conquistas e atalhos de configuração.',
      breadcrumb: 'Perfil',
    },
    preferencias: {
      title: 'Preferências',
      subtitle: 'Personalize a sua experiência na VILA.',
      breadcrumb: 'Preferências',
    },
    notificacoes: {
      title: 'Notificações',
      subtitle: 'Escolha como e quando deseja receber notificações da VILA.',
      breadcrumb: 'Notificações',
    },
    privacidade: {
      title: 'Privacidade e Segurança',
      subtitle: 'Controle como os seus dados são usados e mantenha a sua conta segura.',
      breadcrumb: 'Privacidade e Segurança',
    },
    contas: {
      title: 'Contas e Acessos',
      subtitle: 'Gerencie as suas credenciais, métodos de acesso e dispositivos conectados.',
      breadcrumb: 'Contas e Acessos',
    },
    integracoes: {
      title: 'Integrações',
      subtitle: 'Conecte a VILA com as ferramentas e serviços que você já usa.',
      breadcrumb: 'Integrações',
    },
    sobre: {
      title: 'Sobre a VILA',
      subtitle: 'Conheça mais sobre a nossa missão, visão e o propósito que nos move.',
      breadcrumb: 'Sobre',
    },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* 1. Header / Topbar da Área de Definições */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Esquerda: Menu Mobile e Breadcrumb exato "Preferências > Contas e Acessos" */}
          <div className="flex items-center gap-3 min-w-0">
            {onOpenMobileMenu && (
              <button
                type="button"
                onClick={onOpenMobileMenu}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                title="Abrir menu lateral"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* Breadcrumb idêntico à imagem: Ícone + Preferências > [Nome da Aba] */}
            <nav className="flex items-center gap-2 text-xs text-slate-500 min-w-0 font-sans">
              <button
                type="button"
                onClick={() => onNavigateToTab?.('inicio')}
                className="text-[#1455AC] hover:underline flex items-center gap-1.5 cursor-pointer shrink-0 font-medium font-sans"
              >
                <Sliders className="w-3.5 h-3.5 text-[#1455AC]" />
                <span>Preferências</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-bold text-slate-900 truncate font-sans">
                {tabMetadata[activeTab].breadcrumb}
              </span>
            </nav>
          </div>

          {/* Direita: Pesquisa, Notificações com Badge e Perfil Divan Mellert */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 font-sans">
            {/* Input de Pesquisa Pill */}
            <div className="relative hidden md:block w-48 lg:w-64 font-sans">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50/80 hover:bg-slate-50 text-xs text-slate-800 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-[#1455AC] focus:bg-white outline-none transition-all shadow-2xs font-sans"
              />
            </div>

            {/* Botão Notificações com Badge "3" */}
            <button
              type="button"
              onClick={() => setActiveTab('notificacoes')}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer font-sans"
              title="Notificações"
            >
              <Bell className="w-4.5 h-4.5 text-slate-700" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#f58300] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                3
              </span>
            </button>

            {/* Menu de Perfil Divan Mellert com Chevron */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Divan Mellert"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-[#0F172A] leading-tight">Divan Mellert</p>
                  <p className="text-[11px] text-slate-400 leading-tight">Administrador</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* Dropdown do Usuário */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-[#0F172A]">Divan Mellert</p>
                    <p className="text-[11px] text-slate-500">divan@vilaglobal.org</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('perfil');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    O meu perfil
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('contas');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    Contas e Acessos
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('preferencias');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5 text-slate-400" />
                    Preferências
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onOpenAiAssistant?.();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Assistente VILA AI
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Conteúdo Principal */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        {/* Título & Subtítulo dinâmico da Aba Ativa (exatamente como em UI CONTAS E ACESSOS) */}
        <div className="space-y-1 font-sans">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
            {tabMetadata[activeTab].title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-sans">
            {tabMetadata[activeTab].subtitle}
          </p>
        </div>

        {/* 3. Barra de Navegação das 7 Abas na ordem exata */}
        <div className="border-b border-slate-200 overflow-x-auto no-scrollbar font-sans">
          <div className="flex items-center gap-4 sm:gap-7 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 sm:px-2 flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all relative cursor-pointer font-sans ${
                    isActive
                      ? 'text-[#1455AC]'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1455AC]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>

                  {/* Linha azul sublinhada para aba ativa */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1455AC] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Renderizador do Conteúdo da Aba Ativa */}
        <div className="pt-2">
          {activeTab === 'perfil' && (
            <ProfileTab onNavigateTab={(tabId) => setActiveTab(tabId)} />
          )}

          {activeTab === 'preferencias' && (
            <PreferencesTab />
          )}

          {activeTab === 'notificacoes' && (
            <NotificationsTab />
          )}

          {activeTab === 'privacidade' && (
            <PrivacySecurityTab />
          )}

          {activeTab === 'contas' && (
            <AccountsAccessTab onNavigateTab={(tabId) => setActiveTab(tabId)} />
          )}

          {activeTab === 'integracoes' && (
            <IntegrationsTab />
          )}

          {activeTab === 'sobre' && (
            <AboutTab />
          )}
        </div>
      </main>
    </div>
  );
};
