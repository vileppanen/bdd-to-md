const gherkin = require('gherkin').default
const fs = require('fs')
const { readFiles } = require('./read-files')

let markdownLines = []

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

const generateMarkdown = async (featuresDir, outputFilePath) => {
  const files = await readFiles(featuresDir)
  const stream = gherkin.fromPaths(files.map(file => `${featuresDir}/${file}`))
  stream.on('data', (chunk) => {
    handleFeature(chunk)
  })
  stream.on('end', async () => {
    fs.writeFile(outputFilePath, markdownLines.join('\n'), () => {
      console.log(`Feature specs written to ${outputFilePath}`)
    })
  })
}

module.exports = { generateMarkdown }
