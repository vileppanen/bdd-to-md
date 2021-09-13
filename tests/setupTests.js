const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const dirtyChai = require('dirty-chai')

global.expect = chai.expect
global.sinon = sinon

chai.use(sinonChai)
chai.use(dirtyChai)
