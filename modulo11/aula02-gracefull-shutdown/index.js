import { MongoClient } from 'mongodb'
import { createServer } from 'http'
import {  promisify} from 'util'

async function dbConnect() {
  const client = new MongoClient('mongodb://localhost:27017')
  await client.connect()

  console.log('mongodb is connected')
  const db = client.db('comics')

  return {
    collections: { heroes: db.collection('heroes') },
    client
  }
}

const { collections, client } = await dbConnect()

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data)
      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toISOString()
      })
      const heroes = await collections.heroes.find().toArray()
      
      console.log({ heroes })

      response.writeHead(200)
      response.write(JSON.stringify(heroes))
    } catch (error) {
      console.log('a request error has happened')
      response.writeHead(500)
      response.write(JSON.stringify({ message: 'internal server error!' }))
    }
    finally {
      response.end()
    }
  }

}

// await client.close()
/*
  curl -i localhost:3000 -X POST --data '{"name": "Batman", "age": "80"}'
*/

const server = createServer(handler)
  .listen(3000, () => console.log('running at 3000 and process', process.pid))

const onStop = async (signal) => {
  console.info(`\n${signal} signal received`)

  console.log('Closing http server!')
  await promisify(server.close.bind(server))()

  console.log('Http Server has closed!')

  // close(true) -> força o encerramento
  await client.close()
  console.log('Mongo connection has closed!')
  // zero é tudo certo, 1 é erro!
  process.exit(0)
}

// SIGINT -> Ctrl +C
// SIGTERM -> Kill
['SIGINT', 'SIGTERM'].forEach((event) => process.on(event, onStop))

