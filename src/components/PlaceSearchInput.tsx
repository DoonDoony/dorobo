import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg'
import { useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { confirmModalState, currentPlaceState } from '@/stores'
import { useEffect } from 'react'

const INPUT_PLACEHOLDER = "'이태원 맛집'과 같은 키워드로 검색하세요"
type FormData = {
  place: string
}

export function PlaceSearchInput() {
  const { register, handleSubmit, reset, setFocus } = useForm<FormData>()
  const setConfirmModalState = useSetRecoilState(confirmModalState)
  const setCurrentPlace = useSetRecoilState(currentPlaceState)
  const onSubmit = ({ place }: FormData) => {
    setCurrentPlace(prevState => ({ ...prevState, place }))
    setConfirmModalState(prevState => ({ ...prevState, isOpen: true }))
    reset({ place: '' })
  }

  useEffect(() => {
    return setFocus('place')
  })

  return (
    <form
      className="relative flex mx-auto w-2/3 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="place-search" />
      <input
        type="search"
        id="place-search"
        placeholder={INPUT_PLACEHOLDER}
        className="flex-1 h-full p-4 bg-white shadow-md border-none"
        {...register('place')}
      />
      <span className="absolute p-3 inset-y-0 right-0 cursor-pointer">
        <SearchIcon className="inline text-green-300 w-6 h-6 border-none" />
      </span>
    </form>
  )
}
