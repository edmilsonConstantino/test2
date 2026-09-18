import React, { useState, useEffect } from 'react';
import {
  Compass,
  Leaf,
  Cpu,
  GraduationCap,
  Scale,
  HeartPulse,
  Rocket,
  Palette,
  MoreHorizontal,
  LayoutGrid,
  Users,
  Globe,
  Globe2,
  Package,
  Search,
  X,
  PawPrint,
  Plane,
  Sparkles,
  Trophy,
  FlaskConical,
  Landmark,
  DollarSign,
  MessageSquare,
  Gamepad2,
  Utensils,
  Shirt,
  Clapperboard,
  Music,
  Drama,
  ArrowRight,
  Plus,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Camera,
  Heart,
  Dumbbell,
  Check,
} from 'lucide-react';
import { BreadcrumbItem } from './Topbar';

export interface CommunityMoreCategoriesViewProps {
  onBackToOfficial: () => void;
  onNavigateToCategory?: (category: string) => void;
  onNavigateToTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenCreateCommunity?: () => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

// Fita de Categorias Principal
const CATEGORIES_RIBBON = [
  { id: 'todas', label: 'Todas', icon: Compass },
  { id: 'ambiente', label: 'Ambiente', icon: Leaf },
  { id: 'tecnologia', label: 'Tecnologia', icon: Cpu },
  { id: 'educacao', label: 'Educação', icon: GraduationCap },
  { id: 'direitos-humanos', label: 'Direitos Humanos', icon: Scale },
  { id: 'saude', label: 'Saúde', icon: HeartPulse },
  { id: 'empreendedorismo', label: 'Empreendedorismo', icon: Rocket },
  { id: 'cultura', label: 'Cultura', icon: Palette },
  { id: 'mais', label: 'Mais', icon: MoreHorizontal },
];

// 15 Categorias Principais para o Grid (14 temáticas + 1 especial)
interface ExtraCategoryTile {
  id: string;
  name: string;
  description: string;
  count: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  isSpecial?: boolean;
}

const EXTRA_CATEGORIES_TILES: ExtraCategoryTile[] = [
  {
    id: 'animais-natureza',
    name: 'Animais & Natureza',
    description: 'Comunidades sobre animais, fauna, flora e conservação.',
    count: '312 comunidades',
    icon: PawPrint,
    iconBg: 'bg-[#10B981]',
  },
  {
    id: 'viagens-turismo',
    name: 'Viagens & Turismo',
    description: 'Explore destinos, dicas de viagens e experiências.',
    count: '285 comunidades',
    icon: Plane,
    iconBg: 'bg-[#0066FF]',
  },
  {
    id: 'espiritualidade',
    name: 'Espiritualidade',
    description: 'Crescimento espiritual, meditação e bem-estar.',
    count: '198 comunidades',
    icon: Sparkles,
    iconBg: 'bg-[#8B5CF6]',
  },
  {
    id: 'esportes-lazer',
    name: 'Esportes & Lazer',
    description: 'Esportes, fitness, aventuras e qualidade de vida.',
    count: '376 comunidades',
    icon: Trophy,
    iconBg: 'bg-[#EA580C]',
  },
  {
    id: 'ciencia-pesquisa',
    name: 'Ciência & Pesquisa',
    description: 'Discussões científicas, pesquisa e inovação.',
    count: '142 comunidades',
    icon: FlaskConical,
    iconBg: 'bg-[#0EA5E9]',
  },
  {
    id: 'politica-sociedade',
    name: 'Política & Sociedade',
    description: 'Debates, políticas públicas e cidadania ativa.',
    count: '164 comunidades',
    icon: Landmark,
    iconBg: 'bg-[#3B82F6]',
  },
  {
    id: 'economia-financas',
    name: 'Economia & Finanças',
    description: 'Investimentos, economia, finanças pessoais e mais.',
    count: '221 comunidades',
    icon: DollarSign,
    iconBg: 'bg-[#059669]',
  },
  {
    id: 'design-criatividade',
    name: 'Design & Criatividade',
    description: 'Design, arte digital, UI/UX, fotografia e criatividade.',
    count: '314 comunidades',
    icon: Palette,
    iconBg: 'bg-[#EC4899]',
  },
  {
    id: 'idiomas-culturas',
    name: 'Idiomas & Culturas',
    description: 'Aprenda idiomas e compartilhe culturas do mundo.',
    count: '267 comunidades',
    icon: MessageSquare,
    iconBg: 'bg-[#3D4ED8]',
  },
  {
    id: 'games-tecnologia',
    name: 'Games & Tecnologia',
    description: 'Jogos, eSports, gadgets e tecnologia em geral.',
    count: '508 comunidades',
    icon: Gamepad2,
    iconBg: 'bg-[#6366F1]',
  },
  {
    id: 'alimentacao-culinaria',
    name: 'Alimentação & Culinária',
    description: 'Receitas, culinária, nutrição e gastronomia.',
    count: '173 comunidades',
    icon: Utensils,
    iconBg: 'bg-[#D97706]',
  },
  {
    id: 'moda-estilo',
    name: 'Moda & Estilo',
    description: 'Moda, beleza, tendências e estilo de vida.',
    count: '156 comunidades',
    icon: Shirt,
    iconBg: 'bg-[#E11D48]',
  },
  {
    id: 'cinema-entretenimento',
    name: 'Cinema & Entretenimento',
    description: 'Filmes, séries, animações e entretenimento.',
    count: '289 comunidades',
    icon: Clapperboard,
    iconBg: 'bg-[#7C3AED]',
  },
  {
    id: 'musica-artes',
    name: 'Música & Artes',
    description: 'Música, instrumentos, artes e produção musical.',
    count: '340 comunidades',
    icon: Music,
    iconBg: 'bg-[#10B981]',
  },
  {
    id: 'ver-mais',
    name: 'Ver mais categorias',
    description: 'Descubra ainda mais áreas de interesse.',
    count: 'Explorar tudo →',
    icon: LayoutGrid,
    iconBg: 'bg-slate-100 text-blue-600',
    isSpecial: true,
  },
];

// Dados da Barra Lateral: Categorias mais populares
interface PopularCultureItem {
  rank: number;
  id: string;
  name: string;
  members: string;
  growth: string;
  iconBg: string;
  icon: React.ComponentType<{ className?: string }>;
}

const POPULAR_CATEGORIES: PopularCultureItem[] = [
  {
    rank: 1,
    id: 'pop-1',
    name: 'Artes Visuais Globais',
    members: '61.2K membros',
    growth: '▲ 26%',
    iconBg: 'bg-[#4338CA]',
    icon: Palette,
  },
  {
    rank: 2,
    id: 'pop-2',
    name: 'Música do Mundo',
    members: '58.4K membros',
    growth: '▲ 20%',
    iconBg: 'bg-[#F59E0B]',
    icon: Music,
  },
  {
    rank: 3,
    id: 'pop-3',
    name: 'Literatura & Poesia',
    members: '52.1K membros',
    growth: '▲ 17%',
    iconBg: 'bg-[#047857]',
    icon: BookOpen,
  },
  {
    rank: 4,
    id: 'pop-4',
    name: 'Patrimônio Cultural',
    members: '47.3K membros',
    growth: '▲ 15%',
    iconBg: 'bg-[#DC2626]',
    icon: Landmark,
  },
  {
    rank: 5,
    id: 'pop-5',
    name: 'Artes Cênicas',
    members: '43.7K membros',
    growth: '▲ 12%',
    iconBg: 'bg-[#0D9488]',
    icon: Drama,
  },
];

// Dados da Barra Lateral: Artigos e recursos em destaque
interface FeaturedArticle {
  id: string;
  title: string;
  type: 'Guia' | 'Artigo';
  image: string;
}

const FEATURED_ARTICLES: FeaturedArticle[] = [
  {
    id: 'art-1',
    title: 'A importância da cultura na sociedade moderna',
    type: 'Guia',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-2',
    title: 'Como preservar o patrimônio imaterial',
    type: 'Artigo',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-3',
    title: '10 livros que mudaram o mundo',
    type: 'Guia',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-4',
    title: 'A música como linguagem universal',
    type: 'Artigo',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'art-5',
    title: 'Festivais culturais que você precisa conhecer',
    type: 'Guia',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&auto=format&fit=crop&q=80',
  },
];

export const CommunityMoreCategoriesView: React.FC<CommunityMoreCategoriesViewProps> = ({
  onBackToOfficial,
  onNavigateToCategory,
  onNavigateToTab,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenMobileMenu,
  onOpenCreateCommunity,
  onBreadcrumbChange,
}) => {
  // Estados de Filtros
  const [selectedCommunityType, setSelectedCommunityType] = useState<string>('Todas');
  const [selectedResources, setSelectedResources] = useState<Set<string>>(new Set());
  const [selectedLocation, setSelectedLocation] = useState<string>('Qualquer lugar');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryModal, setSelectedCategoryModal] = useState<ExtraCategoryTile | null>(null);

