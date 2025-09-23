import React from "react";
import { Hourglass, BallTriangle } from "react-loader-spinner";

export const Loader = () => {
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

export const BallLoader = () => {
  return (
    <div className="flex  justify-center mt-40  h-screen ">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="blue"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>
  );
};
