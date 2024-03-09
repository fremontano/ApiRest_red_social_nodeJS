
// routes/users.js
const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/user');


//definir rutas
router.get('/user', UserControllers.pruebaUser);
router.post('/register', UserControllers.register);
router.post('/login', UserControllers.login);













// exportar mi ruta
module.exports = router;