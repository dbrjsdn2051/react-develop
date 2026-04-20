import { Button } from "@/components/ui/button.tsx";
import { useOpenEditPostModal } from "@/store/post-editor-modal.ts";
import type { PostEntity } from "@/types.ts";

export default function EditPostButton(props: PostEntity) {
  const openEditPostModal = useOpenEditPostModal();

  const handleButtonClick = () => {
    openEditPostModal({
      postId: props.id,
      content: props.content,
      imageUrls: props.image_urls
    });
  };

  return (
    <Button className="cursor-pointer" variant={"ghost"} onClick={handleButtonClick}>
      수정
    </Button>
  );
}