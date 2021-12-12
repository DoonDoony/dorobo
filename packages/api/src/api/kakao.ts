import axios from 'axios'
import { KakaoPlaceSearchParams, KakaoPlaceSearchResponse } from '@dorobo/shared/types'

const { KAKAO_REST_API_KEY } = process.env

const client = axios.create({
  baseURL: 'https://dapi.kakao.com/v2',
  headers: {
    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
  },
})

export async function getPlaces(params: KakaoPlaceSearchParams): Promise<KakaoPlaceSearchResponse> {
  const { data } = await client.get('/local/search/keyword.json', {
    params,
  })
  return data
}
