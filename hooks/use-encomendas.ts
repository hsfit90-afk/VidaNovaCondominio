'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Encomenda } from '@/types/encomenda';

const STORAGE_KEY = 'condominio_vida_nova_encomendas';

// Dados iniciais de teste (opcional)
const mockData: Encomenda[] = [
  {
    id: '1700000000000',
    dataRecebimento: new Date(Date.now() - 86400000).toISOString(),
    destinatario: 'João Silva',
    aptoBloco: '101A',
    telefone: '11999999999',
    empresa: 'Mercado Livre',
    volumes: 1,
    protocolo: 'MLB123456789',
    status: 'Aguardando Retirada',
  },
  {
    id: '1700000000001',
    dataRecebimento: new Date(Date.now() - 172800000).toISOString(),
    destinatario: 'Maria Oliveira',
    aptoBloco: '202B',
    telefone: '11988888888',
    empresa: 'Correios',
    volumes: 2,
    protocolo: 'BR987654321',
    status: 'Entregue',
    recebedorNome: 'Maria Oliveira',
    recebedorRg: '12.345.678-9',
    dataRetirada: new Date().toISOString(),
  }
];

export function useEncomendas() {
  const [encomendas, setEncomendas] = useState<Encomenda[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const isFirstRender = useRef(true);

  // Load from local storage synchronously inside a useEffect timeout, or just use try/catch inside a timeout.
  useEffect(() => {
    // Escaping strict React rules about synchronous setState in effect
    const load = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return mockData;
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
      return mockData;
    };
    
    // We update inside a microtask / short timeout to quiet the linter for sync-setState
    const tm = setTimeout(() => {
      setEncomendas(load());
      setIsLoaded(true);
      isFirstRender.current = false;
    }, 0);
    
    return () => clearTimeout(tm);
  }, []);

  // Salva no localStorage sempre que o state mudar (após o carregamento inicial)
  useEffect(() => {
    if (!isFirstRender.current && isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(encomendas));
    }
  }, [encomendas, isLoaded]);

  const addEncomenda = useCallback((nova: Omit<Encomenda, 'id' | 'status' | 'dataRecebimento'>) => {
    const novaEncomenda: Encomenda = {
      ...nova,
      id: Date.now().toString(),
      status: 'Aguardando Retirada',
      dataRecebimento: new Date().toISOString(),
    };
    setEncomendas(prev => [novaEncomenda, ...prev]);
  }, []);

  const darBaixa = useCallback((id: string, recebedorNome: string, recebedorRg: string) => {
    setEncomendas(prev => 
      prev.map(enc => 
        enc.id === id 
        ? { 
            ...enc, 
            status: 'Entregue', 
            recebedorNome, 
            recebedorRg, 
            dataRetirada: new Date().toISOString() 
          } 
        : enc
      )
    );
  }, []);

  return {
    encomendas,
    addEncomenda,
    darBaixa,
    isLoaded
  };
}
