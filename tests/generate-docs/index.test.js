const cliArgs = require('../../cli-args')
const files = require('../../generate-docs/files')
const gherkin = require('gherkin').default
const TESTED_MODULE = 'generate-docs/index'
describe(`${TESTED_MODULE}`, () => {
  describe('#queryArgumentsAndGenerateDocs', () => {
    let mod
    beforeEach(() => {
      sinon.stub(cliArgs, 'getFeaturesPath').returns('features-path')
      sinon.stub(cliArgs, 'getMarkdownFilePath').returns('markdown-file-path')
      sinon.stub(files, 'readFiles').resolves(['foo', 'bar', 'jar'])
      sinon.stub(gherkin, 'fromPaths').returns({
        on: sinon.stub()
      })
      mod = require(`../../${TESTED_MODULE}`)
    })
    afterEach(() => sinon.restore())
    it('should query for features directory path', async () => {
      await mod.queryArgumentsAndGenerateDocs()
      expect(cliArgs.getFeaturesPath).to.have.been.called()
    })
    it('should query for desired markdown file path', async () => {
      await mod.queryArgumentsAndGenerateDocs()
      expect(cliArgs.getMarkdownFilePath).to.have.been.called()
    })
    it('should read the files from features path', async () => {
      await mod.queryArgumentsAndGenerateDocs()
      expect(files.readFiles).to.have.been.calledWith('features-path')
    })
    it('should build Gherkin documents from the files in features path', async () => {
      await mod.queryArgumentsAndGenerateDocs()
      expect(gherkin.fromPaths).to.have.been.calledWith([
        'features-path/foo',
        'features-path/bar',
        'features-path/jar'
      ])
    })
  })
})
