import { makeSchema } from '@nexus/schema'
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema"
import * as types from './types'

// TODO: remove any type
export const schema: any = makeSchema({
  types,
  plugins: [nexusSchemaPrisma()],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'client',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
})
