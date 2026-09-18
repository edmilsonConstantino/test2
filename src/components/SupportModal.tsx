import React, { useState } from 'react';
import {
  X,
  HelpCircle,
  Mail,
  FileText,
  MessageSquare,
  Shield,
  Send,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  LifeBuoy,
} from 'lucide-react';
import { DemoUser } from '../data/demoUsers';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: DemoUser;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const [ticketCategory, setTicketCategory] = useState<'tecnico' | 'moderacao' | 'governanca' | 'outro'>('tecnico');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      // Auto close after brief display or keep state
    }, 2000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setTicketSubject('');
    setTicketMessage('');
    onClose();
  };

  return (
    <div
      id="support-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="support-modal-container"
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-7 animate-in zoom-in-95 duration-150 relative overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100 pr-10">
          <div className="w-11 h-11 rounded-xl bg-[#1455AC]/10 text-[#1455AC] flex items-center justify-center shrink-0 border border-[#1455AC]/20">
            <LifeBuoy className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1455AC]/10 text-[#1455AC] text-[11px] font-bold mb-1">
              <Shield className="w-3 h-3 text-[#1455AC]" />
              <span>Suporte aos Administradores & Plataforma VILA</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 font-sans">
              Central de Atendimento e Ajuda
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-sans">
              Canal prioritário de apoio operacional para administradores, moderadores e parceiros territoriais.
            </p>
          </div>
        </div>

        {/* Informação do Utilizador Ativo */}
        {currentUser && (
          <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <div>
                <span className="font-bold text-slate-900">{currentUser.name}</span>
                <span className="text-slate-400 mx-1.5">•</span>
                <span className="text-slate-600 font-medium">{currentUser.roleLabel}</span>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-[#1455AC]/10 text-[#1455AC] rounded-md font-semibold text-[10px]">
              Escopo: {currentUser.scope}
            </span>
          </div>
        )}

        {/* Canais Rápidos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <a
            href="mailto:suporte@vilaglobal.org?subject=Suporte%20Administrador%20VILA"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-[#1455AC]/40 transition-all group cursor-pointer block shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1">
              <Mail className="w-4 h-4 text-[#1455AC]" />
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#1455AC]" />
            </div>
            <p className="text-xs font-bold text-slate-900">E-mail Direto</p>
            <p className="text-[11px] text-slate-500 mt-0.5">suporte@vilaglobal.org</p>
            <p className="text-[10px] text-[#1455AC] font-semibold mt-1">SLA: &lt; 2 horas</p>
          </a>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <FileText className="w-4 h-4 text-purple-600" />
              <span className="text-[9px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">v2.4</span>
            </div>
            <p className="text-xs font-bold text-slate-900">Guias de Gestão</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Manuais e regulamentos</p>
            <p className="text-[10px] text-purple-700 font-medium mt-1">Acesso online</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs font-bold text-slate-900">Comunidade Dev</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Canal de administradores</p>
            <p className="text-[10px] text-emerald-700 font-medium mt-1">Disponível 24/7</p>
          </div>
        </div>

        {/* Formulário Rápido de Solicitação */}
        <div className="border-t border-slate-100 pt-4">
          {isSubmitted ? (
            <div className="p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Mensagem de Suporte Registada!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                O seu pedido foi recebido pela equipa técnica da plataforma VILA com prioridade para o seu escopo territorial (<strong>{currentUser?.scope || 'Global'}</strong>). Receberá uma resposta no seu e-mail institucional em breve.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Concluir e Fechar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#1455AC]" />
                  Registar Ocorrência ou Solicitação Rápida
                </label>
                <span className="text-[10px] text-slate-400">Resposta em até 24h</span>
              </div>

              {/* Categorias */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'tecnico', label: 'Incidente Técnico' },
                  { id: 'moderacao', label: 'Dúvida Moderação' },
                  { id: 'governanca', label: 'Governança' },
                  { id: 'outro', label: 'Outro Pedido' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setTicketCategory(cat.id as any)}
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                      ticketCategory === cat.id
                        ? 'bg-[#1455AC] text-white border-[#1455AC] shadow-2xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Assunto da solicitação..."
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1455AC]/20 focus:border-[#1455AC] transition-colors font-sans"
                />
              </div>

              <div>
                <textarea
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Descreva detalhadamente o incidente, dúvida ou necessidade da sua jurisdição..."
                  rows={3}
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1455AC]/20 focus:border-[#1455AC] transition-colors resize-none font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1455AC] hover:bg-[#0F448A] shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Solicitação</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
