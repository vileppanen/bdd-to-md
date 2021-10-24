const cliArgs = require('../../cli-args')
const files = require('../../generate-docs/files')
const convert = require('../../generate-docs/convert')
const gherkin = require('gherkin').default

const mod = require('../../generate-docs/index')
describe('generate-docs/index', () => {
  describe('#queryArgumentsAndGenerateDocs', () => {
    let mockConverter
    beforeEach(() => {
      sinon.stub(cliArgs, 'getFeaturesPath').returns('features-path')
      sinon.stub(cliArgs, 'getOutputFilePath').returns('output-file-path')
      sinon.stub(files, 'readFiles').resolves(['foo', 'bar', 'jar'])
      sinon.stub(files, 'writeFile').resolves()
      sinon.stub(gherkin, 'fromPaths').returns({
        on: sinon.stub().callsFake((e, cb) => {
          /* eslint-disable node/no-callback-literal */
          cb({ gherkinDocument: 'some-gherkin-data-chunk' })
        })
      })

      mockConverter = {
        to: sinon.stub().returns(['some-converted-data'])
      }
      sinon.stub(convert, 'gherkin').returns(mockConverter)
    })
    afterEach(() => sinon.restore())
    it('should query for features directory path', async () => {
      await mod.queryArgumentsAndGenerateDocs()
      expect(cliArgs.getFeaturesPath).to.have.been.called()
    })
    it('should query for desired output file path', async () => {
      await mod.queryArgumentsAndGenerateDocs()
      expect(cliArgs.getOutputFilePath).to.have.been.called()
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
    it('should convert the read Gherkin data into markdown', async () => {
      await mod.queryArgumentsAndGenerateDocs()
      expect(convert.gherkin).to.have.been.calledWith('some-gherkin-data-chunk')
      expect(mockConverter.to).to.have.been.calledWith('md')
    })
    it('should write the converted output into a file', async () => {
      await mod.queryArgumentsAndGenerateDocs()
      expect(files.writeFile).to.have.been.calledWith('output-file-path', ['some-converted-data'])
    })
  })
})
