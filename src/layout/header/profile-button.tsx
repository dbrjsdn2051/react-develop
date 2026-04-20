import defaultAvatar from "@/assets/default-avatar.png";
import { useSession } from "@/store/session.ts";
import { useProfileData } from "@/hooks/queries/use-profile-data.ts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { PopoverClose } from "@radix-ui/react-popover";
import { Link } from "react-router";
import { signOut } from "@/api/auth.ts";

export default function ProfileButton() {
  const session = useSession();
  const { data: profile } = useProfileData(session?.user.id);

  if (!session) return null;

  return <Popover>
    <PopoverTrigger>
      <img className={"h-6 w-6 cursor-pointer rounded-full object-cover"} src={profile?.avatar_url || defaultAvatar} />
    </PopoverTrigger>
    <PopoverContent className={"flex flex-col w-40 p-0"}>
      <PopoverClose asChild>
        <Link to={`/profile/${session?.user.id}`}>
          <div className={"hover:bg-muted cursor-pointer px-4 py-3 text-sm"}>프로필</div>
        </Link>
      </PopoverClose>
      <PopoverClose asChild>
        <div onClick={signOut} className={"hover:bg-muted cursor-pointer px-4 py-3 text-sm"}>로그아웃</div>
      </PopoverClose>
    </PopoverContent>
  </Popover>;
};