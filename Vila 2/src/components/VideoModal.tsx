import React from 'react';
import { X, Play, CheckCircle, Sparkles } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="video-tour-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="video-tour-modal-content"
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1455AC]/10 dark:bg-[#1455AC]/20 text-[#1455AC] flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 font-sans">Como funciona o ecossistema VILA</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">2m 14s</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white overflow-hidden">
          <div className="relative z-10 max-w-md space-y-3.5">
            <div className="w-14 h-14 mx-auto rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
              <Play className="w-6 h-6 text-white fill-current ml-1" />
            </div>
            <h4 className="text-lg font-semibold font-sans">
              "O Mundo é uma Vila."
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Como mais de 128 países conectam projetos locais a recursos e parcerias em todo o globo.
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-white dark:bg-slate-900 text-xs font-sans">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
            <p className="font-semibold text-slate-900 dark:text-slate-50">Conexão Direta</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Sem intermediários entre territórios.</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
            <p className="font-semibold text-slate-900 dark:text-slate-50">Transparência</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Métricas de impacto verificáveis.</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
            <p className="font-semibold text-slate-900 dark:text-slate-50">VILA AI</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Cruzamento inteligente de iniciativas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
