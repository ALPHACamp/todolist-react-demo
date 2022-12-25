import { waitFor, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TodoPage } from '../pages';
import { AuthContext } from '../contexts/AuthContext';
import { getTodos as mockGetTodos } from '../api/todos';

const todos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

jest.mock('../api/todos');

function renderTodoPage() {
  return render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AuthContext.Provider
        value={{
          isAuthenticated: true,
          currentMember: {
            id: 'mock-id',
            name: 'mock-name',
          },
        }}
      >
        <TodoPage />
      </AuthContext.Provider>
    </BrowserRouter>,
  );
}

test('it should render all todos', async () => {
  mockGetTodos.mockResolvedValueOnce(todos);
  const { getAllByTestId } = renderTodoPage();

  await waitFor(() => {
    expect(getAllByTestId('task-item').length).toBe(todos.length);
  });
});
