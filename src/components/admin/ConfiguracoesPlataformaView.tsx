import React, { useState, useEffect } from 'react';
import {
  Settings,
  SlidersHorizontal,
  Building2,
  Globe2,
  Compass,
  MapPin,
  Users,
  FileCheck,
  ShieldCheck,
  UserCheck,
  Sparkles,
  Cpu,
  Bot,
  Database,
  Shield,
  KeyRound,
  Smartphone,
  Lock,
  FileText,
  Boxes,
  Share2,
  Cloud,
  Download,
  Upload,
  Layers,
  Code2,
  CheckCircle2,
  Handshake,
  Award,
  Zap,
  Bell,
  Mail,
  AlertTriangle,
  Calendar,
  Clock,
  EyeOff,
  Palette,
  Sun,
  Paintbrush,
  LayoutTemplate,
  LayoutGrid,
  BarChart3,
  UserPlus,
  Search,
  Activity,
  RotateCcw,
  RefreshCw,
  Archive,
  HardDrive,
  Key,
  FileCode,
  ExternalLink,
  Webhook,
  Terminal,
  CircleDollarSign,
  Globe,
  Check,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  X,
} from 'lucide-react';
import { DemoUser } from '../../data/demoUsers';
import { BreadcrumbItem } from '../Topbar';

interface ConfiguracoesPlataformaViewProps {
  currentUser: DemoUser;
  onNavigateToTab: (tabId: string) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
  onOpenSupportModal?: (actionContext?: string) => void;
}

