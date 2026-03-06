import api from "./api";
import type {
  User,
  UpdateUserRequest,
} from "../types/user";

export async function getUser(id: string): Promise<User> {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
}

export async function updateUser(
  id: string,
  data: UpdateUserRequest
): Promise<User> {
  const response = await api.put<User>(`/users/${id}`, data);
  return response.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}

export async function getAllUsers(): Promise<User[]> {
  const response = await api.get<User[]>("/users");
  return response.data;
}
