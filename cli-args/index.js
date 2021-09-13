const path = require('path')
const libs = require('../libs')

const argumentDefinitions = [
  { name: 'featuresPath', alias: 'f', type: String },
  { name: 'markdownFilePath', alias: 'm', type: String }
]

const getFeaturesPath = () => {
  const args = libs.commandLineArgs(argumentDefinitions)
  if (!args.featuresPath) throw new Error('featuresPath argument not provided')
  return normalizedPath(args.featuresPath)
}
const getMarkDownFilePath = () => {
  const args = libs.commandLineArgs(argumentDefinitions)
  if (!args.markdownFilePath) throw new Error('markDownFilePath argument not provided')
  return normalizedPath(args.markdownFilePath)
}
const normalizedPath = pathToDir => path.normalize(pathToDir)

module.exports = {
  getFeaturesPath,
  getMarkDownFilePath
}
