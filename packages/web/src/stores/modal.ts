import { atom } from 'recoil'
import { OnAfterOpenCallback } from 'react-modal'

type ConfirmModalState = {
  isOpen: boolean
  onAfterOpen: OnAfterOpenCallback
}

export const confirmModalState = atom<ConfirmModalState>({
  key: 'modalState',
  default: {
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onAfterOpen: () => {},
  },
})
