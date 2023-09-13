import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL'
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter.js'

describe('#RickAndMortyBRLAdapter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('#getCharacters should be an adapter for RickAndMortyBRL.getCharactersJSON', async () => {
    const brlIntegration = jest.spyOn(
      RickAndMortyBRL,
      RickAndMortyBRL.getCharactersFromJSON.name
    ).mockResolvedValue([])

    const result = await RickAndMortyBRLAdapter.getCharacters()

    expect(brlIntegration).toHaveBeenCalled()
    expect(result).toEqual([])
  })
})