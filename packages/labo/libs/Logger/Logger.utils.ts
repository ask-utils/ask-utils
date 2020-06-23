/**
 * @see https://github.com/getndazn/dazn-lambda-powertools/blob/master/packages/lambda-powertools-logger/index.js#L14
 * @see https://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html
 */
export const AWSLambdaEnvContext = {
    awsRegion: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION,
    functionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
    functionVersion: process.env.AWS_LAMBDA_FUNCTION_VERSION,
    functionMemorySize: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
    environment: process.env.ENVIRONMENT || process.env.STAGE // convention in our functions
}

/**
 * Check the env value is the env is in AWS Lambda
 */
export const isInAWSLambda = (): boolean => {
    return !!(process.env.AWS_LAMBDA_FUNCTION_NAME)
}
