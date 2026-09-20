import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  ShieldCheck,
  MapPin,
  Heart,
  Compass,
  Sparkles,
  Users,
  Lightbulb,
  Award,
  ChevronRight,
  Sliders,
  CreditCard,
  Shield,
  Lock,
  Key,
  Laptop,
  Smartphone,
  Check,
  ArrowRight,
  Eye,
  Download,
  Share2,
  SlidersHorizontal,
  Sprout,
  Star,
  Crown,
} from 'lucide-react';
import { PerfilVilaTabId } from './types';
import { VilaPerfilTab } from './VilaPerfilTab';
import { IdentidadeVilaTab } from './IdentidadeVilaTab';
import { TerritoriosTab } from './TerritoriosTab';
import { InteressesVisaoGeralTab } from './InteressesVisaoGeralTab';
import { InteressesTemasTab } from './InteressesTemasTab';
import { InteressesCausasTab } from './InteressesCausasTab';
import { InteressesComunidadesTab } from './InteressesComunidadesTab';
import { InteressesOportunidadesTab } from './InteressesOportunidadesTab';
import { BreadcrumbItem } from '../Topbar';
import { DemoUser } from '../../data/demoUsers';

interface PerfilVilaViewProps {
  initialTab?: PerfilVilaTabId;
  currentUser?: DemoUser;
  onNavigateToTab?: (tabId: string) => void;
  onOpenAiAssistant?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

export const PerfilVilaView: React.FC<PerfilVilaViewProps> = ({
  initialTab = 'perfil',
  currentUser,
  onNavigateToTab,
  onOpenAiAssistant,
  onOpenAuth,
  onBreadcrumbChange,
}) => {
  const [activeTab, setActiveTab] = useState<PerfilVilaTabId>(initialTab);

  // Sincroniza initialTab se alterado externamente
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Definição das abas principais mostradas no cabeçalho
  const tabs: { id: PerfilVilaTabId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'identidade', label: 'Identidade VILA', icon: ShieldCheck },
    { id: 'territorios', label: 'Territórios', icon: MapPin },
    { id: 'interesses-geral', label: 'Interesses', icon: Heart },
    { id: 'participacao', label: 'Participação', icon: Users },
    { id: 'conquistas', label: 'Conquistas', icon: Award },
    { id: 'assinaturas', label: 'Assinaturas', icon: CreditCard },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'privacidade', label: 'Privacidade', icon: Lock },
  ];

  // Metadados dinâmicos por aba
  const tabMetadata: Record<
    PerfilVilaTabId,
    { title: string; subtitle: string; breadcrumb: string }
  > = {
    perfil: {
      title: 'A Minha Conta',
      subtitle: 'Gerencie o seu perfil, preferências e participação na VILA.',
      breadcrumb: 'Perfil',
    },
    identidade: {
      title: 'Identidade VILA',
      subtitle: 'Esta é a sua identidade cívica global na VILA.',
      breadcrumb: 'Identidade VILA',
    },
    territorios: {
      title: 'Os Meus Territórios',
      subtitle: 'Gerencie os territórios onde participa, contribui e gera impacto.',
      breadcrumb: 'Territórios',
    },
    'interesses-geral': {
      title: 'Interesses e Causas',
      subtitle: 'Os seus interesses conectam-no a comunidades, territórios, projetos e oportunidades para gerar impacto positivo.',
      breadcrumb: 'Interesses e Causas',
    },
    participacao: {
      title: 'Participação Cívica',
      subtitle: 'Histórico e resumo das suas consultas, apoios e contribuições nos territórios.',
      breadcrumb: 'Participação',
    },
    conquistas: {
      title: 'As Minhas Conquistas',
      subtitle: 'Medalhas, níveis e reconhecimento pelo seu contributo e cidadania ativa.',
      breadcrumb: 'Conquistas',
    },
    assinaturas: {
      title: 'Assinaturas e Planos',
      subtitle: 'Gerencie o seu plano VILA Premium, benefícios ativos e faturas.',
      breadcrumb: 'Assinaturas',
    },
    seguranca: {
      title: 'Segurança da Conta',
      subtitle: 'Controle palavras-passe, autenticação de dois fatores e sessões ativas.',
      breadcrumb: 'Segurança',
    },
    privacidade: {
      title: 'Privacidade e Dados',
      subtitle: 'Gerencie a visibilidade do seu perfil e o controlo sobre os seus dados pessoais.',
      breadcrumb: 'Privacidade',
    },
    'interesses-temas': {
      title: 'Interesses e Causas — Temas',
      subtitle: 'Escolha os temas que o movem e personalize a sua experiência na VILA.',
      breadcrumb: 'Temas',
    },
    'interesses-causas': {
      title: 'Causas que Apoio',
      subtitle: 'Apoie as causas que mais importam para si e receba informações e oportunidades.',
      breadcrumb: 'Causas',
    },
    'interesses-comunidades': {
      title: 'Comunidades que Faço Parte',
      subtitle: 'Participe nas comunidades que partilham os seus interesses e causas.',
      breadcrumb: 'Comunidades',
    },
    'interesses-oportunidades': {
      title: 'Oportunidades para Agir',
      subtitle: 'Descubra oportunidades alinhadas com os seus interesses e causas.',
      breadcrumb: 'Oportunidades',
    },
  };

  const onBreadcrumbChangeRef = useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;
  const onNavigateToTabRef = useRef(onNavigateToTab);
  onNavigateToTabRef.current = onNavigateToTab;

  // Atualiza breadcrumb global
  useEffect(() => {
    onBreadcrumbChangeRef.current?.([
      { label: 'Início', onClick: () => onNavigateToTabRef.current?.('inicio') },
      { label: 'A Minha Conta', onClick: () => setActiveTab('perfil') },
      { label: tabMetadata[activeTab].breadcrumb },
    ]);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* 1. Header do Perfil VILA (Alinhado visualmente com as outras páginas administrativas e de módulo) */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-700 sticky top-14 z-20 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 space-y-4">
          {/* Título, Subtítulo e Telemetria */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#EDE9FE]/80 border border-purple-200/60 dark:border-purple-800/40 flex items-center justify-center text-[#5B21B6] shrink-0 shadow-2xs">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-[28px] font-bold text-[#0F172A] dark:text-slate-50 font-sans tracking-tight">
                  {tabMetadata[activeTab].title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mt-0.5 leading-relaxed">
                  {tabMetadata[activeTab].subtitle}
                </p>
              </div>
            </div>

            {/* Badges de Status / Ações */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Identidade Verificada</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800/40 text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>Nível Embaixadora</span>
              </div>
            </div>
          </div>

          {/* Barra de Navegação das Abas */}
          <div className="border-t border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 sm:gap-4 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-2.5 flex items-center gap-2 text-xs sm:text-[13px] font-semibold transition-all relative cursor-pointer ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span>{tab.label}</span>

                    {/* Linha azul sublinhada para aba ativa */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Conteúdo da Aba Ativa */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6">
        {activeTab === 'perfil' && (
          <VilaPerfilTab
            currentUser={currentUser}
            onNavigateToSubTab={(subTab) => setActiveTab(subTab)}
            onOpenAiAssistant={onOpenAiAssistant}
            onNavigateToTab={onNavigateToTab}
          />
        )}
        {activeTab === 'identidade' && (
          <IdentidadeVilaTab
            currentUser={currentUser}
            onNavigateToTab={onNavigateToTab}
            onNavigateToSubTab={(subTab) => setActiveTab(subTab)}
          />
        )}
        {activeTab === 'territorios' && (
          <TerritoriosTab onNavigateToTab={onNavigateToTab} />
        )}
        {activeTab === 'interesses-geral' && (
          <InteressesVisaoGeralTab onNavigateToTab={onNavigateToTab} />
        )}
        {activeTab === 'interesses-temas' && (
          <InteressesTemasTab onNavigateToTab={onNavigateToTab} />
        )}
        {activeTab === 'interesses-causas' && (
          <InteressesCausasTab onNavigateToTab={onNavigateToTab} />
        )}
        {activeTab === 'interesses-comunidades' && (
          <InteressesComunidadesTab onNavigateToTab={onNavigateToTab} />
        )}
        {activeTab === 'interesses-oportunidades' && (
          <InteressesOportunidadesTab onNavigateToTab={onNavigateToTab} />
        )}

        {/* Aba Participação Cívica */}
        {activeTab === 'participacao' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Consultas</span>
                <div className="text-2xl font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-1">34</div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">+6 este mês</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Comentários</span>
                <div className="text-2xl font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-1">21</div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">100% construtivos</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Projetos Apoiados</span>
                <div className="text-2xl font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-1">56</div>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">4 municípios</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Ideias Aprovadas</span>
                <div className="text-2xl font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-1">4 / 12</div>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">33% taxa de aprovação</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50 mb-4 font-sans">Histórico de Atividade Recente</h3>
              <div className="space-y-3">
                {[
                  { title: 'Votação no Orçamento Participativo de Faro 2026', type: 'Voto Registado', date: 'Há 2 dias', badge: 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800/40' },
                  { title: 'Apoio à proposta de Ciclovia Urbana Faro-Olhão', type: 'Projeto Apoiado', date: 'Há 5 dias', badge: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40' },
                  { title: 'Comentário técnico sobre Eficiência Hídrica no Algarve', type: 'Comentário', date: 'Há 1 semana', badge: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40' },
                  { title: 'Submissão de ideia para Hortas Comunitárias na Penha', type: 'Ideia Submetida', date: 'Há 2 semanas', badge: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div>
                      <h4 className="text-sm font-semibold text-[#0F172A] dark:text-slate-50">{item.title}</h4>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{item.date}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.badge}`}>
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Aba Conquistas */}
        {activeTab === 'conquistas' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] text-white p-6 rounded-2xl shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-200">Nível Atual</span>
                  <h2 className="text-2xl font-bold font-sans mt-1">Embaixadora da Comunidade</h2>
                  <p className="text-sm text-purple-100 mt-1">Faltam 550 XP para alcançar o nível Líder Global</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-3xl font-bold font-sans">2.450 XP</div>
                  <span className="text-xs text-purple-200">Total acumulado</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: 'Semente', desc: 'Primeiros passos na cidadania ativa', status: 'Conquistada', icon: Sprout, iconColor: 'text-emerald-600 dark:text-emerald-400', color: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40' },
                { name: 'Guardião', desc: 'Cuida da comunidade e protege recursos', status: 'Conquistada', icon: ShieldCheck, iconColor: 'text-emerald-600 dark:text-emerald-400', color: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40' },
                { name: 'Embaixador', desc: 'Impacto reconhecido em múltiplos territórios', status: 'Conquistada', icon: Star, iconColor: 'text-amber-600 dark:text-amber-400', color: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40' },
                { name: 'Líder Comunitário', desc: 'Lidera pelo exemplo e mobiliza', status: 'Em progresso (80%)', icon: Users, iconColor: 'text-purple-600 dark:text-purple-400', color: 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800/40' },
                { name: 'Lenda VILA', desc: 'Máximo reconhecimento cívico e impacto perene', status: 'Em progresso (25%)', icon: Crown, iconColor: 'text-slate-500 dark:text-slate-400', color: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700' },
              ].map((badge, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)] text-center flex flex-col justify-between">
                  <div>
                    <badge.icon className={`w-8 h-8 mx-auto mb-2 ${badge.iconColor}`} strokeWidth={1.8} />
                    <h4 className="font-bold text-[#0F172A] dark:text-slate-50">{badge.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{badge.desc}</p>
                  </div>
                  <span className={`mt-4 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badge.color}`}>
                    {badge.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Aba Assinaturas */}
        {activeTab === 'assinaturas' && (
          <div className="max-w-4xl space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Plano Ativo</span>
                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-slate-50 font-sans mt-0.5">VILA Premium (Anual)</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Renovação automática em 12 de maio de 2026</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 font-bold text-xs">
                  Ativa
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Benefícios Incluídos</h4>
                  <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Acesso a projetos exclusivos</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Relatórios avançados de impacto territorial</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Prioridade em sessões de co-criação</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Assistente VILA AI ilimitado</div>
                  </div>
                </div>
                <div className="flex flex-col justify-end gap-2">
                  <button className="py-2.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors cursor-pointer">
                    Mudar de Plano
                  </button>
                  <button className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    Ver Histórico de Faturas
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Aba Segurança */}
        {activeTab === 'seguranca' && (
          <div className="max-w-4xl space-y-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
              <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">Credenciais e Autenticação</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    <div>
                      <h4 className="text-sm font-semibold text-[#0F172A] dark:text-slate-50">Palavra-passe</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Última alteração há 30 dias</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white cursor-pointer">
                    Alterar
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <h4 className="text-sm font-semibold text-[#0F172A] dark:text-slate-50">Autenticação de Dois Fatores (2FA)</h4>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Ativada via Authenticator App</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white cursor-pointer">
                    Gerir
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <Laptop className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    <div>
                      <h4 className="text-sm font-semibold text-[#0F172A] dark:text-slate-50">Sessões Ativas</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">3 dispositivos com sessão iniciada atualmente</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800/40 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer">
                    Terminar Outras Sessões
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Aba Privacidade */}
        {activeTab === 'privacidade' && (
          <div className="max-w-4xl space-y-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-4">
              <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-50 font-sans">Visibilidade e Dados</h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    <div>
                      <h4 className="text-sm font-semibold text-[#0F172A] dark:text-slate-50">Visibilidade do Perfil</h4>
                      <p className="text-slate-500 dark:text-slate-400">Visível para outros cidadãos na comunidade VILA</p>
                    </div>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Público</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    <div>
                      <h4 className="text-sm font-semibold text-[#0F172A] dark:text-slate-50">Descarregar os Meus Dados (RGPD)</h4>
                      <p className="text-slate-500 dark:text-slate-400">Exportar cópia integral de participações e dados da conta</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                    Exportar JSON
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
