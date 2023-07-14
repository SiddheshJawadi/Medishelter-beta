const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/our')
const passportLocalMongoose = require('passport-local-mongoose')
const User = new mongoose.Schema({
  name: String,
  role: String,
  email: String,
  password: String,
  contact: String,
  dob: Date,
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)
