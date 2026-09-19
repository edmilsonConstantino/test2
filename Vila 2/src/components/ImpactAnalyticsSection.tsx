import React from 'react';
import { ArrowRight, TrendingUp, PieChart } from 'lucide-react';
import { LineChart, LineSeries, DonutChart, DonutSlice } from './admin/MiniCharts';

export interface ImpactAnalyticsSectionProps {
  /** Rótulos do eixo temporal (meses) */
  labels: string[];
  /** Séries do gráfico de linhas (crescimento mensal) */
  series: LineSeries[];
  /** Fatias do donut de distribuição por região */
  slices: DonutSlice[];
  /** Cor de destaque do tema da página (títulos, links e acentos) */
  accent: string;
  /** Cor sutil de fundo dos cabeçalhos dos mini-cards */
  softBg?: string;
  onSeeAll?: () => void;
}

/**
 * Seção "Análise de Impacto" — gráficos completos reutilizando a biblioteca
 * interna de micro-gráficos (MiniCharts), sem novas dependências e sem alterar
 * a paleta de cada página (cores entram por prop).
 */
export const ImpactAnalyticsSection: React.FC<ImpactAnalyticsSectionProps> = ({
  labels,
  series,
  slices,
  accent,
  softBg = 'bg-slate-50 dark:bg-slate-800',
  onSeeAll,
}) => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-black text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight">
          Análise de impacto
        </h2>
        {onSeeAll && (
          <button
            type="button"
            onClick={onSeeAll}
            className="text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition-opacity hover:opacity-80 group"
            style={{ color: accent }}
          >
            <span>Ver relatório completo</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Gráfico de Linhas — Evolução Mensal */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs p-4 sm:p-5 flex flex-col min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`w-8 h-8 rounded-lg ${softBg} border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0`}
                style={{ color: accent }}
              >
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight leading-tight truncate">
                  Evolução mensal de impacto
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  Pessoas impactadas e iniciativas ativas (últimos 12 meses)
                </p>
              </div>
            </div>

            {/* Legenda compacta */}
            <div className="flex items-center gap-3 flex-wrap">
              {series.map((s) => (
                <span key={s.name} className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-slate-600 dark:text-slate-400">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-2 flex-1">
            <LineChart labels={labels} series={series} height={200} />
          </div>
        </div>

        {/* Donut — Distribuição por Região */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs p-4 sm:p-5 flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-lg ${softBg} border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0`}
              style={{ color: accent }}
            >
              <PieChart className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-50 font-['Outfit'] tracking-tight leading-tight truncate">
                Distribuição por região
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Participação no impacto global
              </p>
            </div>
          </div>

          <div className="mt-3 flex-1 flex items-center">
            <DonutChart slices={slices} size={150} thickness={24} centerLabel="100%" centerSub="Impacto global" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactAnalyticsSection;
