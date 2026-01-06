const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize'); 

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'src/data/incluiif.db' 
});

const Solicitacao = sequelize.define('Solicitacao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    aluno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync();

// ROTA GET: (listar)
app.get('/api/solicitacoes', async (req, res) => {
    const lista = await Solicitacao.findAll();    
    return res.json(lista);
});

// --- ROTA POST (Criar) ---
app.post('/api/solicitacoes', async (req, res) => {
    try {        
        const novaSolicitacao = await Solicitacao.create(req.body);
        
        return res.status(201).json(novaSolicitacao);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao salvar" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor do IncluiIF rodando em http://localhost:${PORT}`);
});