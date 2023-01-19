import { Role } from './role';

export interface User {
  key: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles?: Role[];
}
