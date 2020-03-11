const proxy = require('http-proxy-middleware')

// Add proxy for dev env to connect to server running in 5000
module.exports = function(app) {
  app.use(proxy(['/api/', '/auth/google'], { target: 'http://localhost:5000' }));
}