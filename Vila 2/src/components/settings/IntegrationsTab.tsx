import React, { useState } from 'react';
import {
  Link2,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  MoreVertical,
  Lock,
  ExternalLink,
  ArrowRight,
  RefreshCw,
  Search,
  Check,
  X,
  Sliders,
  Sparkles,
  Plug,
  Repeat,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface ActiveIntegration {
  id: string;
  name: string;
  description: string;
  category: string;
  connectedAt: string;
  lastSync: string;
  logo: React.ReactNode;
}

interface AvailableIntegration {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: React.ReactNode;
}

interface AutomationRule {
  id: string;
  title: string;
  status: 'Ativa' | 'Pausada';
  updatedAt: string;
  serviceIcon: React.ReactNode;
}

interface SyncLog {
  id: string;
  service: string;
  status: string;
  timeAgo: string;
}

export const IntegrationsTab: React.FC = () => {
  const [activeSearch, setActiveSearch] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<ActiveIntegration | null>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Logos vetorizados exatos de alta fidelidade
  const GoogleLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );

  const MicrosoftLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022" rx="1" />
      <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00" rx="1" />
      <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF" rx="1" />
      <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" rx="1" />
    </svg>
  );

  const SlackLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#E01E5A" d="M5.04 14.5a2.5 2.5 0 1 0 2.5 2.5v-2.5zm0-1.5h2.5a2.5 2.5 0 0 0 0-5h-2.5z" />
      <path fill="#36C5F0" d="M9.5 5.04a2.5 2.5 0 1 0-2.5 2.5h2.5zm1.5 0v2.5a2.5 2.5 0 0 0 5 0v-2.5z" />
      <path fill="#2EB67D" d="M18.96 9.5a2.5 2.5 0 1 0-2.5-2.5v2.5zm0 1.5h-2.5a2.5 2.5 0 0 0 0 5h2.5z" />
      <path fill="#ECB22E" d="M14.5 18.96a2.5 2.5 0 1 0 2.5-2.5h-2.5zm-1.5 0v-2.5a2.5 2.5 0 0 0-5 0v2.5z" />
    </svg>
  );

  const WhatsAppLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="#25D366" />
      <path
        fill="#FFFFFF"
        d="M17.5 14.3c-.3-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.3-.74.94-.91 1.13-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.35-.26.29-1 1-1 2.43s1.02 2.82 1.16 3.01c.15.2 2.01 3.07 4.88 4.31.68.29 1.21.47 1.63.6.69.22 1.32.19 1.81.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.2-.56-.35z"
      />
    </svg>
  );

  const StripeLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <rect width="24" height="24" rx="6" fill="#635BFF" />
      <path
        fill="#FFFFFF"
        d="M13.9 10.4c0-.7-.6-1.1-1.6-1.1-1.5 0-3.3.5-4.7 1.3V7.2c1.6-.7 3.3-1 4.9-1 3.9 0 6.3 1.9 6.3 5.1 0 5-6.8 4.2-6.8 6.4 0 .9.8 1.2 1.9 1.2 1.7 0 3.8-.7 5.3-1.6v3.4c-1.7.8-3.7 1.2-5.5 1.2-4.1 0-6.7-2-6.7-5.2 0-5.3 7-4.4 7-6.3z"
      />
    </svg>
  );

  const MailchimpLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="#FFE01B" />
      <path
        fill="#000000"
        d="M12 4C7.58 4 4 7.58 4 12c0 2.22.9 4.22 2.36 5.67l.15.15C7.96 19.1 9.87 20 12 20c4.42 0 8-3.58 8-8s-3.58-8-8-8zm-1.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-2.5 6c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"
      />
    </svg>
  );

  const ZoomLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <rect width="24" height="24" rx="6" fill="#2D8CFF" />
      <path
        fill="#FFFFFF"
        d="M5 8.5C5 7.67 5.67 7 6.5 7h7c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-7C5.67 17 5 16.33 5 15.5v-7zm11.5 2.2l3.4-2.3c.4-.3 1.1 0 1.1.6v6c0 .6-.7.9-1.1.6l-3.4-2.3v-2.6z"
      />
    </svg>
  );

  const HubSpotLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="#FF7A59" />
      <path
        fill="#FFFFFF"
        d="M12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm-4.5 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm9 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
      />
    </svg>
  );

  const TrelloLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <rect width="24" height="24" rx="5" fill="#0079BF" />
      <rect x="5" y="5" width="5.5" height="12" rx="1.5" fill="#FFFFFF" />
      <rect x="13.5" y="5" width="5.5" height="8" rx="1.5" fill="#FFFFFF" />
    </svg>
  );

  const DropboxLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#0061FF"
        d="M6 3.5l6 4-6 4-6-4 6-4zm12 0l6 4-6 4-6-4 6-4zM0 15.5l6-4 6 4-6 4-6-4zm24 0l-6-4-6 4 6 4 6-4zM6 17l6 4 6-4-6-4-6 4z"
      />
    </svg>
  );

  const SalesforceLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#00A1E0"
        d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
      />
    </svg>
  );

  const ZapierLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <rect width="24" height="24" rx="5" fill="#FF4F00" />
      <path
        fill="#FFFFFF"
        d="M12 4v16m-8-8h16m-13.66 5.66l11.32-11.32m0 11.32L5.66 6.34"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );

  const GmailLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22 6.5V18a2 2 0 0 1-2 2h-2V9.5l-6 4.5-6-4.5V20H4a2 2 0 0 1-2-2V6.5l10 7.5 10-7.5z"
      />
      <path fill="#EA4335" d="M20 4H4a2 2 0 0 0-2 2v.5l10 7.5 10-7.5V6a2 2 0 0 0-2-2z" />
    </svg>
  );

  const CalendarLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <rect width="24" height="24" rx="5" fill="#1A73E8" />
      <rect x="5" y="4" width="14" height="3" rx="1.5" fill="#FFFFFF" />
      <text
        x="12"
        y="18"
        fill="#FFFFFF"
        fontSize="10"
        fontWeight="bold"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        31
      </text>
    </svg>
  );

  // 2. Estado das 7 Integrações Ativas exatamente como no mockup
  const [activeIntegrations, setActiveIntegrations] = useState<ActiveIntegration[]>([
    {
      id: 'google-workspace',
      name: 'Google Workspace',
      description: 'E-mails, Drive, Agenda e Contatos',
      category: 'Produtividade',
      connectedAt: '12 de Janeiro de 2026',
      lastSync: 'Agora há pouco',
      logo: <GoogleLogo />,
    },
    {
      id: 'microsoft-365',
      name: 'Microsoft 365',
      description: 'Outlook, OneDrive, Teams e mais',
      category: 'Produtividade',
      connectedAt: '15 de Fevereiro de 2026',
      lastSync: '5 min atrás',
      logo: <MicrosoftLogo />,
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Comunicação e notificações',
      category: 'Comunicação',
      connectedAt: '03 de Março de 2026',
      lastSync: '12 min atrás',
      logo: <SlackLogo />,
    },
    {
      id: 'whatsapp-business',
      name: 'WhatsApp Business',
      description: 'Mensagens e atendimento',
      category: 'Comunicação',
      connectedAt: '20 de Março de 2026',
      lastSync: '30 min atrás',
      logo: <WhatsAppLogo />,
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Pagamentos e faturamento',
      category: 'Financeiro',
      connectedAt: '05 de Janeiro de 2026',
      lastSync: '1 hora atrás',
      logo: <StripeLogo />,
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Marketing e automações',
      category: 'Marketing',
      connectedAt: '18 de Fevereiro de 2026',
      lastSync: 'Hoje, 04:00',
      logo: <MailchimpLogo />,
    },
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Reuniões e webinars',
      category: 'Comunicação',
      connectedAt: '22 de Março de 2026',
      lastSync: 'Ontem',
      logo: <ZoomLogo />,
    },
  ]);

  // 3. Estado das 5 Integrações Disponíveis como no mockup
  const [availableIntegrations, setAvailableIntegrations] = useState<AvailableIntegration[]>([
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'CRM, marketing e automação de vendas',
      category: 'Marketing',
      logo: <HubSpotLogo />,
    },
    {
      id: 'trello',
      name: 'Trello',
      description: 'Gestão de projetos e tarefas',
      category: 'Produtividade',
      logo: <TrelloLogo />,
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      description: 'Armazenamento e compartilhamento de arquivos',
      category: 'Produtividade',
      logo: <DropboxLogo />,
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'CRM e gestão de relacionamento',
      category: 'CRM',
      logo: <SalesforceLogo />,
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Automatize fluxos entre apps',
      category: 'Automação',
      logo: <ZapierLogo />,
    },
  ]);

  // 4. Automatizações Recentes
  const [automations, setAutomations] = useState<AutomationRule[]>([
    {
      id: 'auto-1',
      title: 'Salvar anexos do Gmail no Google Drive',
      status: 'Ativa',
      updatedAt: 'Atualizado há 2h',
      serviceIcon: <GmailLogo />,
    },
    {
      id: 'auto-2',
      title: 'Enviar notificações do VILA para o Slack',
      status: 'Ativa',
      updatedAt: 'Atualizado há 1d',
      serviceIcon: <SlackLogo />,
    },
    {
      id: 'auto-3',
      title: 'Criar evento no Google Agenda',
      status: 'Ativa',
      updatedAt: 'Atualizado há 3d',
      serviceIcon: <CalendarLogo />,
    },
  ]);

  // 5. Logs de Sincronização
  const syncLogs: SyncLog[] = [
    {
      id: 'sync-1',
      service: 'Google Workspace',
      status: 'Sincronizado com sucesso',
      timeAgo: 'Agora há pouco',
    },
    {
      id: 'sync-2',
      service: 'Microsoft 365',
      status: 'Sincronizado com sucesso',
      timeAgo: '5 min atrás',
    },
    {
      id: 'sync-3',
      service: 'Slack',
      status: 'Sincronizado com sucesso',
      timeAgo: '12 min atrás',
    },
    {
      id: 'sync-4',
      service: 'Stripe Webhooks',
      status: 'Sincronizado com sucesso',
      timeAgo: '1 hora atrás',
    },
  ];

  // Ação para conectar nova ferramenta
  const handleConnectAvailable = (tool: AvailableIntegration) => {
    // Transfere para ativas
    setAvailableIntegrations((prev) => prev.filter((i) => i.id !== tool.id));
    setActiveIntegrations((prev) => [
      ...prev,
      {
        id: tool.id,
        name: tool.name,
        description: tool.description,
        category: tool.category,
        connectedAt: 'Hoje',
        lastSync: 'Agora há pouco',
        logo: tool.logo,
      },
    ]);
    showToast(`${tool.name} foi conectado com sucesso à sua conta VILA!`);
  };

  // Ação para desconectar
  const handleDisconnect = (toolId: string) => {
    const item = activeIntegrations.find((i) => i.id === toolId);
    if (!item) return;

    setActiveIntegrations((prev) => prev.filter((i) => i.id !== toolId));
    setAvailableIntegrations((prev) => [
      ...prev,
      {
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        logo: item.logo,
      },
    ]);
    setSelectedIntegration(null);
    setIsManageModalOpen(false);
    showToast(`${item.name} foi desconectado.`);
  };

  return (
    <div className="w-full space-y-6 pb-6 font-sans">
      {/* Toast de Notificação */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200 font-sans">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 dark:text-slate-500 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. SEÇÃO: VISÃO GERAL (4 CARDS DE MÉTRICAS EXATOS) */}
      <section className="space-y-3 font-sans">
        <h2 className="text-xs font-bold text-slate-900 dark:text-slate-50 uppercase tracking-wider font-sans">
          Visão geral
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
          {/* Card 1: 7 Integrações ativas */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4.5 shadow-2xs flex items-center gap-3.5 transition-all hover:border-slate-300 dark:hover:border-slate-600 font-sans">
            <div className="w-11 h-11 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-sans leading-none mb-1">
                {activeIntegrations.length}
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Integrações ativas</h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">Conectadas e funcionando</p>
            </div>
          </div>

          {/* Card 2: 3 Disponíveis para conectar */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4.5 shadow-2xs flex items-center gap-3.5 transition-all hover:border-slate-300 dark:hover:border-slate-600 font-sans">
            <div className="w-11 h-11 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
              <Plug className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-sans leading-none mb-1">
                {availableIntegrations.length}
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Disponíveis para conectar</h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">Encontre novas integrações</p>
            </div>
          </div>

          {/* Card 3: 12 Automatizações */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4.5 shadow-2xs flex items-center gap-3.5 transition-all hover:border-slate-300 dark:hover:border-slate-600 font-sans">
            <div className="w-11 h-11 rounded-full bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center shrink-0">
              <Repeat className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-sans leading-none mb-1">
                12
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Automatizações</h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">Regras e fluxos ativos</p>
            </div>
          </div>

          {/* Card 4: 100% Segurança garantida */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4.5 shadow-2xs flex items-center gap-3.5 transition-all hover:border-slate-300 dark:hover:border-slate-600 font-sans">
            <div className="w-11 h-11 rounded-full bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-sans leading-none mb-1">
                100%
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Segurança garantida</h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">Dados protegidos</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GRID PRINCIPAL DE 2 COLUNAS IDÊNTICO AO MOCKUP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start font-sans">
        {/* ========================================================
            COLUNA ESQUERDA: Integrações ativas + Logs de sincronização
           ======================================================== */}
        <div className="space-y-6 font-sans">
          {/* CARD A: Integrações ativas (7 itens) */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs space-y-4 font-sans">
            <div className="flex items-center justify-between gap-2 pb-1">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Integrações ativas
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-sans">
                  Serviços conectados à sua conta VILA.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsManageModalOpen(true)}
                className="text-xs font-medium text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer shrink-0 font-sans"
              >
                <span>Gerenciar todas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Lista dos 7 itens conectados */}
            <div className="divide-y divide-slate-100 dark:divide-slate-700 font-sans">
              {activeIntegrations.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedIntegration(item);
                    setIsManageModalOpen(true);
                  }}
                  className="py-3 sm:py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800 rounded-xl px-2.5 -mx-2.5 transition-colors cursor-pointer group font-sans"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                      {item.logo}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 truncate font-sans">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-sans">
                    <span className="text-[10.5px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40 font-sans">
                      Conectado
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            {/* Rodapé: Link Ver todas as integrações ativas */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 font-sans">
              <button
                type="button"
                onClick={() => setIsManageModalOpen(true)}
                className="text-xs font-bold text-[#1455AC] hover:text-[#0F3B77] flex items-center gap-1.5 cursor-pointer font-sans"
              >
                <span>Ver todas as integrações ativas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CARD B: Logs de sincronização (Abaixo de Integrações ativas) */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs space-y-4 font-sans">
            <div className="flex items-center justify-between gap-2 pb-1">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Logs de sincronização
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-sans">
                  Acompanhe o status das sincronizações.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsHistoryModalOpen(true)}
                className="text-xs font-medium text-[#1455AC] hover:underline cursor-pointer shrink-0 font-sans"
              >
                Ver histórico
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700 font-sans">
              {syncLogs.slice(0, 2).map((log) => (
                <div
                  key={log.id}
                  onClick={() => setIsHistoryModalOpen(true)}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800 rounded-xl px-2 -mx-2 transition-colors cursor-pointer group font-sans"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                        {log.service}
                      </h4>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">
                        {log.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium group-hover:text-[#1455AC] transition-colors font-sans">
                    <span>{log.timeAgo}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-[#1455AC]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            COLUNA DIREITA: Integrações disponíveis + Automatizações recentes + Banner de Segurança
           ======================================================== */}
        <div className="space-y-6 font-sans">
          {/* CARD C: Integrações disponíveis (5 itens) */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs space-y-4 font-sans">
            <div className="flex items-center justify-between gap-2 pb-1">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Integrações disponíveis
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-sans">
                  Descubra novas ferramentas para conectar.
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast('Exibindo catálogo completo de integrações disponíveis.')}
                className="text-xs font-medium text-[#1455AC] hover:underline cursor-pointer shrink-0 font-sans"
              >
                Ver todas
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700 font-sans">
              {availableIntegrations.map((tool) => (
                <div
                  key={tool.id}
                  className="py-3 sm:py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800 rounded-xl px-2.5 -mx-2.5 transition-colors font-sans"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-2xs">
                      {tool.logo}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 truncate font-sans">
                        {tool.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-sans">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleConnectAvailable(tool)}
                    className="shrink-0 px-3.5 py-1 rounded-lg border border-[#1455AC] text-[#1455AC] hover:bg-blue-50 dark:hover:bg-blue-500/10 text-xs font-semibold transition-colors cursor-pointer font-sans"
                  >
                    Conectar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CARD D: Automatizações recentes (3 itens) */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs space-y-4 font-sans">
            <div className="flex items-center justify-between gap-2 pb-1">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Automatizações recentes
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-sans">
                  Fluxos e regras que você criou.
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast('Painel de fluxos e regras ativas.')}
                className="text-xs font-medium text-[#1455AC] hover:underline cursor-pointer shrink-0 font-sans"
              >
                Ver todas
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700 font-sans">
              {automations.map((rule) => (
                <div
                  key={rule.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800 rounded-xl px-2 -mx-2 transition-colors font-sans"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-2xs">
                      {rule.serviceIcon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 truncate font-sans">
                          {rule.title}
                        </h4>
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40 shrink-0 font-sans">
                          {rule.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-sans">
                        {rule.updatedAt}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast(`Opções de automação para: ${rule.title}`)}
                    className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                    title="Mais opções"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CARD E: Banner de Segurança Inferior */}
          <div className="bg-blue-50/60 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-800/40 p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs font-sans">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-500/15 text-[#1455AC] flex items-center justify-center shrink-0">
                <Lock className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                  A segurança dos seus dados é nossa prioridade.
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                  Usamos criptografia de ponta a ponta e seguimos os mais altos padrões de segurança.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSecurityModalOpen(true)}
              className="px-3.5 py-1.5 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800/40 text-xs font-semibold text-[#1455AC] hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs font-sans"
            >
              <span>Saiba mais</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          MODAL INTERATIVO: GERENCIAR INTEGRAÇÃO ESPECÍFICA / TODAS
         ======================================================== */}
      {isManageModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 font-sans">
              <div className="flex items-center gap-3">
                {selectedIntegration ? (
                  <>
                    <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                      {selectedIntegration.logo}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                        {selectedIntegration.name}
                      </h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-sans">
                        {selectedIntegration.category} • Conectado
                      </p>
                    </div>
                  </>
                ) : (
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                      Gerenciar Todas as Integrações Ativas
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-sans">
                      {activeIntegrations.length} serviços integrados à VILA
                    </p>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsManageModalOpen(false);
                  setSelectedIntegration(null);
                }}
                className="p-1.5 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedIntegration ? (
              <div className="space-y-4 font-sans">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 space-y-2 text-xs font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Status de Sincronização:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ativo e Operacional
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Última Sincronização:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-100">{selectedIntegration.lastSync}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Data de Vinculação:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-100">{selectedIntegration.connectedAt}</span>
                  </div>
                </div>

                <div className="space-y-2 font-sans">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Permissões concedidas:</h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pl-4 list-disc font-sans">
                    <li>Leitura e escrita de eventos autorizados pela organização</li>
                    <li>Sincronização de webhooks de status de mensagens e alertas</li>
                    <li>Acesso a relatórios de auditoria e logs seguros</li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 font-sans">
                  <button
                    type="button"
                    onClick={() => handleDisconnect(selectedIntegration.id)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 border border-red-200 dark:border-red-800/40 transition-colors cursor-pointer font-sans"
                  >
                    Desconectar integração
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      showToast(`Sincronização manual com ${selectedIntegration.name} iniciada.`);
                      setIsManageModalOpen(false);
                      setSelectedIntegration(null);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1455AC] hover:bg-[#0F3B77] transition-colors cursor-pointer flex items-center gap-1.5 font-sans"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Sincronizar agora
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1 font-sans">
                {activeIntegrations.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/60 flex items-center justify-between gap-3 font-sans"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                        {item.logo}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">{item.name}</h4>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">{item.description}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDisconnect(item.id)}
                      className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline cursor-pointer shrink-0 font-sans"
                    >
                      Desconectar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL INTERATIVO: HISTÓRICO COMPLETO DE LOGS
         ======================================================== */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150 font-sans">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 font-sans">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Histórico de Sincronizações
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-sans">
                  Registos recentes de sincronização de dados
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsHistoryModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700 font-sans">
              {syncLogs.map((log) => (
                <div key={log.id} className="py-3 flex items-center justify-between gap-3 text-xs font-sans">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-50 font-sans">{log.service}</p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-sans">{log.status}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium font-sans">{log.timeAgo}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end font-sans">
              <button
                type="button"
                onClick={() => setIsHistoryModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer font-sans"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL INTERATIVO: SEGURANÇA E PRIVACIDADE DE DADOS
         ======================================================== */}
      {isSecurityModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150 font-sans">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 font-sans">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-500/15 text-[#1455AC] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                    Padrões de Segurança VILA
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-sans">Proteção de ponta a ponta</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSecurityModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 font-sans">
              <p>
                A plataforma VILA opera sob os mais rigorosos protocolos de proteção de dados (RGPD e SOC 2 Type II). Todas as credenciais de terceiros são armazenadas com cifras AES-256 e transmitidas exclusivamente através de túneis TLS 1.3.
              </p>
              <div className="p-3 bg-blue-50/60 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-800/40 space-y-1 font-sans">
                <h5 className="font-bold text-slate-900 dark:text-slate-50 font-sans">Chaves criptográficas isoladas</h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                  Os tokens de acesso OAuth concedidos às ferramentas conectadas nunca expõem senhas mestras e podem ser revogados a qualquer instante.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end font-sans">
              <button
                type="button"
                onClick={() => setIsSecurityModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1455AC] hover:bg-[#0F3B77] cursor-pointer font-sans"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
