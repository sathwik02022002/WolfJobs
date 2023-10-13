import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import { toast } from "react-toastify";
import JobListTile from "../../components/Job/JobListTile";

const Dashboard = () => {
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

  const [jobsList, setJobList] = useState<Job[]>([]);

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
        .get("http://localhost:8000/api/v1/users", {
          params: { page: 1, limit: 25 },
        })
        .then((res) => {
          if (res.status !== 200) {
            toast.error("Error fetching jobs");
            return;
          }
          setJobList(res.data.jobs as Job[]);
        });
    }
    count.current++;
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <div className="content bg-slate-50">
        <div className="flex flex-row" style={{ height: "calc(100vh - 72px)" }}>
          <div className="w-4/12 bg-white/60 overflow-y-scroll overflow-x-hidden pt-2 px-9">
            <div className="text-2xl py-4">All jobs</div>
            {jobsList.map((job: Job) => {
              return <JobListTile data={job} />;
            })}
            {jobsList.map((job: Job) => {
              return <JobListTile data={job} />;
            })}
            {jobsList.map((job: Job) => {
              return <JobListTile data={job} />;
            })}
            {jobsList.map((job: Job) => {
              return <JobListTile data={job} />;
            })}
            {jobsList.map((job: Job) => {
              return <JobListTile data={job} />;
            })}
          </div>
          <div
            className="w-8/12 "
            style={{ height: "calc(100vh - 72px)" }}
          ></div>
        </div>

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
      </div>
    </>
  );
};

export default Dashboard;
