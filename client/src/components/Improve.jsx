import {
  Bug,
  CircleAlert,
  MessageSquareHeart,
  Send,
  SendHorizontal,
} from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();

  const handleBug = () => {
    navigate("/bugs");
  };
  
  const handleFeedback = () => {
    navigate("/feedback");
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen px-4 md:px-8 lg:px-16">
      {/* Header */}
      <div className="py-10 md:py-16">
        <h1 className="font-bold text-4xl text-center mb-4">
          <span className="text-purple-600">Help Us</span> Improve
        </h1>
        <p className="text-gray-500 text-center mt-3 font-semibold max-w-2xl mx-auto px-2">
          Found something not working right? Have ideas to make things better?
          Let us know with a single click.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-20 space-y-8 md:space-y-0 px-4 md:px-8 lg:px-16 mb-10">
        <div 
       
        className="bg-[#111826] rounded-2xl px-5 py-8 w-full max-w-[350px] transition-all duration-400 hover:scale-105 hover:shadow-xl hover:shadow-purple-600/30">
          <Bug
            size={50}
            className="bg-purple-300 mx-auto px-2 text-purple-600 rounded-xl my-8"
          />
          <h2 className="font-bold text-2xl mb-4 text-center group-hover:text-purple-400 transition-all">
            Report a Bug
          </h2>
          <p className="text-gray-500 font-semibold text-center mb-6 px-4">
            Encountered an error, broken feature, or something not working as
            expected? Click here to report it.
          </p>
          <div
           onClick={() => handleBug()}
            className="flex items-center justify-center gap-2 font-semibold text-purple-600 cursor-pointer mx-auto"
            
          >
            <span>Report Issue</span>
            <CircleAlert />
          </div>
        </div>

        <div className="bg-[#111826] rounded-2xl px-5 py-8 w-full max-w-[350px] transition-all duration-400 hover:scale-105 hover:shadow-xl hover:shadow-purple-600/30">
          <MessageSquareHeart
            size={50}
            className="bg-purple-300 mx-auto px-2 text-purple-600 rounded-xl my-8"
          />
          <h2 className="font-bold text-2xl mb-4 text-center group-hover:text-purple-400 transition-all">
            Send a Feedback
          </h2>
          <p className="text-gray-500 font-semibold text-center mb-6 px-4">
            Have suggestions, ideas, or general feedback about your experience?
            We'd love to hear from you.
          </p>
          <div
           onClick={() => handleFeedback()}
          className="flex items-center justify-center gap-2 font-semibold text-purple-600 cursor-pointer mx-auto">
            <span>Send Feedback</span>
            <SendHorizontal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
