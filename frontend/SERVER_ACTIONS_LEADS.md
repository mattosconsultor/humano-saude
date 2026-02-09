# 💾 Server Actions - Gestão de Leads

## 📁 Arquivos Criados

### 1. `/frontend/lib/supabase.ts`
Cliente Supabase configurado com tipos TypeScript para o banco de dados.

### 2. `/frontend/app/actions/leads.ts`
Server Actions do Next.js 14 para gerenciar leads no Supabase.

### 3. `/frontend/.env.local`
Variáveis de ambiente com credenciais do Supabase.

---

## 🎯 Funções Disponíveis

### `saveScannedLead(leadData)`
Salva um lead escaneado pela IA no banco de dados.

**Parâmetros:**
```typescript
{
  nome: string;              // Nome completo do lead
  whatsapp: string;          // WhatsApp (formato: +5511999999999)
  email?: string;            // Email opcional
  operadora_atual?: string;  // Operadora atual do plano
  valor_atual?: number;      // Valor mensal atual
  idades: number[];          // Array com idades dos beneficiários
  economia_estimada?: number; // Economia calculada
  valor_proposto?: number;   // Valor da proposta
  tipo_contratacao?: string; // PF ou PJ
  dados_pdf?: any;           // JSON com dados extraídos do PDF
  observacoes?: string;      // Observações adicionais
}
```

**Retorno:**
```typescript
{
  success: boolean;
  lead_id?: string;    // UUID do lead criado
  error?: string;      // Código do erro
  message?: string;    // Mensagem explicativa
}
```

**Validações:**
- ✅ Verifica se nome e whatsapp estão presentes
- ✅ Impede duplicatas (verifica WhatsApp existente)
- ✅ Adiciona histórico automático
- ✅ Define status inicial como "novo"
- ✅ Define origem como "scanner_pdf"

---

### `getLeads(filters?)`
Busca leads com filtros opcionais.

**Parâmetros:**
```typescript
{
  status?: string;   // Filtrar por status
  limit?: number;    // Limitar quantidade
  offset?: number;   // Paginação
}
```

**Exemplo de uso:**
```typescript
// Buscar todos os leads novos
const { success, data } = await getLeads({ status: 'novo' });

// Buscar 10 leads mais recentes
const { success, data } = await getLeads({ limit: 10 });
```

---

### `updateLeadStatus(leadId, newStatus, observacao?)`
Atualiza o status de um lead e registra no histórico.

**Status válidos:**
- `novo` - Lead recém-criado
- `contatado` - Primeiro contato realizado
- `negociacao` - Em negociação
- `proposta_enviada` - Proposta enviada ao cliente
- `ganho` - Venda fechada ✅
- `perdido` - Venda perdida ❌
- `pausado` - Lead pausado temporariamente

**Exemplo:**
```typescript
await updateLeadStatus(
  'uuid-do-lead',
  'contatado',
  'Cliente respondeu no WhatsApp'
);
```

---

### `getDashboardStats()`
Busca estatísticas da view `dashboard_stats`.

**Retorna:**
```typescript
{
  total_leads: number;
  leads_mes_atual: number;
  leads_hoje: number;
  economia_total: number;
  taxa_conversao: number;
  // ... mais 20+ métricas
}
```

---

## 🔌 Como Usar no Frontend

### Exemplo 1: Salvar Lead Após Scan do PDF

```typescript
// frontend/app/components/ScannerPDF.tsx
'use client';

import { saveScannedLead } from '@/app/actions/leads';
import { useState } from 'react';

export function ScannerPDF() {
  const [loading, setLoading] = useState(false);

  async function handleScanComplete(pdfData: any) {
    setLoading(true);

    // 1. Envia PDF para o backend Python (extração de dados)
    const response = await fetch('/api/scan-pdf', {
      method: 'POST',
      body: pdfData
    });

    const extractedData = await response.json();

    // 2. Salva no Supabase via Server Action
    const result = await saveScannedLead({
      nome: extractedData.nome,
      whatsapp: extractedData.whatsapp,
      email: extractedData.email,
      operadora_atual: extractedData.operadora,
      valor_atual: extractedData.valor,
      idades: extractedData.idades,
      economia_estimada: extractedData.economia,
      valor_proposto: extractedData.proposta,
      tipo_contratacao: extractedData.tipo,
      dados_pdf: extractedData
    });

    if (result.success) {
      alert('✅ Lead salvo com sucesso!');
      console.log('Lead ID:', result.lead_id);
    } else {
      alert(`❌ Erro: ${result.message}`);
    }

    setLoading(false);
  }

  return (
    <div>
      {/* Componente de upload de PDF */}
    </div>
  );
}
```

---

### Exemplo 2: Listar Leads na Página

