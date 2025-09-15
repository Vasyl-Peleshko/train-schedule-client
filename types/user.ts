export interface User {
  id: number;
  username: string;
  role: 'user' | 'admin';
}

export interface ITokenPair {
  access: string;
  refresh: string;
}
