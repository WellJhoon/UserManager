import { Project } from "@/types/Project";
import { create } from "zustand";

type EditStore = {
  isOpen: boolean;
  project: Project | null;
  onOpen: (project: Project) => void;
  onClose: () => void;
};

export const useEdit = create<EditStore>((set) => ({
  isOpen: false,
  project: null,
  onOpen: (project: Project) => set({ isOpen: true, project }),
  onClose: () => set({ isOpen: false }),
}));
