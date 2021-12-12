export type RestaurantsInput = {
  deviceType: 'pcmap'
  display: number
  isNmap: boolean
  query: string
  start: number
  x: string
  y: string
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
  michelinGuide?: {
    year: string
  }
}

export type Restaurants = {
  total: number
  items: Restaurant[]
}
