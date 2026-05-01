import CreateAdventurePage from "@/components/pages/Adventure/create";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  titlePage: "Lidere sua Próxima Expedição",
  description: "Transforme seu roteiro em realidade. Crie sua aventura, atraia parceiros de viagem e compartilhe custos e experiências inesquecíveis."
});

export default async function CreateAdventure() {
  return <CreateAdventurePage />;
}