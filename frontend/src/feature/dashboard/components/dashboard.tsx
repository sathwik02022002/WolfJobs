import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../controllers/userController";
import { toast } from "react-toastify";
import axios from "axios";

export function Dashboard() {
  const naviagte = useNavigate();

  const updateName = useUserStore((state) => state.updateName);
  const updateAddress = useUserStore((state) => state.updateAddress);
  const updateRole = useUserStore((state) => state.updateRole);
  const updateDob = useUserStore((state) => state.updateDob);
  const updateSkills = useUserStore((state) => state.updateSkills);
  const updatePhonenumber = useUserStore((state) => state.updatePhonenumber);
  const updateId = useUserStore((state) => state.updateId);
  const updateAvailability = useUserStore((state) => state.updateAvailability);
  const updateGender = useUserStore((state) => state.updateGender);
  const updateHours = useUserStore((state) => state.updateHours);
  const updateIsLoggedIn = useUserStore((state) => state.updateIsLoggedIn);

  const [jobsList, setJobList] = useState([]);

  useEffect(() => {
    const token: string = sessionStorage.getItem("token")!;
    if (!!!token) {
      naviagte("/login");
    }
    if (!!token) {
      console.log(token);
      const tokenInfo = token.split(".");
      const userInfo = JSON.parse(atob(tokenInfo[1]));
      console.log(userInfo);

      updateName(userInfo.name);
      updateAddress(userInfo.address);
      updateRole(userInfo.role);
      updateDob(userInfo.dob);
      updateSkills(userInfo.skills);
      updatePhonenumber(userInfo.phonenumber);
      updateId(userInfo._id);
      updateAvailability(userInfo.availability);
      updateGender(userInfo.gender);
      updateHours(userInfo.hours);
      updateIsLoggedIn(true);
    }
  }, []);

  const count = useRef(0);
  useEffect(() => {
    if (count.current !== 0) {
      axios
        .get("http://localhost:8000/api/v1/users/fetchapplications")
        .then((res) => {
          if (res.status !== 200) {
            toast.error("Error fetching jobs");
            return;
          }
          console.log(res);
          const jobsData = res.data;
          setJobList(jobsData.application);
          console.log(jobsData.application);
        });
    }
    count.current++;
  }, []);

  return (
    <>
      <h2>Dashboard</h2>

      {jobsList.map((job: any) => (
        <p>{job._id}</p>
      ))}
      <button
        onClick={(e) => {
          e.preventDefault();
          naviagte("/createjob");
        }}
        type="button"
        className=" fixed bg-red-400 text-white p-4 bottom-3 right-3"
      >
        Create Job button +
      </button>
    </>
  );
}
