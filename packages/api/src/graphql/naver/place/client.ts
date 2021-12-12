import { GraphQLClient } from 'graphql-request'
import { NAVER_PLACE_GRAPHQL_URL } from '@/consts'
import { flatten, range } from 'lodash'
import { Restaurant, Restaurants, RestaurantsInput } from '@dorobo/shared/types'
import { restaurantDetailsQuery } from '@/graphql/naver/place/queries'

type RestaurantsVariable = {
  input: RestaurantsInput
}

type RestaurantsResponse = {
  data: {
    restaurants: Restaurants
  }
}

class NaverPlaceGraphQLClient extends GraphQLClient {
  static readonly FETCH_PER_PAGE = 50
  static readonly FETCH_LIMIT = 200 + this.FETCH_PER_PAGE

  constructor() {
    super(NAVER_PLACE_GRAPHQL_URL)
  }
  public async getRestaurants(query: string, x: number, y: number) {
    const offsets = range(1, NaverPlaceGraphQLClient.FETCH_LIMIT, NaverPlaceGraphQLClient.FETCH_PER_PAGE)
    const results: Restaurant[] = []
    for (const offset of offsets) {
      const variables: RestaurantsVariable = {
        input: {
          deviceType: 'pcmap',
          display: NaverPlaceGraphQLClient.FETCH_PER_PAGE,
          isNmap: false,
          query,
          start: offset,
          x: x.toString(),
          y: y.toString(),
        },
      }
      const { data } = await this.request<RestaurantsResponse>(restaurantDetailsQuery, variables)
      results.push(...data.restaurants.items)
    }
    return flatten(results)
  }
}

export const naverPlaceClient = new NaverPlaceGraphQLClient()
