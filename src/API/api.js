const APIURL = 'https://burger-queen-api-mock-alpha.vercel.app';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluM0Bib2JzYnVyZ3Vlci5jb20iLCJpYXQiOjE2ODQ5NTk4MzAsImV4cCI6MTY4NDk2MzQzMCwic3ViIjoiNSJ9.DncGu8oqQI_OvcS1eDpWOdt-d_EwflGwIjogbT4Sl2U';

export default function login(email, senha) {
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

export const obterProdutos = () => {
    return fetch(`${APIURL}/products`, {

        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`,
        },

    })

}