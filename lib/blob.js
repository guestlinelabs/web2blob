'use strict';

const Promise = require('bluebird');
const azure = require('azure-storage');

function uploader(blobService, container) {
  return function(content, blobName, options) {
    return new Promise((resolve, reject) => {
      blobService.createBlockBlobFromText(
        container,
        blobName,
        content,
        options,
        (error, result, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  };
}

function getUploader(container) {
  const blobService = azure.createBlobService();

  return new Promise((resolve, reject) => {
    blobService.createContainerIfNotExists(
      container,
      {
        publicAccessLevel: 'blob'
      },
      error => {
        if (error) {
          reject(error);
        } else {
          resolve(uploader(blobService, container));
        }
      }
    );
  });
}

module.exports = getUploader;
