export type UserSchema = {
  id: number; // matches backend
  name: string;
  firebaseUid: string; // matches backend
  email: string;
  role: string;
  phone?: string; // optional since backend can return empty
  createdAt: string; // backend sends ISO string
  updatedAt: string;
};

export interface LoginFormType {
  email: string;
  password: string;
  showPassword?: boolean;
}
