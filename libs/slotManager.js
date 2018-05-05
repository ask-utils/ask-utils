const getSlotByName = (handlerInput, slotName = '') => {
  if (!slotName) return {}
  if (
    handlerInput &&
    handlerInput.requestEnvelope &&
    handlerInput.requestEnvelope.request &&
    handlerInput.requestEnvelope.request.intent &&
    handlerInput.requestEnvelope.request.intent.slots &&
    handlerInput.requestEnvelope.request.intent.slots[slotName]
  ) {
    return handlerInput.requestEnvelope.request.intent.slots[slotName]
  }
  return {}
}

const getSlotValueByName = (handlerInput, slotName = '') => {
  if (!slotName) return ''
  const slot = getSlotByName(handlerInput, slotName)
  return slot.value
}

const getResolutionSlot = (slots) => {
  if (
    slots &&
    slots.resolutions &&
    slots.resolutions.resolutionsPerAuthority
  ) {
    const resolutions = slots.resolutions.resolutionsPerAuthority[0]
    if (resolutions.status) {
      const { code } = resolutions.status
      switch (code) {
        case 'ER_SUCCESS_MATCH': {
          const { values } = resolutions
          if (values && values[0].value) return values[0].value
          return {}
        }
        case 'ER_SUCCESS_NO_MATCH':
          return {}
        default:
          return {}
      }
    }
  }
  return {}
}

const getResolutionSlotParam = (slots, target = 'name') => {
  const slotValue = getResolutionSlot(slots)
  return slotValue[target]
}
module.exports.getSlotByName = getSlotByName
module.exports.getSlotValueByName = getSlotValueByName
module.exports.getResolutionSlot = getResolutionSlot
module.exports.getResolutionSlotParam = getResolutionSlotParam
