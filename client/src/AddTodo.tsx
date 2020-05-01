import React, { useRef } from 'react';
import { graphql } from 'react-apollo';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { addTodoQuery, getTodosQuery } from './queries';

const AddTodo = (): JSX.Element => {
  const [addTodo] = useMutation(addTodoQuery);
  const { refetch } = useQuery(getTodosQuery);
  const inputRef = useRef();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputRef.current.value.length) {
            addTodo({ variables: { title: inputRef.current.value } });
            refetch();
            inputRef.current.value = '';
          }
        }}
      >
        <input type='text' ref={inputRef} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default AddTodo;
