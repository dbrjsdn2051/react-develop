import type { ReactNode } from "react";
import PostEditorModal from "@/components/modal/post-editor-modal.tsx";
import { createPortal } from "react-dom";
import AlertModal from "@/components/modal/alert-modal.tsx";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return <>
    {createPortal(<><PostEditorModal /><AlertModal /></>, document.getElementById("modal-root")!)}
    {children}
  </>;
}