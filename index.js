//Importar dependencia
const connectToDatabase = require('./database/connection');
const express = require('express');
const cors = require('cors');


//Conexion a la base de datos
connectToDatabase();
//Mensaje de Bienvenida
console.log('API NODEJS para red social corriendo!!');

//Crear Servidor node
const app = express();
const PORT = 3000;

//Configurar Cors
app.use(cors());


//Covertir los datos del body a  un objetos json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Cargar configurar rutas
const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publicaction');
const followRoutes = require('./routes/follow');

app.use('/api/', userRoutes);
app.use('/api/', publicationRoutes);
app.use('/api/', followRoutes);

//ruta de prueba
// Definir una ruta de ejemplo
app.get('/ruta-prueba', (req, res) => {
    res.status(200).json({
        mensaje: 'Bienvenido a la API de Red Social'
    })
});



//Poner Servidor a escuchar peticiones http

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});