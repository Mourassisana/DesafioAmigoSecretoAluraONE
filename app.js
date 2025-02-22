    swal({
        title: 'Boas-vindas!\nChallenge Amigo Secreto\nPrograma ONE + Alura',
        text: 'Para começar, clique em OK \n e preencha o campo com os nomes dos seus amigos',
        icon: 'info',
        buttons: true,
        dangerMode: false,
        content: {
            element: "input",
            attributes: {
                placeholder: "Digite os nomes dos amigos",
                type: "text",
            },
        },
    }).then(() => {
                swal({
            text: 'Para cada amigo inserido, clique em "Adicionar amigo"',
            icon: 'info',
        }).then(() => {
            swal({
                text: 'Quando terminar, clique em "Sortear" e veja quem você tirou!',
                icon: 'info',
            });
        });
    });

let amigos = [];

function adicionarAmigo() {
    const inputAmigo = document.getElementById('inputAmigo');
    let amigo = inputAmigo.value.trim();

    if (amigo === '') {
        swal({
            title: 'Erro!',
            text: 'Digite o nome do amigo',
            icon: 'error',
        });
        return;
    } else {
        
    }