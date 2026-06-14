export type StatusEncomenda = 'Aguardando Retirada' | 'Entregue';

export interface Encomenda {
  id: string;
  dataRecebimento: string; // ISO string
  destinatario: string;
  aptoBloco: string;
  telefone: string; // WhatsApp do morador
  empresa: string;
  volumes: number;
  protocolo: string;
  status: StatusEncomenda;
  // Campos de retirada
  recebedorNome?: string;
  recebedorRg?: string;
  dataRetirada?: string; // ISO string
}
