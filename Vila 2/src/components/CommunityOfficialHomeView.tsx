import React, { useState } from 'react';
import {
  Globe,
  Users,
  Handshake,
  Star,
  ArrowRight,
  Plus,
  Brain,
  Rocket,
  Building2,
  Calendar,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  Flame,
  Clock,
  Briefcase,
  Target,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  Leaf,
  Cpu,
  GraduationCap,
} from 'lucide-react';

export interface CommunityOfficialHomeViewProps {
  onNavigateToAmbiente?: () => void;
  onNavigateToEducacao?: () => void;
  onNavigateToExplorarComunidade?: () => void;
  onNavigateToTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenCreateCommunityModal?: () => void;
}

// 4 Métricas Principais do Topo
interface TopMetric {
  id: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  changeText: string;
  changeColor: string;
}

const TOP_METRICS: TopMetric[] = [
  {
    id: 'membros',
    icon: Users,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-[#10B981]',
    value: '7.842.521',
    label: 'Membros ativos',
    changeText: '+12.5% este mês',
    changeColor: 'text-[#10B981]',
  },
  {
    id: 'paises',
    icon: Globe,
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#3D4ED8]',
    value: '195',
    label: 'Países representados',
    changeText: '+4 desde ontem',
    changeColor: 'text-[#3D4ED8]',
  },
  {
    id: 'comunidades',
    icon: Handshake,
    iconBg: 'bg-purple-50',
    iconColor: 'text-[#8B5CF6]',
    value: '45.230',
    label: 'Comunidades',
    changeText: '+320 este mês',
    changeColor: 'text-[#8B5CF6]',
  },
  {
    id: 'interacoes',
    icon: Star,
    iconBg: 'bg-amber-50',
    iconColor: 'text-[#F59E0B]',
    value: '2.1M',
    label: 'Interações hoje',
    changeText: '+18.4% hoje',
    changeColor: 'text-[#F59E0B]',
  },
];

// Comunidades em destaque da Página Oficial
interface FeaturedCommunityItem {
  id: string;
  name: string;
  badge: string;
  badgeBg: string;
  image: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconBorderColor: string;
  members: string;
  status: string;
  description: string;
  avatars: string[];
  extraAvatars: string;
  isAmbiente?: boolean;
}

const OFFICIAL_FEATURED_COMMUNITIES: FeaturedCommunityItem[] = [
  {
    id: 'acao-climatica',
    name: 'Ação Climática Global',
    badge: 'AMBIENTE',
    badgeBg: 'bg-[#10B981]',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=600&auto=format&fit=crop&q=80',
    icon: Leaf,
    iconBorderColor: 'border-emerald-200 text-[#059669]',
    members: '128.540 membros',
    status: 'Ativa',
    description: 'Unindo vozes e soluções para proteger o nosso planeta.',
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+3.2K',
    isAmbiente: true,
  },
  {
    id: 'inovacao-tecnologia',
    name: 'Inovação & Tecnologia',
    badge: 'TECNOLOGIA',
    badgeBg: 'bg-[#6366F1]',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    icon: Cpu,
    iconBorderColor: 'border-indigo-200 text-[#6366F1]',
    members: '96.432 membros',
    status: 'Ativa',
    description: 'Explorando o futuro da tecnologia para o bem da humanidade.',
    avatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+2.1K',
  },
  {
    id: 'educacao-fronteiras',
    name: 'Educação Sem Fronteiras',
    badge: 'EDUCAÇÃO',
    badgeBg: 'bg-[#D97706]',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
    icon: GraduationCap,
    iconBorderColor: 'border-amber-200 text-[#D97706]',
    members: '78.911 membros',
    status: 'Ativa',
    description: 'Educação inclusiva e de qualidade para transformar vidas.',
    avatars: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+1.8K',
  },
  {
    id: 'direitos-humanos',
    name: 'Direitos Humanos',
    badge: 'DIREITOS HUMANOS',
    badgeBg: 'bg-[#DC2626]',
    image: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=600&auto=format&fit=crop&q=80',
    icon: Heart,
    iconBorderColor: 'border-red-200 text-[#DC2626]',
    members: '64.231 membros',
    status: 'Ativa',
    description: 'Promovendo dignidade, igualdade e justiça para todos.',
    avatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
    ],
    extraAvatars: '+1.8K',
  },
];

