let HttpsProxyAgent = require('https-proxy-agent');
let proxyConfig = [{
  context: '/books/',
  target: 'http://localhost:4000/books',
  secure: false,
  logLevel: "debug"
}];

function setupForCorporateProxy(proxyConfig) {
    var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
    if (proxyServer) {
      var agent = new HttpsProxyAgent(proxyServer);
      console.log('Using corporate proxy server: ' + proxyServer);
      proxyConfig.forEach(function(entry) {
        entry.agent = agent;
      });
    }
    return proxyConfig;
  }
  
  module.exports = setupForCorporateProxy(proxyConfig);