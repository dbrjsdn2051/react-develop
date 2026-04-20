import { Button } from "@/components/ui/button.tsx";
import { useOpenProfileEditorModal } from "@/store/profile-editor-modal.ts";

export default function EditProfileButton() {
  const openProfileEditorModal = useOpenProfileEditorModal();

  return (
    <Button onClick={openProfileEditorModal} variant={"secondary"} className={"cursor-pointer"}>프로필 수정</Button>
  );
}