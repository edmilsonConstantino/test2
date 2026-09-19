import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, Globe, Compass } from 'lucide-react';

interface VilaAiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCountry?: (countryId: string) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  suggestions?: string[];
}

export const VilaAiChatModal: React.FC<VilaAiChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Olá! Sou a VILA AI, o seu assistente inteligente para descobrir iniciativas, projetos e comunidades em todo o mundo. Como posso ajudar hoje?',
      time: 'Agora',
      suggestions: [
        'Quais são os projetos ativos em Portugal?',
        'Como posso registar uma nova vila/comunidade?',
        'Mostrar iniciativas de impacto ambiental no Brasil',
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: 'Agora',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response customized to VILA platform knowledge
    setTimeout(() => {
      let replyText = '';
      const lower = query.toLowerCase();

      if (lower.includes('portugal')) {
        replyText =
          'Portugal conta atualmente com 1.284 projetos ativos e 532.760 cidadãos engajados! Os destaques incluem "Aldeias Inteligentes & Sustentáveis", "Preservação dos Oceanos Atlânticos" e o programa de recuperação do Alentejo.';
      } else if (lower.includes('brasil')) {
        replyText =
          'O Brasil possui 1.542 projetos ativos com grande foco em bioeconomia na Amazónia, hortas comunitárias urbanas e centros educativos de inclusão digital.';
      } else if (lower.includes('registar') || lower.includes('criar')) {
        replyText =
          'Para registar uma nova vila ou iniciativa comunitária, clique no botão "Criar Conta" na barra lateral e aceda à aba "Eventos & Projetos" para submeter uma proposta.';
      } else {
        replyText =
          `Compreendi a sua pergunta sobre "${query}". A plataforma VILA conecta hoje mais de 128 países e 7,8 milhões de cidadãos. Recomendo explorar o mapa interativo ou a secção de Impacto Global para dados detalhados.`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        time: 'Agora',
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div
      id="vila-ai-chat-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="vila-ai-chat-modal"
        className="bg-white dark:bg-slate-900 w-full max-w-lg h-[80vh] sm:h-[600px] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E2E8F0] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#1455AC] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold font-sans">VILA AI Assistant</h3>
              <p className="text-[11px] text-white/80 flex items-center gap-1.5 font-sans">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Inteligência Coletiva Global
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/10 hover:bg-black/20 text-white transition-colors cursor-pointer"
            aria-label="Fechar VILA AI"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60 dark:bg-slate-800 font-sans">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-[#1455AC] text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-[#1455AC]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#1455AC] text-white rounded-tr-xs shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-700 rounded-tl-xs shadow-xs'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[9px] block mt-1 ${
                    msg.sender === 'user' ? 'text-blue-100 text-right' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {msg.time}
                </span>

                {/* Suggestions Pills if any */}
                {msg.suggestions && (
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Perguntas sugeridas:</p>
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sug)}
                        className="w-full text-left text-[11px] p-1.5 px-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-[#1455AC]/10 text-[#1455AC] font-medium transition-colors block border border-slate-200/80 dark:border-slate-700 cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs pl-9">
              <div className="w-2 h-2 rounded-full bg-[#1455AC] animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-[#f58300] animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-[#1455AC] animate-bounce [animation-delay:0.4s]" />
              <span>VILA AI está a processar...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Pergunte à VILA AI sobre países, projetos..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#1455AC] text-slate-900 dark:text-slate-50 font-sans"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-[#1455AC] text-white disabled:opacity-40 hover:bg-[#0F448A] transition-colors cursor-pointer"
            aria-label="Enviar mensagem"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
