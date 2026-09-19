import React from 'react';
import { Sparkles } from 'lucide-react';

interface TabProps {
  onNavigateToTab?: (tabId: string) => void;
}

export const InteressesCausasTab: React.FC<TabProps> = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center space-y-3">
      <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
        <Sparkles className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 font-sans">Causas que Apoio</h3>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Apoie as causas que mais importam para si e receba oportunidades de gerar impacto.
      </p>
    </div>
  );
};
