import apolloServer from "apollo-server";

import typeDefs from "./schema.mjs";
import resolvers from "./resolvers.mjs";
import JwtFactory from "./auth.mjs";

const { ApolloServer } = apolloServer;

const jwtFactory = JwtFactory.default();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = jwtFactory.decodeHeader(req);
    const user = auth;
    return {
      user,
      signer: jwtFactory
      // models: {
      // User: generateUserModel(auth)
      // }
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
