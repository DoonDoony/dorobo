import type { MultiValueQueryStringRequiredEvent } from '@/libs/apiGateway'
import { middyfy } from '@/libs/lambda'

import schema from './schema'
import { naverPlaceClient } from '@/graphql/naver/place/client'
import { zip } from 'lodash'
import { ExcelDownloadParams } from '@dorobo/shared/types'
import { toExcelFromRestaurants } from '@/utils'

const exportToExcel: MultiValueQueryStringRequiredEvent<typeof schema> = async event => {
  const { places, latitudes, longitudes }: ExcelDownloadParams = event.multiValueQueryStringParameters
  const params = zip(places, latitudes, longitudes)
  const rows = await Promise.all(
    params.map(async ([place, x, y]) => {
      const restaurants = await naverPlaceClient.getRestaurants(place, x, y)
      return { [place]: restaurants }
    })
  )
  const buffer = await toExcelFromRestaurants(rows)
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    isBase64Encoded: true,
    body: buffer.toString('base64'),
  }
}

export const main = middyfy(exportToExcel)
