import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";

const initialState = {
  isOpen: false
};

const useProfileEditorModalStore = create(
  devtools(combine(initialState, (set) => ({
    actions: {
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false })
    }
  })), { name: "ProfileEditorModalStore" })
);

export const useOpenProfileEditorModal = () => {
  return useProfileEditorModalStore((store) => store.actions.open);
};

export const useProfileEditorModal = () => {
  return useProfileEditorModalStore();
};