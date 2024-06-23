
// routes/users.js
const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/user');
const authMiddleware = require('../middleware/auth');//middleware de autenticacion


//definir rutas
router.get('/user', authMiddleware.auth, UserControllers.pruebaUser);
router.post('/register', UserControllers.register);
router.post('/login', UserControllers.login);













// exportar mi ruta
module.exports = router;