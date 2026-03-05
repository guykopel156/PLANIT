import api from "./api";
import type {
  IUser,
  ICreateUserRequest,
  ILoginRequest,
  IUpdateUserRequest,
  IAuthResponse,
} from "../types/user";

export async function createUser(
  data: ICreateUserRequest
): Promise<IAuthResponse> {
  const response = await api.post<IAuthResponse>("/users/register", data);
  return response.data;
}

export async function loginUser(data: ILoginRequest): Promise<IAuthResponse> {
  const response = await api.post<IAuthResponse>("/users/login", data);
  return response.data;
}

export async function getUser(id: string): Promise<IUser> {
  const response = await api.get<IUser>(`/users/${id}`);
  return response.data;
}

export async function updateUser(
  id: string,
  data: IUpdateUserRequest
): Promise<IUser> {
  const response = await api.put<IUser>(`/users/${id}`, data);
  return response.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}

export async function getAllUsers(): Promise<IUser[]> {
  const response = await api.get<IUser[]>("/users");
  return response.data;
}
