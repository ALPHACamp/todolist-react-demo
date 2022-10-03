import axios from 'axios';

const baseUrl = 'http://localhost:3004';

export const getTodos = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`);
    return res.data;
  } catch (error) {
    console.error('[Get Todos failed]: ', error);
  }
};

const createTodo = () => {};

const patchTodo = () => {};

const deleteTodo = () => {};
