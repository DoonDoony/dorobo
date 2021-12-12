import { useQuery } from 'react-query'
import { downloadExcel, getPlaces } from '@/api'
import { isEmpty } from 'lodash'
import { ExcelDownloadParams } from '@dorobo/shared/types'

export function useKeywordSearch(keyword: string) {
  return useQuery(['searchPlaces', keyword], () => getPlaces(keyword), {
    enabled: !isEmpty(keyword),
  })
}

export function useDownload(params: ExcelDownloadParams, enabled = false) {
  return useQuery(['searchPlaces', params], () => downloadExcel(params), { enabled })
}
