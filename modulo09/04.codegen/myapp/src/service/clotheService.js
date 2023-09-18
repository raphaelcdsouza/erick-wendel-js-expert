
export default class ClotheService {
  constructor({ repository: clotheRepository }) {
    this.clotheRepository = clotheRepository
  }

  create(data) {
    return this.clotheRepository.create(data)
  }

  read(query) {
    return this.clotheRepository.read(query)
  }

  update(id, data) {
    return this.clotheRepository.update(id, data)
  }

  delete(id) {
    return this.clotheRepository.delete(id)
  }
}