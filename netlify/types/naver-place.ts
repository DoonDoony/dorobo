type MichelinGuide = {
  year?: number
}

export type Restaurant = {
  id: string
  name: string
  commonAddress: string
  address: string
  category: string
  phone?: string
  blogCafeReviewCount: string
  bookingReviewCount: string
  totalReviewCount: string
  visitorReviewCount: string
  visitorReviewScore?: string
  michelinGuide: MichelinGuide
}

export type Restaurants = {
  total: number
  items: Restaurant[]
}
