type Props = {
  children: JSX.Element
}

export function PlaceConfirmModalOverlay({ children }: Props) {
  return <div className="fixed inset-0 bg-black bg-opacity-90">{children}</div>
}
