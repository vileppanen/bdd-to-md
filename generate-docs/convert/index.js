const producers = require('./producers')

const gherkin = gherkinDocument => {
  const instance = {
    to: outputType => producers[outputType].produceFrom(gherkinDocument)
  }
  return instance
}

module.exports = { gherkin }
