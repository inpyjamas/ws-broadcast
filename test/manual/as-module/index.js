const {wsBroadcast} = require('../../lib/index');
const path = require('path');

const wss = wsBroadcast({
  host: '0.0.0.0',
  port: 3334,
  path: '/',
  exclusiveBroadcast: false
});
