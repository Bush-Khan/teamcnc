const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const postSchema = new mongoose.Schema({
    userId:{type:ObjectId, ref:'User', required:true},
    image:{type:String, required:true},
    like:{type:Array, default:[]},
    comment:{type:String}
},{timestamps:true})

module.exports = mongoose.model('Post',postSchema)