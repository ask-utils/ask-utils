import { RequestEnvelope } from 'ask-sdk-model'
import { RequestEnvelopeFactory, LaunchRequestFactory, IntentRequestFactory } from '@ask-utils/test'
import {
    SkillFactory
} from '../index'
import { TalkyJSDBonfig } from '../skillFactory.interface'

describe('SkillFactoryr', () => {
    let requestEnvelope: RequestEnvelope = new RequestEnvelopeFactory(new LaunchRequestFactory()).getRequest()
    let skill: SkillFactory
    describe('persistenceAdaptoer configuration', () => {
        const createSkillWithDB = (type?: 'none' | 's3' | 'dynamodb') => {
            const dbConf: TalkyJSDBonfig | undefined = !type || type === 'none' ? undefined : {
                type,
                tableName: 'dummy'
            }
            return new SkillFactory({
                database: dbConf
            }).addRequestHandlers({
                canHandle () {
                    return true
                },
                async handle (input) {
                    const data = await input.attributesManager.getPersistentAttributes()
                    return input.responseBuilder.speak('db data can get it!')
                        .withSimpleCard('db data', JSON.stringify(data))
                        .getResponse()
                }
            })
        }
        beforeEach(() => {
            requestEnvelope = new RequestEnvelopeFactory(new LaunchRequestFactory()).getRequest()
        })
        it.each([undefined, 'none'])('should reject using persistenceAdapter without %p db type', async (type) => {
            skill = createSkillWithDB(type)
            await expect(skill.createLambdaHandler()(requestEnvelope))
                .rejects.toThrowError('Cannot get PersistentAttributes without PersistenceManager')
        })
        /**
         * @TODO Should mock
         */
        it.skip.each(['s3', 'dynamodb'])('should resolve using persistenceAdapter without %p db type', async (type) => {
            skill = createSkillWithDB(type)
            await expect(skill.createLambdaHandler()(requestEnvelope))
                .rejects.toThrowError('Cannot get PersistentAttributes without PersistenceManager')
        })
    })
    describe('stage configuration', () => {
        describe('intentReflector', () => {
            it.each(['development', 'test'])('should execute intentReflector when stage is %p', async (stage) => {
                const requestEnvelope = new RequestEnvelopeFactory(new IntentRequestFactory().setIntent({
                    name: 'dummy',
                    confirmationStatus: 'NONE'
                })).getRequest()
                const skill = new SkillFactory({
                    stage
                })
                await expect(skill.createLambdaHandler()(requestEnvelope)).resolves.toMatchObject({
                    response: {
                        outputSpeech: {
                            ssml: '<speak>You just triggered dummy</speak>',
                            type: 'SSML'
                        }
                    },
                    sessionAttributes: {},
                    userAgent: expect.any(String),
                    version: expect.any(String)
                })
            })
            it('should reject intentReflector when stage is production', async () => {
                const requestEnvelope = new RequestEnvelopeFactory(new IntentRequestFactory().setIntent({
                    name: 'dummy',
                    confirmationStatus: 'NONE'
                })).getRequest()
                const skill = new SkillFactory({
                    stage: 'production'
                })
                await expect(skill.createLambdaHandler()(requestEnvelope))
                    .rejects.toThrowError('Unable to find a suitable request handler')
            })
        })
    })
    describe('addRequestHandlers', () => {
        beforeEach(() => {
            requestEnvelope = new RequestEnvelopeFactory(new LaunchRequestFactory()).getRequest()
            skill = new SkillFactory({

            })
        })
        it('should execute the skill', async () => {
            skill.addRequestHandlers({
                canHandle (input) {
                    return input.requestEnvelope.request.type === 'LaunchRequest'
                },
                handle (input) {
                    return input.responseBuilder.speak('hello').getResponse()
                }
            })
            await expect(skill.createLambdaHandler()(requestEnvelope)).resolves.toMatchObject({
                response: {
                    outputSpeech: {
                        ssml: '<speak>hello</speak>',
                        type: 'SSML'
                    }
                },
                sessionAttributes: {},
                userAgent: expect.any(String),
                version: expect.any(String)
            })
        })
    })
})
