import axios from 'axios'
import queryString from 'query-string'
import { ExcelDownloadParams } from '@dorobo/shared/types'

type Document = {
  x: string
  y: string
  place_name: string
}
type KeywordSearchResponse = {
  documents: Document[]
  meta: {
    total_count: number
  }
}

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

export async function getPlaces(query: string): Promise<KeywordSearchResponse> {
  const { data } = await client.get('/search', {
    params: { query },
  })
  return data
}

export async function downloadExcel(params: ExcelDownloadParams) {
  return await client.get<Blob>('/export', {
    headers: {
      Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    params,
    responseType: 'blob',
    paramsSerializer: params => {
      return queryString.stringify(params)
    },
  })
}
