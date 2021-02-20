const jwt = require('jsonwebtoken')
const Owner = require('../models/owner')


const auth = async(req,res,next)=>{

    try{
        //Get Token from request header
        const token = req.header('Authorization').replace('Bearer ','')

        //Decode the token with secret
        const decoded = jwt.verify(token,'Mangoleap')

        //Get corresponding owner
        const owner = await Owner.findOne({_id:decoded._id,'tokens.token':token})

        if(!owner){
            throw new Error()
        }

        req.owner = owner
        req.token = token
        next()

    }catch(e){
        res.status(500).send({error:'Please authenticate'})
    }
    
}

module.exports = auth