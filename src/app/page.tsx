import Header from "@/components/common/Header/Header";
import HomeComponent from "@/components/pages/Home/HomeComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juntos na Viagem - Explore Novas Aventuras",
  description: "Escolha seu próximo destino e junte-se a grupos exclusivos. Experiências inesquecíveis começam aqui.",
};

export default function Home() {
  return (
    <>
      <Header />
      <HomeComponent />
    </>
  );
}
