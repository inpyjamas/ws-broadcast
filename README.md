Websocket Broadcast (aka ws-broadcast)
================================

This module provides a zero config websocket server.
It can be used as an CLI or as a node module.

This module is based on internal code used throughout several prototypes we build here at [IXDS](https://www.ixds.com/).

## Installation

install it like this:

```shell
npm install @ixds/ws-broadcast
```

Or as global cli (not recommended):

```shell
npm install -g @ixds/ws-broadcast
```


## Usage CLI

You can run this as a CLI in package.json or as a global tool

In the shell:

```shell
ws-broadcast --help

  Usage: ws-broadcast [options]

  Options:

    -V, --version          output the version number
    -c, --config <config>  path to the config.json file
    -h, --help             output usage information
```

If no config file is provided it will use the default configuration.

```json
{
    "host": "0.0.0.0",
    "port": 3334,
    // "backlog":  {Number} The maximum length of the queue of pending connections.,
    "path": "/",
    // "noServer": false,
    // "clientTracking": true,
    // "perMessageDeflate": false
    // "maxPayload": {Number} The maximum allowed message size in bytes.
    "exclusiveBroadcast": false
}

```
For even more configuration see the api docs of [websockets/ws: Simple to use, blazing fast and thoroughly tested WebSocket client and server for Node.js](https://github.com/websockets/ws/blob/master/doc/ws.md).


In `package.json` you can provide a script like this.

```json
{
  "scripts": {
    "server": "./node_modules/.bin/ws-broadcast -c \"./path/to/your/config.json\""
  }
}
```

Or even shorter:

```json
{
  "scripts": {
    "server": "ws-broadcast -c \"./path/to/your/config.json\""
  }
}
```

## Usage as Module

```js
const {wsBroadcast} = require('ws-broadcast');
const path = require('path');
const wss = wsBroadcast({
  host: '0.0.0.0',
  port: 3334,
  path: '/',
  exclusiveBroadcast: false
    // backlog: false,
  // noServer: false,
  // clientTracking: true,
  // perMessageDeflate: false,
});

// now do aditional things with ws
```



