import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import type { FromSchema } from 'json-schema-to-ts'

type HttpEvent<S, K extends keyof APIGatewayProxyEvent> = Omit<APIGatewayProxyEvent, K> & Record<K, FromSchema<S>>

export type QueryStringRequiredEvent<S> = Handler<HttpEvent<S, 'queryStringParameters'>, APIGatewayProxyResult>
export type MultiValueQueryStringRequiredEvent<S> = Handler<
  HttpEvent<S, 'multiValueQueryStringParameters'>,
  APIGatewayProxyResult
>
export type PathParameterRequiredEvent<S> = Handler<HttpEvent<S, 'pathParameters'>, APIGatewayProxyResult>
export type BodyRequiredEvent<S> = Handler<HttpEvent<S, 'body'>, APIGatewayProxyResult>
export type NoneRequiredEvent = Handler<APIGatewayProxyEvent, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}
