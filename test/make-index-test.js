'use strict'

const pkg = require('../index')
const makeIndex = pkg.makeIndex

const { expect } = require('chai')
const documentRelative = 'introduction/installation.md'
const rootRelative = '/trailpack/official/README.md'

describe('#makeIndex', () => {

  it('should remove the file extension from a path.', () => {
    const result = makeIndex(rootRelative)
    expect(result).to.equal('/trailpack/official/')
  })

  it('shouldn\'t do anything if README isn\'t found in the string.', () => {
    const result = makeIndex(documentRelative)
    expect(result).to.equal(documentRelative)
  })

})

