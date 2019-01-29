export const getRandomMessage = (messages: string[]): string => {
  if (!messages || messages.length === 0) return ''
  const key = Math.floor(Math.random() * messages.length)
  return messages[key]
}