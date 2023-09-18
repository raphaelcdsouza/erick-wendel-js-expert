
import ClotheService from '../service/clotheService.js'
import ClotheRepository from '../repository/clotheRepository.js'

export default class ClotheFactory {
  static getInstance() {
    const repository = new ClotheRepository()
    const service = new ClotheService({ repository })
    return service
  }
}