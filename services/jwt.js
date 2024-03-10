// Importar dependencias
var jwt = require('jwt-simple');
var moment = require('moment');

// Clave secreta 
const secret = process.env.SECRET_KEY;


/// Crear una funcion para generar tokens 
createToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        surname: user.surname,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(15, 'days').unix(),
    }
    // Devolver jwt token codificado 
    return jwt.encode(payload, secret);
}

module.exports = createToken;