# web2blob

A small utility to upload your web assets to [Azure Blob Storage](https://azure.microsoft.com/en-us/services/storage/blobs/). The idea is that after you build your website with tools like [Create React App](https://github.com/facebook/create-react-app), you could upload it to a blob, and then put a [CDN](https://azure.microsoft.com/en-us/services/cdn/) in front of it.

## Requirements

This application requires Node 4+ to run.

## What differences does it have with Azure CLI [upload-batch](https://docs.microsoft.com/en-us/cli/azure/storage/blob?view=azure-cli-latest#az-storage-blob-upload-batch)?

* Will infer the [Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) for all your files.
* Will [gzip](https://developer.mozilla.org/en-US/docs/Glossary/GZip_compression) the files for you.
* Will set a [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) for regular assets, and a long cache for static assets.

## Install

As a CLI tool

```console
npm install -g web2blob
```

As a library

```console
npm install --save-dev web2blob
```

## CLI

```console
web2blob --s webfolder -d container [options]
```

Run `web2blob --help` to get a quick overview of all commands.

## API Usage

```js
const web2blob = require('web2blob');

const options = {
  source: './build', // Path of the folder where to upload the assets.
  destination: 'myweb', // Name of the blob container where to upload.

  // Default options (no need to pass them)
  cache: 3600, // Time in ms to cache regular files.
  maxConnections: 5, // Max simultaneous connections to the blob.
  statics: 'static', // Folder where to cache files for 1 year.
  zip: true // Whether to gzip the files or not.
};

web2blob(options)
  .then(() => {
    // Files uploaded succesfully to the blob.
  })
  .catch(error => {
    // Something happened.
  });
```
