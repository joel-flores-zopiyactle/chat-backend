const messageModel = require('./../models/messages')

const enviarMensaje = async (req, res) => {

    try {
        const { mensaje, usuario_id, recibido_id} = req.body

        const newMessage = await messageModel.create({
            mensaje, usuario_id, recibido_id
        }) 

        res.status(200);
        res.send({
            data: newMessage
        });

    } catch (error) {
        
    }

}

const todosLosMensajes =  async (req, res) => {
    try {
        //const user_id = req.params.id // TODO: Agregar received_id para buscar por uusraio enviado y recibido

        const mensajes = await messageModel.find({}) //"user_id": user_id  

        res.status(200);
        res.send({
            data: mensajes
        });

    } catch (error) {
        
    }
}

module.exports = { enviarMensaje, todosLosMensajes }