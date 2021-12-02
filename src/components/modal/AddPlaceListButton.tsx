import { useRecoilState, useSetRecoilState } from 'recoil'
import { confirmModalState, currentPlaceState, placeListState } from '@/stores'

export function AddPlaceListButton() {
  const setPlaces = useSetRecoilState(placeListState)
  const [currentPlace, setCurrentPlace] = useRecoilState(currentPlaceState)
  const setConfirmModalState = useSetRecoilState(confirmModalState)
  const onClick = () => {
    setPlaces(prevState => [...prevState, currentPlace])
    setCurrentPlace({ place: '' })
    setConfirmModalState(prevState => ({ ...prevState, isOpen: false }))
  }
  return (
    <>
      <button
        className="w-28 max-h-12 p-3 m-1 bg-purple-600 rounded-lg"
        onClick={onClick}
      >
        <span className="text-lg text-white font-sans font-medium">
          💾 추가
        </span>
      </button>
    </>
  )
}
