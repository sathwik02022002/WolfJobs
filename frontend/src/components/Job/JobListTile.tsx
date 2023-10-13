import { useEffect, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

const JobListTile = (props: any) => {
  const { data } = props;
  const [active, setActive] = useState<boolean>(true);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("jobId");
    setActive(data._id === id);
  }, [searchParams]);

  const handleClick = (e: any) => {
    e.preventDefault();
    setSearchParams({ jobId: data._id });
  };

  const affilation = "NC State Dining";
  const role = "Dining Associate";
  const jobStatus = "Closed";
  const jobType = "Full-time";

  const viewMore = true;
  const viewQuestionnaire = false;
  const viewApplication = false;

  const handleKnowMore = (e: any) => {
    e.stopPropagation();
    console.log("Know more");
  };
  const handleFillQuestionnaire = (e: any) => {
    e.stopPropagation();
    console.log("Fill Questionnaire");
  };
  const handleViewApplication = (e: any) => {
    e.stopPropagation();
    console.log("View Application");
  };

  return (
    <div className="my-3 " onClick={handleClick}>
      <div
        className={`p-3 bg-white rounded-xl ${
          active ? "border-red-300 " : "border-white"
        } border`}
      >
        <div className="flex flex-row">
          <div className="w-4/6 ">
            <div className="w-fit bg-[#FF2A2A]/10 rounded-2xl px-3 py-0">
              <p className="inline text-xs" style={{ width: "fit-content" }}>
                {affilation.toUpperCase()}
              </p>
            </div>
            <div className="h-1"></div>
            <div className="pl-2">
              <p className="text-base">
                <b>Role:</b> {role}
              </p>
              <p className="text-base">
                <b>Job Status:</b>
                <span
                  className={`${
                    jobStatus.toLowerCase() === "closed" ? "text-[#FF5353]" : ""
                  }`}
                >
                  &nbsp;{jobStatus}
                </span>
              </p>
              <p className="text-base">
                <b>Type:</b> {jobType}
              </p>
            </div>
          </div>
          <div className="w-2/6  flex flex-col-reverse text-right">
            {viewMore && (
              <p
                className="inline-flex items-center flex-row-reverse text-xs text-[#656565]"
                onClick={handleKnowMore}
              >
                <HiOutlineArrowRight />
                Know more&nbsp;
              </p>
            )}
            {viewQuestionnaire && (
              <p
                className="inline-flex items-center flex-row-reverse text-xs text-[#00B633]"
                onClick={handleFillQuestionnaire}
              >
                <HiOutlineArrowRight />
                Fill Questionnaire&nbsp;
              </p>
            )}
            {viewApplication && (
              <p
                className="inline-flex items-center flex-row-reverse text-xs text-[#656565]"
                onClick={handleViewApplication}
              >
                <HiOutlineArrowRight />
                View Application&nbsp;
              </p>
            )}
            <p className="text-3xl">40$/hr</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListTile;
