const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host:process.env.HOST,
    database:process.env.DATABASE,
    user:process.env.USERNAME,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT
});

connection.connect(function(err){
    if(err){
        console.error("Error while db connection",err.message);
        return;
    }

    console.log("DB Connected successfully as id " +connection.threadId);
});
