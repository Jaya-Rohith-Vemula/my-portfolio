import axios from "axios";
import { BACKEND_URL } from "../config";
import type {
  SignInRequest,
  AuthResponse,
  SignUpRequest,
  CreatePortfolio,
} from "../types/types";

const api = axios.create({ baseURL: BACKEND_URL });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const postSignIn = async (data: SignInRequest) => {
  const response = await api.post<AuthResponse>(`/api/v1/user/signin`, data);
  return response.data;
};

export const postSignUp = async (data: SignUpRequest) => {
  const response = await api.post<AuthResponse>(`/api/v1/user/signup`, data);
  return response.data;
};

export const getPortfoliosByUser = async () => {
  const response = await api.get("/api/v1/portfolio/list-by-user");
  return response.data;
};

export const postCreatePortfolio = async (data: CreatePortfolio) => {
  const response = await api.post("/api/v1/portfolio/create", data);
  return response.data;
};

export const deletePortfolio = async (publicId: string) => {
  const response = await api.delete("/api/v1/portfolio/delete", {
    params: { publicId },
  });
  return response.data;
};

export const getPortfolio = async (publicId: string) => {
  const response = await api.get(`/api/v1/portfolio/view`, {
    params: {
      publicId,
    },
  });
  return response.data;
};
