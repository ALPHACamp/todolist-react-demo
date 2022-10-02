import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onSave,
  onDelete,
  onToggleDone,
  onChangeMode,
}) => {
  return (
    <div>
      {todos.map((todo) => {
        return (
          <TodoItem todo={todo} onToggleDone={(id) => onToggleDone?.(id)} />
        );
      })}
    </div>
  );
};

export default TodoCollection;
