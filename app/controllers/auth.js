const usuarioModelo = require('../models/user')
const datosUsuarioModelo = require('../models/detailUser')

// Create account
const crearCuenta = async (req, res) => {
    
    try {
        const {nombre, correo, password} = req.body
        const archivo = req.file
        const {apellidoPat, apellidoMat, telefono, edad, prioridad, problema, curp} = req.body
        
        const imagen = archivo.path
      
        const nuevoUsuario = await usuarioModelo({
            nombre, imagen, correo, password 
        })

        if(req.file) {
            nuevoUsuario.setImagen(req.file.path)
        }

        const usuarioSave = await nuevoUsuario.save()
        console.log(usuarioSave)

        const detailUser = await datosUsuarioModelo.create({
            apellidoPat, apellidoMat, telefono, edad, prioridad, problema, curp, usuario: usuarioSave.id
        })

        res.send({ data: detailUser});

    } catch (error) {
        console.log(error);
    }

}

const iniciarSesion = async (req, res) => {
    
    try {
        const {correo, password} = req.body
       
        const usuario = await usuarioModelo.findOne({ 'correo': correo});      

        if(usuario.correo === correo && usuario.password === password) {

            res.status(201);
            res.send({
                data: usuario
            });

        } else {
            
            res.status(401);
            res.send({
                error: 'Los datos son incorrectos'
            });
        }

       

    } catch (error) {
        
    }
}

const obtenerDatosUsuario = async (req, res) => {
    
    try {

        let { id } = req.params

        const user = await datosUsuarioModelo.
        findOne({'usuario':id}).populate('usuario')
        .exec((err, user) => {
            //console.log(user);
            res.status(200);
            res.json(user);
        });        

    } catch (error) {
        console.log(error);
        res.send({erro: error});
    }
}


module.exports = { crearCuenta, iniciarSesion, obtenerDatosUsuario }