const mongoose = require('mongoose');


// Conexión a la base de datos MongoDB
const connection = async () => {


    try {

        await mongoose.connect('mongodb://localhost:27017/mi_red_social');
        console.log('Conexión a la base de datos, mi_red_social establecida');

    } catch (error) {
        throw new Error('Error al conectar a la base de datos:', error);
    }
}


// exportar para usarlo en indexe.js 
module.exports = connection;