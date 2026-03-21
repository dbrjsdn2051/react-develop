import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth.ts";
import type { UseMutationCallback } from "@/types.ts";

export function useSignUp(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signUp,
    onError: error => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    }
  });
}