#!/usr/bin/env node

const {wsBroadcast} = require('./server/websocket.js');

module.exports = {
  broadcast: wsBroadcast
};
