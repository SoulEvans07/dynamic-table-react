import hapi from 'hapi'

const server = hapi.server({
  port: 5000,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*']
    }
  }
})

server.events.on('response', function (request) {
  console.log('HTTP ' + request.response.statusCode + ' # ' + request.method.toUpperCase() + ' ' + request.path +
    '\t < ' + request.info.remoteAddress);
});

server.route({
  method: 'GET',
  path: '/',
  handler: (req, h) => {
    return h.response({ message: 'root' })
  }
})

// server.route([])

export default server
