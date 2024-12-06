const jwt = require('jsonwebtoken'); // Certifique-se de instalar o pacote jsonwebtoken

exports.verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
      return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }
  const token = authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : authHeader;

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id; // Adiciona o ID do usuário à requisição
      next(); // Continua para o próximo middleware ou rota
  } catch (err) {
      console.error('Erro ao verificar token:', err.message);
      res.status(400).json({ error: 'Token inválido.' });
  }
};
