import { format } from 'date-fns'
import { useRecoilValue } from 'recoil'
import { placeListState } from '@/stores'
import { useCallback, useEffect, useState } from 'react'
import FileSaver from 'file-saver'
import { map } from 'lodash'
import { useDownload } from '@/hooks'
import { ExcelDownloadParams } from '@dorobo/shared/types'
import { SpinIcon } from '@/components'

const defaultPayload = {
  places: [],
  latitudes: [],
  longitudes: [],
}

export function DownloadButton() {
  const [payload, setPayload] = useState<ExcelDownloadParams>(defaultPayload)
  const { refetch, isFetching } = useDownload(payload, false)
  const addedPlaces = useRecoilValue(placeListState)

  useEffect(() => {
    setPayload({
      places: map(addedPlaces, 'place'),
      latitudes: map(addedPlaces, 'x'),
      longitudes: map(addedPlaces, 'y'),
    })
  }, [addedPlaces])

  const onClick = useCallback(async () => {
    const { data } = await refetch()
    if (!data) return
    const now = format(new Date(), 'yMd_Hms')
    const filename = `matzip_data_${now}`
    FileSaver.saveAs(data.data, filename)
  }, [refetch])

  return (
    <>
      <button
        className="flex justify-center items-center w-52 p-4 m-2 bg-purple-600 rounded-lg"
        onClick={onClick}
        disabled={isFetching}
      >
        {isFetching ? (
          <>
            <SpinIcon />
            <span className="text-l text-white font-sans font-medium">다운로드 중 입니다...</span>
          </>
        ) : (
          <span className="text-l text-white font-sans font-medium">💾 아래 목록으로 다운로드</span>
        )}
      </button>
    </>
  )
}
