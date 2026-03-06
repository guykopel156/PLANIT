import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { getAllUsers } from "../services/users";
import { USERS_KEY } from "./userKeys";

import type { User } from "../types/user";

export function useGetAllUsers(): UseQueryResult<User[], Error> {
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: getAllUsers,
  });
}
