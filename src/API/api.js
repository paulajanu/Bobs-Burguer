const APIURL = 'http://localhost:8080'; 

export default function login (email, senha) {
    // console.log('Chamando a função login com email:', email, 'e senha:', senha);
    return fetch(`${APIURL}/login`, {
        // Tipo da requisicao
        method: "POST",
        //o headers indicar que estamos enviando dados no formato JSON
        //o content type serve para indicar o tipo de dado que estamos enviando.
        headers: {
            'Content-Type': 'application/json',
          },
        // Dados a serem enviados na requisicao
        body: JSON.stringify({
            email: email,
            password: senha
        })
    })
    }