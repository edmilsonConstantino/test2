import React, { useState } from 'react';
import {
  Camera,
  Pencil,
  Mail,
  Shield,
  Key,
  ChevronRight,
  Plus,
  ShieldCheck,
  Sliders,
  MoreVertical,
  Monitor,
  Smartphone,
  Laptop,
  CheckCircle2,
  Lock,
  ExternalLink,
  X,
  User,
  Clock,
  Trash2,
} from 'lucide-react';
import { SettingsTabId } from './types';

interface AccountsAccessTabProps {
  onNavigateTab?: (tabId: SettingsTabId) => void;
}

export const AccountsAccessTab: React.FC<AccountsAccessTabProps> = ({ onNavigateTab }) => {
  // Modal states for interactive feel
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditInfoModal, setShowEditInfoModal] = useState(false);
  const [showAllMembersModal, setShowAllMembersModal] = useState(false);
  const [showAllSessionsModal, setShowAllSessionsModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showAuthMethodsModal, setShowAuthMethodsModal] = useState(false);

  // Profile data
  const [userInfo, setUserInfo] = useState({
    name: 'Divan Mellert',
    email: 'divan@vilaglobal.org',
    role: 'Administrador',
    memberSince: '15 de março de 2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  });

  // Connected accounts state
  const [connectedServices, setConnectedServices] = useState([
    { id: 'google', name: 'Google', connected: true },
    { id: 'microsoft', name: 'Microsoft', connected: true },
    { id: 'apple', name: 'Apple', connected: false },
    { id: 'linkedin', name: 'LinkedIn', connected: false },
  ]);

  // Team members state
  const [teamMembers, setTeamMembers] = useState([
    {
      id: '1',
      name: 'Divan Mellert (Você)',
      email: 'divan@vilaglobal.org',
      role: 'Proprietário',
      rolePill: 'Proprietário',
      accessType: 'Acesso total',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      pillClass: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40',
    },
    {
      id: '2',
      name: 'Zulmira Mellert',
      email: 'zulmira@vilaglobal.org',
      role: 'Editor',
      rolePill: 'Editor',
      accessType: 'Acesso padrão',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      pillClass: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40',
    },
    {
      id: '3',
      name: 'Carlos Tomás',
      email: 'carlos@vilaglobal.org',
      role: 'Visualizador',
      rolePill: 'Visualizador',
      accessType: 'Acesso limitado',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      pillClass: 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/40',
    },
  ]);

  // Additional 3 members for the "+3 Mais utilizadores" view
  const additionalMembers = [
    {
      id: '4',
      name: 'Ana Sofia Ramos',
      email: 'ana.ramos@vilaglobal.org',
      role: 'Editor',
      accessType: 'Acesso padrão',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: '5',
      name: 'João Pedro Mendonça',
      email: 'joao.m@vilaglobal.org',
      role: 'Visualizador',
      accessType: 'Acesso limitado',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: '6',
      name: 'Mariana Costa',
      email: 'mariana.costa@vilaglobal.org',
      role: 'Editor',
      accessType: 'Acesso padrão',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    },
  ];

  // Active sessions state
  const [sessions, setSessions] = useState([
    {
      id: 'sess-1',
      device: 'Windows • Chrome',
      isCurrent: true,
      location: 'Lisboa, Portugal • Este dispositivo',
      icon: Monitor,
    },
    {
      id: 'sess-2',
      device: 'iPhone 14 • Safari',
      isCurrent: false,
      location: 'Lisboa, Portugal • Há 2 horas',
      icon: Smartphone,
    },
    {
      id: 'sess-3',
      device: 'MacBook Pro • Chrome',
      isCurrent: false,
      location: 'Porto, Portugal • Ontem, 18:24',
      icon: Laptop,
    },
  ]);

  // Invite member form inputs
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Editor' | 'Visualizador'>('Editor');

  const toggleConnection = (id: string) => {
    setConnectedServices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, connected: !item.connected } : item))
    );
  };

  const handleEndSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    const newMember = {
      id: String(Date.now()),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      rolePill: inviteRole,
      accessType: inviteRole === 'Editor' ? 'Acesso padrão' : 'Acesso limitado',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      pillClass:
        inviteRole === 'Editor'
          ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40'
          : 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/40',
    };
    setTeamMembers((prev) => [...prev, newMember]);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-150">
      {/* ========================================================
          ROW 1: 3 Equal Columns (Informações, Métodos de Sessão, Contas Conectadas)
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch font-sans">
        {/* Card 1: Informações da conta */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs flex flex-col justify-between font-sans">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans mb-5">
              Informações da conta
            </h2>

            <div className="flex items-start gap-4 font-sans">
              {/* Avatar com botão circular de câmera */}
              <div className="relative shrink-0">
                <img
                  src={userInfo.avatar}
                  alt={userInfo.name}
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => alert('Selecione uma nova fotografia para o seu avatar')}
                  title="Alterar fotografia"
                  className="absolute bottom-0 right-0 p-1.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm text-slate-600 dark:text-slate-400 hover:text-[#1455AC] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Informações detalhadas */}
              <div className="flex-1 min-w-0 space-y-2 font-sans">
                <div>
                  <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 leading-none">Nome</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-50 mt-0.5 truncate font-sans">{userInfo.name}</p>
                </div>

                <div>
                  <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 leading-none">E-mail</p>
                  <div className="flex items-center gap-1.5 flex-wrap mt-0.5 font-sans">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate font-sans">
                      {userInfo.email}
                    </span>
                    <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/40 font-sans">
                      Verificado
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 leading-none">Cargo</p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5 font-sans">{userInfo.role}</p>
                </div>

                <div>
                  <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 leading-none">Membro desde</p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5 font-sans">{userInfo.memberSince}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botão de rodapé: Editar informações */}
          <button
            type="button"
            onClick={() => setShowEditInfoModal(true)}
            className="w-full mt-6 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs font-sans"
          >
            <Pencil className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>Editar informações</span>
          </button>
        </div>

        {/* Card 2: Métodos de início de sessão */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs flex flex-col justify-between font-sans">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
              Métodos de início de sessão
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-4">
              Gerencie as formas de aceder à sua conta.
            </p>

            <div className="space-y-3 font-sans">
              {/* Item 1: E-mail e palavra-passe */}
              <div
                onClick={() => setShowAuthMethodsModal(true)}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/60 hover:bg-slate-50/90 dark:hover:bg-slate-800 transition-colors flex items-center justify-between gap-3 cursor-pointer group font-sans"
              >
                <div className="flex items-center gap-3 min-w-0 font-sans">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 font-sans">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 group-hover:text-[#1455AC] transition-colors font-sans">
                      E-mail e palavra-passe
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-sans">{userInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 font-sans">
                  <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40 font-sans">
                    Ativo
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Item 2: Autenticação de dois fatores (2FA) */}
              <div
                onClick={() => setShowAuthMethodsModal(true)}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/60 hover:bg-slate-50/90 dark:hover:bg-slate-800 transition-colors flex items-center justify-between gap-3 cursor-pointer group font-sans"
              >
                <div className="flex items-center gap-3 min-w-0 font-sans">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 font-sans">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 group-hover:text-[#1455AC] transition-colors font-sans">
                      Autenticação de dois fatores (2FA)
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-sans">
                      Proteção extra para a sua conta
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 font-sans">
                  <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40 font-sans">
                    Ativado
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Item 3: Chaves de acesso (Passkeys) */}
              <div
                onClick={() => setShowAuthMethodsModal(true)}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/60 hover:bg-slate-50/90 dark:hover:bg-slate-800 transition-colors flex items-center justify-between gap-3 cursor-pointer group font-sans"
              >
                <div className="flex items-center gap-3 min-w-0 font-sans">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Key className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 font-sans">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 group-hover:text-[#1455AC] transition-colors font-sans">
                      Chaves de acesso (Passkeys)
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-sans">
                      Inicie sessão sem palavra-passe
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 font-sans">
                  <span className="text-xs font-semibold text-[#1455AC] font-sans">1 chave</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Link de rodapé: Gerir métodos de acesso */}
          <button
            type="button"
            onClick={() => setShowAuthMethodsModal(true)}
            className="mt-6 pt-3 text-xs font-bold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer self-start font-sans"
          >
            <span>Gerir métodos de acesso</span>
            <span>→</span>
          </button>
        </div>

        {/* Card 3: Contas conectadas */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs flex flex-col justify-between font-sans">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">Contas conectadas</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-4">
              Conecte serviços externos à sua conta VILA.
            </p>

            <div className="space-y-3">
              {/* 1. Google */}
              <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Google</h3>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Conectado</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleConnection('google')}
                  className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Gerir
                </button>
              </div>

              {/* 2. Microsoft */}
              <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                      <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
                      <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
                      <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Microsoft</h3>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Conectado</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleConnection('microsoft')}
                  className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Gerir
                </button>
              </div>

              {/* 3. Apple */}
              <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 fill-current text-slate-900 dark:text-slate-50" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.08 1.74-.95 2.77 1 .08 2.05-.52 2.68-1.27z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Apple</h3>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Não conectado</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleConnection('apple')}
                  className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Conectar
                </button>
              </div>

              {/* 4. LinkedIn */}
              <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 fill-[#0A66C2]" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-50">LinkedIn</h3>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Não conectado</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleConnection('linkedin')}
                  className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Conectar
                </button>
              </div>
            </div>
          </div>

          {/* Link de rodapé: Ver mais integrações */}
          <button
            type="button"
            onClick={() => onNavigateTab?.('integracoes')}
            className="mt-6 pt-3 text-xs font-bold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer self-start font-sans"
          >
            <span>Ver mais integrações</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          ROW 2: 2 Columns (Gestão de Acessos vs Sessões Ativas + Atividade)
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
        {/* Coluna Esquerda: Gestão de acessos */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs font-sans">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">Gestão de acessos</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Controle quem pode aceder à sua conta e com que permissões.
          </p>

          {/* Botão Primário: + Convidar utilizador */}
          <button
            type="button"
            onClick={() => setShowInviteModal(true)}
            className="mt-4 mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1455AC] hover:bg-[#0F3B77] text-white text-xs font-bold transition-all shadow-xs cursor-pointer font-sans"
          >
            <Plus className="w-4 h-4" />
            <span>Convidar utilizador</span>
          </button>

          {/* Lista de Membros da Equipa */}
          <div className="divide-y divide-slate-100 dark:divide-slate-700 font-sans">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800 rounded-xl px-2 -mx-2 transition-colors font-sans"
              >
                <div className="flex items-center gap-3 min-w-0 font-sans">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-slate-100 dark:ring-slate-800"
                  />
                  <div className="min-w-0 font-sans">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">{member.name}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full font-sans ${member.pillClass}`}>
                        {member.rolePill}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-sans">{member.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-sans">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-xs font-medium font-sans">
                    {member.role === 'Proprietário' ? (
                      <ShieldCheck className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    ) : (
                      <Sliders className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    )}
                    <span className="hidden sm:inline font-sans">{member.accessType}</span>
                  </div>

                  {member.role !== 'Proprietário' && (
                    <button
                      type="button"
                      onClick={() => alert(`Gerir permissões de ${member.name}`)}
                      className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 p-1 cursor-pointer"
                      title="Opções"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stack indicador de mais utilizadores */}
          <div className="flex items-center justify-between pt-3 pb-2 border-t border-slate-100 dark:border-slate-800 mt-2 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-500/15 text-[#1455AC] text-xs font-bold flex items-center justify-center font-sans">
                +3
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-sans">Mais 3 utilizadores</span>
            </div>
            <button
              type="button"
              onClick={() => setShowAllMembersModal(true)}
              className="text-xs font-bold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer font-sans"
            >
              <span>Ver todos</span>
              <span>→</span>
            </button>
          </div>

          {/* Link final de histórico */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
            <button
              type="button"
              onClick={() => setShowAuditModal(true)}
              className="text-xs font-bold text-[#1455AC] hover:underline flex items-center gap-1.5 cursor-pointer font-sans"
            >
              <span>Ver histórico de acessos</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Coluna Direita: Sessões Ativas & Atividade da Conta */}
        <div className="lg:col-span-5 space-y-6 font-sans">
          {/* Card A: Sessões ativas */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs font-sans">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">Sessões ativas</h2>
              <button
                type="button"
                onClick={() => setShowAllSessionsModal(true)}
                className="text-xs font-bold text-[#1455AC] hover:underline cursor-pointer font-sans"
              >
                Ver todas
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Dispositivos onde a sua conta está conectada.
            </p>

            <div className="space-y-3.5 font-sans">
              {sessions.map((sess) => {
                const IconComponent = sess.icon;
                return (
                  <div
                    key={sess.id}
                    className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50/50 dark:hover:bg-slate-800 transition-colors font-sans"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 truncate font-sans">{sess.device}</h3>
                          {sess.isCurrent && (
                            <span className="bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded-full font-sans">
                              Atual
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-sans">{sess.location}</p>
                      </div>
                    </div>

                    {!sess.isCurrent && (
                      <button
                        type="button"
                        onClick={() => handleEndSession(sess.id)}
                        className="px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0 font-sans"
                      >
                        Terminar sessão
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card B: Atividade da conta */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs font-sans">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">Atividade da conta</h2>
              <button
                type="button"
                onClick={() => setShowAuditModal(true)}
                className="text-xs font-bold text-[#1455AC] hover:underline cursor-pointer font-sans"
              >
                Ver todas
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Revisão recente de atividades relacionadas à sua conta.
            </p>

            <div className="space-y-3.5 font-sans">
              {/* Atividade 1 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Início de sessão bem-sucedido</h3>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">Lisboa, Portugal • 15 mai 2024, 10:24</p>
                </div>
              </div>

              {/* Atividade 2 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                  <Key className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Palavra-passe alterada</h3>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">Lisboa, Portugal • 10 mai 2024, 09:15</p>
                </div>
              </div>

              {/* Atividade 3 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Novo método 2FA adicionado</h3>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">Lisboa, Portugal • 05 mai 2024, 16:40</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          ROW 3: Full-Width Bottom Security Tip Banner
         ======================================================== */}
      <div className="w-full bg-blue-50/70 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-800/40 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs font-sans">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-blue-100/80 dark:bg-blue-500/15 text-[#1455AC] flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-xs font-medium font-sans">
            <strong className="font-bold text-slate-900 dark:text-slate-50">Dica de segurança:</strong> Utilize uma
            palavra-passe forte e mantenha a autenticação de dois fatores ativada para proteger a sua
            conta.
          </p>
        </div>
        <a
          href="#centro-de-ajuda"
          onClick={(e) => {
            e.preventDefault();
            alert('Centro de Ajuda da VILA: Guias de segurança e gestão de acessos.');
          }}
          className="text-[#1455AC] font-bold hover:underline flex items-center gap-1.5 shrink-0 font-sans"
        >
          <span>Centro de ajuda</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* ========================================================
          MODALS DE INTERAÇÃO
         ======================================================== */}

      {/* 1. Modal Convidar Utilizador */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50">Convidar novo membro para a equipa</h3>
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              O utilizador receberá um convite por e-mail com instruções para ativar o seu acesso à organização.
            </p>
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  E-mail institucional ou pessoal
                </label>
                <input
                  type="email"
                  required
                  placeholder="exemplo@organizacao.org"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Papel de Acesso
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:border-blue-600 outline-none cursor-pointer"
                >
                  <option value="Editor">Editor (Pode criar projetos, publicar eventos e gerir iniciativas)</option>
                  <option value="Visualizador">Visualizador (Apenas consulta de relatórios e indicadores)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1455AC] text-white hover:bg-[#0F3B77] cursor-pointer font-sans"
                >
                  Enviar convite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Modal Editar Informações */}
      {showEditInfoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 font-sans">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">Editar Informações da Conta</h3>
              <button
                type="button"
                onClick={() => setShowEditInfoModal(false)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowEditInfoModal(false);
              }}
              className="space-y-3 font-sans"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nome completo</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#1455AC] outline-none font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">E-mail</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#1455AC] outline-none font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Cargo</label>
                <input
                  type="text"
                  value={userInfo.role}
                  onChange={(e) => setUserInfo({ ...userInfo, role: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#1455AC] outline-none font-sans"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 font-sans">
                <button
                  type="button"
                  onClick={() => setShowEditInfoModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1455AC] text-white hover:bg-[#0F3B77] cursor-pointer font-sans"
                >
                  Guardar alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Modal Ver Todos os Utilizadores */}
      {showAllMembersModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 font-sans">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">Todos os Utilizadores da Conta (6)</h3>
              <button
                type="button"
                onClick={() => setShowAllMembersModal(false)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-80 overflow-y-auto pr-1 font-sans">
              {[...teamMembers, ...additionalMembers].map((member) => (
                <div key={member.id} className="py-2.5 flex items-center justify-between gap-3 font-sans">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-50 truncate font-sans">{member.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-sans">{member.email}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-sans">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2 font-sans">
              <button
                type="button"
                onClick={() => setShowAllMembersModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1455AC] text-white hover:bg-[#0F3B77] cursor-pointer font-sans"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal Histórico de Acessos / Auditoria */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 font-sans">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">Histórico Completo de Auditoria</h3>
              <button
                type="button"
                onClick={() => setShowAuditModal(false)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1 text-xs font-sans">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-slate-50 font-sans">Sessão iniciada via Google OAuth</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">IP: 194.65.12.89 • Lisboa, Portugal</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">15 de maio de 2024 às 10:24</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-slate-50 font-sans">Palavra-passe mestra alterada</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">IP: 194.65.12.89 • Lisboa, Portugal</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">10 de maio de 2024 às 09:15</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-slate-50 font-sans">Novo autenticador TOTP ativado</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">IP: 85.240.110.4 • Lisboa, Portugal</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">05 de maio de 2024 às 16:40</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="font-bold text-slate-900 dark:text-slate-50 font-sans">Passkey Biométrica registada (Touch ID)</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Dispositivo: MacBook Pro • Porto, Portugal</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">28 de abril de 2024 às 14:12</p>
              </div>
            </div>
            <div className="flex justify-end pt-2 font-sans">
              <button
                type="button"
                onClick={() => setShowAuditModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1455AC] text-white hover:bg-[#0F3B77] cursor-pointer font-sans"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal Gerir Métodos de Acesso */}
      {showAuthMethodsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50">Gerir Métodos de Acesso</h3>
              <button
                type="button"
                onClick={() => setShowAuthMethodsModal(false)}
                className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalize a sua palavra-passe, configure chaves de segurança FIDO2 ou regenere chaves de recuperação de dois fatores.
            </p>
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  alert('Instruções de redefinição de palavra-passe enviadas para divan@vilaglobal.org');
                  setShowAuthMethodsModal(false);
                }}
                className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Alterar palavra-passe</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Última atualização há 3 meses</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </button>

              <button
                type="button"
                onClick={() => {
                  alert('Nova Passkey biométrica registada com sucesso!');
                  setShowAuthMethodsModal(false);
                }}
                className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Adicionar nova Passkey</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Touch ID, Face ID ou Windows Hello</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </button>

              <button
                type="button"
                onClick={() => {
                  alert('Códigos de recuperação de 2FA gerados e copiados!');
                  setShowAuthMethodsModal(false);
                }}
                className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-[#0F172A] dark:text-slate-50">Códigos de backup 2FA</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">8 códigos de emergência restantes</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </button>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowAuthMethodsModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
