import type { QueryStringRequiredEvent } from '@/libs/apiGateway'
import { formatJSONResponse } from '@/libs/apiGateway'
import { middyfy } from '@/libs/lambda'

import schema from './schema'
import { naverPlaceClient } from '@/graphql/naver/place/client'

const exportToExcel: QueryStringRequiredEvent<typeof schema> = async event => {
  const { place: query, x, y } = event.queryStringParameters
  const restaurants = await naverPlaceClient.getRestaurants(query, x, y)
  return formatJSONResponse({
    message: `Hello ${event.queryStringParameters}, welcome to the exciting Serverless world!`,
    event,
  })
}

export const main = middyfy(exportToExcel)
