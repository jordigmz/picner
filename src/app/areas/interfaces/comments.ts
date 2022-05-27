import { User } from '../../users/interfaces/user';

export interface Comments {
  id?: number;
  text: string;
  date?: string;
  user?: User;
}
