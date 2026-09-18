import React from 'react';
import { Users } from 'lucide-react';

interface TabProps {
  onNavigateToTab?: (tabId: string) => void;
}

export const InteressesComunidadesTab: React.FC<TabProps> = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center space-y-3">
      <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
        <Users className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 font-sans">Comunidades que Faço Parte</h3>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Participe nas comunidades que partilham os seus interesses e causas.
      </p>
    </div>
  );
};
