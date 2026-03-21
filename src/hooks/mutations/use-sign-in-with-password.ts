import { signInWithPassword } from "@/api/auth.ts";
import { useMutation } from "@tanstack/react-query";
import type { UseMutationCallback } from "@/types.ts";

export function useSignInWithPassword(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: error => {
      console.log(error);

      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    }
  });
}