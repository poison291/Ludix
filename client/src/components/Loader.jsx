import React from "react";
import { Hourglass } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        colors={["#a855f7", "#9333ea"]}
      />
    </div>
  );
};

export default Loader;
