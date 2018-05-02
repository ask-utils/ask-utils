const handlerInput = {
  'requestEnvelope': {
    'version': '1.0',
    'session': {
      'new': false,
      'sessionId': 'amzn1.echo-api.session.xxxxxxxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx',
      'application': {
        'applicationId': 'amzn1.ask.skill.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
      },
      'user': {
        'userId': 'amzn1.ask.account.xxxxx'
      }
    },
    'context': {
      'AudioPlayer': {
        'playerActivity': 'IDLE'
      },
      'Display': {
        'token': ''
      },
      'System': {
        'application': {
          'applicationId': 'amzn1.ask.skill.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
        },
        'user': {
          'userId': 'amzn1.ask.account.xxxxx'
        },
        'device': {
          'deviceId': 'amzn1.ask.device.xxxxx',
          'supportedInterfaces': {
            'AudioPlayer': {},
            'Display': {
              'templateVersion': '1.0',
              'markupVersion': '1.0'
            }
          }
        },
        'apiEndpoint': 'https://api.amazonalexa.com',
        'apiAccessToken': 'xxxxxxxx'
      }
    },
    'request': {
      'type': 'IntentRequest',
      'requestId': 'amzn1.echo-api.request.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      'timestamp': '2018-05-02T00:18:57Z',
      'locale': 'ja-JP',
      'intent': {
        'name': 'HelloWorldIntent',
        'confirmationStatus': 'NONE',
        'slots': {
          'date': {
            'name': 'date',
            'value': '2018-05-07',
            'confirmationStatus': 'NONE'
          }
        }
      }
    }
  },
  'context': {
    'callbackWaitsForEmptyEventLoop': true,
    'logGroupName': '/aws/lambda/ask-sdk-example-skill',
    'logStreamName': '2018/05/02/[$LATEST]xxxxxxxxxxxxx',
    'functionName': 'ask-sdk-example-skill',
    'memoryLimitInMB': '128',
    'functionVersion': '$LATEST',
    'invokeid': 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    'awsRequestId': 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    'invokedFunctionArn': 'arn:aws:lambda:us-east-1:xxxxxxxxxxxx:function:ask-sdk-example-skill'
  },
  'attributesManager': {},
  'responseBuilder': {}
}
module.exports.handlerInput = handlerInput
