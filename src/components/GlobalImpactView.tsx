import React, { useState, useEffect, useRef } from 'react';
import { ImpactoGlobalView } from './ImpactoGlobalView';
import { MainImpactGlobalView } from './MainImpactGlobalView';
import { EnvironmentImpactView, EnvironmentImpactViewProps } from './EnvironmentImpactView';
import { HealthImpactView } from './HealthImpactView';
import { TechnologyImpactView } from './TechnologyImpactView';
import { EntrepreneurshipImpactView } from './EntrepreneurshipImpactView';
import { HumanRightsImpactView } from './HumanRightsImpactView';
import { EducationImpactView } from './EducationImpactView';
import { CultureImpactView } from './CultureImpactView';
import { BreadcrumbItem } from './Topbar';

export interface GlobalImpactViewProps extends EnvironmentImpactViewProps {
  initialSubView?: 'todas' | 'ambiente' | 'saude' | 'tecnologia' | 'empreendedorismo' | 'direitos-humanos' | 'educacao' | 'cultura';
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

export const GlobalImpactView: React.FC<GlobalImpactViewProps> = ({
  initialSubView = 'todas',
  onOpenAiAssistant,
  onExploreWorld,
  onExploreCommunity,
  onOpenMobileMenu,
  onOpenAuth,
  onNavigateToTab,
  onNavigateToCategory,
  onBreadcrumbChange,
  ...restProps
}) => {
  const [currentSubView, setCurrentSubView] = useState<'todas' | 'ambiente' | 'saude' | 'tecnologia' | 'empreendedorismo' | 'direitos-humanos' | 'educacao' | 'cultura'>(initialSubView);

  const onNavigateToTabRef = useRef(onNavigateToTab);
  onNavigateToTabRef.current = onNavigateToTab;
  const onBreadcrumbChangeRef = useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;

  useEffect(() => {
    if (initialSubView) {
      setCurrentSubView(initialSubView);
    }
  }, [initialSubView]);

  // Emitir breadcrumb para o Topbar compartilhado conforme a subview ativa
  useEffect(() => {
    const goToTodas = () => {
      setCurrentSubView('todas');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const CATEGORY_LABELS: Record<string, string> = {
      ambiente: 'Ambiente',
      saude: 'Saúde',
      tecnologia: 'Tecnologia',
      empreendedorismo: 'Empreendedorismo',
      'direitos-humanos': 'Direitos Humanos',
      educacao: 'Educação',
      cultura: 'Cultura',
    };

    // Trilha confirmada pelo mockup de referência (UI TECNOLOGIA.png etc.): Impacto Global é sempre
    // exibido como parte de Comunidade Global no breadcrumb, mesmo tendo item próprio na sidebar.
    const goToComunidade = () => onNavigateToTabRef.current?.('comunidade');

    if (currentSubView === 'todas') {
      onBreadcrumbChangeRef.current?.([
        { label: 'Plataforma VILA', onClick: () => onNavigateToTabRef.current?.('inicio') },
        { label: 'Impacto Global', onClick: () => onNavigateToTabRef.current?.('impacto') },
        { label: 'Visão Geral' },
      ]);
    } else {
      onBreadcrumbChangeRef.current?.([
        { label: 'Comunidade Global', onClick: goToComunidade },
        { label: 'Impacto Global', onClick: goToTodas },
        { label: CATEGORY_LABELS[currentSubView] || 'Impacto' },
      ]);
    }
  }, [currentSubView]);

  const handleCategoryNavigation = (categoryId: string) => {
    if (categoryId === 'mais' || categoryId === 'mais-categorias') {
      if (onNavigateToCategory) {
        onNavigateToCategory('mais');
      } else if (onNavigateToTab) {
        onNavigateToTab('mais');
      }
      return;
    }
    if (categoryId === 'todas' || categoryId === 'impacto' || categoryId === 'impacto-global') {
      setCurrentSubView('todas');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryId === 'empreendedorismo') {
      setCurrentSubView('empreendedorismo');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryId === 'tecnologia') {
      setCurrentSubView('tecnologia');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryId === 'saude') {
      setCurrentSubView('saude');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryId === 'ambiente') {
      setCurrentSubView('ambiente');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryId === 'direitos-humanos') {
      setCurrentSubView('direitos-humanos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryId === 'educacao') {
      setCurrentSubView('educacao');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryId === 'cultura') {
      setCurrentSubView('cultura');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onNavigateToCategory) {
      onNavigateToCategory(categoryId);
    }
  };

  if (currentSubView === 'empreendedorismo') {
    return (
      <EntrepreneurshipImpactView
        onBackToImpact={() => {
          setCurrentSubView('todas');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCategory={handleCategoryNavigation}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
      />
    );
  }

  if (currentSubView === 'tecnologia') {
    return (
      <TechnologyImpactView
        onBackToImpact={() => {
          setCurrentSubView('todas');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCategory={handleCategoryNavigation}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
      />
    );
  }

  if (currentSubView === 'saude') {
    return (
      <HealthImpactView
        onBackToImpact={() => {
          setCurrentSubView('todas');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCategory={handleCategoryNavigation}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
      />
    );
  }

  if (currentSubView === 'educacao') {
    return (
      <EducationImpactView
        onOpenAiAssistant={onOpenAiAssistant}
        onExploreWorld={onExploreWorld}
        onExploreCommunity={onExploreCommunity}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenAuth={onOpenAuth}
        onNavigateToTab={onNavigateToTab}
        onNavigateToCategory={handleCategoryNavigation}
      />
    );
  }

  if (currentSubView === 'cultura') {
    return (
      <CultureImpactView
        onOpenAiAssistant={onOpenAiAssistant}
        onExploreWorld={onExploreWorld}
        onExploreCommunity={onExploreCommunity}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenAuth={onOpenAuth}
        onNavigateToTab={onNavigateToTab}
        onNavigateToCategory={handleCategoryNavigation}
      />
    );
  }

  if (currentSubView === 'direitos-humanos') {
    return (
      <HumanRightsImpactView
        onOpenAiAssistant={onOpenAiAssistant}
        onExploreWorld={onExploreWorld}
        onExploreCommunity={onExploreCommunity}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenAuth={onOpenAuth}
        onNavigateToTab={onNavigateToTab}
        onNavigateToCategory={handleCategoryNavigation}
      />
    );
  }

  if (currentSubView === 'ambiente') {
    return (
      <EnvironmentImpactView
        onOpenAiAssistant={onOpenAiAssistant}
        onExploreWorld={onExploreWorld}
        onExploreCommunity={onExploreCommunity}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenAuth={onOpenAuth}
        onNavigateToTab={onNavigateToTab}
        onNavigateToCategory={handleCategoryNavigation}
        {...restProps}
      />
    );
  }

  return (
    <ImpactoGlobalView
      currentUser={restProps.currentUser}
      onNavigateToTab={onNavigateToTab || (() => {})}
      onBreadcrumbChange={onBreadcrumbChange}
      onOpenAuth={onOpenAuth}
      onOpenAiAssistant={onOpenAiAssistant}
    />
  );
};

export default GlobalImpactView;
