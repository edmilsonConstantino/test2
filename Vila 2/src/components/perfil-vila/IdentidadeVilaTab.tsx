import React, { useState } from 'react';
import {
  User,
  Users,
  ShieldCheck,
  Shield,
  MapPin,
  Calendar,
  Award,
  Sparkles,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Edit3,
  Heart,
  Lightbulb,
  Lock,
  Globe,
  Plus,
  Mail,
  Smartphone,
  Info,
  Star,
  Sliders,
  Check,
  X,
  GraduationCap,
  Bike,
  Home,
  Cpu,
  Palette,
  Eye,
  FileText,
  HelpCircle,
  FileCheck,
} from 'lucide-react';
import { PerfilVilaTabId } from './types';
import { DemoUser } from '../../data/demoUsers';

interface IdentidadeVilaTabProps {
  currentUser?: DemoUser;
  onNavigateToTab?: (tabId: string) => void;
  onNavigateToSubTab?: (tabId: PerfilVilaTabId) => void;
}

type SubTabId = 'visao-geral' | 'perfil-publico' | 'verificacao' | 'reputacao' | 'preferencias';
type VisibilityMode = 'publico' | 'comunidade' | 'privado';

export const IdentidadeVilaTab: React.FC<IdentidadeVilaTabProps> = ({
  currentUser,
  onNavigateToTab,
  onNavigateToSubTab,
}) => {
  // Persona fictícia oficial: Inês Pereira (Faro, Algarve)
  const profileName = 'Inês Pereira';
  const profileAvatar =
    currentUser?.avatarUrl ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250';
  const profileRole = 'Cidadã Global VILA';
  const profileLocation = 'Faro, Algarve, Portugal';
  const profileMemberSince = 'março de 2024';

  // Sub-abas internas de Identidade VILA
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>('visao-geral');

  // Estado de visibilidade
  const [visibility, setVisibility] = useState<VisibilityMode>('publico');

  // Modais interativos
  const [isEditSobreModalOpen, setIsEditSobreModalOpen] = useState(false);
  const [isEditInteressesModalOpen, setIsEditInteressesModalOpen] = useState(false);
  const [isEditCompetenciasModalOpen, setIsEditCompetenciasModalOpen] = useState(false);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isVerificacaoModalOpen, setIsVerificacaoModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estados editáveis da persona
  const [sobreData, setSobreData] = useState({
    nome: profileName,
    idioma: 'Português (Portugal)',
    nacionalidade: 'Portuguesa',
    nascimento: '12 de março de 1992',
    biografia: 'Apaixonada por cidades sustentáveis e comunidades inovadoras.',
  });

  // Interesses principais com ícones e paleta exata da UI
  const [interesses, setInteresses] = useState([
    { id: 'sustentabilidade', label: 'Sustentabilidade', icon: Sparkles, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'mobilidade', label: 'Mobilidade', icon: Bike, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 'habitacao', label: 'Habitação', icon: Home, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { id: 'educacao', label: 'Educação', icon: GraduationCap, color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'inovacao', label: 'Inovação', icon: Lightbulb, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { id: 'tecnologia', label: 'Tecnologia', icon: Cpu, color: 'bg-sky-50 text-sky-700 border-sky-200' },
    { id: 'saude', label: 'Saúde', icon: Heart, color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { id: 'cultura', label: 'Cultura', icon: Palette, color: 'bg-orange-50 text-orange-700 border-orange-200' },
  ]);

  // Competências e causas
  const [competencias, setCompetencias] = useState([
    'Gestão de Projetos',
    'Comunicação',
    'Análise de Dados',
    'Sustentabilidade Urbana',
  ]);

  const [causas, setCausas] = useState([
    { id: 'clima', label: 'Ação Climática', color: 'bg-emerald-50 text-emerald-700' },
    { id: 'genero', label: 'Igualdade de Género', color: 'bg-rose-50 text-rose-700' },
    { id: 'educacao', label: 'Educação de Qualidade', color: 'bg-amber-50 text-amber-700' },
    { id: 'cidades', label: 'Cidades Inclusivas', color: 'bg-blue-50 text-blue-700' },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Toast Notificação */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sub-navegação interna de Identidade VILA (conforme UI IDENTIDADE VILA.png) */}
      <div className="flex items-center gap-2 sm:gap-6 border-b border-slate-200/80 pb-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveSubTab('visao-geral')}
          className={`flex items-center gap-2 py-2 px-1 text-xs sm:text-[13px] font-semibold transition-all relative cursor-pointer whitespace-nowrap ${
            activeSubTab === 'visao-geral' ? 'text-[#1455AC]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${activeSubTab === 'visao-geral' ? 'text-[#1455AC]' : 'text-slate-400'}`} />
          <span>Visão geral</span>
          {activeSubTab === 'visao-geral' && (
            <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#1455AC] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSubTab('perfil-publico');
            showToast('A exibir pré-visualização do perfil público');
          }}
          className={`flex items-center gap-2 py-2 px-1 text-xs sm:text-[13px] font-semibold transition-all relative cursor-pointer whitespace-nowrap ${
            activeSubTab === 'perfil-publico' ? 'text-[#1455AC]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className={`w-3.5 h-3.5 ${activeSubTab === 'perfil-publico' ? 'text-[#1455AC]' : 'text-slate-400'}`} />
          <span>Perfil público</span>
          {activeSubTab === 'perfil-publico' && (
            <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#1455AC] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSubTab('verificacao');
            setIsVerificacaoModalOpen(true);
          }}
          className={`flex items-center gap-2 py-2 px-1 text-xs sm:text-[13px] font-semibold transition-all relative cursor-pointer whitespace-nowrap ${
            activeSubTab === 'verificacao' ? 'text-[#1455AC]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldCheck className={`w-3.5 h-3.5 ${activeSubTab === 'verificacao' ? 'text-[#1455AC]' : 'text-slate-400'}`} />
          <span>Verificação</span>
          {activeSubTab === 'verificacao' && (
            <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#1455AC] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSubTab('reputacao');
            setIsScoreModalOpen(true);
          }}
          className={`flex items-center gap-2 py-2 px-1 text-xs sm:text-[13px] font-semibold transition-all relative cursor-pointer whitespace-nowrap ${
            activeSubTab === 'reputacao' ? 'text-[#1455AC]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${activeSubTab === 'reputacao' ? 'text-[#1455AC]' : 'text-slate-400'}`} />
          <span>Reputação</span>
          {activeSubTab === 'reputacao' && (
            <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#1455AC] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSubTab('preferencias');
            showToast('Preferências de identidade abertas');
          }}
          className={`flex items-center gap-2 py-2 px-1 text-xs sm:text-[13px] font-semibold transition-all relative cursor-pointer whitespace-nowrap ${
            activeSubTab === 'preferencias' ? 'text-[#1455AC]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sliders className={`w-3.5 h-3.5 ${activeSubTab === 'preferencias' ? 'text-[#1455AC]' : 'text-slate-400'}`} />
          <span>Preferências</span>
          {activeSubTab === 'preferencias' && (
            <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#1455AC] rounded-full" />
          )}
        </button>
      </div>

      {/* Grid Principal: Coluna Esquerda/Central (xl:col-span-8/9) + Coluna Direita (xl:col-span-4/3) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* =========================================================================
            LADO ESQUERDO / PRINCIPAL (xl:col-span-8 2xl:col-span-9)
        ========================================================================= */}
        <div className="xl:col-span-8 2xl:col-span-9 space-y-4 sm:space-y-5 min-w-0">
          {/* LINHA 1 (3 CARDS): Perfil + Nível de Identidade + Visibilidade */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {/* Card 1: Perfil do Cidadão (Horizontal / Compacto) */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Avatar com Borda Azul e Botão de Edição */}
                <div className="relative shrink-0">
                  <img
                    src={profileAvatar}
                    alt={profileName}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover ring-3 ring-blue-500/20 shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setIsEditSobreModalOpen(true)}
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-600 shadow-xs flex items-center justify-center hover:bg-slate-50 hover:text-[#1455AC] transition-colors cursor-pointer"
                    title="Alterar foto"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                </div>

                {/* Dados de Identidade */}
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-base sm:text-lg font-black text-[#0F172A] font-sans truncate">
                      {profileName}
                    </h2>
                    <CheckCircle2 className="w-4 h-4 text-[#1455AC] fill-[#1455AC]/15 shrink-0" />
                  </div>

                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-purple-50 text-purple-700">
                    <Sparkles className="w-2.5 h-2.5 text-purple-600 shrink-0" />
                    <span className="truncate">{profileRole}</span>
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-0.5 pt-0.5">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{profileLocation}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">Membro desde {profileMemberSince}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge "Conta verificada" */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Conta verificada</span>
                </span>
              </div>
            </div>

            {/* Card 2: Nível de Identidade */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Nível de Identidade
                </span>

                <div className="flex items-center gap-3.5 my-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20 shrink-0">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#0F172A] font-sans">
                      Embaixadora
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                      Líder pelo exemplo e impacto positivo nas comunidades.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${(2450 / 3000) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800">2.450 / 3.000 XP</span>
                </div>
                <p className="text-[10px] text-slate-400">Próximo nível: Líder Global</p>
              </div>
            </div>

            {/* Card 3: Visibilidade do seu perfil */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <span>Visibilidade do seu perfil</span>
                    <Info className="w-3 h-3 text-slate-400" />
                  </span>
                </div>

                <div className="mt-3 space-y-2.5">
                  {/* Opção 1: Público */}
                  <label
                    onClick={() => {
                      setVisibility('publico');
                      showToast('Visibilidade alterada para Público');
                    }}
                    className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      visibility === 'publico'
                        ? 'bg-blue-50/50 border-blue-200'
                        : 'border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Globe className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-800">Público</div>
                        <div className="text-[10px] text-slate-500 leading-tight">
                          Qualquer pessoa pode ver o seu perfil e as suas contribuições.
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                        visibility === 'publico' ? 'border-[#1455AC] bg-[#1455AC]' : 'border-slate-300'
                      }`}
                    >
                      {visibility === 'publico' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </label>

                  {/* Opção 2: Comunidade */}
                  <label
                    onClick={() => {
                      setVisibility('comunidade');
                      showToast('Visibilidade alterada para Comunidade');
                    }}
                    className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      visibility === 'comunidade'
                        ? 'bg-purple-50/50 border-purple-200'
                        : 'border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-800">Comunidade</div>
                        <div className="text-[10px] text-slate-500 leading-tight">
                          Apenas membros das comunidades que participa.
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                        visibility === 'comunidade' ? 'border-[#1455AC] bg-[#1455AC]' : 'border-slate-300'
                      }`}
                    >
                      {visibility === 'comunidade' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </label>

                  {/* Opção 3: Privado */}
                  <label
                    onClick={() => {
                      setVisibility('privado');
                      showToast('Visibilidade alterada para Privado');
                    }}
                    className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      visibility === 'privado'
                        ? 'bg-slate-100 border-slate-300'
                        : 'border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-800">Privado</div>
                        <div className="text-[10px] text-slate-500 leading-tight">
                          Apenas você pode ver o seu perfil.
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                        visibility === 'privado' ? 'border-[#1455AC] bg-[#1455AC]' : 'border-slate-300'
                      }`}
                    >
                      {visibility === 'privado' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2">
                <button
                  type="button"
                  onClick={() => showToast('A abrir guia de visibilidade e privacidade')}
                  className="text-[11px] font-semibold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Saiba mais sobre visibilidade</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* LINHA 2 (3 CARDS): Sobre si + Interesses principais + Competências e causas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {/* 2.1 Card "Sobre si" */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Sobre si
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsEditSobreModalOpen(true)}
                    className="text-xs font-semibold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Editar</span>
                  </button>
                </div>

                <div className="mt-3 space-y-3">
                  {/* Nome completo */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Nome completo</span>
                      <span className="text-xs font-bold text-slate-800">{sobreData.nome}</span>
                    </div>
                  </div>

                  {/* Idioma principal */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Idioma principal</span>
                      <span className="text-xs text-slate-700 font-medium">{sobreData.idioma}</span>
                    </div>
                  </div>

                  {/* Nacionalidade */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Nacionalidade</span>
                      <span className="text-xs text-slate-700 font-medium">{sobreData.nacionalidade}</span>
                    </div>
                  </div>

                  {/* Data de nascimento */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Data de nascimento</span>
                      <span className="text-xs text-slate-700 font-medium">{sobreData.nascimento}</span>
                    </div>
                  </div>

                  {/* Biografia */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Biografia</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{sobreData.biografia}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.2 Card "Interesses principais" */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Interesses principais
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditInteressesModalOpen(true)}
                    className="text-xs font-semibold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Editar</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 mt-2 mb-3">
                  Selecione os temas que mais se alinham consigo.
                </p>

                {/* Grid 2 colunas com os 8 temas */}
                <div className="grid grid-cols-2 gap-2">
                  {interesses.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition-all ${item.color}`}
                      >
                        <Icon className="w-3 h-3 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Botão + Adicionar interesse */}
              <button
                type="button"
                onClick={() => setIsEditInteressesModalOpen(true)}
                className="mt-4 w-full py-2 px-3 rounded-xl border border-dashed border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar interesse</span>
              </button>
            </div>

            {/* 2.3 Card "Competências e causas" */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Competências e causas
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsEditCompetenciasModalOpen(true)}
                    className="text-xs font-semibold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Editar</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 mt-2 mb-3">
                  As suas competências e causas que apoia.
                </p>

                {/* Seção Competências */}
                <div>
                  <span className="text-[10.5px] font-bold text-slate-700 block mb-1.5">
                    Competências
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {competencias.map((comp) => (
                      <span
                        key={comp}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 text-slate-700"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Seção Causas que apoia */}
                <div className="mt-3.5">
                  <span className="text-[10.5px] font-bold text-slate-700 block mb-1.5">
                    Causas que apoia
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {causas.map((causa) => (
                      <span
                        key={causa.id}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${causa.color}`}
                      >
                        {causa.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LINHA 3 (CARD LARGO): Verificação da identidade */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                Verificação da identidade
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Verifique a sua identidade para ganhar credibilidade e desbloquear mais funcionalidades.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
              {/* Item 1: Email */}
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 text-slate-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-700 truncate">Email verificado</div>
                  <div className="text-[10.5px] text-slate-500 truncate">ines.pereira@exemplo.com</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-0.5">Verificado</div>
                </div>
              </div>

              {/* Item 2: Número de telemóvel */}
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 text-slate-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-700 truncate">Número de telemóvel</div>
                  <div className="text-[10.5px] text-slate-500 truncate">+351 912 345 678</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-0.5">Verificado</div>
                </div>
              </div>

              {/* Item 3: Documento de identificação */}
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 text-slate-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-700 truncate">Documento de identificação</div>
                  <div className="text-[10.5px] text-slate-500 truncate">Cartão de cidadão</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-0.5">Verificado</div>
                </div>
              </div>

              {/* Item 4: Prova de residência */}
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 text-slate-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <Home className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-700 truncate">Prova de residência</div>
                  <div className="text-[10.5px] text-slate-500 truncate">Faro, Portugal</div>
                  <div className="text-[10px] font-bold text-blue-600 mt-0.5">Em análise</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 mt-4">
              <button
                type="button"
                onClick={() => setIsVerificacaoModalOpen(true)}
                className="text-[11px] font-semibold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Saiba mais sobre verificação</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            LADO DIREITO / SIDEBAR (xl:col-span-4 2xl:col-span-3)
        ========================================================================= */}
        <div className="xl:col-span-4 2xl:col-span-3 space-y-4 sm:space-y-5 min-w-0">
          {/* 1. Card Resumo da Identidade com Gráfico Circular */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Resumo da Identidade
            </h3>

            {/* Circular Gauge / Donut 82 Pontuação */}
            <div className="flex flex-col items-center justify-center my-4">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* SVG circular progress ring com segmentos pontilhados */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Trilha de fundo pontilhada */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="5"
                    strokeDasharray="2, 4"
                    className="opacity-50"
                  />
                  {/* Arco Verde / Emerald */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="5"
                    strokeDasharray="70, 200"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Arco Azul */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#1455AC"
                    strokeWidth="5"
                    strokeDasharray="65, 200"
                    strokeDashoffset="-70"
                    strokeLinecap="round"
                  />
                  {/* Arco Roxo */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="5"
                    strokeDasharray="65, 200"
                    strokeDashoffset="-135"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Conteúdo Central */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-[#0F172A] font-sans leading-none">
                    82
                  </span>
                  <span className="text-[9px] font-medium text-slate-500 mt-1 max-w-[80px] leading-tight">
                    Pontuação de Identidade
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Barras de Progresso */}
            <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
              {/* Participação */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Participação</span>
                  </div>
                  <span className="font-bold text-slate-800 text-[11px]">85/100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Impacto */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Impacto</span>
                  </div>
                  <span className="font-bold text-slate-800 text-[11px]">78/100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              {/* Contribuições */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Contribuições</span>
                  </div>
                  <span className="font-bold text-slate-800 text-[11px]">90/100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#1455AC] rounded-full" style={{ width: '90%' }} />
                </div>
              </div>

              {/* Reputação */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>Reputação</span>
                  </div>
                  <span className="font-bold text-slate-800 text-[11px]">75/100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 mt-4">
              <button
                type="button"
                onClick={() => setIsScoreModalOpen(true)}
                className="text-xs font-semibold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Ver detalhes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. Card "Os seus distintivos" */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Os seus distintivos
              </h3>
              <button
                type="button"
                onClick={() => setIsBadgesModalOpen(true)}
                className="text-xs font-semibold text-[#1455AC] hover:underline cursor-pointer"
              >
                Ver todos
              </button>
            </div>

            <div className="flex items-center justify-between gap-2">
              {/* Distintivo 1: Verde (Semente) */}
              <div
                onClick={() => setIsBadgesModalOpen(true)}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-xs cursor-pointer hover:scale-105 transition-transform"
                title="Semente — Conquistada"
              >
                <Sparkles className="w-5 h-5" />
              </div>

              {/* Distintivo 2: Roxo (Guardião) */}
              <div
                onClick={() => setIsBadgesModalOpen(true)}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-xs cursor-pointer hover:scale-105 transition-transform"
                title="Guardião — Conquistada"
              >
                <Star className="w-5 h-5" />
              </div>

              {/* Distintivo 3: Âmbar/Laranja (Embaixador) */}
              <div
                onClick={() => setIsBadgesModalOpen(true)}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-xs cursor-pointer hover:scale-105 transition-transform"
                title="Embaixador — Conquistada"
              >
                <Users className="w-5 h-5" />
              </div>

              {/* Distintivo 4: Azul (Lenda VILA) */}
              <div
                onClick={() => setIsBadgesModalOpen(true)}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-white flex items-center justify-center shadow-xs cursor-pointer hover:scale-105 transition-transform"
                title="Lenda VILA — Em progresso"
              >
                <Globe className="w-5 h-5" />
              </div>

              {/* Tag +8 distintivos */}
              <span
                onClick={() => setIsBadgesModalOpen(true)}
                className="text-[11px] font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg transition-colors cursor-pointer"
              >
                +8 distintivos
              </span>
            </div>
          </div>

          {/* 3. Card Ilustração "A sua identidade é a base da confiança..." */}
          <div className="bg-gradient-to-br from-slate-50 to-purple-50/40 rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                A sua identidade é a base da confiança na comunidade.
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Complete o seu perfil e aumente a sua reputação na VILA.
              </p>

              {/* Ilustração estilizada 3D de escudo e nuvens */}
              <div className="py-2 flex justify-center">
                <div className="relative w-28 h-24 flex items-center justify-center">
                  <div className="absolute w-20 h-20 bg-gradient-to-tr from-purple-500 to-indigo-600 rounded-3xl rotate-12 shadow-lg shadow-purple-400/30 flex items-center justify-center text-white">
                    <ShieldCheck className="w-10 h-10 -rotate-12" />
                  </div>
                  <div className="absolute -bottom-1 -left-2 w-10 h-6 bg-white/90 rounded-full blur-[0.5px] shadow-xs" />
                  <div className="absolute top-1 -right-1 w-8 h-5 bg-white/90 rounded-full blur-[0.5px] shadow-xs" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsVerificacaoModalOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-white border border-purple-200 hover:border-purple-300 text-purple-700 hover:text-purple-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer hover:shadow-xs"
              >
                <span>Melhorar identidade</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAIS INTERATIVOS
      ========================================================================= */}

      {/* 1. Modal Editar "Sobre si" */}
      {isEditSobreModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-sans">Editar Sobre si</h3>
              <button
                type="button"
                onClick={() => setIsEditSobreModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nome completo</label>
                <input
                  type="text"
                  value={sobreData.nome}
                  onChange={(e) => setSobreData({ ...sobreData, nome: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1455AC] text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Idioma principal</label>
                <input
                  type="text"
                  value={sobreData.idioma}
                  onChange={(e) => setSobreData({ ...sobreData, idioma: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1455AC] text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nacionalidade</label>
                <input
                  type="text"
                  value={sobreData.nacionalidade}
                  onChange={(e) => setSobreData({ ...sobreData, nacionalidade: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1455AC] text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Data de nascimento</label>
                <input
                  type="text"
                  value={sobreData.nascimento}
                  onChange={(e) => setSobreData({ ...sobreData, nascimento: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1455AC] text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Biografia</label>
                <textarea
                  rows={3}
                  value={sobreData.biografia}
                  onChange={(e) => setSobreData({ ...sobreData, biografia: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1455AC] text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditSobreModalOpen(false)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditSobreModalOpen(false);
                  showToast('Dados de perfil guardados com sucesso!');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1455AC] hover:bg-blue-700 cursor-pointer shadow-xs"
              >
                Guardar alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Editar "Interesses principais" */}
      {isEditInteressesModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Gerir Interesses Principais
                </h3>
                <p className="text-xs text-slate-500">
                  Selecione os temas cívicos e sustentáveis de seu maior interesse.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditInteressesModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
              {[
                { id: 'sustentabilidade', label: 'Sustentabilidade', icon: Sparkles },
                { id: 'mobilidade', label: 'Mobilidade', icon: Bike },
                { id: 'habitacao', label: 'Habitação', icon: Home },
                { id: 'educacao', label: 'Educação', icon: GraduationCap },
                { id: 'inovacao', label: 'Inovação', icon: Lightbulb },
                { id: 'tecnologia', label: 'Tecnologia', icon: Cpu },
                { id: 'saude', label: 'Saúde', icon: Heart },
                { id: 'cultura', label: 'Cultura', icon: Palette },
                { id: 'energia-limpa', label: 'Energia Limpa', icon: Sparkles },
                { id: 'biodiversidade', label: 'Biodiversidade', icon: Sparkles },
                { id: 'inclusao-social', label: 'Inclusão Social', icon: Users },
                { id: 'governanca', label: 'Governança', icon: Shield },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = interesses.some((i) => i.id === item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setInteresses(interesses.filter((i) => i.id !== item.id));
                      } else {
                        setInteresses([
                          ...interesses,
                          {
                            id: item.id,
                            label: item.label,
                            icon: item.icon,
                            color: 'bg-blue-50 text-blue-700 border-blue-200',
                          },
                        ]);
                      }
                    }}
                    className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 border-[#1455AC] text-[#1455AC]'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#1455AC]" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditInteressesModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1455AC] hover:bg-blue-700 cursor-pointer"
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal Detalhes da Pontuação (Score de Identidade) */}
      {isScoreModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Pontuação de Identidade: 82/100
              </h3>
              <button
                type="button"
                onClick={() => setIsScoreModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              A sua pontuação reflete a consistência da sua participação cívica, o impacto gerado nos territórios e o grau de validação documental.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <div className="flex justify-between font-bold text-emerald-900">
                  <span>Participação</span>
                  <span>85 pts</span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Excelente presença em consultas públicas e votos orçamentais.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-100">
                <div className="flex justify-between font-bold text-purple-900">
                  <span>Impacto Comunitário</span>
                  <span>78 pts</span>
                </div>
                <p className="text-[11px] text-purple-700 mt-0.5">
                  1.244 pessoas alcançadas pelas suas propostas aprovadas.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex justify-between font-bold text-blue-900">
                  <span>Contribuições e Relatórios</span>
                  <span>90 pts</span>
                </div>
                <p className="text-[11px] text-blue-700 mt-0.5">
                  127 contributos aceites e moderados positivamente.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                <div className="flex justify-between font-bold text-amber-900">
                  <span>Reputação dos Pares</span>
                  <span>75 pts</span>
                </div>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Reconhecida como guardiã em Faro por 18 comunidades locais.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsScoreModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1455AC] hover:bg-blue-700 cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal "Os seus distintivos" (12 distintivos completos) */}
      {isBadgesModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Distintivos de Cidadania ({12})
                </h3>
                <p className="text-xs text-slate-500">
                  Reconhecimentos conquistados pelo seu compromisso cívico.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsBadgesModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
              {[
                { name: 'Semente', status: 'Conquistada', desc: 'Primeiros passos na VILA', icon: Sparkles, color: 'from-emerald-400 to-emerald-600' },
                { name: 'Guardião', status: 'Conquistada', desc: 'Cuida da comunidade local', icon: Star, color: 'from-purple-500 to-indigo-600' },
                { name: 'Embaixador', status: 'Conquistada', desc: 'Impacto reconhecido', icon: Users, color: 'from-amber-400 to-orange-500' },
                { name: 'Líder Comunitário', status: '80%', desc: 'Lidera pelo exemplo', icon: Award, color: 'from-purple-600 to-pink-600' },
                { name: 'Voz Ativa', status: 'Conquistada', desc: '50+ contributos cívicos', icon: Heart, color: 'from-rose-400 to-red-600' },
                { name: 'Lenda VILA', status: '25%', desc: 'Máximo reconhecimento global', icon: Globe, color: 'from-blue-500 to-indigo-700' },
                { name: 'Inovadora', status: 'Conquistada', desc: 'Ideia de mobilidade aprovada', icon: Lightbulb, color: 'from-amber-400 to-yellow-600' },
                { name: 'Ecologista', status: 'Conquistada', desc: 'Projetos ambientais no Algarve', icon: Sparkles, color: 'from-emerald-500 to-teal-700' },
                { name: 'Solidária', status: 'Conquistada', desc: 'Apoio em causas de inclusão', icon: Users, color: 'from-pink-400 to-rose-600' },
                { name: 'Cidadã Global', status: 'Conquistada', desc: 'Intercâmbio transfronteiriço', icon: Globe, color: 'from-blue-400 to-cyan-600' },
                { name: 'Mentora Cívica', status: 'Conquistada', desc: 'Apoio a novos membros', icon: GraduationCap, color: 'from-indigo-400 to-purple-600' },
                { name: 'Pacificadora', status: 'Conquistada', desc: 'Moderação empática comprovada', icon: ShieldCheck, color: 'from-teal-400 to-emerald-600' },
              ].map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${badge.color} text-white flex items-center justify-center shadow-xs mb-2`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">{badge.name}</span>
                    <span className="text-[10px] font-semibold text-purple-700 mt-0.5">{badge.status}</span>
                    <span className="text-[9.5px] text-slate-400 mt-1 line-clamp-2">{badge.desc}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsBadgesModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1455AC] hover:bg-blue-700 cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal Processo de Verificação */}
      {isVerificacaoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Estado da Verificação
              </h3>
              <button
                type="button"
                onClick={() => setIsVerificacaoModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-900">Email verificado</div>
                  <div className="text-[11px] text-emerald-700">ines.pereira@exemplo.com</div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-900">Telemóvel verificado</div>
                  <div className="text-[11px] text-emerald-700">+351 912 345 678</div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-900">Cartão de Cidadão</div>
                  <div className="text-[11px] text-emerald-700">Documento validado com sucesso</div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="p-3 rounded-xl border border-blue-100 bg-blue-50/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-blue-900">Prova de Residência</div>
                  <div className="text-[11px] text-blue-700">Comprovativo submetido — Em análise pela moderação</div>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                  Em análise
                </span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500">
              A verificação de residência permite votar em orçamentos participativos e assembleias de freguesia no município de Faro.
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsVerificacaoModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1455AC] hover:bg-blue-700 cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal Editar "Competências e Causas" */}
      {isEditCompetenciasModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Competências e Causas
              </h3>
              <button
                type="button"
                onClick={() => setIsEditCompetenciasModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Competências selecionadas</label>
                <div className="flex flex-wrap gap-1.5">
                  {competencias.map((comp, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 flex items-center gap-1 font-medium"
                    >
                      <span>{comp}</span>
                      <X
                        className="w-3 h-3 text-slate-400 hover:text-rose-500 cursor-pointer"
                        onClick={() => setCompetencias(competencias.filter((_, i) => i !== idx))}
                      />
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Causas que apoia</label>
                <div className="flex flex-wrap gap-1.5">
                  {causas.map((c, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold ${c.color}`}
                    >
                      <span>{c.label}</span>
                      <X
                        className="w-3 h-3 text-slate-400 hover:text-rose-500 cursor-pointer"
                        onClick={() => setCausas(causas.filter((_, i) => i !== idx))}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsEditCompetenciasModalOpen(false);
                  showToast('Competências e causas atualizadas!');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1455AC] hover:bg-blue-700 cursor-pointer"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
