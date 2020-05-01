const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const Users = require('./models/UserModel.js');
const Todos = require('./models/TodoModel.js');
import { typeDefs } from './types';
import { resolvers } from './resolvers';

// Mongo Connection
const URI = `mongodb+srv://stevefrend:_--wC2-!TqUtsTJx@solo-vue4b.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true }, () =>
  console.log('connected to MongoDB')
);

// Apollo Connection
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Local Port
server.listen().then(({ url }) => {
  console.log(`listening @ ${url}`);
});
