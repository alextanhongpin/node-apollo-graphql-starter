import apolloServer from 'apollo-server'

import typeDefs from './schema.mjs'
import resolvers from './resolvers.mjs'
import { decodedToken } from './auth.mjs'

const { ApolloServer } = apolloServer

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = decodedToken(req)
    const user = auth
    return {
      user
      // models: {
      // User: generateUserModel(auth)
      // }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
