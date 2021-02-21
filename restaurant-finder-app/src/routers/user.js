const express = require('express')
const router = new express.Router()
const user = require('../controllers/user')
const auth = require('../middleware/userAuth')

//User Signup
router.post('/users/signup',user.user_signup)

//User Login
router.post('/users/login',user.user_login)

//User logout
router.post('/users/logout',auth,user.user_logout)

//Display User Profile - Testing only
router.get('/users/me',auth, async(req,res)=>{
    res.send(req.user)
})

router.get('/users/view_restaurants',user.view_restaurants)

module.exports = router