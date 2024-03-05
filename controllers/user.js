// Acciones de prueba 

const pruebaUser = (req, res) => {
    return res.status(200).send({
        mensaje: 'Mensaje enviado desde: Controllador user.js'
    });
}


//Exportar acciones
module.exports = {
    pruebaUser
}