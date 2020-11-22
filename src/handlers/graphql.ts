import { GraphQLServerLambda } from 'graphql-yoga'
import { permissions } from '../permissions'
import { schema } from '../schema'
import { createContext } from '../context'
// const typeDefs = `
// type Query {
//   hello(name: String): String
// }
// `

// const resolvers = {
//   Query: {
//     hello: (_, { name }) => `Hello ${name || 'world'}`,
//   },
// }

const lambda = new GraphQLServerLambda({
  schema,
  context: createContext,
  middlewares: [permissions],
//   typeDefs,
//   resolvers,
})

exports.graphqlHandler = lambda.graphqlHandler
exports.playground = lambda.playgroundHandler
