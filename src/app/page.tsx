import Header from "@/components/common/Header/Header";
import HomeComponent from "@/components/pages/Home/HomeComponent";
import { constructMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata();

export default function Home() {
  return (
    <>
      <Header />
      <HomeComponent />
    </>
  );
}
