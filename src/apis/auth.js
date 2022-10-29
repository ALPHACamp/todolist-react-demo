import axios from 'axios';

const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const login = async (data) => {
  try {
    const res = await axios.post(`${authURL}/login`, {
      username: data.username,
      password: data.password,
    });

    const { authToken, user } = res.data;

    if (authToken) {
      return res.data;
    }

    throw new Error(res.data);
  } catch (error) {
    return error;
  }
};
