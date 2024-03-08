//Importar dependencia y modulos
const bcrypt = require('bcrypt');
const User = require('../models/user');
const user = require('../models/user');




// Acciones de prueba 
const pruebaUser = (req, res) => {
    return res.status(200).send({
        mensaje: 'Mensaje enviado desde: Controllador user.js'
    });
}



//Registrar Usuarios
const registerUsuarios = async (req, res) => {
    //recoger los datos que llegan de la peticion
    const params = req.body;

    if (!params.name || !params.surname || !params.nickname || !params.email || !params.password) {
        return res.status(400).json({
            status: 'error',
            error: 'Faltan datos por enviar',
        });
    }


    //Controlar usuario duplicados
    try {
        const existingUsers = await User.find({
            $or: [
                { email: params.email.toLowerCase() },
                { nickname: params.nickname.toLowerCase() }
            ]
        }).exec();

        if (existingUsers && existingUsers.length > 0) {
            return res.status(200).json({
                status: 'success',
                error: 'Ya existe un usuario con ese email o nickname'
            });
        }

        //Cifrar contraseña usuario
        let hashedPassword = await bcrypt.hash(params.password, 10);

        params.password = hashedPassword;

        //Crear objeto usuario para guardar
        let user_to_save = new User(params);
        let save_user = await user_to_save.save();



        //Devolver respuesta
        return res.status(200).json({
            status: 'success',
            message: 'Accion registro de usuario',
            user_to_save: save_user
        });

    } catch (error) {
        console.error('Error al guardar el documento:', error);

        return res.status(500).json({
            status: "Error",
            messague: "Error en la consulta de usuarios",
        });
    }
};






//Exportar acciones
module.exports = {
    pruebaUser,
    registerUsuarios


}
