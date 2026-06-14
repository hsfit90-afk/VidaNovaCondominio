'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useEncomendas } from '@/hooks/use-encomendas';
import { PackagePlus, Send, CheckCircle, PackageOpen, ArrowLeft, Search, Clock, Filter } from 'lucide-react';
import type { Encomenda } from '@/types/encomenda';

export default function PortariaPage() {
  const { encomendas, addEncomenda, darBaixa, isLoaded } = useEncomendas();
  const [activeTab, setActiveTab] = useState<'registro' | 'pendentes' | 'historico'>('pendentes');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEmpresa, setFilterEmpresa] = useState('');
  const [filterVolumeMin, setFilterVolumeMin] = useState('');
  const [filterVolumeMax, setFilterVolumeMax] = useState('');

  // Estados para Form de Cadastro
  const [destinatario, setDestinatario] = useState('');
  const [aptoBloco, setAptoBloco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [volumes, setVolumes] = useState(1);
  const [protocolo, setProtocolo] = useState('');

  // Estado para Dar Baixa
  const [baixaId, setBaixaId] = useState<string | null>(null);
  const [recebedorNome, setRecebedorNome] = useState('');
  const [recebedorRg, setRecebedorRg] = useState('');

  const handleCadastrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinatario || !aptoBloco || !empresa) return;

    addEncomenda({
      destinatario,
      aptoBloco,
      telefone,
      empresa,
      volumes,
      protocolo
    });

    // Reset Form
    setDestinatario('');
    setAptoBloco('');
    setTelefone('');
    setEmpresa('');
    setVolumes(1);
    setProtocolo('');
    setActiveTab('pendentes');
    
    // Optional alert
    alert('Encomenda registrada com sucesso!');
  };

  const handleDarBaixa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baixaId || !recebedorNome || !recebedorRg) return;
    
    darBaixa(baixaId, recebedorNome, recebedorRg);
    setBaixaId(null);
    setRecebedorNome('');
    setRecebedorRg('');
  };

  const enviarWhatsApp = (encomenda: Encomenda) => {
    if (!encomenda.telefone) {
      alert('Número de telefone não cadastrado para esta encomenda.');
      return;
    }
    
    const numero = encomenda.telefone.replace(/\D/g, '');
    const mensagem = encodeURIComponent(`Olá, ${encomenda.destinatario}! Uma encomenda da empresa ${encomenda.empresa} chegou para você no Condomínio Vida Nova. Por favor, retire na portaria mediante apresentação de documento.`);
    const link = `https://wa.me/55${numero}?text=${mensagem}`;
    
    window.open(link, '_blank');
  };

  if (!isLoaded) return <div className="p-8 text-center text-slate-500">Carregando painel...</div>;

  const encomendasPendentes = encomendas.filter(e => {
    if (e.status !== 'Aguardando Retirada') return false;
    if (searchTerm && !(e.aptoBloco.toLowerCase().includes(searchTerm.toLowerCase()) || e.destinatario.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
    if (filterEmpresa && e.empresa.toLowerCase() !== filterEmpresa.toLowerCase()) return false;
    if (filterVolumeMin && e.volumes < parseInt(filterVolumeMin)) return false;
    if (filterVolumeMax && e.volumes > parseInt(filterVolumeMax)) return false;
    return true;
  });

  const historico = encomendas.filter(e => {
    if (e.status !== 'Entregue') return false;
    if (searchTerm && !(e.aptoBloco.toLowerCase().includes(searchTerm.toLowerCase()) || e.destinatario.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
    if (filterEmpresa && e.empresa.toLowerCase() !== filterEmpresa.toLowerCase()) return false;
    if (filterVolumeMin && e.volumes < parseInt(filterVolumeMin)) return false;
    if (filterVolumeMax && e.volumes > parseInt(filterVolumeMax)) return false;
    return true;
  });

  const empresasUnicas = Array.from(new Set(encomendas.map(e => e.empresa)));

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-violet-700 mb-2 font-bold">
            <Link href="/" className="hover:underline flex items-center gap-1"><ArrowLeft size={16} /> Voltar ao Início</Link>
          </div>
          <h2 className="text-3xl font-display font-bold text-[#2E1065]">Painel da Portaria</h2>
          <p className="text-slate-600">Gestão e controle de recebimentos e entregas</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6 flex flex-col">
        <div className="flex flex-col sm:flex-row border-b border-slate-100 p-3 gap-2 bg-slate-50">
          <button 
            onClick={() => setActiveTab('pendentes')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-colors ${activeTab === 'pendentes' ? 'bg-violet-100 text-[#2E1065] shadow-sm border border-violet-200' : 'text-slate-600 hover:bg-slate-100 border border-transparent'}`}
          >
             <PackageOpen size={18} /> Aguardando Retirada ({encomendas.filter(e => e.status === 'Aguardando Retirada').length})
          </button>
          <button 
            onClick={() => setActiveTab('registro')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-colors ${activeTab === 'registro' ? 'bg-violet-100 text-[#2E1065] shadow-sm border border-violet-200' : 'text-slate-600 hover:bg-slate-100 border border-transparent'}`}
          >
             <PackagePlus size={18} /> Registrar Nova Encomenda
          </button>
          <button 
            onClick={() => setActiveTab('historico')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-colors ${activeTab === 'historico' ? 'bg-violet-100 text-[#2E1065] shadow-sm border border-violet-200' : 'text-slate-600 hover:bg-slate-100 border border-transparent'}`}
          >
             <Clock size={18} /> Histórico Entregues
          </button>
        </div>

        <div className="p-6 md:p-8">
          
          {/* TAB: Registro */}
          {activeTab === 'registro' && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <PackagePlus className="text-purple-600"/> Dados do Recebimento
              </h3>
              <form onSubmit={handleCadastrar} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Apto / Bloco *</label>
                    <input required type="text" value={aptoBloco} onChange={e => setAptoBloco(e.target.value)} placeholder="Ex: 104A" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Nome do Destinatário *</label>
                    <input required type="text" value={destinatario} onChange={e => setDestinatario(e.target.value)} placeholder="Nome do morador" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Telefone / WhatsApp (Opcional)</label>
                    <input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(11) 99999-9999" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Empresa Entregadora *</label>
                    <input required type="text" value={empresa} onChange={e => setEmpresa(e.target.value)} placeholder="Correios, Mercado Livre, etc." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Quantidade de Volumes *</label>
                    <input required type="number" min="1" value={volumes} onChange={e => setVolumes(Number(e.target.value))} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Nº da Encomenda (Opcional)</label>
                    <input type="text" value={protocolo} onChange={e => setProtocolo(e.target.value)} placeholder="Código de rastreio" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button type="submit" className="w-full sm:w-auto py-3 px-6 bg-[#2E1065] text-white rounded-xl font-bold text-sm shadow-lg shadow-violet-200 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                    <CheckCircle size={20} /> Registrar Entrada
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: Pendentes & Histórico */}
          {(activeTab === 'pendentes' || activeTab === 'historico') && (
            <div>
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-slate-800">
                    {activeTab === 'pendentes' ? 'Encomendas na Portaria' : 'Histórico de Entregas'}
                  </h3>
                  <div className="relative w-full sm:w-72 mt-2 sm:mt-0">
                    <input 
                      type="text" 
                      placeholder="Buscar apto ou nome..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-200 focus:border-violet-400 outline-none transition-all text-sm"
                    />
                    <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-sm font-bold text-slate-500 uppercase flex items-center gap-1">
                    <Filter size={16} /> Filtros Rápidos:
                  </span>
                  
                  <select 
                    value={filterEmpresa}
                    onChange={(e) => setFilterEmpresa(e.target.value)}
                    className="bg-white border flex-1 min-w-[140px] border-slate-200 px-3 py-1.5 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400"
                  >
                    <option value="">Todas as Empresas</option>
                    {empresasUnicas.map(emp => (
                      <option key={emp} value={emp}>{emp}</option>
                    ))}
                  </select>
                  
                  <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg focus-within:ring-2 focus-within:ring-violet-200 focus-within:border-violet-400 transition-all">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vol. Mín:</span>
                    <input 
                      type="number" 
                      min="1"
                      placeholder="--"
                      className="w-12 text-sm outline-none text-slate-700 bg-transparent text-center"
                      value={filterVolumeMin}
                      onChange={e => setFilterVolumeMin(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg focus-within:ring-2 focus-within:ring-violet-200 focus-within:border-violet-400 transition-all">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vol. Máx:</span>
                    <input 
                      type="number" 
                      min="1"
                      placeholder="--"
                      className="w-12 text-sm outline-none text-slate-700 bg-transparent text-center" 
                      value={filterVolumeMax}
                      onChange={e => setFilterVolumeMax(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50 border-y border-slate-200 text-slate-600 text-sm">
                      <th className="py-4 px-4 font-semibold">Data / Hora</th>
                      <th className="py-4 px-4 font-semibold">Apto/Bloco</th>
                      <th className="py-4 px-4 font-semibold">Morador</th>
                      <th className="py-4 px-4 font-semibold">Detalhes</th>
                      <th className="py-4 px-4 font-semibold text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {/* Items loop */}
                    {(activeTab === 'pendentes' ? encomendasPendentes : historico).length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-500">
                          Nenhuma encomenda encontrada.
                        </td>
                      </tr>
                    ) : (
                      (activeTab === 'pendentes' ? encomendasPendentes : historico).map((enc) => (
                        <tr key={enc.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4 text-sm">
                            {new Date(activeTab === 'historico' && enc.dataRetirada ? enc.dataRetirada : enc.dataRecebimento).toLocaleDateString('pt-BR')} <br/>
                            <span className="text-slate-400 text-xs">
                              {new Date(activeTab === 'historico' && enc.dataRetirada ? enc.dataRetirada : enc.dataRecebimento).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-bold text-purple-900">{enc.aptoBloco}</td>
                          <td className="py-4 px-4 font-medium">{enc.destinatario}</td>
                          <td className="py-4 px-4 text-sm text-slate-600">
                            {enc.empresa} &bull; {enc.volumes} volume(s) <br/>
                            {enc.protocolo && <span className="text-xs text-slate-400">Ref: {enc.protocolo}</span>}
                          </td>
                          
                          <td className="py-4 px-4 text-right">
                            {activeTab === 'pendentes' ? (
                              <div className="flex flex-col sm:flex-row justify-end gap-2">
                                <button 
                                  onClick={() => enviarWhatsApp(enc)}
                                  className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-1.5 border border-green-300"
                                >
                                  <Send size={14} /> WhatsApp
                                </button>
                                <button 
                                  onClick={() => setBaixaId(enc.id)}
                                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
                                >
                                  Dar Baixa
                                </button>
                              </div>
                            ) : (
                             <div className="text-sm">
                               <p className="font-medium text-slate-800">Retirado por: {enc.recebedorNome}</p>
                               <span className="text-xs text-slate-500">RG: {enc.recebedorRg}</span>
                             </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Baixa */}
      {baixaId && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100">Registrar Entrega (Baixa)</h3>
              <form onSubmit={handleDarBaixa} className="space-y-4">
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Nome de quem está retirando *</label>
                    <input required type="text" value={recebedorNome} onChange={e => setRecebedorNome(e.target.value)} placeholder="Nome completo" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Documento (RG/CPF) *</label>
                    <input required type="text" value={recebedorRg} onChange={e => setRecebedorRg(e.target.value)} placeholder="Nº do documento" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all" />
                 </div>
                 
                 <div className="flex gap-3 justify-end pt-4 mt-2">
                   <button type="button" onClick={() => setBaixaId(null)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancelar</button>
                   <button type="submit" className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"><CheckCircle size={18} /> Confirmar Retirada</button>
                 </div>
              </form>
           </div>
        </div>
      )}

    </div>
  );
}
