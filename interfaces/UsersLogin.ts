interface UsersLogin {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    user: string;
    email: string;
  };
}

export default UsersLogin;
