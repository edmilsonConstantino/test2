import React, { useState } from 'react';
import {
  MapPin,
  Sparkles,
  Compass,
  BarChart3,
  Sliders,
  Plus,
  MoreVertical,
  Calendar,
  Users,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Heart,
  Vote,
  ShieldCheck,
  Globe,
  X,
  Search,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Crosshair,
  Edit3,
  Star,
  Trash2,
  Building2,
  Check,
  Filter,
} from 'lucide-react';
import { COUNTRIES_DATA } from '../../data/countriesData';

interface TerritoriosTabProps {
  onNavigateToTab?: (tabId: string) => void;
}

type SubTabId = 'visao-geral' | 'territorios-ativos' | 'explorar' | 'estatisticas' | 'preferencias';

export interface TerritorioItem {
  id: string;
  nome: string;
  badge?: string;
  badgeType?: 'principal' | 'pais' | 'ativo';
  subtitulo: string;
  projetosCount: number;
  membrosCount: string;
  impacto: 'Alto' | 'Médio' | 'Baixo';
  imagem: string;
  regiao: string;
  pais: string;
  comunidadesCount: string;
  tipo: 'principal' | 'ativo' | 'interesse' | 'explorado';
  mapCoords: { x: number; y: number };
}

export const TerritoriosTab: React.FC<TerritoriosTabProps> = ({ onNavigateToTab }) => {
  // Sub-abas do topo
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>('territorios-ativos');

  // Filtro de tempo no Resumo dos Territórios
  const [periodoFiltro, setPeriodoFiltro] = useState<'mes' | 'trimestre' | 'ano'>('mes');

  // Território selecionado no mapa
  const [selectedTerritorioId, setSelectedTerritorioId] = useState<string>('faro');

  // Nível de Zoom no mapa
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Menu de opções (três pontos) no card
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modais
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditPrefsModalOpen, setIsEditPrefsModalOpen] = useState(false);
  const [isAllTerritoriosModalOpen, setIsAllTerritoriosModalOpen] = useState(false);
  const [isAllActivitiesModalOpen, setIsAllActivitiesModalOpen] = useState(false);
  const [isExploreCityModalOpen, setIsExploreCityModalOpen] = useState(false);
  const [selectedExploreCity, setSelectedExploreCity] = useState<any | null>(null);
  const [selectedDetailTerritorio, setSelectedDetailTerritorio] = useState<TerritorioItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Carrossel "Explorar novos territórios"
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Lista dos Territórios Ativos Oficiais (exatamente os 4 mostrados em image.png)
  const [territorios, setTerritorios] = useState<TerritorioItem[]>([
    {
      id: 'faro',
      nome: 'Faro',
      badge: 'Principal',
      badgeType: 'principal',
      subtitulo: 'Algarve, Portugal',
      projetosCount: 24,
      membrosCount: '18.450',
      impacto: 'Alto',
      imagem: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=400',
      regiao: 'Algarve',
      pais: 'Portugal',
      comunidadesCount: '18.450',
      tipo: 'principal',
      mapCoords: { x: 195, y: 440 },
    },
    {
      id: 'loule',
      nome: 'Loulé',
      badgeType: 'ativo',
      subtitulo: 'Algarve, Portugal',
      projetosCount: 12,
      membrosCount: '8.230',
      impacto: 'Médio',
      imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400',
      regiao: 'Algarve',
      pais: 'Portugal',
      comunidadesCount: '8.230',
      tipo: 'ativo',
      mapCoords: { x: 170, y: 425 },
    },
    {
      id: 'olhao',
      nome: 'Olhão',
      badgeType: 'ativo',
      subtitulo: 'Algarve, Portugal',
      projetosCount: 9,
      membrosCount: '6.980',
      impacto: 'Médio',
      imagem: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400',
      regiao: 'Algarve',
      pais: 'Portugal',
      comunidadesCount: '6.980',
      tipo: 'ativo',
      mapCoords: { x: 215, y: 440 },
    },
    {
      id: 'portugal',
      nome: 'Portugal',
      badge: 'País',
      badgeType: 'pais',
      subtitulo: 'Europa',
      projetosCount: 56,
      membrosCount: '132.450',
      impacto: 'Alto',
      imagem: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&q=80&w=400',
      regiao: 'Europa',
      pais: 'Portugal',
      comunidadesCount: '132.450',
      tipo: 'ativo',
      mapCoords: { x: 155, y: 260 },
    },
  ]);

  // Territórios para explorar (Carrossel com fotos reais portuguesas)
  const novosTerritorios = [
    {
      id: 'lisboa',
      nome: 'Lisboa',
      pais: 'Portugal',
      projetos: 142,
      membros: '48.900',
      imagem: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=350',
      descricao: 'Iniciativas de mobilidade sustentável, economia circular e requalificação urbana.',
    },
    {
      id: 'porto',
      nome: 'Porto',
      pais: 'Portugal',
      projetos: 89,
      membros: '31.200',
      imagem: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=350',
      descricao: 'Polos de inovação social, proteção ribeirinha e comunidades artísticas.',
    },
    {
      id: 'braga',
      nome: 'Braga',
      pais: 'Portugal',
      projetos: 41,
      membros: '14.500',
      imagem: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&q=80&w=350',
      descricao: 'Juventude, transição digital cidadã e património cultural milenar.',
    },
    {
      id: 'setubal',
      nome: 'Setúbal',
      pais: 'Portugal',
      projetos: 34,
      membros: '11.800',
      imagem: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=350',
      descricao: 'Preservação marinha no estuário do Sado e projetos ecológicos da Arrábida.',
    },
    {
      id: 'coimbra',
      nome: 'Coimbra',
      pais: 'Portugal',
      projetos: 29,
      membros: '9.400',
      imagem: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=350',
      descricao: 'Educação universitária comunitária, saúde preventiva e ciência cidadã.',
    },
    {
      id: 'evora',
      nome: 'Évora',
      pais: 'Portugal',
      projetos: 22,
      membros: '7.100',
      imagem: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=350',
      descricao: 'Regeneração do montado alentejano e sustentabilidade hídrica rural.',
    },
    {
      id: 'funchal',
      nome: 'Funchal',
      pais: 'Madeira',
      projetos: 26,
      membros: '8.700',
      imagem: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=350',
      descricao: 'Economia azul oceânica e preservação do ecossistema da laurissilva.',
    },
    {
      id: 'ponta-delgada',
      nome: 'Ponta Delgada',
      pais: 'Açores',
      projetos: 19,
      membros: '6.400',
      imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=350',
      descricao: 'Geotermia limpa, agricultura sustentável e turismo regenerativo insular.',
    },
    {
      id: 'guimaraes',
      nome: 'Guimarães',
      pais: 'Portugal',
      projetos: 28,
      membros: '10.200',
      imagem: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=350',
      descricao: 'Capital verde europeia cidadã e preservação do património histórico.',
    },
  ];

  // Preferências territoriais editáveis
  const [preferencias, setPreferencias] = useState({
    paises: 'Portugal, Espanha, Brasil',
    regioes: 'Algarve, Norte, Centro',
    temas: 'Sustentabilidade, Mobilidade, Educação',
    nivel: 'Alto',
  });

  // Modal de Adicionar Território - campos
  const [novoNome, setNovoNome] = useState('');
  const [novoTipo, setNovoTipo] = useState<'ativo' | 'interesse' | 'principal'>('ativo');
  const [novoPais, setNovoPais] = useState('Portugal');
  const [novaRegiao, setNovaRegiao] = useState('Centro');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectedMapItem =
    territorios.find((t) => t.id === selectedTerritorioId) || territorios[0];

  const handleNextCarousel = () => {
    if (carouselIndex + 3 < novosTerritorios.length) {
      setCarouselIndex(carouselIndex + 3);
    } else {
      setCarouselIndex(0);
    }
  };

  const handlePrevCarousel = () => {
    if (carouselIndex - 3 >= 0) {
      setCarouselIndex(carouselIndex - 3);
    } else {
      setCarouselIndex(Math.max(0, novosTerritorios.length - 3));
    }
  };

  const handleOpenDetail = (t: TerritorioItem) => {
    setSelectedDetailTerritorio(t);
    setIsDetailModalOpen(true);
    setActiveMenuId(null);
  };

  // Definir território como Principal
  const handleSetPrincipal = (tId: string) => {
    setTerritorios((prev) =>
      prev.map((item) => {
        if (item.id === tId) {
          return {
            ...item,
            tipo: 'principal',
            badge: 'Principal',
            badgeType: 'principal',
          };
        }
        if (item.tipo === 'principal') {
          return {
            ...item,
            tipo: 'ativo',
            badge: undefined,
            badgeType: 'ativo',
          };
        }
        return item;
      })
    );
    setSelectedTerritorioId(tId);
    setActiveMenuId(null);
    showToast('Território principal atualizado com sucesso!');
  };

  // Remover território
  const handleRemoveTerritorio = (tId: string) => {
    if (territorios.length <= 1) {
      showToast('Não é possível remover o único território ativo.');
      return;
    }
    const itemToRemove = territorios.find((t) => t.id === tId);
    setTerritorios((prev) => prev.filter((t) => t.id !== tId));
    if (selectedTerritorioId === tId) {
      setSelectedTerritorioId(territorios[0]?.id || '');
    }
    setActiveMenuId(null);
    showToast(`${itemToRemove?.nome || 'Território'} removido dos seus territórios ativos.`);
  };

  // Adicionar território novo
  const handleAddTerritorioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome.trim()) {
      showToast('Por favor insira o nome do território.');
      return;
    }

    const newId = novoNome.toLowerCase().replace(/[^a-z0-9]/g, '');
    const novoItem: TerritorioItem = {
      id: newId,
      nome: novoNome.trim(),
      badge: novoTipo === 'principal' ? 'Principal' : undefined,
      badgeType: novoTipo === 'principal' ? 'principal' : 'ativo',
      subtitulo: `${novaRegiao}, ${novoPais}`,
      projetosCount: Math.floor(Math.random() * 25) + 5,
      membrosCount: `${Math.floor(Math.random() * 15) + 3}.${Math.floor(Math.random() * 800) + 100}`,
      impacto: 'Médio',
      imagem: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=400',
      regiao: novaRegiao,
      pais: novoPais,
      comunidadesCount: `${Math.floor(Math.random() * 10) + 2}.${Math.floor(Math.random() * 900) + 100}`,
      tipo: novoTipo,
      mapCoords: { x: 180, y: 220 },
    };

    if (novoTipo === 'principal') {
      setTerritorios((prev) => [
        novoItem,
        ...prev.map((t) => ({
          ...t,
          tipo: 'ativo' as const,
          badge: t.badgeType === 'pais' ? 'País' : undefined,
          badgeType: t.badgeType === 'pais' ? ('pais' as const) : ('ativo' as const),
        })),
      ]);
    } else {
      setTerritorios((prev) => [...prev, novoItem]);
    }

    setSelectedTerritorioId(newId);
    setIsAddModalOpen(false);
    setNovoNome('');
    showToast(`Território "${novoItem.nome}" adicionado com sucesso!`);
  };

  // Adicionar cidade do carrossel diretamente
  const handleAddCityFromCarousel = (city: any) => {
    if (territorios.some((t) => t.id === city.id)) {
      showToast(`O território ${city.nome} já está nos seus territórios ativos.`);
      return;
    }

    const novoItem: TerritorioItem = {
      id: city.id,
      nome: city.nome,
      badgeType: 'ativo',
      subtitulo: `${city.nome}, ${city.pais}`,
      projetosCount: city.projetos,
      membrosCount: city.membros,
      impacto: 'Médio',
      imagem: city.imagem,
      regiao: 'Portugal',
      pais: city.pais,
      comunidadesCount: city.membros,
      tipo: 'ativo',
      mapCoords: { x: 165, y: 280 },
    };

    setTerritorios((prev) => [...prev, novoItem]);
    setIsExploreCityModalOpen(false);
    setSelectedTerritorioId(city.id);
    showToast(`Território ${city.nome} adicionado aos seus territórios ativos!`);
  };

  // Métricas dinâmicas conforme o período selecionado
  const metricsData = {
    mes: {
      projetos: 45,
      projetosVar: '+12% vs. mês anterior',
      comunidades: 32,
      comunidadesVar: '+8% vs. mês anterior',
      contrib: 78,
      contribVar: '+15% vs. mês anterior',
      impacto: 'Alto',
      impactoVar: '+10% vs. mês anterior',
    },
    trimestre: {
      projetos: 84,
      projetosVar: '+22% vs. trim. anterior',
      comunidades: 58,
      comunidadesVar: '+14% vs. trim. anterior',
      contrib: 192,
      contribVar: '+28% vs. trim. anterior',
      impacto: 'Alto',
      impactoVar: '+15% vs. trim. anterior',
    },
    ano: {
      projetos: 168,
      projetosVar: '+45% vs. ano anterior',
      comunidades: 112,
      comunidadesVar: '+36% vs. ano anterior',
      contrib: 420,
      contribVar: '+58% vs. ano anterior',
      impacto: 'Alto',
      impactoVar: '+25% vs. ano anterior',
    },
  }[periodoFiltro];

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sub-navegação interna de Territórios (UI TERRITORIOS.png) */}
      <div className="flex items-center gap-2 sm:gap-6 border-b border-slate-200/80 pb-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => {
            setActiveSubTab('visao-geral');
            showToast('A exibir visão geral dos seus territórios');
          }}
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
          onClick={() => setActiveSubTab('territorios-ativos')}
          className={`flex items-center gap-2 py-2 px-1 text-xs sm:text-[13px] font-semibold transition-all relative cursor-pointer whitespace-nowrap ${
            activeSubTab === 'territorios-ativos' ? 'text-[#1455AC]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <CheckCircle2 className={`w-3.5 h-3.5 ${activeSubTab === 'territorios-ativos' ? 'text-[#1455AC]' : 'text-slate-400'}`} />
          <span>Territórios ativos</span>
          {activeSubTab === 'territorios-ativos' && (
            <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#1455AC] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSubTab('explorar');
            setIsAllTerritoriosModalOpen(true);
          }}
          className={`flex items-center gap-2 py-2 px-1 text-xs sm:text-[13px] font-semibold transition-all relative cursor-pointer whitespace-nowrap ${
            activeSubTab === 'explorar' ? 'text-[#1455AC]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className={`w-3.5 h-3.5 ${activeSubTab === 'explorar' ? 'text-[#1455AC]' : 'text-slate-400'}`} />
          <span>Explorar territórios</span>
          {activeSubTab === 'explorar' && (
            <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#1455AC] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSubTab('estatisticas');
            showToast('Estatísticas territoriais consolidadas de Inês Pereira');
          }}
          className={`flex items-center gap-2 py-2 px-1 text-xs sm:text-[13px] font-semibold transition-all relative cursor-pointer whitespace-nowrap ${
            activeSubTab === 'estatisticas' ? 'text-[#1455AC]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className={`w-3.5 h-3.5 ${activeSubTab === 'estatisticas' ? 'text-[#1455AC]' : 'text-slate-400'}`} />
          <span>Estatísticas</span>
          {activeSubTab === 'estatisticas' && (
            <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#1455AC] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveSubTab('preferencias');
            setIsEditPrefsModalOpen(true);
          }}
          className={`flex items-center gap-2 py-2 px-1 text-xs sm:text-[13px] font-semibold transition-all relative cursor-pointer whitespace-nowrap ${
            activeSubTab === 'preferencias' ? 'text-[#1455AC]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sliders className={`w-3.5 h-3.5 ${activeSubTab === 'preferencias' ? 'text-[#1455AC]' : 'text-slate-400'}`} />
          <span>Preferências territoriais</span>
          {activeSubTab === 'preferencias' && (
            <span className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-[#1455AC] rounded-full" />
          )}
        </button>
      </div>

      {/* =========================================================================
          GRID PRINCIPAL 3 COLUNAS (Correspondência exata a image.png):
          1. Os meus territórios no mapa (lg:col-span-5)
          2. Territórios ativos (4) (lg:col-span-4)
          3. Resumo dos Territórios (lg:col-span-3)
      ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* =========================================================================
            COLUNA 1: OS MEUS TERRITÓRIOS NO MAPA (lg:col-span-5) - FIEL A IMAGE.PNG
        ========================================================================= */}
        <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#E7F1F8] via-[#E2EDF6] to-[#DBE9F4] border border-slate-200/90 shadow-2xs relative overflow-hidden flex flex-col justify-between min-h-[460px] sm:min-h-[490px] select-none">
          {/* Controles de Zoom / Centralizar no canto superior esquerdo */}
          <div className="absolute top-5 left-5 z-20 flex flex-col bg-white rounded-2xl shadow-md border border-slate-200/80 overflow-hidden">
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.min(prev + 0.15, 1.6))}
              className="w-9 h-9 flex items-center justify-center hover:bg-slate-50 text-slate-800 hover:text-[#1455AC] transition-colors border-b border-slate-100 cursor-pointer text-base font-bold"
              title="Aumentar zoom"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.max(prev - 0.15, 0.85))}
              className="w-9 h-9 flex items-center justify-center hover:bg-slate-50 text-slate-800 hover:text-[#1455AC] transition-colors border-b border-slate-100 cursor-pointer text-base font-bold"
              title="Diminuir zoom"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => {
                setZoomLevel(1);
                setSelectedTerritorioId('faro');
                showToast('Mapa recentrado em Faro, Algarve');
              }}
              className="w-9 h-9 flex items-center justify-center hover:bg-slate-50 text-slate-700 hover:text-[#1455AC] transition-colors cursor-pointer"
              title="Recentrar em Faro"
            >
              <Crosshair className="w-4 h-4" />
            </button>
          </div>

          {/* SVG Cartográfico das 4 Regiões Orgânicas exatamente como na imagem de referência */}
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-300 relative py-4"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg
              viewBox="0 0 380 490"
              className="w-full h-full max-h-[470px] drop-shadow-xs"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Linhas de grelha cartográfica de fundo suaves exatamente como em image.png */}
              <g stroke="#C6DAE9" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.65">
                <line x1="75" y1="0" x2="75" y2="490" />
                <line x1="150" y1="0" x2="150" y2="490" />
                <line x1="225" y1="0" x2="225" y2="490" />
                <line x1="300" y1="0" x2="300" y2="490" />
                <line x1="0" y1="90" x2="380" y2="90" />
                <line x1="0" y1="180" x2="380" y2="180" />
                <line x1="0" y1="270" x2="380" y2="270" />
                <line x1="0" y1="360" x2="380" y2="360" />
                <line x1="0" y1="450" x2="380" y2="450" />
              </g>

              {/* 1. Região Norte (Verde pastel suave com contorno verde claro fino) */}
              <path
                d="M 175 60 
                   C 160 80, 150 120, 157 155 
                   C 161 175, 172 195, 187 205 
                   C 210 200, 232 185, 235 150 
                   C 238 115, 225 80, 205 62 
                   C 192 50, 183 52, 175 60 Z"
                fill="#CEF6E0"
                stroke="#70E1A5"
                strokeWidth="1.5"
                className="transition-colors hover:fill-[#bcf3d4] cursor-pointer"
                onClick={() => {
                  setSelectedTerritorioId('portugal');
                  showToast('Região Norte selecionada');
                }}
              />

              {/* 2. Região Centro (Pêssego/bege-alaranjado pastel com contorno laranja suave) */}
              <path
                d="M 157 155 
                   C 161 175, 172 195, 187 205 
                   C 198 225, 205 250, 215 268 
                   C 225 285, 210 300, 192 298 
                   C 172 296, 162 278, 160 250 
                   C 158 220, 159 185, 157 155 Z"
                fill="#FDE7D3"
                stroke="#FBB67B"
                strokeWidth="1.5"
                className="transition-colors hover:fill-[#fcdcc0] cursor-pointer"
                onClick={() => {
                  showToast('Região Centro selecionada');
                }}
              />

              {/* 3. Região Lisboa e Alentejo (Lilás suave com contorno violeta claro) */}
              <path
                d="M 160 250 
                   C 162 278, 172 296, 192 298 
                   C 215 300, 236 308, 236 335 
                   C 236 360, 225 380, 205 382 
                   C 178 385, 165 372, 164 345 
                   C 162 315, 164 280, 160 250 Z"
                fill="#EDE8FE"
                stroke="#9F7BF3"
                strokeWidth="1.5"
                className="transition-colors hover:fill-[#dfd7fd] cursor-pointer"
                onClick={() => {
                  setSelectedTerritorioId('loule');
                  showToast('Região Alentejo / Loulé');
                }}
              />

              {/* 4. Região Algarve / Sul (Lilás/Azul pastel com contorno violeta reforçado) */}
              <path
                d="M 164 345 
                   C 165 372, 178 385, 205 382 
                   C 225 380, 231 405, 230 425 
                   C 228 448, 208 458, 188 456 
                   C 168 454, 166 430, 165 405 
                   C 164 380, 164 358, 164 345 Z"
                fill="#DFD7FD"
                stroke="#7C3AED"
                strokeWidth="1.75"
                className="transition-colors hover:fill-[#d2c7fc] cursor-pointer"
                onClick={() => {
                  setSelectedTerritorioId('faro');
                  showToast('Território principal: Faro, Algarve');
                }}
              />

              {/* Marcador 1: Marcador Roxo na Região 3 (Loulé / Alentejo) - Fiel a image.png */}
              <g
                className="cursor-pointer group"
                onClick={() => {
                  setSelectedTerritorioId('loule');
                  showToast('Território ativo: Loulé');
                }}
              >
                {/* Sombra sutil */}
                <circle cx="177" cy="338" r="7" fill="black" opacity="0.12" />
                {/* Halo branco externo */}
                <circle cx="177" cy="336" r="6.5" fill="#FFFFFF" />
                {/* Núcleo Roxo Vibrante */}
                <circle cx="177" cy="336" r="4.5" fill="#8B5CF6" className="group-hover:scale-125 transition-transform origin-[177px_336px]" />
              </g>

              {/* Marcador 2: Marcador Azul na Região 4 (Algarve / Faro) - Fiel a image.png */}
              <g
                className="cursor-pointer group"
                onClick={() => {
                  setSelectedTerritorioId('faro');
                  showToast('Território principal: Faro, Algarve');
                }}
              >
                {/* Sombra suave */}
                <circle cx="196" cy="426" r="8" fill="black" opacity="0.16" />
                {/* Halo branco largo */}
                <circle cx="196" cy="424" r="7.5" fill="#FFFFFF" />
                {/* Núcleo Azul Vibrante */}
                <circle cx="196" cy="424" r="5" fill="#1455AC" className="group-hover:scale-125 transition-transform origin-[196px_424px]" />
              </g>
            </svg>
          </div>

          {/* Card Flutuante de Faro (Posicionado à direita exatamente como em image.png) */}
          <div className="absolute top-5 right-5 z-20 w-[225px] sm:w-[245px] bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-100/90 text-xs animate-in fade-in zoom-in-95 duration-200">
            {/* Cabeçalho: Nome e Badge Verde Principal */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-slate-900 text-base font-sans">
                  {selectedMapItem.nome}
                </h4>
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#E8F8F0] text-[#059669]">
                  {selectedMapItem.badge || 'Principal'}
                </span>
              </div>
            </div>

            {/* Tabela Limpa de Métricas do Território */}
            <div className="space-y-2 text-[11.5px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Região</span>
                <span className="font-bold text-slate-900">{selectedMapItem.regiao}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">País</span>
                <span className="font-bold text-slate-900">{selectedMapItem.pais}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Projetos ativos</span>
                <span className="font-bold text-slate-900">{selectedMapItem.projetosCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Comunidades</span>
                <span className="font-bold text-slate-900">{selectedMapItem.comunidadesCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">O meu impacto</span>
                <span className="font-extrabold text-[#059669]">
                  {selectedMapItem.impacto}
                </span>
              </div>
            </div>

            {/* Botão Ver território com seta */}
            <div className="pt-3.5">
              <button
                type="button"
                onClick={() => handleOpenDetail(selectedMapItem)}
                className="w-full py-2.5 px-3 rounded-xl border border-blue-200 hover:border-blue-400 text-[#1455AC] bg-white hover:bg-blue-50/50 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <span>Ver território</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#1455AC]" />
              </button>
            </div>
          </div>

          {/* Legenda do Mapa no canto inferior esquerdo - Fiel a image.png */}
          <div className="absolute bottom-5 left-5 z-20 bg-white rounded-2xl p-3.5 sm:p-4 shadow-md border border-slate-100/90 text-[11px] min-w-[170px] space-y-2">
            <span className="font-bold text-slate-900 block mb-1 text-xs font-sans">Legenda</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
              <span className="text-slate-700 text-[11px]">Território principal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shrink-0" />
              <span className="text-slate-700 text-[11px]">Territórios ativos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
              <span className="text-slate-700 text-[11px]">Territórios de interesse</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1455AC] shrink-0" />
              <span className="text-slate-700 text-[11px]">Territórios explorados</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            COLUNA 2: TERRITÓRIOS ATIVOS (4) (lg:col-span-4)
        ========================================================================= */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[13px] font-bold text-[#0F172A] font-sans">
                Territórios ativos ({territorios.length})
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="text-xs font-semibold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar território</span>
              </button>
            </div>

            {/* Lista dos 4 Territórios Ativos */}
            <div className="space-y-3">
              {territorios.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedTerritorioId(item.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 relative ${
                    selectedTerritorioId === item.id
                      ? 'border-[#1455AC] bg-blue-50/30 shadow-xs'
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                  }`}
                >
                  {/* Foto e Informações Principais */}
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="w-13 h-13 rounded-xl object-cover shrink-0 shadow-2xs border border-slate-100"
                    />

                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-[13px] font-bold text-slate-900 truncate">
                          {item.nome}
                        </h4>
                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold ${
                              item.badgeType === 'principal'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-blue-50 text-blue-700'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-500 truncate">
                        {item.subtitulo}
                      </div>

                      {/* Metadados de projetos e membros */}
                      <div className="flex items-center gap-2.5 text-[10px] text-slate-400 pt-0.5">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{item.projetosCount} projetos</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-slate-400" />
                          <span>{item.membrosCount} membros</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impacto e Menu Três Pontos */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right">
                      <span className="text-[9.5px] text-slate-400 block leading-tight">Impacto</span>
                      <span
                        className={`text-[11.5px] font-bold ${
                          item.impacto === 'Alto'
                            ? 'text-emerald-600'
                            : 'text-amber-600'
                        }`}
                      >
                        {item.impacto}
                      </span>
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === item.id ? null : item.id);
                        }}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Opções do território"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown de Opções */}
                      {activeMenuId === item.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-40 animate-in fade-in duration-150 text-xs"
                        >
                          {item.tipo !== 'principal' && (
                            <button
                              type="button"
                              onClick={() => handleSetPrincipal(item.id)}
                              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium cursor-pointer"
                            >
                              <Star className="w-3.5 h-3.5 text-amber-500" />
                              <span>Definir como Principal</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onNavigateToTab?.('explorar');
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium cursor-pointer"
                          >
                            <Globe className="w-3.5 h-3.5 text-[#1455AC]" />
                            <span>Explorar no Mapa Global</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onNavigateToTab?.('comunidade');
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium cursor-pointer"
                          >
                            <Users className="w-3.5 h-3.5 text-purple-600" />
                            <span>Ver Comunidades Locais</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onNavigateToTab?.('impacto');
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Ver Projetos de Impacto</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenDetail(item)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium cursor-pointer border-t border-slate-100 mt-1 pt-2"
                          >
                            <Building2 className="w-3.5 h-3.5 text-slate-500" />
                            <span>Ver Detalhes do Território</span>
                          </button>
                          {territorios.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveTerritorio(item.id)}
                              className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 flex items-center gap-2 text-rose-600 font-medium cursor-pointer border-t border-slate-100 mt-1 pt-2"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                              <span>Remover Território</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão "Ver todos os territórios (4)" */}
          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              type="button"
              onClick={() => setIsAllTerritoriosModalOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl border border-blue-200 hover:border-blue-300 bg-white hover:bg-blue-50/50 text-[#1455AC] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Ver todos os territórios ({territorios.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            COLUNA 3: RESUMO DOS TERRITÓRIOS (lg:col-span-3)
        ========================================================================= */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-bold text-[#0F172A] font-sans">
                Resumo dos Territórios
              </h3>

              {/* Dropdown de Período ("Este mês v") */}
              <select
                value={periodoFiltro}
                onChange={(e) => setPeriodoFiltro(e.target.value as any)}
                className="text-[11px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-hidden cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <option value="mes">Este mês</option>
                <option value="trimestre">Últimos 3 meses</option>
                <option value="ano">Este ano</option>
              </select>
            </div>

            {/* Donut Chart com "4 Territórios ativos" no centro + Legenda Lateral */}
            <div className="flex items-center justify-between gap-3 my-3">
              {/* Donut Ring SVG */}
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#F1F5F9" strokeWidth="9" />
                  {/* Verde: Principais (1/17 ~ 6%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="9"
                    strokeDasharray="25, 240"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Roxo: Ativos (3/17 ~ 18%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="9"
                    strokeDasharray="45, 240"
                    strokeDashoffset="-28"
                    strokeLinecap="round"
                  />
                  {/* Laranja: Interesse (5/17 ~ 30%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="9"
                    strokeDasharray="65, 240"
                    strokeDashoffset="-76"
                    strokeLinecap="round"
                  />
                  {/* Azul: Explorados (8/17 ~ 46%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#1455AC"
                    strokeWidth="9"
                    strokeDasharray="90, 240"
                    strokeDashoffset="-144"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Centro do Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-[#0F172A] font-sans leading-none">
                    {territorios.length}
                  </span>
                  <span className="text-[9px] font-medium text-slate-500 mt-0.5 leading-tight max-w-[55px]">
                    Territórios ativos
                  </span>
                </div>
              </div>

              {/* Legenda Lateral com Números Exatos */}
              <div className="space-y-1.5 text-[11px] min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>Principais</span>
                  </div>
                  <span className="font-bold text-slate-800">
                    {territorios.filter((t) => t.tipo === 'principal').length}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                    <span>Ativos</span>
                  </div>
                  <span className="font-bold text-slate-800">
                    {territorios.filter((t) => t.tipo === 'ativo').length}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span>Interesse</span>
                  </div>
                  <span className="font-bold text-slate-800">5</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-[#1455AC] shrink-0" />
                    <span>Explorados</span>
                  </div>
                  <span className="font-bold text-slate-800">8</span>
                </div>
              </div>
            </div>

            {/* Grid 2x2 de Métricas (Fiel a image.png) */}
            <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
              {/* Projetos envolvidos */}
              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="text-[10px] text-slate-500 block leading-tight">Projetos envolvidos</span>
                <span className="text-base font-black text-slate-900 font-sans block mt-0.5">
                  {metricsData.projetos}
                </span>
                <span className="text-[9.5px] font-bold text-emerald-600 block mt-0.5">
                  {metricsData.projetosVar}
                </span>
              </div>

              {/* Comunidades */}
              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="text-[10px] text-slate-500 block leading-tight">Comunidades</span>
                <span className="text-base font-black text-slate-900 font-sans block mt-0.5">
                  {metricsData.comunidades}
                </span>
                <span className="text-[9.5px] font-bold text-emerald-600 block mt-0.5">
                  {metricsData.comunidadesVar}
                </span>
              </div>

              {/* Contribuições */}
              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="text-[10px] text-slate-500 block leading-tight">Contribuições</span>
                <span className="text-base font-black text-slate-900 font-sans block mt-0.5">
                  {metricsData.contrib}
                </span>
                <span className="text-[9.5px] font-bold text-emerald-600 block mt-0.5">
                  {metricsData.contribVar}
                </span>
              </div>

              {/* Impacto gerado */}
              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                <span className="text-[10px] text-slate-500 block leading-tight">Impacto gerado</span>
                <span className="text-base font-black text-emerald-600 font-sans block mt-0.5">
                  {metricsData.impacto}
                </span>
                <span className="text-[9.5px] font-bold text-emerald-600 block mt-0.5">
                  {metricsData.impactoVar}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-3 text-center">
            <span className="text-[11px] text-slate-400">Dados consolidados do perfil</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LINHA 2 (3 CARDS NO MESMO NÍVEL):
          1. Explorar novos territórios (3 cards por vez para caberem os outros)
          2. Preferências territoriais (Afinado, sobe e alinha perfeitamente)
          3. Atividade recente nos seus territórios (Ao mesmo nível)
      ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {/* =====================================================================
            CARD 1: EXPLORAR NOVOS TERRITÓRIOS (3 por 3 cards com navegação)
        ===================================================================== */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[13px] font-bold text-[#0F172A] font-sans">
                Explorar novos territórios
              </h3>
              {/* Controles de Navegação 3 por 3 */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevCarousel}
                  className="w-6 h-6 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1455AC] transition-colors cursor-pointer"
                  title="Territórios anteriores"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10.5px] font-bold text-slate-500 px-1">
                  {Math.floor(carouselIndex / 3) + 1}/3
                </span>
                <button
                  type="button"
                  onClick={handleNextCarousel}
                  className="w-6 h-6 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1455AC] transition-colors cursor-pointer"
                  title="Próximos territórios"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-[11.5px] text-slate-500 mb-3.5">
              Descubra territórios e comunidades alinhados com os seus interesses.
            </p>

            {/* Grid com exatamente 3 cards lado a lado */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {novosTerritorios.slice(carouselIndex, carouselIndex + 3).map((city) => (
                <div
                  key={city.id}
                  className="rounded-xl border border-slate-100 overflow-hidden bg-white flex flex-col justify-between group hover:border-blue-200 hover:shadow-xs transition-all"
                >
                  <div className="h-16 sm:h-20 w-full overflow-hidden relative">
                    <img
                      src={city.imagem}
                      alt={city.nome}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2 text-center space-y-1">
                    <div>
                      <h5 className="text-[11.5px] font-bold text-slate-900 leading-tight truncate" title={city.nome}>
                        {city.nome}
                      </h5>
                      <span className="text-[9.5px] text-slate-400 block truncate">{city.pais}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedExploreCity(city);
                        setIsExploreCityModalOpen(true);
                      }}
                      className="w-full py-1 px-1.5 rounded-lg border border-blue-200 hover:border-blue-400 text-[#1455AC] bg-white hover:bg-blue-50 font-bold text-[10px] transition-colors cursor-pointer"
                    >
                      Explorar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores do carrossel */}
          <div className="flex items-center justify-center gap-1.5 pt-3 mt-2 border-t border-slate-100/80">
            {[0, 3, 6].map((idx, i) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCarouselIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  carouselIndex === idx ? 'w-5 bg-[#1455AC]' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                }`}
                title={`Grupo ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* =====================================================================
            CARD 2: PREFERÊNCIAS TERRITORIAIS (Afinado, sobe e alinha no mesmo nível)
        ===================================================================== */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[13px] font-bold text-[#0F172A] font-sans">
                Preferências territoriais
              </h3>
              <button
                type="button"
                onClick={() => setIsEditPrefsModalOpen(true)}
                className="text-xs font-semibold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar</span>
              </button>
            </div>
            <p className="text-[11.5px] text-slate-500 mb-3.5">
              Personalize as recomendações de territórios que recebe.
            </p>

            {/* Grid 2x2 Afinado Fiel a image.png */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Países preferidos */}
              <div className="p-2.5 sm:p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-2.5 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-[#1455AC] flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9.5px] text-slate-400 font-medium block leading-tight">Países preferidos</span>
                  <span className="text-xs font-bold text-slate-800 truncate block mt-0.5" title={preferencias.paises}>
                    {preferencias.paises}
                  </span>
                </div>
              </div>

              {/* Regiões preferidas */}
              <div className="p-2.5 sm:p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-2.5 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-[#1455AC] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9.5px] text-slate-400 font-medium block leading-tight">Regiões preferidas</span>
                  <span className="text-xs font-bold text-slate-800 truncate block mt-0.5" title={preferencias.regioes}>
                    {preferencias.regioes}
                  </span>
                </div>
              </div>

              {/* Temas de interesse */}
              <div className="p-2.5 sm:p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-2.5 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-pink-50 border border-pink-100 text-pink-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9.5px] text-slate-400 font-medium block leading-tight">Temas de interesse</span>
                  <span className="text-xs font-bold text-slate-800 truncate block mt-0.5" title={preferencias.temas}>
                    {preferencias.temas}
                  </span>
                </div>
              </div>

              {/* Nível de envolvimento */}
              <div className="p-2.5 sm:p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-2.5 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9.5px] text-slate-400 font-medium block leading-tight">Nível de envolvimento</span>
                  <span className="text-xs font-bold text-slate-800 truncate block mt-0.5" title={preferencias.nivel}>
                    {preferencias.nivel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-2 border-t border-slate-100/80 flex items-center justify-between">
            <span className="text-[10.5px] text-slate-400 font-medium">Recomendações ativas</span>
            <span className="text-[10.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Personalizado
            </span>
          </div>
        </div>

        {/* =====================================================================
            CARD 3: ATIVIDADE RECENTE NOS SEUS TERRITÓRIOS (Ao mesmo nível)
        ===================================================================== */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[13px] font-bold text-[#0F172A] font-sans">
                Atividade recente nos seus territórios
              </h3>
              <button
                type="button"
                onClick={() => setIsAllActivitiesModalOpen(true)}
                className="text-xs font-semibold text-[#1455AC] hover:underline cursor-pointer"
              >
                Ver todas
              </button>
            </div>
            <p className="text-[11.5px] text-slate-500 mb-3.5">
              Acompanhe as últimas interações e novidades.
            </p>

            {/* Feed de Atividades Compacto */}
            <div className="space-y-3">
              {/* Item 1 */}
              <div
                onClick={() => {
                  onNavigateToTab?.('impacto');
                  showToast('A abrir projeto "Mobilidade Sustentável em Faro"');
                }}
                className="flex items-start gap-2.5 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-[#E8F8F0] text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] text-slate-800 leading-snug group-hover:text-[#1455AC] transition-colors truncate">
                    Comentou em <span className="font-bold">"Mobilidade Sustentável em Faro"</span>
                  </p>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Faro • Há 2 horas
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div
                onClick={() => {
                  onNavigateToTab?.('impacto');
                  showToast('A abrir iniciativa "Escola Verde" em Loulé');
                }}
                className="flex items-start gap-2.5 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-[#FEF3E2] text-amber-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] text-slate-800 leading-snug group-hover:text-[#1455AC] transition-colors truncate">
                    Apoiou a iniciativa <span className="font-bold">"Escola Verde"</span>
                  </p>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Loulé • Há 1 dia
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div
                onClick={() => {
                  onNavigateToTab?.('participacao-consultas');
                  showToast('A abrir consulta pública "Plano Estratégico Olhão 2030"');
                }}
                className="flex items-start gap-2.5 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-[#F3E8FF] text-purple-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <Vote className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] text-slate-800 leading-snug group-hover:text-[#1455AC] transition-colors truncate">
                    Participou na consulta <span className="font-bold">"Plano Estratégico Olhão 2030"</span>
                  </p>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Olhão • Há 2 dias
                  </div>
                </div>
              </div>

              {/* Item 4 */}
              <div
                onClick={() => {
                  onNavigateToTab?.('explorar');
                  showToast('A aceder às 56 oportunidades ativas em Portugal');
                }}
                className="flex items-start gap-2.5 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#1455AC] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] text-slate-800 leading-snug group-hover:text-[#1455AC] transition-colors truncate">
                    Nova oportunidade em <span className="font-bold">Portugal</span>
                  </p>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    56 novos projetos • Há 3 dias
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-2 border-t border-slate-100/80">
            <button
              type="button"
              onClick={() => setIsAllActivitiesModalOpen(true)}
              className="w-full text-center text-xs font-semibold text-[#1455AC] hover:text-blue-700 transition-colors cursor-pointer"
            >
              Ver histórico completo de atividades
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BANNER INFERIOR LARGO: "O mundo é uma vila." (Fiel a image.png)
      ========================================================================= */}
      <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#eff4ff] via-[#f5f3ff] to-[#faf5ff] border border-[#e0e7ff] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {/* Ilustração Colorida de Comunidade */}
          <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center shrink-0 border border-indigo-100 p-2">
            <svg viewBox="0 0 36 36" className="w-full h-full" fill="none">
              <circle cx="18" cy="11" r="4" fill="#F59E0B" />
              <circle cx="10" cy="24" r="4" fill="#EC4899" />
              <circle cx="26" cy="24" r="4" fill="#3B82F6" />
              <circle cx="18" cy="20" r="3.5" fill="#10B981" />
              <path d="M12 28 C12 25, 24 25, 24 28" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-[#0F172A] font-sans">
              O mundo é uma vila.
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Ao conectar territórios, comunidades e pessoas, multiplicamos o impacto positivo.
            </p>
          </div>
        </div>

        {/* Botão Roxo Vibrante "Explorar o Mundo ->" navegando diretamente para a tela de Explorar */}
        <button
          type="button"
          onClick={() => {
            if (onNavigateToTab) {
              onNavigateToTab('explorar');
            } else {
              showToast('A redirecionar para o Explorador do Mundo');
            }
          }}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer hover:shadow-md"
        >
          <span>Explorar o Mundo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* =========================================================================
          MODAIS INTERATIVOS
      ========================================================================= */}

      {/* 1. Modal Adicionar Novo Território com Integração a COUNTRIES_DATA */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1455AC] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    Adicionar Novo Território
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Conecte uma cidade, região ou país aos seus territórios.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTerritorioSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nome da cidade ou município
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Coimbra, Braga, Évora, Guimarães..."
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1455AC] text-slate-800 text-xs"
                />
              </div>

              {/* Sugestões rápidas de territórios portugueses */}
              <div>
                <span className="text-[10.5px] font-medium text-slate-400 block mb-1.5">
                  Sugestões rápidas:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Coimbra', 'Braga', 'Évora', 'Guimarães', 'Aveiro', 'Funchal'].map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => setNovoNome(sug)}
                      className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1455AC] font-medium text-[11px] transition-colors cursor-pointer"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">País</label>
                  <select
                    value={novoPais}
                    onChange={(e) => setNovoPais(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1455AC] text-slate-800 text-xs cursor-pointer bg-white"
                  >
                    <option value="Portugal">Portugal 🇵🇹</option>
                    <option value="Espanha">Espanha 🇪🇸</option>
                    <option value="Brasil">Brasil 🇧🇷</option>
                    <option value="Cabo Verde">Cabo Verde 🇨🇻</option>
                    <option value="Angola">Angola 🇦🇴</option>
                    <option value="Moçambique">Moçambique 🇲🇿</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Região</label>
                  <select
                    value={novaRegiao}
                    onChange={(e) => setNovaRegiao(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1455AC] text-slate-800 text-xs cursor-pointer bg-white"
                  >
                    <option value="Algarve">Algarve</option>
                    <option value="Norte">Norte</option>
                    <option value="Centro">Centro</option>
                    <option value="Lisboa">Lisboa e Vale do Tejo</option>
                    <option value="Alentejo">Alentejo</option>
                    <option value="Açores">Açores</option>
                    <option value="Madeira">Madeira</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tipo de vínculo</label>
                <select
                  value={novoTipo}
                  onChange={(e) => setNovoTipo(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1455AC] text-slate-800 text-xs cursor-pointer bg-white"
                >
                  <option value="ativo">Território Ativo (contribuo com projetos e ações)</option>
                  <option value="interesse">Território de Interesse (acompanho atualizações)</option>
                  <option value="principal">Território Principal (meu foco primário)</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 text-blue-800 text-[11px] leading-relaxed">
                Ao adicionar um território, você receberá notificações de novos projetos e iniciativas locais para contribuir.
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1455AC] hover:bg-[#0047D6] text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Adicionar Território
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Modal Detalhes do Território com Ações Reais para o Sistema */}
      {isDetailModalOpen && selectedDetailTerritorio && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  {selectedDetailTerritorio.nome}
                </h3>
                {selectedDetailTerritorio.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                    {selectedDetailTerritorio.badge}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <img
                src={selectedDetailTerritorio.imagem}
                alt={selectedDetailTerritorio.nome}
                className="w-full h-44 rounded-xl object-cover"
              />

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">Região</span>
                  <span className="font-bold text-slate-800">{selectedDetailTerritorio.regiao}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">País</span>
                  <span className="font-bold text-slate-800">{selectedDetailTerritorio.pais}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">Projetos Ativos</span>
                  <span className="font-bold text-slate-800">{selectedDetailTerritorio.projetosCount} projetos</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">Membros na Comunidade</span>
                  <span className="font-bold text-slate-800">{selectedDetailTerritorio.membrosCount}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center justify-between">
                <span>O seu nível de impacto neste território:</span>
                <span className="font-bold text-emerald-700">{selectedDetailTerritorio.impacto}</span>
              </div>

              {/* Botões de Ação Conectados ao Sistema */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    onNavigateToTab?.('impacto');
                  }}
                  className="py-2 px-3 rounded-xl border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-[#1455AC] bg-slate-50/50 hover:bg-blue-50/50 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ver Projetos Locais</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    onNavigateToTab?.('comunidade');
                  }}
                  className="py-2 px-3 rounded-xl border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-[#1455AC] bg-slate-50/50 hover:bg-blue-50/50 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5 text-purple-600" />
                  <span>Ver Comunidades</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsDetailModalOpen(false);
                  onNavigateToTab?.('explorar');
                }}
                className="px-4 py-2 rounded-xl bg-[#1455AC] hover:bg-[#0047D6] text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explorar no Mapa Global</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal Editar Preferências Territoriais */}
      {isEditPrefsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Editar Preferências Territoriais
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditPrefsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Países preferidos</label>
                <input
                  type="text"
                  value={preferencias.paises}
                  onChange={(e) => setPreferencias({ ...preferencias, paises: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1455AC] text-slate-800 text-xs"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Separados por vírgula</span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Regiões preferidas</label>
                <input
                  type="text"
                  value={preferencias.regioes}
                  onChange={(e) => setPreferencias({ ...preferencias, regioes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1455AC] text-slate-800 text-xs"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Separados por vírgula</span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Temas de interesse</label>
                <input
                  type="text"
                  value={preferencias.temas}
                  onChange={(e) => setPreferencias({ ...preferencias, temas: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1455AC] text-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nível de envolvimento pretendido</label>
                <select
                  value={preferencias.nivel}
                  onChange={(e) => setPreferencias({ ...preferencias, nivel: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#1455AC] text-slate-800 text-xs cursor-pointer bg-white"
                >
                  <option value="Alto">Alto (Participação ativa semanal em projetos)</option>
                  <option value="Médio">Médio (Acompanhamento e suporte periódico)</option>
                  <option value="Moderado">Moderado (Observação e consultas públicas)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditPrefsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditPrefsModalOpen(false);
                  showToast('Preferências territoriais salvas com sucesso!');
                }}
                className="px-4 py-2 rounded-xl bg-[#1455AC] hover:bg-[#0047D6] text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal Ver Todos os Territórios */}
      {isAllTerritoriosModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Todos os Territórios Ativos ({territorios.length})
                </h3>
                <p className="text-[11px] text-slate-400">
                  Gerencie os territórios nos quais você atua e gera impacto.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAllTerritoriosModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 max-h-[50vh] overflow-y-auto">
              {territorios.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="w-11 h-11 rounded-xl object-cover shrink-0 border border-slate-100"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 text-xs truncate">{item.nome}</h4>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{item.subtitulo}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span>{item.projetosCount} projetos</span>
                        <span>•</span>
                        <span>{item.membrosCount} membros</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsAllTerritoriosModalOpen(false);
                      handleOpenDetail(item);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-[#1455AC] text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    Ver detalhes
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsAllTerritoriosModalOpen(false);
                  setIsAddModalOpen(true);
                }}
                className="text-xs font-bold text-[#1455AC] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar outro território</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAllTerritoriosModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal Explorar Cidade do Carrossel */}
      {isExploreCityModalOpen && selectedExploreCity && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Explorar {selectedExploreCity.nome}
                </h3>
                <span className="text-xs text-slate-400">{selectedExploreCity.pais}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsExploreCityModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <img
                src={selectedExploreCity.imagem}
                alt={selectedExploreCity.nome}
                className="w-full h-36 rounded-xl object-cover"
              />

              <p className="text-slate-600 leading-relaxed text-xs">
                {selectedExploreCity.descricao}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">Projetos Ativos</span>
                  <span className="font-bold text-slate-800">{selectedExploreCity.projetos} projetos</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">Cidadãos e Membros</span>
                  <span className="font-bold text-slate-800">{selectedExploreCity.membros}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsExploreCityModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleAddCityFromCarousel(selectedExploreCity)}
                className="px-4 py-2 rounded-xl bg-[#1455AC] hover:bg-[#0047D6] text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar aos Meus Territórios</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal Ver Todas as Atividades Recentes */}
      {isAllActivitiesModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  Histórico de Atividade nos Territórios
                </h3>
                <p className="text-[11px] text-slate-400">
                  Registro completo de participações, comentários e votos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAllActivitiesModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E8F8F0] text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-800 font-semibold">
                    Comentou no projeto "Mobilidade Sustentável em Faro"
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    "Excelente iniciativa para a expansão de ciclovias até a Universidade das Gambelas."
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Faro • Há 2 horas</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FEF3E2] text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-800 font-semibold">
                    Apoiou a iniciativa "Escola Verde"
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Subscreveu o apoio financeiro comunitário para hortas pedagógicas.
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Loulé • Há 1 dia</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F3E8FF] text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Vote className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-800 font-semibold">
                    Participou na consulta pública "Plano Estratégico Olhão 2030"
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Enviou propostas sobre a revitalização da frente de Ria Formosa e transportes solares.
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Olhão • Há 2 dias</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#1455AC] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-800 font-semibold">
                    Nova oportunidade em Portugal
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Abertura do fundo nacional para transição energética em comunidades do interior.
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Portugal • Há 3 dias</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAllActivitiesModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#1455AC] hover:bg-[#0047D6] text-white font-bold text-xs cursor-pointer"
              >
                Fechar Histórico
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
