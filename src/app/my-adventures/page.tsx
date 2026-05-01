import MyAdventuresPage from "@/components/pages/MyAdventure";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  titlePage: "Minhas Aventuras",
  description: "Gerencie suas aventuras."
});

export default function MyAdventure() {
  return (
    <>
      <MyAdventuresPage />
    </>
  );
}
