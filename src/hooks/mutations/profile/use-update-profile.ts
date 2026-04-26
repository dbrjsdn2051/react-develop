import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/api/profile.ts";
import type { ProfileEntity, UseMutationCallback } from "@/types.ts";
import { QUERY_KES } from "@/lib/constants.ts";

export default function useUpdateProfile(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updateProfile) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<ProfileEntity>(
        QUERY_KES.profile.byId(updateProfile.id),
        updateProfile
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    }
  });
}