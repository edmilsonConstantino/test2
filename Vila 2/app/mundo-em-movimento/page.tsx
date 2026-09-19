import React from 'react';
import { DashboardLayout } from '../../src/components/DashboardLayout';
import { GlobalNewsView } from '../../src/components/GlobalNewsView';

/**
 * Rota App Router /mundo-em-movimento/page.tsx
 * Envolvida pelo componente compartilhado de layout (DashboardLayout / AppLayout)
 */
export default function Page() {
  return (
    <DashboardLayout currentTab="noticias">
      <GlobalNewsView />
    </DashboardLayout>
  );
}
