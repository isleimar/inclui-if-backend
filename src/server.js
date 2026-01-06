const express = require('express');
const app = express();
const PORT = 3000;

// Middleware: Essencial para o Express entender o formato JSON nas requisições POST
app.use(express.json());

// Banco de dados fictício (Simulação de persistência para a aula)
let alunos = [
    { id: 1, nome: "Ana Silva", necessidade: "Ledor de prova" },
    { id: 2, nome: "Bruno Costa", necessidade: "Intérprete de Libras" }
];

// ROTA GET: Listagem de Alunos (Ponto de partida para o desafio dos alunos)
app.get('/alunos', (req, res) => {
    return res.status(200).json(alunos);
});

// ROTA POST: Cadastro de Alunos (O foco da sua aula)
app.post('/alunos', (req, res) => {
    const { nome, necessidade } = req.body;

    // Validação simples
    if (!nome || !necessidade) {
        return res.status(400).json({ error: "Nome e necessidade são obrigatórios." });
    }

    const novoAluno = {
        id: alunos.length + 1,
        nome,
        necessidade
    };

    alunos.push(novoAluno);

    // Retorno com Status 201 (Created)
    return res.status(201).json({
        message: "Aluno cadastrado com sucesso no IncluiIF!",
        aluno: novoAluno
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor do IncluiIF rodando em http://localhost:${PORT}`);
});