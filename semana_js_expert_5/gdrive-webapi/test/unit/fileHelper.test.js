import { describe, test, expect, jest } from '@jest/globals'
import fs from 'fs'

import FileHelper from '../../src/fileHelper.js'

describe('#FileHelper', () => {
  describe('#getFileStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 16777220,
        mode: 33188,
        nlink: 1,
        uid: 503,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 255295389,
        size: 267046,
        blocks: 528,
        atimeMs: 1695410604731.736,
        mtimeMs: 1695407914928.4912,
        ctimeMs: 1695407914942.692,
        birthtimeMs: 1695407914926.7542,
        atime: '2023-09-22T19:23:24.732Z',
        mtime: '2023-09-22T18:38:34.928Z',
        ctime: '2023-09-22T18:38:34.943Z',
        birthtime: '2023-09-22T18:38:34.927Z'
      }

      const mockUser = 'erickwendel'
      process.env.USER = mockUser
      const filename = 'file.png'

      jest.spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename])

      jest.spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock)

      const result = await FileHelper.getFileStatus('/tmp')

      const expectedResult = [
        {
          size: '267 kB',
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename
        }
      ]

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
      expect(result).toMatchObject(expectedResult)
    })
  })
})