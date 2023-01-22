import { useState } from 'react';
import { getTodos } from '../api/todos';

const useTodos = () => {
  const [todos, setTodos] = useState([]);

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
  };
};

export default useTodos;
