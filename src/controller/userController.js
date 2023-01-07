const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { bodyVal, nameCheck, emailCheck, keyValid, passwordCheck, mobileNum } = require('../validation/validate')

const signUp = async function(req,res){
    try{
        let data = req.body
        if(!bodyVal(data)) return res.status(400).send({status:false, message:"Body is required"})

        let {fullName, email, password, contact, profileImage} = data
        if(!keyValid(fullName)) return res.status(400).send({status:false, message:"Full name is required"})
        if(!nameCheck(fullName)) return res.status(400).send({status:false, message:"Use alphabets only to write full name"})

        if(!keyValid(email)) return res.status(400).send({status:false, message:"Email id is required"})
        if(!emailCheck(email)) return res.status(400).send({status:false, message:"Wrong format of email id"})
        let duplicateEmail = await userModel.findOne({email})
        if(duplicateEmail) return res.status(400).send({status:false, message:"Email is already in use"})

        if(!keyValid(password)) return res.status(400).send({status:false, message:"Password is required"})
        if(!passwordCheck(password)) return res.status(400).send({status:false, message:"Use strong password"})
        const salt = await bcrypt.genSalt(10)
        data.password = await bcrypt.hash(data.password, salt)

        if(!keyValid(contact)) return res.status(400).send({status:false, message:"Contact number is required"})
        if(!mobileNum(contact)) return res.status(400).send({status:false, message:"Wrong format of mobile number"})
        let duplicateNumber = await userModel.findOne({contact})
        if(duplicateNumber) return res.status(400).send({status:false, message:"Contact number already in use"})

        if(profileImage){

        }

        let savedUser = await userModel.create(data)
        return res.status(201).send({status:true, data: savedUser})
    }
    catch(error){
        console.log(error)
        res.status(500).send({status:false,message:error.message})
    }
}

const login = async function(req,res){
    try{
        let data = req.body
        if(!bodyVal(data)) return res.status(400).send({status:false, message:"Body is required"})

        let {email, password} = data
        if(!keyValid(email)) return res.status(400).send({status:false, message:"Email is required"})
        if(!keyValid(password)) return res.status(400).send({status:false, message:"Password is required"})

        let checkEmail = await userModel.findOne({email:email})
        if(!checkEmail) return res.status(400).send({status:false, message:"Email id is wrong"})

        let passwordCheck = await bcrypt.compare(data.password, checkEmail.password)
        if(!passwordCheck) return res.status(400).send({status:false, message:"Wrong password"})

        let token = jwt.sign({userId:checkEmail._id},"teamcnc",{expiresIn:'72h'})
        res.setHeader('x-api-key',token)

        return res.status(200).send({status:true, token:token, userId:checkEmail._id, message:"Login successfully"})
    }
    catch(error){
        console.log(error)
        res.status(500).send({status:false,message:error.message})
    }
}

module.exports.signUp = signUp
module.exports.login = login