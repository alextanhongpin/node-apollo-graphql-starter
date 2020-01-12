import apolloServer from 'apollo-server'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'

// WARN: Remove hardcoded jwt, load from environment variables.
const JWT_SECRET = 'supersecret'

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

      const newUsers = users.filter(id => context.user.id)

      return newUsers
    }
  },
  Mutation: {
    async signupUser (root, args, context, info) {
      const {
        data: { email, name, password }
      } = args
      const newUser = {
        id: users.length + 1,
        email,
        name,
        password: await argon2.hash(password)
      }
      users.push(newUser)
      return {
        token: jwt.sign(newUser, JWT_SECRET)
      }
    },

    async loginUser (root, args, context) {
      const {
        data: { email, password }
      } = args
      const user = users.find(user => user.email === email)
      if (!user) throw new Error('email or password is invalid')

      const isMatch = await argon2.verify(user.password, password)
      if (!isMatch) throw new Error('email or password is invalid')

      return {
        token: jwt.sign(user, JWT_SECRET)
      }
    }
  }
}

export default resolvers
