'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useEncomendas } from '@/hooks/use-encomendas';
import { ArrowLeft, Package, History, Info, DoorOpen } from 'lucide-react';
import type { Encomenda } from '@/types/encomenda';

export default function MoradorPage() {
  const { encomendas, isLoaded } = useEncomendas();
  const [aptoBloco, setAptoBloco] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [activeTab, setActiveTab] = useState<'pendentes' | 'historico'>('pendentes');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aptoBloco.trim()) return;
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
    setAptoBloco('');
    setActiveTab('pendentes');
  };

  if (!isLoaded) return <div className="p-8 text-center text-slate-500">Carregando permissões...</div>;

  if (!isLogged) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-800 mb-6 transition-colors">
            <ArrowLeft size={16} /> Voltar ao Início
          </Link>
          
          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-slate-800 mb-2">Acesso do Morador</h2>
            <p className="text-slate-500 text-sm">Digite a identificação do seu apartamento para consultar suas encomendas.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Apto / Bloco</label>
              <input 
                autoFocus
                required 
                type="text" 
                value={aptoBloco} 
                onChange={e => setAptoBloco(e.target.value)} 
                placeholder="Ex: 104A" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white outline-none transition-all text-lg font-medium text-purple-950" 
              />
            </div>
            
            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold shadow-sm flex justify-center items-center gap-2 transition-all">
              Consultar Encomendas <DoorOpen size={20} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  const minhasEncomendas = encomendas.filter(e => e.aptoBloco.toLowerCase() === aptoBloco.toLowerCase());
  const pendentes = minhasEncomendas.filter(e => e.status === 'Aguardando Retirada');
  const historico = minhasEncomendas.filter(e => e.status === 'Entregue');

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
           <div className="text-sm text-slate-400 mb-1">Painel Exclusivo</div>
           <h2 className="text-2xl font-display font-bold text-[#2E1065] flex items-center gap-2">
              Apto/Bloco: <span className="text-emerald-600">{aptoBloco.toUpperCase()}</span>
           </h2>
        </div>
        <button onClick={handleLogout} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
          Sair
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setActiveTab('pendentes')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-all border ${activeTab === 'pendentes' ? 'bg-[#2E1065] text-white shadow-lg shadow-violet-200 border-transparent' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
        >
          <Package size={18} /> Aguardando Retirada 
          {pendentes.length > 0 && <span className="bg-emerald-400 text-emerald-950 px-2 py-0.5 rounded-full text-xs ml-1">{pendentes.length}</span>}
        </button>
        <button 
          onClick={() => setActiveTab('historico')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-all border ${activeTab === 'historico' ? 'bg-[#2E1065] text-white shadow-lg shadow-violet-200 border-transparent' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
        >
          <History size={18} /> Histórico
        </button>
      </div>

      <div className="space-y-4">
        {(activeTab === 'pendentes' ? pendentes : historico).length === 0 ? (
          <div className="bg-slate-50 bg-opacity-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-500 flex flex-col items-center">
            <Info size={48} className="text-slate-300 mb-4" />
            <p className="text-lg">Nenhuma encomenda <b>{activeTab === 'pendentes' ? 'aguardando retirada' : 'no seu histórico'}</b>.</p>
          </div>
        ) : (
          (activeTab === 'pendentes' ? pendentes : historico).map(enc => (
            <div key={enc.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-purple-300 transition-colors">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${enc.status === 'Aguardando Retirada' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                    {enc.status.toUpperCase()}
                  </span>
                  <span className="text-slate-400 text-xs font-medium">
                    {new Date(enc.dataRecebimento).toLocaleDateString('pt-BR')} às {new Date(enc.dataRecebimento).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-slate-800">{enc.empresa}</h4>
                <p className="text-slate-600 font-medium">Volumes: <span className="text-slate-800">{enc.volumes}</span> &bull; {enc.destinatario}</p>
                {enc.protocolo && <p className="text-slate-500 text-sm mt-1 border-l-2 border-slate-200 pl-2">Ref: {enc.protocolo}</p>}
              </div>

              {enc.status === 'Entregue' && enc.dataRetirada && (
                <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 w-full md:w-auto text-sm text-slate-600 text-left md:text-right mt-2 md:mt-0">
                  <p className="font-semibold text-slate-800 mb-1 border-b border-slate-200 pb-1">Detalhes da Retirada</p>
                  <p>Por: <b>{enc.recebedorNome}</b></p>
                  <p>RG: {enc.recebedorRg}</p>
                  <p className="text-xs text-slate-400 mt-1">{new Date(enc.dataRetirada).toLocaleString('pt-BR')}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
