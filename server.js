const express = require('express');
const app = express();
const server = require('http').createServer();
const options = {
    cors:true,
    origins:["http://localhost:3000"],
   };
const io = require('socket.io')(server, options);
io.on('connection', client => { 
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit('timer', new Date());
        }, interval);
      });
});
server.listen(8000);
console.log('listening on port 8000')
