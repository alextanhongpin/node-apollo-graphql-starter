const { ApolloServer, gql } = require('apollo-server')

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
]

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  
  type Query {
    books: [Book]
  }
`

const resolvers = {
  Query: {
    books: () => books
  }
}

function getUser (token) {
  return {
    id: 1,
    roles: ['user', 'admin']
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Get the user token from the headers.
    const token = req.headers.authorization || ''

    // Try to retrieve a user with the token.
    const user = getUser(token)
    if (!user) throw new Error('you must be logged in')

    // Add the user to the context.
    return { user }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
