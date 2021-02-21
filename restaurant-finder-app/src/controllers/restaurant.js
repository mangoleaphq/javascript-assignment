const Restaurant = require('../models/restaurant')

//Add restaurant by current Owner
exports.restaurant_add = async (req,res)=>{
    const restaurant = new Restaurant({
        ...req.body,
        owner: req.owner._id
    })
    try{
        await restaurant.save()
        res.send(restaurant)
    }catch(e){
        res.status(500).send(e)
    }
}

//View restaurants by current Owner
exports.restaurant_view = async (req,res)=>{
    
    try{
        const restaurants = await Restaurant.find({owner:req.owner._id})
        res.send(restaurants)
    }catch(e){
        res.status(500).send(e)
    }
}

//Restaurant Delete by current owner
exports.restaurant_delete = async(req,res)=>{
    try{
        const restaurant = await Restaurant.findOneAndDelete({_id:req.params.id,owner:req.owner._id})
        if(!restaurant){
            return res.status(400).send()
        }
        res.send(restaurant)
    }catch(e){
        res.status(500).send(e)
    }
}