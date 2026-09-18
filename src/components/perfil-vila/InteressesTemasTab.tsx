import React from 'react';
import { Compass } from 'lucide-react';

interface TabProps {
  onNavigateToTab?: (tabId: string) => void;
}

export const InteressesTemasTab: React.FC<TabProps> = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center space-y-3">
      <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
        <Compass className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 font-sans">Interesses e Causas — Temas</h3>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Escolha os temas que o movem e personalize a sua experiência na VILA.
      </p>
    </div>
  );
};
