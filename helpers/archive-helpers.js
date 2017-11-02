var fs = require('fs');
var path = require('path');
var _ = require('underscore');
const https = require('https');
const Promise = require('bluebird');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  return callback(fs.readFileSync(this.paths.list).toString().split('\n'));
};

exports.isUrlInList = function(url, callback) {
  callback(this.readListOfUrls(urls => urls.some(e => e === url)));
};

exports.addUrlToList = function(url, callback) {
  fs.appendFileSync(this.paths.list, url + '\n');
  callback.call(this);
};

exports.isUrlArchived = function(url, callback) {
  return callback(fs.existsSync(this.paths.archivedSites + '/' + url));
};

exports.downloadUrls = function(urls) {
  urls.forEach(url => this.downloadPage(url));
};

exports.downloadPage = function(url) {
  let file = fs.createWriteStream(this.paths.archivedSites + '/' + url);
  https.get('https://' + url, response => {
    response.pipe(file);

    file.on('finish', () => file.close());
  });
};

Promise.promisifyAll(fs);

exports.readListOfUrlsAsync = function() {
  return fs.readFileAsync(this.path.list)
    .then(buffer => buffer.toString().split('\n'));
};

exports.isUrlInListAsync = function(url) {
  return this.readListOfUrlsAsync()
    .then(urls => urls.some(e => e === url));
};

exports.addUrlToListAsync = function(url) {
  return fs.appendFileAsync(this.paths.list, url + '\n');
};

exports.isUrlArchivedAsync = function(url) {
  return fs.statAsync(this.paths.archivedSites + '/' + url)
    .then(stat => stat.isFile());
};