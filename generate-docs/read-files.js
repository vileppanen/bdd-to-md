const path = require('path')
const fs = require('fs')

const readFiles = directory => {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, function (err, files) {
      if (err) {
        reject('Failed to read directory', err)
      }
      resolve(files)
    })
  })
}

module.exports = { readFiles }
