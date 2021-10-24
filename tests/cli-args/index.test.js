const path = require('path')
const libs = require('../../libs')

const mod = require('../../cli-args')
const { expect } = require('chai')
describe('cli-args', () => {
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
  describe('#getOutputFilePath', () => {
    describe('- when outputFilePath argument is provided', () => {
      let outputFilePathArg
      beforeEach(() => {
        outputFilePathArg = 'foo/bar///jar'
        sinon.stub(libs, 'commandLineArgs').returns({
          outputFilePath: outputFilePathArg
        })
        sinon.stub(path, 'normalize').returns('normalized-path')
      })
      afterEach(() => {
        sinon.restore()
      })
      it('returns the normalized argument value', () => {
        const result = mod.getOutputFilePath()
        expect(path.normalize).to.have.been.calledWith(outputFilePathArg)
        expect(result).to.equal('normalized-path')
      })
    })
    describe('- when outputFilePath argument not provided', () => {
      beforeEach(() => {
        sinon.stub(libs, 'commandLineArgs').returns({
          someOtherPath: 'foobar'
        })
      })
      afterEach(() => {
        sinon.restore()
      })
      it('throws error', () => {
        expect(() => mod.getOutputFilePath()).to.throw('outputFilePath argument not provided')
      })
    })
  })
  describe('#getConversionType', () => {
    beforeEach(() => {
      sinon.stub(libs, 'commandLineArgs').returns({
        conversionType: 'md'
      })
    })
    afterEach(() => sinon.restore())

    describe('- when conversionType argument is provided', () => {
      it('should return the provided conversion type', () => {
        const results = mod.getConversionType()
        expect(results).to.equal('md')
      })
    })
    describe('- when conversionType argument is not provided', () => {
      beforeEach(() => {
        libs.commandLineArgs.returns({})
      })
      it('should return "md" conversion by default', () => {
        const results = mod.getConversionType()
        expect(results).to.equal('md')
      })
    })
  })
})
