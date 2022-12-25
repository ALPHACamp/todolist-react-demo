import { waitFor, render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '../components';
import { useState } from 'react';

function MockTodoItem() {
  const [todo, setTodo] = useState({
    id: 1,
    title: 'mockTodo',
    isDone: false,
    isEdit: false,
  });

  const handleSave = jest.fn(({ id, title }) =>
    setTodo({
      ...todo,
      title,
    }),
  );

  const handleToggleDone = jest.fn(({ id }) =>
    setTodo({ ...todo, isDone: !todo.isDone }),
  );

  const handleDelete = jest.fn(({ id }) => setTodo(null));

  const handleChangeMode = jest.fn(({ id, isEdit }) =>
    setTodo({
      ...todo,
      isEdit,
    }),
  );

  return (
    todo && (
      <TodoItem
        key={todo.id}
        todo={todo}
        onSave={handleSave}
        onToggleDone={handleToggleDone}
        onDelete={handleDelete}
        onChangeMode={handleChangeMode}
      />
    )
  );
}

const doubleClickTodoItem = () => {
  render(<MockTodoItem />);
  const todoItem = screen.getByTestId('task-item');
  const todoTitleEle = screen.getByTestId('task-item-body');

  fireEvent.doubleClick(todoTitleEle);

  return todoItem;
};

describe('update TodoItem', () => {
  it('should toggle done or not', () => {
    render(<MockTodoItem />);
    const todoItem = screen.getByTestId('task-item');
    const checkIcon = todoItem.getElementsByClassName('icon-checked').item(0);

    fireEvent.click(checkIcon);

    expect(todoItem.getAttribute('class')).toMatch(/done/gi);
  });

  it('should show the input box when double click the item title', () => {
    const todoItem = doubleClickTodoItem();
    expect(todoItem.getAttribute('class')).toMatch(/edit/gi);
  });

  it('should update todo title', () => {
    const updatedTitle = 'updated title';

    const todoItem = doubleClickTodoItem();
    const todoInput = screen.getByTestId('task-item-body-input');

    todoInput.value = updatedTitle;
    fireEvent.keyDown(todoInput, { key: 'Enter', code: 'Enter' });
    expect(screen.getByTestId('task-item-body-text')).toHaveTextContent(
      updatedTitle,
    );
    expect(todoItem.getAttribute('class')).not.toMatch(/done/gi);
  });

  it('should quit current value', () => {
    const currentTitle = 'mockTodo';
    const updatedTitle = 'updated title';

    const todoItem = doubleClickTodoItem();
    const todoInput = screen.getByTestId('task-item-body-input');

    todoInput.value = updatedTitle;
    fireEvent.keyDown(todoInput, { key: 'Escape', code: 'Escape' });

    expect(screen.getByTestId('task-item-body-text')).toHaveTextContent(
      currentTitle,
    );
    expect(todoItem.getAttribute('class')).not.toMatch(/done/gi);
  });
});

describe('delete TodoItem', () => {
  it('should delete todo when click on destroy button', () => {
    render(<MockTodoItem />);
    const todoItem = screen.getByTestId('task-item');
    fireEvent.mouseOver(todoItem);
    const deleteBtn = screen.getByTestId('btn-destroy');
    fireEvent.click(deleteBtn);
    expect(todoItem).not.toBeInTheDocument();
  });
});
