// export userRegistrationStore;
import { create } from "zustand";

type ExploreState = {
  email: string;
  password: string;
};

type ExploreAction = {
  updateEmail: (name: ExploreState["email"]) => void;
  updatePassword: (name: ExploreState["password"]) => void;
};

export const useExploreStore = create<ExploreState & ExploreAction>()(
  (set) => ({
    email: "",
    password: "",
    updateEmail: (email: string) => {
      set(() => ({ email: email }));
    },
    updatePassword: (password: string) => {
      set(() => ({ password: password }));
    },
  })
);
