const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    nameProduct: {
        type: String
    },
    priceProduct: {
        type: String
    },
    count: {
        type: Number
    }
})

module.exports = mongoose.model("carts", cartSchema)