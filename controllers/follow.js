const pruebaFollow = (req, res) => {
    return res.status(200).send({
        mensaje: 'Mensaje enviado desde: Controllador follow.js'
    });
}



//Exportar acciones
module.exports = {
    pruebaFollow
}