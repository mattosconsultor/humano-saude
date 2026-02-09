import { createClient } from '@supabase/supabase-js';

// Configuração do cliente Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos do banco de dados
export type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  nome: string;
  whatsapp: string;
  email: string | null;
  operadora_atual: string | null;
  valor_atual: number | null;
  idades: number[];
  economia_estimada: number | null;
  valor_proposto: number | null;
  tipo_contratacao: string | null;
  status: 'novo' | 'contatado' | 'negociacao' | 'proposta_enviada' | 'ganho' | 'perdido' | 'pausado';
  origem: string;
  prioridade: string;
  observacoes: string | null;
  dados_pdf: any;
  historico: any[];
  atribuido_a: string | null;
  arquivado: boolean;
};

export type Database = {
  public: {
    Tables: {
      insurance_leads: {
        Row: Lead;
        Insert: Omit<Lead, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Lead, 'id' | 'created_at'>>;
      };
    };
  };
};
