
const debug = require('debug');
debug.log = console.info.bind(console);
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
  broadcast: function wsBroadcast(userConfig) {
    log('trying to attach websocket');
    let config = merge(defaultConfig, userConfig === undefined ? {} : userConfig);
    const wss = new WebSocketServer(config);
    wss.on('error',(err)=>{
      log(err);
      if (err.errno === 'EADDRINUSE'){
        console.log(`The port ${config.port} is already in use. Use another one or kill the other process running on it.`);
        console.log(`Try \`lsof -i :${config.port}\` to find the PID (Process ID)`);
        console.log('and kill it with `kill -9 [PID]` (replace [PID] with the ID you found)');
      }
    });

    log(`websocket server broadcasting for you on port ${config.port}`);
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
