const APIURL = 'https://burger-queen-api-mock-alpha.vercel.app';

export default function login(email, senha) {
  return fetch(`${APIURL}/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: senha
    })
  });
};