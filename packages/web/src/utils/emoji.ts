import { TABEMONO_EMOJIS } from '@/consts'
import { sample } from 'lodash'

export function getTabemonoEmoji() {
  return sample(TABEMONO_EMOJIS)
}
