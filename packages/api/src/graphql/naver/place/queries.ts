import { gql } from 'graphql-request'

export const restaurantDetailsQuery = gql`
  query getRestaurants($input: RestaurantsInput) {
    restaurants(input: $input) {
      total
      items {
        id
        name
        commonAddress
        address
        category
        phone
        blogCafeReviewCount
        bookingReviewCount
        totalReviewCount
        visitorReviewCount
        visitorReviewScore
        michelinGuide {
          year
        }
      }
    }
  }
`
