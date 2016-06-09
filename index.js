'use strict'

const fs = require('fs')
const path = require('path')
const _ = require('lodash')

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

/*
 * @name
 * route
 * @description
 * A function that accepts the output of bundler and returns an array containing
 * arrays containing strings of desired routes and markdown file contents.
 * @param {object} bundle
 */

function routesMaker(bundle, pwd = '/') {

  if (!bundle) {
    throw 'Please include a bundle to parse'
  }

  const output = []

  function recursiveRoutesMaker(pwd, bundle) {

    _.forEach(bundle, (value, key) => {

      // If the value is a string and the key is 'README.md', consider this to
      // be the root entry for this folder.
      if (_.isString(value) && key === 'README.md') {
        output.push([pwd, value])
      }

      //  If ...
      //  1) Value is a string
      //  2) There is no 'README.md' in this bundle
      //  3) An index route is not already registered for this folder
      //  Set the first document that isn't a directory as the index.
      else if (
        _.isString(value) &&
        Object.keys(bundle).indexOf('README.md') === -1 &&
        !output.find(route => route[0] === pwd)
      ) {
        output.push([pwd, value])
      }

      // If the value is a string and the key is something else, consider this
      // to be a page other than the root page.
      else if (_.isString(value)) {
        const nextKey = path.parse(key).name
        const nextPwd = pwd === '/' ? `/${nextKey}` : `${pwd}/${nextKey}`
        output.push([nextPwd, value])
      }

      // If this is an object, run the function again.
      else if (_.isObject(value)) {
        const nextPwd = pwd === '/' ? `/${key}` : `${pwd}/${key}`
        recursiveRoutesMaker(nextPwd, value)
      }

    })
  }

  recursiveRoutesMaker(pwd, bundle)

  return output

}

module.exports = {
  bundler,
  routesMaker
}
