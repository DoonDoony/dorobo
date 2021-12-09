import { useSetRecoilState } from 'recoil'
import { confirmModalState, currentPlaceState } from '@/stores'

export function ModalCloseButton() {
  const setConfirmModalState = useSetRecoilState(confirmModalState)
  const setCurrentPlaceState = useSetRecoilState(currentPlaceState)
  const closeModal = () => {
    setConfirmModalState(prevState => ({ ...prevState, isOpen: false }))
    setCurrentPlaceState({ place: '' })
  }
  return (
    <>
      <button className="w-28 max-h-12 p-3 m-1 bg-gray-700 rounded-lg" onClick={closeModal}>
        <span className="text-lg text-white font-sans font-medium">❌ 닫기</span>
      </button>
    </>
  )
}
