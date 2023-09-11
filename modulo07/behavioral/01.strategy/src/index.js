import ContextStrategy from "./base/contextStrategy.js"
import MongoDBStrategy from "./strategies/mongodbStrategy.js"
import PostgresStrategy from "./strategies/postgresStrategy.js"

const postgresConnectionString = "postgres://erickwendel:senha0001@localhost:5432/heroes"
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))

await postgresContext.connect()

const mongoDBConnectionString = "mongodb://erickwendel:senhaadmin@localhost:27017/heroes"
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))

await mongoDBContext.connect()

const data = [
  {
    name: 'erickwendel',
    type: 'transaction'
  },
  {
    name: 'mariasilva',
    type: 'activitylog'
  }
]

const contextTypes = {
  transaction: postgresContext,
  activitylog: mongoDBContext
}

for (const { type, name } of data) {
  const context = contextTypes[type]

  await context.create({ name: name + Date.now() })
  
  console.log(type, context.dbStrategy.constructor.name)
  console.log(await context.read())
}