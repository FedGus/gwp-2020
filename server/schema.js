module.exports = `
type User {
  id: ID!
  name: String!
  createdAt: String!
  updatedAt: String!
}

type Query { 
  users: [User]! 
  user(id: ID!): User
}

type Mutation {
  createUser(name: String!): User!
  deleteUser(id: ID!): Int!
  updateUser(name: String!, id: ID!): [Int]!
}
`;