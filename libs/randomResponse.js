const getRandomMessage = (messages) => {
  if (!messages || messages.length === 0) return ''
  const key = Math.floor(Math.random() * messages.length)
  return messages[key]
}
module.exports.getRandomMessage = getRandomMessage
