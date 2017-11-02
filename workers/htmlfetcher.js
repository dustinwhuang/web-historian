// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
const http = require('http');
const fs = require('fs');
const archive = require('../helpers/archive-helpers');

exports.downloadPage = function(url) {
  let file = fs.createWriteStream(archive.paths.archivedSites + '/' + url);
  http.get('http://' + url, response => {
    response.pipe(file);

    file.on('finish', () => file.close());
  });
};