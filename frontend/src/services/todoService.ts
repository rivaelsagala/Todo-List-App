import axios from "axios";

const API_URL = "http://localhost:3000/api/todos";

export interface TodoData {
  title: string;
  location: string;
  date: string;
}

const API = axios.create({
  baseURL: API_URL,
});

export const getTodos = () => API.get("/");
export const createTodo = (data: TodoData) => API.post("/", data);
export const deleteTodo = (id: number) => API.delete(`/${id}`);
export const updateTodo = (id: number, data: TodoData) =>
  API.put(`/${id}`, data);
