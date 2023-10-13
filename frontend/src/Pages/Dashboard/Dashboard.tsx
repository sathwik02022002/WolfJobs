import { useEffect, useState } from "react";
import JobDetailView from "../../components/Job/JobDetailView";
import JobsListView from "../../components/Job/JobListView";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [jobsList, setJobList] = useState<Job[]>();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/users/fetchapplications", {
        params: { page: 1, limit: 25 },
      })
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Error fetching jobs");
          return;
        }
        setJobList(res.data.jobs as Job[]);
      });
  }, []);

  return (
    <>
      <div className="content bg-slate-50">
        <div className="flex flex-row" style={{ height: "calc(100vh - 72px)" }}>
          <JobsListView jobsList={jobsList} />
          <JobDetailView />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
