export type CountryStatus = 'active' | 'with-activity' | 'inactive';

export interface CountryData {
  id: string;
  name: string;
  code: string;
  flag: string;
  status: CountryStatus;
  statusLabel?: string;
  projectsCount: number;
  communitiesCount: number;
  citizensCount: number;
  imageUrl: string;
  description: string;
  capital: string;
  region: string;
  // Position on map SVG (in percentages 0-100 for responsive pin placement)
  mapPos: {
    x: number; // 0 to 100 percentage
    y: number; // 0 to 100 percentage
  };
  initiatives: string[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
  active?: boolean;
}

export interface GlobalStat {
  id: string;
  label: string;
  value: string;
  icon: string;
  iconColor: string;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'project' | 'community' | 'event' | 'system';
}
