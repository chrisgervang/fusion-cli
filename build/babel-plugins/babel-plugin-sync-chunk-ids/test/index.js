// @flow
/* eslint-env node */
const fs = require('fs');
const test = require('tape');
const {transformFileSync} = require('@babel/core');
const plugin = require('../');

test('import syncChunkIds', t => {
  const output = transformFileSync(
    __dirname + '/fixtures/input-import-destructuring',
    {
      plugins: [plugin],
    }
  );
  const expected = fs
    .readFileSync(
      __dirname + '/fixtures/expected-import-destructuring',
      'utf-8'
    )
    .trim();
  t.equal(output.code, expected, 'replaced correctly');
  t.end();
});

test('import syncChunkIds as', t => {
  const output = transformFileSync(
    __dirname + '/fixtures/input-import-destructuring-as',
    {
      plugins: [plugin],
    }
  );
  const expected = fs
    .readFileSync(
      __dirname + '/fixtures/expected-import-destructuring-as',
      'utf-8'
    )
    .trim();
  t.equal(output.code, expected, 'replaced correctly');
  t.end();
});

test('invalid arguments', t => {
  function output() {
    return transformFileSync(__dirname + '/fixtures/input-wrong-arg', {
      plugins: [plugin],
    });
  }
  t.throws(output, /syncChunkIds takes no arguments/);
  t.end();
});
