import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { Button } from "@mui/material";

const JobScreening = (props: any) => {
  const { jobData }: { jobData: Job } = props;

  const [displayList, setDisplayList] = useState<Application[]>([]);

  const applicationList = useApplicationStore((state) => state.applicationList);

  useEffect(() => {
    // let displayList: Application[] = [];s
    setDisplayList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "applied"
      )
    );
  }, []);

  const handleAccept = () => {};
  const handleReject = () => {};

  return (
    <>
      <div>Screening</div>
      {displayList?.map((item: Application) => (
        <div className=" p-1">
          <div className="bg-white my-2 mx-1 p-2 rounded-lg">
            <div className=" flex flex-row justify-between">
              <div className="flex flex-col">
                <div> Name: {item.applicantname} </div>
                {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
                <div>Email: {item.applicantemail}</div>
                {!!item?.applicantSkills && (
                  <div>Skills: {item.applicantSkills}</div>
                )}
              </div>
              <div className="flex flex-row">
                <Button onClick={handleAccept}>Accept</Button>
                <Button onClick={handleReject}>Reject</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobScreening;
