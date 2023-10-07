// export userRegistrationStore;
import { create } from "zustand";

type RegistrationState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

type RegistrationAction = {
  updateName: (name: RegistrationState["name"]) => void;
  updateEmail: (name: RegistrationState["email"]) => void;
  updatePassword: (name: RegistrationState["password"]) => void;
  updateConfirmPassword: (name: RegistrationState["confirmPassword"]) => void;
  updateRole: (name: RegistrationState["role"]) => void;
};

export const useRegistrationStore = create<
  RegistrationState & RegistrationAction
>()((set) => ({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  updateName: (name: string) => {
    set(() => ({ name: name }));
  },
  updateEmail: (email: string) => {
    set(() => ({ email: email }));
  },
  updatePassword: (password: string) => {
    set(() => ({ password: password }));
  },
  updateConfirmPassword: (confirmPassword: string) => {
    set(() => ({ confirmPassword: confirmPassword }));
  },
  updateRole: (role: string) => {
    set(() => ({ role: role }));
  },
}));
