import { create } from "zustand";

type FormStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useProjectForm = create<FormStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useUserForm = create<FormStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
