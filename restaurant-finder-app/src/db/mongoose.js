const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/restaurant-management',{
    useCreateIndex : true,
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology:true
},(error,result)=>{
    if(error){
        return console.log(error)
    }
    console.log('Connected correctly')
})