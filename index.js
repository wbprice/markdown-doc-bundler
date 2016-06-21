'use strict'

const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const imageRegex = /\.(gif|jp?g|png|svg)$/

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

module.exports.bundler = function(pwd) {

  if (!pwd) {
    throw 'Please include the absolute path of the directory containing ' +
          'module docs you want to bundle.'
  }

  const files = fs.readdirSync(pwd)
  const output = {}

  files.forEach(file => {

    const absolutePath = path.resolve(pwd, file)
    const extname = path.extname(absolutePath)
    const stat = fs.statSync(absolutePath)

    // If this file is a directory, pass the directory to #bundler, saving the
    // results to output keyed by the directory name
    if (stat.isDirectory()) {
      output[file] = module.exports.bundler(absolutePath)
    }

    // If this file is a markdown file, save the file contents to the output
    // object, keyed by the file name.
    else if (stat.isFile() && extname === '.md') {
      output[file] = fs.readFileSync(absolutePath, 'utf8')
    }

    else if (stat.isFile() && imageRegex.test(extname)) {
      output[file] = fs.readFileSync(absolutePath)
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
 * Accepts an optional parameter 'prefix' which is a prefix to file paths in markdown
 * and routes.
 *
 * @param {object} bundle
 * @param {string} prefix
 */

module.exports.routesMaker = function(bundle, prefix = '/') {

  if (!bundle) {
    throw 'Please include a bundle to parse'
  }

  const output = []

  function recursiveRoutesMaker(bundle, pwd) {

    _.forEach(bundle, (content, key) => {

      // If the value is a string.
      if (_.isString(content)) {
        const nextPath = module.exports.fixUrl(path.join(pwd, key))
        output.push([nextPath, module.exports.fixUrls(content, prefix, pwd)])
      }

      // If the value is a Buffer (usually images)
      else if (Buffer.isBuffer(content)) {
        const nextPath = path.join('/', pwd, key)
        output.push([nextPath, content])
      }

      // If content is an object, run the function again.
      else if (_.isObject(content)) {
        const nextPwd = path.join(pwd, key)
        recursiveRoutesMaker(content, nextPwd)
      }

    })
  }

  recursiveRoutesMaker(bundle, prefix)

  return output

}

/*
 * @name #fixUrls
 * @description
 * A function that parses a string derived from a markdown doc and
 * performs any number of operations to fix the urls contained within.
 */

module.exports.fixUrls = function(string, prefix, pwd) {
  const markdownLinkRegex = /(\[.*?\]\()(.+?)(\))/g
  return string.replace(markdownLinkRegex, (whole, a, b, c) => {
    return `${a}${module.exports.fixUrl(b, prefix, pwd)}${c}`
  })
}

/*
 * @name fixUrl
 * @description wrapper function for all the methods of fixing a url.
 */

module.exports.fixUrl = function(url, prefix, pwd) {

  const protocolRegex = /([a-z][a-z0-9+.-]*.:)?(\/\/)/
  if (protocolRegex.test(url)) {
    return url
  }

  return module.exports.prefixUrl(
    module.exports.makeIndex(
      module.exports.removeFileExtension(url)
    ),
    prefix,
    pwd
  )
}

/*
 * @name #prefixUrl
 * @description
 * Prefixes relative urls if a prefix is provided.
 * @param {string} link
 */

module.exports.prefixUrl = function(url, prefix, pwd) {

  // Does url contain '../'?
  const directoryUpRegex = /\.{2}\//

  if (!prefix) {
    return path.join('/', url)
  }

  else {

    // If URL is root relative, prefix it.
    if (url[0] === '/') {
      return path.join(`/${prefix}`, url)
    }

    // If URL is document relative and starts with '../'
    else if (directoryUpRegex.test(url)) {
      return path.join(`/${pwd.split('/').slice(0, -1).join('/')}`, url)
    }

    // If URL is document relative, prepend the pwd
    else {
      return path.join(`/${pwd}`, url)
    }

  }
}

/*
 * @name #removeFileExtension
 * @description
 * Removes the extension from the last item in a url.
 */

module.exports.removeFileExtension = function(link) {
  const parsedLink = path.parse(link)
  if (imageRegex.test(parsedLink.ext)) {
    return link
  }
  else {
    return path.join(parsedLink.dir, parsedLink.name)
  }

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
