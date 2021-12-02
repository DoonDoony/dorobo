import axios from 'axios'

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
  baseURL: '/.netlify/functions',
})

export async function getPlaces(query: string): Promise<KeywordSearchResponse> {
  const { data } = await client.get('/search', {
    params: { query },
  })
  return data
}

type Places = {
  places: { place: string; x?: number; y?: number }[]
}

export async function downloadExcel(places: Places) {
  return await client.post('/export', places, { responseType: 'blob' })
}
