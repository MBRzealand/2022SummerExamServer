require('dotenv').config({path:"./.env"})
const cors = require("cors");
const express = require('express');
const app = express();

// const https = require('https');
// const fs = require('fs');

// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// };

// const server = https.createServer(options)

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



// const mongoose = require("mongoose");
// const Router = require("./routes/routes");

app.use(express.json());
app.use(cors());
// app.use(Router);

// mongoose.connect(
//     process.env.DB_URL,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// );

let connectedClients = [];

io.on('connection', (socket) => {

    console.log('a user connected');

    socket.on('message', msg => {
        console.log(msg)
        socket.broadcast.emit('receive', msg)
    });

});

server.listen(8080);

console.log('listening on port 8080');
