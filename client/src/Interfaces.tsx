export interface ITodoDataProps {
  data: {
    loading: boolean;
    todos: [
      {
        id: string;
        title: string;
      }
    ];
  };
}

