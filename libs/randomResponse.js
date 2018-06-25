/**
 * Create random message from lists of messages
 *
 * @param {array} messages - lists of message
 * @return {string} - random message
 * @since 0.1.0
 **/
const getRandomMessage = (messages) => {
  if (!messages || messages.length === 0) return ''
  const key = Math.floor(Math.random() * messages.length)
  return messages[key]
}
module.exports.getRandomMessage = getRandomMessage
