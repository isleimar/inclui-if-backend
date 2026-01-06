// URL da API (Fica fácil de mudar se precisar)
const API_URL = 'http://localhost:3000/api/solicitacoes';

// Evento que carrega a lista assim que a página abre
document.addEventListener('DOMContentLoaded', carregarLista);

// --- FUNÇÃO 1: CADASTRAR (CREATE) ---
async function enviarSolicitacao() {
    const alunoInput = document.getElementById('aluno');
    const tipoInput = document.getElementById('tipo');

    const aluno = alunoInput.value.trim();
    const tipo = tipoInput.value;

    // Validação
    if (aluno === '') return alert('Informe o nome do aluno.');
    if (tipo === '') return alert('Selecione o tipo de apoio.');

    try {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ aluno, tipo })
        });

        if (resposta.status === 201) {
            alunoInput.value = ''; // Limpa campo
            tipoInput.value = '';  // Limpa campo
            carregarLista();       // Atualiza a tela
        } else {
            alert('Erro ao cadastrar.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro na conexão com o servidor.');
    }
}

// --- FUNÇÃO 2: LISTAR (READ) ---
async function carregarLista() {
    try {
        const resposta = await fetch(API_URL);
        const dados = await resposta.json();

        const divLista = document.getElementById('lista');
        
        // Gera o HTML de cada card
        divLista.innerHTML = dados.map(item => `
            <div class="card">
                <b>ID:</b> ${item.id}<br>
                <b>Aluno:</b> ${item.aluno}<br>
                <b>Apoio:</b> ${item.tipo}<br>
                <button class="btn-delete" onclick="deletarSolicitacao(${item.id})">
                    Apagar
                </button>
            </div>
        `).join('');
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

// --- FUNÇÃO 3: DELETAR (DELETE) ---
async function deletarSolicitacao(id) {
    if (!confirm("Tem certeza que deseja excluir esta solicitação?")) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (resposta.status === 204) {
            carregarLista(); // Atualiza a lista após apagar
        } else {
            alert("Erro ao excluir o item.");
        }
    } catch (error) {
        console.error("Erro na exclusão:", error);
    }
}