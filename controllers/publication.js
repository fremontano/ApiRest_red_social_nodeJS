const pruebaPublication = (req, res) => {
    return res.status(200).send({
        mensaje: 'Mensaje enviado desde: Controllador Publication.js'
    });
}



//Exportar acciones
module.exports = {
    pruebaPublication
}