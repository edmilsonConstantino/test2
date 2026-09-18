import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

interface LatestUpdateItem {
  id: number;
  time: string;
  title: string;
  statusColor: string;
  glow?: string;
  pulse?: boolean;
}

const LATEST_UPDATES: LatestUpdateItem[] = [
  {
    id: 1,
    time: 'Há 12 min',
    title: 'Cimeira do Clima: líderes mundiais fecham acordo para acelerar transição energética',
    statusColor: 'bg-emerald-500',
    glow: 'shadow-[0_0_8px_#10b981]',
    pulse: true,
  },
  {
    id: 2,
    time: 'Há 45 min',
    title: 'Bancos centrais sinalizam novos cortes nas taxas de juro de referência globais',
    statusColor: 'bg-blue-500',
    glow: 'shadow-[0_0_6px_#3b82f6]',
  },
  {
    id: 3,
    time: 'Há 1h',
    title: 'Apple e parceiros revelam novos avanços em inteligência artificial multimodal',
    statusColor: 'bg-amber-500',
    glow: 'shadow-[0_0_6px_#f59e0b]',
  },
  {
    id: 4,
    time: 'Há 3h',
    title: 'Telescópio espacial capta assinaturas de vapor de água em atmosfera de exoplaneta',
    statusColor: 'bg-purple-500',
    glow: 'shadow-[0_0_6px_#a855f7]',
  },
  {
    id: 5,
    time: 'Há 5h',
    title: 'Acordo multilateral aprova novas regras internacionais de governança digital',
    statusColor: 'bg-rose-500',
    glow: 'shadow-[0_0_6px_#f43f5e]',
  },
];

interface LatestNewsUpdatesWidgetProps {
  className?: string;
  onOpenTimeline?: () => void;
}

export const LatestNewsUpdatesWidget: React.FC<LatestNewsUpdatesWidgetProps> = ({
  className = '',
  onOpenTimeline,
}) => {
  return (
    <div
      id="latest-news-updates-widget"
      className={`rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 min-h-[340px] sm:min-h-[370px] lg:min-h-[400px] flex flex-col justify-between shadow-2xs font-sans ${className}`}
    >
      <div>
        {/* Cabeçalho do Card: Ícone de Relógio + Título + Badge Ao Vivo */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1455AC]/10 text-[#1455AC] flex items-center justify-center shrink-0 border border-[#1455AC]/20">
              <Clock className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 font-sans tracking-tight">
              Últimas Atualizações
            </h3>
          </div>

          {/* Badge Indicador "Ao Vivo" */}
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10.5px] font-bold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span>Ao vivo</span>
          </span>
        </div>

        {/* Lista de Atualizações com Linha do Tempo */}
        <div className="pt-3.5 space-y-3 font-sans">
          {LATEST_UPDATES.map((item) => (
            <article
              key={item.id}
              className="group flex items-start gap-2.5 p-1.5 -mx-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {/* Bolinha colorida de status */}
              <div className="pt-1 shrink-0">
                <span className="relative flex h-2 w-2">
                  {item.pulse && (
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${item.statusColor} opacity-75`} />
                  )}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${item.statusColor} ${item.glow || ''}`} />
                </span>
              </div>

              {/* Conteúdo: Horário Relativo + Título da Notícia */}
              <div className="flex-1 min-w-0">
                <span className="text-[10.5px] font-semibold text-slate-400 block leading-none mb-1">
                  {item.time}
                </span>
                <h4
                  className="text-xs sm:text-[12.5px] font-medium text-slate-800 leading-snug line-clamp-1 group-hover:text-[#1455AC] transition-colors font-sans truncate"
                  title={item.title}
                >
                  {item.title}
                </h4>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Link de Rodapé: "Ver linha do tempo completa →" */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        <button
          type="button"
          onClick={onOpenTimeline}
          className="w-full flex items-center justify-center gap-1.5 text-xs sm:text-[12.5px] font-bold text-[#1455AC] hover:underline transition-colors group cursor-pointer"
        >
          <span>Ver linha do tempo completa</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform stroke-[2]" />
        </button>
      </div>
    </div>
  );
};
