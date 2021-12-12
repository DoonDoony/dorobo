import { handlerPath } from '@/libs/handlerResolver'

const helloFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'export',
        request: {
          parameters: {
            querystrings: {
              place: true,
              x: true,
              y: true,
            },
          },
        },
      },
    },
  ],
}

export default helloFunction
