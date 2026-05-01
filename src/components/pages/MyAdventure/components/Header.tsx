import { Compass, Plus } from "lucide-react";
import Link from "next/link";

export function MyAdventureHeader() {
    return (
        <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
                <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                    <Compass className="text-indigo-600 h-8 w-8" />
                    Minhas Aventuras
                </h1>
                <p className="text-slate-500 mt-2">Gerencie as expedições que você lidera ou participa.</p>
            </div>

            <Link
                href="/adventure/create" 
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 active:scale-95 text-sm"
            >
                <Plus className="h-5 w-5" />
                Nova Aventura
            </Link>
        </header>
    )
}