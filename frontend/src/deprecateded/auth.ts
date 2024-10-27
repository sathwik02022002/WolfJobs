import { toast } from "react-toastify";
import { getFormBody } from "./apiUtils";
import { loginURL, signupURL } from "../api/constants";


interface LoginResponseSuccess {
  success: true;
  userId: string;
}

interface LoginResponseFailure {
  success: false;
  userId?: undefined;
}

// Union type for login response
type LoginResponse = LoginResponseSuccess | LoginResponseFailure;
export async function login(email: string, password: string): Promise<LoginResponse> {
  const url = loginURL;
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success && data.data && data.data.user && data.data.user._id) {
        localStorage.setItem("token", data.data.token);
        return { userId: data.data.user._id, success: true }; // Explicitly return `success: true`
      } else {
        toast.error("Login Failed");
        return { success: false }; // Explicitly return `success: false` for failure
      }
    })
    .catch((error) => {
      console.error("Login fetch error:", error);
      toast.error("Login request failed");
      return { success: false }; // Handle errors with `success: false`
    });
}



export function signup(
  email: string,
  password: string,
  confirmPassword: string,
  name: string,
  role: string,
  affiliation: string,
  skills: string,
  navigate: any
) {
  const url = signupURL;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({
      email,
      password,
      confirm_password: confirmPassword,
      name,
      role,
      skills,
      affiliation,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        navigate("/dashboard");
        return;
      }
      toast.error("Sign up Failed");
    });
}
