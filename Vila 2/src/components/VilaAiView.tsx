import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Globe,
  Compass,
  ArrowRight,
  RefreshCw,
  Lightbulb,
  Search,
  MessageSquare,
  ShieldCheck,
  Zap,
  TrendingUp,
  Leaf,
  GraduationCap,
  HeartPulse,
  Scale,
  Palette,
  Cpu,
  Rocket,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { BreadcrumbItem } from './Topbar';

export interface VilaAiViewProps {
  onNavigateToTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  suggestions?: string[];
  categoryBadge?: string;
  categoryColor?: string;
}

const SAMPLE_PROMPTS = [
  {
    icon: Leaf,
    title: 'Projetos de Clima & Oceanos',
    prompt: 'Quais são os projetos ativos de conservação marinha e limpeza costeira no Atlântico?',
    category: 'Ambiente',
    color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
  },
  {
    icon: Rocket,
    title: 'Financiamento de Startups',
    prompt: 'Como posso submeter uma proposta para aceleradoras de impacto socioambiental na VILA?',
    category: 'Empreendedorismo',
    color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20',
  },
  {
    icon: Cpu,
    title: 'IA Ética & Cívica',
    prompt: 'Mostre iniciativas de código aberto focadas em resolver desafios ecológicos com tecnologia.',
    category: 'Tecnologia',
    color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20',
  },
  {
    icon: HeartPulse,
    title: 'Saúde Primária Comunitária',
    prompt: 'Onde encontrar grupos de voluntariado médico e apoio psicológico comunitário?',
    category: 'Saúde',
    color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20',
  },
];

