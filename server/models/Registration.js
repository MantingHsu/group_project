const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema({
  username: { type:String, required:true },
  email:    { type:String, required:true, unique:true },
  passwordHash: { type:String, required:true },
  userType: { type:String, enum:['user','admin'], default:'user' },
  registeredAt: { type:Date, default: Date.now }
})

module.exports = mongoose.model('Registration', registrationSchema)
