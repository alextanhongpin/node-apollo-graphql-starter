import apolloServer from 'apollo-server'
import argon2 from 'argon2'

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

const users = []

const resolvers = {
  Query: {
    books: () => books,
    users: (parent, args, context) => {
      if (!context.user) return null

      const newUsers = users
        .filter(id => context.user.id)
        .map(user => {
          user.password = null
          return user
        })

      return newUsers
    }
  },
  Mutation: {
    async signupUser (root, args, context, info) {
      const {
        data: { email, name, password }
      } = args
      const { signer } = context
      const newUser = {
        id: users.length + 1,
        email,
        name,
        password: await argon2.hash(password)
      }
      users.push(newUser)
      return {
        token: signer.sign(newUser)
      }
    },

    async loginUser (root, args, context) {
      const {
        data: { email, password }
      } = args
      const { signer } = context
      const user = users.find(user => user.email === email)
      if (!user) throw new Error('email or password is invalid')

      const isMatch = await argon2.verify(user.password, password)
      if (!isMatch) throw new Error('email or password is invalid')

      return {
        token: signer.sign(user)
      }
    }
  }


export default resolvers
