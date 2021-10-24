const produceFrom = gherkinDocument => {
  const { feature } = gherkinDocument
  const markdownLines = [
    ...convertFeature(feature),
    ...convertChildren(feature.children)
  ]

  return markdownLines
}
const convertFeature = ({ name, description = '' }) => ([
  `# ${name}`,
  ...description.split('\n').map(line => line.trim()).filter(line => line.length > 0)
])
const convertChildren = (children = []) => children.map(convertChild).reduce((prevVal, currentVal) => ([...prevVal, ...currentVal]), [])

const convertChild = child => {
  if (child.background) return convertBackground(child.background)
  if (child.scenario) return convertScenario(child.scenario)
}

const convertBackground = ({ name, steps = [] }) => ([
  `**${name}**`,
  ...steps.map(step => `* ${step.keyword} ${step.text}`)
])

const convertScenario = ({ name, steps = [] }) => ([
  `## Scenario: ${name}`,
  ...steps.map(step => `* ${step.keyword} ${step.text}`)
])

module.exports = {
  produceFrom
}
