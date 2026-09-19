import React from 'react';
import {
  User,
  Users,
  ShieldCheck,
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
  Building2,
  Lock,
  Smartphone,
  Laptop,
  Key,
  Shield,
  MessageSquare,
  Globe,
  Coins,
  Crown,
  Check,
  Plus,
  Compass,
  Star,
  Sprout,
  Share2,
  ExternalLink,
  TrendingUp,
} from 'lucide-react';
import { PerfilVilaTabId } from './types';
import { DemoUser } from '../../data/demoUsers';

interface VilaPerfilTabProps {
  currentUser?: DemoUser;
  onNavigateToSubTab?: (tabId: PerfilVilaTabId) => void;
  onOpenAiAssistant?: () => void;
  onNavigateToTab?: (tabId: string) => void;
}

export const VilaPerfilTab: React.FC<VilaPerfilTabProps> = ({
  currentUser,
  onNavigateToSubTab,
  onOpenAiAssistant,
  onNavigateToTab,
}) => {
  const profileName = currentUser?.name || 'Inês Pereira';
  const profileAvatar =
    currentUser?.avatarUrl ||
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250';
  const profileRole = currentUser?.roleLabel || 'Cidadã Global VILA';
  const profileLocation = currentUser?.location || 'Faro, Algarve, Portugal';

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
      {/* =========================================================================
          1. LINHA TOPO: Card Perfil Resumo + Card Nível VILA e Progresso
          Ambos os cards agora têm espaço generoso e proporcional
      ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* 1.1 Card Perfil Resumo (lg:col-span-7 xl:col-span-8) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Avatar com anel, verificação e sombra suave */}
            <div className="relative shrink-0">
              <img
                src={profileAvatar}
                alt={profileName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-slate-50 shadow-sm"
              />
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#10B981] text-white rounded-full flex items-center justify-center ring-2 ring-white shadow-xs"
                title="Identidade Cívica Verificada"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>

            {/* Informações Principais */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-sans tracking-tight truncate">
                  {profileName}
                </h2>
                <div
                  className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0"
                  title="Perfil Verificado"
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-100/70">
                  <Star className="w-3 h-3 text-purple-600 fill-purple-600/30" />
                  <span>{profileRole}</span>
                </div>
              </div>

              {/* Localização e Membro Desde */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{profileLocation}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Membro desde março de 2024</span>
                </div>
              </div>

              {/* Biografia Curta */}
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl pt-1">
                Apaixonada por cidades sustentáveis, governança participativa e inovação cívica comunitária nos territórios locais e globais.
              </p>

              {/* Chips de Territórios de Atuação */}
              <div className="flex flex-wrap items-center gap-2 pt-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Territórios:
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/80 shadow-2xs">
                  <span>🇵🇹</span> Portugal
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold bg-red-50 text-red-700 border border-red-100 shadow-2xs">
                  <span>🛡️</span> Algarve (Faro)
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 shadow-2xs">
                  <span>🌐</span> Comunidade Global
                </span>
              </div>
            </div>
          </div>

          {/* Ações Rápidas do Perfil */}
          <div className="flex flex-wrap items-center gap-2.5 pt-4 mt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onNavigateToSubTab?.('identidade')}
              className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar perfil completo</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToSubTab?.('identidade')}
              className="inline-flex items-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ver Identidade Cívica</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToSubTab?.('territorios')}
              className="inline-flex items-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>Gerir territórios</span>
            </button>
          </div>
        </div>

        {/* 1.2 Card Nível VILA e Progresso (lg:col-span-5 xl:col-span-4) */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Nível VILA & Reconhecimento
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-100/60">
                <Star className="w-3 h-3 text-purple-600 fill-purple-600/30" />
                <span>Top 8%</span>
              </span>
            </div>

            <div className="flex items-center gap-3.5 my-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center text-white shadow-md shadow-purple-500/20 shrink-0">
                <Award className="w-7 h-7 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] font-sans">
                  Embaixadora da Comunidade
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reconhecimento por participação cívica ativa e liderança
                </p>
              </div>
            </div>

            {/* Barra de Progresso XP */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0F172A] font-sans">2.450 / 3.000 XP</span>
                <span className="font-semibold text-purple-700 text-[11px]">Faltam 550 XP</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${(2450 / 3000) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Nível 4: Embaixadora</span>
                <span className="font-medium text-slate-600">Próximo: Líder Global (Nível 5)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">18 conquistas desbloqueadas</span>
            <button
              type="button"
              onClick={() => onNavigateToSubTab?.('conquistas')}
              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 group cursor-pointer"
            >
              <span>Ver todas as medalhas</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. SEÇÃO DE INDICADORES (KPIs) - "faça ir para baixo esses cards deixe ele visivel nao com esse corte"
          Colocados abaixo da linha de perfil, em grade limpa de 6 colunas,
          com estilo idêntico ao das outras páginas (Recursos, Visão Geral, etc.)
      ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {/* Card KPI 1: Territórios */}
        <div
          onClick={() => onNavigateToSubTab?.('territorios')}
          className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-4.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-200 transition-all flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 leading-tight">Territórios</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/60">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#0F172A] font-sans">4</div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 mt-1">
              <span>Ativos</span>
              <span className="text-slate-400 font-normal">• Faro, Loulé +2</span>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:text-blue-700">
            <span>Ver territórios</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Card KPI 2: Participações */}
        <div
          onClick={() => onNavigateToSubTab?.('participacao')}
          className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-4.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-200 transition-all flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 leading-tight">Participações</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#0F172A] font-sans">86</div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 mt-1">
              <span>↑ +14</span>
              <span className="text-slate-400 font-normal">este mês</span>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:text-blue-700">
            <span>Histórico</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Card KPI 3: Ideias Submetidas */}
        <div
          onClick={() => onNavigateToSubTab?.('participacao')}
          className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-4.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-200 transition-all flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 leading-tight">Ideias Submetidas</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/60">
              <Lightbulb className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#0F172A] font-sans">12</div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-amber-600 mt-1">
              <span>4 aprovadas</span>
              <span className="text-slate-400 font-normal">(33% taxa)</span>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:text-blue-700">
            <span>Ver propostas</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Card KPI 4: Conquistas */}
        <div
          onClick={() => onNavigateToSubTab?.('conquistas')}
          className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-4.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-200 transition-all flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 leading-tight">Conquistas</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100/60">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#0F172A] font-sans">18</div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-purple-600 mt-1">
              <span>3 em progresso</span>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:text-blue-700">
            <span>Ver medalhas</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Card KPI 5: Impacto Gerado */}
        <div
          onClick={() => onNavigateToSubTab?.('participacao')}
          className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-4.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-200 transition-all flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 leading-tight">Impacto Gerado</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/60">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#0F172A] font-sans">1.245</div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 mt-1">
              <span>↑ +220</span>
              <span className="text-slate-400 font-normal">pontos este mês</span>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:text-blue-700">
            <span>Relatório</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Card KPI 6: Reputação Cívica */}
        <div
          onClick={() => onNavigateToSubTab?.('identidade')}
          className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-4.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-200 transition-all flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 leading-tight">Reputação Cívica</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/60">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#0F172A] font-sans">98/100</div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-indigo-600 mt-1">
              <span>Identidade Verificada</span>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:text-blue-700">
            <span>Ver score</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. SEÇÃO PRINCIPAL DE CONTEÚDO (COLUNA ESQUERDA + SIDEBAR DIREITA)
      ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* =====================================================================
            COLUNA ESQUERDA (lg:col-span-8 2xl:col-span-9)
        ===================================================================== */}
        <div className="lg:col-span-8 2xl:col-span-9 space-y-5 min-w-0">
          {/* LINHA 3.1: 3 Cards (A Minha Identidade, Os Meus Territórios, Participação Cívica) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Card 3.1.1: A Minha Identidade */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-[#0F172A] font-sans">
                    A Minha Identidade
                  </h3>
                  <button
                    type="button"
                    onClick={() => onNavigateToSubTab?.('identidade')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Editar
                  </button>
                </div>

                <div className="mt-3 space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10.5px] text-slate-400 block font-medium uppercase tracking-wider">
                      Nome completo
                    </span>
                    <span className="font-bold text-[#0F172A] text-sm">{profileName}</span>
                  </div>
                  <div>
                    <span className="text-[10.5px] text-slate-400 block font-medium uppercase tracking-wider">
                      Idioma & Nacionalidade
                    </span>
                    <span className="text-slate-700 font-medium">Português (Portugal) • Portuguesa</span>
                  </div>
                  <div>
                    <span className="text-[10.5px] text-slate-400 block font-medium uppercase tracking-wider">
                      Localização principal
                    </span>
                    <span className="text-slate-700 font-medium">{profileLocation}</span>
                  </div>
                  <div>
                    <span className="text-[10.5px] text-slate-400 block font-medium uppercase tracking-wider">
                      Biografia
                    </span>
                    <p className="text-slate-600 leading-relaxed text-xs line-clamp-2 mt-0.5">
                      Apaixonada por cidades sustentáveis e comunidades inovadoras no Algarve.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10.5px] text-slate-400 block font-medium uppercase tracking-wider mb-2">
                  Interesses Principais
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Sustentabilidade
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    Habitação
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Mobilidade
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigateToSubTab?.('interesses-geral')}
                    className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                    title="Adicionar mais interesses"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3.1.2: Os Meus Territórios */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-[#0F172A] font-sans">
                    Os Meus Territórios
                  </h3>
                  <button
                    type="button"
                    onClick={() => onNavigateToSubTab?.('territorios')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Adicionar
                  </button>
                </div>

                {/* Árvore Hierárquica de Territórios */}
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-[#0F172A]">
                    <span className="text-sm">🇵🇹</span>
                    <span>Portugal (Nacional)</span>
                  </div>

                  <div className="pl-4 border-l-2 border-slate-200 ml-2 space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Algarve (Regional)</span>
                    </div>

                    <div className="pl-4 border-l-2 border-slate-200 ml-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                          <MapPin className="w-3 h-3 text-blue-600" />
                          <span>Faro</span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded-md text-[9.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Principal
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>Loulé</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>Olhão</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToSubTab?.('territorios')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer pt-3 border-t border-slate-100 group"
              >
                <span>Ver todos os 4 territórios</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Card 3.1.3: Participação Cívica */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-[#0F172A] font-sans">
                    Participação Cívica
                  </h3>
                  <button
                    type="button"
                    onClick={() => onNavigateToSubTab?.('participacao')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Detalhes
                  </button>
                </div>

                <div className="mt-3 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/60">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>Consultas Participadas</span>
                    </div>
                    <span className="font-bold text-[#0F172A]">34</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/60">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      <span>Projetos Comentados</span>
                    </div>
                    <span className="font-bold text-[#0F172A]">21</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
                        <Heart className="w-3.5 h-3.5" />
                      </div>
                      <span>Projetos Apoiados</span>
                    </div>
                    <span className="font-bold text-[#0F172A]">56</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
                        <Coins className="w-3.5 h-3.5" />
                      </div>
                      <span>Orçamentos Participativos</span>
                    </div>
                    <span className="font-bold text-[#0F172A]">9</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/60">
                        <Lightbulb className="w-3.5 h-3.5" />
                      </div>
                      <span>Ideias Submetidas</span>
                    </div>
                    <span className="font-bold text-[#0F172A]">12</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToSubTab?.('participacao')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer pt-3 border-t border-slate-100 group"
              >
                <span>Ver histórico de contribuições</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* LINHA 3.2: As Minhas Conquistas + O Meu Impacto */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            {/* Card 3.2.1: As Minhas Conquistas (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Award className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] font-sans">
                      As Minhas Conquistas e Medalhas
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateToSubTab?.('conquistas')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Ver todas (18)
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
                  {/* Badge 1: Semente */}
                  <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="relative w-11 h-11 flex items-center justify-center mb-1.5">
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
                        <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="url(#seedling-grad-2)" />
                        <defs>
                          <linearGradient id="seedling-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="100%" stopColor="#047857" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <Sprout className="w-5 h-5 text-white absolute" />
                    </div>
                    <h4 className="text-xs font-bold text-[#0F172A] leading-tight">Semente</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Primeiros passos</p>
                    <span className="mt-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Conquistada
                    </span>
                  </div>

                  {/* Badge 2: Guardião */}
                  <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="relative w-11 h-11 flex items-center justify-center mb-1.5">
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
                        <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="url(#guardiao-grad-2)" />
                        <defs>
                          <linearGradient id="guardiao-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#059669" />
                            <stop offset="100%" stopColor="#064E3B" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <ShieldCheck className="w-5 h-5 text-white absolute" />
                    </div>
                    <h4 className="text-xs font-bold text-[#0F172A] leading-tight">Guardião</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Cuida da comu.</p>
                    <span className="mt-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Conquistada
                    </span>
                  </div>

                  {/* Badge 3: Embaixador */}
                  <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="relative w-11 h-11 flex items-center justify-center mb-1.5">
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
                        <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="url(#embaixador-grad-2)" />
                        <defs>
                          <linearGradient id="embaixador-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F59E0B" />
                            <stop offset="100%" stopColor="#B45309" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <Award className="w-5 h-5 text-white absolute" />
                    </div>
                    <h4 className="text-xs font-bold text-[#0F172A] leading-tight">Embaixador</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Impacto reconh.</p>
                    <span className="mt-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Conquistada
                    </span>
                  </div>

                  {/* Badge 4: Líder Comunitário */}
                  <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="relative w-11 h-11 flex items-center justify-center mb-1.5">
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
                        <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="url(#lider-grad-2)" />
                        <defs>
                          <linearGradient id="lider-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#4C1D95" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <Users className="w-5 h-5 text-white absolute" />
                    </div>
                    <h4 className="text-xs font-bold text-[#0F172A] leading-tight">Líder Com.</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Lidera p/ exemplo</p>
                    <div className="w-full h-1.5 bg-purple-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full w-[80%]" />
                    </div>
                    <span className="text-[9px] font-bold text-purple-700 mt-0.5">80% ativo</span>
                  </div>

                  {/* Badge 5: Lenda VILA */}
                  <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="relative w-11 h-11 flex items-center justify-center mb-1.5">
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
                        <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="url(#lenda-grad-2)" />
                        <defs>
                          <linearGradient id="lenda-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#475569" />
                            <stop offset="100%" stopColor="#1E293B" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <Crown className="w-5 h-5 text-white absolute" />
                    </div>
                    <h4 className="text-xs font-bold text-[#0F172A] leading-tight">Lenda VILA</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Impacto perene</p>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-slate-600 rounded-full w-[25%]" />
                    </div>
                    <span className="text-[9px] font-bold text-slate-600 mt-0.5">25%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3.2.2: O Meu Impacto (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] font-sans">
                      O Meu Impacto Territorial
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateToSubTab?.('participacao')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Ver relatório
                  </button>
                </div>

                <div className="flex items-center gap-5 my-2">
                  {/* Donut Circular SVG com Ring Ciano/Azul */}
                  <div className="relative w-26 h-26 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-blue-600"
                        strokeDasharray="85, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-cyan-400"
                        strokeDasharray="30, 100"
                        strokeDashoffset="-55"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-lg font-bold text-[#0F172A] font-sans leading-none">1.245</span>
                      <span className="text-[9px] text-slate-400 leading-tight mt-0.5">Pontos</span>
                    </div>
                  </div>

                  {/* Lista de Métricas com Bullets Coloridos */}
                  <div className="flex-1 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
                        <span>Pessoas Impactadas</span>
                      </div>
                      <span className="font-bold text-[#0F172A]">1.244</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                        <span>Projetos Apoiados</span>
                      </div>
                      <span className="font-bold text-[#0F172A]">43</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                        <span>Municípios Envolvidos</span>
                      </div>
                      <span className="font-bold text-[#0F172A]">6</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                        <span>Contributos Realizados</span>
                      </div>
                      <span className="font-bold text-[#0F172A]">127</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LINHA 3.3: Assinatura + Segurança da Conta */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
            {/* Card 3.3.1: Assinatura (md:col-span-6) */}
            <div className="md:col-span-6 bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Plano & Assinatura
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs">
                    Ativa
                  </span>
                </div>

                <div className="flex items-start gap-3 my-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-100">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0F172A] font-sans">VILA Premium (Anual)</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Renovação automática em 12 de maio de 2026
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Acesso a projetos exclusivos nos territórios</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Relatórios avançados de impacto e dados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>VILA AI ilimitado para co-criação</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onNavigateToSubTab?.('assinaturas')}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer text-center"
                >
                  Gerir assinatura
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateToSubTab?.('assinaturas')}
                  className="py-2 px-3 rounded-xl text-blue-600 hover:text-blue-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Faturas
                </button>
              </div>
            </div>

            {/* Card 3.3.2: Segurança da Conta (md:col-span-6) */}
            <div className="md:col-span-6 bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Segurança & Credenciais
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigateToSubTab?.('seguranca')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Opções
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                  <div
                    onClick={() => onNavigateToSubTab?.('seguranca')}
                    className="flex items-center justify-between hover:bg-slate-50 p-2 rounded-xl border border-slate-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-800 block text-xs">Palavra-passe</span>
                        <span className="text-[10px] text-slate-400">Alterada há 30 dias</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  <div
                    onClick={() => onNavigateToSubTab?.('seguranca')}
                    className="flex items-center justify-between hover:bg-slate-50 p-2 rounded-xl border border-slate-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-800 block text-xs">Sessões ativas</span>
                        <span className="text-[10px] text-slate-400">3 dispositivos</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  <div
                    onClick={() => onNavigateToSubTab?.('seguranca')}
                    className="flex items-center justify-between hover:bg-slate-50 p-2 rounded-xl border border-slate-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-800 block text-xs">Autenticação 2FA</span>
                        <span className="text-[10px] text-emerald-600 font-semibold">Ativada</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  <div
                    onClick={() => onNavigateToSubTab?.('seguranca')}
                    className="flex items-center justify-between hover:bg-slate-50 p-2 rounded-xl border border-slate-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-800 block text-xs">Dispositivos</span>
                        <span className="text-[10px] text-slate-400">Verificados</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onNavigateToSubTab?.('seguranca')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer group"
                >
                  <span>Gerir todas as definições de segurança</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            COLUNA DIREITA / SIDEBAR (lg:col-span-4 2xl:col-span-3)
        ===================================================================== */}
        <div className="lg:col-span-4 2xl:col-span-3 space-y-5">
          {/* Widget 1: O Meu Percurso na VILA */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#0F172A] font-sans">
                O Meu Percurso na VILA
              </h3>
              <button
                type="button"
                onClick={() => onNavigateToSubTab?.('participacao')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-0.5"
              >
                <span>Ver tudo</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Timeline Vertical */}
            <div className="relative pl-6 space-y-4 border-l-2 border-slate-100 ml-2">
              {/* Ponto 1 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-white shadow-2xs" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Mar 2024</span>
                <h4 className="text-xs font-bold text-[#0F172A] mt-0.5">Adesão à Rede VILA</h4>
                <p className="text-[11px] text-slate-500">Registo de cidadania global verificado</p>
              </div>

              {/* Ponto 2 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-white shadow-2xs" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Mai 2024</span>
                <h4 className="text-xs font-bold text-[#0F172A] mt-0.5">Primeira participação</h4>
                <p className="text-[11px] text-slate-500">Comentou proposta territorial em Faro</p>
              </div>

              {/* Ponto 3 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-purple-500 ring-4 ring-white shadow-2xs" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Ago 2024</span>
                <h4 className="text-xs font-bold text-[#0F172A] mt-0.5">Primeira ideia aprovada</h4>
                <p className="text-[11px] text-slate-500">Mobilidade suave aprovada em Loulé</p>
              </div>

              {/* Ponto 4 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-purple-500 ring-4 ring-white shadow-2xs" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Jan 2025</span>
                <h4 className="text-xs font-bold text-[#0F172A] mt-0.5">Embaixadora da Comunidade</h4>
                <p className="text-[11px] text-slate-500">Reconhecimento por impacto contínuo</p>
              </div>

              {/* Ponto 5 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-white shadow-2xs" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Mai 2025</span>
                <h4 className="text-xs font-bold text-[#0F172A] mt-0.5">Top Participações</h4>
                <p className="text-[11px] text-slate-500">Alcançou o Top 8% na rede</p>
              </div>
            </div>
          </div>

          {/* Widget 2: VILA AI (Assistente Inteligente) */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100 shadow-2xs">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] font-sans">
                  VILA AI
                </h3>
                <p className="text-xs text-slate-500">A sua assistente de cidadania</p>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <button
                type="button"
                onClick={onOpenAiAssistant}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100 text-xs text-slate-700 transition-colors flex items-center gap-2 cursor-pointer border border-slate-100"
              >
                <MessageSquare className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="truncate">Como posso aumentar o meu impacto?</span>
              </button>

              <button
                type="button"
                onClick={onOpenAiAssistant}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100 text-xs text-slate-700 transition-colors flex items-center gap-2 cursor-pointer border border-slate-100"
              >
                <MessageSquare className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="truncate">Que projetos existem perto de mim em Faro?</span>
              </button>

              <button
                type="button"
                onClick={onOpenAiAssistant}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50/80 hover:bg-slate-100 text-xs text-slate-700 transition-colors flex items-center gap-2 cursor-pointer border border-slate-100"
              >
                <MessageSquare className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="truncate">Que conquistas posso desbloquear agora?</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenAiAssistant}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conversar com a VILA AI</span>
            </button>
          </div>

          {/* Widget 3: Atalhos Rápidos */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A] font-sans">
              Atalhos Rápidos
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onNavigateToSubTab?.('territorios')}
                className="p-3 rounded-xl bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-100 text-left transition-colors cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center mb-1.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-emerald-950 block leading-tight">
                  Os meus territórios
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToSubTab?.('interesses-geral')}
                className="p-3 rounded-xl bg-blue-50/60 hover:bg-blue-50 border border-blue-100 text-left transition-colors cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center mb-1.5">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-blue-950 block leading-tight">
                  Projetos apoiados
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToSubTab?.('participacao')}
                className="p-3 rounded-xl bg-amber-50/60 hover:bg-amber-50 border border-amber-100 text-left transition-colors cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center mb-1.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-amber-950 block leading-tight">
                  Ideias submetidas
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab?.('eventos')}
                className="p-3 rounded-xl bg-purple-50/60 hover:bg-purple-50 border border-purple-100 text-left transition-colors cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-100/80 text-purple-700 flex items-center justify-center mb-1.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-purple-950 block leading-tight">
                  Eventos inscritos
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
