import axios from "axios";
import { BACKEND_URL } from "../config";
import type {
  SignInRequest,
  AuthResponse,
  SignUpRequest,
  CreatePortfolio,
} from "../types/types";

const token = localStorage.getItem("token");

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

export const postCreatePortfolio = async (data: CreatePortfolio) => {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/portfolio/create`,
    data,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const getPortfoliosByUser = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/api/v1/portfolio/list-by-user`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};
