import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppLayout } from './components/AppLayout';
import { AdminLayout } from './components/AdminLayout';
import { Sidebar } from './components/Sidebar';
import { Topbar, BreadcrumbItem } from './components/Topbar';
import { MapHeroSection } from './components/MapHeroSection';
import { FeaturedCountriesSection } from './components/FeaturedCountriesSection';
import { ExploreWorldView } from './components/ExploreWorldView';
import { GlobalNewsView } from './components/GlobalNewsView';
import { GlobalEventsView } from './components/GlobalEventsView';
import { GlobalCommunityView } from './components/GlobalCommunityView';
import { GlobalImpactView } from './components/GlobalImpactView';
import { AboutVilaView } from './components/AboutVilaView';
import { SettingsView } from './components/SettingsView';
import { VilaAiView } from './components/VilaAiView';
import { GlobalPartnersView } from './components/GlobalPartnersView';
import { PerfilVilaView } from './components/perfil-vila/PerfilVilaView';
import { PainelGestaoPlaceholderView } from './components/PainelGestaoPlaceholderView';
import { AdminRestrictedAccessView } from './components/AdminRestrictedAccessView';
import { DEMO_USERS, DemoUser } from './data/demoUsers';
import { CountryDetailModal } from './components/CountryDetailModal';
import { VideoModal } from './components/VideoModal';
import { SearchCommandModal } from './components/SearchCommandModal';
import { VilaAiChatModal } from './components/VilaAiChatModal';
import { AuthModal } from './components/AuthModal';
import { ImpactModal } from './components/ImpactModal';
import { SupportModal } from './components/SupportModal';
import { AcessoRestritoAdminView } from './components/AcessoRestritoAdminView';
import { COUNTRIES_DATA } from './data/countriesData';
import { CountryData } from './types';
import {
  Globe2,
  Calendar,
  Users,
  Sparkles,
  TrendingUp,
  HeartHandshake,
  Info,
  Settings,
  ArrowRight,
  CheckCircle2,
  Filter,
  Flame,
} from 'lucide-react';

// Abas que renderizam GlobalCommunityView / GlobalImpactView (mantidas em sincronia com os ramos condicionais abaixo)
const COMMUNITY_TABS = ['comunidade', 'comunidade-global', 'ambiente', 'educacao', 'cultura', 'criar-comunidade', 'explorar-comunidade', 'mais'];
const IMPACT_TABS = ['impacto', 'impacto-global', 'saude', 'tecnologia', 'empreendedorismo', 'direitos-humanos', 'impacto-cultura', 'cultura-impacto'];
const BREADCRUMB_TABS = [
  ...COMMUNITY_TABS,
  ...IMPACT_TABS,
  'ia',
  'parceiros',
  'parceiros-globais',
  'perfil',
  'meu-perfil',
  'perfil-vila',
  'territorios',
  'os-meus-territorios',
  'meus-territorios',
  'identidade',
  'identidade-vila',
  'interesses',
  'interesses-geral',
  'interesses-temas',
  'interesses-causas',
  'interesses-comunidades',
  'interesses-oportunidades',
  'painel-gestao',
  'gestao-utilizadores',
  'gestao-parceiros',
  'gestao-recursos',
  'gestao-suporte',
  'impacto-global-plataforma',
  'gestao-impacto',
  'impacto-plataforma',
  'membros',
  'recursos',
  'suporte',
];

const PLATAFORMA_TABS = [
  'painel-gestao',
  'gestao',
  'admin',
  'visao-geral',
  'gestao-utilizadores',
  'utilizadores-comunidades',
  'membros',
  'territorios-paises',
  'gestao-territorios',
  'projetos-iniciativas',
  'gestao-projetos',
  'participacao-consultas',
  'gestao-consultas',
  'eventos-globais-admin',
  'gestao-eventos',
  'gestao-parceiros',
  'parceiros-colaboracoes',
  'gestao-recursos',
  'recursos-infraestrutura',
  'recursos',
  'relatorios-dados',
  'gestao-relatorios',
  'relatorios',
  'configuracoes-plataforma',
  'gestao-configuracoes',
  'configuracoes',
  'impacto-global-plataforma',
  'gestao-impacto',
  'impacto-plataforma',
  'gestao-suporte',
  'suporte',
];

