export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
}

export interface AuthResponse {
  user: User
  token: string
  message?: string
}
