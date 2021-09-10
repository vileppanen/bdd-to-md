const path = require('path')
const commandLineArgs = require('command-line-args')

const argumentDefinitions = [
  { name: 'featuresPath', alias: 'f', type: String },
  { name: 'markdownFilePath', alias: 'm', type: String }
]

const getFeaturesPath = () => {
  const args = commandLineArgs(argumentDefinitions)
  if (!args.featuresPath) throw new Error('featuresPath argument not provided')
  return normalizedPath(args.featuresPath)
}
const getMarkDownFilePath = () => {
  const args = commandLineArgs(argumentDefinitions)
  if (!args.markdownFilePath) throw new Error('markDownFilePath argument not provided')
  return normalizedPath(args.markdownFilePath)
}
const normalizedPath = pathToDir => path.join(pathToDir)

module.exports = {
  getFeaturesPath,
  getMarkDownFilePath
}