export const isPlataformaTab = (tab: string): boolean => {
  return (
    PLATAFORMA_TABS.includes(tab) ||
    tab === 'painel-gestao' ||
    tab === 'gestao' ||
    tab === 'admin' ||
    tab === 'visao-geral' ||
    tab === 'territorios-paises' ||
    tab === 'projetos-iniciativas' ||
    tab === 'participacao-consultas' ||
    tab === 'eventos-globais-admin' ||
    tab === 'relatorios-dados' ||
    tab === 'configuracoes-plataforma' ||
    tab === 'impacto-global-plataforma' ||
    tab === 'gestao-impacto' ||
    tab === 'impacto-plataforma' ||
    tab.startsWith('gestao-')
  );
};

const getInitialTab = (): string => {
  if (typeof window === 'undefined') return 'inicio';
  const hash = window.location.hash.replace('#', '').toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab')?.toLowerCase();
  const pathname = window.location.pathname.replace(/^\//, '').toLowerCase();
  const target = tabParam || hash || pathname;

  if (
    target === 'noticias' ||
    target === 'movimento' ||
    target === 'mundo-em-movimento' ||
    target.includes('movimento') ||
    target.includes('noticia')
  ) {
    return 'noticias';
  } else if (
    target === 'painel-gestao' ||
    target === 'gestao' ||
    target === 'admin' ||
    target === 'visao-geral' ||
    target === 'gestao-utilizadores' ||
    target === 'utilizadores-comunidades' ||
    target === 'membros' ||
    target === 'territorios-paises' ||
    target === 'projetos-iniciativas' ||
    target === 'participacao-consultas' ||
    target === 'eventos-globais-admin' ||
    target === 'gestao-parceiros' ||
    target === 'gestao-recursos' ||
    target === 'relatorios-dados' ||
    target === 'relatorios' ||
    target === 'configuracoes-plataforma' ||
    target === 'configuracoes' ||
    target === 'impacto-global-plataforma' ||
    target === 'gestao-suporte' ||
    target === 'recursos' ||
    target === 'suporte' ||
    target.startsWith('gestao-')
  ) {
    return target;
  } else if (target === 'criar-comunidade') {
    return 'criar-comunidade';
  } else if (target === 'mais' || target === 'mais-categorias') {
    return 'mais';
  } else if (target === 'explorar-comunidade') {
    return 'explorar-comunidade';
  } else if (target === 'comunidade' || target === 'comunidade-global' || target.includes('comunidade')) {
    return 'comunidade';
  } else if (target === 'eventos' || target === 'eventos-globais') {
    return 'eventos';
  } else if (target === 'explorar' || target === 'explorar-o-mundo') {
    return 'explorar';
  } else if (target === 'impacto' || target === 'impacto-global') {
    return 'impacto';
  } else if (target === 'perfil-vila' || target === 'perfil' || target === 'meu-perfil') {
    return 'perfil-vila';
  } else if (target === 'sobre' || target === 'sobre-a-vila' || target.includes('sobre')) {
    return 'sobre';
  } else if (target === 'definicoes' || target === 'settings' || target === 'preferencias' || target === 'configuracoes' || target === 'privacidade' || target === 'seguranca') {
    return 'definicoes';
  } else if (target === 'empreendedorismo' || target === 'tecnologia' || target === 'saude' || target === 'direitos-humanos' || target === 'impacto-cultura' || target === 'cultura-impacto') {
    return target;
  } else if (target === 'inicio' || target === 'home' || !target) {
    return 'inicio';
  }
  return 'inicio';
};

export default function App() {
  const [currentTab, setCurrentTab] = useState(getInitialTab);
  const [currentUser, setCurrentUser] = useState<DemoUser>(DEMO_USERS[0]);
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(COUNTRIES_DATA[0]); // Portugal by default
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([]);

  const handleBreadcrumbChange = useCallback((items: BreadcrumbItem[]) => {
    setBreadcrumb((prev) => {
      if (
        prev.length === items.length &&
        prev.every((item, idx) => item.label === items[idx]?.label)
      ) {
        return prev;
      }
      return items;
    });
  }, []);

  // Modals state
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isImpactModalOpen, setIsImpactModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mantém referência síncrona do utilizador atual para os listeners de rota
  const currentUserRef = useRef(currentUser);
  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  // Se o utilizador atual não for admin, garante que o modal de suporte operacional da plataforma é fechado
  useEffect(() => {
    if (!currentUser.isAdmin && isSupportModalOpen) {
      setIsSupportModalOpen(false);
    }
  }, [currentUser.isAdmin, isSupportModalOpen]);

  // Limpa o breadcrumb do Topbar ao sair das áreas que o alimentam via onBreadcrumbChange
  useEffect(() => {
    if (!BREADCRUMB_TABS.includes(currentTab) && !isPlataformaTab(currentTab)) {
      setBreadcrumb((prev) => (prev.length === 0 ? prev : []));
    }
  }, [currentTab]);

  const handleNavigateToTab = useCallback((tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentTab('inicio');
    window.location.hash = 'inicio';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSwitchToAdmin = useCallback((adminUser: DemoUser) => {
    setCurrentUser(adminUser);
  }, []);

  // URL hash, query parameter and pathname router sync
  useEffect(() => {
    const handleSyncRoute = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab')?.toLowerCase();
      const pathname = window.location.pathname.replace(/^\//, '').toLowerCase();
      const target = tabParam || hash || pathname;

      if (
        target === 'noticias' ||
        target === 'movimento' ||
        target === 'mundo-em-movimento' ||
        target.includes('movimento') ||
        target.includes('noticia')
      ) {
        setCurrentTab('noticias');
      } else if (target === 'criar-comunidade') {
        setCurrentTab('criar-comunidade');
      } else if (target === 'mais' || target === 'mais-categorias') {
        setCurrentTab('mais');
      } else if (target === 'explorar-comunidade') {
        setCurrentTab('explorar-comunidade');
      } else if (target === 'ambiente') {
        setCurrentTab('ambiente');
      } else if (target === 'comunidade' || target === 'comunidade-global' || target.includes('comunidade')) {
        setCurrentTab('comunidade');
      } else if (target === 'eventos' || target === 'eventos-globais') {
        setCurrentTab('eventos');
      } else if (target === 'explorar' || target === 'explorar-o-mundo') {
        setCurrentTab('explorar');
      } else if (target === 'empreendedorismo' || target === 'tecnologia' || target === 'saude' || target === 'direitos-humanos') {
        setCurrentTab(target);
      } else if (target === 'impacto' || target === 'impacto-global') {
        setCurrentTab('impacto');
      } else if (isPlataformaTab(target)) {
        setCurrentTab(target);
        // Suporte da plataforma só abre automaticamente via URL se for perfil administrador
        if ((target === 'gestao-suporte' || target === 'suporte') && currentUserRef.current.isAdmin) {
          setIsSupportModalOpen(true);
        }
      } else if (target === 'sobre' || target === 'sobre-a-vila' || target.includes('sobre')) {
        setCurrentTab('sobre');
      } else if (target === 'definicoes' || target === 'settings' || target === 'preferencias' || target === 'configuracoes') {
        setCurrentTab('definicoes');
      } else if (target === 'inicio' || target === 'home' || target === '') {
        setCurrentTab('inicio');
      }
    };

    handleSyncRoute();
    window.addEventListener('hashchange', handleSyncRoute);
    window.addEventListener('popstate', handleSyncRoute);
    return () => {
      window.removeEventListener('hashchange', handleSyncRoute);
      window.removeEventListener('popstate', handleSyncRoute);
    };
  }, []);

  // Global keyboard shortcut for search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectCountry = (country: CountryData) => {
    setSelectedCountry(country);
  };

  const handleExploreCountry = (country: CountryData) => {
    setSelectedCountry(country);
    setIsCountryModalOpen(true);
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode });
  };

  // Se estiver em rota da Plataforma e o perfil for administrador, usa o AdminLayout com AdminSidebar
  const isPlatformAdmin = isPlataformaTab(currentTab) && currentUser.isAdmin;
  const LayoutComponent = isPlatformAdmin ? AdminLayout : AppLayout;

  return (
    <>
      <LayoutComponent
        currentTab={currentTab}
        currentUser={currentUser}
        onSelectDemoUser={setCurrentUser}
        onSelectTab={(tabId) => {
          if (tabId === 'ia') {
            setIsAiModalOpen(true);
            return;
          }
          setCurrentTab(tabId);
          window.location.hash = tabId;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={handleOpenAuth}
        onOpenImpactModal={() => setIsImpactModalOpen(true)}
        onOpenSupportModal={() => {
          if (currentUser.isAdmin) {
            setIsSupportModalOpen(true);
          }
        }}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onCloseMobileSidebar={() => setIsMobileSidebarOpen(false)}
        onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
        searchPlaceholder={
          isPlatformAdmin
            ? 'Pesquisar na plataforma...'
            : COMMUNITY_TABS.includes(currentTab)
            ? 'Pesquisar pessoas, comunidades, temas, organizações...'
            : IMPACT_TABS.includes(currentTab)
            ? 'Pesquisar iniciativas, temas, organizações...'
            : currentTab === 'eventos'
            ? 'Pesquisar eventos, temas, locais, organizações...'
            : currentTab === 'noticias' || currentTab === 'movimento'
            ? 'Pesquisar temas, países, pessoas, organizações...'
            : 'Pesquisar países, regiões, cidades, projetos, comunidades...'
        }
        breadcrumb={breadcrumb}
        showTopbar={
          currentTab === 'inicio' ||
          currentTab === 'noticias' ||
          currentTab === 'movimento' ||
          currentTab === 'eventos' ||
          isPlataformaTab(currentTab) ||
          COMMUNITY_TABS.includes(currentTab) ||
          IMPACT_TABS.includes(currentTab)
        }
      >
        {currentTab === 'inicio' ? (
          <div className="px-3.5 sm:px-5 lg:px-6 pt-1 pb-10 flex flex-col gap-6 lg:gap-8 max-w-[1600px] mx-auto">
            {/* Hero Section with Interactive Vector World Map */}
            <MapHeroSection
              selectedCountry={selectedCountry}
              onSelectCountry={handleSelectCountry}
              onExploreWorld={() => {
                setCurrentTab('explorar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onWatchTour={() => setIsVideoModalOpen(true)}
              onExploreCountry={handleExploreCountry}
            />

            {/* Featured Countries Section Carousel */}
            <FeaturedCountriesSection
              selectedCountry={selectedCountry}
              onSelectCountry={handleSelectCountry}
              onExploreCountry={handleExploreCountry}
              onViewAllCountries={() => {
                setCurrentTab('explorar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAiAssistant={() => setIsAiModalOpen(true)}
            />
          </div>
        ) : currentTab === 'explorar' ? (
          <div className="px-3.5 sm:px-5 lg:px-6 pt-4 sm:pt-6 pb-10 flex flex-col gap-6 lg:gap-8 max-w-[1600px] mx-auto">
            {/* Explorar o Mundo View with 3 Columns and Map */}
            <ExploreWorldView
              selectedCountry={selectedCountry}
              onSelectCountry={handleSelectCountry}
              onExploreCountry={handleExploreCountry}
              onBackToHome={() => {
                setCurrentTab('inicio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAiAssistant={() => setIsAiModalOpen(true)}
              onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
            />
          </div>
        ) : (currentTab === 'noticias' || currentTab === 'movimento' || currentTab === 'mundo-em-movimento') ? (
          /* Notícias Globais / Mundo em Movimento View */
          <GlobalNewsView
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onExploreMap={() => {
              setCurrentTab('explorar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : currentTab === 'eventos' ? (
          /* Eventos Globais View */
          <GlobalEventsView 
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onExploreMap={() => {
              setCurrentTab('explorar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : COMMUNITY_TABS.includes(currentTab) ? (
          /* Comunidade Global (Página Oficial, Categorias e Criar Comunidade UI CRIAR COMUNIDADE.png) */
          <GlobalCommunityView
            initialSubView={
              currentTab === 'mais'
                ? 'mais'
                : currentTab === 'explorar-comunidade'
                ? 'explorar'
                : currentTab === 'ambiente'
                ? 'ambiente'
                : currentTab === 'educacao'
                ? 'educacao'
                : currentTab === 'direitos-humanos'
                ? 'direitos-humanos'
                : currentTab === 'cultura'
                ? 'cultura'
                : currentTab === 'saude'
                ? 'saude'
                : currentTab === 'tecnologia'
                ? 'tecnologia'
                : currentTab === 'criar-comunidade'
                ? 'criar-comunidade'
                : 'official'
            }
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
            onOpenAuth={handleOpenAuth}
            onNavigateToTab={(tabId) => {
              setCurrentTab(tabId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreMap={() => {
              setCurrentTab('explorar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreWorld={() => {
              setCurrentTab('explorar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCreateCommunityModal={() => {
              handleNavigateToTab('criar-comunidade');
            }}
            onBreadcrumbChange={handleBreadcrumbChange}
          />
        ) : IMPACT_TABS.includes(currentTab) ? (
          /* Impacto Global (UI IMPACTO GLOBAL.png) / Ambiente / Saúde / Tecnologia / Empreendedorismo */
          <GlobalImpactView
            initialSubView={
              currentTab === 'direitos-humanos' ? 'direitos-humanos' :
              currentTab === 'empreendedorismo' ? 'empreendedorismo' :
              currentTab === 'tecnologia' ? 'tecnologia' :
              currentTab === 'saude' ? 'saude' :
              currentTab === 'ambiente' ? 'ambiente' :
              currentTab === 'impacto-cultura' || currentTab === 'cultura-impacto' ? 'cultura' :
              'todas'
            }
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
            onOpenAuth={handleOpenAuth}
            onNavigateToTab={handleNavigateToTab}
            onNavigateToCategory={(cat) => {
              if (cat === 'mais' || cat === 'mais-categorias') {
                setCurrentTab('mais');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                handleNavigateToTab(cat);
              }
            }}
            onExploreWorld={() => {
              setCurrentTab('explorar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreCommunity={() => {
              setCurrentTab('comunidade');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBreadcrumbChange={handleBreadcrumbChange}
          />
        ) : currentTab === 'ia' ? (
          /* VILA AI Copiloto & Inteligência Coletiva Global */
          <VilaAiView
            onNavigateToTab={handleNavigateToTab}
            onOpenAuth={handleOpenAuth}
            onBreadcrumbChange={handleBreadcrumbChange}
          />
        ) : (currentTab === 'parceiros' || currentTab === 'parceiros-globais') ? (
          /* Parceiros Globais (Alianças, Mapa Mundial, Projetos Co-financiados) */
          <GlobalPartnersView
            onNavigateToTab={handleNavigateToTab}
            onOpenAuth={handleOpenAuth}
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onBreadcrumbChange={handleBreadcrumbChange}
          />
        ) : isPlataformaTab(currentTab) ? (
          /* Centralized Guard: Painel de Gestão da Plataforma (Área de Governança & Administração) */
          currentUser.isAdmin ? (
            <PainelGestaoPlaceholderView
              currentUser={currentUser}
              currentSection={currentTab}
              onNavigateToTab={handleNavigateToTab}
              onBreadcrumbChange={handleBreadcrumbChange}
              onOpenSupportModal={() => setIsSupportModalOpen(true)}
            />
          ) : (
            <AdminRestrictedAccessView
              currentUser={currentUser}
              attemptedRoute={currentTab}
              onBackToHome={handleBackToHome}
              onNavigateToTab={handleNavigateToTab}
              onSwitchToAdmin={handleSwitchToAdmin}
              onBreadcrumbChange={handleBreadcrumbChange}
            />
          )
        ) : (
          currentTab === 'perfil-vila' ||
          currentTab === 'perfil' ||
          currentTab === 'meu-perfil' ||
          currentTab === 'territorios' ||
          currentTab === 'os-meus-territorios' ||
          currentTab === 'meus-territorios' ||
          currentTab === 'identidade' ||
          currentTab === 'identidade-vila' ||
          currentTab === 'interesses' ||
          currentTab.startsWith('interesses-')
        ) ? (
          /* Perfil VILA (Persona Cidadã Ativa) */
          <PerfilVilaView
            initialTab={
              (currentTab === 'territorios' || currentTab === 'os-meus-territorios' || currentTab === 'meus-territorios')
                ? 'territorios'
                : (currentTab === 'identidade' || currentTab === 'identidade-vila')
                ? 'identidade'
                : currentTab === 'interesses' || currentTab === 'interesses-geral'
                ? 'interesses-geral'
                : currentTab === 'interesses-temas'
                ? 'interesses-temas'
                : currentTab === 'interesses-causas'
                ? 'interesses-causas'
                : currentTab === 'interesses-comunidades'
                ? 'interesses-comunidades'
                : currentTab === 'interesses-oportunidades'
                ? 'interesses-oportunidades'
                : 'perfil'
            }
            currentUser={currentUser}
            onNavigateToTab={handleNavigateToTab}
            onOpenAuth={handleOpenAuth}
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onBreadcrumbChange={handleBreadcrumbChange}
          />
        ) : (currentTab === 'sobre' || currentTab === 'sobre-a-vila') ? (
          /* Sobre a VILA View matching exact reference UI SOBRE.png */
          <SettingsView
            initialTab="sobre"
            onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
            onNavigateToTab={(tabId) => {
              setCurrentTab(tabId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
          />
        ) : (currentTab === 'definicoes' || currentTab === 'preferencias' || currentTab === 'settings' || currentTab === 'configuracoes' || currentTab === 'privacidade' || currentTab === 'seguranca') ? (
          /* Definições / Preferências Master Section matching PERFIL.png and 7 Tabs Specification */
          <SettingsView
            initialTab="sobre"
            onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
            onNavigateToTab={(tabId) => {
              setCurrentTab(tabId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
          />
        ) : (
          /* Subview Render for Other Sidebar Tabs */
          <div className="px-3.5 sm:px-5 lg:px-6 pt-4 sm:pt-6 pb-10 max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-200 overflow-y-auto pr-1">
            {/* Back to Home Breadcrumb */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900 font-sans capitalize">
                  {currentTab === 'comunidade' && 'Comunidade Global'}
                  {currentTab === 'indicadores' && 'Indicadores Globais'}
                  {currentTab === 'ia' && 'VILA AI'}
                  {currentTab === 'impacto' && 'Impacto Global'}
                  {currentTab === 'parceiros' && 'Parceiros'}
                  {currentTab === 'sobre' && 'Sobre a VILA'}
                  {currentTab === 'definicoes' && 'Definições da Plataforma'}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Painel de gestão e monitorização contínua do ecossistema VILA.
                </p>
              </div>

              <button
                onClick={() => setCurrentTab('inicio')}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#1455AC] bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shadow-2xs cursor-pointer"
              >
                ← Voltar ao Início
              </button>
            </div>

            {currentTab === 'ia' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-xl mx-auto space-y-4 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-[#1455AC] mx-auto flex items-center justify-center shadow-md text-white">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-sans">
                  VILA AI Assistant
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Converse com a nossa inteligência coletiva para encontrar oportunidades de voluntariado, parceiros de projetos e financiamento de impacto.
                </p>
                <button
                  onClick={() => setIsAiModalOpen(true)}
                  className="px-6 py-2.5 rounded-xl bg-[#1455AC] hover:bg-[#0F448A] text-white font-semibold text-xs shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  Iniciar Conversa com VILA AI
                </button>
              </div>
            )}

            {['comunidade', 'impacto', 'parceiros', 'sobre'].includes(
              currentTab
            ) &&
              currentTab !== 'ia' &&
              currentTab !== 'explorar' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1455AC]/10 text-[#1455AC] flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Módulo Sincronizado</h3>
                      <p className="text-xs text-slate-500">
                        Todos os dados desta secção são atualizados em tempo real pelos servidores da VILA.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-slate-600">
                      Pretende aceder ao relatório completo e interativo de impacto global?
                    </span>
                    <button
                      onClick={() => setIsImpactModalOpen(true)}
                      className="px-4 py-2 bg-[#1455AC] hover:bg-[#0F448A] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      Abrir Relatório
                    </button>
                  </div>
                </div>
              )}
          </div>
        )}
      </LayoutComponent>

      {/* 3. Interactive Modals */}
      <CountryDetailModal
        country={selectedCountry}
        onClose={() => setIsCountryModalOpen(false)}
        isOpen={isCountryModalOpen}
        onJoinCommunity={(countryName) => {
          alert(`Inscrição realizada com sucesso na comunidade de ${countryName}!`);
        }}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <SearchCommandModal
        isOpen={isSearchModalOpen}
        placeholder={
          currentTab === 'noticias'
            ? 'Pesquisar temas, países, pessoas, organizações...'
            : currentTab === 'eventos'
            ? 'Pesquisar eventos, temas, locais, organizações...'
            : 'Pesquisar países, regiões, projetos ou iniciativas...'
        }
        onClose={() => setIsSearchModalOpen(false)}
        onSelectCountry={(country) => {
          setSelectedCountry(country);
          setIsCountryModalOpen(true);
        }}
      />

      <VilaAiChatModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        currentUser={currentUser}
        onSelectUser={(user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        onLoginSuccess={() => setIsLoggedIn(true)}
      />

      <ImpactModal
        isOpen={isImpactModalOpen}
        onClose={() => setIsImpactModalOpen(false)}
      />

      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        currentUser={currentUser}
      />
    </>
  );
}
