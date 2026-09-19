import React from 'react';
import { Heart } from 'lucide-react';

interface TabProps {
  onNavigateToTab?: (tabId: string) => void;
}

export const InteressesVisaoGeralTab: React.FC<TabProps> = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-8 text-center space-y-3">
      <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
        <Heart className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-sans">Interesses e Causas — Visão Geral</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        Os seus interesses conectam-no a comunidades, territórios, projetos e oportunidades.
      </p>
    </div>
  );
};
