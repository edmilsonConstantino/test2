export type DemoUserRole =
  | 'cidadao'
  | 'moderador'
  | 'admin_municipal'
  | 'admin_regional'
  | 'admin_global';

export interface DemoUser {
  id: string;
  name: string;
  role: DemoUserRole;
  roleLabel: string;
  scope: string;
  avatarUrl: string;
  email: string;
  location: string;
  headline: string;
  isAdmin: boolean;
  isModerator?: boolean;
  badgeLabel: string;
}

export const DEMO_USERS: DemoUser[] = [
  {
    id: 'ines-pereira',
    name: 'Inês Pereira',
    role: 'cidadao',
    roleLabel: 'Cidadã Ativa',
    scope: '—',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    email: 'ines.pereira@vilaglobal.org',
    location: 'Faro, Algarve, Portugal',
    headline: 'Cidadã Global VILA • Apaixonada por cidades sustentáveis e comunidades inovadoras',
    isAdmin: false,
    badgeLabel: 'Cidadã Ativa',
  },
  {
    id: 'carlos-mendes',
    name: 'Carlos Mendes',
    role: 'moderador',
    roleLabel: 'Moderador Comunitário',
    scope: 'Comunidade "Ação Climática Global"',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    email: 'carlos.mendes@vilaglobal.org',
    location: 'Lisboa, Portugal',
    headline: 'Engenheiro Ambiental • Moderador Ação Climática Global',
    isAdmin: false,
    isModerator: true,
    badgeLabel: 'Moderador Comunitário',
  },
  {
    id: 'sofia-costa',
    name: 'Sofia Costa',
    role: 'admin_municipal',
    roleLabel: 'Administradora Municipal',
    scope: 'Faro, Portugal',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    email: 'sofia.costa@cm-faro.pt',
    location: 'Faro, Portugal',
    headline: 'Gestora Pública • Divisão de Participação Cidadã de Faro',
    isAdmin: true,
    badgeLabel: 'Admin Municipal',
  },
  {
    id: 'miguel-santos',
    name: 'Miguel Santos',
    role: 'admin_regional',
    roleLabel: 'Administrador Regional',
    scope: 'Portugal',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    email: 'miguel.santos@vila.pt',
    location: 'Porto, Portugal',
    headline: 'Coordenador Nacional de Transformação Digital Cívica',
    isAdmin: true,
    badgeLabel: 'Admin Regional',
  },
  {
    id: 'vila-global',
    name: 'VILA Global',
    role: 'admin_global',
    roleLabel: 'Administrador Global',
    scope: 'Rede inteira',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
    email: 'admin@vilaglobal.org',
    location: 'Rede Global VILA',
    headline: 'Super-administração & Governança da Rede Global VILA',
    isAdmin: true,
    badgeLabel: 'Admin Global',
  },
];

export const isAdministratorUser = (user: DemoUser): boolean => {
  return user.isAdmin;
};
