import Modal from 'react-modal'
import { PlaceConfirmModalContent, PlaceConfirmModalOverlay } from '@/components'
import { useRecoilValue } from 'recoil'
import { confirmModalState } from '@/stores'

Modal.setAppElement('#root')

export function PlaceConfirmModal() {
  const state = useRecoilValue(confirmModalState)
  return (
    <>
      <Modal
        isOpen={state.isOpen}
        overlayElement={(_, children) => <PlaceConfirmModalOverlay>{children}</PlaceConfirmModalOverlay>}
        contentElement={() => <PlaceConfirmModalContent />}
      />
    </>
  )
}
