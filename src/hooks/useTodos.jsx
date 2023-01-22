import { useState } from 'react';
import { getTodos, createTodo } from '../api/todos';

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const createTodos = async (todoItem) => {
    try {
      const data = await createTodo({
        title: todoItem,
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();

        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);

  return {
    todos,
    create: createTodos,
  };
};

export default useTodos;
