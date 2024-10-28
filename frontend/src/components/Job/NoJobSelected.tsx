const NoJobSelected = () => {
  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ height: "calc(100vh - 72px)" }}
      >
        <div className="flex flex-col items-center">
          <div className="h-40 w-40 mb-4">
            <img src="images/rb_705.png" style={{ width: "100%", height: "100%" }} />
          </div>
          <div className="text-[#000000] text-center text-lg">Nothing to show!</div>
          <div className="text-[#000000] text-center text-lg">Select a job for more details</div>
        </div>
      </div>
    </>
  );
};

export default NoJobSelected;
