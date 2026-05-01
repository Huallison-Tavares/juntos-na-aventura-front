import { getAdventures } from "@/services/adventures";
import { Adventure } from "@/types/Adventure";
import { AdventureCard } from "./components/AdventureCard";
import { AdventureTitle } from "./components/AdventureTitle";

export default async function HomeComponent() {
  const adventures = await getAdventures();

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Título em Destaque */}
        <AdventureTitle />

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adventures.map((adventure: Adventure) => (
            <AdventureCard key={adventure.id} adventure={adventure} />
          ))}
        </div>

        {/* Estado Vazio */}
        {adventures.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">Nenhuma aventura encontrada no momento.</p>
          </div>
        )}
      </div>
    </main>
  );
}