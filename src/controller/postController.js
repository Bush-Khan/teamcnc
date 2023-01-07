const postModel = require('../models/postModel')
const userModel = require('../models/userModel')
const upload = require('../aws/aws')

const createPost = async function(req,res){
    try{
        let data = req.body
        let files = req.files
        if(!data) return res.status(400).send({status:false, message:"Enter required details"})

        let {userId, image} = data
        console.log(data)
        if(!userId) return res.status(400).send({status:false, message:"User id is required"})
        if(!userId) return res.status(400).send({status:false, message:"Invalid user id"})
        let checkUserId = await userModel.findOne({_id:userId})
        console.log(checkUserId)
        if(!checkUserId) return res.status(400).send({status:false, message:"User doesn't exists"})


        let uploadedFileURL 
        if (files && files.length > 0) {
            uploadedFileURL = await upload.uploadFile(files[0])
             image = uploadedFileURL;
             if (!image) return res.status(400).send({ status: false, message: "Please provide profileImage in correct format like jpeg, png, jpg, gif, bmp etc" })
        }
        data.image = uploadedFileURL
        
        let savedPost = await postModel.create(data)
        console.log(savedPost)
        return res.status(201).send({status:true, data:savedPost})
    }
    catch(error){
        console.log(error)
        res.status(500).send({status:false,message:error.message})
    }
}

const likePost = async function(req,res){
    try{
        let userId = req.params.userId
        let postId = req.body.postId

        if (!userId) return res.status(400).send({ status: false, message: "User id is required" })
        let user = await userModel.findOne({_id: userId})
        if (!user) return res.status(404).send({ status: false, message: "User doesn't exists" })
        let userName = user.fullName

        if (!postId) return res.status(400).send({ status: false, message: "Post id is required" })
        let post = await postModel.findOne({_id: postId})
        
        let postUserDetail = await userModel.findOne({_id:userId})
        let postUserName = postUserDetail.fullName 
        
        if (!post) return res.status(404).send({ status: false, message: "Post doesn't exists" })

        let obj = {}
        obj.userName = userName
        obj.userId = userId
        let like = post.like
        like.push(obj)
        let likesCount = post.likesCount + 1
        let updatedLike = await postModel.findOneAndUpdate({ _id: postId }, { likesCount: likesCount, like:like }, { new: true })

        return res.status(200).send({ status: true, message: `You have now liked ${postUserName} post`, data: updatedLike })

    }
    catch(error){
        console.log(error)
        return res.status(500).send({status:false, message: error.message})
    }
}

module.exports.createPost = createPost
module.exports.likePost = likePost