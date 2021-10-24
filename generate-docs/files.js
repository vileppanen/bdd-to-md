const fs = require('fs')

const readFiles = directory => {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, function (err, files) {
      if (err) {
        reject(new Error(err))
      }
      resolve(files)
    })
  })
}

const writeFile = (outputFilePath, stringArray) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(outputFilePath, stringArray.join('\n'), err => {
      if (err) reject(new Error(err))
      resolve()
      console.log(`Data written to ${outputFilePath}`)
    })
  })
}

module.exports = { readFiles, writeFile }
