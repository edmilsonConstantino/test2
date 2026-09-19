import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * SectionCard — "textura" única para todos os cartões de secção das dashboards.
 *
 * Reproduz a mesma tonalidade/textura dos cartões do Portal do Cidadão
 * (MapHeroSection / FeaturedCountriesSection):
 *   - fundo branco, borda slate-200, sombra suave "shadow-xs"
 *   - raio 2xl, padding 5/6
 *   - cabeçalho com divisor em baixo (border-b slate-200/70)
 *   - rodapé opcional com link "Ver ..." à direita
 *
 * Evita filas de cartões com alturas iguais: usar col-span assimétrico
 * (ex.: lg:grid-cols-12 com col-span-8 + col-span-4).
 */

interface SectionCardProps {
  /** Título da secção, exibido no topo com divisor */
  title?: string;
  /** Ação opcional renderizada à direita do título (ex.: dropdown, busca) */
  titleAction?: React.ReactNode;
  /** Conteúdo do cartão */
  children: React.ReactNode;
  /** Link do rodapé (opcional) */
  footerLabel?: string;
  /** Callback do link do rodapé */
  onFooterClick?: () => void;
  /** Classes extra no cartão (ex.: col-span) */
  className?: string;
  /** Classes extra no wrapper do conteúdo */
  contentClassName?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  titleAction,
  children,
  footerLabel,
  onFooterClick,
  className = '',
  contentClassName = '',
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm hover:border-slate-300/70 transition-all duration-200 p-5 sm:p-6 flex flex-col min-w-0 ${className}`}
    >
      {(title || titleAction) && (
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-slate-700">
          {title && (
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans tracking-tight">
              {title}
            </h2>
          )}
          {titleAction}
        </div>
      )}

      <div className={`flex-1 min-w-0 ${title ? 'pt-4' : ''} ${contentClassName}`}>
        {children}
      </div>

      {footerLabel && onFooterClick && (
        <div className="pt-3 mt-4 border-t border-slate-200/70 dark:border-slate-700 flex items-center justify-end">
          <button
            type="button"
            onClick={onFooterClick}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1455AC] hover:text-blue-800 dark:hover:text-blue-300 transition-colors cursor-pointer group"
          >
            <span>{footerLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionCard;
