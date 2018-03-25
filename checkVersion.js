const MIN_VERSION = 4;
const currentNodeVersion = process.versions.node;
const major = currentNodeVersion.split('.')[0];

if (major < MIN_VERSION) {
  console.error(
    'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      'This program requires Node ' +
      MIN_VERSION +
      ' or higher. \n' +
      'Please update your version of Node.'
  );
  process.exit(1);
}