export const VilaAiView: React.FC<VilaAiViewProps> = ({
  onNavigateToTab,
  onOpenAuth,
  onBreadcrumbChange,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: 'Olá! Sou a VILA AI, o assistente de inteligência coletiva do ecossistema global VILA. Como posso ajudar a impulsionar o seu projeto, encontrar comunidades afins ou explorar dados de impacto hoje?',
      time: 'Agora',
      suggestions: [
        'Como criar uma comunidade na VILA?',
        'Quais são os países com mais projetos ativos?',
        'Recomende comunidades de Educação e Tecnologia',
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const onBreadcrumbChangeRef = useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;

  useEffect(() => {
    onBreadcrumbChangeRef.current?.([{ label: 'VILA AI' }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: 'Agora',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let categoryBadge = '';
      let categoryColor = '';
      const lower = query.toLowerCase();

      if (lower.includes('criar') || lower.includes('registar')) {
        replyText =
          'Para criar uma nova comunidade no ecossistema VILA:\n\n1. Aceda à secção "Comunidade Global" no menu lateral.\n2. Clique em "Criar Comunidade +" no topo da página.\n3. Preencha a identidade do grupo, selecione uma das 7 causas prioritárias e defina o alcance geográfico.\n4. Publique para começar a receber membros e voluntários de todo o mundo!';
        categoryBadge = 'Comunidade';
        categoryColor = 'bg-blue-100 text-blue-800';
      } else if (lower.includes('portugal')) {
        replyText =
          'Portugal conta atualmente com 1.284 projetos ativos e mais de 532.000 cidadãos conectados na VILA. Os principais destaques incluem:\n\n• Guardiões do Oceano Atlântico (Conservação Marinha)\n• Rede de Reflorestamento Nativo Ibérico\n• Aldeias Inteligentes & Sustentáveis do Interior\n\nPode explorar todos os indicadores no mapa interativo em "Explorar o Mundo".';
        categoryBadge = 'Ambiente & Território';
        categoryColor = 'bg-emerald-100 text-emerald-800';
      } else if (lower.includes('clima') || lower.includes('oceano') || lower.includes('ambiente')) {
        replyText =
          'A causa de Ambiente reúne mais de 12.400 comunidades na plataforma VILA. As prioridades ativas neste trimestre são:\n\n1. Restauro de ecossistemas costeiros e recifes.\n2. Transição energética justa em aldeias rurais.\n3. Redução e reaproveitamento circular de plásticos.\n\nRecomendo aderir à comunidade "Guardiões do Oceano Atlântico" ou submeter uma iniciativa própria.';
        categoryBadge = 'Ambiente';
        categoryColor = 'bg-emerald-100 text-emerald-800';
      } else if (lower.includes('tecnologia') || lower.includes('ia') || lower.includes('open source')) {
        replyText =
          'No hub de Tecnologia, destacamos a comunidade "Tecnologia Aberta & IA Ética" com mais de 112 mil desenvolvedores e pesquisadores. Os projetos incluem sensoriamento ambiental de baixo custo, modelos de linguagem cívica abertos e plataformas de transparência orçamental.';
        categoryBadge = 'Tecnologia';
        categoryColor = 'bg-indigo-100 text-indigo-800';
      } else if (lower.includes('financiamento') || lower.includes('startup') || lower.includes('investimento')) {
        replyText =
          'A VILA conecta empreendedores sociais a fundos de impacto e microcrédito cooperativo. Através da secção "Parceiros Globais", encontra organizações como a Fundação Calouste Gulbenkian, Ashoka e fundos de capital de risco sustentável da UE.';
        categoryBadge = 'Empreendedorismo';
        categoryColor = 'bg-purple-100 text-purple-800';
      } else {
        replyText =
          `Compreendi a sua questão sobre "${query}". O ecossistema VILA abrange 195 países e 7 causas globais estruturadas (Ambiente, Educação, Direitos Humanos, Cultura, Saúde, Tecnologia e Empreendedorismo). Recomendo consultar as abas "Explorar Comunidade" ou "Impacto Global" para estatísticas detalhadas.`;
        categoryBadge = 'Inteligência Coletiva';
        categoryColor = 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100';
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        time: 'Agora',
        categoryBadge,
        categoryColor,
        suggestions: [
          'Ver comunidades relacionadas',
          'Explorar no mapa mundial',
          'Fazer outra pergunta',
        ],
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 850);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: 'Histórico limpo. Como posso ajudar com novas buscas e projetos na VILA?',
        time: 'Agora',
      },
    ]);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-50 pb-16 font-sans">
      <div className="max-w-[1600px] mx-auto px-3.5 sm:px-5 lg:px-6 pt-4 sm:pt-6 space-y-6 font-sans">

        {/* Hero Banner: VILA AI */}
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#1455AC] via-[#0F3B77] to-emerald-700 p-6 sm:p-8 lg:p-10 text-white shadow-xs font-sans">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="relative z-10 max-w-2xl space-y-3 font-sans">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold font-sans">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>VILA AI • Inteligência Coletiva Global</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
              Seu Copiloto Inteligente para Transformação Social & Comunitária
            </h1>

            <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-xl font-sans">
              Pesquise dados de 195 países, encontre colaboradores para os seus projetos, descubra oportunidades de voluntariado e compreenda métricas de impacto em tempo real.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 font-sans">
              <span className="text-[11px] bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full font-medium font-sans">
                ✦ 195 Países Indexados
              </span>
              <span className="text-[11px] bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full font-medium font-sans">
                ✦ 45.230+ Comunidades
              </span>
              <span className="text-[11px] bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full font-medium font-sans">
                ✦ 7 Causas Globais
              </span>
              <span className="text-[11px] bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full font-medium font-sans">
                ✦ Aberto & Transparente
              </span>
            </div>
          </div>
        </div>

        {/* Prompt Suggestions Rápidas */}
        <div className="font-sans">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5 font-sans">
            Perguntas & Ideias de Pesquisa
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-sans">
            {SAMPLE_PROMPTS.map((sample, idx) => {
              const Icon = sample.icon;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(sample.prompt)}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all text-left group cursor-pointer flex flex-col justify-between space-y-2 font-sans"
                >
                  <div className="flex items-center justify-between font-sans">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${sample.color} font-sans`}>
                      {sample.category}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#1455AC] transition-colors" />
                  </div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-50 group-hover:text-[#1455AC] line-clamp-2 font-sans">
                    {sample.title}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 font-sans">
                    {sample.prompt}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interface Principal do Chat (Grid 12 colunas) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">

          {/* Área de Conversa (8 colunas) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col h-[650px] overflow-hidden font-sans">

            {/* Cabeçalho do Chat */}
            <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800 font-sans">
              <div className="flex items-center gap-2.5 font-sans">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1455AC] to-emerald-600 flex items-center justify-center text-white shadow-2xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="font-sans">
                  <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-50 font-sans">VILA AI Collective Engine</h2>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online • Respostas em tempo real
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClearChat}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50 transition-all cursor-pointer font-sans"
                title="Limpar conversa"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="hidden sm:inline">Limpar</span>
              </button>
            </div>

            {/* Histórico de Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30 dark:bg-slate-800 font-sans">
              {messages.map((msg) => {
                const isAi = msg.sender === 'ai';

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isAi ? 'justify-start' : 'justify-end'} font-sans`}
                  >
                    {isAi && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1455AC] to-emerald-600 flex items-center justify-center text-white shrink-0 shadow-2xs">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div className={`max-w-[85%] sm:max-w-[75%] space-y-2 ${isAi ? '' : 'items-end'} font-sans`}>
                      <div
                        className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed font-sans ${
                          isAi
                            ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-50 shadow-2xs'
                            : 'bg-[#1455AC] text-white font-medium shadow-xs'
                        }`}
                      >
                        {msg.categoryBadge && (
                          <div className="mb-2 font-sans">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${msg.categoryColor || 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'} font-sans`}>
                              {msg.categoryBadge}
                            </span>
                          </div>
                        )}

                        <p className="whitespace-pre-line font-sans">{msg.text}</p>
                      </div>

                      {/* Ações da Mensagem AI (Copiar, Feedback) */}
                      {isAi && (
                        <div className="flex items-center gap-2 px-1 font-sans">
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="inline-flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer font-sans"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500 font-sans">Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span className="font-sans">Copiar</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Sugestões Rápidas */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1 font-sans">
                          {msg.suggestions.map((sug, sIdx) => (
                            <button
                              key={sIdx}
                              type="button"
                              onClick={() => handleSend(sug)}
                              className="text-[11px] font-medium bg-blue-50/80 dark:bg-blue-500/10 hover:bg-blue-100 text-[#1455AC] border border-blue-200 dark:border-blue-500/20 rounded-full px-3 py-1 transition-colors cursor-pointer text-left font-sans"
                            >
                              {sug} →
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {!isAi && (
                      <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 font-sans">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-3 font-sans">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1455AC] to-emerald-600 flex items-center justify-center text-white shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 shadow-2xs flex items-center gap-1.5 font-sans">
                    <span className="w-2 h-2 rounded-full bg-[#1455AC] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Barra de Envio */}
            <div className="p-3.5 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 font-sans">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 font-sans"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Escreva uma pergunta sobre iniciativas, comunidades, causas ou voluntariado..."
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1455AC]/30 focus:border-[#1455AC] text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 font-sans"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1455AC] to-emerald-600 text-white text-xs sm:text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer font-sans"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Enviar</span>
                </button>
              </form>
            </div>
          </div>

          {/* Coluna Lateral: Dicas & Conexões (4 colunas) */}
          <div className="lg:col-span-4 space-y-6 font-sans">

            {/* Como a VILA AI funciona */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs space-y-4 font-sans">
              <div className="flex items-center gap-2 font-sans">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Capacidades da VILA AI
                </h3>
              </div>

              <div className="space-y-3 font-sans">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 space-y-1 font-sans">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                    <Search className="w-3.5 h-3.5 text-[#1455AC]" />
                    <span>Mapeamento Multidimensional</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    Pesquisa simultânea em comunidades, iniciativas, artigos acadêmicos e notícias globais.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 space-y-1 font-sans">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Matchmaking Inteligente</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    Cruza competências e disponibilidade de voluntários com necessidades reais de comunidades locais.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 space-y-1 font-sans">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Síntese de Métricas de Impacto</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    Resumos estatísticos sobre emissões evitadas, pessoas capacitadas e árvores plantadas.
                  </p>
                </div>
              </div>
            </div>

            {/* Atalhos Rápidos para outras Secções */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs space-y-3 font-sans">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50 font-sans">
                Explorar Ecossistema VILA
              </h3>

              <div className="space-y-2 font-sans">
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.('explorar')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:bg-blue-50/50 text-left flex items-center justify-between transition-all cursor-pointer group font-sans"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-50 group-hover:text-[#1455AC] font-sans">
                    <Compass className="w-4 h-4 text-[#1455AC]" />
                    <span>Mapa Global Interativo</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateToTab?.('comunidade')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50 text-left flex items-center justify-between transition-all cursor-pointer group font-sans"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-50 group-hover:text-emerald-600 font-sans">
                    <Globe className="w-4 h-4 text-emerald-500" />
                    <span>Comunidade Global</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateToTab?.('impacto')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-300 hover:bg-purple-50/50 text-left flex items-center justify-between transition-all cursor-pointer group font-sans"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-50 group-hover:text-purple-600 font-sans">
                    <Leaf className="w-4 h-4 text-purple-500" />
                    <span>Painel de Impacto Global</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VilaAiView;
