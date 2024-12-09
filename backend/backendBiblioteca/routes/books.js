const express = require('express'); // Importa o Express
const Book = require('../models/Book'); // Importa o modelo Book
const User = require('/Users/PC/Pictures/-SITEBiblioteca/backend/auth-api/models/user'); // Modelo de Usuário (corrigido o caminho)
const router = express.Router(); // Cria o roteador
const multer = require('multer'); // Importa o Multer
const path = require('path'); // Para lidar com extensões de arquivos
const fs = require('fs'); // Para verificar e criar diretórios
const mongoose = require('mongoose');
const { verifyToken } = require('../middlewares/authMiddleware'); // Importa o middleware

// Verificar e criar o diretório 'uploads' se não existir
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir); // Cria o diretório uploads se não existir
}

// Configuração do Multer para upload de imagens
const upload = multer({
  dest: uploadsDir, // Diretório onde as imagens serão salvas localmente
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      cb(null, true); // Aceita o arquivo
    } else {
      cb(new Error('Apenas arquivos JPG, JPEG ou PNG são permitidos!'), false);
    }
  },
}).single('image'); // 'image' é o campo que usaremos para a imagem

// Configurar o Express para servir arquivos estáticos do diretório uploads
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// *** CRIAÇÃO (POST) ***
router.post('/', upload, async (req, res) => {
  const { title, author, year, isbn, editora, sinopse, paginas, quantidade, available, rating } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : ''; // Caminho da imagem acessível pela URL

  try {
    const newBook = new Book({
      title,
      author,
      year,
      isbn,
      image, // Salva o caminho da imagem como URL
      editora,
      sinopse,
      paginas,
      quantidade,
      available,
      rating,
    });

    await newBook.save();
    res.status(201).json(newBook); // Retorna o livro criado
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    res.status(500).json({ message: 'Erro ao criar livro', error });
  }
});

// *** LEITURA (GET) ***
router.get('/', async (req, res) => {
  try {
    const books = await Book.find(); // Busca todos os livros
    res.status(200).json(books); // Retorna a lista de livros
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ message: 'Erro ao buscar livros', error });
  }
});

// *** ATUALIZAÇÃO (PUT) ***
router.put('/:id', upload, async (req, res) => {
  const { title, author, year, isbn, editora, sinopse, quantidade } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined; // Atualiza apenas se houver nova imagem

  const updatedData = { title, author, year, isbn, image, editora, sinopse, quantidade };
  if (image) updatedData.image = image;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true } // Retorna o livro atualizado
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    res.status(200).json(updatedBook); // Retorna o livro atualizado
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    res.status(500).json({ message: 'Erro ao atualizar livro', error });
  }
});

// *** EXCLUSÃO (DELETE) ***
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id); // Deleta o livro pelo ID
    if (!deletedBook) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    res.status(200).json({ message: 'Livro deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar livro:', error);
    res.status(500).json({ message: 'Erro ao deletar livro', error });
  }
});

// *** AVALIAÇÃO (POST) ***
router.post('/:id/rating', async (req, res) => {
  const { rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'A avaliação deve ser entre 1 e 5' });
  }

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    book.ratingSum += rating;
    book.ratingCount += 1;
    book.rating = book.ratingSum / book.ratingCount;

    await book.save();

    res.status(200).json(book);
  } catch (error) {
    console.error('Erro ao adicionar avaliação:', error);
    res.status(500).json({ message: 'Erro ao adicionar avaliação', error });
  }
});

// *** BUSCAR LIVRO PELO ID (GET) ***
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // Busca o livro pelo ID
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    res.status(500).json({ message: 'Erro ao buscar livro', error });
  }
});

//RESERVAR

router.post('/reservar', verifyToken, async (req, res) => {
  const { bookId } = req.body; // ID do livro enviado no corpo da requisição
  const userId = req.userId; // ID do usuário autenticado (fornecido pelo middleware)

  

  // Validação: Verificar se o campo `bookId` foi enviado
  if (!bookId) {
    return res.status(400).json({ error: 'O campo "bookId" é obrigatório.' });
  }

  // Validação: Verificar se o `bookId` é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ error: 'ID do livro inválido.' });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'ID de usuário inválido.' });
  }
  
// Verifique se o `userId` está corretamente atribuído
console.log('userId:', userId); // Adiciona um log para verificar o `userId`
  try {
    // Buscar o livro pelo ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }


    // Verificar a quantidade de cópias disponíveis
    console.log('Verificando a quantidade de cópias disponíveis...', book.quantidade);
    if (book.quantidade <= 0) {
      console.log('Erro: Nenhuma cópia disponível para reserva.');
      return res.status(400).json({ error: 'Nenhuma cópia disponível para reserva.' });
    }

    // Atualizar a quantidade do livro e a data de reserva
    console.log('Atualizando a quantidade do livro e a data de reserva...');
    book.quantidade -= 1;
    book.reservationDate = new Date(); // Data e hora da reserva
    await book.save();

    console.log('Livro atualizado com sucesso:', book);

    // Adicionar o livro à lista de livros reservados do usuário
    console.log('Adicionando o livro à lista de livros reservados do usuário...', userId, bookId);
    // Buscar o usuário e adicionar o livro à lista de livros reservados
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Adicionar o livro à lista de livros reservados do usuário
    if (!user.reservedBooks.includes(bookId)) {
      user.reservedBooks.push(bookId);
      await user.save();  // Salvar as alterações no usuário
    } else {
      console.log('Livro já reservado por este usuário.');
    }
    
    res.status(200).json({
      message: 'Livro reservado com sucesso!',
      book: {
        id: book._id,
        title: book.title,
        reservationDate: book.reservationDate,
      },
      user: user, // Corrigido: Enviando o objeto `user` corretamente
    });
  } catch (error) {
    console.error('Erro ao reservar livro:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});


// ROTA: Buscar livros reservados por um usuário
// MÉTODO: GET /api/books/reservas
router.get('/reservas', verifyToken, async (req, res) => {
  const userId = req.userId; // ID do usuário autenticado (fornecido pelo middleware)

  try {
    // Busca o usuário e popula os dados dos livros reservados
    const user = await User.findById(userId).populate('reservedBooks');
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(200).json(user.reservedBooks); // Retorna os livros reservados
  } catch (error) {
    console.error('Erro ao buscar livros reservados:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}); 

module.exports = router;