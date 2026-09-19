import React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { Topbar, BreadcrumbItem } from './Topbar';
import { DemoUser } from '../data/demoUsers';

export interface AdminLayoutProps {
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

const DEFAULT_ADMIN_BREADCRUMB: BreadcrumbItem[] = [
  { label: 'Plataforma VILA' },
  { label: 'Painel de Gestão' },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab = 'painel-gestao',
  currentUser,
  onSelectDemoUser,
  onSelectTab = (_tabId: string) => {},
  onOpenAuth = () => {},
  onOpenImpactModal = () => {},
  onOpenSupportModal = () => {},
  isMobileSidebarOpen = false,
  onCloseMobileSidebar = () => {},
  onOpenMobileSidebar = () => {},
  onOpenSearchModal = () => {},
  searchPlaceholder = 'Pesquisar na plataforma...',
  breadcrumb,
  showTopbar = true,
  isLoggedIn = false,
  onLogout,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#334155] flex antialiased">
      {/* 1. Sidebar dedicada da Plataforma VILA com 12 itens + atalhos + marca própria */}
      <AdminSidebar
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

      {/* 2. Área principal de conteúdo à direita da AdminSidebar */}
      <div className="flex-1 md:pl-[240px] flex flex-col min-w-0 min-h-screen transition-all duration-300">
        {/* Barra superior Topbar configurada para contexto da Plataforma */}
        {showTopbar && (
          <Topbar
            currentUser={currentUser}
            onSelectDemoUser={onSelectDemoUser}
            userName={currentUser?.name}
            userAvatarUrl={currentUser?.avatarUrl}
            searchPlaceholder={searchPlaceholder}
            breadcrumb={
              breadcrumb && breadcrumb.length > 0
                ? breadcrumb
                : DEFAULT_ADMIN_BREADCRUMB
            }
            onOpenSearchModal={onOpenSearchModal}
            onOpenMobileMenu={onOpenMobileSidebar}
            onOpenAuth={onOpenAuth}
            onNavigateToTab={onSelectTab}
          />
        )}

        {/* Viewport da Plataforma */}
        <main
          id="admin-main-viewport"
          className="flex-1 w-full overflow-y-auto"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
