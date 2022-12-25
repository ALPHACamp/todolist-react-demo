import { screen, fireEvent, waitFor, render } from '@testing-library/react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as jwt from 'jsonwebtoken';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import * as auth from '../api/auth';

const TestLoginComponent = () => {
  const { isAuthenticated, currentMember, login, logout } = useAuth();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <span>{isAuthenticated ? 'have permission' : 'can not access'}</span>
      <span>{currentMember ? currentMember?.name : 'no member'}</span>
      <input
        data-testid="username-input"
        value={username}
        onChange={(event) => setUserName(event.target.value)}
      ></input>
      <input
        data-testid="password-input"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      ></input>
      <button
        data-testid="login-button"
        onClick={() => login?.({ username, password })}
      >
        login
      </button>
      <button data-testid="logout-button" onClick={() => logout?.()}>
        logout
      </button>
    </div>
  );
};

const TestRegisterComponent = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, currentMember, register } = useAuth();

  return (
    <div>
      <span>{isAuthenticated ? 'have permission' : 'can not access'}</span>
      <span>
        {currentMember ? `Hello ${currentMember?.name} ` : 'no member'}
      </span>
      <input
        data-testid="email-input"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      ></input>
      <input
        data-testid="username-input"
        value={username}
        onChange={(event) => setUserName(event.target.value)}
      ></input>
      <input
        data-testid="password-input"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      ></input>
      <button
        data-testid="register-button"
        onClick={() => register?.({ username, email, password })}
      >
        register
      </button>
    </div>
  );
};

describe('User can register', () => {
  test('can register', async () => {
    jest
      .spyOn(auth, 'register')
      .mockImplementation(({ username, email, password }) =>
        Promise.resolve(true),
      );
    jest.spyOn(jwt, 'decode').mockImplementation((token) => ({
      sub: 'mock-id',
      name: 'mock-user',
    }));
    jest
      .spyOn(auth, 'checkPermission')
      .mockImplementation((token) => Promise.resolve(true));

    render(
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AuthProvider>
          <TestRegisterComponent />
        </AuthProvider>
      </BrowserRouter>,
    );
    screen.getByTestId('email-input').value = 'mock@mock.com';
    screen.getByTestId('username-input').value = 'mock-user';
    screen.getByTestId('password-input').value = 'mock-password';

    fireEvent.click(screen.getByTestId('register-button'));

    await waitFor(() => {
      expect(screen.getByText('have permission')).toBeInTheDocument();
      expect(screen.getByText('Hello mock-user')).toBeInTheDocument();
    });
  });
});

describe('User can login', () => {
  test('can login', async () => {
    jest.spyOn(auth, 'login').mockImplementation(({ username, password }) =>
      Promise.resolve({
        success: true,
        authToken: 'mock-token',
      }),
    );
    jest.spyOn(jwt, 'decode').mockImplementation((token) => ({
      sub: 'mock-id',
      name: 'mock-user',
    }));
    jest
      .spyOn(auth, 'checkPermission')
      .mockImplementation((token) => Promise.resolve(true));

    render(
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AuthProvider>
          <TestLoginComponent />
        </AuthProvider>
      </BrowserRouter>,
    );

    screen.getByTestId('username-input').value = 'mock-user';
    screen.getByTestId('password-input').value = 'mock-password';

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(screen.getByText('have permission')).toBeInTheDocument();
      expect(screen.getByText('mock-user')).toBeInTheDocument();
    });
  });
});

describe('User can logout', () => {
  test('can logout', async () => {
    jest.spyOn(auth, 'login').mockImplementation(({ username, password }) =>
      Promise.resolve({
        success: true,
        authToken: 'mock-token',
      }),
    );
    jest.spyOn(jwt, 'decode').mockImplementation((token) => ({
      sub: 'mock-id',
      name: 'mock-user',
    }));
    jest
      .spyOn(auth, 'checkPermission')
      .mockImplementation((token) => Promise.resolve(true));

    render(
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AuthProvider>
          <TestLoginComponent />
        </AuthProvider>
      </BrowserRouter>,
    );

    screen.getByTestId('username-input').value = 'mock-user';
    screen.getByTestId('password-input').value = 'mock-password';

    fireEvent.click(screen.getByTestId('login-button'));

    await waitFor(() => {
      expect(screen.getByText('have permission')).toBeInTheDocument();
      expect(screen.getByText('mock-user')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('logout-button'));

    await waitFor(() => {
      expect(screen.getByText('can not access')).toBeInTheDocument();
      expect(screen.getByText('no member')).toBeInTheDocument();
    });
  });
});
