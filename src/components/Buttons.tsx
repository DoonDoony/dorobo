import { DownloadButton, PlaceListResetButton } from '@/components/index'

export function Buttons() {
  return (
    <section className="mx-auto flex m-8 justify-center">
      <DownloadButton />
      <PlaceListResetButton />
    </section>
  )
}