```typescript
// frontend/app/dashboard/leads/page.tsx
import { getLeads } from '@/app/actions/leads';

export default async function LeadsPage() {
  // Server Component - busca direto no servidor
  const { success, data: leads } = await getLeads({ limit: 50 });

  if (!success || !leads) {
    return <div>Erro ao carregar leads</div>;
  }

  return (
    <div>
      <h1>Gestão de Leads ({leads.length})</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>WhatsApp</th>
            <th>Status</th>
            <th>Economia</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.nome}</td>
              <td>{lead.whatsapp}</td>
              <td>{lead.status}</td>
              <td>R$ {lead.economia_estimada?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

### Exemplo 3: Atualizar Status com Botão

```typescript
// frontend/app/components/LeadCard.tsx
'use client';

import { updateLeadStatus } from '@/app/actions/leads';

export function LeadCard({ lead }) {
  async function handleStatusChange(newStatus: string) {
    const result = await updateLeadStatus(
      lead.id,
      newStatus,
      'Status alterado pelo usuário'
    );

    if (result.success) {
      alert('✅ Status atualizado!');
      // A página será revalidada automaticamente
    }
  }

  return (
    <div>
      <h3>{lead.nome}</h3>
      <p>Status atual: {lead.status}</p>
      
      <button onClick={() => handleStatusChange('contatado')}>
        Marcar como Contatado
      </button>
    </div>
  );
}
```

---

## 🔄 Fluxo Completo: PDF → Banco de Dados

```
┌─────────────────┐
│  1. Upload PDF  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│  2. Backend Python          │
│  - Extrai dados com OpenAI  │
│  - Calcula economia         │
│  - Retorna JSON             │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  3. Server Action           │
│  saveScannedLead()          │
│  - Valida dados             │
│  - Verifica duplicatas      │
│  - Insere no Supabase       │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  4. Banco de Dados          │
│  - Tabela: insurance_leads  │
│  - Status: "novo"           │
│  - Origem: "scanner_pdf"    │
└─────────────────────────────┘
```

---

## ⚙️ Configuração

### Variáveis de Ambiente Necessárias

```bash
# frontend/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://tcfwuykrzeialpakfdkc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Instalar Dependências

```bash
cd frontend
npm install @supabase/supabase-js
```

---

## 🧪 Testar a Integração

### 1. Teste Manual no Console do Navegador

```javascript
// Abra http://localhost:3000/dashboard
// Abra o Console (F12)

// Importe a função
const { saveScannedLead } = await import('/app/actions/leads');

// Teste
const result = await saveScannedLead({
  nome: 'João Silva Teste',
  whatsapp: '+5511999999999',
  idades: [35, 32],
  valor_atual: 1200.00,
  economia_estimada: 250.00
});

console.log(result);
// ✅ { success: true, lead_id: 'uuid...', message: 'Lead salvo com sucesso!' }
```

### 2. Verificar no Supabase

1. Acesse: https://supabase.com/dashboard
2. Vá em **Table Editor** > `insurance_leads`
3. Veja o lead criado ✅

---

## 📊 Estrutura dos Dados

### Lead Completo no Banco

```typescript
{
  id: "550e8400-e29b-41d4-a716-446655440000",
  created_at: "2026-02-09T10:30:00Z",
  updated_at: "2026-02-09T10:30:00Z",
  nome: "João Silva",
  whatsapp: "+5511999999999",
  email: "joao@email.com",
  operadora_atual: "Unimed",
  valor_atual: 1200.00,
  idades: [35, 32],
  economia_estimada: 250.00,
  valor_proposto: 950.00,
  tipo_contratacao: "PF",
  status: "novo",
  origem: "scanner_pdf",
  prioridade: "media",
  dados_pdf: { /* JSON do PDF */ },
  historico: [
    {
      timestamp: "2026-02-09T10:30:00Z",
      evento: "lead_criado",
      origem: "scanner_pdf"
    }
  ],
  atribuido_a: null,
  arquivado: false
}
```

---

## 🚀 Próximos Passos

1. **Integrar no ScannerPDF**: Adicionar chamada para `saveScannedLead()` após extração
2. **Criar página de Leads**: `/dashboard/leads` para visualização
3. **Dashboard Analytics**: Conectar `getDashboardStats()` aos cards
4. **Webhook Real-time**: Configurar listeners para atualizações em tempo real

---

## 🔐 Segurança

- ✅ **Server Actions**: Executam no servidor, não expõem lógica
- ✅ **Anon Key**: Chave pública segura do Supabase
- ✅ **Validação**: Dados validados antes de inserir
- ✅ **RLS**: Row Level Security desabilitado por ora (ativar se necessário)

---

## 📝 Notas Importantes

1. **Revalidação Automática**: As Server Actions invalidam o cache das páginas automaticamente
2. **Histórico**: Toda mudança de status é registrada no campo `historico`
3. **Duplicatas**: A função verifica WhatsApp antes de inserir
4. **Tipos**: TypeScript garante type-safety end-to-end

---

**✅ Sistema de Server Actions configurado e pronto para uso!**
