const {broadcast} = require('../../../lib/index');

broadcast({
  // host: '0.0.0.0',
  port: 7777,
  exclusiveBroadcast: false});
