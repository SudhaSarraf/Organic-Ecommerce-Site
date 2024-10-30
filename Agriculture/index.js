const port = 4000

//MAKING USE OF EXPRESS
const express = require ("express"); 
const app = express();

//MAKING USE OF BODY_PARSER
const bodyParser = require("body-parser"); 
const { json, urlencoded } = bodyParser;
app.use(urlencoded({extended: false})); //parse request data content type application/x-www-form-urlencoded
app.use(json()); //parse request data content type application/json

//MAKING USE OF CORS
const cors = require ("cors");
app.use(cors({
    origin:"*",
    methods:['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));


app.listen(port,()=>{
    console.log('Getting Server ready.');
 });

//INITILAZING THE ROUTE
app.get('/', (_req, res) =>{
    res.send("(Sudha )-API connected successfully.");
});

const signup = require('./src/routes/signup.route');
app.use('/signup',signup);

const login = require('./src/routes/login.route');
app.use('/login', login);

const product = require('./src/routes/products.route');
app.use('/product', product);

const order = require('./src/routes/order.route');
app.use('/order', order);

const vlog = require('./src/routes/vlog.routes');
app.use('/vlog', vlog);


app.use(express.static('src'));
app.use('/images',express.static('files'));


const fileUpload =require('./src/routes/file.upload.route');
app.use('/upload',fileUpload);

