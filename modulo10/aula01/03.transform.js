import { Readable, Writable, Transform } from 'stream'
import { createWriteStream } from 'fs'

// fonte de dados
const readable = Readable({
  read() {
    for (let index = 0; index < 1e6; index++) {
    // for (let index = 0; index < 1e3; index++) {
      const person = { id: Date.now() + index, name: `Erick-${index}` }
      const data = JSON.stringify(person)
      this.push(data)
    }
    
    // informa que os dados acabaram
    this.push(null)
  }
})

// processamento dos dados
const mapFields = Transform({
  transform(chunk, encoding,cb) {
    const data = JSON.parse(chunk)
    const result = `${data.id},${data.name.toUpperCase()}\n`

    cb(null, result)
  }
})

const mapHeaders = Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return cb(null, chunk)
    }

    this.counter +=1;
    cb(null, "id,name\n".concat(chunk))
  }
})

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  // writable é sempre a saída
  // .pipe(process.stdout)
  // .pipe(process.stdout)
  .pipe(createWriteStream('my.csv'))

pipeline
  .on('end', () => console.log('acabou'))