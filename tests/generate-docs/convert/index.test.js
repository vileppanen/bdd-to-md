const producers = require('../../../generate-docs/convert/producers')
const mod = require('../../../generate-docs/convert')

describe('generate-docs/convert', () => {
  describe('#gherkin', () => {
    beforeEach(() => {
      sinon.stub(producers.md, 'produceFrom')
    })
    afterEach(() => sinon.restore())

    it('should return wrapper object for converting gherkin data passed as an argument', () => {
      const result = mod.gherkin('some-gherkin-data')
      expect(result).to.have.all.keys('to')
    })
    describe('- when converting gherkin to markdown via wrapper object', () => {
      it('should do the conversion using the "md" producer', () => {
        mod.gherkin('some-gherkin-data').to('md')
        expect(producers.md.produceFrom).to.have.been.calledWith('some-gherkin-data')
      })
    })
  })
})
