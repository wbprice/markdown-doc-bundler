'use strict'

const { expect } = require('chai')
const path = require('path')
const imageRegex = /\.(gif|jp?g|png|svg)$/

const pkg = require('../index')
const routesMaker = pkg.routesMaker
const bundler = pkg.bundler
const menuMaker = pkg.menuMaker

const sampleBundle = bundler(path.resolve(__dirname, 'fixtures'))
const routes = routesMaker(sampleBundle, 'docs')

describe('Menu Maker', () => {

  let menu

  beforeEach(() => {
    menu = menuMaker(routes)
  })

  it('Should return an array of arrays containing a path and a link.', () => {

    expect(menu).to.be.an.array
    menu.forEach(item => {
      expect(item).to.be.an.array
      expect(item[0]).to.be.ok
      expect(item[0]).to.be.a.string
      expect(item[1]).to.be.ok
      expect(item[1]).to.be.a.string
    })

  })

  it('shouldn\'t include any static files in the menu', () => {

    expect(menu).to.have.lengthOf(10)
    const imagesFound = menu.find(item => {
      return imageRegex.test(item[0])
    })
    expect(imagesFound).to.not.be.ok

  })

})
