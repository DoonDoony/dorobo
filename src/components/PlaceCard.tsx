import { getTabemonoEmoji } from '@/utils'
import { useMemo } from 'react'
import { inRange } from 'lodash'

type Props = {
  place: string
  samplePlace?: string
  amount?: number
}

function getGreaterThan(amount: number) {
  switch (true) {
    case inRange(amount, 0, 9):
      return `${amount}건`
    case inRange(amount, 10, 99):
      return `10건 이상`
    default:
      return '100건 이상'
  }
}

export function PlaceCard({ place, samplePlace, amount }: Props) {
  const emoji = useMemo(() => getTabemonoEmoji(), [])
  return (
    <li className="flex flex-wrap w-64 h-48 m-2 p-6 bg-white rounded-lg shadow-lg items-center">
      <h3 className="self-start text-xl font-bold font-sans text-gray-700">
        {emoji} {place}
      </h3>
      <p className="self-start font-light font-sans text-sm text-gray-600">
        {amount ? `${samplePlace} 외 ${getGreaterThan(amount)}` : ''}
      </p>
      <p className="self-end font-light font-sans text-xs text-gray-400">
        💾 마지막 다운로드: 2021년 11월 29일
      </p>
    </li>
  )
}
