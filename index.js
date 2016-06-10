'use strict'

const fs = require('fs')
const path = require('path')
const _ = require('lodash')

module.exports = {}

/*
 * @name
 * #bundler
 * @description
 * @param {!prefix}
 * Optional param.  When rewriting params, add prefix.
 * Accepts the path of a directory. Produces an object containing the contents of
   markdown files as strings organized according to the directory's original structure.
 * @returns {object}
 */

module.exports.bundler = function(pwd, prefix) {

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
      output[file] = module.exports.bundler(absolutePath)
    }

    // If this file is a markdown file, save the file contents to the output
    // object, keyed by the file name.
    else if (stat.isFile() && path.extname(absolutePath) === '.md') {
      output[file] = module.exports.fixUrls(fs.readFileSync(absolutePath, 'utf8'), prefix)
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

module.exports.routesMaker = function(bundle, pwd = '/') {

  if (!bundle) {
    throw 'Please include a bundle to parse'
  }

  const output = []

  function recursiveRoutesMaker(pwd, bundle) {

    _.forEach(bundle, (value, key) => {

      // If the value is a string and the key is 'README.md', consider this to
      // be the root entry for this folder.
      if (_.isString(value) && key === 'README.md') {
        const nextPwd = pwd === '/' ? '/' : `${pwd}/`
        output.push([nextPwd, value])
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

/*
 * @name #fixUrls
 * @description
 * A function that parses a string derived from a markdown doc and
 * performs any number of operations to fix the urls contained within.
 */

module.exports.fixUrls = function(string, prefix) {
  const urlRegex = /(\[.*?\]\()(.+?)(\))/g
  return string.replace(urlRegex, (whole, a, b, c) => {
    return `${a}${module.exports.fixUrl(b, prefix)}${c}`
  })
}

/*
 * @name fixUrl
 * @description wrapper function for all the methods of fixing a url.
 */

module.exports.fixUrl = function(url, prefix) {

  const protocolRegex = /([a-z][a-z0-9+.-]*.:)?(\/\/)/
  if (protocolRegex.test(url)) {
    return url
  }

  return module.exports.prefixUrl(
    module.exports.makeIndex(
      module.exports.removeFileExtension(url)
    ),
    prefix
  )
}

/*
 * @name #prefixUrl
 * @description
 * Prefixes relative urls if a prefix is provided.
 * @param {string} link
 */

module.exports.prefixUrl = function(link, prefix) {
  if (!prefix) {
    return path.join('/', link)
  }
  else {
    return path.join(`/${prefix}`, link)
  }
}

/*
 * @name #removeFileExtension
 * @description
 * Removes the extension from the last item in a url.
 */

module.exports.removeFileExtension = function(link) {
  const parsedLink = path.parse(link)
  return path.join(parsedLink.dir, parsedLink.name)
}

/*
 * @name #makeIndex
 * @description
 * If the given file is supposed to be an index document, removes the
 * file name from the url
 */

module.exports.makeIndex = function(link) {
  if (link.indexOf('README') !== -1) {
    const parsedLink = path.parse(link)
    return path.join(parsedLink.dir, '/')
  }
  else return link
}
