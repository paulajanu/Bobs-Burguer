const APIURL = 'https://burger-queen-api-mock-alpha.vercel.app';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhb2xhQGJvYnNidXJndWVyLmNvbSIsImlhdCI6MTY4NDg4NjMxNiwiZXhwIjoxNjg0ODg5OTE2LCJzdWIiOiI1In0.dSsfrCrhUIjx7pkWCRxYDIghTsIKiSq45HxTqNdgDSY';

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