const generateDocs = require('../generate-docs')

const TESTED_MODULE = 'cli'
describe(`${TESTED_MODULE}`, () => {
  beforeEach(() => {
    sinon.stub(generateDocs, 'queryArgumentsAndGenerateDocs').returns()
  })
  afterEach(() => sinon.restore())
  it('should query user for path arguments and generate documentation', () => {
    require(`../${TESTED_MODULE}`)
    expect(generateDocs.queryArgumentsAndGenerateDocs).to.have.been.called()
  })
})
