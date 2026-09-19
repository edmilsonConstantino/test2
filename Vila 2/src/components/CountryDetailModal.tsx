import React from 'react';
import { X, Globe, Users, FolderKanban, CheckCircle2, Heart, Share2, ArrowRight } from 'lucide-react';
import { CountryData } from '../types';

interface CountryDetailModalProps {
  isOpen: boolean;
  country: CountryData | null;
  onClose: () => void;
  onJoinCommunity?: (countryName: string) => void;
}

export const CountryDetailModal: React.FC<CountryDetailModalProps> = ({
  isOpen,
  country,
  onClose,
  onJoinCommunity,
}) => {
  if (!isOpen || !country) return null;

  return (
    <div
      id="country-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="country-detail-modal-content"
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-150 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover Image & Header Overlay */}
        <div className="relative h-48 sm:h-56 w-full bg-slate-900 overflow-hidden">
          <img
            src={country.imageUrl}
            alt={country.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Country Title & Flag */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#DCFCE7] text-[#16A34A] uppercase tracking-wide">
                {country.statusLabel || 'País Ativo'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans mt-1.5 flex items-center gap-2">
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </h2>
            </div>
            <span className="text-xs font-semibold text-white/90 bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs border border-white/20">
              {country.region} • Capital: {country.capital}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          {/* Summary */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            {country.description}
          </p>

          {/* Key Statistics Grid */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="text-center">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold flex items-center justify-center gap-1">
                <FolderKanban className="w-3.5 h-3.5 text-[#1455AC]" /> Projetos
              </p>
              <p className="text-lg font-black text-slate-900 dark:text-slate-50 mt-0.5">
                {country.projectsCount.toLocaleString('pt-PT')}
              </p>
            </div>
            <div className="text-center border-x border-slate-200 dark:border-slate-700">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#f58300]" /> Comunidades
              </p>
              <p className="text-lg font-black text-slate-900 dark:text-slate-50 mt-0.5">
                {country.communitiesCount.toLocaleString('pt-PT')}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold flex items-center justify-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#1455AC]" /> Cidadãos
              </p>
              <p className="text-lg font-black text-slate-900 dark:text-slate-50 mt-0.5">
                {country.citizensCount.toLocaleString('pt-PT')}
              </p>
            </div>
          </div>

          {/* Active Initiatives */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-50 mb-2.5">
              Iniciativas em Destaque
            </h4>
            <div className="space-y-2">
              {country.initiatives.map((initiative, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100">
                      {initiative}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#1455AC] bg-[#1455AC]/10 dark:bg-[#1455AC]/20 px-2 py-0.5 rounded-md border border-[#1455AC]/20">
                    Ativo
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => {
                if (onJoinCommunity) onJoinCommunity(country.name);
                onClose();
              }}
              className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#1455AC] hover:bg-[#0F448A] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Aderir à Comunidade de {country.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
              }}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Share2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Partilhar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
