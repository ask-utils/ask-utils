/**
 * Create random message from lists of messages
 *
 * @param {string[]} messages - lists of message
 * @return {string} - random message
 * @since 0.1.0
 * @example
 * const messages = [
 *  'Hello world',
 *  'Hi Alexa',
 *  'Welcome to the jungle'
 * ]
 * const message = getRandomMessage(messages)
 * // get random message from messages array
 **/
const getRandomMessage = (messages) => {
  if (!messages || messages.length === 0) return ''
  const key = Math.floor(Math.random() * messages.length)
  return messages[key]
}
module.exports.getRandomMessage = getRandomMessage
