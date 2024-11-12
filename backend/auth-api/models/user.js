const mongoose = require('mongoose');

// Define o esquema de usuário
const userSchema = new mongoose.Schema({
    nome: { type: String, required: true }, 
    contato: { type: String, required: true },
    rua: { type: String, required: true }, 
    bairro: { type: String, required: true },
    numero: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // Nome de usuário obrigatório e único
    password: { type: String, required: true } // Senha obrigatória
});
// Exporta o modelo de usuário
module.exports = mongoose.model('User', userSchema);