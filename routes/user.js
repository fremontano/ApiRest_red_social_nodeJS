
// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


//definir rutas
router.get('/user', userController.pruebaUser);








// exportar mi ruta
module.exports = router;