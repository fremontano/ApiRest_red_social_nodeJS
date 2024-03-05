// followRoutes.js
const express = require('express');
const router = express.Router();
const followController = require('../controllers/follow');


//definir rutas
router.get('/follow', followController.pruebaFollow);



module.exports = router;