const { default: axios } = require('axios');
const User = require('../models/user'); // Importa o modelo de usuário
const bcrypt = require('bcryptjs'); // Importa bcrypt para hash de senhas
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para criar tokens JWT
 
// Função para registrar novos usuários
exports.register = async (req, res) => {
    const { nome, contato, rua, bairro, numero ,username, password, sobre } = req.body; // Pega dados do corpo da requisição
 
    if (!nome || !contato || !rua || !bairro || !numero || !username || !password || !sobre) {
        return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
    }
    try {
        // Criptografa a senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(password, 10); // O número 10 representa o "salt rounds = Controla quantas vezes são necessarias para calcular um bcrypt"
     
        // Cria um novo usuário com nome de usuário e senha criptografada
        const newUser = new User({ nome, contato, rua, bairro, numero, username, password: hashedPassword, sobre });
 
        await newUser.save(); // Salva o usuário no banco de dados
        res.status(201).json({ message: 'Usuário registrado com sucesso' }); // Responde com sucesso
    } catch (error) {
        console.error('Erro ao registrar usuário:', error); // Log do erro completo
        res.status(500).json({ error: 'Erro ao registrar usuário' }); // Responde com erro ao registrar
    }
};
 
// Função para fazer login de usuários
exports.login = async (req, res) => {
    const { username, password } = req.body; // Pega dados do corpo da requisição
    try {
        // Busca o usuário pelo nome de usuário
        const user = await User.findOne({ username });
 
        if (!user) return res.status(400).json({ error: 'Usuário não encontrado' }); // Retorna erro
 
        // Compara a senha fornecida com a senha armazenada no banco
        const isMatch = await bcrypt.compare(password, user.password);
 
        if (!isMatch) return res.status(400).json({ error: 'Senha incorreta' }); // Retorna erro se a senha não corresponder
 
        // Cria o token JWT para autenticação
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expira em 1 hora
 
        res.json({ token,
            userId: user._id
         }); // Responde com o token JWT
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Erro ao fazer login' }); // Responde com erro ao fazer login
    }
};
 
// Rota para buscar os dados do usuário
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.userId; // O ID do usuário está na requisição após a verificação do token
        if (!userId) {
            return res.status(401).json({ error: 'Acesso não autorizado. ID do usuário não encontrado.' });
        }

        const user = await User.findById(userId).select('-password'); // Exclui a senha dos dados retornados

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json(user); // Retorna os dados do usuário
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

 
 
  // Função para atualizar os dados do usuário
  exports.updateUser = async (req, res) => {
    const { nome, contato, rua, bairro, numero, emprestimos, sobre } = req.body;
    
    // Use req.user.id ou req.userId conforme o valor definido no middleware de verificação
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Acesso não autorizado. ID do usuário não encontrado.' });
    }

    try {
        // Atualiza o usuário com os novos dados
        const updatedUser = await User.findByIdAndUpdate(userId, {
            nome, contato, rua, bairro, numero, emprestimos, sobre
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.json(updatedUser); // Retorna os dados atualizados
    } catch (error) {
        console.error('Erro ao atualizar os dados:', error.message);
        res.status(500).json({ error: 'Erro ao atualizar os dados' });
    }
};

exports.reserveBook = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.userId; // Obtém o ID do usuário autenticado do token

    if (!userId) {
        return res.status(401).json({ error: 'Acesso não autorizado. ID do usuário não encontrado.' });
    }

    console.log('Iniciando processo de reserva de livro...');
    console.log('ID do livro:', bookId);
    console.log('ID do usuário:', userId);

    try {
        const libraryBackendURL = 'http://localhost:3000/api';
        console.log('URL do backend da biblioteca:', libraryBackendURL);

        // Verifica se o livro existe no library-backend
        const bookResponse = await axios.get(`${libraryBackendURL}/books/${bookId}`);
        console.log('Resposta do backend da biblioteca:', bookResponse.data);
        const book = bookResponse.data;

        if (!book) {
            console.log('Livro não encontrado no backend da biblioteca.');
            return res.status(404).json({ error: 'Livro não encontrado no estoque.' });
        }

        // Busca o usuário pelo ID
        const user = await User.findById(userId);
        console.log('Usuário encontrado no banco de dados:', user);

        if (!user) {
            console.log('Usuário não encontrado no banco de dados.');
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Verifica se o usuário já atingiu o limite de reservas
        if (user.reservations.length >= user.reservationLimit) {
            console.log('Usuário atingiu o limite de reservas.');
            return res.status(400).json({ error: 'Você atingiu o limite de reservas de livros.' });
        }

        // Adiciona o livro à lista de reservas do usuário
        console.log('Adicionando livro à lista de reservas do usuário...');
        user.reservations.push({ bookId, reservedAt: new Date() });
        await user.save();
        console.log('Reserva salva com sucesso no banco de dados.');

        // Resposta padrão para sucesso, similar ao updateUser
        res.json({
            message: 'Livro reservado com sucesso!',
            reservations: user.reservations, // Retorna as reservas do usuário
            user: {
                id: user._id,
                name: user.name,
                reservations: user.reservations.length, // Exemplo de retorno de dados relevantes do usuário
            },
        });

        console.log('Resposta enviada ao cliente com sucesso.');
    } catch (error) {
        console.error('Erro ao reservar livro:', error.message);

        if (error.response) {
            console.log('Erro de resposta do backend da biblioteca:', error.response.data);
            return res.status(error.response.status).json({
                error: 'Erro ao buscar o livro no library-backend.',
                details: error.response.data,
            });
        }

        console.log('Erro desconhecido:', error);
        res.status(500).json({ error: 'Erro ao reservar livro.', details: error.message });
    }
};

// Função para obter as reservas de livros do usuário
exports.getUserReservations = async (req, res) => {
    const userId = req.userId; // Obtém o ID do usuário a partir do token

    if (!userId) {
        return res.status(401).json({ error: 'Acesso não autorizado. ID do usuário não encontrado.' });
    }

    try {
        // Encontra o usuário e retorna suas reservas
        const user = await User.findById(userId).select('reservations'); // Apenas seleciona as reservas

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json({ reservations: user.reservations }); // Retorna as reservas
    } catch (error) {
        console.error('Erro ao obter reservas:', error.message);
        res.status(500).json({ error: 'Erro ao obter reservas de livros.' });
    }
};


