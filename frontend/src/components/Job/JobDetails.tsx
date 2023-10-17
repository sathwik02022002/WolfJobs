import axios from "axios";
import { useUserStore } from "../../store/UserStore";
import { useForm } from "react-hook-form";
import { Badge, Button } from "@mui/material";
import { toast } from "react-toastify";
import JobScreening from "./JobScreening";
import JobRating from "./JobRating";
import JobGrading from "./JobGrading";
import JobFinalReview from "./JobFinalReview";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import {
  Stack,
  TextField,
} from "@mui/material";

type FormValues = {
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
};

const JobDetail = (props: any) => {
  const { jobData } = props;
  const data = jobData as Job;

  const jobType = data.type === "parttime" ? "Part time" : "Full time";


  const [displayList1, setDisplayList1] = useState<Application[]>([]);
  const [displayList2, setDisplayList2] = useState<Application[]>([]);

  const applicationList = useApplicationStore((state) => state.applicationList);

  const applicantemail = useUserStore((state) => state.email);
  const userId = useUserStore((state) => state.id);
  const applicantname = useUserStore((state) => state.name);
  const applicantSkills = useUserStore((state) => state.skills);
  const applicantNumber = useUserStore((state) => state.phonenumber);
  const role = useUserStore((state) => state.role);

  useEffect(() => {
    if (role === "Applicant") {
      setDisplayList1(
        applicationList.filter(
          (item) => item.jobid === jobData._id && item.status === "screening"
        )
      );
    }
  }, []);

  useEffect(() => {
    if (role === "Applicant") {
      setDisplayList2(
        applicationList.filter(
          (item) => item.jobid === jobData._id && item.status === "applied"
        )
      );
    }
  }, []);

  const form = useForm<FormValues>({
    defaultValues: {
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
    },
  });
  const { register, handleSubmit, formState, watch } = form;

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

  const onSubmit = (data: FormValues) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";

    const body = {
      applicationId: userId,
      answer1: data.answer1,
      answer2: data.answer2,
      answer3: data.answer3,
      answer4: data.answer4,
    };

    axios.post(url, body).then((res) => {
      if (res.status == 200) {
        toast.success("Accepted candidate");
        return;
      }
      toast.error("Failed to accept candidate");
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
                  className={`capitalize ${data.status === "open" ? "text-green-500" : "text-red-500"
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
        <div>
          {displayList1.length > 0 ? (

            <div className="w-7/12">
              <div className="flex flex-col m-4 ">
                <div className="text-xl border-b border-gray-300 font-bold">
                  Fill Questionnaire
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="flex flex-row justify-between m-2">

                    <div className="flex flex-col ">
                      <div>
                        <span className="font-semibold text-lg">1:</span>&nbsp;
                        {data.question1}
                      </div>
                    </div>
                  </div>
                  <Stack spacing={2} width={400}>
                    <TextField
                      label="Answer 1"
                      type="text"
                      {...register("answer1")}
                      sx={{
                        "& label": { paddingLeft: (theme) => theme.spacing(1) },
                        "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                        "& fieldset": {
                          paddingLeft: (theme) => theme.spacing(1.5),
                          borderRadius: "10px",
                        },
                      }}
                    />

                    <div className="flex flex-row justify-between m-2">

                      <div className="flex flex-col ">
                        <div>
                          <span className="font-semibold text-lg">2:</span>&nbsp;
                          {data.question2}
                        </div>
                      </div>
                    </div>

                    <TextField
                      label="Answer 2"
                      type="text"
                      {...register("answer2")}
                      sx={{
                        "& label": { paddingLeft: (theme) => theme.spacing(1) },
                        "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                        "& fieldset": {
                          paddingLeft: (theme) => theme.spacing(1.5),
                          borderRadius: "10px",
                        },
                      }}
                    />

                    <div className="flex flex-row justify-between m-2">

                      <div className="flex flex-col ">
                        <div>
                          <span className="font-semibold text-lg">3:</span>&nbsp;
                          {data.question3}
                        </div>
                      </div>
                    </div>


                    <TextField
                      label="Answer 3"
                      type="text"
                      {...register("answer3")}
                      sx={{
                        "& label": { paddingLeft: (theme) => theme.spacing(1) },
                        "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                        "& fieldset": {
                          paddingLeft: (theme) => theme.spacing(1.5),
                          borderRadius: "10px",
                        },
                      }}
                    />
                    <div className="flex flex-row justify-between m-2">

                      <div className="flex flex-col ">
                        <div>
                          <span className="font-semibold text-lg">4:</span>&nbsp;
                          {data.question4}
                        </div>
                      </div>
                    </div>

                    <TextField
                      label="Answer 4"
                      type="text"
                      {...register("answer4")}
                      sx={{
                        "& label": { paddingLeft: (theme) => theme.spacing(1) },
                        "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                        "& fieldset": {
                          paddingLeft: (theme) => theme.spacing(1.5),
                          borderRadius: "10px",
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{
                        background: "#FF5353",
                        borderRadius: "10px",
                        textTransform: "none",
                        fontSize: "16px",
                      }}
                    >
                      Submit
                    </Button>
                  </Stack>
                </form>
              </div>
            </div>
          ) : (
            displayList2.length === 0 && (
              <Button onClick={handleApplyJob} type="button" variant="contained">
                Apply Now
              </Button>
            )
          )}
        </div>
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
                variant="contained"
                style={{
                  background: "#FF5353",
                  borderRadius: "10px",
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
                variant={viewManager === "job-screening" ? "outlined" : "text"}
                fullWidth={true}
              >
                Screening
              </Button>
              <Button
                onClick={() => {
                  const jobId: string = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-grading" });
                }}
                type="button"
                variant={viewManager === "job-grading" ? "outlined" : "text"}
                // style={{ maxWidth: "500px" }}
                fullWidth={true}
              >
                Grading
              </Button>
              <Button
                onClick={() => {
                  const jobId: string = searchParams.get("jobId")!;
                  setSearchParams({ jobId: jobId, view: "job-rating" });
                }}
                type="button"
                variant={viewManager === "job-rating" ? "outlined" : "text"}
                fullWidth={true}
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
                  viewManager === "job-final-review" ? "outlined" : "text"
                }
                fullWidth={true}
              >
                Final Review
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
