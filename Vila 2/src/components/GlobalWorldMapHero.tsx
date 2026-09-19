import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface MapHeroCategory {
  name: string;
  dotColor: string;
  glowColor: string;
}

interface GlobalWorldMapHeroProps {
  onButtonClick?: () => void;
  onExploreMap?: () => void;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  className?: string;
}

// 4 categorias no primeiro pill + 1 categoria no segundo pill (idêntico à imagem de referência)
const PRIMARY_CATEGORIES: MapHeroCategory[] = [
  { name: 'Conferências', dotColor: 'bg-[#0284C7]', glowColor: 'shadow-[0_0_8px_#38BDF8]' },
  { name: 'Cultura', dotColor: 'bg-[#F43F5E]', glowColor: 'shadow-[0_0_8px_#FB7185]' },
  { name: 'Desporto', dotColor: 'bg-[#84CC16]', glowColor: 'shadow-[0_0_8px_#A3E635]' },
  { name: 'Tecnologia', dotColor: 'bg-[#F59E0B]', glowColor: 'shadow-[0_0_8px_#FBBF24]' },
];

const SECONDARY_CATEGORIES: MapHeroCategory[] = [
  { name: 'Outros', dotColor: 'bg-[#8B5CF6]', glowColor: 'shadow-[0_0_8px_#C084FC]' },
];

