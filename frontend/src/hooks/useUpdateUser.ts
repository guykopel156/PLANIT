import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import type { User, UpdateUserRequest } from "../types/user";
import { updateUser } from "../services/users";
import { USERS_KEY, userKey } from "./userKeys";

interface UpdateUserVariables {
  id: string;
  data: UpdateUserRequest;
}

export function useUpdateUser(): UseMutationResult<User, Error, UpdateUserVariables> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateUserVariables) => updateUser(id, data),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: userKey(variables.id) });
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}
