import { GraphQLServer } from 'graphql-yoga'
import { permissions } from './permissions'
import { schema } from './schema'
import { createContext } from './context'
import './generated/nexus'
new GraphQLServer({
  schema,
  context: createContext,
  // TODO: was causing issue: Not Auth! fix this l8er
  // middlewares: [permissions],
}).start(() =>
  console.log(
    `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-auth#using-the-graphql-api`,
  ),
)
