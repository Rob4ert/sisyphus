// npm
//const proxyquire = require('proxyquire')
require('chai').should();
const { stub, match } = require('sinon')
const { mockRequest, mockResponse } = require('mock-req-res')
const res = mockResponse()



const index = require('../index.js');
const exerciseControllerJS = require('../controllers/exercise.controller.js');
const EXC = exerciseControllerJS.createExercise
const mockSave = stub()
const mocks = require('./mocks.js');


const name = 'some name'
const description = 'some description'
const req = mockRequest({ body: { name, description } })
  




describe('createExercise', function () {

  it('should create Excerice', function () {
 EXC(res, req);

  it('called save with the right data', () => {
    expect(save).to.have.been.calledWith(match({ name, description }))
  })
  

  });

});

// describe('/Users/ferdinandlucas/Desktop/codeworks/sisypg', () => {
//   const mockSave = stub()
 
//   const createThing = proxyquire('', {
//     '../../utils/saveThing': mockSave
//   })
 
//   const res = mockResponse()
 
//   const resetStubs = () => {
//     mockSave.resetHistory()
//     res.json.resetHistory()
//   }
 
//   context('happy path', () => {
//     const name = 'some name'
//     const description = 'some description'
 
//     const req = mockRequest({ body: { name, description } })
//     const expected = { name, description, id: 1 }
//     before(async () => {
//       save.returns(expected)
//       await createThing(req, res)
//     })
 
//     after(resetStubs)
 
//     it('called save with the right data', () => {
//       expect(save).to.have.been.calledWith(match({ name, description }))
//     })
 
//     it('called res.json with the right data', () => {
//       expect(res.json).to.have.been.calledWith(match(expected))
//     })
//   })
 
//   // and also test the various unhappy path scenarios.
// })



