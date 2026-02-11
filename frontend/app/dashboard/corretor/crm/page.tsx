'use client';

import KanbanBoard from '../components/KanbanBoard';
import { useCorretorId } from '../hooks/useCorretorToken';

export default function CrmPage() {
  const corretorId = useCorretorId();

  if (!corretorId) return null;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1800px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          CRM <span className="text-[#D4AF37]">Kanban</span>
        </h1>
        <p className="text-sm text-white/40 mt-1">
          Gerencie seus leads em tempo real com Lead Scoring automático
        </p>
      </div>

      <KanbanBoard corretorId={corretorId} />
    </div>
  );
}
