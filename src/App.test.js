import { render, screen } from '@testing-library/react';
import App from './App';

test('app initialize have transfer to login page', () => {
  render(<App />);
  const loginTitle = screen.getByText(/登入 Todo/);
  expect(loginTitle).toBeInTheDocument();
});
