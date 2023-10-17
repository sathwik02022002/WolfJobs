import axios from "axios";
import { useUserStore } from "../../store/UserStore";
import { Badge, Button, ThemeProvider, createTheme } from "@mui/material";
import { toast } from "react-toastify";
import JobScreening from "./JobScreening";
import JobRating from "./JobRating";
import JobGrading from "./JobGrading";
import JobFinalReview from "./JobFinalReview";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const JobDetail = (props: any) => {
  const { jobData } = props;
  const data = jobData as Job;

  const jobType = data.type === "parttime" ? "Part time" : "Full time";

  const applicantemail = useUserStore((state) => state.email);
  const userId = useUserStore((state) => state.id);
  const applicantname = useUserStore((state) => state.name);
  const applicantSkills = useUserStore((state) => state.skills);
  const applicantNumber = useUserStore((state) => state.phonenumber);
  const role = useUserStore((state) => state.role);

  const handleApplyJob = (e: any) => {
    e.preventDefault();
    const body = {
      applicantname,
      applicantid: userId,
      applicantemail,
      applicantSkills,
      phonenumber: applicantNumber,
      managerid: data.managerid,
      jobname: data.name,
      jobid: data._id,
    };

    axios
      .post("http://localhost:8000/api/v1/users/createapplication", body)
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Failed to apply");
          return;
        }
        toast.success("Applied successfully");
      });
  };

  return (
    <>
      <div className="w-7/12">
        <div className="flex flex-col m-4 ">
          <div className="text-xl border-b border-gray-300 font-bold">
            Job Details
          </div>
          <div className="flex flex-row justify-between m-2">
            <div className="flex flex-col ">
              <div>
                <span className="font-semibold text-lg">Role:</span>&nbsp;
                {data.name}
              </div>
              <div>
                <span className="font-semibold text-lg">Job Status:</span>
                &nbsp;
                <span
                  className={`capitalize ${
                    data.status === "open" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {data.status}
                </span>
              </div>
              <div>
                <span className="font-semibold text-lg capitalize">Type:</span>
                &nbsp;
                {jobType}
              </div>
              <div>
                <span className="font-semibold text-lg">Location:</span>&nbsp;
                {data.location}
              </div>
            </div>
            <div className="text-3xl p-4">{data.pay}$/hr</div>
          </div>
          <div className="h-6" />
          <div className="text-lg border-b border-gray-300 mb-2 font-bold">
            Description
          </div>
          <div className="text-[#686868] mx-2">{data.description}</div>
        </div>
      </div>

      {role === "Applicant" && data.status === "open" && (
        <Button onClick={handleApplyJob} type="button" variant="contained">
          Apply Now
        </Button>
      )}

      {role === "Manager" &&
        userId === jobData.managerid &&
        jobData.status === "open" && <JobManagerView jobData={jobData} />}
    </>
  );
};

const JobManagerView = (props: any) => {
  const { jobData }: { jobData: Job } = props;
  const role = useUserStore((state) => state.role);
  const userId = useUserStore((state) => state.id);

  const [searchParams, setSearchParams] = useSearchParams();
  const [viewManager, setViewManager] = useState("job-screening");

  useEffect(() => {
    const jobManager: string = searchParams.get("view") || "job-screening";
    setViewManager(jobManager);
  }, [searchParams]);

  const handleCloseJob = (e: any) => {
    e.preventDefault();
    console.log("Close job");

    const body = {
      jobid: jobData._id,
    };

    axios
      .post("http://localhost:8000/api/v1/users/closejob", body)
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Failed to apply");
          return;
        }
        toast.success("Job closed");
        location.reload();
      });
  };

  return (
    <>
      {role === "Manager" &&
        userId === jobData.managerid &&
        jobData.status === "open" && (
          <div className="m-4">
            <div className="mx-2">
              <Button
                onClick={handleCloseJob}
                type="button"
                variant="outlined"
                style={{
                  color: "#FF5353",
                  borderColor: "#FF5353",
                  // borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                  minWidth: "200px",
                  margin: "10px",
                }}
              >
                Close job
              </Button>
            </div>
            <div className="text-2xl my-4">Candidates Review</div>
            <div className="flex flex-row justify-around">
              <Button
                onClick={() => {
                  const jobId: string = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-screening" });
                }}
                type="button"
                variant={viewManager === "job-screening" ? "contained" : "text"}
                fullWidth={true}
                style={{
                  borderColor: viewManager === "job-screening" ? "" : "#FF5353",
                  color:
                    viewManager === "job-screening" ? "#FFFFFF" : "#FF5353",
                  backgroundColor:
                    viewManager === "job-screening" ? "#FF5353" : "",
                }}
              >
                Screening
              </Button>
              <Button
                onClick={() => {
                  const jobId: string = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-grading" });
                }}
                type="button"
                variant={viewManager === "job-grading" ? "contained" : "text"}
                // style={{ maxWidth: "500px" }}
                fullWidth={true}
                style={{
                  borderColor: viewManager === "job-grading" ? "" : "#FF5353",
                  color: viewManager === "job-grading" ? "#FFFFFF" : "#FF5353",
                  backgroundColor:
                    viewManager === "job-grading" ? "#FF5353" : "",
                }}
              >
                Grading
              </Button>
              <Button
                onClick={() => {
                  const jobId: string = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-rating" });
                }}
                type="button"
                variant={viewManager === "job-rating" ? "contained" : "text"}
                fullWidth={true}
                style={{
                  // borderColor: viewManager === "job-rating" ? "" : "#FF5353",
                  color: viewManager === "job-rating" ? "#FFFFFF" : "#FF5353",
                  backgroundColor:
                    viewManager === "job-rating" ? "#FF5353" : "",
                }}
              >
                Rating
              </Button>
              <Button
                onClick={() => {
                  const jobId: string = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-final-review" });
                }}
                type="button"
                variant={
                  viewManager === "job-final-review" ? "contained" : "text"
                }
                fullWidth={true}
                style={{
                  borderColor:
                    viewManager === "job-final-review" ? "" : "#FF5353",
                  color:
                    viewManager === "job-final-review" ? "#FFFFFF" : "#FF5353",
                  backgroundColor:
                    viewManager === "job-final-review" ? "#FF5353" : "",
                }}
              >
                Review
              </Button>
            </div>
          </div>
        )}
      <div className="m-4">
        {viewManager === "job-screening" && <JobScreening jobData={jobData} />}
        {viewManager === "job-grading" && <JobGrading jobData={jobData} />}
        {viewManager === "job-rating" && <JobRating jobData={jobData} />}
        {viewManager === "job-final-review" && (
          <JobFinalReview jobData={jobData} />
        )}
      </div>
    </>
  );
};

export default JobDetail;
