var mongoose = require('mongoose')
var config = require('./config/config.json')
var mongoDB = process.env.DB_URI || config[process.env.NODE_ENV].dbUri
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
