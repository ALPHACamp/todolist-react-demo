import axios from 'axios';

const baseUrl = 'http://localhost:3004';

export const getTodos = () => {
  return axios
    .get(`${baseUrl}/todos`)
    .then((res) => res.data)
    .catch((err) => console.error('[Get Todos failed]: ', err));
};

const createTodo = () => {};

const patchTodo = () => {};

const deleteTodo = () => {};
