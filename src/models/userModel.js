const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{type:String, required:true, trim:true},
    email:{type:String, unique:true, required:true, trim:true},
    password:{type:String, required:true},
    contact:{type:String, required:true, unique:true,trim:true},
    profileImage:{type:String}
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)