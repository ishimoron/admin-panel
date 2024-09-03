import { RoleEnum } from '../../enums/Role_Enum';

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  role: RoleEnum;
  createdAt: string;
  access_token: string;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  loading: boolean;
  user: AuthUser | null;
  error: string[] | null;
  getToken: () => string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
