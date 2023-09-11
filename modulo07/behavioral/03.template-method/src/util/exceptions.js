class NotImplementendException extends Error {
  constructor(message) {
    super(`${message} was called without an implementation`)
    this.name = 'NotImplementendException'
  }
}

export { NotImplementendException }