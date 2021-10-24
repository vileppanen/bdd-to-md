const path = require('path')
const libs = require('../libs')

const argumentDefinitions = [
  { name: 'featuresPath', alias: 'f', type: String },
  { name: 'outputFilePath', alias: 'o', type: String }
]

const getFeaturesPath = () => {
  const args = libs.commandLineArgs(argumentDefinitions)
  if (!args.featuresPath) throw new Error('featuresPath argument not provided')
  return normalizedPath(args.featuresPath)
}
const getOutputFilePath = () => {
  const args = libs.commandLineArgs(argumentDefinitions)
  if (!args.outputFilePath) throw new Error('outputFilePath argument not provided')
  return normalizedPath(args.outputFilePath)
}
const normalizedPath = pathToDir => path.normalize(pathToDir)

module.exports = {
  getFeaturesPath,
  getOutputFilePath
}
