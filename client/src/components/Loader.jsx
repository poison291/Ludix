import React from "react";
import { LineWave, Hourglass, BallTriangle } from "react-loader-spinner";

export const LineWaveLoader = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-black"
      style={{ width: "100%", height: "100vh" }}
    >
      <LineWave
        visible={true}
        height={200} // bigger size
        width={200}  // bigger size
        color="#4fa94d"
        ariaLabel="line-wave-loading"
        firstLineColor="#4fa94d"
        middleLineColor="#4fa94d"
        lastLineColor="#4fa94d"
      />
    </div>
  );
};

export const HourglassLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Hourglass
        visible={true}
        height={80}
        width={80}
        ariaLabel="hourglass-loading"
        colors={["#a855f7", "#9333ea"]}
      />
    </div>
  );
};

export const BallLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen pb-80">
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
