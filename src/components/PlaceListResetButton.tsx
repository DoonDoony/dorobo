import { useSetRecoilState } from 'recoil'
import { placeListState } from '@/stores'

export function PlaceListResetButton() {
  const setPlaceList = useSetRecoilState(placeListState)

  const onClick = () => {
    setPlaceList([])
  }
  return (
    <>
      <button className="w-52 p-4 m-2 bg-gray-700 rounded-lg" onClick={onClick}>
        <span className="text-l text-white font-sans font-medium">
          🗑 목록 초기화
        </span>
      </button>
    </>
  )
}
