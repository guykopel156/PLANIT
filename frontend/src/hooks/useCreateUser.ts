import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import type { ICreateUserRequest, IAuthResponse } from "../types/user";
import { createUser } from "../services/users";
import { USERS_KEY } from "./userKeys";

export function useCreateUser(): UseMutationResult<IAuthResponse, Error, ICreateUserRequest> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateUserRequest) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}
