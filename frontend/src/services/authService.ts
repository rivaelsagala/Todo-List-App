import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:3000/api/auth";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface RegisterResponse {
  id: number;
  name: string;
  email: string;
  message: string;
}

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ErrorResponse {
  message: string;
}
API.interceptors.response.use(
  response => response,
  (error: AxiosError<ErrorResponse>) => {
    const message =
      error.response?.data?.message || error.message || "Terjadi kesalahan";
    return Promise.reject(new Error(message));
  }
);

export const getUser = () => API.get("/");

export const registerUser = (data: RegisterData) =>
  API.post<RegisterResponse>("/register", data);

export const loginUser = (data: LoginData) =>
  API.post<LoginResponse>("/login", data);
