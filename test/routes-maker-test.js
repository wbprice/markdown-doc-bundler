'use strict'

const { expect } = require('chai')
const path = require('path')

const routesMaker = require('../index').routesMaker
const bundler = require('../index').bundler

const sampleBundle = bundler(path.resolve(__dirname, 'fixtures'))

describe('#routesMaker', () => {

  it('should return an array', () => {
    const result = routesMaker({})
    expect(result).to.be.an('array')
  })

  it('should throw an error if a bundle is not provided.', () => {
    expect(routesMaker).to.throw(/include a bundle/)
  })

  it('should return an array containing objects with key matching ' +
     'desired route and value containing contents of markdown file.', () => {

    const result = routesMaker(sampleBundle)

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(10)

    expect(result[0]).to.be.an('array')
    expect(result[0][0]).to.equal('/')
    expect(result[0][1]).to.be.a('string')

    expect(result[1]).to.be.an('array')
    expect(result[1][0]).to.equal('/anatomy/')
    expect(result[1][1]).to.be.a('string')

    expect(result[2]).to.be.a('array')
    expect(result[2][0]).to.equal('/anatomy/backbone')
    expect(result[2][1]).to.be.a('string')

    expect(result[3]).to.be.a('array')
    expect(result[3][0]).to.equal('/anatomy/kneebone')
    expect(result[3][1]).to.be.a('string')

    expect(result[4]).to.be.an('array')
    expect(result[4][0]).to.equal('/anatomy/tailbone')
    expect(result[4][1]).to.be.a('string')

    expect(result[5]).to.be.a('array')
    expect(result[5][0]).to.equal('/anatomy/trailsProject/')
    expect(result[5][1]).to.be.a('string')

    expect(result[6]).to.be.a('array')
    expect(result[6][0]).to.equal('/anatomy/trailsProject/api/')
    expect(result[6][1]).to.be.a('string')

    expect(result[7]).to.be.a('array')
    expect(result[7][0]).to.equal('/concepts/concepts')
    expect(result[7][1]).to.be.a('string')

    expect(result[8]).to.be.a('array')
    expect(result[8][0]).to.equal('/concepts/orm/')
    expect(result[8][1]).to.be.a('string')

    expect(result[9]).to.be.a('array')
    expect(result[9][0]).to.equal('/concepts/policies/')
    expect(result[9][1]).to.be.a('string')

  })

  it('should accept a second argument \'pwd\' that allows the ' +
     'developer to specify a starting directory. ', () => {

    const result = routesMaker(sampleBundle, '/docs')

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(10)

    expect(result[0]).to.be.an('array')
    expect(result[0][0]).to.equal('/docs/')
    expect(result[0][1]).to.be.a('string')

    expect(result[1]).to.be.an('array')
    expect(result[1][0]).to.equal('/docs/anatomy/')
    expect(result[1][1]).to.be.a('string')

    expect(result[2]).to.be.a('array')
    expect(result[2][0]).to.equal('/docs/anatomy/backbone')
    expect(result[2][1]).to.be.a('string')

    expect(result[3]).to.be.a('array')
    expect(result[3][0]).to.equal('/docs/anatomy/kneebone')
    expect(result[3][1]).to.be.a('string')

    expect(result[4]).to.be.an('array')
    expect(result[4][0]).to.equal('/docs/anatomy/tailbone')
    expect(result[4][1]).to.be.a('string')

    expect(result[5]).to.be.a('array')
    expect(result[5][0]).to.equal('/docs/anatomy/trailsProject/')
    expect(result[5][1]).to.be.a('string')

    expect(result[6]).to.be.a('array')
    expect(result[6][0]).to.equal('/docs/anatomy/trailsProject/api/')
    expect(result[6][1]).to.be.a('string')

    expect(result[7]).to.be.a('array')
    expect(result[7][0]).to.equal('/docs/concepts/concepts')
    expect(result[7][1]).to.be.a('string')

    expect(result[8]).to.be.a('array')
    expect(result[8][0]).to.equal('/docs/concepts/orm/')
    expect(result[8][1]).to.be.a('string')

    expect(result[9]).to.be.a('array')
    expect(result[9][0]).to.equal('/docs/concepts/policies/')
    expect(result[9][1]).to.be.a('string')

  })

})
