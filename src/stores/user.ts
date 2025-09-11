import { UserSchema } from "@/src/Types/user";
import { create } from "zustand";
import { userProfile } from "../services/userService";

export const userStore = create<{
  user: UserSchema | null;
  fetchUser: () => Promise<UserSchema>;
  loading: boolean;
  error: string | null;
}>((set) => ({
  user: null,
  loading: false,
  error: null,
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const result = await userProfile();
      console.log("Fetched user profile:", result);
      set({ user: result, loading: false });
      return result;
    } catch (err: any) {
      console.error("❌ Failed to fetch user profile:", err);
      set({ error: "Failed to fetch user", loading: false });
      return null;
    }
  },
}));

export const userAuth = create<{
  type: string;
  setType: (type: string) => void;
  getType: () => string;
}>((set, get) => ({
  type: "login",
  setType: (type: string) => set({ type }),
  getType: () => get().type,
}));
