const mongoose = require('mongoose')
mongoose.Promise = global.Promise
//mongoose.connect('mongodb://admin:7qjeUWyWTixjRKbC@smartparking-shard-00-00-8yijp.mongodb.net:27017,smartparking-shard-00-01-8yijp.mongodb.net:27017,smartparking-shard-00-02-8yijp.mongodb.net:27017/test?ssl=true&replicaSet=SmartParking-shard-0&authSource=admin&retryWrites=true')
mongoose.connect('mongodb://localhost/myap')
module.exports = mongoose

