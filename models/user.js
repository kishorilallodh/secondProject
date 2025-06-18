const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/myShop')

const Schema = mongoose.Schema
const signupSchema = new Schema({
    name: String,
    email: String,
    password: String,
    token:String,
})
const signupModel = mongoose.model('signup', signupSchema)
module.exports = signupModel