/* */ 
'use strict';
var url = require('url');
var parse = url.parse;
var Url = url.Url;
module.exports = parseurl;
module.exports.original = originalurl;
function parseurl(req) {
  var url = req.url;
  if (url === undefined) {
    return undefined;
  }
  var parsed = req._parsedUrl;
  if (fresh(url, parsed)) {
    return parsed;
  }
  parsed = fastparse(url);
  parsed._raw = url;
  return (req._parsedUrl = parsed);
}
;
function originalurl(req) {
  var url = req.originalUrl;
  if (typeof url !== 'string') {
    return parseurl(req);
  }
  var parsed = req._parsedOriginalUrl;
  if (fresh(url, parsed)) {
    return parsed;
  }
  parsed = fastparse(url);
  parsed._raw = url;
  return (req._parsedOriginalUrl = parsed);
}
;
function fastparse(str) {
  if (typeof str !== 'string' || str.charCodeAt(0) !== 0x2f) {
    return parse(str);
  }
  var pathname = str;
  var query = null;
  var search = null;
  for (var i = 1; i < str.length; i++) {
    switch (str.charCodeAt(i)) {
      case 0x3f:
        if (search === null) {
          pathname = str.substring(0, i);
          query = str.substring(i + 1);
          search = str.substring(i);
        }
        break;
      case 0x09:
      case 0x0a:
      case 0x0c:
      case 0x0d:
      case 0x20:
      case 0x23:
      case 0xa0:
      case 0xfeff:
        return parse(str);
    }
  }
  var url = Url !== undefined ? new Url() : {};
  url.path = str;
  url.href = str;
  url.pathname = pathname;
  url.query = query;
  url.search = search;
  return url;
}
function fresh(url, parsedUrl) {
  return typeof parsedUrl === 'object' && parsedUrl !== null && (Url === undefined || parsedUrl instanceof Url) && parsedUrl._raw === url;
}
