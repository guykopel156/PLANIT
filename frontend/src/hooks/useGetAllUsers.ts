import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IUser } from "../types/user";
import { getAllUsers } from "../services/users";
import { USERS_KEY } from "./userKeys";

export function useGetAllUsers(): UseQueryResult<IUser[], Error> {
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: getAllUsers,
  });
}
