export default {
  type: 'object',
  properties: {
    places: { type: 'array', items: { type: 'string' } },
    latitudes: { type: 'array', items: { type: 'number' } },
    longitudes: { type: 'array', items: { type: 'number' } },
  },
  required: ['places', 'latitudes', 'longitudes'],
} as const
