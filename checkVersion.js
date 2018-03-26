var programName = require('./package.json').name;

var MIN_VERSION = 4;
var currentNodeVersion = process.versions.node;
var major = currentNodeVersion.split('.')[0];

if (major < MIN_VERSION) {
  console.error(
    'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      programName +
      ' requires Node ' +
      MIN_VERSION +
      ' or higher. \n' +
      'Please update your version of Node.'
  );
  process.exit(1);
}
