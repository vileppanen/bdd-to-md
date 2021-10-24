const gherkin = require('gherkin').default
const files = require('./files')
const cliArgs = require('../cli-args')

let markdownLines = []

const queryArgumentsAndGenerateDocs = async () => {
  const featuresPath = cliArgs.getFeaturesPath()
  const mdFilePath = cliArgs.getMarkdownFilePath()

  await generateMarkdown(featuresPath, mdFilePath)
}

const generateMarkdown = async (featuresDir, outputFilePath) => {
  const featureFiles = await files.readFiles(featuresDir)
  const stream = gherkin.fromPaths(featureFiles.map(file => `${featuresDir}/${file}`))
  stream.on('data', (chunk) => {
    handleFeature(chunk)
  })
  stream.on('end', async () => {
    await files.writeFile(outputFilePath, markdownLines)
  })
}

const handleFeature = ({ gherkinDocument }) => {
  if (gherkinDocument) {
    markdownLines = [
      ...markdownLines,
      `# ${gherkinDocument.feature.name}`,
      ...gherkinDocument.feature.description.split('\n').map(line => line.trim())
    ]
    handleChildren(gherkinDocument.feature)
  }
}
const handleChildren = ({ children }) => {
  if (children) {
    children.forEach(handleChild)
  }
}

const handleChild = child => {
  if (child.background) handleBackground(child.background)
  if (child.scenario) handleScenario(child.scenario)
}

const handleBackground = background => {
  markdownLines = [
    ...markdownLines,
    '\n',
    `**${background.name}**`,
    ...background.steps.map(step => `* ${step.keyword} ${step.text}`)
  ]
}

const handleScenario = scenario => {
  markdownLines = [
    ...markdownLines,
    '\n',
    `## Scenario: ${scenario.name}`,
    ...scenario.steps.map(step => `* ${step.keyword} ${step.text}`)
  ]
}

module.exports = { queryArgumentsAndGenerateDocs }
