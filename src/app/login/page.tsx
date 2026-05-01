import LoginPage from "@/components/pages/Login/Login";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  titlePage: "Login",
  description: "Acesse sua conta para gerenciar suas aventuras."
});

export default function Login() {
  return (
    <>
      <LoginPage />
    </>
  );
}
