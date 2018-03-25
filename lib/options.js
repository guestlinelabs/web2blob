const path = require('path');

const defaults = Object.freeze({
  cache: 3600,
  maxConnections: 5,
  statics: 'static',
  zip: true
});

function parse(options) {
  const requiredParams = ['source', 'destination'];

  requiredParams.forEach(param => {
    if (typeof options[param] == 'undefined')
      throw new Error('Parameter ' + param + ' is required.');
  });

  const absolutePath = path.resolve(process.cwd(), options.source);

  return Object.assign({}, defaults, options, { source: absolutePath });
}

exports.defaults = defaults;
exports.parse = parse;
