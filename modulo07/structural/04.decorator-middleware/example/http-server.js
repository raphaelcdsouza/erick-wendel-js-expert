InjectHttpInterceptor()

import http from 'http'

import { InjectHttpInterceptor } from './../index.js'

// curl -i localhost:3000
function handleRequest(request, response) {
  // response.setHeader('X-Instrumented-By', 'ErickWendel')
  response.end('Hello world!')
}

const server = http.createServer(handleRequest)
const port = 3000
server.listen(port, () => console.log('server runnint at', server.address().port))