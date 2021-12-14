import type { MultiValueQueryStringRequiredEvent } from '@/libs/apiGateway'
import { middyfy } from '@/libs/lambda'

import schema from './schema'
import { naverPlaceClient } from '@/graphql/naver/place/client'
import { zip } from 'lodash'
import { ExcelDownloadParams } from '@dorobo/shared/types'
import { sleep, toExcelFromRestaurants } from '@/utils'

const exportToExcel: MultiValueQueryStringRequiredEvent<typeof schema> = async event => {
  try {
    const { places, latitudes, longitudes }: ExcelDownloadParams = event.multiValueQueryStringParameters
    const params = zip(places, latitudes, longitudes)
    const rows = []
    for await (const [place, x, y] of params) {
      console.log(`Request: ${place}, ${x}, ${y}`)
      const restaurants = await naverPlaceClient.getRestaurants(place, x, y)
      rows.push({ [place]: restaurants })
      await sleep(1000)
    }
    const buffer = await toExcelFromRestaurants(rows)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      isBase64Encoded: true,
      body: buffer.toString('base64'),
    }
  } catch (e) {
    console.error(e)
  }
}

export const main = middyfy(exportToExcel)
