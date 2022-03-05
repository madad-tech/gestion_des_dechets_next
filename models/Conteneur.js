const mongoose = require('mongoose')

const ConteneurSchema = new mongoose.Schema({
    type: {
       type: String,
        required: true
    },
    nombre: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    montant: {
        type: Number,
        required: true
    },
    caution: {
        type: String,
        required: true
    },
    poids: {
        type: Number,
        required: true
    },
    commentaire: {
        type: String,
        required: true
     }
   
})


module.exports = mongoose.models.Conteneur || mongoose.model('Conteneur', ConteneurSchema)