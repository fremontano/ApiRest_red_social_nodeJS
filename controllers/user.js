//Importar dependencia y modulos
const bcrypt = require('bcrypt');
// Inportar modelos
const User = require('../models/user');
// Importar servicios 
const jwt = require('../services/jwt');





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


//Ruta de login 
const login = async (req, res) => {

    try {
        //Recoger los datos
        const { email, password } = req.body;

        //Verificar  si los campos necesarios están presentes
        if (!email || !password) {
            return res.status(400).send({
                mensaje: 'Faltan datos por enviar'
            });
        }



        // Buscar en la base de datos si el usuario existe
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).send({
                mensaje: 'El usuario no existe'
            });
        }
        //Tabien podemos comparar con bcrypt.compare();
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Comprobar si la contraseña es correcta
        if (!passwordMatch) {
            return res.status(400).send({
                mensaje: 'La contraseña o el email son incorrecta'
            });
        }


        const { password: userPassword, ...userData } = user.toObject();
        // Generar el token JWT usando la función createToken
        const accessToken = createToken(user);


        //Devolver los datos al usuario
        return res.status(200).send({
            status: 'success',
            mensaje: 'identificaion correcta bienvenido',
            user: userData,
            accessToken: accessToken
        });


    } catch (error) {
        // Si hay algún error, devolver un mensaje de error
        return res.status(500).send({
            status: 'error',
            mensaje: 'Hubo un error en el login'
        });
    }

}







//Exportar acciones
module.exports = {
    pruebaUser,
    register,
    login
}