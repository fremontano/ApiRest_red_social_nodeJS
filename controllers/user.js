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
const register = async (req, res) => {
    const { name, surname, nickname, email, password } = req.body;

    if (!name || !surname || !nickname || !email || !password) {
        return res.status(400).send({
            mensaje: 'Faltan datos por enviar'
        });
    }

    try {
        // Verificar si ya existe un usuario con el mismo email o nickname
        const existingUser = await User.findOne({ $or: [{ nickname: nickname }, { email: email }] });
        if (existingUser) {
            return res.status(400).send({
                mensaje: 'Ya existe un usuario con el mismo email o nickname'
            });
        }

        // Generar la sal y hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Crear el objeto de usuario para guardar en la base de datos
        const user_to_save = new User({
            name,
            surname,
            nickname,
            email,
            password: hashPassword
        });

        // Guardar el usuario en la base de datos
        await user_to_save.save();

        return res.status(200).json({
            mensaje: 'Usuario registrado',
            user_to_save
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            mensaje: 'Hubo un error al registrar el usuario'
        });
    }
};

module.exports = register;







//Exportar acciones
module.exports = {
    pruebaUser,
    register
}