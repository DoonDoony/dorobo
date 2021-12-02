import Modal from 'react-modal'
import { PlaceConfirmModalContent } from '@/components/modal/PlaceConfirmModalContent'
import { PlaceConfirmModalOverlay } from '@/components/modal/PlaceConfirmModalOverlay'
import { useRecoilValue } from 'recoil'
import { confirmModalState } from '@/stores'

Modal.setAppElement('#root')

export function PlaceConfirmModal() {
  const state = useRecoilValue(confirmModalState)
  return (
    <>
      <Modal
        isOpen={state.isOpen}
        overlayElement={(props, children) => (
          <PlaceConfirmModalOverlay children={children} />
        )}
        contentElement={(props, children) => <PlaceConfirmModalContent />}
      />
    </>
  )
}
