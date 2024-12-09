const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define o esquema de usuário
const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    contato: { type: String, required: true },
    rua: { type: String, required: true },
    bairro: { type: String, required: true },
    numero: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // Nome de usuário obrigatório e único
    password: { type: String, required: true }, // Senha obrigatória
    sobre: { type: String, required: true}, //Informações pessoais do usuário
    reservedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }], // Campo de livros reservados
});
// Exporta o modelo de usuário
module.exports = mongoose.model('User', userSchema);