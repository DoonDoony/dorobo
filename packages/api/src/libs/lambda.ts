import middy from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser'
import cors from '@middy/http-cors'
import { ALLOWED_ORIGIN } from '@/consts'

export const middyfy = handler => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(
      cors({
        credentials: true,
        origin: ALLOWED_ORIGIN,
      })
    )
}
