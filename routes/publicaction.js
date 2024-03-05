// routes/users.js
const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publication');


// Definir las rutas para las publicaciones
router.get('/publication', publicationController.pruebaPublication);

module.exports = router;