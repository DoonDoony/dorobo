export type PlaceSearchParams = {
  query: string
}

export type PlaceSearchResponse = {
  documents: Array<{ x: string; y: string; place_name: string }>
  meta: {
    total_count: number
  }
}

export type ExcelDownloadParams = {
  places: string[]
  latitudes: (number | undefined)[]
  longitudes: (number | undefined)[]
}
