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
        return <TodoItem todo={todo} />;
      })}
    </div>
  );
};

export default TodoCollection;
