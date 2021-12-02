import { Handler } from '@netlify/functions'
import { getPlaces } from '../api'

export const handler: Handler = async (event, context) => {
  const { query } = event.queryStringParameters!
  if (!query) {
    return {
      statusCode: 401,
    }
  }
  const places = await getPlaces(query)
  return {
    statusCode: 200,
    body: JSON.stringify(places),
  }
}
