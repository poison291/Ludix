import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import { Star, Play, ChevronDown, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Steps from "../components/Steps";
import Slider from "react-slick";
import GameSlider from "../components/Slider";

const Landing = () => {
  const navigate = useNavigate();

  const handleGames = () => {
    navigate("/games");
  };

  const handleDisocrd = () => {
    window.open("https://discord.gg/zsQV6DC5tX", "_blank");
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <div className="bg-black min-h-screen">
        <Navbar bgColor="bg-black" />
        {/* Left section */}
        <div
          data-aos="fade-right"
          className=" px-42 py-10 select-none text-white "
        >
          <div className="inline-flex gap-2 bg-purple-700  px-5 py-2 rounded-4xl mb-8">
            <span>
              <Star />
            </span>
            Premium Gaming Experience
          </div>

          <div className="mb-6">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1">
                Premium
              </span>
              <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-5">
                Steam Games
              </span>
              <span className="block mb-10 text-white/90 text-5xl">
                For everyone
              </span>
            </h1>
          </div>

          <div className="text-gray-200 w-[500px] text-lg mb-8">
            <p>
              Unlock affordable access to premium Steam games. Play offline
              instantly, explore amazing bundles, and enjoy your favorite titles
              without breaking the bank.
            </p>
          </div>

          {/* button */}
          <div className="font-bold text-xl space-x-5 flex mb-10">
            <button
              onClick={handleGames}
              className="bg-purple-700 px-7 py-5 rounded-2xl flex items-center gap-2 hover:bg-purple-600 transform hover:scale-110 transition duration-300"
            >
              <Play size={18} />
              Browse Games
            </button>
            <button
              onClick={handleDisocrd}
              className="group bg-[#2a3750] px-7 py-5 rounded-2xl flex items-center gap-2 
                     hover:bg-gray-600 transform hover:scale-110 transition duration-300 
                     border border-gray-600"
            >
              Join Discord
              <span className="transform transition-transform duration-300 group-hover:translate-y-1">
                <MessageCircle size={18} />
              </span>
            </button>
          </div>

          {/* Stat section */}
          <div className="flex space-x-20">
            <span>
              <h1 className="text-2xl font-bold flex justify-center">1K+</h1>
              <h1 className="text-gray-400">Happy Gamers</h1>
            </span>
            <span>
              <h1 className="text-2xl font-bold items-center flex justify-center">
                200+
              </h1>
              <h1 className="text-gray-400">Premium Games</h1>
            </span>
            <span>
              <h1 className="text-2xl font-bold items-center flex justify-center">
                24/7
              </h1>
              <h1 className="text-gray-400">Support</h1>
            </span>
          </div>
        </div>
      </div>

          <div className="bg-black text-white pt-20">
        <h1 className="text-center text-4xl font-bold">Top Games</h1>
        <GameSlider/>
      </div>

      <div>
        <Steps />
      </div>
      
    </>
  );
};

export default Landing;
