const PROXY_CONFIG = {
  '/api': {
    'target': 'http://localhost:57188',
    // 'target': 'http://localhost:49816',
    'secure': false,
    'bypass': function (req, res, proxyOptions) {
      req.headers['X-Custom-Header'] = 'yes';
    }
  }
}

module.exports = PROXY_CONFIG;
