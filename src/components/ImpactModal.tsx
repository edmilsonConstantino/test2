import React from 'react';
import { X, TrendingUp, Trees, Zap, Droplets, HeartHandshake, CheckCircle } from 'lucide-react';

interface ImpactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImpactModal: React.FC<ImpactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="impact-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="impact-modal-container"
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 p-5 sm:p-6 animate-in zoom-in-95 duration-150 relative overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 font-sans">
              Relatório de Impacto Global VILA
            </h3>
            <p className="text-xs text-slate-500">Metas atingidas e resultados verificados em 2026</p>
          </div>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <Trees className="w-5 h-5 text-emerald-600 mb-2" />
            <p className="text-xl font-extrabold text-slate-900">4.2M+</p>
            <p className="text-[11px] font-bold text-emerald-800">Árvores Nativas Plantadas</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Reflorestação em 38 países.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <Droplets className="w-5 h-5 text-[#1455AC] mb-2" />
            <p className="text-xl font-extrabold text-slate-900">1.8M L</p>
            <p className="text-[11px] font-bold text-[#1455AC]">Água Potável Fornecida</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Sistemas comunitários solares.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <Zap className="w-5 h-5 text-amber-500 mb-2" />
            <p className="text-xl font-extrabold text-slate-900">320 GWh</p>
            <p className="text-[11px] font-bold text-amber-800">Energia Limpa Gerada</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Cooperativas solares e eólicas.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
            <HeartHandshake className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-xl font-extrabold text-slate-900">3.412</p>
            <p className="text-[11px] font-bold text-purple-900">Parcerias Cidadãs</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Governos, ONGs e vilas.</p>
          </div>
        </div>

        {/* Global statement */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs text-slate-700">
            Todos os dados são auditados por sensores IoT descentralizados e relatórios comunitários abertos.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2.5 rounded-xl bg-[#1455AC] hover:bg-[#0F448A] text-white font-bold text-xs transition-colors cursor-pointer"
        >
          Fechar Relatório
        </button>
      </div>
    </div>
  );
};
