import React, { useState, useEffect } from 'react';
import { Search, X, Globe, FolderKanban, Users, ArrowRight } from 'lucide-react';
import { COUNTRIES_DATA } from '../data/countriesData';
import { CountryData } from '../types';

interface SearchCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (country: CountryData) => void;
  placeholder?: string;
}

export const SearchCommandModal: React.FC<SearchCommandModalProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open handled by parent
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredCountries = COUNTRIES_DATA.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.initiatives.some((i) => i.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div
      id="search-command-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="search-command-modal"
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder={placeholder || "Pesquisar países, regiões, projetos ou iniciativas..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="flex-1 text-sm bg-transparent outline-none text-slate-900 placeholder-slate-400 font-sans"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-100 rounded-md">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100">
          {filteredCountries.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs font-sans">
              Nenhum resultado encontrado para "{searchTerm}".
            </div>
          ) : (
            filteredCountries.map((country) => (
              <div
                key={country.id}
                onClick={() => {
                  onSelectCountry(country);
                  onClose();
                }}
                className="p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{country.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-slate-900 group-hover:text-[#1455AC] font-sans">
                        {country.name}
                      </p>
                      <span className="text-[10px] text-slate-400">• {country.region}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 font-sans">
                      {country.initiatives.join(' • ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-sans font-semibold text-slate-600">
                    {country.projectsCount} projetos
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1455AC] group-hover:translate-x-0.5 transition-all stroke-[2]" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-sans">
          <span>Use <b>↑</b> <b>↓</b> para navegar</span>
          <span>Pressione <b>ESC</b> para fechar</span>
        </div>
      </div>
    </div>
  );
};
