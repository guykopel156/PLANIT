import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { getUser } from "../services/users";
import { userKey } from "./userKeys";

import type { User } from "../types/user";

export function useGetUser(id: string): UseQueryResult<User, Error> {
  return useQuery({
    queryKey: userKey(id),
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}
