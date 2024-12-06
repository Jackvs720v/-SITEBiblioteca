const jwt = require('jsonwebtoken'); // Certifique-se de instalar o pacote jsonwebtoken

exports.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Authorization Header recebido:', authHeader); // Log do cabeçalho recebido
  
    if (!authHeader) {
      return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }
  
    const token = authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : authHeader;
    console.log('Token Extraído:', token); // Log do token extraído
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token Decodificado:', decoded); // Log do conteúdo decodificado do token
      req.userId = decoded.id; // Adiciona o ID do usuário à requisição
      next();
    } catch (err) {
      console.error('Erro ao verificar token:', err.message); // Log do erro
      res.status(400).json({ error: 'Token inválido.' });
    }
  };
  