'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ask-utils documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/APIClient.html" data-type="entity-link">APIClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/APIClient-1.html" data-type="entity-link">APIClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/BuyContentBuilder.html" data-type="entity-link">BuyContentBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/BuyIntentHandlerBuilder.html" data-type="entity-link">BuyIntentHandlerBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/BuyResponseContentBuilder.html" data-type="entity-link">BuyResponseContentBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConstantsInterceptorFactory.html" data-type="entity-link">ConstantsInterceptorFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContentBuilder.html" data-type="entity-link">ContentBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContentBuilder-1.html" data-type="entity-link">ContentBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/DBClient.html" data-type="entity-link">DBClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeviceAPIClient.html" data-type="entity-link">DeviceAPIClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/FallbackIntentFactory.html" data-type="entity-link">FallbackIntentFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/HandlerBuilder.html" data-type="entity-link">HandlerBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/HandlerBuilder-1.html" data-type="entity-link">HandlerBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/HandlerFactory.html" data-type="entity-link">HandlerFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/HandlerFactory-1.html" data-type="entity-link">HandlerFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/IntentHandlerBuilder.html" data-type="entity-link">IntentHandlerBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/IntentHandlerFactory.html" data-type="entity-link">IntentHandlerFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ISPContentBuilder.html" data-type="entity-link">ISPContentBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/ISPProductClient.html" data-type="entity-link">ISPProductClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/LaunchRequestFactory.html" data-type="entity-link">LaunchRequestFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/LaunchRequestHandlerFactory.html" data-type="entity-link">LaunchRequestHandlerFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/LaunchRequestrBuilder.html" data-type="entity-link">LaunchRequestrBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListManagementAPIClient.html" data-type="entity-link">ListManagementAPIClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocalizedAttributesFactory.html" data-type="entity-link">LocalizedAttributesFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/MockAttributeManager.html" data-type="entity-link">MockAttributeManager</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParameterFactory.html" data-type="entity-link">ParameterFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParameterFactory-1.html" data-type="entity-link">ParameterFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParameterFactory-2.html" data-type="entity-link">ParameterFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParameterFactory-3.html" data-type="entity-link">ParameterFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParameterFactory-4.html" data-type="entity-link">ParameterFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParameterFactory-5.html" data-type="entity-link">ParameterFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParameterFactory-6.html" data-type="entity-link">ParameterFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParameterFactory-7.html" data-type="entity-link">ParameterFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProactiveClient.html" data-type="entity-link">ProactiveClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductDetailResponseContentBuilder.html" data-type="entity-link">ProductDetailResponseContentBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductListResponseContentBuilder.html" data-type="entity-link">ProductListResponseContentBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefundContentBuilder.html" data-type="entity-link">RefundContentBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefundResponseContentBuilder.html" data-type="entity-link">RefundResponseContentBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReminderAPIClient.html" data-type="entity-link">ReminderAPIClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestHandlerFactory.html" data-type="entity-link">RequestHandlerFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/SentryErrorHandlerFactory.html" data-type="entity-link">SentryErrorHandlerFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/SettingAPIClient.html" data-type="entity-link">SettingAPIClient</a>
                            </li>
                            <li class="link">
                                <a href="classes/SkillHandlersFactory.html" data-type="entity-link">SkillHandlersFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/StateManager.html" data-type="entity-link">StateManager</a>
                            </li>
                            <li class="link">
                                <a href="classes/TranslationFactory.html" data-type="entity-link">TranslationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserProfileAPIClient.html" data-type="entity-link">UserProfileAPIClient</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AttributeType.html" data-type="entity-link">AttributeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AudiencePayload.html" data-type="entity-link">AudiencePayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthResponse.html" data-type="entity-link">AuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Availability.html" data-type="entity-link">Availability</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseSkillConfig.html" data-type="entity-link">BaseSkillConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Class.html" data-type="entity-link">Class</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClientConfig.html" data-type="entity-link">ClientConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfirmationState.html" data-type="entity-link">ConfirmationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreativeWork.html" data-type="entity-link">CreativeWork</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomeRequestEnvelope.html" data-type="entity-link">CustomeRequestEnvelope</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomHandlerInput.html" data-type="entity-link">CustomHandlerInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DBConfig.html" data-type="entity-link">DBConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DBItem.html" data-type="entity-link">DBItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DynamoDBSkillConfig.html" data-type="entity-link">DynamoDBSkillConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorHandlerBuilder.html" data-type="entity-link">ErrorHandlerBuilder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Factory.html" data-type="entity-link">Factory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FlashBriefingContent.html" data-type="entity-link">FlashBriefingContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Game.html" data-type="entity-link">Game</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GameInvite.html" data-type="entity-link">GameInvite</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GameStatistic.html" data-type="entity-link">GameStatistic</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Goal.html" data-type="entity-link">Goal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HandlerBuilderInterface.html" data-type="entity-link">HandlerBuilderInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalizedAttribute.html" data-type="entity-link">LocalizedAttribute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MergeObjectType.html" data-type="entity-link">MergeObjectType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageGroup.html" data-type="entity-link">MessageGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageState.html" data-type="entity-link">MessageState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Occasion.html" data-type="entity-link">Occasion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Ogranization.html" data-type="entity-link">Ogranization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Order.html" data-type="entity-link">Order</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderState.html" data-type="entity-link">OrderState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParcelDelivery.html" data-type="entity-link">ParcelDelivery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Payload.html" data-type="entity-link">Payload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Payload-1.html" data-type="entity-link">Payload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Payload-2.html" data-type="entity-link">Payload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Payload-3.html" data-type="entity-link">Payload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Payload-4.html" data-type="entity-link">Payload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Payload-5.html" data-type="entity-link">Payload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Payload-6.html" data-type="entity-link">Payload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Payload-7.html" data-type="entity-link">Payload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PayloadBuilder.html" data-type="entity-link">PayloadBuilder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PayloadBuilder-1.html" data-type="entity-link">PayloadBuilder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PayloadBuilder-2.html" data-type="entity-link">PayloadBuilder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PayloadBuilder-3.html" data-type="entity-link">PayloadBuilder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PayloadBuilder-4.html" data-type="entity-link">PayloadBuilder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PayloadBuilder-5.html" data-type="entity-link">PayloadBuilder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PayloadBuilder-6.html" data-type="entity-link">PayloadBuilder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PayloadBuilder-7.html" data-type="entity-link">PayloadBuilder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PayloadBuilder-8.html" data-type="entity-link">PayloadBuilder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Person.html" data-type="entity-link">Person</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Props.html" data-type="entity-link">Props</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelevantAudience.html" data-type="entity-link">RelevantAudience</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestHandlerBuilder.html" data-type="entity-link">RequestHandlerBuilder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequstBody.html" data-type="entity-link">RequstBody</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link">Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseContent.html" data-type="entity-link">ResponseContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseContent-1.html" data-type="entity-link">ResponseContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/S3SkillConfig.html" data-type="entity-link">S3SkillConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Skill.html" data-type="entity-link">Skill</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SkillConstants.html" data-type="entity-link">SkillConstants</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SkillHandlers.html" data-type="entity-link">SkillHandlers</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SkillHandlersBuilder.html" data-type="entity-link">SkillHandlersBuilder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Soccer.html" data-type="entity-link">Soccer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SportsEvent.html" data-type="entity-link">SportsEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SportsTeam.html" data-type="entity-link">SportsTeam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Thing.html" data-type="entity-link">Thing</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TMergeTargetHandler.html" data-type="entity-link">TMergeTargetHandler</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TranslationBuilder.html" data-type="entity-link">TranslationBuilder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TranslationObject.html" data-type="entity-link">TranslationObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrashCollectionAlert.html" data-type="entity-link">TrashCollectionAlert</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TRequestHandler.html" data-type="entity-link">TRequestHandler</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WeatherAlert.html" data-type="entity-link">WeatherAlert</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});