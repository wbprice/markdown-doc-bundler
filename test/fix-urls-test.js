'use strict'

const pkg = require('../index')
const fixUrls = pkg.fixUrls

const { expect } = require('chai')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const article = `
  ## Table of Contents

  * [Introduction](introduction/introduction.md)
    * [Installation](introduction/installation.md)
    * [Getting Started](introduction/getting-started.md)
  * Framework
    * [Anatomy](/anatomy/README.md)
    * [Concepts](/concepts/README.md)
    * Core Components
    * Examples
    * [User Guides](/guides/README.md)
  * Trailpack Docs
    * [Official Trailpack](/trailpack/official/README.md)
    * Community Trailpack


  Roadmap
  ------------
  * [Current Roadmap](https://github.com/trailsjs/trails/blob/master/ROADMAP.md)


  Contributing
  ------------

  We love contributors! For more information on how you can contribute to the
  Trails documentation, please read
  [Contributing Guide](contributing/README.md)
`

describe('#fixUrls', () => {

  let fixUrlSpy, prefixUrlSpy

  beforeEach(() => {
    fixUrlSpy = sinon.spy(pkg, 'fixUrl')
    prefixUrlSpy = sinon.spy(pkg, 'prefixUrl')
  })

  afterEach(() => {
    fixUrlSpy.restore()
    prefixUrlSpy.restore()
  })

  it('should capture nine URLs', () => {
    fixUrls(article)
    expect(fixUrlSpy.callCount).to.equal(9)
  })

  it('should fix seven URLs', () => {
    fixUrls(article)
    expect(prefixUrlSpy.callCount).to.equal(8)
  })

})
