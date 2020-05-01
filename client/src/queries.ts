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

export { getTodosQuery, addTodoQuery, deleteTodoQuery, updateTodoQuery };
