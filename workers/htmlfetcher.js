// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
const archive = require('../helpers/archive-helpers');

archive.readListOfUrlsAsync()
  .then(urls => urls.slice(0, -1).forEach(url => {
    archive.isUrlArchivedAsync(url)
      .then(exists => {
        if (!exists) {
          archive.downloadUrl(url);
        }
      });
  }));