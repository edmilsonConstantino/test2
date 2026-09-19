import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Layers,
  ShieldCheck,
  Globe,
  Building2,
  Users,
  Briefcase,
  Heart,
  TrendingUp,
  Target,
  Eye,
  Gem,
  CheckCircle2,
  ExternalLink,
  Mail,
  Info,
  Award,
  Lock,
  Cloud,
  Check,
  X
} from 'lucide-react';

interface CertificationDetail {
  id: string;
  name: string;
  category: string;
  issuer: string;
  validUntil: string;
  description: string;
  complianceScope: string[];
}

export const AboutTab: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationDetail | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const certifications: CertificationDetail[] = [
    {
      id: 'iso27001',
      name: 'ISO/IEC 27001',
      category: 'Segurança da Informação',
      issuer: 'DNV GL Business Assurance',
      validUntil: '2027',
      description: 'Certificação internacional de gestão de segurança da informação (SGSI), garantindo a proteção e integridade de todos os ativos digitais e bases de dados territoriais.',
      complianceScope: ['Criptografia em repouso e em trânsito', 'Gestão rigorosa de vulnerabilidades', 'Auditorias anuais de penetração'],
    },
    {
      id: 'gdpr',
      name: 'Conformidade RGPD/GDPR',
      category: 'Proteção de Dados',
      issuer: 'Comissão Nacional de Proteção de Dados (CNPD)',
      validUntil: 'Conformidade Contínua',
      description: 'Cumprimento estrito do Regulamento Geral sobre a Proteção de Dados da União Europeia (Regulamento UE 2016/679), assegurando a soberania e direitos dos titulares.',
      complianceScope: ['Privacidade desde a conceção (Privacy by Design)', 'Direito ao esquecimento e portabilidade', 'Encarregado de Proteção de Dados (DPO) dedicado'],
    },
    {
      id: 'soc2',
      name: 'SOC 2 Tipo II',
      category: 'Controlos de Segurança',
      issuer: 'AICPA Independent Auditor',
      validUntil: '2026.Q4',
      description: 'Relatório independente de garantia de controlos relativos à segurança, disponibilidade, integridade no processamento e confidencialidade dos serviços em nuvem.',
      complianceScope: ['Monitorização 24/7 de infraestrutura', 'Controlos de acesso biométrico e MFA', 'Planos auditados de recuperação de desastres'],
    },
    {
      id: 'cloud',
      name: 'Segurança na Nuvem',
      category: 'Cloud Security CSA STAR',
      issuer: 'Cloud Security Alliance',
      validUntil: 'Conformidade Contínua',
      description: 'Nível avançado de conformidade de segurança e resiliência em arquiteturas distribuídas com servidores verdes alojados em território europeu.',
      complianceScope: ['Data centers neutros em carbono', 'Isolamento granular multilocatário', 'Backups geodistribuídos em tempo real'],
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 text-xs font-medium animate-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Row 1: Hero Card VILA + A VILA em números */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hero Card VILA (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-2xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* VILA Circular Vector Emblem */}
            <div className="shrink-0 relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
              <svg
                viewBox="0 0 120 120"
                className="w-full h-full drop-shadow-sm select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Sun / Warm Amber Top Arc */}
                  <linearGradient id="vila-hero-sun" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="60%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>

                  {/* Sky / Vibrant Ocean Blue Swirl */}
                  <linearGradient id="vila-hero-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="50%" stopColor="#1455AC" />
                    <stop offset="100%" stopColor="#0F3B77" />
                  </linearGradient>

                  {/* Terra / Emerald Green Swoosh */}
                  <linearGradient id="vila-hero-green" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="60%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>

                  {/* Coral / Heart Flare */}
                  <linearGradient id="vila-hero-coral" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FB7185" />
                    <stop offset="50%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#B91C1C" />
                  </linearGradient>

                  {/* Outer delicate ring gradient */}
                  <linearGradient id="vila-hero-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E2E8F0" />
                    <stop offset="50%" stopColor="#CBD5E1" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </linearGradient>

                  {/* Center Sphere ambient lighting */}
                  <radialGradient id="sphere-light" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="60%" stopColor="#F8FAFC" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                  </radialGradient>
                </defs>

                {/* Outer Circular Ring */}
                <circle cx="60" cy="60" r="57" fill="#FFFFFF" stroke="url(#vila-hero-ring)" strokeWidth="1.5" />
                <circle cx="60" cy="60" r="53" fill="url(#sphere-light)" />

                {/* 1. Golden Sun Arc at Top */}
                <path
                  d="M32 44 C38 28 50 20 60 20 C70 20 82 28 88 44 C82 40 72 37 60 37 C48 37 38 40 32 44 Z"
                  fill="url(#vila-hero-sun)"
                />

                {/* 2. Stylized Vibrant Birds & Sky Flow */}
                <path
                  d="M30 48 C42 43 56 46 64 54 C58 56 46 54 36 58 C32 54 30 50 30 48 Z"
                  fill="url(#vila-hero-blue)"
                  opacity="0.95"
                />
                <path
                  d="M90 48 C78 43 64 46 56 54 C62 56 74 54 84 58 C88 54 90 50 90 48 Z"
                  fill="url(#vila-hero-blue)"
                  opacity="0.95"
                />

                {/* 3. Central Living Swirls (Nature & Community) */}
                <path
                  d="M24 64 C24 50 35 44 46 47 C50 48 55 52 52 58 C49 64 42 66 36 67 C28 68 25 74 27 80 C23 75 24 69 24 64 Z"
                  fill="url(#vila-hero-green)"
                />

                {/* 4. Coral / Dynamic Ribbon */}
                <path
                  d="M96 64 C96 50 85 44 74 47 C70 48 65 52 68 58 C71 64 78 66 84 67 C92 68 95 74 93 80 C97 75 96 69 96 64 Z"
                  fill="url(#vila-hero-coral)"
                />

                {/* 5. Base Protective Hands Embracing Earth */}
                <path
                  d="M26 80 C36 94 50 99 60 99 C70 99 84 94 94 80 C84 90 72 94 60 94 C48 94 36 90 26 80 Z"
                  fill="url(#vila-hero-blue)"
                />

                {/* Center Planet Core Emblem */}
                <circle cx="60" cy="65" r="16" fill="#1455AC" opacity="0.12" />
                <circle cx="60" cy="65" r="12" fill="#1455AC" opacity="0.2" />
                <path
                  d="M52 64 Q60 60 68 64 Q60 68 52 64 Z"
                  fill="#1455AC"
                />
                <circle cx="60" cy="64" r="3.5" fill="#FFFFFF" stroke="#1455AC" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Text details */}
            <div className="space-y-2 text-center sm:text-left font-sans">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50 font-sans tracking-tight">
                VILA
              </h2>
              <p className="text-[13.5px] font-semibold text-slate-500 dark:text-slate-400 font-sans">
                Um ecossistema. Um propósito. Um futuro melhor.
              </p>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                A VILA é a infraestrutura digital que conecta o mundo através de pessoas, comunidades, negócios e governos, promovendo colaboração, inovação e impacto positivo em cada território.
              </p>
            </div>
          </div>

          {/* 4 Metadata Chips/Pills exactly matching UI SOBRE */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2.5">
            {/* Pill 1: Lançamento */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-[12px] text-slate-600 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
              <span>
                Lançamento <strong className="text-[#0F172A] dark:text-slate-50 font-bold">2024</strong>
              </span>
            </div>

            {/* Pill 2: Sede */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-[12px] text-slate-600 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
              <span>
                Sede <strong className="text-[#0F172A] dark:text-slate-50 font-bold">Portugal</strong>
              </span>
            </div>

            {/* Pill 3: Plataforma */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-[12px] text-slate-600 dark:text-slate-400">
              <Layers className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
              <span>
                Plataforma <strong className="text-[#0F172A] dark:text-slate-50 font-bold">VILA 1.0</strong>
              </span>
            </div>

            {/* Pill 4: Status Ativa */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-500/10 border border-emerald-200/80 dark:border-emerald-800/40 text-[12px] text-slate-700 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>
                Status <strong className="text-emerald-700 dark:text-emerald-400 font-bold">Ativa</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Card A VILA em números (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-2xs flex flex-col justify-between font-sans">
          <div>
            <h3 className="text-[15px] sm:text-base font-bold text-slate-900 dark:text-slate-50 font-sans mb-4">
              A VILA em números
            </h3>

            {/* Grid 2 cols x 3 rows with exact values and icons */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 font-sans">
              {/* 1. Países conectados */}
              <div className="flex items-center gap-3 font-sans">
                <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                  <Globe className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-50 font-sans leading-none">
                    190+
                  </p>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                    Países conectados
                  </p>
                </div>
              </div>

              {/* 2. Municípios ativos */}
              <div className="flex items-center gap-3 font-sans">
                <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                  <Building2 className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-50 font-sans leading-none">
                    2.500+
                  </p>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                    Municípios ativos
                  </p>
                </div>
              </div>

              {/* 3. Utilizadores globais */}
              <div className="flex items-center gap-3 font-sans">
                <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                  <Users className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-50 font-sans leading-none">
                    1.2M+
                  </p>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                    Utilizadores globais
                  </p>
                </div>
              </div>

              {/* 4. Organizações */}
              <div className="flex items-center gap-3 font-sans">
                <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center shrink-0">
                  <Briefcase className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-50 font-sans leading-none">
                    35K+
                  </p>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                    Organizações
                  </p>
                </div>
              </div>

              {/* 5. Projetos de impacto */}
              <div className="flex items-center gap-3 font-sans">
                <div className="w-9 h-9 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Heart className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-50 font-sans leading-none">
                    15K+
                  </p>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                    Projetos de impacto
                  </p>
                </div>
              </div>

              {/* 6. Interações diárias */}
              <div className="flex items-center gap-3 font-sans">
                <div className="w-9 h-9 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-50 font-sans leading-none">
                    8.4M+
                  </p>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-tight mt-1">
                    Interações diárias
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span>Dados consolidados em tempo real</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 99.98% Uptime
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Grid 4 Cards (Missão, Visão, Propósito, Valores) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
        {/* Card 1: Missão */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-600 transition-all font-sans">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Target className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
              Missão
            </h3>
            <p className="text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Capacitar pessoas, comunidades e organizações com tecnologia e dados inteligentes para construir territórios mais sustentáveis, inclusivos e prósperos.
            </p>
          </div>
          {/* Bottom Green Accent Line */}
          <div className="h-1 bg-emerald-500 rounded-full w-full mt-6" />
        </div>

        {/* Card 2: Visão */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-600 transition-all font-sans">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center">
              <Eye className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
              Visão
            </h3>
            <p className="text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Ser a principal infraestrutura global que transforma a forma como o mundo se conecta, colabora e cria valor para as gerações presentes e futuras.
            </p>
          </div>
          {/* Bottom Blue Accent Line */}
          <div className="h-1 bg-[#1455AC] rounded-full w-full mt-6" />
        </div>

        {/* Card 3: Propósito */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-600 transition-all font-sans">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Heart className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
              Propósito
            </h3>
            <p className="text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Conectar o mundo com significado, promovendo o bem comum, a inovação e o desenvolvimento sustentável de cada território.
            </p>
          </div>
          {/* Bottom Purple Accent Line */}
          <div className="h-1 bg-purple-500 rounded-full w-full mt-6" />
        </div>

        {/* Card 4: Valores */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-600 transition-all font-sans">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Gem className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
              Valores
            </h3>

            {/* List of 5 Values with Orange Checkmarks */}
            <div className="space-y-2 text-xs sm:text-[11.5px] text-slate-600 dark:text-slate-400 font-sans">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900 dark:text-slate-50 font-semibold">Colaboração:</strong> Acreditamos no poder de trabalhar juntos.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900 dark:text-slate-50 font-semibold">Transparência:</strong> Agimos com integridade e clareza.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900 dark:text-slate-50 font-semibold">Inovação:</strong> Criamos soluções para um mundo em constante mudança.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900 dark:text-slate-50 font-semibold">Sustentabilidade:</strong> Promovemos um impacto positivo e duradouro.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900 dark:text-slate-50 font-semibold">Inclusão:</strong> Valorizamos a diversidade e a igualdade de oportunidades.
                </span>
              </div>
            </div>
          </div>
          {/* Bottom Orange Accent Line */}
          <div className="h-1 bg-amber-500 rounded-full w-full mt-6" />
        </div>
      </div>

      {/* Row 3: Os nossos objetivos estratégicos & Certificações e conformidade */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
        {/* Left: Os nossos objetivos estratégicos (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-2xs flex flex-col justify-between font-sans">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans mb-4">
              Os nossos objetivos estratégicos
            </h3>

            {/* 4 Objective Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
              {/* (1) Conectar */}
              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center">
                  1
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Conectar
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Integrar pessoas, dados e territórios numa plataforma global e interoperável.
                </p>
              </div>

              {/* (2) Empoderar */}
              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-[#1455AC] text-xs font-bold flex items-center justify-center">
                  2
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Empoderar
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Fornecer ferramentas inteligentes para cidadãos, negócios e governos.
                </p>
              </div>

              {/* (3) Transformar */}
              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-center">
                  3
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Transformar
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Impulsionar a inovação e a digitalização para resolver desafios reais.
                </p>
              </div>

              {/* (4) Gerar Impacto */}
              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-center">
                  4
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Gerar Impacto
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Promover desenvolvimento sustentável e qualidade de vida em escala global.
                </p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            Metas monitorizadas no âmbito da Agenda de Desenvolvimento 2030 das Nações Unidas.
          </p>
        </div>

        {/* Right: Certificações e conformidade (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-2xs flex flex-col justify-between font-sans">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-[#1455AC]" />
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                Certificações e conformidade
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              A VILA segue os mais altos padrões de segurança, privacidade e conformidade.
            </p>

            {/* 4 Certification Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-sans">
              {/* 1. ISO 27001 */}
              <button
                type="button"
                onClick={() => setSelectedCert(certifications[0])}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50/60 dark:hover:bg-blue-500/10 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-200 dark:hover:border-blue-800/40 text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer group font-sans"
                title="Clique para ver o certificado ISO 27001"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-[#1455AC] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-50 leading-tight">
                    ISO 27001
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    Segurança da Informação
                  </p>
                </div>
              </button>

              {/* 2. Conformidade (GDPR) */}
              <button
                type="button"
                onClick={() => setSelectedCert(certifications[1])}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-amber-50/60 dark:hover:bg-amber-500/10 border border-slate-200/80 dark:border-slate-700/80 hover:border-amber-200 dark:hover:border-amber-800/40 text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
                title="Clique para ver detalhes de conformidade RGPD"
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0F172A] dark:text-slate-50 leading-tight">
                    Conformidade
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    Proteção de Dados
                  </p>
                </div>
              </button>

              {/* 3. Tipo II (SOC 2) */}
              <button
                type="button"
                onClick={() => setSelectedCert(certifications[2])}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-purple-50/60 dark:hover:bg-purple-500/10 border border-slate-200/80 dark:border-slate-700/80 hover:border-purple-200 dark:hover:border-purple-800/40 text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
                title="Clique para ver o relatório SOC 2 Tipo II"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0F172A] dark:text-slate-50 leading-tight">
                    Tipo II
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    Controles de Segurança
                  </p>
                </div>
              </button>

              {/* 4. Segurança na Nuvem */}
              <button
                type="button"
                onClick={() => setSelectedCert(certifications[3])}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50/60 dark:hover:bg-emerald-500/10 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-200 dark:hover:border-emerald-800/40 text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
                title="Clique para ver a certificação de Nuvem"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Cloud className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0F172A] dark:text-slate-50 leading-tight">
                    Segurança
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    na Nuvem
                  </p>
                </div>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-sans">
            <span>Certificados auditados por entidades externas</span>
            <span className="text-[#1455AC] font-medium hover:underline cursor-pointer font-sans" onClick={() => setSelectedCert(certifications[0])}>
              Ver credenciais
            </span>
          </div>
        </div>
      </div>

      {/* Row 4: Bottom 2 Banners (Saiba mais & Fale connosco) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
        {/* Banner 1: Saiba mais */}
        <div className="bg-[#F0F6FF] dark:bg-blue-500/10 border border-blue-100 dark:border-blue-900/40 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 text-[#1455AC] flex items-center justify-center shrink-0 shadow-2xs border border-blue-100 dark:border-blue-900/40">
              <Info className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 font-sans">
                Saiba mais
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                Visite o nosso site oficial para conhecer mais sobre a VILA, os nossos projetos e iniciativas.
              </p>
            </div>
          </div>

          <a
            href="https://www.vila.global"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              showToast('A redirecionar para o portal oficial www.vila.global...');
              window.open('https://www.vila.global', '_blank', 'noopener,noreferrer');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1455AC] hover:text-[#0F3B77] shrink-0 hover:underline cursor-pointer self-start sm:self-center font-sans"
          >
            <span>www.vila.global</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Banner 2: Fale connosco */}
        <div className="bg-[#FAF5FF] dark:bg-purple-500/10 border border-purple-100 dark:border-purple-900/40 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-2xs border border-purple-100 dark:border-purple-900/40">
              <Mail className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 font-sans">
                Fale connosco
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                Tem dúvidas ou sugestões? Estamos aqui para ajudar.
              </p>
            </div>
          </div>

          <a
            href="mailto:contacto@vila.global"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard?.writeText('contacto@vila.global');
              showToast('E-mail copiado para a área de transferência: contacto@vila.global');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1455AC] hover:text-[#0F3B77] shrink-0 hover:underline cursor-pointer self-start sm:self-center font-sans"
          >
            <span>contacto@vila.global</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Certification Details Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 font-sans">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-200 font-sans">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-[#1455AC] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 font-sans">
                    {selectedCert.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedCert.category}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-slate-600 dark:text-slate-400">
              <p className="leading-relaxed">{selectedCert.description}</p>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">Emitente / Auditor</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{selectedCert.issuer}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">Validade / Estado</p>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedCert.validUntil}</p>
                </div>
              </div>

              <div>
                <p className="font-bold text-slate-900 dark:text-slate-50 mb-1.5">Controlos e Âmbito Auditado:</p>
                <ul className="space-y-1.5">
                  {selectedCert.complianceScope.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2 font-sans">
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Comprovativo de conformidade ${selectedCert.name} exportado.`);
                  setSelectedCert(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#1455AC] hover:bg-[#0F3B77] text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Descarregar Relatório
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
