import React, { useState } from 'react';
import {
  Globe,
  Clock,
  Calendar,
  Ruler,
  MapPin,
  ChevronDown,
  Check,
  CheckCircle2,
  X,
  Plus,
  Heart,
  Leaf,
  Rocket,
  Bus,
  Compass,
  Landmark,
  GraduationCap,
  Sparkles,
  Shield,
  Trophy,
  RotateCcw,
  Eye,
  Layers,
  Activity,
  SlidersHorizontal,
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  checked: boolean;
}

export const PreferencesTab: React.FC = () => {
  // 1. Configurações gerais
  const [platformLanguage, setPlatformLanguage] = useState('Português (Portugal)');
  const [currency, setCurrency] = useState('EUR (€) – Euro');
  const [timezone, setTimezone] = useState('(UTC+00:00) Lisboa');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeFormat, setTimeFormat] = useState('24 horas');
  const [unitSystem, setUnitSystem] = useState('Métrico (km, °C, m)');
  const [contentLanguage, setContentLanguage] = useState('Português');

  // Regiões de interesse (Tags)
  const [regions, setRegions] = useState<string[]>(['Algarve', 'Portugal']);
  const [isAddingRegion, setIsAddingRegion] = useState(false);
  const [newRegionText, setNewRegionText] = useState('');

  // 2. Personalização da experiência (4 modos)
  const [experienceMode, setExperienceMode] = useState<
    'equilibrada' | 'local' | 'global' | 'personalizado'
  >('equilibrada');

  // 3. Categorias de interesse (10 temas exatos da imagem)
  const [categories, setCategories] = useState<CategoryItem[]>([
    {
      id: 'sustentabilidade',
      name: 'Sustentabilidade',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
          <Leaf className="w-4 h-4" />
        </div>
      ),
      checked: true,
    },
    {
      id: 'tecnologia',
      name: 'Tecnologia e Inovação',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
          <Rocket className="w-4 h-4" />
        </div>
      ),
      checked: true,
    },
    {
      id: 'mobilidade',
      name: 'Mobilidade',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-[#F5F3FF] text-[#8B5CF6] flex items-center justify-center shrink-0">
          <Bus className="w-4 h-4" />
        </div>
      ),
      checked: false,
    },
    {
      id: 'turismo',
      name: 'Turismo',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-[#ECFEFF] text-[#06B6D4] flex items-center justify-center shrink-0">
          <Compass className="w-4 h-4" />
        </div>
      ),
      checked: true,
    },
    {
      id: 'economia',
      name: 'Economia',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center shrink-0">
          <Landmark className="w-4 h-4" />
        </div>
      ),
      checked: false,
    },
    {
      id: 'educacao',
      name: 'Educação',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shrink-0">
          <GraduationCap className="w-4 h-4" />
        </div>
      ),
      checked: true,
    },
    {
      id: 'saude',
      name: 'Saúde e Bem-estar',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-[#FFF1F2] text-[#F43F5E] flex items-center justify-center shrink-0">
          <Heart className="w-4 h-4" />
        </div>
      ),
      checked: false,
    },
    {
      id: 'cultura',
      name: 'Cultura',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0">
          <Landmark className="w-4 h-4" />
        </div>
      ),
      checked: false,
    },
    {
      id: 'seguranca',
      name: 'Segurança',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4" />
        </div>
      ),
      checked: false,
    },
    {
      id: 'desporto',
      name: 'Desporto',
      icon: (
        <div className="w-7 h-7 rounded-lg bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center shrink-0">
          <Trophy className="w-4 h-4" />
        </div>
      ),
      checked: false,
    },
  ]);

  // 4. Outras preferências
  const [accessibilityMode, setAccessibilityMode] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const removeRegion = (regionToRemove: string) => {
    setRegions((prev) => prev.filter((r) => r !== regionToRemove));
  };

  const handleAddRegion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRegionText.trim() && !regions.includes(newRegionText.trim())) {
      setRegions((prev) => [...prev, newRegionText.trim()]);
      setNewRegionText('');
      setIsAddingRegion(false);
    }
  };

  const toggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, checked: !cat.checked } : cat))
    );
  };

  const clearCategories = () => {
    setCategories((prev) => prev.map((cat) => ({ ...cat, checked: false })));
    showToast('Seleções limpas.');
  };

  const selectedCount = categories.filter((c) => c.checked).length;

  const handleSave = () => {
    showToast('Preferências salvas com sucesso!');
  };

  return (
    <div className="w-full space-y-6 pb-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
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

      {/* GRID PRINCIPAL: COLUNA ESQUERDA (CONFIGURAÇÕES + PERSONALIZAÇÃO) & COLUNA DIREITA (CATEGORIAS + OUTRAS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================
            COLUNA ESQUERDA (8 colunas em lg)
           ======================================================== */}
        <div className="lg:col-span-8 space-y-6">
          {/* CARD 1: Configurações gerais */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs space-y-5 font-sans">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Configurações gerais
              </h3>
            </div>

            {/* Grid 3 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-sans">
              {/* 1. Idioma da plataforma */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Globe className="w-4 h-4 text-[#1455AC] shrink-0" />
                  <label className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                    Idioma da plataforma
                  </label>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">
                  Escolha o idioma principal da interface.
                </p>
                <div className="relative">
                  <select
                    value={platformLanguage}
                    onChange={(e) => setPlatformLanguage(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#1455AC] outline-none pr-8 cursor-pointer shadow-2xs font-sans"
                  >
                    <option value="Português (Portugal)">Português (Portugal)</option>
                    <option value="Português (Brasil)">Português (Brasil)</option>
                    <option value="English (United States)">English (United States)</option>
                    <option value="Español (España)">Español (España)</option>
                    <option value="Français">Français</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 2. Moeda */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-4 h-4 rounded-full border border-[#1455AC] text-[#1455AC] flex items-center justify-center font-bold text-[10px] shrink-0 font-sans">
                    €
                  </div>
                  <label className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Moeda</label>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">
                  Escolha a moeda para preços e conversões.
                </p>
                <div className="relative">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#1455AC] outline-none pr-8 cursor-pointer shadow-2xs font-sans"
                  >
                    <option value="EUR (€) – Euro">EUR (€) – Euro</option>
                    <option value="USD ($) – Dólar Americano">USD ($) – Dólar Americano</option>
                    <option value="BRL (R$) – Real Brasileiro">BRL (R$) – Real Brasileiro</option>
                    <option value="MZN (MT) – Metical">MZN (MT) – Metical</option>
                    <option value="AOA (Kz) – Kwanza">AOA (Kz) – Kwanza</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 3. Fuso horário */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Clock className="w-4 h-4 text-[#1455AC] shrink-0" />
                  <label className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Fuso horário</label>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">
                  Defina o seu fuso horário local.
                </p>
                <div className="relative">
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#1455AC] outline-none pr-8 cursor-pointer shadow-2xs font-sans"
                  >
                    <option value="(UTC+00:00) Lisboa">(UTC+00:00) Lisboa</option>
                    <option value="(UTC+00:00) Londres">(UTC+00:00) Londres</option>
                    <option value="(UTC-03:00) São Paulo">(UTC-03:00) São Paulo</option>
                    <option value="(UTC+01:00) Madrid">(UTC+01:00) Madrid</option>
                    <option value="(UTC+01:00) Paris">(UTC+01:00) Paris</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 4. Formato de data */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Calendar className="w-4 h-4 text-[#1455AC] shrink-0" />
                  <label className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                    Formato de data
                  </label>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">
                  Escolha como as datas são apresentadas.
                </p>
                <div className="relative">
                  <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#1455AC] outline-none pr-8 cursor-pointer shadow-2xs font-sans"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 5. Formato de hora */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Clock className="w-4 h-4 text-[#1455AC] shrink-0" />
                  <label className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                    Formato de hora
                  </label>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">
                  Escolha o formato de exibição da hora.
                </p>
                <div className="relative">
                  <select
                    value={timeFormat}
                    onChange={(e) => setTimeFormat(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#1455AC] outline-none pr-8 cursor-pointer shadow-2xs font-sans"
                  >
                    <option value="24 horas">24 horas</option>
                    <option value="12 horas (AM/PM)">12 horas</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 6. Unidades de medida */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Ruler className="w-4 h-4 text-[#1455AC] shrink-0" />
                  <label className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                    Unidades de medida
                  </label>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">
                  Selecione o sistema de unidades preferido.
                </p>
                <div className="relative">
                  <select
                    value={unitSystem}
                    onChange={(e) => setUnitSystem(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#1455AC] outline-none pr-8 cursor-pointer shadow-2xs font-sans"
                  >
                    <option value="Métrico (km, °C, m)">Métrico (km, °C, m)</option>
                    <option value="Imperial (mi, °F, ft)">Imperial (mi, °F, ft)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 7. Idioma dos conteúdos */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Globe className="w-4 h-4 text-[#1455AC] shrink-0" />
                  <label className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                    Idioma dos conteúdos
                  </label>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">
                  Idioma preferido para conteúdos e notícias.
                </p>
                <div className="relative">
                  <select
                    value={contentLanguage}
                    onChange={(e) => setContentLanguage(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#1455AC] outline-none pr-8 cursor-pointer shadow-2xs font-sans"
                  >
                    <option value="Português">Português</option>
                    <option value="English">English</option>
                    <option value="Español">Español</option>
                    <option value="Todos os idiomas">Todos os idiomas</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 8. Região de interesse (Ocupa 2 colunas) */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-1.5">
                  <MapPin className="w-4 h-4 text-[#1455AC] shrink-0" />
                  <label className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                    Região de interesse
                  </label>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">
                  Escolha a sua região para conteúdos locais.
                </p>

                {/* Box de Tags com Algarve, Portugal e + Adicionar */}
                <div className="min-h-[42px] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-between gap-2 shadow-2xs font-sans">
                  <div className="flex flex-wrap items-center gap-2 font-sans">
                    {regions.map((region) => (
                      <span
                        key={region}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] text-xs font-semibold font-sans"
                      >
                        <span>{region}</span>
                        <button
                          type="button"
                          onClick={() => removeRegion(region)}
                          className="hover:text-[#0F3B77] cursor-pointer"
                          title={`Remover ${region}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}

                    {isAddingRegion ? (
                      <form onSubmit={handleAddRegion} className="inline-flex items-center gap-1">
                        <input
                          type="text"
                          value={newRegionText}
                          onChange={(e) => setNewRegionText(e.target.value)}
                          placeholder="Nome da região..."
                          autoFocus
                          className="w-28 text-xs font-medium px-2 py-1 rounded-lg border border-[#1455AC] outline-none text-slate-800 dark:text-slate-100 font-sans"
                        />
                        <button
                          type="submit"
                          className="text-xs text-[#1455AC] font-bold px-1.5 py-0.5 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded"
                        >
                          OK
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsAddingRegion(false)}
                          className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </form>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsAddingRegion(true)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#1455AC] hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors cursor-pointer font-sans"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                        <span>Adicionar</span>
                      </button>
                    )}
                  </div>

                  <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: Personalização da experiência */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs space-y-4 font-sans">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Personalização da experiência
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Escolha como deseja visualizar e receber os conteúdos da VILA.
              </p>
            </div>

            {/* 4 Cards em linha */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1 font-sans">
              {/* Opção 1: Vista equilibrada (Selecionada) */}
              <div
                onClick={() => setExperienceMode('equilibrada')}
                className={`p-3.5 rounded-xl transition-all cursor-pointer flex flex-col justify-between font-sans ${
                  experienceMode === 'equilibrada'
                    ? 'border-2 border-[#1455AC] bg-white dark:bg-slate-900 ring-2 ring-blue-600/10 shadow-xs'
                    : 'border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900'
                }`}
              >
                <div>
                  {/* Radio / Checkmark indicador */}
                  <div className="mb-2.5">
                    {experienceMode === 'equilibrada' ? (
                      <div className="w-4 h-4 rounded-full bg-[#1455AC] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800" />
                    )}
                  </div>

                  {/* Thumbnail gráfico da UI */}
                  <div className="w-full h-20 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-2 mb-3">
                    <div className="w-full bg-white dark:bg-slate-900 rounded-lg shadow-2xs border border-slate-150 p-2 space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#1455AC] flex items-center justify-center text-[7px] text-white font-bold font-sans">
                          V
                        </div>
                        <div className="h-1.5 w-12 bg-slate-200 dark:bg-slate-700 rounded-full" />
                      </div>
                      <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full" />
                      <div className="h-1 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-full" />
                      <div className="flex gap-1 pt-0.5">
                        <div className="h-2 w-6 bg-blue-50 dark:bg-blue-500/10 rounded border border-blue-100 dark:border-blue-800/40" />
                        <div className="h-2 w-7 bg-slate-50 dark:bg-slate-800 rounded border border-slate-100 dark:border-slate-800" />
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Vista equilibrada</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-1 font-sans">
                    Mistura conteúdos locais, globais e recomendados para si.
                  </p>
                </div>
              </div>

              {/* Opção 2: Foco local */}
              <div
                onClick={() => setExperienceMode('local')}
                className={`p-3.5 rounded-xl transition-all cursor-pointer flex flex-col justify-between font-sans ${
                  experienceMode === 'local'
                    ? 'border-2 border-[#1455AC] bg-white dark:bg-slate-900 ring-2 ring-blue-600/10 shadow-xs'
                    : 'border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="mb-2.5">
                    {experienceMode === 'local' ? (
                      <div className="w-4 h-4 rounded-full bg-[#1455AC] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800" />
                    )}
                  </div>

                  {/* Thumbnail gráfico do Mapa */}
                  <div className="w-full h-20 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-2 mb-3 relative overflow-hidden">
                    <svg viewBox="0 0 100 60" className="w-full h-full">
                      <path d="M10 20 Q 30 10 50 30 T 90 20" fill="none" stroke="#E2E8F0" strokeWidth="2" />
                      <path d="M20 50 Q 50 40 80 50" fill="none" stroke="#E2E8F0" strokeWidth="2" />
                      <path d="M40 5 L 40 55" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                      <path d="M70 5 L 70 55" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                      {/* Pins */}
                      <g transform="translate(32, 14)">
                        <circle cx="0" cy="0" r="4" fill="#EF4444" />
                        <path d="M-3 0 Q 0 7 0 8 Q 0 7 3 0 Z" fill="#EF4444" />
                        <circle cx="0" cy="-0.8" r="1.5" fill="#FFFFFF" />
                      </g>
                      <g transform="translate(48, 22)">
                        <circle cx="0" cy="0" r="4.5" fill="#8B5CF6" />
                        <path d="M-3.5 0 Q 0 8 0 9 Q 0 8 3.5 0 Z" fill="#8B5CF6" />
                        <circle cx="0" cy="-0.8" r="1.8" fill="#FFFFFF" />
                      </g>
                      <g transform="translate(68, 16)">
                        <circle cx="0" cy="0" r="4" fill="#1455AC" />
                        <path d="M-3 0 Q 0 7 0 8 Q 0 7 3 0 Z" fill="#1455AC" />
                        <circle cx="0" cy="-0.8" r="1.5" fill="#FFFFFF" />
                      </g>
                    </svg>
                    <div className="absolute right-1.5 bottom-1.5 bg-white/95 dark:bg-slate-800/95 rounded-md px-1 py-0.5 border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1455AC]" />
                      <span className="text-[7.5px] font-bold text-slate-700 dark:text-slate-300 font-sans">Lisboa</span>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Foco local</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-1 font-sans">
                    Dê prioridade a conteúdos e eventos da sua região.
                  </p>
                </div>
              </div>

              {/* Opção 3: Foco global */}
              <div
                onClick={() => setExperienceMode('global')}
                className={`p-3.5 rounded-xl transition-all cursor-pointer flex flex-col justify-between font-sans ${
                  experienceMode === 'global'
                    ? 'border-2 border-[#1455AC] bg-white dark:bg-slate-900 ring-2 ring-blue-600/10 shadow-xs'
                    : 'border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="mb-2.5">
                    {experienceMode === 'global' ? (
                      <div className="w-4 h-4 rounded-full bg-[#1455AC] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800" />
                    )}
                  </div>

                  {/* Thumbnail gráfico do Globo 3D Azul */}
                  <div className="w-full h-20 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-2 mb-3">
                    <div className="relative w-14 h-14">
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
                        <defs>
                          <radialGradient id="pref-globe-sphere" cx="35%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#93C5FD" />
                            <stop offset="55%" stopColor="#1455AC" />
                            <stop offset="100%" stopColor="#0F3B77" />
                          </radialGradient>
                          <linearGradient id="pref-globe-land" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#A7F3D0" />
                            <stop offset="100%" stopColor="#34D399" />
                          </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="32" fill="url(#pref-globe-sphere)" />
                        <path d="M42 28 Q 48 26 50 32 Q 52 38 46 44 Q 42 42 40 34 Z" fill="url(#pref-globe-land)" opacity="0.9" />
                        <path d="M28 32 Q 32 38 29 44 Q 24 46 22 38 Z" fill="url(#pref-globe-land)" opacity="0.85" />
                        <path d="M58 28 Q 66 32 64 40 Q 58 42 56 34 Z" fill="url(#pref-globe-land)" opacity="0.9" />
                        <ellipse cx="50" cy="50" rx="32" ry="10" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.35" transform="rotate(-15 50 50)" />
                      </svg>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Foco global</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-1 font-sans">
                    Explore mais conteúdos, notícias e eventos globais.
                  </p>
                </div>
              </div>

              {/* Opção 4: Personalizado */}
              <div
                onClick={() => setExperienceMode('personalizado')}
                className={`p-3.5 rounded-xl transition-all cursor-pointer flex flex-col justify-between font-sans ${
                  experienceMode === 'personalizado'
                    ? 'border-2 border-[#1455AC] bg-white dark:bg-slate-900 ring-2 ring-blue-600/10 shadow-xs'
                    : 'border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="mb-2.5">
                    {experienceMode === 'personalizado' ? (
                      <div className="w-4 h-4 rounded-full bg-[#1455AC] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800" />
                    )}
                  </div>

                  {/* Thumbnail gráfico do Balão com Coração */}
                  <div className="w-full h-20 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-2 mb-3">
                    <div className="w-13 h-11 bg-[#FFF1F2] border border-rose-100 dark:border-rose-800/40 rounded-xl flex items-center justify-center shadow-2xs relative">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-rose-500 dark:text-rose-400 fill-rose-500">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <div className="absolute -bottom-1 left-3 w-2 h-2 bg-[#FFF1F2] border-r border-b border-rose-100 dark:border-rose-800/40 rotate-45" />
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">Personalizado</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-1 font-sans">
                    Algoritmo ajusta o feed com base no seu comportamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            COLUNA DIREITA (4 colunas em lg)
           ======================================================== */}
        <div className="lg:col-span-4 space-y-6 font-sans">
          {/* CARD 3: Categorias de interesse */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs space-y-4 font-sans">
            <div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Categorias de interesse
                </h3>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Escolha os temas que mais lhe interessam.
              </p>
            </div>

            {/* Lista dos 10 Temas */}
            <div className="divide-y divide-slate-100 dark:divide-slate-700 font-sans">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className="py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-800 px-1 rounded-xl transition-colors cursor-pointer font-sans"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {cat.icon}
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-50 truncate font-sans">
                      {cat.name}
                    </span>
                  </div>

                  {/* Checkbox Quadrado */}
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all shrink-0 ${
                      cat.checked
                        ? 'bg-[#1455AC] text-white shadow-2xs'
                        : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500'
                    }`}
                  >
                    {cat.checked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Rodapé: Limpar seleções & Contador */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-sans">
              <button
                type="button"
                onClick={clearCategories}
                className="font-semibold text-[#1455AC] hover:text-[#0F3B77] flex items-center gap-1.5 cursor-pointer font-sans"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar seleções</span>
              </button>

              <span className="font-bold text-[#10B981] font-sans">
                {selectedCount} selecionadas
              </span>
            </div>
          </div>

          {/* CARD 4: Outras preferências */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 shadow-2xs space-y-4 font-sans">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Outras preferências
              </h3>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700 font-sans">
              {/* 1. Modo de acessibilidade */}
              <div className="py-3 flex items-center justify-between gap-3.5 font-sans">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="text-slate-600 dark:text-slate-400 shrink-0">
                    <Eye className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                      Modo de acessibilidade
                    </h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-sans">
                      Melhora a legibilidade e navegação.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={accessibilityMode}
                    onChange={(e) => setAccessibilityMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1455AC]" />
                </label>
              </div>

              {/* 2. Reduzir animações */}
              <div className="py-3 flex items-center justify-between gap-3.5 font-sans">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="text-slate-600 dark:text-slate-400 shrink-0">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                      Reduzir animações
                    </h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-sans">
                      Reduz movimentos e transições.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={reduceMotion}
                    onChange={(e) => setReduceMotion(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1455AC]" />
                </label>
              </div>

              {/* 3. Modo compacto */}
              <div className="py-3 flex items-center justify-between gap-3.5 font-sans">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="text-slate-600 dark:text-slate-400 shrink-0">
                    <Layers className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                      Modo compacto
                    </h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-sans">
                      Interface mais densa com menos espaço.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={compactMode}
                    onChange={(e) => setCompactMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1455AC]" />
                </label>
              </div>
            </div>
          </div>

          {/* BOTÃO ALINHADO À DIREITA: Guardar preferências */}
          <div className="flex justify-end pt-1 font-sans">
            <button
              type="button"
              onClick={handleSave}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1455AC] hover:bg-[#0F3B77] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer font-sans"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Guardar preferências</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
