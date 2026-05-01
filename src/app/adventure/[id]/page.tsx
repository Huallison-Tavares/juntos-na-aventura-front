import AdventureDetailsPage from "@/components/pages/Adventure/id";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";
interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  return constructMetadata({
    titlePage: `Detalhes da Expedição #${id}`,
    description: "Confira o roteiro, valores e junte-se a este grupo. A próxima grande aventura está a um clique de distância."
  });
}

export default async function AdventurePage({ params }: PageProps) {
  
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) return <h1>ID não encontrado</h1>;

  return <AdventureDetailsPage id={id} />;
}