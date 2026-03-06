import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import type { User, LoginRequest } from "../../../types/user";
import { loginUser } from "../services/authService";

export function useLoginUser(): UseMutationResult<{ user: User; accessToken: string }, Error, LoginRequest> {
  return useMutation({
    mutationFn: (data: LoginRequest) => loginUser(data),
  });
}
