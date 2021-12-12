import { handlerPath } from '@/libs/handlerResolver'

const searchFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'search',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              query: true,
            },
          },
        },
      },
    },
  ],
}

export default searchFunction
