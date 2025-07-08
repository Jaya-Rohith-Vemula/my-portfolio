import axios from "axios";
import { BACKEND_URL } from "../config";
import type { SignInRequest, AuthResponse, SignUpRequest } from "../types/auth";

export const postSignIn = async (data: SignInRequest) => {
  const response = await axios.post<AuthResponse>(
    `${BACKEND_URL}/api/v1/user/signin`,
    data
  );
  return response.data;
};

export const postSignUp = async (data: SignUpRequest) => {
  const response = await axios.post<AuthResponse>(
    `${BACKEND_URL}/api/v1/user/signup`,
    data
  );
  return response.data;
};
