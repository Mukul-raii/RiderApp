import { UserSchema } from "@/src/Types/user";
import { create } from "zustand";
import { userProfile } from "../services/userService";

export const userStore = create<{
  user: UserSchema | null;
  getUser: () => Promise<UserSchema>;
}>((set) => ({
  user: null,
  getUser: async () => {
    const res = await userProfile(); // API response
    console.log("Fetched user profile:", res);
    const user: UserSchema = res.data; // ✅ unwrap profile
    set({ user });
    return user; // <— now you can use it in component
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
