const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const Book = require('./models/Book'); // Modelo de Livro
const User = require('/Users/PC/Pictures/-SITEBiblioteca/backend/auth-api/models/user'); // Modelo de Usuário (corrigido o caminho)
              
const app = express();

// Configuração do CORS
app.use(cors());

// Parsing de requisições em JSON
app.use(express.json());

// Configuração do Multer para upload de imagens
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      cb(null, true); // Aceita o arquivo
    } else {
      cb(new Error('Apenas arquivos JPG, JPEG ou PNG são permitidos!'), false);
    }
  },
}).single('image');

// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexão ao MongoDB
mongoose
  .connect('mongodb+srv://edu22052016:v8MKsYY9WuJEKm55@clustereduardo.qkzgc.mongodb.net/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rota para criar um livro com upload de imagem
app.post('/api/books', upload, async (req, res) => {
  const { title, author, year, isbn, editora, sinopse } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const newBook = new Book({
      title,
      author,
      year,
      isbn,
      editora,
      sinopse,
      image,
      available: 1, // Número padrão de cópias disponíveis
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    res.status(500).json({ message: 'Erro ao criar livro', error });
  }
});

// Rota para listar todos os livros
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// Rota para obter detalhes de um livro
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Livro não encontrado.' });
    res.status(200).json(book);
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Rota para atualizar livro (com upload de imagem opcional)
app.put('/api/books/:id', upload, async (req, res) => {
  const { title, author, year, isbn, editora, sinopse } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined; // Atualiza apenas se houver nova imagem

  const updatedData = { title, author, year, isbn, editora, sinopse };

  if (image) updatedData.image = image; // Atualiza a imagem se fornecida

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id, // ID do livro a ser atualizado
      updatedData, // Novos dados para o livro
      { new: true } // Retorna o livro atualizado
    );

    if (!updatedBook) return res.status(404).json({ error: 'Livro não encontrado.' });

    res.status(200).json(updatedBook); // Retorna o livro atualizado
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Rota para excluir livro
app.delete('/api/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id); // Deleta o livro pelo ID
    if (!deletedBook) return res.status(404).json({ error: 'Livro não encontrado.' });

    res.status(200).json({ message: 'Livro deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    res.status(500).json({ error: 'Erro ao deletar livro' });
  }
});

// Rota para reservar um livro
app.post('/api/reservar', async (req, res) => {
  const { bookId } = req.body;
  const userId = req.userId;

  if (!bookId || !userId) {
    return res.status(400).json({ error: 'Parâmetros obrigatórios faltando.' });
  }

  try {
    console.log("Tentando reservar livro...");
    const book = await Book.findById(bookId);
    if (!book) {
      console.log("Livro não encontrado.");
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    if (book.available <= 0) {
      console.log("Nenhuma cópia disponível para reserva.");
      return res.status(400).json({ error: 'Nenhuma cópia disponível para reserva.' });
    }

    // Atualizar a disponibilidade do livro e salvar a reserva
    book.available -= 1;
    await book.save();
    await User.findByIdAndUpdate(userId, { $push: { reservedBooks: bookId } });

    console.log("Livro reservado com sucesso!");
    res.status(200).json({ message: 'Livro reservado com sucesso!' });
  } catch (error) {
    console.error('Erro ao reservar livro:', error); // Log do erro no backend
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Rota para buscar livros reservados por usuário
app.get('/api/reservado', async (req, res) => {
  const userId = req.userId; // O userId agora está disponível graças ao middleware

  try {
    const user = await User.findById(userId).populate('reservedBooks');
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    res.status(200).json(user.reservedBooks);
  } catch (error) {
    console.error('Erro ao buscar livros reservados:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Inicializar o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
  