const {
  getApiEndPoint,
  getApiAccessToken
} = require('../system/api')

/**
 * Reminder API Client
 * @since 0.14.0
 *
 * @example PUT new reminder
 * const client = new RemidnerClient(handlerInput)
 * const payload = {...}
 * client.setPayload(payload)
 * await client.fetch('POST')
 * @example Lists reminder
 * const client = new RemidnerClient(handlerInput)
 * const lists = await client.fetch()
 * @example Delete a reminder
 * const client = new RemidnerClient(handlerInput)
 * await client.fetch('DELETE', `/v1/alerts/reminders/${id}`)
 */
class RemidnerClient {
  constructor (handlerInput, rp = require('request-promise')) {
    this.apiAccessToken = getApiAccessToken(handlerInput)
    this.apiEndpoint = getApiEndPoint(handlerInput)
    this.request = rp
    this.payload = {}
  }
  /**
   * Get API access token
   * @return {string} API access token
   */
  getApiAccessToken () {
    return this.apiAccessToken
  }
  /**
   * Get API endpoint
   * @return {string} API URL
   */
  getApiEndpoint () {
    return this.apiEndpoint
  }
  /**
   * Get payload
   * @return {object} reminder payload
   */
  getPayload () {
    return this.payload
  }
  /**
   * Get API request header
   * @param {string} [method='GET'] request method name
   */
  getHeader (method = 'GET') {
    const apiAccessToken = this.getApiAccessToken()
    const header = {
      'Authorization': `Bearer ${apiAccessToken}`,
      'Content-Type': 'application/json;'
    }
    // const payload = this.getPayload()
    // if (method !== 'GET') header['Content-Length'] = JSON.stringify(payload).length
    return header
  }
  /**
   * Get API request parameters
   *
   * @param {string} [method='GET'] request method name
   * @param {string} [path='/v1/alerts/reminders'] API path
   * @return {object} API request params for request-promise
   */
  getRequestParams (method = 'GET', path = '/v1/alerts/reminders') {
    const apiEndpoint = this.getApiEndpoint()
    const params = {
      method,
      uri: `${apiEndpoint}${path}`,
      headers: this.getHeader(method),
      json: true,
      resolveWithFullResponse: true
    }
    if (method !== 'GET') params.body = this.getPayload()
    return params
  }
  /**
   * Set a reminder request payload
   * @param {object} payload reminder payload
   */
  setPayload (payload) {
    this.payload = payload
  }
  /**
   * Send request to the Reminder API
   *
   * @param {string} [method='GET'] request method name
   * @param {string} [path='/v1/alerts/reminders'] API path
   * @return {Promise<{object}>} API response
   * @throws {Error} When API returns error, throw the Error object
   */
  async fetch (method = 'GET', path = '/v1/alerts/reminders') {
    const params = this.getRequestParams(method, path)
    console.log('Request: %j', params)
    try {
      const response = await this.request(params)
      console.log('Response: %j', response)
      return response
    } catch (e) {
      console.log('RequestError: %j', e)
      throw e
    }
  }
}

module.exports = RemidnerClient
