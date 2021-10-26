const fs = require('fs').promises
const mod = require('../../generate-docs/files')

describe('generate-docs/files', () => {
  describe('#readFiles', () => {
    beforeEach(() => {
      sinon.stub(fs, 'readdir').resolves()
    })
    afterEach(() => sinon.restore())

    it('should return files from specified directory', async () => {
      await mod.readFiles('some-dir')
      expect(fs.readdir).to.have.been.calledWith('some-dir')
    })
  })
  describe('#writeFile', () => {
    beforeEach(() => {
      sinon.stub(fs, 'writeFile').resolves()
    })
    afterEach(() => sinon.restore())

    it('should write provided array of strings into specified file, catenated with newline', async () => {
      await mod.writeFile('some-file', ['foo', 'bar'])
      expect(fs.writeFile).to.have.been.calledWith(
        'some-file',
        'foo\nbar'
      )
    })
  })
})
