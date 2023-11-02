const mySql = require("mysql");
var ip = require('ip');

const port = 4000
//CREATING CONNECTION
const dbConn = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'greenharvest',
    port: 3306,
    multipleStatements:true
});

// dbConn.connect(function(err){
//     if(err) console.log(err,"Error in database connection.");
//     else console.log("Database connection is successfull.");
// });

dbConn.connect(function(err){
    if(err) console.error(err,"\nError in database connection.");
    else {
        console.log(`System started on local\n host: http://localhost:${port}/ \n server: http://${ip.address()}:${port}/`);
        console.log("Database connection is successfull.");
    }
});

module.exports = {dbConn};
