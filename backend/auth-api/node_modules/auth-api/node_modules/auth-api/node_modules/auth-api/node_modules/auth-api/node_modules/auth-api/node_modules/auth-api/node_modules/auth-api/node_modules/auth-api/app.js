require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
 
const express = require('express'); // Importa o Express, um framework para criar APIs
const mongoose = require('mongoose'); // Importa o Mongoose para conectar e interagir com o MongoDB
const cors = require('cors'); // Importa o middleware CORS
const app = express(); // Inicializa uma aplicação Express

const BooksModel = require('../backendBiblioteca/models/Book'); // Ajuste conforme seu diretório


app.use(cors());
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação (ainda a serem criadas)
 
app.use(cors({
    origin: 'http://localhost:8080', // Permite requisições apenas do seu frontend
    methods: ['GET', 'POST', 'PUT', 'GET'], // Adicione outros métodos se necessário
}));
 
app.use(express.json()); // Middleware para processar requisições JSON
 
// Configura as rotas de autenticação para o caminho /api/auth
app.use('/api/auth', authRoutes);
 
// Conecta ao banco de dados MongoDB usando a string de conexão armazenada em variáveis de ambiente
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Usa o novo parser de URL do MongoDB
    useUnifiedTopology: true, // Usa o novo mecanismo de gerenciamento de conexões
})
.then(() => console.log('Conectado ao MongoDB')) // Se conectar com sucesso, exibe mensagem no console
.catch((error) => console.error('Erro ao conectar ao MongoDB:', error)); // Se falhar, exibe mensagem de erro
 
const PORT = process.env.PORT || 5000; // Define a porta do servidor, usando variável de ambiente ou padrão 5000
 
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)); // Inicia o servidor e exibe mensagem no console

//Livros Reservados

app.post('/api/reservar', async (req, res) => {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
        return res.status(400).json({ error: "Informações insuficientes para reservar o livro." });
    }

    try {
        const book = await BooksModel.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: "Livro não encontrado." });
        }

        if (book.available <= 0) {
            return res.status(400).json({ error: "Nenhuma cópia disponível para reserva." });
        }

        book.available -= 1;
        await book.save();

        await UserModel.findByIdAndUpdate(userId, {
            $push: { reservedBooks: bookId },
        });

        res.json({ message: "Livro reservado com sucesso!" });
    } catch (error) {
        console.error("Erro ao reservar o livro:", error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});

app.get('/api/reservado', async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: "ID do usuário não fornecido" });
    }

    try {
        const user = await UserModel.findById(userId).populate('reservedBooks');
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        res.json(user.reservedBooks);
    } catch (error) {
        console.error("Erro ao buscar livros reservados:", error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});