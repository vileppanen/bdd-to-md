const mod = require('../../../../generate-docs/convert/producers/md')

describe('generate-docs/convert/producers/md', () => {
  describe('#produceFrom', () => {
    describe('- when provided gherkin document contains a feature spec', () => {
      let gherkinDoc
      beforeEach(() => {
        gherkinDoc = {
          feature: {
            name: 'Some feature',
            description: 'some description line\nanother description line'
          }
        }
      })

      it('should produce feature block lines in markdown', () => {
        const results = mod.produceFrom(gherkinDoc)
        expect(results).to.deep.equal([
          '# Some feature',
          'some description line',
          'another description line'
        ])
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
            'some description line',
            'another description line',
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
              'some description line',
              'another description line',
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
              name: 'Some scenario',
              steps: []
            }
          }]
        })

        it('should produce feature block containing scenario lines in markdown', () => {
          const results = mod.produceFrom(gherkinDoc)
          expect(results).to.deep.equal([
            '# Some feature',
            'some description line',
            'another description line',
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
              'some description line',
              'another description line',
              '## Scenario: Some scenario',
              '* Given Some step'
            ])
          })
        })
      })
    })
  })
})
