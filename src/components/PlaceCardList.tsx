import { useRecoilValue } from 'recoil'
import { placeListState } from '@/stores/place'
import { PlaceCard } from '@/components/PlaceCard'

export function PlaceCardList() {
  const places = useRecoilValue(placeListState)
  return (
    <ul className="flex flex-wrap justify-center w-2/3 mx-auto">
      {places.map((place, key) => (
        <PlaceCard key={key} {...place} />
      ))}
    </ul>
  )
}
