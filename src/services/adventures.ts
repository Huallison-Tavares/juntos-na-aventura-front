
export async function getAdventures() {
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_API + '/api/adventure/adventures', { 
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Falha ao carregar aventuras');
  }

  return res.json();
}

export async function getAdventureById(id:number) {
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_API + '/api/adventure/adventures/' + id, { 
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Falha ao carregar a aventura');
  }

  return res.json();
}

export async function registerUserAdventure(adventureId:number, userId?:number) {
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_API + `/api/adventure/adventures/${adventureId}/join`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
        }),
    });


  if (!res.ok) {
    throw new Error('Falha ao carregar a aventura');
  }

  return res.json();
}


export async function getAdventureByUser(userId:number) {
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_API + `/api/adventure/users/${userId}/adventures`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Falha ao carregar aventuras');
  }

  return res.json();
}