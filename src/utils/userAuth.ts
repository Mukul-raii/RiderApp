import {
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  deleteValueFor,
  save,
  userAuthenticate,
} from "../services/userService";
import { auth } from "../utils/firebaseConfig";

export const firebaseAuth = async (
  email: string,
  password: string,
  type: string
) => {
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }
  try {
    let userCredential;
    if (type === "login") {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } else {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    }

    const userIdToken = await auth.currentUser?.getIdToken();

    if (!userIdToken) {
      throw new Error("Failed to get user ID token");
    }

    const res = await userAuthenticate(userIdToken);
    if (res.status === 201) {
      return res;
    } else {
      throw new Error("Authentication failed with status: " + res.status);
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
};

onIdTokenChanged(auth, async (user) => {
  if (user) {
    const token = await user.getIdToken();
    await save("authToken", token);
  } else {
    await deleteValueFor("authToken");
  }
});
