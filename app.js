const mysql = require('mysql2');
require('dotenv').config();

//Create connection for the sql databse
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'employees_DB'
});

//Connect to sql database and start app
connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  connection.end()
  //Call to Start main function goes here
});