export const GlobalWorldMapHero: React.FC<GlobalWorldMapHeroProps> = ({
  onButtonClick,
  onExploreMap,
  title = 'O mundo está acontecendo agora.',
  subtitle = 'Explore eventos em todo o planeta em tempo real.',
  buttonText = 'Explorar mapa interativo',
  className = '',
}) => {
  const handleAction = onButtonClick || onExploreMap;

  return (
    <div
      id="global-world-map-hero"
      className={`rounded-3xl bg-[#060C1E] p-6 sm:p-7 lg:p-8 min-h-[300px] sm:min-h-[320px] flex flex-col justify-between text-white shadow-2xs border border-slate-800/80 relative overflow-hidden select-none group ${className}`}
    >
      {/* 
        1. Imagem de Satélite Noturna da Terra com Luzes das Cidades (NASA / Suomi NPP)
        Posicionada de forma a mostrar as Américas, Europa, África, Ásia e Austrália
      */}
      <div
        className="absolute inset-0 bg-cover bg-[position:56%_40%] opacity-90 mix-blend-screen pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.01]"
        style={{
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/The_earth_at_night.jpg/1920px-The_earth_at_night.jpg')`,
        }}
      />

      {/* 2. Gradiente Suave da Esquerda para Garantir Contraste Perfeito do Texto */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060C1E] via-[#060C1E]/80 to-transparent pointer-events-none w-3/5" />

      {/* 
        3. Hotspots de Eventos com Halo Radial Fluido (Exatamente como na Imagem de Referência)
      */}
      {/* América do Norte - Costa Leste (Nova Iorque / DC) - Halo Suave Lilás/Branco */}
      <div className="absolute top-[28%] left-[39%] pointer-events-none z-10 hidden sm:block">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-12 h-12 rounded-full bg-indigo-400/35 blur-md animate-pulse" />
          <div className="absolute w-6 h-6 rounded-full bg-indigo-300/70 blur-xs" />
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
        </div>
      </div>

      {/* América do Norte - Costa Oeste (Califórnia) - Âmbar Suave */}
      <div className="absolute top-[26%] left-[34%] pointer-events-none z-10 hidden sm:block">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-8 h-8 rounded-full bg-amber-400/30 blur-sm" />
          <div className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_#fde047]" />
        </div>
      </div>

      {/* América do Sul - Brasil (São Paulo / Rio) - Grande Halo Âmbar/Laranja Radiante */}
      <div className="absolute top-[58%] left-[46%] pointer-events-none z-10 hidden sm:block">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-14 h-14 rounded-full bg-orange-500/40 blur-lg animate-pulse" />
          <div className="absolute w-7 h-7 rounded-full bg-amber-400/80 blur-xs" />
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
        </div>
      </div>

      {/* Europa - Londres / Paris / Berlim - Halo Azul-Gelo / Ciano Radiante */}
      <div className="absolute top-[28%] left-[63%] pointer-events-none z-10 hidden sm:block">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-14 h-14 rounded-full bg-sky-400/40 blur-lg animate-pulse" />
          <div className="absolute w-7 h-7 rounded-full bg-cyan-300/80 blur-xs" />
          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
        </div>
      </div>

      {/* Europa do Norte - Ponto Ciano */}
      <div className="absolute top-[20%] left-[62%] pointer-events-none z-10 hidden sm:block">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
      </div>

      {/* Ásia Central / Médio Oriente - Ponto Dourado Radiante */}
      <div className="absolute top-[35%] left-[73%] pointer-events-none z-10 hidden sm:block">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-10 h-10 rounded-full bg-amber-500/35 blur-md" />
          <div className="absolute w-5 h-5 rounded-full bg-amber-400/80 blur-2xs" />
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      </div>

      {/* Ásia Oriental (China / Japão) - Halo Dourado Radiante */}
      <div className="absolute top-[36%] left-[82%] pointer-events-none z-10 hidden sm:block">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-12 h-12 rounded-full bg-amber-400/40 blur-md animate-pulse" />
          <div className="absolute w-6 h-6 rounded-full bg-amber-300/80 blur-xs" />
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      </div>

      {/* Sudeste Asiático / Índia - Pontos Luminosos */}
      <div className="absolute top-[48%] left-[78%] pointer-events-none z-10 hidden sm:block">
        <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#67e8f9]" />
      </div>

      {/* Austrália (Sydney / Melbourne) - Halo Violeta / Rosa Radiante */}
      <div className="absolute top-[61%] left-[87%] pointer-events-none z-10 hidden sm:block">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-12 h-12 rounded-full bg-purple-500/40 blur-lg animate-pulse" />
          <div className="absolute w-6 h-6 rounded-full bg-fuchsia-400/75 blur-xs" />
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      </div>

      {/* África do Sul - Ponto Âmbar */}
      <div className="absolute top-[67%] left-[61%] pointer-events-none z-10 hidden sm:block">
        <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
      </div>

      {/* 
        4. Conteúdo Textual Superior (Esquerda)
        Organizado exatamente como na imagem:
        - Título em duas linhas nítidas
        - Subtítulo em duas linhas nítidas
        - Botão com gradiente Azul -> Verde Esmeralda e cantos suaves
      */}
      <div className="relative z-10 max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] pt-1 font-sans">
        <h2 className="text-[26px] sm:text-3xl lg:text-4xl font-extrabold text-white leading-[1.18] font-sans tracking-tight">
          O mundo está
          <br />
          acontecendo agora.
        </h2>

        <p className="text-slate-200/90 text-xs sm:text-sm lg:text-[15px] mt-3 leading-relaxed font-normal font-sans">
          Explore eventos em todo o planeta
          <br />
          em tempo real.
        </p>

        {/*
          Botão Brand Navy com Acento Orange
        */}
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            onClick={handleAction}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#1455AC] hover:bg-[#0F448A] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-black/20 hover:scale-[1.01] active:scale-[0.98] cursor-pointer group"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform stroke-[2.3]" />
          </button>
        </div>
      </div>

      {/* 
        5. Rodapé: Duas Cápsulas de Legenda Separadas (idênticas à imagem de referência)
        - Cápsula 1 (Esquerda): Conferências, Cultura, Desporto, Tecnologia
        - Cápsula 2 (Direita): Outros
      */}
      <div className="relative z-10 pt-6 mt-auto">
        <div className="flex flex-wrap items-center gap-3">
          {/* Cápsula 1: 4 categorias principais */}
          <div className="inline-flex items-center gap-3.5 sm:gap-4 bg-[#0A1226]/85 border border-white/10 rounded-full px-4 sm:px-5 py-2 backdrop-blur-md shadow-xs">
            {PRIMARY_CATEGORIES.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 sm:gap-2">
                <span className={`w-2 h-2 rounded-full ${item.dotColor} ${item.glowColor} shrink-0`} />
                <span className="font-medium text-slate-200 text-[11px] sm:text-xs whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          {/* Cápsula 2: Categoria Outros */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#0A1226]/85 border border-white/10 rounded-full px-4 py-2 backdrop-blur-md shadow-xs">
            {SECONDARY_CATEGORIES.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 sm:gap-2">
                <span className={`w-2 h-2 rounded-full ${item.dotColor} ${item.glowColor} shrink-0`} />
                <span className="font-medium text-slate-200 text-[11px] sm:text-xs whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

