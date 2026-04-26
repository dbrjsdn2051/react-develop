import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { useSession } from "@/store/session.ts";
import Fallback from "@/components/fallback.tsx";
import { Loader } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.png";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useProfileEditorModal } from "@/store/profile-editor-modal.ts";
import { useProfileData } from "@/hooks/queries/use-profile-data.ts";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useUpdateProfile from "@/hooks/mutations/profile/use-update-profile.ts";
import { toast } from "sonner";

type Image = { file: File; previewUrl: string };

export default function ProfileEditorModal() {
  const session = useSession();
  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchProfilePending
  } = useProfileData(session?.user.id);

  const store = useProfileEditorModal();
  const { isOpen, actions: { close } } = store;

  const { mutate: updateProfile, isPending: isUpdateProfilePending } = useUpdateProfile({
    onSuccess: () => {
      close();
    },
    onError: error => {
      toast.error("프로필 수정에 실패했습니다.");
    }
  });

  const [avatarImage, setAvatarImage] = useState<Image | null>(null);
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen && avatarImage) {
      URL.revokeObjectURL(avatarImage.previewUrl);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && profile) {
      setNickname(profile.nickname);
      setBio(profile.bio);
      setAvatarImage(null);
    }
  }, [profile, isOpen]);

  const handleUpdateClick = () => {
    if (nickname.trim() === "") return;
    updateProfile({
      userId: session.user.id,
      nickname,
      bio,
      avatarImageFile: avatarImage?.file
    });
  };

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    if (avatarImage) {
      URL.revokeObjectURL(avatarImage.previewUrl);
    }

    const file = e.target.files[0];
    setAvatarImage({
      file,
      previewUrl: URL.createObjectURL(file)
    });
  };


  return <Dialog open={isOpen} onOpenChange={close}>
    <DialogContent className={"flex flex-col gap-5"}>
      <DialogTitle>프로필 수정하기</DialogTitle>
      {fetchProfileError && <Fallback />}
      {isFetchProfilePending && <Loader />}
      {!isFetchProfilePending && !fetchProfileError &&
        <>
          <div className={"flex flex-col gap-2"}>
            <div className={"text-muted-foreground"}>프로필 이미지</div>
            <input
              disabled={isUpdateProfilePending}
              onChange={handleSelectImage}
              ref={fileInputRef} type={"file"} accept={"image/*"} className={"hidden"} />
            <img onClick={() => {
              if (fileInputRef.current) fileInputRef.current.click();
            }}
                 className={"h-20 w-20 cursor-pointer rounded-full object-cover"}
                 src={avatarImage?.previewUrl || profile.avatar_url || defaultAvatar} />
          </div>

          <div className={"flex flex-col gap-2"}>
            <div className={"text-muted-foreground"}>닉네임</div>
            <Input
              disabled={isUpdateProfilePending}
              value={nickname} onChange={e => setNickname(e.target.value)} />
          </div>

          <div className={"flex flex-col gap-2"}>
            <div className={"text-muted-foreground"}>소개</div>
            <Input value={bio} onChange={e => setBio(e.target.value)} />
          </div>
        <Button disabled={isUpdateProfilePending}
                  onClick={handleUpdateClick}
                  className={"cursor-pointer"}>수정하기</Button>
        </>}
    </DialogContent>
  </Dialog>;
}