import { ROLE_ENUM } from '../../auth/models/Role_Enum';

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  role: ROLE_ENUM;
  createdAt: string;
  access_token: string;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  loading: boolean;
  user: AuthUser | null;
  error: string[] | null;
  logout: () => void;
  getToken: () => string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  refreshTokenHandler: () => Promise<void>;
  verifyToken: () => Promise<false | undefined>;
}
