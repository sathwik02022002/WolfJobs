const JobListTile = () => {
  return (
    <div className="my-3 ">
      <div className="p-3 bg-white rounded-xl">
        <div className="flex flex-row">
          <div className="w-4/6 ">
            <div className="w-fit bg-[#FF2A2A]/10 rounded-2xl px-3 py-0 ">
              <p className="inline text-xs" style={{ width: "fit-content" }}>
                {/* <div className="inline">
                    <div className="flex flex-row justify-center">
                      <div className=" p-1 w-1  bg-[#FF2A2A1A]  rounded-full"></div>
                    </div>
                  </div> */}
                {"NC State Dining".toUpperCase()}
              </p>
            </div>
            <p className="text-sm">
              <b>Role:</b> Dining Associate{" "}
            </p>
            <p className="text-sm">
              <b>Job Status:</b> Closed{" "}
            </p>
            <p className="text-sm">
              <b>Type:</b> Full-time
            </p>
          </div>
          <div className="w-2/6  flex flex-col-reverse text-right">
            <p className="text-xs">Know more</p>
            <p className="text-3xl">40$/hr</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListTile;
