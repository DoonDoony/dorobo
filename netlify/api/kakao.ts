import axios from 'axios'
import { CATEGORY_GROUP_CODE } from '../consts'

const { KAKAO_REST_API_KEY } = process.env

const client = axios.create({
  baseURL: 'https://dapi.kakao.com/v2',
  headers: {
    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
  },
})

export async function getPlaces(query: string) {
  const { data } = await client.get('/local/search/keyword.json', {
    params: { query, category_group_code: CATEGORY_GROUP_CODE },
  })
  return data
}
