const mod = require('../../../../generate-docs/convert/producers/md')

describe('generate-docs/convert/producers/md', () => {
  describe('#produceFrom', () => {
    beforeEach(() => {
      sinon.spy(console, 'warn')
    })
    afterEach(() => sinon.restore())

    describe('- when provided gherkin document contains a feature spec', () => {
      let gherkinDoc
      beforeEach(() => {
        gherkinDoc = {
          feature: {
            name: 'Some feature'
          }
        }
      })

      it('should produce feature block lines in markdown', () => {
        const results = mod.produceFrom(gherkinDoc)
        expect(results).to.deep.equal([
          '# Some feature'
        ])
      })
      describe('- and the spec has description', () => {
        beforeEach(() => {
          gherkinDoc.feature.description = 'some description line\nanother description line '
        })
        it('should produce feature block lines with description in markdown', () => {
          const results = mod.produceFrom(gherkinDoc)
          expect(results).to.deep.equal([
            '# Some feature',
            'some description line',
            'another description line'
          ])
        })
      })
      describe('- and the spec contains background', () => {
        beforeEach(() => {
          gherkinDoc.feature.children = [{
            background: {
              name: 'Some background'
            }
          }]
        })

        it('should produce feature block containing background lines in markdown', () => {
          const results = mod.produceFrom(gherkinDoc)
          expect(results).to.deep.equal([
            '# Some feature',
            '**Some background**'
          ])
        })
        describe('- with steps', () => {
          beforeEach(() => {
            gherkinDoc.feature.children = [{
              background: {
                name: 'Some background',
                steps: [{
                  keyword: 'Given',
                  text: 'Some step'
                }]
              }
            }]
          })
          it('should produce feature block containing background lines with steps in markdown', () => {
            const results = mod.produceFrom(gherkinDoc)
            expect(results).to.deep.equal([
              '# Some feature',
              '**Some background**',
              '* Given Some step'
            ])
          })
        })
      })
      describe('- and the spec contains scenario', () => {
        beforeEach(() => {
          gherkinDoc.feature.children = [{
            scenario: {
              name: 'Some scenario'
            }
          }]
        })

        it('should produce feature block containing scenario lines in markdown', () => {
          const results = mod.produceFrom(gherkinDoc)
          expect(results).to.deep.equal([
            '# Some feature',
            '## Scenario: Some scenario'
          ])
        })
        describe('- with steps', () => {
          beforeEach(() => {
            gherkinDoc.feature.children = [{
              scenario: {
                name: 'Some scenario',
                steps: [{
                  keyword: 'Given',
                  text: 'Some step'
                }]
              }
            }]
          })
          it('should produce feature block containing scenario lines with steps in markdown', () => {
            const results = mod.produceFrom(gherkinDoc)
            expect(results).to.deep.equal([
              '# Some feature',
              '## Scenario: Some scenario',
              '* Given Some step'
            ])
          })
        })
      })
      describe('- and the spec does not contain known data property', () => {
        beforeEach(() => {
          gherkinDoc.feature.children = [{
            foo: {
              name: 'Bar'
            }
          }]
        })
        it('should produce feature block lines in markdown', () => {
          const results = mod.produceFrom(gherkinDoc)
          expect(results).to.deep.equal([
            '# Some feature'
          ])
        })
        it('should log warning about missing, known data properties', () => {
          mod.produceFrom(gherkinDoc)
          expect(console.warn).to.have.been.calledWith('Feature document child didn\'t contain any known data properties, ignoring')
        })
      })
    })
  })
})