// Membros em destaque
interface FeaturedMemberItem {
  id: string;
  name: string;
  location: string;
  role: string;
  avatar: string;
}

const FEATURED_MEMBERS: FeaturedMemberItem[] = [
  {
    id: 'm-1',
    name: 'Dr. Amina Hassan',
    location: 'Quénia',
    role: 'Ativista Global',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'm-2',
    name: 'Carlos Méndez',
    location: 'Espanha',
    role: 'Empreendedor Social',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'm-3',
    name: 'Li Wei',
    location: 'Singapura',
    role: 'Especialista em IA',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
];

// Próximos Eventos
interface CommunityEventItem {
  id: string;
  day: string;
  month: string;
  title: string;
  dateTime: string;
  location: string;
}

const COMMUNITY_EVENTS: CommunityEventItem[] = [
  {
    id: 'e-1',
    day: '22',
    month: 'MAI',
    title: 'Webinar: Justiça Climática',
    dateTime: '22 Mai 2024 • 15:00 (GMT)',
    location: 'Online',
  },
  {
    id: 'e-2',
    day: '25',
    month: 'MAI',
    title: 'Diálogo Intercultural',
    dateTime: '25 Mai 2024 • 10:00 (GMT)',
    location: 'Online',
  },
  {
    id: 'e-3',
    day: '30',
    month: 'MAI',
    title: 'Inovação para o Bem',
    dateTime: '30 Mai 2024 • 14:00 (GMT)',
    location: 'Online',
  },
];

export const CommunityOfficialHomeView: React.FC<CommunityOfficialHomeViewProps> = ({
  onNavigateToAmbiente,
  onNavigateToEducacao,
  onNavigateToExplorarComunidade,
  onNavigateToTab,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenCreateCommunityModal,
}) => {
  // Filtros de Feed
  const [activeFeedTab, setActiveFeedTab] = useState<string>('para-si');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set(['post-1']));
  const [followingMembers, setFollowingMembers] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());

  // Toggle Like
  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  // Toggle Follow
  const toggleFollow = (memberId: string) => {
    setFollowingMembers((prev) => {
      const next = new Set(prev);
      if (next.has(memberId)) next.delete(memberId);
      else next.add(memberId);
      return next;
    });
  };

  return (
    <div id="comunidade-global-official-view" className="w-full bg-[#F8FAFC] min-h-screen text-[#0F172A] flex flex-col">
      {/* Conteúdo Principal (a busca/idioma/notificações/perfil já vêm do Topbar compartilhado no AppLayout) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* 2. Cabeçalho Principal com Título e Subtítulo */}
        <header className="flex flex-col gap-1.5">
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight font-['Outfit'] leading-tight">
            Comunidade Global
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl font-normal leading-relaxed">
            Conecte-se com pessoas, organizações e comunidades <br className="hidden sm:inline" />
            de todo o mundo. Compartilhe ideias, colabore e gere impacto.
          </p>
        </header>

        {/* 3. Quatro Indicadores Estatísticos Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOP_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex items-center gap-4 hover:border-slate-300 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${metric.iconBg} ${metric.iconColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-2xl font-extrabold text-[#0F172A] font-['Outfit'] tracking-tight leading-none mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold text-[#64748B] mb-0.5 leading-tight">
                    {metric.label}
                  </div>
                  <div className={`text-[11px] font-bold ${metric.changeColor}`}>
                    {metric.changeText}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Grade Dividida: Coluna Central (Hero, Comunidades, Feed) e Coluna Lateral (Tendências, Membros, Eventos) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUNA CENTRAL (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* HERO BANNER: "Um mundo de pessoas com um propósito." */}
            <section
              id="hero-official-community-banner"
              className="relative rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[280px] flex items-center p-6 sm:p-10 text-white shadow-md border border-slate-900/10 bg-[#030718]"
            >
              {/* Imagem de Fundo: Terra vista do espaço com conexões douradas e digitais */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=85"
                  alt="Terra vista do espaço"
                  className="w-full h-full object-cover object-right opacity-90 scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030718] via-[#030c24]/90 to-transparent" />
                <div className="absolute right-10 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
              </div>

              {/* Textos e Botões do Hero */}
              <div className="relative z-10 max-w-xl flex flex-col gap-2.5">
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white leading-tight font-['Outfit'] tracking-tight">
                  Um mundo de pessoas <br />
                  com um propósito.
                </h2>
                <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal max-w-md">
                  Troque experiências, colabore em projetos <br className="hidden sm:inline" />
                  e faça parte da mudança global.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  {/* Botão "Explorar Comunidades" que direciona para a página Explorar Comunidade */}
                  <button
                    type="button"
                    onClick={onNavigateToExplorarComunidade || onNavigateToAmbiente}
                    id="btn-explorar-comunidades-hero"
                    className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#0052FF] via-[#0088FF] to-[#00D285] hover:opacity-95 text-white text-xs sm:text-[13px] font-bold transition-all shadow-md hover:shadow-lg cursor-pointer group"
                  >
                    <span>Explorar Comunidades</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform stroke-[2.4]" />
                  </button>

                  {/* Botão "Criar Comunidade +" */}
                  <button
                    type="button"
                    onClick={onOpenCreateCommunityModal}
                    id="btn-criar-comunidade-hero"
                    className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-[13px] font-semibold transition-all border border-white/25 backdrop-blur-md cursor-pointer"
                  >
                    <div className="w-4 h-4 rounded-full border border-white/80 flex items-center justify-center text-[11px] leading-none shrink-0 font-bold">
                      +
                    </div>
                    <span>Criar Comunidade +</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Seção: Comunidades em destaque (4 Cards com botão Ver todas) */}
            <section id="comunidades-destaque-official" className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Comunidades em destaque
                </h3>
                <button
                  type="button"
                  onClick={onNavigateToExplorarComunidade || onNavigateToAmbiente}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:underline cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid de 4 Cards com Slider Button */}
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {OFFICIAL_FEATURED_COMMUNITIES.map((comm) => {
                    const CardIcon = comm.icon;

                    return (
                      <article
                        key={comm.id}
                        onClick={() => {
                          if (comm.isAmbiente && onNavigateToAmbiente) {
                            onNavigateToAmbiente();
                          } else if (comm.id === 'educacao-fronteiras' && onNavigateToEducacao) {
                            onNavigateToEducacao();
                          }
                        }}
                        className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col cursor-pointer group"
                      >
                        {/* Imagem do Card com Badge */}
                        <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                          <img
                            src={comm.image}
                            alt={comm.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <span
                            className={`absolute top-2 left-2 text-[8.5px] font-black text-white uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs ${comm.badgeBg}`}
                          >
                            {comm.badge}
                          </span>

                          {/* Ícone Redondo Flutuante */}
                          <div
                            className={`absolute -bottom-3 left-3 w-7 h-7 rounded-full bg-white border flex items-center justify-center shadow-xs ${comm.iconBorderColor}`}
                          >
                            <CardIcon className="w-4 h-4" strokeWidth={2.4} />
                          </div>
                        </div>

                        {/* Conteúdo */}
                        <div className="p-3 pt-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-[#0F172A] font-['Outfit'] line-clamp-1 group-hover:text-blue-600 transition-colors">
                              {comm.name}
                            </h4>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1.5">
                              <span>{comm.members}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                {comm.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 line-clamp-2 leading-tight mb-2.5">
                              {comm.description}
                            </p>
                          </div>

                          {/* Rodapé com Stack de Avatares */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex -space-x-1.5 overflow-hidden">
                              {comm.avatars.slice(0, 5).map((av, idx) => (
                                <img
                                  key={idx}
                                  src={av}
                                  alt="Membro"
                                  className="inline-block h-4.5 w-4.5 rounded-full ring-1 ring-white object-cover"
                                />
                              ))}
                            </div>
                            <span className="text-[10px] font-bold text-slate-500">
                              {comm.extraAvatars}
                            </span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Seta '>' */}
                <button
                  type="button"
                  onClick={onNavigateToExplorarComunidade || onNavigateToAmbiente}
                  title="Explorar mais comunidades"
                  className="hidden xl:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer z-10 transition-transform hover:scale-105"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* Fita de Filtros do Feed */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pt-1">
              <div className="flex items-center gap-2">
                {[
                  { id: 'para-si', label: 'Para si', icon: Star },
                  { id: 'seguindo', label: 'Seguindo', icon: Users },
                  { id: 'populares', label: 'Populares', icon: Flame },
                  { id: 'novas', label: 'Novas', icon: Clock },
                  { id: 'discussoes', label: 'Discussões', icon: MessageSquare },
                  { id: 'projetos', label: 'Projetos', icon: Briefcase },
                  { id: 'oportunidades', label: 'Oportunidades', icon: Target },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeFeedTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveFeedTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-[#3D4ED8] text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" strokeWidth={2.2} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Botão Filtros */}
              <button
                type="button"
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold shrink-0 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filtros</span>
              </button>
            </div>

            {/* Post em Destaque do Feed (Ana Silva - Soluções locais para um impacto global) */}
            <article className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
                    alt="Ana Silva"
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#0F172A]">Ana Silva</h4>
                      <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Verificado
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Membro em Ação Climática Global • Há 2 horas
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Conteúdo Textual do Post */}
              <div>
                <h5 className="text-sm font-bold text-[#0F172A] font-['Outfit'] mb-1">
                  Soluções locais para um impacto global
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Partilho convosco uma iniciativa da nossa comunidade que está a transformar resíduos plásticos em material de construção sustentável. Vamos escalar esta solução!
                </p>
                {/* Hashtags */}
                <div className="flex flex-wrap gap-2 mt-2 text-[11px] font-semibold text-[#0066FF]">
                  <span className="cursor-pointer hover:underline">#Sustentabilidade</span>
                  <span className="cursor-pointer hover:underline">#Inovação</span>
                  <span className="cursor-pointer hover:underline">#Comunidade</span>
                </div>
              </div>

              {/* Imagem do Post: Jovens plantando mudas na terra */}
              <div className="rounded-xl overflow-hidden max-h-[300px] w-full bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&auto=format&fit=crop&q=85"
                  alt="Iniciativa sustentável no terreno"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Rodapé de Interações (Like, Comentário, Partilha, Salvar) */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => toggleLike('post-1')}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                      likedPosts.has('post-1') ? 'text-rose-600' : 'hover:text-slate-700'
                    }`}
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={likedPosts.has('post-1') ? 'currentColor' : 'none'}
                    />
                    <span>{likedPosts.has('post-1') ? 343 : 342}</span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>56</span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>28</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSavedPosts((prev) => {
                      const next = new Set(prev);
                      if (next.has('post-1')) next.delete('post-1');
                      else next.add('post-1');
                      return next;
                    });
                  }}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    savedPosts.has('post-1') ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Guardar publicação"
                >
                  <Bookmark className="w-4 h-4" fill={savedPosts.has('post-1') ? 'currentColor' : 'none'} />
                </button>
              </div>
            </article>
          </div>

          {/* COLUNA LATERAL DIREITA (lg:col-span-4) */}
          <aside className="lg:col-span-4 flex flex-col gap-4">
            {/* 1. Card: Comunidades em tendência */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit']">
                  Comunidades em tendência
                </h3>
                <button
                  type="button"
                  onClick={onNavigateToExplorarComunidade || onNavigateToAmbiente}
                  className="text-[11px] font-bold text-[#0066FF] hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100">
                {[
                  { rank: 1, name: 'Saúde Mental Global', members: '45.2K membros', growth: '▲ 18%', icon: Brain, bg: 'bg-pink-50', color: 'text-pink-600' },
                  {
                    rank: 2,
                    name: 'Mulheres que Inspiram',
                    members: '38.7K membros',
                    growth: '▲ 15%',
                    icon: () => (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-4 h-4">
                        <circle cx="12" cy="8.5" r="5" />
                        <path d="M12 13.5v7.5" />
                        <path d="M8.5 17.5h7" />
                      </svg>
                    ),
                    bg: 'bg-orange-50',
                    color: 'text-orange-600',
                  },
                  {
                    rank: 3,
                    name: 'Energia Renovável',
                    members: '32.1K membros',
                    growth: '▲ 12%',
                    icon: () => (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-4 h-4">
                        <path d="M12 2.5v19" />
                        <path d="M4 11.5l8-4.5 8 4.5" />
                        <path d="M8 19l4-2.5 4 2.5" />
                      </svg>
                    ),
                    bg: 'bg-sky-50',
                    color: 'text-sky-600',
                  },
                  { rank: 4, name: 'Empreendedorismo Social', members: '28.9K membros', growth: '▲ 10%', icon: Rocket, bg: 'bg-purple-50', color: 'text-purple-600' },
                  { rank: 5, name: 'Cidades Sustentáveis', members: '26.3K membros', growth: '▲ 9%', icon: Building2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={t.rank}
                      onClick={onNavigateToExplorarComunidade || onNavigateToAmbiente}
                      className="py-2.5 flex items-center justify-between gap-2 hover:bg-slate-50/80 px-1 rounded-lg transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xs font-bold text-slate-400 w-3 shrink-0">
                          {t.rank}
                        </span>
                        <div className={`w-7 h-7 rounded-lg ${t.bg} ${t.color} flex items-center justify-center shrink-0`}>
                          <Icon className="w-4 h-4" strokeWidth={2.2} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-[#0F172A] truncate group-hover:text-blue-600 transition-colors">
                            {t.name}
                          </h4>
                          <span className="text-[10.5px] text-slate-500 block truncate">
                            {t.members}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#10B981] shrink-0">
                        {t.growth}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Card: Membros em destaque */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit']">
                  Membros em destaque
                </h3>
                <button
                  type="button"
                  className="text-[11px] font-bold text-[#0066FF] hover:underline cursor-pointer"
                >
                  Ver todos →
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100">
                {FEATURED_MEMBERS.map((m) => {
                  const isFollowing = followingMembers.has(m.id);

                  return (
                    <div key={m.id} className="py-2.5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={m.avatar}
                          alt={m.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-[#0F172A] truncate">
                            {m.name}
                          </h4>
                          <p className="text-[10.5px] text-slate-500 truncate">
                            {m.location} • {m.role}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFollow(m.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isFollowing
                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            : 'bg-[#3D4ED8]/10 text-[#3D4ED8] hover:bg-[#3D4ED8] hover:text-white'
                        }`}
                      >
                        {isFollowing ? 'A seguir' : 'Seguir'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Card: Próximos eventos da comunidade */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit']">
                  Próximos eventos da comunidade
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigateToTab && onNavigateToTab('eventos')}
                  className="text-[11px] font-bold text-[#0066FF] hover:underline cursor-pointer"
                >
                  Ver todas →
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100">
                {COMMUNITY_EVENTS.map((evt) => (
                  <div key={evt.id} className="py-2.5 flex items-center gap-3">
                    {/* Badge de Data com Dia e Mês */}
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-bold text-rose-500 uppercase leading-none">
                        {evt.month}
                      </span>
                      <span className="text-sm font-black text-slate-800 leading-none mt-0.5 font-['Outfit']">
                        {evt.day}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-[#0F172A] truncate">
                        {evt.title}
                      </h4>
                      <p className="text-[10.5px] text-slate-500 truncate">
                        {evt.dateTime}
                      </p>
                      <span className="text-[9.5px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {evt.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Botão Flutuante VILA AI (Canto Inferior Direito) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={onOpenAiAssistant}
          id="floating-vila-ai-btn"
          className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#3D4ED8] to-[#2D3BA8] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          title="Assistente VILA AI"
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span className="text-[9px] font-bold mt-0.5 tracking-wider">VILA AI</span>
        </button>
      </div>
    </div>
  );
};

export default CommunityOfficialHomeView;
