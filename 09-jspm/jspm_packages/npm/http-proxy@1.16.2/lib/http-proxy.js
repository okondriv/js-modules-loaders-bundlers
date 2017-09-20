/* */ 
var ProxyServer = require('./http-proxy/index').Server;
function createProxyServer(options) {
  return new ProxyServer(options);
}
ProxyServer.createProxyServer = createProxyServer;
ProxyServer.createServer = createProxyServer;
ProxyServer.createProxy = createProxyServer;
module.exports = ProxyServer;
