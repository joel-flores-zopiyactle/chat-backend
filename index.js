require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(cors())
const bodyParser = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server, { cors: { origin: "*"}})
const messageModel = require('./app/models/messages')
const {dbConnect} = require('./config/mongo')
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());

app.use('/public', express.static(`${__dirname}/strage/img`)) 

app.use('/api', require('./app/routes'));
/* Inicializar servidor */
dbConnect() 

/* Socket io CHAT */
io.on("connection", (socket) => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx

  socket.on("chat", (data) => {
    console.log(data);

    const newMessage = messageModel.create(data).then( res => {
      const mensajes =  messageModel.find({}).then( result => {
        socket.emit('chat', result)
        socket.broadcast.emit('chat', result)
        
      })    
    });
    

  });

});

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

