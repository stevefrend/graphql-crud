import React, { useRef } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { addTodoQuery, getTodosQuery, searchTodosQuery } from './queries';

const AddTodo = (): JSX.Element => {
  const [addTodo] = useMutation(addTodoQuery);
  const [searchTodos, { data, loading }] = useMutation(searchTodosQuery);
  const { refetch } = useQuery(getTodosQuery);
  const inputRef = useRef('');

  return (
    <div id='main-div'>
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
        {/* ADD */}
        <button type='submit'>Submit</button>

        {/* SEARCH */}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (inputRef.current.value.length) {
              searchTodos({ variables: { searchTerm: inputRef.current.value } });
            }
          }}
        >
          Search
        </button>
        <ul>
          {data &&
            data.searchTodos.map((el) => {
              return <li>{el.title}</li>;
            })}
        </ul>
      </form>
    </div>
  );
};

export default AddTodo;