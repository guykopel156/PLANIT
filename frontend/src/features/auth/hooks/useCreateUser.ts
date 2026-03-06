import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";

import type { User, CreateUserRequest } from "../../../types/user";
import { createUser } from "../services/authService";
import { USERS_KEY } from "../../../hooks/userKeys";

export function useCreateUser(): UseMutationResult<{ user: User; accessToken: string }, Error, CreateUserRequest> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}
