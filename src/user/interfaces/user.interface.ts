export type CreateUserDto = {
  login: string;
  password: string;
};

export type User = {
  id: string;
  version: number;
  createdAt: number;
  updatedAt: number;
} & CreateUserDto;

export type UserWithoutPassword = Omit<User, 'password'>;

export type UpdatePasswordDto = {
  oldPassword: string;
  newPassword: string;
};
