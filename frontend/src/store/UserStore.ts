// export userRegistrationStore;
import { create } from "zustand";

type UserState = {
  name: string;
  email: string;
  address: string;
  role: string;
  dob: string;
  skills: string;
  phonenumber: string;
  id: string;
  availability: string;
  gender: string;
  hours: string;
  isLoggedIn: boolean;
};

type UserAction = {
  updateName: (name: UserState["name"]) => void;
  updateEmail: (name: UserState["email"]) => void;
  updateAddress: (name: UserState["address"]) => void;
  updateRole: (name: UserState["role"]) => void;
  updateDob: (name: UserState["dob"]) => void;
  updateSkills: (name: UserState["skills"]) => void;
  updatePhonenumber: (name: UserState["phonenumber"]) => void;
  updateId: (name: UserState["id"]) => void;
  updateAvailability: (name: UserState["availability"]) => void;
  updateGender: (name: UserState["gender"]) => void;
  updateHours: (name: UserState["hours"]) => void;
  updateIsLoggedIn: (name: UserState["isLoggedIn"]) => void;
};

export const useUserStore = create<UserState & UserAction>()((set) => ({
  name: "",
  email: "",
  address: "",
  role: "",
  dob: "",
  skills: "",
  phonenumber: "",
  id: "",
  availability: "",
  gender: "",
  hours: "",
  isLoggedIn: false,

  updateName: (name: string) => {
    set(() => ({ name: name }));
  },
  updateEmail: (email: string) => {
    set(() => ({ email: email }));
  },
  updateAddress: (address: string) => {
    set(() => ({ address: address }));
  },
  updateRole: (role: string) => {
    set(() => ({ role: role }));
  },
  updateDob: (dob: string) => {
    set(() => ({ dob: dob }));
  },
  updateSkills: (skills: string) => {
    set(() => ({ skills: skills }));
  },
  updatePhonenumber: (phonenumber: string) => {
    set(() => ({ phonenumber: phonenumber }));
  },
  updateId: (id: string) => {
    set(() => ({ id: id }));
  },
  updateAvailability: (availability: string) => {
    set(() => ({ availability: availability }));
  },
  updateGender: (gender: string) => {
    set(() => ({ gender: gender }));
  },
  updateHours: (hours: string) => {
    set(() => ({ hours: hours }));
  },
  updateIsLoggedIn: (isLoggedIn: boolean) => {
    set(() => ({ isLoggedIn: isLoggedIn }));
  },
}));
