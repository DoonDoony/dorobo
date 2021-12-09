import { ReactComponent as SearchIconSvg } from '@/assets/icons/search.svg'
import * as React from 'react'

type Props = {
  onClick: (e?: React.BaseSyntheticEvent) => Promise<void>
}

export function SearchIcon({ onClick }: Props) {
  return (
    <>
      <span className="absolute p-3 inset-y-0 right-0 cursor-pointer" onClick={onClick}>
        <SearchIconSvg className="inline text-green-300 w-6 h-6 border-none" />
      </span>
    </>
  )
}
