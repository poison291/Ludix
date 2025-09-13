import React, { useEffect } from "react";
import premiumbundle from "../assets/premiumbundle.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const PremiumCard = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <>
      <div
        data-aos="fade-down"
        className="lg:absolute lg:top-0 lg:right-0 lg:px-10 lg:py-20 px-10 py-10 select-none text-white  overflow-hidden"
      >
        <div className="w-[520px] h-[420px] bg-[#2b324e] rounded-3xl border border-gray-400 mt-22 mr-40 hover:scale-105 transform transition-transform duration-500 cursor-pointer">
          <div className="px-10 pt-10">
            <img
              className="rounded-xl w-full h-auto"
              src={premiumbundle}
              alt="image"
            />
          </div>
          <h1 className="pl-10 mt-5 font-bold text-2xl">Premium Bundle</h1>
          <p className="pl-10 mt-3 text-gray-300">Access to 10+ AAA titles</p>
          <div className="pl-10 mt-10 flex gap-3">
            <p className=" text-white font-bold text-xl">Rs.1500</p>
            <p className="line-through text-gray-200">Rs.15000</p>
            <p className="bg-green-500 px-2 rounded-3xl font-semibold ml-auto mr-5">90% OFF</p>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default PremiumCard;
