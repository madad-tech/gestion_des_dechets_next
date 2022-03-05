import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email:String,
  password:String,
  active:Boolean,
  role: {
        type: String,
        enum: ["employe", "admin"]
  },
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)