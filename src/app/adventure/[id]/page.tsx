import AdventureDetailsPage from "@/components/pages/Adventure/id";
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdventurePage({ params }: PageProps) {
  
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) return <h1>ID não encontrado</h1>;

  return <AdventureDetailsPage id={id} />;
}