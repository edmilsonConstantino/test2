import React, { useState } from 'react';
import {
  Camera,
  ChevronDown,
  Globe,
  Coins,
  Calendar,
  Clock,
  Ruler,
  FileText,
  Bell,
  Lock,
  Shield,
  Monitor,
  Mail,
  Sun,
  Home,
  LayoutGrid,
  Download,
  LogOut,
  Trash2,
  ChevronRight,
  ArrowRight,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { SettingsTabId } from './types';

interface ProfileTabProps {
  onNavigateTab: (tabId: SettingsTabId) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ onNavigateTab }) => {
  // State for editable profile inputs
  const [fullName, setFullName] = useState('Divan Mellert');
  const [role, setRole] = useState('Administrador');
  const [email, setEmail] = useState('divan@vilaglobal.org');
  const [phone, setPhone] = useState('+351 912 345 678');
  const [location, setLocation] = useState('Faro, Portugal');
  const [timezone, setTimezone] = useState('(UTC+00:00) Lisboa');
  const [avatarUrl, setAvatarUrl] = useState(
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
  );

  // General Preferences (summary dropdowns)
  const [platformLang, setPlatformLang] = useState('Português (Portugal)');
  const [currency, setCurrency] = useState('EUR (€) – Euro');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeFormat, setTimeFormat] = useState('24 horas');
  const [unitSystem, setUnitSystem] = useState('Métrico (km, ºC, m)');

  // Email Notifications (summary toggles)
  const [dailyDigest, setDailyDigest] = useState(true);
  const [newProjects, setNewProjects] = useState(true);
  const [importantAlerts, setImportantAlerts] = useState(true);

  // Personalization (summary dropdowns)
  const [theme, setTheme] = useState('Claro');
  const [contentLang, setContentLang] = useState('Português');
  const [homePage, setHomePage] = useState('Início');
  const [density, setDensity] = useState('Confortável');

  // Feedback toast
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast de Salvo com sucesso */}
      {savedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1455AC] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 border border-blue-800 animate-in fade-in slide-in-from-bottom-3 font-sans">
          <CheckCircle2 className="w-5 h-5 text-blue-200" />
          <span className="text-xs sm:text-sm font-semibold">Alterações guardadas com sucesso!</span>
        </div>
      )}

      {/* Grid Principal de 2 Colunas: Esquerda (Perfil, Preferências, Notificações) e Direita (Segurança, Personalização, Ações) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
        {/* COLUNA ESQUERDA (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Card: Informações do perfil */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 mb-5 font-sans">
              Informações do perfil
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Foto com Botão Alterar */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="relative">
                    <img
                      src={avatarUrl}
                      alt={fullName}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-slate-100 dark:ring-slate-800 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newPhoto = prompt(
                          'Insira a URL da nova imagem de perfil:',
                          avatarUrl
                        );
                        if (newPhoto) setAvatarUrl(newPhoto);
                      }}
                      title="Carregar nova foto"
                      className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1455AC] text-white flex items-center justify-center ring-2 ring-white dark:ring-slate-900 hover:bg-[#0F3B77] transition-colors shadow-xs cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newPhoto = prompt(
                        'Insira a URL da nova imagem de perfil:',
                        avatarUrl
                      );
                      if (newPhoto) setAvatarUrl(newPhoto);
                    }}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
                  >
                    Alterar foto
                  </button>
                </div>

                {/* Campos do Formulário */}
                <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nome completo */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] dark:text-slate-50 mb-1.5">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none"
                    />
                  </div>

                  {/* Cargo */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] dark:text-slate-50 mb-1.5">
                      Cargo
                    </label>
                    <div className="relative">
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full appearance-none bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 px-3.5 py-2.5 pr-9 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none cursor-pointer"
                      >
                        <option value="Administrador">Administrador</option>
                        <option value="Gestor de Comunidade">Gestor de Comunidade</option>
                        <option value="Coordenador de Projetos">Coordenador de Projetos</option>
                        <option value="Membro">Membro</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* E-mail */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] dark:text-slate-50 mb-1.5">
                      E-mail
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none"
                    />
                  </div>

                  {/* Telefone */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] dark:text-slate-50 mb-1.5">
                      Telefone
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center gap-1 pointer-events-none">
                        <span className="text-base leading-none">🇵🇹</span>
                      </div>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Localização */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] dark:text-slate-50 mb-1.5">
                      Localização
                    </label>
                    <div className="relative">
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full appearance-none bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 px-3.5 py-2.5 pr-9 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none cursor-pointer"
                      >
                        <option value="Faro, Portugal">Faro, Portugal</option>
                        <option value="Lisboa, Portugal">Lisboa, Portugal</option>
                        <option value="Porto, Portugal">Porto, Portugal</option>
                        <option value="Maputo, Moçambique">Maputo, Moçambique</option>
                        <option value="Luanda, Angola">Luanda, Angola</option>
                        <option value="São Paulo, Brasil">São Paulo, Brasil</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Fuso horário */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] dark:text-slate-50 mb-1.5">
                      Fuso horário
                    </label>
                    <div className="relative">
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full appearance-none bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 px-3.5 py-2.5 pr-9 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none cursor-pointer"
                      >
                        <option value="(UTC+00:00) Lisboa">(UTC+00:00) Lisboa</option>
                        <option value="(UTC+01:00) Madrid">(UTC+01:00) Madrid</option>
                        <option value="(UTC-03:00) Brasília">(UTC-03:00) Brasília</option>
                        <option value="(UTC+02:00) Maputo">(UTC+02:00) Maputo</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão Guardar alterações */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1455AC] hover:bg-[#0F3B77] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer font-sans"
                >
                  Guardar alterações
                </button>
              </div>
            </form>
          </section>

          {/* 2. Card: Preferências gerais (Resumo com Dropdowns) */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Preferências gerais
              </h2>
              <button
                type="button"
                onClick={() => onNavigateTab('preferencias')}
                className="text-xs font-semibold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer font-sans"
              >
                <span>Ver todas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700 text-xs sm:text-sm">
              {/* Idioma da plataforma */}
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span className="font-medium">Idioma da plataforma</span>
                </div>
                <div className="relative sm:w-60">
                  <select
                    value={platformLang}
                    onChange={(e) => setPlatformLang(e.target.value)}
                    className="w-full appearance-none bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 px-3 py-2 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 outline-none cursor-pointer"
                  >
                    <option value="Português (Portugal)">Português (Portugal)</option>
                    <option value="Português (Brasil)">Português (Brasil)</option>
                    <option value="English (US)">English (US)</option>
                    <option value="Español">Español</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Moeda */}
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Coins className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span className="font-medium">Moeda</span>
                </div>
                <div className="relative sm:w-60">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full appearance-none bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 px-3 py-2 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 outline-none cursor-pointer"
                  >
                    <option value="EUR (€) – Euro">EUR (€) – Euro</option>
                    <option value="USD ($) – US Dollar">USD ($) – US Dollar</option>
                    <option value="BRL (R$) – Real">BRL (R$) – Real</option>
                    <option value="MZN (MT) – Metical">MZN (MT) – Metical</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Formato de data */}
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span className="font-medium">Formato de data</span>
                </div>
                <div className="relative sm:w-60">
                  <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full appearance-none bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 px-3 py-2 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 outline-none cursor-pointer"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Formato de hora */}
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span className="font-medium">Formato de hora</span>
                </div>
                <div className="relative sm:w-60">
                  <select
                    value={timeFormat}
                    onChange={(e) => setTimeFormat(e.target.value)}
                    className="w-full appearance-none bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 px-3 py-2 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 outline-none cursor-pointer"
                  >
                    <option value="24 horas">24 horas</option>
                    <option value="12 horas (AM/PM)">12 horas (AM/PM)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Unidades de medida */}
              <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Ruler className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span className="font-medium">Unidades de medida</span>
                </div>
                <div className="relative sm:w-60">
                  <select
                    value={unitSystem}
                    onChange={(e) => setUnitSystem(e.target.value)}
                    className="w-full appearance-none bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 px-3 py-2 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 outline-none cursor-pointer"
                  >
                    <option value="Métrico (km, ºC, m)">Métrico (km, ºC, m)</option>
                    <option value="Imperial (mi, ºF, ft)">Imperial (mi, ºF, ft)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          {/* 3. Card: Notificações por e-mail (Resumo com Toggles) */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs font-sans">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 mb-4 font-sans">
              Notificações por e-mail
            </h2>

            <div className="space-y-4 font-sans">
              {/* Resumo diário */}
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0 mt-0.5">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-50 leading-tight">
                      Resumo diário
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Receba um resumo diário das atividades
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={dailyDigest}
                    onChange={(e) => setDailyDigest(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1455AC]" />
                </label>
              </div>

              {/* Novos projetos e iniciativas */}
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-50 leading-tight">
                      Novos projetos e iniciativas
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Seja notificado sobre novos projetos
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={newProjects}
                    onChange={(e) => setNewProjects(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1455AC]" />
                </label>
              </div>

              {/* Alertas importantes */}
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-50 leading-tight">
                      Alertas importantes
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Receba alertas sobre atividades críticas
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={importantAlerts}
                    onChange={(e) => setImportantAlerts(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1455AC]" />
                </label>
              </div>

              {/* Link Gerir todas as notificações */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end font-sans">
                <button
                  type="button"
                  onClick={() => onNavigateTab('notificacoes')}
                  className="text-xs font-bold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer font-sans"
                >
                  <span>Gerir todas as notificações</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* COLUNA DIREITA (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6 font-sans">
          {/* 4. Card: Segurança da conta (Resumo com Badge 'Protegido') */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs font-sans">
            <div className="flex items-center justify-between mb-4 font-sans">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Segurança da conta
              </h2>
              <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200/70 dark:border-emerald-800/40 font-sans">
                <Check className="w-3 h-3 stroke-[3]" />
                Protegido
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700 font-sans">
              {/* Palavra-passe */}
              <div className="py-3 flex items-center justify-between gap-3 font-sans">
                <div className="flex items-center gap-3 min-w-0 font-sans">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 font-sans">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 font-sans">
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-50 leading-tight font-sans">
                      Palavra-passe
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-sans">
                      Última alteração há 32 dias
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateTab('privacidade')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 font-sans"
                >
                  Alterar
                </button>
              </div>

              {/* Autenticação de dois fatores */}
              <div className="py-3 flex items-center justify-between gap-3 font-sans">
                <div className="flex items-center gap-3 min-w-0 font-sans">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0 font-sans">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 font-sans">
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-50 leading-tight font-sans">
                      Autenticação de dois fatores
                    </h3>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold truncate font-sans">
                      Ativada
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateTab('contas')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 font-sans"
                >
                  Gerir
                </button>
              </div>

              {/* Sessões ativas */}
              <div className="py-3 flex items-center justify-between gap-3 font-sans">
                <div className="flex items-center gap-3 min-w-0 font-sans">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0 font-sans">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 font-sans">
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-50 leading-tight font-sans">
                      Sessões ativas
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-sans">
                      2 sessões ativas
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateTab('contas')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 font-sans"
                >
                  Ver
                </button>
              </div>

              {/* E-mail de recuperação */}
              <div className="py-3 flex items-center justify-between gap-3 font-sans">
                <div className="flex items-center gap-3 min-w-0 font-sans">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0 font-sans">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 font-sans">
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-50 leading-tight font-sans">
                      E-mail de recuperação
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-sans">
                      divan@vilaglobal.org
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateTab('privacidade')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 font-sans"
                >
                  Alterar
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 font-sans">
              <button
                type="button"
                onClick={() => onNavigateTab('privacidade')}
                className="text-xs font-bold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer font-sans"
              >
                <span>Ver todas as opções de segurança</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* 5. Card: Personalização (Resumo de Estilo) */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs font-sans">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 mb-4 font-sans">
              Personalização
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-700 text-xs sm:text-sm">
              {/* Tema da interface */}
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Sun className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="font-medium">Tema da interface</span>
                </div>
                <div className="relative w-36">
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full appearance-none bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 px-3 py-1.5 pr-7 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 outline-none cursor-pointer"
                  >
                    <option value="Claro">Claro</option>
                    <option value="Escuro">Escuro</option>
                    <option value="Automático">Automático</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Idioma dos conteúdos */}
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="font-medium">Idioma dos conteúdos</span>
                </div>
                <div className="relative w-36">
                  <select
                    value={contentLang}
                    onChange={(e) => setContentLang(e.target.value)}
                    className="w-full appearance-none bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 px-3 py-1.5 pr-7 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 outline-none cursor-pointer"
                  >
                    <option value="Português">Português</option>
                    <option value="English">English</option>
                    <option value="Español">Español</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Página inicial */}
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Home className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="font-medium">Página inicial</span>
                </div>
                <div className="relative w-36">
                  <select
                    value={homePage}
                    onChange={(e) => setHomePage(e.target.value)}
                    className="w-full appearance-none bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 px-3 py-1.5 pr-7 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 outline-none cursor-pointer"
                  >
                    <option value="Início">Início</option>
                    <option value="Explorar">Explorar</option>
                    <option value="Impacto Global">Impacto Global</option>
                    <option value="Comunidade">Comunidade</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Densidade da interface */}
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <LayoutGrid className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span className="font-medium">Densidade da interface</span>
                </div>
                <div className="relative w-36">
                  <select
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                    className="w-full appearance-none bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 px-3 py-1.5 pr-7 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 outline-none cursor-pointer"
                  >
                    <option value="Confortável">Confortável</option>
                    <option value="Compacto">Compacto</option>
                    <option value="Espaçoso">Espaçoso</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          {/* 6. Card: Ações da conta */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs font-sans">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 mb-4 font-sans">
              Ações da conta
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-700 font-sans">
              {/* Exportar os meus dados */}
              <button
                type="button"
                onClick={() => {
                  alert('O download dos seus dados (formato JSON) foi iniciado.');
                }}
                className="w-full py-3 flex items-center justify-between gap-3 text-left hover:bg-slate-50/80 dark:hover:bg-slate-800 px-2 rounded-xl transition-colors cursor-pointer group font-sans"
              >
                <div className="flex items-center gap-3 min-w-0 font-sans">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0 font-sans">
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 font-sans">
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-50 group-hover:text-[#1455AC] transition-colors leading-tight font-sans">
                      Exportar os meus dados
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-sans">
                      Descarregue uma cópia dos seus dados
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors shrink-0" />
              </button>

              {/* Encerrar sessão em todos os dispositivos */}
              <button
                type="button"
                onClick={() => {
                  if (confirm('Tem certeza de que deseja encerrar a sessão em todos os outros dispositivos?')) {
                    alert('Sessões ativas encerradas com sucesso.');
                  }
                }}
                className="w-full py-3 flex items-center justify-between gap-3 text-left hover:bg-red-50/50 dark:hover:bg-red-500/10 px-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold text-red-600 dark:text-red-400 leading-tight">
                      Encerrar sessão em todos os dispositivos
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      Proteja a sua conta encerrando sessões ativas
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors shrink-0" />
              </button>

              {/* Eliminar conta */}
              <button
                type="button"
                onClick={() => {
                  const reason = prompt('Para confirmar a exclusão, digite "ELIMINAR":');
                  if (reason === 'ELIMINAR') {
                    alert('Pedido de exclusão de conta registrado.');
                  }
                }}
                className="w-full py-3 flex items-center justify-between gap-3 text-left hover:bg-red-50/50 dark:hover:bg-red-500/10 px-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold text-red-600 dark:text-red-400 leading-tight">
                      Eliminar conta
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      Esta ação não pode ser revertida
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors shrink-0" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
