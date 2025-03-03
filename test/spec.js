const { expect } = chai
const { stub } = sinon

import {
    addClassesTo,
    appendElementsTo,
    createRangeFromTo,
    flattenResponses,
    parseJSON,
    parseResponsesToJSON
} from '../src/utilities.js'

describe("#parseJSON", () => {
    it("calls json()", () => {
        const response = {
            json: stub()
        }
        parseJSON(response)
        // sinon-chai equivalent, if can get working
        // expect(response.json).to.have.been.calledOnce
        expect(response.json.callCount).to.equal(1)
    })
})

describe("#parseResponsesToJSON", () => {
    it("calls json() on an array of fetch responses", done => {
        const json1 = stub()
        const json2 = stub()
        const responses = [{ json: json1 }, { json: json2 }]
        parseResponsesToJSON(responses).then(_ => {
            // sinon-chai equivalents, if can get working
            // expect(json1).to.have.been.calledOnce
            // expect(json2).to.have.been.calledOnce
            expect(json1.callCount).to.equal(1)
            expect(json2.callCount).to.equal(1)
            done()
        })
    })
})

describe("#flattenResponses", () => {
    it("combines arrays", () => {
        expect(flattenResponses([[1], [2], [3]])).to.deep.equal([1, 2, 3])
    })
})

describe("#createRangeFromTo", () => {
    it("creates a range", () => {
        expect(createRangeFromTo(0, 2)).to.deep.equal([0, 1, 2])
    })
})

describe("#appendElementsTo", () => {
    let $showCard = null
    let $showImage = null
    let $showInfo = null
    beforeEach(() => {
        $showCard = document.createElement("div")
        $showImage = document.createElement("img")
        $showInfo = document.createElement("p")
    })
    context("if the card doesn't have information, it:", () => {
        it("adds children elements", () => {
            expect($showCard.children).to.be.empty
            appendElementsTo($showCard, $showImage, $showInfo)
            expect($showCard.children).to.not.be.empty
        })
    })
})

describe("#addClassesTo", () => {
    const $showCard = document.createElement("div")
    it("adds a class to the given element", () => {
        expect($showCard.classList.contains('show-card')).to.be.false
        addClassesTo($showCard, 'show-card')
        expect($showCard.classList.contains('show-card')).to.be.true
    })
})
