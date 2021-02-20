const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    location:{
        type:String,
        trim:true,
        required:true
    },
    cuisine:{
        type:String,
        trim:true,
        required:true
    },
    dish:[{
        name:{
            type:String,
        trim:true,
        required:true
        },
        price:{
            type:Number,
            required:true,
            validate(value){
                if(value<0){
                    throw new Error('Quantity must be positive')
                }
            }
        }
    }],
    //relationship with owner
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Owner'
    }
},{
    timestamps:true
})

const Restaurant = mongoose.model('Restaurant',restaurantSchema)

module.exports = Restaurant