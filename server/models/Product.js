const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    sizes: [String],
    colors: [String],
    rating: {type: Number, default:5},
    buyers: {type: Number, default: 0},
    likes: {type: Number, default: 0}
});
module.exports = mongoose.model('Product', ProductSchema);