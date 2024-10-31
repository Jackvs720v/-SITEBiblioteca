const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inicialização do app
const app = express();
app.use(cors());
app.use(express.json());

// Conexão ao MongoDB = Banco de Dados
mongoose.connect('mongodb+srv://edu22052016:v8MKsYY9WuJEKm55@clustereduardo.qkzgc.mongodb.net/library', { // Link que usamos para conectar no bando de dados MongoDB
    useNewUrlParser: true,
    useUnifiedTopology: true, // Corrigido de 'useUnifiedTopoLogy'
})
    .then(() => console.log('MongoDB Conectado'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Importação das rotas
const booksRoutes = require('./routes/books'); //Colocamos como rota o caminho citado './routes/books'
app.use('/api/books', booksRoutes); //Adicionamos o caminho Api 

// Definir a porta do servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
