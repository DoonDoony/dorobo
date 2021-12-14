import { handlerPath } from '@/libs/handlerResolver'

const exportToExcelFunction = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      timeout: 30,
      http: {
        method: 'get',
        path: 'export',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              places: true,
              latitudes: true,
              longitudes: true,
            },
          },
        },
      },
    },
  ],
}

export default exportToExcelFunction
