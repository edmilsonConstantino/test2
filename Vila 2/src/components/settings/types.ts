export type SettingsTabId =
  | 'perfil'
  | 'preferencias'
  | 'notificacoes'
  | 'privacidade'
  | 'contas'
  | 'integracoes'
  | 'sobre';

export interface UserProfileData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  avatar: string;
}

export interface GeneralPreferencesData {
  platformLanguage: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  unitSystem: string;
  contentLanguage: string;
  homePage: string;
  interfaceDensity: string;
  interfaceTheme: string;
  experienceMode: 'equilibrada' | 'local' | 'global' | 'personalizado';
  selectedThemes: string[];
  accessibilityMode: boolean;
  reduceMotion: boolean;
  compactMode: boolean;
}

export interface EmailNotificationToggles {
  dailyDigest: boolean;
  newProjects: boolean;
  importantAlerts: boolean;
}
