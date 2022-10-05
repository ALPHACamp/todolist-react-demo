import axios from 'axios';

const baseUrl = 'http://localhost:3004';

export const getTodos = () => {
  return axios
    .get(`${baseUrl}/todos`)
    .then((res) => res.data)
    .catch((err) => console.error('[Get Todos failed]: ', err));
};

export const createTodo = async (payload) => {
  const { title, isDone } = payload;

  try {
    const res = await axios.post(`${baseUrl}/todos`, {
      title,
      isDone,
    });
    return res.data;
  } catch (err) {
    console.error('[Create Todo failed]: ', err);
  }
};

export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axios.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });

    return res.data;
  } catch (error) {
    console.error('[Patch Todo failed]:', error);
  }
};

const deleteTodo = () => {};
