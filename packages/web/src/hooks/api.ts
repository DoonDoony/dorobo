import { useQuery } from 'react-query'
import { downloadExcel, getPlaces } from '@/api'
import { isEmpty } from 'lodash'

export function useKeywordSearch(keyword: string) {
  return useQuery(['searchPlaces', keyword], () => getPlaces(keyword), {
    enabled: !isEmpty(keyword),
  })
}

type Param = {
  places: { place: string; x?: number; y?: number }[]
}

export function useDownload(places: Param) {
  return useQuery(['searchPlaces', places], () => downloadExcel(places))
}
