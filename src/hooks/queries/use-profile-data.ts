import { useQuery } from "@tanstack/react-query";
import { QUERY_KES } from "@/lib/constants.ts";
import { createProfile, fetchProfile } from "@/api/profile.ts";
import type { PostgrestError } from "@supabase/supabase-js";
import { useSession } from "@/store/session.ts";

export function useProfileData(userId?: string) {

  const session = useSession();
  const isMine = userId === session?.user.id;

  return useQuery({
    queryKey: QUERY_KES.profile.byId(userId!),
    queryFn: async () => {
      try {
        return await fetchProfile(userId!);
      } catch (error) {
        if (isMine && (error as PostgrestError).code === "PGRST116") {
          return await createProfile(userId!);
        }
        throw error;
      }
    },
    enabled: !!userId
  });
}