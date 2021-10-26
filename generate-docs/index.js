const gherkin = require('gherkin').default
const files = require('./files')
const convert = require('./convert')
const cliArgs = require('../cli-args')

const queryArgumentsAndGenerateDocs = async () => {
  const featuresPath = cliArgs.getFeaturesPath()
  const outputFilePath = cliArgs.getOutputFilePath()
  const conversionType = cliArgs.getConversionType()

  await generateOutput(featuresPath, outputFilePath, conversionType)
}

const generateOutput = async (featuresDir, outputFilePath, conversionType) => {
  let outputLines = []

  const featureFiles = await files.readFiles(featuresDir)
  const stream = gherkin.fromPaths(featureFiles.map(file => `${featuresDir}/${file}`))
  stream.on('data', (chunk) => {
    if (chunk.gherkinDocument) outputLines = outputLines.concat(convert.gherkin(chunk.gherkinDocument).to(conversionType))
  })
  stream.on('end', async () => {
    await files.writeFile(outputFilePath, outputLines)
  })
}

module.exports = { queryArgumentsAndGenerateDocs }
