const testUtils = require('./libs/testUtils')
const intentHandlers = require('./libs/intentHandlers')
const randomResponse = require('./libs/randomResponse')
const slotManager = require('./libs/slotManager')
const funcs = {
  intentHandlers,
  randomResponse,
  slotManager
}

module.exports = Object.assign(testUtils, intentHandlers, randomResponse, slotManager, funcs)
