const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userId: String,
    company: String,
    colour:String
},
 {
    timestamps:true,
 }
)

module.exports = mongoose.model('products', ProductSchema);