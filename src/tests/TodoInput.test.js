import { waitFor, render, screen, fireEvent } from '@testing-library/react';
import { TodoInput, TodoCollection } from '../components';
import { useState } from 'react';

function MockTodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleAddTodo = async () => {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.floor(Math.random() * 1000),
          title: inputValue,
          isDone: false,
          isEdit: false,
        },
      ];
    });

    setInputValue('');
  };

  return (
    <>
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleAddTodo}
      />
      <TodoCollection todos={todos} />
    </>
  );
}

describe('create TodoItem', () => {
  it('should get input', () => {
    const testTitle = 'new todo';
    render(<MockTodoList />);
    const todoInput = screen.getByPlaceholderText('新增工作');
    fireEvent.change(todoInput, { target: { value: testTitle } });
    expect(todoInput.getAttribute('value')).toBe(testTitle);
  });

  it('should create todo item by click button', () => {
    const testTitle = 'new todo';
    render(<MockTodoList />);
    const todoInput = screen.getByPlaceholderText('新增工作');
    const addTodoBtn = screen.getByText('新增');
    fireEvent.change(todoInput, { target: { value: testTitle } });
    fireEvent.click(addTodoBtn);

    expect(screen.getAllByTestId('task-item').length).toBe(1);
  });
});
