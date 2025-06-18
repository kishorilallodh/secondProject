const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/flipkart')

const productSchema = mongoose.Schema({
    pname: String,
    pprice: Number,
    pcategory: String,
    pbname: String,
    pdesc: String,
    pimage: [String]
})

module.exports = mongoose.model('Product', productSchema)
