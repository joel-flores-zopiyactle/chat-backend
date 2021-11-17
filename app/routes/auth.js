const express = require('express')
const router = express.Router();
const { crearCuenta, iniciarSesion , obtenerDatosUsuario } = require('./../controllers/auth')

router.post('/singup', crearCuenta);
router.post('/singin', iniciarSesion);
router.get('/user/:id', obtenerDatosUsuario);

module.exports = router