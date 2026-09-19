import React, { useState, useRef, useEffect } from 'react';
import {
  Lock,
  Users,
  UserCheck,
  BarChart2,
  BarChart3,
  EyeOff,
  Clock,
  ArrowRight,
  ShieldCheck,
  Monitor,
  Smartphone,
  Mail,
  Megaphone,
  Link2,
  Database,
  Download,
  Trash2,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  X,
  Shield,
  KeyRound,
  AlertTriangle,
  Check,
  ExternalLink,
  Laptop,
} from 'lucide-react';

export const PrivacySecurityTab: React.FC = () => {
  // --- Estados de Dropdowns de Privacidade de Dados ---
  const [profileVisibility, setProfileVisibility] = useState('Apenas parceiros');
  const [whoCanContact, setWhoCanContact] = useState('Parceiros e contactos');
  const [activityVisibility, setActivityVisibility] = useState('Apenas eu');

  // Menus abertos
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // --- Estados dos Toggles ---
  const [appearInSearch, setAppearInSearch] = useState(false); // OFF por padrão no design
  const [browsingHistory, setBrowsingHistory] = useState(true); // ON por padrão no design

  // Privacidade de Comunicações
  const [marketingEmails, setMarketingEmails] = useState(true); // ON no design
  const [invitesRecommendations, setInvitesRecommendations] = useState(true); // ON no design
  const [researchImprovements, setResearchImprovements] = useState(false); // OFF no design

  // --- Modais de Ação e Segurança ---
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal Palavra-passe
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Modal Email Recuperação
  const [recoveryEmail, setRecoveryEmail] = useState('divan@vilaglobal.org');
  const [tempRecoveryEmail, setTempRecoveryEmail] = useState('divan@vilaglobal.org');

  // Sessões ativas
  const [sessions, setSessions] = useState([
    {
      id: 'sess-1',
      device: 'MacBook Pro 16"',
      browser: 'Chrome 122.0 (macOS Sonoma)',
      location: 'Lisboa, Portugal',
      ip: '194.65.12.88',
      current: true,
      lastActive: 'Ativo agora',
      icon: Laptop,
    },
    {
      id: 'sess-2',
      device: 'iPhone 15 Pro Max',
      browser: 'VILA App 3.2.0 (iOS 17.4)',
      location: 'Faro, Algarve, Portugal',
      ip: '85.241.76.104',
      current: false,
      lastActive: 'Há 4 horas',
      icon: Smartphone,
    },
    {
      id: 'sess-3',
      device: 'Desktop Workstation',
      browser: 'Firefox Developer Edition (Windows 11)',
      location: 'Madrid, Espanha',
      ip: '212.166.88.12',
      current: false,
      lastActive: 'Há 2 dias',
      icon: Monitor,
    },
  ]);

  // Dispositivos confiáveis
  const [trustedDevices, setTrustedDevices] = useState([
    { id: 'dev-1', name: 'MacBook Pro de Divan', type: 'Computador', added: '15 Jan 2026' },
    { id: 'dev-2', name: 'iPhone Pessoal', type: 'Telemóvel', added: '02 Fev 2026' },
    { id: 'dev-3', name: 'iPad Pro VILA Foundation', type: 'Tablet', added: '28 Fev 2026' },
  ]);

  // Delete confirmation text
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  // Fechar dropdowns ao clicar fora
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="w-full space-y-6 font-sans" ref={dropdownRef}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1455AC] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-blue-400 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-blue-200 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Grid Principal de 2 Colunas Exato ao Design UI PRIVACIDADE E SEGURANCA.png */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================================= */}
        {/* COLUNA ESQUERDA (7 colunas em telas grandes) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. CARD: Privacidade dos dados */}
          <section
            id="privacy-card-data-privacy"
            className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5"
          >
            <h2 className="text-[15px] sm:text-base font-bold text-slate-900 font-sans">
              Privacidade dos dados
            </h2>

            <div className="space-y-4 divide-y divide-slate-100">
              {/* Item 1: Quem pode ver o meu perfil? */}
              <div className="pt-2 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                      Quem pode ver o meu perfil?
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Defina quem pode visualizar as suas informações de perfil.
                    </p>
                  </div>
                </div>

                {/* Dropdown Apenas parceiros */}
                <div className="relative shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(openDropdown === 'profile' ? null : 'profile')
                    }
                    className="flex items-center justify-between gap-2 px-3 py-1.5 min-w-[155px] rounded-xl border border-slate-200/90 bg-white text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{profileVisibility}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {openDropdown === 'profile' && (
                    <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-30 animate-in fade-in duration-100">
                      {[
                        'Público',
                        'Apenas parceiros',
                        'Parceiros e contactos',
                        'Apenas eu',
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setProfileVisibility(opt);
                            setOpenDropdown(null);
                            triggerToast(`Visibilidade do perfil atualizada para: ${opt}`);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg font-medium flex items-center justify-between cursor-pointer ${
                            profileVisibility === opt
                              ? 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] font-bold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span>{opt}</span>
                          {profileVisibility === opt && (
                            <Check className="w-3.5 h-3.5 text-[#1455AC]" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Item 2: Quem pode contactar-me? */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                      Quem pode contactar-me?
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Escolha quem pode enviar-lhe mensagens ou pedidos.
                    </p>
                  </div>
                </div>

                {/* Dropdown Parceiros e contactos */}
                <div className="relative shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(openDropdown === 'contact' ? null : 'contact')
                    }
                    className="flex items-center justify-between gap-2 px-3 py-1.5 min-w-[155px] rounded-xl border border-slate-200/90 bg-white text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{whoCanContact}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {openDropdown === 'contact' && (
                    <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-30 animate-in fade-in duration-100">
                      {[
                        'Todos',
                        'Parceiros e contactos',
                        'Apenas parceiros',
                        'Ninguém',
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setWhoCanContact(opt);
                            setOpenDropdown(null);
                            triggerToast(`Preferência de contacto definida: ${opt}`);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg font-medium flex items-center justify-between cursor-pointer ${
                            whoCanContact === opt
                              ? 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] font-bold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span>{opt}</span>
                          {whoCanContact === opt && (
                            <Check className="w-3.5 h-3.5 text-[#1455AC]" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Item 3: Visibilidade das minhas atividades */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                      Visibilidade das minhas atividades
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Controle quem pode ver as suas atividades na plataforma.
                    </p>
                  </div>
                </div>

                {/* Dropdown Apenas eu */}
                <div className="relative shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(openDropdown === 'activity' ? null : 'activity')
                    }
                    className="flex items-center justify-between gap-2 px-3 py-1.5 min-w-[155px] rounded-xl border border-slate-200/90 bg-white text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{activityVisibility}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {openDropdown === 'activity' && (
                    <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-30 animate-in fade-in duration-100">
                      {[
                        'Público',
                        'Parceiros e contactos',
                        'Apenas parceiros',
                        'Apenas eu',
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setActivityVisibility(opt);
                            setOpenDropdown(null);
                            triggerToast(`Visibilidade de atividades: ${opt}`);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg font-medium flex items-center justify-between cursor-pointer ${
                            activityVisibility === opt
                              ? 'bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] font-bold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span>{opt}</span>
                          {activityVisibility === opt && (
                            <Check className="w-3.5 h-3.5 text-[#1455AC]" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Item 4: Aparecer nas pesquisas */}
              <div className="pt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                      Aparecer nas pesquisas
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Permita que o seu perfil apareça nos resultados de pesquisa.
                    </p>
                  </div>
                </div>

                {/* Toggle Switch (OFF por padrão) */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={appearInSearch}
                  onClick={() => {
                    const next = !appearInSearch;
                    setAppearInSearch(next);
                    triggerToast(
                      next
                        ? 'Perfil agora visível nas pesquisas.'
                        : 'Perfil oculto dos resultados de pesquisa.'
                    );
                  }}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    appearInSearch ? 'bg-[#1455AC]' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-slate-800 shadow-xs ring-0 transition duration-200 ease-in-out ${
                      appearInSearch ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Item 5: Histórico de navegação */}
              <div className="pt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                      Histórico de navegação
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Guarde o meu histórico para uma melhor experiência.
                    </p>
                  </div>
                </div>

                {/* Toggle Switch (ON por padrão) */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={browsingHistory}
                  onClick={() => {
                    const next = !browsingHistory;
                    setBrowsingHistory(next);
                    triggerToast(
                      next
                        ? 'Histórico de navegação ativado.'
                        : 'Histórico de navegação pausado.'
                    );
                  }}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    browsingHistory ? 'bg-[#1455AC]' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-slate-800 shadow-xs ring-0 transition duration-200 ease-in-out ${
                      browsingHistory ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Link inferior: Ver e gerir os meus dados → */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setActiveModal('manage-data')}
                className="text-[12.5px] font-bold text-[#1455AC] hover:underline inline-flex items-center gap-1.5 cursor-pointer group"
              >
                <span>Ver e gerir os meus dados</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </section>

          {/* 2. CARD: Segurança da conta */}
          <section
            id="privacy-card-account-security"
            className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5"
          >
            <h2 className="text-[15px] sm:text-base font-bold text-slate-900 font-sans">
              Segurança da conta
            </h2>

            <div className="space-y-4 divide-y divide-slate-100">
              {/* Item 1: Palavra-passe */}
              <div className="pt-2 first:pt-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                      Palavra-passe
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Última alteração há 32 dias
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal('password')}
                  className="px-4 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
                >
                  Alterar
                </button>
              </div>

              {/* Item 2: Autenticação de dois fatores (2FA) */}
              <div className="pt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1455AC] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                      Autenticação de dois fatores (2FA)
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Proteja a sua conta com uma camada extra de segurança.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal('2fa')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer group"
                >
                  <span>Ativada</span>
                  <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Item 3: Sessões ativas */}
              <div className="pt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                      Sessões ativas
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Veja e encerre sessões em dispositivos que não reconhece.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal('sessions')}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
                >
                  Ver sessões
                </button>
              </div>

              {/* Item 4: Dispositivos confiáveis */}
              <div className="pt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                      Dispositivos confiáveis
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Gerir dispositivos nos quais não é solicitado código de verificação.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal('devices')}
                  className="px-4 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
                >
                  Gerir
                </button>
              </div>

              {/* Item 5: E-mail de recuperação */}
              <div className="pt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                      E-mail de recuperação
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5 font-medium">
                      {recoveryEmail}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setTempRecoveryEmail(recoveryEmail);
                    setActiveModal('recovery-email');
                  }}
                  className="px-4 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
                >
                  Alterar
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* ========================================================================= */}
        {/* COLUNA DIREITA (5 colunas em telas grandes) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* 3. CARD: Permissões e dados */}
          <section
            id="privacy-card-permissions-data"
            className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5"
          >
            <h2 className="text-[15px] sm:text-base font-bold text-slate-900 font-sans">
              Permissões e dados
            </h2>

            <div className="space-y-4 divide-y divide-slate-100">
              {/* Item 1: Permissões da plataforma */}
              <button
                type="button"
                onClick={() => setActiveModal('platform-permissions')}
                className="w-full text-left pt-2 first:pt-0 flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 group-hover:text-[#1455AC] transition-colors leading-tight">
                      Permissões da plataforma
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Veja e gerencie as permissões que concedeu à VILA.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              {/* Item 2: Apps e serviços conectados */}
              <button
                type="button"
                onClick={() => setActiveModal('connected-apps')}
                className="w-full text-left pt-4 flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Link2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 group-hover:text-[#1455AC] transition-colors leading-tight">
                      Apps e serviços conectados
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Gerencie aplicações de terceiros com acesso à sua conta.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              {/* Item 3: Dados partilhados */}
              <button
                type="button"
                onClick={() => setActiveModal('shared-data')}
                className="w-full text-left pt-4 flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 group-hover:text-[#1455AC] transition-colors leading-tight">
                      Dados partilhados
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Veja com quem os seus dados foram partilhados.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              {/* Item 4: Exportar os meus dados */}
              <button
                type="button"
                onClick={() => setActiveModal('export-data')}
                className="w-full text-left pt-4 flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 group-hover:text-[#1455AC] transition-colors leading-tight">
                      Exportar os meus dados
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Receba uma cópia dos seus dados em formato portátil.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              {/* Item 5: Eliminar a minha conta */}
              <button
                type="button"
                onClick={() => setActiveModal('delete-account')}
                className="w-full text-left pt-4 flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-red-600 leading-tight">
                      Eliminar a minha conta
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Eliminar permanentemente a sua conta e todos os dados.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-red-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            </div>
          </section>

          {/* 4. CARD: Privacidade de comunicações */}
          <section
            id="privacy-card-communications"
            className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5"
          >
            <h2 className="text-[15px] sm:text-base font-bold text-slate-900 font-sans">
              Privacidade de comunicações
            </h2>

            <div className="space-y-4 divide-y divide-slate-100">
              {/* Item 1: E-mails de marketing e novidades */}
              <div className="pt-2 first:pt-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                      E-mails de marketing e novidades
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Receba novidades, atualizações e dicas da VILA.
                    </p>
                  </div>
                </div>

                {/* Toggle (ON por padrão) */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={marketingEmails}
                  onClick={() => {
                    const next = !marketingEmails;
                    setMarketingEmails(next);
                    triggerToast(
                      next ? 'E-mails de novidades ativados.' : 'E-mails de novidades desativados.'
                    );
                  }}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    marketingEmails ? 'bg-[#1455AC]' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-slate-800 shadow-xs ring-0 transition duration-200 ease-in-out ${
                      marketingEmails ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Item 2: Convites e recomendações */}
              <div className="pt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                      Convites e recomendações
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Receba convites para eventos e recomendações personalizadas.
                    </p>
                  </div>
                </div>

                {/* Toggle (ON por padrão) */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={invitesRecommendations}
                  onClick={() => {
                    const next = !invitesRecommendations;
                    setInvitesRecommendations(next);
                    triggerToast(
                      next
                        ? 'Convites e recomendações ativados.'
                        : 'Convites e recomendações desativados.'
                    );
                  }}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    invitesRecommendations ? 'bg-[#1455AC]' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-slate-800 shadow-xs ring-0 transition duration-200 ease-in-out ${
                      invitesRecommendations ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Item 3: Pesquisas e melhorias */}
              <div className="pt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-900 leading-tight">
                      Pesquisas e melhorias
                    </h3>
                    <p className="text-[11.5px] text-slate-500 mt-0.5">
                      Permita que a VILA use dados anónimos para melhorar a plataforma.
                    </p>
                  </div>
                </div>

                {/* Toggle (OFF por padrão) */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={researchImprovements}
                  onClick={() => {
                    const next = !researchImprovements;
                    setResearchImprovements(next);
                    triggerToast(
                      next
                        ? 'Participação anónima em melhorias ativada.'
                        : 'Participação anónima desativada.'
                    );
                  }}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    researchImprovements ? 'bg-[#1455AC]' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-slate-800 shadow-xs ring-0 transition duration-200 ease-in-out ${
                      researchImprovements ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* 5. CARD: Alertas de segurança */}
          <section
            id="privacy-card-security-alerts"
            className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-[15px] sm:text-base font-bold text-slate-900 font-sans">
                Alertas de segurança
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]/60">
                Tudo protegido
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Lado Esquerdo: 2 Checkmarks de Monitorização */}
              <div className="space-y-3.5 flex-1 min-w-0">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[12.5px] font-bold text-slate-900 leading-tight">
                      Sem atividades suspeitas
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Não foram detetadas atividades incomuns na sua conta.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[12.5px] font-bold text-slate-900 leading-tight">
                      Monitorização ativa
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Estamos a monitorizar a sua conta 24/7 para a manter segura.
                    </p>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveModal('about-security')}
                    className="text-[12px] font-bold text-[#1455AC] hover:underline inline-flex items-center gap-1 cursor-pointer group"
                  >
                    <span>Saiba mais sobre segurança na VILA</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Lado Direito: Gráfico de Escudo 3D com Checkmark e Partículas Orbitais */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center relative">
                <svg
                  viewBox="0 0 120 120"
                  className="w-full h-full drop-shadow-sm overflow-visible"
                >
                  <defs>
                    <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="50%" stopColor="#1455AC" />
                      <stop offset="100%" stopColor="#0F3B77" />
                    </linearGradient>
                    <linearGradient id="shield-border" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#93C5FD" />
                      <stop offset="100%" stopColor="#0C2B56" />
                    </linearGradient>
                    <radialGradient id="shield-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.8" />
                      <stop offset="60%" stopColor="#EFF6FF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Soft Aura Glow */}
                  <circle cx="60" cy="60" r="50" fill="url(#shield-glow)" />

                  {/* Sparkle Nodes / Constellation Dots */}
                  <circle cx="20" cy="40" r="2" fill="#93C5FD" opacity="0.8" />
                  <circle cx="28" cy="85" r="1.5" fill="#60A5FA" opacity="0.6" />
                  <circle cx="95" cy="35" r="2.2" fill="#60A5FA" opacity="0.9" />
                  <circle cx="102" cy="75" r="1.8" fill="#93C5FD" opacity="0.7" />
                  <circle cx="60" cy="15" r="1.5" fill="#3B82F6" opacity="0.6" />

                  {/* Connecting dashed lines */}
                  <path
                    d="M20 40 Q 40 25 60 15"
                    fill="none"
                    stroke="#BFDBFE"
                    strokeWidth="0.7"
                    strokeDasharray="2 2"
                  />
                  <path
                    d="M60 15 Q 80 20 95 35"
                    fill="none"
                    stroke="#BFDBFE"
                    strokeWidth="0.7"
                    strokeDasharray="2 2"
                  />
                  <path
                    d="M95 35 Q 105 55 102 75"
                    fill="none"
                    stroke="#BFDBFE"
                    strokeWidth="0.7"
                    strokeDasharray="2 2"
                  />
                  <path
                    d="M28 85 Q 40 105 60 108"
                    fill="none"
                    stroke="#BFDBFE"
                    strokeWidth="0.7"
                    strokeDasharray="2 2"
                  />

                  {/* Shield Outer Outline */}
                  <path
                    d="M60 22 C78 22 92 28 92 46 C92 72 74 92 60 98 C46 92 28 72 28 46 C28 28 42 22 60 22 Z"
                    fill="#FFFFFF"
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                  />

                  {/* Shield Main Body */}
                  <path
                    d="M60 26 C75 26 87 31 87 47 C87 69 72 86 60 92 C48 86 33 69 33 47 C33 31 45 26 60 26 Z"
                    fill="none"
                    stroke="#1455AC"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />

                  {/* Shield Checkmark */}
                  <path
                    d="M48 57 L56 65 L73 47"
                    fill="none"
                    stroke="#1455AC"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAIS INTERATIVOS */}
      {/* ========================================================================= */}

      {/* Modal 1: Alterar Palavra-passe */}
      {activeModal === 'password' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1455AC] flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Alterar Palavra-passe
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Defina uma palavra-passe forte com letras, números e símbolos.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Palavra-passe atual
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nova palavra-passe
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo de 8 caracteres"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirmar nova palavra-passe
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a nova palavra-passe"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!currentPassword || !newPassword) {
                    alert('Por favor preencha todos os campos.');
                    return;
                  }
                  if (newPassword !== confirmPassword) {
                    alert('As novas palavras-passe não coincidem.');
                    return;
                  }
                  setActiveModal(null);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                  triggerToast('Palavra-passe alterada com sucesso!');
                }}
                className="px-4 py-1.5 rounded-xl bg-[#1455AC] hover:bg-[#0F3B77] text-white text-xs font-bold shadow-2xs transition-colors"
              >
                Guardar alteração
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Autenticação de dois fatores (2FA) */}
      {activeModal === '2fa' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Autenticação de Dois Fatores (2FA)
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <Check className="w-3 h-3" /> Ativa via App Autenticadora
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl space-y-1">
                <p className="font-bold text-emerald-800">Camada de Segurança Máxima</p>
                <p className="text-[11.5px] text-emerald-700">
                  Um código temporário de 6 dígitos é exigido a cada novo login em dispositivos não reconhecidos.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div>
                    <p className="font-bold text-slate-900">Aplicação Autenticadora</p>
                    <p className="text-[11px] text-slate-500">Google Authenticator / Authy</p>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-white border border-emerald-200 px-2 py-0.5 rounded-md">
                    Configurado
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div>
                    <p className="font-bold text-slate-900">Códigos de Recuperação</p>
                    <p className="text-[11px] text-slate-500">8 códigos sobressalentes gerados</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerToast('Novos códigos de recuperação enviados para o seu e-mail.')}
                    className="text-[11px] font-bold text-[#1455AC] hover:underline"
                  >
                    Gerar novos
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold shadow-2xs hover:bg-slate-900"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Sessões Ativas */}
      {activeModal === 'sessions' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1455AC] flex items-center justify-center">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Sessões Ativas
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Dispositivos conectados à sua conta VILA neste momento.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {sessions.map((sess) => {
                const IconComponent = sess.icon;
                return (
                  <div
                    key={sess.id}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4 text-slate-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {sess.device}
                          </p>
                          {sess.current && (
                            <span className="px-1.5 py-0.2 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[9.5px] border border-emerald-200">
                              Esta sessão
                            </span>
                          )}
                        </div>
                        <p className="text-[10.5px] text-slate-500 truncate">
                          {sess.browser} • {sess.location}
                        </p>
                      </div>
                    </div>

                    {!sess.current && (
                      <button
                        type="button"
                        onClick={() => {
                          setSessions((prev) => prev.filter((s) => s.id !== sess.id));
                          triggerToast(`Sessão terminada em ${sess.device}.`);
                        }}
                        className="text-[11px] font-bold text-red-600 hover:underline shrink-0"
                      >
                        Encerrar
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setSessions((prev) => prev.filter((s) => s.current));
                  triggerToast('Todas as outras sessões foram encerradas com sucesso.');
                }}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Encerrar todas as outras sessões
              </button>

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold shadow-2xs hover:bg-slate-900"
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Dispositivos Confiáveis */}
      {activeModal === 'devices' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1455AC] flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Dispositivos Confiáveis
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Dispositivos autorizados que dispensam verificação adicional.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {trustedDevices.map((dev) => (
                <div
                  key={dev.id}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900">{dev.name}</p>
                    <p className="text-[10.5px] text-slate-500">
                      {dev.type} • Adicionado em {dev.added}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setTrustedDevices((prev) => prev.filter((d) => d.id !== dev.id));
                      triggerToast(`${dev.name} removido dos dispositivos confiáveis.`);
                    }}
                    className="text-[11px] font-bold text-red-600 hover:underline"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold shadow-2xs hover:bg-slate-900"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 5: Alterar E-mail de Recuperação */}
      {activeModal === 'recovery-email' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    E-mail de Recuperação
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Utilizado caso perca o acesso à sua palavra-passe principal.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Novo e-mail de recuperação
                </label>
                <input
                  type="email"
                  value={tempRecoveryEmail}
                  onChange={(e) => setTempRecoveryEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Enviaremos um link de confirmação para verificar a titularidade do endereço.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!tempRecoveryEmail.includes('@')) {
                    alert('Por favor introduza um e-mail válido.');
                    return;
                  }
                  setRecoveryEmail(tempRecoveryEmail);
                  setActiveModal(null);
                  triggerToast(`E-mail de recuperação atualizado para: ${tempRecoveryEmail}`);
                }}
                className="px-4 py-1.5 rounded-xl bg-[#1455AC] hover:bg-[#0F3B77] text-white text-xs font-bold shadow-2xs transition-colors"
              >
                Guardar e-mail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 6: Permissões da Plataforma */}
      {activeModal === 'platform-permissions' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Permissões da Plataforma
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Permissões ativas concedidas ao navegador e aplicação.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Localização Geográfica</p>
                  <p className="text-[10.5px] text-slate-500">Algarve, Portugal (Para eventos locais)</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Permitida
                </span>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Notificações no Navegador</p>
                  <p className="text-[10.5px] text-slate-500">Alertas de projetos e mensagens</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Permitida
                </span>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Câmara e Microfone</p>
                  <p className="text-[10.5px] text-slate-500">Apenas solicitada durante fóruns ao vivo</p>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-md">
                  Sob Pedido
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold shadow-2xs hover:bg-slate-900"
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 7: Apps e Serviços Conectados */}
      {activeModal === 'connected-apps' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1455AC] flex items-center justify-center">
                  <Link2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Apps e Serviços Conectados
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Aplicações de terceiros autorizadas a interagir com o seu perfil.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Google Workspace</p>
                  <p className="text-[10.5px] text-slate-500">Sincronização de calendário e reuniões</p>
                </div>
                <button
                  type="button"
                  onClick={() => triggerToast('Acesso de Google Workspace revogado.')}
                  className="text-[11px] font-bold text-red-600 hover:underline"
                >
                  Revogar
                </button>
              </div>

              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Slack VILA Community</p>
                  <p className="text-[10.5px] text-slate-500">Notificações em canais de voluntários</p>
                </div>
                <button
                  type="button"
                  onClick={() => triggerToast('Acesso do Slack revogado.')}
                  className="text-[11px] font-bold text-red-600 hover:underline"
                >
                  Revogar
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold shadow-2xs hover:bg-slate-900"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 8: Dados Partilhados */}
      {activeModal === 'shared-data' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Dados Partilhados
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Histórico de dados anonimizados partilhados com parceiros da rede.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <p className="text-[11.5px] leading-relaxed">
                A VILA <strong>nunca comercializa nem cede</strong> os seus dados pessoais a terceiros. Apenas dados estatísticos agregados (como métricas de impacto de projetos) são consolidados para relatórios globais de sustentabilidade.
              </p>
              <div className="p-3 bg-purple-50/70 border border-purple-200/60 rounded-xl space-y-1">
                <p className="font-bold text-purple-900">Em conformidade com o RGPD</p>
                <p className="text-[11px] text-purple-800">
                  Os seus dados estão protegidos sob os mais rigorosos padrões da União Europeia.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold shadow-2xs hover:bg-slate-900"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 9: Exportar Dados */}
      {activeModal === 'export-data' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Exportar os Meus Dados
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Descarregue o arquivo completo em formato legível por computador.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <p className="text-[11.5px] text-slate-600 leading-relaxed">
                O arquivo incluirá o seu perfil, histórico de contribuições, publicações, projetos criados e mensagens.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    triggerToast('Arquivo JSON gerado e descarregado com sucesso!');
                  }}
                  className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 text-center font-bold text-slate-700 hover:bg-blue-50/50 transition-all cursor-pointer"
                >
                  <p className="text-xs">Formato JSON</p>
                  <p className="text-[10px] text-slate-400 font-normal">Estruturado para devs</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    triggerToast('Relatório PDF consolidado descarregado!');
                  }}
                  className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 text-center font-bold text-slate-700 hover:bg-blue-50/50 transition-all cursor-pointer"
                >
                  <p className="text-xs">Relatório PDF</p>
                  <p className="text-[10px] text-slate-400 font-normal">Documento para leitura</p>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 10: Eliminar Conta */}
      {activeModal === 'delete-account' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-red-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-red-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-red-600 font-sans">
                    Eliminar Conta Definitivamente
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Ação irreversível de exclusão de dados.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  setDeleteConfirmation('');
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p className="text-[11.5px] leading-relaxed">
                Ao confirmar, todos os seus dados pessoais, históricos, mensagens e participações em iniciativas na VILA serão permanentemente apagados dos nossos servidores.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Escreva <span className="text-red-600">ELIMINAR</span> para confirmar:
                </label>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="ELIMINAR"
                  className="w-full px-3 py-2 rounded-xl border border-red-200 text-xs focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  setDeleteConfirmation('');
                }}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={deleteConfirmation !== 'ELIMINAR'}
                onClick={() => {
                  setActiveModal(null);
                  setDeleteConfirmation('');
                  alert('Pedido de eliminação registado. Foi enviado um e-mail de confirmação para divan@vilaglobal.org');
                }}
                className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-2xs transition-colors"
              >
                Eliminar Permanentemente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 11: Gerir os Meus Dados */}
      {activeModal === 'manage-data' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1455AC] flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Gestão de Dados e RGPD
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Transparência e direitos sobre as suas informações.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              <p className="text-[11.5px] leading-relaxed">
                Você mantém a propriedade absoluta de tudo o que cria ou submete na VILA. A qualquer momento pode solicitar a retificação, portabilidade ou eliminação de registos.
              </p>
              <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl space-y-1">
                <p className="font-bold text-[#1455AC]">Encarregado de Proteção de Dados (DPO)</p>
                <p className="text-[11px] text-blue-800">
                  dpo@vilaglobal.org • Resposta em até 48 horas úteis
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold shadow-2xs hover:bg-slate-900"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 12: Saiba Mais Sobre Segurança */}
      {activeModal === 'about-security' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    Segurança e Proteção VILA
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Padrões globais de criptografia e conformidade.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50">
                <p className="font-bold text-slate-900">Cifra de Ponta a Ponta</p>
                <p className="text-[10.5px] text-slate-500 mt-0.5">
                  Protocolo AES-256 e TLS 1.3 em trânsito e em repouso.
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50">
                <p className="font-bold text-slate-900">Auditorias e Testes de Intrusão</p>
                <p className="text-[10.5px] text-slate-500 mt-0.5">
                  Revisões de vulnerabilidades periódicas por entidades independentes.
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50">
                <p className="font-bold text-slate-900">Monitorização Contínua 24/7</p>
                <p className="text-[10.5px] text-slate-500 mt-0.5">
                  Deteção precoce automatizada de anomalias com proteção DDoS Cloudflare.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold shadow-2xs hover:bg-slate-900"
              >
                Compreendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
