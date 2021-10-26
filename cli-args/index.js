const path = require('path')
const libs = require('../libs')

const argumentDefinitions = [
  { name: 'featuresPath', alias: 'f', type: String },
  { name: 'outputFilePath', alias: 'o', type: String },
  { name: 'conversionType', alias: 'c', type: String }
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

const MD_CONVERSION_TYPE = 'md'
const getConversionType = () => {
  const args = libs.commandLineArgs(argumentDefinitions)
  if (!args.conversionType) return MD_CONVERSION_TYPE
  return args.conversionType
}

module.exports = {
  getFeaturesPath,
  getOutputFilePath,
  getConversionType
}
