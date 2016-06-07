'use strict'

/*
 * @name 
 * bundler
 * @description
 * Main function.  Accepts a directory and types of files to include in 
 * resulting bundle of files.
 * @param {string} path to start building the bundle in.
 * @param {string | array} filetypes to include in the bundle.
 */

function bundler(path, types) {

  if (!path) {
    throw 'Please include a path to start building the doc bundle.'
  }
  
  if (!types) {
    types = '.md'
  }

  return {}

}

module.exports = {
  default: bundler
}
