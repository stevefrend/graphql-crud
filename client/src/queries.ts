import { gql } from 'apollo-boost';

const getTodosQuery = gql`
  {
    todos {
      title
      id
    }
  }
`;

const addTodoQuery = gql`
  mutation($title: String!) {
    addTodo(title: $title) {
      title
    }
  }
`;

const deleteTodoQuery = gql`
  mutation($id: ID!) {
    deleteTodo(id: $id) {
      title
    }
  }
`;

const updateTodoQuery = gql`
  mutation($id: ID!, $title: String!) {
    updateTodo(id: $id, title: $title) {
      id
      title
    }
  }
`;

const searchTodosQuery = gql`
  # query(searchTerm: String!) {
  #   # searchTerm is what we are comparing in resolvers.ts : $searchTerm variable (args)
  #   searchTodos(searchTerm: $searchTerm) {
  #     title
  #   }
  # }
  mutation($searchTerm: String!) {
    searchTodos(searchTerm: $searchTerm) {
      title
    }
  }
`;

export { getTodosQuery, addTodoQuery, deleteTodoQuery, updateTodoQuery, searchTodosQuery };
