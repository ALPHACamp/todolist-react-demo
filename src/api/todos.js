import axios from 'axios';

const baseUrl = 'https://todo-list.alphacamp.io/api';

export const getTodos = (authToken) => {
  return axios
    .get(`${baseUrl}/todos`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => console.error('[Get Todos failed]: ', err));
};

export const createTodo = async (authToken, payload) => {
  const { title, isDone } = payload;

  try {
    const res = await axios.post(
      `${baseUrl}/todos`,
      {
        title,
        isDone,
      },
      {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      },
    );
    return res.data;
  } catch (err) {
    console.error('[Create Todo failed]: ', err);
  }
};

export const patchTodo = async (authToken, payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axios.patch(
      `${baseUrl}/todos/${id}`,
      {
        title,
        isDone,
      },
      {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error('[Patch Todo failed]:', error);
  }
};

export const deleteTodo = async (authToken, id) => {
  try {
    const res = await axios.delete(`${baseUrl}/todos/${id}`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return res.data;
  } catch (error) {
    console.error('[Delete Todo failed]:', error);
  }
};
