import axios from 'axios';

const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const login = async (data) => {
  try {
    const res = await axios.post(`${authURL}/login`, {
      username: data.username,
      password: data.password,
    });

    const { authToken } = res.data;

    if (authToken) {
      return { success: true, ...res.data };
    }
    return res.data;
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
};
