'use client';

import { useAuth } from '@/hooks/useAuth';
import { AlertTriangle, CreditCard, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { createCheckoutSession } from '@/services/payment';

interface Props {
  adventureId: number;
  creatorId: number | null;
  paymentStatus: boolean | null;
}

export function LeaderPaymentAlert({ adventureId, creatorId, paymentStatus }: Props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const isOwner = user && user.id === creatorId;
  const isPending = !paymentStatus;

  if (!isOwner || !isPending) return null;

  const handlePayNow = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const checkoutUrl = await createCheckoutSession(adventureId, user.id);
      window.location.href = checkoutUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      alert(`Erro: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-amber-50 border-b border-amber-200 p-4 top-16 z-40">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 p-2 rounded-full">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-amber-900 font-bold">Aventura Pendente de Publicação</p>
            <p className="text-amber-700 text-sm">
              Esta expedição **não está visível para o público**. O pagamento do depósito de ativação é necessário.
            </p>
          </div>
        </div>

        <button
          onClick={handlePayNow}
          disabled={loading}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
          Pagar Ativação Agora
        </button>
      </div>
    </div>
  );
}