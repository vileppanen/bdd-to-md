const gherkin = require('gherkin').default
const files = require('./files')
const convert = require('./convert')
const cliArgs = require('../cli-args')

const queryArgumentsAndGenerateDocs = async () => {
  const featuresPath = cliArgs.getFeaturesPath()
  const mdFilePath = cliArgs.getMarkdownFilePath()

  await generateMarkdown(featuresPath, mdFilePath)
}

const generateMarkdown = async (featuresDir, outputFilePath) => {
  let markdownLines = []

  const featureFiles = await files.readFiles(featuresDir)
  const stream = gherkin.fromPaths(featureFiles.map(file => `${featuresDir}/${file}`))
  stream.on('data', (chunk) => {
    if (chunk.gherkinDocument) markdownLines = markdownLines.concat(convert.gherkin(chunk.gherkinDocument).to('md'))
  })
  stream.on('end', async () => {
    await files.writeFile(outputFilePath, markdownLines)
  })
}

module.exports = { queryArgumentsAndGenerateDocs }
