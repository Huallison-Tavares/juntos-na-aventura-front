'use client';

import { useAuth } from '@/hooks/useAuth';
import { registerUserAdventure } from '@/services/adventures';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface EnrollButtonProps {
  adventureId: number;
  status: string;
  members: { userId: number }[];
  isHomePage?: boolean;
  paymentStatus?: boolean;
}

export function EnrollButton({ adventureId, status, members, isHomePage, paymentStatus }: EnrollButtonProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const isRegistered = members.some(m => m.userId === user?.id);

  if (status === 'full') {
    return (
      <button disabled className="w-full bg-slate-200 text-slate-500 font-bold py-4 rounded-xl cursor-not-allowed">
        Vagas Esgotadas
      </button>
    );
  }

  if (isRegistered) {
    return (
      <button className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-default">
        <CheckCircle2 className="h-5 w-5" />
        Você já está inscrito!
      </button>
    );
  }

  const handleEnroll = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    registerUserAdventure(adventureId, user?.id);
    router.push("/my-adventures");
  };

  if(isHomePage){
    return (
        <button 
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer   "
        >
            <Link href={`/adventure/${adventureId}`} className="w-full h-full flex justify-center py-4">
                Quero me juntar
            </Link>
        </button>
    )
  }

  if(paymentStatus){
    return(
      <button 
        disabled
        className="w-full bg-slate-200 text-slate-500 font-bold py-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed border border-slate-300"
      >
        Inscrições Indisponíveis
      </button>
    )
  }

  return (
    <button 
      onClick={handleEnroll}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer   "
    >
      Inscrever-se na Aventura
    </button>
  );
}