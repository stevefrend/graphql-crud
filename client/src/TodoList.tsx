import React, { useRef } from 'react';
import { graphql } from 'react-apollo';
import { ITodoDataProps } from './Interfaces';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { deleteTodoQuery, getTodosQuery, updateTodoQuery } from './queries';

const TodoList: React.FC = (): JSX.Element => {
  const [deleteTodo] = useMutation(deleteTodoQuery);
  const [updateTodo] = useMutation(updateTodoQuery);
  const { loading, data, refetch } = useQuery(getTodosQuery);
  // const editInputArr = useRef<HTMLInputElement[]>(null);

  console.log('render');

  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <ul>
          {data.todos.map((el, index) => (
            <li key={el.id} id={el.id}>
              {el.title}
              <button
                onClick={() => {
                  deleteTodo({ variables: { id: el.id } });
                  refetch();
                }}
              >
                Delete
              </button>
              <input id={`INPUT${el.id}`} placeholder='Enter new ToDo' />
              <button
                onClick={() => {
                  const editInput = document.querySelector(`#INPUT${el.id}`)! as HTMLInputElement;
                  if (editInput.value.length) {
                    updateTodo({
                      variables: { id: el.id, title: editInput.value },
                    });
                    editInput.value = '';
                    console.log('Inside the IF statement');
                    refetch();
                  } else {
                    console.log('Outside IF');
                  }
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default TodoList;
