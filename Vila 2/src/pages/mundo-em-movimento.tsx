import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { GlobalNewsView } from '../components/GlobalNewsView';

/**
 * Página "Mundo em Movimento"
 * Estruturada com o layout compartilhado DashboardLayout (Sidebar + Topbar)
 * preservando todo o conteúdo implementado: Hero com imagem da Terra e dots de carrossel,
 * pills de filtro e cards de impacto.
 */
export default function MundoEmMovimentoPage() {
  return (
    <DashboardLayout currentTab="noticias">
      <GlobalNewsView />
    </DashboardLayout>
  );
}
