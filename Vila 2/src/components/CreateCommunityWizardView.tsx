import React, { useState } from 'react';
import {
  ArrowRight,
  Globe,
  Check,
  Upload,
  Leaf,
  Cpu,
  GraduationCap,
  Scale,
  HeartPulse,
  Rocket,
  Palette,
  MoreHorizontal,
  MapPin,
  Flag,
  MessageSquare,
  Users,
  Calendar,
  FileText,
  Sparkles,
  Info,
  Shield,
  Eye,
  Lock,
  Share2,
  CheckCircle2,
} from 'lucide-react';

export interface CreateCommunityWizardViewProps {
  onBackToCommunity?: () => void;
  onNavigateToTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

export type CategoryId =
  | 'ambiente'
  | 'tecnologia'
  | 'educacao'
  | 'direitos-humanos'
  | 'saude'
  | 'empreendedorismo'
  | 'cultura'
  | 'outro';

export type ScopeId = 'global' | 'regional' | 'nacional' | 'local';

export const CreateCommunityWizardView: React.FC<CreateCommunityWizardViewProps> = ({
  onBackToCommunity,
  onNavigateToTab,
  onOpenAuth,
}) => {
  // Estado das etapas (1 a 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State - Etapa 1: Informações Básicas
  const [name, setName] = useState<string>('');
  const [tagline, setTagline] = useState<string>('');
  const [category, setCategory] = useState<CategoryId>('ambiente');
  const [language, setLanguage] = useState<string>('Português');
  const [scope, setScope] = useState<ScopeId>('global');
  const [description, setDescription] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>(
    '/imagens-paginas/05-comunidade-global/criar-comunidade/Principal.png'
  );
  const [iconImage, setIconImage] = useState<string>('');

  // Form State - Etapa 2: Propósito & Regras
  const [mission, setMission] = useState<string>('');
  const [guidelines, setGuidelines] = useState<string>(
    '1. Respeito mútuo e comunicação positiva.\n2. Colaboração focada em impacto e soluções.\n3. Sem spam ou autopromoção descontextualizada.'
  );

  // Form State - Etapa 3: Personalização
  const [primaryTag, setPrimaryTag] = useState<string>('Sustentabilidade');
  const [secondaryTag, setSecondaryTag] = useState<string>('Inovação Social');

  // Form State - Etapa 4: Definições
  const [privacy, setPrivacy] = useState<'public' | 'restricted' | 'private'>('public');
  const [membershipApproval, setMembershipApproval] = useState<boolean>(false);

  // Publicação concluída modal
  const [isPublished, setIsPublished] = useState<boolean>(false);

  // Manipular upload de capa
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
    }
  };

  // Manipular upload de ícone
  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setIconImage(url);
    }
  };

  // Labels das categorias
  const categoryLabels: Record<CategoryId, { name: string; tag: string; icon: React.ElementType }> = {
    ambiente: { name: 'Ambiente', tag: 'Sustentabilidade', icon: Leaf },
    tecnologia: { name: 'Tecnologia', tag: 'Inovação', icon: Cpu },
    educacao: { name: 'Educação', tag: 'Aprendizagem', icon: GraduationCap },
    'direitos-humanos': { name: 'Direitos Humanos', tag: 'Igualdade', icon: Scale },
    saude: { name: 'Saúde', tag: 'Bem-Estar', icon: HeartPulse },
    empreendedorismo: { name: 'Empreendedorismo', tag: 'Impacto Social', icon: Rocket },
    cultura: { name: 'Cultura', tag: 'Patrimônio', icon: Palette },
    outro: { name: 'Outro', tag: 'Comunidade', icon: MoreHorizontal },
  };

  const steps = [
    { num: 1, title: 'Informações Básicas', subtitle: 'Sobre a sua comunidade' },
    { num: 2, title: 'Propósito & Regras', subtitle: 'Missão e diretrizes' },
    { num: 3, title: 'Personalização', subtitle: 'Imagem e identidade' },
    { num: 4, title: 'Definições', subtitle: 'Privacidade e adesão' },
    { num: 5, title: 'Revisão', subtitle: 'Confirme e publique' },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsPublished(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onBackToCommunity) {
      onBackToCommunity();
    }
  };

  const SelectedCategoryIcon = categoryLabels[category].icon;

  return (
    <div id="create-community-wizard" className="w-full bg-[#F8FAFC] min-h-screen text-[#0F172A] flex flex-col">
      {/* Conteúdo Principal (busca/idioma/notificações/perfil/breadcrumb já vêm do Topbar compartilhado no AppLayout) */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* 2. Título e Subtítulo da Página */}
        <div className="font-sans">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans leading-tight">
            Criar Comunidade
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-normal font-sans">
            Construa um espaço global para pessoas que partilham o mesmo propósito.
          </p>
        </div>

        {/* 3. Barra de Passos do Wizard (1 a 5) */}
        <section
          id="wizard-steps-indicator"
          className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-2xs overflow-x-auto no-scrollbar font-sans"
        >
          <div className="flex items-center justify-between min-w-[720px] gap-2 font-sans">
            {steps.map((s, idx) => {
              const isActive = currentStep === s.num;
              const isPast = currentStep > s.num;

              return (
                <React.Fragment key={s.num}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(s.num)}
                    className="flex items-center gap-3 text-left group cursor-pointer font-sans"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 font-sans ${
                        isActive
                          ? 'bg-[#1455AC] text-white ring-4 ring-blue-100'
                          : isPast
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}
                    >
                      {isPast ? <Check className="w-4 h-4 stroke-[2.5]" /> : s.num}
                    </div>

                    <div className="min-w-0 font-sans">
                      <div
                        className={`text-xs font-bold leading-tight font-sans ${
                          isActive ? 'text-[#1455AC]' : 'text-slate-900'
                        }`}
                      >
                        {s.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[130px] font-sans">
                        {s.subtitle}
                      </div>
                    </div>
                  </button>

                  {idx < steps.length - 1 && (
                    <div className="text-slate-300 px-1 font-mono text-sm select-none">
                      ›
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </section>

        {/* 4. Grade Principal: Formulário na Esquerda (lg:col-span-8) e Painel de Pré-visualização na Direita (lg:col-span-4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* COLUNA ESQUERDA: Formulário da Etapa Atual (8 colunas) */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-5 sm:p-7 shadow-2xs flex flex-col gap-6 font-sans">
            {/* ETAPA 1: Informações Básicas (Conforme Imagem de Referência UI CRIAR COMUNIDADE.png) */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-6 font-sans">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-sans">
                    Informações Básicas
                  </h2>
                  <p className="text-xs text-slate-500 font-sans">
                    Comece com os detalhes principais da sua comunidade.
                  </p>
                </div>

                {/* Grid Nome da Comunidade & Tagline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nome da Comunidade */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
                      <span>Nome da Comunidade</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={80}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex.: Inovação para um Futuro Sustentável"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC]/50 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono">
                        {name.length}/80
                      </span>
                    </div>
                  </div>

                  {/* Tagline */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0F172A]">
                      Tagline (Frase inspiradora)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={60}
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        placeholder="Ex.: Juntos por um planeta melhor."
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC]/50 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-mono">
                        {tagline.length}/60
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grid Categoria (8 Cards) & Idioma + Localização */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                  {/* Lado Esquerdo: Seletor de Categoria */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
                      <span>Categoria</span>
                      <span className="text-rose-500">*</span>
                    </label>

                    <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                      {(
                        [
                          { id: 'ambiente', label: 'Ambiente', icon: Leaf },
                          { id: 'tecnologia', label: 'Tecnologia', icon: Cpu },
                          { id: 'educacao', label: 'Educação', icon: GraduationCap },
                          { id: 'direitos-humanos', label: 'Direitos Humanos', icon: Scale },
                          { id: 'saude', label: 'Saúde', icon: HeartPulse },
                          { id: 'empreendedorismo', label: 'Empreendedorismo', icon: Rocket },
                          { id: 'cultura', label: 'Cultura', icon: Palette },
                          { id: 'outro', label: 'Outro', icon: MoreHorizontal },
                        ] as const
                      ).map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = category === cat.id;

                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setCategory(cat.id)}
                            className={`relative p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer min-h-[72px] ${
                              isSelected
                                ? 'border-[#10B981] bg-[#ECFDF5]/50 ring-2 ring-[#10B981]/20'
                                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {isSelected && (
                              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#10B981] text-white rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </span>
                            )}
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                                isSelected
                                  ? 'bg-[#10B981]/15 text-[#059669]'
                                  : 'text-slate-500 bg-slate-100'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <span
                              className={`text-[10.5px] font-bold leading-tight ${
                                isSelected ? 'text-[#065F46]' : 'text-slate-700'
                              }`}
                            >
                              {cat.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lado Direito: Idioma principal & Localização da Comunidade */}
                  <div className="flex flex-col gap-4">
                    {/* Idioma Principal */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
                        <span>Idioma principal</span>
                        <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC]/50 hover:bg-white focus:bg-white focus:border-blue-500 transition-all outline-none font-medium cursor-pointer"
                      >
                        <option>Português</option>
                        <option>Inglês</option>
                        <option>Espanhol</option>
                        <option>Francês</option>
                      </select>
                    </div>

                    {/* Localização da Comunidade */}
                    <div className="flex flex-col gap-1.5">
                      <div>
                        <label className="text-xs font-bold text-[#0F172A]">
                          Localização da Comunidade
                        </label>
                        <p className="text-[10.5px] text-slate-400">
                          Defina o alcance geográfico da sua comunidade.
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        {[
                          {
                            id: 'global' as ScopeId,
                            title: 'Global',
                            desc: 'Para todo o mundo',
                            icon: Globe,
                          },
                          {
                            id: 'regional' as ScopeId,
                            title: 'Regional',
                            desc: 'Uma região específica',
                            icon: MapPin,
                          },
                          {
                            id: 'nacional' as ScopeId,
                            title: 'Nacional',
                            desc: 'Um país específico',
                            icon: Flag,
                          },
                          {
                            id: 'local' as ScopeId,
                            title: 'Local',
                            desc: 'Uma cidade ou área',
                            icon: MapPin,
                          },
                        ].map((item) => {
                          const Icon = item.icon;
                          const isSelected = scope === item.id;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setScope(item.id)}
                              className={`w-full p-2 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#10B981] bg-[#ECFDF5]/50 ring-1 ring-[#10B981]'
                                  : 'border-slate-200 bg-white hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                                    isSelected
                                      ? 'bg-[#10B981]/15 text-[#059669]'
                                      : 'bg-slate-100 text-slate-500'
                                  }`}
                                >
                                  <Icon className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                  <div className="text-[11.5px] font-bold text-[#0F172A] leading-none">
                                    {item.title}
                                  </div>
                                  <div className="text-[10px] text-slate-500 mt-0.5">
                                    {item.desc}
                                  </div>
                                </div>
                              </div>

                              {isSelected && (
                                <span className="w-4 h-4 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descrição Curta */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
                        <span>Descrição curta</span>
                        <span className="text-rose-500">*</span>
                      </label>
                      <p className="text-[10.5px] text-slate-400">
                        Explique em poucas palavras sobre o que é a sua comunidade.
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      rows={3}
                      maxLength={150}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Resuma o propósito da sua comunidade..."
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-[#F8FAFC]/50 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
                    />
                    <span className="absolute right-3 bottom-2 text-[10px] text-slate-400 font-mono">
                      {description.length}/150
                    </span>
                  </div>
                </div>

                {/* Upload de Capa e Ícone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  {/* Capa da Comunidade */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
                      <span>Capa da Comunidade</span>
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                    </label>

                    <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-colors bg-[#F8FAFC]/60 hover:bg-slate-50 min-h-[140px]">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="sr-only"
                      />
                      <div className="w-10 h-10 rounded-full bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-slate-600">
                        <Upload className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F172A] block">
                          Arraste uma imagem ou clique para carregar
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Recomendado: 1600x900px (JPG, PNG)
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Ícone da Comunidade */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
                      <span>Ícone da Comunidade</span>
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                    </label>

                    <div className="border border-slate-200 rounded-2xl p-4 flex items-center gap-4 bg-[#F8FAFC]/60 min-h-[140px]">
                      <label className="w-16 h-16 rounded-full bg-white border-2 border-dashed border-slate-300 hover:border-blue-400 flex items-center justify-center cursor-pointer transition-colors shrink-0 overflow-hidden shadow-2xs">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleIconUpload}
                          className="sr-only"
                        />
                        {iconImage ? (
                          <img
                            src={iconImage}
                            alt="Ícone"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Upload className="w-5 h-5 text-slate-500" />
                        )}
                      </label>

                      <div>
                        <span className="text-xs font-bold text-[#0F172A] block">
                          Carregar ícone
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Recomendado: 512x512px (PNG)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 2: Propósito & Regras */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-5 animate-in fade-in duration-200 font-sans">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-sans">
                    Propósito & Regras
                  </h2>
                  <p className="text-xs text-slate-500 font-sans">
                    Defina a missão central e as diretrizes de convivência do grupo.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 font-sans">
                  <label className="text-xs font-bold text-slate-900 font-sans">
                    Missão da Comunidade
                  </label>
                  <textarea
                    rows={4}
                    value={mission}
                    onChange={(e) => setMission(e.target.value)}
                    placeholder="Qual impacto esta comunidade visa construir no mundo? Descreva os objetivos centrais..."
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC]/50 hover:bg-white focus:bg-white focus:border-[#1455AC] transition-all outline-none resize-none font-sans"
                  />
                </div>

                <div className="flex flex-col gap-1.5 font-sans">
                  <label className="text-xs font-bold text-slate-900 font-sans">
                    Diretrizes e Regras de Convivência
                  </label>
                  <textarea
                    rows={4}
                    value={guidelines}
                    onChange={(e) => setGuidelines(e.target.value)}
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC]/50 hover:bg-white focus:bg-white focus:border-[#1455AC] transition-all outline-none resize-none font-sans"
                  />
                  <span className="text-[10.5px] text-slate-400 font-sans">
                    Membros verão estas regras antes de solicitar entrada.
                  </span>
                </div>
              </div>
            )}

            {/* ETAPA 3: Personalização */}
            {currentStep === 3 && (
              <div className="flex flex-col gap-5 animate-in fade-in duration-200 font-sans">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-sans">
                    Personalização
                  </h2>
                  <p className="text-xs text-slate-500 font-sans">
                    Ajuste tags e tópicos principais para facilitar que membros encontrem seu grupo.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                  <div className="flex flex-col gap-1.5 font-sans">
                    <label className="text-xs font-bold text-slate-900 font-sans">Tag Principal</label>
                    <input
                      type="text"
                      value={primaryTag}
                      onChange={(e) => setPrimaryTag(e.target.value)}
                      placeholder="Ex: Clima, Agroecologia"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 font-sans"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 font-sans">
                    <label className="text-xs font-bold text-slate-900 font-sans">Tag Secundária</label>
                    <input
                      type="text"
                      value={secondaryTag}
                      onChange={(e) => setSecondaryTag(e.target.value)}
                      placeholder="Ex: Reflorestamento, Juventude"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 font-sans"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-3 font-sans">
                  <Sparkles className="w-5 h-5 text-[#1455AC] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#1455AC] leading-relaxed font-sans">
                    Tags bem definidas ajudam a Inteligência Artificial e a busca do VILA a recomendar sua comunidade para pessoas com os mesmos interesses globais.
                  </p>
                </div>
              </div>
            )}

            {/* ETAPA 4: Definições */}
            {currentStep === 4 && (
              <div className="flex flex-col gap-5 animate-in fade-in duration-200 font-sans">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-sans">
                    Definições de Acesso & Privacidade
                  </h2>
                  <p className="text-xs text-slate-500 font-sans">
                    Escolha quem pode ver e participar da sua comunidade.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 font-sans">
                  {[
                    {
                      id: 'public' as const,
                      title: 'Pública',
                      desc: 'Qualquer pessoa pode ver as discussões e juntar-se instantaneamente.',
                      icon: Eye,
                    },
                    {
                      id: 'restricted' as const,
                      title: 'Restrita / Moderada',
                      desc: 'Conteúdo visível a todos, mas novos membros exigem aprovação de administradores.',
                      icon: Shield,
                    },
                    {
                      id: 'private' as const,
                      title: 'Privada',
                      desc: 'Apenas membros convidados podem ver o conteúdo e interagir.',
                      icon: Lock,
                    },
                  ].map((p) => {
                    const Icon = p.icon;
                    const isSelected = privacy === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPrivacy(p.id)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer font-sans ${
                          isSelected
                            ? 'border-[#1455AC] bg-blue-50/40 ring-1 ring-[#1455AC]'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 font-sans">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-sans ${
                              isSelected
                                ? 'bg-[#1455AC] text-white'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="font-sans">
                            <div className="text-xs font-bold text-slate-900 font-sans">{p.title}</div>
                            <div className="text-[10.5px] text-slate-500 mt-0.5 font-sans">{p.desc}</div>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-[#1455AC] text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ETAPA 5: Revisão */}
            {currentStep === 5 && (
              <div className="flex flex-col gap-5 animate-in fade-in duration-200 font-sans">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-sans">
                    Revisão e Confirmação
                  </h2>
                  <p className="text-xs text-slate-500 font-sans">
                    Confira todos os dados antes de publicar sua comunidade para o mundo.
                  </p>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-500 font-medium">Nome</span>
                    <strong className="text-[#0F172A]">{name || 'Sem nome'}</strong>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-500 font-medium">Categoria</span>
                    <strong className="text-[#0F172A]">{categoryLabels[category].name}</strong>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-500 font-medium">Alcance</span>
                    <strong className="text-[#0F172A] capitalize">{scope}</strong>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-500 font-medium">Idioma</span>
                    <strong className="text-[#0F172A]">{language}</strong>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-500 font-medium">Privacidade</span>
                    <strong className="text-[#0F172A] capitalize">{privacy}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-xs text-emerald-900">
                    Sua comunidade está pronta para ser lançada e acolher novos membros de todo o mundo.
                  </p>
                </div>
              </div>
            )}

            {/* Barra Inferior com Botões Cancelar e Continuar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                {currentStep === 1 ? 'Cancelar' : 'Voltar'}
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1455AC] hover:bg-[#0F3B77] text-white text-xs font-bold shadow-xs transition-all cursor-pointer font-sans"
              >
                <span>{currentStep === 5 ? 'Publicar Comunidade' : 'Continuar'}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* COLUNA DIREITA: Pré-visualização ao Vivo e Cartões de Apoio (4 colunas) */}
          <aside className="lg:col-span-4 flex flex-col gap-5 font-sans">
            {/* 1. Header do Bloco */}
            <div className="flex items-center justify-between px-1 font-sans">
              <h3 className="text-sm font-bold text-slate-900 font-sans">
                Pré-visualização
              </h3>
              <span className="text-[10.5px] font-semibold text-[#1455AC] bg-blue-50 px-2 py-0.5 rounded-full font-sans">
                Ao vivo
              </span>
            </div>

            {/* Card de Pré-visualização do Grupo */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col font-sans">
              {/* Capa */}
              <div className="relative h-32 sm:h-36 w-full bg-slate-100 overflow-hidden font-sans">
                <img
                  src={coverImage}
                  alt="Capa da comunidade"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Corpo com Avatar Sobreposto */}
              <div className="px-5 pb-5 pt-0 relative flex flex-col gap-2.5 font-sans">
                {/* Ícone Circular Sobreposto */}
                <div className="-mt-8 w-14 h-14 rounded-full bg-white p-1 ring-2 ring-white shadow-md flex items-center justify-center shrink-0">
                  {iconImage ? (
                    <img
                      src={iconImage}
                      alt="Ícone"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <SelectedCategoryIcon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                  )}
                </div>

                <div className="font-sans">
                  <h4 className="text-base font-bold text-slate-900 font-sans leading-snug">
                    {name.trim() ? name : 'Nome da Comunidade'}
                  </h4>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5 font-sans">
                    <Globe className="w-3 h-3 text-slate-400" />
                    <span className="capitalize font-sans">{scope}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-sans">
                  {description.trim()
                    ? description
                    : 'Descrição curta da comunidade aparecerá aqui para dar uma ideia clara do seu propósito.'}
                </p>

                {/* Stack de Avatares Simulados */}
                <div className="flex items-center gap-2 pt-1 font-sans">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt=""
                    />
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      alt=""
                    />
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                      alt=""
                    />
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                      alt=""
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 font-sans">
                    +1.2K membros
                  </span>
                </div>

                {/* Badges de Categoria & Tag */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 font-sans">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50 font-sans">
                    {categoryLabels[category].name}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50 font-sans">
                    {primaryTag}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Card: "O que sua comunidade inclui" */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col gap-3 font-sans">
              <h4 className="text-xs font-bold text-slate-900 font-sans">
                O que sua comunidade inclui
              </h4>

              <div className="flex flex-col gap-2.5 font-sans">
                {[
                  {
                    title: 'Fóruns de discussão',
                    desc: 'Converse e troque ideias com membros.',
                    icon: MessageSquare,
                  },
                  {
                    title: 'Projetos colaborativos',
                    desc: 'Crie e participe de iniciativas de impacto.',
                    icon: Users,
                  },
                  {
                    title: 'Eventos e webinars',
                    desc: 'Organize ou participe de eventos globais.',
                    icon: Calendar,
                  },
                  {
                    title: 'Recursos e materiais',
                    desc: 'Partilhe conhecimento e boas práticas.',
                    icon: FileText,
                  },
                ].map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={i} className="flex items-start gap-2.5 font-sans">
                      <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#1455AC] flex items-center justify-center shrink-0 mt-0.5 font-sans">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 font-sans">
                        <div className="text-[11.5px] font-bold text-slate-900 leading-tight font-sans">
                          {f.title}
                        </div>
                        <div className="text-[10px] text-slate-500 font-sans">{f.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Card: "Dicas para uma comunidade de impacto" com Ilustração */}
            <div className="relative rounded-xl overflow-hidden p-4 bg-[#EEF2FF] border border-indigo-100 flex flex-col justify-between min-h-[160px] font-sans">
              <div className="relative z-10 flex flex-col gap-2 font-sans">
                <h4 className="text-xs font-bold text-slate-900 font-sans">
                  Dicas para uma comunidade de impacto
                </h4>

                <ul className="flex flex-col gap-1.5 text-[10.5px] text-indigo-950 font-medium font-sans">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#1455AC] shrink-0 stroke-[2.5]" />
                    <span>Defina um propósito claro e inspirador</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#1455AC] shrink-0 stroke-[2.5]" />
                    <span>Seja inclusivo e acolhedor</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#1455AC] shrink-0 stroke-[2.5]" />
                    <span>Promova o respeito e a colaboração</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#1455AC] shrink-0 stroke-[2.5]" />
                    <span>Mantenha a comunidade ativa e engajada</span>
                  </li>
                </ul>
              </div>

              {/* Gráfico do Globo com Pessoas */}
              <div className="absolute right-0 -bottom-1 pointer-events-none opacity-95">
                <svg width="100" height="85" viewBox="0 0 100 85" fill="none">
                  <circle cx="70" cy="50" r="30" fill="#C7D2FE" fillOpacity="0.5" />
                  <ellipse cx="70" cy="50" rx="18" ry="30" stroke="#818CF8" strokeWidth="1" strokeOpacity="0.6" />
                  {/* Pessoas em Volta */}
                  <circle cx="85" cy="42" r="7" fill="#F59E0B" />
                  <path d="M78 62 C78 52, 92 52, 92 62 Z" fill="#EF4444" />
                  <circle cx="68" cy="38" r="8" fill="#FBBF24" />
                  <path d="M58 60 C58 48, 78 48, 78 60 Z" fill="#10B981" />
                  <circle cx="50" cy="45" r="7" fill="#FCD34D" />
                  <path d="M42 64 C42 54, 58 54, 58 64 Z" fill="#3B82F6" />
                </svg>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal de Sucesso após Publicação */}
      {isPublished && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150 font-sans">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-center flex flex-col items-center gap-4 font-sans">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-sans">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="font-sans">
              <h3 className="text-xl font-bold text-slate-900 font-sans">
                Comunidade Criada com Sucesso!
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-sans">
                <strong>{name || 'Sua comunidade'}</strong> já está no ar. Convide pessoas, compartilhe publicações e lidere o impacto.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full mt-2 font-sans">
              <button
                type="button"
                onClick={() => {
                  setIsPublished(false);
                  if (onBackToCommunity) onBackToCommunity();
                }}
                className="w-full py-2.5 rounded-xl bg-[#1455AC] hover:bg-[#0F3B77] text-white text-xs font-bold transition-all cursor-pointer shadow-xs font-sans"
              >
                Ir para a Página da Comunidade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCommunityWizardView;
