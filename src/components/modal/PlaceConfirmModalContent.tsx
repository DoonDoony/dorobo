import { ModalButtons } from '@/layouts'
import { ModalMap } from '@/components/modal/ModalMap'
import { ModalHeader } from '@/components/modal/ModalHeader'
import { useKeywordSearch } from '@/hooks'
import { useRecoilState } from 'recoil'
import { currentPlaceState } from '@/stores'
import { getBounds, getCenter, getMarkers } from '@/utils'
import { useEffect, useState } from 'react'

export function PlaceConfirmModalContent() {
  const [currentPlace, setCurrentPlace] = useRecoilState(currentPlaceState)
  const [markers, setMarkers] = useState<Marker[]>([])
  const [bounds, setBounds] = useState<kakao.maps.LatLngBounds>()
  const [center, setCenter] = useState<kakao.maps.Coords>(
    new kakao.maps.Coords(127.0234346, 37.4979517)
  )
  const { data, isFetching } = useKeywordSearch(currentPlace.place)

  useEffect(() => {
    if (!data || isFetching) return

    const _bounds = getBounds(data)
    const _center = getCenter(_bounds)
    const _markers = getMarkers(data)
    setBounds(_bounds)
    setCenter(_center)
    setMarkers(_markers)

    setCurrentPlace(prevState => ({
      ...prevState,
      // prettier-ignore
      'center': _center,
      samplePlace: data.documents[0].place_name,
      amount: data.meta.total_count,
      x: center.getX(),
      y: center.getY(),
    }))
  }, [data, isFetching, setCurrentPlace])

  return (
    <div className="absolute flex flex-wrap w-1/3 h-1/2 justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <ModalHeader place={currentPlace.place} />
      <ModalMap
        markers={markers}
        bounds={bounds!}
        center={center}
        isFetching={isFetching}
      />
      <ModalButtons />
    </div>
  )
}
