const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
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
    // restaurant: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Restaurant', 
    //     required: true 
    // },
    tokens:[{
        token:{
            type:String,
            required: true
        }
    }]
},{
    timestamps:true
})

//Exclude Private data in response

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.tokens

    return userObject
}

//JWT token - user Authentication
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'Mangoleap')

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


//user Authorization
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Not a registered User')
    }

    const isMatch = bcrypt.compareSync(password,user.password)

    if(!isMatch){
        throw new Error('Wrong password')
    }

    return user
}

//Update password - Hashing
userSchema.pre('save',function(next){
    const user = this

    if(user.isModified('password')){
        user.password = bcrypt.hashSync(user.password,8)
    }
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User