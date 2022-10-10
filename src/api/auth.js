import axios from 'axios';

const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const register = async ({ username, email, password }) => {
  const { data } = await axios.post(`${authURL}/register`, {
    username,
    email,
    password,
  });

  return data;
};

export const login = async (data) => {
  const res = await axios.post(`${authURL}/login`, {
    username: data.username,
    password: data.password,
  });

  return res.data;
};

export const logout = () => {
  localStorage.removeItem('authToken');
};

export const checkPermission = async (authToken) => {
  try {
    const res = await axios.get(`${authURL}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });

    return res.data.success;
  } catch (error) {
    console.error(error);
  }
};
