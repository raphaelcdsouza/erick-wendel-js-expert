import { createServer } from 'http'
import { parse, fileURLToPath } from 'url'
import { Worker } from 'worker_threads'
import { dirname } from 'path'

// https://sharp.pixelplumbing.com/install#worker-threads
import sharp from 'sharp'

const currentFolder = dirname(fileURLToPath(import.meta.url))
const workerFileName = 'worker.js'

async function joinImages(images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${currentFolder}/${workerFileName}`)
    worker.postMessage(images)

    worker.once('message', resolve)
    worker.once('error', reject)
    worker.once('exit', code => {
      if (code !== 0) {
        return reject(new Error(`Thread ${worker.threadId} stopped with exit code ${code}`))
      }

      console.log(`the thread ${worker.threadId} exited!`)
    })
  })
}

async function handler(request, response) {
  if (request.url.includes('joinImages')) {
    const { query: { background, img } } = parse(request.url, true)

    const imageBase64 = await joinImages({
      image: img,
      background
    })

    response.writeHead(200, {
      'Content-Type': 'text/html'
    })

    response.end(`<img style="width: 100%;height:100%" src="data:image/jpeg;base64,${imageBase64}" />`)
    return
  }

  return response.end('ok')
}

createServer(handler)
  .listen(3000, console.log('running at 3000!'))

// localhost:3000/joinImages?img=https://static.wikia.nocookie.net/mkwikia/images/e/ee/Predator_render.png&background=https://wallpapers.com/images/hd/zombie-apocalypse-1920-x-1200-r96fn5u07khc10q4.jpg

// https://static.wikia.nocookie.net/mkwikia/images/e/ee/Predator_render.png
// https://static3.tcdn.com.br/img/img_prod/460977/boneco_tracker_predator_predador_predadores_predators_escala_1_6_mms147_hot_toys_cg_43510_1_20190427140400.png

// backgrounds
// https://wallpapers.com/images/hd/zombie-apocalypse-1920-x-1200-r96fn5u07khc10q4.jpg
// https://wallpapers.com/images/hd/rick-and-morty-in-the-planet-gazorpazorp-dpips7clzvmpme7p.jpg