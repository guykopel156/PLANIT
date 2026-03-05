import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import type { IUser, IUpdateUserRequest } from "../types/user";
import { updateUser } from "../services/users";
import { USERS_KEY, userKey } from "./userKeys";

interface IUpdateUserVariables {
  id: string;
  data: IUpdateUserRequest;
}

export function useUpdateUser(): UseMutationResult<IUser, Error, IUpdateUserVariables> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: IUpdateUserVariables) => updateUser(id, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: userKey(variables.id) });
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}
