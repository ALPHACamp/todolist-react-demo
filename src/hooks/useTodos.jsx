import { useState, useEffect } from 'react';
import { getTodos, createTodo, patchTodo } from '../api/todos';

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = async (todoItem) => {
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

  const updateTodo = async (newTodoItem) => {
    const currentTodo = todos.find((todo) => todo.id === newTodoItem.id);
    try {
      await patchTodo({ ...currentTodo, ...newTodoItem });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === newTodoItem.id) {
            return {
              ...todo,
              ...newTodoItem,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  const changeMode = (newTodoItem) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === newTodoItem.id) {
          return {
            ...todo,
            ...newTodoItem,
          };
        }
        return { ...todo, isEdit: false };
      });
    });
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
    create: addTodo,
    update: updateTodo,
    changeMode,
  };
};

export default useTodos;
