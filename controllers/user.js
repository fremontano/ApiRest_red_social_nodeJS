//Importar dependencia y modulos
const bcrypt = require('bcrypt');
const User = require('../models/user');




// Acciones de prueba 
const pruebaUser = (req, res) => {
    return res.status(200).send({
        mensaje: 'Mensaje enviado desde: Controllador user.js'
    });
}



//Registrar Usuarios
const registerUsuarios = (req, res) => {

    //recoger los datos que llegan de la peticion
    const params = req.body;

    if (!params.name || !params.surname || !params.nickname || !params.email || !params.password) {
        return res.status(400).json({
            status: 'error',
            error: 'Faltan datos por enviar',
        });
    }

    //Crear objeto usuario para guardar
    let user_save = new User(params);

    //Control de usuario duplicado en la base de datos
    //exec ejecuta mi consulta en la base de datos


    return res.status(200).json({
        status: 'success',
        user_save

    });
};






//Exportar acciones
module.exports = {
    pruebaUser,
    registerUsuarios


}
