import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useJobStore } from "../../store/JobStore";

const JobDetailView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobData, setJobData] = useState<Job | null>();

  //   let job: Job | undefined | null = null;
  const jobsList = useJobStore((state) => state.jobList);

  useEffect(() => {
    const jobId = searchParams.get("jobId");
    if (!!jobId) {
      setJobData(jobsList.find((item) => item._id === jobId));
    } else {
      setJobData(null);
    }
  }, [searchParams, jobsList]);

  return (
    <>
      <div className="w-8/12" style={{ height: "calc(100vh - 72px)" }}>
        {!!!jobData && <NoJobSelected />}
        {!!jobData && <JobDetail jobData={jobData} />}
      </div>
    </>
  );
};

const NoJobSelected = () => {
  return <>No job selected</>;
};

const JobDetail = (props: any) => {
  const { jobData } = props;
  return <>{jobData?._id}</>;
};

export default JobDetailView;
