import { Download, Play, Search, ShoppingCart } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Steps = () => {
  const steps = [
    {
      icon: <Search className="w-10 h-10 text-center" />,
      title: "Browse Games",
      description: "Explore our library of 200+ premium Steam titles.",
    },
    {
      icon: <ShoppingCart className="w-10 h-10" />,
      title: "Purchase",
      description: "Buy at affordable prices with instant confirmation.",
    },
    {
      icon: <Download className="w-10 h-10 " />,
      title: "Download Games",
      description: "Receive your game/account within minutes.",
    },
    {
      icon: <Play className="w-10 h-10 " />,
      title: "Play Games",
      description: "Enjoy offline or online gaming with no hassle.",
    },
  ];

  const navigate = useNavigate();

  const handleclick = () => {
    navigate("/games"), window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="bg-black/95 min-h-screen text-white pt-20 select-none">
        <div className="flex items-center justify-center ">
          <h1 className="text-4xl md:text-4xl font-bold mb-10">
            How It <span className="text-purple-500 ">Works</span>
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 mx-10">
          {steps.map((step, index) => (
            <div
              data-aos="fade-down"
              className="bg-[#111826] hover:bg-[#1b2126] border-purple-500  border rounded-2xl py-5 text-center  "
              key={index}
            >
              <span className="flex justify-center items-center mb-4 bg-purple-600 w-16 h-16 rounded-full m-auto text-white">
                {step.icon}
              </span>
              <h1 className="font-semibold text-lg mb-1">{step.title}</h1>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-20">
          <h1 className="text-lg">Ready To Get Started?</h1>
        </div>
        <div className="flex items-center justify-center mt-5">
          <button
            onClick={() => handleclick()}
            className="bg-purple-700 px-5 py-2 cursor-pointer rounded-4xl flex items-center gap-2 hover:bg-purple-600 "
          >
            Browse Games Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Steps;
