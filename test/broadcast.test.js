/* eslint-env jest */

const {broadcast} = require('../lib/index.js');

test('should be a function', ()=>{
  expect(typeof broadcast).toBe('function');
});
