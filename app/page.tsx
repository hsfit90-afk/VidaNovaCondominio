'use client';

import Link from 'next/link';
import { Package, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 mt-10">
      
      <div className="max-w-2xl w-full text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-[#2E1065] tracking-tight mb-4">
          Bem-vindo ao Sistema de <br className="hidden md:block"/>Gestão de Encomendas
        </h2>
        <p className="text-slate-600 text-lg">
          Selecione o seu perfil de acesso abaixo para continuar. Sistema exclusivo do Condomínio Vida Nova.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        
        {/* Card Portaria */}
        <Link 
          href="/portaria" 
          className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-[#2E1065] hover:shadow-md transition-all flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-xl bg-violet-50 border border-violet-100 text-[#2E1065] flex items-center justify-center mb-6">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Acesso Portaria</h3>
          <p className="text-slate-500 mb-6">
            Registrar o recebimento de novas encomendas e dar baixa em entregas.
          </p>
          <div className="mt-auto flex items-center gap-2 text-violet-700 font-bold text-sm">
            Entrar como Portaria <ArrowRight size={18} />
          </div>
        </Link>

        {/* Card Morador */}
        <Link 
          href="/morador" 
          className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
            <Users size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Acesso Morador</h3>
          <p className="text-slate-500 mb-6">
            Verificar encomendas aguardando retirada e consultar histórico do seu apartamento.
          </p>
          <div className="mt-auto flex items-center gap-2 text-emerald-700 font-bold text-sm">
            Consultar Minhas Encomendas <ArrowRight size={18} />
          </div>
        </Link>
        
      </div>
    </div>
  );
}
