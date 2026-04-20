import type { ReactNode } from "react";
import PostEditorModal from "@/components/modal/post-editor-modal.tsx";
import { createPortal } from "react-dom";
import AlertModal from "@/components/modal/alert-modal.tsx";
import ProfileEditorModal from "@/components/modal/profile-editor-modal.tsx";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return <>
    {createPortal(<><PostEditorModal /><AlertModal /><ProfileEditorModal /></>, document.getElementById("modal-root")!)}
    {children}
  </>;
}