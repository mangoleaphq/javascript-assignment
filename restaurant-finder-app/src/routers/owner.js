const express = require('express')
const router = new express.Router()
const owner = require('../controllers/owner')
const auth = require('../middleware/auth')

//Owner Signup
router.post('/owners/signup',owner.owner_signup)

//Owner Login
router.post('/owners/login',owner.owner_login)

//Owner logout
router.post('/owners/logout',auth,owner.owner_logout)

//Display Owner Profile - Testing only
router.get('/owners/me',auth, async(req,res)=>{
    res.send(req.user)
})

module.exports = router