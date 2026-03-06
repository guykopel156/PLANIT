import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { deleteUser } from "../services/users";
import { USERS_KEY } from "./userKeys";

export function useDeleteUser(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}
