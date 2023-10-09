import { useEffect, useRef } from "react";

export const ExplorePage = () => {
  const count = useRef(0);
  useEffect(() => {
    if (count.current !== 0) {
    }
    count.current++;
  }, []);

  return (
    <>
      <div className="w-full">
        <h2>Explore</h2>
      </div>
    </>
  );
};
