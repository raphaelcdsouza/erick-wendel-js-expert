import {
  expect,
  describe,
  test,
  jest,
  beforeEach
} from '@jest/globals'

import Util from '../../src/util.js'

describe('#Util - String', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('#upperCaseFirstLetter should tranform the first letter in upperCase', () => {
    const data = 'hello'
    const expected = 'Hello'

    const result = Util.upperCaseFirstLetter(data)

    expect(result).toStrictEqual(expected)
  })

  test('#lowerCaseFirstLetter should tranform the first letter in lowerCase', () => {
    const data = 'Hello'
    const expected = 'hello'

    const result = Util.lowerCaseFirstLetter(data)

    expect(result).toStrictEqual(expected)
  })

  test.todo('#upperCaseFirstLetter given an empty string it should return empty')

  test.todo('#lowerCaseFirstLetter given an empty string it should return empty')
})