const WebSocket = require('ws');
const app = require('express')();
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
    ws.send('ping');
  }
}, 1000);
app.listen(3002, ()=>{
  console.log('listen on 3002');

});
