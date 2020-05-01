import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <div className='App'>helllo</div>
      <TodoList />
      <AddTodo />
    </ApolloProvider>
  );
}

export default App;
