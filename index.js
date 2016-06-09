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

      // If this is a string, push an object containing the route and
      // string to output
      if (_.isString(value)) {
        output.push([pwd, value])
      }

      // If this is an object, run the function again.
      if (_.isObject(value)) {
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
