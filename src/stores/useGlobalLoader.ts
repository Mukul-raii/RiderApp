// src/stores/useGlobalLoader.ts
import { create } from "zustand";

interface LoaderState {
  visible: boolean;
  show: () => void;
  hide: () => void;
}

export const useGlobalLoader = create<LoaderState>((set) => ({
  visible: false,
  show: () => set({ visible: true }),
  hide: () => set({ visible: false }),
}));
