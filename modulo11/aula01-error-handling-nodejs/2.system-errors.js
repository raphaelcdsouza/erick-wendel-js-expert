import timers from 'timers/promises'

const timeoutAsync = timers.setTimeout;

// const results = ['1', '2'].map(async (item) => {
//   console.log('starting process!!')
//   await timeoutAsync(100)
//   console.count('debug')
//   console.log(await Promise.resolve('timout order!'))
//   await timeoutAsync(100)
//   console.count('debug')

//   return parseInt(item) * 2
// })

// console.log('results', await Promise.all(results))

setTimeout(async () => {
  console.log('starting process!!')
  await timeoutAsync(100)
  console.count('debug')
  console.log(await Promise.resolve('timout order!'))
  await timeoutAsync(100)
  console.count('debug')

  await Promise.reject('promise rejected on timeout!')
}, 1000)

const throwError = (msg) => { throw new Error(msg) }

try {
  console.log('hello')
  console.log('world')
  throwError('error dentro do try/catch')
} catch (error) {
  console.log('pego no catch!', error.message)
} finally {
  console.log('executed after all!')
}

process.on('unhandledRejection', (e) => {
  console.log('unhandledRejection', e.message || e)
})

process.on('uncaughtException', (e) => {
  console.log('uncaughtException', e.message || e)
})

Promise.reject('promise rejected no await!')

setTimeout(async () => {
  await Promise.reject('promise rejected awaited inside timeout!')
})

await Promise.reject('promise rejected awaited!')

throwError('error fora do try/catch')