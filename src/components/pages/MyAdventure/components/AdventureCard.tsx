import { User } from "@/hooks/useAuth";
import { Adventure } from "@/types/Adventure";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";


interface MyAdventureCardProps {
    adventure: Adventure;
    user: User | null;
}

export function MyAdventureCard({
    adventure,
    user
}: MyAdventureCardProps) {
    return (
        <Link 
            key={adventure.id} 
            href={`/adventure/${adventure.id}`}
            className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden"
        >
            {/* Badge de Role */}
            <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-widest ${
            adventure.creatorId == user?.id ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
            }`}>
            {adventure.creatorId == user?.id ? 'Líder' : 'Membro'}
            </div>

            {/* Status de Pagamento */}
            {adventure.creatorId == user?.id && (
            <div className={`absolute top-8 right-4 flex items-center gap-1.5 px-2 py-1 rounded-md border text-[9px] font-bold uppercase transition-all ${
                adventure.paymentStatus 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                : 'bg-rose-50 border-rose-100 text-rose-600 animate-pulse'
            }`}>
                <div className={`h-1.5 w-1.5 rounded-full ${adventure.paymentStatus ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                {adventure.paymentStatus ? 'Depósito Pago' : 'Pagamento Pendente'}
            </div>
            )}

            <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors pr-24">
                {adventure.name}
            </h3>

            <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-slate-500">
                    <MapPin className="h-4 w-4 mr-2 text-indigo-500" />
                    {adventure.destination}
                </div>
                <div className="flex items-center text-sm text-slate-500">
                    <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                    {new Date(adventure.startDate).toLocaleDateString('pt-BR')}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                    adventure.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                    {adventure.status === 'confirmed' ? 'Confirmada' : 'Em formação'}
                </span>

                <div className="text-indigo-600 flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Detalhes <ArrowRight className="ml-1 h-4 w-4" />
                </div>
            </div>
        </Link>
    )
}