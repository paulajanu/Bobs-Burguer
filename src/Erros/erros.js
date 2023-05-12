export function Erros (response) {
    console.log('aaaaaaaaaaa', response);
    switch (response.status) {
        case 400:
            return 'Ops, algum erro, tente novamente!';
        // case 401:
        //     return 'Usuário e/ou senha incorreto!';
        // case 404:
        //     return 'Usuário não encontrado!';
        // default:
        //     return 'Ops, ocorreu algum erro!';
    }
}