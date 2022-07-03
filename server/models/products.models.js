const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type: String
    },
    price:{
        type: String
    },
    
})


module.exports = mongoose.Schema("products", productSchema)