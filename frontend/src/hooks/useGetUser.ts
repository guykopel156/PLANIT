import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { IUser } from "../types/user";
import { getUser } from "../services/users";
import { userKey } from "./userKeys";

export function useGetUser(id: string): UseQueryResult<IUser, Error> {
  return useQuery({
    queryKey: userKey(id),
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}
