var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
const http = require('./http-helpers');
const fs = require('fs');

let headers = http.headers;

exports.handleRequest = function (req, res) {
  if (req.method === 'GET' && req.url === '/') {
    http.serveAssets(res, './web/public/index.html');
  } else if (req.method === 'GET' && fs.existsSync(archive.paths.archivedSites + req.url)) {
    res.end(fs.readFileSync(archive.paths.archivedSites + req.url));
  } else if (req.method === 'POST') {
    req.on('data', chunk => {
      fs.appendFileSync(archive.paths.list, chunk.toString().match(/url=(.*)/)[1] + '\n');
      res.writeHead(302, headers);
      res.end();
    });
  } else {
    headers['Content-Type'] = 'text/html';
    res.writeHead(404, headers);
    res.end();
  }

  // res.end();
};
