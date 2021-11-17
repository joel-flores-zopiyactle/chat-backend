const usuarioModelo = require('../models/user')
const datosUsuarioModelo = require('../models/detailUser')
const contactosModelo = require('../models/contact')

// Create account
const crearCuenta = async (req, res) => {
    
    try {
        const {nombre, imagen, correo, password} = req.body
        const {telefono, edad, prioridad, problema, curp} = req.body

        const nuevoUsuario = await usuarioModelo.create({
            nombre, imagen, correo, password
        })

        const detailUser = await datosUsuarioModelo.create({
            telefono, edad, prioridad, problema, curp, usuario: nuevoUsuario.id
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
        console.log(id);
        const user = await usuarioModelo.findById({_id:id});

        const userData = await datosUsuarioModelo.find({'usuario': id})

        const contactos = await contactosModelo.find({'usuario_id': id})


        const resultado = {
            user: user,
            info: userData,
            contatos: contactos
        }

        res.status(200);
        res.json({ resultado});

    } catch (error) {
        console.log(error);
        res.send({erro: error});
    }
}


module.exports = { crearCuenta, iniciarSesion, obtenerDatosUsuario }