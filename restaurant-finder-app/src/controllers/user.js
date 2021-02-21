const { ReplSet } = require('mongodb')
const Restaurant = require('../models/restaurant')
const User = require('../models/user')

//User Signup
exports.user_signup = async(req,res)=>{
    const user = new User(req.body)
    const token = await user.generateAuthToken()
    try{
        await user.save()
        res.status(201).send({user,token})
    }catch(e){
        res.status(500).send(e)
    }
}

//User Login
exports.user_login = async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(500).send(e)
    }
}

//User Logout
exports.user_logout = async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send('Success')
    }catch(e){
        res.status(500).send(e)
    }

}

//User - View Restaurants
exports.view_restaurants = async (req,res)=>{
    const restaurants = await Restaurant.find({}).populate().exec()

    //Search by Location
    if(req.query.location){
        const result = restaurants.filter((restaurant)=>restaurant.location === req.query.location)
        if(!result){
            throw new Error()
        }
        return res.send(result)
    }

    //Search by Cuisine
    if(req.query.cuisine){
        const result = restaurants.filter((restaurant)=>restaurant.cuisine === req.query.cuisine)
        if(!result){
            throw new Error()
        }
        return res.send(result)
    }

    //Search by Dish
    if(req.query.dish){
        const result = restaurants.filter((restaurant)=>{
            restaurant.dish.filter((dish) => {
                return restaurant.dish.name === req.query.dish
            })
        })
        if(!result){
            throw new Error()
        }
        return res.send(result)
    }
    try{
        res.send(restaurants)
    }catch(e){
        res.status(500).send(e)
    }
}