import { format } from 'date-fns'
import { useRecoilValue } from 'recoil'
import { placeListState } from '@/stores'
import { downloadExcel } from '@/api'
import { useCallback } from 'react'
import FileSaver from 'file-saver'

export function DownloadButton() {
  const addedPlaces = useRecoilValue(placeListState)
  const onClick = useCallback(async () => {
    const payload = {
      places: addedPlaces.map(({ place, x, y }) => {
        return {
          place,
          x,
          y,
        }
      }),
    }
    const response = await downloadExcel(payload)
    const now = format(new Date(), 'yMd_Hms')
    const filename = `matzip_data_${now}`
    FileSaver.saveAs(response.data, filename)
  }, [addedPlaces])
  return (
    <>
      <button className="w-52 p-4 m-2 bg-purple-600 rounded-lg" onClick={onClick}>
        <span className="text-l text-white font-sans font-medium">💾 아래 목록으로 다운로드</span>
      </button>
    </>
  )
}
