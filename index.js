require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const bodyParser = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server, { cors: { origin: "*"}})
const messageModel = require('./app/models/messages')
const {dbConnect} = require('./config/mongo')
const config = require('./config/config');

app.use(bodyParser.json());


app.use('/public', express.static(__dirname + '/storage/img'));

app.use('/api', require('./app/routes'));

/* Conexion a MongoDB */
dbConnect() 

/* Socket io CHAT */
io.on("connection", (socket) => {
  //console.log(socket.id); // cliente conectado

  const mensajes =  messageModel.find({}).then( result => {
    socket.emit('chat', result)
    socket.broadcast.emit('chat', result)
    
  }) 

  socket.on("chat", (data) => {
    
    //console.log(data);

    const newMessage = messageModel.create(data).then( res => {
      const mensajes =  messageModel.find({}).then( result => {
        socket.emit('chat', result)
        socket.broadcast.emit('chat', result)
        
      })    
    });
    

  });

});

server.listen(config.PORT, () => {
    console.log(`Server started on port: ${config.PORT}`);
});

