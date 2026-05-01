import { Metadata } from 'next';

interface MetadataProps {
  titlePage?: string;
  description?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  titlePage = "Explore Novas Aventuras",
  description = "Escolha seu próximo destino e junte-se a grupos exclusivos. Experiências inesquecíveis começam aqui.",
  noIndex = true
}: MetadataProps = {}): Metadata {
  const title = `Juntos na Viagem - ${titlePage}`  
  
  return {
    title,
    description,
    robots: {
      index: !noIndex,
      follow: !noIndex
    },
    icons: {
      icon: "/favicon.ico",
    }
  };
}