import { TodoWithUser } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Todo = {
  todo: TodoWithUser;
};

export const TodoInfo: React.FC<Todo> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id="16"
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
      {/* <a className="UserInfo" href="mailto:Sincere@april.biz">
        {todo.user.name}
      </a> */}
    </article>
  );
};
