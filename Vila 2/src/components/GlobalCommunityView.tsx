import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommunityOfficialHomeView } from './CommunityOfficialHomeView';
import { CommunityExploreView } from './CommunityExploreView';
import { CommunityEnvironmentView } from './CommunityEnvironmentView';
import { CommunityEducationView } from './CommunityEducationView';
import { CommunityHumanRightsView } from './CommunityHumanRightsView';
import { CommunityCultureView } from './CommunityCultureView';
import { CommunityHealthView } from './CommunityHealthView';
import { CommunityTechnologyView } from './CommunityTechnologyView';
import { CommunityEntrepreneurshipView } from './CommunityEntrepreneurshipView';
import { CommunityMoreCategoriesView } from './CommunityMoreCategoriesView';
import { CreateCommunityWizardView } from './CreateCommunityWizardView';
import { BreadcrumbItem } from './Topbar';

export interface GlobalCommunityViewProps {
  initialSubView?: 'official' | 'explorar' | 'explorar-comunidade' | 'ambiente' | 'educacao' | 'direitos-humanos' | 'cultura' | 'saude' | 'tecnologia' | 'empreendedorismo' | 'criar-comunidade' | 'mais';
  onNavigateToTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
  onExploreWorld?: () => void;
  onExploreMap?: () => void;
  onOpenCreateCommunityModal?: () => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

export const GlobalCommunityView: React.FC<GlobalCommunityViewProps> = ({
  initialSubView = 'official',
  onNavigateToTab,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenMobileMenu,
  onExploreWorld,
  onExploreMap,
  onOpenCreateCommunityModal,
  onBreadcrumbChange,
}) => {
  const [currentSubView, setCurrentSubView] = useState<'official' | 'explorar' | 'explorar-comunidade' | 'ambiente' | 'educacao' | 'direitos-humanos' | 'cultura' | 'saude' | 'tecnologia' | 'empreendedorismo' | 'criar-comunidade' | 'mais'>(initialSubView);

  const onBreadcrumbChangeRef = useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;

  const goToOfficial = useCallback(() => {
    setCurrentSubView('official');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToExplorar = useCallback(() => {
    setCurrentSubView('explorar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenCreateCommunity = useCallback(() => {
    setCurrentSubView('criar-comunidade');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigateCategory = useCallback((catId: string) => {
    if (catId === 'mais' || catId === 'mais-categorias') {
      setCurrentSubView('mais');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (catId === 'explorar' || catId === 'explorar-comunidade' || catId === 'todas') {
      setCurrentSubView('explorar');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (catId === 'ambiente') {
      setCurrentSubView('ambiente');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (catId === 'educacao') {
      setCurrentSubView('educacao');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (catId === 'direitos-humanos') {
      setCurrentSubView('direitos-humanos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (catId === 'cultura') {
      setCurrentSubView('cultura');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (catId === 'saude') {
      setCurrentSubView('saude');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (catId === 'tecnologia') {
      setCurrentSubView('tecnologia');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (catId === 'empreendedorismo') {
      setCurrentSubView('empreendedorismo');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Sincronizar se initialSubView mudar
  useEffect(() => {
    if (initialSubView) {
      setCurrentSubView(initialSubView);
    }
  }, [initialSubView]);

  // Emitir breadcrumb para o Topbar compartilhado conforme a subview ativa
  useEffect(() => {
    const CATEGORY_LABELS: Record<string, string> = {
      ambiente: 'Ambiente',
      educacao: 'Educação',
      'direitos-humanos': 'Direitos Humanos',
      cultura: 'Cultura',
      saude: 'Saúde',
      tecnologia: 'Tecnologia',
      empreendedorismo: 'Empreendedorismo',
    };

    if (currentSubView === 'official') {
      onBreadcrumbChangeRef.current?.([]);
    } else if (currentSubView === 'criar-comunidade') {
      onBreadcrumbChangeRef.current?.([
        { label: 'Comunidade Global', onClick: goToOfficial },
        { label: 'Criar Comunidade' },
      ]);
    } else if (currentSubView === 'mais') {
      // Breadcrumb com 3 níveis: Comunidade Global > Explorar Comunidade > Mais
      onBreadcrumbChangeRef.current?.([
        { label: 'Comunidade Global', onClick: goToOfficial },
        { label: 'Explorar Comunidade', onClick: goToExplorar },
        { label: 'Mais' },
      ]);
    } else if (currentSubView === 'explorar' || currentSubView === 'explorar-comunidade') {
      // Breadcrumb com só 2 níveis: Comunidade Global > Explorar Comunidade
      onBreadcrumbChangeRef.current?.([
        { label: 'Comunidade Global', onClick: goToOfficial },
        { label: 'Explorar Comunidade' },
      ]);
    } else {
      onBreadcrumbChangeRef.current?.([
        { label: 'Comunidade Global', onClick: goToOfficial },
        { label: 'Explorar Comunidade', onClick: goToExplorar },
        { label: CATEGORY_LABELS[currentSubView] || 'Explorar' },
      ]);
    }
  }, [currentSubView, goToOfficial, goToExplorar]);

  // Página de Ação Exclusiva: Criar Comunidade (UI CRIAR COMUNIDADE.png)
  if (currentSubView === 'criar-comunidade') {
    return (
      <CreateCommunityWizardView
        onBackToCommunity={goToOfficial}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
      />
    );
  }

  // Página: Explorar Comunidade (CommunityExploreView com carrossel em destaque e lista detalhada)
  if (currentSubView === 'explorar' || currentSubView === 'explorar-comunidade') {
    return (
      <CommunityExploreView
        onBackToOfficial={goToOfficial}
        onNavigateToCategory={handleNavigateCategory}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenCreateCommunity={handleOpenCreateCommunity}
      />
    );
  }

  // Página: Mais Categorias (CommunityMoreCategoriesView)
  if (currentSubView === 'mais') {
    return (
      <CommunityMoreCategoriesView
        onBackToOfficial={goToOfficial}
        onNavigateToCategory={handleNavigateCategory}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenCreateCommunity={handleOpenCreateCommunity}
      />
    );
  }

  // Categoria 4: Cultura (UI CULTURA.png)
  if (currentSubView === 'cultura') {
    return (
      <CommunityCultureView
        onBackToOfficial={goToOfficial}
        onNavigateToCategory={handleNavigateCategory}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenCreateCommunity={handleOpenCreateCommunity}
      />
    );
  }

  // Categoria 5: Saúde (UI SAUDE.png)
  if (currentSubView === 'saude') {
    return (
      <CommunityHealthView
        onBackToOfficial={goToOfficial}
        onNavigateToCategory={handleNavigateCategory}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenCreateCommunity={handleOpenCreateCommunity}
      />
    );
  }

  // Categoria 6: Tecnologia (UI TECNOLOGIA.png)
  if (currentSubView === 'tecnologia') {
    return (
      <CommunityTechnologyView
        onBackToOfficial={goToOfficial}
        onNavigateToCategory={handleNavigateCategory}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenCreateCommunity={handleOpenCreateCommunity}
      />
    );
  }

  // Categoria 7: Empreendedorismo (UI EMPREENDEDORISMO.png)
  if (currentSubView === 'empreendedorismo') {
    return (
      <CommunityEntrepreneurshipView
        onBackToOfficial={goToOfficial}
        onNavigateToCategory={handleNavigateCategory}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenCreateCommunity={handleOpenCreateCommunity}
      />
    );
  }

  // Categoria 3: Direitos Humanos (UI DIREITOS HUMANOS.png)
  if (currentSubView === 'direitos-humanos') {
    return (
      <CommunityHumanRightsView
        onBackToOfficial={goToOfficial}
        onNavigateToCategory={handleNavigateCategory}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenCreateCommunity={handleOpenCreateCommunity}
      />
    );
  }

  // Categoria 2: Educação (UI EDUCACAO.png)
  if (currentSubView === 'educacao') {
    return (
      <CommunityEducationView
        onBackToOfficial={goToOfficial}
        onNavigateToCategory={handleNavigateCategory}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenCreateCommunity={handleOpenCreateCommunity}
      />
    );
  }

  // Categoria 1: Ambiente (UI AMBIENTE.png)
  if (currentSubView === 'ambiente') {
    return (
      <CommunityEnvironmentView
        onBackToOfficial={goToOfficial}
        onNavigateToCategory={handleNavigateCategory}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
        onExploreWorld={onExploreWorld || onExploreMap}
        onOpenCreateCommunity={handleOpenCreateCommunity}
      />
    );
  }

  // Nível 1: Página Oficial da Comunidade Global (UI COMUNIDADE GLOBAL.png)
  return (
    <CommunityOfficialHomeView
      onNavigateToAmbiente={() => handleNavigateCategory('ambiente')}
      onNavigateToEducacao={() => handleNavigateCategory('educacao')}
      onNavigateToExplorarComunidade={() => handleNavigateCategory('explorar')}
      onNavigateToTab={onNavigateToTab}
      onOpenAuth={onOpenAuth}
      onOpenAiAssistant={onOpenAiAssistant}
      onOpenCreateCommunityModal={handleOpenCreateCommunity}
    />
  );
};

export default GlobalCommunityView;
