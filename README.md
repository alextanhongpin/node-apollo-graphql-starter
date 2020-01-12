# node-apollo-graphql-starter
Basic starter for Graphql with Apollo Server

## Sign Up Mutation

```graphql
mutation {
  signupUser(data: {
    email: "john.doe@mail.com",
    password: "123456",
    name: "JohnDoe"
  }) {
    token
  }
}
```
