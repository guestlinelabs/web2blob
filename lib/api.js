'use strict';

const parse = require('./options').parse;
const upload = require('./upload');

process.on('unhandledRejection', err => {
  throw err;
});

function web2blob(options) {
  const parsedOptions = parse(options);

  return upload(parsedOptions);
}

module.exports = web2blob;
