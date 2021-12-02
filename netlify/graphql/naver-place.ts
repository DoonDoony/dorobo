import { GraphQLClient } from 'graphql-request'
import { flatten, range } from 'lodash'
import { restaurantDetailsQuery } from './queries'
import { Restaurant, Restaurants } from '../types'

const FETCH_PER_PAGE = 50
const FETCH_LIMIT = FETCH_PER_PAGE

const url = 'https://pcmap-api.place.naver.com/graphql'
const client = new GraphQLClient(url)

type RestaurantDetailResponse = {
  restaurants: Restaurants
}

type _Return = {
  [key: string]: Restaurant[]
}

export async function getRestaurants(
  query: string,
  x: number,
  y: number
): Promise<_Return> {
  const offsets = range(1, FETCH_LIMIT, FETCH_PER_PAGE)
  const results: Restaurant[] = []
  for (const offset of offsets) {
    const variables = {
      input: {
        deviceType: 'pcmap',
        display: FETCH_PER_PAGE,
        isNmap: false,
        query,
        start: offset,
        x: x.toString(),
        y: y.toString(),
      },
    }
    const { restaurants } = await client.request<RestaurantDetailResponse>(
      restaurantDetailsQuery,
      variables
    )
    results.push(...restaurants.items)
  }
  return { [query]: flatten(results) }
}
