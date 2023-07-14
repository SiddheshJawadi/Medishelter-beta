const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/our')
const passportLocalMongoose = require('passport-local-mongoose')
const Prescription = new mongoose.Schema({
  patientName: String,
  email: String,
  medicines: [
    {
      medicineName: String,
      quantity: Number,
      usage: String,
    },
  ],
  remarks: String,
})

Prescription.plugin(passportLocalMongoose)

module.exports = mongoose.model('Prescription', Prescription)
