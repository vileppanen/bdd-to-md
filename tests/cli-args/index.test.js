const path = require('path')
const libs = require('../../libs')

const TESTED_MODULE = 'cli-args'
describe(TESTED_MODULE, () => {
  let mod
  beforeEach(() => {
    mod = require(`../../${TESTED_MODULE}`)
  })
  describe('#getFeaturesPath', () => {
    describe('- when featuresPath argument is provided', () => {
      let featuresPathArg
      beforeEach(() => {
        featuresPathArg = 'foo/bar///jar'
        sinon.stub(libs, 'commandLineArgs').returns({
          featuresPath: featuresPathArg
        })
        sinon.stub(path, 'normalize').returns('normalized-path')
      })
      afterEach(() => {
        sinon.restore()
      })
      it('returns the normalized argument value', () => {
        const result = mod.getFeaturesPath()
        expect(path.normalize).to.have.been.calledWith(featuresPathArg)
        expect(result).to.equal('normalized-path')
      })
    })
    describe('- when featuresPath argument not provided', () => {
      beforeEach(() => {
        sinon.stub(libs, 'commandLineArgs').returns({
          someOtherPath: 'foobar'
        })
      })
      afterEach(() => {
        sinon.restore()
      })
      it('throws error', () => {
        expect(() => mod.getFeaturesPath()).to.throw('featuresPath argument not provided')
      })
    })
  })
  describe('#getMarkDownFilePath', () => {
    describe('- when markdownFilePath argument is provided', () => {
      let markdownFilePathArg
      beforeEach(() => {
        markdownFilePathArg = 'foo/bar///jar'
        sinon.stub(libs, 'commandLineArgs').returns({
          markdownFilePath: markdownFilePathArg
        })
        sinon.stub(path, 'normalize').returns('normalized-path')
      })
      afterEach(() => {
        sinon.restore()
      })
      it('returns the normalized argument value', () => {
        const result = mod.getMarkDownFilePath()
        expect(path.normalize).to.have.been.calledWith(markdownFilePathArg)
        expect(result).to.equal('normalized-path')
      })
    })
    describe('- when markdownFilePath argument not provided', () => {
      beforeEach(() => {
        sinon.stub(libs, 'commandLineArgs').returns({
          someOtherPath: 'foobar'
        })
      })
      afterEach(() => {
        sinon.restore()
      })
      it('throws error', () => {
        expect(() => mod.getMarkDownFilePath()).to.throw('markdownFilePath argument not provided')
      })
    })
  })
})
