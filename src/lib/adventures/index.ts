
export async function getAdventures() {
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_API + '/api/adventure/adventures', { 
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Falha ao carregar aventuras');
  }

  return res.json();
}