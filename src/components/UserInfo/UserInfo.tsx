import { User } from '../../types/User';

type IUser = {
  user: User;
};

export const UserInfo: React.FC<IUser> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
