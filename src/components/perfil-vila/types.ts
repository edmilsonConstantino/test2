import React from 'react';

export type PerfilVilaTabId =
  | 'perfil'
  | 'identidade'
  | 'territorios'
  | 'interesses-geral'
  | 'participacao'
  | 'conquistas'
  | 'assinaturas'
  | 'seguranca'
  | 'privacidade'
  | 'interesses-temas'
  | 'interesses-causas'
  | 'interesses-comunidades'
  | 'interesses-oportunidades';

export interface PerfilVilaTabMeta {
  id: PerfilVilaTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}
