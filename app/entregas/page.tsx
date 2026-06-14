'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useEncomendas } from '@/hooks/use-encomendas';
import { ArrowLeft, Package, CheckCircle2, Search } from 'lucide-react';

export default function EntregasMoradorPage() {
  const { encomendas, isLoaded } = useEncomendas();
  const [aptoBusca, setAptoBusca] = useState('');
  const [buscou, setBuscou] = useState(false);

  if (!isLoaded) return <div className="p-8 text-center text-slate-500">Carregando...</div>;

  // Filtra as encomendas do apartamento buscado
  const minhasEncomendas = encomendas.filter(e => 
    e.aptoBloco.toLowerCase() === aptoBusca.toLowerCase()
  );

  const pendentes = minhasEncomendas.filter(e => e.status === 'Aguardando Retirada');
  const historico = minhasEncomendas.filter(e => e.status === 'Entregue');

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    if (aptoBusca.trim() !== '') {
      setBuscou(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pb-20">
      <div className="max-w-3xl mx-auto flex items-center gap-2 text-sm text-blue-600 mb-6 font-bold mt-4">
        <Link href="/" className="hover:underline flex items-center gap-1"><ArrowLeft size={16} /> Voltar ao Início</Link>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-blue-600 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <Package size={32} className="text-blue-200" />
              <h1 className="text-3xl font-display font-bold">Minhas Encomendas</h1>
            </div>
            <p className="text-blue-100 text-lg">
              Consulte as entregas e correspondências do seu apartamento.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>
        </div>

        <div className="p-8">
          <form onSubmit={handleBuscar} className="mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-4 items-end shadow-inner">
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Qual é o seu Bloco/Apto?</label>
              <input 
                type="text" 
                placeholder="Ex: 104A" 
                value={aptoBusca}
                onChange={(e) => {
                  setAptoBusca(e.target.value);
                  setBuscou(false);
                }}
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all font-medium text-slate-800"
                required
              />
            </div>
            <button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 shadow-md shadow-blue-200">
              <Search size={20} /> Buscar
            </button>
          </form>

          {buscou && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Seção de Pendentes */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Package className="text-amber-500" /> Aguardando na Portaria
                </h3>
                
                {pendentes.length === 0 ? (
                  <div className="bg-emerald-50 text-emerald-700 border-2 border-emerald-200 rounded-xl p-6 text-center font-bold">
                    <CheckCircle2 size={32} className="mx-auto mb-2 text-emerald-500" />
                    Oba! Você não tem nenhuma encomenda parada na portaria.
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {pendentes.map(enc => (
                      <div key={enc.id} className="border-2 border-amber-300 bg-amber-50 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-amber-200 text-amber-800 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">Pendente</span>
                            <span className="text-sm font-medium text-slate-600">{new Date(enc.dataRecebimento).toLocaleDateString('pt-BR')} às {new Date(enc.dataRecebimento).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
                          <p className="font-bold text-slate-800 text-xl">{enc.empresa}</p>
                          <p className="text-slate-600 font-medium mt-1">{enc.volumes} volume(s) recebido(s) para <span className="text-slate-800">{enc.destinatario}</span></p>
                        </div>
                        <div className="bg-white px-5 py-4 rounded-xl border-2 border-amber-200 text-center shadow-sm">
                          <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</span>
                          <span className="block font-bold text-amber-600 text-lg">Ir à Portaria</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Seção de Histórico */}
              {historico.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 mt-8">
                    <CheckCircle2 className="text-emerald-500" /> Histórico de Retiradas
                  </h3>
                  <div className="grid gap-3">
                    {historico.map(enc => (
                      <div key={enc.id} className="border border-slate-200 bg-white hover:bg-slate-50 transition-colors rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-2 items-start sm:items-center">
                        <div>
                          <p className="font-bold text-slate-700 text-lg">{enc.empresa}</p>
                          <p className="text-slate-500 text-sm font-medium">Entregue para <span className="text-slate-700">{enc.recebedorNome}</span> em {enc.dataRetirada ? new Date(enc.dataRetirada).toLocaleDateString('pt-BR') : ''}</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 uppercase tracking-wider">Entregue</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
