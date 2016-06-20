'use strict'

const pkg = require('../index')
const prefixUrl = pkg.prefixUrl

const { expect } = require('chai')
const documentRelative = 'introduction/installation.md'
const documentRelativeUp = '../introduction/installation.md'
const rootRelative = '/trailpack/official/README.md'

describe('#prefixUrl', () => {

  it('should prepend the present working directory prefix to a document-relative URL', () => {
    const result = prefixUrl(documentRelative, 'docs', 'docs/markdown/')
    expect(result).to.equal('/docs/markdown/introduction/installation.md')
  })

  it('should prepend the present working directory to a document relative URL ', () => {
    const result = prefixUrl(documentRelativeUp, 'docs', 'docs/markdown/potato/')
    expect(result).to.equal('/docs/markdown/introduction/installation.md')
  })

  it('should add a provided prefix to a root-relative URL', () => {
    const result = prefixUrl(rootRelative, 'docs', 'docs/markdown')
    expect(result).to.equal('/docs/trailpack/official/README.md')
  })

})
