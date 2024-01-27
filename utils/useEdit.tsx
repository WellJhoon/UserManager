import { Project, User } from "@/types/Project";
import { create } from "zustand";

type Edit = {
  isOpen: boolean;
  model: Project | User | null;
  onOpen: (model: Project | User) => void;
  onClose: () => void;
};

export const useEdit = create<Edit>((set) => ({
  isOpen: false,
  model: null,
  onOpen: (model: Project | User) => set({ isOpen: true, model }),
  onClose: () => set({ isOpen: false }),
}));
