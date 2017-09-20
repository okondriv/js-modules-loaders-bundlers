/* */ 
var http = require('http'),
    https = require('https'),
    web_o = require('./web-outgoing'),
    common = require('../common');
web_o = Object.keys(web_o).map(function(pass) {
  return web_o[pass];
});
module.exports = {
  deleteLength: function deleteLength(req, res, options) {
    if ((req.method === 'DELETE' || req.method === 'OPTIONS') && !req.headers['content-length']) {
      req.headers['content-length'] = '0';
      delete req.headers['transfer-encoding'];
    }
  },
  timeout: function timeout(req, res, options) {
    if (options.timeout) {
      req.socket.setTimeout(options.timeout);
    }
  },
  XHeaders: function XHeaders(req, res, options) {
    if (!options.xfwd)
      return;
    var encrypted = req.isSpdy || common.hasEncryptedConnection(req);
    var values = {
      for: req.connection.remoteAddress || req.socket.remoteAddress,
      port: common.getPort(req),
      proto: encrypted ? 'https' : 'http'
    };
    ['for', 'port', 'proto'].forEach(function(header) {
      req.headers['x-forwarded-' + header] = (req.headers['x-forwarded-' + header] || '') + (req.headers['x-forwarded-' + header] ? ',' : '') + values[header];
    });
    req.headers['x-forwarded-host'] = req.headers['host'] || '';
  },
  stream: function stream(req, res, options, _, server, clb) {
    server.emit('start', req, res, options.target || options.forward);
    if (options.forward) {
      var forwardReq = (options.forward.protocol === 'https:' ? https : http).request(common.setupOutgoing(options.ssl || {}, options, req, 'forward'));
      var forwardError = createErrorHandler(forwardReq, options.forward);
      req.on('error', forwardError);
      forwardReq.on('error', forwardError);
      (options.buffer || req).pipe(forwardReq);
      if (!options.target) {
        return res.end();
      }
    }
    var proxyReq = (options.target.protocol === 'https:' ? https : http).request(common.setupOutgoing(options.ssl || {}, options, req));
    proxyReq.on('socket', function(socket) {
      if (server) {
        server.emit('proxyReq', proxyReq, req, res, options);
      }
    });
    if (options.proxyTimeout) {
      proxyReq.setTimeout(options.proxyTimeout, function() {
        proxyReq.abort();
      });
    }
    req.on('aborted', function() {
      proxyReq.abort();
    });
    var proxyError = createErrorHandler(proxyReq, options.target);
    req.on('error', proxyError);
    proxyReq.on('error', proxyError);
    function createErrorHandler(proxyReq, url) {
      return function proxyError(err) {
        if (req.socket.destroyed && err.code === 'ECONNRESET') {
          server.emit('econnreset', err, req, res, url);
          return proxyReq.abort();
        }
        if (clb) {
          clb(err, req, res, url);
        } else {
          server.emit('error', err, req, res, url);
        }
      };
    }
    (options.buffer || req).pipe(proxyReq);
    proxyReq.on('response', function(proxyRes) {
      if (server) {
        server.emit('proxyRes', proxyRes, req, res);
      }
      for (var i = 0; i < web_o.length; i++) {
        if (web_o[i](req, res, proxyRes, options)) {
          break;
        }
      }
      proxyRes.on('end', function() {
        server.emit('end', req, res, proxyRes);
      });
      proxyRes.pipe(res);
    });
  }
};
