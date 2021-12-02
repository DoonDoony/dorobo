import { atom } from 'recoil'

type SearchState = string

export const searchState = atom<SearchState>({
  key: 'SearchState',
  default: '',
})
