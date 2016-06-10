'use strict'

const pkg = require('../index')
const prefixUrl = pkg.prefixUrl

const { expect } = require('chai')
const documentRelative = 'introduction/installation.md'
const rootRelative = '/trailpack/official/README.md'

describe('#prefixUrl', () => {

  it('should add a provided prefix to a document-relative URL', () => {
    const result = prefixUrl(documentRelative, 'docs')
    expect(result).to.equal('/docs/introduction/installation.md')
  })

  it('should add a provided prefix to a root-relative URL', () => {
    const result = prefixUrl(rootRelative, 'docs')
    expect(result).to.equal('/docs/trailpack/official/README.md')
  })

})
