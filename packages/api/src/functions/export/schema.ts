export default {
  type: 'object',
  properties: {
    place: { type: 'string' },
    x: { type: 'number' },
    y: { type: 'number' },
  },
  required: ['place', 'x', 'y'],
} as const
