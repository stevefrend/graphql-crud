const { gql, ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const Users = require('./models/UserModel.js');
const Todos = require('./models/TodoModel.js');

//
const URI = `mongodb+srv://stevefrend:_--wC2-!TqUtsTJx@solo-vue4b.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true }, () =>
  console.log('connected to MongoDB')
);

// GraphQL Types -------------------------------------------------

const typeDefs = gql`
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
    searchTodos(searchTerm: String!): [Todo!]
  }

  type Mutation {
    addUser(username: String!): User
    addTodo(title: String!): Todo
    deleteTodo(id: ID!): Todo!
  }
`;

// GraphQL Resolvers ----------------------------------------------

const resolvers = {

  // Rate Limiter
  // Portara( { companyID: 5ejkldsaf, limit: setLimitVariable, throttle: true } );

  Query: {
    todos: () => Todos.find({}),
    users: () => Users.find({}),
    searchTodos: (parent, args) => {
      return Todos.find({}).then((res) => {
        return res.filter((todo) =>
          todo.title.toLowerCase().includes(args.searchTerm.toLowerCase())
        );
      });
    },
  },
  User: {
    todos: (parent, args) => {
      return Todos.find({ userId: parent.id });
    },
  },
  Todo: {
    user: (parent, args) => {
      return Users.findById(parent.userId, (err, result) => {
        return result;
      });
    },
  },
  Mutation: {
    addUser: (parent, args) => {
      return Users.create({ username: args.username });
    },
    addTodo: (parent, args) => {
      return Todos.create({ title: args.title });
    },
    deleteTodo: (parent, args) => {
      return Todos.findByIdAndDelete(args.id).then((result) => result);
    },
  },
};

// Apollo Server -------------------------------------------------

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`listening @ ${url}`);
});
