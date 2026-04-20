import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ImageIcon, XIcon } from "lucide-react";
import { usePostEditorModal } from "@/store/post-editor-modal.ts";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post.ts";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel.tsx";
import { useSession } from "@/store/session.ts";
import { useOpenAlertModal } from "@/store/alert-modal.ts";
import { useUpdatePost } from "@/hooks/mutations/post/use-update-posts.ts";

type Image = {
  file: File,
  previewUrl: string,
}

export default function PostEditorModal() {

  const session = useSession();
  const openAlertModal = useOpenAlertModal();
  const postEditorModal = usePostEditorModal();
  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost({
    onSuccess: () => {
      postEditorModal.actions.close();
    },
    onError: (error) => {
      toast.error("포스트 수정에 실패했습니다.");
    }
  });
  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      postEditorModal.actions.close();
    },
    onError: (error) => {
      toast.error("포스트 생성에 실패했습니다.");
    }
  });

  const handleCloseModal = () => {
    if (content !== "" || images.length !== 0) {
      openAlertModal({
        title: "게시글 작성이 마무리 되지 않았습니다.",
        description: "이 화면에서 나가면 작성중이던 내용이 사라집니다.",
        onPositive: () => {
          postEditorModal.actions.close();
        }
      });
      return;
    }
    postEditorModal.actions.close();
  };

  const handleSavePostClick = () => {
    if (content.trim() === "") {
      return;
    }
    if (!session?.user.id) {
      return;
    }
    if (postEditorModal.type === "CREATE") {
      createPost({
        content,
        images: images.map((image) => image.file),
        userId: session.user.id
      });
    } else {
      if (content === postEditorModal.content) return;
      updatePost({
        id: postEditorModal.postId,
        content: content
      });
    }
  };

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      files.forEach((file: File) => {
        setImages((prev) =>
          [...prev, { file, previewUrl: URL.createObjectURL(file) }]
        );
      });
    }
    e.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prev) => prev.filter((item) => item.previewUrl !== image.previewUrl));
    URL.revokeObjectURL(image.previewUrl);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (!postEditorModal.isOpen) {
      images.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
      return;
    }
    if (postEditorModal.type === "CREATE") {
      setContent("");
      setImages([]);
    } else {
      setContent(postEditorModal.content);
      setImages([]);
    }

    textareaRef.current?.focus();
  }, [postEditorModal.isOpen]);

  const isPending = isCreatePostPending || isUpdatePostPending;

  return <Dialog open={postEditorModal.isOpen} onOpenChange={handleCloseModal}>
    <DialogContent className={"max-h-[90vh]"}>
      <DialogTitle>포스트 작성</DialogTitle>
      <textarea disabled={isPending} ref={textareaRef} value={content}
                onChange={(e) => setContent(e.target.value)}
                className={"max-h-125 min-h-25 focus:outline-none"} placeholder={"무슨 일이 있었나요?"} />
      <input onChange={handleSelectImages} ref={fileInputRef} type={"file"} accept={"image/*"} multiple
             className={"hidden"} />
      {postEditorModal.isOpen && postEditorModal.type === "EDIT" && (
        <Carousel>
          <CarouselContent>
            {postEditorModal.imageUrls?.map((url) =>
              <CarouselItem key={url} className={"basis-2/5"}>
                <div className={"relative"}>
                  <img src={url} className={"h-full w-full rounded-sm object-cover"} />
                </div>
              </CarouselItem>)}
          </CarouselContent>
        </Carousel>
      )
      }
      {images.length > 0 &&
        <Carousel>
          <CarouselContent>
            {images.map((image) =>
              <CarouselItem key={image.previewUrl} className={"basis-2/5"}>
                <div className={"relative"}>
                  <img src={image.previewUrl} className={"h-full w-full rounded-sm object-cover"} />
                  <div onClick={() => handleDeleteImage(image)}
                       className={"absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"}>
                    <XIcon className={"h-4 w-4 text-white"} />
                  </div>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>}
      {
        postEditorModal.isOpen && postEditorModal.type === "CREATE" && (
          <Button disabled={isPending} variant={"outline"} className={"cursor-pointer"} onClick={() => {
            fileInputRef.current?.click();
          }}>
            <ImageIcon />
            이미지 추가</Button>
        )
      }
      <Button disabled={isPending} onClick={handleSavePostClick} className={"cursor-pointer"}>저장</Button>
    </DialogContent>
  </Dialog>;
}
