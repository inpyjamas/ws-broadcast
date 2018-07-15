const {broadcast} = require('../../../lib/index');


const wss = broadcast(
  // {
  // // host: '0.0.0.0',
  // port: 7778,
  // exclusiveBroadcast: false}
);

wss.on('connection', ()=>{
  console.log('someone connected');
});

