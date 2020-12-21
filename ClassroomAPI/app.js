const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const socketio = require('socket.io');


//Connecting to MongoDB
connectDB()

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
    }
  });


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

//Test Websocket route
app.post('/socket_notification', (req,res)=>{
    io.emit('notification', { msg: "text info" });
    res.end(JSON.stringify({success:true, msg: "msg sent"}));
});

//Index Route
/*app.get('/', (req,res) => {
    res.send("Home");
})*/

//Set static folder for angular frontend dist
app.use(express.static(path.join(__dirname, 'public')));

//TestHtml
app.get('/testpage', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/test.html'));
})

//AngularJS Frontend
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Socket Programming
io.on('connection', socket => {
    //socket.broadcast.emit('hi');
    console.log('A user connected');
    socket.on('disconnect', () =>{
        console.log('A user disconnected');
    });
});

//Server start
server.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});