export const ConfiguracoesPlataformaView: React.FC<ConfiguracoesPlataformaViewProps> = ({
  currentUser,
  onNavigateToTab,
  onBreadcrumbChange,
  onOpenSupportModal,
}) => {
  // Breadcrumb synchronization
  useEffect(() => {
    onBreadcrumbChange?.([
      { label: 'Plataforma VILA', onClick: () => onNavigateToTab('painel-gestao') },
      { label: 'Configurações' },
    ]);
  }, [onBreadcrumbChange, onNavigateToTab]);

  // States
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activityTimeframe, setActivityTimeframe] = useState('Últimos 7 dias');
  const [selectedSettingModal, setSelectedSettingModal] = useState<{
    title: string;
    description: string;
    details: Array<{ label: string; value: string }>;
  } | null>(null);
  const [isQuickConfigModalOpen, setIsQuickConfigModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const handleOpenSettingDetail = (title: string, desc: string, details: Array<{ label: string; value: string }>) => {
    setSelectedSettingModal({
      title,
      description: desc,
      details,
    });
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5 animate-in fade-in duration-200">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal de Detalhe de Configuração */}
      {selectedSettingModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-100 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedSettingModal(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">{selectedSettingModal.title}</h3>
                <p className="text-xs text-slate-500">{selectedSettingModal.description}</p>
              </div>
            </div>

            <div className="divide-y divide-slate-200/70 my-4 border-y border-slate-100">
              {selectedSettingModal.details.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{item.label}</span>
                  <span className="text-slate-800 font-semibold">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedSettingModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  setSelectedSettingModal(null);
                  showToast('Configuração atualizada com sucesso!');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1455AC] hover:bg-blue-800 rounded-xl transition-colors shadow-2xs"
              >
                Guardar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Configurações Rápidas */}
      {isQuickConfigModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-100 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsQuickConfigModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Configurações Rápidas</h3>
                <p className="text-xs text-slate-500">Ações frequentes de governança e administração da plataforma</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              {[
                { title: 'Convidar Administrador', desc: 'Atribuir papel de gestão territorial', tab: 'gestao-utilizadores' },
                { title: 'Gerar Chave de API', desc: 'Criar token REST para integrações', tab: 'configuracoes-plataforma' },
                { title: 'Configurar Regras de IA', desc: 'Ajustar limites de moderação', tab: 'configuracoes-plataforma' },
                { title: 'Exportar Backup Completo', desc: 'Descarregar dados territoriais', tab: 'configuracoes-plataforma' },
              ].map((act, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setIsQuickConfigModalOpen(false);
                    showToast(`Ação iniciada: ${act.title}`);
                  }}
                  className="p-3 border border-slate-200/80 rounded-xl hover:border-blue-300 hover:bg-blue-50/40 cursor-pointer transition-all"
                >
                  <h4 className="text-xs font-bold text-slate-800">{act.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{act.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsQuickConfigModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1455AC] hover:bg-blue-800 rounded-xl transition-colors"
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Header do Módulo com Identidade VILA */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#E2ECF9]/80 border border-blue-200/60 flex items-center justify-center text-[#1455AC] shrink-0 shadow-2xs">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] font-sans tracking-tight">
              Configurações
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-3xl mt-0.5 leading-relaxed">
              Centro de governança da Plataforma VILA. Defina regras, gerencie acessos, integre serviços e configure toda a infraestrutura da nossa rede global de territórios e comunidades.
            </p>
          </div>
        </div>

        {/* Banner de Configurações Rápidas e Telemetria */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto justify-end">
          {/* Banner Atalho */}
          <div
            onClick={() => setIsQuickConfigModalOpen(true)}
            className="group flex items-center gap-3 px-4 py-2.5 bg-white hover:bg-slate-50 border border-blue-200/80 rounded-2xl shadow-2xs cursor-pointer transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-blue-900 leading-tight flex items-center gap-1">
                Explorar Configurações Rápidas
              </div>
              <div className="text-[11px] text-slate-500">
                Aceda rapidamente às configurações mais utilizadas.
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-blue-600 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Telemetria */}
          <div className="flex flex-col gap-1 text-[11px] text-slate-500 pl-1">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Dados atualizados: 10:32
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Atualização em tempo real
            </span>
          </div>
        </div>
      </div>

      {/* 2. LINHA 1 (4 Cards): Organização, Governança Territorial, Governança da Rede, VILA AI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Informações da Organização */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Informações da Organização</h3>
            </div>

            {/* Profile Avatar & Info */}
            <div className="flex items-center gap-3 my-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-base shadow-2xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#0F172A]">VILA Global</span>
                  <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-600 text-white" />
                </div>
                <p className="text-[11px] text-slate-400">Organização Administradora</p>
              </div>
            </div>

            {/* Key Values */}
            <div className="space-y-2 mt-3 text-xs border-t border-slate-200/70 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Plano Atual</span>
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                  Enterprise
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Membros da Equipa</span>
                <span className="font-semibold text-slate-800">48</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Data de Adesão</span>
                <span className="font-semibold text-slate-800">01 Jan 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">ID da Organização</span>
                <span className="font-semibold text-slate-800 text-[11px]">VILA-ORG-001</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => showToast('A abrir perfil da organização VILA Global')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Gerir perfil da organização</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 2: Governança Territorial */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Globe2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Governança Territorial</h3>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                { label: 'Países', value: '156', icon: <Globe className="w-3.5 h-3.5 text-emerald-600" /> },
                { label: 'Regiões', value: '324', icon: <MapPin className="w-3.5 h-3.5 text-emerald-600" /> },
                { label: 'Municípios', value: '3.642', icon: <Building2 className="w-3.5 h-3.5 text-emerald-600" /> },
                { label: 'Comunidades', value: '18.732', icon: <Users className="w-3.5 h-3.5 text-emerald-600" /> },
                { label: 'Regras Territoriais', value: '', icon: <FileCheck className="w-3.5 h-3.5 text-emerald-600" /> },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() => onNavigateToTab('territorios-paises')}
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer group transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    {row.value && <span>{row.value}</span>}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => onNavigateToTab('territorios-paises')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Gerir estrutura territorial</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 3: Governança da Rede */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Governança da Rede</h3>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                { label: 'Papéis Globais', value: '12', icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Administradores de País', value: '156', icon: <UserCheck className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Administradores Regionais', value: '324', icon: <UserCheck className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Administradores Municipais', value: '3.642', icon: <UserCheck className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Moderadores Comunitários', value: '18.732', icon: <UserCheck className="w-3.5 h-3.5 text-blue-600" /> },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() => onNavigateToTab('gestao-utilizadores')}
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer group transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <span>{row.value}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => onNavigateToTab('gestao-utilizadores')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Gerir governança da rede</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 4: VILA AI */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">VILA AI</h3>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                {
                  label: 'Modelos IA',
                  badge: '5 ativos',
                  icon: <Cpu className="w-3.5 h-3.5 text-blue-600" />,
                  badgeCol: 'bg-blue-50 text-blue-700 border border-blue-100',
                },
                { label: 'Assistentes Territoriais', value: '324', icon: <Bot className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Assistentes Municipais', value: '3.642', icon: <Bot className="w-3.5 h-3.5 text-blue-600" /> },
                {
                  label: 'Base de Conhecimento',
                  badge: 'Ativa',
                  icon: <Database className="w-3.5 h-3.5 text-blue-600" />,
                  badgeCol: 'bg-blue-50 text-blue-700 border border-blue-100',
                },
                {
                  label: 'Políticas IA',
                  badge: 'Configurado',
                  icon: <Shield className="w-3.5 h-3.5 text-blue-600" />,
                  badgeCol: 'bg-blue-50 text-blue-700 border border-blue-100',
                },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() => showToast(`Configurações de IA: ${row.label}`)}
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer group transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    {row.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.badgeCol}`}>
                        {row.badge}
                      </span>
                    )}
                    {row.value && <span className="font-semibold text-slate-800">{row.value}</span>}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => showToast('A carregar centro de controlo do VILA AI')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Gerir VILA AI</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. LINHA 2 (4 Cards): Segurança e Acesso, Integrações, Dados e Open Data, Parceiros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 5: Segurança e Acesso */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Segurança e Acesso</h3>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                { label: 'Autenticação e Senha', icon: <KeyRound className="w-3.5 h-3.5 text-blue-600" /> },
                {
                  label: 'Autenticação Multifator (MFA)',
                  badge: 'Ativo',
                  icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
                  badgeCol: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
                },
                { label: 'Sessões Ativas', value: '5', icon: <Smartphone className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Políticas de Segurança', icon: <Lock className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Logs de Acesso', icon: <FileText className="w-3.5 h-3.5 text-amber-500" /> },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() => showToast(`Opção de segurança: ${row.label}`)}
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer group transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium truncate pr-1">
                    {row.icon}
                    <span className="truncate">{row.label}</span>
                  </span>
                  <span className="flex items-center gap-1 shrink-0">
                    {row.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.badgeCol}`}>
                        {row.badge}
                      </span>
                    )}
                    {row.value && <span className="font-semibold text-slate-800">{row.value}</span>}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => showToast('A abrir painel completo de segurança')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ver todas as opções de segurança</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 6: Integrações e Conectores */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Boxes className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Integrações e Conectores</h3>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                { label: 'APIs e Webhooks', icon: <Share2 className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Integrações Ativas', value: '12', icon: <Boxes className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Serviços Externos', icon: <Cloud className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Importação de Dados', icon: <Download className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Exportação de Dados', icon: <Upload className="w-3.5 h-3.5 text-blue-600" /> },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() => showToast(`Gestão de conectores: ${row.label}`)}
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer group transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    {row.value && <span>{row.value}</span>}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => showToast('A gerir integrações e webhooks')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Gerir integrações</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 7: Dados e Open Data */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Dados e Open Data</h3>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                { label: 'Catálogos de Dados', value: '48', icon: <Layers className="w-3.5 h-3.5 text-emerald-600" /> },
                { label: 'APIs Públicas', value: '8', icon: <Code2 className="w-3.5 h-3.5 text-emerald-600" /> },
                { label: 'Partilha de Dados', value: '24', icon: <Share2 className="w-3.5 h-3.5 text-emerald-600" /> },
                {
                  label: 'Qualidade dos Dados',
                  badge: 'Excelente',
                  icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
                  badgeCol: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
                },
                { label: 'Governança de Dados', icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() => onNavigateToTab('relatorios-dados')}
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer group transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    {row.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.badgeCol}`}>
                        {row.badge}
                      </span>
                    )}
                    {row.value && <span>{row.value}</span>}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => onNavigateToTab('relatorios-dados')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Gerir dados e open data</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 8: Parceiros e Ecossistema */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <Handshake className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Parceiros e Ecossistema</h3>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                { label: 'Categorias de Parceiros', value: '7', icon: <Boxes className="w-3.5 h-3.5 text-amber-600" /> },
                { label: 'Níveis de Parceria', value: '4', icon: <Award className="w-3.5 h-3.5 text-amber-600" /> },
                {
                  label: 'Validação de Parceiros',
                  badge: 'Ativa',
                  icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
                  badgeCol: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
                },
                { label: 'Acordos e Contratos', value: '126', icon: <FileText className="w-3.5 h-3.5 text-amber-600" /> },
                { label: 'Colaborações Ativas', value: '342', icon: <Zap className="w-3.5 h-3.5 text-amber-600" /> },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() => onNavigateToTab('gestao-parceiros')}
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer group transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    {row.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.badgeCol}`}>
                        {row.badge}
                      </span>
                    )}
                    {row.value && <span>{row.value}</span>}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => onNavigateToTab('gestao-parceiros')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Gerir parceiros</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. LINHA 3 (4 Cards): Notificações, Dados e Privacidade, Marca e Identidade, Atividade */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 9: Notificações e Comunicações */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <Bell className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Notificações e Comunicações</h3>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                {
                  label: 'Email',
                  badge: 'Ativo',
                  icon: <Mail className="w-3.5 h-3.5 text-emerald-600" />,
                  badgeCol: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
                },
                {
                  label: 'Notificações Push',
                  badge: 'Ativo',
                  icon: <Smartphone className="w-3.5 h-3.5 text-emerald-600" />,
                  badgeCol: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
                },
                {
                  label: 'Alertas e Avisos',
                  badge: 'Ativo',
                  icon: <AlertTriangle className="w-3.5 h-3.5 text-emerald-600" />,
                  badgeCol: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
                },
                {
                  label: 'Digestos e Relatórios',
                  badge: 'Semanal',
                  icon: <Calendar className="w-3.5 h-3.5 text-blue-600" />,
                  badgeCol: 'bg-blue-50 text-blue-700 border border-blue-100',
                },
                { label: 'Preferências de Comunicação', icon: <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" /> },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() => showToast(`Configurar: ${row.label}`)}
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer group transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    {row.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.badgeCol}`}>
                        {row.badge}
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => showToast('A abrir preferências de notificação')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Configurar notificações</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 10: Dados e Privacidade */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Dados e Privacidade</h3>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                { label: 'Política de Privacidade', icon: <FileText className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Gestão de Dados Pessoais', icon: <UserCheck className="w-3.5 h-3.5 text-blue-600" /> },
                {
                  label: 'Retenção de Dados',
                  badge: '24 meses',
                  icon: <Clock className="w-3.5 h-3.5 text-blue-600" />,
                  badgeCol: 'bg-blue-50 text-blue-700 border border-blue-100',
                },
                { label: 'Consentimentos', icon: <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Anonimização de Dados', icon: <EyeOff className="w-3.5 h-3.5 text-amber-600" /> },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() => showToast(`Privacidade: ${row.label}`)}
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer group transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    {row.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.badgeCol}`}>
                        {row.badge}
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => showToast('A gerir políticas de RGPD e retenção de dados')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Gerir dados e privacidade</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 11: Marca e Identidade */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Palette className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Marca e Identidade</h3>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                {
                  label: 'Tema da Plataforma',
                  badge: 'Claro',
                  icon: <Sun className="w-3.5 h-3.5 text-blue-600" />,
                  badgeCol: 'bg-blue-50 text-blue-700 border border-blue-100',
                },
                { label: 'Cores e Identidade Visual', icon: <Paintbrush className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Logótipo e Marca', icon: <Sparkles className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Página de Login', icon: <LayoutTemplate className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Dashboard Personalizado', icon: <LayoutGrid className="w-3.5 h-3.5 text-blue-600" /> },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() => showToast(`Personalização visual: ${row.label}`)}
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer group transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    {row.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.badgeCol}`}>
                        {row.badge}
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => showToast('A abrir editor de identidade visual')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Personalizar identidade</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 12: Atividade da Plataforma */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#0F172A]">Atividade da Plataforma</h3>
              </div>
              <div className="relative">
                <select
                  value={activityTimeframe}
                  onChange={(e) => setActivityTimeframe(e.target.value)}
                  className="text-[10px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg px-2 py-0.5 pr-4 cursor-pointer focus:outline-none appearance-none"
                >
                  <option value="Últimos 7 dias">Últimos 7 dias</option>
                  <option value="Últimos 30 dias">Últimos 30 dias</option>
                </select>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                { label: 'Utilizadores Ativos', value: '12.456', trend: '↑ 18%', trendUp: true, icon: <Users className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Novos Registos', value: '1.248', trend: '↑ 22%', trendUp: true, icon: <UserPlus className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Consultas de Dados', value: '24.562', trend: '↑ 15%', trendUp: true, icon: <Search className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Relatórios Gerados', value: '3.642', trend: '↑ 17%', trendUp: true, icon: <FileText className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Eventos de Sistema', value: '156', trend: '↓ 5%', trendUp: false, icon: <Activity className="w-3.5 h-3.5 text-blue-600" /> },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() => onNavigateToTab('relatorios-dados')}
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{row.value}</span>
                    <span className={`text-[10.5px] font-semibold ${row.trendUp ? 'text-emerald-600' : 'text-blue-500'}`}>
                      {row.trend}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => onNavigateToTab('relatorios-dados')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ver relatório de atividade</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. LINHA 4 (4 Cards): Backups, Permissões, APIs & Desenvolvimento, Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 13: Backups e Recuperação */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Cloud className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Backups e Recuperação</h3>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                { label: 'Último Backup', value: 'Hoje, 08:32', icon: <RotateCcw className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Próximo Backup', value: 'Amanhã, 02:00', icon: <Calendar className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Backups Automáticos', value: 'Diário', icon: <RefreshCw className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Retenção de Backups', value: '30 dias', icon: <Archive className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Restaurar Plataforma', hasArrow: true, icon: <HardDrive className="w-3.5 h-3.5 text-blue-600" /> },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() => showToast(`Recuperação: ${row.label}`)}
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer group transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    {row.value && <span>{row.value}</span>}
                    {row.hasArrow && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => showToast('A abrir consola de backups e snapshots')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Gerir backups</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 14: Gestão de Permissões */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <UserCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Gestão de Permissões</h3>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                { label: 'Funções e Permissões', icon: <Key className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Grupos de Utilizadores', icon: <Users className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Permissões Avançadas', icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Acessos por Território', icon: <MapPin className="w-3.5 h-3.5 text-blue-600" /> },
                { label: 'Auditoria de Permissões', icon: <FileCheck className="w-3.5 h-3.5 text-emerald-600" /> },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() => onNavigateToTab('gestao-utilizadores')}
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer group transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => onNavigateToTab('gestao-utilizadores')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Gerir permissões</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 15: APIs e Desenvolvimento */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">APIs e Desenvolvimento</h3>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                { label: 'Documentação da API', isExternal: true, icon: <FileCode className="w-3.5 h-3.5 text-emerald-600" /> },
                { label: 'Chaves da API', value: '7', icon: <Key className="w-3.5 h-3.5 text-emerald-600" /> },
                { label: 'Webhooks', value: '3', icon: <Webhook className="w-3.5 h-3.5 text-emerald-600" /> },
                {
                  label: 'Ambientes',
                  badge: 'Produção',
                  icon: <Globe className="w-3.5 h-3.5 text-emerald-600" />,
                  badgeCol: 'bg-blue-50 text-blue-700 border border-blue-100',
                },
                { label: 'Logs da API', icon: <Terminal className="w-3.5 h-3.5 text-blue-600" /> },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() => showToast(`Desenvolvimento: ${row.label}`)}
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer group transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    {row.isExternal && <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />}
                    {row.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.badgeCol}`}>
                        {row.badge}
                      </span>
                    )}
                    {row.value && <span>{row.value}</span>}
                    {!row.isExternal && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => showToast('A abrir consola de desenvolvedores e chaves')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Gerir API</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 16: Sistema e Plataforma */}
        <div className="bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all rounded-2xl p-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <Settings className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">Sistema e Plataforma</h3>
            </div>

            <div className="divide-y divide-slate-50 text-xs">
              {[
                { label: 'Idioma e Região', value: 'Português (Portugal)', icon: <Globe className="w-3.5 h-3.5 text-slate-500" /> },
                { label: 'Fuso Horário', value: '(UTC+00:00) Lisboa', icon: <Clock className="w-3.5 h-3.5 text-slate-500" /> },
                { label: 'Formato de Data', value: 'DD MMM YYYY', icon: <Calendar className="w-3.5 h-3.5 text-slate-500" /> },
                { label: 'Formato de Hora', value: '24 horas', icon: <Clock className="w-3.5 h-3.5 text-slate-500" /> },
                { label: 'Moeda', value: 'Euro (€)', icon: <CircleDollarSign className="w-3.5 h-3.5 text-slate-500" /> },
              ].map((row, i) => (
                <div
                  key={i}
                  onClick={() =>
                    handleOpenSettingDetail(row.label, 'Parâmetro global do sistema', [
                      { label: 'Valor Atual', value: row.value },
                      { label: 'Estado', value: 'Ativo em todas as instâncias' },
                      { label: 'Última Alteração', value: 'Por Administrador VILA Global' },
                    ])
                  }
                  className="py-2 flex items-center justify-between hover:bg-slate-50/70 px-1 rounded cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    {row.icon}
                    <span>{row.label}</span>
                  </span>
                  <span className="font-semibold text-slate-800 text-[11px] text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/70 mt-4 flex justify-end">
            <button
              onClick={() => showToast('A abrir definições globais do sistema')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Configurações do sistema</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 6. Footer com Direitos e Ligações Institucionais */}
      <div className="pt-6 pb-2 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <p className="font-medium">
          © 2025 Plataforma VILA. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-6 font-medium">
          <button
            onClick={() => showToast('A abrir Termos de Uso da Plataforma VILA')}
            className="hover:text-slate-800 transition-colors cursor-pointer"
          >
            Termos de Uso
          </button>
          <button
            onClick={() => showToast('A abrir Política de Privacidade')}
            className="hover:text-slate-800 transition-colors cursor-pointer"
          >
            Política de Privacidade
          </button>
          <button
            onClick={() => onOpenSupportModal?.('centro-ajuda')}
            className="hover:text-slate-800 transition-colors cursor-pointer"
          >
            Centro de Ajuda
          </button>
        </div>
      </div>
    </div>
  );
};