  const toggleResource = (resource: string) => {
    setSelectedResources((prev) => {
      const next = new Set(prev);
      if (next.has(resource)) next.delete(resource);
      else next.add(resource);
      return next;
    });
  };

  const handleClearFilters = () => {
    setSelectedCommunityType('Todas');
    setSelectedResources(new Set());
    setSelectedLocation('Qualquer lugar');
    setSearchQuery('');
  };

  // Filtragem dos cards
  const filteredTiles = EXTRA_CATEGORIES_TILES.filter((tile) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      tile.name.toLowerCase().includes(query) ||
      tile.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] pb-16">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* 1. Header Superior da Página */}
        <section id="more-categories-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#0B1536] text-white flex items-center justify-center shadow-md shrink-0">
              <LayoutGrid className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-['Outfit'] tracking-tight">
                Mais Categorias
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Explore todas as áreas de interesse e encontre comunidades que combinam com você.
              </p>

              {/* Fita de Métricas Globais */}
              <div className="flex items-center gap-6 text-xs text-slate-600 flex-wrap pt-1.5 font-medium">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-[#0F172A]">2.450</span>
                  <span>comunidades</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-[#0F172A]">312.680</span>
                  <span>membros</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-indigo-600" />
                  <span className="font-bold text-[#0F172A]">196</span>
                  <span>países</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-[#0F172A]">5.120</span>
                  <span>recursos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botão Criar Comunidade (mesmo padrão da seção de tecnologia) */}
          <button
            type="button"
            onClick={onOpenCreateCommunity}
            id="btn-criar-comunidade-mais-categorias"
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1536] hover:bg-slate-900 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer shrink-0"
          >
            <span>Criar Comunidade</span>
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </section>

        {/* 2. Fita Horizontal de Categorias (com "Mais" ativo) */}
        <nav
          id="categories-ribbon"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 relative"
          aria-label="Categorias de Comunidades"
        >
          {CATEGORIES_RIBBON.map((cat) => {
            const Icon = cat.icon;
            const isMais = cat.id === 'mais';

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (cat.id !== 'mais') {
                    if (onNavigateToCategory) {
                      onNavigateToCategory(cat.id);
                    } else if (onNavigateToTab) {
                      onNavigateToTab(cat.id);
                    }
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                  isMais
                    ? 'bg-[#0B1536] text-white shadow-xs'
                    : 'bg-white border border-slate-200/90 text-[#334155] hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isMais ? 'text-white' : 'text-slate-500'}`} strokeWidth={2.2} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </nav>

        {/* 3. Grade Principal de Três Colunas (Filtros, Conteúdo Central e Mais Populares alinhados no mesmo nível) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* COLUNA ESQUERDA: Filtros (lg:col-span-2) */}
          <aside
            id="filtros-sidebar"
            className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-5"
          >
                {/* Título e Botão Limpar Tudo */}
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit'] uppercase tracking-wider">
                    Filtrar comunidades
                  </h3>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Limpar
                  </button>
                </div>

                {/* Grupo 1: Tipo de Comunidade (Radios) */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-bold text-[#0F172A]">Tipo de comunidade</span>
                  <div className="flex flex-col gap-2">
                    {[
                      'Todas',
                      'Grupo de Interesse',
                      'Projeto Colaborativo',
                      'Organização',
                      'Rede Profissional',
                      'Clube',
                      'Causa & Movimento',
                      'Comunidade Local',
                    ].map((type) => {
                      const isChecked = selectedCommunityType === type;
                      return (
                        <label
                          key={type}
                          className="flex items-center gap-2.5 text-xs text-[#334155] hover:text-slate-900 cursor-pointer select-none"
                        >
                          <input
                            type="radio"
                            name="community-type"
                            checked={isChecked}
                            onChange={() => setSelectedCommunityType(type)}
                            className="sr-only"
                          />
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                              isChecked
                                ? 'border-blue-600 bg-blue-600'
                                : 'border-slate-300 bg-white hover:border-slate-400'
                            }`}
                          >
                            {isChecked && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </span>
                          <span className="leading-snug">{type}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Grupo 2: Recursos Disponíveis (Checkboxes) */}
                <div className="flex flex-col gap-2.5 pt-1 border-t border-slate-100">
                  <span className="text-xs font-bold text-[#0F172A]">Recursos disponíveis</span>
                  <div className="flex flex-col gap-2">
                    {[
                      'Eventos',
                      'Artigos & Conteúdos',
                      'Cursos & Workshops',
                      'Mentoria',
                      'Voluntariado',
                      'Financiamento',
                      'Rede de Contactos',
                    ].map((rec) => {
                      const isChecked = selectedResources.has(rec);
                      return (
                        <label
                          key={rec}
                          className="flex items-center gap-2.5 text-xs text-[#334155] hover:text-slate-900 cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleResource(rec)}
                            className="sr-only"
                          />
                          <span
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                              isChecked
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-slate-300 bg-white hover:border-slate-400'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                          <span className="leading-snug">{rec}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Grupo 3: Localização (Dropdown) */}
                <div className="flex flex-col gap-2 pt-1 border-t border-slate-100">
                  <span className="text-xs font-bold text-[#0F172A]">Localização</span>
                  <div className="relative">
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200/90 rounded-xl px-3 py-2 text-xs text-[#334155] focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer font-medium"
                    >
                      <option value="Qualquer lugar">Qualquer lugar</option>
                      <option value="Global">Global</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Brasil">Brasil</option>
                      <option value="Angola">Angola</option>
                      <option value="Moçambique">Moçambique</option>
                      <option value="Cabo Verde">Cabo Verde</option>
                      <option value="Outros">Outros</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Botão Aplicar Filtros */}
                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl bg-[#0B1536] hover:bg-slate-900 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Aplicar Filtros
                </button>
              </aside>

              {/* CONTEÚDO PRINCIPAL: Hero + Grade de Categorias + Faixa Final (lg:col-span-7) */}
              <main id="main-more-categories-content" className="lg:col-span-7 flex flex-col gap-6">
                {/* HERO CARD EXCLUSIVO */}
                <div
                  id="hero-more-categories"
                  className="relative rounded-3xl bg-gradient-to-r from-[#0B1536] via-[#111C44] to-[#0D1533] p-5 sm:p-6 text-white overflow-hidden shadow-md"
                >
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    {/* Lado Esquerdo do Hero: Título, Descrição e Busca */}
                    <div className="md:col-span-5 flex flex-col justify-center">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight leading-tight">
                        Explore sem limites.
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                        Descubra comunidades de diversas áreas e conecte-se com pessoas que compartilham os mesmos interesses que você.
                      </p>

                      {/* Campo de Busca Embutido */}
                      <div className="mt-4 relative">
                        <div className="bg-white rounded-xl sm:rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-md">
                          <Search className="w-4 h-4 text-slate-400 shrink-0" />
                          <input
                            type="text"
                            placeholder="Buscar em todas as categorias..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                          />
                          {searchQuery && (
                            <button
                              type="button"
                              onClick={() => setSearchQuery('')}
                              className="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Centro do Hero: Globo com Ícones Orbitando */}
                    <div className="md:col-span-3 flex items-center justify-center relative min-h-[160px] sm:min-h-[180px]">
                      {/* Círculo do Globo */}
                      <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#1E40AF] via-[#0284C7] to-[#047857] shadow-xl flex items-center justify-center border-2 border-white/20 overflow-hidden">
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,#ffffff,transparent_60%)]" />
                        <svg className="w-full h-full opacity-65 text-emerald-300" viewBox="0 0 100 100" fill="currentColor">
                          <path d="M20,35 Q30,20 50,30 T80,45 Q75,70 50,75 T20,60 Z" opacity="0.8" />
                          <path d="M35,65 Q45,55 60,65 T75,80 Q50,95 35,80 Z" opacity="0.6" />
                        </svg>
                      </div>

                      {/* Badges Flutuantes Orbitando em Círculos */}
                      <div className="absolute top-1 left-4 w-7 h-7 rounded-full bg-white/95 text-emerald-600 shadow-md flex items-center justify-center animate-pulse">
                        <PawPrint className="w-3.5 h-3.5" />
                      </div>
                      <div className="absolute top-2 right-4 w-7 h-7 rounded-full bg-white/95 text-orange-600 shadow-md flex items-center justify-center">
                        <Dumbbell className="w-3.5 h-3.5" />
                      </div>
                      <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-7 h-7 rounded-full bg-white/95 text-rose-600 shadow-md flex items-center justify-center">
                        <Heart className="w-3.5 h-3.5" />
                      </div>
                      <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-7 h-7 rounded-full bg-white/95 text-blue-600 shadow-md flex items-center justify-center">
                        <Plane className="w-3.5 h-3.5" />
                      </div>
                      <div className="absolute bottom-2 left-6 w-7 h-7 rounded-full bg-white/95 text-purple-600 shadow-md flex items-center justify-center">
                        <Camera className="w-3.5 h-3.5" />
                      </div>
                      <div className="absolute bottom-3 right-6 w-7 h-7 rounded-full bg-white/95 text-teal-600 shadow-md flex items-center justify-center">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white/95 text-blue-700 shadow-md flex items-center justify-center">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Lado Direito do Hero: Painel de Estatísticas com fundo branco conforme a imagem */}
                    <div className="md:col-span-4 bg-white rounded-2xl p-4 sm:p-5 flex flex-col justify-center gap-3.5 shadow-xs border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <LayoutGrid className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <div>
                          <span className="text-base font-extrabold text-[#0F172A] block leading-tight">+100</span>
                          <span className="text-[11px] text-slate-500 font-medium">Categorias de interesse</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <Globe2 className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <div>
                          <span className="text-base font-extrabold text-[#0F172A] block leading-tight">24.500+</span>
                          <span className="text-[11px] text-slate-500 font-medium">Comunidades ativas</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <div>
                          <span className="text-base font-extrabold text-[#0F172A] block leading-tight">1.2M+</span>
                          <span className="text-[11px] text-slate-500 font-medium">Membros no total</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <div>
                          <span className="text-base font-extrabold text-[#0F172A] block leading-tight">Todos os temas</span>
                          <span className="text-[11px] text-slate-500 font-medium">Em um só lugar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SEÇÃO: "Todas as categorias" */}
                <section id="all-categories-grid-section" className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] font-['Outfit']">
                      Todas as categorias
                    </h3>
                    {searchQuery && (
                      <span className="text-xs text-slate-500 font-medium">
                        {filteredTiles.length} encontradas
                      </span>
                    )}
                  </div>

                  {/* Grid de Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
                    {filteredTiles.map((cat) => {
                      const Icon = cat.icon;

                      if (cat.isSpecial) {
                        return (
                          <div
                            key={cat.id}
                            onClick={() => onNavigateToCategory?.('todas')}
                            className="bg-slate-50/90 rounded-2xl border border-dashed border-slate-300 p-4 hover:bg-slate-100/90 transition-all flex flex-col justify-between group cursor-pointer h-full min-h-[165px]"
                          >
                            <div>
                              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-blue-600 mb-3 group-hover:scale-105 transition-transform">
                                <Icon className="w-5 h-5 stroke-[2.2]" />
                              </div>
                              <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-snug">
                                {cat.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 line-clamp-2">
                                {cat.description}
                              </p>
                            </div>
                            <div className="mt-3 pt-2 border-t border-slate-200/60">
                              <span className="text-[11px] font-bold text-blue-600 group-hover:underline flex items-center gap-1">
                                {cat.count}
                              </span>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={cat.id}
                          onClick={() => setSelectedCategoryModal(cat)}
                          className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group cursor-pointer h-full min-h-[165px]"
                        >
                          <div>
                            <div
                              className={`w-10 h-10 rounded-full ${cat.iconBg} text-white flex items-center justify-center mb-3 shadow-2xs group-hover:scale-105 transition-transform`}
                            >
                              <Icon className="w-5 h-5 stroke-[2.2]" />
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-snug group-hover:text-blue-600 transition-colors">
                              {cat.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed mt-1 line-clamp-2">
                              {cat.description}
                            </p>
                          </div>
                          <div className="mt-3 pt-2 border-t border-slate-100">
                            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400">
                              {cat.count}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* FAIXA HORIZONTAL FINAL: "Não encontrou o que procura?" */}
                <div
                  id="cta-bottom-bar"
                  className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0F172A] font-['Outfit']">
                        Não encontrou o que procura?
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Crie sua própria comunidade e reúna pessoas com os mesmos interesses que você.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenCreateCommunity}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all shadow-2xs cursor-pointer shrink-0"
                  >
                    <span>Criar Comunidade</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
                  </button>
                </div>
              </main>

          {/* COLUNA DIREITA: Card de Categorias mais populares no Topo + Artigos + CTA (lg:col-span-3) */}
          <aside id="right-sidebar" className="lg:col-span-3 flex flex-col gap-4">
            {/* 1. CARD: Categorias mais populares (EM CIMA, EXATAMENTE COMO NA IMAGEM) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col gap-4">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-sm font-bold text-[#0F172A] font-['Outfit']">
                  Categorias mais populares
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigateToCategory?.('todas')}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-col space-y-3.5">
                {POPULAR_CATEGORIES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onNavigateToCategory?.('cultura')}
                      className="flex items-center justify-between gap-3 p-1 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0">
                          {item.rank}
                        </span>
                        <div
                          className={`w-9 h-9 rounded-full ${item.iconBg} text-white flex items-center justify-center shrink-0 shadow-2xs`}
                        >
                          <Icon className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-[#0F172A] truncate group-hover:text-blue-600 transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 block truncate font-normal">
                            {item.members}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 shrink-0 flex items-center gap-0.5">
                        ▲ {item.growth.replace('▲', '').trim()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Card: Artigos e recursos em destaque */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit']">
                  Artigos e recursos em destaque
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.('noticias')}
                  className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex flex-col divide-y divide-slate-100">
                {FEATURED_ARTICLES.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => onNavigateToTab?.('noticias')}
                    className="py-2 flex items-center gap-2.5 hover:bg-slate-50 p-1 rounded-lg transition-colors cursor-pointer group"
                  >
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1 text-[11px] leading-tight">
                      <h4 className="font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors line-clamp-2">
                        {art.title}
                      </h4>
                      <span className="text-[9.5px] text-slate-400 block mt-0.5 font-medium">
                        {art.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Card CTA Final */}
            <div
              id="cta-more-card"
              className="relative rounded-2xl overflow-hidden p-5 text-white bg-gradient-to-br from-[#1E1B4B] via-[#2A1B6D] to-[#1E293B] shadow-md flex flex-col justify-between min-h-[180px]"
            >
              <div className="relative z-10 max-w-[210px] flex flex-col gap-1.5">
                <h3 className="text-sm sm:text-base font-extrabold text-white font-['Outfit'] leading-tight">
                  Conecte-se ao que faz sentido para você.
                </h3>
                <p className="text-[10.5px] text-white/80 leading-snug">
                  Explore, aprenda e cresça com comunidades que inspiram o mundo.
                </p>
              </div>

              <div className="relative z-10 pt-3">
                <button
                  type="button"
                  onClick={() => onNavigateToCategory?.('todas')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#0066FF] text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <span>Explorar Comunidades</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.8]" />
                </button>
              </div>

              <div className="absolute right-0 bottom-0 pointer-events-none opacity-90">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-600/30 blur-xl absolute -bottom-4 -right-4" />
                <svg width="105" height="95" viewBox="0 0 105 95" fill="none" className="relative z-0">
                  <circle cx="65" cy="55" r="35" fill="#3B82F6" opacity="0.35" />
                  <circle cx="65" cy="55" r="28" fill="#2D3BA8" opacity="0.75" />
                  <ellipse cx="65" cy="55" rx="28" ry="12" stroke="#60A5FA" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                  <circle cx="45" cy="40" r="6" fill="#F59E0B" />
                  <circle cx="85" cy="48" r="7" fill="#10B981" />
                  <circle cx="60" cy="78" r="6" fill="#EC4899" />
                </svg>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal de Detalhes da Categoria Selecionada */}
      {selectedCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden relative flex flex-col">
            <button
              type="button"
              onClick={() => setSelectedCategoryModal(null)}
              className="absolute top-3 right-3 text-slate-600 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl ${selectedCategoryModal.iconBg} text-white flex items-center justify-center shadow-xs`}
                >
                  <selectedCategoryModal.icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] font-['Outfit']">
                    {selectedCategoryModal.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedCategoryModal.count}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedCategoryModal.description}
              </p>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategoryModal(null);
                    onNavigateToCategory?.('todas');
                  }}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-[#0B1536] text-white hover:bg-slate-900 transition-all cursor-pointer shadow-xs text-center"
                >
                  Explorar Comunidades deste Tema
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
