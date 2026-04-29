export async function loginUser(email: string, whatsapp: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_API + '/api/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, whatsapp }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Erro ao fazer login');
  }

  localStorage.setItem('JuntosNaAventura:user', JSON.stringify(data.user));
  
  return data.user;
}

export async function registerUser(userData: { name: string; email: string; whatsapp: string }) {
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_API + '/api/user/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Erro ao realizar cadastro');
  }else{
    loginUser(userData.email, userData.whatsapp);
  }

  return data.user;
}