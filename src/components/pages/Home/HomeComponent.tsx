import { AdventureCard } from "@/components/common/AdventureCard/AdventureCard";
import { getAdventures } from "@/lib/adventures";
import { Adventure } from "@/types/Adventure";

export default async function HomeComponent() {
  const adventures = await getAdventures();

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Título em Destaque */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-4">
            Explore Novas Aventuras
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Escolha seu próximo destino e junte-se a grupos exclusivos. Experiências inesquecíveis começam aqui.
          </p>
        </div>

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