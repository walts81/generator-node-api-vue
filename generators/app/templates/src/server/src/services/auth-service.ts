import { UserRole } from '@/data';
import { User } from '@/models/user';
import bcrypt from 'bcryptjs';

export const login = async (username: string, password: string): Promise<User | null> => {
  if (username === '<%= githubUser %>' && password === 'P@$$w0rd1') {
    const userKey = await bcrypt.hash(username, 1);
    return {
      key: userKey,
      username,
      firstName: '<%= firstName %>',
      lastName: '<%= lastName %>',
      email: '<%= email %>',
      roles: [
        { key: '1', name: UserRole.User },
        { key: '2', name: UserRole.Admin },
      ],
    };
  }
  return null;
};
