const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const UserSchema = new mongoose.Schema({
    nombre: { 
      type: String, min: 3
    },
    imagen: { 
      type: String, default: 'hahaha' 
    },
    correo: { 
      type: String
    },
    password: { 
      type: String  
    },
    datos: { type: Schema.Types.ObjectId, ref: 'datos-usuario' }
  },{
    timestamps: true,
    versionKey: false
  });

  module.exports = mongoose.model('usuario', UserSchema)