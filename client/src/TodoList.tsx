import React from 'react';
import { graphql } from 'react-apollo';
import { ITodoDataProps } from './Interfaces';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { deleteTodoQuery, getTodosQuery } from './queries';

const TodoList: React.FC = (): JSX.Element => {
  const [deleteTodo] = useMutation(deleteTodoQuery);
  const { loading, data, refetch } = useQuery(getTodosQuery);

  console.log('render');

  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <ul>
          {data.todos.map((el) => (
            <li key={el.id} id={el.id}>
              {el.title}
              <button
                onClick={() => {
                  deleteTodo({ variables: { id: el.id } });
                  // refetch();
                  let item: any = document.getElementById(`${el.id}`);
                  item.remove();
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default TodoList;
