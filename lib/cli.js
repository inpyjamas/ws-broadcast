#!/usr/bin/env node

const pkg = require('../package.json');
const fs = require('fs');

const readConfig = require('read-config');
const path = require('path');
const program = require('commander');
const {broadcast} = require('./index.js');
let cliConfigPath = '';
let config = null;
program
  .version(pkg.version)
  .option('-c, --config <config>', 'path to your config.json file', (val)=>{
    console.log(val);
    cliConfigPath = val;
  });
// program.on('--help'()=>{})
program.parse(process.argv);

let configPaths = [
  path.join(__dirname, '../config/default.json')
];

if(program.config === true) {
  try{
    fs.accessSync(cliConfigPath);
    configPaths.push(cliConfigPath);
  } catch(err) {
    console.log(`Your config file "${cliConfigPath}" does not exist\nfalling back to default values`);
    console.log(readConfig(configPaths[0]));
  }
}

for (let filename of configPaths) {
  try {
    config = readConfig(filename, {
      override: true
    });
  } catch (e) {
    console.error(e.message);
  }
}

console.log('starting websocket broadcast');
const wss = broadcast(config);


