const { gql } = require('apollo-server');

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    todos: [Todo!]
  }

  type Todo {
    title: String!
    user: User!
    userId: ID!
    id: ID!
  }

  type Query {
    users: [User!]
    todos: [Todo!]
  }

  type Mutation {
    addUser(username: String!): User
    addTodo(title: String!): Todo
    deleteTodo(id: ID!): Todo!
    updateTodo(id: ID!, title: String!): Todo!
    searchTodos(searchTerm: String!): [Todo!]
  }
`;
