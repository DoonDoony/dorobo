import type { QueryStringRequiredEvent } from '@/libs/apiGateway'
import { formatJSONResponse } from '@/libs/apiGateway'
import { middyfy } from '@/libs/lambda'

import schema from './schema'
import { getPlaces } from '@/api'
import { CATEGORY_GROUP_CODE } from '@/consts'

const search: QueryStringRequiredEvent<typeof schema> = async event => {
  const { query } = event.queryStringParameters
  const places = await getPlaces({ query, category_group_code: CATEGORY_GROUP_CODE })
  return formatJSONResponse(places)
}

export const main = middyfy(search)
