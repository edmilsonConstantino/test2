import React, { useState } from 'react';
import {
  Mail,
  Bell,
  MessageSquare,
  Smartphone,
  Check,
  Clock,
  ChevronDown,
  ChevronRight,
  Megaphone,
  Calendar,
  Users,
  Flag,
  FileText,
  Heart,
  PieChart,
  CheckCircle2,
  X,
  Volume2,
  SlidersHorizontal,
} from 'lucide-react';

interface NotificationTypeRow {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  email: boolean;
  push: boolean;
  sms: boolean;
  app: boolean;
}

export const NotificationsTab: React.FC = () => {
  // 1. Estados dos Canais de Notificação (Left Card 1)
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [mobileEnabled, setMobileEnabled] = useState(true);

  // 2. Horário de Silêncio (Left Card 2)
  const [quietHoursActive, setQuietHoursActive] = useState(true);
  const [quietStart, setQuietStart] = useState('22:00');
  const [quietEnd, setQuietEnd] = useState('07:00');
  const [timezone, setTimezone] = useState('(UTC+00:00) Lisboa');
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);

  // 3. Tipos de Notificações (Right Card - 7 itens com matriz exata da imagem)
  const [notificationTypes, setNotificationTypes] = useState<NotificationTypeRow[]>([
    {
      id: 'avisos-importantes',
      name: 'Avisos importantes',
      description: 'Notificações críticas sobre a plataforma.',
      icon: (
        <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
          <Megaphone className="w-4 h-4" />
        </div>
      ),
      email: true,
      push: true,
      sms: true,
      app: true,
    },
    {
      id: 'eventos-atividades',
      name: 'Eventos e atividades',
      description: 'Lembretes de eventos e atividades.',
      icon: (
        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
          <Calendar className="w-4 h-4" />
        </div>
      ),
      email: true,
      push: true,
      sms: false,
      app: true,
    },
    {
      id: 'comunidade-colaboracao',
      name: 'Comunidade e colaboração',
      description: 'Comentários, menções e interações.',
      icon: (
        <div className="w-8 h-8 rounded-full bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center shrink-0">
          <Users className="w-4 h-4" />
        </div>
      ),
      email: true,
      push: true,
      sms: false,
      app: true,
    },
    {
      id: 'projetos-iniciativas',
      name: 'Projetos e iniciativas',
      description: 'Atualizações sobre projetos e iniciativas.',
      icon: (
        <div className="w-8 h-8 rounded-full bg-[#FFF7ED] text-[#F97316] flex items-center justify-center shrink-0">
          <Flag className="w-4 h-4" />
        </div>
      ),
      email: true,
      push: true,
      sms: false,
      app: true,
    },
    {
      id: 'servicos-atualizacoes',
      name: 'Serviços e atualizações',
      description: 'Novos serviços, melhorias e manutenções.',
      icon: (
        <div className="w-8 h-8 rounded-full bg-[#ECFEFF] text-[#06B6D4] flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4" />
        </div>
      ),
      email: true,
      push: true,
      sms: false,
      app: true,
    },
    {
      id: 'promocoes-oportunidades',
      name: 'Promoções e oportunidades',
      description: 'Ofertas, parcerias e oportunidades especiais.',
      icon: (
        <div className="w-8 h-8 rounded-full bg-[#FFF1F2] text-[#F43F5E] flex items-center justify-center shrink-0">
          <Heart className="w-4 h-4" />
        </div>
      ),
      email: false,
      push: true,
      sms: false,
      app: false,
    },
    {
      id: 'relatorios-resumos',
      name: 'Relatórios e resumos',
      description: 'Resumos semanais e relatórios personalizados.',
      icon: (
        <div className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] dark:text-slate-400 flex items-center justify-center shrink-0">
          <PieChart className="w-4 h-4" />
        </div>
      ),
      email: true,
      push: false,
      sms: false,
      app: false,
    },
  ]);

  // Toast e Modais de feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleNotificationChannel = (
    rowId: string,
    channel: 'email' | 'push' | 'sms' | 'app'
  ) => {
    setNotificationTypes((prev) =>
      prev.map((item) =>
        item.id === rowId ? { ...item, [channel]: !item[channel] } : item
      )
    );
  };

  const handleSave = () => {
    showToast('Preferências de notificações salvas com sucesso!');
  };

  // Ícone colorido VILA SVG idêntico ao oficial
  const VilaMiniLogo = () => (
    <svg className="w-7 h-7 shrink-0" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="45" stroke="#EA4335" strokeWidth="10" strokeDasharray="70 200" />
      <circle cx="50" cy="50" r="45" stroke="#1455AC" strokeWidth="10" strokeDasharray="70 200" strokeDashoffset="-70" />
      <circle cx="50" cy="50" r="45" stroke="#34A853" strokeWidth="10" strokeDasharray="70 200" strokeDashoffset="-140" />
      <circle cx="50" cy="50" r="45" stroke="#FBBC05" strokeWidth="10" strokeDasharray="70 200" strokeDashoffset="-210" />
      <circle cx="50" cy="50" r="18" fill="#1455AC" />
    </svg>
  );

  return (
    <div className="w-full space-y-6 pb-6 font-sans">
      {/* Toast Notificação */}
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

      {/* GRID SUPERIOR DE 2 COLUNAS (LADO ESQUERDO: CANAIS + SILÊNCIO | LADO DIREITO: TIPOS DE NOTIFICAÇÕES) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
        {/* ========================================================
            COLUNA ESQUERDA: Canais de notificação + Horário de silêncio
           ======================================================== */}
        <div className="lg:col-span-5 space-y-6 font-sans">
          {/* CARD 1: Canais de notificação */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs space-y-4 font-sans">
            <div className="pb-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Canais de notificação
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Escolha os canais onde deseja receber notificações.
              </p>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700 font-sans">
              {/* Canal: E-mail */}
              <div className="py-3.5 flex items-center justify-between gap-3.5 font-sans">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">E-mail</h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-sans">
                      Receba notificações importantes no seu e-mail.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={emailEnabled}
                    onChange={(e) => setEmailEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1455AC]" />
                </label>
              </div>

              {/* Canal: Push / Web */}
              <div className="py-3.5 flex items-center justify-between gap-3.5 font-sans">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Push / Web</h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-sans">
                      Notificações no navegador quando estiver online.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={pushEnabled}
                    onChange={(e) => setPushEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1455AC]" />
                </label>
              </div>

              {/* Canal: SMS */}
              <div className="py-3.5 flex items-center justify-between gap-3.5 font-sans">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">SMS</h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-sans">
                      Receba alertas e mensagens importantes no telemóvel.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={smsEnabled}
                    onChange={(e) => setSmsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1455AC]" />
                </label>
              </div>

              {/* Canal: App Mobile */}
              <div className="py-3.5 flex items-center justify-between gap-3.5 font-sans">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">App Mobile</h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-sans">
                      Notificações dentro da aplicação móvel da VILA.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={mobileEnabled}
                    onChange={(e) => setMobileEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1455AC]" />
                </label>
              </div>
            </div>
          </div>

          {/* CARD 2: Horário de silêncio */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs space-y-4 font-sans">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Horário de silêncio
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Defina um período para não receber notificações push.
              </p>
            </div>

            {/* Linha de Ativação do Silêncio */}
            <div className="pt-2 flex items-center justify-between gap-3 font-sans">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="text-slate-400 dark:text-slate-500">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                    Ativar horário de silêncio
                  </h4>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    As notificações push serão pausadas neste período.
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={quietHoursActive}
                  onChange={(e) => setQuietHoursActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1455AC]" />
              </label>
            </div>

            {/* Configuração de Horários: De, Até, Fuso horário */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 font-sans">
              {/* De */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1 font-sans">
                  De
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={quietStart}
                    onChange={(e) => setQuietStart(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#1455AC] outline-none pr-8 font-sans"
                  />
                  <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute right-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Até */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1 font-sans">
                  Até
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={quietEnd}
                    onChange={(e) => setQuietEnd(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#1455AC] outline-none pr-8 font-sans"
                  />
                  <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute right-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Fuso horário */}
              <div className="relative">
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1 font-sans">
                  Fuso horário
                </label>
                <button
                  type="button"
                  onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
                  className="w-full bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#1455AC] outline-none flex items-center justify-between cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 font-sans"
                >
                  <span className="truncate text-[11px] font-sans">{timezone}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                </button>

                {isTimezoneOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg p-1 z-20 text-xs animate-in fade-in zoom-in-95 duration-100 font-sans">
                    {[
                      '(UTC+00:00) Lisboa',
                      '(UTC+00:00) Londres',
                      '(UTC-03:00) São Paulo',
                      '(UTC+01:00) Madrid',
                      '(UTC+01:00) Paris',
                    ].map((tz) => (
                      <button
                        key={tz}
                        type="button"
                        onClick={() => {
                          setTimezone(tz);
                          setIsTimezoneOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-sans ${
                          timezone === tz ? 'text-[#1455AC] font-bold bg-blue-50/60 dark:bg-blue-500/10' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {tz}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            COLUNA DIREITA: Tipos de notificações (Matriz com Checkboxes)
           ======================================================== */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs space-y-4 font-sans">
          <div className="pb-1">
            <div className="flex items-center gap-2">
              <span className="text-base">📯</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Tipos de notificações
              </h3>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Ative ou desative os tipos de notificações que deseja receber.
            </p>
          </div>

          {/* Cabeçalho da Matriz: E-mail, Push, SMS, App */}
          <div className="overflow-x-auto -mx-2 sm:mx-0 font-sans">
            <div className="min-w-[500px]">
              <div className="grid grid-cols-12 gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 font-sans">
                <div className="col-span-6 pl-1"></div>
                <div className="col-span-6 grid grid-cols-4 text-center">
                  <span>E-mail</span>
                  <span>Push</span>
                  <span>SMS</span>
                  <span>App</span>
                </div>
              </div>

              {/* Lista dos 7 Tipos com Checkboxes */}
              <div className="divide-y divide-slate-100 dark:divide-slate-700 font-sans">
                {notificationTypes.map((row) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-12 gap-2 py-3.5 items-center hover:bg-slate-50/60 dark:hover:bg-slate-800 rounded-xl px-1 transition-colors font-sans"
                  >
                    {/* Informações da Notificação */}
                    <div className="col-span-6 flex items-center gap-3 min-w-0 pr-2">
                      {row.icon}
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 truncate font-sans">
                          {row.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-sans">
                          {row.description}
                        </p>
                      </div>
                    </div>

                    {/* Checkboxes das 4 Colunas */}
                    <div className="col-span-6 grid grid-cols-4 items-center justify-items-center">
                      {/* E-mail */}
                      <button
                        type="button"
                        onClick={() => toggleNotificationChannel(row.id, 'email')}
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                          row.email
                            ? 'bg-[#1455AC] text-white shadow-2xs'
                            : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500'
                        }`}
                        title="Alternar E-mail"
                      >
                        {row.email && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </button>

                      {/* Push */}
                      <button
                        type="button"
                        onClick={() => toggleNotificationChannel(row.id, 'push')}
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                          row.push
                            ? 'bg-[#1455AC] text-white shadow-2xs'
                            : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500'
                        }`}
                        title="Alternar Push"
                      >
                        {row.push && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </button>

                      {/* SMS */}
                      <button
                        type="button"
                        onClick={() => toggleNotificationChannel(row.id, 'sms')}
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                          row.sms
                            ? 'bg-[#1455AC] text-white shadow-2xs'
                            : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500'
                        }`}
                        title="Alternar SMS"
                      >
                        {row.sms && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </button>

                      {/* App */}
                      <button
                        type="button"
                        onClick={() => toggleNotificationChannel(row.id, 'app')}
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                          row.app
                            ? 'bg-[#1455AC] text-white shadow-2xs'
                            : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500'
                        }`}
                        title="Alternar App"
                      >
                        {row.app && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRID INFERIOR: RESUMO DAS SUAS PREFERÊNCIAS & PRÉ-VISUALIZAÇÃO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
        {/* ========================================================
            CARD 4: Resumo das suas preferências
           ======================================================== */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs space-y-4 font-sans">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
              Resumo das suas preferências
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Veja como suas notificações estão configuradas.
            </p>
          </div>

          {/* 4 Mini Blocos de Status */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 font-sans">
            {/* E-mail */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 leading-tight font-sans">E-mail</h4>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold leading-tight mt-0.5">
                  {emailEnabled ? 'Ativado' : 'Desativado'}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight font-sans">principal</p>
              </div>
            </div>

            {/* Push / Web */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                <Bell className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 leading-tight font-sans">Push / Web</h4>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold leading-tight mt-0.5">
                  {pushEnabled ? 'Ativado' : 'Desativado'}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight font-sans">
                  {quietHoursActive ? `silêncio: ${quietStart} - ${quietEnd}` : 'sem silêncio'}
                </p>
              </div>
            </div>

            {/* SMS */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                <MessageSquare className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 leading-tight font-sans">SMS</h4>
                <p className={`text-[11px] font-medium leading-tight mt-0.5 ${smsEnabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                  {smsEnabled ? 'Ativado' : 'Desativado'}
                </p>
              </div>
            </div>

            {/* App Mobile */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                <Smartphone className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 leading-tight font-sans">App Mobile</h4>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold leading-tight mt-0.5">
                  {mobileEnabled ? 'Ativado' : 'Desativado'}
                </p>
              </div>
            </div>
          </div>

          {/* Rodapé: Link "Gerir todos os canais →" */}
          <div className="pt-2 flex justify-end font-sans">
            <button
              type="button"
              onClick={() => showToast('Todos os canais estão sincronizados.')}
              className="text-xs font-semibold text-[#1455AC] hover:text-[#0F3B77] flex items-center gap-1 cursor-pointer font-sans"
            >
              <span>Gerir todos os canais</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ========================================================
            CARD 5: Pré-visualização
           ======================================================== */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs space-y-4 font-sans">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
              Pré-visualização
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Exemplo de como as notificações serão exibidas.
            </p>
          </div>

          {/* Card de Notificação VILA Simulada */}
          <div
            onClick={() => showToast('Notificação clicada: Conferência de Sustentabilidade')}
            className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 transition-colors cursor-pointer group font-sans"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-2xs border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                <VilaMiniLogo />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">VILA</h4>
                </div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-slate-50 mt-0.5 font-sans">
                  Evento em breve
                </h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5 line-clamp-1 font-sans">
                  Conferência de Sustentabilidade começa amanhã às 10:00. Não perca!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium font-sans">há 2 min</span>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTÃO FIXO / ALINHADO À DIREITA: Guardar alterações */}
      <div className="flex justify-end pt-2 font-sans">
        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-[#1455AC] hover:bg-[#0F3B77] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm flex items-center gap-2 transition-all cursor-pointer font-sans"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Guardar alterações</span>
        </button>
      </div>
    </div>
  );
};
