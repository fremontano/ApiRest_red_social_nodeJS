// Importar dependencias
const jwt = require('jwt-simple');
const moment = require('moment');

// Clave secreta 
const secret = process.env.SECRET_KEY;

// Crear una función para generar tokens 
const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        surname: user.surname,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(25, 'days').unix(),
    }
    // Devolver jwt token codificado 
    return jwt.encode(payload, secret);
}


// Exportar funciones
module.exports = {
    secret,
    createToken,
}
