export interface CreateUser {
  email: string;
  password: string;
  name?: string;
};

export interface UserResponse {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt?: string;
}

export interface UpdatePassword {
  userId: string;
  newPassword: string;
}