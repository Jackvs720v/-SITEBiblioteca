const express = require('express'); // Importa o Express
const router = express.Router(); // Cria um roteador do Express
const authController = require('../controllers/authController'); // Importa o controlador de autenticação
const { verifyToken } = require('../middlewares/authMiddleware');

// Rota para registrar novos usuários
router.post('/register', authController.register);
 
// Rota para login de usuários
router.post('/login', authController.login);
 
// Rota para obter dados do usuário
// authRoutes.js
router.get('/user', verifyToken, authController.getUserProfile);

// Rota para atualizar dados do usuário
router.put('/user', verifyToken, authController.updateUser);

// Rota para reserva de livro
router.post('/reservar', verifyToken, authController.reserveBook); 

// Rota para obter as reservas do usuário
router.get('/reservas', verifyToken, authController.getUserReservations);


module.exports = router; // Exporta o roteador para uso no app.js
 
 