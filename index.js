const testUtils = require('./libs/testUtils')
const funcs = {
  intentHandlers: require('./libs/intentHandlers'),
  randomResponse: require('./libs/randomResponse'),
  slotManager: require('./libs/slotManager')
}

module.exports = Object.assign(testUtils, funcs)
