import api from "../../../services/api";
import type {
  User,
  CreateUserRequest,
  LoginRequest,
} from "../../../types/user";

export async function createUser(
  data: CreateUserRequest
): Promise<{ user: User; accessToken: string }> {
  const response = await api.post<{ user: User; accessToken: string }>("/auth/register", data);
  return response.data;
}

export async function loginUser(data: LoginRequest): Promise<{ user: User; accessToken: string }> {
  const response = await api.post<{ user: User; accessToken: string }>("/auth/login", data);
  return response.data;
}
