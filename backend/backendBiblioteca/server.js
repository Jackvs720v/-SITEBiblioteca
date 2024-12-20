require('dotenv').config(); // Caminho relativo para o arquivo .env do backendAuth

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const bookRoutes = require('./routes/books'); // Importa as rotas dos livros

const app = express();

// Configurações gerais
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ativar logs de depuração do Mongoose
mongoose.set('debug', true);

// Conexão ao MongoDB
mongoose
  .connect('mongodb+srv://edu22052016:v8MKsYY9WuJEKm55@clustereduardo.qkzgc.mongodb.net/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Aumenta o tempo limite para 30 segundos
      })
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Uso das rotas
app.use('/api/books', bookRoutes); // Todas as rotas relacionadas aos livros

// Inicializar o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
