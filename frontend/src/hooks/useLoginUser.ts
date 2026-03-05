import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { ILoginRequest, IAuthResponse } from "../types/user";
import { loginUser } from "../services/users";

export function useLoginUser(): UseMutationResult<IAuthResponse, Error, ILoginRequest> {
  return useMutation({
    mutationFn: (data: ILoginRequest) => loginUser(data),
  });
}
