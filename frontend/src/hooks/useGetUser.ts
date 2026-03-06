import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { User } from "../types/user";
import { getUser } from "../services/users";
import { userKey } from "./userKeys";

export function useGetUser(id: string): UseQueryResult<User, Error> {
  return useQuery({
    queryKey: userKey(id),
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}
