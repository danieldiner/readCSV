var mongoose = require('mongoose')
var storeSchema = new mongoose.Schema({
  name: String,
  description: String,
  token: String
})
module.exports = mongoose.model('Store', storeSchema)