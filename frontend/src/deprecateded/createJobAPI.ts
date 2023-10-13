import { createJobURL, loginURL } from "../api/constants";
import { getFormBody } from "./apiUtils";

export const createJob = async (
  name: string,
  id: string,
  skills: string,
  status: number,
  location: string,
  description: string,
  pay: string,
  schedule: string
) => {
  const url = createJobURL;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({
      name,
      id,
      skills,
      status,
      location,
      description,
      pay,
      schedule,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
      }
    });
};

export async function login(email: string, password: string, navigate: any) {
  const url = loginURL;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Login data", data);
      if (data.success) {
        sessionStorage.setItem("token", data.data.token);
        navigate("/dashboard");
      }
    });
}
