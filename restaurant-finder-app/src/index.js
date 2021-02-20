require('./db/mongoose')
const express = require('express')
const ownerRouter = require('./routers/owner')
const restaurantRouter = require('./routers/restaurant')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(ownerRouter)
app.use(restaurantRouter)


app.listen(port,()=>{
    console.log('Server running in '+port)
})