'use strict'

const { expect } = require('chai')
const bundler = require('../index').bundler
const path = require('path')

describe('#bundler', () => {

  it('should return an object', () => {
    const result = bundler('./')
    expect(result).to.be.an('object')
  })

  it('should throw an error if a path is not provided.', () => {
    expect(bundler).to.throw(/absolute path/)
  })

  it('should call itself if a directory is found in the provided directory', () => {

    const result = bundler(path.resolve(__dirname, 'fixtures'))

    const level1 = Object.keys(result)
    const level2 = Object.keys(result.anatomy)

    expect(level1).to.deep.equal([ 'README.md', 'anatomy', 'concepts' ])
    expect(level2).to.deep.equal([
      'README.md',
      'backbone.md',
      'kneebone.md',
      'tailbone.md',
      'trailsProject'
    ])

  })

  it('should save the contents of the markdown file as a string to the output ' +
     'if one is found', () => {

    const result = bundler(path.resolve(__dirname, 'fixtures'))

    expect(result['README.md']).to.be.a('string')
    expect(result.anatomy['README.md']).to.be.a('string')
    expect(result.anatomy['backbone.md']).to.be.a('string')
    expect(result.anatomy['tailbone.md']).to.be.a('string')

  })

})
