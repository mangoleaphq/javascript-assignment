const Owner = require('../models/owner')

//Owner Signup
exports.owner_signup = async(req,res)=>{
    const owner = new Owner(req.body)
    const token = await owner.generateAuthToken()
    try{
        await owner.save()
        res.status(201).send({owner,token})
    }catch(e){
        res.status(500).send(e)
    }
}

//Owner Login
exports.owner_login = async(req,res)=>{
    try{
        const owner = await Owner.findByCredentials(req.body.email,req.body.password)
        const token = await owner.generateAuthToken()
        res.status(201).send({owner,token})
    }catch(e){
        res.status(500).send(e)
    }
}

//Owner Logout
exports.owner_logout = async (req,res)=>{
    try{
        req.owner.tokens = req.owner.tokens.filter((token)=>token.token!=req.token)
        await req.owner.save()
        res.send('Success')
    }catch(e){
        res.status(500).send(e)
    }

}