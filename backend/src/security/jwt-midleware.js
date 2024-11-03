import pkg from 'jsonwebtoken';
const { verify, sign } = pkg;

const JWT_SECRET = process.env.JWT_SECRET_KEY;

function getToken(req) {
    // req.headers['authorization'];//?.split(' ')[1]; // Extrai o token do cabeçalho Authorization
    return req.headers['authorization'] || null;
}

export function authOrBlockMiddleware(req, res, next) {
    const token = getToken(req);

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
 
    try {
        // Verifica o token JWT
        const decoded = verify(token, JWT_SECRET);
        req.token = decoded;  // Salva o payload do token na requisição
        next();               // Passa para o próximo middleware/rota
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
}

export function authOrPassMidlewware(req, res, next) {
    const token = getToken(req);
    
    let decoded = { data : null };

    try {
        // Verifica o token JWT
        decoded = verify(token, JWT_SECRET);
    } catch (error) {
        decoded = { data : null };
    }

    req.token = decoded;
    next();
}

export function createJWTToken( data ){
    return sign({ data }, JWT_SECRET);
}