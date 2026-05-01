# 🎨 AI-REPORT.md - Relatório de Uso de Inteligência Artificial

## 1. Erros, Limitações e Alucinações da IA

*   **Hydration Mismatch (Next.js):** A IA sugeriu inicialmente a renderização de estados de autenticação e botões dinâmicos diretamente no servidor. Isso causou erros de hidratação devido ao conflito entre o HTML gerado no servidor e o estado inicial no cliente. Corrigi o problema movendo a lógica para *Client Components* e utilizando proteções de montagem com `useEffect`.
*   **Conflito de Contextos (Server vs. Client):** Em diversos momentos, a IA recomendou o uso de hooks personalizados (como `useAuth`) dentro de *Server Components*, o que resultaria em erros de compilação. Foi necessária uma separação manual rigorosa de responsabilidades.
*   **Lógica de Preços Progressivos:** A IA propôs um cálculo simplificado baseado apenas em "preço mínimo". Tive que intervir para implementar a regra de negócio real, onde o valor individual deve ser recalculado dinamicamente conforme o grupo atinge faixas específicas da `priceTable`.
*   **Tipagem Inconsistente:** Foram geradas interfaces TypeScript genéricas para o objeto `adventure`. Realizei revisões manuais para mapear tipos complexos, como o JSON da tabela de preços e as relações de cardinalidade dos membros, garantindo a integridade do autocompletar e a segurança do código.

## 2. Revisões e Refatorações Manuais

*   **Modularização da Camada de Dados:** Implementei uma arquitetura de separação de interesses (*Separation of Concerns*). Isolei a lógica de comunicação com a API e as configurações de infraestrutura na pasta de `lib`. Isso evitou a repetição de código e a sobrecarga de lógica dentro dos componentes de interface.
*   **Aprimoramento de UX no Fluxo de Inscrição:** Refatorei o componente `EnrollButton` para incluir estados visuais de "desabilitado" e feedbacks de cursor (`cursor-not-allowed`). Essa alteração impede que usuários iniciem inscrições em expedições que ainda não foram ativadas financeiramente pelo líder.

## 3. Decisões de Arquitetura (Tomadas pelo Desenvolvedor)

*   **Fluxo de Ativação e Visibilidade:** Decidi condicionar a visibilidade pública da aventura ao status de pagamento do depósito de ativação. Esta escolha protege a plataforma contra "spam" e garante um fluxo de receita sustentável desde a criação do evento.
*   **Componentização Escalável:** Estruturei o `LeaderPaymentAlert` e o `EnrollButton` como componentes independentes e desacoplados da lógica principal da página. Isso permite a reutilização imediata desses elementos em outras áreas, como o Dashboard do usuário.
*   **Abstração de Autenticação:** Desenvolvi o hook personalizado `useAuth` para centralizar a persistência (`localStorage`), recuperação e gerenciamento de estados de login, facilitando o consumo dessas informações em qualquer parte da aplicação de forma padronizada.
*   **Design de Estrutura de Pastas:** Estabeleci uma hierarquia de diretórios baseada em responsabilidades claras, facilitando a manutenção a longo prazo e a previsibilidade do projeto para outros desenvolvedores.

## 4. Ferramentas Utilizadas

*   **Gemini 3 Flash:** Suporte no refinamento do design visual, estruturação de componentes e resolução de bugs de tipagem avançada.
*   **GitHub Copilot (Versão Free):** Utilizado para acelerar a escrita de código repetitivo (*boilerplate*) e sugestões de sintaxe durante a implementação das funções de serviço.