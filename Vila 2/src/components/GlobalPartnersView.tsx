import React, { useState } from 'react';
import {
  Globe,
  Building2,
  Heart,
  ArrowRight,
  ChevronRight,
  Check,
  Plus,
  Users,
  Sparkles,
  Shield,
  Briefcase,
  Target,
  ExternalLink,
  X,
  Share2,
  MapPin,
  Clock,
  Compass,
  Award,
  BookOpen,
  Leaf,
  GraduationCap,
  Scale,
  HeartPulse,
  Rocket,
  Cpu,
  Palette,
  Search,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { BreadcrumbItem } from './Topbar';

export interface GlobalPartnersViewProps {
  onNavigateToTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

type PartnerCategory =
  | 'todos'
  | 'fundacoes'
  | 'universidades'
  | 'governos'
  | 'empresas-b'
  | 'ongs'
  | 'multilaterais';

interface PartnerItem {
  id: string;
  name: string;
  category: PartnerCategory;
  categoryLabel: string;
  categoryColor: string;
  logo: string;
  location: string;
  countryFlag: string;
  description: string;
  coProjectsCount: number;
  totalInvested: string;
  odsFocus: number[];
  featured?: boolean;
}

interface PartnerProject {
  id: string;
  title: string;
  partnerName: string;
  partnerLogo: string;
  tag: string;
  tagBg: string;
  image: string;
  description: string;
  location: string;
  progressPercent: number;
  fundsRaised: string;
  goal: string;
}

const PARTNER_CATEGORIES = [
  { id: 'todos', label: 'Todos os Parceiros' },
  { id: 'fundacoes', label: 'Fundações & Filantropia' },
  { id: 'universidades', label: 'Universidades & Pesquisa' },
  { id: 'governos', label: 'Governos & Cidades' },
  { id: 'empresas-b', label: 'Empresas B & ESG' },
  { id: 'ongs', label: 'ONGs Internacionais' },
  { id: 'multilaterais', label: 'Agências Multilaterais' },
];

const FEATURED_PARTNERS: PartnerItem[] = [
  {
    id: 'p-1',
    name: 'Fundação Calouste Gulbenkian',
    category: 'fundacoes',
    categoryLabel: 'Filantropia & Cultura',
    categoryColor: 'bg-emerald-100 text-emerald-800',
    logo: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=160&auto=format&fit=crop&q=80',
    location: 'Lisboa, Portugal',
    countryFlag: '🇵🇹',
    description: 'Apoio contínuo a iniciativas de sustentabilidade oceânica, bolsas de estudo comunitárias e preservação artística no espaço lusófono.',
    coProjectsCount: 38,
    totalInvested: '€6.4M',
    odsFocus: [4, 11, 14],
    featured: true,
  },
  {
    id: 'p-2',
    name: 'Ashoka Global Network',
    category: 'ongs',
    categoryLabel: 'Empreendedorismo Social',
    categoryColor: 'bg-purple-100 text-purple-800',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=160&auto=format&fit=crop&q=80',
    location: 'Global (Rede Internacional)',
    countryFlag: '🌐',
    description: 'Aceleradora de líderes de inovação social e articuladora de redes de impacto sistêmico em mais de 90 países.',
    coProjectsCount: 64,
    totalInvested: '€8.2M',
    odsFocus: [8, 10, 17],
    featured: true,
  },
  {
    id: 'p-3',
    name: 'Programa das Nações Unidas (PNUD / UNDP)',
    category: 'multilaterais',
    categoryLabel: 'Agência Multilateral',
    categoryColor: 'bg-blue-100 text-blue-800',
    logo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=160&auto=format&fit=crop&q=80',
    location: 'Nova Iorque & Genebra',
    countryFlag: '🇺🇳',
    description: 'Alinhamento metodológico com os 17 Objetivos de Desenvolvimento Sustentável e capacitação de governanças locais.',
    coProjectsCount: 52,
    totalInvested: '€11.5M',
    odsFocus: [1, 5, 13, 16],
    featured: true,
  },
  {
    id: 'p-4',
    name: 'Universidade de Lisboa & Coimbra',
    category: 'universidades',
    categoryLabel: 'Pesquisa & Ciência Aberta',
    categoryColor: 'bg-amber-100 text-amber-800',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=160&auto=format&fit=crop&q=80',
    location: 'Portugal',
    countryFlag: '🇵🇹',
    description: 'Validação científica independente de indicadores de impacto territorial, sensoriamento ambiental e monitorização florestal.',
    coProjectsCount: 29,
    totalInvested: '€3.8M',
    odsFocus: [4, 9, 15],
    featured: true,
  },
  {
    id: 'p-5',
    name: 'WWF Internacional',
    category: 'ongs',
    categoryLabel: 'Conservação da Natureza',
    categoryColor: 'bg-emerald-100 text-emerald-800',
    logo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=160&auto=format&fit=crop&q=80',
    location: 'Gland, Suíça',
    countryFlag: '🇨🇭',
    description: 'Co-gestão de santuários marinhos costeiros e programas de proteção de bacias hidrográficas transfronteiriças.',
    coProjectsCount: 41,
    totalInvested: '€5.9M',
    odsFocus: [6, 14, 15],
    featured: false,
  },
  {
    id: 'p-6',
    name: 'B Lab Portugal & Espanha',
    category: 'empresas-b',
    categoryLabel: 'Economia Regenerativa',
    categoryColor: 'bg-indigo-100 text-indigo-800',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=160&auto=format&fit=crop&q=80',
    location: 'Península Ibérica',
    countryFlag: '🇪🇺',
    description: 'Mobilização do setor corporativo para auditoria de triplo impacto (social, ambiental e governança transparente).',
    coProjectsCount: 33,
    totalInvested: '€4.2M',
    odsFocus: [8, 12, 17],
    featured: false,
  },
];

const CO_PROJECTS: PartnerProject[] = [
  {
    id: 'cp-1',
    title: 'Corredor Ecológico do Atlântico',
    partnerName: 'WWF & Fundação Gulbenkian',
    partnerLogo: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=80&auto=format&fit=crop&q=80',
    tag: 'Ambiente',
    tagBg: 'bg-emerald-600 text-white',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    description: 'Proteção de 420 km de costa atlântica contra poluição por plásticos e sobrepesca com tecnologia de monitoramento comunitário.',
    location: 'Portugal e Ilhas Canárias',
    progressPercent: 88,
    fundsRaised: '€1.76M',
    goal: '€2.0M',
  },
  {
    id: 'cp-2',
    title: 'Hub de Inclusão Digital Lusófono',
    partnerName: 'Ashoka & PNUD',
    partnerLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=80&auto=format&fit=crop&q=80',
    tag: 'Educação & Tecnologia',
    tagBg: 'bg-blue-600 text-white',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
    description: 'Instalação de telecentros com internet via satélite e energia solar em 60 aldeias remotas em Angola e Moçambique.',
    location: 'Moçambique e Angola',
    progressPercent: 94,
    fundsRaised: '€2.35M',
    goal: '€2.5M',
  },
  {
    id: 'cp-3',
    title: 'Fundo Semente para Cooperativas Verdes',
    partnerName: 'B Lab & Ashoka',
    partnerLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=80&auto=format&fit=crop&q=80',
    tag: 'Empreendedorismo',
    tagBg: 'bg-purple-600 text-white',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80',
    description: 'Microcrédito a juro zero para 180 pequenas cooperativas rurais de agricultura regenerativa e reciclagem de resíduos.',
    location: 'Brasil e Portugal',
    progressPercent: 76,
    fundsRaised: '€950K',
    goal: '€1.25M',
  },
];

const MAP_REGIONS = [
  { id: 'europa', name: 'Europa', count: 142, icon: '🇪🇺', partners: 'Gulbenkian, B Lab, Univ. Lisboa' },
  { id: 'africa', name: 'África', count: 88, icon: '🌍', partners: 'Rede Saúde Moçambique, Kenya Eco' },
  { id: 'america-latina', name: 'América Latina', count: 64, icon: '🌎', partners: 'Amazónia Viva, Ashoka Brasil' },
  { id: 'america-norte', name: 'América do Norte', count: 32, icon: '🌐', partners: 'UNDP NY, Climate Catalyst' },
  { id: 'asia', name: 'Ásia-Pacífico', count: 18, icon: '🌏', partners: 'Timor Resiliente, Green Tech Hub' },
];

export const GlobalPartnersView: React.FC<GlobalPartnersViewProps> = ({
  onNavigateToTab,
  onOpenAuth,
  onOpenAiAssistant,
  onBreadcrumbChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PartnerCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [selectedPartnerDetail, setSelectedPartnerDetail] = useState<PartnerItem | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form State
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('Fundação');
  const [contactEmail, setContactEmail] = useState('');
  const [country, setCountry] = useState('');
  const [proposalMsg, setProposalMsg] = useState('');

  const onBreadcrumbChangeRef = React.useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;

  React.useEffect(() => {
    onBreadcrumbChangeRef.current?.([{ label: 'Parceiros Globais' }]);
  }, []);

  const filteredPartners = FEATURED_PARTNERS.filter((partner) => {
    if (selectedCategory !== 'todos' && partner.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        partner.name.toLowerCase().includes(q) ||
        partner.location.toLowerCase().includes(q) ||
        partner.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsPartnerModalOpen(false);
      setOrgName('');
      setContactEmail('');
      setProposalMsg('');
    }, 2200);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-900 pb-16 font-sans">
      <div className="max-w-[1600px] mx-auto px-3.5 sm:px-5 lg:px-6 pt-4 sm:pt-6 space-y-6 font-sans">

        {/* Barra de Filtros Rápidos por Setor */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-sans">
          {PARTNER_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as PartnerCategory)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer font-sans ${
                  isActive
                    ? 'bg-[#1455AC] text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Hero Banner: Parceiros Globais */}
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#1455AC] via-[#0F3B77] to-teal-700 p-6 sm:p-8 lg:p-10 text-white shadow-xs font-sans">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="relative z-10 max-w-2xl space-y-4 font-sans">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold font-sans">
              <Building2 className="w-3.5 h-3.5 text-teal-300" />
              <span>Rede Institucional & Alianças Multissetoriais</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
              Parceiros Globais para Impacto Sistémico e Sustentável
            </h1>

            <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-xl font-sans">
              Fundações, universidades, cidades, empresas de benefício mútuo e agências multilaterais unidas para co-financiar e impulsionar comunidades locais no ecossistema VILA.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 font-sans">
              <button
                type="button"
                onClick={() => setIsPartnerModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-2xs transition-all cursor-pointer font-sans"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Tornar-se Parceiro VILA</span>
              </button>

              <button
                type="button"
                onClick={onOpenAiAssistant}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-white/15 hover:bg-white/20 border border-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md transition-all cursor-pointer font-sans"
              >
                <Sparkles className="w-4 h-4 text-teal-300" />
                <span>Consultar VILA AI sobre Parcerias</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar no Rodapé do Banner */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/15 font-sans">
            <div>
              <p className="text-lg sm:text-2xl font-black font-sans">340+</p>
              <p className="text-[11px] text-slate-300">Instituições Parceiras</p>
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-black font-sans">195</p>
              <p className="text-[11px] text-slate-300">Países de Atuação</p>
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-black font-sans">€48.5M</p>
              <p className="text-[11px] text-slate-300">Co-investidos em Projetos</p>
            </div>
            <div>
              <p className="text-lg sm:text-2xl font-black font-sans">1.420</p>
              <p className="text-[11px] text-slate-300">Iniciativas Co-financiadas</p>
            </div>
          </div>
        </div>

        {/* Mapa Mundial de Parceiros e Regiões */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4 font-sans">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-sans">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                Distribuição Geográfica dos Parceiros Globais
              </h2>
              <p className="text-xs text-slate-500 font-sans">
                Presença consolidada em 5 continentes com polos operacionais ativos
              </p>
            </div>

            <div className="relative w-full sm:w-64 font-sans">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar parceiro por nome..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1455AC] text-slate-800 font-sans"
              />
            </div>
          </div>

          {/* Cards de Regiões com Contadores */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-sans">
            {MAP_REGIONS.map((region) => (
              <div
                key={region.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors space-y-1 font-sans"
              >
                <div className="flex items-center justify-between font-sans">
                  <span className="text-base">{region.icon}</span>
                  <span className="text-xs font-black text-teal-700 bg-teal-50 border border-teal-200/60 px-2 py-0.5 rounded-md font-sans">
                    {region.count} parceiros
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 font-sans">{region.name}</h3>
                <p className="text-[10px] text-slate-500 truncate font-sans">{region.partners}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Layout Principal em 2 Colunas: Parceiros em Destaque + Coluna Lateral */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">

          {/* Coluna Central: Lista de Parceiros & Projetos Conjuntos (8 colunas) */}
          <div className="lg:col-span-8 space-y-6 font-sans">

            {/* Seção 1: Parceiros em Destaque */}
            <div className="space-y-4 font-sans">
              <div className="flex items-center justify-between font-sans">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    Parceiros Institucionais ({filteredPartners.length})
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Alianças ativas com acordos de cooperação validados
                  </p>
                </div>
              </div>

              {/* Grid de Cards de Parceiros */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                {filteredPartners.map((partner) => (
                  <div
                    key={partner.id}
                    onClick={() => setSelectedPartnerDetail(partner)}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3 cursor-pointer group font-sans"
                  >
                    <div className="space-y-2 font-sans">
                      <div className="flex items-start justify-between gap-3 font-sans">
                        <div className="flex items-center gap-2.5 font-sans">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-100 shadow-2xs shrink-0"
                          />
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1 font-sans">
                              {partner.name}
                            </h4>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-sans">
                              <span>{partner.countryFlag}</span>
                              <span className="truncate">{partner.location}</span>
                            </div>
                          </div>
                        </div>

                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md shrink-0 font-sans ${partner.categoryColor}`}>
                          {partner.categoryLabel}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {partner.description}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <div>
                        <span className="font-bold text-slate-800">{partner.coProjectsCount}</span> iniciativas conjuntas
                      </div>
                      <div>
                        <span className="font-bold text-teal-700">{partner.totalInvested}</span> mobilizados
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPartners.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
                  <Building2 className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">Nenhum parceiro encontrado nesta categoria</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('todos');
                      setSearchQuery('');
                    }}
                    className="text-xs text-teal-700 font-bold hover:underline"
                  >
                    Limpar filtros
                  </button>
                </div>
              )}
            </div>

            {/* Seção 2: Projetos Co-financiados em Destaque */}
            <div className="space-y-4 font-sans">
              <div className="flex items-center justify-between font-sans">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    Iniciativas Co-financiadas em Andamento
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Projetos de grande escala viabilizados através de consórcios multissetoriais
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                {CO_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between font-sans"
                  >
                    <div className="relative h-28 w-full overflow-hidden bg-slate-100 font-sans">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                      <span className={`absolute top-2 left-2 text-[8.5px] font-bold px-2 py-0.5 rounded shadow-2xs ${proj.tagBg}`}>
                        {proj.tag}
                      </span>
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5 font-sans">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1 font-sans">{proj.title}</h4>
                        <p className="text-[10px] text-teal-700 font-semibold font-sans">{proj.partnerName}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed font-sans">
                          {proj.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 space-y-1 font-sans">
                        <div className="flex items-center justify-between text-[10px] font-sans">
                          <span className="text-slate-500">Financiamento atingido</span>
                          <span className="font-bold text-teal-700">{proj.progressPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-600 rounded-full"
                            style={{ width: `${proj.progressPercent}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[9.5px] text-slate-400 pt-0.5 font-sans">
                          <span>{proj.fundsRaised}</span>
                          <span>Meta: {proj.goal}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Coluna Lateral: Como Ser Parceiro, Vantagens e CTA (4 colunas) */}
          <div className="lg:col-span-4 space-y-6 font-sans">

            {/* Card CTA: Tornar-se Parceiro Institucional */}
            <div className="rounded-xl bg-gradient-to-br from-[#1455AC] to-[#0F3B77] p-6 text-white shadow-xs space-y-4 font-sans">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <Building2 className="w-5 h-5" />
              </div>

              <div className="space-y-1 font-sans">
                <h3 className="text-base font-bold font-sans">Sua Instituição na VILA</h3>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  Conecte a sua fundação, universidade ou corporação a milhares de projetos de impacto verificados com auditoria em tempo real.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-100 font-sans">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>Acesso a relatórios de impacto territorial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>Co-branding ético em campanhas globais</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>Matchmaking guiado por inteligência coletiva</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPartnerModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-all text-center cursor-pointer font-sans"
              >
                Submeter Proposta de Parceria
              </button>
            </div>

            {/* Como Funciona o Processo de Parceria */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3 font-sans">
              <h3 className="text-sm font-bold text-slate-900 font-sans">
                Processo de Adesão em 4 Passos
              </h3>

              <div className="space-y-3 font-sans">
                <div className="flex items-start gap-3 font-sans">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-900 text-xs font-bold flex items-center justify-center shrink-0 font-sans">
                    1
                  </span>
                  <div className="font-sans">
                    <h4 className="text-xs font-bold text-slate-900 font-sans">Manifestação de Interesse</h4>
                    <p className="text-[11px] text-slate-500 font-sans">Envio de formulário institucional com áreas prioritárias de cooperação.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 font-sans">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-900 text-xs font-bold flex items-center justify-center shrink-0 font-sans">
                    2
                  </span>
                  <div className="font-sans">
                    <h4 className="text-xs font-bold text-slate-900 font-sans">Due Diligence & Alinhamento ODS</h4>
                    <p className="text-[11px] text-slate-500 font-sans">Verificação de governança e alinhamento com os padrões éticos da VILA.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 font-sans">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-900 text-xs font-bold flex items-center justify-center shrink-0 font-sans">
                    3
                  </span>
                  <div className="font-sans">
                    <h4 className="text-xs font-bold text-slate-900 font-sans">Memorando de Entendimento (MoU)</h4>
                    <p className="text-[11px] text-slate-500 font-sans">Formalização de metas de co-investimento e partilha de dados abertos.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 font-sans">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-bold flex items-center justify-center shrink-0 font-sans">
                    4
                  </span>
                  <div className="font-sans">
                    <h4 className="text-xs font-bold text-slate-900 font-sans">Lançamento Operacional</h4>
                    <p className="text-[11px] text-slate-500 font-sans">Integração no diretório e abertura de editais para comunidades.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testemunho de Parceiro */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 font-sans">
              <p className="text-xs text-slate-600 italic leading-relaxed font-sans">
                "A plataforma VILA permitiu à nossa fundação alcançar comunidades costeiras que antes estavam fora dos circuitos tradicionais de financiamento internacional."
              </p>
              <div className="flex items-center gap-2.5 pt-1 font-sans">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 font-sans">
                  CG
                </div>
                <div className="font-sans">
                  <p className="text-xs font-bold text-slate-900 font-sans">Diretoria de Sustentabilidade</p>
                  <p className="text-[10px] text-slate-400 font-sans">Fundação Calouste Gulbenkian</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal: Tornar-se Parceiro */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 font-sans">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Candidatura de Parceria Institucional
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  Junte-se à rede global de cooperação da plataforma VILA
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPartnerModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-3 font-sans">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-sans">Proposta Enviada com Sucesso!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto font-sans">
                  A equipa de relações institucionais da VILA analisará os dados e entrará em contacto em até 48 horas úteis.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nome da Organização / Instituição *
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Ex: Fundação Oceano Vivo"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tipo de Organização
                    </label>
                    <select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-700"
                    >
                      <option value="Fundação">Fundação Filantrópica</option>
                      <option value="Universidade">Universidade / Pesquisa</option>
                      <option value="Governo">Governo / Município</option>
                      <option value="Empresa B">Empresa B / Privada</option>
                      <option value="ONG">ONG Internacional</option>
                      <option value="Multilateral">Agência Multilateral</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      País Sede *
                    </label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Ex: Portugal"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Institucional de Contacto *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="parcerias@organizacao.org"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Proposta de Colaboração / Áreas de Interesse
                  </label>
                  <textarea
                    rows={3}
                    value={proposalMsg}
                    onChange={(e) => setProposalMsg(e.target.value)}
                    placeholder="Descreva brevemente como a sua instituição pretende colaborar com as comunidades da VILA..."
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPartnerModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    Submeter Proposta
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal: Detalhes do Parceiro Selecionado */}
      {selectedPartnerDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 font-sans">
            <div className="flex items-start justify-between font-sans">
              <div className="flex items-center gap-3 font-sans">
                <img
                  src={selectedPartnerDetail.logo}
                  alt={selectedPartnerDetail.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">
                    {selectedPartnerDetail.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 font-sans">
                    <span>{selectedPartnerDetail.countryFlag}</span>
                    <span>{selectedPartnerDetail.location}</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPartnerDetail(null)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-400 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600 leading-relaxed font-sans">
              <p>{selectedPartnerDetail.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-sans">
              <div>
                <p className="text-[10px] text-slate-400 font-sans">Iniciativas Co-financiadas</p>
                <p className="font-bold text-slate-900 font-sans">{selectedPartnerDetail.coProjectsCount} projetos</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-sans">Total Mobilizado</p>
                <p className="font-bold text-teal-700 font-sans">{selectedPartnerDetail.totalInvested}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end font-sans">
              <button
                type="button"
                onClick={() => setSelectedPartnerDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer font-sans"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalPartnersView;
