const JobDetail = (props: any) => {
  const { jobData } = props;
  const data = jobData as Job;

  const jobType = data.type === "parttime" ? "Part time" : "Full time";

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
    </>
  );
};

export default JobDetail;
