// export userRegistrationStore;
import { create } from "zustand";

type LoginState = {
  email: string;
  password: string;
};

type LoginAction = {
  updateEmail: (name: LoginState["email"]) => void;
  updatePassword: (name: LoginState["password"]) => void;
};

export const useLoginStore = create<LoginState & LoginAction>()((set) => ({
  email: "",
  password: "",
  updateEmail: (email: string) => {
    set(() => ({ email: email }));
  },
  updatePassword: (password: string) => {
    set(() => ({ password: password }));
  },
}));
