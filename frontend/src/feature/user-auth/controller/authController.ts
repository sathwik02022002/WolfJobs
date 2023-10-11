// export userRegistrationStore;
import { create } from "zustand";

type AuthState = {
  email: string;
  password: string;
};

type AuthAction = {
  updateEmail: (name: AuthState["email"]) => void;
  updatePassword: (name: AuthState["password"]) => void;
};

export const useAuthStore = create<AuthState & AuthAction>()((set) => ({
  email: "",
  password: "",
  updateEmail: (email: string) => {
    set(() => ({ email: email }));
  },
  updatePassword: (password: string) => {
    set(() => ({ password: password }));
  },
}));
