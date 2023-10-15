import axios from "axios";
import { useUserStore } from "../../store/UserStore";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

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

  const handleCloseJob = (e: any) => {
    e.preventDefault();
    console.log("Close job");

    const body = {
      jobid: data._id,
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
      {role === "Applicant" && (
        <Button onClick={handleApplyJob} type="button" variant="contained">
          Apply Now
        </Button>
      )}
      {role === "Manager" &&
        userId === data.managerid &&
        data.status === "open" && (
          <Button onClick={handleCloseJob} type="button" variant="contained">
            Close job
          </Button>
        )}
    </>
  );
};

export default JobDetail;
