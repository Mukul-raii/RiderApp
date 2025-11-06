import { LoginFormType, UserSchema } from "@/src/types/user";
import { create } from "zustand";
import { userProfile } from "../services/userService";

export const userStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const result = await userProfile();
      set({ user: result, loading: false });
      return result;
    } catch (err: any) {
      set({ error: "Failed to fetch user", loading: false });
      return null;
    }
  },
}));

interface UserState {
  user: UserSchema | null;
  fetchUser: () => Promise<UserSchema>;
  loading: boolean;
  error: string | null;
}
