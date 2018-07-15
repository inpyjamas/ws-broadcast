/* eslint-env jest */
const fs = require('fs');
const path = require('path');
const contentConfig = fs.readFileSync(path.resolve(__dirname, '../config/default.json'));
const testConfig = JSON.parse(contentConfig);
const {broadcast} = require('../lib/index.js');

test('should be a function', ()=>{
  expect(typeof broadcast).toBe('function');
});
// test('should be a function', ()=>{
//   expect(typeof broadcast).toBe('function');
// });

test('should be a websocket server', done =>{
  const wss = broadcast({port:3336});
  expect(wss.constructor.name).toBe('WebSocketServer');
  wss.close(()=>{
    done();
  });
});

test('should have specific config', done =>{
  const wss = broadcast({port:7777});
  expect(wss.options.port).toBe(7777);
  wss.close(()=>{
    done();
  });
});
test('should have default config',done =>{
  const wss = broadcast();
  Object.keys(testConfig).forEach(ele => {
    console.log(`config ${ele} ${testConfig[ele]}`);
    console.log(`wss ${ele} ${wss.options[ele]}`);
    expect(wss.options[ele]).toBe(testConfig[ele]);
  });
  wss.close(()=>{
    done();
  });
});

