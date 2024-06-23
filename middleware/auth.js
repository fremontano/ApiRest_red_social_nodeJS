//importar modulos jwt, moment
const jwt = require('jwt-simple');
const moment = require('moment');


//importar clave secreta
const libreriaJwt = require('../services/jwt');
const secreta = libreriaJwt.secret;


//funcion de autenticacion
exports.auth = (req, res, nex) => {
    //Comprobar si llego la cabezera de autenticacion
    if (!req.headers.authorization) {
        return res.status(403).send({
            status: 'error',
            mensaje: 'La petición no tiene cabecera de autenticación'
        });
    }

    //limpiar el token y quitar comillas
    let token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        //decodiicar el token
        let payload = jwt.decode(token, secreta);
        //comprobar si el token no ha expirado
        if (payload.exp <= moment().unix()) {

            return res.status(403).send({
                status: 'error',
                mensaje: 'El token ha expirado',
                error
            });
        }

    } catch (error) {
        return res.status(403).send({
            status: 'error',
            mensaje: 'El token no es válido'
        });
    }

    //agregar datoa de usuario a la peticion
    req.user = payload.sub;

    //pasar a la ejecucio de la accion
    next();

}

//importar middleware de autenticacion a ruta de  usuario