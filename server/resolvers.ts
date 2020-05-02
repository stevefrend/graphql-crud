const Users = require('./models/UserModel.js');
const Todos = require('./models/TodoModel.js');

export const resolvers = {
  // Rate Limiter
  // Portara( { companyID: 5ejkldsaf, limit: setLimitVariable, throttle: true } );

  Query: {
    todos: () => Todos.find({}),
    users: () => Users.find({}),
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
      return Todos.findByIdAndDelete(args.id, { useFindAndModify: false }).then((result) => result);
    },
    updateTodo: (parent, args) => {
      return Todos.findByIdAndUpdate(
        args.id,
        { title: args.title },
        { useFindAndModify: false }
      ).then((result) => result);
    },
    searchTodos: (parent, args) => {
      console.log(args);
      return Todos.find({}).then((res) => {
        return res.filter((todo) =>
          todo.title.toLowerCase().includes(args.searchTerm.toLowerCase())
        );
      });
    },
  },
};
