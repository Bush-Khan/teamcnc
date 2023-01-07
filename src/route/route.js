const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const postController = require('../controller/postController')

router.post('/signup',userController.signUp)
router.post('/login',userController.login)


router.post('/createPost',postController.createPost)
router.post('/likePost/:userId',postController.likePost)
module.exports = router
