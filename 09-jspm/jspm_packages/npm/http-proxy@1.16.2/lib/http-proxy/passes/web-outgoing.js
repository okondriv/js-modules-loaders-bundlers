/* */ 
var url = require('url'),
    common = require('../common');
var redirectRegex = /^201|30(1|2|7|8)$/;
module.exports = {
  removeChunked: function removeChunked(req, res, proxyRes) {
    if (req.httpVersion === '1.0') {
      delete proxyRes.headers['transfer-encoding'];
    }
  },
  setConnection: function setConnection(req, res, proxyRes) {
    if (req.httpVersion === '1.0') {
      proxyRes.headers.connection = req.headers.connection || 'close';
    } else if (req.httpVersion !== '2.0' && !proxyRes.headers.connection) {
      proxyRes.headers.connection = req.headers.connection || 'keep-alive';
    }
  },
  setRedirectHostRewrite: function setRedirectHostRewrite(req, res, proxyRes, options) {
    if ((options.hostRewrite || options.autoRewrite || options.protocolRewrite) && proxyRes.headers['location'] && redirectRegex.test(proxyRes.statusCode)) {
      var target = url.parse(options.target);
      var u = url.parse(proxyRes.headers['location']);
      if (target.host != u.host) {
        return;
      }
      if (options.hostRewrite) {
        u.host = options.hostRewrite;
      } else if (options.autoRewrite) {
        u.host = req.headers['host'];
      }
      if (options.protocolRewrite) {
        u.protocol = options.protocolRewrite;
      }
      proxyRes.headers['location'] = u.format();
    }
  },
  writeHeaders: function writeHeaders(req, res, proxyRes, options) {
    var rewriteCookieDomainConfig = options.cookieDomainRewrite,
        preserveHeaderKeyCase = options.preserveHeaderKeyCase,
        rawHeaderKeyMap,
        setHeader = function(key, header) {
          if (header == undefined)
            return;
          if (rewriteCookieDomainConfig && key.toLowerCase() === 'set-cookie') {
            header = common.rewriteCookieDomain(header, rewriteCookieDomainConfig);
          }
          res.setHeader(String(key).trim(), header);
        };
    if (typeof rewriteCookieDomainConfig === 'string') {
      rewriteCookieDomainConfig = {'*': rewriteCookieDomainConfig};
    }
    if (preserveHeaderKeyCase && proxyRes.rawHeaders != undefined) {
      rawHeaderKeyMap = {};
      for (var i = 0; i < proxyRes.rawHeaders.length; i += 2) {
        var key = proxyRes.rawHeaders[i];
        rawHeaderKeyMap[key.toLowerCase()] = key;
      }
    }
    Object.keys(proxyRes.headers).forEach(function(key) {
      var header = proxyRes.headers[key];
      if (preserveHeaderKeyCase && rawHeaderKeyMap) {
        key = rawHeaderKeyMap[key] || key;
      }
      setHeader(key, header);
    });
  },
  writeStatusCode: function writeStatusCode(req, res, proxyRes) {
    if (proxyRes.statusMessage) {
      res.writeHead(proxyRes.statusCode, proxyRes.statusMessage);
    } else {
      res.writeHead(proxyRes.statusCode);
    }
  }
};
