const fs = require('fs').promises

const readFiles = async directory => fs.readdir(directory)

const writeFile = async (outputFilePath, stringArray) => fs.writeFile(outputFilePath, stringArray.join('\n'))

module.exports = { readFiles, writeFile }
