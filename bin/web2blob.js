#!/usr/bin/env node

/* eslint-disable no-console */

'use strict';

const program = require('commander');
const version = require('../package.json').version;
const upload = require('../lib/upload');
const options = require('../lib/options');

process.on('unhandledRejection', err => {
  throw err;
});

function exit(msg) {
  console.error(msg);
  process.exit(1);
}

program
  .version(version)
  .usage('[options] --source --destination')
  .option('-s, --source <source>', 'The directory where the files to be uploaded are located.')
  .option('-d, --destination <destination>', 'The blob container where the files will be uploaded.')
  .option('-Z, --no-zip', 'Disable gzip compression on the files.')
  .option(
    '-c, --cache <ms>',
    'Set Cache-Control time in milliseconds (' + options.defaults.cache + ' by default).',
    options.defaults.cache
  )
  .option(
    '-s, --statics <folder>',
    'Specify the folder where your static assets will be (static by default) so a cache of 1 year will be applied',
    options.defaults.statics
  )
  .option(
    '-m, --max-connections <number> (defaults to ' + options.defaults.maxConnections + ')',
    'Number of concurrent connections to the blob',
    parseInt,
    options.defaults.maxConnections
  )
  .parse(process.argv);

const parsedOptions = options.parse(program);

console.log('Uploading files from ' + options.source);

upload(parsedOptions)
  .then(() => {
    console.log('All files uploaded succesfully.');
  })
  .catch(err => {
    exit('Error uploading to blob: ' + err);
  });
