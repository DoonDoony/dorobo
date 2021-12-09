type Props = {
  place: string
}

export function ModalHeader({ place }: Props) {
  const placeName = `'${place}'` || ''
  return (
    <h3 className="w-full text-2xl text-white text-center font-sans font-semibold">
      {placeName} 의 위치를 확인해 주세요 👀
    </h3>
  )
}
