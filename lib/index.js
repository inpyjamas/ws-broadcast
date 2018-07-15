
const debug = require('debug');
debug.log = console.info.bind(console); // eslint-disable-line 
const log = debug('websocket');
const ws = require('ws');
const merge = require('lodash.merge');
const WebSocketServer = ws.Server;
const fs = require('fs');
const path = require('path');
const contentConfig = fs.readFileSync(path.resolve(__dirname, '../config/default.json'));
const defaultConfig = JSON.parse(contentConfig);
// const defaultConfig = require('../config/default.json');
// console.log(defaultConfig);

const broadcast = function broadcast(wss, data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
      // would be nice to have a spy feature
      // console.log(data);
    } else {
      log('client not ready', client._socket.remoteAddress);
    }
  });
};

const exclusiveBroadcast = function (wss, socket, data) {
  wss.clients.forEach(function each(client) {
    if (client !== socket && client.readyState === ws.OPEN) {
      client.send(data);
    } else {
      log('client not ready', client._socket.remoteAddress);
    }
  });
};

module.exports = {
  broadcast: function wsBroadcast (config) {
    log('attach websocket');
    config = config === undefined ? {} : config;
    config = merge(defaultConfig, config);
    log(`websocket server broadcasting for you on port ${config.port}`);
    const wss = new WebSocketServer(config);

    wss.on('connection', function (socket) {
      log('Connection received: IP:', socket._socket.remoteAddress, 'PORT:', socket._socket.remotePort);
      log('Number of connections:', wss.clients.size);
      socket.on('error', function (err) {
        log('Error occurred:', err);
      });

      socket.on('message', function (data, flags) {
        log('Message occurred:', socket._socket.remoteAddress, data, flags);
        if (config.exclusiveBroadcast) {
          exclusiveBroadcast(wss, socket, data);
        } else {
          broadcast(wss, data);
        }
      });
    });
    return wss;

  }
};
