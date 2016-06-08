'use strict'

const fs = require('fs')
const path = require('path')

/*
 * @name
 * #bundler
 * @description
 * Accepts the path of a directory. Produces an object containing the contents of
   markdown files as strings organized according to the directory's original structure.
 * @returns {object}
 */

function bundler(pwd) {

  if (!pwd) {
    throw 'Please include the absolute path of the directory containing ' +
          'module docs you want to bundle.'
  }

  const files = fs.readdirSync(pwd)
  const output = {}

  files.forEach(file => {

    const absolutePath = path.resolve(pwd, file)
    const stat = fs.statSync(absolutePath)

    // If this file is a directory, pass the directory to #bundler, saving the
    // results to output keyed by the directory name
    if (stat.isDirectory()) {
      output[file] = bundler(absolutePath)
    }

    // If this file is a markdown file, save the file contents to the output
    // object, keyed by the file name.
    else if (stat.isFile() && path.extname(absolutePath) === '.md') {
      output[file] = fs.readFileSync(absolutePath, 'utf8')
    }

  })

  return output

}

module.exports = bundler
