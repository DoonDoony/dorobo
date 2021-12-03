import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

type Props = {
  center: kakao.maps.Coords
  markers: Marker[]
  bounds: kakao.maps.LatLngBounds
  isFetching: boolean
}

export function ModalMap({ center, markers, bounds, isFetching }: Props) {
  // KAKAO MAP state
  const [map, setMap] = useState<kakao.maps.Map>()
  const [info, setInfo] = useState<Marker>()

  useEffect(() => {
    if (!map) return

    map?.setCenter(center)
    map?.setBounds(bounds)
  }, [map, center, bounds])

  if (isFetching) {
    return (
      <div className="flex m-4 w-full h-600 bg-black justify-center">
        <div className="self-center font-sans font-semibold text-white text-lg">
          지도를 불러오는 중입니다 <span className="animate-spin">🤔</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <Map
        center={{ lat: center.getY(), lng: center.getX() }}
        style={{ width: '100%', height: '600px' }}
        onCreate={setMap}
        className="transition delay-150 duration-300 ease-in-out"
      >
        {markers?.map(marker => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info?.content === marker.content && (
              <div style={{ color: '#000' }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
    </>
  )
}
