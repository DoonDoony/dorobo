import { Header } from '@/layouts/Header'
import { Buttons, PlaceConfirmModal, PlaceCardList, PlaceSearchInput } from '@/components'
import { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useRecoilValue } from 'recoil'
import { placeListState } from '@/stores'

export function HomePage() {
  const placeList = useRecoilValue(placeListState)
  // Ask only if there are added places
  useEffect(() => {
    if (!isEmpty(placeList))
      window.addEventListener('beforeunload', event => {
        event.preventDefault()
        event.returnValue = ''
      })
  }, [placeList])
  return (
    <>
      <Header />
      <PlaceSearchInput />
      <Buttons />
      <PlaceCardList />
      <PlaceConfirmModal />
    </>
  )
}
