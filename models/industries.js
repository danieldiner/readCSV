var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var industrySchema = new mongoose.Schema({
  name: String,
  children: [{ type: Schema.Types.ObjectId, ref: 'Industry' }]
})
module.exports = mongoose.model('Industry', industrySchema)