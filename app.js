// Variáveis Globais
const adicionarAmigos = [];
const input = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");
const resultadoSorteio = document.getElementById("resultadoSorteio");

// SweetAlert Inicial
Swal.fire({
    customClass: { 
        title: 'swal-title', 
        htmlContainer: 'swal-content', 
        confirmButton: 'swal2-confirm' 
    },
    title: 'Boas-vindas ao \nChallenge Amigo Secreto\nPrograma ONE + Alura',
    text: 'Para começar, preencha o campo\ncom os nomes dos seus amigos',
    confirmButtonText: 'Show de Bola'
}).then(() => {
    Swal.fire({
        customClass: { 
            title: 'swal-title', 
            htmlContainer: 'swal-content', 
            confirmButton: 'swal2-confirm' 
        },
        text: 'Para cada amigo inserido, clique em "Adicionar Amigo" ou pressione Enter.',
        icon: 'warning',
        confirmButtonText: 'OK'
    }).then(() => {
        Swal.fire({
            customClass: { 
                title: 'swal-title', 
                htmlContainer: 'swal-content', 
                confirmButton: 'swal2-confirm' 
            },
            text: 'Quando todos os participantes forem inseridos,\n clique em "Sortear Amigo" e veja quem você tirou!',
            icon: 'info',
            confirmButtonText: 'Começar'
        });
    });
});

// Eventos
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('btnAdicionar').addEventListener('click', inserirAmigoALista);
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            inserirAmigoALista();
        }
    });
});

// Funções
function inserirAmigoALista() {
    const nomeAmigo = input.value.trim();

    if (nomeAmigo === "") {
        exibirAlerta("Opa!", "Por favor, insira um nome válido para sorteio", "error");
        return;
    }

    if (verificarDuplicado(nomeAmigo)) {
        exibirAlerta("Nome Duplicado!", "Esse nome já foi adicionado à lista. Insira um amigo diferente.", "warning");
        return;
    }

    adicionarAmigos.push(nomeAmigo.toLowerCase());
    input.value = "";
    exibirAlerta("Show!", `${nomeAmigo} foi adicionado à lista de sorteio!`, "success");
    atualizarLista();
}

function verificarDuplicado(nome) {
    return adicionarAmigos.some(amigo => amigo === nome.toLowerCase());
}

function atualizarLista() {
    listaAmigos.innerHTML = "";
    adicionarAmigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo.charAt(0).toUpperCase() + amigo.slice(1);
        li.classList.add("amigo-item");
        listaAmigos.appendChild(li);
    });
}

function sortearAmigo() {
    if (adicionarAmigos.length === 0) {
        exibirAlerta("Oops!", "A lista está vazia. Adicione pelo menos um nome antes de sortear.", "error");
        return;
    }

        // Animação de sorteio
        const sorteioInterval = setInterval(() => {
            const index = Math.floor(Math.random() * adicionarAmigos.length);
            resultadoSorteio.textContent = `Sorteando... ${adicionarAmigos[index]}`;
        }, 100);
    
        setTimeout(() => {
            clearInterval(sorteioInterval);
            const amigoSorteado = adicionarAmigos[Math.floor(Math.random() * adicionarAmigos.length)];
            const nomeFormatado = amigoSorteado.charAt(0).toUpperCase() + amigoSorteado.slice(1);
            
            listaAmigos.style.display = "none";
            resultadoSorteio.textContent = `O amigo sorteado é: ${nomeFormatado}`;
            resultadoSorteio.style.display = "block";
            
            // Animação de confete
            confetti({
                particleCount: 200,
                spread: 160,
                origin: { y: 0.6 },
                colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"]
            });
    
            exibirAlerta("Amigo Sorteado!", `O amigo sorteado é: ${nomeFormatado}`, "success");
            limparSorteio();
        }, 2000); // 2 segundos de animação
    }

function limparSorteio() {
    adicionarAmigos.length = 0;
    atualizarLista();
    document.getElementById("btnSortear").disabled = true;
    document.getElementById("btnNovoSorteio").disabled = false;
    document.getElementById("btnAdicionar").disabled = true;
}    

function novoSorteio() {
    listaAmigos.style.display = "block";
    resultadoSorteio.style.display = "none";
    resultadoSorteio.textContent = "";
    document.getElementById("btnNovoSorteio").disabled = true;
    document.getElementById("btnSortear").disabled = false;
    document.getElementById("btnAdicionar").disabled = false;
}

function exibirAlerta(titulo, texto, icone) {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icone,
        customClass: { 
            title: 'swal-title', 
            htmlContainer: 'swal-content', 
            confirmButton: 'swal2-confirm' 
        }
    });
}