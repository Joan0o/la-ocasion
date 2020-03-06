const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      brand: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },      
      added: {
        type: Date,
        required: true,
        default: Date.now
      }
})

module.exports = mongoose.model('Item', itemSchema)