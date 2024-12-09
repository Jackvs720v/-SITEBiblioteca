const jwt = require('jsonwebtoken'); // Certifique-se de instalar o pacote jsonwebtoken

exports.verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header recebido:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  const token = authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : authHeader;
  console.log('Token Extraído:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token Decodificado:', decoded); // Verifique a estrutura do token aqui

    // Certifique-se de que o token contém 'id' ou o campo correto
    if (!decoded.id) {
      return res.status(401).json({ error: 'ID do usuário não encontrado no token.' });
    }

    req.userId = decoded.id; // Adiciona o ID do usuário à requisição
    next();
  } catch (err) {
    console.error('Erro ao verificar token:', err.message); // Log detalhado do erro
    res.status(400).json({ error: 'Token inválido.' });
  }
};
