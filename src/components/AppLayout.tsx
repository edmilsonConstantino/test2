import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar, BreadcrumbItem } from './Topbar';
import { DemoUser } from '../data/demoUsers';

export interface AppLayoutProps {
  currentTab?: string;
  currentUser?: DemoUser;
  onSelectDemoUser?: (user: DemoUser) => void;
  onSelectTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenImpactModal?: () => void;
  onOpenSupportModal?: () => void;
  isMobileSidebarOpen?: boolean;
  onCloseMobileSidebar?: () => void;
  onOpenMobileSidebar?: () => void;
  onOpenSearchModal?: () => void;
  searchPlaceholder?: string;
  breadcrumb?: BreadcrumbItem[];
  showTopbar?: boolean;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentTab = 'noticias',
  currentUser,
  onSelectDemoUser,
  onSelectTab = () => {},
  onOpenAuth = () => {},
  onOpenImpactModal = () => {},
  onOpenSupportModal = () => {},
  isMobileSidebarOpen = false,
  onCloseMobileSidebar = () => {},
  onOpenMobileSidebar = () => {},
  onOpenSearchModal = () => {},
  searchPlaceholder,
  breadcrumb,
  showTopbar = true,
  isLoggedIn = false,
  onLogout,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#475569] flex antialiased">
      {/* 1. Sidebar de navegação fixa à esquerda (Logo VILA, menu, widget de impacto, idioma, tema, login) */}
      <Sidebar
        currentTab={currentTab}
        currentUser={currentUser}
        onSelectTab={onSelectTab}
        onOpenAuth={onOpenAuth}
        onOpenImpactModal={onOpenImpactModal}
        onOpenSupportModal={onOpenSupportModal}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={onCloseMobileSidebar}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
      />

      {/* 2. Área principal de conteúdo à direita da Sidebar */}
      <div className="flex-1 md:pl-[230px] flex flex-col min-w-0 min-h-screen transition-all duration-300">
        {/* Barra superior Topbar */}
        {showTopbar && (
          <Topbar
            currentUser={currentUser}
            onSelectDemoUser={onSelectDemoUser}
            userName={currentUser?.name}
            userAvatarUrl={currentUser?.avatarUrl}
            searchPlaceholder={searchPlaceholder}
            breadcrumb={breadcrumb}
            onOpenSearchModal={onOpenSearchModal}
            onOpenMobileMenu={onOpenMobileSidebar}
            onOpenAuth={onOpenAuth}
            onNavigateToTab={onSelectTab}
          />
        )}

        {/* Viewport com scroll e padding consistente com todas as páginas */}
        <main
          id="app-main-viewport"
          className="flex-1 w-full overflow-y-auto"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
