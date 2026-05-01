/**
 * Inicia o processo de checkout para ativação de uma aventura.
 * @param adventureId ID da aventura a ser paga
 * @param userId ID do líder/criador
 * @returns A URL de redirecionamento do Stripe ou lança um erro
 */
export async function createCheckoutSession(adventureId: number, userId: number): Promise<string> {
  const response = await fetch(process.env.NEXT_PUBLIC_SERVER_API + `/api/payments/adventures/${adventureId}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Falha ao processar pagamento');
  }

  const data = await response.json();
  
  if (!data.url) {
    throw new Error('URL de checkout não recebida do servidor');
  }

  return data.url;
}