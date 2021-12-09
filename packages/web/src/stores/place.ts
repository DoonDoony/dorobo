import { atom } from 'recoil'

type Location = {
  place: string
  samplePlace?: string
  amount?: number
  center?: kakao.maps.Coords
  x?: number
  y?: number
}

export const placeListState = atom<Location[]>({
  key: 'locationListState',
  default: [],
})

export const currentPlaceState = atom<Location>({
  key: 'currentLocation',
  default: {
    place: '',
  },
})
