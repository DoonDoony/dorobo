type Document = {
  x: string
  y: string
  place_name: string
}
type BoundsData = {
  documents: Document[]
}

export function getCenter(bounds: kakao.maps.LatLngBounds) {
  const ne = bounds.getNorthEast()
  const sw = bounds.getSouthWest()
  const x = (sw.getLat() + ne.getLat()) / 2
  const y = (sw.getLng() + ne.getLng()) / 2
  return new kakao.maps.Coords(x, y)
}

export function getBounds(data: BoundsData): kakao.maps.LatLngBounds {
  const bounds = new kakao.maps.LatLngBounds()
  data.documents.forEach(({ x, y }) => {
    bounds.extend(new kakao.maps.LatLng(parseFloat(y), parseFloat(x)))
  })
  return bounds
}

export function getMarkers(data: BoundsData): Marker[] {
  const markers: Marker[] = []
  data.documents.forEach(({ x, y, place_name: content }) => {
    markers.push({
      position: { lat: parseFloat(y), lng: parseFloat(x) },
      content,
    })
  })
  return markers
}
