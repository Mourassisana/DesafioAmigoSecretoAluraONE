Swal.fire({
    customClass: {
        title: 'swal-title',   // Classe para o título
        content: 'swal-content',  // Classe para o conteúdo
        confirmButton: 'swal-btn-confirm',  // Classe para o botão de confirmação
    },  
    title: 'Boas-vindas ao \nChallenge Amigo Secreto\nPrograma ONE + Alura',
    text: 'Para começar, preencha o campo\ncom os nomes dos seus amigos',
    confirmButtonText: 'Show de Bola'
}).then(() => {
    Swal.fire({
        customClass: {
            title: 'swal-title',   // Classe para o título
            content: 'swal-content',  // Classe para o conteúdo
            confirmButton: 'swal-btn-confirm',  // Classe para o botão de confirmação
        },  
        text: 'Para cada amigo inserido, clique em "Adicionar Amigo".',
        icon: 'warning',
        confirmButtonText: 'OK'
    }).then(() => {
        Swal.fire({
            customClass: {
                title: 'swal-title',   // Classe para o título
                content: 'swal-content',  // Classe para o conteúdo
                confirmButton: 'swal-btn-confirm',  // Classe para o botão de confirmação
            },  
            text: 'Quando todos os participantes forem inseridos,\n clique em "Sortear Amigo" e veja quem você tirou!',
            icon: 'info',
            confirmButtonText: 'Começar'
        });
    });
});

let adicionarAmigos = [];

function inserirAmigoALista() {
    const nomeAmigo = document.getElementById("amigo").value; // Considerando o valor, não o elemento

    // Verifica se o campo está vazio
    if (nomeAmigo.trim() === "") {
        Swal.fire({
            title: 'Opa!',   // Título do SweetAlert
            text: 'Por favor, insira um nome válido para sorteio',
            icon: 'error',  
            customClass: {
                title: 'swal-title',  // Classe personalizada para o título
                content: 'swal-content',  // Classe personalizada para o conteúdo
                confirmButton: 'swal-btn-confirm',  // Classe personalizada para o botão de confirmação
            },
        });
        return;
    }

    // Verifica se o nome já foi adicionado
    if (adicionarAmigos.includes(nomeAmigo)) {
        Swal.fire({
            title: 'Nome Duplicado!',   // Título do SweetAlert
            text: 'Esse nome já foi adicionado à lista. Insira um amigo diferente.',
            icon: 'warning',  
            customClass: {
                title: 'swal-title',  // Classe personalizada para o título
                content: 'swal-content',  // Classe personalizada para o conteúdo
                confirmButton: 'swal-btn-confirm',  // Classe personalizada para o botão de confirmação
            },
        });
        return;
    }

    // Se não for vazio nem duplicado, adiciona o amigo à lista
    adicionarAmigos.push(nomeAmigo); 
    document.getElementById("amigo").value = "";
    Swal.fire({
        title: 'Show!',  // Título do SweetAlert
        text: `${nomeAmigo} foi adicionado à lista de sorteio!`,
        icon: 'success',  
        customClass: {
            title: 'swal-title',  // Classe personalizada para o título
            content: 'swal-content',  // Classe personalizada para o conteúdo
            confirmButton: 'swal-btn-confirm',  // Classe personalizada para o botão de confirmação
        },
    });

    atualizarLista();
}

function atualizarLista() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = ""; 

    adicionarAmigos.forEach((amigo) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        li.classList.add("amigo-item");

        listaAmigos.appendChild(li); 
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const btnAdicionar = document.getElementById('btnAdicionar');
    if (btnAdicionar) {
        btnAdicionar.addEventListener('click', inserirAmigoALista);
    } else {
        console.error("Botão de adicionar não encontrado!");
    }
});

function sortearAmigo() {
    if (adicionarAmigos.length === 0) {
        Swal.fire({
            title: "Oops!", 
            text: "A lista está vazia. Adicione pelo menos um nome antes de sortear.", 
            icon: "error", 
            customClass: {
                title: 'swal-title',
                content: 'swal-content',
                confirmButton: 'swal-btn-confirm',
            },
        });
        return;
    }

    const amigoSorteado = adicionarAmigos[Math.floor(Math.random() * adicionarAmigos.length)];

    Swal.fire({
        title: "Amigo Sorteado!", 
        text: `O amigo sorteado é: ${amigoSorteado}`, 
        icon: "success", 
        customClass: {
            title: 'swal-title',
            content: 'swal-content',
            confirmButton: 'swal-btn-confirm',
        },
    });

    // Desabilita o botão de "Sortear Amigo" após o sorteio
    document.getElementById("btnSortear").disabled = true;

    // Habilita o botão "Novo Sorteio"
    document.getElementById("btnNovoSorteio").disabled = false;
}

// Função para novo sorteio (limpa a lista e permite novo sorteio)
function novoSorteio() {
    // Limpa a lista de amigos
    adicionarAmigos = [];
    atualizarLista(); // Atualiza a visualização da lista (agora vazia)

    // Desabilita o botão "Novo Sorteio" após usá-lo
    document.getElementById("btnNovoSorteio").disabled = true;

    // Habilita o botão "Sortear Amigo" para um novo sorteio
    document.getElementById("btnSortear").disabled = false;
}