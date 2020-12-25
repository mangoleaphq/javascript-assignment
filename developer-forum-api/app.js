const express = require('express');
const bodyparser = require('body-parser');
// create express app
var app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const dbconn = require('./dbconfig');

//setup the server port
const port = process.env.PORT || 4000;

//parse request data content type application/json or application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Enable the routes
require('./routes.js')(app);

//listen to the port
app.listen(port, ()=>{
    console.log(`Express server is running at port ${port}`);
})