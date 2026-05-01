import RegisterPage from "@/components/pages/Register/Register";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  titlePage: "Cadastro",
  description: "Crie sua conta para gerenciar suas aventuras."
});

export default function Login() {
  return (
    <>
      <RegisterPage />
    </>
  );
}
