import { Alert } from "react-native";
import { create } from "zustand";
import { LoginFormType } from "../types/user";
import { socketConnection } from "../utils/socket";
import { firebaseAuth } from "../utils/userAuth";
import { userStore } from "./user";

export const useAuthStore = create<AuthState>((set, get) => ({
  loginForm: {
    email: "",
    password: "",
    showPassword: false,
  },
  type: "login",
  isLoading: false,
  setType: (type: string) => set({ type }),
  setLoginForm: (loginForm: LoginFormType) => set({ loginForm }),
  getType: () => get().type,
  setLoading: (isLoading: boolean) => set({ isLoading }),
  authenticate: async (router) => {
    const { email, password } = get().loginForm;
    const type = get().type;
    const setLoading = get().setLoading;
    await authenticateUser(email, password, type, setLoading, router);
  },
}));

interface AuthState {
  type: string;
  setType: (type: string) => void;
  getType: () => string;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  loginForm: LoginFormType;
  setLoginForm: (loginForm: LoginFormType) => void;
  authenticate: (router) => Promise<void>;
}

const authenticateUser = async (email, password, type, setLoading, router) => {
  const { fetchUser } = userStore.getState();
  const socket = new socketConnection();
  if (!email || !password) {
    Alert.alert("Error", "Please enter both email and password.");
    return;
  }
  try {
    setLoading(true);
    const res = await firebaseAuth(email, password, type);
    if (res) {
      await fetchUser();
      socket.initSocket();
      router.replace("/(main)/home");
    }
  } catch (error) {
    console.error("Authentication failed:", error);
    Alert.alert(
      "Authentication Failed",
      "The credentials you entered are incorrect or the account does not exist. Please check your email and password and try again.",
    );
  } finally {
    setLoading(false);
  }
};
