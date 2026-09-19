import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Sparkline } from './MiniCharts';

export interface KpiCardData {
  id: string;
  label: string;
  value: string;
  trend?: string;
  trendPeriod?: string;
  icon: React.ReactNode;
  bgClass?: string;
  iconClass?: string;
  trendClassName?: string;
  /** Micro-gráfico de 12 pontos desenhado dentro do card */
  spark?: number[];
  /** Texto do link de rodapé (default: "Ver detalhes") */
  actionText?: string;
  onClick?: () => void;
}

interface ExpandableKpiHeaderProps {
  /** Todos os cards do cabeçalho */
  cards: KpiCardData[];
  /** Quantos cards ficam visíveis no estado colapsado (default: 5) */
  visibleCount?: number;
  /** Grid cols no desktop expandido */
  xlCols?: 5 | 6;
  onOpenDetail?: (label: string) => void;
  /** Rótulo do botão expandido */
  labelVerMenos?: string;
}

/**
 * Cabeçalho de KPIs com colapso:
 * - Até 5 cards: mostra tudo (igual à referência).
 * - Mais de 5: mostra os primeiros `visibleCount` + botão "Ver mais N cards" que
 *   expande o resto (grid completo), com botão "Ver menos" para recolher.
 */
export const ExpandableKpiHeader: React.FC<ExpandableKpiHeaderProps> = ({
  cards,
  visibleCount = 5,
  xlCols = 6,
  onOpenDetail,
  labelVerMenos = 'Ver menos',
}) => {
  const hasMore = cards.length > visibleCount;
  const [expanded, setExpanded] = useState(false);
  const visible = hasMore && !expanded ? cards.slice(0, visibleCount) : cards;
  const hiddenCount = cards.length - visibleCount;

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 ${
          expanded ? `lg:grid-cols-3 xl:grid-cols-${xlCols}` : 'lg:grid-cols-5'
        }`}
      >
        {visible.map((kpi) => (
          <div
            key={kpi.id}
            onClick={() => {
              if (kpi.onClick) kpi.onClick();
              else onOpenDetail?.(kpi.label);
            }}
            className="bg-white rounded-xl border border-slate-200/80 p-2.5 sm:p-3 shadow-2xs hover:shadow-xs hover:border-blue-300 transition-all duration-200 flex flex-col justify-between group min-w-0 cursor-pointer animate-in fade-in duration-300"
          >
            {/* Topo: Ícone pastel + Delta */}
            <div className="flex items-center justify-between gap-1.5">
              <div
                className={`w-7 h-7 rounded-lg ${kpi.bgClass || 'bg-[#E2ECF9]'} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs ${kpi.iconClass || 'text-[#1455AC]'}`}
              >
                {kpi.icon}
              </div>
              {kpi.trend && (
                <span
                  className={`text-[9.5px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap shadow-2xs ${
                    kpi.trendClassName ||
                    'text-emerald-700 bg-emerald-50 border border-emerald-200/70'
                  }`}
                >
                  {kpi.trend}
                </span>
              )}
            </div>

            {/* Valor + rótulo */}
            <div className="mt-2">
              <p className="text-lg sm:text-[20px] font-bold text-[#0F172A] font-sans tracking-tight leading-tight">
                {kpi.value}
              </p>
              <p
                className="text-[11px] sm:text-[11.5px] font-medium text-slate-700 mt-0.5 leading-tight truncate"
                title={kpi.label}
              >
                {kpi.label}
              </p>
              {kpi.trendPeriod && (
                <p className="text-[9.5px] sm:text-[10px] text-slate-400 mt-0.5 truncate">
                  {kpi.trendPeriod}
                </p>
              )}
            </div>

            {/* Sparkline de fundo (se fornecida) */}
            {kpi.spark && kpi.spark.length > 1 && (
              <div className="mt-1.5 -mb-0.5 opacity-80">
                <Sparkline data={kpi.spark} className="text-[#1455AC]" color="#1455AC" />
              </div>
            )}

            {/* Rodapé: link compacto */}
            <div className="pt-1.5 mt-2 border-t border-slate-200/70 flex items-center justify-between">
              <span className="text-[10.5px] font-semibold text-[#1455AC] group-hover:text-blue-800 inline-flex items-center gap-1 transition-colors cursor-pointer group-hover:underline">
                <span>{kpi.actionText || 'Ver detalhes'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sinalização "Ver mais cards" — apenas quando há mais que o visível */}
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={`self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer shadow-2xs ${
            expanded
              ? 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              : 'bg-[#E2ECF9] border border-blue-200 text-[#1455AC] hover:bg-blue-100'
          }`}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>{labelVerMenos}</span>
            </>
          ) : (
            <>
              <span>
                Ver mais {hiddenCount} {hiddenCount === 1 ? 'card' : 'cards'}
              </span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ExpandableKpiHeader;
