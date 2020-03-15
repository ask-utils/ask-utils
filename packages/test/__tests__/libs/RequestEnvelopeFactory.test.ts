import {
    RequestEnvelopeFactory,
    RequestFactory,
    SessionFactory,
    ContextFactory
} from '../../libs/index'

describe('RequestEnvelopeFactory', () => {
    it('test', () => {
        const factory = new RequestEnvelopeFactory(
            new RequestFactory('LaunchRequest'),
            new ContextFactory(),
            new SessionFactory()
        )
        factory.sessionFactory.disableNewSessionFlag()
        factory.requestFactory.setLocale('ja-JP')
        expect(factory.getRequest()).toEqual('')
    })
})
