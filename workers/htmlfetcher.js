// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
const archive = require('../helpers/archive-helpers');

archive.readListOfUrls(function(arrayOfUrls) {
  let unarchivedUrls = arrayOfUrls.filter(function(url) {
    return !archive.isUrlArchived(url, (exists) => exists);
  });

  archive.downloadUrls(unarchivedUrls);
});