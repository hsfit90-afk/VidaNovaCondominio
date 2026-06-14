'use client';

import Link from 'next/link';
import { 
  Package, 
  UserPlus, 
  Bell, 
  CalendarDays, 
  Wrench, 
  FileText, 
  Vote, 
  Store,
  ShieldCheck,
  Building,
  ArrowRight
} from 'lucide-react';

const residentModules = [
  {
    title: 'Registro de Entregas',
    description: 'Acompanhe suas encomendas e correspondências.',
    icon: Package,
    href: '/entregas',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    hover: 'hover:border-blue-500 hover:shadow-blue-100',
  },
  {
    title: 'Cadastro de Visitantes',
    description: 'Autorize a entrada de amigos e familiares.',
    icon: UserPlus,
    href: '/visitantes',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    hover: 'hover:border-emerald-500 hover:shadow-emerald-100',
  },
  {
    title: 'Avisos e Comunicados',
    description: 'Fique por dentro das novidades do condomínio.',
    icon: Bell,
    href: '/avisos',
    color: 'bg-amber-50 text-amber-600 border-amber-200',
    hover: 'hover:border-amber-500 hover:shadow-amber-100',
  },
  {
    title: 'Reserva de Áreas Comuns',
    description: 'Agende o salão de festas, churrasqueira e mais.',
    icon: CalendarDays,
    href: '/reservas',
    color: 'bg-pink-50 text-pink-600 border-pink-200',
    hover: 'hover:border-pink-500 hover:shadow-pink-100',
  },
  {
    title: 'Chamados de Manutenção',
    description: 'Solicite reparos nas áreas do condomínio.',
    icon: Wrench,
    href: '/manutencao',
    color: 'bg-slate-50 text-slate-600 border-slate-200',
    hover: 'hover:border-slate-500 hover:shadow-slate-100',
  },
  {
    title: 'Segunda Via de Boletos',
    description: 'Acesse e pague a taxa condominial mensal.',
    icon: FileText,
    href: '/boletos',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    hover: 'hover:border-indigo-500 hover:shadow-indigo-100',
  },
  {
    title: 'Assembleia e Enquetes',
    description: 'Participe ativamente das decisões do condomínio.',
    icon: Vote,
    href: '/assembleias',
    color: 'bg-violet-50 text-violet-600 border-violet-200',
    hover: 'hover:border-violet-500 hover:shadow-violet-100',
  },
  {
    title: 'Mercado Interno',
    description: 'Compre e venda itens com seus vizinhos.',
    icon: Store,
    href: '/mercado',
    color: 'bg-orange-50 text-orange-600 border-orange-200',
    hover: 'hover:border-orange-500 hover:shadow-orange-100',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 pb-20">
      
      {/* Header / Hero Section */}
      <div className="w-full max-w-6xl mt-10 mb-12 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-800 text-sm font-semibold mb-6">
          <ShieldCheck size={18} />
          <span>Portal Interativo</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-[#2E1065] tracking-tight mb-4">
          Condomínio Vida Nova
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl">
          Selecione o seu perfil de acesso abaixo.
        </p>
      </div>

      {/* BLOCO 1: PERFIL DO MORADOR (8 Serviços) */}
      <div className="w-full max-w-6xl mb-4">
         <h3 className="text-lg font-bold text-slate-500 mb-4 uppercase tracking-wider ml-1">Para o Morador</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {residentModules.map((module) => {
          const Icon = module.icon;
          return (
            <Link 
              key={module.title}
              href={module.href} 
              className={`group bg-white rounded-2xl p-6 border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col h-full ${module.hover}`}
            >
              <div className={`w-14 h-14 rounded-xl border flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300 ${module.color}`}>
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{module.title}</h3>
              <p className="text-slate-500 text-sm flex-grow mb-4 leading-relaxed">
                {module.description}
              </p>
              <div className={`mt-auto flex items-center gap-1.5 font-semibold text-sm transition-colors ${module.color.split(' ')[1]}`}>
                Acessar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* BLOCO 2 e 3: ÁREA RESTRITA (Portaria e Admin) */}
      <div className="mt-16 w-full max-w-6xl">
        <h3 className="text-lg font-bold text-slate-500 mb-4 uppercase tracking-wider ml-1">
          Acesso Restrito
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Botão Portaria (Operacional) */}
          <Link 
            href="/portaria"
            className="group relative overflow-hidden flex flex-col justify-between bg-[#2E1065] text-white rounded-2xl p-6 md:p-8 hover:bg-[#3b1582] transition-colors shadow-lg h-full"
          >
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                <ShieldCheck size={32} className="text-violet-200" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Painel da Portaria</h3>
              <p className="text-violet-200 mb-8 max-w-sm">
                Área operacional exclusiva para controle de acesso, câmera de encomendas e liberação de visitantes.
              </p>
            </div>
            <div className="relative z-10 mt-auto inline-flex items-center gap-2 font-bold bg-white/10 text-white w-fit px-6 py-3 rounded-xl group-hover:bg-white/20 transition-colors border border-white/10">
              Acessar Portaria <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
            {/* Efeito Visual de Fundo no Card */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          </Link>

          {/* Botão Administração (Gerencial) */}
          <Link 
            href="/admin"
            className="group relative overflow-hidden flex flex-col justify-between bg-slate-800 text-white rounded-2xl p-6 md:p-8 hover:bg-slate-900 transition-colors shadow-lg h-full"
          >
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                <Building size={32} className="text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Administração / Síndico</h3>
              <p className="text-slate-400 mb-8 max-w-sm">
                Área gerencial para gestão financeira, relatórios, boletos e painel de controle do condomínio.
              </p>
            </div>
            <div className="relative z-10 mt-auto inline-flex items-center gap-2 font-bold bg-white/10 text-white w-fit px-6 py-3 rounded-xl group-hover:bg-white/20 transition-colors border border-white/10">
              Acessar Admin <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
            {/* Efeito Visual de Fundo no Card */}
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/3"></div>
          </Link>

        </div>
      </div>

    </div>
  );
}
