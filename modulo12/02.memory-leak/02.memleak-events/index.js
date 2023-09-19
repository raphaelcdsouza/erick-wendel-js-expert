import { createServer } from 'http'

import Events from 'events'
import { randomBytes } from 'crypto'

function getBytes() {
  return randomBytes(10000)
}

const myEvent = new Events()
function onData() {
  getBytes()
  const items = []
  setInterval(function myInterval() { items.push(Date.now()) })
}

createServer(function handler(request, response) {
  myEvent.on('data', onData)

  myEvent.emit('data', Date.now())

  response.end('ok')
})
  .listen(3000, () => console.log('Server running at 3000'))