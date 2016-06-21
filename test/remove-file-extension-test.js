'use strict'

const pkg = require('../index')
const removeFileExtension = pkg.removeFileExtension

const { expect } = require('chai')
const documentRelative = 'introduction/installation.md'
const rootRelative = '/trailpack/official/README.md'

describe('#removeFileExtension', () => {

  it('should remove the file extension from a path.', () => {

    const result = removeFileExtension(documentRelative)
    expect(result).to.equal('introduction/installation')

    const result2 = removeFileExtension(rootRelative)
    expect(result2).to.equal('/trailpack/official/README')

  })

  it('shouldn\'t remove the file extension from an image path', () => {

    const potatoImagePath = 'assets/images/potato.png'
    const result = removeFileExtension(potatoImagePath)
    expect(result).to.equal(potatoImagePath)

    const carrotImagePath = 'assets/images/carrot.svg'
    const result2 = removeFileExtension(carrotImagePath)
    expect(result2).to.equal(carrotImagePath)

  })

})
