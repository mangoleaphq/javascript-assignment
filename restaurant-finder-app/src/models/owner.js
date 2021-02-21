const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const ownerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Provide valid mail id')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7
    },
    tokens:[{
        token:{
            type:String,
            required: true
        }
    }]
},{
    timestamps:true
})


//User-Restaurant relationship
ownerSchema.virtual('restaurants',{
    ref:'Restaurant',
    localField:'_id',
    foreignField:'owner'
})


//Exclude Private data in response

ownerSchema.methods.toJSON = function(){
    const owner = this
    const ownerObject = owner.toObject()

    delete ownerObject.tokens

    return ownerObject
}

//JWT token - owner Authentication
ownerSchema.methods.generateAuthToken = async function(){
    const owner = this
    const token = jwt.sign({_id:owner._id.toString()},'Mangoleap')

    owner.tokens = owner.tokens.concat({token})
    await owner.save()
    return token
}


//owner Authorization
ownerSchema.statics.findByCredentials = async (email,password)=>{
    const owner = await Owner.findOne({email})
    if(!owner){
        throw new Error('Not a registered Owner')
    }

    const isMatch = bcrypt.compareSync(password,owner.password)

    if(!isMatch){
        throw new Error('Wrong password')
    }

    return owner
}

//Update password - Hashing
ownerSchema.pre('save',function(next){
    const owner = this

    if(owner.isModified('password')){
        owner.password = bcrypt.hashSync(owner.password,8)
    }
    next()
})

const Owner = mongoose.model('Owner',ownerSchema)

module.exports = Owner