import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { useSession } from "@/store/session.ts";
import Fallback from "@/components/fallback.tsx";
import { Loader } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.png";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useProfileEditorModal } from "@/store/profile-editor-modal.ts";
import { useProfileData } from "@/hooks/queries/use-profile-data.ts";

export default function ProfileEditorModal() {
  const session = useSession();
  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchProfilePending
  } = useProfileData(session?.user.id);

  const store = useProfileEditorModal();
  const { isOpen, actions: { close } } = store;

  return <Dialog open={isOpen} onOpenChange={close}>
    <DialogContent className={"flex flex-col gap-5"}>
      <DialogTitle>프로필 수정하기</DialogTitle>
      {fetchProfileError && <Fallback />}
      {isFetchProfilePending && <Loader />}
      {!isFetchProfilePending && !fetchProfileError &&
        <>
          <div className={"flex flex-col gap-2"}>
            <div className={"text-muted-foreground"}>프로필 이미지</div>
            <img className={"h-20 w-20 cursor-pointer rounded-full object-cover"}
                 src={profile.avatar_url || defaultAvatar} />
          </div>

          <div className={"flex flex-col gap-2"}>
            <div className={"text-muted-foreground"}>닉네임</div>
            <Input />
          </div>

          <div className={"flex flex-col gap-2"}>
            <div className={"text-muted-foreground"}>소개</div>
            <Input />
          </div>
          <Button className={"cursor-pointer"}>수정하기</Button>
        </>}
    </DialogContent>
  </Dialog>;
}