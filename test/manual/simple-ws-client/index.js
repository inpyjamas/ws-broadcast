const WebSocket = require('ws');
const http = require('http');
const ws = new WebSocket('ws://localhost:3334');
let isconnected = false;
ws.on('open', function open() {
  ws.send('opened connection');
  isconnected = true;
});

ws.on('message', function incoming(data) {
  console.log(data);
});

const interval = setInterval(()=>{
  if(isconnected) {
    ws.send('ping',{mask:false}, ()=>{
      // console.log('cb')
    });
  }
}, 1000);
  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World');
    res.end();
  }).listen(3002);
    console.log('listen on 3002');