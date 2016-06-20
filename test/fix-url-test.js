'use strict'

const { expect } = require('chai')

const pkg = require('../')
const fixUrl = pkg.fixUrl

const documentRelative = 'introduction/installation.md'
const rootRelative = '/trailpack/official/README.md'
const absolute = 'https://github.com/trailsjs/trails/blob/master/ROADMAP.md'
const protocolRelative = '//github.com/trailsjs/trails/blob/master/ROADMAP.md'

describe('#fixUrl', () => {

  describe('Document Relative URLs', () => {

    it('should prefix a document relative url if a prefix is provided', () => {
      const result = fixUrl(documentRelative, 'docs', 'docs/markdown')
      expect(result).to.equal('/docs/markdown/introduction/installation')
    })

    it('should fix a document relative url if no prefix is provided', () => {
      const result = fixUrl(documentRelative)
      expect(result).to.equal('/introduction/installation')
    })

    it('should prefix a document relative url ending in README.md', () => {
      const result = fixUrl('introduction/README.md', 'docs', 'docs/markdown')
      expect(result).to.equal('/docs/markdown/introduction/')
    })

    it('should fix a document relative url', () => {
      const result = fixUrl('introduction/installation')
      expect(result).to.equal('/introduction/installation')
    })


  })

  describe('Root Relative URLs', () => {

    it('should prefix a root relative URL if a prefix is provided', () => {
      const result = fixUrl(rootRelative, 'docs')
      expect(result).to.equal('/docs/trailpack/official/')
    })

    it('should fix a root relative URL if no prefix is provided', () => {
      const result = fixUrl(rootRelative)
      expect(result).to.equal('/trailpack/official/')
    })

    it('should prefix a root relative URL ending with README if a prefix is provided', () => {
      const result = fixUrl(rootRelative, 'docs')
      expect(result).to.equal('/docs/trailpack/official/')
    })

    it('should fix a root relative URL ending with README if no prefix is provided', () => {
      const result = fixUrl(rootRelative)
      expect(result).to.equal('/trailpack/official/')
    })

  })

  describe('Absolute URLs', () => {

    it('should not modify absolute URLs', () => {
      const result = fixUrl(absolute)
      expect(result).to.equal(absolute)
    })

  })

  describe('Protocol Relative URLs', () => {

    it('should not modify protocol relative URLs', () => {
      const result = fixUrl(protocolRelative)
      expect(result).to.equal(protocolRelative)
    })

  })

})
