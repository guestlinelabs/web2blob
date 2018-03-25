'use strict';

const path = require('path');
const fs = require('fs');
const mime = require('mime-types');
const Promise = require('bluebird');
const gzip = Promise.promisify(require('zlib').gzip);
const readFile = Promise.promisify(fs.readFile);
const recursive = Promise.promisify(require('recursive-readdir'));
const getUploader = require('./blob');

const ONE_YEAR = 31536000;

const getContent = (filePath, zip) =>
  readFile(filePath).then(content => (zip ? gzip(content) : content));

const getSettings = (filePath, cache, staticFolder, zip) => {
  const isStatic =
    filePath
      .split(path.sep)
      .slice(0, -1)
      .indexOf(staticFolder) !== -1;

  const settings = {
    contentSettings: {
      contentType: mime.contentType(path.extname(filePath)),
      cacheControl: 'public, max-age=' + (isStatic ? ONE_YEAR : cache)
    }
  };

  if (zip) settings.contentSettings.contentEncoding = 'gzip';

  return settings;
};

const getBlobName = (filePath, baseFolder) =>
  filePath
    .split(path.sep)
    .slice(baseFolder.split(path.sep).length)
    .join(path.sep);

function upload(options) {
  return Promise.join(
    getUploader(options.destination),
    recursive(options.source),
    (blobUpload, files) => {
      return Promise.map(
        files,
        file => {
          const blobName = getBlobName(file, options.source);
          const settings = getSettings(file, options.cache, options.statics, options.zip);

          return getContent(file, options.zip).then(content =>
            blobUpload(content, blobName, settings)
          );
        },
        {
          concurrency: options.maxConnections
        }
      );
    }
  );
}

module.exports = upload;
