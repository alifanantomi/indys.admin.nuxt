export interface User {
  id: number
  access: UserRole
  username: string
  email: string
  phoneNumber: string
  provider: string
  suspended: string
  suspendedDate: string
  verified: string
  image: string
  token: string
}

export interface AuthResponse {
  data: User
  message?: string
  code?: number
}

export interface UserResponse {
  data: User[]
  message?: string
  code?: number
}

export enum UserRole {
  USER,
  ADMIN,
  DRIVER
}