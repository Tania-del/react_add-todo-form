/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
import './App.scss';

import { useState } from 'react';
// eslint-disable-next-line import/no-duplicates
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { TodoWithUser } from './types/Todo';
import { TodoList } from './components/TodoList';

const populatedTodosWithUser: TodoWithUser[] = todosFromServer.map((todo) => {
  const populated: Partial<TodoWithUser> = { ...todo };
  const user = usersFromServer.find(({ id }) => id === todo.userId);

  populated.user = user;

  return populated as TodoWithUser;
});

export const App = () => {
  const [user, setUser] = useState<User>();
  const [title, setTitle] = useState('');
  const [error, setError] = useState({ title: false, user: false });
  const [todos, setTodos] = useState<TodoWithUser[]>(populatedTodosWithUser);

  const setUserChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const user = usersFromServer.find((user) => user.id === +target.value);

    setUser(user);
    setError((prev) => ({ ...prev, user: false }));
  };

  const handleTitleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
    setError((prev) => ({ ...prev, title: false }));
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setError((prev) => ({ ...prev, user: true }));
    }

    if (!title) {
      setError((prev) => ({ ...prev, title: true }));
    }

    if (title && user) {
      setTodos((prev) => [
        ...prev,
        {
          userId: user.id, user, completed: false, title, id: Math.max(...prev.map(item => item.id)) + 1,
        },
      ]);
      setTitle('');
      setUser(undefined);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAdd} action="/api/users" method="POST">
        <div className="field">
          <label htmlFor="Enter a title">
            Title:&nbsp;
            <input
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
            />
          </label>
          {error.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="Choose a user">
            User:&nbsp;
            <select
              value={user?.id || '0'}
              onChange={setUserChange}
              data-cy="userSelect"
            >
              <option value="0" disabled={Boolean(user)}>
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {error.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
