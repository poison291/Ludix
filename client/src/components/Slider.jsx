import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useGameStore from "../Store/gameStore";
import { useNavigate } from "react-router-dom";
import { LineWaveLoader } from "./Loader";

const GameSlider = () => {
  const games = useGameStore((state) => state.games);
  const fetchedGames = useGameStore((state) => state.fetchedGames);
    const loading = useGameStore((state) => state.loading.games);
  const navigate = useNavigate();

  const handleClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  useEffect(() => {
    fetchedGames();
  }, [fetchedGames]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    swipe: false,
    draggable: false,
    touchMove: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, centerMode: true, swipe: false, draggable: false } },
      { breakpoint: 640, settings: { slidesToShow: 1, centerMode: false, swipe: false, draggable: false } },
    ],
  };

  if (!games || games.length === 0) return null;
  if(loading) return <LineWaveLoader/>

  return (
    <div className="relative px-6 py-16 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent pointer-events-none"></div>
      
      <style>
        {`
          .slick-slide {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0.4;
            transform: scale(0.8) translateY(20px);
            filter: blur(2px) grayscale(30%);
          }
          .slick-slide.slick-center {
            opacity: 1;
            transform: scale(1) translateY(0);
            z-index: 10;
            filter: blur(0) grayscale(0%);
          }
          .slick-slide:hover.slick-center {
            transform: scale(1.05) translateY(-8px);
          }
          .slick-dots { bottom: -40px; }
          .slick-dots li button:before {
            font-size: 10px;
            color: #4b5563;
            opacity: 0.5;
            transition: all 0.3s ease;
          }
          .slick-dots li.slick-active button:before {
            color: #3b82f6;
            opacity: 1;
            transform: scale(1.3);
          }
          .slick-prev, .slick-next {
            width: 50px;
            height: 50px;
            z-index: 20;
            transition: all 0.3s ease;
          }
          .slick-prev { left: -20px; }
          .slick-next { right: -20px; }
          .slick-prev:before, .slick-next:before {
            font-size: 40px;
            opacity: 0.7;
            text-shadow: 0 2px 10px rgba(0,0,0,0.8);
          }
        `}
      </style>
      
      <Slider {...settings}>
        {games.map((game) => (
          <div key={game.id} className="px-3" onClick={() => handleClick(game.id)}>
            <div className="relative group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.image}/header.jpg`}
                  alt={game.title}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-bold text-xl md:text-2xl drop-shadow-lg transform transition-all duration-300 group-hover:scale-105">
                  {game.title}
                </h3>
              </div>
              
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GameSlider;