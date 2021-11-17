const contactoModelo = require('../models/contact')

const agregarContacto = async (req, res) => {
    try {
        
        const {usuario_id, contacto_id} = req.body

        const nuevoContacto = await contactoModelo.create({
            usuario_id, contacto_id
        })

        res.send({ 'data': nuevoContacto});

    } catch (error) {
        
    }
}


const obtenerContactoId = async (req, res) => {
    try {
        
        const id = req.params.id
        const contacto = await contactoModelo.find({usuario_id: id})
        res.status(201);
        res.send(contacto);

    } catch (error) {
        console.log(error);
    }
}


module.exports = { agregarContacto, obtenerContactoId }