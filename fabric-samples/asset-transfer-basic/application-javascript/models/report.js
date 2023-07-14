const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/our')
const passportLocalMongoose = require('passport-local-mongoose')
const Report = new mongoose.Schema({
  Patientname: {
    type: String,
  },
  email: {
    type: String,
  },
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

Report.plugin(passportLocalMongoose)

module.exports = mongoose.model('Report', Report)
