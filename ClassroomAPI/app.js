const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/db')
const { v4: uuidv4 } = require('uuid');

//Connecting to MongoDB
connectDB()

const app = express();


const api = require('./routes/api')
const app_config = require('./config/config')

//Port number
const port = 3000;

//Cors Middleware
app.use(cors());

//Body Parser middleware
app.use(bodyParser.json());

//All API routes
app.use('/api', api);



//Index Route
/*app.get('/', (req,res) => {
    res.send("Home");
})*/

//Set static folder for angular frontend dist
app.use(express.static(path.join(__dirname, 'public')));

//AngularJS Frontend
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

//Server start
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
})