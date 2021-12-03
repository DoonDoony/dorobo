import { Handler } from '@netlify/functions'
import { getRestaurants } from '../graphql/naver-place'
import { toExcelFromFromRestaurants } from '../utils'
import { mapSeries } from 'bluebird'
import { Restaurant } from '../types'

type Place = {
  x: number
  y: number
  place: string
}

type Payload = {
  places: Place[]
}

export const handler: Handler = async (event, context) => {
  const payload: Payload = JSON.parse(event.body!)
  const rows = await mapSeries(payload.places, ({ x, y, place }) => {
    return getRestaurants(place, x, y)
  })
  // const rows = await Promise.all(
  //   payload.places.map(async ({ x, y, place }) => {
  //     return await getRestaurants(place, x, y)
  //   })
  // )

  const buffer = await toExcelFromFromRestaurants(rows)

  return {
    statusCode: 200,
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    isBase64Encoded: true,
    body: buffer.toString('base64'),
  }
}
