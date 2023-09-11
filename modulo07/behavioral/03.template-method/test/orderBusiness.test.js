import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import { NotImplementendException } from '../src/util/exceptions.js'
import Order from '../src/entities/order.js'
import OrderBusiness from '../src/business/orderBusiness.js'

describe('Test Suite for Template Method design pattern', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  describe('#OrderBusiness', () => {
    test('executing order business without Template Method', () => {
      const order = new Order({
        customer: 1,
        amount: 100000,
        products: [{ description: 'ferrari' }]
      })

      const orderBusiness = new OrderBusiness()
      // todos devs devem obrigatoriament lembrar de seguir a risca esse fluxo de execução
      // se algum esquecer de chamar a função de validação, pode quebrar todo o sistema
      const isValid = orderBusiness._validateRequiredFields(order)
      expect(isValid).toBeTruthy()
      
      const result = orderBusiness._create(order)
      expect(result).toBeTruthy()
    })

    test('executing order business with Template Method', () => {
      const order = new Order({
        customer: 1,
        amount: 100000,
        products: [{ description: 'ferrari' }]
      })

      const orderBusiness = new OrderBusiness()
      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      )
      const calledCreationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      )

      // com template methor, a sequencia de passos é sempre executada
      // evita a replicação de lógica
      const result = orderBusiness.create(order)

      expect(result).toBeTruthy()
      expect(calledValidationFn).toHaveBeenCalled()
      expect(calledCreationFn).toHaveBeenCalled()
    })
  })
})