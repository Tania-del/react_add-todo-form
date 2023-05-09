import { TodoWithUser } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Todos = {
  todos: TodoWithUser[];
};

export const TodoList: React.FC<Todos> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
