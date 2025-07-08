export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  username: string;
}

export interface AuthResponse {
  jwt: string;
}

export interface ErrorResponse {
  message: string;
}
