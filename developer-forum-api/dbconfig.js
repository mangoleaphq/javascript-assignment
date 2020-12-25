const { Client } = require('pg');

const client = new Client({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    database : process.env.DB_NAME,
    password : process.env.DB_PASS,
    port : process.env.DB_PORT
});

client.connect((err) => {
    if(err) {
        console.log('DB connection failed');    
    }
    else {
        console.log('Db connection successful');
    }
});


module.exports = client;